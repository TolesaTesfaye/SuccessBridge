import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Animated values
  const bgOpacity   = useRef(new Animated.Value(0)).current;
  const logoScale   = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const glowScale   = useRef(new Animated.Value(0.6)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textSlide   = useRef(new Animated.Value(20)).current;
  const tagOpacity  = useRef(new Animated.Value(0)).current;
  const tagSlide    = useRef(new Animated.Value(16)).current;
  const barWidth    = useRef(new Animated.Value(0)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;
  const orb1Scale   = useRef(new Animated.Value(0.5)).current;
  const orb2Scale   = useRef(new Animated.Value(0.5)).current;
  const shimmerX    = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    // Phase 1: background fade in
    Animated.timing(bgOpacity, {
      toValue: 1, duration: 300, useNativeDriver: true,
    }).start();

    // Phase 2: orbs expand
    Animated.parallel([
      Animated.spring(orb1Scale, { toValue: 1, tension: 30, friction: 8, useNativeDriver: true }),
      Animated.spring(orb2Scale, { toValue: 1, tension: 25, friction: 7, useNativeDriver: true }),
    ]).start();

    // Phase 3: logo pops in
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 55, friction: 7, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(glowOpacity, { toValue: 0.55, duration: 600, useNativeDriver: true }),
        Animated.spring(glowScale, { toValue: 1.4, tension: 20, friction: 6, useNativeDriver: true }),
      ]).start();
    }, 200);

    // Phase 4: app name slides in
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(textSlide, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
      ]).start();
    }, 600);

    // Phase 5: tagline
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(tagOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(tagSlide, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
      ]).start();
    }, 900);

    // Phase 6: dots & progress bar
    setTimeout(() => {
      Animated.timing(dotsOpacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      Animated.timing(barWidth, {
        toValue: width - 80,
        duration: 1600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }, 1100);

    // Phase 7: shimmer sweep
    setTimeout(() => {
      Animated.timing(shimmerX, {
        toValue: width + 60,
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }).start();
    }, 1400);

    // Phase 8: finish
    const timer = setTimeout(() => onFinish(), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.root, { opacity: bgOpacity }]}>
      {/* Background */}
      <LinearGradient
        colors={['#0A0C15', '#0F1117', '#141728']}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative orbs */}
      <Animated.View style={[styles.orb1, { transform: [{ scale: orb1Scale }] }]} />
      <Animated.View style={[styles.orb2, { transform: [{ scale: orb2Scale }] }]} />
      <Animated.View style={[styles.orb3, { transform: [{ scale: orb1Scale }] }]} />

      {/* Center content */}
      <View style={styles.center}>
        {/* Glow halo */}
        <Animated.View
          style={[styles.glow, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]}
        />

        {/* Logo */}
        <Animated.View
          style={[styles.logoWrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
        >
          <LinearGradient
            colors={['#8B85FF', '#6C63FF', '#4B44CC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGradient}
          >
            {/* Shimmer sweep */}
            <Animated.View
              style={[styles.shimmer, { transform: [{ translateX: shimmerX }] }]}
            />
            <Ionicons name="school" size={52} color="#FFFFFF" />
          </LinearGradient>
        </Animated.View>

        {/* App name */}
        <Animated.View style={{ opacity: textOpacity, transform: [{ translateY: textSlide }] }}>
          <Text style={styles.appName}>SuccessBridge</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={{ opacity: tagOpacity, transform: [{ translateY: tagSlide }] }}>
          <Text style={styles.tagline}>Your Bridge to Academic Excellence</Text>
        </Animated.View>

        {/* Divider */}
        <Animated.View style={[styles.divider, { opacity: tagOpacity }]}>
          <LinearGradient
            colors={['transparent', '#00D4AA60', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.dividerLine}
          />
        </Animated.View>

        {/* Bouncing dots */}
        <Animated.View style={[styles.dotsRow, { opacity: dotsOpacity }]}>
          {[0, 1, 2].map((i) => (
            <BounceDot key={i} delay={i * 160} />
          ))}
        </Animated.View>
      </View>

      {/* Progress bar */}
      <View style={styles.barTrack}>
        <Animated.View style={styles.barFillWrap}>
          <LinearGradient
            colors={['#6C63FF', '#00D4AA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.barFill, { width: barWidth }]}
          />
        </Animated.View>
      </View>

      <Text style={styles.footer}>Trusted by Ethiopian students 🇪🇹</Text>
    </Animated.View>
  );
};

// Bouncing dot
const BounceDot: React.FC<{ delay: number }> = ({ delay }) => {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(y, { toValue: -8, duration: 320, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: 320, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        Animated.delay(320),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return <Animated.View style={[styles.dot, { transform: [{ translateY: y }] }]} />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0F1117',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb1: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: '#6C63FF14',
    top: -100,
    right: -80,
  },
  orb2: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#00D4AA0E',
    bottom: 80,
    left: -80,
  },
  orb3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#8B5CF608',
    top: height * 0.35,
    right: -40,
  },
  center: {
    alignItems: 'center',
    gap: 14,
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#6C63FF',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 60,
  },
  logoWrap: {
    marginBottom: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 28,
    elevation: 20,
  },
  logoGradient: {
    width: 110,
    height: 110,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    width: 50,
    height: '200%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    transform: [{ rotate: '20deg' }],
  },
  appName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 38,
    color: '#F0F4FF',
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#5A6180',
    textAlign: 'center',
    letterSpacing: 0.3,
    paddingHorizontal: 24,
  },
  divider: {
    width: 120,
    marginTop: 2,
  },
  dividerLine: {
    height: 1,
    width: '100%',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#6C63FF',
  },
  barTrack: {
    position: 'absolute',
    bottom: 72,
    left: 40,
    right: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#1A1D2E',
    overflow: 'hidden',
  },
  barFillWrap: {
    flex: 1,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 36,
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#3D4280',
    textAlign: 'center',
  },
});
