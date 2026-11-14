import api from './api'
import { Resource, ApiResponse, PaginatedResponse, HighSchoolFilter, UniversityFilter } from '@types'

export const resourceService = {
  getResources: async (filters?: HighSchoolFilter | UniversityFilter): Promise<ApiResponse<PaginatedResponse<Resource>>> => {
    const response = await api.get('/resources', { params: filters })
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
      timeout: 120000, // Uploads can take longer, especially after a cold start
    })
    return response.data
  },

  updateResource: async (
    id: string,
    data: Partial<Resource>,
    files?: { previewImage?: File | null; removePreviewImage?: boolean }
  ): Promise<ApiResponse<Resource>> => {
    // Plain JSON when no file operations are involved (backward compatible)
    if (!files || (!files.previewImage && !files.removePreviewImage)) {
      const response = await api.put(`/resources/${id}`, data)
      return response.data
    }

    // Multipart when replacing/removing the preview image (or file)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      formData.append(key, typeof value === 'string' ? value : String(value))
    })
    if (files.removePreviewImage) {
      formData.append('removePreviewImage', 'true')
    }
    if (files.previewImage) {
      formData.append('previewImage', files.previewImage)
    }

    const response = await api.put(`/resources/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000,
    })
    return response.data
  },

  deleteResource: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/resources/${id}`)
    return response.data
  },

  getResourceStats: async (): Promise<ApiResponse<any>> => {
    const response = await api.get('/resources/stats')
    return response.data
  },

  getPreviewImageUrl: async (id: string): Promise<{ success: boolean; url: string | null }> => {
    const response = await api.get(`/resources/${id}/preview-image`)
    return response.data
  }
}
