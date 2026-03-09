import api from './api'
import { User, ApiResponse, PaginatedResponse } from '@types'

export const userService = {
  getAllUsers: async (page = 1, limit = 10, role?: string): Promise<PaginatedResponse<User>> => {
    const params: any = { page, limit }
    if (role) params.role = role
    const response = await api.get('/users', { params })
    // Backend returns { success: true, data: { users: [...], total, page, limit } }
    const { users, total, page: responsePage, limit: responseLimit } = response.data.data
    return {
      data: users,
      total,
      page: responsePage,
      limit: responseLimit,
    }
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  updateUser: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put(`/users/${id}`, data)
    return response.data
  },

  deleteUser: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },
}
