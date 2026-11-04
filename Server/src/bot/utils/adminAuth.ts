import User from '../../models/User.js';
import { Op } from 'sequelize';

/**
 * Check if a Telegram user ID belongs to an authorized administrator
 * This is the single source of truth for admin authorization
 */
export async function isAuthorizedAdmin(telegramId: string): Promise<boolean> {
  if (!telegramId) return false;

  try {
    // Check environment variables for super admin / admin IDs
    const authorizedIds: string[] = [];

    console.log('🔐 Admin Auth Check:', {
      telegramId,
      SUPERADMIN_TELEGRAM_ID: process.env.SUPERADMIN_TELEGRAM_ID,
      ADMIN_TELEGRAM_ID: process.env.ADMIN_TELEGRAM_ID
    });

    if (process.env.SUPERADMIN_TELEGRAM_ID) {
      authorizedIds.push(...process.env.SUPERADMIN_TELEGRAM_ID.split(',').map(id => id.trim()));
    }

    if (process.env.ADMIN_TELEGRAM_ID) {
      authorizedIds.push(...process.env.ADMIN_TELEGRAM_ID.split(',').map(id => id.trim()));
    }

    console.log('🔐 Authorized IDs from env:', authorizedIds);

    // Check if telegram ID is in environment list
    if (authorizedIds.includes(telegramId)) {
      console.log('✅ Admin authorized via environment variable');
      return true;
    }

    // Check database for admin users with linked Telegram ID
    const adminUser = await User.findOne({
      where: {
        telegramId,
        role: {
          [Op.in]: ['admin', 'super_admin'],
        },
        isActive: true,
        isApproved: true,
      },
    });

    if (adminUser) {
      console.log('✅ Admin authorized via database:', {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
      });
    } else {
      console.log('❌ Admin not found in database for telegram ID:', telegramId);
    }

    return !!adminUser;
  } catch (error) {
    console.error('Error checking admin authorization:', error);
    return false;
  }
}

/**
 * Get admin user by Telegram ID
 */
export async function getAdminByTelegramId(telegramId: string): Promise<User | null> {
  if (!telegramId) return null;

  try {
    return await User.findOne({
      where: {
        telegramId,
        role: {
          [Op.in]: ['admin', 'super_admin'],
        },
        isActive: true,
      },
    });
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return null;
  }
}

/**
 * Get all admin Telegram IDs for notifications
 */
export async function getAllAdminTelegramIds(): Promise<string[]> {
  const adminIds: string[] = [];

  // Add from environment variables
  if (process.env.SUPERADMIN_TELEGRAM_ID) {
    adminIds.push(...process.env.SUPERADMIN_TELEGRAM_ID.split(',').map(id => id.trim()));
  }

  if (process.env.ADMIN_TELEGRAM_ID) {
    adminIds.push(...process.env.ADMIN_TELEGRAM_ID.split(',').map(id => id.trim()));
  }

  // Add from database
  try {
    const adminsWithTelegram = await User.findAll({
      where: {
        role: {
          [Op.in]: ['admin', 'super_admin'],
        },
        telegramId: {
          [Op.ne]: null,
        },
        isActive: true,
      },
      attributes: ['telegramId'],
    });

    for (const admin of adminsWithTelegram) {
      if (admin.telegramId && !adminIds.includes(admin.telegramId)) {
        adminIds.push(admin.telegramId);
      }
    }
  } catch (error) {
    console.error('Error fetching admin Telegram IDs:', error);
  }

  return adminIds;
}
