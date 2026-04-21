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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-violet-600 dark:to-indigo-600 blur-[100px] rounded-full mix-blend-screen transition-colors"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <AppLogo size="xl" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900 dark:text-white transition-colors">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400 transition-colors">
          Log in to continue your learning journey
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white dark:bg-slate-900/50 py-8 px-4 shadow-2xl dark:shadow-none border border-slate-200 dark:border-white/10 sm:rounded-3xl sm:px-10 backdrop-blur-xl transition-all">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formError && (
              <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl border border-red-200 dark:border-red-500/20 flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="space-y-4">
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
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-blue-600/30"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-[#0a0f1c] text-slate-500 dark:text-slate-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`${import.meta.env.VITE_API_URL}/auth/google`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                <span>Google</span>
              </a>
              <a
                href={`${import.meta.env.VITE_API_URL}/auth/microsoft`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-5 h-5" />
                <span>Microsoft</span>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 text-center transition-colors">
            <p className="text-sm text-slate-600 dark:text-slate-400">
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
