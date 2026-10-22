import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Share,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadow } from '../../theme';
import { Badge } from './Badge';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface ResourceInspectionData {
  id: string;
  title: string;
  subjectName: string;
  fileType: string;
  description?: string;
  fileSize?: string;
  pageCount?: number | string;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'National Exam Level';
  curriculum?: string;
  targetStream?: string;
  author?: string;
  institution?: string;
  rating?: number;
  reviewsCount?: number;
  xpReward?: number;
  isLocked?: boolean;
  fileUrl?: string;
  syllabusBreakdown?: Array<{
    chapter: number;
    title: string;
    topics: string[];
    isCompleted?: boolean;
  }>;
  keyCompetencies?: string[];
  prerequisites?: string[];
}

export interface QuizInspectionData {
  id: string;
  title: string;
  subjectName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  timeLimitSeconds?: number;
  xpReward?: number;
  passingScorePercent?: number;
  curriculumStream?: string;
  topicsCovered?: string[];
  rulesAndTips?: string[];
  bestScore?: number;
  totalAttempts?: number;
}

export interface SubjectInspectionData {
  id: string;
  name: string;
  tag: string;
  lessons: string;
  quizzes: string;
  progress: number;
  description?: string;
  examWeight?: string;
  recommendedChapters?: string[];
}

interface InfoInspectorModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'resource' | 'quiz' | 'subject';
  resourceData?: ResourceInspectionData | null;
  quizData?: QuizInspectionData | null;
  subjectData?: SubjectInspectionData | null;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onAskAI?: (context: string) => void;
}

export const InfoInspectorModal: React.FC<InfoInspectorModalProps> = ({
  visible,
  onClose,
  type,
  resourceData,
  quizData,
  subjectData,
  onPrimaryAction,
  onSecondaryAction,
  onAskAI,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'tips'>('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!visible) return null;

  const handleShare = async (title: string, detail: string) => {
    try {
      await Share.share({
        message: `SuccessBridge Study Portal: "${title}" - ${detail}`,
      });
    } catch {
      // ignore
    }
  };

  const renderResourceInspector = (data: ResourceInspectionData) => {
    const chapters = data.syllabusBreakdown || [
      {
        chapter: 1,
        title: 'Core Fundamentals & Principles',
        topics: ['Fundamental Concepts', 'Standard Equations & Derivations', 'Illustrative Examples'],
        isCompleted: true,
      },
      {
        chapter: 2,
        title: 'Advanced Analytical Applications',
        topics: ['Real-world Problem Solving', 'Ethiopian University Entrance Model Questions'],
        isCompleted: false,
      },
      {
        chapter: 3,
        title: 'High-Yield Exam Synthesis',
        topics: ['Time Management Strategies', 'Common Pitfalls & Trap Elimination'],
        isCompleted: false,
      },
    ];

    const competencies = data.keyCompetencies || [
      'Master key derivations required for national entrance examinations',
      'Solve multiple-choice problems under strict 2-minute limits',
      'Understand step-by-step model answer strategies',
    ];

    return (
      <View style={styles.modalBody}>
        {/* Top Header Badge Row */}
        <View style={styles.badgeRow}>
          <Badge label={data.subjectName.toUpperCase()} variant="primary" />
          <Badge
            label={data.fileType.toUpperCase()}
            variant={data.fileType === 'pdf' ? 'accent' : data.fileType === 'video' ? 'secondary' : 'warning'}
          />
          {data.isLocked && <Badge label="PREMIUM" variant="warning" />}
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={styles.iconAction}
            onPress={() => setIsBookmarked(!isBookmarked)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={isBookmarked ? Colors.accent : Colors.textMuted}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconAction}
            onPress={() => handleShare(data.title, data.description || '')}
            activeOpacity={0.8}
          >
            <Ionicons name="share-social-outline" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.inspectionTitle}>{data.title}</Text>
        <Text style={styles.inspectionDesc}>
          {data.description || 'Comprehensive verified study material aligned directly with the Ethiopian National Curriculum standards.'}
        </Text>

        {/* Spec Grid Pills */}
        <View style={styles.specGrid}>
          <View style={styles.specBox}>
            <Ionicons name="documents-outline" size={16} color={Colors.primary} />
            <Text style={styles.specLabel}>LENGTH</Text>
            <Text style={styles.specValue}>{data.pageCount || data.duration || '36 Pages'}</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="file-tray-full-outline" size={16} color={Colors.accent} />
            <Text style={styles.specLabel}>FILE SIZE</Text>
            <Text style={styles.specValue}>{data.fileSize || '14.8 MB'}</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="speedometer-outline" size={16} color={Colors.warning} />
            <Text style={styles.specLabel}>LEVEL</Text>
            <Text style={styles.specValue}>{data.difficulty || 'Advanced'}</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="star" size={16} color="#FFD166" />
            <Text style={styles.specLabel}>RATING</Text>
            <Text style={styles.specValue}>{data.rating || '4.9'} ★</Text>
          </View>
        </View>

        {/* Inspection Segment Tabs */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'overview' && styles.tabItemActive]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'syllabus' && styles.tabItemActive]}
            onPress={() => setActiveTab('syllabus')}
          >
            <Text style={[styles.tabText, activeTab === 'syllabus' && styles.tabTextActive]}>
              Chapters ({chapters.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'tips' && styles.tabItemActive]}
            onPress={() => setActiveTab('tips')}
          >
            <Text style={[styles.tabText, activeTab === 'tips' && styles.tabTextActive]}>Learning Goals</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <View style={styles.tabContent}>
            {/* Curriculum info box */}
            <LinearGradient
              colors={['#1F2440', '#15192D']}
              style={styles.curriculumBox}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="ribbon-outline" size={24} color={Colors.accent} />
              <View style={styles.curriculumTextWrap}>
                <Text style={styles.curriculumTitle}>
                  {data.curriculum || 'Ethiopian National MoE Standards'}
                </Text>
                <Text style={styles.curriculumSub}>
                  Grade 11 & 12 Natural & Social Science • University Remedial Aligned
                </Text>
              </View>
            </LinearGradient>

            {/* Author / Contributor row */}
            <View style={styles.authorRow}>
              <View style={styles.authorAvatar}>
                <Ionicons name="person-circle-outline" size={36} color={Colors.primary} />
              </View>
              <View style={styles.authorDetails}>
                <Text style={styles.authorName}>
                  {data.author || 'SuccessBridge Senior Academic Faculty'}
                </Text>
                <Text style={styles.authorInst}>
                  {data.institution || 'Verified by Ministry Exam Evaluation Committee'}
                </Text>
              </View>
              <View style={styles.verifiedPill}>
                <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>

            {/* AI Assistant Quick Hint */}
            <TouchableOpacity
              style={styles.aiHintBox}
              onPress={() => onAskAI && onAskAI(`Explain key takeaways from "${data.title}" in ${data.subjectName}`)}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['rgba(108, 99, 255, 0.25)', 'rgba(0, 212, 170, 0.15)']}
                style={styles.aiHintGradient}
              >
                <Ionicons name="sparkles" size={18} color={Colors.accent} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.aiHintTitle}>Ask Gemini AI Tutor</Text>
                  <Text style={styles.aiHintDesc}>Get instant step-by-step summary or ask tricky questions</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.accent} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'syllabus' && (
          <View style={styles.tabContent}>
            {chapters.map((ch, idx) => (
              <View key={idx} style={styles.chapterCard}>
                <View style={styles.chapterHeader}>
                  <View style={[styles.chapterNum, ch.isCompleted && styles.chapterNumDone]}>
                    <Text style={styles.chapterNumText}>{ch.chapter}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.chapterTitle}>{ch.title}</Text>
                    <Text style={styles.chapterSub}>{ch.topics.length} Key Subtopics Included</Text>
                  </View>
                  {ch.isCompleted ? (
                    <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                  ) : (
                    <Ionicons name="ellipse-outline" size={18} color={Colors.textMuted} />
                  )}
                </View>
                <View style={styles.topicsList}>
                  {ch.topics.map((t, i) => (
                    <View key={i} style={styles.topicRow}>
                      <Ionicons name="caret-forward" size={12} color={Colors.primary} />
                      <Text style={styles.topicText}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'tips' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionSubTitle}>Key Competencies You'll Gain:</Text>
            {competencies.map((comp, idx) => (
              <View key={idx} style={styles.compRow}>
                <LinearGradient colors={['#6C63FF', '#00D4AA']} style={styles.compDot} />
                <Text style={styles.compText}>{comp}</Text>
              </View>
            ))}

            <View style={styles.xpCard}>
              <Ionicons name="trophy" size={26} color="#FFD166" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.xpCardTitle}>Earn +{data.xpReward || 150} Academic XP</Text>
                <Text style={styles.xpCardSub}>Complete this study session to level up your streak ranking!</Text>
              </View>
            </View>
          </View>
        )}

        {/* Bottom Action Footer */}
        <View style={styles.footerActions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onPrimaryAction}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#6C63FF', '#8B5CF6']}
              style={styles.btnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name={data.isLocked ? 'lock-open-outline' : 'open-outline'} size={18} color="#FFFFFF" />
              <Text style={styles.btnText}>
                {data.isLocked ? 'Unlock Premium Access' : 'Launch Full Resource'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderQuizInspector = (data: QuizInspectionData) => {
    const rules = data.rulesAndTips || [
      'Each question has only ONE correct answer based on official curriculum keys.',
      'No negative marking: attempt every question to maximize probability.',
      'Keep pace: target under 60 seconds per computational question.',
      'You can review flagged answers before final submission.',
    ];

    const topics = data.topicsCovered || [
      'Algebraic & Transcendental Functions',
      'Derivatives & Rate of Change',
      'Optics & Wave Formulations',
      'National Model Exam Past Questions',
    ];

    return (
      <View style={styles.modalBody}>
        {/* Badge header */}
        <View style={styles.badgeRow}>
          <Badge label={data.subjectName.toUpperCase()} variant="primary" />
          <Badge
            label={data.difficulty.toUpperCase()}
            variant={data.difficulty === 'easy' ? 'success' : data.difficulty === 'medium' ? 'warning' : 'error'}
          />
          <Badge label={`${data.questionCount} QUESTIONS`} variant="secondary" />
        </View>

        <Text style={styles.inspectionTitle}>{data.title}</Text>
        <Text style={styles.inspectionDesc}>
          Official timed curriculum challenge designed to mirror Ethiopian national examination conditions.
        </Text>

        {/* Spec Grid */}
        <View style={styles.specGrid}>
          <View style={styles.specBox}>
            <Ionicons name="time-outline" size={16} color={Colors.primary} />
            <Text style={styles.specLabel}>TIME LIMIT</Text>
            <Text style={styles.specValue}>{Math.ceil((data.timeLimitSeconds || 900) / 60)} Mins</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="help-circle-outline" size={16} color={Colors.accent} />
            <Text style={styles.specLabel}>QUESTIONS</Text>
            <Text style={styles.specValue}>{data.questionCount}</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="checkmark-done-circle-outline" size={16} color={Colors.success} />
            <Text style={styles.specLabel}>PASS MARK</Text>
            <Text style={styles.specValue}>{data.passingScorePercent || 75}%</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="sparkles" size={16} color="#FFD166" />
            <Text style={styles.specLabel}>REWARD</Text>
            <Text style={styles.specValue}>+{data.xpReward || 180} XP</Text>
          </View>
        </View>

        {/* Topics Covered */}
        <Text style={styles.sectionSubTitle}>Topics Tested in This Quiz:</Text>
        <View style={styles.chipRow}>
          {topics.map((t, idx) => (
            <View key={idx} style={styles.topicChip}>
              <Ionicons name="checkmark" size={12} color={Colors.accent} />
              <Text style={styles.topicChipText}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Rules & Strategy Box */}
        <View style={styles.rulesBox}>
          <Text style={styles.rulesTitle}>Exam Simulator Rules & Strategy:</Text>
          {rules.map((rule, idx) => (
            <View key={idx} style={styles.ruleRow}>
              <Text style={styles.ruleNum}>{idx + 1}.</Text>
              <Text style={styles.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>

        {/* Primary Action Button */}
        <View style={styles.footerActions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onPrimaryAction}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#00D4AA', '#009688']}
              style={styles.btnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="play" size={18} color="#FFFFFF" />
              <Text style={styles.btnText}>Start Timed Quiz Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSubjectInspector = (data: SubjectInspectionData) => {
    return (
      <View style={styles.modalBody}>
        <View style={styles.badgeRow}>
          <Badge label={data.tag} variant="accent" />
          <Badge label={`${data.progress}% COMPLETE`} variant={data.progress > 50 ? 'success' : 'warning'} />
        </View>

        <Text style={styles.inspectionTitle}>{data.name}</Text>
        <Text style={styles.inspectionDesc}>
          {data.description || 'Comprehensive curriculum mastery track covering both Ethiopian secondary syllabus and freshman university foundations.'}
        </Text>

        {/* Spec Grid */}
        <View style={styles.specGrid}>
          <View style={styles.specBox}>
            <Ionicons name="book-outline" size={16} color={Colors.primary} />
            <Text style={styles.specLabel}>LESSONS</Text>
            <Text style={styles.specValue}>{data.lessons}</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="flash-outline" size={16} color={Colors.accent} />
            <Text style={styles.specLabel}>QUIZZES</Text>
            <Text style={styles.specValue}>{data.quizzes}</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="pie-chart-outline" size={16} color={Colors.warning} />
            <Text style={styles.specLabel}>PROGRESS</Text>
            <Text style={styles.specValue}>{data.progress}%</Text>
          </View>
          <View style={styles.specBox}>
            <Ionicons name="analytics-outline" size={16} color="#38BDF8" />
            <Text style={styles.specLabel}>EXAM WEIGHT</Text>
            <Text style={styles.specValue}>{data.examWeight || '25% of EUEE'}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.subjectProgressWrap}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Curriculum Completion</Text>
            <Text style={styles.progressVal}>{data.progress}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <LinearGradient
              colors={['#6C63FF', '#00D4AA']}
              style={[styles.progressBarFill, { width: `${data.progress}%` }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
        </View>

        {/* Direct Action */}
        <View style={styles.footerActions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onPrimaryAction}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#6C63FF', '#8B5CF6']}
              style={styles.btnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              <Text style={styles.btnText}>Explore {data.name} Lessons</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={onClose} />
        <View style={styles.sheetContainer}>
          {/* Sheet Handle */}
          <View style={styles.handleWrap}>
            <View style={styles.handle} />
          </View>

          {/* Close circle */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {type === 'resource' && resourceData && renderResourceInspector(resourceData)}
            {type === 'quiz' && quizData && renderQuizInspector(quizData)}
            {type === 'subject' && subjectData && renderSubjectInspector(subjectData)}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 12, 0.75)',
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  sheetContainer: {
    maxHeight: SCREEN_HEIGHT * 0.88,
    backgroundColor: '#12162A',
    borderTopLeftRadius: BorderRadius['2xl'],
    borderTopRightRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.25)',
    ...Shadow.lg,
  },
  handleWrap: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 18,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[8],
  },
  modalBody: {
    paddingTop: Spacing[2],
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing[3],
    paddingRight: 40,
  },
  iconAction: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inspectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 28,
    marginBottom: 8,
  },
  inspectionDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing[4],
  },
  specGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Spacing[4],
  },
  specBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: BorderRadius.lg,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  specLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: Spacing[4],
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: Colors.accent,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: Colors.accent,
    fontWeight: '700',
  },
  tabContent: {
    marginBottom: Spacing[4],
  },
  curriculumBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[4],
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing[3],
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.25)',
  },
  curriculumTextWrap: {
    marginLeft: 12,
    flex: 1,
  },
  curriculumTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  curriculumSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[3],
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing[3],
  },
  authorAvatar: {
    marginRight: 10,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  authorInst: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 1,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.success,
  },
  aiHintBox: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginTop: 4,
  },
  aiHintGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[3],
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
    borderRadius: BorderRadius.lg,
  },
  aiHintTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  aiHintDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  chapterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: BorderRadius.lg,
    padding: Spacing[3],
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapterNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterNumDone: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  chapterNumText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  chapterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  chapterSub: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  topicsList: {
    marginTop: 8,
    paddingLeft: 38,
    gap: 4,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  topicText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  sectionSubTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing[3],
  },
  compRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  compDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  compText: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  xpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
    marginTop: Spacing[4],
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  xpCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFD166',
  },
  xpCardSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Spacing[4],
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.25)',
  },
  topicChipText: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '500',
  },
  rulesBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
    marginBottom: Spacing[4],
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  rulesTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  ruleRow: {
    flexDirection: 'row',
    marginBottom: 6,
    gap: 6,
  },
  ruleNum: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  ruleText: {
    fontSize: 12,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  subjectProgressWrap: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
    marginBottom: Spacing[4],
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  progressVal: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.accent,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  footerActions: {
    marginTop: Spacing[3],
  },
  primaryBtn: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
