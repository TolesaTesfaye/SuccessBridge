import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { Pagination } from "@components/common/Pagination";
import { Loading } from "@components/common/Loading";
import { resourceService } from "@services/resourceService";
import type { Resource } from "@types";
import { FileText, GraduationCap, Layers, School } from "lucide-react";
import {
  DashboardHeroSkeleton,
  DashboardListSkeleton,
} from "@components/dashboards/DashboardSkeleton";

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

export const AdminDashboardResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceStats, setResourceStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const loadResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await resourceService.getResources({
        page: currentPage,
        limit: 8,
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
  }, [currentPage]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsResponse = await resourceService.getResourceStats();
        setResourceStats(statsResponse?.data ?? statsResponse);
      } catch (err) {
        console.error("Failed to load resource stats", err);
      }
    };
    void loadStats();
  }, []);

  const filteredResources = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return resources;
    return resources.filter(
      (resource) =>
        resource.title?.toLowerCase().includes(query) ||
        resource.type?.toLowerCase().includes(query) ||
        resource.educationLevel?.toLowerCase().includes(query),
    );
  }, [resources, searchQuery]);

  const stats = useMemo(() => {
    const total = resourceStats?.total ?? resources.length;
    const highSchool = resourceStats?.byEducationLevel?.high_school ?? resources.filter(
      (r) => r.educationLevel === "high_school",
    ).length;
    const university = resourceStats?.byEducationLevel?.university ?? resources.filter(
      (r) => r.educationLevel === "university",
    ).length;
    const uniqueTypes =
      resourceStats?.byType ? Object.keys(resourceStats.byType).length : new Set(resources.map((r) => r.type)).size;

    return [
      {
        label: "Total Resources",
        value: total,
        icon: FileText,
        accent: "from-sky-500 to-cyan-500",
      },
      {
        label: "High School",
        value: highSchool,
        icon: School,
        accent: "from-amber-500 to-orange-500",
      },
      {
        label: "University",
        value: university,
        icon: GraduationCap,
        accent: "from-violet-500 to-fuchsia-500",
      },
      {
        label: "Resource Types",
        value: uniqueTypes,
        icon: Layers,
        accent: "from-emerald-500 to-teal-500",
      },
    ];
  }, [resources, resourceStats]);

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
      <div className="grid gap-6">
        <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white/90 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-500" />
                <span>Resources</span>
                <span className="text-sm text-slate-500">
                  Showing {filteredResources.length} of {resources.length}
                </span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white md:w-64"
              />
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
                    {filteredResources.map((resource) => (
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
                {filteredResources.length === 0 && !loading && (
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
