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
  const [searchQuery, setSearchQuery] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAllUsers(1, 1000, "student");
      setStudents(response.data || []);
    } catch (err: any) {
      setStudents([]);
      setError(err?.message || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadStudents();
  }, []);

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

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (student) =>
          student.name?.toLowerCase().includes(query) ||
          student.email?.toLowerCase().includes(query),
      );
    }

    return result;
  }, [students, filter, searchQuery]);

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filteredStudents.length / 8)));
  }, [filteredStudents]);

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
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/80"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-slate-50 dark:from-white/5 dark:to-transparent" />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <p className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Students Table */}
      <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white/90 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-500" />
              <span>Student Registry</span>
              <span className="text-sm text-slate-500">
                Showing {filteredStudents.length} of {students.length}
              </span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white md:w-64"
            />
          </div>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loading message="Loading student registry..." />
          ) : (
            <>
              <div className="md:hidden space-y-3">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{student.name}</p>
                      </div>
                      {student.isEmailVerified ? (
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                          <Check className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
                          <X className="w-3 h-3" /> Unverified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                        student.studentType === "high_school"
                          ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"
                          : "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-200"
                      }`}>
                        {student.studentType === "high_school" ? "📚 High School" : "🎓 University"}
                      </span>
                      <span className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                        {student.studentType === "high_school"
                          ? student.highSchoolGrade || "N/A"
                          : student.universityLevel || "N/A"}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 self-center ml-auto">
                        {formatDate(student.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
                {filteredStudents.length === 0 && !loading && (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    No students found
                  </div>
                )}
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:text-slate-400">
                    <tr>
                      <th className="py-3 pr-4">Student</th>
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
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
