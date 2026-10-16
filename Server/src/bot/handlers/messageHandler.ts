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
  if (text === '📚 Browse Subjects' || text === '📚 Browse Courses') {
    await handleBrowseCourses(bot, msg);
  } else if (text === '📖 My Subjects' || text === '📖 My Courses') {
    await handleMyCourses(bot, msg);
  } else if (text === '🔍 Search' || text === '🔍 Search Materials') {
    await handleSearchPrompt(bot, chatId);
  } else if (text === '👤 Profile' || text === '👤 My Profile') {
    await handleProfile(bot, msg);
  } else if (text === '❓ Help' || text === '❓ Help & FAQ') {
    await handleHelp(bot, msg);
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
