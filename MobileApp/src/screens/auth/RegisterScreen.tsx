import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { Button } from '../../components/common/Button';
import { FormInput } from '../../components/common/FormInput';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { StudentType, HighSchoolGrade, HighSchoolStream, UniversityLevel } from '../../types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

type Step = 1 | 2 | 3;

const STUDENT_TYPES = [
  { value: 'high_school', label: 'High School', icon: 'school-outline' as const },
  { value: 'university', label: 'University', icon: 'business-outline' as const },
] as const;

const HS_GRADES = ['grade_9', 'grade_10', 'grade_11', 'grade_12'];
const HS_STREAMS = [{ value: 'natural', label: 'Natural Science' }, { value: 'social', label: 'Social Science' }];
const UNI_LEVELS = [
  { value: 'remedial', label: 'Remedial' },
  { value: 'freshman', label: 'Freshman' },
];

const SelectOption: React.FC<{ label: string; selected: boolean; onPress: () => void; icon?: keyof typeof Ionicons.glyphMap }> = ({ label, selected, onPress, icon }) => (
  <TouchableOpacity onPress={onPress} style={[styles.option, selected && styles.optionSelected]}>
    {icon && <Ionicons name={icon} size={18} color={selected ? Colors.primary : Colors.textMuted} />}
    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
    {selected && <Ionicons name="checkmark-circle" size={18} color={Colors.primary} style={{ marginLeft: 'auto' }} />}
  </TouchableOpacity>
);

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { setUser, setToken } = useAuthStore();
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 fields
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2 fields
  const [studentType, setStudentType] = useState<StudentType | null>(null);

  // Step 3 fields
  const [hsGrade, setHsGrade] = useState<HighSchoolGrade | null>(null);
  const [hsStream, setHsStream] = useState<HighSchoolStream | null>(null);
  const [uniLevel, setUniLevel] = useState<UniversityLevel | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 8) errs.password = 'Minimum 8 characters';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    if (!studentType) { setErrors({ studentType: 'Please select your student type' }); return false; }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const payload: any = {
        name: name.trim(),
        fatherName: fatherName.trim() || undefined,
        email: email.trim().toLowerCase(),
        password,
        studentType: studentType!,
        ...(studentType === 'high_school' ? { highSchoolGrade: hsGrade || undefined, highSchoolStream: hsStream || undefined } : {}),
        ...(studentType === 'university' ? { universityLevel: uniLevel || undefined } : {}),
      };
      const res = await authApi.register(payload);
      setToken(res.token);
      setUser(res.user);
      navigation.navigate('VerifyEmail', { email: email.trim().toLowerCase() });
    } catch (err: any) {
      Alert.alert('Registration Failed', err?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    if (step === 1) return (
      <View style={styles.form}>
        <FormInput label="Full Name" placeholder="Abebe Bekele" value={name} onChangeText={setName} icon="person-outline" error={errors.name} />
        <FormInput label="Father's Name" placeholder="Father's name (optional)" value={fatherName} onChangeText={setFatherName} icon="person-outline" />
        <FormInput label="Email" placeholder="your@email.com" value={email} onChangeText={setEmail} icon="mail-outline" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <FormInput label="Password" placeholder="Min. 8 characters" value={password} onChangeText={setPassword} icon="lock-closed-outline" isPassword error={errors.password} />
        <FormInput label="Confirm Password" placeholder="Repeat password" value={confirmPassword} onChangeText={setConfirmPassword} icon="lock-closed-outline" isPassword error={errors.confirmPassword} />
      </View>
    );

    if (step === 2) return (
      <View style={styles.form}>
        <Text style={styles.sectionLabel}>I am a...</Text>
        {STUDENT_TYPES.map((t) => (
          <SelectOption key={t.value} label={t.label} icon={t.icon} selected={studentType === t.value} onPress={() => setStudentType(t.value)} />
        ))}
        {errors.studentType && <Text style={styles.errText}>{errors.studentType}</Text>}
      </View>
    );

    if (step === 3 && studentType === 'high_school') return (
      <View style={styles.form}>
        <Text style={styles.sectionLabel}>Your Grade</Text>
        {HS_GRADES.map((g) => (
          <SelectOption key={g} label={g.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())} selected={hsGrade === g} onPress={() => setHsGrade(g as HighSchoolGrade)} />
        ))}
        <Text style={[styles.sectionLabel, { marginTop: Spacing[4] }]}>Your Stream</Text>
        {HS_STREAMS.map((s) => (
          <SelectOption key={s.value} label={s.label} selected={hsStream === s.value} onPress={() => setHsStream(s.value as HighSchoolStream)} />
        ))}
      </View>
    );

    if (step === 3 && studentType === 'university') return (
      <View style={styles.form}>
        <Text style={styles.sectionLabel}>University Level</Text>
        {UNI_LEVELS.map((l) => (
          <SelectOption key={l.value} label={l.label} selected={uniLevel === l.value} onPress={() => setUniLevel(l.value as UniversityLevel)} />
        ))}
      </View>
    );
    return null;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1A1D2E', '#0F1117']} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => step > 1 ? setStep((s) => (s - 1) as Step) : navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>

        {/* Progress */}
        <View style={styles.progressContainer}>
          {[1, 2, 3].map((s) => (
            <View key={s} style={[styles.progressDot, s <= step && styles.progressDotActive, s === step && styles.progressDotCurrent]} />
          ))}
        </View>

        <Text style={styles.title}>
          {step === 1 ? 'Create Account' : step === 2 ? 'Student Type' : 'Academic Details'}
        </Text>
        <Text style={styles.subtitle}>Step {step} of 3</Text>

        {renderStep()}

        <View style={styles.btnRow}>
          {step < 3 ? (
            <Button title="Continue" onPress={handleNext} size="lg" icon={<Ionicons name="arrow-forward" size={18} color={Colors.white} />} />
          ) : (
            <Button title="Create Account" onPress={handleSubmit} isLoading={isLoading} size="lg" />
          )}
        </View>

        {step === 1 && (
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  scroll: { flexGrow: 1, paddingHorizontal: Spacing[6], paddingBottom: 40 },
  backBtn: {
    marginTop: 56, marginBottom: Spacing[4], width: 40, height: 40,
    borderRadius: 20, backgroundColor: Colors.bgCard,
    alignItems: 'center', justifyContent: 'center',
  },
  progressContainer: { flexDirection: 'row', gap: Spacing[2], marginBottom: Spacing[6] },
  progressDot: { flex: 1, height: 4, borderRadius: 2, backgroundColor: Colors.bgSurface },
  progressDotActive: { backgroundColor: `${Colors.primary}50` },
  progressDotCurrent: { backgroundColor: Colors.primary },
  title: { fontFamily: 'Inter_700Bold', fontSize: 28, color: Colors.textPrimary, marginBottom: Spacing[1] },
  subtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, color: Colors.textSecondary, marginBottom: Spacing[6] },
  form: { gap: Spacing[1] },
  sectionLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: Colors.textSecondary, marginBottom: Spacing[3], letterSpacing: 0.5, textTransform: 'uppercase' },
  option: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing[3],
    backgroundColor: Colors.bgCard, padding: Spacing[4],
    borderRadius: BorderRadius.lg, borderWidth: 1.5, borderColor: Colors.border,
    marginBottom: Spacing[2],
  },
  optionSelected: { borderColor: Colors.primary, backgroundColor: `${Colors.primary}10` },
  optionText: { fontFamily: 'Inter_500Medium', fontSize: 15, color: Colors.textSecondary, flex: 1 },
  optionTextSelected: { color: Colors.textPrimary },
  errText: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.error, marginTop: Spacing[1] },
  btnRow: { marginTop: Spacing[6] },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing[5] },
  loginText: { fontFamily: 'Inter_400Regular', fontSize: 15, color: Colors.textSecondary },
  loginLink: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: Colors.primary },
});
