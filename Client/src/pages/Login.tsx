import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { FormInput } from '@components/forms/FormInput'
import { AppLogo } from '@components/common/AppLogo'
import { ThemeToggle } from '@components/common/ThemeToggle'
import { useToast } from '@components/common/Toast'
import { LogIn, AlertCircle } from 'lucide-react'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const { login, loading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [formError, setFormError] = useState<string | null>(null)

  // Show message from navigation state (e.g., from registration)
  useEffect(() => {
    const state = location.state as any
    if (state?.message) {
      if (state.type === 'info') {
        toast.info(state.message, 8000)
      } else {
        toast.success(state.message)
      }
      // Clear the state to prevent showing message again on refresh
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, toast, navigate, location.pathname])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFormError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields')
      return
    }

    if (!formData.email.includes('@')) {
      setFormError('Please enter a valid email address')
      return
    }

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      // Error handling is now done in useAuth hook with toast notifications
      console.error('Login error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 flex flex-col justify-center py-6 md:py-12 transition-colors duration-300">

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full mx-auto max-w-md relative z-10 px-3 md:px-0">
        <div className="flex justify-center mb-3 md:mb-6">
          <AppLogo size="md" className="md:scale-125" />
        </div>
        <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white transition-colors text-center">
          Welcome back
        </h2>
        <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 transition-colors text-center">
          Log in to continue your learning journey
        </p>
      </div>

      <div className="mt-4 md:mt-8 w-full mx-auto max-w-md relative z-10 px-3 md:px-0">
        <div className="bg-white dark:bg-slate-700 py-4 md:py-8 px-3 md:px-10 md:shadow-2xl md:border border-slate-200 dark:border-slate-600 rounded-2xl md:rounded-3xl md:backdrop-blur-xl transition-all">
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {formError && (
              <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-red-200 dark:border-red-500/20 flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="space-y-3 md:space-y-4">
              <FormInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <div className="space-y-2">
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  showPasswordToggle={true}
                  required
                />
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 md:py-3 px-4 border border-transparent rounded-lg md:rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-blue-600/30"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 md:mt-6 flex flex-col gap-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs md:text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <a
                href={`${import.meta.env.VITE_API_URL}/auth/google`}
                className="flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-2.5 px-3 md:px-4 border border-slate-200 dark:border-slate-600 rounded-lg md:rounded-xl bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 transition-all text-xs md:text-sm font-medium text-slate-700 dark:text-slate-100"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4 md:w-5 md:h-5" />
                <span>Google</span>
              </a>
              <a
                href={`${import.meta.env.VITE_API_URL}/auth/microsoft`}
                className="flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-2.5 px-3 md:px-4 border border-slate-200 dark:border-slate-600 rounded-lg md:rounded-xl bg-white dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 transition-all text-xs md:text-sm font-medium text-slate-700 dark:text-slate-100"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-4 h-4 md:w-5 md:h-5" />
                <span>Microsoft</span>
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-slate-200 dark:border-slate-600 text-center transition-colors">
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                Create a free account
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}
