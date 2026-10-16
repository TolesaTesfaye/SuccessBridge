import { User, SubjectAccess, Subject } from '../../../models/index.js';
import { requireAdmin } from '../middleware/auth.js';
import { Op } from 'sequelize';
import { validateUUID, validateNumericId, validateRole } from '../../middleware/validation.middleware.js';
import { logger } from '../../middleware/logger.middleware.js';

const USERS_PER_PAGE = 10;

/**
 * List users with pagination
 */
export async function listUsers(
  bot: any,
  chatId: number,
  telegramUserId: string,
  page: number = 1
) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);

  // Validate page number
  const validPage = validateNumericId(page, 'page number');
  const offset = (validPage - 1) * USERS_PER_PAGE;

  // Log admin action
  logger.logAdminAction('list_users', telegramUserId, undefined, { page: validPage });

  try {
    const { count, rows: users } = await User.findAndCountAll({
      limit: USERS_PER_PAGE,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'email', 'role', 'username', 'createdAt'],
    });

    const totalPages = Math.ceil(count / USERS_PER_PAGE);

    if (users.length === 0) {
      await bot.sendMessage(chatId, '📋 No users found.', {
        reply_markup: {
          inline_keyboard: [[{ text: '🔙 Back', callback_data: 'admin_menu' }]],
        },
      });
      return;
    }

    const keyboard: any[][] = users.map(user => [
      {
        text: `${user.name} (@${user.username || 'no username'}) - ${user.role}`,
        callback_data: `admin_user_view_${user.id}`,
      },
    ]);

    // Pagination
    const navButtons = [];
    if (page > 1) {
      navButtons.push({ text: '⬅️ Previous', callback_data: `admin_users_page_${page - 1}` });
    }
    navButtons.push({ text: `📄 ${page}/${totalPages}`, callback_data: 'noop' });
    if (page < totalPages) {
      navButtons.push({ text: '➡️ Next', callback_data: `admin_users_page_${page + 1}` });
    }
    keyboard.push(navButtons);

    keyboard.push([
      { text: '🔍 Search User', callback_data: 'admin_user_search' },
      { text: '🔙 Back', callback_data: 'admin_menu' },
    ]);

    await bot.sendMessage(
      chatId,
      `👥 *User Management* (${count} total)\n\nPage ${page} of ${totalPages}\n\nSelect a user to view details:`,
      {
        parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: keyboard },
      }
    );
  } catch (error) {
    console.error('Error listing users:', error);
    await bot.sendMessage(chatId, '❌ Error loading users. Please try again.');
  }
}

/**
 * View user details
 */
export async function viewUser(
  bot: any,
  chatId: number,
  telegramUserId: string,
  userId: string
) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);

  // Validate user ID (UUID format)
  const validUserId = validateUUID(userId, 'User ID');

  // Log admin action
  logger.logAdminAction('view_user', telegramUserId, validUserId);

  try {
    const user: any = await User.findByPk(validUserId, {
      include: [
        {
          model: SubjectAccess,
          as: 'subjectAccesses',
          include: [{ model: Subject, as: 'subject', attributes: ['name', 'code'] }],
        },
      ],
    });

    if (!user) {
      await bot.sendMessage(chatId, '❌ User not found.');
      return;
    }

    const formatDate = (date: Date) => new Date(date).toLocaleDateString();

    const subjectsList = user.subjectAccesses && user.subjectAccesses.length > 0
      ? user.subjectAccesses
          .map((access: any) => `  • ${access.subject?.name || 'Unknown'} (${access.subject?.code || 'N/A'})`)
          .join('\n')
      : '  None';

    const message = `
👤 *User Details*

*Name:* ${user.name}
*Email:* ${user.email}
*Role:* ${user.role}
*Telegram:* @${user.username || 'N/A'}
*Telegram ID:* \`${user.telegramId || 'N/A'}\`

📊 *Status:*
• Email Verified: ${user.isEmailVerified ? '✅ Yes' : '❌ No'}
• Joined: ${formatDate(user.createdAt)}

📚 *Subject Access:* (${user.subjectAccesses?.length || 0})
${subjectsList}
    `.trim();

    await bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✏️ Change Role', callback_data: `admin_user_role_${userId}` },
            { text: '🔓 Grant Access', callback_data: `admin_user_grant_${userId}` },
          ],
          [
            { text: '📧 Send Message', callback_data: `admin_user_message_${userId}` },
            { text: '🔙 Back to List', callback_data: 'admin_users_page_1' },
          ],
          [
            { text: '🏠 Admin Menu', callback_data: 'admin_menu' },
          ],
        ],
      },
    });
  } catch (error) {
    console.error('Error viewing user:', error);
    await bot.sendMessage(chatId, '❌ Error loading user details. Please try again.');
  }
}

