import { getUserByTelegramId, createTelegramUser } from '../services/userService.js';
import { escapeHtml, formatDivider, formatRoleBadge, getMainKeyboard, getWebUrl } from '../utils/ui.js';

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

    const displayName = user
      ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || user.username || msg.from?.first_name || username
      : msg.from?.first_name || username;
    const roleBadge = formatRoleBadge(user?.role);
    const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

    const welcomeBanner = `🎓 <b>SUCCESSBRIDGE LEARNING HUB</b>\n` +
      `${formatDivider()}\n` +
      `👋 Welcome, <b>${escapeHtml(displayName)}</b>!\n` +
      `<i>Your all-in-one portal for high school and university academic excellence.</i>\n\n` +
      `🚀 <b>How to Get Started in 3 Easy Steps:</b>\n` +
      `1️⃣ <b>Browse Materials:</b> Select your Grade (9-12) or University program (Freshman / Remedial).\n` +
      `2️⃣ <b>Download Docs:</b> Receive lecture slides, chapter modules, and past exams directly in this chat.\n` +
      `3️⃣ <b>Read on Web:</b> Enjoy full-screen reading, bookmarks, and chapter practice quizzes on our website!\n\n` +
      `💡 <i>Quick Tip: Type any topic (e.g. <code>Biology</code> or <code>Calculus</code>) anytime in this chat to search instantly!</i>\n` +
      `${formatDivider()}\n` +
      `👤 <b>Student ID:</b> <code>${escapeHtml(telegramUserId)}</code> • ${roleBadge}`;

    await bot.sendMessage(chatId, welcomeBanner, {
      parse_mode: 'HTML',
      reply_markup: getMainKeyboard(isAdmin),
    });

    // Send quick action inline menu with clear guidance
    await bot.sendMessage(
      chatId,
      '⚡ <b>Student Quick Actions:</b>',
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '📚 Browse Subjects & Materials', callback_data: 'browse_courses' },
            ],
            [
              { text: '🌐 Open Website Preview', callback_data: 'open_website' },
            ],
            [
              { text: '🔍 Search Materials', callback_data: 'search_prompt' },
              { text: '📖 My Subjects', callback_data: 'mycourses' },
            ],
            [
              { text: '👤 Student Profile', callback_data: 'view_profile' },
              { text: '❓ How to Use & FAQ', callback_data: 'faq_home' },
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
