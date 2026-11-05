import { formatDivider, getWebUrl } from '../utils/ui.js';
import { getUserByTelegramId } from '../services/userService.js';
import User from '../../models/User.js';
import Payment from '../../models/Payment.js';
import { deriveStudentCategory, getStudentCategoryDisplayName, getStudentCategoryEmoji } from '../../services/studentCategoryService.js';
import { hasActiveAccess, hasPendingPayment, grantCategoryAccess } from '../../services/accessControlService.js';
import { getPackageForCategory } from '../../services/packageService.js';
import { isAuthorizedAdmin, getAllAdminTelegramIds, getAdminByTelegramId } from '../utils/adminAuth.js';
import sequelize from '../../config/database.js';
import { paymentState } from '../state/paymentState.js';

/**
 * Handle /botpayment command - show payment instructions
 */
export async function handleBotPayment(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from?.id?.toString() || '';

  try {
    // Get user
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      await bot.sendMessage(
        chatId,
        '❌ <i>User not found. Please use /start to register first.</i>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    // Derive student category
    const studentCategory = deriveStudentCategory(user);
    if (!studentCategory) {
      await bot.sendMessage(
        chatId,
        '⚠️ <b>Profile Incomplete</b>\n\n' +
        'To unlock resources and make payments, we need to know your student category.\n\n' +
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

    // Check if user already has active access
    const hasAccess = await hasActiveAccess(user.id, studentCategory);
    if (hasAccess) {
      await bot.sendMessage(
        chatId,
        `✅ <b>Access Already Active!</b>\n\n` +
        `${getStudentCategoryEmoji(studentCategory)} You already have active access to <b>${getStudentCategoryDisplayName(studentCategory)}</b> resources.\n\n` +
        `📚 Start exploring your resources now!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '📚 Browse Resources', callback_data: 'browse_courses' }],
              [{ text: '📖 My Library', callback_data: 'my_courses' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
      return;
    }

    // Check for existing pending payment
    const pendingPayment = await hasPendingPayment(user.id, studentCategory);
    if (pendingPayment) {
      await bot.sendMessage(
        chatId,
        '⏳ <b>Payment Pending Approval</b>\n\n' +
        `You already have a pending payment waiting for administrator approval.\n\n` +
        `💡 <i>Your payment will be reviewed within 24 hours.</i>\n\n` +
        `Check your payment status anytime by using /mypayments`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '💳 My Payments', callback_data: 'my_payments' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
      return;
    }

    // Get package for student category
    const packageInfo = await getPackageForCategory(studentCategory);
    const price = packageInfo?.price || 200;
    const currency = packageInfo?.currency || 'ETB';

    // Show payment instructions
    const categoryDisplay = getStudentCategoryDisplayName(studentCategory);
    const categoryEmoji = getStudentCategoryEmoji(studentCategory);
    const universityInfo = user.studentType === 'university' && user.university
      ? `\n🏛️ <b>University:</b> ${user.university}`
      : '';

    const paymentGuide = 
      `💳 <b>UNLOCK ALL ${categoryDisplay.toUpperCase()} RESOURCES</b>\n` +
      `${formatDivider()}\n` +
      `${categoryEmoji} <b>Your Package:</b> ${categoryDisplay} Full Access\n` +
      `👤 <b>Student:</b> ${user.name}${universityInfo}\n` +
      `💰 <b>Amount:</b> ${price} ${currency}\n` +
      `⏱️ <b>Access:</b> Lifetime (all current & future resources)\n\n` +
      `${formatDivider()}\n` +
      `<b>📋 HOW TO PAY (3 Easy Steps):</b>\n\n` +
      `<b>STEP 1:</b> Make Payment (${price} ${currency})\n` +
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
      `📸 Capture your payment confirmation showing:\n` +
      `• Payment amount (${price} ${currency})\n` +
      `• Transaction date & time\n` +
      `• Recipient account\n\n` +
      `<b>STEP 3:</b> Submit Screenshot\n` +
      `📤 Click "Submit Payment Proof" and send your screenshot\n\n` +
      `${formatDivider()}\n` +
      `⚠️ <b>IMPORTANT:</b>\n` +
      `• An administrator will verify your payment within 24 hours\n` +
      `• You will be notified once approved\n` +
      `• Access will be activated immediately after approval\n\n` +
      `${formatDivider()}\n` +
      `🗣️ <b>Afaan Oromoo:</b>\n` +
      `<i>Qarshii ${price} account armaan olii tokko irratti ergaa. Sanaa booda screen shoot kaafii as ergaa. Admin daqiiqa muraasa keessatti approve siif godha.</i>`;

    await bot.sendMessage(chatId, paymentGuide, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '📤 Submit Payment Proof', callback_data: 'ready_to_pay' }],
          [{ text: '❓ Help & Support', callback_data: 'faq_sub' }],
          [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
        ],
      },
    });
  } catch (error) {
    console.error('Error in /botpayment handler:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>An error occurred. Please try again later.</i>',
      { parse_mode: 'HTML' }
    );
  }
}

/**
 * Handle ready to pay callback - prompt for screenshot
 */
export async function handleReadyToPay(bot: any, chatId: number, telegramUserId: string): Promise<void> {
  try {
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      await bot.sendMessage(
        chatId,
        '❌ <i>User not found. Please use /start first.</i>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    // Set user state to waiting for screenshot
    await paymentState.startPaymentFlow(
      telegramUserId,
      user.id
    );

    await bot.sendMessage(
      chatId,
      `✅ <b>Ready to Submit Payment Proof</b>\n\n` +
      `📸 Please send your payment screenshot as a photo.\n\n` +
      `💡 <i>Make sure the screenshot clearly shows:</i>\n` +
      `• Payment amount\n` +
      `• Transaction date & time\n` +
      `• Recipient account\n` +
      `• Transaction status (successful)\n\n` +
      `⏱️ <b>Waiting for your screenshot...</b>`,
      { parse_mode: 'HTML' }
    );
  } catch (error) {
    console.error('Error in ready to pay:', error);
  }
}

/**
 * Handle payment screenshot submission
 */
export async function handlePaymentScreenshot(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from?.id?.toString() || '';

  try {
    // Check if user is in payment state
    const state = await paymentState.getState(telegramUserId);
    
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

    // Derive student category
    const studentCategory = deriveStudentCategory(user);
    if (!studentCategory) {
      await bot.sendMessage(
        chatId,
        '❌ <i>Unable to determine your student category.</i>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    // Get package info
    const packageInfo = await getPackageForCategory(studentCategory);
    const price = packageInfo?.price || 200;
    const currency = packageInfo?.currency || 'ETB';

    // Download the photo
    const file = await bot.getFile(fileId);
    const filePath = file.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`;

    // Generate unique transaction reference
    const transactionRef = `PAY-${studentCategory}-${Date.now()}-${user.id.substring(0, 8)}`;

    // Create payment record with PENDING status
    const payment = await Payment.create({
      userId: user.id,
      studentCategory,
      packageId: packageInfo?.id,
      amount: price,
      currency,
      paymentMethod: 'telegram_bot',
      screenshotUrl: fileUrl,
      transactionReference: transactionRef,
      status: 'pending',
      provider: 'manual',
      educationLevel: user.studentType || 'high_school',
      grade: user.highSchoolGrade || undefined,
      universityId: user.universityId || undefined,
      departmentId: user.departmentId || undefined,
      notes: `Payment via Telegram Bot from @${msg.from?.username || 'unknown'}`,
    });

    console.log(`📝 Created payment record: ${payment.id} for user ${user.id} - Category: ${studentCategory}`);

    // Send confirmation to user
    const categoryDisplay = getStudentCategoryDisplayName(studentCategory);
    await bot.sendMessage(
      chatId,
      `✅ <b>Payment Proof Submitted!</b>\n\n` +
      `📤 Your payment has been submitted for administrator review.\n\n` +
      `📋 <b>Payment Details:</b>\n` +
      `👤 Student: ${user.name}\n` +
      `${getStudentCategoryEmoji(studentCategory)} Category: ${categoryDisplay}\n` +
      `💰 Amount: ${price} ${currency}\n` +
      `🔖 Reference: <code>${transactionRef}</code>\n\n` +
      `⏱️ <b>Status:</b> Pending Administrator Approval\n\n` +
      `🔔 <b>You will be notified here once approved!</b>\n` +
      `⏰ Approval usually takes 10-30 minutes (max 24 hours)\n\n` +
      `${formatDivider()}\n` +
      `🗣️ <b>Afaan Oromoo:</b>\n` +
      `<i>Screen shoot kee argameera! Admin daqiiqa muraasa keessatti approve siif godha.</i>`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '💳 My Payments', callback_data: 'my_payments' }],
            [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
          ],
        },
      }
    );

    // Clear payment state
    await paymentState.completePaymentFlow(telegramUserId);

    // Notify all admins
    await notifyAdminsOfNewPayment(bot, user, payment, studentCategory, fileId);

  } catch (error) {
    console.error('Error handling payment screenshot:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>Failed to process screenshot. Please try again or contact support.</i>',
      { parse_mode: 'HTML' }
    );
  }
}

/**
 * Notify admins of new payment submission
 */
async function notifyAdminsOfNewPayment(
  bot: any,
  user: User,
  payment: Payment,
  studentCategory: string,
  photoFileId: string
): Promise<void> {
  const adminTelegramIds = await getAllAdminTelegramIds();

  if (adminTelegramIds.length === 0) {
    console.warn('⚠️ No admin Telegram IDs found! Payment notification not sent.');
    return;
  }

  const userName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || user.username || 'Unknown';
  const userTelegramUsername = user.username ? `@${user.username}` : 'No username';
  const categoryDisplay = getStudentCategoryDisplayName(studentCategory as any);
  const universityInfo = user.university ? `\n🏛️ <b>University:</b> ${user.university}` : '';

  for (const adminId of adminTelegramIds) {
    try {
      await bot.sendPhoto(
        adminId,
        photoFileId,
        {
          caption:
            `💳 <b>NEW PAYMENT FOR REVIEW</b>\n` +
            `${formatDivider()}\n` +
            `👤 <b>Student:</b> ${userName}\n` +
            `📱 <b>Telegram:</b> ${userTelegramUsername}\n` +
            `🆔 <b>User ID:</b> <code>${user.id}</code>\n` +
            `📧 <b>Email:</b> ${user.email || 'Not set'}\n` +
            `${getStudentCategoryEmoji(studentCategory as any)} <b>Category:</b> ${categoryDisplay}${universityInfo}\n` +
            `💰 <b>Amount:</b> ${payment.amount} ${payment.currency}\n` +
            `🔖 <b>Reference:</b> <code>${payment.transactionReference}</code>\n` +
            `📅 <b>Submitted:</b> ${new Date().toLocaleString()}\n` +
            `${formatDivider()}\n` +
            `⚠️ <b>IMPORTANT:</b> Verify the transaction independently before approving!\n\n` +
            `⚡ <b>Action Required:</b>`,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '✅ Approve Payment', callback_data: `approve_payment_${payment.id}` },
                { text: '❌ Reject Payment', callback_data: `reject_payment_${payment.id}` },
              ],
            ],
          },
        }
      );
      console.log(`📤 Sent payment notification for ${payment.id} to admin ${adminId}`);
    } catch (err: any) {
      console.error(`❌ Failed to send payment notification to admin ${adminId}:`, err?.message || err);
    }
  }
}

