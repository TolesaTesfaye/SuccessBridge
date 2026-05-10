import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, BookmarkIcon } from "lucide-react";
import { getGradeSpecificContent } from "@utils/gradeSpecificContent";
import { getGrade11SubjectConfig } from "@learningCenter/highschool/grade 11/subjectRegistry";
import { getGrade12SubjectConfig } from "@learningCenter/highschool/grade 12/subjectRegistry";
import { HighSchoolChapterRenderer } from "./HighSchoolChapterRenderer";
import { SubjectChapterSidebar } from "./SubjectChapterSidebar";
import { SubjectAccessGuard } from "@components/payment/SubjectAccessGuard";
import { getFreeSubjects } from "@utils/subjectRegistry";

interface Topic {
  id: string;
  title: string;
  content: string;
}

interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
}

interface LearningContent {
  title: string;
  grade: string;
  introduction: string;
  chapters: Chapter[];
}

interface HighSchoolLearningCenterProps {
  grade: "grade_9" | "grade_10" | "grade_11" | "grade_12";
  stream: string | null;
  subjects: string[];
  learningSubject: string;
  setLearningSubject: (subject: string) => void;
  setActiveTab: (tab: "home" | "learning" | "hub") => void;
}

export const HighSchoolLearningCenter: React.FC<
  HighSchoolLearningCenterProps
