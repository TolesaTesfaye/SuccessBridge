import React from 'react'
import { Button } from './Button'

interface ErrorProps {
  message: string
  onRetry?: () => void
  fullScreen?: boolean
}

export const Error: React.FC<ErrorProps> = ({ message, onRetry, fullScreen = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-8 text-center ${
        fullScreen ? 'fixed inset-0 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 z-50' : ''
      }`}
    >
      <div className="text-4xl">⚠️</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Something went wrong</h3>
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const typeStyles = {
    success: 'bg-green-100 dark:bg-green-900 dark:bg-opacity-30 text-green-800 dark:text-green-200 border-l-4 border-green-500',
    error: 'bg-red-100 dark:bg-red-900 dark:bg-opacity-30 text-red-800 dark:text-red-200 border-l-4 border-red-500',
    warning: 'bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-30 text-yellow-800 dark:text-yellow-200 border-l-4 border-yellow-500',
    info: 'bg-blue-100 dark:bg-blue-900 dark:bg-opacity-30 text-blue-800 dark:text-blue-200 border-l-4 border-blue-500',
  }

  return (
    <div className={`p-4 rounded flex justify-between items-center gap-4 animate-slideDown ${typeStyles[type]}`}>
      <span>{message}</span>
      {onClose && (
        <button
          className="text-xl opacity-70 hover:opacity-100 transition-opacity bg-none border-none cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>
  )
}
