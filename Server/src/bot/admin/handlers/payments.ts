/**
 * Admin Payment Management Handler
 * Allows admins to view, approve, and reject payments
 */

import Payment from '../../../models/Payment.js';
import User from '../../../models/User.js';
import StudentCategoryAccess from '../../../models/StudentCategoryAccess.js';
import { isAuthorizedAdmin, getAdminByTelegramId } from '../../utils/adminAuth.js';
import { grantCategoryAccess } from '../../../services/accessControlService.js';
import { getPackageForCategory } from '../../../services/packageService.js';
import { getStudentCategoryDisplayName, getStudentCategoryEmoji } from '../../../services/studentCategoryService.js';
import { formatDivider } from '../../utils/ui.js';
import { Op } from 'sequelize';
import sequelize from '../../../config/database.js';

/**
 * Show payment management menu
 */
export async function showPaymentMenu(
  bot: any,
  chatId: number,
  telegramUserId: string
): Promise<void> {
  try {
    // Verify admin
    const isAdmin = await isAuthorizedAdmin(telegramUserId);
    if (!isAdmin) {
      await bot.sendMessage(chatId, '❌ Unauthorized. Admin access required.');
      return;
    }

    // Get payment statistics
    const [pending, approved, rejected, total] = await Promise.all([
      Payment.count({ where: { status: 'pending' } }),
      Payment.count({ where: { status: 'approved' } }),
      Payment.count({ where: { status: 'rejected' } }),
      Payment.count(),
    ]);

    // Get total revenue
    const totalRevenue = await Payment.sum('amount', { where: { status: 'approved' } }) || 0;

    const message = `💳 <b>PAYMENT MANAGEMENT DASHBOARD</b>\n` +
      `${formatDivider()}\n` +
      `📊 <b>OVERVIEW</b>\n` +
      `⏳ <b>Pending Review:</b> ${pending}\n` +
      `✅ <b>Approved:</b> ${approved}\n` +
      `❌ <b>Rejected:</b> ${rejected}\n` +
      `📋 <b>Total Payments:</b> ${total}\n` +
      `💰 <b>Total Revenue:</b> ${totalRevenue.toFixed(2)} ETB\n` +
      `${formatDivider()}\n` +
      `👇 <i>Select an action below:</i>`;

    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: `⏳ Review Pending (${pending})`, callback_data: 'admin_payments_pending' }],
          [
            { text: `✅ Approved (${approved})`, callback_data: 'admin_payments_approved' },
            { text: `❌ Rejected (${rejected})`, callback_data: 'admin_payments_rejected' },
          ],
          [{ text: '📊 Detailed Statistics', callback_data: 'admin_payment_stats' }],
          [{ text: '🔙 Back to Admin Menu', callback_data: 'admin_menu' }],
        ],
      },
    });
  } catch (error) {
    console.error('Error in showPaymentMenu:', error);
    await bot.sendMessage(chatId, '❌ Error loading payment menu.');
  }
}

/**
 * List payments by status
 */
