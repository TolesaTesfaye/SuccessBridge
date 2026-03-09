import React from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { AnalyticsChart } from '@components/analytics/AnalyticsChart'
import { PerformanceMetrics } from '@components/analytics/PerformanceMetrics'
import { StatCard } from '@components/analytics/StatCard'

export const SuperAdminAnalytics: React.FC = () => {
  return (
    <DashboardLayout title="Analytics" subtitle="Platform-wide analytics and insights">
      <div className="space-y-8">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon="🏫"
            label="Total Universities"
            value="12"
            trend={{ direction: 'up', percentage: 2 }}
          />
          <StatCard
            icon="👥"
            label="Total Users"
            value="5.2"
            unit="K"
            trend={{ direction: 'up', percentage: 8 }}
          />
          <StatCard
            icon="📚"
            label="Total Resources"
            value="1.8"
            unit="K"
            trend={{ direction: 'up', percentage: 12 }}
          />
          <StatCard
            icon="💚"
            label="Platform Health"
            value="99.8"
            unit="%"
            trend={{ direction: 'up', percentage: 0 }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart
            title="User Growth"
            type="line"
            data={[
              { label: 'Jan', value: 1200 },
              { label: 'Feb', value: 1900 },
              { label: 'Mar', value: 2400 },
              { label: 'Apr', value: 3200 },
              { label: 'May', value: 4100 },
            ]}
          />
          <AnalyticsChart
            title="Resource Distribution"
            type="pie"
            data={[
              { label: 'Textbooks', value: 45 },
              { label: 'Videos', value: 30 },
              { label: 'Quizzes', value: 15 },
              { label: 'Notes', value: 10 },
            ]}
          />
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics
          title="Platform Performance"
          metrics={[
            { label: 'Platform Uptime', value: '99.8%', trend: 'up', trendValue: 0.2 },
            { label: 'User Engagement', value: '87%', trend: 'up', trendValue: 6 },
            { label: 'Resource Quality', value: '92%', trend: 'up', trendValue: 4 },
            { label: 'System Performance', value: '95%', trend: 'up', trendValue: 2 },
          ]}
        />
      </div>
    </DashboardLayout>
  )
}
