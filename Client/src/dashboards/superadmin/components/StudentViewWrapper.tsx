import React from "react";
import { useAuthStore } from "@store/authStore";
import { HighSchoolStudentView } from "./HighSchoolStudentView";
import { UniversityStudentView } from "./UniversityStudentView";

type HighSchoolGrade = "grade_9" | "grade_10" | "grade_11" | "grade_12";
type UniversityLevel = "freshman" | "remedial" | "senior" | "gc";

interface StudentViewWrapperProps {
  type: "highschool" | "university";
  grade?: HighSchoolGrade;
  level?: UniversityLevel;
}

export const StudentViewWrapper: React.FC<StudentViewWrapperProps> = ({
  type,
  grade,
  level,
}) => {
  const { user: originalUser, setUser } = useAuthStore();
  const [viewUser, setViewUser] = React.useState<any>(null);

  // Create mock user for the specific grade/level but keep superadmin role
  React.useEffect(() => {
    if (!originalUser) return;

    const mockUser = {
      ...originalUser,
      // Keep the original role (superadmin) to prevent redirect
      role: originalUser.role,
      // Add student-specific properties for the dashboard to use
      educationLevel: type === "highschool" ? "High School" : "University",
      // High School specific properties
      ...(type === "highschool" && grade && {
        grade: grade.split("_")[1], // Extract "9" from "grade_9"
        highSchoolGrade: grade,
        highSchoolStream: null,
      }),
      // University specific properties
      ...(type === "university" && level && {
        grade: level,
        universityLevel: level,
        university: "Addis Ababa University",
        department: level === "remedial" ? "" : "Computer Science",
      }),
    };

    setViewUser(mockUser);
    // Temporarily set the mock user
    setUser(mockUser);

    // Cleanup: restore original user when component unmounts
    return () => {
      if (originalUser) {
        setUser(originalUser);
      }
    };
  }, [type, grade, level]);

  // Don't render until we have the view user set up
  if (!viewUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full"></div>
      </div>
    );
  }

  // Render the student view content (without DashboardLayout wrapper)
  // This will be displayed inside the superadmin layout
  if (type === "highschool" && grade) {
    return <HighSchoolStudentView grade={grade} />;
  }

  if (type === "university" && level) {
    return <UniversityStudentView level={level} />;
  }

  return null;
};