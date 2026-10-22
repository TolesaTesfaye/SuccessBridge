import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { authApi } from '../../api/auth';
import { Button } from '../../components/common/Button';
import { FormInput } from '../../components/common/FormInput';
import { Colors, Spacing, BorderRadius } from '../../theme';

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) return Alert.alert('Error', 'Please enter your email');
    setIsLoading(true);
    try {
      await authApi.forgotPassword(email.trim().toLowerCase());
      setSent(true);
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1A1D2E', '#0F1117']} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <LinearGradient colors={['#6C63FF', '#8B5CF6']} style={styles.iconBg}>
            <Ionicons name={sent ? 'mail' : 'lock-open-outline'} size={36} color={Colors.white} />
          </LinearGradient>
        </View>

        <Text style={styles.title}>{sent ? 'Check Your Email' : 'Reset Password'}</Text>
        <Text style={styles.subtitle}>
          {sent
            ? `We sent a reset link to ${email}. Check your inbox and follow the instructions.`
            : "Enter your registered email and we'll send you a reset link."}
        </Text>

        {!sent && (
          <>
            <View style={styles.card}>
              <FormInput label="Email Address" placeholder="your@email.com" value={email} onChangeText={setEmail} icon="mail-outline" keyboardType="email-address" autoCapitalize="none" />
            </View>
            <Button title="Send Reset Link" onPress={handleSubmit} isLoading={isLoading} size="lg" />
          </>
        )}

        {sent && (
          <Button title="Back to Login" onPress={() => navigation.goBack()} variant="outline" size="lg" />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: Spacing[6], paddingBottom: 40 },
  backBtn: {
    marginTop: 56, marginBottom: Spacing[6], width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.bgCard, alignItems: 'center', justifyContent: 'center',
  },
  iconContainer: { alignItems: 'center', marginBottom: Spacing[6] },
  iconBg: {
    width: 80, height: 80, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 12,
  },
  title: { fontFamily: 'Inter_700Bold', fontSize: 28, color: Colors.textPrimary, textAlign: 'center', marginBottom: Spacing[3] },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 15, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: Spacing[8] },
  card: { backgroundColor: Colors.bgCard, borderRadius: BorderRadius['2xl'], padding: Spacing[5], borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing[5] },
});
