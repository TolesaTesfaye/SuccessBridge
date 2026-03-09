import React from 'react'
import { AlertCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

interface ErrorMessageProps {
  type?: 'error' | 'warning' | 'info' | 'success'
  title?: string
  message: string
  onClose?: () => void
  className?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  type = 'error',
  title,
  message,
  onClose,
  className = '',
}) => {
  const config = {
    error: {
      icon: <XCircle className="w-5 h-5" />,
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-700 dark:text-red-400',
      iconColor: 'text-red-600 dark:text-red-500',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5" />,
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      textColor: 'text-orange-700 dark:text-orange-400',
      iconColor: 'text-orange-600 dark:text-orange-500',
    },
    info: {
      icon: <Info className="w-5 h-5" />,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-700 dark:text-blue-400',
      iconColor: 'text-blue-600 dark:text-blue-500',
    },
    success: {
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      iconColor: 'text-emerald-600 dark:text-emerald-500',
    },
  }

  const { icon, bgColor, borderColor, textColor, iconColor } = config[type]

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className={iconColor}>{icon}</div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold ${textColor} mb-1`}>{title}</h4>
          )}
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`${textColor} hover:opacity-70 transition-opacity`}
            aria-label="Close"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}
