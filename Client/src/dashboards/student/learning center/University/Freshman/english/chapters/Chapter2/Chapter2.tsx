import React from 'react';

export const Chapter2: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-rose-700 dark:text-rose-400 mb-6">
        Unit 2: Health and Fitness
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit explores health and fitness topics while developing listening, reading, and grammar skills through relevant contexts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>2.1. Listening: Zinedine Zidane</li>
            <li>2.2. Grammar focus: Conditionals</li>
            <li>2.3. Reading: Health and fitness</li>
            <li>2.4. Vocabulary: Guessing meaning from context</li>
            <li>2.5. Reflections</li>
            <li>2.6. Self-assessment</li>
            <li>2.7. Summary</li>
          </ul>
        </section>

        <section className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-rose-700 dark:text-rose-300 mb-2">
            Skills Development
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Listening comprehension through biographical content</li>
            <li>Understanding and using conditional sentences</li>
            <li>Reading about health and fitness topics</li>
            <li>Context-based vocabulary acquisition</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
