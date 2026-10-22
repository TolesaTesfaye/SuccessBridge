import React, { useState } from 'react';
import { REMEDIAL_CHEMISTRY_CONTENT } from './chemistryContent';

const ChemistryPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(selectedTopic === topicId ? null : topicId);
  };

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const renderContent = (contentArray: string[]) => {
    return contentArray.map((line, index) => {
      // Empty line - add spacing
      if (line === '') {
        return <div key={index} className="h-2" />;
      }

      // Bold headers (text between **)
      if (line.includes('**')) {
        const text = line.replace(/\*\*/g, '');
        return (
          <p key={index} className="font-bold text-gray-900 dark:text-white mt-3 mb-1">
            {text}
          </p>
        );
      }

      // Bullet points
      if (line.startsWith('• ')) {
        const content = line.substring(2);
        // Check if it has nested bold text
        if (content.includes('**')) {
          const parts = content.split('**');
          return (
            <li key={index} className="ml-4 text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-white">{parts[1]}</span>
              {parts[2]}
            </li>
          );
        }
        return (
          <li key={index} className="ml-4 text-gray-700 dark:text-gray-300">
            {content}
          </li>
        );
      }

      // Sub-bullets (indented with spaces)
      if (line.startsWith('  - ')) {
        const content = line.substring(4);
        return (
          <li key={index} className="ml-8 text-sm text-gray-600 dark:text-gray-400 list-disc">
            {content}
          </li>
        );
      }

      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto pl-2 pr-0 md:px-6 py-4 md:py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          {REMEDIAL_CHEMISTRY_CONTENT.subject}
        </h1>
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Master the fundamentals of chemistry - from atoms to chemical reactions
        </p>
      </div>

      {/* Chapters */}
      <div className="space-y-6">
        {REMEDIAL_CHEMISTRY_CONTENT.chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            {/* Chapter Header */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-green-600 hover:to-teal-700 transition-all flex items-center justify-between"
            >
              <h2 className="text-xl md:text-2xl font-bold text-left">
                {chapter.title}
              </h2>
              <svg
                className={`w-6 h-6 transform transition-transform ${expandedChapters.has(chapter.id) ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Topics */}
            {expandedChapters.has(chapter.id) && (
              <div className="p-6 space-y-4">
                {chapter.topics.map((topic) => (
                  <div key={topic.id} className="border-l-4 border-green-500 dark:border-green-400 pl-4">
                    <button
                      onClick={() => handleTopicClick(topic.id)}
                      className="w-full text-left group"
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors flex items-center gap-2">
                        <span className="text-green-600 dark:text-green-400">▸</span>
                        {topic.title}
                      </h3>
                    </button>

                    {selectedTopic === topic.id && (
                      <div className="mt-4 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          {renderContent(topic.content)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-800 dark:text-green-200">
          💡 <strong>Study Tip:</strong> Chemistry builds on itself - make sure you understand each topic before moving to the next one. Practice is key!
        </p>
      </div>
    </div>
  );
};

export default ChemistryPage;
