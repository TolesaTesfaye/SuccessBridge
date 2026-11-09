import { getUserByTelegramId, createTelegramUser } from '../services/userService.js';
import { deriveStudentCategory } from '../../services/studentCategoryService.js';
import { hasActiveAccess, hasPendingPayment } from '../../services/accessControlService.js';
import { escapeHtml, formatDivider, formatRoleBadge, getMainKeyboard, getWebUrl } from '../utils/ui.js';

/**
 * Get smart payment button text based on user state
 */
async function getPaymentButtonText(user: any): Promise<string> {
  if (!user) return '💳 Unlock All Resources';
  
  const category = deriveStudentCategory(user);
  
  if (!category) {
    return '✏️ Complete Profile First';
  }
  
  const hasAccess = await hasActiveAccess(user.id, category);
  if (hasAccess) {
    return '✅ Access Active - Browse Now';
  }
  
  const pending = await hasPendingPayment(user.id, category);
  if (pending) {
    return '⏳ Payment Pending Review';
  }
  
  return '💳 Unlock All Resources';
}

export async function handleStart(bot: any, msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const telegramUserId = msg.from?.id?.toString() || '';
  const username = msg.from?.username || msg.from?.first_name || 'Student';

  try {
    // Check if user exists
    let user = await getUserByTelegramId(telegramUserId);

    if (!user) {
      // Create new user
      user = await createTelegramUser({
        telegramId: telegramUserId,
        username: msg.from?.username,
        firstName: msg.from?.first_name,
        lastName: msg.from?.last_name,
      });
    }

    const displayName = user
      ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || user.username || msg.from?.first_name || username
      : msg.from?.first_name || username;
    const roleBadge = formatRoleBadge(user?.role);
    const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
    
    // Check if profile is complete
    const category = deriveStudentCategory(user);
    const isProfileComplete = category !== null;

    if (!isProfileComplete) {
      // Profile is INCOMPLETE - Show ONLY profile setup, NO quick actions
      const welcomeBanner = `🎓 <b>SUCCESSBRIDGE LEARNING HUB</b>\n` +
        `${formatDivider()}\n` +
        `👋 Welcome, <b>${escapeHtml(displayName)}</b>!\n` +
        `<i>Your all-in-one portal for high school and university academic excellence.</i>\n\n` +
        `⚠️ <b>Profile Setup Required</b>\n\n` +
        `Before you can access materials and make payments, you need to complete your student profile.\n\n` +
        `📝 <b>What we need to know:</b>\n` +
        `• Are you a High School or University student?\n` +
        `• Your Grade (9-12) or Level (Freshman/Remedial)\n\n` +
        `This helps us:\n` +
        `✅ Show you the right study materials\n` +
        `✅ Calculate correct payment amounts\n` +
        `✅ Provide personalized learning resources\n\n` +
        `${formatDivider()}\n` +
        `👤 <b>Student ID:</b> <code>${escapeHtml(telegramUserId)}</code> • ${roleBadge}\n\n` +
        `👇 <b>Click below to complete your profile in 2 simple steps:</b>`;

      await bot.sendMessage(chatId, welcomeBanner, {
        parse_mode: 'HTML',
        reply_markup: {
          // NO keyboard buttons when profile is incomplete
          remove_keyboard: true,
          inline_keyboard: [
            [
              { text: '✏️ Complete Profile Now', callback_data: 'setup_profile' },
            ],
            [
              { text: '❓ Why is this required?', callback_data: 'faq_home' },
            ],
          ],
        },
      });
      
      // DO NOT send quick actions menu - return immediately
      return;
    }

    // Profile is COMPLETE - Show normal welcome with all options
    const welcomeBanner = `🎓 <b>SUCCESSBRIDGE LEARNING HUB</b>\n` +
      `${formatDivider()}\n` +
      `👋 Welcome back, <b>${escapeHtml(displayName)}</b>!\n` +
      `<i>Your all-in-one portal for high school and university academic excellence.</i>\n\n` +
      `🚀 <b>How to Get Started in 3 Easy Steps:</b>\n` +
      `1️⃣ <b>Browse Materials:</b> Select your Grade (9-12) or University program (Freshman / Remedial).\n` +
      `2️⃣ <b>Download Docs:</b> Receive lecture slides, chapter modules, and past exams directly in this chat.\n` +
      `3️⃣ <b>Read on Web:</b> Enjoy full-screen reading, bookmarks, and chapter practice quizzes on our website!\n\n` +
      `💡 <i>Quick Tip: Type any topic (e.g. <code>Biology</code> or <code>Calculus</code>) anytime in this chat to search instantly!</i>\n` +
      `${formatDivider()}\n` +
      `👤 <b>Student ID:</b> <code>${escapeHtml(telegramUserId)}</code> • ${roleBadge}`;

    await bot.sendMessage(chatId, welcomeBanner, {
      parse_mode: 'HTML',
      reply_markup: getMainKeyboard(isAdmin),
    });

    // Get smart button text
    const paymentButtonText = await getPaymentButtonText(user);
    const profileStatus = '✅ Complete';

    // Send quick action inline menu with smart labels
    await bot.sendMessage(
      chatId,
      '⚡ <b>Student Quick Actions:</b>',
      {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: paymentButtonText, callback_data: 'unlock_resources' },
            ],
            [
              { text: '🔍 Search Materials', callback_data: 'search_prompt' },
              { text: '📖 My Subjects', callback_data: 'mycourses' },
            ],
            [
              { text: '💰 My Payments', callback_data: 'my_payments' },
              { text: `👤 Profile ${profileStatus}`, callback_data: 'view_profile' },
            ],
            [
              { text: '🌐 Website Preview', callback_data: 'open_website' },
              { text: '❓ Help & FAQ', callback_data: 'faq_home' },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error('Error in /start handler:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>An error occurred while loading your dashboard. Please try again.</i>',
      { parse_mode: 'HTML' }
    );
  }
}
