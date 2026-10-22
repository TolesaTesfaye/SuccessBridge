import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../../theme';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'default' | 'primary' | 'accent';
}

const getVariantColors = (variant: 'default' | 'primary' | 'accent', selected: boolean) => {
  if (variant === 'accent' && selected) {
    return {
      bg: `${Colors.accent}20`,
      borderColor: Colors.accent,
      textColor: Colors.accent,
    };
  }
  if (selected) {
    return {
      bg: `${Colors.primary}20`,
      borderColor: Colors.primary,
      textColor: Colors.primary,
    };
  }
  return {
    bg: Colors.bgSurface,
    borderColor: Colors.border,
    textColor: Colors.textSecondary,
  };
};

export const Chip = React.memo<ChipProps>(
  ({ label, selected = false, onPress, icon, variant = 'default' }) => {
    const colors = getVariantColors(variant, selected);

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.touchable}
        accessibilityRole="button"
        accessibilityState={{ selected }}
      >
        <View
          style={[
            styles.chip,
            {
              backgroundColor: colors.bg,
              borderColor: colors.borderColor,
            },
          ]}
        >
          {icon && <Ionicons name={icon} size={14} color={colors.textColor} />}
          <Text style={[styles.label, { color: colors.textColor }]}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  touchable: {
    minHeight: 44,
    justifyContent: 'center',
  },
  chip: {
    flexDirection: 'row',
    height: 36,
    paddingHorizontal: Spacing[3],
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    alignItems: 'center',
    gap: Spacing[1] + 2,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
  },
});
