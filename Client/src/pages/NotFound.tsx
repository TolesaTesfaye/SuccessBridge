import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/common/Button'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md">
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </div>
    </div>
  )
}
