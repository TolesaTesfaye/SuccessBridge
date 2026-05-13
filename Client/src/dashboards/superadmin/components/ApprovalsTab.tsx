import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { 
  Users, 
  UserCheck, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Mail,
  Building,
  Calendar
} from 'lucide-react'
import api from '@services/api'

interface AdminRequest {
  id: string
  name: string
  email: string
  university: string
  department: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  reviewedAt?: string
  rejectionReason?: string
}

export const ApprovalsTab: React.FC = () => {
  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAdminRequests()
  }, [])

  const fetchAdminRequests = async () => {
    try {
      setLoading(true)
      const response = await api.get('/auth/admin-requests')
      setAdminRequests(response.data.requests || [])
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch admin requests')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveRequest = async (requestId: string) => {
    try {
      await api.post(`/auth/admin-requests/${requestId}/approve`)
      await fetchAdminRequests()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to approve request')
    }
  }

  const handleRejectRequest = async (requestId: string, reason: string) => {
    try {
      await api.post(`/auth/admin-requests/${requestId}/reject`, { reason })
      await fetchAdminRequests()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reject request')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300'
      case 'rejected':
        return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300'
      default:
        return 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300'
    }
  }

  const pendingRequests = adminRequests.filter(req => req.status === 'pending')
  const approvedRequests = adminRequests.filter(req => req.status === 'approved')
  const rejectedRequests = adminRequests.filter(req => req.status === 'rejected')

  return (
    <div className="space-y-6">
      {/* Admin Request Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {/* Total Requests Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <Users className="w-4 h-4" />
                  </div>
                  <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wide">
                    Total Requests
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                  {adminRequests.length}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  All admin requests
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Pending Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                  <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wide">
                    Pending
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-orange-600 to-orange-800 dark:from-orange-400 dark:to-orange-600 bg-clip-text text-transparent">
                  {pendingRequests.length}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Awaiting review
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Approved Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-green-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p className="text-xs md:text-sm text-green-600 dark:text-green-400 font-bold uppercase tracking-wide">
                    Approved
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
                  {approvedRequests.length}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Successfully approved
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Rejected Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-red-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <p className="text-xs md:text-sm text-red-600 dark:text-red-400 font-bold uppercase tracking-wide">
                    Rejected
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
                  {rejectedRequests.length}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Declined requests
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Admin Requests List */}
      <Card>
        <CardBody>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Admin Registration Requests</h3>
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Loading requests...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {!loading && !error && adminRequests.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">No admin requests found</p>
            </div>
          )}

          {!loading && !error && adminRequests.length > 0 && (
            <div className="space-y-4">
              {adminRequests.map(request => (
                <div key={request.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-semibold text-slate-900 dark:text-white">{request.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{request.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{request.university}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{request.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {request.rejectionReason && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3 mb-3">
                          <p className="text-sm text-red-700 dark:text-red-300">
                            <strong>Rejection Reason:</strong> {request.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => handleApproveRequest(request.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => {
                            const reason = prompt('Enter rejection reason:')
                            if (reason) handleRejectRequest(request.id, reason)
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}