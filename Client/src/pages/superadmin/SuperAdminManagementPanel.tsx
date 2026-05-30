import React, { useState } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { DashboardTopTabNav } from "@components/dashboards/DashboardTopTabNav";
import { useToast } from "@components/common/Toast";
import {
  LayoutDashboard,
  Users,
  FileText,
  Megaphone,
  Settings,
  ShieldCheck,
  BarChart3,
  Activity,
  Server,
  type LucideIcon,
} from "lucide-react";
import { OverviewTab } from "./management/OverviewTab";
import { UsersTab } from "./management/UsersTab";
import { ContentTab } from "./management/ContentTab";
import { AnnouncementsTab } from "./management/AnnouncementsTab";
import { PermissionsTab } from "./management/PermissionsTab";
import { SettingsTab } from "./management/SettingsTab";
import { AuditTab } from "./management/AuditTab";
import { ReportsTab } from "./management/ReportsTab";
import { SystemTab } from "./management/SystemTab";

type TabType =
  | "overview"
  | "users"
  | "content"
  | "announcements"
  | "permissions"
  | "settings"
  | "audit"
  | "reports"
  | "system";

const TABS: { id: TabType; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "content", label: "Content", icon: FileText },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "permissions", label: "Permissions", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "audit", label: "Audit Logs", icon: Activity },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "system", label: "System", icon: Server },
];

export const SuperAdminManagementPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const toast = useToast();

  return (
    <DashboardLayout
      title="Management Panel"
      subtitle="Complete platform administration & analytics"
      disableTopPadding={true}
    >
      <div className="space-y-6">
        <DashboardTopTabNav
          tabs={TABS.map(({ id, label, icon }) => ({ id, label, icon }))}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabType)}
          fill={true}
        />

        <div className="animate-fadeIn">
          {activeTab === "overview" && <OverviewTab toast={toast} />}
          {activeTab === "users" && <UsersTab toast={toast} />}
          {activeTab === "content" && <ContentTab toast={toast} />}
          {activeTab === "announcements" && <AnnouncementsTab toast={toast} />}
          {activeTab === "permissions" && <PermissionsTab toast={toast} />}
          {activeTab === "settings" && <SettingsTab toast={toast} />}
          {activeTab === "audit" && <AuditTab toast={toast} />}
          {activeTab === "reports" && <ReportsTab toast={toast} />}
          {activeTab === "system" && <SystemTab />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminManagementPanel;
