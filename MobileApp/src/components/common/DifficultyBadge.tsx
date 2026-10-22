import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../../theme';

export interface DifficultyBadgeProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

const difficultyConfig = {
  easy: {
    label: 'Easy',
    icon: 'leaf-outline' as const,
    color: Colors.success,
    bg: `${Colors.success}18`,
  },
  medium: {
    label: 'Medium',
    icon: 'flame-outline' as const,
    color: Colors.warning,
    bg: `${Colors.warning}18`,
  },
  hard: {
    label: 'Hard',
    icon: 'skull-outline' as const,
    color: Colors.error,
    bg: `${Colors.error}18`,
  },
};

export const DifficultyBadge = React.memo<DifficultyBadgeProps>(({ difficulty }) => {
  const config = difficultyConfig[difficulty];

  return (
    <View
      style={[styles.container, { backgroundColor: config.bg }]}
      accessibilityLabel={`Difficulty: ${difficulty}`}
      accessibilityRole="text"
    >
      <Ionicons name={config.icon} size={12} color={config.color} />
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: Spacing[1] + 2,
    paddingHorizontal: Spacing[2] + 2,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 0.3,
  },
});
