import { Op } from 'sequelize';
import { Subject, Resource } from '../../models/index.js';
import { escapeHtml, formatDivider, getResourceIcon } from '../utils/ui.js';

export async function handleSearchPrompt(bot: any, chatId: number): Promise<void> {
  const text = `🔍 <b>STUDY RESOURCE SEARCH</b>\n` +
    `${formatDivider()}\n` +
    `Find subjects, lecture slides, and past national exams across all grades!\n\n` +
    `👉 <b>Option 1:</b> Just type any keyword into this chat (e.g., <code>Math</code>, <code>Biology</code>, <code>Exam</code>).\n\n` +
    `👉 <b>Option 2:</b> Or tap an instant search category below:\n` +
    `${formatDivider()}`;

  const keyboard = [
    [
      { text: '📋 All Past Exams', callback_data: 'quick_search_exam' },
      { text: '📊 Lecture Slides', callback_data: 'quick_search_slide' },
    ],
    [
      { text: '📝 Notes & Summaries', callback_data: 'quick_search_note' },
      { text: '📖 Textbooks & Modules', callback_data: 'quick_search_book' },
    ],
    [
      { text: '🔬 Grade 12 Materials', callback_data: 'quick_search_Grade 12' },
      { text: '🆕 Freshman Materials', callback_data: 'quick_search_Freshman' },
    ],
    [
      { text: '📖 Remedial Program', callback_data: 'quick_search_Remedial' },
      { text: '📚 Browse by Level', callback_data: 'browse_courses' },
    ],
    [
      { text: '🏠 Main Menu', callback_data: 'main_menu' },
    ],
  ];

  await bot.sendMessage(chatId, text, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
}

export async function handleQuickSearch(bot: any, chatId: number, rawQuery: string): Promise<void> {
  await executeSearch(bot, chatId, rawQuery);
}

export async function handleLiveSearch(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const rawQuery = msg.text?.trim() || '';

  if (!rawQuery || rawQuery.length < 2) {
    await bot.sendMessage(
      chatId,
      '⚠️ <i>Please enter at least 2 characters to search.</i>',
      { parse_mode: 'HTML' }
    );
    return;
  }

  await executeSearch(bot, chatId, rawQuery);
}

async function executeSearch(bot: any, chatId: number, rawQuery: string): Promise<void> {
  // Send searching indicator
  const searchingMsg = await bot.sendMessage(chatId, '🔎 <i>Searching library...</i>', { parse_mode: 'HTML' });

  try {
    const query = `%${rawQuery}%`;

    const [subjects, resources] = await Promise.all([
      Subject.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: query } },
            { code: { [Op.iLike]: query } },
          ],
        },
        limit: 6,
      }),
      Resource.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: query } },
            { description: { [Op.iLike]: query } },
            { type: { [Op.iLike]: query } },
          ],
        },
        include: [{ model: Subject, as: 'subject', attributes: ['name', 'code'] }],
        limit: 8,
      }),
    ]);

    // Delete temporary loading indicator
    try {
      await bot.deleteMessage(chatId, searchingMsg.message_id);
    } catch (_) {}

    if (subjects.length === 0 && resources.length === 0) {
      const notFoundText = `🔍 <b>No Results Found</b>\n` +
        `${formatDivider()}\n` +
        `We couldn't find any materials matching <b>"${escapeHtml(rawQuery)}"</b>.\n\n` +
        `💡 <b>Search Suggestions:</b>\n` +
        `• Try broader keywords (e.g. <code>Math</code> instead of <code>Grade 12 Math Chapter 4</code>)\n` +
        `• Check spelling of topic or subject\n` +
        `• Or browse structured by Education Level below:\n` +
        `${formatDivider()}`;

      await bot.sendMessage(chatId, notFoundText, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '📚 Browse by Education Level', callback_data: 'browse_courses' }],
            [{ text: '🔍 Try Another Search', callback_data: 'search_prompt' }],
            [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
          ],
        },
      });
      return;
    }

    let resultText = `🎯 <b>Search Results for:</b> "${escapeHtml(rawQuery)}"\n` +
      `${formatDivider()}\n`;

    const keyboard: any[][] = [];

    if (subjects.length > 0) {
      resultText += `📚 <b>Matching Subjects (${subjects.length}):</b>\n`;
      for (const subj of subjects) {
        resultText += `• <b>${escapeHtml(subj.name)}</b> ${subj.code ? `(<code>${escapeHtml(subj.code)}</code>)` : ''}\n`;
        keyboard.push([
          {
            text: `📖 ${subj.name}`,
            callback_data: `course_${subj.id}`,
          },
        ]);
      }
      resultText += '\n';
    }

    if (resources.length > 0) {
      resultText += `📁 <b>Matching Materials (${resources.length}):</b>\n`;
      for (const res of resources) {
        const icon = getResourceIcon(res.type);
        const subjName = (res as any).subject?.name ? ` [${(res as any).subject.name}]` : '';
        resultText += `${icon} <b>${escapeHtml(res.title)}</b>${escapeHtml(subjName)}\n`;
        keyboard.push([
          {
            text: `📥 ${icon} ${res.title.substring(0, 32)}`,
            callback_data: `download_${res.id}`,
          },
        ]);
      }
    }

    resultText += `${formatDivider()}\n`;
    resultText += `👇 <i>Tap any item above to view or download:</i>`;

    keyboard.push([
      { text: '🔍 New Search', callback_data: 'search_prompt' },
      { text: '📚 Browse All Levels', callback_data: 'browse_courses' },
    ]);
    keyboard.push([
      { text: '🏠 Main Menu', callback_data: 'main_menu' },
    ]);

    await bot.sendMessage(chatId, resultText, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  } catch (error) {
    console.error('Error during search execution:', error);
    try {
      await bot.deleteMessage(chatId, searchingMsg.message_id);
    } catch (_) {}
    await bot.sendMessage(chatId, '❌ <i>An error occurred while searching. Please try again.</i>', {
      parse_mode: 'HTML',
    });
  }
}
