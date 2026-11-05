/**
 * Download Tracking Service
 * Manages free tier downloads and tracks usage analytics
 */

import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';

export interface DownloadStats {
  canDownload: boolean;
  reason: 'premium' | 'free_available' | 'free_exhausted' | 'no_profile';
  downloadsUsed: number;
  downloadsRemaining: number;
  downloadLimit: number;
  requiresPayment: boolean;
  hasPremium: boolean;
}

export interface DownloadRecord {
  id: string;
  userId: string;
  resourceId: string;
  resourceName: string;
  resourceType?: string;
  downloadedAt: Date;
  wasFree: boolean;
  userDownloadCount: number;
  category?: string;
}

/**
 * Check if user can download a resource
 */
export async function checkDownloadAccess(userId: string): Promise<DownloadStats> {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return {
        canDownload: false,
        reason: 'no_profile',
        downloadsUsed: 0,
        downloadsRemaining: 0,
        downloadLimit: 15,
        requiresPayment: false,
        hasPremium: false,
      };
    }

    const downloadsUsed = user.freeDownloadsUsed || 0;
    const downloadLimit = user.freeDownloadsLimit || 15;
    const hasPremium = user.hasPremium || false;

    // Premium users have unlimited access
    if (hasPremium) {
      return {
        canDownload: true,
        reason: 'premium',
        downloadsUsed,
        downloadsRemaining: Infinity,
        downloadLimit,
        requiresPayment: false,
        hasPremium: true,
      };
    }

    // Check free tier
    const remaining = downloadLimit - downloadsUsed;

    if (remaining > 0) {
      return {
        canDownload: true,
        reason: 'free_available',
        downloadsUsed,
        downloadsRemaining: remaining,
        downloadLimit,
        requiresPayment: false,
        hasPremium: false,
      };
    }

    // Free tier exhausted
    return {
      canDownload: false,
      reason: 'free_exhausted',
      downloadsUsed,
      downloadsRemaining: 0,
      downloadLimit,
      requiresPayment: true,
      hasPremium: false,
    };
  } catch (error) {
    console.error('Error checking download access:', error);
    throw error;
  }
}

/**
 * Track a download and increment counter
 */
export async function trackDownload(
  userId: string,
  resourceId: string,
  resourceName: string,
  resourceType?: string,
  category?: string,
  ipAddress?: string,
  userAgent?: string
): Promise<DownloadRecord> {
  const transaction = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction });

    if (!user) {
      await transaction.rollback();
      throw new Error('User not found');
    }

    const wasFree = !user.hasPremium;
    const currentCount = user.freeDownloadsUsed || 0;

    // Increment download counter for free users
    if (wasFree) {
      user.freeDownloadsUsed = currentCount + 1;
      await user.save({ transaction });
    }

    // Record download in history
    const downloadRecord = {
      id: uuidv4(),
      userId,
      resourceId,
      resourceName,
      resourceType,
      downloadedAt: new Date(),
      wasFree,
      userDownloadCount: wasFree ? currentCount + 1 : currentCount,
      category,
      ipAddress,
      userAgent,
    };

    // Insert into download_history table
    await sequelize.query(
      `INSERT INTO download_history 
       (id, user_id, resource_id, resource_name, resource_type, downloaded_at, was_free, user_download_count, category, ip_address, user_agent)
       VALUES (:id, :userId, :resourceId, :resourceName, :resourceType, :downloadedAt, :wasFree, :userDownloadCount, :category, :ipAddress, :userAgent)`,
      {
        replacements: downloadRecord,
        transaction,
      }
    );

    await transaction.commit();

    console.log(`📥 Download tracked: ${resourceName} by user ${userId} (${wasFree ? 'free' : 'premium'})`);

    return downloadRecord;
  } catch (error) {
    await transaction.rollback();
    console.error('Error tracking download:', error);
    throw error;
  }
}

/**
 * Get user's download statistics
 */
export async function getUserDownloadStats(userId: string): Promise<DownloadStats> {
  return await checkDownloadAccess(userId);
}

/**
 * Get user's download history
 */
