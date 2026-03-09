import { useState, useCallback } from 'react'
import { useToast } from '@components/common/Toast'

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
  successMessage?: string
  errorMessage?: string
  showSuccessToast?: boolean
  showErrorToast?: boolean
}

export const useApi = <T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
) => {
  const {
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    showSuccessToast = true,
    showErrorToast = true,
  } = options

  const toast = useToast()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true)
        setError(null)

        const result = await apiFunction(...args)
        setData(result)

        if (showSuccessToast && successMessage) {
          toast.success(successMessage)
        }

        if (onSuccess) {
          onSuccess(result)
        }

        return result
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          errorMessage ||
          'An error occurred'

        setError(errorMsg)

        if (showErrorToast) {
          toast.error(errorMsg)
        }

        if (onError) {
          onError(err)
        }

        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiFunction, onSuccess, onError, successMessage, errorMessage, showSuccessToast, showErrorToast, toast]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}
