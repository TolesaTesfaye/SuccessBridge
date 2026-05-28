import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { adminSecurityService } from "@services/adminSecurityService";

interface SecurityOverviewMetrics {
  totalEvents24h: number;
  totalEventsAllTime: number;
  failedLogins24h: number;
  rateLimitViolations24h: number;
  successfulLogins24h: number;
}

interface SuspiciousPattern {
  type: "brute_force_ip" | "targeted_user" | "distributed_attack";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  affectedCount: number;
  timestamp: Date;
}

export const SecurityTab: React.FC = () => {
  const navigate = useNavigate();
  const [overview, setOverview] = useState<SecurityOverviewMetrics | null>(
    null,
  );
  const [suspiciousPatterns, setSuspiciousPatterns] = useState<
    SuspiciousPattern[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSecurityData = async () => {
      try {
        const [overviewData, suspiciousPatternsData] = await Promise.all([
          adminSecurityService.getOverview().catch(() => null),
          adminSecurityService.getSuspiciousPatterns().catch(() => []),
        ]);

        setOverview(overviewData);
        setSuspiciousPatterns(suspiciousPatternsData);
      } catch (error) {
        console.error("Failed to fetch security data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityData();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPatternIcon = (type: string) => {
    switch (type) {
      case "brute_force_ip":
        return "🔨";
      case "targeted_user":
        return "🎯";
      case "distributed_attack":
        return "🌐";
      default:
        return "⚠️";
    }
  };

  const getTimeAgo = (date: Date | string) => {
    const now = new Date();
    const created = new Date(date);
    const diffMins = Math.floor((now.getTime() - created.getTime()) / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${Math.floor(diffHours / 24)} day${Math.floor(diffHours / 24) > 1 ? "s" : ""} ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-purple-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Quick Navigation Cards to Detailed Security Pages */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Full Dashboard",
            path: "/superadmin/security",
            icon: "🛡️",
            color: "from-purple-500 to-indigo-600",
          },
          {
            label: "Audit Logs",
            path: "/superadmin/security/audit-logs",
            icon: "📋",
            color: "from-blue-500 to-cyan-600",
          },
          {
            label: "Failed Logins",
            path: "/superadmin/security/failed-logins",
            icon: "🚫",
            color: "from-red-500 to-orange-600",
          },
          {
            label: "Sessions",
            path: "/superadmin/security/sessions",
            icon: "👥",
            color: "from-green-500 to-emerald-600",
          },
          {
            label: "Rate Limits",
            path: "/superadmin/security/rate-limits",
            icon: "⚡",
            color: "from-yellow-500 to-amber-600",
          },
          {
            label: "File Uploads",
            path: "/superadmin/security/uploads",
            icon: "📤",
            color: "from-teal-500 to-green-600",
          },
          {
            label: "Alerts",
            path: "/superadmin/security/alerts",
            icon: "🔔",
            color: "from-pink-500 to-rose-600",
          },
          {
            label: "CSRF & Headers",
            path: "/superadmin/security/csrf",
            icon: "🔒",
            color: "from-indigo-500 to-purple-600",
          },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white hover:scale-105 transition-transform shadow-lg text-left`}
          >
            <span className="text-2xl block mb-1">{item.icon}</span>
            <span className="text-xs font-bold">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-red-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
                🚫
              </div>
              <p className="text-xs md:text-sm text-red-600 dark:text-red-400 font-bold uppercase tracking-wide">
                Failed Logins (24h)
              </p>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-red-600 to-red-800 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
              {overview?.failedLogins24h || 0}
            </p>
          </CardBody>
        </Card>

        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
                ✅
              </div>
              <p className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wide">
                Successful Logins (24h)
              </p>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-emerald-600 to-emerald-800 dark:from-emerald-400 dark:to-emerald-600 bg-clip-text text-transparent">
              {overview?.successfulLogins24h || 0}
            </p>
          </CardBody>
        </Card>

        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
                ⚡
              </div>
              <p className="text-xs md:text-sm text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wide">
                Rate Limit Violations
              </p>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent">
              {overview?.rateLimitViolations24h || 0}
            </p>
          </CardBody>
        </Card>

        <Card className="overflow-hidden relative group hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent"></div>
          <CardBody className="p-4 md:p-5 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm shadow-lg">
                📈
              </div>
              <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wide">
                Total Events (24h)
              </p>
            </div>
            <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              {overview?.totalEvents24h || 0}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Suspicious Patterns Alert */}
      {suspiciousPatterns.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🚨</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                Suspicious Patterns Detected ({suspiciousPatterns.length})
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {suspiciousPatterns.map((pattern, idx) => (
                <div
                  key={`pattern-${idx}`}
                  className="flex items-start gap-3 p-3 bg-red-50/50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/30"
                >
                  <span className="text-2xl">
                    {getPatternIcon(pattern.type)}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${getSeverityColor(pattern.severity)} text-white`}
                      >
                        {pattern.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                        {pattern.type.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {pattern.description}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Affected: {pattern.affectedCount} •{" "}
                      {getTimeAgo(pattern.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* No patterns - show healthy badge */}
      {suspiciousPatterns.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-6">
              <p className="text-5xl mb-3">🛡️</p>
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                All Clear
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                No suspicious patterns detected. Click the cards above to
                explore detailed security data.
              </p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
