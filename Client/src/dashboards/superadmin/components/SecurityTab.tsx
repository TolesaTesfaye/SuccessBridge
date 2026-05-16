import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { adminSecurityService } from "@services/adminSecurityService";

interface SecurityOverviewMetrics {
  totalEvents24h: number;
  totalEventsAllTime: number;
  failedLogins24h: number;
  rateLimitViolations24h: number;
  successfulLogins24h: number;
}

interface TimelineEvent {
  timestamp: string;
  count: number;
  failureCount: number;
}

interface FailedLogin {
  id: string;
  userId: string;
  action: string;
  resource: string;
  status: "success" | "failure";
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  details?: Record<string, any>;
  errorMessage?: string;
}

interface FailedLoginsByIP {
  ipAddress: string;
  failureCount: number;
  lastAttempt: Date;
  targetUsers: string[];
}

interface FailedLoginsByUser {
  email: string;
  userId: string;
  failureCount: number;
  lastAttempt: Date;
  sourceIPs: string[];
}

interface SuspiciousPattern {
  type: "brute_force_ip" | "targeted_user" | "distributed_attack";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  affectedCount: number;
  timestamp: Date;
}

interface SecurityCheck {
  name: string;
  status: "pass" | "warning" | "fail";
  description: string;
  recommendation?: string;
}