export async function listPayments(
  bot: any,
  chatId: number,
  telegramUserId: string,
  status: 'pending' | 'approved' | 'rejected',
  page: number = 1
): Promise<void> {
  try {
    // Verify admin
    const isAdmin = await isAuthorizedAdmin(telegramUserId);
    if (!isAdmin) {
      await bot.sendMessage(chatId, '❌ Unauthorized.');
      return;
    }

    const limit = 5;
    const offset = (page - 1) * limit;

    const { count, rows: payments } = await Payment.findAndCountAll({
      where: { status },
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'firstName', 'lastName', 'email', 'telegramId'] }],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    if (payments.length === 0) {
      await bot.sendMessage(
        chatId,
        `📋 No ${status} payments found.`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [[{ text: '🔙 Back', callback_data: 'admin_payments' }]],
          },
        }
      );
      return;
    }

    const totalPages = Math.ceil(count / limit);
    const statusEmoji = status === 'pending' ? '⏳' : status === 'approved' ? '✅' : '❌';
    const statusTitle = status === 'pending' ? 'PENDING APPROVALS' : 
                        status === 'approved' ? 'APPROVED PAYMENTS' : 
                        'REJECTED PAYMENTS';
    
    let message = `${statusEmoji} <b>${statusTitle}</b>\n` +
      `${formatDivider()}\n` +
      `📄 Page ${page} of ${totalPages} • Total: ${count}\n` +
      `${formatDivider()}\n\n`;

    for (let i = 0; i < payments.length; i++) {
      const payment = payments[i];
      const user = (payment as any).user;
      const userName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.name || 'Unknown';
      const categoryDisplay = getStudentCategoryDisplayName(payment.studentCategory);
      const categoryEmoji = getStudentCategoryEmoji(payment.studentCategory);
      const dateStr = new Date(payment.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      message += `<b>${i + 1 + offset}.</b> 👤 <b>${userName}</b>\n`;
      message += `   ${categoryEmoji} ${categoryDisplay} • <b>${payment.amount} ${payment.currency}</b>\n`;
      message += `   📅 ${dateStr}`;
      if (payment.transactionReference) {
        message += ` • 🔖 <code>${payment.transactionReference}</code>`;
      }
      message += `\n   📸 ${payment.screenshotUrl ? '✅ Screenshot Provided' : '⚠️ No Screenshot'}\n`;
      message += `\n`;
    }

    message += `${formatDivider()}`;
    if (status === 'pending') {
      message += `\n💡 <i>Click on a payment to review and approve/reject</i>`;
    }

    // Build keyboard
    const keyboard: any[][] = payments.map((payment, index) => [
      { 
        text: `📋 View Payment #${index + 1 + offset}`, 
        callback_data: `admin_payment_view_${payment.id}` 
      }
    ]);

    // Pagination
    const paginationRow = [];
    if (page > 1) {
      paginationRow.push({ text: '◀️ Previous', callback_data: `admin_payments_${status}_${page - 1}` });
    }
    if (page < totalPages) {
      paginationRow.push({ text: 'Next ▶️', callback_data: `admin_payments_${status}_${page + 1}` });
    }
    if (paginationRow.length > 0) {
      keyboard.push(paginationRow);
    }

    keyboard.push([{ text: '🔙 Back to Payments', callback_data: 'admin_payments' }]);

    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: keyboard },
    });

  } catch (error) {
    console.error('Error in listPayments:', error);
    await bot.sendMessage(chatId, '❌ Error loading payments.');
  }
}

/**
 * View payment details with screenshot
 */
