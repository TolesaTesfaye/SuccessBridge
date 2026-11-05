/**
 * Admin-related callback handlers
 * Handles admin panel navigation and actions
 */

import { handleAdminCallback } from '../../admin/index.js';

export async function handleAdminCallbacks(bot: any, query: any, data: string, userId: string): Promise<void> {
  const chatId = query.message.chat.id;
  
  // All admin callbacks start with 'admin_'
  if (data.startsWith('admin_')) {
    await handleAdminCallback(bot, chatId, data, userId);
    return;
  }
}
