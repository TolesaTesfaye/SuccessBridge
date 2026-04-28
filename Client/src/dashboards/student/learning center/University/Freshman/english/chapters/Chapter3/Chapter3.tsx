import React from 'react';

export const Chapter3: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-rose-700 dark:text-rose-400 mb-6">
        Unit 3: Cultural Values
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit examines cultural values and practices while developing advanced grammar skills and reading comprehension strategies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>3.1. Listening: Cultural tourism</li>
            <li>3.2. Grammar focus: The present simple, past simple, present perfect and past perfect in contrast</li>
            <li>3.3. Strategies for improving English grammar knowledge</li>
            <li>3.4. Reading: The Awramba community</li>
            <li>3.5. Reflections</li>
            <li>3.6. Self-assessment</li>
            <li>3.7. Summary</li>
          </ul>
        </section>

        <section className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-rose-700 dark:text-rose-300 mb-2">
            Learning Focus
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Understanding cultural tourism concepts</li>
            <li>Mastering verb tense contrasts</li>
            <li>Grammar improvement strategies</li>
            <li>Reading about Ethiopian cultural communities</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
