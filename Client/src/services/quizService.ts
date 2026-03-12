import api from './api'
import { Quiz, Question } from '@types'

export type { Quiz, Question }

export interface QuizResult {
  id: string
  quizId: string
  studentId: string
  score: number
  totalPoints: number
  timeSpent: number
  answers: Record<string, string>
  passed: boolean
  createdAt: string
  updatedAt: string
}

export const quizService = {
  getAll: async (params?: any): Promise<Quiz[]> => {
    const response = await api.get('/quizzes', { params })
    return response.data
  },

  getById: async (id: string): Promise<Quiz> => {
    const response = await api.get(`/quizzes/${id}`)
    return response.data
  },

  create: async (data: {
    title: string
    description: string
    educationLevel: 'high_school' | 'university'
    grade?: string
    stream?: string
    subjectId: string
    questions: Question[]
    timeLimit: number
    passingScore: number
  }): Promise<Quiz> => {
    const response = await api.post('/quizzes', data)
    return response.data
  },

  update: async (id: string, data: Partial<Quiz>): Promise<Quiz> => {
    const response = await api.put(`/quizzes/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/quizzes/${id}`)
  },

  submitResult: async (quizId: string, result: {
    score: number
    totalPoints: number
    timeSpent: number
    answers: Record<string, string>
  }): Promise<QuizResult> => {
    const response = await api.post(`/quizzes/${quizId}/submit`, result)
    return response.data
  },
}
