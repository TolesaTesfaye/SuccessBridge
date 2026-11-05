/**
 * Common callback handlers
 * Handles frequently used callbacks like main_menu, help, courses, etc.
 */

import { handleMyCourses } from '../myCoursesHandler.js';
import { handleHelp, handleFaqCallback } from '../helpHandler.js';
import { handleSearchPrompt, handleQuickSearch } from '../searchHandler.js';
import { getUserByTelegramId } from '../../services/userService.js';
import { escapeHtml, formatDivider, getMainKeyboard } from '../../utils/ui.js';

export async function handleCommonCallbacks(bot: any, query: any, data: string): Promise<void> {
  const chatId = query.message.chat.id;
  const userId = query.from.id.toString();

  // My courses
  if (data === 'mycourses') {
    const userMsg = { chat: { id: chatId }, from: query.from };
    await handleMyCourses(bot, userMsg, userId);
    return;
  }

  // Help/FAQ
  if (data === 'faq_home' || data === 'help_support') {
    const userMsg = { chat: { id: chatId }, from: query.from };
    await handleHelp(bot, userMsg);
    return;
  }

  // FAQ callback
  if (data.startsWith('faq_')) {
    const messageId = query.message.message_id;
    await handleFaqCallback(bot, chatId, messageId, data);
    return;
  }

  // Search prompt
  if (data === 'search_prompt') {
    await handleSearchPrompt(bot, chatId);
    return;
  }

  // Quick search
  if (data.startsWith('quick_search_')) {
    const queryText = data.replace('quick_search_', '');
    await handleQuickSearch(bot, chatId, queryText);
    return;
  }

  // Main menu
  if (data === 'main_menu') {
    const user = await getUserByTelegramId(userId);
    const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

    const menuText = `🏠 <b>MAIN ACADEMIC DASHBOARD</b>\n` +
      `${formatDivider()}\n` +
      `Welcome back! Select an option from the menu buttons below, or use the quick actions:\n` +
      `${formatDivider()}`;

    await bot.sendMessage(chatId, menuText, {
      parse_mode: 'HTML',
      reply_markup: getMainKeyboard(isAdmin),
    });

    await bot.sendMessage(chatId, '⚡ <b>Quick Shortcuts:</b>', {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '📚 Browse', callback_data: 'browse_courses' },
            { text: '📖 My Courses', callback_data: 'mycourses' },
          ],
          [
            { text: '🔍 Search', callback_data: 'search_prompt' },
            { text: '👤 Profile', callback_data: 'view_profile' },
          ],
        ],
      },
    });
    return;
  }
}
