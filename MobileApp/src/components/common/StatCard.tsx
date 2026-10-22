import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadow, Typography } from '../../theme';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  trend?: { value: number; isPositive: boolean };
  gradient?: readonly [string, string];
  style?: object;
}

export const StatCard = React.memo<StatCardProps>(
  ({ title, value, subtitle, icon, trend, gradient = Colors.gradientPrimary, style }) => {
    return (
      <View
        style={[styles.container, Shadow.md, style]}
        accessibilityRole="none"
        accessibilityLabel={`${title}: ${value}`}
      >
        <View style={styles.topRow}>
          <LinearGradient
            colors={[...gradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconContainer}
          >
            <Ionicons name={icon} size={22} color={Colors.white} />
          </LinearGradient>
          {trend && (
            <View
              style={[
                styles.trendBadge,
                { backgroundColor: trend.isPositive ? `${Colors.success}20` : `${Colors.error}20` },
              ]}
            >
              <Ionicons
                name={trend.isPositive ? 'trending-up' : 'trending-down'}
                size={12}
                color={trend.isPositive ? Colors.success : Colors.error}
              />
              <Text
                style={[
                  styles.trendText,
                  { color: trend.isPositive ? Colors.success : Colors.error },
                ]}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: Spacing[4],
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing[2],
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  trendText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
  },
  value: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    color: Colors.textPrimary,
    marginTop: Spacing[3],
  },
  title: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: Spacing[1],
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
