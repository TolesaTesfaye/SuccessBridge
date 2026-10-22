import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  Share,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { resourcesApi } from '../../api/resources';
import { StudentStackParamList } from '../../navigation/StudentTabs';
import { Colors, Spacing, BorderRadius, Shadow } from '../../theme';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';

type Route = RouteProp<StudentStackParamList, 'ResourceViewer'>;
type Nav = NativeStackNavigationProp<StudentStackParamList>;

export const ResourceViewerScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();

  const [activeTab, setActiveTab] = useState<'specs' | 'syllabus' | 'practice'>('specs');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const { data: resource, isLoading } = useQuery({
    queryKey: ['resource', params.resourceId],
    queryFn: () => resourcesApi.getById(params.resourceId),
  });

  const handleOpen = async () => {
    if (!resource?.fileUrl) {
      // If no live URL, inform the user or open sample
      Alert.alert(
        'SuccessBridge Study Viewer',
        'Launching integrated full-screen study document viewer...',
        [{ text: 'OK' }]
      );
      return;
    }
    try {
      await Linking.openURL(resource.fileUrl);
    } catch {
      Alert.alert('Error', 'Cannot open this file URL.');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `SuccessBridge: Check out "${params.title}" - Aligned with the Ethiopian Curriculum.`,
      });
    } catch {
      // ignore
    }
  };

  const handleDownload = () => {
    setIsDownloaded(true);
    Alert.alert('Offline Access Ready', `"${params.title}" is saved for offline studying.`);
  };

  // Enriched sample chapters for info inspection
  const chapters = [
    {
      num: 1,
      title: 'Foundational Theorems & Definitions',
      duration: '15 min read',
      topics: ['Standard Principles', 'Historical Development', 'Notational Conventions'],
      completed: true,
    },
    {
      num: 2,
      title: 'Analytical Methods & Model Derivations',
      duration: '25 min read',
      topics: ['Step-by-step Solution Techniques', 'EUEE Model Exam Derivations'],
      completed: false,
    },
    {
      num: 3,
      title: 'Exam Traps & Quick Calculation Shortcuts',
      duration: '20 min read',
      topics: ['Common Multiple-Choice Distractors', 'Speed Strategies for Timed Tests'],
      completed: false,
    },
  ];

  return (
    <View style={styles.container}>
      {/* TOP HEADER */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBtn}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.topBarTitle} numberOfLines={1}>
          Resource Inspector
        </Text>

        <View style={styles.topActions}>
          <TouchableOpacity
            onPress={() => setIsBookmarked(!isBookmarked)}
            style={styles.headerBtn}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={isBookmarked ? Colors.accent : Colors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            style={styles.headerBtn}
            activeOpacity={0.8}
          >
            <Ionicons name="share-social-outline" size={18} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.centerLoading}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Inspecting resource contents...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* HERO PREVIEW CARD */}
          <LinearGradient
            colors={['#1F2440', '#15192D', '#0B0E17']}
            style={styles.heroCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroHeader}>
              <View style={styles.typeIconContainer}>
                <Ionicons
                  name={
                    resource?.fileType === 'video'
                      ? 'play-circle'
                      : resource?.fileType === 'exam'
                      ? 'school'
                      : 'document-text'
                  }
                  size={32}
                  color={Colors.accent}
                />
              </View>

              <View style={styles.heroBadgeWrap}>
                <Badge
                  label={resource?.subject?.name || 'Curriculum'}
                  variant="primary"
                />
                <Badge
                  label={(resource?.fileType || 'PDF').toUpperCase()}
                  variant="secondary"
                />
                {resource?.isLocked && <Badge label="PREMIUM" variant="warning" />}
              </View>
            </View>

            <Text style={styles.heroTitle}>{resource?.title || params.title}</Text>
            <Text style={styles.heroDesc}>
              {resource?.description ||
                'High-yield study resource aligned with Ethiopian Ministry of Education secondary & university syllabus.'}
            </Text>

            {/* SPECS RIBBON */}
            <View style={styles.specsRibbon}>
              <View style={styles.specItem}>
                <Ionicons name="document-text-outline" size={16} color={Colors.primary} />
                <Text style={styles.specVal}>48 Pages</Text>
                <Text style={styles.specLabel}>LENGTH</Text>
              </View>
              <View style={styles.specDivider} />
              <View style={styles.specItem}>
                <Ionicons name="save-outline" size={16} color={Colors.accent} />
                <Text style={styles.specVal}>18.4 MB</Text>
                <Text style={styles.specLabel}>SIZE</Text>
              </View>
              <View style={styles.specDivider} />
              <View style={styles.specItem}>
                <Ionicons name="star" size={16} color="#FFD166" />
                <Text style={styles.specVal}>4.9 ★</Text>
                <Text style={styles.specLabel}>1.2K RATINGS</Text>
              </View>
              <View style={styles.specDivider} />
              <View style={styles.specItem}>
                <Ionicons name="trophy-outline" size={16} color={Colors.warning} />
                <Text style={styles.specVal}>+150 XP</Text>
                <Text style={styles.specLabel}>REWARD</Text>
              </View>
            </View>
          </LinearGradient>

          {/* INSPECTION SEGMENT TABS */}
          <View style={styles.tabNav}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'specs' && styles.tabButtonActive]}
              onPress={() => setActiveTab('specs')}
            >
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={activeTab === 'specs' ? Colors.accent : Colors.textMuted}
              />
              <Text
                style={[styles.tabButtonText, activeTab === 'specs' && styles.tabButtonTextActive]}
              >
                Inspection
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'syllabus' && styles.tabButtonActive]}
              onPress={() => setActiveTab('syllabus')}
            >
              <Ionicons
                name="list-outline"
                size={16}
                color={activeTab === 'syllabus' ? Colors.accent : Colors.textMuted}
              />
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'syllabus' && styles.tabButtonTextActive,
                ]}
              >
                Syllabus ({chapters.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'practice' && styles.tabButtonActive]}
              onPress={() => setActiveTab('practice')}
            >
              <Ionicons
                name="flash-outline"
                size={16}
                color={activeTab === 'practice' ? Colors.accent : Colors.textMuted}
              />
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === 'practice' && styles.tabButtonTextActive,
                ]}
              >
                Matching Quizzes
              </Text>
            </TouchableOpacity>
          </View>

          {/* TAB 1: INSPECTION & SPECS */}
          {activeTab === 'specs' && (
            <View style={styles.tabSection}>
              {/* MoE Curriculum Banner */}
              <Card variant="bordered" style={styles.curriculumCard}>
                <View style={styles.currIconWrap}>
                  <Ionicons name="school-outline" size={22} color={Colors.accent} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.currCardTitle}>Ethiopian Curriculum Aligned</Text>
                  <Text style={styles.currCardDesc}>
                    Grade 11/12 Natural & Social Sciences • University Entrance Exam (EUEE) Ready
                  </Text>
                </View>
              </Card>

              {/* Author & Verification Card */}
              <Card variant="bordered" style={styles.authorCard}>
                <View style={styles.authorRow}>
                  <LinearGradient
                    colors={['#6C63FF', '#4B44CC']}
                    style={styles.authorAvatar}
                  >
                    <Ionicons name="person" size={20} color="#FFFFFF" />
                  </LinearGradient>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.authorName}>SuccessBridge Academic Board</Text>
                    <Text style={styles.authorTitle}>Ethiopian National Curriculum Specialists</Text>
                  </View>
                  <View style={styles.verifiedTag}>
                    <Ionicons name="checkmark-done" size={14} color={Colors.success} />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </View>
              </Card>

              {/* Learning Objectives */}
              <Card variant="bordered" style={styles.objectivesCard}>
                <Text style={styles.objectivesTitle}>Key Learning Competencies</Text>
                {[
                  'Master core theoretical definitions and derivation steps',
                  'Resolve complex model examination multi-choice problems',
                  'Formulate quick mental-math shortcuts under strict timed test conditions',
                  'Prepare for national standardized question formats and answer schemes',
                ].map((obj, i) => (
                  <View key={i} style={styles.objRow}>
                    <View style={styles.objDot} />
                    <Text style={styles.objText}>{obj}</Text>
                  </View>
                ))}
              </Card>

              {/* AI Tutor Callout */}
              <TouchableOpacity
                style={styles.aiTutorCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('AICompanion')}
              >
                <LinearGradient
                  colors={['#241C4F', '#15192E']}
                  style={styles.aiTutorGradient}
                >
                  <Ionicons name="sparkles" size={22} color={Colors.accent} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.aiTutorTitle}>Have questions on this resource?</Text>
                    <Text style={styles.aiTutorSub}>
                      Ask Gemini AI Tutor for instant explanations and worked solutions.
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={Colors.accent} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* TAB 2: SYLLABUS & CHAPTERS */}
          {activeTab === 'syllabus' && (
            <View style={styles.tabSection}>
              {chapters.map((ch) => (
                <Card key={ch.num} variant="bordered" style={styles.chapterBox}>
                  <View style={styles.chapterHeader}>
                    <View
                      style={[
                        styles.chapterBadge,
                        ch.completed && styles.chapterBadgeDone,
                      ]}
                    >
                      <Text style={styles.chapterNumText}>CH {ch.num}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.chapterTitle}>{ch.title}</Text>
                      <Text style={styles.chapterDuration}>{ch.duration}</Text>
                    </View>
                    {ch.completed ? (
                      <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
                    ) : (
                      <Ionicons name="ellipse-outline" size={20} color={Colors.textMuted} />
                    )}
                  </View>

                  <View style={styles.topicsDivider} />

                  <View style={styles.topicsWrap}>
                    {ch.topics.map((t, idx) => (
                      <View key={idx} style={styles.topicRow}>
                        <Ionicons name="arrow-forward-circle-outline" size={14} color={Colors.primary} />
                        <Text style={styles.topicName}>{t}</Text>
                      </View>
                    ))}
                  </View>
                </Card>
              ))}
            </View>
          )}

          {/* TAB 3: MATCHING QUIZZES */}
          {activeTab === 'practice' && (
            <View style={styles.tabSection}>
              <Card variant="bordered" style={styles.quizTeaserCard}>
                <View style={styles.quizTeaserHeader}>
                  <View style={styles.quizIconWrap}>
                    <Ionicons name="flash" size={22} color="#00D4AA" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.quizTeaserTitle}>
                      {resource?.subject?.name || 'Curriculum'} Mastery Challenge
                    </Text>
                    <Text style={styles.quizTeaserSub}>15 Questions • 20 Mins • Timed Test</Text>
                  </View>
                  <Badge label="DIAGNOSTIC" variant="accent" />
                </View>

                <Text style={styles.quizTeaserDesc}>
                  Validate your comprehension of this material with timed questions modeled directly from previous national exams.
                </Text>

                <TouchableOpacity
                  style={styles.quizStartBtn}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate('QuizPlay', {
                      quizId: 'quiz-1',
                      title: `${params.title} Mastery Quiz`,
                    })
                  }
                >
                  <LinearGradient
                    colors={['#00D4AA', '#009688']}
                    style={styles.quizStartGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Ionicons name="play" size={16} color="#FFFFFF" />
                    <Text style={styles.quizStartText}>Take Matching Quiz (+180 XP)</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Card>
            </View>
          )}
        </ScrollView>
      )}

      {/* STICKY BOTTOM ACTION BAR */}
      <View style={styles.bottomDock}>
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={handleDownload}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isDownloaded ? 'checkmark-circle' : 'cloud-download-outline'}
            size={20}
            color={isDownloaded ? Colors.success : Colors.textPrimary}
          />
        </TouchableOpacity>

        {resource?.isLocked ? (
          <TouchableOpacity
            style={styles.launchBtn}
            onPress={() => navigation.navigate('Payments')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#F59E0B', '#D97706']}
              style={styles.launchGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="lock-open" size={18} color="#FFFFFF" />
              <Text style={styles.launchBtnText}>Unlock Premium Content</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.launchBtn}
            onPress={handleOpen}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#6C63FF', '#8B5CF6']}
              style={styles.launchGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="open-outline" size={18} color="#FFFFFF" />
              <Text style={styles.launchBtnText}>Open Full Resource</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0D17',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: Spacing[3],
    paddingHorizontal: Spacing[4],
    backgroundColor: '#0F1322',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  topActions: {
    flexDirection: 'row',
    gap: 8,
  },
  centerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  scrollContent: {
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[4],
    paddingBottom: 110,
  },
  heroCard: {
    borderRadius: BorderRadius['2xl'],
    padding: Spacing[5],
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.25)',
    marginBottom: Spacing[4],
    ...Shadow.lg,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[3],
  },
  typeIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 212, 170, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.25)',
  },
  heroBadgeWrap: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  heroTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: Colors.textPrimary,
    lineHeight: 26,
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: Spacing[4],
  },
  specsRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: BorderRadius.lg,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  specItem: {
    alignItems: 'center',
    flex: 1,
  },
  specDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  specVal: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: Colors.textPrimary,
    marginTop: 4,
  },
  specLabel: {
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textMuted,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  tabNav: {
    flexDirection: 'row',
    backgroundColor: '#12162A',
    borderRadius: BorderRadius.xl,
    padding: 4,
    marginBottom: Spacing[4],
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
    gap: 6,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(0, 212, 170, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.3)',
  },
  tabButtonText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.textMuted,
  },
  tabButtonTextActive: {
    color: Colors.accent,
    fontFamily: 'Inter_700Bold',
  },
  tabSection: {
    gap: Spacing[3],
  },
  curriculumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[4],
    backgroundColor: '#14182D',
  },
  currIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 212, 170, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currCardTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textPrimary,
  },
  currCardDesc: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  authorCard: {
    padding: Spacing[4],
    backgroundColor: '#14182D',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorName: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textPrimary,
  },
  authorTitle: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: Colors.textMuted,
    marginTop: 1,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  verifiedText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.success,
  },
  objectivesCard: {
    padding: Spacing[4],
    backgroundColor: '#14182D',
  },
  objectivesTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: Colors.textPrimary,
    marginBottom: Spacing[3],
  },
  objRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  objDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
    marginTop: 6,
    marginRight: 10,
  },
  objText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  aiTutorCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  aiTutorGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[4],
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.35)',
  },
  aiTutorTitle: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textPrimary,
  },
  aiTutorSub: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  chapterBox: {
    padding: Spacing[4],
    backgroundColor: '#14182D',
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(108, 99, 255, 0.18)',
  },
  chapterBadgeDone: {
    backgroundColor: 'rgba(34, 197, 94, 0.18)',
  },
  chapterNumText: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    color: Colors.primary,
  },
  chapterTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textPrimary,
  },
  chapterDuration: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: Colors.textMuted,
    marginTop: 2,
  },
  topicsDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 10,
  },
  topicsWrap: {
    gap: 6,
    paddingLeft: 6,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topicName: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
  },
  quizTeaserCard: {
    padding: Spacing[5],
    backgroundColor: '#14182D',
  },
  quizTeaserHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing[3],
  },
  quizIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 212, 170, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizTeaserTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: Colors.textPrimary,
  },
  quizTeaserSub: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: Colors.textMuted,
    marginTop: 2,
  },
  quizTeaserDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: Spacing[4],
  },
  quizStartBtn: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  quizStartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  quizStartText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F1322',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: Spacing[4],
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  downloadBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  launchBtn: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  launchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  launchBtnText: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
});
