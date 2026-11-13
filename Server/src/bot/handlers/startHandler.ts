import { getUserByTelegramId, createTelegramUser } from '../services/userService.js';
import { deriveStudentCategory } from '../../services/studentCategoryService.js';
import { hasActiveAccess, hasPendingPayment } from '../../services/accessControlService.js';
import { escapeHtml, formatDivider, formatRoleBadge, getMainKeyboard } from '../utils/ui.js';
import { screen, bi, statusChip, DIVIDER, LBL, actionGrid } from '../utils/design.js';
/**
 * Get smart payment button text based on user state
 * (exported so the main-menu dashboard can reuse the same CTA logic)
 */
export async function getPaymentButtonText(user: any): Promise<{ text: string; data: string }> {
  if (!user) return { text: LBL.unlock, data: 'unlock_resources' };

  const category = deriveStudentCategory(user);

  if (!category) {
    return { text: '✏️ Complete Profile First', data: 'setup_profile' };
  }

  const hasAccess = await hasActiveAccess(user.id, category);
  if (hasAccess) {
    return { text: LBL.accessActive, data: 'browse_courses' };
  }

  const pending = await hasPendingPayment(user.id, category);
  if (pending) {
    return { text: LBL.paymentPending, data: 'my_payments' };
  }

  return { text: LBL.unlock, data: 'unlock_resources' };
}

/** Friendly level name for the status chip. */
function levelName(user: any): string | null {
  if (!user) return null;
  if (user.studentType === 'high_school' && user.highSchoolGrade) {
    const map: Record<string, string> = {
      grade_9: 'Grade 9',
      grade_10: 'Grade 10',
      grade_11: 'Grade 11',
      grade_12: 'Grade 12',
    };
    return map[user.highSchoolGrade] || null;
  }
  if (user.studentType === 'university' && user.universityLevel) {
    return user.universityLevel === 'freshman' ? 'Freshman' : 'Remedial';
  }
  return null;
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
      // ── FIRST-RUN ONBOARDING ─────────────────────────────────
      const welcome = screen({
        icon: '🎓',
        title: 'SuccessBridge Learning Hub',
        subtitle:
          `👋 Welcome, <b>${escapeHtml(displayName)}</b>!\n` +
          bi('Your all-in-one study portal — notes, slides and exams for school & university.',
             'Portal barnootaa kee — yeroon, islaayidii fi qormaannoo!'),
        body:
          `⚠️ <b>One quick step before you start</b>\n` +
          bi('Tell us your level — it takes just 2 taps. This is how we show you the right materials and the right price.',
             'Sadarkaa kee nu himi — kuusa 2 qofa qofa.'),
        tipText: 'Your ID is below if an admin ever asks for it.',
      });

      await bot.sendMessage(chatId, welcome, {
        parse_mode: 'HTML',
        reply_markup: {
          // NO keyboard buttons when profile is incomplete
          remove_keyboard: true,
          inline_keyboard: [
            [{ text: '✏️ Set Up My Profile  •  Oodeeffannoo Guuti', callback_data: 'setup_profile' }],
            [{ text: '❓ Why is this needed?', callback_data: 'faq_home' }],
          ],
        },
      });

      // Small ID card so admins can verify users easily
      await bot.sendMessage(
        chatId,
        `${DIVIDER}\n👤 <b>ID:</b> <code>${escapeHtml(telegramUserId)}</code> • ${roleBadge}`,
        { parse_mode: 'HTML' },
      );
      return;
    }

    // ── RETURNING USER DASHBOARD ────────────────────────────────
    const level = levelName(user);
    const cta = await getPaymentButtonText(user);

    const statusLines: string[] = [];
    if (level) statusLines.push(statusChip('🎓', level));
    if (cta.text === LBL.accessActive) statusLines.push(statusChip('🔓', 'Access Active'));
    else if (cta.text === LBL.paymentPending) statusLines.push(statusChip('⏳', 'Payment Review'));
    else statusLines.push(statusChip('🔒', 'Not Unlocked'));

    const dashboard = screen({
      icon: '🎓',
      title: 'SuccessBridge',
      subtitle:
        `👋 Welcome back, <b>${escapeHtml(displayName)}</b>!\n` +
        bi('Ready to study? Pick an action below.', 'Barnoota jalqabi!'),
      body:
        statusLines.join('   •   ') + '\n' +
        DIVIDER + '\n\n' +
        `⚡ <b>QUICK ACTIONS</b>\n` +
        bi('Everything you need is one tap away.',
           'Wanti hunda kuusa tokkon jiraa!'),
      tipText: 'Tip: just type any topic (e.g. "Biology") to search instantly.',
      tipOromoo: 'Barreessaa qofa — fakkeenya "Biology" — boti si barbaada!',
    });

    // Dashboard + persistent reply keyboard
    await bot.sendMessage(chatId, dashboard, {
      parse_mode: 'HTML',
      reply_markup: getMainKeyboard(isAdmin),
    });

    // One-tap action grid (CTA first)
    await bot.sendMessage(chatId, '👇 <b>Choose an action:</b>', {
      parse_mode: 'HTML',
      reply_markup: actionGrid({ ctaText: cta.text, ctaData: cta.data, isAdmin }),
    });
  } catch (error) {
    console.error('Error in /start handler:', error);
    await bot.sendMessage(
      chatId,
      '❌ <i>An error occurred while loading your dashboard. Please try again.</i>',
      { parse_mode: 'HTML' }
    );
  }
}
