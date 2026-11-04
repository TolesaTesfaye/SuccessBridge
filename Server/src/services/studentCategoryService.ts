import { IUser } from '../types/index.js';
import { StudentCategory } from '../models/StudentCategoryAccess.js';

/**
 * Derives the student category from user profile
 * This is the single source of truth for determining student category
 */
export function deriveStudentCategory(user: IUser): StudentCategory | null {
  if (!user) return null;

  // High School Students
  if (user.studentType === 'high_school') {
    switch (user.highSchoolGrade) {
      case 'grade_9':
        return 'GRADE_9';
      case 'grade_10':
        return 'GRADE_10';
      case 'grade_11':
        return 'GRADE_11';
      case 'grade_12':
        return 'GRADE_12';
      default:
        return null;
    }
  }

  // University Students
  if (user.studentType === 'university') {
    switch (user.universityLevel) {
      case 'remedial':
        return 'REMEDIAL';
      case 'freshman':
        return 'FRESHMAN';
      default:
        return null;
    }
  }

  return null;
}

/**
 * Get student category display name
 */
export function getStudentCategoryDisplayName(category: StudentCategory): string {
  const names: Record<StudentCategory, string> = {
    GRADE_9: 'Grade 9',
    GRADE_10: 'Grade 10',
    GRADE_11: 'Grade 11',
    GRADE_12: 'Grade 12',
    REMEDIAL: 'Remedial',
    FRESHMAN: 'Freshman',
  };
  return names[category];
}

/**
 * Get student category emoji
 */
export function getStudentCategoryEmoji(category: StudentCategory): string {
  const emojis: Record<StudentCategory, string> = {
    GRADE_9: '📚',
    GRADE_10: '📖',
    GRADE_11: '📝',
    GRADE_12: '🎓',
    REMEDIAL: '🔰',
    FRESHMAN: '🎯',
  };
  return emojis[category];
}

/**
 * Validate if a student category is valid
 */
export function isValidStudentCategory(category: string): category is StudentCategory {
  return ['GRADE_9', 'GRADE_10', 'GRADE_11', 'GRADE_12', 'REMEDIAL', 'FRESHMAN'].includes(category);
}

/**
 * Get education level from student category
 */
export function getEducationLevelFromCategory(category: StudentCategory): 'high_school' | 'university' {
  if (['GRADE_9', 'GRADE_10', 'GRADE_11', 'GRADE_12'].includes(category)) {
    return 'high_school';
  }
  return 'university';
}

/**
 * Get grade string from category (for high school)
 */
export function getGradeFromCategory(category: StudentCategory): string | null {
  const grades: Partial<Record<StudentCategory, string>> = {
    GRADE_9: '9',
    GRADE_10: '10',
    GRADE_11: '11',
    GRADE_12: '12',
  };
  return grades[category] || null;
}

/**
 * Get university level from category (for university)
 */
export function getUniversityLevelFromCategory(category: StudentCategory): 'remedial' | 'freshman' | null {
  const levels: Partial<Record<StudentCategory, 'remedial' | 'freshman'>> = {
    REMEDIAL: 'remedial',
    FRESHMAN: 'freshman',
  };
  return levels[category] || null;
}
