import { Op } from 'sequelize';
import User from '../../../models/User.js';
import Resource from '../../../models/Resource.js';
import Subject from '../../../models/Subject.js';
import { requireAdmin } from '../middleware/auth.js';
import { escapeHtml, formatDivider, formatRoleBadge, getResourceIcon } from '../../utils/ui.js';

/**
 * Show admin search hub
 */
export async function showAdminSearchMenu(bot: any, chatId: number, telegramUserId: string): Promise<void> {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  const card = `🔍 <b>ADMIN SEARCH & AUDIT HUB</b>\n` +
    `${formatDivider()}\n` +
    `Quickly look up users, manage access credentials, and audit uploaded study materials.\n\n` +
    `👇 <b>Select a quick search filter:</b>\n` +
    `${formatDivider()}`;

  const keyboard = [
    [
      { text: '👑 Show All Admins & Super Admins', callback_data: 'admin_search_filter_admins' },
    ],
    [
      { text: '🆕 Newest 10 Registered Students', callback_data: 'admin_search_filter_recent_users' },
    ],
    [
      { text: '📁 Newest 10 Uploaded Materials', callback_data: 'admin_search_filter_recent_resources' },
    ],
    [
      { text: '🔙 Back to Admin Menu', callback_data: 'admin_menu' },
    ],
  ];

  await bot.sendMessage(chatId, card, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
}

/**
 * Handle admin quick search filters
 */
export async function handleAdminFilterSearch(
  bot: any,
  chatId: number,
  telegramUserId: string,
  filterType: string
): Promise<void> {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    if (filterType === 'admins') {
      const users = await User.findAll({
        where: {
          role: {
            [Op.in]: ['admin', 'super_admin'],
          },
        },
        order: [['createdAt', 'ASC']],
      });

      let text = `👑 <b>ADMINISTRATORS & SUPER ADMINS (${users.length})</b>\n` +
        `${formatDivider()}\n`;

      const keyboard: any[][] = [];

      for (const u of users) {
        const badge = formatRoleBadge(u.role);
        text += `• <b>${escapeHtml(u.name || u.username || 'User')}</b> — ${badge}\n` +
          `  ID: <code>${u.telegramId || 'No Telegram'}</code> | <code>${escapeHtml(u.email || '')}</code>\n\n`;

        keyboard.push([
          { text: `👤 View ${u.name || u.username}`, callback_data: `admin_user_view_${u.id}` },
        ]);
      }

      keyboard.push([{ text: '🔙 Back to Search Hub', callback_data: 'admin_search' }]);

      await bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: keyboard },
      });
    } else if (filterType === 'recent_users') {
      const users = await User.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
      });

      let text = `🆕 <b>LATEST 10 REGISTERED USERS</b>\n` +
        `${formatDivider()}\n`;

      const keyboard: any[][] = [];

      for (const u of users) {
        const badge = formatRoleBadge(u.role);
        text += `• <b>${escapeHtml(u.name || u.username || 'User')}</b> (${badge})\n` +
          `  Joined: ${new Date(u.createdAt).toLocaleDateString()} | <code>${escapeHtml(u.email || '')}</code>\n\n`;

        keyboard.push([
          { text: `👤 Manage ${u.name || u.username}`, callback_data: `admin_user_view_${u.id}` },
        ]);
      }

      keyboard.push([{ text: '🔙 Back to Search Hub', callback_data: 'admin_search' }]);

      await bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: keyboard },
      });
    } else if (filterType === 'recent_resources') {
      const resources = await Resource.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
        include: [{ model: Subject, as: 'subject', attributes: ['name', 'code'] }],
      });

      let text = `📁 <b>LATEST 10 STUDY MATERIALS</b>\n` +
        `${formatDivider()}\n`;

      const keyboard: any[][] = [];

      for (const r of resources) {
        const icon = getResourceIcon(r.type);
        const subjName = (r as any).subject?.name ? ` [${(r as any).subject.name}]` : '';
        text += `${icon} <b>${escapeHtml(r.title)}</b>${escapeHtml(subjName)}\n` +
          `  Added: ${new Date(r.createdAt).toLocaleDateString()} | Type: <code>${escapeHtml(r.type)}</code>\n\n`;

        keyboard.push([
          { text: `📄 Audit: ${r.title.substring(0, 30)}`, callback_data: `admin_resource_view_${r.id}` },
        ]);
      }

      keyboard.push([{ text: '🔙 Back to Search Hub', callback_data: 'admin_search' }]);

      await bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: keyboard },
      });
    }
  } catch (error) {
    console.error('Error in admin filter search:', error);
    await bot.sendMessage(chatId, '❌ <i>Error performing search. Please try again.</i>', { parse_mode: 'HTML' });
  }
}
