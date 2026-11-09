/**
 * SIMPLIFIED BROWSE HANDLER
 * Reduces navigation from 5-6 steps to 2-3 steps
 * Students can reach resources much faster
 */

import { Grade, Stream, Subject, Resource } from '../../models/index.js';
import { getUserByTelegramId } from '../services/userService.js';
import { deriveStudentCategory } from '../../services/studentCategoryService.js';
import { hasActiveAccess } from '../../services/accessControlService.js';
import { escapeHtml, formatDivider } from '../utils/ui.js';

/**
 * SMART START: Show resources based on user's registered profile
 * If user has a complete profile, skip navigation and show their subjects directly!
 */
export async function handleSmartBrowse(bot: any, msg: any, telegramUserId: string): Promise<void> {
  const chatId = msg.chat.id;

  try {
    // Get user profile
    const user = await getUserByTelegramId(telegramUserId);

    if (user && user.studentType) {
      // User has profile - show their subjects directly!
      const category = deriveStudentCategory(user);
      
      if (!category) {
        // Profile incomplete - prompt to complete it
        await bot.sendMessage(
          chatId,
          '⚠️ <b>Profile Incomplete</b>\n\n' +
          'To browse resources, we need to know your student category.\n\n' +
          '📝 Please complete your profile by selecting your education level and grade/level.',
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [{ text: '✏️ Complete Profile', callback_data: 'setup_profile' }],
                [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
              ],
            },
          }
        );
        return;
      }

      const hasAccess = await hasActiveAccess(user.id, category);
      await showUserSubjects(bot, chatId, user, hasAccess);
    } else {
      // No profile - show quick grade selector
      await showQuickGradeSelector(bot, chatId);
    }
  } catch (error) {
    console.error('Error in handleSmartBrowse:', error);
    await showQuickGradeSelector(bot, chatId);
  }
}

/**
 * Show user's subjects directly based on their profile
 */
async function showUserSubjects(bot: any, chatId: number, user: any, hasAccess: boolean): Promise<void> {
  try {
    let subjects: any[] = [];
    let categoryTitle = '';

    // HIGH SCHOOL STUDENTS
    if (user.studentType === 'high_school' && user.highSchoolGrade) {
      const gradeMap: any = {
        'grade_9': 'Grade 9',
        'grade_10': 'Grade 10',
        'grade_11': 'Grade 11',
        'grade_12': 'Grade 12',
      };
      
      const gradeName = gradeMap[user.highSchoolGrade];
      categoryTitle = `📚 ${gradeName}`;

      const grade = await Grade.findOne({ where: { name: gradeName } });
      if (grade) {
        const where: any = { gradeId: grade.id };

        // For Grade 11 & 12, filter by stream if available
        if ((user.highSchoolGrade === 'grade_11' || user.highSchoolGrade === 'grade_12') && user.highSchoolStream) {
          const streamCode = user.highSchoolGrade === 'grade_11' 
            ? `g11_${user.highSchoolStream}`
            : `g12_${user.highSchoolStream}`;
          
          const stream = await Stream.findOne({ where: { gradeId: grade.id, code: streamCode } });
          if (stream) {
            where.streamId = stream.id;
            categoryTitle += ` • ${user.highSchoolStream === 'natural' ? 'Natural' : 'Social'}`;
          }
        }

        subjects = await Subject.findAll({
          where,
          order: [['name', 'ASC']],
        });
      }
    }
    // UNIVERSITY STUDENTS
    else if (user.studentType === 'university' && user.universityLevel) {
      const levelMap: any = {
        'remedial': 'Remedial',
        'freshman': 'Freshman',
      };

      const levelName = levelMap[user.universityLevel];
      categoryTitle = `🎓 ${levelName}`;

      const grade = await Grade.findOne({ where: { name: levelName } });
      if (grade) {
        subjects = await Subject.findAll({
          where: { gradeId: grade.id },
          order: [['name', 'ASC']],
        });
      }
    }

    if (subjects.length === 0) {
      await bot.sendMessage(
        chatId,
        `${categoryTitle}\n` +
        `${formatDivider()}\n` +
        `📚 <i>No subjects available yet. Check back soon!</i>\n\n` +
        `💡 <b>Tip:</b> Browse other grades using the button below.`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🔍 Browse All Grades', callback_data: 'browse_all_grades' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
      return;
    }

    // Build keyboard with subjects
    const keyboard: any[][] = [];
    
    // Add subjects (max 2 per row for better mobile UX)
    for (let i = 0; i < subjects.length; i += 2) {
      const row = [];
      row.push({ text: `📖 ${subjects[i].name}`, callback_data: `course_${subjects[i].id}` });
      if (i + 1 < subjects.length) {
        row.push({ text: `📖 ${subjects[i + 1].name}`, callback_data: `course_${subjects[i + 1].id}` });
      }
      keyboard.push(row);
    }

    // Add action buttons
    keyboard.push([{ text: '🔍 Browse Other Grades', callback_data: 'browse_all_grades' }]);
    
    if (!hasAccess) {
      keyboard.push([{ text: '🔓 Unlock All Resources', callback_data: 'ready_to_pay' }]);
    }
    
    keyboard.push([{ text: '🏠 Main Menu', callback_data: 'main_menu' }]);

    const accessInfo = hasAccess
      ? '✅ <b>Full Access Active</b>'
      : '🔒 <i>Unlock access to download all resources</i>';

    const text = `${categoryTitle} <b>Subjects</b> (${subjects.length})\n` +
      `${formatDivider()}\n` +
      `${accessInfo}\n` +
      `${formatDivider()}\n` +
      `👇 <i>Select a subject to view materials:</i>`;

    await bot.sendMessage(chatId, text, {
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: keyboard },
    });

  } catch (error) {
    console.error('Error in showUserSubjects:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>Error loading your subjects. Try browsing all grades.</i>',
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[{ text: '🔍 Browse All Grades', callback_data: 'browse_all_grades' }]],
        },
      }
    );
  }
}

