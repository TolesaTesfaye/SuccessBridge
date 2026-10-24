// Shared TypeScript types for SuccessBridge Mobile App

export type UserRole = 'student' | 'admin' | 'super_admin';
export type StudentType = 'high_school' | 'university';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type HighSchoolGrade = 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12';
export type HighSchoolStream = 'natural' | 'social';
export type UniversityLevel = 'remedial' | 'freshman';

export interface User {
  id: string;
  email: string;
  name: string;
  fatherName?: string;
  role: UserRole;
  studentType?: StudentType;
  highSchoolGrade?: HighSchoolGrade;
  highSchoolStream?: HighSchoolStream;
  universityLevel?: UniversityLevel;
  university?: string;
  department?: string;
  universityId?: string;
  departmentId?: string;
  gradeId?: string;
  streamId?: string;
  isApproved?: boolean;
  approvalStatus?: ApprovalStatus;
  isEmailVerified?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  fatherName?: string;
  email: string;
  password: string;
  studentType?: StudentType;
  highSchoolGrade?: HighSchoolGrade;
  highSchoolStream?: HighSchoolStream;
  universityLevel?: UniversityLevel;
  universityId?: string;
  departmentId?: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  fileType?: string;
  subjectId?: string;
  subject?: Subject;
  type?: string;
  resourceTypeId?: string;
  resourceType?: ResourceType;
  isLocked?: boolean;
  createdAt?: string;
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  gradeId?: string;
  streamId?: string;
  departmentId?: string;
}

export interface ResourceType {
  id: string;
  name: string;
  icon?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  subjectId?: string;
  subject?: Subject;
  questions?: QuizQuestion[];
  questionCount?: number;
  timeLimit?: number; // seconds
  difficulty?: 'easy' | 'medium' | 'hard';
  createdAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: number;
  explanation?: string;
}

export interface QuizResult {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  timeTaken?: number;
  answers?: Record<string, number>;
  createdAt?: string;
}

export interface StudentProgress {
  id: string;
  userId: string;
  resourceId?: string;
  quizId?: string;
  progressPercent?: number;
  completed?: boolean;
  lastAccessedAt?: string;
}

export interface Notification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type?: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  plan?: string;
  createdAt?: string;
}

export interface University {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
  universityId?: string;
}

export interface Grade {
  id: string;
  name: string;
}

export interface Stream {
  id: string;
  name: string;
  gradeId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total?: number;
  page?: number;
  limit?: number;
}
