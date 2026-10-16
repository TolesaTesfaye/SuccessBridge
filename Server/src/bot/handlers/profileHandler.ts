import { getUserByTelegramId } from '../services/userService.js';
import { ResourceNotFoundError } from './errors/index.js';
import { escapeHtml, formatDivider, formatRoleBadge } from '../utils/ui.js';

export async function handleProfile(bot: any, msg: any, explicitUserId?: string): Promise<void> {
  const chatId = msg.chat?.id || msg.chatId;
  const telegramUserId = explicitUserId || msg.from?.id?.toString() || '';

  // Get user from database
  const user = await getUserByTelegramId(telegramUserId);

  if (!user) {
    throw new ResourceNotFoundError(
      'User not found. Please use /start to register.',
      {
        chatId,
        userId: telegramUserId,
        action: 'view_profile',
      }
    );
  }

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || msg.from?.first_name || 'Student';
  const rawUsername = user.username || msg.from?.username;
  const usernameText = rawUsername ? `@${escapeHtml(rawUsername)}` : '<i>Not linked</i>';
  const emailText = user.email ? escapeHtml(user.email) : '<i>Not configured</i>';
  const roleBadge = formatRoleBadge(user.role);
  const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently';

  const profileCard = `👤 <b>STUDENT ACADEMIC PROFILE</b>\n` +
    `${formatDivider()}\n` +
    `👤 <b>Name:</b> ${escapeHtml(displayName)}\n` +
    `📱 <b>Username:</b> ${usernameText}\n` +
    `🆔 <b>Telegram ID:</b> <code>${escapeHtml(telegramUserId)}</code>\n` +
    `📧 <b>Email:</b> <code>${emailText}</code>\n\n` +
    `🛡️ <b>Access Tier:</b> ${roleBadge}\n` +
    `🟢 <b>Account Status:</b> Active Member\n` +
    `📅 <b>Enrolled:</b> ${memberSince}\n` +
    `${formatDivider()}\n` +
    `💡 <i>Manage subscriptions & subjects on the official web portal:</i>\n` +
    `https://success-bridge-ten.vercel.app`;

  const inlineKeyboard = [
    [
      { text: '📖 My Subjects', callback_data: 'mycourses' },
      { text: '🔍 Search Materials', callback_data: 'search_prompt' },
    ],
    [
      { text: '🌐 Open Web Portal', url: 'https://success-bridge-ten.vercel.app' },
      { text: '⚙️ Settings', callback_data: 'user_settings' },
    ],
    [
      { text: '❓ Support / Help', callback_data: 'help_support' },
      { text: '🏠 Main Menu', callback_data: 'main_menu' },
    ],
  ];

  try {
    await bot.sendMessage(chatId, profileCard, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
      disable_web_page_preview: true,
    });
  } catch (err) {
    console.warn('Failed to send HTML profile card, falling back to basic format:', err);
    const plainProfile = `👤 STUDENT ACADEMIC PROFILE\n` +
      `------------------------------------\n` +
      `Name: ${displayName}\n` +
      `Username: ${rawUsername ? '@' + rawUsername : 'N/A'}\n` +
      `ID: ${telegramUserId}\n` +
      `Email: ${user.email || 'Not set'}\n` +
      `Tier: ${user.role || 'Student'}\n` +
      `Status: Active\n` +
      `Member Since: ${memberSince}\n\n` +
      `Portal: https://success-bridge-ten.vercel.app`;

    await bot.sendMessage(chatId, plainProfile, {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    });
  }
}
