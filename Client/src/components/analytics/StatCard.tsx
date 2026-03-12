import React from 'react'
import { Card, CardBody } from '@components/common/Card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  unit?: string
  trend?: {
    direction: 'up' | 'down' | 'stable'
    percentage: number
  }
  color?: string
  onClick?: () => void
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  unit,
  trend,
  color = '#3b82f6',
  onClick,
}) => {
  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return <TrendingUp size={16} />
      case 'down':
        return <TrendingDown size={16} />
      default:
        return <Minus size={16} />
    }
  }

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up':
        return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10'
      case 'down':
        return 'text-rose-500 bg-rose-50 dark:bg-rose-500/10'
      default:
        return 'text-slate-500 bg-slate-50 dark:bg-slate-500/10'
    }
  }

  return (
    <Card hoverable={!!onClick} onClick={onClick} className="group relative overflow-hidden border-none shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 delay-75"
        style={{ backgroundImage: `radial-gradient(circle at top right, ${color}, transparent 60%)` }}
      />
      <CardBody className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
            style={{ backgroundColor: `${color}15` }}
          >
            {icon}
          </div>
          
          {trend && (
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${getTrendColor(trend.direction)}`}>
              {getTrendIcon(trend.direction)}
              <span>{trend.percentage}%</span>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-slate-500 dark:text-slate-400 font-semibold mb-1 text-sm">{label}</h4>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {value}
            </span>
            {unit && <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{unit}</span>}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
