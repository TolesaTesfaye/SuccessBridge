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
  Calendar,
  CreditCard,
  DollarSign,
  FileText
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

interface PaymentRequest {
  id: string
  userId: string
  userName: string
  amount: number
  description: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  reviewedAt?: string
  rejectionReason?: string
}

const AdminApprovalsContent: React.FC = () => {
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

const PaymentApprovalsContent: React.FC = () => {
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPaymentRequests()
  }, [])

  const fetchPaymentRequests = async () => {
    try {
      setLoading(true)
      // Mock data for payment requests - replace with actual API call
      const mockPaymentRequests: PaymentRequest[] = [
        {
          id: '1',
          userId: 'user1',
          userName: 'John Doe',
          amount: 500,
          description: 'Course enrollment fee',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Jane Smith',
          amount: 750,
          description: 'Premium subscription',
          status: 'approved',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          userId: 'user3',
          userName: 'Mike Johnson',
          amount: 300,
          description: 'Additional resources access',
          status: 'pending',
          createdAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: '4',
          userId: 'user4',
          userName: 'Sarah Wilson',
          amount: 200,
          description: 'Exam fee',
          status: 'rejected',
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          rejectionReason: 'Insufficient documentation provided'
        }
      ]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPaymentRequests(mockPaymentRequests)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch payment requests')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveRequest = async (requestId: string) => {
    // Mock function - replace with actual API call
    setPaymentRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved' as const, reviewedAt: new Date().toISOString() }
          : req
      )
    )
  }

  const handleRejectRequest = async (requestId: string, reason: string) => {
    // Mock function - replace with actual API call
    setPaymentRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' as const, reviewedAt: new Date().toISOString(), rejectionReason: reason }
          : req
      )
    )
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

  const pendingPayments = paymentRequests.filter(req => req.status === 'pending')
  const approvedPayments = paymentRequests.filter(req => req.status === 'approved')
  const rejectedPayments = paymentRequests.filter(req => req.status === 'rejected')

  return (
    <div className="space-y-6">
      {/* Payment Request Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white m-0">Pending</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm m-0">Awaiting approval</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">{pendingPayments.length}</span>
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
                <p className="text-slate-600 dark:text-slate-400 text-sm m-0">Payment approved</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-green-600 dark:text-green-400">{approvedPayments.length}</span>
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
                <p className="text-slate-600 dark:text-slate-400 text-sm m-0">Payment declined</p>
              </div>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-red-600 dark:text-red-400">{rejectedPayments.length}</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Payment Requests List */}
      <Card>
        <CardBody>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Payment Approval Requests</h3>
          
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-slate-600 dark:text-slate-400 mt-2">Loading payment requests...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {!loading && !error && paymentRequests.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">No payment requests found</p>
            </div>
          )}

          {!loading && !error && paymentRequests.length > 0 && (
            <div className="space-y-4">
              {paymentRequests.map(request => (
                <div key={request.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-semibold text-slate-900 dark:text-white">{request.userName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400 font-semibold">
                            ${request.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{request.description}</span>
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

export const ApprovalsTab: React.FC = () => {
  const [approvalTab, setApprovalTab] = useState<'admins' | 'payments'>('admins')
  
  return (
    <div className="space-y-6">
      {/* Approval Sub-tabs */}
      <div className="bg-white dark:bg-slate-800/40 p-1.5 rounded-[20px] shadow-sm border border-slate-200 dark:border-white/5 flex items-center gap-2">
        <button
          onClick={() => setApprovalTab('admins')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[16px] font-semibold text-sm transition-all duration-300 ${
            approvalTab === 'admins'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
          }`}
        >
          👨‍💼 Admin Approvals
        </button>
        <button
          onClick={() => setApprovalTab('payments')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[16px] font-semibold text-sm transition-all duration-300 ${
            approvalTab === 'payments'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
          }`}
        >
          💳 Payment Approvals
        </button>
      </div>

      {/* Approval Content */}
      {approvalTab === 'admins' && <AdminApprovalsContent />}
      {approvalTab === 'payments' && <PaymentApprovalsContent />}
    </div>
  )
}