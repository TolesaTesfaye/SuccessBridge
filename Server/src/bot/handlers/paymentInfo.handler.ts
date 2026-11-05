/**
 * Payment Information & Pricing Display
 * Shows detailed pricing and benefits BEFORE payment submission
 */

import { getUserByTelegramId } from '../services/userService.js';
import { deriveStudentCategory, getStudentCategoryDisplayName, getStudentCategoryEmoji } from '../../services/studentCategoryService.js';
import { hasActiveAccess, hasPendingPayment } from '../../services/accessControlService.js';
import { getPackageForCategory } from '../../services/packageService.js';
import { formatDivider } from '../utils/ui.js';

/**
 * Show payment information screen with pricing and benefits
 */
export async function showPaymentInformation(bot: any, chatId: number, telegramUserId: string): Promise<void> {
  try {
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      await bot.sendMessage(chatId, '❌ User not found. Please use /start first.', { parse_mode: 'HTML' });
      return;
    }

    // Check if profile is complete
    const studentCategory = deriveStudentCategory(user);
    if (!studentCategory) {
      await bot.sendMessage(
        chatId,
        `⚠️ <b>Profile Required</b>\n\n` +
        `Before you can unlock resources, please complete your student profile.\n\n` +
        `We need to know your education level and grade to:\n` +
        `• Show you the correct pricing\n` +
        `• Give you access to relevant materials\n` +
        `• Personalize your learning experience\n\n` +
        `${formatDivider()}\n` +
        `📝 <i>Takes less than 1 minute!</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '✏️ Complete Profile Now', callback_data: 'setup_profile' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
      return;
    }

    // Check if already has access
    const hasAccess = await hasActiveAccess(user.id, studentCategory);
    if (hasAccess) {
      await bot.sendMessage(
        chatId,
        `✅ <b>Access Already Active!</b>\n\n` +
        `${getStudentCategoryEmoji(studentCategory)} You already have full access to all <b>${getStudentCategoryDisplayName(studentCategory)}</b> resources!\n\n` +
        `🎓 <b>Your Benefits:</b>\n` +
        `✅ All subjects unlocked\n` +
        `✅ Unlimited downloads\n` +
        `✅ Lifetime access\n` +
        `✅ Continuous updates\n\n` +
        `${formatDivider()}\n` +
        `📚 Start exploring your materials now!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '📚 Browse My Resources', callback_data: 'browse_courses' }],
              [{ text: '📖 My Library', callback_data: 'mycourses' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
      return;
    }

    // Check if payment is pending
    const pendingPayment = await hasPendingPayment(user.id, studentCategory);
    if (pendingPayment) {
      await bot.sendMessage(
        chatId,
        `⏳ <b>Payment Pending Approval</b>\n\n` +
        `Your payment is currently being reviewed by our admin team.\n\n` +
        `📋 <b>What's Next:</b>\n` +
        `1️⃣ Admin reviews your payment (10-30 min)\n` +
        `2️⃣ You receive approval notification\n` +
        `3️⃣ Instant access to all resources\n\n` +
        `${formatDivider()}\n` +
        `💡 <i>Usually takes 10-30 minutes, maximum 24 hours.</i>\n\n` +
        `🗣️ <b>Afaan Oromoo:</b>\n` +
        `<i>Kaffalti kee ilaalama jirti. Daqiiqa 10-30 keessatti approve godhamta.</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '💰 View Payment Status', callback_data: 'my_payments' }],
              [{ text: '📞 Contact Support', url: 'https://t.me/Tol_man27' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
      return;
    }

    // Get package information
    const packageInfo = await getPackageForCategory(studentCategory);
    const price = packageInfo?.price || 250;
    const currency = packageInfo?.currency || 'ETB';
    const categoryDisplay = getStudentCategoryDisplayName(studentCategory);
    const categoryEmoji = getStudentCategoryEmoji(studentCategory);

    // Build subject list based on category
    const subjects = getSubjectList(studentCategory);

    // Show detailed payment information
    const message = `${categoryEmoji} <b>${categoryDisplay.toUpperCase()} FULL ACCESS PACKAGE</b>\n\n` +
      `${formatDivider()}\n` +
      `💰 <b>Price:</b> ${price} ${currency} (One-Time Payment)\n` +
      `⏰ <b>Duration:</b> Lifetime Access - No Expiry!\n` +
      `${formatDivider()}\n\n` +
      `✅ <b>What's Included:</b>\n\n` +
      `📚 <b>All ${categoryDisplay} Subjects:</b>\n${subjects}\n\n` +
      `📥 <b>All Resource Types:</b>\n` +
      `   • 📊 Lecture Slides & Presentations\n` +
      `   • 📝 Chapter Notes & Handouts\n` +
      `   • 📖 Textbooks & Reference Books\n` +
      `   • 📋 Module Chapters\n` +
      `   • 📄 Past Exams with Answer Keys\n` +
      `   • ✍️ Practice Questions & Quizzes\n` +
      `   • 📚 Study Guides & Summaries\n\n` +
      `🔄 <b>Continuous Updates:</b>\n` +
      `   • New materials added regularly\n` +
      `   • Latest curriculum content\n` +
      `   • Updated exam questions\n\n` +
      `💯 <b>Unlimited Access:</b>\n` +
      `   • Download as many times as you want\n` +
      `   • Access on Telegram Bot & Website\n` +
      `   • Study offline anytime\n\n` +
      `${formatDivider()}\n` +
      `💡 <b>Pay once, learn forever!</b>\n\n` +
      `🗣️ <b>Afaan Oromoo:</b>\n` +
      `<i>Al takka kaffali, bara baraan barnoota.</i>`;

    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: `📱 Proceed to Payment (${price} ${currency})`, callback_data: 'confirm_payment_proceed' }],
          [{ text: '❓ Payment Instructions', callback_data: 'payment_instructions' }],
          [{ text: '💬 Have Questions?', callback_data: 'payment_faq' }],
          [{ text: '🔙 Back to Menu', callback_data: 'main_menu' }],
        ],
      },
    });

  } catch (error) {
    console.error('Error showing payment information:', error);
    await bot.sendMessage(
      chatId,
      '❌ An error occurred. Please try again.',
      { parse_mode: 'HTML' }
    );
  }
}

