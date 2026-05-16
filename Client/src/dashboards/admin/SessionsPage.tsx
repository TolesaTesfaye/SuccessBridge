import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { useToast } from '@components/common/Toast'
import { Activity, Menu, X } from 'lucide-react'
import AdminSecuritySidebar from './AdminSecuritySidebar'
import SecurityMetricCard from './SecurityMetricCard'

export const SessionsPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const toast = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (user && user.role !== 'super_admin') {
      navigate('/unauthorized')
    }
  }, [user, navigate])

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSecuritySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Activity size={28} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Active Sessions Monitor</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl">
            {/* Coming Soon */}
            <div className="bg-white rounded-lg border border-gray-200 p-12 shadow-sm text-center">
              <Activity size={48} className="text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Active Sessions Monitor</h2>
              <p className="text-gray-600 mb-6">
                Track and manage all active user sessions across the platform.
                This feature is coming soon in the next update.
              </p>
              <div className="space-y-2 text-left max-w-md mx-auto text-sm text-gray-600">
                <p>✅ View all active sessions</p>
                <p>✅ Monitor session duration</p>
                <p>✅ Detect unusual login locations</p>
                <p>✅ Force logout suspicious sessions</p>
                <p>✅ Set session inactivity timeouts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionsPage
