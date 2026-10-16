import { Grade, Stream, Subject } from '../../models/index.js';
import { escapeHtml, formatDivider, formatBreadcrumbs } from '../utils/ui.js';

/**
 * Step 1: Show education level selection (High School or University)
 */
export async function handleBrowseCourses(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;

  try {
    const text = `🎓 <b>EXPLORE ACADEMIC LIBRARY</b>\n` +
      `${formatDivider()}\n` +
      `Welcome to our study resource library. Select your current academic level to find your curriculum and materials:\n\n` +
      `🏫 <b>High School:</b> Grades 9, 10, 11, and 12 (Natural & Social Streams)\n` +
      `🎓 <b>Higher Education:</b> University Freshman & Remedial Programs\n` +
      `${formatDivider()}\n` +
      `👇 <i>Choose your education level:</i>`;

    await bot.sendMessage(
      chatId,
      text,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🏫 High School Program', callback_data: 'level_high_school' }],
            [{ text: '🎓 University (Freshman & Remedial)', callback_data: 'level_university' }],
            [{ text: '🔍 Search by Keyword Instead', callback_data: 'search_prompt' }],
            [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
          ],
        },
      }
    );
  } catch (error) {
    console.error('Error in /browse handler:', error);
    await bot.sendMessage(chatId, '❌ <i>Error loading education levels. Please try again.</i>', { parse_mode: 'HTML' });
  }
}

/**
 * Step 2: Show grade selection based on education level
 */
export async function handleLevelSelection(bot: any, chatId: number, level: string): Promise<void> {
  try {
    if (level === 'high_school') {
      const text = `🏫 <b>HIGH SCHOOL PROGRAM</b>\n` +
        `${formatBreadcrumbs(['Academic Library', 'High School'])}\n` +
        `${formatDivider()}\n` +
        `Select your grade level to browse curriculum subjects and materials:\n` +
        `${formatDivider()}`;

      await bot.sendMessage(
        chatId,
        text,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '9️⃣ Grade 9', callback_data: 'grade_Grade 9' },
                { text: '🔟 Grade 10', callback_data: 'grade_Grade 10' },
              ],
              [
                { text: '1️⃣1️⃣ Grade 11', callback_data: 'grade_Grade 11' },
                { text: '1️⃣2️⃣ Grade 12', callback_data: 'grade_Grade 12' },
              ],
              [
                { text: '🔙 Back to Levels', callback_data: 'browse_courses' },
                { text: '🏠 Main Menu', callback_data: 'main_menu' },
              ],
            ],
          },
        }
      );
    } else if (level === 'university') {
      const text = `🎓 <b>UNIVERSITY PROGRAM</b>\n` +
        `${formatBreadcrumbs(['Academic Library', 'University'])}\n` +
        `${formatDivider()}\n` +
        `Select your university program stage to browse semester subjects:\n` +
        `${formatDivider()}`;

      await bot.sendMessage(
        chatId,
        text,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '🆕 Freshman Program', callback_data: 'grade_Freshman' },
                { text: '📖 Remedial Program', callback_data: 'grade_Remedial' },
              ],
              [
                { text: '🔙 Back to Levels', callback_data: 'browse_courses' },
                { text: '🏠 Main Menu', callback_data: 'main_menu' },
              ],
            ],
          },
        }
      );
    }
  } catch (error) {
    console.error('Error in handleLevelSelection:', error);
    await bot.sendMessage(chatId, '❌ <i>Error loading grades. Please try again.</i>', { parse_mode: 'HTML' });
  }
}

/**
 * Step 3: Show stream selection for Grade 11, 12, Freshman, and Remedial
 */
