import { useState, useEffect } from 'react'
import { paymentService } from '@services/paymentService'
import { useAuthStore } from '@store/authStore'

interface UseSubjectAccessOptions {
  subjectId: string
  subjectName: string
  freeSubjects?: string[]
}

export const useSubjectAccess = ({ 
  subjectId, 
  subjectName, 
  freeSubjects = [] 
}: UseSubjectAccessOptions) => {
  const { user } = useAuthStore()
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasPendingPayment, setHasPendingPayment] = useState(false)

  // Check if this subject is free
  const isFreeSubject = freeSubjects.some(
    (free) => free.toLowerCase() === subjectName.toLowerCase()
  )

  useEffect(() => {
    checkAccess()
  }, [subjectId, subjectName])

  const checkAccess = async () => {
    setLoading(true)

    // If it's a free subject, grant access immediately
    if (isFreeSubject) {
      setHasAccess(true)
      setLoading(false)
      return
    }

    // Admin and super_admin have access to everything
    if (user?.role === 'admin' || user?.role === 'super_admin') {
      setHasAccess(true)
      setLoading(false)
      return
    }

    try {
      const access = await paymentService.checkSubjectAccess(subjectId)
      setHasAccess(access)
      
      if (!access) {
        // Check if there's a pending payment
        const payments = await paymentService.getPayments({ 
          subjectId,
          status: 'pending' 
        })
        setHasPendingPayment(payments.data && payments.data.length > 0)
      }
    } catch (error) {
      console.error('Failed to check subject access:', error)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  return {
    hasAccess,
    loading,
    hasPendingPayment,
    isFreeSubject,
    refetch: checkAccess,
  }
}
