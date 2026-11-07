import React, { useState } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { DashboardTopTabNav } from "@components/dashboards/DashboardTopTabNav";
import { useToast } from "@components/common/Toast";
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

const TABS: { id: TabType; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "content", label: "Content" },
  { id: "announcements", label: "Announcements" },
  { id: "permissions", label: "Permissions" },
  { id: "settings", label: "Settings" },
  { id: "audit", label: "Audit Logs" },
  { id: "reports", label: "Reports" },
  { id: "system", label: "System" },
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
          tabs={TABS.map(({ id, label }) => ({ id, label, shortLabel: label }))}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabType)}
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
