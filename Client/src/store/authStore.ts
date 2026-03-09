import { create } from 'zustand'
import { User } from '@types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => {
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

    logout: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      set({ user: null, token: null, isAuthenticated: false })
    },
  }
})
