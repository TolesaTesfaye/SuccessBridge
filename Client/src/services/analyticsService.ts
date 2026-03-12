import { userService } from './userService'
import { resourceService } from './resourceService'
import { quizService } from './quizService'

export interface EducationalPerformance {
  subjectAnalytics: Array<{
    subject: string
    subjectId: string
    totalStudents: number
    averageScore: number
    completionRate: number
    resourcesAvailable: number
    quizzesCompleted: number
    performanceTrend: 'up' | 'down' | 'stable'
    difficulty: 'easy' | 'medium' | 'hard'
  }>
  gradeAnalytics: Array<{
    grade: string
    totalStudents: number
    averagePerformance: number
    topSubject: string
    strugglingSubject: string
    engagementRate: number
    resourceUtilization: number
  }>
  learningPatterns: {
    peakHours: Array<{ hour: string; activity: number }>
    studyDuration: { average: number; trend: string }
    preferredResourceTypes: Array<{ type: string; usage: number }>
    completionPatterns: Array<{ day: string; rate: number }>
  }
  performanceInsights: {
    topPerformers: Array<{ grade: string; subject: string; score: number }>
    improvementAreas: Array<{ subject: string; issue: string; recommendation: string }>
    successMetrics: {
      overallSatisfaction: number
      knowledgeRetention: number
      skillDevelopment: number
      examReadiness: number
    }
  }
}

export interface AnalyticsData {
  userStats: {
    totalUsers: number
    activeStudents: number
    totalAdmins: number
    newUsersThisWeek: number
    userGrowthData: Array<{ label: string; value: number; activeUsers: number }>
    usersByRole: Array<{ role: string; count: number }>
    usersByEducationLevel: Array<{ level: string; count: number }>
  }
  resourceStats: {
    totalResources: number
    resourcesByType: Array<{ type: string; count: number }>
    resourcesBySubject: Array<{ subject: string; count: number }>
    resourcesAccessedThisMonth: number
    uploadTrend: Array<{ label: string; value: number }>
  }
  quizStats: {
    totalQuizzes: number
    quizzesCompleted: number
    averageScore: number
    completionRate: number
    subjectPerformance: Array<{ subject: string; averageScore: number; totalQuizzes: number }>
    quizTrend: Array<{ label: string; completed: number; average: number }>
  }
  educationalPerformance: EducationalPerformance
  systemStats: {
    serverResponseTime: number
    databasePerformance: number
    cdnEfficiency: number
    apiSuccessRate: number
    userSatisfaction: number
    systemHealth: Array<{ service: string; status: 'healthy' | 'warning' | 'error'; uptime: string }>
  }
  geographicData: Array<{
    region: string
    users: number
    percentage: number
    growth: string
  }>
  recentActivity: Array<{
    time: string
    event: string
    type: 'info' | 'success' | 'warning' | 'error'
  }>
}

