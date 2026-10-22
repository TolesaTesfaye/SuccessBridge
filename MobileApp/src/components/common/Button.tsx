import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Shadow } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = true,
}) => {
  const activeLoading = isLoading || loading;
  const isDisabled = disabled || activeLoading;

  const sizeStyles = {
    sm: { paddingVertical: Spacing[2], paddingHorizontal: Spacing[4], fontSize: 13 },
    md: { paddingVertical: Spacing[3] + 2, paddingHorizontal: Spacing[5], fontSize: 15 },
    lg: { paddingVertical: Spacing[4], paddingHorizontal: Spacing[6], fontSize: 17 },
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={isDisabled ? [Colors.bgMuted, Colors.bgSurface] : ['#6C63FF', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.base,
            { paddingVertical: sizeStyles[size].paddingVertical, paddingHorizontal: sizeStyles[size].paddingHorizontal },
            !isDisabled && Shadow.glow,
          ]}
        >
          {activeLoading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <View style={styles.row}>
              {icon}
              <Text style={[styles.textBase, { fontSize: sizeStyles[size].fontSize }, styles.textPrimary, textStyle]}>
                {title}
              </Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const variantStyle = {
    secondary: styles.secondary,
    outline: styles.outline,
    ghost: styles.ghost,
    danger: styles.danger,
  }[variant];

  const textVariantStyle = {
    secondary: styles.textSecondary,
    outline: styles.textOutline,
    ghost: styles.textGhost,
    danger: styles.textDanger,
  }[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        variantStyle,
        { paddingVertical: sizeStyles[size].paddingVertical, paddingHorizontal: sizeStyles[size].paddingHorizontal },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {activeLoading ? (
        <ActivityIndicator color={Colors.primary} size="small" />
      ) : (
        <View style={styles.row}>
          {icon}
          <Text style={[styles.textBase, { fontSize: sizeStyles[size].fontSize }, textVariantStyle, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: { width: '100%' },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2] },
  disabled: { opacity: 0.5 },

  secondary: { backgroundColor: Colors.bgSurface },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.primary },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: Colors.error },

  textBase: { fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  textPrimary: { color: Colors.white },
  textSecondary: { color: Colors.textPrimary },
  textOutline: { color: Colors.primary },
  textGhost: { color: Colors.textSecondary },
  textDanger: { color: Colors.white },
});
