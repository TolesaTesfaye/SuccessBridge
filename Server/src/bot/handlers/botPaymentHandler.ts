import { formatDivider, getWebUrl } from '../utils/ui.js';
import { getUserByTelegramId } from '../services/userService.js';
import User from '../../models/User.js';
import Payment from '../../models/Payment.js';
import Subject from '../../models/Subject.js';
import SubjectAccess from '../../models/SubjectAccess.js';
import { Op } from 'sequelize';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Store user payment state (waiting for screenshot)
const paymentState = new Map<string, {
  userId: string;
  telegramId: string;
  step: 'waiting_for_screenshot' | 'completed';
  timestamp: number;
}>();

export async function handleBotPayment(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from?.id?.toString() || '';

  try {
    // Get user
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      await bot.sendMessage(chatId, '❌ <i>User not found. Please use /start to register first.</i>', { parse_mode: 'HTML' });
      return;
    }

    // Check if user already has active payment
    const existingPayment = await Payment.findOne({
      where: {
        userId: user.id,
        status: 'pending'
      }
    });

    if (existingPayment) {
      await bot.sendMessage(
        chatId,
        '⏳ <b>Payment Pending</b>\n\n' +
        `You already have a pending payment waiting for approval.\n` +
        `Please wait for the admin to approve your payment.\n\n` +
        `💡 <i>Your payment will be reviewed within 24 hours.</i>`,
        { parse_mode: 'HTML' }
      );
      return;
    }

    // Show payment instructions
    const paymentGuide = `💳 <b>SEND PAYMENT SCREENSHOT</b>\n` +
      `${formatDivider()}\n` +
      `<b>📋 How to Pay (3 Easy Steps):</b>\n\n` +
      `<b>STEP 1:</b> Make Payment (200 Birr)\n` +
      `Send to one of these accounts:\n\n` +
      `🏦 <b>CBE Bank</b>\n` +
      `👤 Tolesa Tesfaye\n` +
      `📱 Account: <code>1000531877156</code>\n\n` +
      `📱 <b>TeleBirr</b>\n` +
      `👤 Tolesa Tesfaye\n` +
      `📱 Number: <code>0975863448</code>\n\n` +
      `📱 <b>M-Pesa</b>\n` +
      `👤 Tolesa Tesfaye\n` +
      `📱 Number: <code>0716000504</code>\n\n` +
      `${formatDivider()}\n` +
      `<b>STEP 2:</b> Take Screenshot\n` +
      `📸 Capture your payment confirmation\n\n` +
      `<b>STEP 3:</b> Send Screenshot Here\n` +
      `📤 Send the screenshot to this chat\n` +
      `⏱️ <b>Approval within 10 minutes!</b>\n\n` +
      `${formatDivider()}\n` +
      `🗣️ <b>Afaan Oromoo:</b>\n` +
      `<i>Qarshii 200 account armaan olii tokko irratti ergaa. Sanaa booda screen shoot kaafii as ergaa. Daqiiqa 10 keessatti approve godhamaaf.</i>\n` +
      `${formatDivider()}\n` +
      `💡 After approval, you'll have access to ALL subjects!`;

    await bot.sendMessage(chatId, paymentGuide, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📤 Ready to Send Screenshot', callback_data: 'ready_to_pay' }],
          [{ text: '❓ Help', callback_data: 'faq_sub' }],
          [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
        ],
      },
    });
  } catch (error) {
    console.error('Error in /botpayment handler:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>An error occurred. Please try again.</i>',
      { parse_mode: 'HTML' }
    );
  }
}

export async function handleReadyToPay(bot: any, chatId: number, telegramUserId: string): Promise<void> {
  try {
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      await bot.sendMessage(chatId, '❌ <i>User not found. Please use /start first.</i>', { parse_mode: 'HTML' });
      return;
    }

    // Set user state to waiting for screenshot
    paymentState.set(telegramUserId, {
      userId: user.id,
      telegramId: telegramUserId,
      step: 'waiting_for_screenshot',
      timestamp: Date.now()
    });

    await bot.sendMessage(
      chatId,
      `✅ <b>Great! Now Send Your Screenshot</b>\n\n` +
      `📸 Please send the payment screenshot as a photo.\n\n` +
      `💡 <i>Make sure the screenshot clearly shows:</i>\n` +
      `• Payment amount (200 Birr)\n` +
      `• Transaction date & time\n` +
      `• Recipient account\n\n` +
      `⏱️ <b>Waiting for your screenshot...</b>`,
      { parse_mode: 'HTML' }
    );
  } catch (error) {
    console.error('Error in ready to pay:', error);
  }
}

