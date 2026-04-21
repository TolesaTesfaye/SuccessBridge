import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Loading } from '@components/common/Loading'
import { userService } from '@services/userService'
import { resourceService } from '@services/resourceService'
import { universityService } from '@services/universityService'
import { departmentService } from '@services/departmentService'

interface AnalyticsData {
  totalUsers: number
  totalStudents: number
  totalAdmins: number
  totalUniversities: number
  totalDepartments: number
  totalResources: number
  resourcesByType: { type: string; count: number }[]
  resourcesByLevel: { level: string; count: number }[]
  usersByStudentType: { type: string; count: number }[]
  recentUsers: number
  recentResources: number
}

export const SuperAdminAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalStudents: 0,
    totalAdmins: 0,
    totalUniversities: 0,
    totalDepartments: 0,
    totalResources: 0,
    resourcesByType: [],
    resourcesByLevel: [],
    usersByStudentType: [],
    recentUsers: 0,
    recentResources: 0
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)

      // Fetch all data in parallel
      const [usersRes, resourcesRes, universitiesRes, departmentsRes] = await Promise.all([
        userService.getAllUsers(1, 10000),
        resourceService.getResources({ limit: 10000 } as any),
        universityService.getUniversities(),
        departmentService.getAll()
      ])

      const users = usersRes.data || []
      const resources = resourcesRes.data?.data || []
      const universities = Array.isArray(universitiesRes) ? universitiesRes : (universitiesRes.data || [])
      const departments = Array.isArray(departmentsRes) ? departmentsRes : ((departmentsRes as any).data || [])

      // Calculate user statistics
      const totalStudents = users.filter((u: any) => u.role === 'student').length
      const totalAdmins = users.filter((u: any) => u.role === 'admin' || u.role === 'super_admin').length

      // Calculate recent users (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const recentUsers = users.filter((u: any) => new Date(u.createdAt) > thirtyDaysAgo).length

      // Calculate recent resources (last 30 days)
      const recentResources = resources.filter((r: any) => new Date(r.createdAt) > thirtyDaysAgo).length

      // Group resources by type
      const typeMap = new Map<string, number>()
      resources.forEach((r: any) => {
        const type = r.type || 'unknown'
        typeMap.set(type, (typeMap.get(type) || 0) + 1)
      })
      const resourcesByType = Array.from(typeMap.entries()).map(([type, count]) => ({ type, count }))

      // Group resources by education level
      const levelMap = new Map<string, number>()
      resources.forEach((r: any) => {
        const level = r.educationLevel || 'unknown'
        levelMap.set(level, (levelMap.get(level) || 0) + 1)
      })
      const resourcesByLevel = Array.from(levelMap.entries()).map(([level, count]) => ({ level, count }))

      // Group users by student type
      const studentTypeMap = new Map<string, number>()
      users.filter((u: any) => u.role === 'student').forEach((u: any) => {
        const type = u.studentType || 'unknown'
        studentTypeMap.set(type, (studentTypeMap.get(type) || 0) + 1)
      })
      const usersByStudentType = Array.from(studentTypeMap.entries()).map(([type, count]) => ({ type, count }))

      setAnalytics({
        totalUsers: users.length,
        totalStudents,
        totalAdmins,
        totalUniversities: universities.length,
        totalDepartments: departments.length,
        totalResources: resources.length,
        resourcesByType,
        resourcesByLevel,
        usersByStudentType,
        recentUsers,
        recentResources
      })
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Analytics" subtitle="Platform-wide analytics and insights">
        <Loading message="Loading analytics data..." />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Analytics" subtitle="Platform-wide analytics and insights">
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 font-semibold">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{analytics.totalUsers}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">+{analytics.recentUsers} this month</p>
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
                  <p className="text-sm text-gray-500 dark:text-slate-400 font-semibold">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{analytics.totalStudents}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Active learners</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-2xl">
                  🎓
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 font-semibold">Total Resources</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{analytics.totalResources}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">+{analytics.recentResources} this month</p>
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
                  <p className="text-sm text-gray-500 dark:text-slate-400 font-semibold">Universities</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{analytics.totalUniversities}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{analytics.totalDepartments} departments</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-2xl">
                  🏫
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* User Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>Students by Type</CardHeader>
            <CardBody>
              {analytics.usersByStudentType.length > 0 ? (
                <div className="space-y-4">
                  {analytics.usersByStudentType.map(({ type, count }) => {
                    const percentage = ((count / analytics.totalStudents) * 100).toFixed(1)
                    return (
                      <div key={type}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700 dark:text-slate-300 capitalize">
                            {type.replace('_', ' ')}
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                          <div
                            className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-slate-400 py-8">No student data available</p>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>User Roles Distribution</CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Students</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {analytics.totalStudents} ({((analytics.totalStudents / analytics.totalUsers) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-green-600 dark:bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(analytics.totalStudents / analytics.totalUsers) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Admins</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {analytics.totalAdmins} ({((analytics.totalAdmins / analytics.totalUsers) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-purple-600 dark:bg-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(analytics.totalAdmins / analytics.totalUsers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Resource Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>Resources by Type</CardHeader>
            <CardBody>
              {analytics.resourcesByType.length > 0 ? (
                <div className="space-y-4">
                  {analytics.resourcesByType.map(({ type, count }) => {
                    const percentage = ((count / analytics.totalResources) * 100).toFixed(1)
                    return (
                      <div key={type}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700 dark:text-slate-300 capitalize">
                            {type.replace('_', ' ')}
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                          <div
                            className="bg-purple-600 dark:bg-purple-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-slate-400 py-8">No resource data available</p>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>Resources by Education Level</CardHeader>
            <CardBody>
              {analytics.resourcesByLevel.length > 0 ? (
                <div className="space-y-4">
                  {analytics.resourcesByLevel.map(({ level, count }) => {
                    const percentage = ((count / analytics.totalResources) * 100).toFixed(1)
                    return (
                      <div key={level}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700 dark:text-slate-300 capitalize">
                            {level.replace('_', ' ')}
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                          <div
                            className="bg-orange-600 dark:bg-orange-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-slate-400 py-8">No resource data available</p>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Summary Stats */}
        <Card>
          <CardHeader>Platform Summary</CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-slate-400 font-semibold mb-2">Average Resources per University</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {analytics.totalUniversities > 0 ? Math.round(analytics.totalResources / analytics.totalUniversities) : 0}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-slate-400 font-semibold mb-2">Average Students per University</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {analytics.totalUniversities > 0 ? Math.round(analytics.totalStudents / analytics.totalUniversities) : 0}
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-slate-400 font-semibold mb-2">Average Departments per University</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {analytics.totalUniversities > 0 ? Math.round(analytics.totalDepartments / analytics.totalUniversities) : 0}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
