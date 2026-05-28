import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield,
  BarChart3,
  FileText,
  AlertCircle,
  Lock,
  Activity,
  Zap,
  Settings,
  Network,
  Menu,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const menuItems = [
  {
    label: "Dashboard Overview",
    path: "/superadmin/security",
    icon: Shield,
  },
  {
    label: "Audit Logs",
    path: "/superadmin/security/audit-logs",
    icon: FileText,
  },
  {
    label: "Failed Logins",
    path: "/superadmin/security/failed-logins",
    icon: AlertCircle,
  },
  {
    label: "Active Sessions",
    path: "/superadmin/security/sessions",
    icon: Activity,
  },
  {
    label: "Rate Limiting",
    path: "/superadmin/security/rate-limits",
    icon: Zap,
  },
  {
    label: "File Uploads",
    path: "/superadmin/security/uploads",
    icon: Lock,
  },
  {
    label: "Security Alerts",
    path: "/superadmin/security/alerts",
    icon: AlertCircle,
  },
  {
    label: "CSRF Tokens",
    path: "/superadmin/security/csrf",
    icon: Network,
  },
  {
    label: "Security Headers",
    path: "/superadmin/security/headers",
    icon: Shield,
  },
];

export const AdminSecuritySidebar: React.FC<AdminSidebarProps> = ({
  isOpen = true,
  onClose,
}) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 h-screen w-64 bg-gray-900 dark:bg-slate-950 text-white overflow-y-auto transition-all duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-lg">Security</span>
              <p className="text-[10px] text-gray-400">Control Center</p>
            </div>
          </div>

          {/* Close button for mobile */}
          {onClose && (
            <button
              className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          )}

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <BarChart3 size={20} />
              <span className="text-sm font-medium">Admin Dashboard</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSecuritySidebar;
