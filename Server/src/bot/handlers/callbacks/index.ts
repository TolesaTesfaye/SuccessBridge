/**
 * Callback Query Router
 * Routes callback queries to appropriate handlers based on prefix
 */

import { handlePaymentCallbacks } from './payment.callbacks.js';
import { handleBrowseCallbacks } from './browse.callbacks.js';
import { handleProfileCallbacks } from './profile.callbacks.js';
import { handleCommonCallbacks } from './common.callbacks.js';
import { handleAdminCallbacks } from './admin.callbacks.js';
import { validateCallbackData } from '../../middleware/validation.middleware.js';
import { logger } from '../../middleware/logger.middleware.js';
import { isProfileComplete, isCallbackAllowed, sendProfileEnforcementMessageForCallback } from '../../middleware/profileEnforcement.middleware.js';

/**
 * Main callback query handler with routing logic
 */
export async function handleCallbackQuery(bot: any, query: any): Promise<void> {
  const chatId = query.message?.chat.id;
  const data = query.data;
  const userId = query.from?.id?.toString();

  if (!chatId || !data) return;

  // Validate callback data
  validateCallbackData(data);

  // Log callback
  logger.logCallback(data, userId, query.from?.username, chatId);

  try {
    // Answer callback query to remove loading state
    await bot.answerCallbackQuery(query.id).catch(() => {});

    // Check profile completion BEFORE processing any callback (except allowed ones)
    if (!isCallbackAllowed(data)) {
      const profileComplete = await isProfileComplete(userId || '');
      if (!profileComplete) {
        await bot.answerCallbackQuery(query.id, {
          text: '⚠️ Please complete your profile first',
          show_alert: true
        });
        await sendProfileEnforcementMessageForCallback(bot, query);
        return;
      }
    }

    // Route to appropriate handler based on data prefix/type
    
    // Payment-related callbacks
    if (
      data === 'unlock_resources' ||
      data === 'payment_info' ||
      data === 'subscribe_now' ||
      data === 'my_payments' ||
      data === 'ready_to_pay' ||
      data === 'payment_faq' ||
      data === 'payment_instructions' ||
      data === 'confirm_payment_proceed' ||
      data.startsWith('approve_payment_') ||
      data.startsWith('reject_payment_')
    ) {
      await handlePaymentCallbacks(bot, query, data);
      return;
    }

    // Browse-related callbacks
    if (
      data === 'browse_courses' ||
      data === 'browse_all_grades' ||
      data.startsWith('quick_') ||
      data.startsWith('level_') ||
      data.startsWith('grade_') ||
      data.startsWith('stream_') ||
      data.startsWith('course_') ||
      data.startsWith('resources_') ||
      data.startsWith('download_') ||
      data.startsWith('filter_')
    ) {
      await handleBrowseCallbacks(bot, query, data);
      return;
    }

    // Profile-related callbacks
    if (
      data === 'view_profile' ||
      data === 'setup_profile' ||
      data === 'setup_highschool' ||
      data === 'setup_university' ||
      data === 'setup_remedial' ||
      data === 'setup_freshman' ||
      data === 'user_settings' ||
      data.startsWith('setup_grade_')
    ) {
      await handleProfileCallbacks(bot, query, data);
      return;
    }

    // Admin-related callbacks
    if (data.startsWith('admin_')) {
      await handleAdminCallbacks(bot, query, data, userId);
      return;
    }

    // Common callbacks (main_menu, help, mycourses, search, etc.)
    await handleCommonCallbacks(bot, query, data);

  } catch (error) {
    console.error('Error in callback handler:', error);
    await bot.sendMessage(chatId, '❌ <i>An error occurred. Please try again.</i>', { parse_mode: 'HTML' });
  }
}
