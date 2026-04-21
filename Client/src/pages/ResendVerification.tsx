import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppLogo } from '@components/common/AppLogo'
import { ThemeToggle } from '@components/common/ThemeToggle'
import { FormInput } from '@components/forms/FormInput'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'
import api from '@services/api'

export const ResendVerification: React.FC = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    setMessage('')

    try {
      const response = await api.post('/auth/resend-verification', { email })
      
      if (response.data.success) {
        setStatus('success')
        setMessage(response.data.message || 'Verification email sent successfully!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(response.data.error || 'Failed to send verification email')
      }
    } catch (error: any) {
      setStatus('error')
      setMessage(error.response?.data?.error || 'Failed to send verification email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-violet-600 dark:to-indigo-600 blur-[100px] rounded-full mix-blend-screen transition-colors"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="flex justify-center mb-6">
          <AppLogo size="xl" />
        </div>

        <div className="bg-white dark:bg-slate-900/50 py-8 px-4 shadow-2xl dark:shadow-none border border-slate-200 dark:border-white/10 sm:rounded-3xl sm:px-10 backdrop-blur-xl transition-all">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-full">
                <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Resend Verification
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Enter your email to receive a new verification link
            </p>
          </div>

          {status === 'success' && (
            <div className="mb-6 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-3 rounded-xl border border-green-200 dark:border-green-500/20 flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl border border-red-200 dark:border-red-500/20 flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. abebe@example.com"
              required
            />

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="w-4 h-4" />
              {loading ? 'Sending...' : 'Send Verification Email'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
