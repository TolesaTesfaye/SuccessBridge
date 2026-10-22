import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted' | 'accent' | 'danger' | 'outline';
  size?: 'sm' | 'md';
}

const variantColors = {
  primary: { bg: `${Colors.primary}22`, text: Colors.primaryLight },
  secondary: { bg: `${Colors.secondary}20`, text: Colors.secondary },
  success: { bg: Colors.successLight, text: Colors.success },
  warning: { bg: Colors.warningLight, text: Colors.warning },
  error: { bg: Colors.errorLight, text: Colors.error },
  danger: { bg: Colors.errorLight, text: Colors.error },
  info: { bg: Colors.infoLight, text: Colors.info },
  muted: { bg: Colors.bgMuted, text: Colors.textMuted },
  accent: { bg: `${Colors.accent}20`, text: Colors.accent },
  outline: { bg: 'transparent', text: Colors.textSecondary },
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', size = 'sm' }) => {
  const colors = variantColors[variant];
  return (
    <View style={[styles.base, { backgroundColor: colors.bg }, size === 'md' && styles.md]}>
      <Text style={[styles.text, { color: colors.text }, size === 'md' && styles.textMd]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing[2] + 2,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  md: { paddingHorizontal: Spacing[3], paddingVertical: Spacing[1] },
  text: { fontFamily: 'Inter_600SemiBold', fontSize: 11, letterSpacing: 0.3 },
  textMd: { fontSize: 13 },
});
