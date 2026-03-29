import api from './api'
import { Resource, ApiResponse, PaginatedResponse, HighSchoolFilter, UniversityFilter } from '@types'

export const resourceService = {
  getResources: async (filters?: HighSchoolFilter | UniversityFilter): Promise<ApiResponse<PaginatedResponse<Resource>>> => {
    const response = await api.get('/resources', { params: filters })
    return response.data
  },

  getFreshmanResources: async (filters?: {
    page?: number
    limit?: number
    university?: string
    universityId?: string
    department?: string
    subject?: string
    type?: string
  }): Promise<ApiResponse<PaginatedResponse<Resource>>> => {
    // Use the main resources endpoint with freshman-specific filters
    const freshmanFilters = {
      ...filters,
      educationLevel: 'university',
      category: 'freshman' // Changed from 'grade' to 'category' to match backend
    }
    const response = await api.get('/resources', { params: freshmanFilters })
    return response.data
  },

  getResourceById: async (id: string): Promise<ApiResponse<Resource>> => {
    const response = await api.get(`/resources/${id}`)
    return response.data
  },

  uploadResource: async (formData: FormData): Promise<ApiResponse<Resource>> => {
    const response = await api.post('/resources', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  updateResource: async (id: string, data: Partial<Resource>): Promise<ApiResponse<Resource>> => {
    const response = await api.put(`/resources/${id}`, data)
    return response.data
  },

  deleteResource: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/resources/${id}`)
    return response.data
  },

  getResourceStats: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/resources/stats')
    return response.data
  }
}
