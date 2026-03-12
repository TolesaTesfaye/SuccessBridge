import React from 'react'
import { useAuthStore } from '@store/authStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from './common/Button'
import { ThemeToggle } from './common/ThemeToggle'
import { Footer } from './common/Footer'
import { AppLogo } from './common/AppLogo'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  // Don't show layout wrapper for auth pages and dashboards
  const isAuthPage = ['/login', '/register', '/unauthorized', '/404'].includes(location.pathname)
  const isDashboard = location.pathname.includes('/dashboard') ||
    location.pathname.includes('/student') ||
    location.pathname.includes('/admin') ||
    location.pathname.includes('/superadmin') ||
    location.pathname.includes('/highschool') ||
    location.pathname.includes('/university')
  const isHome = location.pathname === '/'

  // Skip layout for dashboards and auth pages (regardless of auth status)
  if (isDashboard || isAuthPage) {
    return <>{children}</>
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <AppLogo size="lg" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 hidden sm:block">
              SuccessBridge
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role.replace('_', ' ')}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <Button variant="secondary" onClick={handleLogout} className="text-sm">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={() => navigate('/login')} className="text-sm">
                  Login
                </Button>
                <Button variant="primary" onClick={() => navigate('/register')} className="text-sm">
                  Sign Up
                </Button>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer - Always show */}
      <Footer />
    </div>
  )
}

