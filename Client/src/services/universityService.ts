import api from './api'
import { ApiResponse } from '@types'

interface University {
  id: string
  name: string
  location: string
  email?: string
}

interface UniversityWithResources extends University {
  resourceCount?: number
}

export const universityService = {
  getUniversities: async (): Promise<ApiResponse<University[]>> => {
    const response = await api.get('/universities')
    return response.data
  },

  createUniversity: async (data: { name: string; location: string; email?: string }): Promise<ApiResponse<University>> => {
    const response = await api.post('/universities', data)
    return response.data
  },

  updateUniversity: async (id: string, data: { name: string; location: string; contactEmail?: string }): Promise<ApiResponse<University>> => {
    const response = await api.put(`/universities/${id}`, data)
    return response.data
  },

  deleteUniversity: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/universities/${id}`)
    return response.data
  },

  getUniversitiesWithFreshmanResources: async (): Promise<ApiResponse<UniversityWithResources[]>> => {
    try {
      // Get universities directly from universities endpoint (more efficient)
      const universitiesResponse = await api.get('/universities')
      
      if (universitiesResponse.data.success && universitiesResponse.data.data) {
        const universities = universitiesResponse.data.data
        
        // For each university, get resource count (more efficient than fetching all resources)
        const universitiesWithCounts = await Promise.all(
          universities.map(async (uni: University) => {
            try {
              const resourceResponse = await api.get('/resources', {
                params: {
                  educationLevel: 'university',
                  category: 'freshman', // Changed from 'grade' to 'category'
                  universityId: uni.id,
                  limit: 1 // Just get count, not actual resources
                }
              })
              
              return {
                ...uni,
                resourceCount: resourceResponse.data.data?.total || 0
              }
            } catch (error) {
              return {
                ...uni,
                resourceCount: 0
              }
            }
          })
        )
        
        // Filter out universities with no resources and sort
        const universitiesWithResources = universitiesWithCounts
          .filter(uni => uni.resourceCount > 0)
          .sort((a, b) => a.name.localeCompare(b.name))
        
        return {
          success: true,
          data: universitiesWithResources
        }
      }
      
      return {
        success: false,
        error: 'Failed to fetch universities',
        data: []
      }
    } catch (error) {
      console.error('Error fetching universities with freshman resources:', error)
      return {
        success: false,
        error: 'Network error while fetching universities',
        data: []
      }
    }
  },
}
