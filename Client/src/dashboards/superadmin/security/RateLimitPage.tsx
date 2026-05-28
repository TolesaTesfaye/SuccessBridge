import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import { useToast } from "@components/common/Toast";
import {
  Zap,
  Menu,
  X,
  Shield,
  AlertTriangle,
  TrendingUp,
  Clock,
  Server,
} from "lucide-react";
import AdminSecuritySidebar from "./AdminSecuritySidebar";
import SecurityMetricCard from "./SecurityMetricCard";
import SecurityDataTable from "./SecurityDataTable";
import { adminSecurityService } from "@services/adminSecurityService";

export const RateLimitPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const toast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<any>(null);
  const [violations, setViolations] = useState<any>({
    violations: [],
    total: 0,
    page: 1,
    pages: 1,
  });
  const [violationsLoading, setViolationsLoading] = useState(false);
  const [violationsPage, setViolationsPage] = useState(1);

  useEffect(() => {
    if (user && user.role !== "super_admin") {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchViolations();
  }, [violationsPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const configData = await adminSecurityService.getRateLimitConfig();
      setConfig(configData);
    } catch (error) {
      console.error("Failed to fetch rate limit data:", error);
      toast.error("Failed to load rate limit data");
    } finally {
      setLoading(false);
    }
  };

  const fetchViolations = async () => {
    try {
      setViolationsLoading(true);
      const data = await adminSecurityService.getRateLimitViolations(
        violationsPage,
        20,
      );
      setViolations(data);
    } catch (error) {
      console.error("Failed to fetch violations:", error);
    } finally {
      setViolationsLoading(false);
    }
  };

  const getThrottledCount = () => {
    if (!config?.endpoints) return 0;
    return config.endpoints.filter((e: any) => e.status === "throttled").length;
  };

  const endpointColumns = [
    {
      key: "endpoint",
      label: "Endpoint",
      render: (value: string) => (
        <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
          {value}
        </code>
      ),
    },
    {
      key: "limit",
      label: "Rate Limit",
      render: (value: string) => (
        <span className="font-semibold text-gray-900">{value}</span>
      ),
    },
    {
      key: "window",
      label: "Time Window",
      render: (value: string) => <span className="text-gray-600">{value}</span>,
    },
    {
      key: "currentHits",
      label: "Current Hits",
      render: (value: number) => (
        <span className="font-bold text-blue-600">{value}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            value === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value === "active" ? "✅ Active" : "🚫 Throttled"}
        </span>
      ),
    },
  ];

  const violationColumns = [
    {
      key: "timestamp",
      label: "Time",
      render: (value: any) => new Date(value).toLocaleString(),
    },
    {
      key: "ipAddress",
      label: "IP Address",
      render: (value: string) => (
        <span className="font-mono text-sm">{value}</span>
      ),
    },
    {
      key: "endpoint",
      label: "Endpoint",
      render: (value: string) => (
        <code className="px-2 py-1 bg-gray-100 rounded text-xs">{value}</code>
      ),
    },
    {
      key: "userId",
      label: "User",
      render: (value: string) => (
        <span className="text-sm">{value || "Anonymous"}</span>
      ),
    },
    {
      key: "status",
      label: "Result",
      render: (value: string) => (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
          🚫 Blocked
        </span>
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
            <Zap size={28} className="text-yellow-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Rate Limiting Dashboard
            </h1>
          </div>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SecurityMetricCard
              title="Total Endpoints"
              value={config?.endpoints?.length || 0}
              icon="🛡️"
              loading={loading}
            />
            <SecurityMetricCard
              title="Throttled Endpoints"
              value={getThrottledCount()}
              icon="⚠️"
              loading={loading}
            />
            <SecurityMetricCard
              title="Total Violations"
              value={violations.total}
              icon="🚫"
              loading={violationsLoading}
            />
            <SecurityMetricCard
              title="Total API Hits (15m)"
              value={
                config?.endpoints?.reduce(
                  (sum: number, e: any) => sum + (e.currentHits || 0),
                  0,
                ) || 0
              }
              icon="📊"
              loading={loading}
            />
          </div>

          {/* Endpoint Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Server size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Current Rate Limit Configuration
              </h2>
            </div>
            <SecurityDataTable
              columns={endpointColumns}
              data={config?.endpoints || []}
              loading={loading}
            />
          </div>

          {/* Violations Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-red-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Rate Limit Violations ({violations.total})
              </h2>
            </div>
            <SecurityDataTable
              columns={violationColumns}
              data={violations.violations || []}
              loading={violationsLoading}
              pagination={
                violations.total > 0
                  ? {
                      page: violations.page || 1,
                      total: violations.total,
                      pages: violations.pages || 1,
                      onPageChange: setViolationsPage,
                    }
                  : undefined
              }
            />
          </div>

          {/* IP Management */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={18} className="text-green-600" />
                <h3 className="font-semibold text-gray-900">IP Whitelist</h3>
              </div>
              {config?.ipWhitelist?.length === 0 ? (
                <p className="text-sm text-gray-500">No IPs whitelisted</p>
              ) : (
                <div className="space-y-1">
                  {config?.ipWhitelist?.map((ip: string) => (
                    <code
                      key={ip}
                      className="text-xs bg-green-50 px-2 py-1 rounded block"
                    >
                      ✅ {ip}
                    </code>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} className="text-red-600" />
                <h3 className="font-semibold text-gray-900">IP Blacklist</h3>
              </div>
              {config?.ipBlacklist?.length === 0 ? (
                <p className="text-sm text-gray-500">No IPs blacklisted</p>
              ) : (
                <div className="space-y-1">
                  {config?.ipBlacklist?.map((ip: string) => (
                    <code
                      key={ip}
                      className="text-xs bg-red-50 px-2 py-1 rounded block"
                    >
                      🚫 {ip}
                    </code>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-yellow-600" />
                <h3 className="font-semibold text-gray-900">
                  Temporary Blocks
                </h3>
              </div>
              {config?.temporaryBlocks?.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No temporary blocks active
                </p>
              ) : (
                <div className="space-y-1">
                  {config?.temporaryBlocks?.map((block: any) => (
                    <code
                      key={block.ip}
                      className="text-xs bg-yellow-50 px-2 py-1 rounded block"
                    >
                      ⏱️ {block.ip} - until{" "}
                      {new Date(block.until).toLocaleString()}
                    </code>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Rate Limiting Status
              </h2>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                ✅ <strong>Active Protection:</strong> Rate limiting is actively
                protecting all API endpoints
              </p>
              <p>
                {getThrottledCount() > 0 ? (
                  <span>
                    ⚠️ <strong>{getThrottledCount()} endpoint(s)</strong> are
                    currently being throttled due to high traffic
                  </span>
                ) : (
                  <span>
                    ✅ <strong>No Throttling:</strong> All endpoints operating
                    within normal limits
                  </span>
                )}
              </p>
              <p>
                ✅ <strong>All Systems Operational:</strong> Rate limiters are
                functioning normally with live hit count tracking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitPage;
