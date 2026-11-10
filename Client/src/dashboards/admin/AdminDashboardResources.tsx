import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { Pagination } from "@components/common/Pagination";
import { Loading } from "@components/common/Loading";
import { resourceService } from "@services/resourceService";
import type { Resource } from "@types";
import { FileText } from "lucide-react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
      <div className="grid gap-6">
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
