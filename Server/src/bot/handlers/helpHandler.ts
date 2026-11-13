import { screen, bi, navRow } from '../utils/design.js';
import { getWebUrl } from '../utils/ui.js';

export async function handleHelp(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;

  const helpCard = screen({
    icon: '❓',
    title: 'Help Center • Gargaarsa',
    subtitle: bi(
      'Pick a topic below for a quick answer.',
      'Mata-duree filadhu — deebii saffisaan argatta!',
    ),
    body:
      `⌨️ <b>Fast Commands:</b>\n` +
      `/start — 🏠 Main menu\n` +
      `/browse — 📚 Explore subjects\n` +
      `/mycourses — 📖 Your subjects\n` +
      `/profile — 👤 Your student info\n` +
      `/payment — 💳 Subscription guide`,
  });

  const keyboard = [
    [
      { text: '🌐 Read on Website', callback_data: 'faq_web' },
      { text: '📥 Downloads', callback_data: 'faq_download' },
    ],
    [
      { text: '🔍 Search Tips', callback_data: 'faq_search' },
      { text: '💳 Payments', callback_data: 'faq_sub' },
    ],
    [
      { text: '📞 Contact Support', callback_data: 'faq_support' },
    ],
    navRow('main_menu'),
  ];

  await bot.sendMessage(chatId, helpCard, {
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: keyboard },
  });
}

export async function handleFaqCallback(bot: any, chatId: number, messageId: number, data: string): Promise<void> {
  let title = '';
  let content = '';

  switch (data) {
    case 'faq_web':
      title = '🌐 Reading Online on the Web Platform';
      content =
        bi('Why study on the SuccessBridge website?', 'Maaliif website keneen dubbisuu barbaadda?') + '\n\n' +
        `• 📖 <b>Interactive Full-Screen Reader</b> — slides, notes and textbooks with zoom & page-jumping.\n` +
        `• 📝 <b>Practice Quizzes</b> — auto-graded chapter quizzes with instant answers.\n` +
        `• 📊 <b>Progress Tracking</b> — see which subjects you have covered.\n\n` +
        `👉 <b>Open now:</b> <a href="${getWebUrl()}">${getWebUrl()}</a>\n` +
        `🇪🇹 <i>Website irratti dubbisuu jalqabi!</i>`;
      break;

    case 'faq_sub':
      title = '💳 Subscriptions & Payment Guide';
      content =
        bi('How to get full access in 4 simple steps:', 'Kuusa 4 qofaan yeroon hunda banaa!') + '\n\n' +
        `📋 <b>STEP 1 — Choose a plan</b>\n` +
        `👉 <a href="${getWebUrl()}">${getWebUrl()}</a>\n\n` +
        `📋 <b>STEP 2 — Contact support</b>\n` +
        `📱 Telegram: @Tol_man27 (<a href="https://t.me/Tol_man27">t.me/Tol_man27</a>)\n` +
        `📧 Email: tolesatesfaye273@gmail.com\n\n` +
        `📋 <b>STEP 3 — Pay</b>\n` +
        bi('Our team gives you payment methods and the price for your level.',
           'Karaa kaffalii fi baafata sadarkaa kee isinii kennina.') + '\n\n' +
        `📋 <b>STEP 4 — Instant activation</b>\n` +
        `✅ Full access on website + bot, unlimited downloads.\n\n` +
        `💡 <i>Questions? Message @Tol_man27 anytime!</i>`;
      break;

    case 'faq_download':
      title = '📥 How to Download Materials';
      content =
        bi('Get any document in 4 taps:', 'Kuusa 4 qofa qofa — yeroon kee dhufa!') + '\n\n' +
        `1️⃣ Tap <b>📖 My Subjects</b> (or send /browse)\n` +
        `2️⃣ Choose your subject — e.g. <i>Grade 12 Mathematics</i>\n` +
        `3️⃣ Pick a category — <i>Slides, Notes, Exams, Textbooks</i>\n` +
        `4️⃣ Tap the material → it arrives right here in the chat ✅\n\n` +
        `🇪🇹 <i>Yeroon sun chat kee keessatti isiniif gaha!</i>`;
      break;

    case 'faq_search':
      title = '🔍 How to Search Materials';
      content =
        bi('No command needed — just type!', 'Ajaja hin barbaachisu — barreessaa qofa!') + '\n\n' +
        `Type any keyword in this chat, for example:\n` +
        `• <code>Biology</code>\n` +
        `• <code>Grade 12 Physics</code>\n` +
        `• <code>Calculus Mid Exam</code>\n\n` +
        bi('The bot instantly searches every subject and shows one-tap download buttons.',
           'Boti saffisaan hunda barbaada — buqqaalee isiniif kenna.') + '\n\n' +
        `💡 <i>You can also tap 🔍 Search Materials first if you prefer.</i>`;
      break;

    case 'faq_support':
      title = '📞 Contact Support & Payment Help';
      content =
        bi('We usually reply within 24 hours.', 'Sa\'aatii 24 keessatti deebii isiniif kennina.') + '\n\n' +
        `💳 <b>Payment & Subscription:</b>\n` +
        `📱 Telegram: @Tol_man27 (<a href="https://t.me/Tol_man27">t.me/Tol_man27</a>)\n` +
        `📧 Email: tolesatesfaye273@gmail.com\n\n` +
        `🆘 <b>We can help with:</b>\n` +
        `• Payment methods & pricing\n` +
        `• Account activation & access issues\n` +
        `• Plan upgrades & subscriptions\n` +
        `• Technical problems\n` +
        `• Custom material requests\n\n` +
        `🌐 Website: <a href="${getWebUrl()}">${getWebUrl()}</a>`;
      break;

    default:
      return;
  }

  const message = `❓ <b>${title}</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n` +
    `${content}`;

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
