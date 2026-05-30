import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { BookOpen } from "lucide-react";
import { SuperAdminTopTabNav } from "@dashboards/superadmin/components/SuperAdminTopTabNav";
import { StudentViewWrapper } from "@dashboards/superadmin/components/StudentViewWrapper";

type HighSchoolGrade = "grade_9" | "grade_10" | "grade_11" | "grade_12";

const HIGH_SCHOOL_TABS = [
  { id: "grade_9", label: "Grade 9", shortLabel: "G9", icon: BookOpen },
  { id: "grade_10", label: "Grade 10", shortLabel: "G10", icon: BookOpen },
  { id: "grade_11", label: "Grade 11", shortLabel: "G11", icon: BookOpen },
  { id: "grade_12", label: "Grade 12", shortLabel: "G12", icon: BookOpen },
] as const;

const isHighSchoolGrade = (tab: string): tab is HighSchoolGrade =>
  HIGH_SCHOOL_TABS.some((t) => t.id === tab);

export const SuperAdminHighSchoolView: React.FC = () => {
  const location = useLocation();
  const [activeGrade, setActiveGrade] = useState<HighSchoolGrade>("grade_9");

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
          <StudentViewWrapper type="highschool" grade={activeGrade} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminHighSchoolView;
