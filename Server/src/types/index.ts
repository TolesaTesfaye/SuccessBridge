// User Types
export interface IUser {
  id: string
  email: string
  name: string
  password: string
  role: 'student' | 'admin' | 'super_admin'
  studentType?: 'high_school' | 'university'
  highSchoolGrade?: 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12'
  highSchoolStream?: 'natural' | 'social'
  universityLevel?: 'remedial' | 'freshman' | 'senior' | 'gc'
  university?: string
  department?: string
  createdAt: Date
  updatedAt: Date
}

// Education Hierarchy Types
export interface IEducationLevel {
  id: string
  name: 'high_school' | 'university'
  description: string
}

export interface IGrade {
  id: string
  name: string
  level: string
  educationLevelId: string
}

export interface IStream {
  id: string
  name: string
  gradeId: string
}

export interface IUniversity {
  id: string
  name: string
  location: string
  createdAt: Date
}

export interface IDepartment {
  id: string
  name: string
  universityId: string
  createdAt: Date
}

export interface ISubject {
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
  | 'textbooks'
  | 'video'
  | 'videos'
  | 'past_exam'
  | 'past_exams'
  | 'module'
  | 'modules'
  | 'quiz'
  | 'quizzes'
  | 'worksheet'
  | 'worksheets'
  | 'project'
  | 'projects'
  | 'research'
  | 'career'
  | 'reference_book'
  | 'reference_books'
  | 'practice_question'
  | 'practice_questions'
  | 'educational_video'
  | 'educational_videos'
  | 'study_guide'
  | 'study_guides'
  | 'formula_sheet'
  | 'formula_sheets'
  | 'entrance_exam_preparation'
  | 'interactive_quiz'
  | 'interactive_quizzes'
  | 'last_year_exam'
  | 'last_year_exams'
  | 'video_tutorial'
  | 'video_tutorials'
  | 'remedial_quiz'
  | 'remedial_quizzes'
  | 'recommendation'
  | 'recommendations'
  | 'project_guide'
  | 'project_guides'
  | 'assignment'
  | 'assignments'
  | 'research_paper'
  | 'research_papers'
  | 'career_guidance'
  | 'professional_skill_module'
  | 'professional_skill_modules'

export interface IResource {
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
  createdAt: Date
  updatedAt: Date
}

// Quiz Types
export interface IQuestion {
  id: string
  text: string
  type: 'multiple_choice' | 'short_answer' | 'essay'
  options?: string[]
  correctAnswer: string
  points: number
}

export interface IQuiz {
  id: string
  title: string
  description: string
  subjectId: string
  questions: IQuestion[]
  timeLimit: number
  passingScore: number
  createdAt: Date
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

// Auth Types
export interface IAuthPayload {
  userId: string
  email: string
  role: string
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface IRegisterRequest {
  email: string
  name: string
  password: string
  role?: 'student' | 'admin' | 'super_admin'
  studentType?: 'high_school' | 'university'
  highSchoolGrade?: 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12'
  highSchoolStream?: 'natural' | 'social'
  universityLevel?: 'remedial' | 'freshman' | 'senior' | 'gc'
  university?: string
  department?: string
}
