import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { Footer } from "@components/common/Footer";
import { AIChatIcon } from "@components/common/AIChatIcon";
import { resourceService } from "@services/resourceService";
import { useAuthStore } from "@store/authStore";
import { BookOpen, Home, Library } from "lucide-react";
import { HighSchoolLearningCenter } from "./components/HighSchoolLearningCenter";
import { HighSchoolOverview } from "./components/HighSchoolOverview";
import { HighSchoolResourceHub } from "./components/HighSchoolResourceHub";

import { HIGH_SCHOOL } from "@utils/constants";
import { getAvailableSubjects } from "@utils/highSchoolSubjectRegistry";

type Grade = "grade_9" | "grade_10" | "grade_11" | "grade_12";
type Stream = "natural" | "social";

export const HighSchoolDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const userGrade = (user?.highSchoolGrade as Grade) || "grade_9";
  const userStream = (user?.highSchoolStream as Stream) || null;
  const [activeTab, setActiveTab] = useState<"home" | "learning" | "hub">(
    "home",
  );
  const [activeGrade, setActiveGrade] = useState<Grade>(userGrade);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(
    userStream,
  );
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedResourceType, setSelectedResourceType] = useState<
    string | null
  >(null);
  const [learningSubject, setLearningSubject] = useState<string>("");
  const [resources, setResources] = useState<any[]>([]);
  const [homeResources, setHomeResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);

  // Get subjects dynamically based on grade and stream
  const getSubjects = (): string[] => {
    return getAvailableSubjects(activeGrade, selectedStream);
  };

  const getResourceTypes = (): string[] => {
    if (activeGrade === "grade_9" || activeGrade === "grade_10") {
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

  // Initialize learning subject
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
        grade: activeGrade,
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
        grade: activeGrade,
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
  }, [activeGrade, selectedStream]);

  useEffect(() => {
    if (activeTab === "hub") {
      fetchResources();
    }
  }, [
    activeGrade,
    selectedStream,
    selectedSubject,
    selectedResourceType,
    activeTab,
  ]);

  const handleStreamChange = (stream: Stream | null) => {
    setSelectedStream(stream);
    setResources([]);
  };

  return (
    <DashboardLayout
      title=""
      noPadding={activeTab === "learning"}
      showFooter={false}
      headerNav={
        <div className="flex items-center gap-0.5 md:gap-1">
          {[
            { id: "home", label: "Home", shortLabel: "Home", icon: Home },
            {
              id: "learning",
              label: "Learning Center",
              shortLabel: "Learning",
              icon: BookOpen,
            },
            {
              id: "hub",
              label: "Resource Hub",
              shortLabel: "Resource",
              icon: Library,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-1.5 md:px-4 py-1 md:py-2 text-[7px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest transition-all flex items-center gap-1 md:gap-2 rounded-lg md:rounded-xl ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                  : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <tab.icon className="hidden md:inline-block w-3.5 h-3.5" />
              <span className="md:hidden">{tab.shortLabel}</span>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      }
    >
      {activeTab === "home" ? (
        <>
          <HighSchoolOverview
            user={user}
            activeGrade={activeGrade}
            selectedStream={selectedStream}
            homeLoading={homeLoading}
            homeResources={homeResources}
            setActiveTab={setActiveTab}
          />
          <Footer />
        </>
      ) : activeTab === "learning" ? (
        <div className="flex flex-col h-full min-h-0">
          <div className="flex-1 min-h-0">
            <HighSchoolLearningCenter
              grade={activeGrade}
              stream={selectedStream}
              subjects={subjects}
              learningSubject={learningSubject}
              setLearningSubject={setLearningSubject}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      ) : (
        <>
          <HighSchoolResourceHub
            activeGrade={activeGrade}
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
          <Footer />
        </>
      )}
      {(activeTab === "learning" || activeTab === "hub") && <AIChatIcon />}
    </DashboardLayout>
  );
};
