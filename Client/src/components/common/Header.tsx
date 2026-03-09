import React from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6 mb-8 shadow-sm">
      <div className="flex justify-between items-start gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white m-0">{title}</h1>
          {subtitle && <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 m-0">{subtitle}</p>}
        </div>
        {action && <div className="flex gap-4">{action}</div>}
      </div>
    </div>
  )
}
