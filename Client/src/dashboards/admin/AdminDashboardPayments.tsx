import React, { useState, useEffect } from 'react'
import { paymentService, Payment } from '@services/paymentService'
import { useToast } from '@components/common/Toast'
import { Pagination } from '@components/common/Pagination'
import { Button } from '@components/common/Button'
import { FormSelect } from '@components/forms/FormSelect'
import { Card, CardBody } from '@components/common/Card'
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {/* Total Payments Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wide">
                    Total Payments
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                  {stats.totalPayments}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  All transactions
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Pending Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                  <p className="text-xs md:text-sm text-yellow-600 dark:text-yellow-400 font-bold uppercase tracking-wide">
                    Pending
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-yellow-600 to-yellow-800 dark:from-yellow-400 dark:to-yellow-600 bg-clip-text text-transparent">
                  {stats.pendingPayments}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Awaiting approval
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
                  {stats.approvedPayments}
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
                    <XCircle className="w-4 h-4" />
                  </div>
                  <p className="text-xs md:text-sm text-red-600 dark:text-red-400 font-bold uppercase tracking-wide">
                    Rejected
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
                  {stats.rejectedPayments}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Declined payments
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <XCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Total Revenue Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <p className="text-xs md:text-sm text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wide">
                    Total Revenue
                  </p>
                </div>
                <p className="text-2xl md:text-3xl font-extrabold bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                  {formatCurrency(stats.totalRevenue)}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Approved earnings
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardBody>
        </Card>
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
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800/50 dark:to-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative space-y-3">
                    {/* Header with Student Info and Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {payment.user?.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {payment.user?.email}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>

                    {/* Payment Details Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-3 border border-slate-100 dark:border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                          Subject
                        </div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                          {payment.subject?.name}
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-3 border border-slate-100 dark:border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                          Amount
                        </div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {formatCurrency(payment.amount, payment.currency)}
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-3 border border-slate-100 dark:border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                          Method
                        </div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs capitalize truncate">
                          {payment.paymentMethod.replace('_', ' ')}
                        </div>
                      </div>
                      <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-3 border border-slate-100 dark:border-white/5">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                          Date
                        </div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">
                          {new Date(payment.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setSelectedPayment(payment)
                          setShowDetailsModal(true)
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
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
