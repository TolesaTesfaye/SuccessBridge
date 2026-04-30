import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '../components/common/Toast'

interface OAuthData {
  email: string
  name: string
  googleId?: string
  provider: 'google'
}

interface University {
  id: string
  name: string
}

interface Department {
  id: string
  name: string
  universityId: string
}

export const OAuthRegister: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const toast = useToast()
  
  const [oauthData, setOAuthData] = useState<OAuthData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Get OAuth data from URL params
    const email = searchParams.get('email')
    const name = searchParams.get('name')
    const googleId = searchParams.get('googleId')
    const provider = searchParams.get('provider') as 'google'

    if (!email || !name || !provider) {
      toast.error('Invalid OAuth data. Please try again.')
      navigate('/register')
      return
    }

    setOAuthData({
      email,
      name,
      googleId: googleId || undefined,
      provider
    })
  }, [searchParams, navigate, toast])

  const handleContinue = async () => {
    if (!oauthData) return

    // Just store OAuth data and navigate to profile completion
    // Account will be created after profile is completed
    sessionStorage.setItem('oauthData', JSON.stringify(oauthData))
    toast.success('Please complete your profile to finish registration.')
    navigate('/complete-profile')
  }

  if (!oauthData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">
                {oauthData.provider === 'google' ? '🔵' : '🔷'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Complete Your Registration
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Signed in with Google
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {oauthData.email}
            </p>
          </div>

          {/* Info Display (Read-only) */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {oauthData.email}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ✓ Verified by Google
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {oauthData.name}
              </div>
            </div>

            {/* Password Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                ••••••••••••
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Auto-generated secure password. You can login with Google anytime.
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 text-xl mr-3">ℹ️</span>
                <div className="text-sm text-blue-800 dark:text-blue-300">
                  <p className="font-medium mb-1">Quick Setup</p>
                  <p>Your account will be created with the information from Google. Click Next to complete your student profile.</p>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleContinue}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all shadow-lg mt-6"
            >
              Next: Complete Profile →
            </button>
          </div>

          {/* Cancel */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/register')}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel and go back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
