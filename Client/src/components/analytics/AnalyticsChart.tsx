import React from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'

interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

interface AnalyticsChartProps {
  title: string
  data: ChartDataPoint[]
  type?: 'bar' | 'line' | 'pie'
  height?: number
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  data,
  type = 'bar',
  height = 300,
}) => {
  const maxValue = Math.max(...data.map(d => d.value))
  const defaultColors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe']

  const getColor = (index: number, customColor?: string) => {
    return customColor || defaultColors[index % defaultColors.length]
  }

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        {type === 'bar' && (
          <div className="chart-container" style={{ height }}>
            <div className="bar-chart">
              {data.map((point, idx) => (
                <div key={idx} className="bar-item">
                  <div className="bar-wrapper">
                    <div
                      className="bar"
                      style={{
                        height: `${(point.value / maxValue) * 100}%`,
                        backgroundColor: getColor(idx, point.color),
                      }}
                      title={`${point.label}: ${point.value}`}
                    />
                  </div>
                  <span className="bar-label">{point.label}</span>
                  <span className="bar-value">{point.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {type === 'line' && (
          <div className="chart-container" style={{ height }}>
            <div className="line-chart">
              <svg width="100%" height="100%" viewBox={`0 0 ${data.length * 60} ${height}`}>
                <polyline
                  points={data
                    .map((point, idx) => {
                      const x = idx * 60 + 30
                      const y = height - (point.value / maxValue) * (height - 40)
                      return `${x},${y}`
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#667eea"
                  strokeWidth="2"
                />
                {data.map((point, idx) => {
                  const x = idx * 60 + 30
                  const y = height - (point.value / maxValue) * (height - 40)
                  return (
                    <g key={idx}>
                      <circle
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#667eea"
                      />
                      <title>{`${point.label}: ${point.value}`}</title>
                    </g>
                  )
                })}
              </svg>
              <div className="line-labels">
                {data.map((point, idx) => (
                  <span key={idx} className="line-label">
                    {point.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {type === 'pie' && (
          <div className="chart-container" style={{ height }}>
            <div className="pie-chart">
              <svg width="100%" height="100%" viewBox="0 0 200 200">
                {data.map((point, idx) => {
                  const total = data.reduce((sum, d) => sum + d.value, 0)
                  const percentage = (point.value / total) * 100
                  const startAngle = data
                    .slice(0, idx)
                    .reduce((sum, d) => sum + (d.value / total) * 360, 0)
                  const endAngle = startAngle + percentage * 3.6

                  const startRad = (startAngle * Math.PI) / 180
                  const endRad = (endAngle * Math.PI) / 180

                  const x1 = 100 + 80 * Math.cos(startRad)
                  const y1 = 100 + 80 * Math.sin(startRad)
                  const x2 = 100 + 80 * Math.cos(endRad)
                  const y2 = 100 + 80 * Math.sin(endRad)

                  const largeArc = percentage > 50 ? 1 : 0

                  const pathData = [
                    `M 100 100`,
                    `L ${x1} ${y1}`,
                    `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
                    'Z',
                  ].join(' ')

                  return (
                    <g key={idx}>
                      <path
                        d={pathData}
                        fill={getColor(idx, point.color)}
                        stroke="white"
                        strokeWidth="2"
                      />
                      <title>{`${point.label}: ${point.value} (${percentage.toFixed(1)}%)`}</title>
                    </g>
                  )
                })}
              </svg>
              <div className="pie-legend">
                {data.map((point, idx) => (
                  <div key={idx} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ backgroundColor: getColor(idx, point.color) }}
                    />
                    <span className="legend-label">{point.label}</span>
                    <span className="legend-value">{point.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
