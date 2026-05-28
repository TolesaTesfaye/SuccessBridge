import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import { useToast } from "@components/common/Toast";
import {
  AlertTriangle,
  Menu,
  X,
  Bell,
  CheckCircle,
  Shield,
} from "lucide-react";
import AdminSecuritySidebar from "./AdminSecuritySidebar";
import SecurityMetricCard from "./SecurityMetricCard";
import SecurityDataTable from "./SecurityDataTable";
import { adminSecurityService } from "@services/adminSecurityService";

export const SecurityAlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const toast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [unresolved, setUnresolved] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [resolving, setResolving] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.role !== "super_admin") {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchAlerts();
  }, [page]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await adminSecurityService.getAlerts(page, 20);
      setAlerts(data.alerts || []);
      setTotal(data.total || 0);
      setUnresolved(data.unresolved || 0);
      setPages(data.pages || 1);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      toast.error("Failed to load security alerts");
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (alertId: string) => {
    try {
      setResolving(alertId);
      await adminSecurityService.resolveAlert(alertId);
      toast.success("Alert resolved successfully");
      fetchAlerts();
    } catch (error) {
      console.error("Failed to resolve alert:", error);
      toast.error("Failed to resolve alert");
    } finally {
      setResolving(null);
    }
  };

  const severityColors: Record<string, string> = {
    critical: "bg-red-50 border-red-400",
    high: "bg-orange-50 border-orange-400",
    medium: "bg-yellow-50 border-yellow-400",
    low: "bg-blue-50 border-blue-400",
  };

  const severityBadgeColors: Record<string, string> = {
    critical: "bg-red-600",
    high: "bg-orange-600",
    medium: "bg-yellow-600",
    low: "bg-blue-600",
  };

  const columns = [
    {
      key: "severity",
      label: "Severity",
      render: (value: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold text-white ${severityBadgeColors[value] || "bg-gray-600"}`}
        >
          {value.toUpperCase()}
        </span>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (value: string) => (
        <span className="text-sm font-semibold text-gray-900">
          {value?.replace(/_/g, " ").toUpperCase()}
        </span>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (value: string) => (
        <span className="text-sm text-gray-700">{value}</span>
      ),
    },
    {
      key: "source",
      label: "Source",
      render: (value: string) => (
        <span className="text-sm font-mono">{value}</span>
      ),
    },
    {
      key: "affectedCount",
      label: "Affected",
      render: (value: number) => (
        <span className="font-bold text-red-600">{value}</span>
      ),
    },
    {
      key: "detectedAt",
      label: "Detected",
      render: (value: any) => new Date(value).toLocaleString(),
    },
    {
      key: "id",
      label: "Action",
      render: (value: string) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleResolve(value);
          }}
          disabled={resolving === value}
          className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-1"
        >
          <CheckCircle size={14} />
          {resolving === value ? "Resolving..." : "Resolve"}
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
            <Bell size={28} className="text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Security Alerts
            </h1>
          </div>
          <button
            onClick={fetchAlerts}
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
              title="Total Alerts"
              value={total}
              icon="🔔"
              loading={loading}
            />
            <SecurityMetricCard
              title="Unresolved"
              value={unresolved}
              icon="⚠️"
              loading={loading}
            />
            <SecurityMetricCard
              title="Resolved"
              value={total - unresolved}
              icon="✅"
              loading={loading}
            />
          </div>

          {/* Critical Alert Banner */}
          {alerts.some((a) => a.severity === "critical") && (
            <div className="bg-red-50 border border-red-400 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={20} className="text-red-600" />
                <p className="text-sm font-bold text-red-800">
                  🚨 CRITICAL SECURITY ALERTS DETECTED
                </p>
              </div>
              <p className="text-sm text-red-700">
                One or more critical security alerts require immediate
                attention. Review the alerts below and take appropriate action.
              </p>
            </div>
          )}

          {/* Alerts Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Active Security Alerts ({unresolved} unresolved)
              </h2>
            </div>
            <SecurityDataTable
              columns={columns}
              data={alerts}
              loading={loading}
              pagination={
                total > 0
                  ? {
                      page,
                      total,
                      pages,
                      onPageChange: setPage,
                    }
                  : undefined
              }
            />
          </div>

          {/* Alert Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                type: "brute_force_ip",
                icon: "🌐",
                label: "Brute Force (IP)",
                desc: "Multiple failed login attempts from a single IP address",
              },
              {
                type: "targeted_user",
                icon: "👤",
                label: "Targeted User",
                desc: "Focused attack on a specific user account",
              },
              {
                type: "distributed_attack",
                icon: "🕸️",
                label: "Distributed Attack",
                desc: "Coordinated attack from multiple IP addresses",
              },
            ].map((cat) => {
              const catCount = alerts.filter(
                (a) => a.type === cat.type && a.status === "unresolved",
              ).length;
              return (
                <div
                  key={cat.type}
                  className={`p-4 rounded-lg border ${
                    catCount > 0
                      ? "bg-red-50 border-red-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <p className="font-semibold text-gray-900 mb-1">
                    {cat.icon} {cat.label}
                  </p>
                  <p className="text-xs text-gray-600 mb-2">{cat.desc}</p>
                  <span
                    className={`text-sm font-bold ${
                      catCount > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {catCount > 0 ? `${catCount} active alert(s)` : "No alerts"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* About Security Alerts */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              🔔 Security alerts are automatically generated from suspicious
              activity patterns detected in the audit logs. Alerts are derived
              from the same data used for suspicious patterns on the main
              dashboard. Resolving an alert acknowledges it has been reviewed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAlertsPage;
