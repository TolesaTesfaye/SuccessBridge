/**
 * Hierarchical Learning Structure Utilities
 * Supports both high school and university education levels
 */

export interface HierarchyNode {
  id: string
  name: string
  level: 'education_level' | 'category' | 'university' | 'department' | 'grade' | 'stream' | 'subject'
  children?: HierarchyNode[]
}

/**
 * High School Hierarchy:
 * Education Level (High School)
 *   ↓ Grade (9, 10, 11, 12)
 *     ↓ Stream (Science, Social)
 *       ↓ Subject (Math, Physics, etc.)
 *         ↓ Resource (Textbook, Video, etc.)
 */
export const HIGH_SCHOOL_HIERARCHY: HierarchyNode = {
  id: 'high_school',
  name: 'High School',
  level: 'education_level',
  children: [
    {
      id: 'grade_9',
      name: 'Grade 9',
      level: 'grade',
      children: [
        {
          id: 'science_stream',
          name: 'Science Stream',
          level: 'stream',
          children: [
            { id: 'math', name: 'Mathematics', level: 'subject' },
            { id: 'physics', name: 'Physics', level: 'subject' },
            { id: 'chemistry', name: 'Chemistry', level: 'subject' },
            { id: 'biology', name: 'Biology', level: 'subject' },
          ],
        },
        {
          id: 'social_stream',
          name: 'Social Stream',
          level: 'stream',
          children: [
            { id: 'history', name: 'History', level: 'subject' },
            { id: 'geography', name: 'Geography', level: 'subject' },
            { id: 'civics', name: 'Civics', level: 'subject' },
          ],
        },
      ],
    },
    {
      id: 'grade_10',
      name: 'Grade 10',
      level: 'grade',
      children: [
        {
          id: 'science_stream_10',
          name: 'Science Stream',
          level: 'stream',
          children: [
            { id: 'math_10', name: 'Mathematics', level: 'subject' },
            { id: 'physics_10', name: 'Physics', level: 'subject' },
            { id: 'chemistry_10', name: 'Chemistry', level: 'subject' },
            { id: 'biology_10', name: 'Biology', level: 'subject' },
          ],
        },
      ],
    },
  ],
}

/**
 * University Hierarchy:
 * Education Level (University)
 *   ↓ University (Addis Ababa University, etc.)
 *     ↓ Department (Software Engineering, etc.)
 *       ↓ Subject (Data Structures, etc.)
 *         ↓ Resource (Textbook, Video, etc.)
 */
export interface UniversityHierarchy extends HierarchyNode {
  universities: Array<{
    id: string
    name: string
    departments: Array<{
      id: string
      name: string
      subjects: Array<{
        id: string
        name: string
      }>
    }>
  }>
}

/**
 * Get all subjects for a specific grade and stream
 */
export const getSubjectsForGradeStream = (
  grade: string,
  stream: string,
): string[] => {
  // This would typically fetch from backend
  // For now, returning mock data
  const subjectMap: Record<string, Record<string, string[]>> = {
    '9': {
      science: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
      social: ['History', 'Geography', 'Civics'],
    },
    '10': {
      science: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
      social: ['History', 'Geography', 'Civics'],
    },
    '11': {
      science: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
      social: ['History', 'Geography', 'Civics'],
    },
    '12': {
      science: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
      social: ['History', 'Geography', 'Civics'],
    },
  }

  return subjectMap[grade]?.[stream] ?? []
}

/**
 * Get resource types available for a specific education level
 */
export const getResourceTypesForLevel = (
  educationLevel: 'high_school' | 'university',
): string[] => {
  const baseTypes = ['textbook', 'video', 'past_exam', 'module', 'worksheet']

  if (educationLevel === 'university') {
    return [...baseTypes, 'research', 'project', 'career']
  }

  return baseTypes
}

/**
 * Build filter path for hierarchical navigation
 * Example: "Grade 10 > Science > Mathematics"
 */
export const buildHierarchyPath = (
  educationLevel: 'high_school' | 'university',
  filters: Record<string, string>,
): string => {
  const parts: string[] = []

  if (educationLevel === 'high_school') {
    if (filters.grade) parts.push(`Grade ${filters.grade}`)
    if (filters.stream) parts.push(filters.stream)
    if (filters.subject) parts.push(filters.subject)
  } else {
    if (filters.university) parts.push(filters.university)
    if (filters.department) parts.push(filters.department)
    if (filters.subject) parts.push(filters.subject)
  }

  return parts.join(' > ') || 'All Resources'
}

/**
 * Validate hierarchy path (ensure parent exists before child)
 */
export const isValidHierarchyPath = (
  educationLevel: 'high_school' | 'university',
  filters: Record<string, string>,
): boolean => {
  if (educationLevel === 'high_school') {
    // If stream is selected, grade must be selected
    if (filters.stream && !filters.grade) return false
    // If subject is selected, stream must be selected
    if (filters.subject && !filters.stream) return false
  } else {
    // If department is selected, university must be selected
    if (filters.department && !filters.university) return false
    // If subject is selected, department must be selected
    if (filters.subject && !filters.department) return false
  }

  return true
}
