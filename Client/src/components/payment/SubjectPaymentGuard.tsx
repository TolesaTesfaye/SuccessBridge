import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { paymentService } from '@services/paymentService'
import { PaymentModal } from './PaymentModal'
import { Lock, CheckCircle, Clock, Loader } from 'lucide-react'
import { useAuthStore } from '@store/authStore'

interface SubjectPaymentGuardProps {
  subjectId: string
  subjectName: string
  educationLevel: 'high_school' | 'university'
  grade?: string
  stream?: string
  universityId?: string
  departmentId?: string
  freeSubjects?: string[]
  onAccessGranted: () => void // Callback when user has access
  showButton?: boolean // Whether to show the unlock button
}

/**
 * Component that checks if user has paid for a subject
 * Shows payment status and unlock button if needed
 */
export const SubjectPaymentGuard: React.FC<SubjectPaymentGuardProps> = ({
  subjectId,
  subjectName,
  educationLevel,
  grade,
  stream,
  universityId,
  departmentId,
  freeSubjects = [],
  onAccessGranted,
  showButton = true,
}) => {
  const { user } = useAuthStore()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [pendingPayment, setPendingPayment] = useState(false)

  // Check if this subject is free
  const isFreeSubject = freeSubjects.some(
    (free) => free.toLowerCase() === subjectName.toLowerCase()
  )

  useEffect(() => {
    checkAccess()
  }, [subjectId])

  const checkAccess = async () => {
    // If it's a free subject, grant access immediately
    if (isFreeSubject) {
      setHasAccess(true)
      setLoading(false)
      onAccessGranted()
      return
    }

    // Admin and super_admin have access to everything
    if (user?.role === 'admin' || user?.role === 'super_admin') {
      setHasAccess(true)
      setLoading(false)
      onAccessGranted()
      return
    }

    try {
      const access = await paymentService.checkSubjectAccess(subjectId)
      setHasAccess(access)
      
      if (access) {
        onAccessGranted()
      } else {
        // Check if there's a pending payment
        const payments = await paymentService.getPayments({ 
          subjectId,
          status: 'pending' 
        })
        setPendingPayment(payments.data && payments.data.length > 0)
      }
    } catch (error) {
      console.error('Failed to check subject access:', error)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
        <Loader className="animate-spin" size={16} />
        <span className="text-sm">Checking access...</span>
      </div>
    )
  }

  if (hasAccess) {
    return (
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
        <CheckCircle size={16} />
        <span className="text-sm font-medium">Access Granted</span>
      </div>
    )
  }

  if (pendingPayment) {
    return (
      <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
        <Clock size={16} />
        <span className="text-sm font-medium">Payment Pending</span>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Lock className="text-yellow-600 dark:text-yellow-400" size={16} />
        {showButton && (
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Unlock Subject
          </button>
        )}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        subjectId={subjectId}
        subjectName={subjectName}
        educationLevel={educationLevel}
        grade={grade}
        stream={stream}
        universityId={universityId}
        departmentId={departmentId}
        onSuccess={checkAccess}
      />
    </>
  )
}
