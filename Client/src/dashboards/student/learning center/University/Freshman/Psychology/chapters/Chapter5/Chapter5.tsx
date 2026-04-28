import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PsychologySidebar from '../../components/PsychologySidebar';

const Chapter5: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([5]);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <PsychologySidebar 
        isOpen={sidebarOpen}
        expandedChapters={expandedChapters}
        onToggleChapter={toggleChapter}
      />

      <div className="flex-1 p-6">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          {sidebarOpen ? '◀ Hide TOC' : '▶ Show TOC'}
        </button>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">CHAPTER FIVE</h1>
            <h2 className="text-3xl font-semibold text-pink-600 dark:text-pink-400 mb-4">MOTIVATION AND EMOTIONS</h2>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-gray-700 dark:text-gray-300">Chapter 5 content will be added here...</p>
          </div>

          <div className="flex gap-4 mt-8">
            <Link to="/student/learning-center/psychology/chapter4" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">❮ Previous</Link>
            <Link to="/student/learning-center/psychology/chapter6" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Next ❯</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter5;
