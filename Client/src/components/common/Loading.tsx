import React from 'react'

interface LoadingProps {
  fullScreen?: boolean
  message?: string
}

export const Loading: React.FC<LoadingProps> = ({ fullScreen = false, message = 'Loading...' }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-8 ${
        fullScreen ? 'fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 z-50' : ''
      }`}
    >
      <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{message}</p>
    </div>
  )
}

export const Skeleton: React.FC<{ width?: string; height?: string; className?: string }> = ({
  width = '100%',
  height = '1rem',
  className = '',
}) => (
  <div
    className={`bg-gradient-to-r from-gray-200 dark:from-gray-700 via-gray-100 dark:via-gray-600 to-gray-200 dark:to-gray-700 bg-200% animate-shimmer rounded ${className}`}
    style={{ width, height }}
  />
)
