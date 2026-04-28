import React from 'react';

export const Chapter1: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-amber-700 dark:text-amber-400 mb-6">
        Unit 1: Introduction
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit introduces the fundamental concepts of history, historical methods, and the geographical context of Ethiopia and the Horn of Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Topics Covered (3 Hours)
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>1.1. The Nature and Uses of History</li>
            <li>1.2. Sources and Methods of Historical Study</li>
            <li>1.3. Historiography of Ethiopia and the Horn</li>
            <li>1.4. The Geographical Context</li>
          </ul>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-2">
            Learning Objectives
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Understand the nature and importance of historical study</li>
            <li>Learn about sources and methods used in historical research</li>
            <li>Explore the historiography of Ethiopia and the Horn</li>
            <li>Understand the geographical context of the region</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
