import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import { useToast } from "@components/common/Toast";
import { Activity, Menu, X, LogOut, Clock, Globe, Monitor } from "lucide-react";
import AdminSecuritySidebar from "./AdminSecuritySidebar";
import SecurityMetricCard from "./SecurityMetricCard";
import SecurityDataTable from "./SecurityDataTable";
import { adminSecurityService } from "@services/adminSecurityService";

export const SessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const toast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [totalActive, setTotalActive] = useState(0);
  const [loggingOut, setLoggingOut] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.role !== "super_admin") {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const data = await adminSecurityService.getSessions();
      setSessions(data.sessions || []);
      setTotalActive(data.totalActive || 0);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      toast.error("Failed to load active sessions");
    } finally {
      setLoading(false);
    }
  };

  const handleForceLogout = async (userId: string) => {
    if (!confirm("Are you sure you want to force logout this user?")) return;

    try {
      setLoggingOut(userId);
      await adminSecurityService.forceLogout(userId);
      toast.success("User has been forcefully logged out");
      fetchSessions();
    } catch (error) {
      console.error("Failed to force logout:", error);
      toast.error("Failed to force logout user");
    } finally {
      setLoggingOut(null);
    }
  };

  const columns = [
    {
      key: "email",
      label: "User",
      render: (value: string, row: any) => (
        <div>
          <p className="font-semibold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 font-mono">
            {row.userId?.substring(0, 12)}...
          </p>
        </div>
      ),
    },
    {
      key: "ipAddress",
      label: "IP Address",
      render: (value: string) => (
        <span className="font-mono text-sm flex items-center gap-1">
          <Globe size={14} />
          {value}
        </span>
      ),
    },
    {
      key: "userAgent",
      label: "Device",
      render: (value: string) => (
        <span className="text-xs flex items-center gap-1" title={value}>
          <Monitor size={14} />
          {value ? value.substring(0, 40) + "..." : "Unknown"}
        </span>
      ),
    },
    {
      key: "loginTime",
      label: "Login Time",
      render: (value: any) => new Date(value).toLocaleString(),
    },
    {
      key: "duration",
      label: "Duration",
      render: (value: number) => {
        const hours = Math.floor(value / 60);
        const mins = value % 60;
        return (
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {hours > 0 ? `${hours}h ${mins}m` : `${mins}m`}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value === "active" ? "✅ Active" : "⏰ Expiring"}
        </span>
      ),
    },
    {
      key: "userId",
      label: "Actions",
      render: (value: string) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleForceLogout(value);
          }}
          disabled={loggingOut === value}
          className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-1"
        >
          <LogOut size={14} />
          {loggingOut === value ? "Stopping..." : "Force Logout"}
        </button>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      <AdminSecuritySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800/80 border-b border-gray-200 dark:border-slate-700/50 px-6 py-4 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Activity size={28} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Active Sessions Monitor
            </h1>
          </div>
          <button
            onClick={fetchSessions}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SecurityMetricCard
              title="Active Sessions"
              value={totalActive}
              icon="👥"
              loading={loading}
            />
            <SecurityMetricCard
              title="Active Users"
              value={sessions.length}
              icon="👤"
              loading={loading}
            />
            <SecurityMetricCard
              title="Expiring Sessions"
              value={sessions.filter((s) => s.status === "expiring").length}
              icon="⏰"
              loading={loading}
            />
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              ℹ️ Active sessions are determined by tracking login events in the
              audit log. Users who have logged in but not logged out are shown
              here. Sessions older than 12 hours are marked as "expiring".
            </p>
          </div>

          {/* Sessions Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Currently Active Sessions
            </h2>
            <SecurityDataTable
              columns={columns}
              data={sessions}
              loading={loading}
            />
          </div>

          {/* Quick Stats */}
          {!loading && sessions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-md font-semibold text-gray-900 mb-3">
                  🌍 Sessions by Location
                </h3>
                <div className="space-y-2">
                  {Object.entries(
                    sessions.reduce((acc: Record<string, number>, s) => {
                      const ip = s.ipAddress || "unknown";
                      acc[ip] = (acc[ip] || 0) + 1;
                      return acc;
                    }, {}),
                  )
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 10)
                    .map(([ip, count]) => (
                      <div key={ip} className="flex justify-between text-sm">
                        <span className="font-mono text-gray-700">{ip}</span>
                        <span className="font-semibold text-gray-900">
                          {count} session{count !== 1 ? "s" : ""}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-md font-semibold text-gray-900 mb-3">
                  ⏱️ Session Age Distribution
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      label: "< 1 hour",
                      count: sessions.filter((s) => s.duration < 60).length,
                    },
                    {
                      label: "1-6 hours",
                      count: sessions.filter(
                        (s) => s.duration >= 60 && s.duration < 360,
                      ).length,
                    },
                    {
                      label: "6-12 hours",
                      count: sessions.filter(
                        (s) => s.duration >= 360 && s.duration < 720,
                      ).length,
                    },
                    {
                      label: "> 12 hours",
                      count: sessions.filter((s) => s.duration >= 720).length,
                    },
                  ].map((bucket) => (
                    <div
                      key={bucket.label}
                      className="flex justify-between text-sm items-center"
                    >
                      <span className="text-gray-600">{bucket.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: sessions.length
                                ? `${(bucket.count / sessions.length) * 100}%`
                                : "0%",
                            }}
                          />
                        </div>
                        <span className="font-semibold text-gray-900 w-8 text-right">
                          {bucket.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;
