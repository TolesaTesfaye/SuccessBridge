import { create } from 'zustand'
import { User } from '@types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isInitialized: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Initialize from localStorage
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null

  return {
    user,
    token,
    isAuthenticated: !!token,
    isInitialized: false,

    setUser: (user) => {
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, isAuthenticated: true })
    },

    setToken: (token) => {
      localStorage.setItem('token', token)
      set({ token, isAuthenticated: true })
    },

    initialize: async () => {
      if (get().isInitialized) return;
      set({ isInitialized: true });
      console.log("🔄 Auth store initializing...");
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      
      if (storedToken) {
        try {
          console.log("✅ Validating token with backend...");
          
          // Set a timeout for the validation request
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Token validation timeout')), 5000)
          })
          
          const { authService } = await import('@services/authService')
          const validationPromise = authService.getCurrentUser()
          
          const response = await Promise.race([validationPromise, timeoutPromise]) as any
          
          if (response?.success && response?.data) {
            console.log("✅ Token valid, setting user:", response.data);
            set({ 
              user: response.data, 
              token: storedToken, 
              isAuthenticated: true,
              isInitialized: true 
            })
          } else {
            console.log("❌ Invalid response format, clearing storage");
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            set({ user: null, token: null, isAuthenticated: false, isInitialized: true })
          }
        } catch (error: any) {
          console.error("❌ Token validation failed:", {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data
          });
          
          // If we have stored user data and the error is network-related, use cached data temporarily
          if (storedUser && (
            error?.message?.includes('timeout') || 
            error?.message?.includes('Network Error') ||
            error?.code === 'NETWORK_ERROR' ||
            !error?.response
          )) {
            console.log("🔄 Network error, using cached user data temporarily");
            try {
              const cachedUser = JSON.parse(storedUser)
              set({ 
                user: cachedUser, 
                token: storedToken, 
                isAuthenticated: true,
                isInitialized: true 
              })
              return
            } catch (parseError) {
              console.error("Failed to parse cached user data:", parseError)
            }
          }
          
          // Clear storage for other errors (401, 403, etc.)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          set({ user: null, token: null, isAuthenticated: false, isInitialized: true })
        }
      } else {
        console.log("ℹ️ No stored token, setting initialized");
        set({ isInitialized: true })
      }
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
