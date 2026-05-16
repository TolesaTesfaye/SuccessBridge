import React, { useState, useEffect } from "react";
import { Users, BookOpen, TrendingUp, Award, Calendar, Target, BarChart3, PieChart, GraduationCap, Building } from "lucide-react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { StatCard } from "@components/analytics/StatCard";
import { AnalyticsChart } from "@components/analytics/AnalyticsChart";
import { userService } from "@services/userService";
import { resourceService } from "@services/resourceService";

type UniversityLevel = "freshman" | "remedial" | "senior" | "gc";

interface UniversityLevelDashboardProps {
  level: UniversityLevel;
}

interface LevelStats {
  totalStudents: number;
  activeStudents: number;
  totalResources: number;
  totalUniversities: number;
  averageGPA: number;
  graduationRate: number;
  topUniversities: any[];
  topPerformers: any[];
  recentActivity: any[];
  departmentDistribution: any[];
  performanceData: any[];
  universityDistribution: any[];
}

export const UniversityLevelDashboard: React.FC<UniversityLevelDashboardProps> = ({
  level,
}) => {
  const [stats, setStats] = useState<LevelStats>({
    totalStudents: 0,
    activeStudents: 0,
    totalResources: 0,
    totalUniversities: 0,
    averageGPA: 0,
    graduationRate: 0,
    topUniversities: [],
    topPerformers: [],
    recentActivity: [],
    departmentDistribution: [],
    performanceData: [],
    universityDistribution: [],
  });
  const [loading, setLoading] = useState(true);

  const levelLabels = {
    freshman: "Freshman",
    remedial: "Remedial",
    senior: "Senior",
    gc: "Graduate Class (GC)",
  };

  const levelDescriptions = {
    freshman: "First-year university students",
    remedial: "Preparatory program students",
    senior: "Final-year undergraduate students", 
    gc: "Graduate and postgraduate students",
  };

  useEffect(() => {
    fetchLevelStats();
  }, [level]);

  const fetchLevelStats = async () => {
    setLoading(true);
    try {
      // Fetch students for this level
      const usersResponse = await userService.getAllUsers();
      const allUsers = Array.isArray(usersResponse) ? usersResponse : usersResponse.data || [];
      
      const levelStudents = allUsers.filter((user: any) => 
        user.role === "student" && 
        user.educationLevel === "University" &&
        user.grade === level
      );

      // Fetch resources for this level
      const resourcesResponse = await resourceService.getResources({
        educationLevel: "university",
        grade: level,
      });
      const levelResources = Array.isArray(resourcesResponse) 
        ? resourcesResponse 
        : resourcesResponse.data?.data || [];

      // Mock additional data (replace with real API calls)
      const mockStats = {
        totalStudents: levelStudents.length,
        activeStudents: levelStudents.filter((s: any) => s.status === "Active").length,
        totalResources: levelResources.length,
        totalUniversities: 43, // Based on Ethiopian universities
        averageGPA: 3.2 + Math.random() * 0.6,
        graduationRate: 75 + Math.floor(Math.random() * 20),
        topUniversities: [
          { name: "Addis Ababa University", students: 1250, performance: 92 },
          { name: "Jimma University", students: 980, performance: 89 },
          { name: "Hawassa University", students: 875, performance: 87 },
          { name: "Bahir Dar University", students: 756, performance: 85 },
          { name: "Mekelle University", students: 643, performance: 83 },
        ],
        topPerformers: levelStudents.slice(0, 5).map((student: any, index: number) => ({
          id: student.id,
          name: student.name,
          university: student.university || "Addis Ababa University",
          gpa: (3.8 - index * 0.1).toFixed(2),
          department: student.department || ["Computer Science", "Engineering", "Medicine", "Business", "Law"][index],
        })),
        recentActivity: [
          { type: "enrollment", student: "Abebe Kebede", action: "Enrolled in Advanced Mathematics", time: "1 hour ago" },
          { type: "resource", student: "Tigist Haile", action: "Downloaded Research Methodology Guide", time: "3 hours ago" },
          { type: "exam", student: "Dawit Tesfaye", action: "Completed Midterm Examination", time: "5 hours ago" },
          { type: "project", student: "Hanan Ahmed", action: "Submitted Final Project", time: "1 day ago" },
        ],
        departmentDistribution: level === "remedial" ? [
          { label: "Natural Science", value: 45, color: "#3B82F6" },
          { label: "Social Science", value: 35, color: "#10B981" },
          { label: "General Studies", value: 20, color: "#F59E0B" },
        ] : [
          { label: "Engineering", value: 28, color: "#3B82F6" },
          { label: "Medicine", value: 22, color: "#EF4444" },
          { label: "Business", value: 18, color: "#10B981" },
          { label: "Computer Science", value: 15, color: "#8B5CF6" },
          { label: "Law", value: 10, color: "#F59E0B" },
          { label: "Others", value: 7, color: "#6B7280" },
        ],
        performanceData: [
          { label: "Jan", value: 3.1 },
          { label: "Feb", value: 3.2 },
          { label: "Mar", value: 3.3 },
          { label: "Apr", value: 3.4 },
          { label: "May", value: 3.3 },
          { label: "Jun", value: 3.5 },
        ],
        universityDistribution: [
          { name: "Addis Ababa University", students: 1250, percentage: 25 },
          { name: "Jimma University", students: 980, percentage: 20 },
          { name: "Hawassa University", students: 875, percentage: 17 },
          { name: "Bahir Dar University", students: 756, percentage: 15 },
          { name: "Others", students: 1139, percentage: 23 },
        ],
      };

      setStats(mockStats);
    } catch (error) {
      console.error("Failed to fetch level stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {levelLabels[level]} Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {levelDescriptions[level]} - Comprehensive analytics and management
          </p>
        </div>
        <Button variant="primary">
          <Calendar className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Students"
          value={stats.totalStudents}
          icon={<Users className="w-6 h-6" style={{ color: '#3B82F6' }} />}
          trend={{
            direction: "up",
            percentage: 15
          }}
          color="#3B82F6"
        />
        <StatCard
          label="Active Students"
          value={stats.activeStudents}
          icon={<TrendingUp className="w-6 h-6" style={{ color: '#10B981' }} />}
          trend={{
            direction: "up",
            percentage: Math.round((stats.activeStudents / stats.totalStudents) * 100)
          }}
          color="#10B981"
        />
        <StatCard
          label="Available Resources"
          value={stats.totalResources}
          icon={<BookOpen className="w-6 h-6" style={{ color: '#8B5CF6' }} />}
          trend={{
            direction: "up",
            percentage: 25
          }}
          color="#8B5CF6"
        />
        <StatCard
          label="Average GPA"
          value={stats.averageGPA.toFixed(2)}
          icon={<Award className="w-6 h-6" style={{ color: '#F59E0B' }} />}
          trend={{
            direction: "up",
            percentage: 2
          }}
          color="#F59E0B"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            GPA Trend & Enrollment
          </CardHeader>
          <CardBody>
            <AnalyticsChart
              title=""
              data={stats.performanceData}
              type="line"
            />
          </CardBody>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            {level === "remedial" ? "Stream Distribution" : "Department Distribution"}
          </CardHeader>
          <CardBody>
            <AnalyticsChart
              title=""
              data={stats.departmentDistribution}
              type="pie"
            />
          </CardBody>
        </Card>
      </div>

      {/* University and Performance Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Universities */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Top Universities by {levelLabels[level]} Students
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {stats.topUniversities.map((university, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {university.name}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {university.students} students
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 dark:text-green-400">
                      {university.performance}%
                    </p>
                    <p className="text-xs text-slate-500">Performance</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Top Performing Students
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {stats.topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {performer.name}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {performer.department} - {performer.university}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600 dark:text-purple-400">
                      {performer.gpa}
                    </p>
                    <p className="text-xs text-slate-500">GPA</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Recent Activity
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded-r-lg">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    <span className="font-semibold">{activity.student}</span> {activity.action}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>Quick Actions for {levelLabels[level]}</CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="w-6 h-6 mb-2" />
              View All Students
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BookOpen className="w-6 h-6 mb-2" />
              Manage Resources
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Building className="w-6 h-6 mb-2" />
              University Analytics
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              Performance Report
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};