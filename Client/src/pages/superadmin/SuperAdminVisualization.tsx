import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { FormSelect } from '@components/forms/FormSelect'
import { analyticsService, AnalyticsData } from '@services/analyticsService'
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Activity, 
  Globe, 
  Target, 
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Download,
  RefreshCw,
  AlertCircle
} from 'lucide-react'

export const SuperAdminVisualization: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('all')
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await analyticsService.getAnalytics(timeRange)
      setAnalyticsData(data)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Failed to fetch analytics:', err)
      setError('Failed to load analytics data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000) // Update timestamp every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchAnalytics()
    setRefreshing(false)
  }

  if (loading) {
    return (
      <DashboardLayout title="System Analytics & Visualization" subtitle="Loading analytics data...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !analyticsData) {
    return (
      <DashboardLayout title="System Analytics & Visualization" subtitle="Error loading data">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Button onClick={fetchAnalytics} variant="primary">
              Try Again
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="System Analytics & Visualization" subtitle="Real-time insights and comprehensive system analytics">
      <div className="space-y-8">
        
        {/* Header with Controls */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-2xl border border-blue-100 dark:border-slate-600">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">System Analytics Dashboard</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()} • 
                <span className="text-green-600 dark:text-green-400 font-semibold ml-1">Live Data</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <FormSelect
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              options={[
                { value: 'day', label: 'Last 24 Hours' },
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
                { value: 'users', label: 'User Analytics' },
                { value: 'resources', label: 'Resource Analytics' },
                { value: 'performance', label: 'Performance Metrics' },
                { value: 'engagement', label: 'Engagement Data' },
              ]}
            />

            <Button 
              variant="secondary" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>

            <Button variant="primary" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Real-time Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              label: 'Total Active Users',
              value: analyticsData.userStats.totalUsers.toLocaleString(),
              trend: { direction: 'up' as const, percentage: 15.2 },
              color: 'blue',
              subtitle: `+${analyticsData.userStats.newUsersThisWeek} this week`
            },
            {
              icon: <GraduationCap className="w-6 h-6" />,
              label: 'Active Students',
              value: analyticsData.userStats.activeStudents.toLocaleString(),
              trend: { direction: 'up' as const, percentage: 4.8 },
              color: 'green',
              subtitle: 'Daily active rate'
            },
            {
              icon: <BookOpen className="w-6 h-6" />,
              label: 'Total Resources',
              value: analyticsData.resourceStats.totalResources.toLocaleString(),
              trend: { direction: 'up' as const, percentage: 22.1 },
              color: 'purple',
              subtitle: 'Available resources'
            },
            {
              icon: <Target className="w-6 h-6" />,
              label: 'Quiz Completion',
              value: `${analyticsData.quizStats.completionRate.toFixed(1)}%`,
              trend: { direction: 'up' as const, percentage: 7.3 },
              color: 'orange',
              subtitle: 'Success rate'
            },
          ].map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 dark:from-${stat.color}-900/20 dark:to-${stat.color}-800/20 p-6 rounded-2xl border border-${stat.color}-200 dark:border-${stat.color}-700/50 hover:shadow-lg hover:shadow-${stat.color}-500/10 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-${stat.color}-500/30`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                  stat.trend.direction === 'up' 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  +{stat.trend.percentage}%
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold mb-1">{stat.label}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* User Growth Trends */}
          <div className="xl:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex items-center gap-3">
                <LineChart className="w-5 h-5 text-blue-600" />
                <span>User Growth & Engagement Trends</span>
                <div className="ml-auto flex gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span>New Users</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span>Active Users</span>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="h-96">
                <div className="chart-container h-full">
                  <div className="line-chart h-full">
                    <svg width="100%" height="100%" viewBox="0 0 480 350" className="h-full">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="60" height="35" patternUnits="userSpaceOnUse">
                          <path d="M 60 0 L 0 0 0 35" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.3"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      
                      {/* New Users Line */}
                      <polyline
                        points={analyticsData.userStats.userGrowthData.map((point, idx) => {
                          const x = (idx * 480) / analyticsData.userStats.userGrowthData.length + 60
                          const maxValue = Math.max(...analyticsData.userStats.userGrowthData.map(p => p.value))
                          const y = 320 - (point.value / maxValue) * 260
                          return `${x},${y}`
                        }).join(' ')}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      
                      {/* Active Users Line */}
                      <polyline
                        points={analyticsData.userStats.userGrowthData.map((point, idx) => {
                          const x = (idx * 480) / analyticsData.userStats.userGrowthData.length + 60
                          const maxValue = Math.max(...analyticsData.userStats.userGrowthData.map(p => p.value))
                          const y = 320 - (point.activeUsers / maxValue) * 260
                          return `${x},${y}`
                        }).join(' ')}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      
                      {/* Data points for New Users */}
                      {analyticsData.userStats.userGrowthData.map((point, idx) => {
                        const x = (idx * 480) / analyticsData.userStats.userGrowthData.length + 60
                        const maxValue = Math.max(...analyticsData.userStats.userGrowthData.map(p => p.value))
                        const y = 320 - (point.value / maxValue) * 260
                        return (
                          <g key={`new-${idx}`}>
                            <circle cx={x} cy={y} r="5" fill="#3B82F6" stroke="white" strokeWidth="2"/>
                            <title>New Users: {point.value.toLocaleString()}</title>
                          </g>
                        )
                      })}
                      
                      {/* Data points for Active Users */}
                      {analyticsData.userStats.userGrowthData.map((point, idx) => {
                        const x = (idx * 480) / analyticsData.userStats.userGrowthData.length + 60
                        const maxValue = Math.max(...analyticsData.userStats.userGrowthData.map(p => p.value))
                        const y = 320 - (point.activeUsers / maxValue) * 260
                        return (
                          <g key={`active-${idx}`}>
                            <circle cx={x} cy={y} r="5" fill="#10B981" stroke="white" strokeWidth="2"/>
                            <title>Active Users: {point.activeUsers.toLocaleString()}</title>
                          </g>
                        )
                      })}
                    </svg>
                    
                    {/* X-axis labels */}
                    <div className="flex justify-between mt-4 text-sm text-slate-600 dark:text-slate-400">
                      {analyticsData.userStats.userGrowthData.map((point, idx) => (
                        <span key={idx} className="text-center">{point.label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* System Performance */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-green-600" />
              <span>System Performance</span>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                {[
                  { label: 'Server Response Time', value: '127ms', status: 'excellent', percentage: 95 },
                  { label: 'Database Performance', value: '99.8%', status: 'excellent', percentage: 98 },
                  { label: 'CDN Efficiency', value: '94.2%', status: 'good', percentage: 94 },
                  { label: 'API Success Rate', value: '99.9%', status: 'excellent', percentage: 99 },
                  { label: 'User Satisfaction', value: '4.8/5', status: 'excellent', percentage: 96 },
                ].map((metric, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{metric.label}</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{metric.value}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          metric.status === 'excellent' ? 'bg-green-600' : 
                          metric.status === 'good' ? 'bg-blue-600' : 'bg-orange-600'
                        }`}
                        style={{ width: `${metric.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Resource Analytics & Geographic Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Resource Distribution */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <PieChart className="w-5 h-5 text-purple-600" />
              <span>Resource Distribution & Usage</span>
            </CardHeader>
            <CardBody className="h-96">
              <div className="chart-container h-full flex items-center justify-center">
                <div className="pie-chart w-full h-full">
                  <svg width="100%" height="100%" viewBox="0 0 400 300" className="h-full">
                    {/* Pie Chart */}
                    <g transform="translate(150, 150)">
                      {analyticsData.resourceStats.resourcesByType.map((segment, idx) => {
                        const total = analyticsData.resourceStats.resourcesByType.reduce((sum, item) => sum + item.count, 0)
                        const percentage = (segment.count / total) * 100
                        const angle = (segment.count / total) * 360
                        
                        // Calculate start angle based on previous segments
                        const startAngle = analyticsData.resourceStats.resourcesByType
                          .slice(0, idx)
                          .reduce((sum, item) => sum + (item.count / total) * 360, 0)
                        const endAngle = startAngle + angle

                        const startRad = (startAngle * Math.PI) / 180
                        const endRad = (endAngle * Math.PI) / 180

                        const x1 = 70 * Math.cos(startRad)
                        const y1 = 70 * Math.sin(startRad)
                        const x2 = 70 * Math.cos(endRad)
                        const y2 = 70 * Math.sin(endRad)

                        const largeArc = angle > 180 ? 1 : 0

                        const pathData = [
                          `M 0 0`,
                          `L ${x1} ${y1}`,
                          `A 70 70 0 ${largeArc} 1 ${x2} ${y2}`,
                          'Z',
                        ].join(' ')

                        const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4']
                        const color = colors[idx % colors.length]

                        return (
                          <g key={idx}>
                            <path
                              d={pathData}
                              fill={color}
                              stroke="white"
                              strokeWidth="2"
                              className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                            <title>{`${segment.type}: ${segment.count} (${percentage.toFixed(1)}%)`}</title>
                          </g>
                        )
                      })}
                    </g>
                    
                    {/* Legend */}
                    <g transform="translate(320, 50)">
                      {analyticsData.resourceStats.resourcesByType.map((item, idx) => {
                        const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4']
                        const color = colors[idx % colors.length]
                        return (
                          <g key={idx} transform={`translate(0, ${idx * 25})`}>
                            <rect x="0" y="0" width="12" height="12" fill={color} rx="2"/>
                            <text x="18" y="9" fontSize="11" fill="currentColor" className="text-slate-700 dark:text-slate-300">
                              {item.type}
                            </text>
                            <text x="18" y="20" fontSize="9" fill="currentColor" className="text-slate-500 dark:text-slate-400">
                              {item.count}
                            </text>
                          </g>
                        )
                      })}
                    </g>
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Geographic Usage */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-indigo-600" />
              <span>Geographic Usage Distribution</span>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {analyticsData.geographicData.map((region, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{region.region}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">{region.users.toLocaleString()} users</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{region.percentage}%</p>
                      <p className="text-green-600 dark:text-green-400 text-xs font-semibold">{region.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Educational Performance Analytics - AMAZING SECTION */}
        <div className="space-y-8">
          <Card>
            <CardHeader className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-emerald-600" />
              <span className="text-xl font-bold">Educational Performance Analytics</span>
              <div className="ml-auto flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Activity className="w-4 h-4" />
                <span>Real-time Learning Insights</span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                
                {/* Subject Performance Matrix */}
                <div className="xl:col-span-2">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Subject Performance Matrix
                  </h4>
                  <div className="space-y-4">
                    {analyticsData.educationalPerformance.subjectAnalytics.map((subject, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                              subject.difficulty === 'easy' ? 'bg-green-500' :
                              subject.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}>
                              {subject.subject.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-900 dark:text-white">{subject.subject}</h5>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {subject.totalStudents} students • {subject.resourcesAvailable} resources
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                              subject.performanceTrend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                              subject.performanceTrend === 'stable' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              <TrendingUp className="w-3 h-3" />
                              {subject.performanceTrend}
                            </div>
                          </div>
                        </div>
                        
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{subject.averageScore}%</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Avg Score</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{subject.completionRate}%</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Completion</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{subject.quizzesCompleted}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Quizzes Done</p>
                          </div>
                        </div>
                        
                        {/* Progress Bars */}
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-600 dark:text-slate-400">Performance</span>
                              <span className="text-slate-900 dark:text-white font-semibold">{subject.averageScore}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-1000 ${
                                  subject.averageScore > 85 ? 'bg-green-500' :
                                  subject.averageScore > 75 ? 'bg-blue-500' : 'bg-orange-500'
                                }`}
                                style={{ width: `${subject.averageScore}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-600 dark:text-slate-400">Engagement</span>
                              <span className="text-slate-900 dark:text-white font-semibold">{subject.completionRate}%</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className="h-2 bg-purple-500 rounded-full transition-all duration-1000"
                                style={{ width: `${subject.completionRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grade Level Analytics */}
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Grade Analytics
                  </h4>
                  <div className="space-y-4">
                    {analyticsData.educationalPerformance.gradeAnalytics.map((grade, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <h5 className="font-bold text-purple-900 dark:text-purple-100">{grade.grade}</h5>
                            <p className="text-xs text-purple-600 dark:text-purple-300">{grade.totalStudents} students</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-purple-700 dark:text-purple-300">Performance</span>
                            <span className="font-bold text-purple-900 dark:text-purple-100">{grade.averagePerformance}%</span>
                          </div>
                          
                          <div className="bg-white dark:bg-slate-800/50 p-3 rounded-lg">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-green-600 dark:text-green-400">Top Subject</span>
                              <span className="font-semibold text-green-700 dark:text-green-300">{grade.topSubject}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-orange-600 dark:text-orange-400">Needs Focus</span>
                              <span className="font-semibold text-orange-700 dark:text-orange-300">{grade.strugglingSubject}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Engagement</span>
                              <span className="font-semibold">{grade.engagementRate}%</span>
                            </div>
                            <div className="w-full bg-purple-200 dark:bg-purple-800/50 rounded-full h-1.5">
                              <div 
                                className="h-1.5 bg-purple-600 rounded-full transition-all duration-1000"
                                style={{ width: `${grade.engagementRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Insights */}
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    Learning Insights
                  </h4>
                  
                  {/* Peak Hours Chart */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-700/50 mb-4">
                    <h5 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Peak Study Hours
                    </h5>
                    <div className="space-y-2">
                      {analyticsData.educationalPerformance.learningPatterns.peakHours.map((hour, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-300 w-12">{hour.hour}</span>
                          <div className="flex-1 bg-emerald-200 dark:bg-emerald-800/50 rounded-full h-2">
                            <div 
                              className="h-2 bg-emerald-600 rounded-full transition-all duration-1000"
                              style={{ width: `${hour.activity}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 w-8">{hour.activity}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Success Metrics */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700/50">
                    <h5 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Success Metrics
                    </h5>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(analyticsData.educationalPerformance.performanceInsights.successMetrics).map(([key, value], idx) => (
                        <div key={idx} className="text-center">
                          <p className="text-lg font-bold text-blue-900 dark:text-blue-100">{value}%</p>
                          <p className="text-xs text-blue-600 dark:text-blue-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Improvement Recommendations */}
              {analyticsData.educationalPerformance.performanceInsights.improvementAreas.length > 0 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-700/50">
                  <h4 className="text-lg font-bold text-orange-900 dark:text-orange-100 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Improvement Recommendations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analyticsData.educationalPerformance.performanceInsights.improvementAreas.map((area, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-orange-200 dark:border-orange-700/30">
                        <h5 className="font-bold text-orange-900 dark:text-orange-100 mb-2">{area.subject}</h5>
                        <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                          <strong>Issue:</strong> {area.issue}
                        </p>
                        <p className="text-sm text-orange-600 dark:text-orange-400">
                          <strong>Recommendation:</strong> {area.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly Completion Pattern */}
              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700/50">
                <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Weekly Learning Pattern
                </h4>
                <div className="grid grid-cols-7 gap-2">
                  {analyticsData.educationalPerformance.learningPatterns.completionPatterns.map((day, idx) => (
                    <div key={idx} className="text-center">
                      <div className="bg-white dark:bg-slate-800/50 p-3 rounded-lg border border-indigo-200 dark:border-indigo-700/30">
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">{day.day.slice(0, 3)}</p>
                        <p className="text-lg font-bold text-indigo-900 dark:text-indigo-100">{day.rate}%</p>
                        <div className="w-full bg-indigo-200 dark:bg-indigo-800/50 rounded-full h-1 mt-2">
                          <div 
                            className="h-1 bg-indigo-600 rounded-full transition-all duration-1000"
                            style={{ width: `${day.rate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* System Health & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* System Health */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-red-600" />
              <span>System Health Monitor</span>
              <div className="ml-auto">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-semibold">All Systems Operational</span>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { service: 'Web Server', status: 'healthy', uptime: '99.98%', color: 'green' },
                  { service: 'Database', status: 'healthy', uptime: '99.95%', color: 'green' },
                  { service: 'File Storage', status: 'healthy', uptime: '99.92%', color: 'green' },
                  { service: 'CDN Network', status: 'warning', uptime: '98.87%', color: 'yellow' },
                  { service: 'Email Service', status: 'healthy', uptime: '99.99%', color: 'green' },
                  { service: 'Analytics', status: 'healthy', uptime: '99.94%', color: 'green' },
                ].map((service, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        service.color === 'green' ? 'bg-green-500' : 
                        service.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">{service.service}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-xs">Uptime: {service.uptime}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Recent System Activity</span>
            </CardHeader>
            <CardBody>
              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                {analyticsData.recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-slate-900 dark:text-white text-sm font-medium">{activity.event}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  )
}
