import { getUserByTelegramId, updateUserProfile } from '../services/userService.js';
import { deriveStudentCategory, getStudentCategoryDisplayName } from '../../services/studentCategoryService.js';

/**
 * Handle profile setup command - /setupprofile
 */
export async function handleProfileSetup(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from.id.toString();

  const user = await getUserByTelegramId(telegramUserId);
  if (!user) {
    await bot.sendMessage(chatId, '❌ User not found. Please use /start to register first.');
    return;
  }

  // Check if profile is already complete
  const category = deriveStudentCategory(user);
  if (category) {
    const categoryName = getStudentCategoryDisplayName(category);
    await bot.sendMessage(
      chatId,
      `✅ Your profile is already complete!\n\n` +
      `📚 Student Category: ${categoryName}\n\n` +
      `To update your profile, please visit:\n` +
      `🌐 https://success-bridge-ten.vercel.app`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🏠 Main Menu', callback_data: 'main_menu' }]
          ]
        }
      }
    );
    return;
  }

  // Start profile setup flow
  await bot.sendMessage(
    chatId,
    `👤 <b>Complete Your Student Profile</b>\n\n` +
    `To unlock resources and make payments, we need to know your student category.\n\n` +
    `Please select your education level:`,
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏫 High School Student', callback_data: 'setup_highschool' }],
          [{ text: '🎓 University Student', callback_data: 'setup_university' }],
          [{ text: '❌ Cancel', callback_data: 'main_menu' }]
        ]
      }
    }
  );
}

/**
 * Handle high school setup
 */
export async function handleHighSchoolSetup(bot: any, query: any): Promise<void> {
  const chatId = query.message.chat.id;
  
  await bot.editMessageText(
    `🏫 <b>High School Profile Setup</b>\n\n` +
    `Please select your grade:`,
    {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📚 Grade 9', callback_data: 'setup_grade_9' }],
          [{ text: '📖 Grade 10', callback_data: 'setup_grade_10' }],
          [{ text: '📝 Grade 11', callback_data: 'setup_grade_11' }],
          [{ text: '🎓 Grade 12', callback_data: 'setup_grade_12' }],
          [{ text: '⬅️ Back', callback_data: 'setup_profile' }]
        ]
      }
    }
  );
}

/**
 * Handle university setup
 */
export async function handleUniversitySetup(bot: any, query: any): Promise<void> {
  const chatId = query.message.chat.id;
  
  await bot.editMessageText(
    `🎓 <b>University Profile Setup</b>\n\n` +
    `Please select your level:`,
    {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔰 Remedial', callback_data: 'setup_remedial' }],
          [{ text: '🎯 Freshman', callback_data: 'setup_freshman' }],
          [{ text: '⬅️ Back', callback_data: 'setup_profile' }]
        ]
      }
    }
  );
}

/**
 * Handle grade selection and save to database
 */
export async function handleGradeSelection(bot: any, query: any, grade: string): Promise<void> {
  const chatId = query.message.chat.id;
  const telegramUserId = query.from.id.toString();

  try {
    // Map grade to database format
    const gradeMap: Record<string, string> = {
      '9': 'grade_9',
      '10': 'grade_10',
      '11': 'grade_11',
      '12': 'grade_12'
    };

    const highSchoolGrade = gradeMap[grade];
    
    // Update user profile
    await updateUserProfile(telegramUserId, {
      studentType: 'high_school',
      highSchoolGrade: highSchoolGrade as any
    });

    // Verify the update
    const user = await getUserByTelegramId(telegramUserId);
    const category = user ? deriveStudentCategory(user) : null;

    if (category) {
      const categoryName = getStudentCategoryDisplayName(category);
      
      await bot.editMessageText(
        `✅ <b>Profile Updated Successfully!</b>\n\n` +
        `📚 Student Category: ${categoryName}\n` +
        `🏫 Education Level: High School\n` +
        `📖 Grade: ${grade}\n\n` +
        `You can now:\n` +
        `• 💳 Make payments to unlock resources\n` +
        `• 📚 Browse subjects in your grade\n` +
        `• 📥 Download study materials\n\n` +
        `Use /botpayment to unlock your resources!`,
        {
          chat_id: chatId,
          message_id: query.message.message_id,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '💳 Unlock Resources', callback_data: 'unlock_resources' }],
              [{ text: '📚 Browse Courses', callback_data: 'browse_all_grades' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }]
            ]
          }
        }
      );
    } else {
      throw new Error('Failed to derive category after update');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    await bot.editMessageText(
      `❌ <b>Profile Update Failed</b>\n\n` +
      `There was an error updating your profile. Please try again or contact support.\n\n` +
      `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      {
        chat_id: chatId,
        message_id: query.message.message_id,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🔄 Try Again', callback_data: 'setup_profile' }],
            [{ text: '🏠 Main Menu', callback_data: 'main_menu' }]
          ]
        }
      }
    );
  }
}

/**
 * Handle university level selection
 */
export async function handleUniversityLevelSelection(bot: any, query: any, level: 'remedial' | 'freshman'): Promise<void> {
  const chatId = query.message.chat.id;
  const telegramUserId = query.from.id.toString();

  try {
    // Update user profile
    await updateUserProfile(telegramUserId, {
      studentType: 'university',
      universityLevel: level
    });

    // Verify the update
    const user = await getUserByTelegramId(telegramUserId);
    const category = user ? deriveStudentCategory(user) : null;

    if (category) {
      const categoryName = getStudentCategoryDisplayName(category);
      
      await bot.editMessageText(
        `✅ <b>Profile Updated Successfully!</b>\n\n` +
        `📚 Student Category: ${categoryName}\n` +
        `🎓 Education Level: University\n` +
        `🎯 Level: ${level.charAt(0).toUpperCase() + level.slice(1)}\n\n` +
        `You can now:\n` +
        `• 💳 Make payments to unlock resources\n` +
        `• 📚 Browse your subjects\n` +
        `• 📥 Download study materials\n\n` +
        `Use /botpayment to unlock your resources!`,
        {
          chat_id: chatId,
          message_id: query.message.message_id,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '💳 Unlock Resources', callback_data: 'unlock_resources' }],
              [{ text: '📚 Browse Courses', callback_data: 'browse_all_grades' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }]
            ]
          }
        }
      );
    } else {
      throw new Error('Failed to derive category after update');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    await bot.editMessageText(
      `❌ <b>Profile Update Failed</b>\n\n` +
      `There was an error updating your profile. Please try again or contact support.\n\n` +
      `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      {
        chat_id: chatId,
        message_id: query.message.message_id,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🔄 Try Again', callback_data: 'setup_profile' }],
            [{ text: '🏠 Main Menu', callback_data: 'main_menu' }]
          ]
        }
      }
    );
  }
}
