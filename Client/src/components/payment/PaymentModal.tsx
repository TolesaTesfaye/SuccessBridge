import React, { useState } from 'react'
import { Modal } from '@components/common/Modal'
import { Button } from '@components/common/Button'
import { FormInput } from '@components/forms/FormInput'
import { FormSelect } from '@components/forms/FormSelect'
import { FormTextarea } from '@components/forms/FormTextarea'
import { paymentService, CreatePaymentData } from '@services/paymentService'
import { useToast } from '@components/common/Toast'
import { Upload, CreditCard, Loader, Copy, Check, CheckCircle, Smartphone, Building2, AlertTriangle } from 'lucide-react'

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
      accountHolder: 'Tolesa Tesfaye',
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
      accountHolder: 'Tolesa Tesfaye',
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
      accountHolder: 'Tolesa Tesfaye',
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
      
      console.log('File selected:', file.name, file.size, file.type)
      
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
        const result = reader.result as string
        console.log('Preview URL created, length:', result.length)
        setPreviewUrl(result)
      }
      reader.onerror = () => {
        console.error('FileReader error')
        showToast('Failed to read file', 'error')
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
    <Modal isOpen={isOpen} onClose={handleClose} title="Payment">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
        {/* Payment Instructions */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-2.5 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1 sm:p-2 bg-blue-100 dark:bg-blue-800/50 rounded-md sm:rounded-lg flex-shrink-0">
              <CreditCard className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="w-full">
              <h3 className="font-bold text-[11px] sm:text-base text-gray-900 dark:text-white mb-0.5 sm:mb-2">Payment Instructions</h3>
              
              {/* English Instructions */}
              <p className="text-[10px] sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed mb-2 sm:mb-3">
                Choose a payment method below, copy the account number, complete your payment, then upload a screenshot of the transaction.
              </p>
              
              {/* Oromo (Afaan Oromoo) Instructions */}
              <div className="bg-white/60 dark:bg-gray-800/40 p-2 sm:p-3 rounded-lg border border-blue-300/50 dark:border-blue-600/50">
                <p className="text-[9px] sm:text-xs font-semibold text-orange-700 dark:text-orange-400 mb-1">
                  🗣️ Hubachiisa (Afaan Oromoo):
                </p>
                <p className="text-[9px] sm:text-xs text-blue-900 dark:text-blue-100 leading-relaxed font-medium">
                  Account kana gadii fayyadamuun qarshii ergaa. Sanaa booda amma maallaqa ergitani fi screen shoot isaa iddoo armaan gadii kanatti galchuun submit godhaa. Daqiiqa 10 hin caalle keessatti approve siniif godhama.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Accounts - Interactive Cards */}
        <div className="space-y-2">
          <h3 className="text-[9px] sm:text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">
            Payment Accounts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
            {paymentAccounts.map((account) => {
              const Icon = account.icon
              const isCopied = copiedAccount === account.id
              const isExpanded = expandedCard === account.id
              
              return (
                <div
                  key={account.id}
                  className={`group relative ${account.bgLight} dark:${account.bgDark} p-1.5 sm:p-2 rounded-md border ${account.borderColor} hover:shadow-sm transition-all duration-200`}
                >
                  {/* Icon with gradient - very small */}
                  <div className={`p-0.5 sm:p-1 rounded bg-gradient-to-br ${account.gradient} shadow-sm mb-0.5 sm:mb-1 mx-auto w-fit`}>
                    <Icon className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  
                  {/* Account Info - very compact */}
                  <div className="text-center space-y-0.5">
                    <h4 className={`font-bold text-[8px] sm:text-[10px] ${account.textColor}`}>{account.name}</h4>
                    
                    {/* Account holder name */}
                    <p className="text-[7px] sm:text-[9px] text-gray-700 dark:text-gray-300 font-medium">
                      {account.accountHolder}
                    </p>
                    
                    {/* Account number - smaller */}
                    <p className="font-mono text-[9px] sm:text-xs font-bold text-gray-900 dark:text-white tracking-tight break-all">
                      {account.account}
                    </p>
                  </div>

                  {/* Copy Button - very small */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(account.account, account.id)
                    }}
                    className={`mt-0.5 sm:mt-1 w-full py-0.5 sm:py-1 rounded text-[7px] sm:text-[9px] transition-all duration-200 ${
                      isCopied
                        ? 'bg-green-500'
                        : `bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700`
                    } shadow-sm border ${
                      isCopied ? 'border-green-400' : 'border-gray-200 dark:border-gray-700'
                    } flex items-center justify-center gap-0.5 sm:gap-1`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                        <span className="font-bold text-white">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${account.textColor}`} />
                        <span className={`font-bold ${account.textColor}`}>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
          <p className="text-[7px] sm:text-[9px] text-gray-500 dark:text-gray-400 text-center">
            💡 Tap copy button to copy account number
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

        {/* Screenshot Upload Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Payment Screenshot *
          </label>
          
          {/* Show preview if uploaded */}
          {previewUrl && screenshot && (
            <div className="space-y-3">
              <div className="relative border-4 border-green-500 rounded-xl p-4 bg-white dark:bg-gray-800">
                <img
                  src={previewUrl}
                  alt="Payment screenshot"
                  className="w-full h-auto rounded-lg"
                  onLoad={() => console.log('Image loaded successfully')}
                  onError={() => console.error('Image failed to load')}
                />
                <button
                  type="button"
                  onClick={() => {
                    setScreenshot(null)
                    setPreviewUrl(null)
                    setErrors({ ...errors, screenshot: undefined })
                  }}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-2xl shadow-lg"
                >
                  ×
                </button>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  Screenshot uploaded: {screenshot.name}
                </span>
              </div>
            </div>
          )}
          
          {/* Show upload area if no preview */}
          {!previewUrl && (
            <label
              htmlFor="screenshot-upload"
              className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                errors.screenshot 
                  ? 'border-red-400 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <Upload className={`mx-auto h-12 w-12 mb-3 ${errors.screenshot ? 'text-red-400' : 'text-gray-400'}`} />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Click to upload screenshot
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 5MB
              </p>
            </label>
          )}
          
          <input
            id="screenshot-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {errors.screenshot && (
            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errors.screenshot}</p>
            </div>
          )}
        </div>

        {/* Action Buttons - At the end */}
        <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handleClose} 
              disabled={loading} 
              className="flex-1 w-full py-3 text-base font-semibold"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !screenshot} 
              className="flex-1 w-full py-3 text-base font-semibold bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  Submitting Payment...
                </>
              ) : (
                <>
                  {screenshot ? '✓ Submit Payment' : '⚠ Upload Screenshot First'}
                </>
              )}
            </Button>
          </div>
          {!screenshot && (
            <p className="text-center text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">
              Please upload a payment screenshot to continue
            </p>
          )}
        </div>
      </form>
    </Modal>
  )
}
