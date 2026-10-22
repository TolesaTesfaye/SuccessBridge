import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { Button } from '../../components/common/Button';
import { FormInput } from '../../components/common/FormInput';
import { Colors, Spacing, BorderRadius } from '../../theme';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { login, isLoading, setUser, setToken } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    try {
      await login(email.trim().toLowerCase(), password);
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        'Login failed. Check your credentials.';
      Alert.alert('Login Failed', msg);
    }
  };

  const handleDemoStudentLogin = () => {
    setUser({
      id: 'demo-student-1',
      name: 'Abebe Kebede',
      email: 'abebe.kebede@student.et',
      role: 'student',
      studentType: 'high_school',
      highSchoolGrade: 'grade_12',
      highSchoolStream: 'natural',
      isApproved: true,
      approvalStatus: 'approved',
      isEmailVerified: true,
    });
    setToken('mock-demo-token');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1A1D2E', '#0F1117']} style={StyleSheet.absoluteFill} />
      <View style={styles.orb} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <LinearGradient colors={['#6C63FF', '#8B5CF6']} style={styles.logoMini}>
            <Ionicons name="school" size={28} color={Colors.white} />
          </LinearGradient>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your learning journey</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <FormInput
            label="Email Address"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
          />
          <FormInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            icon="lock-closed-outline"
            isPassword
            error={errors.password}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotLink}
          >
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>

          <Button
            title={isLoading ? 'Signing in...' : 'Sign In'}
            onPress={handleLogin}
            isLoading={isLoading}
            size="lg"
          />
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social placeholder */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Ionicons name="logo-google" size={22} color={Colors.textPrimary} />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Demo Preview Button */}
        <TouchableOpacity
          style={styles.demoBtn}
          onPress={handleDemoStudentLogin}
          activeOpacity={0.8}
        >
          <Ionicons name="sparkles" size={18} color={Colors.accent} />
          <Text style={styles.demoBtnText}>Quick Preview: Explore Student Home</Text>
        </TouchableOpacity>

        {/* Register link */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  orb: {
    position: 'absolute', width: 280, height: 280, borderRadius: 140,
    backgroundColor: `${Colors.primary}14`, top: -60, right: -80,
  },
  scroll: { flexGrow: 1, paddingHorizontal: Spacing[6], paddingBottom: 40 },
  backBtn: {
    marginTop: 56, marginBottom: Spacing[4],
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.bgCard,
    alignItems: 'center', justifyContent: 'center',
  },
  header: { alignItems: 'center', gap: Spacing[3], marginBottom: Spacing[8] },
  logoMini: {
    width: 60, height: 60, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 10,
  },
  title: { fontFamily: 'Inter_700Bold', fontSize: 30, color: Colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 15, color: Colors.textSecondary, textAlign: 'center' },
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius['2xl'],
    padding: Spacing[6],
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing[6],
  },
  forgotLink: { alignSelf: 'flex-end', marginBottom: Spacing[5], marginTop: -Spacing[2] },
  forgotText: { fontFamily: 'Inter_500Medium', fontSize: 13, color: Colors.primary },
  divider: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], marginBottom: Spacing[5] },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { fontFamily: 'Inter_400Regular', fontSize: 13, color: Colors.textMuted },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: Spacing[3], marginBottom: Spacing[6] },
  socialBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing[2], backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.xl, paddingVertical: Spacing[3],
    borderWidth: 1, borderColor: Colors.border,
  },
  socialText: { fontFamily: 'Inter_500Medium', fontSize: 14, color: Colors.textPrimary },
  registerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  registerText: { fontFamily: 'Inter_400Regular', fontSize: 15, color: Colors.textSecondary },
  registerLink: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: Colors.primary },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    backgroundColor: `${Colors.accent}15`,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing[3],
    borderWidth: 1,
    borderColor: `${Colors.accent}40`,
    marginBottom: Spacing[5],
  },
  demoBtnText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.accent,
  },
});
