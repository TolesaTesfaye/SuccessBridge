import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Users, CreditCard, Check, X, Mail, School, BookOpen, Clock, AlertCircle } from 'lucide-react'
import { authService } from '@services/authService'

interface AdminRequest {
  id: string
  name: string
  email: string
  university: string
  department: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export const SuperAdminApprovals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'admin' | 'payment'>('admin')
  const [requests, setRequests] = useState<AdminRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    if (activeTab === 'admin') {
      fetchRequests()
    }
  }, [activeTab])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const response = await authService.getAdminRequests() as any
      if (response.success) {
        // Handle both possible structures depending on interceptors
        const requestsList = response.requests || response.data?.requests || []
        setRequests(requestsList)
      }
    } catch (err: any) {
      setError(err.userFriendlyError || 'Failed to fetch requests')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      setProcessingId(id)
      const response = await authService.approveAdminRequest(id)
      if (response.success) {
        setRequests(prev => prev.filter(r => r.id !== id))
      }
    } catch (err: any) {
      alert(err.userFriendlyError || 'Failed to approve request')
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (id: string) => {
    const reason = window.prompt('Please enter a reason for rejection:')
    if (reason === null) return

    try {
      setProcessingId(id)
      const response = await authService.rejectAdminRequest(id, reason)
      if (response.success) {
        setRequests(prev => prev.filter(r => r.id !== id))
      }
    } catch (err: any) {
      alert(err.userFriendlyError || 'Failed to reject request')
    } finally {
      setProcessingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (e) {
      return dateString
    }
  }

  return (
    <DashboardLayout title="Approvals" subtitle="Manage admin and payment approvals">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'admin'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              Admin Approvals
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'payment'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Payment Approvals
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'admin' ? (
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400 flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
                <div className="bg-slate-100 dark:bg-slate-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No Pending Requests</h3>
                <p className="text-slate-500 dark:text-slate-400">There are no new admin registration requests to review.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {requests.map((request) => (
                  <div 
                    key={request.id}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 dark:bg-blue-900/40 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                          {request.name.charAt(0)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-slate-900 dark:text-white text-lg">
                          {request.name}
                        </h4>
                        <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            {request.email}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <School className="w-3.5 h-3.5" />
                            {request.university}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            {request.department}
                          </span>
                        </div>
                        <div className="pt-1 flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          Requested on {formatDate(request.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:shrink-0">
                      <button
                        onClick={() => handleReject(request.id)}
                        disabled={processingId === request.id}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-white dark:text-red-400 border border-red-200 dark:border-red-900/50 hover:bg-red-600 dark:hover:bg-red-900 transition-colors rounded-lg disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(request.id)}
                        disabled={processingId === request.id}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors rounded-lg shadow-sm shadow-green-200 dark:shadow-none disabled:opacity-50"
                      >
                        {processingId === request.id ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Payment Approvals
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              This payment approval system is currently under development.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}