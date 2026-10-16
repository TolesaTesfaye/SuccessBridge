import { getQuickStats } from '../services/statsService.js';
import { requireAdmin } from '../middleware/auth.js';

/**
 * Show main admin menu
 */
export async function showAdminMenu(bot: any, chatId: number, telegramUserId: string) {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    const stats = await getQuickStats();
    
    const message = `
🔐 *Admin Control Panel*

Welcome, ${admin.name}!

📊 *Quick Statistics:*
• Total Users: ${stats.totalUsers}
• Active Users: ${stats.activeUsers}
• Active Today: ${stats.activeToday}
• New This Week: ${stats.newUsersThisWeek}

📚 *Content:*
• Subjects: ${stats.totalSubjects}
• Resources: ${stats.totalResources}
• Subject Access: ${stats.totalAccesses}

Select management area:
    `.trim();

    await bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '👥 Users', callback_data: 'admin_users_page_1' },
            { text: '📁 Resources', callback_data: 'admin_resources_menu' },
          ],
          [
            { text: '📊 Statistics', callback_data: 'admin_stats' },
            { text: '🔍 Search', callback_data: 'admin_search' },
          ],
          [
            { text: '⚙️ Settings', callback_data: 'admin_settings' },
            { text: '🔄 Refresh', callback_data: 'admin_menu' },
          ],
          [
            { text: '🔙 Exit Admin Mode', callback_data: 'main_menu' },
          ],
        ],
      },
    });
  } catch (error) {
    console.error('Error showing admin menu:', error);
    await bot.sendMessage(chatId, '❌ Error loading admin menu. Please try again.');
  }
}
