import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { useToast } from '@components/common/Toast'
import {
  Shield,
  AlertTriangle,
  Users,
  Lock,
  Activity,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react'
import AdminSecuritySidebar from './AdminSecuritySidebar'
import SecurityMetricCard from './SecurityMetricCard'
import SecurityStatusCard from './SecurityStatusCard'
import { adminSecurityService } from '@services/adminSecurityService'

export const SecurityDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const toast = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<any>(null)
  const [timeline, setTimeline] = useState<any[]>([])
  const [patterns, setPatterns] = useState<any[]>([])

  // Redirect if not superadmin
  useEffect(() => {
    if (user && user.role !== 'super_admin') {
      navigate('/unauthorized')
    }
  }, [user, navigate])

  // Fetch security data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [metricsData, timelineData, patternsData] = await Promise.all([
          adminSecurityService.getOverview(),
          adminSecurityService.getEventsTimeline(24),
          adminSecurityService.getSuspiciousPatterns(),
        ])

        setMetrics(metricsData)
        setTimeline(timelineData)
        setPatterns(patternsData)
      } catch (error) {
        console.error('Failed to fetch security data:', error)
        toast.error('Failed to load security dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const securityFeatures = [
    { name: 'XSS Protection', status: 'active' as const, description: 'Input sanitization enabled' },
    { name: 'CSRF Protection', status: 'active' as const, description: 'Token validation active' },
    { name: 'HTTPS Enforcement', status: 'active' as const, description: 'All connections secured' },
    { name: 'Rate Limiting', status: 'active' as const, description: '15min window, 500 req limit' },
    { name: 'Input Validation', status: 'active' as const, description: 'All inputs validated' },
    { name: 'File Upload Restrictions', status: 'active' as const, description: 'Type and size limits' },
    { name: 'Audit Logging', status: 'active' as const, description: 'All events logged' },
    { name: 'Security Headers', status: 'active' as const, description: 'CSP, X-Frame, HSTS' },
  ]

  const suspiciousPatterns = patterns.map(p => ({
    type: p.type,
    severity: p.severity,
    description: p.description,
    count: p.affectedCount,
  }))

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSecuritySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
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
            <Shield size={28} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Security Dashboard</h1>
          </div>
          <div className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Top KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <SecurityMetricCard
                title="Security Events (24h)"
                value={metrics?.totalEvents24h || 0}
                icon="📊"
                loading={loading}
              />
              <SecurityMetricCard
                title="Failed Logins (24h)"
                value={metrics?.failedLogins24h || 0}
                icon="🚫"
                loading={loading}
              />
              <SecurityMetricCard
                title="Successful Logins (24h)"
                value={metrics?.successfulLogins24h || 0}
                icon="✅"
                loading={loading}
              />
              <SecurityMetricCard
                title="Rate Limit Violations"
                value={metrics?.rateLimitViolations24h || 0}
                icon="⏱️"
                loading={loading}
              />
              <SecurityMetricCard
                title="All-Time Events"
                value={metrics?.totalEventsAllTime || 0}
                icon="📈"
                loading={loading}
              />
            </div>

            {/* Security Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Features Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SecurityStatusCard
                  title="Core Protections"
                  items={securityFeatures.slice(0, 4)}
                  icon={Shield}
                  loading={loading}
                />
                <SecurityStatusCard
                  title="Additional Protections"
                  items={securityFeatures.slice(4)}
                  icon={Lock}
                  loading={loading}
                />
              </div>
            </div>

            {/* Suspicious Patterns */}
            {suspiciousPatterns.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={20} className="text-red-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Suspicious Patterns Detected ({suspiciousPatterns.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {suspiciousPatterns.map((pattern, idx) => {
                    const severityColors = {
                      critical: 'bg-red-50 border-red-300',
                      high: 'bg-orange-50 border-orange-300',
                      medium: 'bg-yellow-50 border-yellow-300',
                      low: 'bg-blue-50 border-blue-300',
                    }
                    return (
                      <div
                        key={idx}
                        className={`p-4 border rounded-lg ${severityColors[pattern.severity]}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {pattern.type.replace(/_/g, ' ').toUpperCase()}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">{pattern.description}</p>
                          </div>
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-red-600">
                            {pattern.count} {pattern.count === 1 ? 'incident' : 'incidents'}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate('/admin/security/audit-logs')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <p className="font-semibold text-gray-900">📋 View Audit Logs</p>
                  <p className="text-sm text-gray-600 mt-1">All system events</p>
                </button>
                <button
                  onClick={() => navigate('/admin/security/failed-logins')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <p className="font-semibold text-gray-900">🚫 Failed Logins</p>
                  <p className="text-sm text-gray-600 mt-1">Monitor threats</p>
                </button>
                <button
                  onClick={() => navigate('/admin/security/sessions')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <p className="font-semibold text-gray-900">👥 Active Sessions</p>
                  <p className="text-sm text-gray-600 mt-1">User connections</p>
                </button>
                <button
                  onClick={() => navigate('/admin/security/rate-limits')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <p className="font-semibold text-gray-900">⏱️ Rate Limiting</p>
                  <p className="text-sm text-gray-600 mt-1">Request limits</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityDashboard
