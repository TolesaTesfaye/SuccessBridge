import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { notificationsApi } from '../../api/notifications';
import { resourcesApi } from '../../api/resources';
import { quizzesApi } from '../../api/quizzes';
import { StudentStackParamList } from '../../navigation/StudentTabs';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Resource, Quiz } from '../../types';

type Nav = NativeStackNavigationProp<StudentStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Ethiopian curriculum subjects with customized vibrant palettes
const SUBJECTS = [
  {
    id: 'math',
    name: 'Mathematics',
    tag: 'CALCULUS & ALGEBRA',
    icon: 'calculator' as const,
    gradient: ['#6C63FF', '#4B44CC'] as const,
    glow: '#6C63FF',
    lessons: '18 Chapters',
    quizzes: '24 Quizzes',
    progress: 75,
  },
  {
    id: 'physics',
    name: 'Physics',
    tag: 'MECHANICS & OPTICS',
    icon: 'planet' as const,
    gradient: ['#00B4D8', '#0077B6'] as const,
    glow: '#00B4D8',
    lessons: '14 Chapters',
    quizzes: '18 Quizzes',
    progress: 60,
  },
  {
    id: 'chem',
    name: 'Chemistry',
    tag: 'ORGANIC & INORGANIC',
    icon: 'flask' as const,
    gradient: ['#10B981', '#059669'] as const,
    glow: '#10B981',
    lessons: '12 Chapters',
    quizzes: '15 Quizzes',
    progress: 40,
  },
  {
    id: 'bio',
    name: 'Biology',
    tag: 'GENETICS & PHYSIOLOGY',
    icon: 'leaf' as const,
    gradient: ['#06D6A0', '#058C69'] as const,
    glow: '#06D6A0',
    lessons: '15 Chapters',
    quizzes: '20 Quizzes',
    progress: 85,
  },
  {
    id: 'history',
    name: 'History & Civics',
    tag: 'ETHIOPIAN & GLOBAL',
    icon: 'earth' as const,
    gradient: ['#F59E0B', '#D97706'] as const,
    glow: '#F59E0B',
    lessons: '10 Chapters',
    quizzes: '12 Quizzes',
    progress: 50,
  },
  {
    id: 'ict',
    name: 'Emerging Tech',
    tag: 'AI & PROGRAMMING',
    icon: 'hardware-chip' as const,
    gradient: ['#EC4899', '#DB2777'] as const,
    glow: '#EC4899',
    lessons: '8 Modules',
    quizzes: '10 Quizzes',
    progress: 30,
  },
];

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { user } = useAuthStore();
  const { unreadCount, setUnreadCount } = useNotificationStore();

  const [selectedResourceType, setSelectedResourceType] = useState<'all' | 'pdf' | 'video' | 'exam'>('all');

  // Queries
  const { data: resources, isLoading: resourcesLoading, refetch: refetchResources } = useQuery({
    queryKey: ['resources', 'recent'],
    queryFn: () => resourcesApi.getAll({ limit: 6 }),
  });

  const { data: quizzes, isLoading: quizzesLoading, refetch: refetchQuizzes } = useQuery({
    queryKey: ['quizzes', 'recent'],
    queryFn: () => quizzesApi.getAll({ limit: 4 }),
  });

  const { data: notifCount } = useQuery({
    queryKey: ['notifications', 'count'],
    queryFn: notificationsApi.getUnreadCount,
  });

  useEffect(() => {
    if (typeof notifCount === 'number') {
      setUnreadCount(notifCount);
    }
  }, [notifCount, setUnreadCount]);

  const onRefresh = async () => {
    await Promise.all([refetchResources(), refetchQuizzes()]);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning ☀️';
    if (hour < 17) return 'Good Afternoon 🌤️';
    return 'Good Evening 🌙';
  };

  const studentTrack = user?.studentType === 'high_school'
    ? `${user.highSchoolGrade ? user.highSchoolGrade.replace('_', ' ').toUpperCase() : 'GRADE 12'} • ${user.highSchoolStream ? user.highSchoolStream.toUpperCase() : 'NATURAL'} STREAM`
    : `${user?.university || 'UNIVERSITY'} • ${user?.department || 'UNDERGRADUATE'}`;

  // Filtered resources
  const recentResources: Resource[] = resources?.data || [
    {
      id: 'res-demo-1',
      title: 'Calculus: Limits & Continuous Functions with Exam Keys',
      description: 'Worked solution sets for Ethiopian University Entrance Model Exam',
      fileType: 'pdf',
      subject: { id: 's1', name: 'Mathematics' },
      isLocked: false,
    },
    {
      id: 'res-demo-2',
      title: 'Electromagnetism Lecture & Derivations Masterclass',
      description: 'High-definition video walkthrough of Maxwell equations',
      fileType: 'video',
      subject: { id: 's2', name: 'Physics' },
      isLocked: true,
    },
    {
      id: 'res-demo-3',
      title: 'National Entrance Exam Model Paper 2026',
      description: 'Timed full simulation exam paper with answer breakdowns',
      fileType: 'exam',
      subject: { id: 's3', name: 'National Exam' },
      isLocked: true,
    },
  ];

  const filteredResources = recentResources.filter((r) => {
    if (selectedResourceType === 'all') return true;
    return r.fileType === selectedResourceType;
  });

  const quickQuizzes: Quiz[] = quizzes?.data || [
    {
      id: 'quiz-1',
      title: 'Calculus: Derivatives Challenge',
      difficulty: 'medium',
      questionCount: 15,
      timeLimit: 900,
      subject: { id: 's1', name: 'Mathematics' },
    },
    {
      id: 'quiz-2',
      title: 'Optics & Wave Motion Test',
      difficulty: 'hard',
      questionCount: 20,
      timeLimit: 1200,
      subject: { id: 's2', name: 'Physics' },
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* TOP APP BAR */}
      <View style={styles.topBar}>
        <View style={styles.userInfoRow}>
          <TouchableOpacity
            style={styles.avatarWrap}
            onPress={() => navigation.navigate('Tabs', { screen: 'ProfileTab' } as any)}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#6C63FF', '#00D4AA']} style={styles.avatarGradient}>
              <Text style={styles.avatarLetter}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
              </Text>
            </LinearGradient>
            <View style={styles.onlineBadge} />
          </TouchableOpacity>

          <View style={styles.userTextWrap}>
            <Text style={styles.greetingText}>{getGreeting()}</Text>
            <Text style={styles.userNameText}>{user?.name?.split(' ')[0] || 'Student'}</Text>
          </View>
        </View>

        <View style={styles.topActions}>
          {/* Streak pill */}
          <View style={styles.streakPill}>
            <Ionicons name="flame" size={16} color="#FF6B35" />
            <Text style={styles.streakText}>5d</Text>
          </View>

          {/* AI Tutor shortcut */}
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => navigation.navigate('AICompanion')}
            activeOpacity={0.8}
          >
            <Ionicons name="sparkles" size={18} color={Colors.accent} />
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications-outline" size={20} color={Colors.textPrimary} />
            {unreadCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={resourcesLoading || quizzesLoading}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      >
        {/* ACADEMIC TRACK PILL */}
        <View style={styles.trackPillContainer}>
          <LinearGradient
            colors={['#1E1B38', '#14172B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.trackPillGradient}
          >
            <Ionicons name="school-outline" size={16} color={Colors.accent} />
            <Text style={styles.trackPillText} numberOfLines={1}>{studentTrack}</Text>
            <Badge label="ACTIVE TRACK" variant="accent" size="sm" />
          </LinearGradient>
        </View>

        {/* EXAM COUNTDOWN MOTIVATION BANNER */}
        <View style={styles.countdownContainer}>
          <LinearGradient
            colors={['#241E4F', '#171B33']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.countdownCard}
          >
            <View style={styles.countdownLeft}>
              <View style={styles.pulseDot} />
              <Text style={styles.countdownTag}>NATIONAL ENTRANCE EXAM 2026</Text>
              <Text style={styles.countdownTitle}>138 Days Remaining</Text>
              <Text style={styles.countdownSub}>800,000+ candidates preparing nationwide</Text>
            </View>
            <View style={styles.countdownDaysBox}>
              <Text style={styles.countdownDaysNum}>138</Text>
              <Text style={styles.countdownDaysLabel}>DAYS LEFT</Text>
            </View>
          </LinearGradient>
        </View>

        {/* AI STUDY COMPANION HERO BANNER */}
        <View style={styles.heroWrapper}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('AICompanion')}
          >
            <LinearGradient
              colors={['#6C63FF', '#4B44CC', '#0F1117']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.aiHeroCard}
            >
              {/* Background ambient orb */}
              <View style={styles.aiOrb} />

              <View style={styles.aiHeroHeader}>
                <View style={styles.aiTutorTag}>
                  <Ionicons name="sparkles" size={14} color="#00D4AA" />
                  <Text style={styles.aiTutorTagText}>GEMINI AI TUTOR</Text>
                </View>
                <View style={styles.aiOnlineDotWrap}>
                  <View style={styles.aiOnlineDot} />
                  <Text style={styles.aiOnlineText}>Online 24/7</Text>
                </View>
              </View>

              <Text style={styles.aiHeroTitle}>Need instant homework help?</Text>
              <Text style={styles.aiHeroDesc}>
                Ask any question from Grade 9–12 or University courses. Get step-by-step explanations.
              </Text>

              {/* Quick AI Prompts */}
              <View style={styles.promptChips}>
                {[
                  'Explain Calculus Limits 📐',
                  'Newton\'s Laws Summary ⚛️',
                  'Organic Chemistry 🧪',
                ].map((prompt, idx) => (
                  <View key={idx} style={styles.promptChip}>
                    <Text style={styles.promptChipText}>{prompt}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* TODAY'S STUDY TARGET & CONSISTENCY TRACKER */}
        <View style={styles.studyTargetWrapper}>
          <Card variant="bordered" style={styles.studyTargetCard}>
            <View style={styles.targetHeader}>
              <View>
                <Text style={styles.targetTitle}>Today's Target</Text>
                <Text style={styles.targetSubtitle}>3 of 4 activities completed</Text>
              </View>
              <Text style={styles.targetPercent}>75%</Text>
            </View>

            {/* Target Progress Bar */}
            <View style={styles.targetProgressBar}>
              <LinearGradient
                colors={['#6C63FF', '#00D4AA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.targetProgressFill, { width: '75%' }]}
              />
            </View>

            {/* 7-Day Consistency Week */}
            <View style={styles.weekRow}>
              {[
                { day: 'M', done: true },
                { day: 'T', done: true },
                { day: 'W', done: true },
                { day: 'T', done: false },
                { day: 'F', done: false },
                { day: 'S', done: false },
                { day: 'S', done: false },
              ].map((item, idx) => (
                <View key={idx} style={styles.dayCol}>
                  <View style={[styles.dayCircle, item.done && styles.dayCircleDone]}>
                    <Ionicons
                      name={item.done ? 'checkmark' : 'ellipse-outline'}
                      size={14}
                      color={item.done ? '#FFFFFF' : Colors.textMuted}
                    />
                  </View>
                  <Text style={[styles.dayText, item.done && styles.dayTextDone]}>{item.day}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* SUBJECT EXPLORER HUB */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionHeading}>Curriculum Subjects</Text>
            <Text style={styles.sectionSubheading}>Master your topics chapter-by-chapter</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Tabs', { screen: 'ResourcesTab' } as any)}
          >
            <Text style={styles.seeAllText}>Explore</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectsScroll}
        >
          {SUBJECTS.map((sub) => (
            <TouchableOpacity
              key={sub.id}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Tabs', { screen: 'ResourcesTab' } as any)}
            >
              <Card variant="bordered" style={styles.subjectCard}>
                <LinearGradient
                  colors={sub.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.subjectIconBox}
                >
                  <Ionicons name={sub.icon} size={24} color="#FFFFFF" />
                </LinearGradient>

                <Text style={styles.subjectTag}>{sub.tag}</Text>
                <Text style={styles.subjectName}>{sub.name}</Text>

                <View style={styles.subjectMetaRow}>
                  <Text style={styles.subjectMeta}>{sub.lessons}</Text>
                  <Text style={styles.subjectMetaDot}>•</Text>
                  <Text style={styles.subjectMeta}>{sub.quizzes}</Text>
                </View>

                {/* Progress Mini Bar */}
                <View style={styles.subjectProgressTrack}>
                  <View
                    style={[
                      styles.subjectProgressFill,
                      { width: `${sub.progress}%`, backgroundColor: sub.glow },
                    ]}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* DAILY PRACTICE QUIZ CHALLENGE */}
        <View style={styles.quizSectionWrapper}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Daily Quiz Challenge</Text>
              <Text style={styles.sectionSubheading}>Test your knowledge and earn points</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Tabs', { screen: 'QuizzesTab' } as any)}
            >
              <Text style={styles.seeAllText}>All Quizzes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quizzesList}>
            {quickQuizzes.map((quiz) => (
              <TouchableOpacity
                key={quiz.id}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('QuizPlay', { quizId: quiz.id, title: quiz.title })}
              >
                <Card variant="bordered" style={styles.quizItemCard}>
                  <View style={styles.quizItemTop}>
                    <View style={styles.quizIconWrap}>
                      <Ionicons name="flash" size={20} color="#FFB703" />
                    </View>
                    <View style={styles.quizItemInfo}>
                      <Text style={styles.quizItemTitle}>{quiz.title}</Text>
                      <View style={styles.quizMetaRow}>
                        <Ionicons name="time-outline" size={14} color={Colors.textMuted} />
                        <Text style={styles.quizMetaText}>
                          {quiz.timeLimit ? `${Math.floor(quiz.timeLimit / 60)} mins` : '15 mins'}
                        </Text>
                        <Text style={styles.quizMetaDot}>•</Text>
                        <Ionicons name="help-circle-outline" size={14} color={Colors.textMuted} />
                        <Text style={styles.quizMetaText}>{quiz.questionCount || 15} questions</Text>
                      </View>
                    </View>
                    <Badge
                      label={quiz.difficulty?.toUpperCase() || 'MEDIUM'}
                      variant={quiz.difficulty === 'hard' ? 'danger' : 'warning'}
                      size="sm"
                    />
                  </View>

                  <View style={styles.quizCardBottom}>
                    <View style={styles.rewardPill}>
                      <Ionicons name="trophy-outline" size={14} color={Colors.accent} />
                      <Text style={styles.rewardText}>+50 XP Reward</Text>
                    </View>
                    <View style={styles.startQuizRow}>
                      <Text style={styles.startQuizText}>Start Quiz</Text>
                      <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CURRICULUM STUDY RESOURCES */}
        <View style={styles.resourceSectionWrapper}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Study Resources</Text>
              <Text style={styles.sectionSubheading}>Handpicked notes & national exam solutions</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Tabs', { screen: 'ResourcesTab' } as any)}
            >
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Pills */}
          <View style={styles.resourceFilters}>
            {[
              { id: 'all' as const, label: 'All' },
              { id: 'pdf' as const, label: 'Lecture Notes 📄' },
              { id: 'video' as const, label: 'Videos 🎥' },
              { id: 'exam' as const, label: 'Exam Papers 🔑' },
            ].map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[
                  styles.filterChip,
                  selectedResourceType === f.id && styles.filterChipActive,
                ]}
                onPress={() => setSelectedResourceType(f.id)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedResourceType === f.id && styles.filterChipTextActive,
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Resources List */}
          <View style={styles.resourceList}>
            {filteredResources.map((res) => (
              <TouchableOpacity
                key={res.id}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('ResourceViewer', { resourceId: res.id, title: res.title })}
              >
                <Card variant="bordered" style={styles.resourceCard}>
                  <View style={styles.resourceCardInner}>
                    <View
                      style={[
                        styles.fileTypeBadge,
                        res.fileType === 'video'
                          ? { backgroundColor: '#FF6B3518' }
                          : res.fileType === 'exam'
                          ? { backgroundColor: '#00D4AA18' }
                          : { backgroundColor: '#6C63FF18' },
                      ]}
                    >
                      <Ionicons
                        name={
                          res.fileType === 'video'
                            ? 'videocam'
                            : res.fileType === 'exam'
                            ? 'ribbon'
                            : 'document-text'
                        }
                        size={22}
                        color={
                          res.fileType === 'video'
                            ? '#FF6B35'
                            : res.fileType === 'exam'
                            ? '#00D4AA'
                            : '#6C63FF'
                        }
                      />
                    </View>

                    <View style={styles.resourceInfo}>
                      <View style={styles.resSubjectRow}>
                        <Text style={styles.resSubjectText}>
                          {res.subject?.name?.toUpperCase() || 'CURRICULUM'}
                        </Text>
                        {res.isLocked && (
                          <Badge label="PREMIUM" variant="warning" size="sm" />
                        )}
                      </View>
                      <Text style={styles.resourceTitle} numberOfLines={2}>
                        {res.title}
                      </Text>
                      {res.description && (
                        <Text style={styles.resourceDesc} numberOfLines={1}>
                          {res.description}
                        </Text>
                      )}
                    </View>

                    <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ETHIOPIAN PAYMENT UPGRADE CTA */}
        <View style={styles.upgradeBannerWrapper}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Payments')}
          >
            <LinearGradient
              colors={['#1F1A3A', '#131627']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.upgradeCard}
            >
              <View style={styles.upgradeContent}>
                <View style={styles.upgradeIconBox}>
                  <Ionicons name="diamond" size={24} color="#00D4AA" />
                </View>
                <View style={styles.upgradeTextWrap}>
                  <Text style={styles.upgradeTitle}>Upgrade to SuccessBridge PRO</Text>
                  <Text style={styles.upgradeSubtitle}>
                    Instant Telebirr & CBE Birr activation. Unlock all 10-year entrance exam keys.
                  </Text>
                </View>
              </View>
              <View style={styles.upgradeBtnRow}>
                <Text style={styles.upgradeBtnText}>Upgrade from 299 ETB</Text>
                <Ionicons name="arrow-forward" size={16} color="#00D4AA" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  topBar: {
    paddingTop: 54,
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgDark,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  avatarWrap: {
    position: 'relative',
  },
  avatarGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.bgDark,
  },
  userTextWrap: {
    gap: 1,
  },
  greetingText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
  },
  userNameText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FF6B3518',
    paddingHorizontal: Spacing[3],
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#FF6B3530',
  },
  streakText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    color: '#FF6B35',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadgeText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 9,
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: Spacing[8],
  },
  trackPillContainer: {
    paddingHorizontal: Spacing[5],
    marginTop: Spacing[2],
    marginBottom: Spacing[3],
  },
  trackPillGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2] + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: `${Colors.primary}35`,
    gap: Spacing[2],
  },
  trackPillText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.textSecondary,
    flex: 1,
    letterSpacing: 0.3,
  },
  countdownContainer: {
    paddingHorizontal: Spacing[5],
    marginBottom: Spacing[4],
  },
  countdownCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing[4],
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: `${Colors.primary}40`,
  },
  countdownLeft: {
    flex: 1,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00D4AA',
    marginBottom: 4,
  },
  countdownTag: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: '#00D4AA',
    letterSpacing: 0.5,
  },
  countdownTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  countdownSub: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  countdownDaysBox: {
    backgroundColor: '#00D4AA15',
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#00D4AA30',
    alignItems: 'center',
    marginLeft: Spacing[3],
  },
  countdownDaysNum: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#00D4AA',
  },
  countdownDaysLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 8,
    color: '#00D4AA',
    letterSpacing: 0.4,
  },
  heroWrapper: {
    paddingHorizontal: Spacing[5],
    marginBottom: Spacing[5],
  },
  aiHeroCard: {
    borderRadius: BorderRadius['2xl'],
    padding: Spacing[5],
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: `${Colors.primary}50`,
  },
  aiOrb: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: `${Colors.primary}35`,
  },
  aiHeroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[2],
  },
  aiTutorTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: Spacing[3],
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  aiTutorTagText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 11,
    color: '#00D4AA',
    letterSpacing: 0.5,
  },
  aiOnlineDotWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  aiOnlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  aiOnlineText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.accent,
  },
  aiHeroTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: Spacing[2],
  },
  aiHeroDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    lineHeight: 18,
  },
  promptChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
    marginTop: Spacing[4],
  },
  promptChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: Spacing[3],
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  promptChipText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: '#FFFFFF',
  },
  studyTargetWrapper: {
    paddingHorizontal: Spacing[5],
    marginBottom: Spacing[5],
  },
  studyTargetCard: {
    padding: Spacing[4],
  },
  targetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing[3],
  },
  targetTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  targetSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  targetPercent: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.accent,
  },
  targetProgressBar: {
    height: 8,
    backgroundColor: Colors.bgSurface,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing[4],
  },
  targetProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing[2],
    borderTopWidth: 1,
    borderTopColor: `${Colors.border}50`,
  },
  dayCol: {
    alignItems: 'center',
    gap: 4,
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.bgSurface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dayCircleDone: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  dayText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    color: Colors.textMuted,
  },
  dayTextDone: {
    color: Colors.textPrimary,
    fontFamily: 'Inter_600SemiBold',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing[5],
    marginBottom: Spacing[3],
  },
  sectionHeading: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  sectionSubheading: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  seeAllText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.primary,
  },
  subjectsScroll: {
    paddingLeft: Spacing[5],
    paddingRight: Spacing[3],
    gap: Spacing[3],
    marginBottom: Spacing[6],
  },
  subjectCard: {
    width: 160,
    padding: Spacing[4],
  },
  subjectIconBox: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing[3],
  },
  subjectTag: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 0.4,
  },
  subjectName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  subjectMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    marginBottom: Spacing[3],
  },
  subjectMeta: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.textSecondary,
  },
  subjectMetaDot: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  subjectProgressTrack: {
    height: 4,
    backgroundColor: Colors.bgSurface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  subjectProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  quizSectionWrapper: {
    marginBottom: Spacing[6],
  },
  quizzesList: {
    paddingHorizontal: Spacing[5],
    gap: Spacing[3],
  },
  quizItemCard: {
    padding: Spacing[4],
  },
  quizItemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  quizIconWrap: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.lg,
    backgroundColor: '#FFB70318',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizItemInfo: {
    flex: 1,
  },
  quizItemTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  quizMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  quizMetaText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
  },
  quizMetaDot: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  quizCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing[3],
    paddingTop: Spacing[3],
    borderTopWidth: 1,
    borderTopColor: `${Colors.border}50`,
  },
  rewardPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rewardText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.accent,
  },
  startQuizRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  startQuizText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.primary,
  },
  resourceSectionWrapper: {
    marginBottom: Spacing[6],
  },
  resourceFilters: {
    flexDirection: 'row',
    paddingHorizontal: Spacing[5],
    gap: Spacing[2],
    marginBottom: Spacing[3],
  },
  filterChip: {
    paddingHorizontal: Spacing[3],
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: `${Colors.primary}25`,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.textMuted,
  },
  filterChipTextActive: {
    color: Colors.textPrimary,
    fontFamily: 'Inter_600SemiBold',
  },
  resourceList: {
    paddingHorizontal: Spacing[5],
    gap: Spacing[3],
  },
  resourceCard: {
    padding: Spacing[3] + 2,
  },
  resourceCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  fileTypeBadge: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceInfo: {
    flex: 1,
  },
  resSubjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  resSubjectText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 0.4,
  },
  resourceTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 19,
  },
  resourceDesc: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  upgradeBannerWrapper: {
    paddingHorizontal: Spacing[5],
    marginBottom: Spacing[4],
  },
  upgradeCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    borderWidth: 1,
    borderColor: `${Colors.accent}30`,
  },
  upgradeContent: {
    flexDirection: 'row',
    gap: Spacing[3],
    marginBottom: Spacing[3],
  },
  upgradeIconBox: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    backgroundColor: `${Colors.accent}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeTextWrap: {
    flex: 1,
  },
  upgradeTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  upgradeSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
  },
  upgradeBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    paddingTop: Spacing[2],
    borderTopWidth: 1,
    borderTopColor: `${Colors.border}50`,
  },
  upgradeBtnText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    color: Colors.accent,
  },
});
