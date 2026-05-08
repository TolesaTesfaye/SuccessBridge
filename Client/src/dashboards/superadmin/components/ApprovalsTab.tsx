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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white m-0">Pending</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm m-0">Awaiting review</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">{pendingRequests.length}</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-500/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white m-0">Approved</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm m-0">Successfully approved</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-green-600 dark:text-green-400">{approvedRequests.length}</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white m-0">Rejected</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm m-0">Declined requests</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-red-600 dark:text-red-400">{rejectedRequests.length}</span>
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