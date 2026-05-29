import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import { useToast } from "@components/common/Toast";
import {
  Shield,
  AlertTriangle,
  Users,
  Lock,
  Activity,
  ShieldCheck,
  Eye,
  Ban,
  Gauge,
  FileText,
  AlertCircle,
  Zap,
  Network,
} from "lucide-react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { DashboardTopTabNav } from "@components/dashboards/DashboardTopTabNav";
import SecurityMetricCard from "./SecurityMetricCard";
import SecurityStatusCard from "./SecurityStatusCard";
import { adminSecurityService } from "@services/adminSecurityService";

export const SecurityDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [patterns, setPatterns] = useState<any[]>([]);

  // Determine active tab from URL
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/superadmin/security") return "overview";
    if (path.includes("audit-logs")) return "audit-logs";
    if (path.includes("failed-logins")) return "failed-logins";
    if (path.includes("sessions")) return "sessions";
    if (path.includes("rate-limits")) return "rate-limits";
    if (path.includes("uploads")) return "uploads";
    if (path.includes("alerts")) return "alerts";
    if (path.includes("csrf")) return "csrf";
    if (path.includes("headers")) return "headers";
    return "overview";
  };

  const activeTab = getActiveTab();

  useEffect(() => {
    if (user && user.role !== "super_admin") {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [metricsData, , patternsData] = await Promise.all([
          adminSecurityService.getOverview(),
          adminSecurityService.getEventsTimeline(24),
          adminSecurityService.getSuspiciousPatterns(),
        ]);
        setMetrics(metricsData);
        setPatterns(patternsData);
      } catch (error) {
        console.error("Failed to fetch security data:", error);
        toast.error("Failed to load security dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: Shield,
      path: "/superadmin/security",
    },
    {
      id: "audit-logs",
      label: "Audit Logs",
      icon: FileText,
      path: "/superadmin/security/audit-logs",
    },
    {
      id: "failed-logins",
      label: "Failed Logins",
      icon: AlertCircle,
      path: "/superadmin/security/failed-logins",
    },
    {
      id: "sessions",
      label: "Sessions",
      icon: Users,
      path: "/superadmin/security/sessions",
    },
    {
      id: "rate-limits",
      label: "Rate Limits",
      icon: Zap,
      path: "/superadmin/security/rate-limits",
    },
    {
      id: "uploads",
      label: "File Uploads",
      icon: Lock,
      path: "/superadmin/security/uploads",
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: AlertTriangle,
      path: "/superadmin/security/alerts",
    },
    {
      id: "csrf",
      label: "CSRF",
      icon: Network,
      path: "/superadmin/security/csrf",
    },
    {
      id: "headers",
      label: "Headers",
      icon: ShieldCheck,
      path: "/superadmin/security/headers",
    },
  ];

  const securityFeatures = [
    {
      name: "XSS Protection",
      status: "active" as const,
      description: "Input sanitization enabled",
    },
    {
      name: "CSRF Protection",
      status: "active" as const,
      description: "Token validation active",
    },
    {
      name: "HTTPS Enforcement",
      status: "active" as const,
      description: "All connections secured",
    },
    {
      name: "Rate Limiting",
      status: "active" as const,
      description: "15min window, 500 req limit",
    },
    {
      name: "Input Validation",
      status: "active" as const,
      description: "All inputs validated",
    },
    {
      name: "File Upload Restrictions",
      status: "active" as const,
      description: "Type and size limits",
    },
    {
      name: "Audit Logging",
      status: "active" as const,
      description: "All events logged",
    },
    {
      name: "Security Headers",
      status: "active" as const,
      description: "CSP, X-Frame, HSTS",
    },
  ];

  const suspiciousPatterns = patterns.map((p) => ({
    type: p.type,
    severity: p.severity,
    description: p.description,
    count: p.affectedCount,
  }));

  return (
    <DashboardLayout
      title="Security Dashboard"
      subtitle="Real-time security monitoring & threat analysis"
    >
      <div className="space-y-6">
        <DashboardTopTabNav
          tabs={tabs.map(({ id, label, icon }) => ({
            id,
            label,
            icon,
            shortLabel:
              id === "audit-logs"
                ? "Audit"
                : id === "failed-logins"
                  ? "Logins"
                  : id === "rate-limits"
                    ? "Limits"
                    : undefined,
          }))}
          activeTab={activeTab}
          onTabChange={(id) => {
            const tab = tabs.find((t) => t.id === id);
            if (tab) navigate(tab.path);
          }}
          stickyClassName="-mx-6 px-6"
        />

        {/* Content */}
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {/* Hero Summary */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Security Overview</h2>
                <p className="text-blue-200 text-sm">
                  Monitoring all security events across the platform
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">
                    {metrics?.totalEvents24h || 0}
                  </p>
                  <p className="text-blue-200 text-xs mt-0.5">Events Today</p>
                </div>
                <div className="w-px h-10 bg-blue-500/40" />
                <div className="text-center">
                  <p className="text-3xl font-bold">
                    {metrics?.totalEventsAllTime || 0}
                  </p>
                  <p className="text-blue-200 text-xs mt-0.5">All Time</p>
                </div>
                <div className="w-px h-10 bg-blue-500/40" />
                <div className="text-center">
                  <p className="text-3xl font-bold">
                    {suspiciousPatterns.length}
                  </p>
                  <p className="text-blue-200 text-xs mt-0.5">Threats</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <SecurityMetricCard
              title="Security Events (24h)"
              value={metrics?.totalEvents24h || 0}
              icon="📊"
              loading={loading}
            />
            <SecurityMetricCard
              title="Failed Logins (24h)"
              value={metrics?.failedLogins24h || 0}
              icon="🚫"
              loading={loading}
            />
            <SecurityMetricCard
              title="Successful Logins (24h)"
              value={metrics?.successfulLogins24h || 0}
              icon="✅"
              loading={loading}
            />
            <SecurityMetricCard
              title="Rate Limit Violations"
              value={metrics?.rateLimitViolations24h || 0}
              icon="⏱️"
              loading={loading}
            />
            <SecurityMetricCard
              title="All-Time Events"
              value={metrics?.totalEventsAllTime || 0}
              icon="📈"
              loading={loading}
            />
          </div>

          {/* Security Status */}
          <div className="bg-white dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700/50 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck
                size={22}
                className="text-blue-600 dark:text-blue-400"
              />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Security Features Status
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SecurityStatusCard
                title="Core Protections"
                items={securityFeatures.slice(0, 4)}
                icon={Shield}
                loading={loading}
              />
              <SecurityStatusCard
                title="Additional Protections"
                items={securityFeatures.slice(4)}
                icon={Lock}
                loading={loading}
              />
            </div>
          </div>

          {/* Suspicious Patterns */}
          {suspiciousPatterns.length > 0 && (
            <div className="bg-white dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700/50 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                  <AlertTriangle size={18} className="text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Suspicious Patterns Detected ({suspiciousPatterns.length})
                </h2>
              </div>
              <div className="space-y-3">
                {suspiciousPatterns.map((pattern, idx) => {
                  const severityColors: Record<string, string> = {
                    critical:
                      "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700/50",
                    high: "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700/50",
                    medium:
                      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700/50",
                    low: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700/50",
                  };
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border ${severityColors[pattern.severity]}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {pattern.type.replace(/_/g, " ").toUpperCase()}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-slate-300 mt-1">
                            {pattern.description}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-white bg-red-600 dark:bg-red-500 shadow-sm">
                          {pattern.count}{" "}
                          {pattern.count === 1 ? "incident" : "incidents"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-white dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700/50 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <Activity
                size={22}
                className="text-blue-600 dark:text-blue-400"
              />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/superadmin/security/audit-logs")}
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200 dark:border-blue-800/30 rounded-xl hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700/50 transition-all duration-300 text-left group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 shadow-md">
                  <Eye size={18} className="text-white" />
                </div>
                <p className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  📋 View Audit Logs
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  All system events
                </p>
              </button>
              <button
                onClick={() => navigate("/superadmin/security/failed-logins")}
                className="p-4 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/10 border border-red-200 dark:border-red-800/30 rounded-xl hover:shadow-lg hover:border-red-300 dark:hover:border-red-700/50 transition-all duration-300 text-left group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-3 shadow-md">
                  <Ban size={18} className="text-white" />
                </div>
                <p className="font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  🚫 Failed Logins
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  Monitor threats
                </p>
              </button>
              <button
                onClick={() => navigate("/superadmin/security/sessions")}
                className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 border border-emerald-200 dark:border-emerald-800/30 rounded-xl hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700/50 transition-all duration-300 text-left group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3 shadow-md">
                  <Users size={18} className="text-white" />
                </div>
                <p className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  👥 Active Sessions
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  User connections
                </p>
              </button>
              <button
                onClick={() => navigate("/superadmin/security/rate-limits")}
                className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/10 border border-amber-200 dark:border-amber-800/30 rounded-xl hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700/50 transition-all duration-300 text-left group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mb-3 shadow-md">
                  <Gauge size={18} className="text-white" />
                </div>
                <p className="font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  ⏱️ Rate Limiting
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  Request limits
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecurityDashboard;
