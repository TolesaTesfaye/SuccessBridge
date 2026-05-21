import React, { useState, useEffect } from "react";
import { resourceService } from "@services/resourceService";
import { universityService } from "@services/universityService";
import { useAuthStore } from "@store/authStore";
import { BookOpen, Library, Home } from "lucide-react";
import { UNIVERSITY_CATEGORIES } from "@utils/constants";

import { UniversityOverview } from "@dashboards/student/components/UniversityOverview";
import { UniversityLearningCenter } from "@dashboards/student/components/UniversityLearningCenter";
import { UniversityResourceHub } from "@dashboards/student/components/UniversityResourceHub";

type StudentCategory = "remedial" | "freshman" | "senior" | "gc";

interface UniversityWithResources {
  id: string;
  name: string;
  location?: string;
  resourceCount?: number;
}

interface UniversityStudentViewProps {
  level: StudentCategory;
}

export const UniversityStudentView: React.FC<UniversityStudentViewProps> = ({
  level,
}) => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"home" | "learning" | "hub">(
    "home",
  );
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
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

  const [learningSubject, setLearningSubject] = useState<string>(
    level === "remedial"
      ? "Math"
      : level === "senior" || level === "gc"
        ? "Python"
        : "Psychology",
  );

  const isIntroductory = level === "remedial" || level === "freshman";

  const getSubjects = () => {
    if (level === "freshman") {
      return [
        "Psychology",
        "Logic",
        "Physics",
        "Math (Natural Science)",
        "Math (Social Science)",
        "Geography",
        "History",
        "English",
      ];
    }
    if (level === "senior" || level === "gc") {
      return ["C++", "Python", "Java", "Data Structures", "Algorithms"];
    }
    if (level === "remedial") {
      if (selectedStream === "natural") {
        return ["Common Course", "Math", "Physics", "Chemistry", "Biology"];
      }
      if (selectedStream === "social") {
        return ["Common Course", "History", "Geography", "Economics", "Civics"];
      }
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
    return UNIVERSITY_CATEGORIES[level as keyof typeof UNIVERSITY_CATEGORIES]
      .resources;
  };

  const resourceTypes = getResourceTypes();

  const fetchResources = async () => {
    if (activeTab !== "hub") return;
    setLoading(true);
    try {
      const params: any = {
        educationLevel: "university",
        grade: level,
      };

      if (selectedUniversity) {
        params.university = selectedUniversity;
        params.universityName = selectedUniversity;
      }

      if (!isIntroductory && selectedDepartment) {
        params.department = selectedDepartment;
      }

      if (selectedSubject) {
        params.subject = selectedSubject;
      }

      if (selectedStream) {
        params.stream = selectedStream;
      }

      if (selectedResourceType) {
        params.type = selectedResourceType;
      }

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
        grade: level,
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
  }, [level]);

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

  useEffect(() => {
    if (level === "remedial") {
      setLearningSubject("Math");
    } else if (level === "freshman") {
      setLearningSubject("Psychology");
    } else if (level === "senior" || level === "gc") {
      setLearningSubject("Python");
    }
  }, [level]);

  const handleLearningCenterClick = () => {
    setActiveTab("learning");
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-slate-900">
      {/* Header Navigation */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="flex items-center gap-2">
          {[
            { id: "home", label: "Home", icon: Home },
            { id: "learning", label: "Learning Center", icon: BookOpen },
            { id: "hub", label: "Resource Hub", icon: Library },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === "learning") {
                  handleLearningCenterClick();
                } else {
                  setActiveTab(tab.id as any);
                }
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 rounded-xl ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "home" ? (
          <>
            <UniversityOverview
              user={user}
              activeCategory={level}
              homeLoading={homeLoading}
              homeResources={homeResources}
              setActiveTab={setActiveTab}
              handleLearningCenterClick={handleLearningCenterClick}
            />
          </>
        ) : activeTab === "learning" ? (
          <UniversityLearningCenter
            subjects={subjects}
            learningSubject={learningSubject}
            setLearningSubject={setLearningSubject}
            setActiveTab={setActiveTab}
            category={level}
          />
        ) : (
          <>
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
              activeCategory={level}
              onRefresh={fetchResources}
            />
          </>
        )}
      </div>
    </div>
  );
};
