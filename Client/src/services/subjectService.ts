import api from './api'

export interface Subject {
  id: string
  name: string
  code: string
  departmentId?: string
  gradeId?: string
  streamId?: string
  createdAt: Date
  updatedAt: Date
}

class SubjectService {
  async getSubjects(): Promise<Subject[]> {
    const response = await api.get('/subjects')
    return response.data.data || response.data
  }

  async getAll(): Promise<Subject[]> {
    return this.getSubjects()
  }

  async getSubjectsByFilter(filters: { gradeId?: string; departmentId?: string; streamId?: string }): Promise<Subject[]> {
    const response = await api.get('/subjects', { params: filters })
    return response.data.data || response.data
  }

  async getSubjectById(id: string): Promise<Subject> {
    const response = await api.get(`/subjects/${id}`)
    return response.data.data || response.data
  }

  async createSubject(data: { name: string; code: string; gradeId?: string; streamId?: string; departmentId?: string }): Promise<Subject> {
    const response = await api.post('/subjects', data)
    return response.data.data || response.data
  }

  async updateSubject(id: string, data: Partial<Subject>): Promise<Subject> {
    const response = await api.put(`/subjects/${id}`, data)
    return response.data.data || response.data
  }

  async deleteSubject(id: string): Promise<void> {
    await api.delete(`/subjects/${id}`)
  }

  /**
   * Find subject by name
   * This is useful for looking up subjects dynamically
   */
  async findSubjectByName(name: string): Promise<Subject | null> {
    try {
      const subjects = await this.getSubjects()
      const subject = subjects.find(
        s => s.name.toLowerCase() === name.toLowerCase()
      )
      return subject || null
    } catch (error) {
      console.error('Error finding subject by name:', error)
      return null
    }
  }

  /**
   * Get subject ID by name (cached)
   * Uses localStorage to cache subject IDs for better performance
   */
  async getSubjectIdByName(name: string): Promise<string | null> {
    // Check cache first
    const cacheKey = `subject_id_${name.toLowerCase()}`
    const cached = localStorage.getItem(cacheKey)
    
    if (cached) {
      return cached
    }

    // Fetch from API
    const subject = await this.findSubjectByName(name)
    
    if (subject) {
      // Cache for future use
      localStorage.setItem(cacheKey, subject.id)
      return subject.id
    }

    return null
  }

  /**
   * Clear subject ID cache
   * Call this if subjects are updated
   */
  clearCache() {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('subject_id_')) {
        localStorage.removeItem(key)
      }
    })
  }
}

export const subjectService = new SubjectService()
