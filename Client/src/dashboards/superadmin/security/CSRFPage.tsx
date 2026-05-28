import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import { useToast } from "@components/common/Toast";
import { Network, Menu, X, Shield, Key, RefreshCw } from "lucide-react";
import AdminSecuritySidebar from "./AdminSecuritySidebar";
import SecurityMetricCard from "./SecurityMetricCard";
import SecurityDataTable from "./SecurityDataTable";
import { adminSecurityService } from "@services/adminSecurityService";

export const CSRFPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const toast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>({
    tokensGenerated: 0,
    failedValidations: 0,
    recentActivity: [],
    securitySummary: {
      status: "active",
      enforcement: "",
      tokenExpiry: "",
      headerName: "",
    },
  });

  useEffect(() => {
    if (user && user.role !== "super_admin") {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const data = await adminSecurityService.getCSRFMetrics();
      setMetrics(data);
    } catch (error) {
      console.error("Failed to fetch CSRF metrics:", error);
      toast.error("Failed to load CSRF data");
    } finally {
      setLoading(false);
    }
  };

  const activityColumns = [
    {
      key: "timestamp",
      label: "Time",
      render: (value: any) => new Date(value).toLocaleString(),
    },
    {
      key: "action",
      label: "Action",
      render: (value: string) => {
        const styles: Record<
          string,
          { bg: string; text: string; icon: string }
        > = {
          csrf_token_generated: {
            bg: "bg-blue-100",
            text: "text-blue-800",
            icon: "🔑",
          },
          csrf_validation_failed: {
            bg: "bg-red-100",
            text: "text-red-800",
            icon: "❌",
          },
          csrf_validation_success: {
            bg: "bg-green-100",
            text: "text-green-800",
            icon: "✅",
          },
        };
        const style = styles[value] || {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: "•",
        };
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${style.bg} ${style.text}`}
          >
            {style.icon} {value?.replace(/_/g, " ")}
          </span>
        );
      },
    },
    {
      key: "ipAddress",
      label: "IP",
      render: (value: string) => (
        <span className="font-mono text-sm">{value || "—"}</span>
      ),
    },
    {
      key: "userId",
      label: "User",
      render: (value: string) => (
        <span className="text-sm font-mono">
          {value ? value.substring(0, 12) + "..." : "Anonymous"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            value === "fail"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {value === "fail" ? "❌ Failed" : "✅ Passed"}
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
            <Network size={28} className="text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              CSRF Protection
            </h1>
          </div>
          <button
            onClick={fetchMetrics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SecurityMetricCard
              title="Tokens Generated (24h)"
              value={metrics.tokensGenerated || 0}
              icon="🔑"
              loading={loading}
            />
            <SecurityMetricCard
              title="Failed Validations (24h)"
              value={metrics.failedValidations || 0}
              icon="❌"
              loading={loading}
            />
            <SecurityMetricCard
              title="Protection Status"
              value={metrics.securitySummary?.status || "active"}
              icon="🛡️"
              loading={loading}
            />
            <SecurityMetricCard
              title="Recent Activity"
              value={metrics.recentActivity?.length || 0}
              icon="📊"
              loading={loading}
            />
          </div>

          {/* Configuration Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={20} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  CSRF Configuration
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      metrics.securitySummary?.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {metrics.securitySummary?.status === "active"
                      ? "✅ Active"
                      : "⚠️ Warning"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">Enforcement</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {metrics.securitySummary?.enforcement || "Strict"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">Token Header</span>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {metrics.securitySummary?.headerName || "X-CSRF-Token"}
                  </code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Token Expiry</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {metrics.securitySummary?.tokenExpiry || "Session-based"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Key size={20} className="text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  What is CSRF?
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Cross-Site Request Forgery (CSRF) is an attack that forces
                authenticated users to submit unwanted requests.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-green-700">
                  ✅ All mutating state requests (POST, PUT, DELETE) require a
                  valid CSRF token
                </p>
                <p className="text-green-700">
                  ✅ Tokens are regenerated on every login for maximum security
                </p>
                <p className="text-green-700">
                  ✅ Token validation failures are logged in the audit trail
                </p>
                <p className="text-green-700">
                  ✅ SameSite cookie attribute provides defense-in-depth
                </p>
              </div>
            </div>
          </div>

          {/* Validation Status */}
          <div
            className={`rounded-lg border p-4 ${
              metrics.failedValidations > 10
                ? "bg-red-50 border-red-300"
                : metrics.failedValidations > 0
                  ? "bg-yellow-50 border-yellow-300"
                  : "bg-green-50 border-green-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield
                size={20}
                className={
                  metrics.failedValidations > 10
                    ? "text-red-600"
                    : metrics.failedValidations > 0
                      ? "text-yellow-600"
                      : "text-green-600"
                }
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {metrics.failedValidations > 10
                    ? "⚠️ High number of CSRF validation failures detected"
                    : metrics.failedValidations > 0
                      ? "⚡ Some CSRF validation failures - monitoring"
                      : "✅ CSRF protection operating normally"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {metrics.failedValidations > 0
                    ? `${metrics.failedValidations} failed validation(s) in the last 24 hours. Review the activity below.`
                    : "No failed validations in the last 24 hours."}
                </p>
              </div>
            </div>
          </div>

          {/* Recent CSRF Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Recent CSRF Activity (24h)
              </h2>
            </div>
            <SecurityDataTable
              columns={activityColumns}
              data={metrics.recentActivity || []}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSRFPage;
