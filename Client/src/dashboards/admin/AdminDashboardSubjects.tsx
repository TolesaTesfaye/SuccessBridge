import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { Pagination } from "@components/common/Pagination";
import { Loading } from "@components/common/Loading";
import { subjectService } from "@services/subjectService";
import { departmentService } from "@services/departmentService";
import type { Subject } from "@services/subjectService";
import { BookOpen, Code2, Filter, Sparkles } from "lucide-react";
import {
  DashboardHeroSkeleton,
  DashboardListSkeleton,
} from "@components/dashboards/DashboardSkeleton";

type SubjectTabProps = {
  onNavigateToTab: (tab: string) => void;
};

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const AdminDashboardSubjects: React.FC<SubjectTabProps> = ({
  onNavigateToTab,
}) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    department: "all",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load subjects
      const subjectsResponse = await subjectService.getAll();
      const subjectsList = Array.isArray(subjectsResponse)
        ? subjectsResponse
        : (subjectsResponse as any)?.data || [];

      setSubjects(subjectsList);
      setTotalPages(Math.max(1, Math.ceil(subjectsList.length / 8)));

      // Load departments for filter
      const deptsResponse = await departmentService.getAll();
      const deptsList = Array.isArray(deptsResponse)
        ? deptsResponse
        : (deptsResponse as any)?.data || [];
      setDepartments(deptsList);
    } catch (err: any) {
      setSubjects([]);
      setError(err?.message || "Failed to load subjects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const filteredSubjects = useMemo(() => {
    let result = subjects;

    if (filter.department !== "all") {
      result = result.filter(
        (subject) => subject.departmentId === filter.department,
      );
    }

    // Simple pagination
    const start = (currentPage - 1) * 8;
    return result.slice(start, start + 8);
  }, [subjects, filter, currentPage]);

  const stats = useMemo(() => {
    const total = subjects.length;
    const withDepartment = subjects.filter((s) => s.departmentId).length;
    const withGrade = subjects.filter((s) => s.gradeId).length;
    const uniqueDepartments = new Set(
      subjects.map((s) => s.departmentId).filter(Boolean),
    ).size;

    return [
      {
        label: "Total Subjects",
        value: total,
        icon: BookOpen,
        accent: "from-sky-500 to-cyan-500",
      },
      {
        label: "With Department",
        value: withDepartment,
        icon: Code2,
        accent: "from-violet-500 to-fuchsia-500",
      },
      {
        label: "With Grade",
        value: withGrade,
        icon: BookOpen,
        accent: "from-amber-500 to-orange-500",
      },
      {
        label: "Departments",
        value: uniqueDepartments,
        icon: Code2,
        accent: "from-emerald-500 to-teal-500",
      },
    ];
  }, [subjects]);

  const departmentMap = useMemo(() => {
    const map: Record<string, string> = {};
    departments.forEach((dept) => {
      map[dept.id] = dept.name;
    });
    return map;
  }, [departments]);

  if (loading && subjects.length === 0) {
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
              Subject Command Center
            </div>
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Manage academic subjects across departments with centralized
                control.
              </h2>
              <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Browse all subjects, organize by department, track subject-grade
                associations, and maintain a complete academic curriculum
                catalog in one powerful interface.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => onNavigateToTab("departments")}
                className="shadow-lg shadow-sky-500/20"
              >
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  View Departments
                </span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => onNavigateToTab("reports")}
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                See Analytics
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
        {/* Subjects Table */}
        <Card className="border-slate-200/80 shadow-sm dark:border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-slate-500" />
              <span>Subject Registry</span>
              <span className="ml-auto text-sm text-slate-500">
                Showing {filteredSubjects.length} of {subjects.length}
              </span>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Loading message="Loading subject registry..." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:text-slate-400">
                    <tr>
                      <th className="py-3 pr-4">Subject Name</th>
                      <th className="py-3 pr-4">Code</th>
                      <th className="py-3 pr-4">Department</th>
                      <th className="py-3 pr-4">Grade</th>
                      <th className="py-3 pr-4">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                    {filteredSubjects.map((subject) => (
                      <tr
                        key={subject.id}
                        className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
                      >
                        <td className="py-4 pr-4">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {subject.name}
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300">
                            {subject.code}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold dark:bg-white/5">
                            {departmentMap[subject.departmentId || ""] ||
                              "No Department"}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold dark:bg-white/5">
                            {subject.gradeId || "—"}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">
                          <span className="text-xs font-semibold">
                            {formatDate(subject.createdAt)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredSubjects.length === 0 && !loading && (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center dark:border-white/10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl dark:bg-white/5">
                      📚
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                      No subjects found
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Try adjusting your filters to see more subject records.
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
