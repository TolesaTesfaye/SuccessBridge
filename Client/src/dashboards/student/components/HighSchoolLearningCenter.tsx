import React, { useState } from 'react';
import { ChevronRight, ChevronDown, BookmarkIcon } from 'lucide-react';
import { getGradeSpecificContent } from '@utils/gradeSpecificContent';

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
  grade: 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12';
  stream: string | null;
  subjects: string[];
  learningSubject: string;
  setLearningSubject: (subject: string) => void;
  setActiveTab: (tab: 'home' | 'learning' | 'hub') => void;
}

export const HighSchoolLearningCenter: React.FC<HighSchoolLearningCenterProps> = ({
  grade,
  stream,
  subjects,
  learningSubject,
  setLearningSubject,
  setActiveTab
}) => {
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  
  // Get grade-specific content for the selected subject
  const learningContent = getGradeSpecificContent(grade, learningSubject) as LearningContent | null;

  // If no content is available for this grade/subject combination, show a message
  if (!learningContent) {
    return (
      <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              Content Not Available
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Learning content for {learningSubject} in {grade.replace('_', ' ').toUpperCase()} is not yet available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentChapter = learningContent?.chapters?.find((ch: Chapter) => ch.id === selectedChapter);
  const currentTopic = currentChapter?.topics?.find((topic: Topic) => topic.id === selectedTopic);

  React.useEffect(() => {
    if (learningContent?.chapters?.length > 0) {
      const firstChapter = learningContent.chapters[0];
      setSelectedChapter(firstChapter.id);
      setExpandedChapters(new Set([firstChapter.id]));
      if (firstChapter.topics?.length > 0) {
        setSelectedTopic(firstChapter.topics[0].id);
      }
      return;
    }

    setSelectedChapter('');
    setSelectedTopic('');
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
      const newExpanded = new Set(expandedChapters);
      newExpanded.add(prevTopic.chapterId);
      setExpandedChapters(newExpanded);
    } else {
      setSelectedChapter('');
      setSelectedTopic('');
    }
  };

  const goToNext = () => {
    if (!selectedChapter) {
      if (learningContent?.chapters?.length > 0) {
        const firstChapter = learningContent.chapters[0];
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
    if (!selectedChapter) return learningContent?.chapters?.length > 0;
    const allTopics = getAllTopics();
    const currentIndex = getCurrentTopicIndex();
    return currentIndex < allTopics.length - 1;
  };

  const renderTopicContent = (content: string | string[]) => {
    const paragraphs = Array.isArray(content) ? content : [content];
    return paragraphs.map((paragraph, index) => (
      <div key={index} className="mb-4">
        {paragraph.startsWith('- **') || paragraph.startsWith('• ') ? (
          <div className="ml-4 text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: paragraph }} />
        ) : paragraph.includes('**') ? (
          <p
            className="text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
          />
        ) : (
          <p className="text-slate-700 dark:text-slate-300">{paragraph}</p>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-screen">
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

      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 bg-[#f1f1f1] dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll" style={{ maxHeight: 'calc(100vh - 48px)', minHeight: '400px' }}>
            <div className="space-y-0">
              <div className="bg-[#2563eb] text-white px-4 py-3 text-sm font-bold border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                {learningSubject} Tutorial
              </div>

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

              {learningContent?.chapters?.map((chapter: any) => (
                <div key={chapter.id}>
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

                  {expandedChapters.has(chapter.id) && chapter.topics?.map((topic: any) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedChapter(chapter.id);
                        setSelectedTopic(topic.id);
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

        <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto p-8">
            <div className="flex justify-end mb-4">
              <BookmarkIcon className="w-6 h-6 text-slate-400 hover:text-[#2563eb] cursor-pointer transition-colors" />
            </div>

            {!learningContent ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Content Not Available</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Content for {learningSubject} in {grade.replace('_', ' ').toUpperCase()} is being prepared.
                </p>
                <button
                  onClick={() => setActiveTab('hub')}
                  className="px-6 py-2 bg-[#2563eb] text-white rounded-lg font-semibold hover:bg-[#1d4ed8] transition-colors"
                >
                  Go to Resource Hub
                </button>
              </div>
            ) : !selectedChapter ? (
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
                  {learningContent.title || `${learningSubject} Introduction`}
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
                    {learningContent.introduction || `${learningSubject} is an essential high school subject.`}
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                    Course Coverage
                  </h2>

                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    {grade.replace('_', ' ').toUpperCase()}
                    {stream ? ` • ${stream.charAt(0).toUpperCase()}${stream.slice(1)} stream` : ''}
                  </p>

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
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
                  {currentTopic.title}
                </h1>

                <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
                  {renderTopicContent(currentTopic.content)}
                </div>

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
