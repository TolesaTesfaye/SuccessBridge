/**
 * Subject Registry
 * 
 * Central registry for subject IDs and payment configuration.
 * Update these IDs after creating subjects in your database.
 */

// Subject IDs - Update these with actual IDs from your database
export const SUBJECT_IDS = {
  // University - Freshman
  PSYCHOLOGY: '', // TODO: Add psychology subject ID
  PHYSICS: '', // TODO: Add physics subject ID
  HISTORY: '', // TODO: Add history subject ID
  GEOGRAPHY: '', // TODO: Add geography subject ID
  LOGIC: '', // TODO: Add logic subject ID
  MATH_NATURAL: '', // TODO: Add math natural subject ID
  MATH_SOCIAL: '', // TODO: Add math social subject ID
  ENGLISH_FRESHMAN: '', // TODO: Add english subject ID
  
  // High School - Grade 11 Natural
  BIOLOGY_11: '', // TODO: Add biology subject ID
  CHEMISTRY_11: '', // TODO: Add chemistry subject ID
  PHYSICS_11: '', // TODO: Add physics subject ID
  MATH_11_NATURAL: '', // TODO: Add math subject ID
  ENGLISH_11: '', // TODO: Add english subject ID
  
  // High School - Grade 11 Social
  HISTORY_11: '', // TODO: Add history subject ID
  GEOGRAPHY_11: '', // TODO: Add geography subject ID
  ECONOMICS_11: '', // TODO: Add economics subject ID
  MATH_11_SOCIAL: '', // TODO: Add math subject ID
  
  // Add more subjects as needed
}

// Free subjects configuration
// These subjects don't require payment
// Strategy: Offer one free subject to attract users, then require payment for others
export const FREE_SUBJECTS = {
  FRESHMAN: ['Psychology'], // Psychology is free to attract freshman students
  GRADE_9: ['Mathematics', 'English'], // Free subjects for grade 9
  GRADE_10: ['Mathematics', 'English'], // Free subjects for grade 10
  GRADE_11_NATURAL: ['Mathematics'], // Free subjects for grade 11 natural stream
  GRADE_11_SOCIAL: ['Mathematics'], // Free subjects for grade 11 social stream
  GRADE_12_NATURAL: ['Biology'], // Biology is free to attract grade 12 natural students
  GRADE_12_SOCIAL: ['Biology'], // Biology is free to attract grade 12 social students
}

// Subject pricing (in ETB)
export const SUBJECT_PRICES = {
  // University subjects
  FRESHMAN: {
    PSYCHOLOGY: 0, // Free - Teaser subject to attract users
    PHYSICS: 600,
    HISTORY: 450,
    GEOGRAPHY: 450,
    LOGIC: 400,
    MATH_NATURAL: 550,
    MATH_SOCIAL: 500,
    ENGLISH: 500,
  },
  
  // High school subjects
  GRADE_11: {
    BIOLOGY: 400,
    CHEMISTRY: 400,
    PHYSICS: 400,
    HISTORY: 350,
    GEOGRAPHY: 350,
    ECONOMICS: 350,
    MATHEMATICS: 0, // Free
    ENGLISH: 300,
  },
  
  GRADE_12: {
    BIOLOGY: 0, // Free - Teaser subject to attract users
    CHEMISTRY: 500,
    PHYSICS: 500,
    HISTORY: 400,
    GEOGRAPHY: 400,
    ECONOMICS: 400,
    MATHEMATICS: 450,
    ENGLISH: 350,
  },
}

/**
 * Get subject ID by name and education level
 */
export const getSubjectId = (
  subjectName: string,
  educationLevel: 'high_school' | 'university',
  grade?: string
): string | null => {
  const normalizedName = subjectName.toLowerCase().replace(/\s+/g, '_')
  
  // Map subject names to IDs
  const subjectMap: Record<string, string> = {
    // Freshman
    psychology: SUBJECT_IDS.PSYCHOLOGY,
    physics: SUBJECT_IDS.PHYSICS,
    history: SUBJECT_IDS.HISTORY,
    geography: SUBJECT_IDS.GEOGRAPHY,
    logic: SUBJECT_IDS.LOGIC,
    'math_natural': SUBJECT_IDS.MATH_NATURAL,
    'math_social': SUBJECT_IDS.MATH_SOCIAL,
    english: SUBJECT_IDS.ENGLISH_FRESHMAN,
    
    // Grade 11
    biology: SUBJECT_IDS.BIOLOGY_11,
    chemistry: SUBJECT_IDS.CHEMISTRY_11,
    // Add more mappings
  }
  
  return subjectMap[normalizedName] || null
}

