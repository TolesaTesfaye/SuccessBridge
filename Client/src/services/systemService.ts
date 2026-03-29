import api from './api'
import { ApiResponse } from '@types'

export interface SystemStatus {
  apiStatus: string
  database: string
  cache: string
  storage: string
  uptime: string
  lastBackup: string
}

export const systemService = {
  getStatus: async (): Promise<ApiResponse<SystemStatus>> => {
    const response = await api.get('/system/status')
    return response.data
  },

  performAction: async (action: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.post('/system/action', { action })
    return response.data
  }
}
