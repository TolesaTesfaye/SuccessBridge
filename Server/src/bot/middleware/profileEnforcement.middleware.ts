/**
 * Profile Enforcement Middleware
 * 
 * Enforces that users must complete their profile before using any bot features.
 * Only allows /start, /setupprofile commands and profile setup callbacks when profile is incomplete.
 */

import { getUserByTelegramId } from '../services/userService.js';
import { deriveStudentCategory } from '../../services/studentCategoryService.js';

/**
 * Check if user has completed their profile
 */
export async function isProfileComplete(telegramId: string): Promise<boolean> {
  try {
    const user = await getUserByTelegramId(telegramId);
    if (!user) return false;
    
    const category = deriveStudentCategory(user);
    return category !== null;
  } catch (error) {
    console.error('Error checking profile completion:', error);
    return false;
  }
}

/**
 * Commands that are allowed without profile completion
 */
const ALLOWED_COMMANDS_WITHOUT_PROFILE = [
  '/start',
  '/setupprofile',
  '/getid'
];

/**
 * Callback data patterns that are allowed without profile completion
 */
const ALLOWED_CALLBACKS_WITHOUT_PROFILE = [
  'setup_profile',
  'setup_highschool',
  'setup_university',
  'setup_grade_9',
  'setup_grade_10',
  'setup_grade_11',
  'setup_grade_12',
  'setup_remedial',
  'setup_freshman',
  'main_menu' // Allow returning to main menu to see the enforcement message
];

/**
 * Check if a command is allowed without profile completion
 */
export function isCommandAllowed(command: string): boolean {
  return ALLOWED_COMMANDS_WITHOUT_PROFILE.some(cmd => command.startsWith(cmd));
}

/**
 * Check if a callback is allowed without profile completion
 */
export function isCallbackAllowed(callbackData: string): boolean {
  return ALLOWED_CALLBACKS_WITHOUT_PROFILE.some(pattern => 
    callbackData === pattern || callbackData.startsWith(pattern)
  );
}

/**
 * Send profile completion enforcement message
 */
export async function sendProfileEnforcementMessage(bot: any, chatId: number, context: 'command' | 'callback' = 'command'): Promise<void> {
  const message = context === 'callback'
    ? `⚠️ <b>Profile Setup Required</b>\n\n` +
      `Please complete your profile first to use this feature.\n\n` +
      `Click the button below to set up your profile:`
    : `⚠️ <b>Profile Setup Required</b>\n\n` +
      `You must complete your student profile before using this feature.\n\n` +
      `Your profile helps us:\n` +
      `• 📚 Show you relevant study materials\n` +
      `• 💳 Process your payments correctly\n` +
      `• 🎯 Personalize your learning experience\n\n` +
      `Click the button below to set up your profile:`;

  await bot.sendMessage(chatId, message, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '✏️ Complete Profile Now', callback_data: 'setup_profile' }]
      ]
    }
  });
}

/**
 * Send profile completion enforcement message for callback queries
 */
export async function sendProfileEnforcementMessageForCallback(bot: any, query: any): Promise<void> {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  try {
    // Try to edit the existing message
    await bot.editMessageText(
      `⚠️ <b>Profile Setup Required</b>\n\n` +
      `Please complete your profile first to use this feature.\n\n` +
      `Click the button below to set up your profile:`,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '✏️ Complete Profile Now', callback_data: 'setup_profile' }]
          ]
        }
      }
    );
  } catch (error) {
    // If editing fails, send a new message
    await sendProfileEnforcementMessage(bot, chatId, 'callback');
  }
}

/**
 * Middleware wrapper for command handlers
 * Usage: wrapCommandWithProfileCheck(handler)
 */
export function wrapCommandWithProfileCheck<T extends (bot: any, msg: any, ...args: any[]) => Promise<void>>(
  handler: T,
  allowWithoutProfile: boolean = false
): T {
  return (async (bot: any, msg: any, ...args: any[]) => {
    const telegramUserId = msg.from?.id?.toString();
    const chatId = msg.chat.id;
    const command = msg.text?.split(' ')[0] || '';

    // Skip check if this command is explicitly allowed or handler allows it
    if (allowWithoutProfile || isCommandAllowed(command)) {
      return handler(bot, msg, ...args);
    }

    // Check if profile is complete
    if (!telegramUserId) {
      await bot.sendMessage(chatId, '❌ Unable to identify user. Please try again.');
      return;
    }

    const profileComplete = await isProfileComplete(telegramUserId);
    
    if (!profileComplete) {
      await sendProfileEnforcementMessage(bot, chatId, 'command');
      return;
    }

    // Profile is complete, proceed with handler
    return handler(bot, msg, ...args);
  }) as T;
}

/**
 * Middleware wrapper for callback handlers
 * Usage: wrapCallbackWithProfileCheck(handler)
 */
export function wrapCallbackWithProfileCheck<T extends (bot: any, query: any, ...args: any[]) => Promise<void>>(
  handler: T,
  allowWithoutProfile: boolean = false
): T {
  return (async (bot: any, query: any, ...args: any[]) => {
    const telegramUserId = query.from?.id?.toString();
    const callbackData = query.data;

    // Skip check if this callback is explicitly allowed or handler allows it
    if (allowWithoutProfile || isCallbackAllowed(callbackData)) {
      return handler(bot, query, ...args);
    }

    // Check if profile is complete
    if (!telegramUserId) {
      await bot.answerCallbackQuery(query.id, {
        text: 'Unable to identify user',
        show_alert: true
      });
      return;
    }

    const profileComplete = await isProfileComplete(telegramUserId);
    
    if (!profileComplete) {
      await bot.answerCallbackQuery(query.id, {
        text: '⚠️ Please complete your profile first',
        show_alert: true
      });
      await sendProfileEnforcementMessageForCallback(bot, query);
      return;
    }

    // Profile is complete, proceed with handler
    return handler(bot, query, ...args);
  }) as T;
}

/**
 * Check profile completion before executing any handler
 * Returns true if should proceed, false if blocked
 */
export async function checkProfileCompletionGuard(
  bot: any,
  telegramUserId: string,
  chatId: number,
  context: 'command' | 'callback',
  identifier: string // command text or callback data
): Promise<boolean> {
  // Check if this action is allowed without profile
  const isAllowed = context === 'command' 
    ? isCommandAllowed(identifier)
    : isCallbackAllowed(identifier);

  if (isAllowed) {
    return true; // Allow to proceed
  }

  // Check profile completion
  const profileComplete = await isProfileComplete(telegramUserId);
  
  if (!profileComplete) {
    await sendProfileEnforcementMessage(bot, chatId, context);
    return false; // Block
  }

  return true; // Allow to proceed
}
