import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { Button } from '../../components/common/Button';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { useAuthStore } from '../../store/authStore';

const { width, height } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

const features = [
  { icon: 'book-outline' as const, text: '500+ Study Resources' },
  { icon: 'flash-outline' as const, text: 'Smart Quiz Engine' },
  { icon: 'analytics-outline' as const, text: 'Progress Tracking' },
  { icon: 'chatbubble-ellipses-outline' as const, text: 'AI Study Companion' },
];

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { setUser, setToken } = useAuthStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1A1D2E', '#0F1117', '#0F1117']}
        style={StyleSheet.absoluteFill}
      />
      {/* Decorative glowing orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
          <LinearGradient
            colors={['#6C63FF', '#8B5CF6']}
            style={styles.logoGradient}
          >
            <Ionicons name="school" size={48} color={Colors.white} />
          </LinearGradient>
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoText}>SuccessBridge</Text>
            <Text style={styles.tagline}>Your Bridge to Academic Excellence</Text>
          </View>
        </Animated.View>

        {/* Feature highlights */}
        <View style={styles.features}>
          {features.map((f, i) => (
            <Animated.View
              key={i}
              style={[
                styles.featureItem,
                {
                  opacity: fadeAnim,
                  transform: [{ translateX: Animated.multiply(slideAnim, new Animated.Value(i % 2 === 0 ? -1 : 1)) }],
                },
              ]}
            >
              <View style={styles.featureIcon}>
                <Ionicons name={f.icon} size={18} color={Colors.primary} />
              </View>
              <Text style={styles.featureText}>{f.text}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { value: '10K+', label: 'Students' },
            { value: '500+', label: 'Resources' },
            { value: '95%', label: 'Success Rate' },
          ].map((stat, i) => (
            <View key={i} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* CTA Buttons */}
        <View style={styles.buttons}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Register')}
            size="lg"
          />
          <Button
            title="I already have an account"
            onPress={() => navigation.navigate('Login')}
            variant="outline"
            size="lg"
          />
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => {
              setUser({
                id: 'demo-student',
                name: 'Abebe Kebede',
                email: 'abebe.k@student.et',
                role: 'student',
                studentType: 'high_school',
                highSchoolGrade: 'grade_12',
                highSchoolStream: 'natural',
                isApproved: true,
                approvalStatus: 'approved',
                isEmailVerified: true,
              });
              setToken('demo-token');
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="sparkles" size={16} color={Colors.accent} />
            <Text style={styles.exploreText}>Explore Student App (Live Demo)</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Trusted by students across Ethiopia 🇪🇹
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  orb1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: `${Colors.primary}18`,
    top: -80,
    right: -60,
  },
  orb2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: `${Colors.secondary}12`,
    bottom: 100,
    left: -60,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  logoContainer: { alignItems: 'center', gap: Spacing[4] },
  logoGradient: {
    width: 96,
    height: 96,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  logoTextContainer: { alignItems: 'center', gap: Spacing[1] },
  logoText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 34,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[3],
    justifyContent: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    backgroundColor: Colors.bgCard,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2] + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${Colors.primary}18`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: { fontFamily: 'Inter_500Medium', fontSize: 13, color: Colors.textPrimary },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statItem: { alignItems: 'center', gap: 2 },
  statValue: { fontFamily: 'Inter_700Bold', fontSize: 22, color: Colors.primary },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.textSecondary },
  buttons: { gap: Spacing[3] },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    backgroundColor: `${Colors.accent}15`,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing[3] + 2,
    borderWidth: 1,
    borderColor: `${Colors.accent}40`,
    marginTop: Spacing[1],
  },
  exploreText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.accent,
  },
  footer: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