export async function getUserDownloadHistory(
  userId: string,
  limit: number = 20
): Promise<DownloadRecord[]> {
  try {
    const [results] = await sequelize.query(
      `SELECT 
        id, 
        user_id as "userId",
        resource_id as "resourceId",
        resource_name as "resourceName",
        resource_type as "resourceType",
        downloaded_at as "downloadedAt",
        was_free as "wasFree",
        user_download_count as "userDownloadCount",
        category
       FROM download_history
       WHERE user_id = :userId
       ORDER BY downloaded_at DESC
       LIMIT :limit`,
      {
        replacements: { userId, limit },
        type: QueryTypes.SELECT,
      }
    );

    return results as DownloadRecord[];
  } catch (error) {
    console.error('Error fetching download history:', error);
    return [];
  }
}

/**
 * Get download progress percentage
 */
export function getDownloadProgress(downloadsUsed: number, downloadLimit: number): number {
  if (downloadLimit === 0) return 0;
  return Math.round((downloadsUsed / downloadLimit) * 100);
}

/**
 * Get progress bar string
 */
export function getProgressBar(downloadsUsed: number, downloadLimit: number, width: number = 14): string {
  const percentage = getDownloadProgress(downloadsUsed, downloadLimit);
  const filled = Math.round((percentage / 100) * width);
  const empty = width - filled;
  
  return '█'.repeat(filled) + '░'.repeat(empty);
}

/**
 * Check if user should see upgrade prompt
 */
export function shouldShowUpgradePrompt(stats: DownloadStats): boolean {
  if (stats.hasPremium) return false;
  
  // Show at 10, 13, 14, and 15 downloads
  const thresholds = [10, 13, 14, 15];
  return thresholds.includes(stats.downloadsUsed);
}

/**
 * Get upgrade message based on download count
 */
export function getUpgradeMessage(downloadsUsed: number, downloadsRemaining: number): string {
  if (downloadsRemaining === 0) {
    return '🔒 <b>Free Tier Exhausted!</b>\n\n' +
           'You\'ve used all 15 free downloads.\n' +
           'Upgrade to premium for unlimited access!';
  }
  
  if (downloadsRemaining === 1) {
    return '⚠️ <b>Last Free Download!</b>\n\n' +
           'Only 1 download remaining in your free tier.\n' +
           'Upgrade now for unlimited access!';
  }
  
  if (downloadsRemaining <= 2) {
    return '⚠️ <b>Almost Out of Free Downloads!</b>\n\n' +
           `Only ${downloadsRemaining} downloads remaining.\n` +
           'Consider upgrading to premium!';
  }
  
  if (downloadsRemaining <= 5) {
    return '💡 <b>Reminder:</b> ' + downloadsRemaining + ' free downloads remaining.\n' +
           'Upgrade anytime for unlimited access!';
  }
  
  return '';
}

/**
 * Reset free downloads (admin function)
 */
export async function resetFreeDownloads(userId: string): Promise<void> {
  try {
    await User.update(
      { freeDownloadsUsed: 0 },
      { where: { id: userId } }
    );
    
    console.log(`🔄 Reset free downloads for user ${userId}`);
  } catch (error) {
    console.error('Error resetting free downloads:', error);
    throw error;
  }
}

/**
 * Grant premium access
 */
export async function grantPremiumAccess(userId: string): Promise<void> {
  try {
    await User.update(
      { hasPremium: true },
      { where: { id: userId } }
    );
    
    console.log(`✨ Granted premium access to user ${userId}`);
  } catch (error) {
    console.error('Error granting premium access:', error);
    throw error;
  }
}

/**
 * Get analytics: Most downloaded resources
 */
export async function getMostDownloadedResources(limit: number = 10): Promise<any[]> {
  try {
    const [results] = await sequelize.query(
      `SELECT 
        resource_name as "resourceName",
        resource_type as "resourceType",
        category,
        COUNT(*) as "downloadCount",
        COUNT(DISTINCT user_id) as "uniqueUsers"
       FROM download_history
       GROUP BY resource_name, resource_type, category
       ORDER BY "downloadCount" DESC
       LIMIT :limit`,
      {
        replacements: { limit },
        type: QueryTypes.SELECT,
      }
    );

    return results;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return [];
  }
}

/**
 * Get conversion rate (free users who upgraded)
 */
export async function getConversionRate(): Promise<number> {
  try {
    const results: any = await sequelize.query(
      `SELECT 
        COUNT(CASE WHEN has_premium = true THEN 1 END) as premium,
        COUNT(*) as total
       FROM users
       WHERE role = 'student'`,
      {
        type: QueryTypes.SELECT,
      }
    );

    const { premium, total } = results[0];
    return total > 0 ? (premium / total) * 100 : 0;
  } catch (error) {
    console.error('Error calculating conversion rate:', error);
    return 0;
  }
}
