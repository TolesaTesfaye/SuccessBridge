import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

interface ToastContextType {
  showToast: (type: Toast['type'], message: string, duration?: number) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (type: Toast['type'], message: string, duration: number = 5000) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast: Toast = { id, type, message, duration }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration)
      }
    },
    [removeToast]
  )

  const success = useCallback(
    (message: string, duration?: number) => showToast('success', message, duration),
    [showToast]
  )

  const error = useCallback(
    (message: string, duration?: number) => showToast('error', message, duration),
    [showToast]
  )

  const warning = useCallback(
    (message: string, duration?: number) => showToast('warning', message, duration),
    [showToast]
  )

  const info = useCallback(
    (message: string, duration?: number) => showToast('info', message, duration),
    [showToast]
  )

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const config = {
    success: {
      icon: <CheckCircle className="w-5 h-5" />,
      bgColor: 'bg-emerald-500',
      textColor: 'text-white',
    },
    error: {
      icon: <XCircle className="w-5 h-5" />,
      bgColor: 'bg-red-500',
      textColor: 'text-white',
    },
    warning: {
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: 'bg-orange-500',
      textColor: 'text-white',
    },
    info: {
      icon: <Info className="w-5 h-5" />,
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
    },
  }

  const { icon, bgColor, textColor } = config[toast.type]

  return (
    <div
      className={`${bgColor} ${textColor} rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] animate-slideIn`}
      role="alert"
    >
      <div className="flex-shrink-0">{icon}</div>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
