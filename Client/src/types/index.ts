// User Types
export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'admin' | 'super_admin'
  studentType?: 'high_school' | 'university'
  highSchoolGrade?: 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12'
  highSchoolStream?: 'natural' | 'social'
  universityLevel?: 'remedial' | 'freshman' | 'senior' | 'gc'
  university?: string
  department?: string
  createdAt: string | Date
}

// Education Hierarchy Types
export interface EducationLevel {
  id: string
  name: 'high_school' | 'university'
  description: string
}

export interface Grade {
  id: string
  name: string
  level: string
  educationLevelId: string
}

export interface Stream {
  id: string
  name: string
  gradeId: string
}

export interface University {
  id: string
  name: string
  location: string
  createdAt: Date
}

export interface Department {
  id: string
  name: string
  universityId: string
  createdAt: Date
}

export interface Subject {
  id: string
  name: string
  code: string
  departmentId?: string
  gradeId?: string
  streamId?: string
}

// Resource Types
export type ResourceType =
  | 'textbook'
  | 'video'
  | 'past_exam'
  | 'module'
  | 'quiz'
  | 'worksheet'
  | 'project'
  | 'research'
  | 'career'
  | 'reference_book'
  | 'practice_question'
  | 'educational_video'
  | 'study_guide'
  | 'formula_sheet'
  | 'entrance_exam'
  | 'interactive_quiz'
  | 'remedial_quiz'
  | 'recommendation'
  | 'project_guide'
  | 'assignment'
  | 'research_paper'
  | 'career_guidance'
  | 'professional_module'

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  fileUrl: string
  educationLevel: 'high_school' | 'university'
  grade?: string
  stream?: string
  subjectId: string
  universityId?: string
  departmentId?: string
  tags: string[]
  uploadedBy: string
  createdAt: string | Date
  updatedAt: string | Date
}

// Quiz Types
export interface Quiz {
  id: string
  title: string
  description: string
  subjectId: string
  questions: Question[]
  timeLimit: number
  passingScore: number
  createdAt: string | Date
  updatedAt?: string | Date
}

export interface Question {
  id: string
  text: string
  type: 'multiple_choice' | 'short_answer' | 'essay'
  options?: string[]
  correctAnswer: string
  points: number
}

// Filter Types
export interface HighSchoolFilter {
  educationLevel?: 'high_school'
  grade?: string
  stream?: string
  subject?: string
  resourceType?: ResourceType
  limit?: number
}

export interface UniversityFilter {
  educationLevel?: 'university'
  university?: string
  universityId?: string
  department?: string
  departmentId?: string
  stream?: string
  grade?: string
  subject?: string
  resourceType?: ResourceType
  limit?: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