export async function viewPaymentDetails(
  bot: any,
  chatId: number,
  telegramUserId: string,
  paymentId: string
): Promise<void> {
  try {
    // Verify admin
    const isAdmin = await isAuthorizedAdmin(telegramUserId);
    if (!isAdmin) {
      await bot.sendMessage(chatId, '❌ Unauthorized.');
      return;
    }

    const payment = await Payment.findByPk(paymentId, {
      include: [
        { model: User, as: 'user' },
        { model: User, as: 'approver' },
      ],
    });

    if (!payment) {
      await bot.sendMessage(chatId, '❌ Payment not found.');
      return;
    }

    const user = (payment as any).user;
    const approver = (payment as any).approver;
    const userName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.name || 'Unknown';
    const categoryDisplay = getStudentCategoryDisplayName(payment.studentCategory);
    const categoryEmoji = getStudentCategoryEmoji(payment.studentCategory);
    const statusEmoji = payment.status === 'pending' ? '⏳' : payment.status === 'approved' ? '✅' : '❌';

    // Build payment details message
    let message = `💳 <b>PAYMENT VERIFICATION</b>\n` +
      `${formatDivider()}\n` +
      `${statusEmoji} <b>Status:</b> ${payment.status.toUpperCase()}\n` +
      `🆔 <b>Payment ID:</b> <code>${payment.id.substring(0, 8)}...</code>\n` +
      `${formatDivider()}\n\n` +
      `<b>📋 STUDENT INFORMATION</b>\n` +
      `👤 <b>Name:</b> ${userName}\n` +
      `📧 <b>Email:</b> ${user?.email || 'N/A'}\n` +
      `📱 <b>Telegram:</b> <code>${user?.telegramId || 'N/A'}</code>\n\n` +
      `<b>💰 PAYMENT DETAILS</b>\n` +
      `${categoryEmoji} <b>Category:</b> ${categoryDisplay}\n` +
      `💵 <b>Amount:</b> <b>${payment.amount} ${payment.currency}</b>\n` +
      `🔖 <b>Reference:</b> <code>${payment.transactionReference || 'N/A'}</code>\n` +
      `💳 <b>Method:</b> ${payment.paymentMethod}\n\n` +
      `<b>📅 TIMELINE</b>\n` +
      `📤 <b>Submitted:</b> ${new Date(payment.createdAt).toLocaleString('en-US', { 
        dateStyle: 'medium', 
        timeStyle: 'short' 
      })}\n`;

    if (payment.status === 'approved') {
      message += `✅ <b>Approved:</b> ${new Date(payment.approvedAt!).toLocaleString('en-US', { 
        dateStyle: 'medium', 
        timeStyle: 'short' 
      })}\n`;
      if (approver) {
        message += `👨‍💼 <b>Approved By:</b> ${approver.name}\n`;
      }
    }

    if (payment.status === 'rejected' && payment.rejectionReason) {
      message += `\n❌ <b>REJECTION REASON</b>\n${payment.rejectionReason}\n`;
    }

    message += `${formatDivider()}`;

    // Build keyboard
    const keyboard: any[][] = [];

    if (payment.status === 'pending') {
      keyboard.push([
        { text: '✅ Approve Payment', callback_data: `admin_payment_approve_${payment.id}` },
        { text: '❌ Reject Payment', callback_data: `admin_payment_reject_${payment.id}` },
      ]);
    }

    keyboard.push([{ text: '🔙 Back to Pending List', callback_data: 'admin_payments_pending' }]);
    keyboard.push([{ text: '🏠 Admin Menu', callback_data: 'admin_menu' }]);

    // Send screenshot first if available
    if (payment.screenshotUrl) {
      try {
        // Try to send the screenshot as a photo
        await bot.sendPhoto(chatId, payment.screenshotUrl, {
          caption: `📸 <b>Payment Proof Screenshot</b>\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `Student: ${userName}\n` +
            `Amount: ${payment.amount} ${payment.currency}\n` +
            `Reference: ${payment.transactionReference || 'N/A'}`,
          parse_mode: 'HTML',
        });
      } catch (photoError) {
        console.warn('Could not send screenshot as photo, sending details only:', photoError);
        message += `\n\n📸 <b>Screenshot URL:</b>\n<a href="${payment.screenshotUrl}">View Payment Proof</a>`;
      }
    } else {
      message += `\n\n⚠️ <i>No screenshot provided</i>`;
    }

    // Send payment details
    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: keyboard },
      disable_web_page_preview: true,
    });

  } catch (error) {
    console.error('Error in viewPaymentDetails:', error);
    await bot.sendMessage(chatId, '❌ Error loading payment details.');
  }
}

/**
 * Show payment statistics
 */
export async function showPaymentStats(
  bot: any,
  chatId: number,
  telegramUserId: string
): Promise<void> {
  try {
    // Verify admin
    const isAdmin = await isAuthorizedAdmin(telegramUserId);
    if (!isAdmin) {
      await bot.sendMessage(chatId, '❌ Unauthorized.');
      return;
    }

    // Get stats
    const [
      totalPayments,
      approvedPayments,
      totalRevenue,
      categoryStats,
      recentPayments
    ] = await Promise.all([
      Payment.count(),
      Payment.count({ where: { status: 'approved' } }),
      Payment.sum('amount', { where: { status: 'approved' } }),
      Payment.findAll({
        attributes: [
          'studentCategory',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
          [sequelize.fn('SUM', sequelize.col('amount')), 'revenue']
        ],
        where: { status: 'approved' },
        group: ['studentCategory'],
        raw: true,
      }),
      Payment.count({
        where: {
          status: 'approved',
          createdAt: { [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
      }),
    ]);

    let message = `📊 <b>DETAILED PAYMENT STATISTICS</b>\n` +
      `${formatDivider()}\n` +
      `<b>💰 REVENUE SUMMARY</b>\n` +
      `Total Revenue: <b>${totalRevenue || 0} ETB</b>\n` +
      `Approved Payments: ${approvedPayments}\n` +
      `Approval Rate: ${totalPayments > 0 ? Math.round((approvedPayments / totalPayments) * 100) : 0}%\n\n` +
      `<b>📈 RECENT ACTIVITY</b>\n` +
      `Last 7 Days: ${recentPayments} payments\n` +
      `${formatDivider()}\n\n` +
      `<b>📚 REVENUE BY CATEGORY</b>\n`;

    if (categoryStats && categoryStats.length > 0) {
      for (const stat of categoryStats as any[]) {
        const categoryDisplay = getStudentCategoryDisplayName(stat.studentCategory);
        const emoji = getStudentCategoryEmoji(stat.studentCategory);
        const revenue = parseFloat(stat.revenue) || 0;
        message += `${emoji} <b>${categoryDisplay}</b>\n`;
        message += `   Payments: ${stat.count} • Revenue: ${revenue.toFixed(2)} ETB\n`;
      }
    } else {
      message += `<i>📭 No approved payments yet</i>\n`;
    }

    message += `${formatDivider()}`;

    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔙 Back to Payments', callback_data: 'admin_payments' }],
        ],
      },
    });

  } catch (error) {
    console.error('Error in showPaymentStats:', error);
    await bot.sendMessage(chatId, '❌ Error loading statistics.');
  }
}
