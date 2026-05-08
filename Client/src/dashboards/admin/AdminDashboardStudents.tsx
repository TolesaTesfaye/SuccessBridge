import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { Pagination } from "@components/common/Pagination";
import { Loading } from "@components/common/Loading";
import { userService } from "@services/userService";
import type { User } from "@types";
import {
  BookOpen,
  Check,
  Filter,
  GraduationCap,
  Mail,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  DashboardHeroSkeleton,
  DashboardListSkeleton,
} from "@components/dashboards/DashboardSkeleton";

type StudentTabProps = {
  onNavigateToTab: (tab: string) => void;
};

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const AdminDashboardStudents: React.FC<StudentTabProps> = ({
  onNavigateToTab,
}) => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    studentType: "all",
    verificationStatus: "all",
  });

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAllUsers(currentPage, 8, "student");
      setStudents(response.data || []);
      setTotalPages(
        response.total && response.limit
          ? Math.max(1, Math.ceil(response.total / response.limit))
          : 1,
      );
    } catch (err: any) {
      setStudents([]);
      setError(err?.message || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadStudents();
  }, [currentPage]);

  const filteredStudents = useMemo(() => {
    let result = students;

    if (filter.studentType !== "all") {
      result = result.filter(
        (student) => student.studentType === filter.studentType,
      );
    }

    if (filter.verificationStatus !== "all") {
      const isVerified = filter.verificationStatus === "verified";
      result = result.filter(
        (student) => student.isEmailVerified === isVerified,
      );
    }

    return result;
  }, [students, filter]);

  const stats = useMemo(() => {
    const total = students.length;
    const highSchool = students.filter(
      (student) => student.studentType === "high_school",
    ).length;
    const university = students.filter(
      (student) => student.studentType === "university",
    ).length;
    const verified = students.filter(
      (student) => student.isEmailVerified === true,
    ).length;

    return [
      {
        label: "Total Students",
        value: total,
        icon: Users,
        accent: "from-sky-500 to-cyan-500",
      },
      {
        label: "High School",
        value: highSchool,
        icon: BookOpen,
        accent: "from-amber-500 to-orange-500",
      },
      {
        label: "University",
        value: university,
        icon: GraduationCap,
        accent: "from-violet-500 to-fuchsia-500",
      },
      {
        label: "Email Verified",
        value: verified,
        icon: Mail,
        accent: "from-emerald-500 to-teal-500",
      },
    ];
  }, [students]);

  if (loading && students.length === 0) {
    return (
      <div className="space-y-6">
        <DashboardHeroSkeleton />
        <DashboardListSkeleton rows={8} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden border border-slate-200 bg-[#0f172a] px-6 py-7 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.7)] dark:border-white/10 sm:px-8 -mx-4 md:-mx-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.25),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.22),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.9))]" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-100 backdrop-blur">
              <Sparkles className="h-4 w-4 text-sky-300" />
              Student Command Center
            </div>
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Manage learners across the platform with complete visibility and
                control.
              </h2>
              <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                View all registered students, monitor verification status,
                segment by education level, and track engagement metrics in one
                centralized dashboard for seamless student lifecycle management.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => onNavigateToTab("resources")}
                className="shadow-lg shadow-sky-500/20"
              >
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  View All Students
                </span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => onNavigateToTab("reports")}
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                See Reports
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br ${item.accent} p-2 text-white shadow-lg`}
                >
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="mt-3 text-2xl font-black text-white">
                  {item.value}
                </div>
                <p className="mt-1 text-xs font-medium text-slate-300">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters & Table Section */}
      <div className="grid gap-6">
        {/* Filters Card */}
        <Card className="border-slate-200/80 shadow-sm dark:border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-500" />
              <span>Quick Filters</span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Student Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "All", value: "all" },
                    { label: "High School", value: "high_school" },
                    { label: "University", value: "university" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                        filter.studentType === option.value
                          ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-500/10 dark:text-blue-200"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      }`}
                      onClick={() => {
                        setFilter((prev) => ({
                          ...prev,
                          studentType: option.value,
                        }));
                      }}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  Email Verification
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "All", value: "all" },
                    { label: "Verified", value: "verified" },
                    { label: "Unverified", value: "unverified" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                        filter.verificationStatus === option.value
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-500/10 dark:text-emerald-200"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      }`}
                      onClick={() => {
                        setFilter((prev) => ({
                          ...prev,
                          verificationStatus: option.value,
                        }));
                      }}
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                  <Users className="h-4 w-4 text-slate-500" />
                  Live data from the database
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  All student records are fetched directly from the database
                  with real-time updates as new learners register.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Students Table */}
        <Card className="border-slate-200/80 shadow-sm dark:border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-500" />
              <span>Student Registry</span>
              <span className="ml-auto text-sm text-slate-500">
                Showing {filteredStudents.length} of {students.length}
              </span>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Loading message="Loading student registry..." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:text-slate-400">
                    <tr>
                      <th className="py-3 pr-4">Student</th>
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Type</th>
                      <th className="py-3 pr-4">Level</th>
                      <th className="py-3 pr-4">Verification</th>
                      <th className="py-3 pr-4">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
                      >
                        <td className="py-4 pr-4">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {student.name}
                          </div>
                        </td>
                        <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs dark:bg-white/5">
                            <Mail className="h-3 w-3" />
                            {student.email}
                          </span>
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                              student.studentType === "high_school"
                                ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"
                                : "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-200"
                            }`}
                          >
                            {student.studentType === "high_school"
                              ? "📚 High School"
                              : "🎓 University"}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold dark:bg-white/5">
                            {student.studentType === "high_school"
                              ? student.highSchoolGrade || "N/A"
                              : student.universityLevel || "N/A"}
                          </span>
                        </td>
                        <td className="py-4 pr-4">
                          {student.isEmailVerified ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                              <Check className="h-3 w-3" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
                              <X className="h-3 w-3" />
                              Unverified
                            </span>
                          )}
                        </td>
                        <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">
                          <span className="text-xs font-semibold">
                            {formatDate(student.createdAt)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredStudents.length === 0 && !loading && (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center dark:border-white/10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl dark:bg-white/5">
                      👥
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                      No students found
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Try adjusting your filters to see more student records.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
