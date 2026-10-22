import { getCourseById, getCourseResources, enrollInCourse } from '../services/courseService.js';
import { getUserByTelegramId } from '../services/userService.js';
import { 
  handleBrowseCourses, 
  handleLevelSelection, 
  handleGradeSelection, 
  handleStreamSelection 
} from './browseCoursesHandler.js';
import { handleViewResources, handleDownloadResource, handleFilterResources } from './resourcesHandler.js';
import { handleProfile } from './profileHandler.js';
import { handleHelp, handleFaqCallback } from './helpHandler.js';
import { handleSearchPrompt, handleQuickSearch } from './searchHandler.js';
import { handleMyCourses } from './myCoursesHandler.js';
import { handleAdminCallback } from '../admin/index.js';
import { validateCallbackData } from '../middleware/validation.middleware.js';
import { logger } from '../middleware/logger.middleware.js';
import { escapeHtml, formatDivider, getMainKeyboard, formatRoleBadge, getWebUrl } from '../utils/ui.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handleCallbackQuery(
  bot: any,
  query: any
): Promise<void> {
  const chatId = query.message?.chat.id;
  const data = query.data;
  const messageId = query.message?.message_id;

  if (!chatId || !data) return;

  // Validate callback data
  validateCallbackData(data);

  // Log callback
  logger.logCallback(data, query.from?.id?.toString(), query.from?.username, chatId);

  try {
    // Answer callback query to remove loading state
    await bot.answerCallbackQuery(query.id).catch(() => {});

    if (data.startsWith('level_')) {
      const level = data.replace('level_', '');
      await handleLevelSelection(bot, chatId, level);
    } else if (data.startsWith('grade_')) {
      const gradeName = data.replace('grade_', '');
      await handleGradeSelection(bot, chatId, gradeName);
    } else if (data.startsWith('stream_')) {
      const parts = data.replace('stream_', '').split('|');
      const gradeName = parts[0];
      const streamCode = parts[1];
      await handleStreamSelection(bot, chatId, gradeName, streamCode);
    } else if (data.startsWith('course_')) {
      const courseId = data.replace('course_', '');
      await handleCourseDetails(bot, chatId, courseId, query.from.id.toString());
    } else if (data.startsWith('mycourse_')) {
      const courseId = data.replace('mycourse_', '');
      await handleCourseMaterials(bot, chatId, courseId);
    } else if (data.startsWith('resources_')) {
      const subjectId = data.replace('resources_', '');
      await handleViewResources(bot, chatId, subjectId, query.from.id.toString());
    } else if (data.startsWith('download_')) {
      const resourceId = data.replace('download_', '');
      await handleDownloadResource(bot, chatId, resourceId, query.from.id.toString());
    } else if (data.startsWith('filter_')) {
      const parts = data.replace('filter_', '').split('|');
      const subjectId = parts[0];
      const type = parts[1];
      await handleFilterResources(bot, chatId, subjectId, type, query.from.id.toString());
    } else if (data.startsWith('enroll_')) {
      const courseId = data.replace('enroll_', '');
      await handleEnrollment(bot, chatId, courseId, query.from.id.toString());
    } else if (data === 'view_profile') {
      const userMsg = { chat: { id: chatId }, from: query.from };
      await handleProfile(bot, userMsg, query.from.id.toString());
    } else if (data === 'search_prompt') {
      await handleSearchPrompt(bot, chatId);
    } else if (data.startsWith('quick_search_')) {
      const queryText = data.replace('quick_search_', '');
      await handleQuickSearch(bot, chatId, queryText);
    } else if (data === 'user_settings') {
      const settingsCard = `⚙️ <b>STUDENT SETTINGS & PREFERENCES</b>\n` +
        `${formatDivider()}\n` +
        `🆔 <b>Telegram ID:</b> <code>${escapeHtml(query.from.id.toString())}</code>\n` +
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
    } else if (data === 'mycourses') {
      const userMsg = { chat: { id: chatId }, from: query.from };
      await handleMyCourses(bot, userMsg, query.from.id.toString());
    } else if (data === 'faq_home' || data === 'help_support') {
      const userMsg = { chat: { id: chatId }, from: query.from };
      await handleHelp(bot, userMsg);
    } else if (data.startsWith('faq_')) {
      await handleFaqCallback(bot, chatId, messageId, data);
    } else if (data === 'browse_courses') {
      await handleBrowseCourses(bot, { chat: { id: chatId } });
    } else if (data === 'open_website') {
      // Handle website preview - send screenshot image
      await handleWebsitePreview(bot, chatId);
    } else if (data === 'main_menu') {
      const user = await getUserByTelegramId(query.from.id.toString());
      const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

      const menuText = `🏠 <b>MAIN ACADEMIC DASHBOARD</b>\n` +
        `${formatDivider()}\n` +
        `Welcome back! Select an option from the menu buttons below, or use the quick actions:\n` +
        `${formatDivider()}`;

      await bot.sendMessage(chatId, menuText, {
        parse_mode: 'HTML',
        reply_markup: getMainKeyboard(isAdmin),
      });

      await bot.sendMessage(chatId, '⚡ <b>Quick Shortcuts:</b>', {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '📚 Browse All Levels', callback_data: 'browse_courses' },
              { text: '🔍 Search Materials', callback_data: 'search_prompt' },
            ],
            [
              { text: '📖 My Subjects', callback_data: 'mycourses' },
              { text: '👤 Student ID', callback_data: 'view_profile' },
            ],
            [
              { text: '🌐 Website Preview', callback_data: 'open_website' },
              { text: '❓ Help & FAQ', callback_data: 'faq_home' },
            ],
          ],
        },
      });
    } else if (data.startsWith('admin_')) {
      await handleAdminCallback(bot, chatId, data, query.from.id.toString());
    }
  } catch (error) {
    console.error('Error in callback handler:', error);
    await bot.sendMessage(chatId, '❌ <i>An error occurred. Please try again.</i>', { parse_mode: 'HTML' });
  }
}

