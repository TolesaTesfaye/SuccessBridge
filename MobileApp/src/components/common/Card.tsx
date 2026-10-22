import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, BorderRadius, Shadow, Spacing } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'surface' | 'bordered' | 'glow' | 'glass' | 'elevated';
  padding?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  padding = Spacing[4],
}) => {
  return (
    <View style={[styles.base, variantStyles[variant], { padding }, style]}>
      {children}
    </View>
  );
};

const variantStyles = StyleSheet.create({
  default: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadow.md,
  },
  surface: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadow.sm,
  },
  bordered: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  glow: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.4)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  glass: {
    backgroundColor: 'rgba(26, 29, 46, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Shadow.md,
  },
  elevated: {
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    ...Shadow.lg,
  },
});

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.xl,
  },
});
