import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StudentStackParamList } from '../../navigation/StudentTabs';
import { Colors, Spacing, BorderRadius } from '../../theme';

type Route = RouteProp<StudentStackParamList, 'QuizResult'>;
type Nav = NativeStackNavigationProp<StudentStackParamList>;

export const QuizResultScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();

  const { score, total, timeTaken } = params;
  const pct = Math.round((score / total) * 100);
  const isPassed = pct >= 60;
  const grade = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F';

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isPassed ? ['#1A2E1A', '#0F1117'] : ['#2E1A1A', '#0F1117']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        {/* Score ring */}
        <View style={[styles.scoreRing, { borderColor: isPassed ? Colors.success : Colors.error }]}>
          <LinearGradient
            colors={isPassed ? [Colors.success, '#16A34A'] : [Colors.error, '#DC2626']}
            style={styles.scoreInner}
          >
            <Text style={styles.gradeText}>{grade}</Text>
          </LinearGradient>
        </View>

        <Ionicons
          name={isPassed ? 'trophy' : 'refresh-circle'}
          size={48}
          color={isPassed ? Colors.warning : Colors.error}
        />

        <Text style={styles.resultTitle}>{isPassed ? '🎉 Congratulations!' : '😔 Keep Practicing'}</Text>
        <Text style={styles.resultSubtitle}>
          {isPassed ? "Great job! You've passed this quiz." : "Don't give up — you can do better!"}
        </Text>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          {[
            { label: 'Score', value: `${score}/${total}`, icon: 'checkmark-circle-outline' as const, color: Colors.success },
            { label: 'Percentage', value: `${pct}%`, icon: 'analytics-outline' as const, color: Colors.primary },
            { label: 'Grade', value: grade, icon: 'ribbon-outline' as const, color: Colors.warning },
            { label: 'Time', value: timeTaken ? `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s` : '-', icon: 'time-outline' as const, color: Colors.secondary },
          ].map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Ionicons name={stat.icon} size={22} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Tabs', { screen: 'QuizzesTab' } as any)}
            style={styles.actionBtn}
          >
            <LinearGradient colors={['#6C63FF', '#8B5CF6']} style={styles.actionGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Ionicons name="flash-outline" size={18} color={Colors.white} />
              <Text style={styles.actionText}>Try Another Quiz</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Tabs', { screen: 'HomeTab' } as any)}
            style={styles.secondaryBtn}
          >
            <Text style={styles.secondaryText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing[6], gap: Spacing[5] },
  scoreRing: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, padding: 6 },
  scoreInner: { flex: 1, borderRadius: 56, alignItems: 'center', justifyContent: 'center' },
  gradeText: { fontFamily: 'Inter_700Bold', fontSize: 40, color: Colors.white },
  resultTitle: { fontFamily: 'Inter_700Bold', fontSize: 26, color: Colors.textPrimary, textAlign: 'center' },
  resultSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 15, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[3], justifyContent: 'center', width: '100%' },
  statCard: {
    width: '45%', backgroundColor: Colors.bgCard, borderRadius: BorderRadius.xl,
    padding: Spacing[4], alignItems: 'center', gap: Spacing[1],
    borderWidth: 1, borderColor: Colors.border,
  },
  statValue: { fontFamily: 'Inter_700Bold', fontSize: 20, color: Colors.textPrimary },
  statLabel: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.textMuted },
  actions: { width: '100%', gap: Spacing[3] },
  actionBtn: { borderRadius: BorderRadius.xl, overflow: 'hidden' },
  actionGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing[2], paddingVertical: Spacing[4] },
  actionText: { fontFamily: 'Inter_600SemiBold', fontSize: 16, color: Colors.white },
  secondaryBtn: { alignItems: 'center', paddingVertical: Spacing[3] },
  secondaryText: { fontFamily: 'Inter_500Medium', fontSize: 15, color: Colors.textSecondary },
});
