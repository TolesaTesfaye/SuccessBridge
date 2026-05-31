import api from './api'

export interface Grade {
  id: string
  name: string
  level: number
  educationLevel: 'high_school' | 'university'
  createdAt?: string
  updatedAt?: string
}

class GradeService {
  async getGrades(educationLevel?: 'high_school' | 'university'): Promise<Grade[]> {
    const params = educationLevel ? { educationLevel } : {}
    const response = await api.get('/grades', { params })
    return response.data.data || response.data || []
  }

  async getGradeById(id: string): Promise<Grade> {
    const response = await api.get(`/grades/${id}`)
    return response.data.data || response.data
  }

  async createGrade(data: { name: string; level: number; educationLevel: 'high_school' | 'university' }): Promise<Grade> {
    const response = await api.post('/grades', data)
    return response.data.data || response.data
  }

  async updateGrade(id: string, data: Partial<{ name: string; level: number; educationLevel: 'high_school' | 'university' }>): Promise<Grade> {
    const response = await api.put(`/grades/${id}`, data)
    return response.data.data || response.data
  }

  async deleteGrade(id: string): Promise<void> {
    await api.delete(`/grades/${id}`)
  }
}

export const gradeService = new GradeService()
