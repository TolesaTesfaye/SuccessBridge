import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Card } from '../../components/common/Card';

const mockData = {
  weeklyStudy: [2, 4, 1, 5, 3, 6, 2],
  subjects: [
    { name: 'Mathematics', score: 82, color: Colors.primary },
    { name: 'Physics', score: 74, color: Colors.secondary },
    { name: 'Chemistry', score: 91, color: Colors.success },
    { name: 'English', score: 67, color: Colors.warning },
    { name: 'Biology', score: 88, color: Colors.info },
  ],
  recentQuizzes: [
    { title: 'Algebra Basics', score: 8, total: 10, date: '2 days ago' },
    { title: 'Newton\'s Laws', score: 7, total: 10, date: '4 days ago' },
    { title: 'Cell Biology', score: 9, total: 10, date: '1 week ago' },
  ],
};

const BarChart: React.FC = () => {
  const max = Math.max(...mockData.weeklyStudy);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <View style={styles.barChart}>
      {mockData.weeklyStudy.map((val, i) => (
        <View key={i} style={styles.barItem}>
          <Text style={styles.barValue}>{val}h</Text>
          <View style={styles.barTrack}>
            <LinearGradient
              colors={['#6C63FF', '#8B5CF6']}
              style={[styles.barFill, { height: `${(val / max) * 100}%` }]}
            />
          </View>
          <Text style={styles.barDay}>{days[i]}</Text>
        </View>
      ))}
    </View>
  );
};

const SubjectProgress: React.FC<{ name: string; score: number; color: string }> = ({ name, score, color }) => (
  <View style={styles.subjectRow}>
    <Text style={styles.subjectName}>{name}</Text>
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${score}%`, backgroundColor: color }]} />
    </View>
    <Text style={[styles.subjectScore, { color }]}>{score}%</Text>
  </View>
);

export const ProgressScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#1A1D2E', Colors.bgDark]} style={styles.header}>
          <Text style={styles.headerTitle}>My Progress</Text>
          <Text style={styles.headerSubtitle}>Track your academic journey</Text>
        </LinearGradient>

        {/* Overview cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.overviewScroll}>
          <View style={styles.overviewRow}>
            {[
              { label: 'Study Streak', value: '5 days', icon: 'flame-outline' as const, color: Colors.error },
              { label: 'Total Hours', value: '48h', icon: 'time-outline' as const, color: Colors.secondary },
              { label: 'Quizzes Done', value: '23', icon: 'flash-outline' as const, color: Colors.primary },
              { label: 'Avg Score', value: '78%', icon: 'trophy-outline' as const, color: Colors.warning },
            ].map((item, i) => (
              <Card key={i} variant="bordered" style={styles.overviewCard}>
                <View style={[styles.overviewIcon, { backgroundColor: `${item.color}18` }]}>
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <Text style={styles.overviewValue}>{item.value}</Text>
                <Text style={styles.overviewLabel}>{item.label}</Text>
              </Card>
            ))}
          </View>
        </ScrollView>

        {/* Weekly study time */}
        <Card variant="bordered" style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Study Time</Text>
          <Text style={styles.sectionSubtitle}>Hours studied per day this week</Text>
          <BarChart />
        </Card>

        {/* Subject performance */}
        <Card variant="bordered" style={styles.section}>
          <Text style={styles.sectionTitle}>Subject Performance</Text>
          <Text style={styles.sectionSubtitle}>Average quiz scores by subject</Text>
          <View style={styles.subjects}>
            {mockData.subjects.map((s, i) => (
              <SubjectProgress key={i} {...s} />
            ))}
          </View>
        </Card>

        {/* Recent quizzes */}
        <Card variant="bordered" style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Quizzes</Text>
          {mockData.recentQuizzes.map((q, i) => (
            <View key={i} style={[styles.quizRow, i < mockData.recentQuizzes.length - 1 && styles.quizRowBorder]}>
              <View style={styles.quizLeft}>
                <Text style={styles.quizTitle}>{q.title}</Text>
                <Text style={styles.quizDate}>{q.date}</Text>
              </View>
              <View style={styles.quizRight}>
                <Text style={[styles.quizScore, { color: (q.score / q.total) >= 0.7 ? Colors.success : Colors.error }]}>
                  {q.score}/{q.total}
                </Text>
                <Text style={styles.quizPct}>{Math.round((q.score / q.total) * 100)}%</Text>
              </View>
            </View>
          ))}
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  header: { paddingTop: 56, paddingHorizontal: Spacing[5], paddingBottom: Spacing[5] },
  headerTitle: { fontFamily: 'Inter_700Bold', fontSize: 26, color: Colors.textPrimary },
  headerSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, color: Colors.textSecondary, marginTop: 2 },
  overviewScroll: { paddingLeft: Spacing[5] },
  overviewRow: { flexDirection: 'row', gap: Spacing[3], paddingRight: Spacing[5], paddingVertical: Spacing[4] },
  overviewCard: { width: 110, alignItems: 'center', gap: Spacing[2], padding: Spacing[4] },
  overviewIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  overviewValue: { fontFamily: 'Inter_700Bold', fontSize: 20, color: Colors.textPrimary },
  overviewLabel: { fontFamily: 'Inter_400Regular', fontSize: 11, color: Colors.textSecondary, textAlign: 'center' },
  section: { marginHorizontal: Spacing[5], marginBottom: Spacing[4], padding: Spacing[5] },
  sectionTitle: { fontFamily: 'Inter_700Bold', fontSize: 17, color: Colors.textPrimary, marginBottom: 2 },
  sectionSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 13, color: Colors.textMuted, marginBottom: Spacing[4] },
  barChart: { flexDirection: 'row', justifyContent: 'space-between', height: 120, alignItems: 'flex-end' },
  barItem: { flex: 1, alignItems: 'center', gap: 4 },
  barValue: { fontFamily: 'Inter_500Medium', fontSize: 10, color: Colors.textMuted },
  barTrack: { width: 20, height: 80, backgroundColor: Colors.bgSurface, borderRadius: 4, overflow: 'hidden', justifyContent: 'flex-end' },
  barFill: { width: '100%', borderRadius: 4 },
  barDay: { fontFamily: 'Inter_400Regular', fontSize: 10, color: Colors.textMuted },
  subjects: { gap: Spacing[4] },
  subjectRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3] },
  subjectName: { fontFamily: 'Inter_500Medium', fontSize: 13, color: Colors.textSecondary, width: 100 },
  progressTrack: { flex: 1, height: 8, backgroundColor: Colors.bgSurface, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  subjectScore: { fontFamily: 'Inter_700Bold', fontSize: 13, width: 38, textAlign: 'right' },
  quizRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing[3] },
  quizRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  quizLeft: { flex: 1 },
  quizTitle: { fontFamily: 'Inter_500Medium', fontSize: 14, color: Colors.textPrimary },
  quizDate: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  quizRight: { alignItems: 'flex-end' },
  quizScore: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  quizPct: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.textMuted },
});
