import { formatDivider, getWebUrl } from '../utils/ui.js';

export async function handleHelp(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;

  const helpCard = `❓ <b>SUCCESSBRIDGE HELP & FAQ CENTER</b>\n` +
    `${formatDivider()}\n` +
    `Welcome to the student support desk! Here you can find answers to frequently asked questions and learn how to make the most of the learning bot.\n\n` +
    `💡 <b>Quick Commands:</b>\n` +
    `• /start — Open main learning dashboard\n` +
    `• /browse — Explore all high school & university subjects\n` +
    `• /mycourses — View your subjects\n` +
    `• /profile — View your student credentials\n` +
    `• /help — Open this Help Center\n\n` +
    `👇 <b>Choose a topic for instant answers:</b>\n` +
    `${formatDivider()}`;

  const keyboard = [
    [
      { text: '🌐 Why & How to Read on Website', callback_data: 'faq_web' },
    ],
    [
      { text: '📥 How to Download Materials', callback_data: 'faq_download' },
    ],
    [
      { text: '🔍 How to Search by Keyword', callback_data: 'faq_search' },
    ],
    [
      { text: '💳 Subscriptions & Access', callback_data: 'faq_sub' },
    ],
    [
      { text: '📞 Contact Support / Admin', callback_data: 'faq_support' },
    ],
    [
      { text: '🏠 Main Menu', callback_data: 'main_menu' },
    ],
  ];

  await bot.sendMessage(chatId, helpCard, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
}

export async function handleFaqCallback(bot: any, chatId: number, messageId: number, data: string): Promise<void> {
  let title = '';
  let content = '';

  switch (data) {
    case 'faq_web':
      title = '🌐 Reading Online on the Web Platform';
      content = `<b>Why study on the SuccessBridge website?</b>\n\n` +
        `• 📖 <b>Interactive Full-Screen Reader:</b> Read slides, notes, and textbooks directly in your web browser with zoom, page-jumping, and clean reading layouts.\n\n` +
        `• 📝 <b>Practice Quizzes:</b> Test your understanding with auto-graded chapter quizzes and instant answers.\n\n` +
        `• 📊 <b>Progress Tracking:</b> See which subjects you have covered and stay on top of your studies.\n\n` +
        `👉 <b>Launch the website now:</b>\n` +
        `<a href="${getWebUrl()}">${getWebUrl()}</a>`;
      break;

    case 'faq_sub':
      title = '💳 Subscriptions & Full Access';
      content = `<b>How do I unlock all materials?</b>\n\n` +
        `1. Visit our official web platform:\n` +
        `👉 <a href="${getWebUrl()}">${getWebUrl()}</a>\n\n` +
        `2. Log in or sign up using your email.\n\n` +
        `3. Choose your desired grade or university department subscription.\n\n` +
        `4. Once confirmed, all lecture slides, past exams, and worksheets unlock automatically in both the Web App and this Telegram Bot!`;
      break;

    case 'faq_download':
      title = '📥 How to Download Materials';
      content = `<b>How to get documents in Telegram:</b>\n\n` +
        `1. Tap <b>📖 My Subjects</b> from the main menu or browse via <b>/browse</b>.\n\n` +
        `2. Select your subject (e.g. <i>Grade 12 Mathematics</i>).\n\n` +
        `3. Choose a category: <i>Lecture Slides</i>, <i>Notes</i>, <i>Exams</i>, or <i>Textbooks</i>.\n\n` +
        `4. Tap any material to have the document delivered directly into your chat, or open the high-speed download link.`;
      break;

    case 'faq_search':
      title = '🔍 How to Search Materials';
      content = `<b>Lightning-fast search:</b>\n\n` +
        `• You don't even need a command! Just type any keyword into this chat, such as:\n` +
        `  - <code>Biology</code>\n` +
        `  - <code>Grade 12 Physics</code>\n` +
        `  - <code>Calculus Mid Exam</code>\n\n` +
        `• The bot will instantly search all subjects and uploaded materials and show you one-tap download buttons.`;
      break;

    case 'faq_support':
      title = '📞 Contact Support / Admin';
      content = `<b>Need personal assistance?</b>\n\n` +
        `Our academic support team is ready to help you with account verification, subject access, or custom requests.\n\n` +
        `📧 <b>Email:</b> <code>tolesatesfaye273@gmail.com</code>\n` +
        `🌐 <b>Website:</b> <a href="${getWebUrl()}">${getWebUrl()}</a>\n` +
        `⏱️ <i>Support hours: 24/7</i>`;
      break;

    default:
      return;
  }

  const message = `❓ <b>${title}</b>\n` +
    `${formatDivider()}\n` +
    `${content}\n` +
    `${formatDivider()}`;

  try {
    await bot.editMessageText(message, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔙 Back to Help Center', callback_data: 'faq_home' }],
          [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
        ],
      },
    });
  } catch (err) {
    // If edit fails (e.g. text identical), send as new message
    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔙 Back to Help Center', callback_data: 'faq_home' }],
          [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
        ],
      },
    });
  }
}
