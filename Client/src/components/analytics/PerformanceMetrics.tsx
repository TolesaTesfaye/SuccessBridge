import React from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'

interface MetricData {
  label: string
  value: number | string
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: number
  color?: string
}

interface PerformanceMetricsProps {
  title: string
  metrics: MetricData[]
  layout?: 'grid' | 'list'
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  title,
  metrics,
  layout = 'grid',
}) => {
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return '📈'
      case 'down':
        return '📉'
      default:
        return '➡️'
    }
  }

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up':
        return '#10b981'
      case 'down':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        {layout === 'grid' ? (
          <div className="metrics-grid">
            {metrics.map((metric, idx) => (
              <div key={idx} className="metric-card">
                <div className="metric-header">
                  <span className="metric-label">{metric.label}</span>
                  {metric.trend && (
                    <span
                      className="metric-trend"
                      style={{ color: getTrendColor(metric.trend) }}
                      title={`${metric.trend} ${metric.trendValue || 0}%`}
                    >
                      {getTrendIcon(metric.trend)}
                      {metric.trendValue && <span>{metric.trendValue}%</span>}
                    </span>
                  )}
                </div>
                <div className="metric-value" style={{ color: metric.color || '#1f2937' }}>
                  {metric.value}
                  {metric.unit && <span className="metric-unit">{metric.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="metrics-list">
            {metrics.map((metric, idx) => (
              <div key={idx} className="metric-row">
                <div className="metric-row-left">
                  <span className="metric-label">{metric.label}</span>
                  {metric.trend && (
                    <span
                      className="metric-trend-small"
                      style={{ color: getTrendColor(metric.trend) }}
                    >
                      {getTrendIcon(metric.trend)}
                      {metric.trendValue && <span>{metric.trendValue}%</span>}
                    </span>
                  )}
                </div>
                <div className="metric-value-row" style={{ color: metric.color || '#1f2937' }}>
                  {metric.value}
                  {metric.unit && <span className="metric-unit">{metric.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}
