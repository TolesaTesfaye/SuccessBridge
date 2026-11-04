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

    const message = `💳 <b>PAYMENT MANAGEMENT</b>\n` +
      `${formatDivider()}\n` +
      `📊 <b>Statistics:</b>\n` +
      `⏳ Pending: ${pending}\n` +
      `✅ Approved: ${approved}\n` +
      `❌ Rejected: ${rejected}\n` +
      `📋 Total: ${total}\n` +
      `${formatDivider()}\n` +
      `👇 <i>Select an action:</i>`;

    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: `⏳ Pending Payments (${pending})`, callback_data: 'admin_payments_pending' }],
          [
            { text: '✅ Approved', callback_data: 'admin_payments_approved' },
            { text: '❌ Rejected', callback_data: 'admin_payments_rejected' },
          ],
          [{ text: '📊 Payment Stats', callback_data: 'admin_payment_stats' }],
          [{ text: '🔍 Search Payment', callback_data: 'admin_payment_search' }],
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
    
    let message = `${statusEmoji} <b>${status.toUpperCase()} PAYMENTS</b>\n` +
      `${formatDivider()}\n` +
      `Page ${page} of ${totalPages} (${count} total)\n` +
      `${formatDivider()}\n\n`;

    for (const payment of payments) {
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

      message += `👤 <b>${userName}</b>\n`;
      message += `${categoryEmoji} ${categoryDisplay} • ${payment.amount} ${payment.currency}\n`;
      message += `📅 ${dateStr}\n`;
      if (payment.transactionReference) {
        message += `🔖 <code>${payment.transactionReference}</code>\n`;
      }
      message += `\n`;
    }

    // Build keyboard
    const keyboard: any[][] = payments.map(payment => [
      { text: `View ${payment.id.substring(0, 8)}...`, callback_data: `admin_payment_view_${payment.id}` }
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
 * View payment details
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

    let message = `💳 <b>PAYMENT DETAILS</b>\n` +
      `${formatDivider()}\n` +
      `${statusEmoji} <b>Status:</b> ${payment.status.toUpperCase()}\n` +
      `${formatDivider()}\n\n` +
      `👤 <b>Student:</b> ${userName}\n` +
      `📧 <b>Email:</b> ${user?.email || 'N/A'}\n` +
      `📱 <b>Telegram ID:</b> <code>${user?.telegramId || 'N/A'}</code>\n\n` +
      `${categoryEmoji} <b>Category:</b> ${categoryDisplay}\n` +
      `💰 <b>Amount:</b> ${payment.amount} ${payment.currency}\n` +
      `🔖 <b>Reference:</b> <code>${payment.transactionReference || 'N/A'}</code>\n` +
      `💳 <b>Method:</b> ${payment.paymentMethod}\n\n` +
      `📅 <b>Submitted:</b> ${new Date(payment.createdAt).toLocaleString()}\n`;

    if (payment.status === 'approved') {
      message += `✅ <b>Approved:</b> ${new Date(payment.approvedAt!).toLocaleString()}\n`;
      if (approver) {
        message += `👨‍💼 <b>By:</b> ${approver.name}\n`;
      }
    }

    if (payment.status === 'rejected' && payment.rejectionReason) {
      message += `❌ <b>Reason:</b> ${payment.rejectionReason}\n`;
    }

    // Build keyboard
    const keyboard: any[][] = [];

    if (payment.status === 'pending') {
      keyboard.push([
        { text: '✅ Approve', callback_data: `admin_payment_approve_${payment.id}` },
        { text: '❌ Reject', callback_data: `admin_payment_reject_${payment.id}` },
      ]);
    }

    // Show screenshot if available
    if (payment.screenshotUrl) {
      keyboard.push([{ text: '📸 View Screenshot', url: payment.screenshotUrl }]);
    }

    keyboard.push([{ text: '🔙 Back to Pending', callback_data: 'admin_payments_pending' }]);

    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: keyboard },
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

    let message = `📊 <b>PAYMENT STATISTICS</b>\n` +
      `${formatDivider()}\n` +
      `💰 <b>Revenue:</b> ${totalRevenue || 0} ETB\n` +
      `✅ <b>Approved:</b> ${approvedPayments} / ${totalPayments}\n` +
      `📈 <b>Last 7 Days:</b> ${recentPayments} payments\n` +
      `${formatDivider()}\n\n` +
      `<b>By Category:</b>\n`;

    if (categoryStats && categoryStats.length > 0) {
      for (const stat of categoryStats as any[]) {
        const categoryDisplay = getStudentCategoryDisplayName(stat.studentCategory);
        const emoji = getStudentCategoryEmoji(stat.studentCategory);
        message += `${emoji} ${categoryDisplay}: ${stat.count} (${stat.revenue} ETB)\n`;
      }
    } else {
      message += `<i>No approved payments yet</i>\n`;
    }

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
