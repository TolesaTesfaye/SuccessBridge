import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { PerformanceMetrics } from '@components/analytics/PerformanceMetrics'
import { StatCard } from '@components/analytics/StatCard'
import { progressService } from '@services/progressService'
import { Loading } from '@components/common/Loading'

export const StudentProgress: React.FC = () => {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await progressService.getStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <Loading message="Crunching your performance numbers..." />

  return (
    <DashboardLayout title="Academic Progress" subtitle="Detailed breakdown of your learning milestones">
      <div className="space-y-8 animate-fadeIn">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon="📚"
            label="Resources"
            value={stats?.resourcesAccessed || 0}
            trend={{ direction: 'up', percentage: 3 }}
          />
          <StatCard
            icon="✏️"
            label="Quizzes"
            value={stats?.quizzesCompleted || 0}
            trend={{ direction: 'up', percentage: 2 }}
          />
          <StatCard
            icon="⭐"
            label="Avg. Score"
            value={stats?.averageScore || 0}
            unit="%"
            trend={{ direction: 'up', percentage: 5 }}
          />
          <StatCard
            icon="🔥"
            label="Streak"
            value={stats?.studyStreak || 0}
            unit="days"
            trend={{ direction: 'up', percentage: 2 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subject Progress */}
          <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[32px] overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-800/20 p-8 border-none">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Subject Mastery</h3>
            </CardHeader>
            <CardBody className="p-8">
              <div className="space-y-8">
                {stats?.subjectProgress?.length > 0 ? (
                  stats.subjectProgress.map((item: any) => (
                    <div key={item.subject} className="group cursor-default">
                      <div className="flex justify-between items-end mb-3">
                        <div>
                          <span className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                            {item.subject}
                          </span>
                          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
                            {item.quizzes} Assessments Completed
                          </p>
                        </div>
                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">
                          {item.progress}<span className="text-sm ml-0.5">%</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-500 font-bold italic">Take your first quiz to start tracking subject mastery!</p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Performance Overview */}
          <div className="space-y-6">
            <PerformanceMetrics
              title="Execution metrics"
              metrics={[
                { label: 'Completion Rate', value: '85%', trend: 'up', trendValue: 5 },
                { label: 'Average Score', value: `${stats?.averageScore || 0}%`, trend: 'up', trendValue: 3 },
                { label: 'Resources Spent', value: '24/30', trend: 'up', trendValue: 2 },
                { label: 'Learning Hours', value: '42', unit: 'hrs', trend: 'up', trendValue: 8 },
              ]}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
