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
    `• /payment — View subscription & payment guide\n` +
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
      { text: '💳 Payment & Subscription Guide', callback_data: 'faq_sub' },
    ],
    [
      { text: '📞 Contact Support (Payment Help)', callback_data: 'faq_support' },
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
      title = '💳 Subscriptions & Payment Guide';
      content = `<b>How to Subscribe & Get Full Access:</b>\n\n` +
        `📋 <b>STEP 1: Choose Your Plan</b>\n` +
        `Visit the website to see available subscription plans:\n` +
        `👉 <a href="${getWebUrl()}">${getWebUrl()}</a>\n\n` +
        `📋 <b>STEP 2: Contact Payment Support</b>\n` +
        `To complete your payment and activate access:\n` +
        `📱 <b>Telegram:</b> @Tol_man27 or <a href="https://t.me/Tol_man27">t.me/Tol_man27</a>\n` +
        `📧 <b>Email:</b> tolesatesfaye273@gmail.com\n\n` +
        `📋 <b>STEP 3: Make Payment</b>\n` +
        `Our support team will provide you with:\n` +
        `• Available payment methods\n` +
        `• Pricing for your selected plan\n` +
        `• Payment instructions\n\n` +
        `📋 <b>STEP 4: Instant Activation</b>\n` +
        `Once payment is confirmed:\n` +
        `✅ Full access unlocked on website\n` +
        `✅ All materials available in Telegram bot\n` +
        `✅ Download unlimited documents\n\n` +
        `💡 <i>Questions? Contact @Tol_man27 anytime!</i>`;
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
      title = '📞 Contact Support & Payment Help';
      content = `<b>Get Help From Our Team:</b>\n\n` +
        `💳 <b>Payment & Subscription Support:</b>\n` +
        `📱 Telegram: @Tol_man27\n` +
        `🔗 Direct Link: <a href="https://t.me/Tol_man27">t.me/Tol_man27</a>\n` +
        `📧 Email: tolesatesfaye273@gmail.com\n\n` +
        `🆘 <b>What We Can Help With:</b>\n` +
        `• Payment methods and pricing\n` +
        `• Account verification and activation\n` +
        `• Subscription plans and upgrades\n` +
        `• Technical support and troubleshooting\n` +
        `• Custom material requests\n` +
        `• Access issues and account recovery\n\n` +
        `⏱️ <b>Response Time:</b> Usually within 24 hours\n` +
        `🌐 <b>Website:</b> <a href="${getWebUrl()}">${getWebUrl()}</a>\n\n` +
        `💡 <i>For payment inquiries, always contact @Tol_man27 first!</i>`;
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
