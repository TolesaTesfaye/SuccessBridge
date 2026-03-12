import { create } from 'zustand'
import { User } from '@types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Initialize from localStorage
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null

  return {
    user,
    token,
    isAuthenticated: !!token,

    setUser: (user) => {
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, isAuthenticated: true })
    },

    setToken: (token) => {
      localStorage.setItem('token', token)
      set({ token, isAuthenticated: true })
    },

    logout: async () => {
      try {
        // Call backend logout endpoint if user is authenticated
        if (get().isAuthenticated) {
          const { authService } = await import('@services/authService')
          await authService.logout()
        }
      } catch (error) {
        console.error('Logout error:', error)
        // Continue with client-side logout even if server call fails
      } finally {
        // Always clear client-side data
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        set({ user: null, token: null, isAuthenticated: false })
      }
    },
  }
})
