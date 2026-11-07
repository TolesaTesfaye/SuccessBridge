import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { DashboardTopTabNav } from "@components/dashboards/DashboardTopTabNav";

const SECURITY_TABS = [
  { id: "overview", label: "Overview", path: "/superadmin/security" },
  { id: "audit-logs", label: "Audit Logs", path: "/superadmin/security/audit-logs" },
  { id: "failed-logins", label: "Failed Logins", path: "/superadmin/security/failed-logins" },
  { id: "sessions", label: "Sessions", path: "/superadmin/security/sessions" },
  { id: "rate-limits", label: "Rate Limits", path: "/superadmin/security/rate-limits" },
  { id: "uploads", label: "File Uploads", path: "/superadmin/security/uploads" },
  { id: "alerts", label: "Alerts", path: "/superadmin/security/alerts" },
  { id: "csrf", label: "CSRF", path: "/superadmin/security/csrf" },
  { id: "headers", label: "Headers", path: "/superadmin/security/headers" },
];

const getActiveTab = (path: string) => {
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

interface SecurityTabLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const SecurityTabLayout: React.FC<SecurityTabLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);

  return (
    <DashboardLayout title={title} subtitle={subtitle} disableTopPadding={true}>
      <div className="space-y-6">
        <DashboardTopTabNav
          tabs={SECURITY_TABS.map(({ id, label }) => ({
            id,
            label,
            shortLabel: label,
          }))}
          activeTab={activeTab}
          fill
          onTabChange={(id) => {
            const tab = SECURITY_TABS.find((t) => t.id === id);
            if (tab) navigate(tab.path);
          }}
          stickyClassName="-mx-6 px-6"
        />
        <div className="p-3 md:p-6 space-y-4 md:space-y-6 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
};
