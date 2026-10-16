import { getUserCourses } from '../services/courseService.js';
import { getUserByTelegramId } from '../services/userService.js';
import { escapeHtml, formatDivider } from '../utils/ui.js';

export async function handleMyCourses(bot: any, msg: any, explicitUserId?: string): Promise<void> {
  const chatId = msg.chat?.id || msg.chatId;
  const telegramUserId = explicitUserId || msg.from?.id?.toString() || '';

  try {
    const user = await getUserByTelegramId(telegramUserId);

    if (!user) {
      await bot.sendMessage(
        chatId,
        '❌ <i>User not found. Please use /start to register.</i>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    const subjects = await getUserCourses(user.id);

    if (!subjects || subjects.length === 0) {
      const emptyText = `📖 <b>YOUR ENROLLED SUBJECTS</b>\n` +
        `${formatDivider()}\n` +
        `<i>You do not have active access to any subjects yet.</i>\n\n` +
        `💡 <b>How to unlock access:</b>\n` +
        `Visit our platform to subscribe and unlock complete learning materials, video lectures, and past exams.\n` +
        `${formatDivider()}`;

      await bot.sendMessage(
        chatId,
        emptyText,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '📚 Browse All Subjects', callback_data: 'browse_courses' }],
              [{ text: '🌐 Subscribe on Web Portal', url: 'https://success-bridge-ten.vercel.app' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
      return;
    }

    // Create inline keyboard with enrolled subjects
    const keyboard: any[][] = subjects.map((subject: any) => [
      {
        text: `📖 ${subject.title} (${subject.progress || 0}%)`,
        callback_data: `mycourse_${subject.id}`,
      },
    ]);

    keyboard.push([
      { text: '🔍 Search Materials', callback_data: 'search_prompt' },
      { text: '📚 Browse All Levels', callback_data: 'browse_courses' },
    ]);
    keyboard.push([
      { text: '🏠 Main Menu', callback_data: 'main_menu' },
    ]);

    const header = `📖 <b>YOUR ENROLLED SUBJECTS (${subjects.length})</b>\n` +
      `${formatDivider()}\n` +
      `Select a subject below to view lecture slides, notes, and exams:\n` +
      `${formatDivider()}`;

    await bot.sendMessage(
      chatId,
      header,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: keyboard,
        },
      }
    );
  } catch (error) {
    console.error('Error in /mycourses handler:', error);
    await bot.sendMessage(chatId, '❌ <i>Error loading your subjects. Please try again.</i>', { parse_mode: 'HTML' });
  }
}