export const analyticsService = {
  // Get comprehensive analytics data
  getAnalytics: async (timeRange: string = 'month'): Promise<AnalyticsData> => {
    try {
      // Fetch all data in parallel
      const [usersData, resourcesData, quizzesData] = await Promise.all([
        userService.getAllUsers(1, 1000), // Get all users for analytics
        resourceService.getResources({ limit: 1000 }), // Get all resources
        quizService.getAll(), // Get all quizzes
      ])

      const users = usersData.data || []
      const resources = resourcesData.data?.data || []
      const quizzes = quizzesData || []

      // Get educational performance data
      const educationalPerformance = await analyticsService.getEducationalPerformance(users, resources, quizzes)

      // Process user statistics
      const totalUsers = users.length
      const activeStudents = users.filter(u => u.role === 'student').length
      const totalAdmins = users.filter(u => u.role === 'admin' || u.role === 'super_admin').length
      
      // Simulate user growth data (in real app, this would come from database with timestamps)
      const userGrowthData = generateGrowthData(totalUsers, timeRange)
      
      // User distribution by role
      const usersByRole = [
        { role: 'Students', count: users.filter(u => u.role === 'student').length },
        { role: 'Admins', count: users.filter(u => u.role === 'admin').length },
        { role: 'Super Admins', count: users.filter(u => u.role === 'super_admin').length },
      ].filter(item => item.count > 0)

      // User distribution by education level
      const highSchoolUsers = users.filter(u => u.studentType === 'high_school').length
      const universityUsers = users.filter(u => u.studentType === 'university').length
      const usersByEducationLevel = [
        { level: 'High School', count: highSchoolUsers },
        { level: 'University', count: universityUsers },
      ].filter(item => item.count > 0)

      // Process resource statistics
      const totalResources = resources.length
      
      // Resources by type
      const resourceTypeMap = new Map<string, number>()
      resources.forEach(resource => {
        const type = resource.type || 'Other'
        resourceTypeMap.set(type, (resourceTypeMap.get(type) || 0) + 1)
      })
      const resourcesByType = Array.from(resourceTypeMap.entries()).map(([type, count]) => ({ type, count }))

      // Resources by subject
      const resourceSubjectMap = new Map<string, number>()
      resources.forEach(resource => {
        const subject = resource.subjectId || 'Other'
        resourceSubjectMap.set(subject, (resourceSubjectMap.get(subject) || 0) + 1)
      })
      const resourcesBySubject = Array.from(resourceSubjectMap.entries()).map(([subject, count]) => ({ subject, count }))

      // Process quiz statistics
      const totalQuizzes = quizzes.length
      
      // Simulate quiz completion data (in real app, this would come from quiz results)
      const quizzesCompleted = Math.floor(totalQuizzes * 0.75) // 75% completion rate
      const averageScore = 82.5 // Simulated average
      const completionRate = totalQuizzes > 0 ? (quizzesCompleted / totalQuizzes) * 100 : 0

      // Subject performance (simulated based on available subjects)
      const subjects = Array.from(new Set(resources.map(r => r.subjectId).filter(Boolean)))
      const subjectPerformance = subjects.map(subject => ({
        subject: subject!,
        averageScore: Math.floor(Math.random() * 20) + 75, // Random score between 75-95
        totalQuizzes: Math.floor(Math.random() * 10) + 5, // Random quiz count
      }))

      // Geographic data (Ethiopian regions)
      const geographicData = [
        { region: 'Addis Ababa', users: Math.floor(totalUsers * 0.288), percentage: 28.8, growth: '+12%' },
        { region: 'Oromia Region', users: Math.floor(totalUsers * 0.248), percentage: 24.8, growth: '+18%' },
        { region: 'Amhara Region', users: Math.floor(totalUsers * 0.205), percentage: 20.5, growth: '+15%' },
        { region: 'Tigray Region', users: Math.floor(totalUsers * 0.117), percentage: 11.7, growth: '+8%' },
        { region: 'SNNP Region', users: Math.floor(totalUsers * 0.097), percentage: 9.7, growth: '+22%' },
        { region: 'Other Regions', users: Math.floor(totalUsers * 0.045), percentage: 4.5, growth: '+10%' },
      ]

      // System health (simulated)
      const systemHealth = [
        { service: 'Web Server', status: 'healthy' as const, uptime: '99.98%' },
        { service: 'Database', status: 'healthy' as const, uptime: '99.95%' },
        { service: 'File Storage', status: 'healthy' as const, uptime: '99.92%' },
        { service: 'CDN Network', status: 'warning' as const, uptime: '98.87%' },
        { service: 'Email Service', status: 'healthy' as const, uptime: '99.99%' },
        { service: 'Analytics', status: 'healthy' as const, uptime: '99.94%' },
      ]

      // Recent activity (simulated)
      const recentActivity = [
        { time: '2 min ago', event: `New user registration: ${users.length} total users`, type: 'info' as const },
        { time: '5 min ago', event: 'Database backup completed successfully', type: 'success' as const },
        { time: '12 min ago', event: `High traffic on resources: ${totalResources} available`, type: 'info' as const },
        { time: '18 min ago', event: 'CDN cache refresh initiated', type: 'warning' as const },
        { time: '25 min ago', event: `Quiz completion rate: ${completionRate.toFixed(1)}%`, type: 'success' as const },
        { time: '32 min ago', event: `New admin user created: ${totalAdmins} total admins`, type: 'info' as const },
        { time: '45 min ago', event: 'Server maintenance completed', type: 'success' as const },
        { time: '1 hr ago', event: 'Resource upload limit reached for user', type: 'warning' as const },
      ]

      return {
        userStats: {
          totalUsers,
          activeStudents,
          totalAdmins,
          newUsersThisWeek: Math.floor(totalUsers * 0.05), // 5% growth simulation
          userGrowthData,
          usersByRole,
          usersByEducationLevel,
        },
        resourceStats: {
          totalResources,
          resourcesByType,
          resourcesBySubject,
          resourcesAccessedThisMonth: Math.floor(totalResources * 2.5), // Simulated access count
          uploadTrend: generateUploadTrend(totalResources, timeRange),
        },
        quizStats: {
          totalQuizzes,
          quizzesCompleted,
          averageScore,
          completionRate,
          subjectPerformance,
          quizTrend: generateQuizTrend(timeRange),
        },
        educationalPerformance,
        systemStats: {
          serverResponseTime: 127,
          databasePerformance: 99.8,
          cdnEfficiency: 94.2,
          apiSuccessRate: 99.9,
          userSatisfaction: 4.8,
          systemHealth,
        },
        geographicData,
        recentActivity,
      }
    } catch (error) {
      console.error('Failed to fetch analytics data:', error)
      throw error
    }
  },

  // Get comprehensive educational performance analytics
  getEducationalPerformance: async (users: any[], resources: any[], quizzes: any[]): Promise<EducationalPerformance> => {
    try {
      // Analyze subjects based on real resources and quizzes
      const subjectMap = new Map<string, any>()
      
      // Process resources by subject
      resources.forEach(resource => {
        const subjectId = resource.subjectId || 'unknown'
        if (!subjectMap.has(subjectId)) {
          subjectMap.set(subjectId, {
            subjectId,
            subject: subjectId, // In real app, would resolve subject name
            resourceCount: 0,
            quizCount: 0,
          })
        }
        const subject = subjectMap.get(subjectId)!
        subject.resourceCount++
      })

      // Process quizzes by subject
      quizzes.forEach(quiz => {
        const subjectId = quiz.subjectId || 'unknown'
        if (subjectMap.has(subjectId)) {
          const subject = subjectMap.get(subjectId)!
          subject.quizCount++
        }
      })

      // Generate subject analytics with real data
      const subjectAnalytics = Array.from(subjectMap.values()).map(subject => {
        const studentCount = Math.floor(Math.random() * 100) + 20 // Simulated student count
        const averageScore = Math.floor(Math.random() * 25) + 70 // 70-95 range
        const completionRate = Math.floor(Math.random() * 30) + 65 // 65-95 range
        
        return {
          subject: subject.subject,
          subjectId: subject.subjectId,
          totalStudents: studentCount,
          averageScore,
          completionRate,
          resourcesAvailable: subject.resourceCount,
          quizzesCompleted: Math.floor(studentCount * (completionRate / 100)),
          performanceTrend: averageScore > 80 ? 'up' as const : averageScore > 70 ? 'stable' as const : 'down' as const,
          difficulty: averageScore > 85 ? 'easy' as const : averageScore > 75 ? 'medium' as const : 'hard' as const
        }
      })

      // Grade level analytics based on real users
      const gradeMap = new Map<string, any>()
      const students = users.filter(u => u.role === 'student')
      
      students.forEach(student => {
        let grade = 'Unknown'
        if (student.studentType === 'high_school') {
          grade = student.highSchoolGrade || 'High School'
        } else if (student.studentType === 'university') {
          grade = student.universityLevel || 'University'
        }
        
        if (!gradeMap.has(grade)) {
          gradeMap.set(grade, {
            grade,
            students: [],
          })
        }
        gradeMap.get(grade)!.students.push(student)
      })

      const gradeAnalytics = Array.from(gradeMap.entries()).map(([grade, data]) => {
        const studentCount = data.students.length
        const averagePerformance = Math.floor(Math.random() * 20) + 75 // 75-95
        const engagementRate = Math.floor(Math.random() * 25) + 70 // 70-95
        const resourceUtilization = Math.floor(Math.random() * 30) + 65 // 65-95
        
        // Find top and struggling subjects for this grade
        const gradeSubjects = subjectAnalytics.slice(0, 3) // Top 3 subjects
        const topSubject = gradeSubjects[0]?.subject || 'Mathematics'
        const strugglingSubject = gradeSubjects[gradeSubjects.length - 1]?.subject || 'Physics'
        
        return {
          grade,
          totalStudents: studentCount,
          averagePerformance,
          topSubject,
          strugglingSubject,
          engagementRate,
          resourceUtilization
        }
      })

      // Learning patterns analysis
      const learningPatterns = {
        peakHours: [
          { hour: '08:00', activity: 15 },
          { hour: '10:00', activity: 25 },
          { hour: '14:00', activity: 35 },
          { hour: '16:00', activity: 45 },
          { hour: '19:00', activity: 85 }, // Peak evening study
          { hour: '20:00', activity: 95 }, // Highest activity
          { hour: '21:00', activity: 75 },
          { hour: '22:00', activity: 40 },
        ],
        studyDuration: {
          average: 42, // minutes
          trend: '+8% from last month'
        },
        preferredResourceTypes: resources.reduce((acc: any[], resource) => {
          const existing = acc.find(item => item.type === resource.type)
          if (existing) {
            existing.usage++
          } else {
            acc.push({ type: resource.type, usage: 1 })
          }
          return acc
        }, []).sort((a, b) => b.usage - a.usage).slice(0, 5),
        completionPatterns: [
          { day: 'Monday', rate: 78 },
          { day: 'Tuesday', rate: 82 },
          { day: 'Wednesday', rate: 85 },
          { day: 'Thursday', rate: 88 },
          { day: 'Friday', rate: 75 },
          { day: 'Saturday', rate: 65 },
          { day: 'Sunday', rate: 70 },
        ]
      }

      // Performance insights
      const performanceInsights = {
        topPerformers: gradeAnalytics.slice(0, 3).map(grade => ({
          grade: grade.grade,
          subject: grade.topSubject,
          score: grade.averagePerformance
        })),
        improvementAreas: subjectAnalytics
          .filter(subject => subject.averageScore < 80)
          .map(subject => ({
            subject: subject.subject,
            issue: subject.averageScore < 70 ? 'Low comprehension rate' : 'Moderate engagement',
            recommendation: subject.averageScore < 70 
              ? 'Increase interactive content and peer support' 
              : 'Add more practice materials and assessments'
          })),
        successMetrics: {
          overallSatisfaction: 87.3,
          knowledgeRetention: 82.1,
          skillDevelopment: 79.8,
          examReadiness: 85.4
        }
      }

      return {
        subjectAnalytics,
        gradeAnalytics,
        learningPatterns,
        performanceInsights
      }
    } catch (error) {
      console.error('Failed to get educational performance data:', error)
      throw error
    }
  },

  // Get real-time system metrics
  getSystemMetrics: async (): Promise<any> => {
    try {
      // In a real app, this would call system monitoring APIs
      return {
        serverResponseTime: Math.floor(Math.random() * 50) + 100, // 100-150ms
        activeConnections: Math.floor(Math.random() * 1000) + 500,
        memoryUsage: Math.floor(Math.random() * 30) + 60, // 60-90%
        cpuUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
        diskUsage: Math.floor(Math.random() * 20) + 70, // 70-90%
      }
    } catch (error) {
      console.error('Failed to fetch system metrics:', error)
      throw error
    }
  },
}

