import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { userService } from "@services/userService";
import { resourceService } from "@services/resourceService";

interface OverviewTabProps {
  stats: any;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ stats }) => {
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentResources, setRecentResources] = useState<any[]>([]);
  const [resourcesByType, setResourcesByType] = useState<any>({});
  const [studentsByType, setStudentsByType] = useState<any>({});
  const [studentsByUniversity, setStudentsByUniversity] = useState<any>({});
  const [studentsByDepartment, setStudentsByDepartment] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const [usersRes, resourcesRes, allUsersRes] = await Promise.all([
          userService.getAllUsers(1, 5),
          resourceService.getResources({ limit: 1000 }),
          userService.getAllUsers(),
        ]);

        const users = Array.isArray(usersRes) ? usersRes : usersRes.data || [];
        const resourcesData = Array.isArray(resourcesRes)
          ? resourcesRes
          : resourcesRes.data?.data || resourcesRes.data || [];
        const resources = Array.isArray(resourcesData) ? resourcesData : [];
        
        // Get all users for student type distribution
        const allUsers = Array.isArray(allUsersRes) ? allUsersRes : allUsersRes.data || [];

        setRecentUsers(users.slice(0, 5));
        setRecentResources(resources.slice(0, 5));

        // Calculate resource distribution by type
        const typeCount: any = {};
        resources.forEach((r: any) => {
          const type = r.type || "other";
          typeCount[type] = (typeCount[type] || 0) + 1;
        });
        setResourcesByType(typeCount);

        // Calculate student distribution by education level and grade
        const studentCount: any = {
          "High School - Grade 9": 0,
          "High School - Grade 10": 0,
          "High School - Grade 11": 0,
          "High School - Grade 12": 0,
          "University - Freshman": 0,
          "University - Remedial": 0,
          "University - Senior": 0,
          "University - GC": 0,
        };
        
        console.log('📊 All users fetched:', allUsers.length);
        console.log('📊 Sample user data:', allUsers[0]);
        
        allUsers.forEach((user: any) => {
          if (user.role === "student") {
            const studentType = user.studentType?.toLowerCase();
            const highSchoolGrade = user.highSchoolGrade?.toLowerCase();
            const universityLevel = user.universityLevel?.toLowerCase();
            
            console.log('🎓 Student found:', {
              name: user.name,
              studentType,
              highSchoolGrade,
              universityLevel,
              raw: {
                studentType: user.studentType,
                highSchoolGrade: user.highSchoolGrade,
                universityLevel: user.universityLevel
              }
            });
            
            if (studentType === "high_school") {
              if (highSchoolGrade === "grade_9") {
                studentCount["High School - Grade 9"]++;
              } else if (highSchoolGrade === "grade_10") {
                studentCount["High School - Grade 10"]++;
              } else if (highSchoolGrade === "grade_11") {
                studentCount["High School - Grade 11"]++;
              } else if (highSchoolGrade === "grade_12") {
                studentCount["High School - Grade 12"]++;
              } else {
                console.warn('⚠️ High school student with unknown grade:', highSchoolGrade);
              }
            } else if (studentType === "university") {
              if (universityLevel === "freshman") {
                studentCount["University - Freshman"]++;
              } else if (universityLevel === "remedial") {
                studentCount["University - Remedial"]++;
              } else if (universityLevel === "senior") {
                studentCount["University - Senior"]++;
              } else if (universityLevel === "gc") {
                studentCount["University - GC"]++;
              } else {
                console.warn('⚠️ University student with unknown level:', universityLevel);
              }
            } else {
              console.warn('⚠️ Student with unknown type:', studentType);
            }
          }
        });
        
        console.log('📊 Final student count:', studentCount);
        setStudentsByType(studentCount);

        // Calculate university distribution
        const universityCount: any = {};
        allUsers.forEach((user: any) => {
          if (user.role === "student" && user.studentType?.toLowerCase() === "university") {
            // Get university name from the university object or universityId
            const universityName = user.university?.name || user.universityName || "Unknown University";
            universityCount[universityName] = (universityCount[universityName] || 0) + 1;
          }
        });
        console.log('🏛️ University distribution:', universityCount);
        setStudentsByUniversity(universityCount);

        // Calculate department/course distribution
        const departmentCount: any = {};
        allUsers.forEach((user: any) => {
          if (user.role === "student" && user.studentType?.toLowerCase() === "university") {
            // Get department name from the department object or departmentId
            const departmentName = user.department?.name || user.departmentName || "Undeclared";
            departmentCount[departmentName] = (departmentCount[departmentName] || 0) + 1;
          }
        });
        console.log('📚 Department distribution:', departmentCount);
        setStudentsByDepartment(departmentCount);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch activity data:", error);
        setLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const created = new Date(date);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const resourceTypes = Object.keys(resourcesByType);
  const totalResourcesForChart =
    Object.values(resourcesByType).reduce(
      (a: number, b: any) => a + (Number(b) || 0),
      0,
    ) || 1;

  const studentTypes = Object.keys(studentsByType).filter(
    (key) => studentsByType[key] > 0
  );
  const totalStudentsForChart =
    Object.values(studentsByType).reduce(
      (a: number, b: any) => a + (Number(b) || 0),
      0,
    ) || 1;

  const universities = Object.keys(studentsByUniversity).filter(
    (key) => studentsByUniversity[key] > 0
  );
  const totalUniversityStudents =
    Object.values(studentsByUniversity).reduce(
      (a: number, b: any) => a + (Number(b) || 0),
      0,
    ) || 1;

  const departments = Object.keys(studentsByDepartment).filter(
    (key) => studentsByDepartment[key] > 0
  );
  const totalDepartmentStudents =
    Object.values(studentsByDepartment).reduce(
      (a: number, b: any) => a + (Number(b) || 0),
      0,
    ) || 1;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {/* Total Users Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
                    👥
                  </div>
                  <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wide">
                    Total Users
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                  {stats.loading ? "..." : stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  All platform users
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                👥
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Active Students Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
                    🎓
                  </div>
                  <p className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wide">
                    Active Students
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-600 bg-clip-text text-transparent">
                  {stats.loading
                    ? "..."
                    : stats.activeStudents.toLocaleString()}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Enrolled students
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                🎓
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Total Resources Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
                    📚
                  </div>
                  <p className="text-xs md:text-sm text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wide">
                    Total Resources
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                  {stats.loading
                    ? "..."
                    : stats.totalResources.toLocaleString()}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Learning materials
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                📚
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Pending Approvals Card */}
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 md:hidden bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
                    ⏳
                  </div>
                  <p className="text-xs md:text-sm text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wide">
                    Pending Approvals
                  </p>
                </div>
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-orange-600 to-orange-800 dark:from-orange-400 dark:to-orange-600 bg-clip-text text-transparent">
                  {stats.loading ? "..." : stats.pendingApprovals}
                </p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Awaiting review
                </p>
              </div>
              <div className="hidden md:flex w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                ⏳
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Activity & Analytics */}
      <div className="space-y-4 md:space-y-6">
        {/* Recent Activity Timeline */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">⚡</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  Live Activity Feed
                </span>
              </div>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                Real-time
              </span>
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
                  <div
                    key={`user-${user.id}`}
                    className="group relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent rounded-xl border border-blue-100 dark:border-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-md"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {user.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold rounded-full uppercase">
                          {user.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        🎉 Joined {getTimeAgo(user.createdAt)}
                      </p>
                    </div>
                    <div className="hidden sm:block text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                      👤
                    </div>
                  </div>
                ))}

                {/* Recent Resources */}
                {recentResources.slice(0, 3).map((resource, _) => (
                  <div
                    key={`resource-${resource.id}`}
                    className="group relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-900/10 dark:to-transparent rounded-xl border border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all hover:shadow-md"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm sm:text-lg shadow-lg flex-shrink-0">
                      📚
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                          {resource.title}
                        </p>
                        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] font-bold rounded-full uppercase">
                          {resource.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {resource.description}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        📤 Uploaded {getTimeAgo(resource.createdAt)}
                      </p>
                    </div>
                    <div className="hidden sm:block text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                      📄
                    </div>
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

        {/* Analytics Grid - 4 Pie Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Resource Type Distribution Pie Chart */}
          <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📊</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                Resource Types
              </span>
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
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {resourceTypes.map((type, idx) => {
                      const colors = [
                        "#3b82f6",
                        "#10b981",
                        "#f59e0b",
                        "#ef4444",
                        "#8b5cf6",
                        "#ec4899",
                      ];
                      const percentage =
                        totalResourcesForChart > 0
                          ? (resourcesByType[type] / totalResourcesForChart) *
                            100
                          : 0;
                      const circumference = 2 * Math.PI * 30;
                      const offset = resourceTypes
                        .slice(0, idx)
                        .reduce(
                          (acc, t) =>
                            acc +
                            (totalResourcesForChart > 0
                              ? (resourcesByType[t] / totalResourcesForChart) *
                                circumference
                              : 0),
                          0,
                        );
                      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

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
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {totalResourcesForChart}
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-400">
                        Total
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2">
                  {resourceTypes.map((type, idx) => {
                    const colors = [
                      "bg-blue-500",
                      "bg-emerald-500",
                      "bg-amber-500",
                      "bg-red-500",
                      "bg-purple-500",
                      "bg-pink-500",
                    ];
                    const count = resourcesByType[type];
                    const percentage =
                      totalResourcesForChart > 0
                        ? ((count / totalResourcesForChart) * 100).toFixed(1)
                        : "0.0";

                    return (
                      <div
                        key={type}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`}
                          ></div>
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">
                            {type.replace(/_/g, " ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {count}
                          </span>
                          <span className="text-xs text-slate-400">
                            ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
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

        {/* Student Type Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🎓</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                Student Distribution
              </span>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-blue-600 rounded-full"></div>
              </div>
            ) : studentTypes.length > 0 ? (
              <div className="space-y-4">
                {/* Donut Chart Visualization */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {studentTypes.map((type, idx) => {
                      const colors = [
                        "#3b82f6",
                        "#06b6d4",
                        "#8b5cf6",
                        "#ec4899",
                        "#f59e0b",
                        "#10b981",
                      ];
                      const percentage =
                        totalStudentsForChart > 0
                          ? (studentsByType[type] / totalStudentsForChart) *
                            100
                          : 0;
                      const circumference = 2 * Math.PI * 30;
                      const offset = studentTypes
                        .slice(0, idx)
                        .reduce(
                          (acc, t) =>
                            acc +
                            (totalStudentsForChart > 0
                              ? (studentsByType[t] / totalStudentsForChart) *
                                circumference
                              : 0),
                          0,
                        );
                      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

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
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {totalStudentsForChart}
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-400">
                        Students
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2">
                  {studentTypes.map((type, idx) => {
                    const colors = [
                      "bg-blue-500",
                      "bg-cyan-500",
                      "bg-purple-500",
                      "bg-pink-500",
                      "bg-amber-500",
                      "bg-emerald-500",
                    ];
                    const count = studentsByType[type];
                    const percentage =
                      totalStudentsForChart > 0
                        ? ((count / totalStudentsForChart) * 100).toFixed(1)
                        : "0.0";

                    return (
                      <div
                        key={type}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`}
                          ></div>
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            {type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {count}
                          </span>
                          <span className="text-xs text-slate-400">
                            ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p className="text-4xl mb-2">👥</p>
                <p className="text-sm">No students yet</p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* University Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🏛️</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                University Distribution
              </span>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-violet-600 rounded-full"></div>
              </div>
            ) : universities.length > 0 ? (
              <div className="space-y-4">
                {/* Donut Chart Visualization */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {universities.map((university, idx) => {
                      const colors = [
                        "#8b5cf6",
                        "#d946ef",
                        "#a855f7",
                        "#c026d3",
                        "#9333ea",
                        "#e879f9",
                      ];
                      const percentage =
                        totalUniversityStudents > 0
                          ? (studentsByUniversity[university] / totalUniversityStudents) *
                            100
                          : 0;
                      const circumference = 2 * Math.PI * 30;
                      const offset = universities
                        .slice(0, idx)
                        .reduce(
                          (acc, u) =>
                            acc +
                            (totalUniversityStudents > 0
                              ? (studentsByUniversity[u] / totalUniversityStudents) *
                                circumference
                              : 0),
                          0,
                        );
                      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

                      return (
                        <circle
                          key={university}
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
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {totalUniversityStudents}
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-400">
                        Students
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2">
                  {universities.map((university, idx) => {
                    const colors = [
                      "bg-violet-500",
                      "bg-fuchsia-500",
                      "bg-purple-500",
                      "bg-fuchsia-600",
                      "bg-violet-600",
                      "bg-pink-400",
                    ];
                    const count = studentsByUniversity[university];
                    const percentage =
                      totalUniversityStudents > 0
                        ? ((count / totalUniversityStudents) * 100).toFixed(1)
                        : "0.0";

                    return (
                      <div
                        key={university}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`}
                          ></div>
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            {university}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {count}
                          </span>
                          <span className="text-xs text-slate-400">
                            ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p className="text-4xl mb-2">🏛️</p>
                <p className="text-sm">No university students yet</p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Department/Course Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📚</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                Department Distribution
              </span>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-rose-600 rounded-full"></div>
              </div>
            ) : departments.length > 0 ? (
              <div className="space-y-4">
                {/* Donut Chart Visualization */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {departments.map((department, idx) => {
                      const colors = [
                        "#f43f5e",
                        "#fb923c",
                        "#ef4444",
                        "#f97316",
                        "#ea580c",
                        "#fb7185",
                      ];
                      const percentage =
                        totalDepartmentStudents > 0
                          ? (studentsByDepartment[department] / totalDepartmentStudents) *
                            100
                          : 0;
                      const circumference = 2 * Math.PI * 30;
                      const offset = departments
                        .slice(0, idx)
                        .reduce(
                          (acc, d) =>
                            acc +
                            (totalDepartmentStudents > 0
                              ? (studentsByDepartment[d] / totalDepartmentStudents) *
                                circumference
                              : 0),
                          0,
                        );
                      const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

                      return (
                        <circle
                          key={department}
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
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {totalDepartmentStudents}
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-400">
                        Students
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2">
                  {departments.map((department, idx) => {
                    const colors = [
                      "bg-rose-500",
                      "bg-orange-400",
                      "bg-red-500",
                      "bg-orange-500",
                      "bg-orange-600",
                      "bg-rose-400",
                    ];
                    const count = studentsByDepartment[department];
                    const percentage =
                      totalDepartmentStudents > 0
                        ? ((count / totalDepartmentStudents) * 100).toFixed(1)
                        : "0.0";

                    return (
                      <div
                        key={department}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`}
                          ></div>
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            {department}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {count}
                          </span>
                          <span className="text-xs text-slate-400">
                            ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p className="text-4xl mb-2">📖</p>
                <p className="text-sm">No department data yet</p>
              </div>
            )}
          </CardBody>
        </Card>
        </div>
      </div>
    </div>
  );
};
