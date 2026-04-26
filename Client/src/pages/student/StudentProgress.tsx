import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody } from '@components/common/Card'
import { PerformanceMetrics } from '@components/analytics/PerformanceMetrics'
import { StatCard } from '@components/analytics/StatCard'
import { progressService } from '@services/progressService'
import { Loading } from '@components/common/Loading'
import { Trophy, Target, BookOpen, Flame, Award, TrendingUp, Sparkles } from 'lucide-react'

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
      <div className="space-y-6 md:space-y-8 animate-fadeIn max-w-7xl mx-auto pb-12 px-2 md:px-0">
        
        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <StatCard
            icon={<BookOpen size={20} className="md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />}
            label="Resources Mastered"
            value={stats?.resourcesAccessed || 0}
            trend={{ direction: 'up', percentage: 12 }}
            color="#3b82f6"
          />
          <StatCard
            icon={<Target size={20} className="md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />}
            label="Quizzes Conquered"
            value={stats?.quizzesCompleted || 0}
            trend={{ direction: 'up', percentage: 8 }}
            color="#a855f7"
          />
          <StatCard
            icon={<Trophy size={20} className="md:w-6 md:h-6 text-amber-500 dark:text-amber-400" />}
            label="Avg. Score"
            value={stats?.averageScore || 0}
            unit="%"
            trend={{ direction: 'up', percentage: 5 }}
            color="#f59e0b"
          />
          <StatCard
            icon={<Flame size={20} className="md:w-6 md:h-6 text-orange-500 dark:text-orange-400" />}
            label="Study Streak"
            value={stats?.studyStreak || 0}
            unit="days"
            trend={{ direction: 'up', percentage: 15 }}
            color="#f97316"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Subject Mastery */}
          <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl md:rounded-[32px] overflow-hidden bg-white dark:bg-slate-900">
            <div className="px-4 py-3 md:px-8 md:py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg md:rounded-xl text-indigo-600">
                  <Award size={16} className="md:w-5 md:h-5" />
                </div>
                <h3 className="text-sm md:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Subject Mastery</h3>
              </div>
              <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-0.5 md:px-3 md:py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] md:text-xs font-bold rounded-lg uppercase tracking-wider">
                <TrendingUp size={10} className="md:w-3.5 md:h-3.5" /> Top
              </span>
            </div>
            
            <CardBody className="p-4 md:p-8">
              <div className="space-y-4 md:space-y-8">
                {stats?.subjectProgress?.length > 0 ? (
                  stats.subjectProgress.map((item: any, index: number) => {
                    // Different gradient per subject based on index
                    const gradients = [
                      "from-blue-500 to-indigo-500",
                      "from-purple-500 to-pink-500",
                      "from-emerald-400 to-teal-500",
                      "from-orange-400 to-amber-500"
                    ];
                    const barGradient = gradients[index % gradients.length];
                    
                    return (
                      <div key={item.subject} className="group cursor-default">
                        <div className="flex justify-between items-end mb-2 md:mb-3">
                          <div>
                            <span className="text-xs md:text-lg font-black text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors uppercase tracking-tight flex items-center gap-1 md:gap-2">
                              {item.subject}
                              {item.progress >= 90 && <Sparkles size={12} className="md:w-4 md:h-4 text-amber-400" />}
                            </span>
                            <p className="text-[9px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">
                              {item.quizzes} Assessments
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 dark:from-white dark:to-slate-300 tracking-tighter">
                              {item.progress}<span className="text-sm md:text-lg ml-0.5">%</span>
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 md:h-4 overflow-hidden shadow-inner relative">
                          {/* Gloss effect on progress bar */}
                          <div className="absolute top-0 left-0 right-0 h-1 md:h-1.5 bg-white/20 z-10 rounded-full"></div>
                          
                          <div
                            className={`bg-gradient-to-r ${barGradient} h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-1 md:px-2`}
                            style={{ width: `${item.progress}%` }}
                          >
                            {/* Animated dot at the end of progress */}
                            {item.progress > 5 && (
                              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full shadow-sm animate-pulse"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-8 md:py-16 px-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl md:rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <Target size={24} className="md:w-8 md:h-8" />
                    </div>
                    <h4 className="text-base md:text-xl font-bold text-slate-800 dark:text-white mb-1 md:mb-2">No Mastery Data Yet</h4>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">Take your first assessment to start tracking!</p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Performance Overview */}
          <div className="space-y-4 md:space-y-6 relative">
            <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-[40px] -z-10 blur-xl"></div>
            
            <PerformanceMetrics
              title="Execution Metrics"
              metrics={[
                { label: 'Completion Rate', value: '85%', trend: 'up', trendValue: 5 },
                { label: 'Average Score', value: `${stats?.averageScore || 0}%`, trend: 'up', trendValue: 3 },
                { label: 'Resources Spent', value: '24/30', trend: 'up', trendValue: 2 },
                { label: 'Learning Hours', value: '42', unit: 'hrs', trend: 'up', trendValue: 8 },
              ]}
            />
            
            {/* Added a decorative motivation card */}
            <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 border-none shadow-xl shadow-indigo-500/30">
              <CardBody className="p-4 md:p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles size={48} className="md:w-16 md:h-16 text-white" />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center text-white mx-auto mb-3 md:mb-4 border border-white/20">
                  <Flame size={20} className="md:w-6 md:h-6 fill-white" />
                </div>
                <h4 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2">You're on Fire!</h4>
                <p className="text-indigo-100 font-medium text-xs md:text-sm leading-relaxed">Your learning velocity is in the top 10% this week. Keep up the momentum.</p>
              </CardBody>
            </Card>
          </div>
          
        </div>
      </div>
    </DashboardLayout>
  )
}
