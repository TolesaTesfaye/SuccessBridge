/**
 * Profile-related callback handlers
 * Handles profile setup, viewing, and settings
 */

import { handleProfile } from '../profileHandler.js';
import {
  handleProfileSetup,
  handleHighSchoolSetup,
  handleUniversitySetup,
  handleGradeSelection as handleProfileGradeSelection,
  handleUniversityLevelSelection
} from '../profileSetupHandler.js';
import { escapeHtml, formatDivider } from '../../utils/ui.js';

export async function handleProfileCallbacks(bot: any, query: any, data: string): Promise<void> {
  const chatId = query.message.chat.id;
  const userId = query.from.id.toString();

  // View profile
  if (data === 'view_profile') {
    const userMsg = { chat: { id: chatId }, from: query.from };
    await handleProfile(bot, userMsg, userId);
    return;
  }

  // Start profile setup
  if (data === 'setup_profile') {
    const userMsg = { chat: { id: chatId }, from: query.from };
    await handleProfileSetup(bot, userMsg);
    return;
  }

  // High school setup
  if (data === 'setup_highschool') {
    await handleHighSchoolSetup(bot, query);
    return;
  }

  // University setup
  if (data === 'setup_university') {
    await handleUniversitySetup(bot, query);
    return;
  }

  // Grade selection
  if (data.startsWith('setup_grade_')) {
    const grade = data.replace('setup_grade_', '');
    await handleProfileGradeSelection(bot, query, grade);
    return;
  }

  // Remedial level
  if (data === 'setup_remedial') {
    await handleUniversityLevelSelection(bot, query, 'remedial');
    return;
  }

  // Freshman level
  if (data === 'setup_freshman') {
    await handleUniversityLevelSelection(bot, query, 'freshman');
    return;
  }

  // User settings
  if (data === 'user_settings') {
    const settingsCard = `⚙️ <b>STUDENT SETTINGS & PREFERENCES</b>\n` +
      `${formatDivider()}\n` +
      `🆔 <b>Telegram ID:</b> <code>${escapeHtml(userId)}</code>\n` +
      `📱 <b>Username:</b> @${escapeHtml(query.from.username || 'Not set')}\n` +
      `🟢 <b>Account Status:</b> Verified Active Member\n` +
      `📥 <b>Delivery Mode:</b> Direct Document Delivery (Telegram Chat)\n` +
      `🌐 <b>API Server:</b> Connected (Online - Port 5000)\n` +
      `${formatDivider()}\n` +
      `💡 <i>To change password, update email, or modify subscriptions, visit:</i>\n` +
      `https://success-bridge-ten.vercel.app`;

    await bot.sendMessage(chatId, settingsCard, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '👤 Back to Profile', callback_data: 'view_profile' }],
          [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
        ],
      },
    });
    return;
  }
}
