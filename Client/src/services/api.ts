import axios, { AxiosInstance } from 'axios'
import { useAuthStore } from '@store/authStore'
import { parseApiError } from '@utils/errorHandler'

const API_BASE_URL = (window as any).__VITE_API_URL__ || import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for file uploads
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log requests only in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data
      })
    }
    
    return config
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error('❌ Request Error:', error)
    }
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data)
    }
    return response
  },
  async (error) => {
    // Better error logging (only in development)
    if (import.meta.env.DEV) {
      if (error.response) {
        console.error('❌ API Error:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          url: error.config?.url
        })
      } else if (error.request) {
        console.error('❌ Network Error:', {
          message: error.message,
          code: error.code,
          url: error.config?.url
        })
      } else {
        console.error('❌ Request Setup Error:', error.message)
      }
    }
    
    // Parse error for user-friendly message
    const userError = parseApiError(error)
    
    // Handle 401 errors (but not during auth initialization)
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/me')) {
      // Clear auth state and redirect to login
      const { logout } = useAuthStore.getState()
      await logout()
      
      // Only redirect if not already on login/register page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login'
      }
    }
    
    // Attach user-friendly error to the error object
    error.userFriendlyError = userError
    
    return Promise.reject(error)
  }
)

export default api
