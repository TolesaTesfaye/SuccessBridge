import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { SuperAdminTopTabNav } from "@dashboards/superadmin/components/SuperAdminTopTabNav";
import { StudentViewWrapper } from "@dashboards/superadmin/components/StudentViewWrapper";

type UniversityLevel = "freshman" | "remedial";

const UNIVERSITY_TABS = [
  {
    id: "freshman",
    label: "Freshman",
    shortLabel: "Freshman",
  },
  {
    id: "remedial",
    label: "Remedial",
    shortLabel: "Remedial",
  },
] as const;

const isUniversityLevel = (tab: string): tab is UniversityLevel =>
  UNIVERSITY_TABS.some((t) => t.id === tab);

export const SuperAdminUniversityView: React.FC = () => {
  const location = useLocation();
  const [activeLevel, setActiveLevel] = useState<UniversityLevel>("freshman");
  const [activeStudentTab, setActiveStudentTab] = useState<
    "home" | "learning" | "hub"
  >("home");

  useEffect(() => {
    const tab = location.state?.activeTab;
    if (typeof tab === "string" && isUniversityLevel(tab)) {
      setActiveLevel(tab);
    }
  }, [location.state]);

  return (
    <DashboardLayout
      title="University View"
      subtitle="Preview student experience by university level"
      disableTopPadding={true}
      mobileNavActiveTab={activeStudentTab}
      onMobileNavTabChange={setActiveStudentTab}
    >
      <div className="space-y-0 pb-8">
        <SuperAdminTopTabNav
          tabs={[...UNIVERSITY_TABS]}
          activeTab={activeLevel}
          onTabChange={(id) => {
            if (isUniversityLevel(id)) setActiveLevel(id);
          }}
          fill={true}
        />
        <div className="animate-fadeIn pt-4 md:pt-6 px-2 md:px-0">
          <StudentViewWrapper
            type="university"
            level={activeLevel}
            activeTab={activeStudentTab}
            onActiveTabChange={setActiveStudentTab}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminUniversityView;