/**
 * Handle approve payment callback (admin only)
 */
export async function handleApprovePayment(bot: any, query: any, paymentId: string): Promise<void> {
  const adminTelegramId = query.from?.id?.toString();
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  try {
    // CRITICAL: Verify admin authorization
    const isAdmin = await isAuthorizedAdmin(adminTelegramId);
    if (!isAdmin) {
      await bot.answerCallbackQuery(query.id, {
        text: '❌ Unauthorized: You are not authorized to approve payments',
        show_alert: true,
      });
      console.warn(`⚠️ Unauthorized payment approval attempt by Telegram ID: ${adminTelegramId}`);
      return;
    }

    // Get admin user for logging
    const adminUser = await getAdminByTelegramId(adminTelegramId);

    // Start database transaction
    const transaction = await sequelize.transaction();

    try {
      // Get payment
      const payment = await Payment.findByPk(paymentId, { transaction });

      if (!payment) {
        await transaction.rollback();
        await bot.answerCallbackQuery(query.id, {
          text: '❌ Payment not found',
          show_alert: true,
        });
        return;
      }

      // Check if already processed
      if (payment.status !== 'pending') {
        await transaction.rollback();
        await bot.answerCallbackQuery(query.id, {
          text: `❌ Payment already ${payment.status}`,
          show_alert: true,
        });
        return;
      }

      // Get user
      const user = await User.findByPk(payment.userId, { transaction });
      if (!user) {
        await transaction.rollback();
        await bot.answerCallbackQuery(query.id, {
          text: '❌ User not found',
          show_alert: true,
        });
        return;
      }

      // Update payment status
      payment.status = 'approved';
      payment.approvedAt = new Date();
      payment.approvedBy = adminUser?.id || undefined;
      payment.paidAt = new Date();
      await payment.save({ transaction });

      console.log(`✅ Payment ${payment.id} approved by admin ${adminTelegramId}`);

      // Grant category access
      const packageInfo = await getPackageForCategory(payment.studentCategory);
      await grantCategoryAccess(
        payment.userId,
        payment.studentCategory,
        payment.id,
        payment.universityId || undefined,
        packageInfo?.durationDays || undefined
      );

      console.log(`✅ Granted ${payment.studentCategory} access to user ${payment.userId}`);

      // Commit transaction
      await transaction.commit();

      // Send success message (new message, not edit)
      const userName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || user.username || 'Unknown';
      const categoryDisplay = getStudentCategoryDisplayName(payment.studentCategory);

      await bot.sendMessage(
        chatId,
        `✅ <b>PAYMENT APPROVED</b>\n` +
        `${formatDivider()}\n` +
        `👤 <b>Student:</b> ${userName}\n` +
        `${getStudentCategoryEmoji(payment.studentCategory)} <b>Category:</b> ${categoryDisplay}\n` +
        `💰 <b>Amount:</b> ${payment.amount} ${payment.currency}\n` +
        `🔖 <b>Reference:</b> <code>${payment.transactionReference}</code>\n` +
        `✅ <b>Status:</b> APPROVED\n` +
        `👨‍💼 <b>Approved By:</b> ${query.from.first_name}\n` +
        `📅 <b>Approved:</b> ${new Date().toLocaleString()}\n` +
        `${formatDivider()}\n` +
        `🎉 Student now has full access to all ${categoryDisplay} resources!`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🔙 Back to Pending', callback_data: 'admin_payments_pending' }],
              [{ text: '🏠 Admin Menu', callback_data: 'admin_menu' }],
            ],
          },
        }
      );

      // Notify student
      if (user.telegramId) {
        await bot.sendMessage(
          user.telegramId,
          `🎉 <b>PAYMENT APPROVED!</b>\n\n` +
          `✅ Your payment has been approved by an administrator!\n\n` +
          `📋 <b>Access Details:</b>\n` +
          `${getStudentCategoryEmoji(payment.studentCategory)} <b>Category:</b> ${categoryDisplay}\n` +
          `💰 <b>Amount Paid:</b> ${payment.amount} ${payment.currency}\n` +
          `🔖 <b>Reference:</b> <code>${payment.transactionReference}</code>\n` +
          `⏱️ <b>Access:</b> Lifetime (All current & future resources)\n\n` +
          `🎓 <b>You now have full access to:</b>\n` +
          `• All ${categoryDisplay} educational materials\n` +
          `• Unlimited downloads in Telegram Bot\n` +
          `• Full access on web platform: ${getWebUrl()}\n` +
          `• Automatic access to new materials added later\n\n` +
          `${formatDivider()}\n` +
          `🗣️ <b>Afaan Oromoo:</b>\n` +
          `<i>Baga gammadde! Kaffaltiin kee approve godhameera. Amma material hunda daangaa malee download gochuu dandeessa!</i>\n\n` +
          `🎊 Happy Learning! 📚`,
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [{ text: '📚 Browse My Resources', callback_data: 'browse_courses' }],
                [{ text: '📖 My Library', callback_data: 'my_courses' }],
                [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
              ],
            },
          }
        );
      }

      await bot.answerCallbackQuery(query.id, {
        text: '✅ Payment approved and access granted!',
        show_alert: true,
      });

    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Error approving payment:', error);
    await bot.answerCallbackQuery(query.id, {
      text: '❌ Failed to approve payment',
      show_alert: true,
    });
  }
}

