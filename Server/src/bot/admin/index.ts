/**
 * Admin Module - Main Router
 * Handles all admin-related callbacks and commands
 */

import { showAdminMenu } from './handlers/menu.js';
import { 
  listUsers, 
  viewUser, 
  changeUserRole, 
  setUserRole,
  toggleUserActive 
} from './handlers/users.js';
import {
  showResourceMenu,
  startResourceUpload,
  viewRecentResources,
  viewResource,
  showResourceStats,
} from './handlers/resources.js';
import { showSettingsMenu, toggleSetting } from './handlers/settings.js';
import { showAdminSearchMenu, handleAdminFilterSearch } from './handlers/search.js';
import {
  showPaymentMenu,
  listPayments,
  viewPaymentDetails,
  showPaymentStats,
} from './handlers/payments.js';
import { requireAdmin } from './middleware/auth.js';

/**
 * Route admin callbacks
 */
export async function handleAdminCallback(
  bot: any,
  chatId: number,
  data: string,
  telegramUserId: string
): Promise<void> {
  try {
    // Main admin menu
    if (data === 'admin_menu') {
      return await showAdminMenu(bot, chatId, telegramUserId);
    }

    // User management
    if (data.startsWith('admin_users_page_')) {
      const page = parseInt(data.replace('admin_users_page_', ''));
      return await listUsers(bot, chatId, telegramUserId, page);
    }

    if (data.startsWith('admin_user_view_')) {
      const userId = data.replace('admin_user_view_', '');
      return await viewUser(bot, chatId, telegramUserId, userId);
    }

    if (data.startsWith('admin_user_role_')) {
      const userId = data.replace('admin_user_role_', '');
      return await changeUserRole(bot, chatId, telegramUserId, userId);
    }

    if (data.startsWith('admin_user_setrole_')) {
      const parts = data.replace('admin_user_setrole_', '').split('_');
      const userId = parts[0];
      const role = parts[1];
      return await setUserRole(bot, chatId, telegramUserId, userId, role);
    }

    if (data.startsWith('admin_user_toggle_')) {
      // Removed - no isActive column
      await bot.sendMessage(chatId, '⚠️ Feature not available (no isActive column in database).');
      return;
    }

    // Resource management
    if (data === 'admin_resources_menu') {
      return await showResourceMenu(bot, chatId, telegramUserId);
    }

    if (data === 'admin_resource_upload_start') {
      return await startResourceUpload(bot, chatId, telegramUserId);
    }

    if (data === 'admin_resource_recent') {
      return await viewRecentResources(bot, chatId, telegramUserId);
    }

    if (data.startsWith('admin_resource_view_')) {
      const resourceId = data.replace('admin_resource_view_', '');
      return await viewResource(bot, chatId, telegramUserId, resourceId);
    }

    if (data === 'admin_resource_stats') {
      return await showResourceStats(bot, chatId, telegramUserId);
    }

    // Statistics
    if (data === 'admin_stats') {
      return await showAdminMenu(bot, chatId, telegramUserId); // Shows stats in menu
    }

    // System Settings
    if (data === 'admin_settings') {
      return await showSettingsMenu(bot, chatId, telegramUserId);
    }

    if (data.startsWith('admin_setting_toggle_')) {
      const key = data.replace('admin_setting_toggle_', '');
      return await toggleSetting(bot, chatId, telegramUserId, key);
    }

    // Admin Search & Audit
    if (data === 'admin_search') {
      return await showAdminSearchMenu(bot, chatId, telegramUserId);
    }

    if (data.startsWith('admin_search_filter_')) {
      const filter = data.replace('admin_search_filter_', '');
      return await handleAdminFilterSearch(bot, chatId, telegramUserId, filter);
    }

    // Payment Management
    if (data === 'admin_payments') {
      return await showPaymentMenu(bot, chatId, telegramUserId);
    }

    if (data === 'admin_payments_pending') {
      return await listPayments(bot, chatId, telegramUserId, 'pending', 1);
    }

    if (data === 'admin_payments_approved') {
      return await listPayments(bot, chatId, telegramUserId, 'approved', 1);
    }

    if (data === 'admin_payments_rejected') {
      return await listPayments(bot, chatId, telegramUserId, 'rejected', 1);
    }

    if (data.startsWith('admin_payments_pending_')) {
      const page = parseInt(data.replace('admin_payments_pending_', ''));
      return await listPayments(bot, chatId, telegramUserId, 'pending', page);
    }

    if (data.startsWith('admin_payments_approved_')) {
      const page = parseInt(data.replace('admin_payments_approved_', ''));
      return await listPayments(bot, chatId, telegramUserId, 'approved', page);
    }

    if (data.startsWith('admin_payments_rejected_')) {
      const page = parseInt(data.replace('admin_payments_rejected_', ''));
      return await listPayments(bot, chatId, telegramUserId, 'rejected', page);
    }

    if (data.startsWith('admin_payment_view_')) {
      const paymentId = data.replace('admin_payment_view_', '');
      return await viewPaymentDetails(bot, chatId, telegramUserId, paymentId);
    }

    if (data === 'admin_payment_stats') {
      return await showPaymentStats(bot, chatId, telegramUserId);
    }

    if (data.startsWith('admin_payment_approve_')) {
      const paymentId = data.replace('admin_payment_approve_', '');
      const { handleApprovePayment } = await import('../handlers/payment.handler.js');
      const query = { id: 'admin_approve', from: { id: telegramUserId }, message: { chat: { id: chatId }, message_id: 0 } };
      await handleApprovePayment(bot, query, paymentId);
      return;
    }

    if (data.startsWith('admin_payment_reject_')) {
      const paymentId = data.replace('admin_payment_reject_', '');
      const { handleRejectPayment } = await import('../handlers/payment.handler.js');
      const query = { id: 'admin_reject', from: { id: telegramUserId }, message: { chat: { id: chatId }, message_id: 0 } };
      await handleRejectPayment(bot, query, paymentId);
      return;
    }

    // No-op (for disabled buttons)
    if (data === 'noop') {
      return;
    }

    // Unknown admin callback
    console.warn('Unknown admin callback:', data);
    await bot.sendMessage(chatId, '⚠️ Feature not yet implemented.');
    
  } catch (error) {
    console.error('Error in admin callback handler:', error);
    await bot.sendMessage(chatId, '❌ An error occurred. Please try again.');
  }
}

/**
 * Handle /admin command
 */
export async function handleAdminCommand(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from.id.toString();

  await showAdminMenu(bot, chatId, telegramUserId);
}

// Export everything
export {
  showAdminMenu,
  listUsers,
  viewUser,
  showResourceMenu,
};