export async function handlePaymentScreenshot(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from?.id?.toString() || '';

  try {
    // Check if user is in payment state
    const state = paymentState.get(telegramUserId);
    
    if (!state || state.step !== 'waiting_for_screenshot') {
      // Not waiting for screenshot, ignore
      return;
    }

    // Check if message has photo
    if (!msg.photo || msg.photo.length === 0) {
      await bot.sendMessage(
        chatId,
        '❌ <i>Please send a photo (screenshot) of your payment.</i>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    // Get the highest resolution photo
    const photo = msg.photo[msg.photo.length - 1];
    const fileId = photo.file_id;

    // Get user
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      await bot.sendMessage(chatId, '❌ <i>User not found.</i>', { parse_mode: 'HTML' });
      return;
    }

    // Download the photo
    const file = await bot.getFile(fileId);
    const filePath = file.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`;

    // Send confirmation to user
    await bot.sendMessage(
      chatId,
      `✅ <b>Screenshot Received!</b>\n\n` +
      `📤 Your payment screenshot has been sent to the admin for review.\n\n` +
      `⏱️ <b>Approval Time:</b> Usually within 10-30 minutes\n` +
      `🔔 <b>You'll be notified here once approved!</b>\n\n` +
      `💡 After approval, all subjects will be unlocked on the website:\n` +
      `${getWebUrl()}\n\n` +
      `${formatDivider()}\n` +
      `🗣️ <b>Afaan Oromoo:</b>\n` +
      `<i>Screen shoot kee argameera! Admin daqiiqa 10-30 keessatti approve siif godha. Booda subject hundi banadhaaf.</i>`,
      { parse_mode: 'HTML' }
    );

    // Create payment record
    await Payment.create({
      userId: user.id,
      amount: 200,
      paymentMethod: 'telegram_bot',
      screenshotUrl: fileUrl,
      status: 'pending',
      transactionReference: `TG-${Date.now()}`,
      notes: `Payment via Telegram Bot from @${msg.from?.username || 'unknown'}`
    });

    // Clear payment state
    paymentState.delete(telegramUserId);

    // Collect super admin / admin Telegram IDs to notify
    const adminTelegramIds: string[] = [];

    if (process.env.SUPERADMIN_TELEGRAM_ID) {
      adminTelegramIds.push(process.env.SUPERADMIN_TELEGRAM_ID.trim());
    }
    if (process.env.ADMIN_TELEGRAM_ID && !adminTelegramIds.includes(process.env.ADMIN_TELEGRAM_ID.trim())) {
      adminTelegramIds.push(process.env.ADMIN_TELEGRAM_ID.trim());
    }

    // Also look up any super_admin or admin in database with a linked telegramId
    const adminsWithTelegram = await User.findAll({
      where: {
        role: { [Op.in]: ['super_admin', 'admin'] },
        telegramId: { [Op.ne]: null }
      }
    });

    for (const adm of adminsWithTelegram) {
      if (adm.telegramId && !adminTelegramIds.includes(adm.telegramId)) {
        adminTelegramIds.push(adm.telegramId);
      }
    }

    if (adminTelegramIds.length === 0) {
      console.warn('⚠️ No super admin Telegram ID found! Please set SUPERADMIN_TELEGRAM_ID in your environment or link your superadmin account in Telegram.');
      return;
    }

    // Forward screenshot to all super admins / admins with approval buttons
    const userName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || user.username || 'Unknown User';
    const userTelegramUsername = msg.from?.username ? `@${msg.from.username}` : 'No username';

    for (const targetAdminId of adminTelegramIds) {
      try {
        await bot.sendPhoto(
          targetAdminId,
          fileId,
          {
            caption: 
              `💳 <b>NEW PAYMENT REQUEST</b>\n` +
              `${formatDivider()}\n` +
              `👤 <b>Student:</b> ${userName}\n` +
              `📱 <b>Telegram:</b> ${userTelegramUsername}\n` +
              `🆔 <b>User ID:</b> <code>${user.id}</code>\n` +
              `📧 <b>Email:</b> ${user.email || 'Not set'}\n` +
              `💰 <b>Amount:</b> 200 Birr\n` +
              `📅 <b>Date:</b> ${new Date().toLocaleString()}\n` +
              `${formatDivider()}\n` +
              `⚡ <b>Action Required:</b> Approve or Reject this payment:`,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ Approve Payment', callback_data: `approve_payment_${user.id}` },
                  { text: '❌ Reject Payment', callback_data: `reject_payment_${user.id}` }
                ]
              ]
            }
          }
        );
        console.log(`📤 Sent payment request for user ${user.id} to admin ${targetAdminId}`);
      } catch (err: any) {
        console.error(`❌ Failed to send payment screenshot to admin ${targetAdminId}:`, err?.message || err);
      }
    }

  } catch (error) {
    console.error('Error handling payment screenshot:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>Failed to process screenshot. Please try again or contact support.</i>',
      { parse_mode: 'HTML' }
    );
  }
}

