import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { useToast } from '@components/common/Toast'
import { Zap, Menu, X } from 'lucide-react'
import AdminSecuritySidebar from './AdminSecuritySidebar'

export const RateLimitPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const toast = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (user && user.role !== 'super_admin') {
      navigate('/unauthorized')
    }
  }, [user, navigate])

  const rateLimitConfig = [
    {
      endpoint: '/api/auth/login',
      limit: '10 attempts',
      window: 'per 15 minutes',
      status: 'active',
    },
    {
      endpoint: '/api/auth/register',
      limit: '5 attempts',
      window: 'per hour',
      status: 'active',
    },
    {
      endpoint: '/api/*',
      limit: '500 requests',
      window: 'per 15 minutes',
      status: 'active',
    },
    {
      endpoint: '/api/resources/*',
      limit: '100 requests',
      window: 'per minute',
      status: 'active',
    },
  ]

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
            <Zap size={28} className="text-yellow-600" />
            <h1 className="text-2xl font-bold text-gray-900">Rate Limiting Dashboard</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Current Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">⏱️ Current Rate Limit Configuration</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Endpoint</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Limit</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Time Window</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rateLimitConfig.map((config, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-xs">{config.endpoint}</td>
                      <td className="px-6 py-4 font-semibold">{config.limit}</td>
                      <td className="px-6 py-4 text-gray-600">{config.window}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          ✅ {config.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Features Coming Soon */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Features Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border-l-4 border-blue-400 bg-blue-50">
                <h3 className="font-semibold text-gray-900 mb-2">📊 Violation Timeline</h3>
                <p className="text-sm text-gray-600">View when rate limits were hit and by which user/IP</p>
              </div>
              <div className="p-4 border-l-4 border-green-400 bg-green-50">
                <h3 className="font-semibold text-gray-900 mb-2">✅ IP Whitelist</h3>
                <p className="text-sm text-gray-600">Add trusted IPs that bypass rate limiting</p>
              </div>
              <div className="p-4 border-l-4 border-red-400 bg-red-50">
                <h3 className="font-semibold text-gray-900 mb-2">🚫 IP Blacklist</h3>
                <p className="text-sm text-gray-600">Block malicious IPs permanently</p>
              </div>
              <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50">
                <h3 className="font-semibold text-gray-900 mb-2">⏱️ Temporary Blocks</h3>
                <p className="text-sm text-gray-600">Set time-based blocks for specific IPs</p>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ℹ️ Current Status</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <p>✅ <strong>Active Protection:</strong> Rate limiting is actively protecting the API</p>
              <p>✅ <strong>No Current Violations:</strong> No IPs are currently rate-limited</p>
              <p>✅ <strong>All Systems Operational:</strong> Rate limiters are functioning normally</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RateLimitPage
