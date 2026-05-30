import React, { useState, useEffect, useCallback } from "react";
import { adminService, AuditLog } from "@services/adminService";
import { RefreshCw, Download, Loader2 } from "lucide-react";
import {
  StyledCard,
  StyledBadge,
  StyledInput,
  StyledBtn,
} from "./StyledComponents";

export const AuditTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await adminService.getAuditLogs({
        action: actionFilter || undefined,
        page,
        limit: 50,
      });
      setLogs(result.logs);
      setTotal(result.total);
    } catch {
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  }, [actionFilter, page, toast]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  return (
    <div className="space-y-6">
      <StyledCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StyledInput
            placeholder="Filter by action..."
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
          />
          <div className="flex gap-2 items-end">
            <StyledBtn
              variant="secondary"
              onClick={() => {
                setActionFilter("");
                setPage(1);
                fetch();
              }}
            >
              <RefreshCw size={16} className="mr-1" /> Reset
            </StyledBtn>
            <StyledBtn
              variant="secondary"
              onClick={() => toast.info("Export feature coming soon")}
            >
              <Download size={16} className="mr-1" /> Export
            </StyledBtn>
          </div>
        </div>
      </StyledCard>

      <StyledCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                  Resource
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/30">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/20"
                >
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {log.user ? (
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {log.user.name}
                        </p>
                        <p className="text-xs text-gray-500">{log.user.role}</p>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">System</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {log.action}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {log.resource || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <StyledBadge
                      className={
                        log.status === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {log.status || "unknown"}
                    </StyledBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-slate-700/30">
          <p className="text-sm text-gray-500">
            Showing {logs.length} of {total} entries
          </p>
          <div className="flex gap-2">
            <StyledBtn
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </StyledBtn>
            <StyledBtn
              size="sm"
              disabled={page >= Math.ceil(total / 50)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </StyledBtn>
          </div>
        </div>
      </StyledCard>
    </div>
  );
};
