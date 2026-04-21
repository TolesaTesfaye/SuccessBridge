import React, { useState } from 'react'
import { AlertCircle, Mail, X } from 'lucide-react'
import { useAuthStore } from '@store/authStore'
import api from '@services/api'
import { useToast } from './Toast'

export const EmailVerificationBanner: React.FC = () => {
  const { user } = useAuthStore()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Don't show banner if user is verified, not logged in, or banner is dismissed
  if (!user || user.isEmailVerified || dismissed) {
    return null
  }

  const handleResend = async () => {
    setLoading(true)
    try {
      const response = await api.post('/auth/resend-verification', { email: user.email })
      
      if (response.data.success) {
        toast.success('Verification email sent! Please check your inbox.')
      } else {
        toast.error(response.data.error || 'Failed to send verification email')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to send verification email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-orange-50 dark:bg-orange-500/10 border-b border-orange-200 dark:border-orange-500/20">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-1">
            <span className="flex p-2 rounded-lg bg-orange-100 dark:bg-orange-500/20">
              <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </span>
            <p className="ml-3 text-sm font-medium text-orange-800 dark:text-orange-200">
              Please verify your email address to access all features.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResend}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-orange-800 dark:text-orange-200 hover:text-orange-900 dark:hover:text-orange-100 transition-colors disabled:opacity-50"
            >
              <Mail className="w-4 h-4" />
              {loading ? 'Sending...' : 'Resend Email'}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-2 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
