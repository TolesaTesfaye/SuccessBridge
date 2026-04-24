import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { resourceService } from "@services/resourceService";
import { universityService } from "@services/universityService";
import { useAuthStore } from "@store/authStore";
import { BookOpen, Library, Home } from "lucide-react";

import { UNIVERSITY_CATEGORIES } from "@utils/constants";
import { FRESHMAN_COURSE_CONTENT } from "@utils/freshmanCourseContent";
import { REMEDIAL_COURSE_CONTENT } from "@utils/remedialCourseContent";

// Modular Components
import { UniversityOverview } from "./components/UniversityOverview";
import { UniversityLearningCenter } from "./components/UniversityLearningCenter";
import { UniversityResourceHub } from "./components/UniversityResourceHub";

type StudentCategory = "remedial" | "freshman" | "senior" | "gc";

interface UniversityWithResources {
  id: string;
  name: string;
  location?: string;
  resourceCount?: number;
}

export const UniversityDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const userLevel = (user?.universityLevel as StudentCategory) || "freshman";
  const userDept = user?.department || "";

  const [activeTab, setActiveTab] = useState<"home" | "learning" | "hub">(
    "home",
  );
  const activeCategory = userLevel;
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    userDept || "",
  );
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedResourceType, setSelectedResourceType] = useState<string>("");
  const [selectedStream, setSelectedStream] = useState<
    "natural" | "social" | ""
  >("");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("");
  const [availableUniversities, setAvailableUniversities] = useState<
    UniversityWithResources[]
  >([]);
  const [resources, setResources] = useState<any[]>([]);
  const [homeResources, setHomeResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);

  // Learning Center Specific State
  const [learningSubject, setLearningSubject] = useState<string>(
    activeCategory === "remedial" ? "Math" : "Psychology",
  );

  const isIntroductory =
    activeCategory === "remedial" || activeCategory === "freshman";

  const getSubjects = () => {
    if (activeCategory === "freshman") {
      return [
        "Psychology",
        "Logic",
        "Physics",
        "Math",
        "Geography",
        "History",
        "English",
      ];
    }
    if (activeCategory === "remedial") {
      // Show individual subjects by default for remedial courses
      if (selectedStream === "natural") {
        return ["Common Course", "Math", "Physics", "Chemistry", "Biology"];
      }
      if (selectedStream === "social") {
        return ["Common Course", "History", "Geography", "Economics", "Civics"];
      }
      // Default remedial subjects when no stream is selected
      return [
        "Math",
        "English",
        "Physics",
        "Chemistry",
        "Geography",
        "History",
      ];
    }
    return ["Common Course"];
  };

  const subjects = getSubjects();

  const getResourceTypes = (): string[] => {
    return UNIVERSITY_CATEGORIES[
      activeCategory as keyof typeof UNIVERSITY_CATEGORIES
    ].resources;
  };

  const resourceTypes = getResourceTypes();

  const fetchResources = async () => {
    if (activeTab !== "hub") return; // Only fetch for hub tab
    setLoading(true);
    try {
      const params: any = {
        educationLevel: "university",
        grade: activeCategory, // This works for the current backend
        category: activeCategory, // Add this as backup parameter
      };
      if (selectedUniversity) params.universityName = selectedUniversity;
      if (!isIntroductory && selectedDepartment)
        params.department = selectedDepartment;
      if (selectedSubject) params.subject = selectedSubject;
      if (selectedStream) params.stream = selectedStream;
      if (selectedResourceType) params.type = selectedResourceType;

      const response = await resourceService.getResources(params);
      const resourcesData = response.data?.data || [];
      setResources(resourcesData);
    } catch (err) {
      console.error("Failed to fetch resources:", err);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchHomeResources = async () => {
    setHomeLoading(true);
    try {
      const response = await resourceService.getResources({
        educationLevel: "university",
        grade: activeCategory,
        limit: 3,
      });
      setHomeResources(response.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch home resources:", err);
    } finally {
      setHomeLoading(false);
    }
  };

  const fetchUniversities = async () => {
    try {
      const response =
        await universityService.getUniversitiesWithFreshmanResources();
      setAvailableUniversities(response.data || []);
    } catch (err) {
      console.error("Failed to fetch universities:", err);
    }
  };

  useEffect(() => {
    fetchHomeResources();
    fetchUniversities();
  }, [activeCategory]);

  useEffect(() => {
    fetchResources();
  }, [
    selectedDepartment,
    selectedSubject,
    selectedResourceType,
    selectedStream,
    selectedUniversity,
    activeTab,
  ]);

  // Update learning subject when category changes
  useEffect(() => {
    if (activeCategory === "remedial") {
      setLearningSubject("Math");
    } else if (activeCategory === "freshman") {
      setLearningSubject("Psychology");
    }
  }, [activeCategory]);

  const learningContent =
    activeCategory === "freshman"
      ? (FRESHMAN_COURSE_CONTENT as any)[learningSubject]
      : activeCategory === "remedial"
        ? (REMEDIAL_COURSE_CONTENT as any)[learningSubject]
        : null;

  return (
    <DashboardLayout
      title=""
      noPadding={activeTab === "learning"}
      headerNav={
        <div className="flex items-center gap-0.5 md:gap-1">
          {[
            { id: "home", label: "Home", icon: Home },
            { id: "learning", label: "Learning Center", icon: BookOpen },
            { id: "hub", label: "Resource Hub", icon: Library },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2 md:px-4 py-1.5 md:py-2 text-[7px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest transition-all flex items-center gap-1 md:gap-2 rounded-lg md:rounded-xl ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <tab.icon className="hidden md:inline-block w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      }
    >
      {activeTab === "home" ? (
        <div className="space-y-10">
          <UniversityOverview
            user={user}
            activeCategory={activeCategory}
            homeLoading={homeLoading}
            homeResources={homeResources}
            setActiveTab={setActiveTab}
          />
        </div>
      ) : activeTab === "learning" ? (
        <UniversityLearningCenter
          subjects={subjects}
          learningSubject={learningSubject}
          setLearningSubject={setLearningSubject}
          learningContent={learningContent}
          navigate={navigate}
          setActiveTab={setActiveTab}
        />
      ) : (
        <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-10">
          <UniversityResourceHub
            selectedUniversity={selectedUniversity}
            setSelectedUniversity={setSelectedUniversity}
            availableUniversities={availableUniversities}
            selectedStream={selectedStream}
            setSelectedStream={setSelectedStream}
            isIntroductory={isIntroductory}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedResourceType={selectedResourceType}
            setSelectedResourceType={setSelectedResourceType}
            resourceTypes={resourceTypes}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            subjects={subjects}
            loading={loading}
            resources={resources}
            activeCategory={activeCategory}
            onRefresh={fetchResources}
          />
        </div>
      )}
    </DashboardLayout>
  );
};
