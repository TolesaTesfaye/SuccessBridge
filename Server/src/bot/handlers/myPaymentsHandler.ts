/**
 * My Payments Handler
 * Shows student their payment history and status
 */

import Payment from '../../models/Payment.js';
import { getUserByTelegramId } from '../services/userService.js';
import { deriveStudentCategory, getStudentCategoryDisplayName, getStudentCategoryEmoji } from '../../services/studentCategoryService.js';
import { hasActiveAccess } from '../../services/accessControlService.js';
import { formatDivider } from '../utils/ui.js';

export async function handleMyPayments(bot: any, msg: any, telegramUserId: string): Promise<void> {
  const chatId = msg.chat?.id || msg;

  try {
    // Get user
    const user = await getUserByTelegramId(telegramUserId);
    
    if (!user) {
      await bot.sendMessage(
        chatId,
        '❌ <i>User not found. Please use /start to register.</i>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    // Get student category
    const category = deriveStudentCategory(user);
    if (!category) {
      await bot.sendMessage(
        chatId,
        '⚠️ <i>Unable to determine your student category. Please complete your profile.</i>',
        { parse_mode: 'HTML' }
      );
      return;
    }

    // Check active access
    const hasAccess = await hasActiveAccess(user.id, category);
    const categoryDisplay = getStudentCategoryDisplayName(category);
    const categoryEmoji = getStudentCategoryEmoji(category);

    // Get all payments
    const payments = await Payment.findAll({
      where: { userId: user.id },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    // Build message
    let message = `💰 <b>MY PAYMENTS</b>\n${formatDivider()}\n`;
    
    // Show access status
    if (hasAccess) {
      message += `✅ <b>Active Access</b>\n`;
      message += `${categoryEmoji} <b>Category:</b> ${categoryDisplay}\n`;
      message += `⏱️ <b>Access:</b> Lifetime (All resources unlocked)\n`;
      message += `${formatDivider()}\n\n`;
    } else {
      message += `🔒 <b>No Active Access</b>\n`;
      message += `${categoryEmoji} <b>Your Category:</b> ${categoryDisplay}\n`;
      message += `💰 <b>Price:</b> 200 ETB (One-time payment)\n`;
      message += `${formatDivider()}\n\n`;
    }

    // Show payment history
    if (payments.length === 0) {
      message += `📋 <b>Payment History:</b> No payments yet\n\n`;
      message += `💡 <i>Make a payment to unlock all ${categoryDisplay} resources!</i>`;
    } else {
      message += `📋 <b>Payment History</b> (${payments.length} transaction${payments.length > 1 ? 's' : ''})\n`;
      message += `${formatDivider()}\n\n`;

      for (const payment of payments.slice(0, 5)) {
        const statusEmoji = getPaymentStatusEmoji(payment.status);
        const statusText = getPaymentStatusText(payment.status);
        const dateStr = payment.createdAt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

        message += `${statusEmoji} <b>${statusText}</b>\n`;
        message += `💰 Amount: ${payment.amount} ${payment.currency}\n`;
        message += `📅 Date: ${dateStr}\n`;
        
        if (payment.transactionReference) {
          message += `🔖 Ref: <code>${payment.transactionReference}</code>\n`;
        }
        
        if (payment.status === 'approved' && payment.approvedAt) {
          const approvalDate = new Date(payment.approvedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });
          message += `✅ Approved: ${approvalDate}\n`;
        }
        
        if (payment.status === 'rejected' && payment.rejectionReason) {
          message += `❌ Reason: ${payment.rejectionReason}\n`;
        }
        
        message += `\n`;
      }

      if (payments.length > 5) {
        message += `<i>Showing 5 of ${payments.length} payments</i>\n`;
      }
    }

    // Build keyboard
    const keyboard: any[][] = [];

    if (!hasAccess) {
      keyboard.push([{ text: '💳 Make Payment Now', callback_data: 'unlock_resources' }]);
    } else {
      keyboard.push([{ text: '📚 Browse My Resources', callback_data: 'browse_courses' }]);
    }

    // Check for pending payment
    const pendingPayment = payments.find(p => p.status === 'pending');
    if (pendingPayment) {
      keyboard.push([{ text: '🔄 Check Payment Status', callback_data: `check_payment_${pendingPayment.id}` }]);
    }

    keyboard.push([
      { text: '👤 My Profile', callback_data: 'view_profile' },
      { text: '🏠 Main Menu', callback_data: 'main_menu' }
    ]);

    await bot.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: keyboard },
    });

  } catch (error) {
    console.error('Error in handleMyPayments:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>Error loading payment history. Please try again.</i>',
      { parse_mode: 'HTML' }
    );
  }
}

function getPaymentStatusEmoji(status: string): string {
  const emojis: Record<string, string> = {
    pending: '⏳',
    approved: '✅',
    rejected: '❌',
    cancelled: '🚫',
  };
  return emojis[status] || '❓';
}

function getPaymentStatusText(status: string): string {
  const texts: Record<string, string> = {
    pending: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
    cancelled: 'Cancelled',
  };
  return texts[status] || 'Unknown';
}
