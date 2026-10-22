import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, Typography } from '../../theme';

export interface ProgressBarProps {
  /** 0-100 */
  progress: number;
  height?: number;
  showLabel?: boolean;
  gradient?: readonly [string, string];
  style?: object;
}

export const ProgressBar = React.memo<ProgressBarProps>(
  ({ progress, height = 8, showLabel = false, gradient = Colors.gradientPrimary, style }) => {
    const animatedWidth = useRef(new Animated.Value(0)).current;
    const clampedProgress = Math.min(100, Math.max(0, progress));

    useEffect(() => {
      Animated.timing(animatedWidth, {
        toValue: clampedProgress,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }, [clampedProgress]);

    const widthPercentage = animatedWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={style}>
        <View style={[styles.track, { height, borderRadius: BorderRadius.full }]}>
          <Animated.View style={[styles.fillContainer, { width: widthPercentage }]}>
            <LinearGradient
              colors={[...gradient]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.fill, { borderRadius: BorderRadius.full }]}
            />
          </Animated.View>
        </View>
        {showLabel && (
          <Text style={styles.label}>{clampedProgress}%</Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: Colors.bgMuted,
    overflow: 'hidden',
  },
  fillContainer: {
    height: '100%',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
});
