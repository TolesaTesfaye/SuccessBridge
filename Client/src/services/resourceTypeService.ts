import api from './api'

export interface ResourceType {
  id: string
  name: string
  gradeId: string
  createdAt?: string
  updatedAt?: string
}

class ResourceTypeService {
  async getByGrade(gradeId: string, signal?: AbortSignal): Promise<ResourceType[]> {
    const response = await api.get('/resource-types', { params: { gradeId }, signal })
    return response.data.data || response.data || []
  }

  async create(data: { name: string; gradeId: string }): Promise<ResourceType> {
    const response = await api.post('/resource-types', data)
    return response.data.data || response.data
  }

  async update(id: string, data: { name?: string }): Promise<ResourceType> {
    const response = await api.put(`/resource-types/${id}`, data)
    return response.data.data || response.data
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/resource-types/${id}`)
  }
}

export const resourceTypeService = new ResourceTypeService()
