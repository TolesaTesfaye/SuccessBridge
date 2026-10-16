import SystemSetting from '../../../models/SystemSetting.js';
import { requireAdmin } from '../middleware/auth.js';
import { escapeHtml, formatDivider } from '../../utils/ui.js';

/**
 * Show system settings menu
 */
export async function showSettingsMenu(bot: any, chatId: number, telegramUserId: string): Promise<void> {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    const settings = await SystemSetting.findAll({
      where: {
        settingKey: [
          'maintenance_mode',
          'require_email_verification',
          'allow_oauth_login',
          'platform_name',
          'platform_email',
          'max_login_attempts',
          'session_timeout_minutes',
        ],
      },
    });

    const settingsMap: Record<string, any> = {};
    for (const s of settings) {
      settingsMap[s.settingKey] = s.settingValue;
    }

    const isMaintenance = Boolean(settingsMap['maintenance_mode']);
    const isEmailVerification = Boolean(settingsMap['require_email_verification']);
    const isOAuth = Boolean(settingsMap['allow_oauth_login']);
    const platformName = settingsMap['platform_name'] || 'SuccessBridge';
    const platformEmail = settingsMap['platform_email'] || 'support@successbridge.com';

    const card = `⚙️ <b>SYSTEM & BOT SETTINGS</b>\n` +
      `${formatDivider()}\n` +
      `Platform: <b>${escapeHtml(platformName)}</b>\n` +
      `Support Email: <code>${escapeHtml(platformEmail)}</code>\n\n` +
      `<b>Current Security & Platform Flags:</b>\n` +
      `• Maintenance Mode: ${isMaintenance ? '🔴 <b>ACTIVE (Users Blocked)</b>' : '🟢 <b>INACTIVE (Normal)</b>'}\n` +
      `• Email Verification: ${isEmailVerification ? '🟢 <b>REQUIRED</b>' : '⚪ <b>OPTIONAL</b>'}\n` +
      `• OAuth Login: ${isOAuth ? '🟢 <b>ENABLED</b>' : '⚪ <b>DISABLED</b>'}\n` +
      `• Max Login Attempts: <b>${settingsMap['max_login_attempts'] || 5}</b>\n` +
      `• Session Timeout: <b>${settingsMap['session_timeout_minutes'] || 60} min</b>\n` +
      `${formatDivider()}\n` +
      `👇 <i>Tap a setting below to toggle or manage:</i>`;

    const keyboard = [
      [
        {
          text: isMaintenance ? '🟢 Disable Maintenance' : '🔴 Enable Maintenance',
          callback_data: 'admin_setting_toggle_maintenance_mode',
        },
      ],
      [
        {
          text: isEmailVerification ? '⚪ Disable Email Verification' : '🟢 Require Email Verification',
          callback_data: 'admin_setting_toggle_require_email_verification',
        },
      ],
      [
        {
          text: isOAuth ? '⚪ Disable OAuth Login' : '🟢 Enable OAuth Login',
          callback_data: 'admin_setting_toggle_allow_oauth_login',
        },
      ],
      [
        { text: '🔄 Refresh Settings', callback_data: 'admin_settings' },
        { text: '🔙 Back to Admin Menu', callback_data: 'admin_menu' },
      ],
    ];

    await bot.sendMessage(chatId, card, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  } catch (error) {
    console.error('Error loading settings menu:', error);
    await bot.sendMessage(chatId, '❌ <i>Error loading system settings. Please try again.</i>', { parse_mode: 'HTML' });
  }
}

/**
 * Toggle boolean setting
 */
export async function toggleSetting(
  bot: any,
  chatId: number,
  telegramUserId: string,
  key: string
): Promise<void> {
  const admin = await requireAdmin(bot, chatId, telegramUserId);
  if (!admin) return;

  try {
    const setting = await SystemSetting.findOne({ where: { settingKey: key } });
    if (!setting) {
      await bot.sendMessage(chatId, `❌ <i>Setting <code>${escapeHtml(key)}</code> not found.</i>`, { parse_mode: 'HTML' });
      return;
    }

    const currentValue = Boolean(setting.settingValue);
    const newValue = !currentValue;

    await setting.update({
      settingValue: newValue,
      updatedBy: admin.id,
    });

    await bot.sendMessage(
      chatId,
      `✅ Setting <b>${escapeHtml(key)}</b> updated to: <b>${newValue ? 'ON / ENABLED' : 'OFF / DISABLED'}</b>`,
      { parse_mode: 'HTML' }
    );

    // Re-render settings menu
    await showSettingsMenu(bot, chatId, telegramUserId);
  } catch (error) {
    console.error(`Error toggling setting ${key}:`, error);
    await bot.sendMessage(chatId, '❌ <i>Error updating setting. Please try again.</i>', { parse_mode: 'HTML' });
  }
}
