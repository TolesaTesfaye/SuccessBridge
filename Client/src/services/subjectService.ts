import api from './api'

export interface Subject {
  id: string
  name: string
  code: string
  departmentId?: string
  gradeId?: string
  streamId?: string
  createdAt: string
  updatedAt: string
}

export const subjectService = {
  getAll: async (): Promise<Subject[]> => {
    const response = await api.get('/subjects')
    return response.data
  },

  getById: async (id: string): Promise<Subject> => {
    const response = await api.get(`/subjects/${id}`)
    return response.data
  },

  create: async (data: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>): Promise<Subject> => {
    const response = await api.post('/subjects', data)
    return response.data
  },

  update: async (id: string, data: Partial<Subject>): Promise<Subject> => {
    const response = await api.put(`/subjects/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/subjects/${id}`)
  },
}
