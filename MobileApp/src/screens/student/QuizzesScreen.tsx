import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { quizzesApi } from '../../api/quizzes';
import { StudentStackParamList } from '../../navigation/StudentTabs';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Quiz } from '../../types';
import { LinearGradient } from 'expo-linear-gradient';

type Nav = NativeStackNavigationProp<StudentStackParamList>;

const difficultyColors: Record<string, string> = {
  easy: Colors.success,
  medium: Colors.warning,
  hard: Colors.error,
};

const QuizCard: React.FC<{ quiz: Quiz; onPress: () => void }> = ({ quiz, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
    <Card variant="bordered" style={styles.quizCard}>
      <View style={styles.quizHeader}>
        <View style={styles.quizIconBg}>
          <Ionicons name="flash-outline" size={22} color={Colors.primary} />
        </View>
        <View style={styles.quizInfo}>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
          {quiz.subject && <Text style={styles.quizSubject}>{quiz.subject.name}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
      </View>
      <View style={styles.quizFooter}>
        <View style={styles.metaChip}>
          <Ionicons name="help-circle-outline" size={13} color={Colors.textMuted} />
          <Text style={styles.metaText}>{quiz.questionCount || '?'} questions</Text>
        </View>
        {quiz.timeLimit && (
          <View style={styles.metaChip}>
            <Ionicons name="time-outline" size={13} color={Colors.textMuted} />
            <Text style={styles.metaText}>{Math.ceil(quiz.timeLimit / 60)} min</Text>
          </View>
        )}
        {quiz.difficulty && (
          <Badge
            label={quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
            variant={quiz.difficulty === 'easy' ? 'success' : quiz.difficulty === 'medium' ? 'warning' : 'error'}
          />
        )}
      </View>
    </Card>
  </TouchableOpacity>
);

export const QuizzesScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['quizzes', filter],
    queryFn: () => quizzesApi.getAll({ difficulty: filter === 'all' ? undefined : filter }),
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quizzes</Text>
        <Text style={styles.headerSubtitle}>Test your knowledge</Text>
      </View>

      {/* Hero banner */}
      <TouchableOpacity style={styles.heroBanner} activeOpacity={0.9}>
        <LinearGradient colors={['#6C63FF', '#4B44CC']} style={styles.heroBannerGradient}>
          <View>
            <Text style={styles.heroTitle}>Challenge Yourself 🧠</Text>
            <Text style={styles.heroSubtitle}>Daily quizzes improve retention by 40%</Text>
          </View>
          <Ionicons name="trophy-outline" size={44} color="rgba(255,255,255,0.3)" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Difficulty filters */}
      <View style={styles.filtersRow}>
        {(['all', 'easy', 'medium', 'hard'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <LoadingSpinner fullScreen message="Loading quizzes..." />
      ) : (
        <FlatList
          data={data?.data || []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <QuizCard
              quiz={item}
              onPress={() => navigation.navigate('QuizPlay', { quizId: item.id, title: item.title })}
            />
          )}
          ListEmptyComponent={<EmptyState icon="flash-outline" title="No quizzes found" />}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isLoading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  header: { paddingTop: 56, paddingHorizontal: Spacing[5], paddingBottom: Spacing[3] },
  headerTitle: { fontFamily: 'Inter_700Bold', fontSize: 26, color: Colors.textPrimary },
  headerSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, color: Colors.textSecondary },
  heroBanner: { marginHorizontal: Spacing[5], marginVertical: Spacing[3], borderRadius: BorderRadius.xl, overflow: 'hidden' },
  heroBannerGradient: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing[5] },
  heroTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, color: Colors.white, marginBottom: 4 },
  heroSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  filtersRow: { flexDirection: 'row', paddingHorizontal: Spacing[5], gap: Spacing[2], marginBottom: Spacing[4] },
  filterChip: { paddingHorizontal: Spacing[4], paddingVertical: Spacing[2], borderRadius: BorderRadius.full, backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontFamily: 'Inter_500Medium', fontSize: 13, color: Colors.textSecondary },
  filterTextActive: { color: Colors.white },
  listContent: { paddingHorizontal: Spacing[5], gap: Spacing[3], paddingBottom: 100 },
  quizCard: { padding: Spacing[4] },
  quizHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3] },
  quizIconBg: { width: 48, height: 48, borderRadius: 14, backgroundColor: `${Colors.primary}18`, alignItems: 'center', justifyContent: 'center' },
  quizInfo: { flex: 1 },
  quizTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: Colors.textPrimary },
  quizSubject: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  quizFooter: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], marginTop: Spacing[3], paddingTop: Spacing[3], borderTopWidth: 1, borderTopColor: Colors.border },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.textMuted },
});