/**
 * Get subject list based on student category
 */
function getSubjectList(category: string): string {
  const subjects: Record<string, string> = {
    GRADE_9: '   • Mathematics\n   • Physics\n   • Chemistry\n   • Biology\n   • English\n   • Amharic\n   • Civics & Ethics\n   • ICT',
    GRADE_10: '   • Mathematics\n   • Physics\n   • Chemistry\n   • Biology\n   • English\n   • Amharic\n   • Geography\n   • History',
    GRADE_11: '   • Mathematics\n   • Physics\n   • Chemistry\n   • Biology\n   • English\n   • Geography/Economics\n   • And more...',
    GRADE_12: '   • Mathematics\n   • Physics\n   • Chemistry\n   • Biology\n   • English\n   • Geography/Economics\n   • And more...',
    REMEDIAL: '   • Mathematics\n   • Physics\n   • Chemistry\n   • Biology\n   • English\n   • Foundation courses',
    FRESHMAN: '   • Common courses\n   • Department-specific\n   • Foundation subjects\n   • Core modules',
  };

  return subjects[category] || '   • All relevant subjects for your level';
}

/**
 * Show payment FAQ
 */
export async function showPaymentFAQ(bot: any, chatId: number): Promise<void> {
  const faqMessage = `❓ <b>PAYMENT FAQ</b>\n\n` +
    `${formatDivider()}\n\n` +
    `<b>Q: Is it really lifetime access?</b>\n` +
    `A: Yes! Pay once and access forever. No monthly fees.\n\n` +
    `<b>Q: Can I share with friends?</b>\n` +
    `A: No, access is for personal use only.\n\n` +
    `<b>Q: What if I'm not satisfied?</b>\n` +
    `A: 7-day money-back guarantee if materials don't meet expectations.\n\n` +
    `<b>Q: When will I get access?</b>\n` +
    `A: Within 10-30 minutes after payment approval (max 24 hours).\n\n` +
    `<b>Q: Which payment methods?</b>\n` +
    `A: CBE, Telebirr, Bank Transfer, or any Ethiopian bank.\n\n` +
    `<b>Q: Do I need internet?</b>\n` +
    `A: Download materials and study offline anytime!\n\n` +
    `${formatDivider()}\n` +
    `💬 More questions? Contact: @Tol_man27`;

  await bot.sendMessage(chatId, faqMessage, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '📱 Proceed to Payment', callback_data: 'confirm_payment_proceed' }],
        [{ text: '📞 Contact Support', url: 'https://t.me/Tol_man27' }],
        [{ text: '🔙 Back', callback_data: 'unlock_resources' }],
      ],
    },
  });
}

/**
 * Show payment instructions
 */
export async function showPaymentInstructions(bot: any, chatId: number): Promise<void> {
  const instructionsMessage = `📱 <b>HOW TO PAY</b>\n\n` +
    `${formatDivider()}\n\n` +
    `<b>Step 1: Choose Payment Method</b>\n` +
    `• CBE Birr / Telebirr\n` +
    `• Bank Transfer\n` +
    `• Mobile Banking\n\n` +
    `<b>Step 2: Make Payment</b>\n` +
    `Send money to our account\n` +
    `(Details shown in next step)\n\n` +
    `<b>Step 3: Screenshot</b>\n` +
    `Take a clear screenshot showing:\n` +
    `• Transaction successful ✅\n` +
    `• Amount paid 💰\n` +
    `• Transaction date & time ⏰\n` +
    `• Reference number 🔖\n\n` +
    `<b>Step 4: Submit</b>\n` +
    `Send the screenshot to this bot\n\n` +
    `<b>Step 5: Get Access</b>\n` +
    `Admin approves → You get instant access!\n\n` +
    `${formatDivider()}\n` +
    `⏱️ <i>Approval usually takes 10-30 minutes</i>`;

  await bot.sendMessage(chatId, instructionsMessage, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '✅ I Understand - Continue', callback_data: 'confirm_payment_proceed' }],
        [{ text: '❓ FAQ', callback_data: 'payment_faq' }],
        [{ text: '🔙 Back', callback_data: 'unlock_resources' }],
      ],
    },
  });
}
