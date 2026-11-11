import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Pagination } from "@components/common/Pagination";
import { Loading } from "@components/common/Loading";
import { subjectService } from "@services/subjectService";
import type { Subject } from "@services/subjectService";
import { BookOpen } from "lucide-react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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
    const query = searchQuery.trim().toLowerCase();
    if (!query) return subjects;
    return subjects.filter(
      (subject) =>
        subject.name?.toLowerCase().includes(query) ||
        subject.code?.toLowerCase().includes(query),
    );
  }, [subjects, searchQuery]);

  const paginatedSubjects = useMemo(() => {
    const start = (currentPage - 1) * 8;
    return filteredSubjects.slice(start, start + 8);
  }, [filteredSubjects, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filteredSubjects.length / 8)));
  }, [filteredSubjects]);

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
      {/* Filters & Table Section */}
      <div className="grid gap-6">
        {/* Subjects Table */}
        <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white/90 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-slate-500" />
                <span>Subject Registry</span>
                <span className="text-sm text-slate-500">
                  Showing {paginatedSubjects.length} of {filteredSubjects.length}
                </span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subjects..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white md:w-64"
              />
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
                      <th className="py-3 pr-4">Grade</th>
                      <th className="py-3 pr-4">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                    {paginatedSubjects.map((subject) => (
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
                {paginatedSubjects.length === 0 && !loading && (
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
