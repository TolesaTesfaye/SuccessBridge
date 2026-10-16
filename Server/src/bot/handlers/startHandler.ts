import { getUserByTelegramId, createTelegramUser } from '../services/userService.js';
import { escapeHtml, formatDivider, formatRoleBadge, getMainKeyboard } from '../utils/ui.js';

export async function handleStart(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from?.id?.toString() || '';
  const username = msg.from?.username || msg.from?.first_name || 'Student';

  try {
    // Check if user exists
    let user = await getUserByTelegramId(telegramUserId);

    if (!user) {
      // Create new user
      user = await createTelegramUser({
        telegramId: telegramUserId,
        username: msg.from?.username,
        firstName: msg.from?.first_name,
        lastName: msg.from?.last_name,
      });
    }

    const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || msg.from?.first_name || username;
    const roleBadge = formatRoleBadge(user.role);
    const isAdmin = user.role === 'admin' || user.role === 'super_admin';

    const welcomeBanner = `🎓 <b>SUCCESSBRIDGE LEARNING HUB</b>\n` +
      `${formatDivider()}\n` +
      `👋 Welcome, <b>${escapeHtml(displayName)}</b>!\n` +
      `<i>Your academic portal for high school and university excellence.</i>\n\n` +
      `📊 <b>Member Summary:</b>\n` +
      `• Tier: ${roleBadge}\n` +
      `• Status: 🟢 Active Member\n` +
      `• Telegram ID: <code>${escapeHtml(telegramUserId)}</code>\n\n` +
      `✨ <b>What you can do:</b>\n` +
      `• 📖 <b>My Subjects:</b> Access enrolled courses and materials\n` +
      `• 🔍 <b>Live Search:</b> Type any topic or subject to find materials instantly\n` +
      `• 📥 <b>Study Library:</b> Download slides, notes, exams & worksheets\n` +
      `• 👤 <b>Student ID:</b> View your academic profile and credentials\n` +
      `${formatDivider()}\n` +
      `👇 <i>Choose an action below or send any keyword to search:</i>`;

    await bot.sendMessage(chatId, welcomeBanner, {
      parse_mode: 'HTML',
      reply_markup: getMainKeyboard(isAdmin),
    });

    // Also send quick action inline menu
    await bot.sendMessage(
      chatId,
      '⚡ <b>Quick Shortcuts:</b>',
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '📚 Browse by Level', callback_data: 'browse_courses' },
              { text: '🔍 Search Materials', callback_data: 'search_prompt' },
            ],
            [
              { text: '📖 My Subjects', callback_data: 'mycourses' },
              { text: '👤 Student ID', callback_data: 'view_profile' },
            ],
            [
              { text: '🌐 Open Web Platform', url: 'https://success-bridge-ten.vercel.app' },
              { text: '❓ Help Desk', callback_data: 'faq_home' },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error('Error in /start handler:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>An error occurred while loading your dashboard. Please try again.</i>',
      { parse_mode: 'HTML' }
    );
  }
}
