import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogicSidebar from '../../components/LogicSidebar';

const Chapter1: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([1]);

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
      <LogicSidebar 
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
                to="/student/learning-center/logic"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ❮ Back to Module
              </Link>
              <Link 
                to="/student/learning-center/logic/chapter2"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Next Chapter ❯
              </Link>
            </div>

            {/* Chapter Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                CHAPTER ONE
              </h1>
              <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                INTRODUCING PHILOSOPHY
              </h2>
            </div>

            {/* Chapter Content */}
            <div className="space-y-6">
              {/* Lesson 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Lesson 1: Meaning and Nature of Philosophy
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    <strong>Philosophy</strong> comes from the Greek words "philos" (love) and "sophia" (wisdom), meaning "love of wisdom."
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Key Characteristics:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Seeks fundamental truths about reality, knowledge, and existence</li>
                      <li>Uses rational inquiry and critical thinking</li>
                      <li>Questions assumptions and examines beliefs</li>
                      <li>Explores the nature of reality, knowledge, values, and reasoning</li>
                    </ul>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Philosophy is a systematic and critical examination of fundamental questions about existence, knowledge, values, reason, mind, and language.
                  </p>
                </div>
              </div>

              {/* Lesson 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Lesson 2: Basic Features of Philosophy
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Philosophy has several distinctive features that set it apart from other disciplines:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">1. Critical Thinking</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Analyzing arguments, identifying assumptions, and evaluating evidence systematically.
                      </p>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-2">2. Systematic Approach</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Organized and methodical examination of problems and questions.
                      </p>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-2">3. Rational Inquiry</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Using reason and logic rather than emotion or tradition alone.
                      </p>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                      <h4 className="font-bold text-red-900 dark:text-red-100 mb-2">4. Universal Questions</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Addresses fundamental questions relevant to all human beings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Lesson 3: Metaphysics and Epistemology
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    3.1 Metaphysics
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Metaphysics is the branch of philosophy that examines the fundamental nature of reality, including the relationship between mind and matter, substance and attribute, fact and value.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                    <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Key Questions in Metaphysics:</h5>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>What is the nature of reality?</li>
                      <li>Do abstract objects exist?</li>
                      <li>What is the relationship between mind and body?</li>
                      <li>Is there free will or determinism?</li>
                    </ul>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    3.2 Epistemology
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Epistemology is the study of knowledge and justified belief. It examines the nature, sources, and limits of knowledge.
                  </p>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Key Questions in Epistemology:</h5>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>What is knowledge?</li>
                      <li>How do we acquire knowledge?</li>
                      <li>What are the sources of knowledge?</li>
                      <li>What is the difference between belief and knowledge?</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lesson 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Lesson 4: Axiology and Logic
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    4.1 Axiology
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Axiology is the philosophical study of value, including ethics (moral values) and aesthetics (beauty and art).
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h5 className="font-bold text-green-900 dark:text-green-100 mb-2">Ethics</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Studies moral principles, right and wrong, good and bad conduct.
                      </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <h5 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Aesthetics</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Examines beauty, art, taste, and the creation and appreciation of beauty.
                      </p>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    4.2 Logic
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Logic is the study of correct reasoning and argumentation. It provides principles for distinguishing good arguments from bad ones.
                  </p>
                  
                  <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                    <h5 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">Key Aspects of Logic:</h5>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Validity and soundness of arguments</li>
                      <li>Deductive and inductive reasoning</li>
                      <li>Logical fallacies and errors in reasoning</li>
                      <li>Formal and informal logic</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lesson 5 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Lesson 5: Importance of Learning Philosophy
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Studying philosophy provides numerous benefits for personal and intellectual development:
                  </p>

                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-bold text-gray-900 dark:text-white">Critical Thinking Skills</h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        Develops ability to analyze arguments, identify assumptions, and evaluate evidence systematically.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h5 className="font-bold text-gray-900 dark:text-white">Clarity of Thought</h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        Helps express ideas clearly and precisely, improving communication skills.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-bold text-gray-900 dark:text-white">Ethical Awareness</h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        Enhances understanding of moral principles and ethical decision-making.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h5 className="font-bold text-gray-900 dark:text-white">Broader Perspective</h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        Provides a comprehensive view of different worldviews and ways of thinking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex gap-4 mt-8">
              <Link 
                to="/student/learning-center/logic"
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                ❮ Back to Module
              </Link>
              <Link 
                to="/student/learning-center/logic/chapter2"
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

export default Chapter1;
