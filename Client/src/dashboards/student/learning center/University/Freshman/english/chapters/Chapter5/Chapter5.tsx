import React from 'react';

export const Chapter5: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-rose-700 dark:text-rose-400 mb-6">
        Unit 5: Population
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit examines population topics while developing advanced vocabulary skills, understanding collocations, and mastering voice in grammar.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>5.1. Listening: Population density</li>
            <li>5.2. Reading: Population pyramid</li>
            <li>5.3. Vocabulary: Collocation</li>
            <li>5.4. Grammar focus: Voice</li>
            <li>5.5. Reflections</li>
            <li>5.6. Self-assessment</li>
            <li>5.7. Summary</li>
          </ul>
        </section>

        <section className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-rose-700 dark:text-rose-300 mb-2">
            Learning Objectives
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Understanding population density concepts</li>
            <li>Interpreting population pyramids and demographic data</li>
            <li>Mastering word collocations</li>
            <li>Active and passive voice usage</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
