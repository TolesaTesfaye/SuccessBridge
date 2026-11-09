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
import { formatDivider, escapeHtml, getResourceIcon } from '../../utils/ui.js';
import Subject from '../../../models/Subject.js';
import Grade from '../../../models/Grade.js';
import Stream from '../../../models/Stream.js';

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
            { text: '📚 Grade 9', callback_data: 'quick_grade_9' },
            { text: '📖 Grade 10', callback_data: 'quick_grade_10' },
          ],
          [
            { text: '📝 Grade 11 Natural', callback_data: 'quick_grade_11_natural' },
            { text: '📘 Grade 11 Social', callback_data: 'quick_grade_11_social' },
          ],
          [
            { text: '🎓 Grade 12 Natural', callback_data: 'quick_grade_12_natural' },
            { text: '📙 Grade 12 Social', callback_data: 'quick_grade_12_social' },
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

  // Course/Subject details
  if (data.startsWith('course_')) {
    const subjectId = data.replace('course_', '');
    await handleCourseDetails(bot, chatId, subjectId, userId);
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


/**
 * Handle course/subject details
 */
async function handleCourseDetails(
  bot: any,
  chatId: number,
  subjectId: string,
  userId: string
): Promise<void> {
  try {
    const subject = await Subject.findByPk(subjectId, {
      include: [
        {
          model: Grade,
          as: 'grade',
          attributes: ['name']
        },
        {
          model: Stream,
          as: 'stream',
          attributes: ['name', 'code']
        }
      ]
    });

    if (!subject) {
      await bot.sendMessage(chatId, '❌ <i>Subject not found.</i>', { parse_mode: 'HTML' });
      return;
    }

    const levelInfo = (subject as any).grade?.name || 'All levels';
    const streamInfo = (subject as any).stream?.name || '';
    
    let backData = 'browse_courses';
    if ((subject as any).grade?.name && (subject as any).stream?.name) {
      const streamType = (subject as any).stream.name.toLowerCase().includes('natural') ? 'natural' : 'social';
      backData = `stream_${(subject as any).grade.name}|${streamType}`;
    } else if ((subject as any).grade?.name) {
      backData = `grade_${(subject as any).grade.name}`;
    }

    const message = `📚 <b>${escapeHtml(subject.name)}</b>\n` +
      `${formatDivider()}\n` +
      `🔖 <b>Subject Code:</b> <code>${escapeHtml(subject.code || 'N/A')}</code>\n` +
      `📊 <b>Level:</b> ${escapeHtml(levelInfo)}${streamInfo ? ` • ${escapeHtml(streamInfo)}` : ''}\n\n` +
      `💡 <b>Academic Materials Available:</b>\n` +
      `• Complete lecture presentation slides\n` +
      `• Chapter summaries & handout notes\n` +
      `• Past national exams with answer keys\n` +
      `• Textbooks and module chapters\n` +
      `${formatDivider()}`;

    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📂 Explore Study Materials', callback_data: `resources_${subjectId}` }],
          [{ text: '🌐 Website Preview', callback_data: 'open_website' }],
          [
            { text: '🔙 Back to Subjects', callback_data: backData },
            { text: '🏠 Main Menu', callback_data: 'main_menu' },
          ],
        ],
      },
    });
  } catch (error) {
    console.error('Error in handleCourseDetails:', error);
    await bot.sendMessage(chatId, '❌ <i>An error occurred. Please try again.</i>', { parse_mode: 'HTML' });
  }
}
