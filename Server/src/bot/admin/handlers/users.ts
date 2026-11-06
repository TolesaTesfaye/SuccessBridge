import { User, SubjectAccess, Subject } from '../../../models/index.js';
import { requireAdmin } from '../middleware/auth.js';
import { Op } from 'sequelize';
import { validateUUID, validateNumericId, validateRole } from '../../middleware/validation.middleware.js';
import { logger } from '../../middleware/logger.middleware.js';
import { stateManager, isCancelCommand } from '../../state/stateManager.js';
import { escapeMarkdown } from '../../utils/ui.js';

const USERS_PER_PAGE = 10;

const USER_ROLES = ['student', 'admin', 'super_admin'] as const;

function userManagementKeyboard(userId?: string): any[][] {
  return userId
    ? [
        [
          { text: '✏️ Edit Name/Email', callback_data: `admin_user_edit_${userId}` },
          { text: '🗑️ Delete User', callback_data: `admin_user_delete_${userId}` },
        ],
        [
          { text: '✏️ Change Role', callback_data: `admin_user_role_${userId}` },
          { text: '🔙 Back to List', callback_data: 'admin_users_page_1' },
        ],
      ]
    : [
        [
          { text: '➕ Create User', callback_data: 'admin_user_create' },
          { text: '🔍 Search User', callback_data: 'admin_user_search' },
        ],
        [{ text: '🔙 Back', callback_data: 'admin_menu' }],
      ];
}

export async function showUserManagementMenu(
  bot: any,
  chatId: number,
  telegramUserId: string,
): Promise<void> {
  await requireAdmin(bot, chatId, telegramUserId);
  await bot.sendMessage(
    chatId,
    '👥 <b>User Management</b>\n\nChoose an operation:',
    { parse_mode: 'HTML', reply_markup: { inline_keyboard: userManagementKeyboard() } },
  );
}

export async function startUserSearch(
  bot: any,
  chatId: number,
  telegramUserId: string,
): Promise<void> {
  await requireAdmin(bot, chatId, telegramUserId);
  stateManager.startFlow(telegramUserId, 'user_search');
  await bot.sendMessage(
    chatId,
    '🔍 Send a name, email, username, or Telegram ID to search.\n\nSend /cancel to stop.',
  );
}

export async function startUserCreate(
  bot: any,
  chatId: number,
  telegramUserId: string,
): Promise<void> {
  await requireAdmin(bot, chatId, telegramUserId);
  stateManager.startFlow(telegramUserId, 'user_create');
  await bot.sendMessage(
    chatId,
    '➕ <b>Create User</b>\n\nSend details in this format:\n<code>Name | email@example.com | telegram_id (optional)</code>\n\nSend /cancel to stop.',
    { parse_mode: 'HTML' },
  );
}

