// Dynamic content loader for grade-specific learning materials

import { getHighSchoolContent } from './highSchoolCourseContent';

type Grade = 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12';

// Grade 11 content imports
import { GRADE_11_BIOLOGY_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/biology/biologyContent';
import { GRADE_11_CHEMISTRY_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/chemistry/chemistryContent';
import { GRADE_11_ENGLISH_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/english/englishContent';
import { GRADE_11_GEOGRAPHY_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/geography/geographyContent';
import { GRADE_11_HISTORY_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/history/historyContent';
import { GRADE_11_MATH_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/math/mathContent';
import { GRADE_11_PHYSICS_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/physics/physicsContent';

// Grade 12 content imports
import { GRADE_12_BIOLOGY_CONTENT } from '../dashboards/student/learning center/highschool/grade 12/biology/biologyContent';
import { GRADE_12_CHEMISTRY_CONTENT } from '../dashboards/student/learning center/highschool/grade 12/chemistry/chemistryContent';
import { GRADE_12_GEOGRAPHY_CONTENT } from '../dashboards/student/learning center/highschool/grade 12/geography/geographyContent';
import { GRADE_12_HISTORY_CONTENT } from '../dashboards/student/learning center/highschool/grade 12/history/historyContent';
import { GRADE_12_MATH_CONTENT } from '../dashboards/student/learning center/highschool/grade 12/math/mathContent';
import { GRADE_12_PHYSICS_CONTENT } from '../dashboards/student/learning center/highschool/grade 12/physics/physicsContent';

// Content mapping by grade and subject
const GRADE_CONTENT_MAP = {
  grade_11: {
    Biology: GRADE_11_BIOLOGY_CONTENT,
    Chemistry: GRADE_11_CHEMISTRY_CONTENT,
    English: GRADE_11_ENGLISH_CONTENT,
    Geography: GRADE_11_GEOGRAPHY_CONTENT,
    History: GRADE_11_HISTORY_CONTENT,
    Math: GRADE_11_MATH_CONTENT,
    Mathematics: GRADE_11_MATH_CONTENT, // Alias
    Physics: GRADE_11_PHYSICS_CONTENT,
  },
  grade_12: {
    Biology: GRADE_12_BIOLOGY_CONTENT,
    Chemistry: GRADE_12_CHEMISTRY_CONTENT,
    Geography: GRADE_12_GEOGRAPHY_CONTENT,
    History: GRADE_12_HISTORY_CONTENT,
    Math: GRADE_12_MATH_CONTENT,
    Mathematics: GRADE_12_MATH_CONTENT, // Alias
    Physics: GRADE_12_PHYSICS_CONTENT,
  },
};

/**
 * Get learning content for a specific grade and subject
 * @param grade - The student's grade (grade_9, grade_10, grade_11, grade_12)
 * @param subject - The subject name (Biology, Chemistry, etc.)
 * @returns The content object for the specified grade and subject
 */
export const getGradeSpecificContent = (grade: Grade, subject: string) => {
  // For grades 11 and 12, use the specific grade content
  if (grade === 'grade_11') {
    const gradeContent = GRADE_CONTENT_MAP.grade_11;
    
    // Try exact match first
    if (gradeContent[subject as keyof typeof gradeContent]) {
      return gradeContent[subject as keyof typeof gradeContent];
    }

    // Try case-insensitive match
    const normalizedSubject = subject.toLowerCase();
    const matchingKey = Object.keys(gradeContent).find(
      key => key.toLowerCase() === normalizedSubject
    );

    if (matchingKey) {
      return gradeContent[matchingKey as keyof typeof gradeContent];
    }
  }

  if (grade === 'grade_12') {
    const gradeContent = GRADE_CONTENT_MAP.grade_12;
    
    // Try exact match first
    if (gradeContent[subject as keyof typeof gradeContent]) {
      return gradeContent[subject as keyof typeof gradeContent];
    }

    // Try case-insensitive match
    const normalizedSubject = subject.toLowerCase();
    const matchingKey = Object.keys(gradeContent).find(
      key => key.toLowerCase() === normalizedSubject
    );

    if (matchingKey) {
      return gradeContent[matchingKey as keyof typeof gradeContent];
    }
  }

  // For grades 9 and 10, fall back to the existing system
  if (grade === 'grade_9' || grade === 'grade_10') {
    const gradeContent = getHighSchoolContent(grade as string);
    
    // Subject aliases for backward compatibility
    const subjectAliases: Record<string, string[]> = {
      Math: ['Mathematics'],
      Civics: ['Civics and Ethical Education'],
      ICT: ['Information and Communication Technology'],
      Science: ['Physics', 'Chemistry', 'Biology'],
    };

    const keys = Object.keys(gradeContent as Record<string, unknown>);
    const candidateSubjects = [subject, ...(subjectAliases[subject] || [])];
    const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const resolvedKey = keys.find((key) =>
      candidateSubjects.some((candidate) => normalize(key) === normalize(candidate))
    );

    return (resolvedKey && (gradeContent as any)[resolvedKey]) || null;
  }

  console.warn(`No content available for ${subject} in ${grade}`);
  return null;
};

/**
 * Get all available subjects for a specific grade
 * @param grade - The student's grade
 * @returns Array of available subject names
 */
export const getAvailableSubjects = (grade: Grade): string[] => {
  if (grade === 'grade_11') {
    return Object.keys(GRADE_CONTENT_MAP.grade_11);
  }
  if (grade === 'grade_12') {
    return Object.keys(GRADE_CONTENT_MAP.grade_12);
  }
  if (grade === 'grade_9' || grade === 'grade_10') {
    const gradeContent = getHighSchoolContent(grade as string);
    return Object.keys(gradeContent as Record<string, unknown>);
  }
  return [];
};

/**
 * Check if content exists for a specific grade and subject
 * @param grade - The student's grade
 * @param subject - The subject name
 * @returns Boolean indicating if content exists
 */
export const hasGradeSpecificContent = (grade: Grade, subject: string): boolean => {
  const content = getGradeSpecificContent(grade, subject);
  return content !== null;
};