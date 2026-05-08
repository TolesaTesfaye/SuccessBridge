import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { paymentService } from '@services/paymentService'
import { useAuthStore } from '@store/authStore'
import { Spinner } from '@components/common/Spinner'
import { formatDistanceToNow } from '@utils/dateUtils'
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  CreditCard, 
  Calendar,
  DollarSign,
  FileText,
  ExternalLink,
  AlertCircle
} from 'lucide-react'

interface Payment {
  id: string
  amount: number
  currency: string
  paymentMethod: string
  status: 'pending' | 'approved' | 'rejected'
  screenshotUrl: string
  transactionReference?: string
  rejectionReason?: string
  notes?: string
  educationLevel: string
  grade?: string
  stream?: string
  createdAt: string
  approvedAt?: string
}

export const PaymentTracking: React.FC = () => {
  const { user } = useAuthStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [highlightedPaymentId, setHighlightedPaymentId] = useState<string | null>(null)
  const paymentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    fetchPayments()
  }, [])

  // Handle highlighting from URL parameter
  useEffect(() => {
    const highlightParam = searchParams.get('highlight')
    if (highlightParam) {
      setHighlightedPaymentId(highlightParam)
      
      // Scroll to the highlighted payment after a short delay
      setTimeout(() => {
        const element = paymentRefs.current[highlightParam]
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 300)

      // Remove highlight after 5 seconds
      setTimeout(() => {
        setHighlightedPaymentId(null)
        setSearchParams({}) // Clear URL parameter
      }, 5000)
    }
  }, [searchParams, setSearchParams])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const response = await paymentService.getUserPayments()
      setPayments(response.data || [])
      setError(null)
    } catch (err: any) {
      console.error('Failed to fetch payments:', err)
      setError(err.response?.data?.message || 'Failed to load payment history')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    )
  }

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      bank_transfer: 'Bank Transfer',
      telebirr: 'TeleBirr',
      cbe_birr: 'CBE Birr',
      mpesa: 'M-Pesa',
      other: 'Other',
    }
    return labels[method] || method
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Failed to Load Payments
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-4">{error}</p>
        <button
          onClick={fetchPayments}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
        <CreditCard className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          No Payment History
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          You haven't made any payments yet. Make a payment to access premium content.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Payment History
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your payment status and history
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Payments</span>
            <CreditCard className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{payments.length}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Approved</span>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {payments.filter(p => p.status === 'approved').length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {payments.filter(p => p.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Payment List */}
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            ref={(el) => (paymentRefs.current[payment.id] = el)}
            className={`bg-white dark:bg-gray-800 rounded-lg border p-4 md:p-6 transition-all duration-300 ${
              highlightedPaymentId === payment.id
                ? 'border-blue-500 shadow-xl ring-4 ring-blue-500/20 dark:ring-blue-400/20'
                : 'border-gray-200 dark:border-gray-700 hover:shadow-lg'
            }`}
          >
            {/* Highlighted Badge */}
            {highlightedPaymentId === payment.id && (
              <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg">
                <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  📍 This is your recent payment notification
                </span>
              </div>
            )}

            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(payment.status)}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {payment.currency} {payment.amount.toLocaleString()}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDistanceToNow(new Date(payment.createdAt))}
                  </p>
                </div>
              </div>
              {getStatusBadge(payment.status)}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Payment Method
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {getPaymentMethodLabel(payment.paymentMethod)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Submitted On
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(payment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {payment.transactionReference && (
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Transaction Reference
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                      {payment.transactionReference}
                    </p>
                  </div>
                </div>
              )}

              {payment.approvedAt && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Approved On
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(payment.approvedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Education Level Info */}
            <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {payment.educationLevel === 'high_school' ? 'High School' : 'University'}
                {payment.grade && ` • ${payment.grade.replace('_', ' ').toUpperCase()}`}
                {payment.stream && ` • ${payment.stream.charAt(0).toUpperCase()}${payment.stream.slice(1)}`}
              </span>
            </div>

            {/* Rejection Reason */}
            {payment.status === 'rejected' && payment.rejectionReason && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-xs text-red-600 dark:text-red-400 uppercase tracking-wide font-semibold mb-1">
                  Rejection Reason
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">{payment.rejectionReason}</p>
              </div>
            )}

            {/* Notes */}
            {payment.notes && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide font-semibold mb-1">
                  Notes
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">{payment.notes}</p>
              </div>
            )}

            {/* Screenshot Link */}
            {payment.screenshotUrl && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Payment Screenshot</span>
                <a
                  href={payment.screenshotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  View Screenshot
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Status Message */}
            {payment.status === 'pending' && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  ⏳ Your payment is under review. You'll be notified once it's processed.
                </p>
              </div>
            )}

            {payment.status === 'approved' && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  ✅ Payment approved! You now have access to all subjects.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
              Payment Information
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              One payment gives you access to all subjects. If your payment is rejected, you can submit a new payment request.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
