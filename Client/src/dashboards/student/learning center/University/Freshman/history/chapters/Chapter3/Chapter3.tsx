import React from 'react';

export const Chapter3: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-amber-700 dark:text-amber-400 mb-6">
        Unit 3: Politics, Economy and Society to the End of the 13th Century
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit explores the emergence of states, ancient civilizations, external contacts, economic formations, and socio-cultural achievements in Ethiopia and the Horn up to the 13th century.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Topics Covered (6 Hours)
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>3.1. Emergence of States</li>
            <li>3.2. Ancient States</li>
            <li>3.3. External Contacts</li>
            <li>3.4. Economic Formations</li>
            <li>3.5. Socio-Cultural Achievements</li>
          </ul>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-2">
            Important Topics
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Formation of early states and kingdoms</li>
            <li>Ancient civilizations like Aksum</li>
            <li>Trade networks and external relations</li>
            <li>Economic systems and social structures</li>
            <li>Cultural and technological achievements</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