async function handleCourseDetails(
  bot: any,
  chatId: number,
  courseId: string,
  telegramUserId: string
): Promise<void> {
  const course = await getCourseById(courseId);

  if (!course) {
    await bot.sendMessage(chatId, '❌ <i>Subject not found.</i>', { parse_mode: 'HTML' });
    return;
  }

  const levelInfo = course.grade?.name || course.department?.name || 'All levels';
  const streamInfo = course.stream?.name || '';
  
  let backData = 'browse_courses';
  if (course.grade?.name && course.stream?.name) {
    const streamType = course.stream.name.toLowerCase().includes('natural') ? 'natural' : 'social';
    backData = `stream_${course.grade.name}|${streamType}`;
  } else if (course.grade?.name) {
    backData = `grade_${course.grade.name}`;
  }

  const message = `📚 <b>${escapeHtml(course.name)}</b>\n` +
    `${formatDivider()}\n` +
    `🔖 <b>Subject Code:</b> <code>${escapeHtml(course.code || 'N/A')}</code>\n` +
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
        [{ text: '📂 Explore Study Materials', callback_data: `resources_${courseId}` }],
        [{ text: '🌐 Website Preview', callback_data: 'open_website' }],
        [
          { text: '🔙 Back to Subjects', callback_data: backData },
          { text: '🏠 Main Menu', callback_data: 'main_menu' },
        ],
      ],
    },
  });
}

async function handleCourseMaterials(
  bot: any,
  chatId: number,
  courseId: string
): Promise<void> {
  const resources = await getCourseResources(courseId);

  if (!resources || resources.length === 0) {
    await bot.sendMessage(
      chatId,
      `📂 <i>No materials registered for this subject yet.</i>`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[{ text: '🔙 Back to Subjects', callback_data: 'browse_courses' }]],
        },
      }
    );
    return;
  }

  // Redirect to full resources handler for rich categorized view
  await handleViewResources(bot, chatId, courseId, '');
}

async function handleEnrollment(
  bot: any,
  chatId: number,
  courseId: string,
  telegramUserId: string
): Promise<void> {
  const user = await getUserByTelegramId(telegramUserId);

  if (!user) {
    await bot.sendMessage(chatId, '❌ <i>User not found. Please use /start to register.</i>', { parse_mode: 'HTML' });
    return;
  }

  const result = await enrollInCourse(user.id, courseId);
  await bot.sendMessage(chatId, `✅ <b>${escapeHtml(result.message)}</b>`, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🔙 Back to Subjects', callback_data: 'browse_courses' }],
        [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
      ],
    },
  });
}

async function handleWebsitePreview(bot: any, chatId: number): Promise<void> {
  try {
    // Path to the screenshot image in the public folder
    const publicDir = path.resolve(__dirname, '../../../public');
    const screenshotPath = path.join(publicDir, 'website_preview.jpg');

    // Check if the image exists
    if (!fs.existsSync(screenshotPath)) {
      console.error('Screenshot not found at:', screenshotPath);
      await bot.sendMessage(
        chatId,
        '❌ <i>Website preview image not found.</i>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    // Send the screenshot with a caption
    await bot.sendPhoto(chatId, screenshotPath, {
      caption: 
        `🌐 <b>SuccessBridge Web Platform Preview</b>\n` +
        `${formatDivider()}\n` +
        `📚 Access our full-featured web platform for:\n` +
        `• Interactive reading experience\n` +
        `• Chapter quizzes & practice tests\n` +
        `• Bookmark your progress\n` +
        `• Study analytics & performance tracking\n` +
        `${formatDivider()}\n` +
        `👇 Click below to visit the website`,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🌐 Visit Website Now', url: getWebUrl() }],
          [{ text: '🏠 Back to Main Menu', callback_data: 'main_menu' }],
        ],
      },
    });
  } catch (error) {
    console.error('Error sending website preview:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>Failed to send website preview. Please try again.</i>',
      { parse_mode: 'HTML' }
    );
  }
}
