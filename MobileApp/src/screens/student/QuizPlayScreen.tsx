import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, StatusBar,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { quizzesApi } from '../../api/quizzes';
import { StudentStackParamList } from '../../navigation/StudentTabs';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Quiz, QuizQuestion } from '../../types';

type Route = RouteProp<StudentStackParamList, 'QuizPlay'>;
type Nav = NativeStackNavigationProp<StudentStackParamList>;

export const QuizPlayScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTime = useRef(Date.now());

  const { data: quiz, isLoading } = useQuery<Quiz>({
    queryKey: ['quiz', params.quizId],
    queryFn: () => quizzesApi.getById(params.quizId),
  });

  useEffect(() => {
    if (quiz?.timeLimit) {
      setTimeLeft(quiz.timeLimit);
    }
  }, [quiz?.timeLimit]);

  const submitMutation = useMutation({
    mutationFn: (payload: Parameters<typeof quizzesApi.submitResult>[1]) =>
      quizzesApi.submitResult(params.quizId, payload),
    onSuccess: (result) => {
      navigation.replace('QuizResult', {
        score: result.score,
        total: result.totalQuestions,
        timeTaken: result.timeTaken,
        resultId: result.id,
      });
    },
  });

  useEffect(() => {
    if (!quiz?.timeLimit) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [quiz]);

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    const timeTaken = Math.floor((Date.now() - startTime.current) / 1000);
    const questions = quiz?.questions || [];
    let score = 0;
    questions.forEach((q: QuizQuestion) => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    submitMutation.mutate({
      score,
      totalQuestions: questions.length,
      timeTaken,
      answers,
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (isLoading) return <LoadingSpinner fullScreen message="Loading quiz..." />;

  const questions = quiz?.questions || [];
  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const isLast = currentQ === questions.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1A1D2E', Colors.bgDark]} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => Alert.alert('Quit Quiz', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Quit', style: 'destructive', onPress: () => navigation.goBack() },
            ])}
            style={styles.quitBtn}
          >
            <Ionicons name="close" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.quizTitle} numberOfLines={1}>{params.title}</Text>
          {quiz?.timeLimit ? (
            <View style={[styles.timer, timeLeft < 30 && styles.timerUrgent]}>
              <Ionicons name="time-outline" size={14} color={timeLeft < 30 ? Colors.error : Colors.textSecondary} />
              <Text style={[styles.timerText, timeLeft < 30 && styles.timerTextUrgent]}>{formatTime(timeLeft)}</Text>
            </View>
          ) : <View style={{ width: 70 }} />}
        </View>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressLabel}>Question {currentQ + 1} of {questions.length}</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>Q{currentQ + 1}</Text>
          <Text style={styles.questionText}>{question?.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.options}>
          {question?.options?.map((opt: string, idx: number) => {
            const selected = answers[question.id] === idx;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => setAnswers((prev) => ({ ...prev, [question.id]: idx }))}
                activeOpacity={0.8}
                style={[styles.option, selected && styles.optionSelected]}
              >
                <View style={[styles.optionIndex, selected && styles.optionIndexSelected]}>
                  <Text style={[styles.optionIndexText, selected && styles.optionIndexTextSelected]}>
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{opt}</Text>
                {selected && <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        {currentQ > 0 && (
          <TouchableOpacity onPress={() => setCurrentQ((q) => q - 1)} style={styles.navBtnSecondary}>
            <Ionicons name="arrow-back" size={20} color={Colors.textSecondary} />
            <Text style={styles.navBtnSecondaryText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={isLast ? handleSubmit : () => setCurrentQ((q) => q + 1)}
          style={styles.navBtnPrimary}
          disabled={submitMutation.isPending}
        >
          <LinearGradient colors={['#6C63FF', '#8B5CF6']} style={styles.navBtnGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.navBtnPrimaryText}>{isLast ? 'Submit Quiz' : 'Next'}</Text>
            <Ionicons name={isLast ? 'checkmark' : 'arrow-forward'} size={18} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDark },
  header: { paddingTop: 52, paddingHorizontal: Spacing[5], paddingBottom: Spacing[4] },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing[4] },
  quitBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.bgCard, alignItems: 'center', justifyContent: 'center' },
  quizTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: Colors.textPrimary, flex: 1, textAlign: 'center', marginHorizontal: Spacing[2] },
  timer: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.bgCard, paddingHorizontal: Spacing[3], paddingVertical: Spacing[1] + 2, borderRadius: BorderRadius.full, width: 70, justifyContent: 'center' },
  timerUrgent: { backgroundColor: `${Colors.error}15` },
  timerText: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: Colors.textSecondary },
  timerTextUrgent: { color: Colors.error },
  progressBar: { height: 6, backgroundColor: Colors.bgSurface, borderRadius: 3, overflow: 'hidden', marginBottom: Spacing[2] },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  progressLabel: { fontFamily: 'Inter_400Regular', fontSize: 12, color: Colors.textMuted },
  content: { padding: Spacing[5], gap: Spacing[5] },
  questionCard: { backgroundColor: Colors.bgCard, borderRadius: BorderRadius.xl, padding: Spacing[5], borderWidth: 1, borderColor: Colors.border, gap: Spacing[3] },
  questionNumber: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: Colors.primary, letterSpacing: 0.5 },
  questionText: { fontFamily: 'Inter_600SemiBold', fontSize: 18, color: Colors.textPrimary, lineHeight: 28 },
  options: { gap: Spacing[3] },
  option: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing[3],
    backgroundColor: Colors.bgCard, borderRadius: BorderRadius.lg,
    padding: Spacing[4], borderWidth: 1.5, borderColor: Colors.border,
  },
  optionSelected: { borderColor: Colors.primary, backgroundColor: `${Colors.primary}10` },
  optionIndex: { width: 34, height: 34, borderRadius: 17, backgroundColor: Colors.bgSurface, alignItems: 'center', justifyContent: 'center' },
  optionIndexSelected: { backgroundColor: Colors.primary },
  optionIndexText: { fontFamily: 'Inter_700Bold', fontSize: 14, color: Colors.textSecondary },
  optionIndexTextSelected: { color: Colors.white },
  optionText: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 15, color: Colors.textSecondary, lineHeight: 22 },
  optionTextSelected: { color: Colors.textPrimary },
  bottomNav: { flexDirection: 'row', gap: Spacing[3], padding: Spacing[5], paddingBottom: 34, backgroundColor: Colors.bgCard, borderTopWidth: 1, borderTopColor: Colors.border },
  navBtnSecondary: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], paddingHorizontal: Spacing[5], paddingVertical: Spacing[3], borderRadius: BorderRadius.xl, backgroundColor: Colors.bgSurface },
  navBtnSecondaryText: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: Colors.textSecondary },
  navBtnPrimary: { flex: 1, borderRadius: BorderRadius.xl, overflow: 'hidden' },
  navBtnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing[2], paddingVertical: Spacing[3] + 2 },
  navBtnPrimaryText: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: Colors.white },
});
