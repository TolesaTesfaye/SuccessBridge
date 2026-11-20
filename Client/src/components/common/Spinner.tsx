import React from 'react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400 animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}

interface LoadingOverlayProps {
  message?: string
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-slate-700 dark:text-slate-300 font-semibold">{message}</p>
      </div>
    </div>
  )
}