/**
 * Handle reject payment callback (admin only)
 */
export async function handleRejectPayment(bot: any, query: any, paymentId: string): Promise<void> {
  const adminTelegramId = query.from?.id?.toString();
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  try {
    // CRITICAL: Verify admin authorization
    const isAdmin = await isAuthorizedAdmin(adminTelegramId);
    if (!isAdmin) {
      await bot.answerCallbackQuery(query.id, {
        text: '❌ Unauthorized: You are not authorized to reject payments',
        show_alert: true,
      });
      console.warn(`⚠️ Unauthorized payment rejection attempt by Telegram ID: ${adminTelegramId}`);
      return;
    }

    // Get admin user for logging
    const adminUser = await getAdminByTelegramId(adminTelegramId);

    // Get payment
    const payment = await Payment.findByPk(paymentId);

    if (!payment) {
      await bot.answerCallbackQuery(query.id, {
        text: '❌ Payment not found',
        show_alert: true,
      });
      return;
    }

    // Check if already processed
    if (payment.status !== 'pending') {
      await bot.answerCallbackQuery(query.id, {
        text: `❌ Payment already ${payment.status}`,
        show_alert: true,
      });
      return;
    }

    // Get user
    const user = await User.findByPk(payment.userId);
    if (!user) {
      await bot.answerCallbackQuery(query.id, {
        text: '❌ User not found',
        show_alert: true,
      });
      return;
    }

    // Update payment status
    payment.status = 'rejected';
    payment.approvedBy = adminUser?.id || undefined;
    payment.rejectionReason = 'Payment verification failed. Please check the details and resubmit.';
    await payment.save();

    console.log(`❌ Payment ${payment.id} rejected by admin ${adminTelegramId}`);

    // Send rejection message (new message, not edit)
    const userName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || user.username || 'Unknown';
    const categoryDisplay = getStudentCategoryDisplayName(payment.studentCategory);

    await bot.sendMessage(
      chatId,
      `❌ <b>PAYMENT REJECTED</b>\n` +
      `${formatDivider()}\n` +
      `👤 <b>Student:</b> ${userName}\n` +
      `${getStudentCategoryEmoji(payment.studentCategory)} <b>Category:</b> ${categoryDisplay}\n` +
      `💰 <b>Amount:</b> ${payment.amount} ${payment.currency}\n` +
      `🔖 <b>Reference:</b> <code>${payment.transactionReference}</code>\n` +
      `❌ <b>Status:</b> REJECTED\n` +
      `👨‍💼 <b>Rejected By:</b> ${query.from.first_name}\n` +
      `📅 <b>Rejected:</b> ${new Date().toLocaleString()}\n` +
      `${formatDivider()}`,
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🔙 Back to Pending', callback_data: 'admin_payments_pending' }],
            [{ text: '🏠 Admin Menu', callback_data: 'admin_menu' }],
          ],
        },
      }
    );

    // Notify student
    if (user.telegramId) {
      await bot.sendMessage(
        user.telegramId,
        `❌ <b>Payment Not Approved</b>\n\n` +
        `Unfortunately, your payment screenshot could not be verified.\n\n` +
        `<b>Possible reasons:</b>\n` +
        `• Screenshot unclear or incomplete\n` +
        `• Transaction details not visible\n` +
        `• Amount mismatch\n` +
        `• Payment not completed\n\n` +
        `💡 <b>What to do next:</b>\n` +
        `1. Verify your payment was successful\n` +
        `2. Take a clear, complete screenshot\n` +
        `3. Resubmit using /botpayment\n\n` +
        `📞 <b>Need help?</b> Contact support: @Tol_man27`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [{ text: '🔄 Submit New Payment', callback_data: 'ready_to_pay' }],
              [{ text: '📞 Contact Support', url: 'https://t.me/Tol_man27' }],
              [{ text: '🏠 Main Menu', callback_data: 'main_menu' }],
            ],
          },
        }
      );
    }

    await bot.answerCallbackQuery(query.id, {
      text: '❌ Payment rejected',
      show_alert: true,
    });

  } catch (error) {
    console.error('Error rejecting payment:', error);
    await bot.answerCallbackQuery(query.id, {
      text: '❌ Failed to reject payment',
      show_alert: true,
    });
  }
}
