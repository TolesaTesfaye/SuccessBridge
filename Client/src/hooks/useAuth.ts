import { useAuthStore } from '@store/authStore'
import { authService } from '@services/authService'
import { useState } from 'react'
import { useToast } from '@components/common/Toast'
import { SUCCESS_MESSAGES } from '@utils/errorHandler'

export const useAuth = () => {
  const { user, isAuthenticated, setUser, setToken, logout } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()

  const login = async (email: string, password: string) => {
    console.log("🔐 Login attempt for:", email);
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(email, password)
      console.log("📋 Login response:", response);
      
      if (response.success && response.data) {
        console.log("✅ Login successful, user data:", response.data.user);
        setUser(response.data.user)
        setToken(response.data.token)
        toast.success(SUCCESS_MESSAGES.LOGIN)
      } else {
        const errorMsg = response.error || 'Login failed'
        console.error("❌ Login failed:", errorMsg);
        setError(errorMsg)
        toast.error(errorMsg)
      }
    } catch (err: any) {
      console.error("❌ Login error:", err);
      const userError = err.userFriendlyError
      if (userError) {
        setError(userError.message)
        toast.showToast(userError.type, userError.message, userError.duration)
      } else {
        const fallbackMsg = err.response?.data?.error || err.message || 'Login failed'
        setError(fallbackMsg)
        toast.error(fallbackMsg)
      }
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
        if (userData.role === 'admin') {
          // Admin registration - show auto-approval message
          toast.success('🎉 Admin registration request submitted successfully!\n\n⏳ Your application is now under review by the super admin. Please wait for approval before attempting to log in.\n\n📧 You will be notified once your account has been reviewed.\n\n⚡ Approval typically takes a few seconds.', 8000)
          return true // Don't auto-login for admins
        } else {
          // Student registration - auto-login
          setUser(response.data.user)
          setToken(response.data.token)
          toast.success(SUCCESS_MESSAGES.REGISTER)
          return true
        }
      }
      const errorMsg = response.error || 'Registration failed'
      setError(errorMsg)
      toast.error(errorMsg)
    } catch (err: any) {
      const userError = err.userFriendlyError
      if (userError) {
        setError(userError.message)
        toast.showToast(userError.type, userError.message, userError.duration)
      } else {
        const fallbackMsg = err.response?.data?.error || err.message || 'Registration failed'
        setError(fallbackMsg)
        toast.error(fallbackMsg)
      }
    } finally {
      setLoading(false)
    }
    return false
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success(SUCCESS_MESSAGES.LOGOUT)
    } catch (err: any) {
      // Even if logout API fails, we still clear local state
      await logout()
      toast.info('You have been logged out')
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: handleLogout,
  }
}
