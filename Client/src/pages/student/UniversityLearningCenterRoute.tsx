import React, { useEffect, useMemo, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { UniversityLearningCenter } from "@dashboards/student/components/UniversityLearningCenter";
import {
  getRegisteredSubjects,
  hasSubjectConfig,
} from "@learningCenter/University/Freshman/subjectRegistry";
import { useAuthStore } from "@store/authStore";

const SUBJECT_SLUG_MAP: Record<string, string> = {
  psychology: "Psychology",
  logic: "Logic",
  physics: "Physics",
  geography: "Geography",
  history: "History",
  english: "English",
  "math-natural-science": "Math (Natural Science)",
  "math-social-science": "Math (Social Science)",
};

const resolveSubjectFromSlug = (slug?: string): string | undefined => {
  if (!slug) return undefined;
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return SUBJECT_SLUG_MAP[normalized];
};

export const UniversityLearningCenterRoute: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { subject: subjectSlug, chapterId } = useParams<{
    subject?: string;
    chapterId?: string;
  }>();

  // Safety: route is protected, but keep it resilient.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const registeredSubjects = useMemo(() => getRegisteredSubjects(), []);

  const initialSubject = useMemo(() => {
    const resolved = resolveSubjectFromSlug(subjectSlug);
    if (resolved && hasSubjectConfig(resolved)) return resolved;
    return registeredSubjects[0];
  }, [subjectSlug, registeredSubjects]);

  const [learningSubject, setLearningSubject] =
    useState<string>(initialSubject);

  // If the URL subject changes, keep state in sync.
  useEffect(() => {
    setLearningSubject(initialSubject);
  }, [initialSubject]);

  const safeInitialChapterId = useMemo(() => {
    if (!chapterId) return undefined;
    const normalized = decodeURIComponent(chapterId).trim();
    return normalized || undefined;
  }, [chapterId]);

  // If subject is invalid/unconfigured, just bounce back to dashboard.
  if (!learningSubject || !hasSubjectConfig(learningSubject)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardLayout noPadding>
      <UniversityLearningCenter
        subjects={registeredSubjects}
        learningSubject={learningSubject}
        setLearningSubject={setLearningSubject}
        setActiveTab={() => {}}
        initialChapterId={safeInitialChapterId}
      />

      {/* Floating Chat Button - Mobile Only */}
      <button
        onClick={() => navigate("/student/ai-companion")}
        className="fixed bottom-4 left-4 md:hidden bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-40"
        title="Chat with AI"
        aria-label="Open AI chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </DashboardLayout>
  );
};

export default UniversityLearningCenterRoute;