// Helper functions to generate trend data
function generateGrowthData(totalUsers: number, timeRange: string) {
  const periods = timeRange === 'year' ? 12 : timeRange === 'quarter' ? 3 : timeRange === 'week' ? 7 : 8
  const data = []
  
  for (let i = 0; i < periods; i++) {
    const baseUsers = Math.floor((totalUsers / periods) * (i + 1))
    const variance = Math.floor(Math.random() * (totalUsers * 0.1))
    const users = Math.max(baseUsers + variance - (totalUsers * 0.05), 0)
    const activeUsers = Math.floor(users * 0.8) // 80% active rate
    
    let label = ''
    if (timeRange === 'year') {
      label = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]
    } else if (timeRange === 'week') {
      label = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]
    } else {
      label = `Period ${i + 1}`
    }
    
    data.push({ label, value: users, activeUsers })
  }
  
  return data
}

function generateUploadTrend(totalResources: number, timeRange: string) {
  const periods = timeRange === 'year' ? 12 : 8
  const data = []
  
  for (let i = 0; i < periods; i++) {
    const uploads = Math.floor((totalResources / periods) * Math.random() * 2)
    const label = timeRange === 'year' 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]
      : `Week ${i + 1}`
    
    data.push({ label, value: uploads })
  }
  
  return data
}

function generateQuizTrend(timeRange: string) {
  const periods = timeRange === 'year' ? 12 : 8
  const data = []
  
  for (let i = 0; i < periods; i++) {
    const completed = Math.floor(Math.random() * 100) + 50
    const average = Math.floor(Math.random() * 20) + 75
    const label = timeRange === 'year' 
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]
      : `Week ${i + 1}`
    
    data.push({ label, completed, average })
  }
  
  return data
}