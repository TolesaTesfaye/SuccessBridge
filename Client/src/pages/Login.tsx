import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { FormInput } from '@components/forms/FormInput'
import { AppLogo } from '@components/common/AppLogo'
import { Footer } from '@components/common/Footer'
import { LogIn, AlertCircle } from 'lucide-react'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [formError, setFormError] = useState<string | null>(null)

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

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setFormError(error || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">

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
            {(formError || error) && (
              <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl border border-red-200 dark:border-red-500/20 flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{formError || error}</span>
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

              <div className="relative">
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <div className="absolute -top-1 right-0 text-sm">
                  <Link to="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
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

      <Footer />
    </div>
  )
}
