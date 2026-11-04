import { Op } from 'sequelize';
import { IUser, IResource } from '../types/index.js';
import StudentCategoryAccess, { StudentCategory } from '../models/StudentCategoryAccess.js';
import { deriveStudentCategory, getGradeFromCategory, getUniversityLevelFromCategory } from './studentCategoryService.js';

export interface AccessCheckResult {
  allowed: boolean;
  reason?: string;
  accessRecord?: any;
}

/**
 * Main authorization function - checks if a student can access a resource
 * This is the single source of truth for resource access control
 */
export async function canAccessResource(
  user: IUser,
  resource: IResource
): Promise<AccessCheckResult> {
  try {
    // 1. Validate user is active
    if (!user.isActive) {
      return {
        allowed: false,
        reason: 'User account is not active',
      };
    }

    // 2. Derive student category from user
    const userCategory = deriveStudentCategory(user);
    if (!userCategory) {
      return {
        allowed: false,
        reason: 'Unable to determine student category',
      };
    }

    // 3. Derive resource category
    const resourceCategory = deriveResourceCategory(resource);
    if (!resourceCategory) {
      return {
        allowed: false,
        reason: 'Resource category not defined',
      };
    }

    // 4. Check category match
    if (userCategory !== resourceCategory) {
      return {
        allowed: false,
        reason: `Your category (${userCategory}) does not match the resource category (${resourceCategory})`,
      };
    }

    // 5. Find active access record
    const accessRecord = await StudentCategoryAccess.findOne({
      where: {
        userId: user.id,
        studentCategory: userCategory,
        status: 'active',
      },
    });

    if (!accessRecord) {
      return {
        allowed: false,
        reason: 'No active access found for your category. Please make a payment to unlock resources.',
      };
    }

    // 6. Check expiration
    if (accessRecord.expiresAt && new Date(accessRecord.expiresAt) < new Date()) {
      return {
        allowed: false,
        reason: 'Your access has expired',
      };
    }

    // 7. For university resources, check university match
    if (resource.universityId && user.universityId !== resource.universityId) {
      return {
        allowed: false,
        reason: 'This resource is restricted to a different university',
      };
    }

    // All checks passed
    return {
      allowed: true,
      accessRecord,
    };
  } catch (error) {
    console.error('Error in canAccessResource:', error);
    return {
      allowed: false,
      reason: 'Error checking access permissions',
    };
  }
}

/**
 * Derive resource category from resource properties
 */
export function deriveResourceCategory(resource: IResource): StudentCategory | null {
  if (!resource) return null;

  // High School Resources
  if (resource.educationLevel === 'high_school' && resource.grade) {
    switch (resource.grade) {
      case '9':
      case 'grade_9':
        return 'GRADE_9';
      case '10':
      case 'grade_10':
        return 'GRADE_10';
      case '11':
      case 'grade_11':
        return 'GRADE_11';
      case '12':
      case 'grade_12':
        return 'GRADE_12';
      default:
        return null;
    }
  }

  // University Resources - need to determine from context
  // Since Resource model doesn't have universityLevel, we'll use a convention
  // You may need to add a field to Resource model or use another method
  if (resource.educationLevel === 'university') {
    // For now, we'll return null and require manual categorization
    // OR you can add a studentCategory field to the Resource model
    return null;
  }

  return null;
}

/**
 * Check if user has active access to their category
 */
export async function hasActiveAccess(
  userId: string,
  studentCategory: StudentCategory
): Promise<boolean> {
  const accessRecord = await StudentCategoryAccess.findOne({
    where: {
      userId,
      studentCategory,
      status: 'active',
      [Op.or]: [
        { expiresAt: null }, // Lifetime access
        { expiresAt: { [Op.gt]: new Date() } }, // Not expired
      ],
    },
  });

  return !!accessRecord;
}

/**
 * Get all active access records for a user
 */
export async function getUserActiveAccess(userId: string) {
  return await StudentCategoryAccess.findAll({
    where: {
      userId,
      status: 'active',
      [Op.or]: [
        { expiresAt: null },
        { expiresAt: { [Op.gt]: new Date() } },
      ],
    },
  });
}

/**
 * Check if user has pending payment for their category
 */
export async function hasPendingPayment(
  userId: string,
  studentCategory: StudentCategory
): Promise<boolean> {
  const Payment = (await import('../models/Payment.js')).default;
  
  const pendingPayment = await Payment.findOne({
    where: {
      userId,
      studentCategory,
      status: 'pending',
    },
  });

  return !!pendingPayment;
}

/**
 * Grant access to a student category after payment approval
 */
export async function grantCategoryAccess(
  userId: string,
  studentCategory: StudentCategory,
  paymentId: string,
  universityId?: string,
  durationDays?: number
): Promise<StudentCategoryAccess> {
  const expiresAt = durationDays
    ? new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000)
    : null; // null means lifetime

  // Check for existing active access
  const existingAccess = await StudentCategoryAccess.findOne({
    where: {
      userId,
      studentCategory,
      universityId: universityId || null,
      status: 'active',
    },
  });

  if (existingAccess) {
    // Update existing access
    existingAccess.paymentId = paymentId;
    existingAccess.grantedAt = new Date();
    existingAccess.expiresAt = expiresAt;
    await existingAccess.save();
    return existingAccess;
  }

  // Create new access
  const access = await StudentCategoryAccess.create({
    userId,
    studentCategory,
    universityId,
    paymentId,
    status: 'active',
    grantedAt: new Date(),
    expiresAt,
  });

  return access;
}

/**
 * Revoke access for a student category
 */
export async function revokeCategoryAccess(
  userId: string,
  studentCategory: StudentCategory,
  universityId?: string
): Promise<boolean> {
  const result = await StudentCategoryAccess.update(
    { status: 'revoked' },
    {
      where: {
        userId,
        studentCategory,
        universityId: universityId || null,
        status: 'active',
      },
    }
  );

  return result[0] > 0;
}
