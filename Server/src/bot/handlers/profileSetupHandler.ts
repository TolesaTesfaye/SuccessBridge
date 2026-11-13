import { getUserByTelegramId, updateUserProfile } from '../services/userService.js';
import { deriveStudentCategory, getStudentCategoryDisplayName } from '../../services/studentCategoryService.js';
import { screen, bi, navRow } from '../utils/design.js';

/**
 * Profile setup wizard.
 * Step 1: pick school type. Step 2: pick grade / level.
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
      screen({
        icon: '✅',
        title: 'Profile Already Complete',
        subtitle: bi('You are all set — nothing else needed here.',
                     'Kun xumura — waan dabalataan hin jiru!'),
        body:
          `🎓 <b>Category:</b> ${categoryName}\n\n` +
          bi('To change your level, please update it on the website.',
             'Sadarkaa jijjiiruu baafadhu website\'irratti.'),
      }),
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🌐 Open Website', url: 'https://success-bridge-ten.vercel.app' }],
            navRow('main_menu'),
          ],
        },
      },
    );
    return;
  }

  // ── STEP 1 of 2 ──
  await bot.sendMessage(
    chatId,
    screen({
      icon: '✏️',
      title: 'Profile Setup — Step 1 of 2',
      subtitle: bi(
        'Where are you studying right now?',
        'Amma eessa barattaa?',
      ),
      body:
        `🏫 <b>High School</b> — Kutaa 9 to 12\n` +
        `🎓 <b>University</b> — Freshman or Remedial`,
      tipText: 'You can change this later on the website.',
      tipOromoo: 'Booda website\'irratti jijjiiruu dandeessu.',
    }),
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🏫 High School  •  Mana Barumsaa', callback_data: 'setup_highschool' }],
          [{ text: '🎓 University  •  Yunivarsitii', callback_data: 'setup_university' }],
          [{ text: '❌ Cancel  •  Dhiisi', callback_data: 'main_menu' }],
        ],
      },
    },
  );
}

/**
 * Handle high school setup — STEP 2 of 2
 */
export async function handleHighSchoolSetup(bot: any, query: any): Promise<void> {
  const chatId = query.message.chat.id;

  await bot.editMessageText(
    screen({
      icon: '🏫',
      title: 'High School — Step 2 of 2',
      subtitle: bi('Which grade are you in?', 'Kutaan kee kam?'),
    }),
    {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '9️⃣ Grade 9', callback_data: 'setup_grade_9' },
            { text: '🔟 Grade 10', callback_data: 'setup_grade_10' },
          ],
          [
            { text: '1️⃣1️⃣ Grade 11', callback_data: 'setup_grade_11' },
            { text: '1️⃣2️⃣ Grade 12', callback_data: 'setup_grade_12' },
          ],
          [{ text: '⬅️ Back  •  Gara Duubaa', callback_data: 'setup_profile' }],
        ],
      },
    },
  );
}

/**
 * Handle university setup — STEP 2 of 2
 */
export async function handleUniversitySetup(bot: any, query: any): Promise<void> {
  const chatId = query.message.chat.id;

  await bot.editMessageText(
    screen({
      icon: '🎓',
      title: 'University — Step 2 of 2',
      subtitle: bi('Which level are you in?', 'Sadarkaa kee kam?'),
    }),
    {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔰 Remedial', callback_data: 'setup_remedial' }],
          [{ text: '🎯 Freshman', callback_data: 'setup_freshman' }],
          [{ text: '⬅️ Back  •  Gara Duubaa', callback_data: 'setup_profile' }],
        ],
      },
    },
  );
}

/** Shared success screen after profile save. */
async function sendProfileSuccess(bot: any, chatId: number, messageId: number, opts: {
  categoryName: string;
  levelLabel: string;
  icon: string;
}): Promise<void> {
  await bot.editMessageText(
    screen({
      icon: '🎉',
      title: 'Profile Complete!',
      subtitle: bi('Welcome aboard — your dashboard is ready!',
                   'Baga gammadde! Dashboard kee qopheeffeera!'),
      body:
        `${opts.icon} <b>Level:</b> ${opts.levelLabel}\n` +
        `🎓 <b>Category:</b> ${opts.categoryName}\n\n` +
        bi('Now pick what to do next:', 'Amma wanti itti aanu filadhu:'),
    }),
    {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📚 Browse My Subjects  •  Barnoota Ilaali', callback_data: 'browse_all_grades' }],
          [{ text: '💳 Unlock All Resources  •  Kaffalii Godhi', callback_data: 'unlock_resources' }],
          [{ text: '🏠 Main Menu  •  Man\'ee', callback_data: 'main_menu' }],
        ],
      },
    },
  );
}

/** Shared error screen. */
async function sendProfileError(bot: any, chatId: number, messageId: number): Promise<void> {
  await bot.editMessageText(
    screen({
      icon: '❌',
      title: 'Something Went Wrong',
      subtitle: bi('Your profile was not saved. Please try again.',
                   'Odeeffannoon hin kayyadne. Maaloo irra deebi\'i!'),
    }),
    {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔄 Try Again', callback_data: 'setup_profile' }],
          [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
        ],
      },
    },
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
      await sendProfileSuccess(bot, chatId, query.message.message_id, {
        categoryName,
        levelLabel: `Grade ${grade}  •  Kutaa ${grade}`,
        icon: '🏫',
      });
    } else {
      throw new Error('Failed to derive category after update');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    await sendProfileError(bot, chatId, query.message.message_id);
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
      await sendProfileSuccess(bot, chatId, query.message.message_id, {
        categoryName,
        levelLabel: `${level.charAt(0).toUpperCase() + level.slice(1)}`,
        icon: '🎓',
      });
    } else {
      throw new Error('Failed to derive category after update');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    await sendProfileError(bot, chatId, query.message.message_id);
  }
}
