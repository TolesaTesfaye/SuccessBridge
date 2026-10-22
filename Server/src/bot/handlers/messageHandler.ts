import { handleBrowseCourses } from './browseCoursesHandler.js';
import { handleMyCourses } from './myCoursesHandler.js';
import { handleProfile } from './profileHandler.js';
import { handleHelp } from './helpHandler.js';
import { handleSearchPrompt, handleLiveSearch } from './searchHandler.js';
import { handleAdminCommand } from '../admin/index.js';
import { stateManager } from '../state/stateManager.js';
import { handleFileUpload, handleTitleInput } from '../flows/resourceUpload.flow.js';
import { logger } from '../middleware/logger.middleware.js';

export async function handleMessage(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  const text = msg.text?.trim();

  // Check if user is in any active flow
  const activeFlows = stateManager.getUserFlows(userId);

  if (activeFlows.length > 0) {
    // Handle flow-specific messages
    for (const flow of activeFlows) {
      switch (flow.flowType) {
        case 'resource_upload':
          // Handle file upload or title input
          if (msg.document || msg.photo) {
            await handleFileUpload(bot, msg);
            return;
          } else if (text) {
            await handleTitleInput(bot, msg);
            return;
          }
          break;

        case 'user_registration':
          break;

        case 'broadcast_message':
          break;
      }
    }
  }

  // No active flow - handle normal messages
  if (!text) return;

  // Handle menu button clicks
  if (text === '📚 Browse Materials' || text === '📚 Browse Subjects' || text === '📚 Browse Courses') {
    await handleBrowseCourses(bot, msg);
  } else if (text === '📖 My Subjects' || text === '📖 My Courses') {
    await handleMyCourses(bot, msg);
  } else if (text === '🔍 Search Materials' || text === '🔍 Search') {
    await handleSearchPrompt(bot, chatId);
  } else if (text === '👤 Student ID' || text === '👤 Profile' || text === '👤 My Profile') {
    await handleProfile(bot, msg);
  } else if (text === '❓ Guide & Help' || text === '❓ Help & Guide' || text === '❓ Help & FAQ' || text === '❓ Help') {
    await handleHelp(bot, msg);
  } else if (text === '🌐 Read on Website' || text === '🌐 Open Website' || text === '🌐 Website') {
    // Send an inspiring preview image of the website first
    const previewImageUrl = `${process.env.BACKEND_URL || 'https://success-bridge-server.onrender.com'}/public/website_preview.jpg`;
    const webPhotoCaption =
      `✨ <b>SuccessBridge Learning Center</b>\n\n` +
      `📖 Interactive reading • 📝 Quizzes • 📊 Visual diagrams\n` +
      `<i>All on a beautiful, fast web platform — made for you!</i>`;

    try {
      await bot.sendPhoto(chatId, previewImageUrl, {
        caption: webPhotoCaption,
        parse_mode: 'HTML',
      });
    } catch (_) {
      // If photo fails, fall through to text card silently
    }

    const webCard = `🌐 <b>SUCCESSBRIDGE DIGITAL LEARNING PLATFORM</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Experience the best way to study with our modern web portal:\n\n` +
      `✨ <b>What you can do on the website:</b>\n` +
      `• 📖 <b>Interactive Reader:</b> Read textbooks, slides, and notes in full screen with zoom and bookmarking.\n` +
      `• 📝 <b>Practice Quizzes:</b> Test your understanding with instant scores and feedback.\n` +
      `• 📊 <b>Visual Diagrams:</b> Understand concepts through charts, graphs, and visual aids.\n` +
      `• 📈 <b>Academic Progress:</b> Track completed lessons and university preparation.\n` +
      `• 🎓 <b>Tailored Portals:</b> High school streams and university departments organized for you.\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👇 <i>Tap below to launch the web platform:</i>`;

    await bot.sendMessage(chatId, webCard, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 Open Website (Read Online)', url: 'https://success-bridge-ten.vercel.app' }],
          [{ text: '📚 Browse Subjects on Bot', callback_data: 'browse_courses' }],
          [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
        ],
      },
    });
  } else if (text === '⚡ Admin Panel') {
    await handleAdminCommand(bot, msg);
  } else if (text.startsWith('/cancel')) {
    await bot.sendMessage(chatId, 'Nothing to cancel. Use /help to see available commands.');
  } else if (!text.startsWith('/')) {
    // Handle live instant search for non-command text
    logger.logMessage(text, userId, msg.from.username, chatId);
    await handleLiveSearch(bot, msg);
  }
}
