import React, { useState } from 'react';
import { GRADE_11_GEOGRAPHY_CONTENT } from './geographyContent';

const GeographyPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(selectedTopic === topicId ? null : topicId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {GRADE_11_GEOGRAPHY_CONTENT.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {GRADE_11_GEOGRAPHY_CONTENT.grade}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {GRADE_11_GEOGRAPHY_CONTENT.introduction}
          </p>
        </div>

        <div className="space-y-6">
          {GRADE_11_GEOGRAPHY_CONTENT.chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {chapter.title}
              </h2>

              <div className="space-y-3">
                {chapter.topics.map((topic) => (
                  <div key={topic.id} className="border-l-4 border-teal-500 pl-4">
                    <button
                      onClick={() => handleTopicClick(topic.id)}
                      className="w-full text-left"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        {topic.title}
                      </h3>
                    </button>
                    {selectedTopic === topic.id && (
                      <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <p className="text-gray-700 dark:text-gray-300">
                          {topic.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeographyPage;
