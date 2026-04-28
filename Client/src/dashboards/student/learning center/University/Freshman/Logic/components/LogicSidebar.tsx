import React from 'react';
import { Link } from 'react-router-dom';

interface LogicSidebarProps {
  isOpen: boolean;
  expandedChapters: number[];
  onToggleChapter: (chapterId: number) => void;
}

const LogicSidebar: React.FC<LogicSidebarProps> = ({ isOpen, expandedChapters, onToggleChapter }) => {
  const chapters = [
    {
      id: 1,
      title: 'Chapter 1: Introducing Philosophy',
      lessons: [
        'Lesson 1: Meaning and Nature of Philosophy',
        'Lesson 2: Basic Features of Philosophy',
        'Lesson 3: Metaphysics and Epistemology',
        'Lesson 4: Axiology and Logic',
        'Lesson 5: Importance of Learning Philosophy'
      ]
    },
    {
      id: 2,
      title: 'Chapter 2: Basic Concepts of Logic',
      lessons: [
        'Lesson 1: Arguments, Premises and Conclusions',
        'Lesson 2: Techniques of Recognizing Arguments',
        'Lesson 3: Types of Arguments',
        'Lesson 4: Evaluating Arguments'
      ]
    },
    {
      id: 3,
      title: 'Chapter 3: Logic and Language',
      lessons: [
        'Lesson 1: Language and Logic',
        'Lesson 2: Types of Language',
        'Lesson 3: Definitions'
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 h-screen overflow-y-auto border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Logic Course
        </h2>
        
        <nav className="space-y-2">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="border-b border-gray-200 dark:border-gray-700 pb-2">
              <div className="flex items-center justify-between">
                <Link
                  to={`/student/learning-center/logic/chapter${chapter.id}`}
                  className="flex-1 text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 py-2"
                >
                  {chapter.title}
                </Link>
                <button
                  onClick={() => onToggleChapter(chapter.id)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  {expandedChapters.includes(chapter.id) ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
              
              {expandedChapters.includes(chapter.id) && (
                <div className="ml-4 mt-2 space-y-1">
                  {chapter.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-gray-600 dark:text-gray-400 py-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                    >
                      {lesson}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default LogicSidebar;
