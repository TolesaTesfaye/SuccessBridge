import { useAuthStore } from '@store/authStore'
import { authService } from '@services/authService'
import { useState } from 'react'

export const useAuth = () => {
  const { user, isAuthenticated, setUser, setToken, logout } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(email, password)
      if (response.success && response.data) {
        setUser(response.data.user)
        setToken(response.data.token)
      } else {
        setError(response.error || 'Login failed')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: any): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.register(userData)
      if (response.success && response.data) {
        // After registration, login to get token
        const loginResponse = await authService.login(userData.email, userData.password)
        if (loginResponse.success && loginResponse.data) {
          setUser(loginResponse.data.user)
          setToken(loginResponse.data.token)
          return true
        }
      }
      setError(response.error || 'Registration failed')
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
    return false
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
  }
}
