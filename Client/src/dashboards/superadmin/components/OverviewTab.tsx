import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { userService } from '@services/userService'
import { resourceService } from '@services/resourceService'

interface OverviewTabProps {
  stats: any
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ stats }) => {
  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [recentResources, setRecentResources] = useState<any[]>([])
  const [resourcesByType, setResourcesByType] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const [usersRes, resourcesRes] = await Promise.all([
          userService.getAllUsers(1, 5),
          resourceService.getResources({ limit: 10 })
        ])
        
        const users = Array.isArray(usersRes) ? usersRes : (usersRes.data || [])
        const resourcesData = Array.isArray(resourcesRes) ? resourcesRes : (resourcesRes.data?.data || resourcesRes.data || [])
        const resources = Array.isArray(resourcesData) ? resourcesData : []
        
        setRecentUsers(users.slice(0, 5))
        setRecentResources(resources.slice(0, 5))
        
        // Calculate resource distribution by type
        const typeCount: any = {}
        resources.forEach((r: any) => {
          typeCount[r.type] = (typeCount[r.type] || 0) + 1
        })
        setResourcesByType(typeCount)
        
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch activity data:', error)
        setLoading(false)
      }
    }

    fetchActivityData()
  }, [])

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const created = new Date(date)
    const diffMs = now.getTime() - created.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  }

  const resourceTypes = Object.keys(resourcesByType)
  const totalResourcesForChart = Object.values(resourcesByType).reduce((a: number, b: any) => a + (Number(b) || 0), 0) || 1

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Total Users</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                  {stats.loading ? '...' : stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">All platform users</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Active Students</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                  {stats.loading ? '...' : stats.activeStudents.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Enrolled students</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-2xl">
                🎓
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Total Resources</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                  {stats.loading ? '...' : stats.totalResources.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Learning materials</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-2xl">
                📚
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Pending Approvals</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                  {stats.loading ? '...' : stats.pendingApprovals}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Awaiting review</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-2xl">
                ⏳
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Activity & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">⚡</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">Live Activity Feed</span>
              </div>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">Real-time</span>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-blue-600 rounded-full"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Recent Users */}
                {recentUsers.map((user, _) => (
                  <div key={`user-${user.id}`} className="group relative flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent rounded-xl border border-blue-100 dark:border-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-md">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {user.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold rounded-full uppercase">
                          {user.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        🎉 Joined {getTimeAgo(user.createdAt)}
                      </p>
                    </div>
                    <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">👤</div>
                  </div>
                ))}
                
                {/* Recent Resources */}
                {recentResources.slice(0, 3).map((resource, _) => (
                  <div key={`resource-${resource.id}`} className="group relative flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-900/10 dark:to-transparent rounded-xl border border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-md">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                      📚
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{resource.title}</p>
                        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] font-bold rounded-full uppercase">
                          {resource.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{resource.description}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        📤 Uploaded {getTimeAgo(resource.createdAt)}
                      </p>
                    </div>
                    <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">📄</div>
                  </div>
                ))}

                {!recentUsers.length && !recentResources.length && (
                  <div className="text-center py-8 text-slate-400">
                    <p className="text-4xl mb-2">🌟</p>
                    <p className="text-sm">No recent activity yet</p>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Resource Distribution Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📊</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">Resource Types</span>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-emerald-600 rounded-full"></div>
              </div>
            ) : resourceTypes.length > 0 ? (
              <div className="space-y-4">
                {/* Donut Chart Visualization */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {resourceTypes.map((type, idx) => {
                      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
                      const percentage = totalResourcesForChart > 0 ? (resourcesByType[type] / totalResourcesForChart) * 100 : 0
                      const circumference = 2 * Math.PI * 30
                      const offset = resourceTypes.slice(0, idx).reduce((acc, t) => 
                        acc + (totalResourcesForChart > 0 ? (resourcesByType[t] / totalResourcesForChart) * circumference : 0), 0
                      )
                      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
                      
                      return (
                        <circle
                          key={type}
                          cx="50"
                          cy="50"
                          r="30"
                          fill="none"
                          stroke={colors[idx % colors.length]}
                          strokeWidth="15"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={-offset}
                          className="transition-all duration-500"
                        />
                      )
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalResources}</p>
                      <p className="text-xs text-slate-400">Total</p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2">
                  {resourceTypes.map((type, idx) => {
                    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-red-500', 'bg-purple-500', 'bg-pink-500']
                    const count = resourcesByType[type]
                    const percentage = totalResourcesForChart > 0 ? ((count / totalResourcesForChart) * 100).toFixed(1) : '0.0'
                    
                    return (
                      <div key={type} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`}></div>
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">{type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{count}</span>
                          <span className="text-xs text-slate-400">({percentage}%)</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p className="text-4xl mb-2">📦</p>
                <p className="text-sm">No resources yet</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}