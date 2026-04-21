import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { AppLogo } from '@components/common/AppLogo'
import { ThemeToggle } from '@components/common/ThemeToggle'
import { FormInput } from '@components/forms/FormInput'
import { useToast } from '@components/common/Toast'
import { authService } from '@services/authService'
import { Lock, ArrowLeft, Clock } from 'lucide-react'

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const [email, setEmail] = useState(location.state?.email || '')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'code' | 'password'>('code')
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [isExpired, setIsExpired] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      const nextInput = document.getElementById(`reset-code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`reset-code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('')
      setCode(newCode)
      const lastInput = document.getElementById('reset-code-5')
      lastInput?.focus()
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    const resetCode = code.join('')

    if (!email) {
      toast.error('Email address is required')
      return
    }

    if (resetCode.length !== 6) {
      toast.error('Please enter the complete 6-digit code')
      return
    }

    if (isExpired) {
      toast.error('Reset code has expired. Please request a new one.')
      return
    }

    setLoading(true)
    try {
      const response = await authService.verifyResetCode(email, resetCode)
      if (response.success) {
        toast.success('Code verified! Now set your new password.')
        setStep('password')
      }
    } catch (err: any) {
      const userError = err.userFriendlyError
      if (userError) {
        toast.showToast(userError.type, userError.message, userError.duration)
      } else {
        toast.error(err.response?.data?.error || 'Invalid or expired code')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const resetCode = code.join('')

    setLoading(true)
    try {
      const response = await authService.resetPassword(email, resetCode, newPassword)
      if (response.success) {
        toast.success('Password reset successfully! You can now log in.')
        navigate('/login')
      }
    } catch (err: any) {
      const userError = err.userFriendlyError
      if (userError) {
        toast.showToast(userError.type, userError.message, userError.duration)
      } else {
        toast.error(err.response?.data?.error || 'Failed to reset password')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-violet-600 dark:to-indigo-600 blur-[100px] rounded-full mix-blend-screen transition-colors"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <AppLogo size="xl" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900 dark:text-white transition-colors">
          {step === 'code' ? 'Enter Reset Code' : 'Set New Password'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400 transition-colors">
          {step === 'code' 
            ? 'Enter the 6-digit code sent to your email'
            : 'Choose a strong password for your account'
          }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-slate-200 dark:border-slate-700 transition-colors">
          {step === 'code' ? (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              {!location.state?.email && (
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Reset Code
                </label>
                <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`reset-code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:bg-slate-700 dark:text-white transition-colors"
                      disabled={isExpired}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span className={`font-medium ${isExpired ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {isExpired ? 'Code Expired' : `Expires in ${formatTime(timeLeft)}`}
                </span>
              </div>

              {isExpired && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Your reset code has expired. Please request a new one.
                  </p>
                  <Link
                    to="/forgot-password"
                    className="mt-2 inline-block text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500"
                  >
                    Request New Code
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || isExpired}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <FormInput
                label="New Password"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                icon={<Lock className="h-5 w-5" />}
              />

              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                icon={<Lock className="h-5 w-5" />}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          <div className="mt-6">
            <Link
              to="/login"
              className="flex items-center justify-center text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
