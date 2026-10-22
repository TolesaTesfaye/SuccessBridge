import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '../../theme';

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  variant?: 'rect' | 'circle';
  style?: object;
}

export const Skeleton = React.memo<SkeletonProps>(
  ({ width = '100%', height = 16, borderRadius = BorderRadius.md, variant = 'rect', style }) => {
    const opacity = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1.0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }, []);

    const computedStyle =
      variant === 'circle'
        ? {
            width: height,
            height: height,
            borderRadius: height / 2,
          }
        : {
            width,
            height,
            borderRadius,
          };

    return (
      <Animated.View
        style={[styles.skeleton, computedStyle, { opacity }, style]}
        accessibilityLabel="Loading"
        accessibilityRole="none"
      />
    );
  }
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Colors.bgSurface,
  },
});