> = ({
  grade,
  stream,
  subjects,
  learningSubject,
  setLearningSubject,
  setActiveTab,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("");
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(),
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if this subject has component-based rendering (like Psychology)
  const subjectConfig = grade === "grade_11" 
    ? getGrade11SubjectConfig(learningSubject)
    : grade === "grade_12"
    ? getGrade12SubjectConfig(learningSubject)
    : null;

  // Get grade-specific content for the selected subject (old data-driven approach)
  const learningContent = !subjectConfig ? getGradeSpecificContent(
    grade,
    learningSubject,
  ) as LearningContent | null : null;
  
  // Get free subjects for this grade (pass stream for grade 12)
  const freeSubjects = getFreeSubjects('high_school', grade, stream || undefined)
  
  // Get subject ID (convert subject name to ID format)
  const getSubjectId = (subjectName: string) => {
    return `subject-${subjectName.toLowerCase().replace(/\s+/g, '-')}`
  }
  
  // Check if current subject requires payment
  const requiresPayment = grade === 'grade_12' && !freeSubjects.includes(learningSubject)

  // If no content is available for this grade/subject combination, show a message
  if (!learningContent && !subjectConfig) {
    return (
      <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">📚</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              Content Not Available
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
              Learning content for {learningSubject} in{" "}
              {grade.replace("_", " ").toUpperCase()} is not yet available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If using component-based rendering (like Psychology)
  if (subjectConfig) {
    // Reset state when subject changes
    useEffect(() => {
      setSelectedChapter("");
      setSelectedSubtopic("");
      setExpandedChapters(new Set());

      if (!subjectConfig || subjectConfig.chapters.length === 0) return;

      // Auto-select and expand first chapter
      const firstChapterId = subjectConfig.chapters[0].id;
      setSelectedChapter(firstChapterId);
      setExpandedChapters(new Set([firstChapterId]));
    }, [learningSubject, subjectConfig]);

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

    // Render chapter content using component-based approach
    const renderChapterContent = () => {
      if (subjectConfig && selectedChapter) {
        return (
          <HighSchoolChapterRenderer
            grade={grade}
            subject={learningSubject}
            chapterId={selectedChapter}
            selectedSubtopic={selectedSubtopic}
            onNavigateChapter={handleChapterClick}
          />
        );
      }

      // Default: Subject introduction
      return (
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
      );
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
            {requiresPayment ? (
              <SubjectAccessGuard
                subjectId={getSubjectId(learningSubject)}
                subjectName={learningSubject}
                educationLevel="high_school"
                grade={grade}
                stream={stream || undefined}
                freeSubjects={freeSubjects}
              >
                {renderChapterContent()}
              </SubjectAccessGuard>
            ) : (
              renderChapterContent()
            )}
          </main>
        </div>
      </div>
    );
  }

  // OLD DATA-DRIVEN APPROACH (for other subjects)

  const currentChapter = learningContent?.chapters?.find(
    (ch: Chapter) => ch.id === selectedChapter,
  );
  const currentTopic = currentChapter?.topics?.find(
    (topic: Topic) => topic.id === selectedTopic,
  );

  React.useEffect(() => {
    if ((learningContent?.chapters?.length ?? 0) > 0) {
      const firstChapter = learningContent!.chapters[0];
      setSelectedChapter(firstChapter.id);
      setExpandedChapters(new Set([firstChapter.id]));
      if (firstChapter.topics?.length > 0) {
        setSelectedTopic(firstChapter.topics[0].id);
      }
      return;
    }

    setSelectedChapter("");
    setSelectedTopic("");
  }, [learningContent]);

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const handleChapterClick = (chapter: Chapter) => {
    setSelectedChapter(chapter.id);
    if (chapter.topics?.length > 0) {
      setSelectedTopic(chapter.topics[0].id);
    }
    const newExpanded = new Set(expandedChapters);
    newExpanded.add(chapter.id);
    setExpandedChapters(newExpanded);
    setIsSidebarOpen(false);
  };

  const getAllTopics = () => {
    const allTopics: (Topic & { chapterId: string })[] = [];
    learningContent?.chapters?.forEach((chapter: Chapter) => {
      chapter.topics?.forEach((topic: Topic) => {
        allTopics.push({ ...topic, chapterId: chapter.id });
      });
    });
    return allTopics;
  };

  const getCurrentTopicIndex = () => {
    const allTopics = getAllTopics();
    return allTopics.findIndex((topic) => topic.id === selectedTopic);
  };

  const goToPrevious = () => {
    if (!selectedChapter) return;

    const allTopics = getAllTopics();
    const currentIndex = getCurrentTopicIndex();

    if (currentIndex > 0) {
      const prevTopic = allTopics[currentIndex - 1];
      setSelectedChapter(prevTopic.chapterId);
      setSelectedTopic(prevTopic.id);
      const newExpanded = new Set(expandedChapters);
      newExpanded.add(prevTopic.chapterId);
      setExpandedChapters(newExpanded);
    } else {
      setSelectedChapter("");
      setSelectedTopic("");
    }
  };

  const goToNext = () => {
    if (!selectedChapter) {
      if ((learningContent?.chapters?.length ?? 0) > 0) {
        const firstChapter = learningContent!.chapters[0];
        setSelectedChapter(firstChapter.id);
        if (firstChapter.topics?.length > 0) {
          setSelectedTopic(firstChapter.topics[0].id);
        }
        const newExpanded = new Set(expandedChapters);
        newExpanded.add(firstChapter.id);
        setExpandedChapters(newExpanded);
      }
      return;
    }

    const allTopics = getAllTopics();
    const currentIndex = getCurrentTopicIndex();

    if (currentIndex < allTopics.length - 1) {
      const nextTopic = allTopics[currentIndex + 1];
      setSelectedChapter(nextTopic.chapterId);
      setSelectedTopic(nextTopic.id);
      const newExpanded = new Set(expandedChapters);
      newExpanded.add(nextTopic.chapterId);
      setExpandedChapters(newExpanded);
    }
  };

  const canGoPrevious = () => {
    if (!selectedChapter) return false;
    return getCurrentTopicIndex() >= 0;
  };

  const canGoNext = () => {
    if (!selectedChapter) return (learningContent?.chapters?.length ?? 0) > 0;
    const allTopics = getAllTopics();
    const currentIndex = getCurrentTopicIndex();
    return currentIndex < allTopics.length - 1;
  };

  const renderTopicContent = (content: string | string[]) => {
    const paragraphs = Array.isArray(content) ? content : [content];
    return paragraphs.map((paragraph, index) => (
      <div key={index} className="mb-2 md:mb-4">
        {paragraph.startsWith("- **") || paragraph.startsWith("• ") ? (
          <div
            className="ml-4 text-xs md:text-base text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ) : paragraph.includes("**") ? (
          <p
            className="text-xs md:text-base text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{
              __html: paragraph.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>",
              ),
            }}
          />
        ) : (
          <p className="text-xs md:text-base text-slate-700 dark:text-slate-300">
            {paragraph}
          </p>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full">
      {/* W3Schools Styled Top Navigation Bar (match University) */}
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

      {/* Main Content Area - No Gap (match University) */}
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

        {/* Left Sidebar - Tutorial Navigation (match University) */}
        <aside
          className={
            `
            absolute md:relative top-0 bottom-0 left-0 z-40
            w-56 md:w-52 bg-white dark:bg-[#282a35]
            flex flex-col flex-shrink-0 m-0 p-0
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `
          }
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll">
            {/* Close button for mobile */}
            <div className="md:hidden flex justify-end p-2 border-b border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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

            <div className="space-y-0">
              <button
                onClick={() => {
                  setSelectedChapter("");
                  setSelectedTopic("");
                }}
                className={`w-full text-left px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium transition-colors border-b border-slate-300/50 dark:border-slate-700/50 ${
                  !selectedChapter
                    ? "bg-blue-600 text-white"
                    : "text-slate-900 dark:text-slate-300 hover:bg-slate-300/30 dark:hover:bg-slate-700/50 hover:text-black dark:hover:text-white"
                }`}
              >
                {learningSubject} Introduction
              </button>

              {learningContent?.chapters?.map((chapter: any) => (
                <div key={chapter.id}>
                  <div className="flex items-center border-b border-slate-300/50 dark:border-slate-700/50">
                    <button
                      onClick={() => handleChapterClick(chapter)}
                      className={`flex-1 text-left px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium transition-colors ${
                        selectedChapter === chapter.id
                          ? "bg-slate-300/30 dark:bg-slate-700/50 text-black dark:text-white"
                          : "text-slate-900 dark:text-slate-300 hover:bg-slate-300/30 dark:hover:bg-slate-700/50 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {chapter.title}
                    </button>
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="px-2 py-2.5 md:py-3 transition-colors text-slate-700 dark:text-slate-400 hover:text-black dark:hover:text-white"
                    >
                      {expandedChapters.has(chapter.id) ? (
                        <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                      ) : (
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                      )}
                    </button>
                  </div>

                  {expandedChapters.has(chapter.id) &&
                    chapter.topics?.map((topic: any) => (
                      <button
                        key={topic.id}
                        onClick={() => {
                          setSelectedChapter(chapter.id);
                          setSelectedTopic(topic.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs transition-colors border-b border-slate-300/30 dark:border-slate-700/30 ${
                          selectedTopic === topic.id
                            ? "bg-blue-600 text-white font-medium"
                            : "text-slate-800 dark:text-slate-400 hover:bg-slate-300/30 dark:hover:bg-slate-700/50 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        {topic.title}
                      </button>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area - Flush with Sidebar (match University) */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 m-0 p-0">
          {requiresPayment ? (
            <SubjectAccessGuard
              subjectId={getSubjectId(learningSubject)}
              subjectName={learningSubject}
              educationLevel="high_school"
              grade={grade}
              stream={stream || undefined}
              freeSubjects={freeSubjects}
            >
              <div className="max-w-4xl mx-auto pl-2 pr-0 md:px-8 py-4 md:py-8">
                <div className="flex justify-end mb-4">
                  <BookmarkIcon className="w-6 h-6 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
                </div>

                {!learningContent ? (
                  <div className="text-center py-12 md:py-20 pl-2 pr-0 md:px-4">
                    <h2 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                      Content Not Available
                    </h2>
                    <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-6">
                      Content for {learningSubject} in{" "}
                      {grade.replace("_", " ").toUpperCase()} is being prepared.
                    </p>
                    <button
                      onClick={() => setActiveTab("hub")}
                      className="px-4 md:px-6 py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Go to Resource Hub
                    </button>
                  </div>
                ) : !selectedChapter ? (
                  <div>
                    <h1 className="text-lg md:text-4xl font-bold text-slate-900 dark:text-white mb-3 md:mb-8">
                      {learningContent.title || `${learningSubject} Introduction`}
                    </h1>

                    <div className="prose prose-slate dark:prose-invert max-w-none mb-6 md:mb-12">
                      <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 mb-3 md:mb-6">
                        {learningContent.introduction ||
                          `${learningSubject} is an essential high school subject.`}
                      </p>

                      <h2 className="text-base md:text-2xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">
                        Course Coverage
                      </h2>

                      <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-2 md:mb-4">
                        {grade.replace("_", " ").toUpperCase()}
                        {stream
                          ? ` • ${stream.charAt(0).toUpperCase()}${stream.slice(1)} stream`
                          : ""}
                      </p>

                      {learningContent?.chapters?.length > 0 && (
                        <ul className="space-y-1 md:space-y-2">
                          {learningContent.chapters.map((chapter: any) => (
                            <li
                              key={chapter.id}
                              className="text-xs md:text-base text-slate-700 dark:text-slate-300"
                            >
                              • {chapter.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={goToPrevious}
                        disabled={!canGoPrevious()}
                        className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                          canGoPrevious()
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        ❮ Previous
                      </button>

                      <button
                        onClick={goToNext}
                        disabled={!canGoNext()}
                        className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                          canGoNext()
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Next ❯
                      </button>
                    </div>
                  </div>
                ) : currentTopic ? (
                  <div>
                    <h1 className="text-lg md:text-4xl font-bold text-slate-900 dark:text-white mb-3 md:mb-8">
                      {currentTopic.title}
                    </h1>

                    <div className="prose prose-slate dark:prose-invert max-w-none mb-6 md:mb-12 text-xs md:text-base">
                      {renderTopicContent(currentTopic.content)}
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={goToPrevious}
                        disabled={!canGoPrevious()}
                        className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                          canGoPrevious()
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        ❮ Previous
                      </button>

                      <button
                        onClick={goToNext}
                        disabled={!canGoNext()}
                        className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                          canGoNext()
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Next ❯
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-lg md:text-4xl font-bold text-slate-900 dark:text-white mb-3 md:mb-8">
                      {currentChapter?.title}
                    </h1>

                    <div className="prose prose-slate dark:prose-invert max-w-none mb-6 md:mb-12">
                      <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 mb-3 md:mb-6">
                        This chapter covers the following topics:
                      </p>

                      <ul className="space-y-1 md:space-y-2">
                        {currentChapter?.topics?.map((topic: any) => (
                          <li key={topic.id}>
                            <button
                              onClick={() => setSelectedTopic(topic.id)}
                              className="text-xs md:text-base text-blue-600 hover:underline font-medium"
                            >
                              {topic.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={goToPrevious}
                        disabled={!canGoPrevious()}
                        className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                          canGoPrevious()
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        ❮ Previous
                      </button>

                      <button
                        onClick={goToNext}
                        disabled={!canGoNext()}
                        className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                          canGoNext()
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Next ❯
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </SubjectAccessGuard>
          ) : (
            <div className="max-w-4xl mx-auto p-4 md:p-8">
              <div className="flex justify-end mb-4">
                <BookmarkIcon className="w-6 h-6 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
              </div>

              {!learningContent ? (
                <div className="text-center py-12 md:py-20 px-4">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                    Content Not Available
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-4 md:mb-6">
                    Content for {learningSubject} in{" "}
                    {grade.replace("_", " ").toUpperCase()} is being prepared.
                  </p>
                  <button
                    onClick={() => setActiveTab("hub")}
                    className="px-4 md:px-6 py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Go to Resource Hub
                  </button>
                </div>
              ) : !selectedChapter ? (
                <div>
                <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 md:mb-8">
                  {learningContent.title || `${learningSubject} Introduction`}
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-8 md:mb-12">
                  <p className="text-sm md:text-lg text-slate-700 dark:text-slate-300 mb-4 md:mb-6">
                    {learningContent.introduction ||
                      `${learningSubject} is an essential high school subject.`}
                  </p>

                  <h2 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-3 md:mb-4">
                    Course Coverage
                  </h2>

                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 mb-3 md:mb-4">
                    {grade.replace("_", " ").toUpperCase()}
                    {stream
                      ? ` • ${stream.charAt(0).toUpperCase()}${stream.slice(1)} stream`
                      : ""}
                  </p>

                  {learningContent?.chapters?.length > 0 && (
                    <ul className="space-y-1 md:space-y-2">
                      {learningContent.chapters.map((chapter: any) => (
                        <li
                          key={chapter.id}
                          className="text-sm md:text-base text-slate-700 dark:text-slate-300"
                        >
                          • {chapter.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoPrevious()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    ❮ Previous
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={!canGoNext()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoNext()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Next ❯
                  </button>
                </div>
              </div>
            ) : currentTopic ? (
              <div>
                <h1 className="text-lg md:text-4xl font-bold text-slate-900 dark:text-white mb-3 md:mb-8">
                  {currentTopic.title}
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-6 md:mb-12 text-xs md:text-base">
                  {renderTopicContent(currentTopic.content)}
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoPrevious()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    ❮ Previous
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={!canGoNext()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoNext()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Next ❯
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-lg md:text-4xl font-bold text-slate-900 dark:text-white mb-3 md:mb-8">
                  {currentChapter?.title}
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-6 md:mb-12">
                  <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 mb-3 md:mb-6">
                    This chapter covers the following topics:
                  </p>

                  <ul className="space-y-1 md:space-y-2">
                    {currentChapter?.topics?.map((topic: any) => (
                      <li key={topic.id}>
                        <button
                          onClick={() => setSelectedTopic(topic.id)}
                          className="text-xs md:text-base text-blue-600 hover:underline font-medium"
                        >
                          {topic.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoPrevious()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    ❮ Previous
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={!canGoNext()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoNext()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Next ❯
                  </button>
                </div>
              </div>
            )}
          </div>
          )}
        </main>
      </div>
    </div>
  );
};
