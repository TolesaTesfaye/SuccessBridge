import api from './api'
import { User, ApiResponse } from '@types'

export const authService = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (userData: any): Promise<ApiResponse<User>> => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/me')
    return response.data
  },
}
