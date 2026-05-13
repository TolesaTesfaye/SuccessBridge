import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LoadingOverlay } from '../components/common/Spinner'
import { useToast } from '../components/common/Toast'

export const OAuthCallback: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const { setToken, initialize } = useAuthStore()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('OAuth Callback - Location search:', location.search)
        const params = new URLSearchParams(location.search)
        const token = params.get('token')
        const error = params.get('error')
        const completeProfile = params.get('complete_profile')

        console.log('OAuth Callback - Parsed params:', { token: token?.substring(0, 20) + '...', error, completeProfile })

        if (error) {
          console.error('OAuth Callback - Error received:', error)
          // Login page reads ?error= and shows one toast + inline message; avoid duplicate toasts here.
          navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true })
          return
        }

        if (token) {
          console.log('OAuth Callback - Setting token and initializing...')
          localStorage.setItem('token', token)
          setToken(token)
          
          // Don't wait for initialize to complete, just proceed
          initialize().catch(error => {
            console.error('OAuth Callback - Initialize failed (continuing anyway):', error)
          })
          
          if (completeProfile === 'true') {
            console.log('OAuth Callback - Redirecting to complete profile')
            toast.success('Authentication successful! Please complete your profile.')
            navigate('/complete-profile')
          } else {
            console.log('OAuth Callback - Redirecting to dashboard')
            toast.success('Successfully authenticated!')
            navigate('/dashboard')
          }
        } else {
          console.error('OAuth Callback - No token received')
          toast.error('No token received. Authentication failed.')
          navigate('/login')
        }
      } catch (err) {
        console.error('OAuth callback error:', err)
        toast.error('An error occurred during authentication.')
        navigate('/login')
      }
    }

    handleCallback()
  }, [location, navigate, setToken, initialize, toast])

  return <LoadingOverlay message="Completing authentication..." />
}
