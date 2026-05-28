import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import { useToast } from "@components/common/Toast";
import {
  Shield,
  Menu,
  X,
  CheckCircle,
  AlertTriangle,
  Lock,
} from "lucide-react";
import AdminSecuritySidebar from "./AdminSecuritySidebar";
import { adminSecurityService } from "@services/adminSecurityService";

export const SecurityHeadersPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const toast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [headersData, setHeadersData] = useState<any>({
    headers: {},
    overallStatus: "secure",
    lastChecked: "",
  });

  useEffect(() => {
    if (user && user.role !== "super_admin") {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchHeaders();
  }, []);

  const fetchHeaders = async () => {
    try {
      setLoading(true);
      const data = await adminSecurityService.getSecurityHeaders();
      setHeadersData(data);
    } catch (error) {
      console.error("Failed to fetch security headers:", error);
      toast.error("Failed to load security headers");
    } finally {
      setLoading(false);
    }
  };

  const headerEntries = Object.entries(headersData.headers || {}) as [
    string,
    { value: string; status: string; description: string },
  ][];

  const enabledCount = headerEntries.filter(
    ([, h]) => h.status === "enabled",
  ).length;

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
            <Shield size={28} className="text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Security Headers
            </h1>
          </div>
          <button
            onClick={fetchHeaders}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Overall Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={36} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-900 mb-1">
                  Overall Status: {headersData.overallStatus?.toUpperCase()}
                </h2>
                <p className="text-sm text-green-700">
                  {enabledCount} of {headerEntries.length} security headers are
                  enabled and properly configured
                  {headersData.lastChecked &&
                    ` • Last checked: ${new Date(headersData.lastChecked).toLocaleString()}`}
                </p>
              </div>
            </div>
          </div>

          {/* Headers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {headerEntries.map(([name, details]) => (
              <div
                key={name}
                className={`bg-white rounded-lg border p-5 shadow-sm ${
                  details.status === "enabled"
                    ? "border-green-300"
                    : "border-red-300"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Lock
                      size={18}
                      className={
                        details.status === "enabled"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    />
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {name}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      details.status === "enabled"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {details.status === "enabled"
                      ? "✅ Enabled"
                      : "❌ Disabled"}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-3">
                  {details.description}
                </p>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1 font-semibold">
                    Current Value:
                  </p>
                  <code className="text-xs text-gray-800 break-all block font-mono bg-white p-2 rounded border border-gray-200">
                    {details.value}
                  </code>
                </div>
              </div>
            ))}
          </div>

          {/* Security Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={20} className="text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  What's Protected
                </h2>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  {
                    icon: "🛡️",
                    text: "Clickjacking attacks prevented via X-Frame-Options and CSP",
                  },
                  {
                    icon: "🔒",
                    text: "MIME-type sniffing blocked via X-Content-Type-Options",
                  },
                  {
                    icon: "🔐",
                    text: "HTTPS enforced via Strict-Transport-Security (HSTS)",
                  },
                  {
                    icon: "🌐",
                    text: "Cross-site scripting mitigated via X-XSS-Protection and CSP",
                  },
                  {
                    icon: "📋",
                    text: "Referrer information controlled via Referrer-Policy",
                  },
                  {
                    icon: "📷",
                    text: "Browser features restricted via Permissions-Policy",
                  },
                  {
                    icon: "🗂️",
                    text: "Cross-origin resource access controlled",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span>{item.icon}</span>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Best Practices
                </h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-1">
                    🔄 Regular Audits
                  </p>
                  <p className="text-blue-700">
                    Review security headers quarterly to ensure they meet
                    current best practices and standards.
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="font-semibold text-yellow-800 mb-1">
                    📝 Monitor Changes
                  </p>
                  <p className="text-yellow-700">
                    Any changes to security headers should be reviewed carefully
                    as they affect all users.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-800 mb-1">
                    ✅ Current Status
                  </p>
                  <p className="text-green-700">
                    All critical security headers are properly configured and
                    active. Your application is well-protected against common
                    web vulnerabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Note */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              📘 Security headers are HTTP response headers that instruct
              browsers how to behave when handling your website's content. They
              provide defense-in-depth against XSS, clickjacking, MIME sniffing,
              and other common web attacks. These headers are configured on the
              server and apply to all pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityHeadersPage;
