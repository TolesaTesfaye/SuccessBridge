import React, { useState, useEffect } from "react";
import { Users, BookOpen, TrendingUp, Award, Calendar, Target, BarChart3, PieChart } from "lucide-react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { StatCard } from "@components/analytics/StatCard";
import { AnalyticsChart } from "@components/analytics/AnalyticsChart";
import { userService } from "@services/userService";
import { resourceService } from "@services/resourceService";

type HighSchoolGrade = "grade_9" | "grade_10" | "grade_11" | "grade_12";

interface HighSchoolGradeDashboardProps {
  grade: HighSchoolGrade;
}

interface GradeStats {
  totalStudents: number;
  activeStudents: number;
  totalResources: number;
  completedAssignments: number;
  averageScore: number;
  monthlyGrowth: number;
  topPerformers: any[];
  recentActivity: any[];
  subjectDistribution: any[];
  performanceData: any[];
}

export const HighSchoolGradeDashboard: React.FC<HighSchoolGradeDashboardProps> = ({
  grade,
}) => {
  const [stats, setStats] = useState<GradeStats>({
    totalStudents: 0,
    activeStudents: 0,
    totalResources: 0,
    completedAssignments: 0,
    averageScore: 0,
    monthlyGrowth: 0,
    topPerformers: [],
    recentActivity: [],
    subjectDistribution: [],
    performanceData: [],
  });
  const [loading, setLoading] = useState(true);

  const gradeLabels = {
    grade_9: "Grade 9",
    grade_10: "Grade 10", 
    grade_11: "Grade 11",
    grade_12: "Grade 12",
  };

  const gradeNumbers = {
    grade_9: "9",
    grade_10: "10",
    grade_11: "11", 
    grade_12: "12",
  };

  useEffect(() => {
    fetchGradeStats();
  }, [grade]);

  const fetchGradeStats = async () => {
    setLoading(true);
    try {
      // Fetch students for this grade
      const usersResponse = await userService.getAllUsers();
      const allUsers = Array.isArray(usersResponse) ? usersResponse : usersResponse.data || [];
      
      const gradeStudents = allUsers.filter((user: any) => 
        user.role === "student" && 
        user.educationLevel === "High School" &&
        user.grade === gradeNumbers[grade]
      );

      // Fetch resources for this grade
      const resourcesResponse = await resourceService.getResources({
        educationLevel: "high_school",
        grade: gradeNumbers[grade],
      });
      const gradeResources = Array.isArray(resourcesResponse) 
        ? resourcesResponse 
        : resourcesResponse.data?.data || [];

      // Mock additional data (replace with real API calls)
      const mockStats = {
        totalStudents: gradeStudents.length,
        activeStudents: gradeStudents.filter((s: any) => s.status === "Active").length,
        totalResources: gradeResources.length,
        completedAssignments: Math.floor(gradeStudents.length * 0.75),
        averageScore: 78 + Math.floor(Math.random() * 15),
        monthlyGrowth: Math.floor(Math.random() * 20) + 5,
        topPerformers: gradeStudents.slice(0, 5).map((student: any, index: number) => ({
          id: student.id,
          name: student.name,
          score: 95 - index * 3,
          subject: ["Math", "Science", "English", "History", "Physics"][index],
        })),
        recentActivity: [
          { type: "assignment", student: "John Doe", action: "Completed Math Quiz", time: "2 hours ago" },
          { type: "resource", student: "Jane Smith", action: "Downloaded Physics Notes", time: "4 hours ago" },
          { type: "quiz", student: "Mike Johnson", action: "Started Chemistry Test", time: "6 hours ago" },
          { type: "assignment", student: "Sarah Wilson", action: "Submitted History Essay", time: "1 day ago" },
        ],
        subjectDistribution: [
          { label: "Mathematics", value: 25, color: "#3B82F6" },
          { label: "Science", value: 20, color: "#10B981" },
          { label: "English", value: 18, color: "#F59E0B" },
          { label: "History", value: 15, color: "#EF4444" },
          { label: "Geography", value: 12, color: "#8B5CF6" },
          { label: "Others", value: 10, color: "#6B7280" },
        ],
        performanceData: [
          { label: "Jan", value: 72 },
          { label: "Feb", value: 75 },
          { label: "Mar", value: 78 },
          { label: "Apr", value: 81 },
          { label: "May", value: 79 },
          { label: "Jun", value: 83 },
        ],
      };

      setStats(mockStats);
    } catch (error) {
      console.error("Failed to fetch grade stats:", error);
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
            {gradeLabels[grade]} Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive overview of {gradeLabels[grade]} students and performance
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
            percentage: stats.monthlyGrowth
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
            percentage: 12
          }}
          color="#8B5CF6"
        />
        <StatCard
          label="Average Score"
          value={`${stats.averageScore}%`}
          icon={<Award className="w-6 h-6" style={{ color: '#F59E0B' }} />}
          trend={{
            direction: "up",
            percentage: 5
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
            Performance Trend
          </CardHeader>
          <CardBody>
            <AnalyticsChart
              title=""
              data={stats.performanceData}
              type="line"
            />
          </CardBody>
        </Card>

        {/* Subject Distribution */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Subject Distribution
          </CardHeader>
          <CardBody>
            <AnalyticsChart
              title=""
              data={stats.subjectDistribution}
              type="pie"
            />
          </CardBody>
        </Card>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Top Performers
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {stats.topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {performer.name}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {performer.subject}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 dark:text-green-400">
                      {performer.score}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Recent Activity
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
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
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>Quick Actions</CardHeader>
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
              <Award className="w-6 h-6 mb-2" />
              Create Assignment
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="w-6 h-6 mb-2" />
              Analytics Report
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};