export async function handleApprovePayment(bot: any, query: any, userId: string): Promise<void> {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  try {
    // Get payment
    const payment = await Payment.findOne({
      where: {
        userId: userId,
        status: 'pending'
      }
    });

    if (!payment) {
      await bot.answerCallbackQuery(query.id, {
        text: '❌ Payment not found or already processed',
        show_alert: true
      });
      return;
    }

    // Get user separately
    const user = await User.findByPk(payment.userId);
    
    if (!user) {
      await bot.answerCallbackQuery(query.id, {
        text: '❌ User not found',
        show_alert: true
      });
      return;
    }

    // Update payment status
    payment.status = 'approved';
    payment.approvedAt = new Date();
    await payment.save();

    // Grant access to ALL subjects (one payment unlocks everything)
    const allSubjects = await Subject.findAll();
    
    const accessRecords = allSubjects.map(subject => ({
      userId: payment.userId,
      subjectId: subject.id,
      paymentId: payment.id,
      accessGrantedAt: new Date(),
      educationLevel: payment.educationLevel,
      grade: payment.grade,
      stream: payment.stream,
      universityId: payment.universityId,
      departmentId: payment.departmentId,
    }));

    // Bulk create all access records
    await SubjectAccess.bulkCreate(accessRecords, {
      ignoreDuplicates: true, // Skip if access already exists
    });

    console.log(`✅ [Telegram Bot] Granted access to ${allSubjects.length} subjects for user ${payment.userId}`);

    // Update message to show it's approved
    const userName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || user.username || 'Unknown User';

    await bot.editMessageCaption(
      `✅ <b>PAYMENT APPROVED</b>\n` +
      `${formatDivider()}\n` +
      `👤 <b>Student:</b> ${userName}\n` +
      `💰 <b>Amount:</b> 200 Birr\n` +
      `✅ <b>Status:</b> APPROVED\n` +
      `📅 <b>Approved:</b> ${new Date().toLocaleString()}\n` +
      `${formatDivider()}\n` +
      `🎉 Student now has full access to all subjects!`,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML'
      }
    );

    // Notify user
    if (user.telegramId) {
      await bot.sendMessage(
        user.telegramId,
        `🎉 <b>PAYMENT APPROVED!</b>\n\n` +
        `✅ Your payment of 200 Birr has been approved by the Admin!\n\n` +
        `🎓 <b>You now have full unlimited access:</b>\n` +
        `• Unlimited downloads directly in Telegram Bot\n` +
        `• ALL subjects and study materials unlocked\n` +
        `• Full access on the web platform: ${getWebUrl()}\n\n` +
        `${formatDivider()}\n` +
        `🗣️ <b>Afaan Oromoo:</b>\n` +
        `<i>Baga gammadde! Kaffaltiin kee approve godhameera. Amma Telegram Bot kana keessatti daangaa malee download gochuu dandeessa!</i>\n\n` +
        `🎊 Happy Learning! 📚`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '📚 Browse & Download Materials', callback_data: 'browse_courses' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
    }

    await bot.answerCallbackQuery(query.id, {
      text: '✅ Payment approved successfully!',
      show_alert: true
    });

  } catch (error) {
    console.error('Error approving payment:', error);
    await bot.answerCallbackQuery(query.id, {
      text: '❌ Failed to approve payment',
      show_alert: true
    });
  }
}

export async function handleRejectPayment(bot: any, query: any, userId: string): Promise<void> {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  try {
    // Get payment
    const payment = await Payment.findOne({
      where: {
        userId: userId,
        status: 'pending'
      }
    });

    if (!payment) {
      await bot.answerCallbackQuery(query.id, {
        text: '❌ Payment not found or already processed',
        show_alert: true
      });
      return;
    }

    // Get user separately
    const user = await User.findByPk(payment.userId);
    
    if (!user) {
      await bot.answerCallbackQuery(query.id, {
        text: '❌ User not found',
        show_alert: true
      });
      return;
    }

    // Update payment status
    payment.status = 'rejected';
    await payment.save();

    // Update message to show it's rejected
    const userName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || user.username || 'Unknown User';

    await bot.editMessageCaption(
      `❌ <b>PAYMENT REJECTED</b>\n` +
      `${formatDivider()}\n` +
      `👤 <b>Student:</b> ${userName}\n` +
      `💰 <b>Amount:</b> 200 Birr\n` +
      `❌ <b>Status:</b> REJECTED\n` +
      `📅 <b>Rejected:</b> ${new Date().toLocaleString()}\n` +
      `${formatDivider()}`,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML'
      }
    );

    // Notify user
    if (user.telegramId) {
      await bot.sendMessage(
        user.telegramId,
        `❌ <b>Payment Not Approved</b>\n\n` +
        `Your payment screenshot was not approved.\n\n` +
        `<b>Possible reasons:</b>\n` +
        `• Screenshot unclear or incomplete\n` +
        `• Wrong payment amount\n` +
        `• Transaction details not visible\n\n` +
        `💡 <b>What to do:</b>\n` +
        `1. Check your payment was successful\n` +
        `2. Take a clear screenshot showing all details\n` +
        `3. Try again using /botpayment\n\n` +
        `📞 <b>Need help?</b> Contact: @Tol_man27`,
        { 
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🔄 Try Again', callback_data: 'ready_to_pay' }],
              [{ text: '📞 Contact Support', url: 'https://t.me/Tol_man27' }]
            ]
          }
        }
      );
    }

    await bot.answerCallbackQuery(query.id, {
      text: '❌ Payment rejected',
      show_alert: true
    });

  } catch (error) {
    console.error('Error rejecting payment:', error);
    await bot.answerCallbackQuery(query.id, {
      text: '❌ Failed to reject payment',
      show_alert: true
    });
  }
}
