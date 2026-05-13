import React, { useState, useEffect, useRef } from "react";
import { getSubjectConfig as getFreshmanSubjectConfig } from "@learningCenter/University/Freshman/subjectRegistry";
import { getSubjectConfig as getSeniorSubjectConfig } from "@learningCenter/University/Senior/subjectRegistry";
import { SubjectChapterSidebar } from "./SubjectChapterSidebar";
import { SubjectChapterRenderer } from "./SubjectChapterRenderer";
import { SubjectAccessGuard } from "@components/payment/SubjectAccessGuard";
import { getFreeSubjects } from "@utils/subjectRegistry";
import { useAuthStore } from "@store/authStore";

interface UniversityLearningCenterProps {
  subjects: string[];
  learningSubject: string;
  setLearningSubject: (subject: string) => void;
  setActiveTab: (tab: "home" | "learning" | "hub") => void;
  initialChapterId?: string;
  category?: "remedial" | "freshman" | "senior" | "gc";
}

export const UniversityLearningCenter: React.FC<
  UniversityLearningCenterProps
> = ({
  subjects,
  learningSubject,
  setLearningSubject,
  setActiveTab,
  initialChapterId,
  category = "freshman",
}) => {
  const { user } = useAuthStore()
  // State management
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(),
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const hasAppliedInitialSelection = useRef(false);

  // Get subject configuration based on category
  const getSubjectConfig = (subjectName: string) => {
    if (category === 'senior' || category === 'gc') {
      return getSeniorSubjectConfig(subjectName);
    }
    return getFreshmanSubjectConfig(subjectName);
  };

  const subjectConfig = getSubjectConfig(learningSubject);
  
  // Get free subjects for this category
  const freeSubjects = getFreeSubjects('university', category)
  
  // Get subject ID (you'll need to implement this based on your subject registry)
  const getSubjectId = (subjectName: string) => {
    // TODO: Implement subject ID lookup from your subject registry
    // For now, return a placeholder
    return `subject-${subjectName.toLowerCase().replace(/\s+/g, '-')}`
  }

  // Reset state when subject changes
  useEffect(() => {
    setSelectedChapter("");
    setSelectedSubtopic("");
    setExpandedChapters(new Set());

    if (!subjectConfig || subjectConfig.chapters.length === 0) return;

    const chapterIds = new Set(subjectConfig.chapters.map((c) => c.id));

    // Apply initial deep-link selection once per mount, if valid.
    if (
      !hasAppliedInitialSelection.current &&
      initialChapterId &&
      chapterIds.has(initialChapterId)
    ) {
      hasAppliedInitialSelection.current = true;
      setSelectedChapter(initialChapterId);
      setExpandedChapters(new Set([initialChapterId]));
      return;
    }

    // Otherwise, auto-select and expand first chapter
    const firstChapterId = subjectConfig.chapters[0].id;
    setSelectedChapter(firstChapterId);
    setExpandedChapters(new Set([firstChapterId]));
  }, [learningSubject, subjectConfig, initialChapterId]);

  // Handle chapter click
  const handleChapterClick = (chapterId: string) => {
    setSelectedChapter(chapterId);
  };

  // Handle subtopic click
  const handleSubtopicClick = (chapterId: string, subtopic: string) => {
    setSelectedChapter(chapterId);
    setSelectedSubtopic(subtopic);
  };

  // Toggle chapter expansion
  const handleToggleExpand = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  // Render chapter content based on subject
  const renderChapterContent = () => {
    // Wrap content with payment guard
    const content = subjectConfig && selectedChapter ? (
      <SubjectChapterRenderer
        subject={learningSubject}
        chapterId={selectedChapter}
        selectedSubtopic={selectedSubtopic}
        onNavigateChapter={handleChapterClick}
      />
    ) : (
      <div className="max-w-4xl mx-auto pl-2 pr-0 md:px-6 py-4 md:py-8">
        <h1 className="text-lg md:text-4xl font-bold text-slate-900 dark:text-white mb-3 md:mb-8">
          {learningSubject} Introduction
        </h1>
        <div className="prose prose-slate dark:prose-invert max-w-none mb-6 md:mb-12">
          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 mb-3 md:mb-6">
            Welcome to {learningSubject}. Select a chapter from the sidebar to
            begin learning.
          </p>
        </div>
      </div>
    )

    // Check if subject requires payment
    return (
      <SubjectAccessGuard
        subjectId={getSubjectId(learningSubject)}
        subjectName={learningSubject}
        educationLevel="university"
        grade={category}
        universityId={user?.universityId}
        departmentId={user?.departmentId}
        freeSubjects={freeSubjects}
      >
        {content}
      </SubjectAccessGuard>
    )
  };

  return (
    <div className="flex flex-col h-full m-0 p-0">
      {/* W3Schools Styled Top Navigation Bar */}
      <div className="bg-[#282a35] overflow-x-auto no-scrollbar shadow-lg sticky top-0 z-50 border-b border-slate-700 m-0 p-0 flex-shrink-0">
        <div className="flex items-center min-w-max h-10 md:h-12">
          {subjects.map((subj) => (
            <button
              key={subj}
              onClick={() => setLearningSubject(subj)}
              className={`h-full px-3 md:px-6 text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center whitespace-nowrap border-r border-slate-700/50 ${
                learningSubject === subj
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area - No Gap */}
      <div className="flex flex-1 overflow-hidden m-0 p-0 gap-0 relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed bottom-4 left-4 z-30 bg-[#04AA6D] text-white p-4 rounded-full shadow-lg hover:bg-[#059862] transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="md:hidden absolute inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar - Tutorial Navigation */}
        <aside
          className={`
            absolute md:relative top-0 bottom-0 left-0 z-40
            w-56 md:w-52 bg-white dark:bg-[#282a35]
            flex flex-col flex-shrink-0 m-0 p-0
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll">
            {/* Close button for mobile */}
            <div className="md:hidden flex justify-end p-2 border-b border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Tutorial Navigation */}
            <div className="space-y-0">
              {subjectConfig ? (
                <SubjectChapterSidebar
                  chapters={subjectConfig.chapters}
                  selectedChapter={selectedChapter}
                  selectedSubtopic={selectedSubtopic}
                  expandedChapters={expandedChapters}
                  onChapterClick={handleChapterClick}
                  onSubtopicClick={handleSubtopicClick}
                  onToggleExpand={handleToggleExpand}
                  onCloseSidebar={() => setIsSidebarOpen(false)}
                />
              ) : (
                <div className="p-4 text-sm text-slate-700 dark:text-slate-400">
                  No chapters available for this subject yet.
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area - Flush with Sidebar */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 m-0 p-0">
          {renderChapterContent()}
        </main>
      </div>
    </div>
  );
};