/**
 * QUICK GRADE SELECTOR: All grades in one view (2 clicks to reach subjects)
 */
async function showQuickGradeSelector(bot: any, chatId: number): Promise<void> {
  const text = `📚 <b>QUICK BROWSE</b>\n` +
    `${formatDivider()}\n` +
    `Select your grade to view subjects instantly:\n` +
    `${formatDivider()}`;

  await bot.sendMessage(chatId, text, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        // High School
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
        // University
        [
          { text: '🎓 Freshman', callback_data: 'quick_freshman' },
          { text: '📖 Remedial', callback_data: 'quick_remedial' },
        ],
        // Navigation
        [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
      ],
    },
  });
}

/**
 * Handle quick grade selection (shows subjects directly)
 */
export async function handleQuickGradeSelection(
  bot: any,
  chatId: number,
  gradeKey: string
): Promise<void> {
  try {
    let gradeName: string;
    let streamCode: string | null = null;

    // Parse grade key
    switch (gradeKey) {
      case 'grade_9':
        gradeName = 'Grade 9';
        break;
      case 'grade_10':
        gradeName = 'Grade 10';
        break;
      case 'grade_11_natural':
        gradeName = 'Grade 11';
        streamCode = 'g11_natural';
        break;
      case 'grade_11_social':
        gradeName = 'Grade 11';
        streamCode = 'g11_social';
        break;
      case 'grade_12_natural':
        gradeName = 'Grade 12';
        streamCode = 'g12_natural';
        break;
      case 'grade_12_social':
        gradeName = 'Grade 12';
        streamCode = 'g12_social';
        break;
      case 'freshman':
        gradeName = 'Freshman';
        break;
      case 'remedial':
        gradeName = 'Remedial';
        break;
      default:
        await showQuickGradeSelector(bot, chatId);
        return;
    }

    // Get grade from database
    const grade = await Grade.findOne({ where: { name: gradeName } });
    if (!grade) {
      await bot.sendMessage(
        chatId,
        '❌ <i>Grade not found. Please try again.</i>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    // Build query
    const where: any = { gradeId: grade.id };

    if (streamCode) {
      const stream = await Stream.findOne({ where: { gradeId: grade.id, code: streamCode } });
      if (stream) {
        where.streamId = stream.id;
      }
    }

    // Get subjects
    const subjects = await Subject.findAll({
      where,
      order: [['name', 'ASC']],
    });

    if (subjects.length === 0) {
      await bot.sendMessage(
        chatId,
        `📚 <b>${escapeHtml(gradeName)}</b>\n` +
        `${formatDivider()}\n` +
        `<i>No subjects registered yet. Check back soon!</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🔙 Back to Grades', callback_data: 'browse_all_grades' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
      return;
    }

    // Build keyboard
    const keyboard: any[][] = [];
    
    for (let i = 0; i < subjects.length; i += 2) {
      const row = [];
      row.push({ text: `📖 ${subjects[i].name}`, callback_data: `course_${subjects[i].id}` });
      if (i + 1 < subjects.length) {
        row.push({ text: `📖 ${subjects[i + 1].name}`, callback_data: `course_${subjects[i + 1].id}` });
      }
      keyboard.push(row);
    }

    keyboard.push([{ text: '🔙 Back to Grades', callback_data: 'browse_all_grades' }]);
    keyboard.push([{ text: '🏠 Main Menu', callback_data: 'main_menu' }]);

    const streamTitle = streamCode
      ? (streamCode.includes('natural') ? ' • Natural' : ' • Social')
      : '';

    const text = `📚 <b>${escapeHtml(gradeName)}${escapeHtml(streamTitle)}</b> (${subjects.length} subjects)\n` +
      `${formatDivider()}\n` +
      `👇 <i>Select a subject:</i>`;

    await bot.sendMessage(chatId, text, {
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: keyboard },
    });

  } catch (error) {
    console.error('Error in handleQuickGradeSelection:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>Error loading subjects. Please try again.</i>',
      { parse_mode: 'HTML' }
    );
  }
}
