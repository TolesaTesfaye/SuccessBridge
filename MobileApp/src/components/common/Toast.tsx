import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadow } from '../../theme';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  visible: boolean;
  onDismiss: () => void;
}

const typeConfig = {
  success: {
    icon: 'checkmark-circle' as const,
    color: Colors.success,
    bg: `${Colors.success}18`,
  },
  error: {
    icon: 'close-circle' as const,
    color: Colors.error,
    bg: `${Colors.error}18`,
  },
  warning: {
    icon: 'warning' as const,
    color: Colors.warning,
    bg: `${Colors.warning}18`,
  },
  info: {
    icon: 'information-circle' as const,
    color: Colors.info,
    bg: `${Colors.info}18`,
  },
};

export const Toast = React.memo<ToastProps>(
  ({ message, type = 'info', duration = 3000, visible, onDismiss }) => {
    const insets = useSafeAreaInsets();
    const translateY = useRef(new Animated.Value(80)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const [mounted, setMounted] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const config = typeConfig[type];

    useEffect(() => {
      if (visible) {
        setMounted(true);
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();

        timeoutRef.current = setTimeout(() => {
          onDismiss();
        }, duration);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 80,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setMounted(false);
        });
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [visible, duration, onDismiss]);

    if (!mounted && !visible) {
      return null;
    }

    return (
      <Animated.View
        style={[
          styles.container,
          {
            bottom: insets.bottom + Spacing[4],
            left: Spacing[4],
            right: Spacing[4],
            backgroundColor: config.bg,
            borderColor: `${config.color}4D`,
            transform: [{ translateY }],
            opacity,
          },
          Shadow.md,
        ]}
      >
        <Ionicons name={config.icon} size={20} color={config.color} />
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={onDismiss} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="close" size={18} color={Colors.textMuted} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    borderRadius: BorderRadius.xl,
    padding: Spacing[3] + 2,
    borderWidth: 1,
  },
  message: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.textPrimary,
  },
});