/**
 * Check if a subject is free for a given education level/grade
 */
export const isSubjectFree = (
  subjectName: string,
  educationLevel: 'high_school' | 'university',
  grade?: string
): boolean => {
  if (educationLevel === 'university' && grade === 'freshman') {
    return FREE_SUBJECTS.FRESHMAN.includes(subjectName)
  }
  
  if (educationLevel === 'high_school') {
    if (grade === 'grade_9') return FREE_SUBJECTS.GRADE_9.includes(subjectName)
    if (grade === 'grade_10') return FREE_SUBJECTS.GRADE_10.includes(subjectName)
    if (grade === 'grade_11') {
      // Check both natural and social (they have same free subjects)
      return FREE_SUBJECTS.GRADE_11_NATURAL.includes(subjectName)
    }
  }
  
  return false
}

/**
 * Get suggested price for a subject
 */
export const getSubjectPrice = (
  subjectName: string,
  educationLevel: 'high_school' | 'university',
  grade?: string
): number => {
  const normalizedName = subjectName.toUpperCase().replace(/\s+/g, '_')
  
  if (educationLevel === 'university' && grade === 'freshman') {
    return SUBJECT_PRICES.FRESHMAN[normalizedName as keyof typeof SUBJECT_PRICES.FRESHMAN] || 500
  }
  
  if (educationLevel === 'high_school') {
    if (grade === 'grade_11') {
      return SUBJECT_PRICES.GRADE_11[normalizedName as keyof typeof SUBJECT_PRICES.GRADE_11] || 400
    }
    if (grade === 'grade_12') {
      return SUBJECT_PRICES.GRADE_12[normalizedName as keyof typeof SUBJECT_PRICES.GRADE_12] || 450
    }
  }
  
  return 500 // Default price
}

/**
 * Get free subjects list for a given education level/grade
 */
export const getFreeSubjects = (
  educationLevel: 'high_school' | 'university',
  grade?: string,
  stream?: string
): string[] => {
  if (educationLevel === 'university' && grade === 'freshman') {
    return FREE_SUBJECTS.FRESHMAN
  }
  
  if (educationLevel === 'high_school') {
    if (grade === 'grade_9') return FREE_SUBJECTS.GRADE_9
    if (grade === 'grade_10') return FREE_SUBJECTS.GRADE_10
    if (grade === 'grade_11') {
      if (stream === 'natural') return FREE_SUBJECTS.GRADE_11_NATURAL
      if (stream === 'social') return FREE_SUBJECTS.GRADE_11_SOCIAL
    }
    if (grade === 'grade_12') {
      if (stream === 'natural') return FREE_SUBJECTS.GRADE_12_NATURAL
      if (stream === 'social') return FREE_SUBJECTS.GRADE_12_SOCIAL
    }
  }
  
  return []
}

/**
 * HOW TO USE:
 * 
 * 1. First, populate SUBJECT_IDS with actual IDs from your database
 * 2. Then use in your components:
 * 
 * import { getSubjectId, getFreeSubjects, getSubjectPrice } from '@utils/subjectRegistry'
 * 
 * const subjectId = getSubjectId('Psychology', 'university', 'freshman')
 * const freeSubjects = getFreeSubjects('university', 'freshman')
 * const price = getSubjectPrice('Psychology', 'university', 'freshman')
 * 
 * <SubjectAccessGuard
 *   subjectId={subjectId}
 *   subjectName="Psychology"
 *   educationLevel="university"
 *   grade="freshman"
 *   freeSubjects={freeSubjects}
 * >
 *   <Content />
 * </SubjectAccessGuard>
 */

/**
 * ADMIN SCRIPT TO POPULATE SUBJECT IDS:
 * 
 * Run this in your browser console while logged in as admin:
 * 
 * const subjects = await fetch('/api/subjects').then(r => r.json())
 * console.log('Copy these IDs to subjectRegistry.ts:')
 * subjects.data.forEach(s => {
 *   const key = s.name.toUpperCase().replace(/\s+/g, '_')
 *   console.log(`${key}: '${s.id}',`)
 * })
 */
