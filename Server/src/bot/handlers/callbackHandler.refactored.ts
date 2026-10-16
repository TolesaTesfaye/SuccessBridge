/**
 * Refactored Callback Handler using Pattern-Based Router
 * Clean, maintainable callback routing
 */

import { callbackRouter, CallbackParams } from './callbackRouter.js';
import { 
  handleBrowseCourses, 
  handleLevelSelection, 
  handleGradeSelection, 
  handleStreamSelection 
} from './browseCoursesHandler.js';
import { 
  handleViewResources, 
  handleDownloadResource, 
  handleFilterResources 
} from './resourcesHandler.js';
import { handleAdminCallback } from '../admin/index.js';
import { getCourseById } from '../services/courseService.js';
import { getUserByTelegramId } from '../services/userService.js';
import { ResourceNotFoundError } from './errors/index.js';
import {
  handleSubjectSelection,
  handleTypeSelection,
  confirmUpload,
  cancelUpload,
  goBackStep,
} from '../flows/resourceUpload.flow.js';

/**
 * Initialize callback routes
 */
export function initializeCallbackRoutes(): void {
  // ===== BROWSING & NAVIGATION =====
  
  callbackRouter.register(
    'level_:level',
    async (bot, query, params) => {
      await handleLevelSelection(bot, query.message.chat.id, params.level);
    },
    'Select education level'
  );

  callbackRouter.register(
    'grade_:grade',
    async (bot, query, params) => {
      await handleGradeSelection(bot, query.message.chat.id, params.grade);
    },
    'Select grade'
  );

  callbackRouter.register(
    'stream_:grade|:stream',
    async (bot, query, params) => {
      await handleStreamSelection(bot, query.message.chat.id, params.grade, params.stream);
    },
    'Select stream'
  );

  callbackRouter.register(
    'browse_courses',
    async (bot, query) => {
      await handleBrowseCourses(bot, { chat: { id: query.message.chat.id } });
    },
    'Browse courses'
  );

  callbackRouter.register(
    'main_menu',
    async (bot, query) => {
      await bot.sendMessage(query.message.chat.id, '🏠 Main Menu', {
        reply_markup: {
          keyboard: [
            [{ text: '📚 Browse Courses' }, { text: '📖 My Courses' }],
            [{ text: '👤 Profile' }, { text: '❓ Help' }],
          ],
          resize_keyboard: true,
        },
      });
    },
    'Main menu'
  );

  // ===== COURSE DETAILS =====

  callbackRouter.register(
    'course_:courseId',
    async (bot, query, params) => {
      await handleCourseDetails(bot, query.message.chat.id, params.courseId, query.from.id.toString());
    },
    'View course details'
  );

  callbackRouter.register(
    'mycourse_:courseId',
    async (bot, query, params) => {
      await handleCourseMaterials(bot, query.message.chat.id, params.courseId);
    },
    'View my course materials'
  );

  // ===== RESOURCES =====

  callbackRouter.register(
    'resources_:subjectId',
    async (bot, query, params) => {
      await handleViewResources(bot, query.message.chat.id, params.subjectId, query.from.id.toString());
    },
    'View subject resources'
  );

  callbackRouter.register(
    'download_:resourceId',
    async (bot, query, params) => {
      await handleDownloadResource(bot, query.message.chat.id, params.resourceId, query.from.id.toString());
    },
    'Download resource'
  );

  callbackRouter.register(
    'filter_:subjectId|:type',
    async (bot, query, params) => {
      await handleFilterResources(
        bot,
        query.message.chat.id,
        params.subjectId,
        params.type,
        query.from.id.toString()
      );
    },
    'Filter resources by type'
  );

  // ===== RESOURCE UPLOAD FLOW =====

  callbackRouter.register(
    'upload_subject_:subjectId',
    async (bot, query, params) => {
      await handleSubjectSelection(bot, query, params.subjectId);
    },
    'Select subject for upload'
  );

  callbackRouter.register(
    'upload_type_:type',
    async (bot, query, params) => {
      await handleTypeSelection(bot, query, params.type);
    },
    'Select resource type for upload'
  );

  callbackRouter.register(
    'upload_confirm',
    async (bot, query) => {
      await confirmUpload(bot, query);
    },
    'Confirm resource upload'
  );

  callbackRouter.register(
    'upload_back',
    async (bot, query) => {
      await goBackStep(bot, query);
    },
    'Go back one step in upload'
  );

  callbackRouter.register(
    'admin_upload_cancel',
    async (bot, query) => {
      await cancelUpload(bot, query.message.chat.id, query.from.id.toString());
    },
    'Cancel resource upload'
  );

  // ===== ADMIN ROUTES =====
  
  callbackRouter.register(
    'admin_*',
    async (bot, query, params) => {
      // Route all admin callbacks to admin handler
      await handleAdminCallback(bot, query.message.chat.id, query.data, query.from.id.toString());
    },
    'Admin routes'
  );

  // ===== LEGACY / OTHER =====

  callbackRouter.register(
    'noop',
    async () => {
      // No operation - for disabled buttons
    },
    'No operation'
  );

  callbackRouter.register(
    'help_support',
    async (bot, query) => {
      await bot.sendMessage(
        query.message.chat.id,
        '💬 *Need Help?*\n\n' +
        'Visit our website: https://success-bridge-ten.vercel.app\n' +
        'Or use /help to see available commands.',
        { parse_mode: 'Markdown' }
      );
    },
    'Help and support'
  );
}

/**
 * Main callback query handler
 */
export async function handleCallbackQuery(bot: any, query: any): Promise<void> {
  await callbackRouter.route(bot, query);
}

/**
 * Handle course details
 */
async function handleCourseDetails(
  bot: any,
  chatId: number,
  courseId: string,
  telegramUserId: string
): Promise<void> {
  const course = await getCourseById(courseId);

  if (!course) {
    throw new ResourceNotFoundError('Subject not found.');
  }

  const levelInfo = course.grade?.name || course.department?.name || 'All levels';
  const streamInfo = course.stream?.name || '';
  
  const message = `
📚 *${course.name}*
🔖 Code: ${course.code}

📊 Level: ${levelInfo}${streamInfo ? ` - ${streamInfo}` : ''}

💡 *About this subject:*
This subject is part of the SuccessBridge learning platform. Access includes study materials, practice questions, and more.

⚠️ *Note:* Subject access requires payment through the website.
  `;

  await bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '📄 View Resources', callback_data: `resources_${courseId}` }],
        [{ text: '🔙 Back to Subjects', callback_data: 'browse_courses' }],
      ],
    },
  });
}

/**
 * Handle course materials
 */
async function handleCourseMaterials(bot: any, chatId: number, courseId: string): Promise<void> {
  await bot.sendMessage(
    chatId,
    '📂 Course materials feature coming soon!\n\n' +
    'For now, use the Browse feature to access resources.',
    {
      reply_markup: {
        inline_keyboard: [[{ text: '🔙 Back', callback_data: 'browse_courses' }]],
      },
    }
  );
}

// Initialize routes on module load
initializeCallbackRoutes();

export default handleCallbackQuery;
