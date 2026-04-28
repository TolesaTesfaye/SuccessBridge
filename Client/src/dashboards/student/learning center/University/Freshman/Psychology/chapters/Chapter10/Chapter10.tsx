import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PsychologySidebar from '../../components/PsychologySidebar';

const Chapter10: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([10]);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <PsychologySidebar 
        isOpen={sidebarOpen}
        expandedChapters={expandedChapters}
        onToggleChapter={toggleChapter}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Toggle Sidebar Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            {sidebarOpen ? '◀ Hide TOC' : '▶ Show TOC'}
          </button>

          <div className="max-w-5xl mx-auto">
            {/* Navigation */}
            <div className="flex gap-4 mb-6">
              <Link 
                to="/student/learning-center/psychology/chapter9"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ❮ Previous Chapter
              </Link>
              <Link 
                to="/student/learning-center/psychology/chapter11"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Next Chapter ❯
              </Link>
            </div>

            {/* Chapter Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                CHAPTER TEN
              </h1>
              <h2 className="text-3xl font-semibold text-pink-600 dark:text-pink-400 mb-4">
                ACADEMIC SKILLS
              </h2>
            </div>

            {/* Chapter Content */}
            <div className="space-y-6">
              {/* Section 10.1 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10.1. Time Management
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Time management is the ability to use time effectively and productively to accomplish goals and tasks.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Key Strategies:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Prioritize tasks using the Eisenhower Matrix</li>
                      <li>Create daily and weekly schedules</li>
                      <li>Avoid procrastination</li>
                      <li>Use time-blocking techniques</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 10.2 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10.2. Note-taking and Study Skills
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Effective note-taking and study skills are essential for academic success.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">Note-taking Methods:</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Cornell Method</li>
                        <li>Mind Mapping</li>
                        <li>Outline Method</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Study Techniques:</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Active Recall</li>
                        <li>Spaced Repetition</li>
                        <li>Pomodoro Technique</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 10.3 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10.3. Test-Taking Skill
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Effective test-taking strategies can significantly improve academic performance.
                  </p>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Test-Taking Strategies:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Read instructions carefully</li>
                      <li>Answer easy questions first</li>
                      <li>Manage time during the test</li>
                      <li>Review answers before submitting</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 10.4 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10.4. Test Anxiety and Overcoming Test Anxiety
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Test anxiety is excessive worry about performance on exams that can interfere with test-taking ability.
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Coping Strategies:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Practice relaxation techniques</li>
                      <li>Prepare thoroughly in advance</li>
                      <li>Use positive self-talk</li>
                      <li>Get adequate sleep before exams</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 10.5 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10.5. Goal Setting
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Goal setting is the process of identifying specific objectives and creating plans to achieve them.
                  </p>
                  <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">SMART Goals:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li><strong>S</strong>pecific - Clear and well-defined</li>
                      <li><strong>M</strong>easurable - Quantifiable progress</li>
                      <li><strong>A</strong>chievable - Realistic and attainable</li>
                      <li><strong>R</strong>elevant - Aligned with values</li>
                      <li><strong>T</strong>ime-bound - Has a deadline</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 10.6 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10.6. Career Development Skill
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Career development involves planning and managing your professional growth and advancement.
                  </p>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Key Components:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Self-assessment and career exploration</li>
                      <li>Networking and building professional relationships</li>
                      <li>Resume and interview preparation</li>
                      <li>Continuous learning and skill development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex gap-4 mt-8">
              <Link 
                to="/student/learning-center/psychology/chapter9"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ❮ Previous Chapter
              </Link>
              <Link 
                to="/student/learning-center/psychology/chapter11"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Next Chapter ❯
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter10;