export const SecurityTab: React.FC = () => {
  const [overview, setOverview] = useState<SecurityOverviewMetrics | null>(
    null,
  );
  const [failedLogins, setFailedLogins] = useState<FailedLogin[]>([]);
  const [failedLoginsByIP, setFailedLoginsByIP] = useState<FailedLoginsByIP[]>(
    [],
  );
  const [failedLoginsByUser, setFailedLoginsByUser] = useState<
    FailedLoginsByUser[]
  >([]);
  const [suspiciousPatterns, setSuspiciousPatterns] = useState<
    SuspiciousPattern[]
  >([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<
    "overview" | "logins" | "patterns" | "audit"
  >("overview");

  // Security audit checks based on SECURITY_AUDIT_REPORT.md
  const securityChecks: SecurityCheck[] = [
    {
      name: "XSS Protection",
      status: "pass",
      description:
        "DOMPurify sanitization implemented for dangerouslySetInnerHTML usage",
      recommendation: "Regularly update DOMPurify to latest version",
    },
    {
      name: "Token Storage",
      status: "warning",
      description: "JWT tokens stored in localStorage (vulnerable to XSS)",
      recommendation: "Consider httpOnly cookies for production deployment",
    },
    {
      name: "Input Validation",
      status: "pass",
      description: "Client-side validation implemented with Zod schemas",
      recommendation:
        "Continue validating all user inputs on both client and server",
    },
    {
      name: "Password Requirements",
      status: "pass",
      description:
        "Strong password requirements enforced (12+ chars, mixed case, numbers, special chars)",
      recommendation: "Consider implementing password breach checking",
    },
    {
      name: "Rate Limiting",
      status: "pass",
      description: "Rate limiting implemented on backend (500 req/15min)",
      recommendation: "Monitor rate limit violations in security dashboard",
    },
    {
      name: "Session Management",
      status: "pass",
      description:
        "30-minute session timeout with inactivity tracking implemented",
      recommendation: "Adjust timeout duration based on security requirements",
    },
    {
      name: "Content Security Policy",
      status: "pass",
      description: "CSP headers configured via Helmet middleware on server",
      recommendation: "Review CSP reports and adjust directives as needed",
    },
    {
      name: "Sensitive Data Logging",
      status: "pass",
      description: "Secure logger implemented that sanitizes sensitive output",
      recommendation: "Regularly review logs for accidental data exposure",
    },
    {
      name: "HTTPS Enforcement",
      status: "pass",
      description: "HTTPS enforced in production configuration",
      recommendation: "Verify SSL certificates are valid and up-to-date",
    },
    {
      name: "File Upload Validation",
      status: "pass",
      description: "File type and size validation implemented",
      recommendation: "Regularly review allowed file types",
    },
    {
      name: "CSRF Protection",
      status: "pass",
      description:
        "CSRF token validation implemented for state-changing operations",
      recommendation: "Monitor CSRF violation logs",
    },
    {
      name: "Audit Logging",
      status: "pass",
      description: "Security event logging implemented with database storage",
      recommendation: "Review logs regularly for suspicious activity",
    },
  ];

  useEffect(() => {
    const fetchSecurityData = async () => {
      try {
        const [
          overviewData,
          failedLoginsData,
          failedLoginsByIPData,
          failedLoginsByUserData,
          suspiciousPatternsData,
          timelineData,
        ] = await Promise.all([
          adminSecurityService.getOverview().catch(() => null),
          adminSecurityService
            .getFailedLogins(1, 10)
            .catch(() => ({ logs: [], total: 0 })),
          adminSecurityService.getFailedLoginsByIP(5).catch(() => []),
          adminSecurityService.getFailedLoginsByUser(5).catch(() => []),
          adminSecurityService.getSuspiciousPatterns().catch(() => []),
          adminSecurityService.getEventsTimeline(24).catch(() => []),
        ]);

        setOverview(overviewData);
        setFailedLogins(failedLoginsData.logs || []);
        setFailedLoginsByIP(failedLoginsByIPData);
        setFailedLoginsByUser(failedLoginsByUserData);
        setSuspiciousPatterns(suspiciousPatternsData);
        setTimeline(timelineData);
      } catch (error) {
        console.error("Failed to fetch security data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSecurityData();
  }, []);

  const getTimeAgo = (date: Date | string) => {
    const now = new Date();
    const created = new Date(date);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "warning":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "fail":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return "✅";
      case "warning":
        return "⚠️";
      case "fail":
        return "❌";
      default:
        return "❓";
    }
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
      {/* Sub-tabs for Security section */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeSubTab === "overview"
              ? "bg-purple-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
          onClick={() => setActiveSubTab("overview")}
        >
          📊 Overview
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeSubTab === "logins"
              ? "bg-purple-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
          onClick={() => setActiveSubTab("logins")}
        >
          🔐 Login Attempts
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeSubTab === "patterns"
              ? "bg-purple-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
          onClick={() => setActiveSubTab("patterns")}
        >
          🚨 Suspicious Patterns
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
            activeSubTab === "audit"
              ? "bg-purple-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
          onClick={() => setActiveSubTab("audit")}
        >
          📋 Security Audit
        </button>
      </div>

      {/* Overview Tab */}
      {activeSubTab === "overview" && (
        <div className="space-y-4 md:space-y-6">
          {/* Key Metrics */}
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

          {/* Suspicious Patterns */}
          {suspiciousPatterns.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🚨</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    Suspicious Patterns Detected
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

          {/* Failed Logins by IP */}
          {failedLoginsByIP.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🌐</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    Top IPs with Failed Logins
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  {failedLoginsByIP.map((ipData, idx) => (
                    <div
                      key={`ip-${idx}`}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                          {ipData.ipAddress}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Targets: {ipData.targetUsers.length} users
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {getTimeAgo(ipData.lastAttempt)}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          {ipData.failureCount} failures
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {/* Failed Logins by User */}
          {failedLoginsByUser.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    Users with Failed Logins
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  {failedLoginsByUser.map((userData, idx) => (
                    <div
                      key={`user-${idx}`}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                          {userData.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {userData.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          IPs: {userData.sourceIPs.length}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          {userData.failureCount} failures
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      )}

      {/* Login Attempts Tab */}
      {activeSubTab === "logins" && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🔐</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                Recent Login Attempts
              </span>
            </div>
          </CardHeader>
          <CardBody>
            {failedLogins.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">
                        User
                      </th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">
                        Status
                      </th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">
                        IP Address
                      </th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">
                        Time
                      </th>
                      <th className="text-left py-3 px-3 font-semibold text-slate-600 dark:text-slate-400">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {failedLogins.map((login) => (
                      <tr
                        key={login.id}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      >
                        <td className="py-3 px-3">
                          <span className="font-medium text-slate-900 dark:text-white">
                            {login.userId}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              login.status === "success"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {login.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                          {login.ipAddress}
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                          {getTimeAgo(login.timestamp)}
                        </td>
                        <td className="py-3 px-3 text-xs text-slate-500 dark:text-slate-500 max-w-xs truncate">
                          {login.errorMessage || login.action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p className="text-4xl mb-2">🎉</p>
                <p className="text-sm">No failed login attempts recorded</p>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Suspicious Patterns Tab */}
      {activeSubTab === "patterns" && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🚨</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                Suspicious Activity Patterns
              </span>
            </div>
          </CardHeader>
          <CardBody>
            {suspiciousPatterns.length > 0 ? (
              <div className="space-y-4">
                {suspiciousPatterns.map((pattern, idx) => (
                  <div
                    key={`pattern-detail-${idx}`}
                    className={`p-4 rounded-xl border-2 ${
                      pattern.severity === "critical"
                        ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800"
                        : pattern.severity === "high"
                          ? "bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-800"
                          : pattern.severity === "medium"
                            ? "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-800"
                            : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-800"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">
                        {getPatternIcon(pattern.type)}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold ${getSeverityColor(pattern.severity)} text-white`}
                          >
                            {pattern.severity.toUpperCase()}
                          </span>
                          <span className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                            {pattern.type.replace(/_/g, " ")}
                          </span>
                        </div>
                        <p className="text-base font-medium text-slate-900 dark:text-white mb-2">
                          {pattern.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                          <span>
                            📊 Affected: {pattern.affectedCount} entities
                          </span>
                          <span>🕐 {getTimeAgo(pattern.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-5xl mb-4">🛡️</p>
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                  No suspicious patterns detected
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  The system is monitoring for brute force attacks, targeted
                  attacks, and distributed attacks
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Security Audit Tab */}
      {activeSubTab === "audit" && (
        <div className="space-y-4 md:space-y-6">
          {/* Audit Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📋</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  Security Audit Summary
                </span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {securityChecks.filter((c) => c.status === "pass").length}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    Passed
                  </p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                  <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                    {
                      securityChecks.filter((c) => c.status === "warning")
                        .length
                    }
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    Warnings
                  </p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {securityChecks.filter((c) => c.status === "fail").length}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Failed
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Security Checks List */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🔍</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  Detailed Security Checks
                </span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {securityChecks.map((check, idx) => (
                  <div
                    key={`check-${idx}`}
                    className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">
                        {getStatusIcon(check.status)}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {check.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(check.status)}`}
                          >
                            {check.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {check.description}
                        </p>
                        {check.recommendation && (
                          <div className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <span className="text-sm">💡</span>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                              {check.recommendation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => window.location.reload()}>
              🔄 Refresh Security Data
            </Button>
            <Button variant="secondary">📥 Export Security Report</Button>
            <Button variant="danger">🚨 Trigger Security Scan</Button>
          </div>
        </div>
      )}
    </div>
  );
};
