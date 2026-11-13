/**
 * SuccessBridge Bot Design System
 * ─────────────────────────────────────────────────────────────
 * One consistent visual language for every screen:
 *
 *  1. English first (clear + short), Afaan Oromoo 🇪🇹 guidance line
 *     below the key instruction of each screen.
 *  2. Predictable structure: HEADER → BODY → TIP → NAV.
 *  3. Predictable navigation: every inline screen ends with
 *     [⬅️ Back] [🏠 Main Menu] on one row.
 *  4. One primary action per screen, visually first.
 */

import { escapeHtml } from './ui.js';

export const DIVIDER = '━━━━━━━━━━━━━━━━━━━━';
export const THIN_DIVIDER = '─────────────────────';

/** English line + Afaan Oromoo line (italic, flagged). */
export function bi(en: string, om: string): string {
  return `${en}\n🇪🇹 <i>${escapeHtml(om)}</i>`;
}

/** Screen header: icon + bold title + optional subtitle, above a divider. */
export function header(icon: string, title: string, subtitle?: string): string {
  let out = `${icon} <b>${escapeHtml(title.toUpperCase())}</b>\n${DIVIDER}`;
  if (subtitle) out += `\n${subtitle}`;
  return out;
}

/** Tip / hint footer line. */
export function tip(en: string, om?: string): string {
  let out = `💡 <i>${escapeHtml(en)}</i>`;
  if (om) out += `\n💡 <i>${escapeHtml(om)}</i>`;
  return out;
}

/**
 * Full screen layout. Keeps every screen looking the same:
 * header, body, optional tip, bottom divider.
 */
export function screen(opts: {
  icon: string;
  title: string;
  subtitle?: string;
  body?: string;
  tipText?: string;
  tipOromoo?: string;
}): string {
  const parts = [header(opts.icon, opts.title, opts.subtitle)];
  if (opts.body) parts.push('', opts.body);
  if (opts.tipText) {
    parts.push('', THIN_DIVIDER, '', tip(opts.tipText, opts.tipOromoo));
  }
  parts.push(DIVIDER);
  return parts.join('\n');
}

/** Compact status chip used under the welcome header. */
export function statusChip(label: string, value: string): string {
  return `${label} <b>${escapeHtml(value)}</b>`;
}

/* ─────────────────────────────────────────────────────────────
   CANONICAL KEYBOARDS
   ───────────────────────────────────────────────────────────── */

/** Standard last row of any screen: Back + Home. */
export function navRow(backData: string = 'main_menu'): any[] {
  return [
    { text: '⬅️ Back', callback_data: backData === 'main_menu' ? 'main_menu' : backData },
    { text: '🏠 Main Menu', callback_data: 'main_menu' },
  ];
}

/** Full standard nav keyboard: [⬅️ Back | 🏠 Main Menu] */
export function navKeyboard(backData: string = 'main_menu'): any {
  return { inline_keyboard: [navRow(backData)] };
}

/** Labels shared across screens (single source of truth). */
export const LBL = {
  browse: '📚 Browse Materials',
  search: '🔍 Search Materials',
  mySubjects: '📖 My Subjects',
  profile: '👤 My Profile',
  payments: '💰 My Payments',
  website: '🌐 Read on Website',
  help: '❓ Help & FAQ',
  admin: '⚡ Admin Panel',
  unlock: '💳 Unlock All Resources',
  accessActive: '✅ Access Active — Browse Now',
  paymentPending: '⏳ Payment Under Review',
  completeProfile: '✏️ Complete Profile Now',
  back: '⬅️ Back',
  home: '🏠 Main Menu',
} as const;

/**
 * The canonical student action grid (inline).
 * CTA row is always first and full-width.
 */
export function actionGrid(opts: {
  ctaText: string;
  ctaData: string;
  isAdmin?: boolean;
}): any {
  return {
    inline_keyboard: [
      [{ text: opts.ctaText, callback_data: opts.ctaData }],
      [
        { text: LBL.search, callback_data: 'search_prompt' },
        { text: LBL.mySubjects, callback_data: 'mycourses' },
      ],
      [
        { text: LBL.payments, callback_data: 'my_payments' },
        { text: LBL.profile, callback_data: 'view_profile' },
      ],
      [
        { text: LBL.website, callback_data: 'open_website' },
        { text: LBL.help, callback_data: 'faq_home' },
      ],
    ],
  };
}
