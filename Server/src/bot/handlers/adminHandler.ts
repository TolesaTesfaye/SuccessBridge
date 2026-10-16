import { getUserByTelegramId } from '../services/userService.js';
import { User } from '../../models/index.js';

// List of authorized admin Telegram IDs
const ADMIN_TELEGRAM_IDS = [
  // Add your Telegram user ID here
  // You can get it by messaging the bot and checking console logs
];

/**
 * Check if user is admin
 */
export async function isAdmin(telegramUserId: string): Promise<boolean> {
  try {
    const user = await getUserByTelegramId(telegramUserId);
    
    console.log(`🔍 Checking admin status for Telegram ID: ${telegramUserId}`);
    
    if (!user) {
      console.log(`❌ No user found for Telegram ID: ${telegramUserId}`);
      return false;
    }

    console.log(`✅ User found: ${user.email} (ID: ${user.id})`);

    // Check if user has admin or super_admin role
    const fullUser = await User.findByPk(user.id);
    console.log(`👤 User role: ${fullUser?.role}`);
    
    const isAdminRole = fullUser?.role === 'admin' || fullUser?.role === 'super_admin';
    console.log(`🔐 Is admin: ${isAdminRole}`);
    
    return isAdminRole;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Handle /admin command - show admin menu
 */
export async function handleAdminCommand(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from.id.toString();

  try {
    const adminStatus = await isAdmin(telegramUserId);

    if (!adminStatus) {
      await bot.sendMessage(
        chatId,
        '⛔ Access Denied\n\nYou do not have admin privileges.\n\nThis command is only available to administrators.',
        {
          reply_markup: {
            inline_keyboard: [[{ text: '🔙 Main Menu', callback_data: 'main_menu' }]],
          },
        }
      );
      return;
    }

    // Show admin menu
    await bot.sendMessage(
      chatId,
      '🔐 *Admin Panel*\n\nSelect an option:',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '📤 Upload Resource', callback_data: 'admin_upload' }],
            [{ text: '📊 View Statistics', callback_data: 'admin_stats' }],
            [{ text: '👥 Manage Users', callback_data: 'admin_users' }],
            [{ text: '📚 Manage Subjects', callback_data: 'admin_subjects' }],
            [{ text: '🔙 Back', callback_data: 'main_menu' }],
          ],
        },
      }
    );
  } catch (error) {
    console.error('Error in handleAdminCommand:', error);
    await bot.sendMessage(chatId, '❌ An error occurred. Please try again.');
  }
}

/**
 * Handle admin upload resource
 */
export async function handleAdminUpload(bot: any, chatId: number, telegramUserId: string): Promise<void> {
  try {
    const adminStatus = await isAdmin(telegramUserId);

    if (!adminStatus) {
      await bot.sendMessage(chatId, '⛔ Access Denied');
      return;
    }

    await bot.sendMessage(
      chatId,
      '📤 *Upload Resource*\n\n' +
      'To upload a resource:\n\n' +
      '1. Send the file to this chat\n' +
      '2. Add a caption in this format:\n\n' +
      '`#upload SubjectCode | Type | Title`\n\n' +
      '*Example:*\n' +
      '`#upload PHYS12S | lecture-slide | Chapter 1 Introduction`\n\n' +
      '*Resource Types:*\n' +
      '• lecture-slide\n' +
      '• handout\n' +
      '• note\n' +
      '• module\n' +
      '• reference-book\n' +
      '• mid-exam\n' +
      '• final-exam\n' +
      '• last-year-exam',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[{ text: '🔙 Back to Admin', callback_data: 'admin_menu' }]],
        },
      }
    );
  } catch (error) {
    console.error('Error in handleAdminUpload:', error);
    await bot.sendMessage(chatId, '❌ An error occurred. Please try again.');
  }
}

/**
 * Handle admin statistics
 */
export async function handleAdminStats(bot: any, chatId: number, telegramUserId: string): Promise<void> {
  try {
    const adminStatus = await isAdmin(telegramUserId);

    if (!adminStatus) {
      await bot.sendMessage(chatId, '⛔ Access Denied');
      return;
    }

    const { Subject, User: UserModel, Resource } = await import('../../models/index.js');

    // Get counts
    const totalUsers = await UserModel.count();
    const totalSubjects = await Subject.count();
    const totalResources = await Resource.count();
    const activeUsers = totalUsers; // No isActive column, use total

    const statsMessage = `
📊 *System Statistics*

👥 *Users:*
• Total: ${totalUsers}
• Active: ${activeUsers}

📚 *Content:*
• Subjects: ${totalSubjects}
• Resources: ${totalResources}

📈 *Activity:*
• Bot is running
• Database connected
    `;

    await bot.sendMessage(chatId, statsMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔄 Refresh', callback_data: 'admin_stats' }],
          [{ text: '🔙 Back to Admin', callback_data: 'admin_menu' }],
        ],
      },
    });
  } catch (error) {
    console.error('Error in handleAdminStats:', error);
    await bot.sendMessage(chatId, '❌ An error occurred. Please try again.');
  }
}

/**
 * Handle admin user management
 */
export async function handleAdminUsers(bot: any, chatId: number, telegramUserId: string): Promise<void> {
  try {
    const adminStatus = await isAdmin(telegramUserId);

    if (!adminStatus) {
      await bot.sendMessage(chatId, '⛔ Access Denied');
      return;
    }

    await bot.sendMessage(
      chatId,
      '👥 *User Management*\n\n' +
      'User management features:\n\n' +
      '• View recent users\n' +
      '• Search users\n' +
      '• Manage access\n\n' +
      'For detailed user management, please use the web admin panel:\n' +
      'https://success-bridge-ten.vercel.app/superadmin/users',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[{ text: '🔙 Back to Admin', callback_data: 'admin_menu' }]],
        },
      }
    );
  } catch (error) {
    console.error('Error in handleAdminUsers:', error);
    await bot.sendMessage(chatId, '❌ An error occurred. Please try again.');
  }
}

/**
 * Handle admin subjects management
 */
export async function handleAdminSubjects(bot: any, chatId: number, telegramUserId: string): Promise<void> {
  try {
    const adminStatus = await isAdmin(telegramUserId);

    if (!adminStatus) {
      await bot.sendMessage(chatId, '⛔ Access Denied');
      return;
    }

    const { Subject, Grade, Stream } = await import('../../models/index.js');

    // Get subject counts by grade
    const subjects = await Subject.findAll({
      attributes: ['id', 'name', 'code'],
      include: [
        { model: Grade, as: 'grade', attributes: ['name'] },
        { model: Stream, as: 'stream', attributes: ['name'] },
      ],
      limit: 10,
      order: [['createdAt', 'DESC']],
    });

    let subjectList = '📚 *Recent Subjects:*\n\n';
    subjects.forEach((subject: any) => {
      const grade = subject.grade?.name || 'N/A';
      const stream = subject.stream?.name || '';
      subjectList += `• ${subject.name} (${subject.code})\n  ${grade}${stream ? ' - ' + stream : ''}\n\n`;
    });

    await bot.sendMessage(chatId, subjectList, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔄 Refresh', callback_data: 'admin_subjects' }],
          [{ text: '🔙 Back to Admin', callback_data: 'admin_menu' }],
        ],
      },
    });
  } catch (error) {
    console.error('Error in handleAdminSubjects:', error);
    await bot.sendMessage(chatId, '❌ An error occurred. Please try again.');
  }
}
