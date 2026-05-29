import React from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { AdminDashboardContent } from "@dashboards/admin/AdminDashboard";

export const SuperAdminAdminView: React.FC = () => {
  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Manage structures with live database data"
      showFooter={true}
      disableTopPadding={true}
    >
      <div className="space-y-0 pb-8">
        <AdminDashboardContent />
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminAdminView;
