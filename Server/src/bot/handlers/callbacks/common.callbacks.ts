/**
 * Common callback handlers
 * Handles frequently used callbacks like main_menu, help, courses, etc.
 */

import { handleMyCourses } from '../myCoursesHandler.js';
import { handleHelp, handleFaqCallback } from '../helpHandler.js';
import { handleSearchPrompt, handleQuickSearch } from '../searchHandler.js';
import { getUserByTelegramId } from '../../services/userService.js';
import { getMainKeyboard } from '../../utils/ui.js';
import { getPaymentButtonText } from '../startHandler.js';
import { screen, bi, DIVIDER, actionGrid } from '../../utils/design.js';

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
    const cta = await getPaymentButtonText(user);

    const menuText = screen({
      icon: '🏠',
      title: 'Main Menu',
      subtitle: bi('What would you like to do?', 'Maal goduu barbaadda?'),
      body: `⚡ <b>QUICK ACTIONS</b>`,
      tipText: 'Tip: you can also use the menu buttons at the bottom of the chat.',
      tipOromoo: 'Buqqaalee gara jalaattiis fayyadhaa.',
    });

    await bot.sendMessage(chatId, menuText, {
      parse_mode: 'HTML',
      reply_markup: getMainKeyboard(isAdmin),
    });

    await bot.sendMessage(chatId, `${DIVIDER}\n👇 <b>Choose an action:</b>`, {
      parse_mode: 'HTML',
      reply_markup: actionGrid({ ctaText: cta.text, ctaData: cta.data, isAdmin }),
    });
    return;
  }
}
