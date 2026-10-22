import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/common/Button';
import { Colors, Spacing } from '../../theme';

export const VerifyEmailScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1A1D2E', '#0F1117']} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <View style={styles.iconBg}>
          <Ionicons name="mail-open-outline" size={56} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          We sent a verification link to your email. Please check your inbox and click the link to activate your account.
        </Text>
        <View style={styles.hint}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.secondary} />
          <Text style={styles.hintText}>Check your spam folder if you don't see it.</Text>
        </View>
        <Button title="Back to Login" onPress={() => navigation.navigate('Login' as never)} variant="outline" size="lg" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing[8], gap: Spacing[5] },
  iconBg: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: `${Colors.primary}18`,
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center',
  },
  title: { fontFamily: 'Inter_700Bold', fontSize: 28, color: Colors.textPrimary, textAlign: 'center' },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 15, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  hint: { flexDirection: 'row', gap: Spacing[2], alignItems: 'center', backgroundColor: `${Colors.secondary}10`, padding: Spacing[4], borderRadius: 12 },
  hintText: { fontFamily: 'Inter_400Regular', fontSize: 13, color: Colors.secondary, flex: 1 },
});
