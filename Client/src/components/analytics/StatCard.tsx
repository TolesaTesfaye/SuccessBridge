import React from 'react'
import { Card, CardBody } from '@components/common/Card'

interface StatCardProps {
  icon: string
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
  color = '#667eea',
  onClick,
}) => {
  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return '↑'
      case 'down':
        return '↓'
      default:
        return '→'
    }
  }

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up':
        return '#10b981'
      case 'down':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  return (
    <Card hoverable onClick={onClick} className="stat-card">
      <CardBody>
        <div className="stat-card-content">
          <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}20` }}>
            <span className="stat-icon">{icon}</span>
          </div>

          <div className="stat-info">
            <p className="stat-label">{label}</p>
            <div className="stat-value-row">
              <span className="stat-value">{value}</span>
              {unit && <span className="stat-unit">{unit}</span>}
            </div>
          </div>

          {trend && (
            <div
              className="stat-trend"
              style={{ color: getTrendColor(trend.direction) }}
            >
              <span className="trend-icon">{getTrendIcon(trend.direction)}</span>
              <span className="trend-value">{trend.percentage}%</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
