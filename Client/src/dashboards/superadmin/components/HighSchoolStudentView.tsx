import React, { useState, useEffect } from "react";
import { resourceService } from "@services/resourceService";
import { useAuthStore } from "@store/authStore";
import { BookOpen, Home, Library } from "lucide-react";
import { HighSchoolLearningCenter } from "@dashboards/student/components/HighSchoolLearningCenter";
import { HighSchoolOverview } from "@dashboards/student/components/HighSchoolOverview";
import { HighSchoolResourceHub } from "@dashboards/student/components/HighSchoolResourceHub";
import { HIGH_SCHOOL } from "@utils/constants";
import { getAvailableSubjects } from "@utils/highSchoolSubjectRegistry";

type Grade = "grade_9" | "grade_10" | "grade_11" | "grade_12";
type Stream = "natural" | "social";

interface HighSchoolStudentViewProps {
  grade: Grade;
}

export const HighSchoolStudentView: React.FC<HighSchoolStudentViewProps> = ({ grade }) => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"home" | "learning" | "hub">("home");
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedResourceType, setSelectedResourceType] = useState<string | null>(null);
  const [learningSubject, setLearningSubject] = useState<string>("");
  const [resources, setResources] = useState<any[]>([]);
  const [homeResources, setHomeResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);

  const getSubjects = (): string[] => {
    return getAvailableSubjects(grade, selectedStream);
  };

  const getResourceTypes = (): string[] => {
    if (grade === "grade_9" || grade === "grade_10") {
      return HIGH_SCHOOL.GRADES_9_10.resources;
    }

    if (!selectedStream) {
      const naturalResources = HIGH_SCHOOL.GRADES_11_12.natural.resources;
      const socialResources = HIGH_SCHOOL.GRADES_11_12.social.resources;
      return [...new Set([...naturalResources, ...socialResources])];
    }

    if (selectedStream === "natural") {
      return HIGH_SCHOOL.GRADES_11_12.natural.resources;
    }
    if (selectedStream === "social") {
      return HIGH_SCHOOL.GRADES_11_12.social.resources;
    }
    return [];
  };

  const subjects = getSubjects();
  const resourceTypes = getResourceTypes();

  React.useEffect(() => {
    if (subjects.length > 0 && !learningSubject) {
      setLearningSubject(subjects[0]);
    }
  }, [subjects]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await resourceService.getResources({
        educationLevel: "high_school",
        grade: grade,
        stream: selectedStream || undefined,
        subject: selectedSubject || undefined,
        type: (selectedResourceType as any) || undefined,
      });
      setResources(response.data?.data || []);
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
        educationLevel: "high_school",
        grade: grade,
        stream: selectedStream || undefined,
        limit: 8,
      });
      setHomeResources(response.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch home resources:", err);
      setHomeResources([]);
    } finally {
      setHomeLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeResources();
  }, [grade, selectedStream]);

  useEffect(() => {
    if (activeTab === "hub") {
      fetchResources();
    }
  }, [grade, selectedStream, selectedSubject, selectedResourceType, activeTab]);

  const handleStreamChange = (stream: Stream | null) => {
    setSelectedStream(stream);
    setResources([]);
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
              onClick={() => setActiveTab(tab.id as any)}
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
            <HighSchoolOverview
              user={user}
              activeGrade={grade}
              selectedStream={selectedStream}
              homeLoading={homeLoading}
              homeResources={homeResources}
              setActiveTab={setActiveTab}
            />
          </>
        ) : activeTab === "learning" ? (
          <HighSchoolLearningCenter
            grade={grade}
            stream={selectedStream}
            subjects={subjects}
            learningSubject={learningSubject}
            setLearningSubject={setLearningSubject}
            setActiveTab={setActiveTab}
          />
        ) : (
          <>
            <HighSchoolResourceHub
              activeGrade={grade}
              selectedStream={selectedStream}
              handleStreamChange={handleStreamChange}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              subjects={subjects}
              selectedResourceType={selectedResourceType}
              setSelectedResourceType={setSelectedResourceType}
              resourceTypes={resourceTypes}
              loading={loading}
              resources={resources}
              onRefresh={fetchResources}
            />
          </>
        )}
      </div>
    </div>
  );
};
