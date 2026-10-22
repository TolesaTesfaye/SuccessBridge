import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius } from '../../theme';

export interface AvatarProps {
  /** User's full name — initials are derived from first letters of words */
  name: string;
  /** Optional remote or local image URI */
  imageUri?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show a green online indicator dot in the bottom-right corner */
  showOnlineBadge?: boolean;
}

const sizeMap = {
  sm: { dimension: 32, fontSize: 12 },
  md: { dimension: 44, fontSize: 16 },
  lg: { dimension: 56, fontSize: 20 },
  xl: { dimension: 72, fontSize: 26 },
};

const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
  return initials;
};

export const Avatar = React.memo<AvatarProps>(({ name, imageUri, size = 'md', showOnlineBadge = false }) => {
  const { dimension, fontSize } = sizeMap[size];
  const initials = getInitials(name);

  return (
    <View
      style={[styles.container, { width: dimension, height: dimension }]}
      accessibilityLabel={`${name}'s avatar`}
      accessibilityRole="image"
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={[styles.image, { borderRadius: dimension / 2 }]} />
      ) : (
        <LinearGradient
          colors={Colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { borderRadius: dimension / 2 }]}
        >
          <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
        </LinearGradient>
      )}
      {showOnlineBadge && <View style={styles.onlineBadge} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.white,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
  },
});
