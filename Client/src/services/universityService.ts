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

  getUniversitiesWithFreshmanResources: async (): Promise<ApiResponse<UniversityWithResources[]>> => {
    try {
      // Get universities that have freshman resources
      const response = await api.get('/resources', {
        params: {
          educationLevel: 'university',
          grade: 'freshman',
          limit: 1000 // Get a large number to see all universities
        }
      })
      
      if (response.data.success && response.data.data) {
        const resources = response.data.data.data || []
        
        // Extract unique universities from resources
        const universityMap = new Map<string, UniversityWithResources>()
        
        resources.forEach((resource: any) => {
          if (resource.university && resource.university.id) {
            const uni = resource.university
            const existing = universityMap.get(uni.id)
            if (existing) {
              existing.resourceCount = (existing.resourceCount || 0) + 1
            } else {
              universityMap.set(uni.id, {
                id: uni.id,
                name: uni.name,
                location: uni.location || '',
                resourceCount: 1
              })
            }
          }
        })
        
        const universities = Array.from(universityMap.values()).sort((a, b) => a.name.localeCompare(b.name))
        
        return {
          success: true,
          data: universities
        }
      }
      
      return {
        success: false,
        error: 'Failed to fetch universities with freshman resources',
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