import { getUserByTelegramId } from '../../services/userService.js';
import { User } from '../../../models/index.js';
import { PermissionError, ResourceNotFoundError } from '../../handlers/errors/index.js';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  telegramId: string;
}

/**
 * Check if user is admin (admin or super_admin)
 */
export async function isAdmin(telegramUserId: string): Promise<boolean> {
  try {
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      return false;
    }

    const fullUser = await User.findByPk(user.id);
    return fullUser?.role === 'admin' || fullUser?.role === 'super_admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Get admin user details
 */
export async function getAdminUser(telegramUserId: string): Promise<AdminUser | null> {
  try {
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      return null;
    }

    const fullUser = await User.findByPk(user.id);
    
    if (!fullUser || (fullUser.role !== 'admin' && fullUser.role !== 'super_admin')) {
      return null;
    }

    return {
      id: fullUser.id,
      name: fullUser.name,
      email: fullUser.email,
      role: fullUser.role,
      telegramId: telegramUserId,
    };
  } catch (error) {
    console.error('Error getting admin user:', error);
    return null;
  }
}

/**
 * Check if user is super admin
 */
export async function isSuperAdmin(telegramUserId: string): Promise<boolean> {
  try {
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      return false;
    }

    const fullUser = await User.findByPk(user.id);
    return fullUser?.role === 'super_admin';
  } catch (error) {
    console.error('Error checking super admin status:', error);
    return false;
  }
}

/**
 * Require admin middleware
 * Throws PermissionError if user is not an admin (caught by global error handler)
 */
export async function requireAdmin(
  bot: any,
  chatId: number,
  telegramUserId: string
): Promise<AdminUser> {
  const admin = await getAdminUser(telegramUserId);
  
  if (!admin) {
    throw new PermissionError(
      'Admin access required. You don\'t have permission to access this feature.',
      {
        chatId,
        userId: telegramUserId,
        action: 'admin_auth',
      }
    );
  }
  
  return admin;
}

/**
 * Require super admin middleware
 * Throws PermissionError if user is not a super admin
 */
export async function requireSuperAdmin(
  bot: any,
  chatId: number,
  telegramUserId: string
): Promise<AdminUser> {
  const admin = await getAdminUser(telegramUserId);
  
  if (!admin || admin.role !== 'super_admin') {
    throw new PermissionError(
      'Super admin access required. This feature is only available to super administrators.',
      {
        chatId,
        userId: telegramUserId,
        action: 'super_admin_auth',
        metadata: { userRole: admin?.role },
      }
    );
  }
  
  return admin;
}
