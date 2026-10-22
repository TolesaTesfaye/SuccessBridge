import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadow } from '../../theme';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: object;
}

export const SearchBar = React.memo<SearchBarProps>(
  ({ value, onChangeText, placeholder = 'Search...', onFocus, onBlur, style }) => {
    const [isFocused, setIsFocused] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleFocus = () => {
      setIsFocused(true);
      Animated.spring(scaleAnim, {
        toValue: 1.01,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }).start();
      onFocus?.();
    };

    const handleBlur = () => {
      setIsFocused(false);
      Animated.spring(scaleAnim, {
        toValue: 1.0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }).start();
      onBlur?.();
    };

    const handleClear = () => {
      onChangeText('');
    };

    return (
      <Animated.View
        style={[
          styles.container,
          {
            borderColor: isFocused ? Colors.primary : Colors.border,
            transform: [{ scale: scaleAnim }],
          },
          Shadow.sm,
          style,
        ]}
        accessibilityRole="search"
      >
        <Ionicons
          name="search-outline"
          size={18}
          color={isFocused ? Colors.primary : Colors.textMuted}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: Colors.bgSurface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    paddingHorizontal: Spacing[3],
    alignItems: 'center',
    gap: Spacing[2],
  },
  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textPrimary,
    padding: 0,
  },
});
