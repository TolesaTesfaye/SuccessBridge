import React, { useState } from 'react'
import { Modal } from '@components/common/Modal'
import { Button } from '@components/common/Button'
import { FormInput } from '@components/forms/FormInput'
import { FormSelect } from '@components/forms/FormSelect'
import { FormTextarea } from '@components/forms/FormTextarea'
import { paymentService, CreatePaymentData } from '@services/paymentService'
import { useToast } from '@components/common/Toast'
import { Upload, CreditCard, Loader, Copy, Check, Smartphone, Building2, AlertTriangle } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  subjectId: string
  subjectName: string
  educationLevel: 'high_school' | 'university'
  grade?: string
  stream?: string
  universityId?: string
  departmentId?: string
  onSuccess?: () => void
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  subjectId,
  subjectName,
  educationLevel,
  grade,
  stream,
  universityId,
  departmentId,
  onSuccess,
}) => {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [errors, setErrors] = useState<{
    amount?: string
    screenshot?: string
    paymentMethod?: string
  }>({})
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'bank_transfer' as CreatePaymentData['paymentMethod'],
    transactionReference: '',
    notes: '',
  })

  const MINIMUM_PAYMENT = 200 // Minimum payment amount in ETB

  const paymentAccounts = [
    {
      id: 'cbe',
      name: 'CBE Bank',
      type: 'Bank Transfer',
      account: '1000531877156',
      icon: Building2,
      gradient: 'from-green-500 to-emerald-600',
      bgLight: 'bg-green-50',
      bgDark: 'bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-700',
    },
    {
      id: 'telebirr',
      name: 'TeleBirr',
      type: 'Mobile Money',
      account: '0975863448',
      icon: Smartphone,
      gradient: 'from-orange-500 to-amber-600',
      bgLight: 'bg-orange-50',
      bgDark: 'bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      borderColor: 'border-orange-200 dark:border-orange-700',
    },
    {
      id: 'mpesa',
      name: 'M-Pesa',
      type: 'Mobile Money',
      account: '0716000504',
      icon: Smartphone,
      gradient: 'from-red-500 to-rose-600',
      bgLight: 'bg-red-50',
      bgDark: 'bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
      borderColor: 'border-red-200 dark:border-red-700',
    },
  ]

  const copyToClipboard = async (account: string, accountId: string) => {
    try {
      await navigator.clipboard.writeText(account)
      setCopiedAccount(accountId)
      
      // Automatically set payment method based on selected card
      let paymentMethod: CreatePaymentData['paymentMethod'] = 'bank_transfer'
      if (accountId === 'cbe') {
        paymentMethod = 'bank_transfer'
      } else if (accountId === 'telebirr') {
        paymentMethod = 'telebirr'
      } else if (accountId === 'mpesa') {
        paymentMethod = 'mpesa'
      }
      
      setFormData({ ...formData, paymentMethod })
      showToast('Account number copied!', 'success')
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch (error) {
      showToast('Failed to copy', 'error')
    }
  }

  const validateAmount = (value: string): string | undefined => {
    if (!value || value.trim() === '') {
      return 'Amount is required'
    }
    
    const amount = parseFloat(value)
    
    if (isNaN(amount)) {
      return 'Please enter a valid number'
    }
    
    if (amount <= 0) {
      return 'Amount must be greater than 0'
    }
    
    if (amount < MINIMUM_PAYMENT) {
      return 'You entered less than the payment amount'
    }
    
    if (amount > 1000000) {
      return 'Amount exceeds maximum limit (1,000,000 ETB)'
    }
    
    return undefined
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, amount: value })
    
    // Clear error when user starts typing
    if (errors.amount) {
      setErrors({ ...errors, amount: undefined })
    }
    
    // Validate on blur or if value is not empty
    if (value) {
      const error = validateAmount(value)
      if (error) {
        setErrors({ ...errors, amount: error })
      }
    }
  }

  const handleAmountBlur = () => {
    const error = validateAmount(formData.amount)
    if (error) {
      setErrors({ ...errors, amount: error })
    }
  }

  const paymentMethods = [
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'telebirr', label: 'TeleBirr' },
    { value: 'cbe_birr', label: 'CBE Birr' },
    { value: 'mpesa', label: 'M-Pesa' },
    { value: 'other', label: 'Other' },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Clear previous error
      setErrors({ ...errors, screenshot: undefined })
      
      if (file.size > 5 * 1024 * 1024) {
        const error = 'File size must be less than 5MB'
        setErrors({ ...errors, screenshot: error })
        showToast(error, 'error')
        return
      }

      if (!file.type.startsWith('image/')) {
        const error = 'Please upload an image file (PNG, JPG, GIF)'
        setErrors({ ...errors, screenshot: error })
        showToast(error, 'error')
        return
      }

      setScreenshot(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}
    
    // Validate amount
    const amountError = validateAmount(formData.amount)
    if (amountError) {
      newErrors.amount = amountError
    }
    
    // Validate screenshot
    if (!screenshot) {
      newErrors.screenshot = 'Payment screenshot is required'
    }
    
    // Validate payment method
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method'
    }
    
    setErrors(newErrors)
    
    // Show first error as toast
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0]
      showToast(firstError, 'error')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      await paymentService.createPayment({
        subjectId,
        amount: parseFloat(formData.amount),
        paymentMethod: formData.paymentMethod,
        screenshot: screenshot!,
        transactionReference: formData.transactionReference || undefined,
        notes: formData.notes || undefined,
        educationLevel,
        grade,
        stream,
        universityId,
        departmentId,
      })

      showToast('Payment request submitted successfully! Awaiting admin approval.', 'success')
      handleClose()
      onSuccess?.()
    } catch (error: any) {
      console.error('Payment submission error:', error)
      console.error('Error response:', error.response?.data)
      
      const errorMessage = error.response?.data?.error || error.message || 'Failed to submit payment'
      showToast(errorMessage, 'error')
      
      // Set specific field errors if available
      if (error.response?.data?.field) {
        setErrors({
          ...errors,
          [error.response.data.field]: errorMessage
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setFormData({
        amount: '',
        paymentMethod: 'bank_transfer',
        transactionReference: '',
        notes: '',
      })
      setScreenshot(null)
      setPreviewUrl(null)
      setErrors({})
      setCopiedAccount(null)
      setExpandedCard(null)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Pay for ${subjectName}`}>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
        {/* Payment Instructions */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1 sm:p-2 bg-blue-100 dark:bg-blue-800/50 rounded-md sm:rounded-lg flex-shrink-0">
              <CreditCard className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-[11px] sm:text-base text-gray-900 dark:text-white mb-0.5 sm:mb-1">Payment Instructions</h3>
              <p className="text-[10px] sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                Choose a payment method below, copy the account number, complete your payment, then upload a screenshot of the transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Accounts - Interactive Cards */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-[10px] sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
            Select Payment Method & Copy Account
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {paymentAccounts.map((account) => {
              const Icon = account.icon
              const isCopied = copiedAccount === account.id
              const isExpanded = expandedCard === account.id
              
              return (
                <div
                  key={account.id}
                  className={`group relative ${account.bgLight} dark:${account.bgDark} p-2 sm:p-4 rounded-lg sm:rounded-xl border-2 ${account.borderColor} hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer`}
                  onClick={() => {
                    // On mobile, toggle expansion; on desktop, copy directly
                    if (window.innerWidth < 640) {
                      setExpandedCard(isExpanded ? null : account.id)
                    } else {
                      copyToClipboard(account.account, account.id)
                    }
                  }}
                >
                  {/* Icon with gradient */}
                  <div className={`p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${account.gradient} shadow-md sm:shadow-lg mb-1.5 sm:mb-3 mx-auto w-fit`}>
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  
                  {/* Account Info */}
                  <div className="text-center space-y-1 sm:space-y-2">
                    <h4 className={`font-bold text-[10px] sm:text-sm ${account.textColor}`}>{account.name}</h4>
                    <span className="inline-block text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                      {account.type}
                    </span>
                    
                    {/* Account number - hidden on mobile by default, shown when expanded or on desktop */}
                    <p className={`font-mono text-xs sm:text-base font-bold text-gray-900 dark:text-white tracking-wide break-all transition-all duration-300 ${
                      isExpanded || window.innerWidth >= 640 ? 'block' : 'hidden'
                    }`}>
                      {account.account}
                    </p>
                    
                    {/* Show/Hide indicator on mobile */}
                    <p className={`text-[9px] text-gray-500 dark:text-gray-400 sm:hidden ${isExpanded ? 'hidden' : 'block'}`}>
                      Tap to view
                    </p>
                  </div>

                  {/* Copy Button - only show when expanded on mobile or always on desktop */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(account.account, account.id)
                    }}
                    className={`mt-1.5 sm:mt-3 w-full py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all duration-300 ${
                      isCopied
                        ? 'bg-green-500 scale-105'
                        : `bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95`
                    } shadow-sm sm:shadow-md border-2 ${
                      isCopied ? 'border-green-400' : 'border-gray-200 dark:border-gray-700'
                    } flex items-center justify-center gap-1 sm:gap-2 ${
                      isExpanded || window.innerWidth >= 640 ? 'block' : 'hidden sm:flex'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        <span className="text-[10px] sm:text-sm font-bold text-white">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className={`w-3 h-3 sm:w-4 sm:h-4 ${account.textColor}`} />
                        <span className={`text-[10px] sm:text-sm font-bold ${account.textColor}`}>Copy</span>
                      </>
                    )}
                  </button>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl pointer-events-none" />
                </div>
              )
            })}
          </div>
          <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 text-center">
            💡 <span className="sm:hidden">Tap card to view account, then tap copy</span><span className="hidden sm:inline">Tap on any card to copy the account number</span>
          </p>
        </div>

        <FormInput
          label="Amount (ETB)"
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
          placeholder="Enter amount"
          required
          error={errors.amount}
        />
        {errors.amount && (
          <div className="flex items-start gap-2 p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg -mt-2">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">{errors.amount}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Screenshot *
          </label>
          <label
            htmlFor="file-upload"
            className={`mt-1 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
              errors.screenshot 
                ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10' 
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 active:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <div className="space-y-1 text-center w-full">
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Payment screenshot preview"
                    className="mx-auto h-40 sm:h-48 w-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setScreenshot(null)
                      setPreviewUrl(null)
                      setErrors({ ...errors, screenshot: undefined })
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-red-600 active:scale-95 transition-all text-lg sm:text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <Upload className={`mx-auto h-10 w-10 sm:h-12 sm:w-12 ${errors.screenshot ? 'text-red-400' : 'text-gray-400'}`} />
                  <div className="flex flex-col sm:flex-row items-center justify-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-primary-600 hover:text-primary-500">
                      Click to upload
                    </span>
                    <p className="sm:pl-1">or drag and drop</p>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 5MB</p>
                </>
              )}
            </div>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {errors.screenshot && (
            <div className="flex items-start gap-2 p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg mt-2">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">{errors.screenshot}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
          <Button type="button" variant="secondary" onClick={handleClose} disabled={loading} className="flex-1 w-full">
            Cancel
          </Button>
          <Button type="submit" disabled={loading || !screenshot} className="flex-1 w-full">
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" size={16} />
                Submitting...
              </>
            ) : (
              'Submit Payment'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
