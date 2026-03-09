import React from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { AnalyticsChart } from '@components/analytics/AnalyticsChart'
import { PerformanceMetrics } from '@components/analytics/PerformanceMetrics'
import { StatCard } from '@components/analytics/StatCard'

export const AdminAnalytics: React.FC = () => {
  return (
    <DashboardLayout title="Analytics" subtitle="Department performance and insights">
      <div className="space-y-8">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon="📚"
            label="Total Resources"
            value="156"
            trend={{ direction: 'up', percentage: 12 }}
          />
          <StatCard
            icon="👥"
            label="Active Students"
            value="342"
            trend={{ direction: 'up', percentage: 8 }}
          />
          <StatCard
            icon="✏️"
            label="Avg Quiz Score"
            value="78"
            unit="%"
            trend={{ direction: 'up', percentage: 5 }}
          />
          <StatCard
            icon="👁️"
            label="Resource Views"
            value="2.4"
            unit="K"
            trend={{ direction: 'up', percentage: 15 }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart
            title="Resource Usage Trend"
            type="line"
            data={[
              { label: 'Week 1', value: 45 },
              { label: 'Week 2', value: 52 },
              { label: 'Week 3', value: 48 },
              { label: 'Week 4', value: 61 },
              { label: 'Week 5', value: 55 },
            ]}
          />
          <AnalyticsChart
            title="Quiz Performance"
            type="bar"
            data={[
              { label: 'Easy', value: 92 },
              { label: 'Medium', value: 78 },
              { label: 'Hard', value: 65 },
            ]}
          />
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics
          title="Department Performance"
          metrics={[
            { label: 'Resource Utilization', value: '78%', trend: 'up', trendValue: 12 },
            { label: 'Student Engagement', value: '82%', trend: 'up', trendValue: 8 },
            { label: 'Quiz Completion', value: '91%', trend: 'up', trendValue: 5 },
            { label: 'Avg Student Score', value: '78%', trend: 'up', trendValue: 3 },
          ]}
        />
      </div>
    </DashboardLayout>
  )
}
