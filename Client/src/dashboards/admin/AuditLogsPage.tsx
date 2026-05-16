import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { useToast } from '@components/common/Toast'
import {
  FileText,
  Menu,
  X,
  Download,
  Search,
  Filter as FilterIcon,
} from 'lucide-react'
import AdminSecuritySidebar from './AdminSecuritySidebar'
import SecurityDataTable from './SecurityDataTable'
import { auditService } from '@services/auditService'

export const AuditLogsPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const toast = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [limit] = useState(50)

  useEffect(() => {
    if (user && user.role !== 'super_admin') {
      navigate('/unauthorized')
    }
  }, [user, navigate])

  useEffect(() => {
    fetchLogs()
  }, [page, actionFilter, statusFilter])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const result = await auditService.queryLogs({
        page,
        limit,
        action: actionFilter || undefined,
        status: statusFilter as 'success' | 'failure' | undefined,
      })

      setLogs(result.logs)
      setTotal(result.total)
      setPages(result.pages)
    } catch (error) {
      console.error('Failed to fetch audit logs:', error)
      toast.error('Failed to load audit logs')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    try {
      // Prepare CSV data
      const headers = ['Timestamp', 'User ID', 'Action', 'Resource', 'Status', 'IP Address', 'User Agent', 'Error Message']
      const csvContent = [
        headers.join(','),
        ...logs.map(log =>
          [
            new Date(log.timestamp).toISOString(),
            log.userId || '',
            log.action,
            log.resource,
            log.status,
            log.ipAddress || '',
            (log.userAgent || '').replace(/,/g, ';'),
            (log.errorMessage || '').replace(/,/g, ';'),
          ].map(field => `"${field}"`).join(','),
        ),
      ].join('\n')

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('Audit logs exported successfully')
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('Failed to export audit logs')
    }
  }

  const filteredLogs = logs.filter(log =>
    searchTerm === '' ||
    log.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ipAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const columns = [
    {
      key: 'timestamp',
      label: 'Timestamp',
      render: (value: any) => new Date(value).toLocaleString(),
      sortable: true,
    },
    {
      key: 'action',
      label: 'Action',
      render: (value: string) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
          {value}
        </span>
      ),
    },
    {
      key: 'resource',
      label: 'Resource',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            value === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value === 'success' ? '✅ Success' : '❌ Failure'}
        </span>
      ),
    },
    {
      key: 'ipAddress',
      label: 'IP Address',
    },
    {
      key: 'errorMessage',
      label: 'Details',
      render: (value: string) => value ? value.substring(0, 50) + '...' : '—',
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
            <FileText size={28} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Search size={16} className="inline mr-1" />
                  Search
                </label>
                <input
                  type="text"
                  placeholder="User, Action, IP, Resource..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FilterIcon size={16} className="inline mr-1" />
                  Action
                </label>
                <select
                  value={actionFilter}
                  onChange={e => {
                    setActionFilter(e.target.value)
                    setPage(1)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Actions</option>
                  <option value="login">Login</option>
                  <option value="logout">Logout</option>
                  <option value="password_change">Password Change</option>
                  <option value="password_reset">Password Reset</option>
                  <option value="user_create">User Create</option>
                  <option value="user_delete">User Delete</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={e => {
                    setStatusFilter(e.target.value)
                    setPage(1)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="success">Success</option>
                  <option value="failure">Failure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  &nbsp;
                </label>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setActionFilter('')
                    setStatusFilter('')
                    setPage(1)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <SecurityDataTable
            columns={columns}
            data={filteredLogs}
            loading={loading}
            pagination={{
              page,
              total: total,
              pages: pages,
              onPageChange: setPage,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AuditLogsPage
