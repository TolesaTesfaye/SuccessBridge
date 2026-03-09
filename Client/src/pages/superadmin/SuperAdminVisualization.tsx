import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { AnalyticsChart } from '@components/analytics/AnalyticsChart'
import { StatCard } from '@components/analytics/StatCard'
import { FormSelect } from '@components/forms/FormSelect'

export const SuperAdminVisualization: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('all')

  return (
    <DashboardLayout title="Platform Analytics" subtitle="Real-time insights and performance metrics">
      <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Real-time insights and performance metrics</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <FormSelect
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            options={[
              { value: 'week', label: 'Last Week' },
              { value: 'month', label: 'Last Month' },
              { value: 'quarter', label: 'Last Quarter' },
              { value: 'year', label: 'Last Year' },
            ]}
          />

          <FormSelect
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            options={[
              { value: 'all', label: 'All Metrics' },
              { value: 'users', label: 'Users' },
              { value: 'resources', label: 'Resources' },
              { value: 'performance', label: 'Performance' },
            ]}
          />
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: '👥',
            label: 'Total Users',
            value: '125,430',
            trend: { direction: 'up' as const, percentage: 12.5 },
          },
          {
            icon: '🎓',
            label: 'Active Students',
            value: '98,250',
            trend: { direction: 'up' as const, percentage: 8.2 },
          },
          {
            icon: '📚',
            label: 'Total Resources',
            value: '12,450',
            trend: { direction: 'up' as const, percentage: 5.3 },
          },
          {
            icon: '📈',
            label: 'Platform Engagement',
            value: '78.5%',
            trend: { direction: 'up' as const, percentage: 3.1 },
          },
        ].map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>📈 User Growth Trend</CardHeader>
        <CardBody>
          <AnalyticsChart
            title="Monthly User Growth"
            type="line"
            data={[
              { label: 'Jan', value: 1200 },
              { label: 'Feb', value: 1900 },
              { label: 'Mar', value: 1500 },
              { label: 'Apr', value: 2200 },
              { label: 'May', value: 2800 },
              { label: 'Jun', value: 3200 },
            ]}
          />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resources Distribution */}
        <Card>
          <CardHeader>📚 Resources by Type</CardHeader>
          <CardBody>
            <AnalyticsChart
              title="Resource Distribution"
              type="pie"
              data={[
                { label: 'Textbooks', value: 2100 },
                { label: 'Videos', value: 3200 },
                { label: 'Past Exams', value: 1800 },
                { label: 'Modules', value: 2400 },
                { label: 'Quizzes', value: 1500 },
                { label: 'Worksheets', value: 1450 },
              ]}
            />
          </CardBody>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>🎯 Student Performance</CardHeader>
          <CardBody>
            <AnalyticsChart
              title="Performance Metrics"
              type="bar"
              data={[
                { label: 'Week 1', value: 72 },
                { label: 'Week 2', value: 75 },
                { label: 'Week 3', value: 78 },
                { label: 'Week 4', value: 81 },
              ]}
            />
          </CardBody>
        </Card>
      </div>

      {/* Detailed Metrics Table */}
      <Card>
        <CardHeader>📊 Detailed Metrics</CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Metric</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Current</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Previous</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-900 dark:text-white">Total Registrations</td>
                  <td className="text-right py-3 px-4 text-slate-900 dark:text-white font-semibold">125,430</td>
                  <td className="text-right py-3 px-4 text-slate-500 dark:text-slate-400">111,250</td>
                  <td className="text-right py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">+12.7%</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-900 dark:text-white">Daily Active Users</td>
                  <td className="text-right py-3 px-4 text-slate-900 dark:text-white font-semibold">45,230</td>
                  <td className="text-right py-3 px-4 text-slate-500 dark:text-slate-400">42,100</td>
                  <td className="text-right py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">+7.4%</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-900 dark:text-white">Resources Uploaded</td>
                  <td className="text-right py-3 px-4 text-slate-900 dark:text-white font-semibold">12,450</td>
                  <td className="text-right py-3 px-4 text-slate-500 dark:text-slate-400">11,820</td>
                  <td className="text-right py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">+5.3%</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-900 dark:text-white">Quizzes Completed</td>
                  <td className="text-right py-3 px-4 text-slate-900 dark:text-white font-semibold">89,450</td>
                  <td className="text-right py-3 px-4 text-slate-500 dark:text-slate-400">82,100</td>
                  <td className="text-right py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">+9.0%</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-900 dark:text-white">Avg Quiz Score</td>
                  <td className="text-right py-3 px-4 text-slate-900 dark:text-white font-semibold">76.8%</td>
                  <td className="text-right py-3 px-4 text-slate-500 dark:text-slate-400">74.2%</td>
                  <td className="text-right py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">+3.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      </div>
    </DashboardLayout>
  )
}
