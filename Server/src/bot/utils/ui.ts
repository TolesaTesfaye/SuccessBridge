/**
 * UI & Aesthetic Utilities for SuccessBridge Telegram Bot
 * Provides consistent styling, HTML escaping, badges, and card formatting.
 */

export function escapeHtml(text?: string | null): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function formatDivider(): string {
  return '━━━━━━━━━━━━━━━━━━━━';
}

export function formatBreadcrumbs(crumbs: string[]): string {
  const cleanCrumbs = crumbs.filter(Boolean).map(c => escapeHtml(c));
  return `📍 <i>${cleanCrumbs.join('  ❯  ')}</i>`;
}

export function formatRoleBadge(role?: string): string {
  if (!role) return '🎓 Student';
  const lower = role.toLowerCase();
  if (lower === 'super_admin') return '👑 Super Admin';
  if (lower === 'admin') return '🛡️ Admin';
  if (lower === 'instructor' || lower === 'teacher') return '👨‍🏫 Instructor';
  return '🎓 Student';
}

export function getResourceIcon(type?: string): string {
  if (!type) return '📄';
  const t = type.toLowerCase().replace(/[-_]/g, '');

  if (t.includes('slide')) return '📊';
  if (t.includes('exam') || t.includes('test') || t.includes('quiz')) return '📋';
  if (t.includes('note') || t.includes('handout') || t.includes('guide')) return '📝';
  if (t.includes('book') || t.includes('module') || t.includes('textbook')) return '📖';
  if (t.includes('worksheet') || t.includes('practice') || t.includes('assignment')) return '✏️';
  if (t.includes('solution') || t.includes('answer')) return '✅';
  if (t.includes('video')) return '🎥';
  if (t.includes('audio') || t.includes('podcast')) return '🎧';

  return '📄';
}

export function formatResourceTypeTitle(type?: string): string {
  if (!type) return 'Study Material';
  const t = type.toLowerCase().replace(/[-_]/g, ' ');
  return t
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function getWebUrl(path: string = ''): string {
  const base = process.env.FRONTEND_URL || 'https://success-bridge-ten.vercel.app';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `${cleanBase}${cleanPath}`;
}

export function getMainKeyboard(isAdmin: boolean = false) {
  const rows: any[][] = [
    [{ text: '📚 Browse Materials' }, { text: '🔍 Search Materials' }],
    [{ text: '📖 My Subjects' }, { text: '🌐 Read on Website' }],
    [{ text: '👤 Student ID' }, { text: '❓ Guide & Help' }],
  ];

  if (isAdmin) {
    rows.push([{ text: '⚡ Admin Panel' }]);
  }

  return {
    keyboard: rows,
    resize_keyboard: true,
  };
}