export async function handleGradeSelection(bot: any, chatId: number, gradeName: string): Promise<void> {
  try {
    const hasStreams = ['Grade 11', 'Grade 12', 'Freshman', 'Remedial'].includes(gradeName);

    if (hasStreams) {
      const isUniversity = gradeName === 'Freshman' || gradeName === 'Remedial';
      const backData = isUniversity ? 'level_university' : 'level_high_school';
      const levelTitle = isUniversity ? 'University' : 'High School';

      const text = `📊 <b>${escapeHtml(gradeName)} — Stream Selection</b>\n` +
        `${formatBreadcrumbs(['Library', levelTitle, gradeName])}\n` +
        `${formatDivider()}\n` +
        `Choose your stream to view relevant courses and study documents:\n` +
        `${formatDivider()}`;

      await bot.sendMessage(
        chatId,
        text,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '🔬 Natural Science Stream', callback_data: `stream_${gradeName}|natural` },
              ],
              [
                { text: '🌍 Social Science Stream', callback_data: `stream_${gradeName}|social` },
              ],
              [
                { text: '🔙 Back', callback_data: backData },
                { text: '🏠 Main Menu', callback_data: 'main_menu' },
              ],
            ],
          },
        }
      );
    } else {
      // Grade 9, 10 - no streams, show subjects directly
      await handleShowSubjects(bot, chatId, gradeName, null);
    }
  } catch (error) {
    console.error('Error in handleGradeSelection:', error);
    await bot.sendMessage(chatId, '❌ <i>Error loading streams. Please try again.</i>', { parse_mode: 'HTML' });
  }
}

/**
 * Step 4: Show subjects for the selected grade and stream
 */
export async function handleStreamSelection(
  bot: any,
  chatId: number,
  gradeName: string,
  streamType: string
): Promise<void> {
  let streamCode: string;

  if (gradeName === 'Freshman') {
    streamCode = `freshman_${streamType}`;
  } else if (gradeName === 'Remedial') {
    streamCode = `remedial_${streamType}`;
  } else if (gradeName.includes('11')) {
    streamCode = `g11_${streamType}`;
  } else if (gradeName.includes('12')) {
    streamCode = `g12_${streamType}`;
  } else {
    streamCode = `${gradeName.toLowerCase().replace(/\s+/g, '_')}_${streamType}`;
  }
  
  await handleShowSubjects(bot, chatId, gradeName, streamCode);
}

/**
 * Final step: Display subjects
 */
async function handleShowSubjects(
  bot: any,
  chatId: number,
  gradeName: string,
  streamCode: string | null
): Promise<void> {
  try {
    const grade = await Grade.findOne({ where: { name: gradeName } });

    if (!grade) {
      await bot.sendMessage(chatId, '❌ <i>Grade not found.</i>', { parse_mode: 'HTML' });
      return;
    }

    const where: any = { gradeId: grade.id };

    if (streamCode) {
      const stream = await Stream.findOne({
        where: { 
          gradeId: grade.id,
          code: streamCode
        }
      });

      if (stream) {
        where.streamId = stream.id;
      }
    } else {
      where.streamId = null;
    }

    const subjects = await Subject.findAll({
      where,
      include: [
        { model: Grade, as: 'grade' },
        { model: Stream, as: 'stream' }
      ],
      order: [['name', 'ASC']]
    });

    const isUniversity = gradeName === 'Freshman' || gradeName === 'Remedial';
    const backData = streamCode
      ? `grade_${gradeName}`
      : (isUniversity ? 'level_university' : 'level_high_school');

    if (!subjects || subjects.length === 0) {
      await bot.sendMessage(
        chatId,
        `📚 <b>${escapeHtml(gradeName)}</b>\n${formatDivider()}\n<i>No subjects registered for this stream yet. Check back soon!</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🔙 Back', callback_data: backData }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
      return;
    }

    const keyboard: any[][] = subjects.map((subject: any) => [
      {
        text: `📖 ${subject.name}`,
        callback_data: `course_${subject.id}`,
      },
    ]);

    keyboard.push([
      { text: '🔙 Back', callback_data: backData },
      { text: '🏠 Main Menu', callback_data: 'main_menu' },
    ]);

    const streamTitle = streamCode
      ? (streamCode.includes('natural') ? ' • Natural Science' : ' • Social Science')
      : '';

    const text = `📚 <b>${escapeHtml(gradeName)}${escapeHtml(streamTitle)} — Subjects</b> (${subjects.length})\n` +
      `${formatBreadcrumbs(['Library', gradeName, streamCode ? (streamCode.includes('natural') ? 'Natural' : 'Social') : ''])}\n` +
      `${formatDivider()}\n` +
      `👇 <i>Select a subject to explore lecture notes, slides, & exams:</i>`;

    await bot.sendMessage(
      chatId,
      text,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: keyboard,
        },
      }
    );
  } catch (error) {
    console.error('Error in handleShowSubjects:', error);
    await bot.sendMessage(chatId, '❌ <i>Error loading subjects. Please try again.</i>', { parse_mode: 'HTML' });
  }
}
