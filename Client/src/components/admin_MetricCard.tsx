import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  className?: string
  loading?: boolean
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  className = '',
  loading = false,
}) => {
  const isPositive = change && change > 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse mt-2 w-20" />
          ) : (
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          )}
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <TrendIcon
                size={16}
                className={isPositive ? 'text-green-600' : 'text-red-600'}
              />
              <span
                className={`text-sm ml-1 ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change > 0 ? '+' : ''}{change}% {changeLabel || 'from last period'}
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
    </div>
  )
}

export default MetricCard