/**
 * Change user role
 */
export async function changeUserRole(
  bot: any,
  chatId: number,
  telegramUserId: string,
  userId: string
) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    const user = await User.findByPk(userId);
    
    if (!user) {
      await bot.sendMessage(chatId, '❌ User not found.');
      return;
    }

    await bot.sendMessage(
      chatId,
      `👤 Change Role for: ${user.name}\n\nCurrent role: *${user.role}*\n\nSelect new role:`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '👨‍🎓 Student', callback_data: `admin_user_setrole_${userId}_student` }],
            [{ text: '👨‍🏫 Teacher', callback_data: `admin_user_setrole_${userId}_teacher` }],
            [{ text: '👨‍💼 Admin', callback_data: `admin_user_setrole_${userId}_admin` }],
            admin.role === 'super_admin' 
              ? [{ text: '⭐ Super Admin', callback_data: `admin_user_setrole_${userId}_super_admin` }]
              : [],
            [{ text: '❌ Cancel', callback_data: `admin_user_view_${userId}` }],
          ].filter(row => row.length > 0),
        },
      }
    );
  } catch (error) {
    console.error('Error showing role change:', error);
    await bot.sendMessage(chatId, '❌ Error. Please try again.');
  }
}

/**
 * Set user role
 */
export async function setUserRole(
  bot: any,
  chatId: number,
  telegramUserId: string,
  userId: string,
  newRole: string
) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    // Only super admin can set super_admin role
    if (newRole === 'super_admin' && admin.role !== 'super_admin') {
      await bot.sendMessage(chatId, '⛔ Only super admins can grant super admin role.');
      return;
    }

    const user = await User.findByPk(userId);
    
    if (!user) {
      await bot.sendMessage(chatId, '❌ User not found.');
      return;
    }

    const oldRole = user.role;
    user.role = newRole as any;
    await user.save();

    await bot.sendMessage(
      chatId,
      `✅ *Role Updated*\n\nUser: ${user.name}\nOld Role: ${oldRole}\nNew Role: ${newRole}`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '👤 View User', callback_data: `admin_user_view_${userId}` }],
            [{ text: '🔙 Back to List', callback_data: 'admin_users_page_1' }],
          ],
        },
      }
    );
  } catch (error) {
    console.error('Error setting user role:', error);
    await bot.sendMessage(chatId, '❌ Error updating role. Please try again.');
  }
}

/**
 * Toggle user active status
 */
export async function toggleUserActive(
  bot: any,
  chatId: number,
  telegramUserId: string,
  userId: string
) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    const user = await User.findByPk(userId);
    
    if (!user) {
      await bot.sendMessage(chatId, '❌ User not found.');
      return;
    }

    user.isActive = !user.isActive;
    await user.save();

    await bot.sendMessage(
      chatId,
      `✅ User ${user.isActive ? 'activated' : 'deactivated'}\n\nUser: ${user.name}\nStatus: ${user.isActive ? 'Active' : 'Inactive'}`,
      {
        reply_markup: {
          inline_keyboard: [[{ text: '👤 View User', callback_data: `admin_user_view_${userId}` }]],
        },
      }
    );
  } catch (error) {
    console.error('Error toggling user status:', error);
    await bot.sendMessage(chatId, '❌ Error updating status. Please try again.');
  }
}