export async function handleUserManagementText(
  bot: any,
  msg: any,
  flowType: 'user_search' | 'user_create' | 'user_update',
): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from.id.toString();
  const text = msg.text?.trim();
  if (!text) return;

  await requireAdmin(bot, chatId, telegramUserId);
  if (isCancelCommand(text)) {
    stateManager.cancelFlow(telegramUserId, flowType);
    await bot.sendMessage(chatId, '✅ Operation cancelled.', {
      reply_markup: { inline_keyboard: [[{ text: '👥 User Management', callback_data: 'admin_users_menu' }]] },
    });
    return;
  }

  try {
    if (flowType === 'user_search') {
      const term = `%${text}%`;
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: term } },
            { email: { [Op.iLike]: term } },
            { username: { [Op.iLike]: term } },
            { telegramId: { [Op.iLike]: term } },
          ],
        },
        order: [['createdAt', 'DESC']],
        limit: 20,
      });
      stateManager.completeFlow(telegramUserId, flowType);
      if (users.length === 0) {
        await bot.sendMessage(chatId, '📋 No matching users found.', {
          reply_markup: { inline_keyboard: [[{ text: '🔍 Search Again', callback_data: 'admin_user_search' }]] },
        });
        return;
      }
      const keyboard = users.map(user => [{
        text: `${user.name} — ${user.role}`,
        callback_data: `admin_user_view_${user.id}`,
      }]);
      keyboard.push([{ text: '👥 User Management', callback_data: 'admin_users_menu' }]);
      await bot.sendMessage(chatId, `🔍 <b>Search results</b> (${users.length})`, {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: keyboard },
      });
      return;
    }

    if (flowType === 'user_create') {
      const [name, email, telegramId = ''] = text.split('|').map(value => value.trim());
      if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        await bot.sendMessage(chatId, '❌ Invalid format. Use: Name | valid@email.com | telegram_id (optional)');
        return;
      }
      const existing = await User.findOne({
        where: {
          [Op.or]: [{ email }, ...(telegramId ? [{ telegramId }] : [])],
        },
      });
      if (existing) {
        await bot.sendMessage(chatId, '❌ A user with that email or Telegram ID already exists.');
        return;
      }
      const user = await User.create({
        name,
        email,
        telegramId: telegramId || undefined,
        role: 'student',
        isEmailVerified: true,
        isApproved: true,
        approvalStatus: 'approved',
      } as any);
      stateManager.completeFlow(telegramUserId, flowType);
      logger.logAdminAction('create_user', telegramUserId, user.id);
      await bot.sendMessage(chatId, `✅ <b>User created</b>\n\n${user.name}\n${user.email}`, {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [[{ text: '👤 View User', callback_data: `admin_user_view_${user.id}` }]] },
      });
      return;
    }

    const state = stateManager.getState(telegramUserId, 'user_update');
    const userId = state?.data.userId;
    if (!userId) {
      stateManager.cancelFlow(telegramUserId, 'user_update');
      await bot.sendMessage(chatId, '❌ Edit session expired. Please open the user again.');
      return;
    }
    const user = await User.findByPk(userId);
    if (!user) {
      stateManager.completeFlow(telegramUserId, 'user_update');
      await bot.sendMessage(chatId, '❌ User not found.');
      return;
    }
    const [name, email] = text.split('|').map(value => value.trim());
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await bot.sendMessage(chatId, '❌ Invalid format. Use: Name | valid@email.com');
      return;
    }
    const duplicate = await User.findOne({ where: { email, id: { [Op.ne]: userId } } });
    if (duplicate) {
      await bot.sendMessage(chatId, '❌ That email is already used by another user.');
      return;
    }
    await user.update({ name, email });
    stateManager.completeFlow(telegramUserId, 'user_update');
    logger.logAdminAction('update_user', telegramUserId, user.id);
    await bot.sendMessage(chatId, '✅ User details updated.', {
      reply_markup: { inline_keyboard: [[{ text: '👤 View User', callback_data: `admin_user_view_${user.id}` }]] },
    });
  } catch (error) {
    console.error(`Error handling ${flowType}:`, error);
    await bot.sendMessage(chatId, '❌ Operation failed. Please try again.');
  }
}

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

    const keyboard: any[][] = users.map(user => {
      console.log('Creating button for user:', { id: user.id, name: user.name, idType: typeof user.id });
      return [
        {
          text: `${user.name} (@${user.username || 'no username'}) - ${user.role}`,
          callback_data: `admin_user_view_${user.id}`,
        },
      ];
    });

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

    keyboard.push(...userManagementKeyboard());

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
  let validUserId: string;
  try {
    validUserId = validateUUID(userId, 'User ID');
  } catch (validationError) {
    console.error('Invalid user ID format:', userId, validationError);
    await bot.sendMessage(chatId, '❌ Invalid user ID format.');
    return;
  }

  // Log admin action
  logger.logAdminAction('view_user', telegramUserId, validUserId);

  try {
    // First try to fetch user without associations to isolate the issue
    const user: any = await User.findByPk(validUserId);

    if (!user) {
      console.error('User not found with ID:', validUserId);
      await bot.sendMessage(chatId, '❌ User not found.');
      return;
    }

    // Try to fetch subject access separately with error handling
    let subjectAccesses: any[] = [];
    try {
      subjectAccesses = await SubjectAccess.findAll({
        where: { userId: validUserId },
        include: [{ 
          model: Subject, 
          as: 'subject', 
          attributes: ['name', 'code'],
          required: false // Use LEFT JOIN instead of INNER JOIN
        }],
      });
    } catch (subjectError) {
      console.error('Error fetching subject access:', subjectError);
      // Continue without subject access data
    }

    const formatDate = (date: Date) => new Date(date).toLocaleDateString();

    const subjectsList = subjectAccesses && subjectAccesses.length > 0
      ? subjectAccesses
          .map((access: any) => `  • ${escapeMarkdown(access.subject?.name || 'Unknown')} (${escapeMarkdown(access.subject?.code || 'N/A')})`)
          .join('\n')
      : '  None';

    const userName = escapeMarkdown(user.name || 'N/A');
    const userEmail = escapeMarkdown(user.email || 'N/A');
    const userRole = escapeMarkdown(user.role || 'student');
    const userUsername = escapeMarkdown(user.username || 'N/A');
    const userTelegramId = user.telegramId || 'N/A';

    const message = `
👤 *User Details*

*Name:* ${userName}
*Email:* ${userEmail}
*Role:* ${userRole}
*Telegram:* @${userUsername}
*Telegram ID:* \`${userTelegramId}\`

📊 *Status:*
• Email Verified: ${user.isEmailVerified ? '✅ Yes' : '❌ No'}
• Joined: ${formatDate(user.createdAt)}

📚 *Subject Access:* (${subjectAccesses?.length || 0})
${subjectsList}
    `.trim();

    await bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✏️ Change Role', callback_data: `admin_user_role_${userId}` },
            { text: '✏️ Edit Details', callback_data: `admin_user_edit_${userId}` },
          ],
          [
            { text: '🗑️ Delete User', callback_data: `admin_user_delete_${userId}` },
            { text: '🔙 Back to List', callback_data: 'admin_users_page_1' },
          ],
          [
            { text: '🏠 Admin Menu', callback_data: 'admin_menu' },
          ],
        ],
      },
    });
  } catch (error: any) {
    console.error('Error viewing user:', error);
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
      userId: validUserId,
    });
    
    // Use plain text for error message to avoid Markdown parsing issues
    await bot.sendMessage(
      chatId, 
      '❌ Error loading user details. Please try again.\n\nIf the problem persists, contact support.',
      { parse_mode: undefined }
    );
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

    const userName = escapeMarkdown(user.name);
    const userRole = escapeMarkdown(user.role);

    await bot.sendMessage(
      chatId,
      `👤 Change Role for: ${userName}\n\nCurrent role: *${userRole}*\n\nSelect new role:`,
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
    if (!USER_ROLES.includes(newRole as typeof USER_ROLES[number])) {
      await bot.sendMessage(chatId, '❌ Invalid role.');
      return;
    }
    if (user.id === admin.id && newRole !== user.role) {
      await bot.sendMessage(chatId, '⛔ You cannot change your own role.');
      return;
    }
    user.role = newRole as any;
    await user.save();

    const userName = escapeMarkdown(user.name);
    const oldRoleEscaped = escapeMarkdown(oldRole);
    const newRoleEscaped = escapeMarkdown(newRole);

    await bot.sendMessage(
      chatId,
      `✅ *Role Updated*\n\nUser: ${userName}\nOld Role: ${oldRoleEscaped}\nNew Role: ${newRoleEscaped}`,
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

export async function startUserUpdate(
  bot: any,
  chatId: number,
  telegramUserId: string,
  userId: string
) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;
  const user = await User.findByPk(userId);
  if (!user) {
    await bot.sendMessage(chatId, '❌ User not found.');
    return;
  }
  stateManager.startFlow(telegramUserId, 'user_update', { userId });
  const userName = escapeMarkdown(user.name);
  await bot.sendMessage(chatId, `✏️ Edit <b>${userName}</b>\n\nSend: <code>Name | email@example.com</code>\n\nSend /cancel to stop.`, {
    parse_mode: 'HTML',
  });
}

export async function deleteUser(
  bot: any,
  chatId: number,
  telegramUserId: string,
  userId: string,
): Promise<void> {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  const user = await User.findByPk(userId);
  if (!user) {
    await bot.sendMessage(chatId, '❌ User not found.');
    return;
  }
  if (user.id === admin.id) {
    await bot.sendMessage(chatId, '⛔ You cannot delete your own account.');
    return;
  }
  if (user.role === 'super_admin' && admin.role !== 'super_admin') {
    await bot.sendMessage(chatId, '⛔ Only a super admin can delete another super admin.');
    return;
  }
  const userName = escapeMarkdown(user.name);
  await bot.sendMessage(chatId, `⚠️ <b>Delete ${userName}?</b>\n\nThis permanently removes the user and related records.`, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '✅ Confirm Delete', callback_data: `admin_user_delete_confirm_${userId}` },
          { text: '❌ Cancel', callback_data: `admin_user_view_${userId}` },
        ],
      ],
    },
  });
}

export async function confirmDeleteUser(
  bot: any,
  chatId: number,
  telegramUserId: string,
  userId: string,
): Promise<void> {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  const user = await User.findByPk(userId);
  if (!user) {
    await bot.sendMessage(chatId, '❌ User not found.');
    return;
  }
  if (user.id === admin.id || (user.role === 'super_admin' && admin.role !== 'super_admin')) {
    await bot.sendMessage(chatId, '⛔ You are not allowed to delete this user.');
    return;
  }
  const userName = escapeMarkdown(user.name);
  await user.destroy();
  logger.logAdminAction('delete_user', telegramUserId, userId);
  await bot.sendMessage(chatId, `✅ User <b>${userName}</b> deleted.`, {
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: [[{ text: '👥 User Management', callback_data: 'admin_users_menu' }]] },
  });
}
