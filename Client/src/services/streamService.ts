import api from './api'

export interface Stream {
  id: string
  name: string
  code: string
  gradeId: string
  createdAt?: string
  updatedAt?: string
}

class StreamService {
  async getStreams(gradeId?: string): Promise<Stream[]> {
    const params = gradeId ? { gradeId } : {}
    const response = await api.get('/streams', { params })
    return response.data.data || response.data || []
  }

  async getStreamById(id: string): Promise<Stream> {
    const response = await api.get(`/streams/${id}`)
    return response.data.data || response.data
  }

  async createStream(data: { name: string; code: string; gradeId: string }): Promise<Stream> {
    const response = await api.post('/streams', data)
    return response.data.data || response.data
  }

  async updateStream(id: string, data: Partial<{ name: string; code: string; gradeId: string }>): Promise<Stream> {
    const response = await api.put(`/streams/${id}`, data)
    return response.data.data || response.data
  }

  async deleteStream(id: string): Promise<void> {
    await api.delete(`/streams/${id}`)
  }
}

export const streamService = new StreamService()
