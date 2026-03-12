import api from './api'
import { User, ApiResponse } from '@types'

export const authService = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (userData: {
    email: string
    name: string
    password: string
    role?: string
    studentType?: 'high_school' | 'university'
    highSchoolGrade?: string
    highSchoolStream?: string
    universityLevel?: string
    university?: string
    department?: string
  }): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.post('/auth/logout')
    return response.data
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/me')
    return response.data
  },
}
