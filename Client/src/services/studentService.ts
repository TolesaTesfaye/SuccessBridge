import api from './api'
import { StudentProgress } from './progressService'

export interface StudentStats {
  resourcesAccessed: number
  quizzesCompleted: number
  averageScore: number
  studyStreak: number
  subjectProgress: Array<{
    subject: string
    progress: number
    quizzes: number
  }>
}

export const studentService = {
  getProgress: async (): Promise<StudentProgress[]> => {
    const response = await api.get('/student/progress')
    return response.data
  },

  getStats: async (): Promise<StudentStats> => {
    const response = await api.get('/student/stats')
    return response.data
  },
}