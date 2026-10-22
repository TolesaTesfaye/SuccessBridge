export const Colors = {
  // Primary brand colors
  primary: '#6C63FF',
  primaryLight: '#8B85FF',
  primaryDark: '#4B44CC',

  // Accent
  secondary: '#00D4AA',
  secondaryLight: '#33DFB8',
  secondaryDark: '#00A882',
  accent: '#00D4AA',
  accentLight: '#33DFB8',
  accentDark: '#00A882',

  // Backgrounds
  bgDark: '#0F1117',
  bgCard: '#1A1D2E',
  bgSurface: '#242740',
  bgMuted: '#2E3250',

  // Text
  textPrimary: '#F0F4FF',
  textSecondary: '#8A92B2',
  textMuted: '#5A6180',
  textInverse: '#0F1117',

  // Status
  success: '#22C55E',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',

  // Borders
  border: '#2E3250',
  borderLight: '#3D4280',
  borderGlow: 'rgba(108, 99, 255, 0.35)',
  cardBorder: 'rgba(255, 255, 255, 0.08)',

  // Overlays and Glass
  overlay: 'rgba(15, 17, 23, 0.85)',
  bgElevated: '#1E2338',
  bgGlass: 'rgba(26, 29, 46, 0.85)',
  primaryGlow: 'rgba(108, 99, 255, 0.35)',
  accentGlow: 'rgba(0, 212, 170, 0.35)',

  // Gradients (used as array pairs)
  gradientPrimary: ['#6C63FF', '#8B5CF6'] as const,
  gradientSecondary: ['#00D4AA', '#3B82F6'] as const,
  gradientDark: ['#1A1D2E', '#0F1117'] as const,
  gradientCard: ['#242740', '#1A1D2E'] as const,
  gradientGlass: ['rgba(36, 39, 64, 0.75)', 'rgba(26, 29, 46, 0.9)'] as const,
  gradientGold: ['#F59E0B', '#D97706'] as const,
  gradientTeal: ['#00D4AA', '#009688'] as const,
  gradientFlame: ['#FF6B35', '#F59E0B'] as const,
  gradientPurple: ['#8B5CF6', '#6366F1'] as const,
  gradientCyan: ['#00B4D8', '#6C63FF'] as const,
  gradientEmerald: ['#10B981', '#059669'] as const,

  // White/black
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export type ColorKey = keyof typeof Colors;
