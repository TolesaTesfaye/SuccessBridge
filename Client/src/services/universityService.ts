import api from './api'

export interface University {
  id: string
  name: string
  location: string
  email?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export const universityService = {
  getAll: async (): Promise<University[]> => {
    const response = await api.get('/universities')
    return response.data
  },

  getById: async (id: string): Promise<University> => {
    const response = await api.get(`/universities/${id}`)
    return response.data
  },

  create: async (data: Omit<University, 'id' | 'createdAt' | 'updatedAt'>): Promise<University> => {
    const response = await api.post('/universities', data)
    return response.data
  },

  update: async (id: string, data: Partial<University>): Promise<University> => {
    const response = await api.put(`/universities/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/universities/${id}`)
  },
}
