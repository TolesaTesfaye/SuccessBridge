import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Chapter {
  id: number;
  title: string;
  sections: string[];
  route: string;
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: 'ESSENCE OF PSYCHOLOGY',
    sections: [
      '1.1. Definition of Psychology',
      '1.2. Goals of Psychology',
      '1.3. Historical Background',
      '1.4. Branches of Psychology',
      '1.5. Research Methods'
    ],
    route: '/student/learning-center/psychology/chapter1'
  },
  {
    id: 2,
    title: 'HUMAN DEVELOPMENT',
    sections: [
      '2.1. Basics of Human Development',
      '2.2. Principles of Development',
      '2.3. Aspects of Development',
      '2.4. Theories of Development'
    ],
    route: '/student/learning-center/psychology/chapter2'
  },
  {
    id: 3,
    title: 'LEARNING AND THEORIES',
    sections: [
      '3.1. Definition and Characteristics',
      '3.2. Factors Influencing Learning',
      '3.3. Learning Theories'
    ],
    route: '/student/learning-center/psychology/chapter3'
  },
  {
    id: 4,
    title: 'MEMORY AND FORGETTING',
    sections: [
      '4.1. Memory Processes',
      '4.2. Forgetting',
      '4.3. Improving Memory'
    ],
    route: '/student/learning-center/psychology/chapter4'
  },
  {
    id: 5,
    title: 'MOTIVATION AND EMOTIONS',
    sections: [
      '5.1. Motivation',
      '5.2. Emotions'
    ],
    route: '/student/learning-center/psychology/chapter5'
  },
  {
    id: 6,
    title: 'PERSONALITY',
    sections: [
      '6.1. Meaning of Personality',
      '6.2. Theories of Personality'
    ],
    route: '/student/learning-center/psychology/chapter6'
  },
  {
    id: 7,
    title: 'PSYCHOLOGICAL DISORDERS',
    sections: [
      '7.1. Nature of Disorders',
      '7.2. Causes of Disorders',
      '7.3. Types of Disorders',
      '7.4. Treatment Techniques'
    ],
    route: '/student/learning-center/psychology/chapter7'
  },
  {
    id: 8,
    title: 'INTRODUCTION TO LIFE SKILLS',
    sections: [
      '8.1. Nature and Definition',
      '8.2. Goals of Life Skills',
      '8.3. Components of Life Skills'
    ],
    route: '/student/learning-center/psychology/chapter8'
  },
  {
    id: 9,
    title: 'INTRA-PERSONAL SKILLS',
    sections: [
      '9.1. Self-Concept',
      '9.2. Self-Esteem',
      '9.3. Self-Control',
      '9.4. Anger Management',
      '9.5. Emotional Intelligence',
      '9.6. Stress and Resilience'
    ],
    route: '/student/learning-center/psychology/chapter9'
  }
];

interface PsychologySidebarProps {
  isOpen: boolean;
  expandedChapters: number[];
  onToggleChapter: (chapterId: number) => void;
}

const PsychologySidebar: React.FC<PsychologySidebarProps> = ({ 
  isOpen, 
  expandedChapters, 
  onToggleChapter 
}) => {
  const location = useLocation();

  const isCurrentChapter = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div
      className={`${
        isOpen ? 'w-80' : 'w-0'
      } transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden`}
    >
      <div className="p-4 h-screen overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 sticky top-0 bg-white dark:bg-gray-800 pb-2 border-b border-gray-200 dark:border-gray-700">
          TABLE OF CONTENTS
        </h2>

        {/* Module Home */}
        <div className="mb-4">
          <Link
            to="/student/learning-center/psychology"
            className="block p-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
          >
            📚 Psychology Module Home
          </Link>
        </div>

        {/* Chapters */}
        <div className="space-y-2">
          {chapters.map((chapter) => {
            const isCurrent = isCurrentChapter(chapter.route);
            const isExpanded = expandedChapters.includes(chapter.id);

            return (
              <div key={chapter.id} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <button
                  onClick={() => onToggleChapter(chapter.id)}
                  className={`w-full text-left p-2 rounded flex justify-between items-center ${
                    isCurrent 
                      ? 'bg-pink-50 dark:bg-pink-900/20' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className={`font-semibold text-sm ${
                    isCurrent 
                      ? 'text-pink-600 dark:text-pink-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    CHAPTER {chapter.id}
                  </span>
                  <span className="text-gray-500">
                    {isExpanded ? '▼' : '▶'}
                  </span>
                </button>
                
                <Link
                  to={chapter.route}
                  className={`block p-2 pl-4 text-sm font-medium rounded ${
                    isCurrent 
                      ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {chapter.title}
                </Link>

                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {chapter.sections.map((section, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-gray-600 dark:text-gray-400 p-1 pl-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                      >
                        {section}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PsychologySidebar;
export { chapters };
