import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PsychologySidebar from '../../components/PsychologySidebar';

const Chapter11: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([11]);

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
                to="/student/learning-center/psychology/chapter10"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ❮ Previous Chapter
              </Link>
              <Link 
                to="/student/learning-center/psychology"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Back to Module
              </Link>
            </div>

            {/* Chapter Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                CHAPTER ELEVEN
              </h1>
              <h2 className="text-3xl font-semibold text-pink-600 dark:text-pink-400 mb-4">
                SOCIAL SKILLS
              </h2>
            </div>

            {/* Chapter Content */}
            <div className="space-y-6">
              {/* Section 11.1 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11.1. Understanding Cultural Diversity
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Cultural diversity refers to the variety of cultural groups within a society, including differences in ethnicity, language, religion, and customs.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Benefits of Cultural Diversity:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Promotes creativity and innovation</li>
                      <li>Enhances problem-solving abilities</li>
                      <li>Broadens perspectives and worldviews</li>
                      <li>Fosters mutual respect and understanding</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 11.2 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11.2. Gender and Social Inclusion
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Gender equality and social inclusion ensure that all individuals have equal opportunities and rights regardless of gender, ethnicity, or social status.
                  </p>
                </div>
              </div>

              {/* Section 11.3 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11.3. Interpersonal Communication Skills
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Effective communication involves both verbal and non-verbal skills to convey messages clearly and understand others.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">Verbal Skills:</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Clear articulation</li>
                        <li>Active listening</li>
                        <li>Appropriate tone</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Non-verbal Skills:</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Body language</li>
                        <li>Eye contact</li>
                        <li>Facial expressions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 11.4 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11.4. Social Influences
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Social influences are the ways in which individuals are affected by the presence and actions of others.
                  </p>
                </div>
              </div>

              {/* Section 11.5 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11.5. Peer Pressure
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Peer pressure is the influence exerted by peers to encourage conformity to group norms and behaviors.
                  </p>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Resisting Negative Peer Pressure:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Build self-confidence</li>
                      <li>Choose friends wisely</li>
                      <li>Practice saying "no"</li>
                      <li>Seek support from trusted adults</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 11.6 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11.6. Assertiveness
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Assertiveness is the ability to express thoughts, feelings, and needs directly and respectfully while respecting others' rights.
                  </p>
                </div>
              </div>

              {/* Section 11.7 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11.7. Conflict and Conflict Resolution
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Conflict resolution involves finding peaceful solutions to disagreements through communication and compromise.
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Conflict Resolution Steps:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Identify the problem</li>
                      <li>Listen to all perspectives</li>
                      <li>Find common ground</li>
                      <li>Develop mutually acceptable solutions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 11.8 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11.8. Team Work
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Teamwork is the collaborative effort of a group to achieve a common goal effectively and efficiently.
                  </p>
                  <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">Effective Teamwork Skills:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Clear communication</li>
                      <li>Shared responsibility</li>
                      <li>Mutual respect</li>
                      <li>Flexibility and adaptability</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 11.9 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11.9. Overcoming Risky Behavior
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Risky behaviors are actions that can lead to negative consequences for health, safety, or well-being.
                  </p>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Prevention Strategies:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Develop decision-making skills</li>
                      <li>Build self-esteem and confidence</li>
                      <li>Seek positive role models</li>
                      <li>Access support systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex gap-4 mt-8">
              <Link 
                to="/student/learning-center/psychology/chapter10"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ❮ Previous Chapter
              </Link>
              <Link 
                to="/student/learning-center/psychology"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Back to Module
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter11;
