import { formatDivider, getWebUrl } from '../utils/ui.js';

export async function handlePayment(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;

  const paymentGuide = `💳 <b>PAYMENT & SUBSCRIPTION GUIDE</b>\n` +
    `${formatDivider()}\n` +
    `<b>Get Full Access to All Materials!</b>\n\n` +
    `📋 <b>HOW TO SUBSCRIBE (4 Easy Steps):</b>\n\n` +
    `<b>STEP 1:</b> 📱 Contact Payment Support\n` +
    `👤 <b>Telegram:</b> @Tol_man27\n` +
    `🔗 <a href="https://t.me/Tol_man27">Click to Chat with @Tol_man27</a>\n` +
    `📧 <b>Email:</b> tolesatesfaye273@gmail.com\n\n` +
    `<b>STEP 2:</b> 💬 Tell Us Your Needs\n` +
    `Let us know:\n` +
    `• Your grade level or university program\n` +
    `• Which subjects you need\n` +
    `• Subscription duration preference\n\n` +
    `<b>STEP 3:</b> 💰 Complete Payment\n` +
    `Our team will provide:\n` +
    `• Available payment methods\n` +
    `• Exact pricing for your plan\n` +
    `• Secure payment instructions\n\n` +
    `<b>STEP 4:</b> ✅ Instant Activation\n` +
    `Once payment confirmed:\n` +
    `• Full website access unlocked\n` +
    `• All materials available here in bot\n` +
    `• Download unlimited documents\n` +
    `• Access to practice quizzes\n` +
    `${formatDivider()}\n` +
    `🎓 <b>What You'll Get:</b>\n` +
    `📚 Lecture slides & presentations\n` +
    `📝 Chapter notes & handouts\n` +
    `📋 Past exams with answers\n` +
    `📖 Reference books & modules\n` +
    `🎯 Practice quizzes & tests\n` +
    `📊 Progress tracking dashboard\n` +
    `${formatDivider()}\n` +
    `💡 <b>Questions?</b> Contact @Tol_man27 anytime!\n` +
    `🌐 <b>Visit Website:</b> <a href="${getWebUrl()}">${getWebUrl()}</a>`;

  await bot.sendMessage(chatId, paymentGuide, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📱 Contact @Tol_man27 Now', url: 'https://t.me/Tol_man27' },
        ],
        [
          { text: '🌐 Visit Website', url: getWebUrl() },
        ],
        [
          { text: '❓ Back to Help Center', callback_data: 'faq_home' },
        ],
        [
          { text: '🏠 Main Menu', callback_data: 'main_menu' },
        ],
      ],
    },
  });
}
