import React, { useState } from 'react';
import { ChevronRight, ChevronDown, BookmarkIcon } from 'lucide-react';
import { InlineExercise } from '../../../components/common/InlineExercise';
import { PSYCHOLOGY_EXERCISES } from '../learning center/University/Freshman/Psychology/psychologyExercises';
import { MATH_EXERCISES } from '../learning center/University/Freshman/math/mathExercises';
import { LOGIC_EXERCISES } from '../learning center/University/Freshman/Logic/logicExercises';
import { REMEDIAL_MATH_EXERCISES } from '../learning center/University/Remedial/math/mathExercises';
import { REMEDIAL_ENGLISH_EXERCISES } from '../learning center/University/Remedial/english/englishExercises';

interface UniversityLearningCenterProps {
  subjects: string[];
  learningSubject: string;
  setLearningSubject: (subject: string) => void;
  learningContent: any;
  navigate: (path: string) => void;
  setActiveTab: (tab: 'home' | 'learning' | 'hub') => void;
}

export const UniversityLearningCenter: React.FC<UniversityLearningCenterProps> = ({
  subjects,
  learningSubject,
  setLearningSubject,
  learningContent,
  setActiveTab
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get current chapter and topic content
  const currentChapter = learningContent?.chapters?.find((ch: any) => ch.id === selectedChapter);
  const currentTopic = currentChapter?.topics?.find((topic: any) => topic.id === selectedTopic);

  // Auto-select first chapter and topic when subject changes
  React.useEffect(() => {
    if (learningContent?.chapters?.length > 0) {
      const firstChapter = learningContent.chapters[0];
      setSelectedChapter(firstChapter.id);
      setExpandedChapters(new Set([firstChapter.id])); // Auto-expand first chapter
      if (firstChapter.topics?.length > 0) {
        setSelectedTopic(firstChapter.topics[0].id);
      }
    }
  }, [learningContent]);

  // Toggle chapter expansion
  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  // Handle chapter click
  const handleChapterClick = (chapter: any) => {
    setSelectedChapter(chapter.id);
    if (chapter.topics?.length > 0) {
      setSelectedTopic(chapter.topics[0].id);
    }
    // Auto-expand when selecting a chapter
    const newExpanded = new Set(expandedChapters);
    newExpanded.add(chapter.id);
    setExpandedChapters(newExpanded);
    // Close sidebar on mobile after selection
    setIsSidebarOpen(false);
  };

  // Navigation logic
  const getAllTopics = () => {
    const allTopics: any[] = [];
    learningContent?.chapters?.forEach((chapter: any) => {
      chapter.topics?.forEach((topic: any) => {
        allTopics.push({ ...topic, chapterId: chapter.id });
      });
    });
    return allTopics;
  };

  const getCurrentTopicIndex = () => {
    const allTopics = getAllTopics();
    return allTopics.findIndex(topic => topic.id === selectedTopic);
  };

  const goToPrevious = () => {
    if (!selectedChapter) return;
    
    const allTopics = getAllTopics();
    const currentIndex = getCurrentTopicIndex();
    
    if (currentIndex > 0) {
      const prevTopic = allTopics[currentIndex - 1];
      setSelectedChapter(prevTopic.chapterId);
      setSelectedTopic(prevTopic.id);
      // Auto-expand the chapter
      const newExpanded = new Set(expandedChapters);
      newExpanded.add(prevTopic.chapterId);
      setExpandedChapters(newExpanded);
    } else {
      // Go to introduction
      setSelectedChapter('');
      setSelectedTopic('');
    }
  };

  const goToNext = () => {
    if (!selectedChapter) {
      // From introduction, go to first topic
      if (learningContent?.chapters?.length > 0) {
        const firstChapter = learningContent.chapters[0];
        setSelectedChapter(firstChapter.id);
        if (firstChapter.topics?.length > 0) {
          setSelectedTopic(firstChapter.topics[0].id);
        }
        // Auto-expand the chapter
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
      // Auto-expand the chapter
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
    if (!selectedChapter) return learningContent?.chapters?.length > 0;
    const allTopics = getAllTopics();
    const currentIndex = getCurrentTopicIndex();
    return currentIndex < allTopics.length - 1;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* W3Schools Styled Top Navigation Bar */}
      <div className="bg-[#282a35] overflow-x-auto no-scrollbar shadow-lg border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center min-w-max h-12">
          {subjects.map((subj) => (
            <button
              key={subj}
              onClick={() => setLearningSubject(subj)}
              className={`h-full px-6 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center whitespace-nowrap ${
                learningSubject === subj
                  ? 'bg-[#2563eb] text-white shadow-inner'
                  : 'text-slate-300 hover:bg-black/40 hover:text-white'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed bottom-4 right-4 z-40 bg-[#2563eb] text-white p-4 rounded-full shadow-lg hover:bg-[#1d4ed8] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar - Tutorial Navigation */}
        <div className={`
          fixed md:relative inset-y-0 left-0 z-50
          w-64 md:w-48 bg-[#f1f1f1] dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 
          flex flex-col h-full
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll" style={{ maxHeight: 'calc(100vh - 48px)', minHeight: '400px' }}>
            {/* Close button for mobile */}
            <div className="md:hidden flex justify-end p-2 border-b border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tutorial Navigation */}
            <div className="space-y-0">
              {/* Subject Tutorial Header - Always visible and highlighted */}
              <div className="bg-[#2563eb] text-white px-4 py-3 text-sm font-bold border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                {learningSubject} Tutorial
              </div>

              {/* Subject Home */}
              <button
                onClick={() => {
                  setSelectedChapter('');
                  setSelectedTopic('');
                }}
                className={`w-full text-left px-4 py-3 text-sm border-b border-slate-200 dark:border-slate-700 transition-colors ${
                  !selectedChapter
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {learningSubject} Introduction
              </button>

              {/* Chapters with Collapsible Topics */}
              {learningContent?.chapters?.map((chapter: any) => (
                <div key={chapter.id}>
                  {/* Chapter Header with Expand/Collapse */}
                  <div className="flex items-center">
                    <button
                      onClick={() => handleChapterClick(chapter)}
                      className={`flex-1 text-left px-4 py-3 text-sm border-b border-slate-200 dark:border-slate-700 transition-colors ${
                        selectedChapter === chapter.id
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {chapter.title}
                    </button>
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className={`px-2 py-3 border-b border-slate-200 dark:border-slate-700 transition-colors ${
                        selectedChapter === chapter.id
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {expandedChapters.has(chapter.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Topics under expanded chapter */}
                  {expandedChapters.has(chapter.id) && chapter.topics?.map((topic: any) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedTopic(topic.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-6 py-2 text-xs border-b border-slate-200 dark:border-slate-700 transition-colors ${
                        selectedTopic === topic.id
                          ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {topic.title}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto p-4 md:p-8">
            {/* Bookmark Icon */}
            <div className="flex justify-end mb-4">
              <BookmarkIcon className="w-6 h-6 text-slate-400 hover:text-[#2563eb] cursor-pointer transition-colors" />
            </div>

            {/* Content */}
            {!selectedChapter ? (
              // Subject Introduction
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
                  {learningSubject} Introduction
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
                    {learningSubject} is a fundamental subject for university students.
                  </p>
                  
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                    What is {learningSubject}?
                  </h2>
                  
                  {learningContent?.chapters?.length > 0 && (
                    <ul className="space-y-2">
                      {learningContent.chapters.map((chapter: any) => (
                        <li key={chapter.id} className="text-slate-700 dark:text-slate-300">
                          • {chapter.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoPrevious()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    ❮ Previous
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={!canGoNext()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoNext()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Next ❯
                  </button>
                </div>
              </div>
            ) : currentTopic ? (
              // Topic Content
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
                  {currentTopic.title}
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
                  {currentTopic.content.map((paragraph: string, index: number) => (
                    <div key={index} className="mb-4">
                      {paragraph.startsWith('- **') || paragraph.startsWith('• ') ? (
                        <div className="ml-4 text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: paragraph }} />
                      ) : paragraph.includes('**') ? (
                        <p className="text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      ) : (
                        <p className="text-slate-700 dark:text-slate-300">{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Inline Exercises */}
                {learningSubject === 'Psychology' && PSYCHOLOGY_EXERCISES[currentTopic.id] && (
                  <div className="mb-12">
                    {PSYCHOLOGY_EXERCISES[currentTopic.id].map((exercise, index) => (
                      <InlineExercise
                        key={index}
                        question={exercise}
                        exerciseNumber={index + 1}
                      />
                    ))}
                  </div>
                )}
                {learningSubject === 'Math' && MATH_EXERCISES[currentTopic.id] && (
                  <div className="mb-12">
                    {MATH_EXERCISES[currentTopic.id].map((exercise, index) => (
                      <InlineExercise
                        key={index}
                        question={exercise}
                        exerciseNumber={index + 1}
                      />
                    ))}
                  </div>
                )}
                {learningSubject === 'Logic' && LOGIC_EXERCISES[currentTopic.id] && (
                  <div className="mb-12">
                    {LOGIC_EXERCISES[currentTopic.id].map((exercise, index) => (
                      <InlineExercise
                        key={index}
                        question={exercise}
                        exerciseNumber={index + 1}
                      />
                    ))}
                  </div>
                )}
                {/* Remedial Course Exercises */}
                {learningSubject === 'Remedial Math' && REMEDIAL_MATH_EXERCISES[currentTopic.id] && (
                  <div className="mb-12">
                    {REMEDIAL_MATH_EXERCISES[currentTopic.id].map((exercise, index) => (
                      <InlineExercise
                        key={index}
                        question={exercise}
                        exerciseNumber={index + 1}
                      />
                    ))}
                  </div>
                )}
                {learningSubject === 'Remedial English' && REMEDIAL_ENGLISH_EXERCISES[currentTopic.id] && (
                  <div className="mb-12">
                    {REMEDIAL_ENGLISH_EXERCISES[currentTopic.id].map((exercise, index) => (
                      <InlineExercise
                        key={index}
                        question={exercise}
                        exerciseNumber={index + 1}
                      />
                    ))}
                  </div>
                )}

                {/* Bottom Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoPrevious()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    ❮ Previous
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={!canGoNext()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoNext()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Next ❯
                  </button>
                </div>
              </div>
            ) : (
              // Chapter Overview
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
                  {currentChapter?.title}
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
                    This chapter covers the following topics:
                  </p>
                  
                  <ul className="space-y-2">
                    {currentChapter?.topics?.map((topic: any) => (
                      <li key={topic.id}>
                        <button
                          onClick={() => setSelectedTopic(topic.id)}
                          className="text-[#2563eb] hover:underline font-medium"
                        >
                          {topic.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoPrevious()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    ❮ Previous
                  </button>

                  <button
                    onClick={goToNext}
                    disabled={!canGoNext()}
                    className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
                      canGoNext()
                        ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Next ❯
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};