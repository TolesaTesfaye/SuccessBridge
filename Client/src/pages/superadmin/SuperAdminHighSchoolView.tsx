import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { SuperAdminTopTabNav } from "@dashboards/superadmin/components/SuperAdminTopTabNav";
import { StudentViewWrapper } from "@dashboards/superadmin/components/StudentViewWrapper";

type HighSchoolGrade = "grade_9" | "grade_10" | "grade_11" | "grade_12";

const HIGH_SCHOOL_TABS = [
  { id: "grade_9", label: "Grade 9", shortLabel: "Grade 9" },
  { id: "grade_10", label: "Grade 10", shortLabel: "Grade 10" },
  { id: "grade_11", label: "Grade 11", shortLabel: "Grade 11" },
  { id: "grade_12", label: "Grade 12", shortLabel: "Grade 12" },
] as const;

const isHighSchoolGrade = (tab: string): tab is HighSchoolGrade =>
  HIGH_SCHOOL_TABS.some((t) => t.id === tab);

export const SuperAdminHighSchoolView: React.FC = () => {
  const location = useLocation();
  const [activeGrade, setActiveGrade] = useState<HighSchoolGrade>("grade_9");
  const [activeStudentTab, setActiveStudentTab] = useState<
    "home" | "learning" | "hub"
  >("home");

  useEffect(() => {
    const tab = location.state?.activeTab;
    if (typeof tab === "string" && isHighSchoolGrade(tab)) {
      setActiveGrade(tab);
    }
  }, [location.state]);

  return (
    <DashboardLayout
      title="High School View"
      subtitle="Preview student experience by grade level"
      disableTopPadding={true}
      mobileNavActiveTab={activeStudentTab}
      onMobileNavTabChange={setActiveStudentTab}
    >
      <div className="space-y-0 pb-8">
        <SuperAdminTopTabNav
          tabs={[...HIGH_SCHOOL_TABS]}
          activeTab={activeGrade}
          onTabChange={(id) => {
            if (isHighSchoolGrade(id)) setActiveGrade(id);
          }}
          fill={true}
        />
        <div className="animate-fadeIn pt-4 md:pt-6 px-2 md:px-0">
          <StudentViewWrapper
            type="highschool"
            grade={activeGrade}
            activeTab={activeStudentTab}
            onActiveTabChange={setActiveStudentTab}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminHighSchoolView;
