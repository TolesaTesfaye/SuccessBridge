import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { useToast } from '@components/common/Toast'
import { AlertCircle, Menu, X } from 'lucide-react'
import AdminSecuritySidebar from './AdminSecuritySidebar'
import SecurityMetricCard from './SecurityMetricCard'
import SecurityDataTable from './SecurityDataTable'
import { adminSecurityService } from '@services/adminSecurityService'

export const FailedLoginsPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const toast = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [failedLoginsByIP, setFailedLoginsByIP] = useState<any[]>([])
  const [failedLoginsByUser, setFailedLoginsByUser] = useState<any[]>([])
  const [failedLogins, setFailedLogins] = useState<any>({})

  useEffect(() => {
    if (user && user.role !== 'super_admin') {
      navigate('/unauthorized')
    }
  }, [user, navigate])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [byIP, byUser, failed] = await Promise.all([
        adminSecurityService.getFailedLoginsByIP(15),
        adminSecurityService.getFailedLoginsByUser(15),
        adminSecurityService.getFailedLogins(1, 50),
      ])

      setFailedLoginsByIP(byIP)
      setFailedLoginsByUser(byUser)
      setFailedLogins(failed)
    } catch (error) {
      console.error('Failed to fetch login data:', error)
      toast.error('Failed to load failed login data')
    } finally {
      setLoading(false)
    }
  }

  const getSeverity = (count: number) => {
    if (count > 50) return { label: 'CRITICAL', color: 'bg-red-600', bgLight: 'bg-red-50' }
    if (count > 20) return { label: 'HIGH', color: 'bg-orange-600', bgLight: 'bg-orange-50' }
    if (count > 10) return { label: 'MEDIUM', color: 'bg-yellow-600', bgLight: 'bg-yellow-50' }
    return { label: 'LOW', color: 'bg-blue-600', bgLight: 'bg-blue-50' }
  }

  const ipColumns = [
    {
      key: 'ipAddress',
      label: 'IP Address',
      render: (value: string) => <span className="font-mono text-sm">{value}</span>,
    },
    {
      key: 'failureCount',
      label: 'Failed Attempts',
      render: (value: number) => <span className="font-bold text-red-600">{value}</span>,
    },
    {
      key: 'targetUsers',
      label: 'Targeted Users',
      render: (value: string[]) => <span>{value.length} user(s)</span>,
    },
    {
      key: 'lastAttempt',
      label: 'Last Attempt',
      render: (value: any) => new Date(value).toLocaleString(),
    },
  ]

  const userColumns = [
    {
      key: 'email',
      label: 'Email',
      render: (value: string) => <span className="text-sm">{value}</span>,
    },
    {
      key: 'failureCount',
      label: 'Failed Attempts',
      render: (value: number) => <span className="font-bold text-red-600">{value}</span>,
    },
    {
      key: 'sourceIPs',
      label: 'Source IPs',
      render: (value: string[]) => <span>{value.length} IP(s)</span>,
    },
    {
      key: 'lastAttempt',
      label: 'Last Attempt',
      render: (value: any) => new Date(value).toLocaleString(),
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
            <AlertCircle size={28} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">Failed Logins Monitor</h1>
          </div>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SecurityMetricCard
              title="Total Failed Attempts (24h)"
              value={failedLogins.total || 0}
              icon="🚫"
              loading={loading}
            />
            <SecurityMetricCard
              title="Unique IPs"
              value={failedLoginsByIP.length}
              icon="🌍"
              loading={loading}
            />
            <SecurityMetricCard
              title="Targeted Users"
              value={failedLoginsByUser.length}
              icon="👤"
              loading={loading}
            />
            <SecurityMetricCard
              title="Highest Threat Level"
              value={
                failedLoginsByIP.length > 0
                  ? getSeverity(failedLoginsByIP[0].failureCount).label
                  : 'NONE'
              }
              icon="⚠️"
              loading={loading}
            />
          </div>

          {/* Threat Alert */}
          {failedLoginsByIP.length > 0 && failedLoginsByIP[0].failureCount > 50 && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4">
              <p className="text-sm font-semibold text-red-800 mb-2">🚨 CRITICAL THREAT DETECTED</p>
              <p className="text-sm text-red-700">
                IP address <span className="font-mono font-bold">{failedLoginsByIP[0].ipAddress}</span> has
                made {failedLoginsByIP[0].failureCount} failed login attempts in the last 24 hours.
                Consider blocking this IP immediately.
              </p>
            </div>
          )}

          {/* Failed Logins by IP */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🌍 Failed Logins by IP Address</h2>
            <SecurityDataTable columns={ipColumns} data={failedLoginsByIP} loading={loading} />
          </div>

          {/* Failed Logins by User */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">👤 Failed Logins by User</h2>
            <SecurityDataTable columns={userColumns} data={failedLoginsByUser} loading={loading} />
          </div>

          {/* Attack Pattern Legend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Threat Severity Levels</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'CRITICAL', threshold: '50+ attempts', color: 'bg-red-100', textColor: 'text-red-800' },
                { label: 'HIGH', threshold: '20-49 attempts', color: 'bg-orange-100', textColor: 'text-orange-800' },
                { label: 'MEDIUM', threshold: '10-19 attempts', color: 'bg-yellow-100', textColor: 'text-yellow-800' },
                { label: 'LOW', threshold: 'Under 10 attempts', color: 'bg-blue-100', textColor: 'text-blue-800' },
              ].map((level, idx) => (
                <div key={idx} className={`p-4 rounded-lg ${level.color}`}>
                  <p className={`font-bold ${level.textColor}`}>{level.label}</p>
                  <p className="text-sm text-gray-700 mt-1">{level.threshold}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FailedLoginsPage
