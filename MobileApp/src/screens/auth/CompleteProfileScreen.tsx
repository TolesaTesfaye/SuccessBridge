import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { FormInput } from '../../components/common/FormInput';
import { useAuthStore } from '../../store/authStore';
import { StudentType, HighSchoolGrade, HighSchoolStream } from '../../types';

export const CompleteProfileScreen: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [studentType, setStudentType] = useState<StudentType>('high_school');
  const [grade, setGrade] = useState<HighSchoolGrade>('grade_12');
  const [stream, setStream] = useState<HighSchoolStream>('natural');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (user) {
        setUser({
          ...user,
          studentType,
          highSchoolGrade: studentType === 'high_school' ? grade : undefined,
          highSchoolStream: studentType === 'high_school' ? stream : undefined,
          university: studentType === 'university' ? university : undefined,
          department: studentType === 'university' ? department : undefined,
        });
      }
      Alert.alert('Profile Complete', 'Your study profile has been updated!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Personalize your learning track so SuccessBridge can recommend the right materials.
          </Text>
        </View>

        {/* Student Type Selector */}
        <Text style={styles.label}>Are you in High School or University?</Text>
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[styles.typeBtn, studentType === 'high_school' && styles.typeBtnActive]}
            onPress={() => setStudentType('high_school')}
          >
            <Ionicons
              name="school"
              size={24}
              color={studentType === 'high_school' ? Colors.accent : Colors.textMuted}
            />
            <Text
              style={[styles.typeText, studentType === 'high_school' && styles.typeTextActive]}
            >
              High School (9-12)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeBtn, studentType === 'university' && styles.typeBtnActive]}
            onPress={() => setStudentType('university')}
          >
            <Ionicons
              name="business"
              size={24}
              color={studentType === 'university' ? Colors.accent : Colors.textMuted}
            />
            <Text
              style={[styles.typeText, studentType === 'university' && styles.typeTextActive]}
            >
              University
            </Text>
          </TouchableOpacity>
        </View>

        {studentType === 'high_school' ? (
          <Card variant="bordered" style={styles.card}>
            <Text style={styles.cardTitle}>Select Grade Level</Text>
            <View style={styles.optionsWrap}>
              {(['grade_9', 'grade_10', 'grade_11', 'grade_12'] as HighSchoolGrade[]).map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.optionChip, grade === g && styles.optionChipActive]}
                  onPress={() => setGrade(g)}
                >
                  <Text style={[styles.optionText, grade === g && styles.optionTextActive]}>
                    {g.replace('_', ' ').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {(grade === 'grade_11' || grade === 'grade_12') && (
              <>
                <Text style={[styles.cardTitle, { marginTop: Spacing[4] }]}>Select Stream</Text>
                <View style={styles.optionsWrap}>
                  {(['natural', 'social'] as HighSchoolStream[]).map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.optionChip, stream === s && styles.optionChipActive]}
                      onPress={() => setStream(s)}
                    >
                      <Text style={[styles.optionText, stream === s && styles.optionTextActive]}>
                        {s.toUpperCase()} SCIENCE
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </Card>
        ) : (
          <Card variant="bordered" style={styles.card}>
            <Text style={styles.cardTitle}>University Details</Text>
            <FormInput
              label="University / College"
              placeholder="e.g. Addis Ababa University, ASTU..."
              value={university}
              onChangeText={setUniversity}
              leftIcon="business-outline"
            />
            <FormInput
              label="Department / Field of Study"
              placeholder="e.g. Software Engineering, Medicine..."
              value={department}
              onChangeText={setDepartment}
              leftIcon="book-outline"
            />
          </Card>
        )}

        <View style={styles.buttonWrap}>
          <Button
            title="Save & Continue to Dashboard"
            onPress={handleSave}
            loading={loading}
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  scrollContent: {
    paddingTop: 64,
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[10],
  },
  header: {
    marginBottom: Spacing[6],
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: Spacing[2],
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: Spacing[3],
  },
  typeRow: {
    flexDirection: 'row',
    gap: Spacing[3],
    marginBottom: Spacing[6],
  },
  typeBtn: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    padding: Spacing[4],
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: Spacing[2],
  },
  typeBtnActive: {
    borderColor: Colors.accent,
    backgroundColor: `${Colors.accent}15`,
  },
  typeText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.textMuted,
  },
  typeTextActive: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.textPrimary,
  },
  card: {
    padding: Spacing[4],
    marginBottom: Spacing[6],
  },
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: Spacing[3],
  },
  optionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
  },
  optionChip: {
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[4],
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.bgDark,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  optionChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors.textMuted,
  },
  optionTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
  buttonWrap: {
    marginTop: Spacing[2],
  },
});
