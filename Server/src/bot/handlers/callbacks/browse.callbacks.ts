/**
 * Browse-related callback handlers
 * Handles course browsing, filtering, and resource navigation
 */

import { handleSmartBrowse, handleQuickGradeSelection } from '../simplifiedBrowseHandler.js';
import { 
  handleLevelSelection, 
  handleGradeSelection, 
  handleStreamSelection 
} from '../browseCoursesHandler.js';
import { handleViewResources, handleDownloadResource, handleFilterResources } from '../resourcesHandler.js';
import { formatDivider } from '../../utils/ui.js';

export async function handleBrowseCallbacks(bot: any, query: any, data: string): Promise<void> {
  const chatId = query.message.chat.id;
  const userId = query.from.id.toString();

  // Browse courses
  if (data === 'browse_courses') {
    await handleSmartBrowse(bot, { chat: { id: chatId } }, userId);
    return;
  }

  // Quick browse - Show all grades
  if (data === 'browse_all_grades') {
    const text = `📚 <b>QUICK BROWSE</b>\n` +
      `${formatDivider()}\n` +
      `Select your grade to view subjects instantly:\n` +
      `${formatDivider()}`;

    await bot.sendMessage(chatId, text, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '9️⃣ Grade 9', callback_data: 'quick_grade_9' },
            { text: '🔟 Grade 10', callback_data: 'quick_grade_10' },
          ],
          [
            { text: '1️⃣1️⃣ Grade 11 Natural', callback_data: 'quick_grade_11_natural' },
            { text: '1️⃣1️⃣ Grade 11 Social', callback_data: 'quick_grade_11_social' },
          ],
          [
            { text: '1️⃣2️⃣ Grade 12 Natural', callback_data: 'quick_grade_12_natural' },
            { text: '1️⃣2️⃣ Grade 12 Social', callback_data: 'quick_grade_12_social' },
          ],
          [
            { text: '🎓 Freshman', callback_data: 'quick_freshman' },
            { text: '📖 Remedial', callback_data: 'quick_remedial' },
          ],
          [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
        ],
      },
    });
    return;
  }

  // Quick grade selection
  if (data.startsWith('quick_')) {
    const gradeKey = data.replace('quick_', '');
    await handleQuickGradeSelection(bot, chatId, gradeKey);
    return;
  }

  // Level selection (high_school/university)
  if (data.startsWith('level_')) {
    const level = data.replace('level_', '');
    await handleLevelSelection(bot, chatId, level);
    return;
  }

  // Grade selection
  if (data.startsWith('grade_')) {
    const gradeName = data.replace('grade_', '');
    await handleGradeSelection(bot, chatId, gradeName);
    return;
  }

  // Stream selection
  if (data.startsWith('stream_')) {
    const parts = data.replace('stream_', '').split('|');
    const gradeName = parts[0];
    const streamCode = parts[1];
    await handleStreamSelection(bot, chatId, gradeName, streamCode);
    return;
  }

  // View resources
  if (data.startsWith('resources_')) {
    const subjectId = data.replace('resources_', '');
    await handleViewResources(bot, chatId, subjectId, userId);
    return;
  }

  // Download resource
  if (data.startsWith('download_')) {
    const resourceId = data.replace('download_', '');
    await handleDownloadResource(bot, chatId, resourceId, userId);
    return;
  }

  // Filter resources
  if (data.startsWith('filter_')) {
    const parts = data.replace('filter_', '').split('|');
    const subjectId = parts[0];
    const type = parts[1];
    await handleFilterResources(bot, chatId, subjectId, type, userId);
    return;
  }
}
