import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { Pagination } from "@components/common/Pagination";
import { Loading } from "@components/common/Loading";
import { resourceService } from "@services/resourceService";
import type { Resource } from "@types";
import {
  BookOpen,
  Brain,
  FileText,
  Filter,
  LibraryBig,
  Sparkles,
  Upload,
  Calendar,
} from "lucide-react";
import {
  DashboardHeroSkeleton,
  DashboardListSkeleton,
} from "@components/dashboards/DashboardSkeleton";

type ResourceTabProps = {
  onUpload: () => void;
  onNavigateToTab: (tab: string) => void;
};

const parseResources = (response: any): Resource[] => {
  const data =
    response?.data?.data ?? response?.data ?? response?.data?.items ?? [];
  return Array.isArray(data) ? data : [];
};

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const AdminDashboardResources: React.FC<ResourceTabProps> = ({
  onUpload,
  onNavigateToTab,
}) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    educationLevel: "all",
    type: "all",
  });

  const loadResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await resourceService.getResources({
        page: currentPage,
        limit: 8,
        ...(filter.educationLevel !== "all"
          ? {
              educationLevel: filter.educationLevel as
                | "high_school"
                | "university",
            }
          : {}),
        ...(filter.type !== "all" ? { type: filter.type as any } : {}),
      });
      const payload = response?.data;
      const list =
        payload && Array.isArray(payload.data)
          ? payload.data
          : parseResources(payload);
      setResources(list);
      setTotalPages(
        payload?.total && payload?.limit
          ? Math.max(1, Math.ceil(payload.total / payload.limit))
          : 1,
      );
    } catch (err: any) {
      setResources([]);
      setError(err?.message || "Failed to load resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadResources();
  }, [currentPage, filter.educationLevel, filter.type]);

  const stats = useMemo(() => {
    const total = resources.length;
    const university = resources.filter(
      (resource) => resource.educationLevel === "university",
    ).length;
    const highSchool = resources.filter(
      (resource) => resource.educationLevel === "high_school",
    ).length;
    const quizzes = resources.filter(
      (resource) => resource.type === "quiz",
    ).length;

    return [
      {
        label: "Visible Resources",
        value: total,
        icon: FileText,
        accent: "from-sky-500 to-cyan-500",
      },
      {
        label: "University Assets",
        value: university,
        icon: LibraryBig,
        accent: "from-violet-500 to-fuchsia-500",
      },
      {
        label: "High School Assets",
        value: highSchool,
        icon: BookOpen,
        accent: "from-amber-500 to-orange-500",
      },
      {
        label: "Quiz Materials",
        value: quizzes,
        icon: Brain,
        accent: "from-emerald-500 to-teal-500",
      },
    ];
  }, [resources]);

  if (loading && resources.length === 0) {
    return (
      <div className="space-y-6">
        <DashboardHeroSkeleton />
        <DashboardListSkeleton rows={8} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden border border-slate-200 bg-[#0f172a] px-6 py-7 text-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.7)] dark:border-white/10 sm:px-8 -mx-4 md:-mx-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.25),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.22),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.9))]" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-100 backdrop-blur">
              <Sparkles className="h-4 w-4 text-sky-300" />
              Resource Command Center
            </div>
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Admin resource library built for fast publishing, review, and
                discovery.
              </h2>
              <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Browse uploaded learning assets, inspect what is live in the
                database, and jump straight into uploads or the dedicated
                resources page when you need the full manager.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={onUpload}
                className="shadow-lg shadow-sky-500/20"
              >
                <span className="inline-flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Resource
                </span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => onNavigateToTab("reports")}
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                View Analytics
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

      <div className="grid gap-6">
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
                  Education Level
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
                        filter.educationLevel === option.value
                          ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-500/10 dark:text-blue-200"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      }`}
                      onClick={() => {
                        setCurrentPage(1);
                        setFilter((prev) => ({
                          ...prev,
                          educationLevel: option.value,
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
                  Resource Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "All Types", value: "all" },
                    { label: "Textbooks", value: "textbook" },
                    { label: "Quizzes", value: "quiz" },
                    { label: "Past Exams", value: "past_exam" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                        filter.type === option.value
                          ? "border-sky-500 bg-sky-50 text-sky-700 dark:border-sky-400 dark:bg-sky-500/10 dark:text-sky-200"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      }`}
                      onClick={() => {
                        setCurrentPage(1);
                        setFilter((prev) => ({ ...prev, type: option.value }));
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
                  <Calendar className="h-4 w-4 text-slate-500" />
                  Live data from the API
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  The grid updates from the database-backed resources endpoint
                  and can be refreshed by changing filters or opening the
                  dedicated resources page.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-slate-200/80 shadow-sm dark:border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-500" />
              <span>Resources</span>
            </div>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Loading message="Loading resources..." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.18em] text-slate-500 dark:border-white/10 dark:text-slate-400">
                    <tr>
                      <th className="py-3 pr-4">Resource</th>
                      <th className="py-3 pr-4">Type</th>
                      <th className="py-3 pr-4">Level</th>
                      <th className="py-3 pr-4">Uploaded</th>
                      <th className="py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/10">
                    {resources.map((resource) => (
                      <tr
                        key={resource.id}
                        className="transition-colors hover:bg-slate-50/80 dark:hover:bg-white/5"
                      >
                        <td className="py-4 pr-4">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {resource.title}
                          </div>
                          <div className="mt-1 max-w-[340px] truncate text-xs text-slate-500 dark:text-slate-400">
                            {resource.description}
                          </div>
                        </td>
                        <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">
                          {resource.type.replace("_", " ")}
                        </td>
                        <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">
                          {resource.educationLevel.replace("_", " ")}
                        </td>
                        <td className="py-4 pr-4 text-slate-600 dark:text-slate-300">
                          {formatDate(resource.createdAt)}
                        </td>
                        <td className="py-4 text-right">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              window.open(resource.fileUrl, "_blank")
                            }
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {resources.length === 0 && !loading && (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center dark:border-white/10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl dark:bg-white/5">
                      📚
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                      No resources found
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Try adjusting your filters or upload a new resource.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

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
  );
};
