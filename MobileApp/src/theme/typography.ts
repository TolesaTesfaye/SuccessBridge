import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Typography = {
  // Font families
  fontFamily: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },

  // Font sizes
  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 19,
    xl: 22,
    '2xl': 26,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
};

export const textStyles = StyleSheet.create({
  h1: {
    fontFamily: 'Inter_700Bold',
    fontSize: Typography.fontSize['4xl'],
    color: Colors.textPrimary,
    letterSpacing: Typography.letterSpacing.tight,
    lineHeight: Typography.fontSize['4xl'] * 1.2,
  },
  h2: {
    fontFamily: 'Inter_700Bold',
    fontSize: Typography.fontSize['3xl'],
    color: Colors.textPrimary,
    letterSpacing: Typography.letterSpacing.tight,
    lineHeight: Typography.fontSize['3xl'] * 1.25,
  },
  h3: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: Typography.fontSize['2xl'],
    color: Colors.textPrimary,
    lineHeight: Typography.fontSize['2xl'] * 1.3,
  },
  h4: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
    lineHeight: Typography.fontSize.xl * 1.35,
  },
  h5: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
  },
  bodyLg: {
    fontFamily: 'Inter_400Regular',
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSize.md * 1.6,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSize.base * 1.6,
  },
  bodySm: {
    fontFamily: 'Inter_400Regular',
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSize.sm * 1.5,
  },
  caption: {
    fontFamily: 'Inter_400Regular',
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    letterSpacing: Typography.letterSpacing.wide,
  },
  button: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: Typography.fontSize.base,
    letterSpacing: Typography.letterSpacing.wide,
  },
});
