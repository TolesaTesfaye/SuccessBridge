import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../../theme';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  message?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'folder-open-outline',
  title,
  description,
  message,
  action,
}) => {
  const displayDesc = description || message;
  return (
    <View style={styles.container}>
      <View style={styles.iconBg}>
        <Ionicons name={icon} size={40} color={Colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {displayDesc && <Text style={styles.desc}>{displayDesc}</Text>}
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: Spacing[8], gap: Spacing[3] },
  iconBg: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: `${Colors.primary}18`,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontFamily: 'Inter_600SemiBold', fontSize: 18, color: Colors.textPrimary, textAlign: 'center' },
  desc: { fontFamily: 'Inter_400Regular', fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  action: { marginTop: Spacing[2] },
});
