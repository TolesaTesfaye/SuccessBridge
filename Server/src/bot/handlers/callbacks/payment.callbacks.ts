/**
 * Payment-related callback handlers
 * Handles all payment flow callbacks
 */

import { handleBotPayment, handleReadyToPay, handleApprovePayment, handleRejectPayment } from '../payment.handler.js';
import { handleMyPayments } from '../myPaymentsHandler.js';

export async function handlePaymentCallbacks(bot: any, query: any, data: string): Promise<void> {
  const chatId = query.message.chat.id;
  const userId = query.from.id.toString();

  // Unlock resources / Start payment
  if (data === 'unlock_resources' || data === 'payment_info' || data === 'subscribe_now') {
    const userMsg = { chat: { id: chatId }, from: query.from };
    await handleBotPayment(bot, userMsg);
    return;
  }

  // View payment history
  if (data === 'my_payments') {
    await handleMyPayments(bot, chatId, userId);
    return;
  }

  // Ready to submit screenshot
  if (data === 'ready_to_pay') {
    await handleReadyToPay(bot, chatId, userId);
    return;
  }

  // Admin approve payment
  if (data.startsWith('approve_payment_')) {
    const paymentId = data.replace('approve_payment_', '');
    await handleApprovePayment(bot, query, paymentId);
    return;
  }

  // Admin reject payment
  if (data.startsWith('reject_payment_')) {
    const paymentId = data.replace('reject_payment_', '');
    await handleRejectPayment(bot, query, paymentId);
    return;
  }
}
