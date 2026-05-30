import React, { useState, useEffect, useCallback } from "react";
import {
  adminService,
  DashboardStats,
  HealthStatus,
} from "@services/adminService";
import {
  Users,
  FileText,
  FileCheck,
  Activity,
  Server,
  Settings,
  Plus,
  Megaphone,
  Download,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { StyledCard, StyledBadge, StyledBtn } from "./StyledComponents";

export const OverviewTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [statsData, healthData, activityData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getSystemHealth(),
        adminService.getRecentActivity(10),
      ]);
      setStats(statsData);
      setHealth(healthData);
      setActivity(activityData);
    } catch {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{stats?.users.total || 0}</p>
              <p className="text-sm opacity-80 mt-1">Total Users</p>
            </div>
            <Users size={32} className="opacity-60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{stats?.users.active || 0}</p>
              <p className="text-sm opacity-80 mt-1">Active Students</p>
            </div>
            <FileCheck size={32} className="opacity-60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">
                {stats?.resources.total || 0}
              </p>
              <p className="text-sm opacity-80 mt-1">Resources</p>
            </div>
            <FileText size={32} className="opacity-60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{stats?.quizzes.total || 0}</p>
              <p className="text-sm opacity-80 mt-1">Quizzes</p>
            </div>
            <Activity size={32} className="opacity-60" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <StyledCard title="System Health" icon={<Server size={18} />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Status
              </span>
              <StyledBadge
                className={
                  health?.status === "healthy"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              >
                {health?.status || "Unknown"}
              </StyledBadge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Uptime
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {health?.uptime || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Database
              </span>
              <StyledBadge
                className={
                  health?.database === "connected"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              >
                {health?.database || "Unknown"}
              </StyledBadge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Memory
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {health?.memory?.rss || "N/A"}
              </span>
            </div>
          </div>
        </StyledCard>

        {/* Recent Activity */}
        <StyledCard title="Recent Activity" icon={<Activity size={18} />}>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {activity.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No recent activity
              </p>
            ) : (
              activity.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/20"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${log.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {log.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      {log.user?.name || "System"} ·{" "}
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </StyledCard>
      </div>

      {/* Quick Actions */}
      <StyledCard title="Quick Actions" icon={<Settings size={18} />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StyledBtn
            variant="primary"
            onClick={() => toast.info("Feature coming soon")}
          >
            <Plus size={16} className="mr-1" /> New User
          </StyledBtn>
          <StyledBtn
            variant="secondary"
            onClick={() => toast.info("Feature coming soon")}
          >
            <Megaphone size={16} className="mr-1" /> Broadcast
          </StyledBtn>
          <StyledBtn
            variant="secondary"
            onClick={() => toast.info("Feature coming soon")}
          >
            <Download size={16} className="mr-1" /> Export Data
          </StyledBtn>
          <StyledBtn variant="secondary" onClick={fetchData}>
            <RefreshCw size={16} className="mr-1" /> Refresh
          </StyledBtn>
        </div>
      </StyledCard>
    </div>
  );
};
