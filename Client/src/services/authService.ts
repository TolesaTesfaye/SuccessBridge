import api from './api'
import { User, ApiResponse } from '@types'
import { parseApiError } from '@utils/errorHandler'

export const authService = {
  // Health check to verify backend connectivity
  healthCheck: async (): Promise<boolean> => {
    try {
      const response = await api.get('/health', { timeout: 3000 })
      return response.status === 200
    } catch (error) {
      console.warn('Backend health check failed:', error)
      return false
    }
  },

  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response = await api.post('/auth/login', { email, password })
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw {
        ...error as any,
        userFriendlyError: userError
      }
    }
  },

  register: async (userData: {
    email: string
    name: string
    password?: string
    role?: string
    studentType?: 'high_school' | 'university'
    highSchoolGrade?: string
    highSchoolStream?: string
    universityLevel?: string
    university?: string
    department?: string
  }): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw {
        ...error as any,
        userFriendlyError: userError
      }
    }
  },

  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await api.post('/auth/logout')
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw { ...error as any, userFriendlyError: userError }
    }
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get('/auth/me')
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw {
        ...error as any,
        userFriendlyError: userError
      }
    }
  },

  getAdminRequests: async (): Promise<ApiResponse<{ requests: any[] }>> => {
    try {
      const response = await api.get('/auth/admin-requests')
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw { ...error as any, userFriendlyError: userError }
    }
  },

  approveAdminRequest: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post(`/auth/admin-requests/${id}/approve`)
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw { ...error as any, userFriendlyError: userError }
    }
  },

  rejectAdminRequest: async (id: string, reason: string): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post(`/auth/admin-requests/${id}/reject`, { reason })
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw { ...error as any, userFriendlyError: userError }
    }
  },

  setupPassword: async (data: { token: string; password: string }): Promise<ApiResponse<any>> => {
    try {
      const response = await api.post('/auth/setup-password', data)
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw { ...error as any, userFriendlyError: userError }
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw { ...error as any, userFriendlyError: userError }
    }
  },

  verifyResetCode: async (email: string, code: string): Promise<ApiResponse<{ message: string; email: string }>> => {
    try {
      const response = await api.post('/auth/verify-reset-code', { email, code })
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw { ...error as any, userFriendlyError: userError }
    }
  },

  resetPassword: async (email: string, code: string, newPassword: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await api.post('/auth/reset-password', { email, code, newPassword })
      return response.data
    } catch (error) {
      const userError = parseApiError(error)
      throw { ...error as any, userFriendlyError: userError }
    }
  },
}
