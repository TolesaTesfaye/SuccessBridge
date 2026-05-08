import React, { useState, useEffect } from 'react'
import { paymentService, Payment } from '@services/paymentService'
import { useToast } from '@components/common/Toast'
import { Pagination } from '@components/common/Pagination'
import { Button } from '@components/common/Button'
import { FormSelect } from '@components/forms/FormSelect'
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Loader,
  DollarSign,
  TrendingUp,
} from 'lucide-react'
import { Modal } from '@components/common/Modal'
import { FormTextarea } from '@components/forms/FormTextarea'

export const AdminDashboardPayments: React.FC = () => {
  const { showToast } = useToast()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [stats, setStats] = useState({
    totalPayments: 0,
    pendingPayments: 0,
    approvedPayments: 0,
    rejectedPayments: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    fetchPayments()
  }, [page, statusFilter])

  useEffect(() => {
    // Fetch stats only once on mount
    fetchStats()
  }, [])

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const filters: any = { page, limit: 10 }
      if (statusFilter !== 'all') {
        filters.status = statusFilter
      }

      const response = await paymentService.getPayments(filters)
      setPayments(response.data)
      setTotalPages(response.totalPages)
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch payments'
      console.error('Failed to fetch payments:', errorMessage)
      showToast(errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const statsData = await paymentService.getPaymentStats()
      setStats(statsData)
    } catch (error: any) {
      console.error('Failed to fetch payment stats:', error)
      // Don't show toast for stats error, just log it
    }
  }

  const handleApprove = async (paymentId: string) => {
    if (!confirm('Are you sure you want to approve this payment?')) return

    setActionLoading(true)
    try {
      await paymentService.approvePayment(paymentId)
      showToast('Payment approved successfully', 'success')
      await fetchPayments()
      await fetchStats()
      setShowDetailsModal(false)
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to approve payment'
      showToast(errorMessage, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async () => {
    if (!selectedPayment || !rejectionReason.trim()) {
      showToast('Please provide a rejection reason', 'error')
      return
    }

    setActionLoading(true)
    try {
      await paymentService.rejectPayment(selectedPayment.id, rejectionReason)
      showToast('Payment rejected', 'success')
      await fetchPayments()
      await fetchStats()
      setShowRejectModal(false)
      setShowDetailsModal(false)
      setRejectionReason('')
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to reject payment'
      showToast(errorMessage, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  const openRejectModal = (payment: Payment) => {
    setSelectedPayment(payment)
    setShowRejectModal(true)
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>
      ),
      approved: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </span>
      ),
      rejected: (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </span>
      ),
    }
    return badges[status as keyof typeof badges] || null
  }

  const formatCurrency = (amount: number, currency: string = 'ETB') => {
    return `${amount.toLocaleString()} ${currency}`
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPayments}</p>
            </div>
            <CreditCard className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</p>
            </div>
            <Clock className="text-yellow-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.approvedPayments}</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejectedPayments}</p>
            </div>
            <XCircle className="text-red-500" size={32} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-primary-600">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <TrendingUp className="text-primary-500" size={32} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <FormSelect
              label="Status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setPage(1)
              }}
              options={[
                { value: 'all', label: 'All Payments' },
                { value: 'pending', label: 'Pending' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="animate-spin text-primary-600" size={32} />
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No payments found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {payment.user?.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {payment.user?.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {payment.subject?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(payment.amount, payment.currency)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white capitalize">
                          {payment.paymentMethod.replace('_', ' ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(payment.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(payment.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedPayment(payment)
                            setShowDetailsModal(true)
                          }}
                        >
                          <Eye size={16} className="mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )}
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title="Payment Details"
        >
          <div className="space-y-4">
            {/* Payment Account Information Banner */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-gray-900 dark:text-white">Payment Account Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* CBE Account */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-bold text-sm text-gray-900 dark:text-white">CBE Bank</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account Number</p>
                  <p className="font-mono font-bold text-sm text-gray-900 dark:text-white">1000531877156</p>
                </div>

                {/* TeleBirr Account */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="font-bold text-sm text-gray-900 dark:text-white">TeleBirr</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone Number</p>
                  <p className="font-mono font-bold text-sm text-gray-900 dark:text-white">0975863448</p>
                </div>

                {/* M-Pesa Account */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="font-bold text-sm text-gray-900 dark:text-white">M-Pesa</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone Number</p>
                  <p className="font-mono font-bold text-sm text-gray-900 dark:text-white">0716000504</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Student</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedPayment.user?.name}</p>
                <p className="text-sm text-gray-500">{selectedPayment.user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Subject</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedPayment.subject?.name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Payment Method</p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">
                  {selectedPayment.paymentMethod.replace('_', ' ')}
                </p>
              </div>
            </div>

            {selectedPayment.transactionReference && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Transaction Reference</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedPayment.transactionReference}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Payment Screenshot</p>
              <a
                href={selectedPayment.screenshotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={selectedPayment.screenshotUrl}
                  alt="Payment screenshot"
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 hover:opacity-90 transition-opacity cursor-pointer"
                  onError={(e) => {
                    // If image fails to load, show error message
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const errorDiv = document.createElement('div')
                    errorDiv.className = 'bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center'
                    errorDiv.innerHTML = `
                      <p class="text-red-600 dark:text-red-400 mb-2">Failed to load image</p>
                      <a href="${selectedPayment.screenshotUrl}" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">
                        Open image in new tab
                      </a>
                    `
                    target.parentElement?.appendChild(errorDiv)
                  }}
                />
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Click image to open in new tab
              </p>
            </div>

            {selectedPayment.notes && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Notes</p>
                <p className="text-gray-900 dark:text-white">{selectedPayment.notes}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
              <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
            </div>

            {selectedPayment.status === 'rejected' && selectedPayment.rejectionReason && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-1">
                  Rejection Reason:
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {selectedPayment.rejectionReason}
                </p>
              </div>
            )}

            {selectedPayment.status === 'pending' && (
              <div className="flex gap-3 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => openRejectModal(selectedPayment)}
                  disabled={actionLoading}
                  className="flex-1"
                >
                  <XCircle size={16} className="mr-1" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedPayment.id)}
                  disabled={actionLoading}
                  className="flex-1"
                >
                  {actionLoading ? (
                    <Loader className="animate-spin mr-1" size={16} />
                  ) : (
                    <CheckCircle size={16} className="mr-1" />
                  )}
                  Approve
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false)
          setRejectionReason('')
        }}
        title="Reject Payment"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Please provide a reason for rejecting this payment request.
          </p>

          <FormTextarea
            label="Rejection Reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter the reason for rejection..."
            rows={4}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setShowRejectModal(false)
                setRejectionReason('')
              }}
              disabled={actionLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={actionLoading || !rejectionReason.trim()}
              className="flex-1"
            >
              {actionLoading ? (
                <>
                  <Loader className="animate-spin mr-1" size={16} />
                  Rejecting...
                </>
              ) : (
                'Confirm Rejection'
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
