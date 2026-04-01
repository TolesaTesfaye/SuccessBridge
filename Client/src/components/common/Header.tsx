import React from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 md:px-8 py-3 md:py-6 mb-4 md:mb-8 shadow-sm">
      <div className="flex justify-between items-start gap-3 md:gap-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white m-0 truncate">{title}</h1>
          {subtitle && <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-0.5 md:mt-1 m-0 line-clamp-2">{subtitle}</p>}
        </div>
        {action && <div className="flex gap-2 md:gap-4 flex-shrink-0">{action}</div>}
      </div>
    </div>
  )
}
