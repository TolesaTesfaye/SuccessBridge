import React from 'react';

export const Chapter4: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-rose-700 dark:text-rose-400 mb-6">
        Unit 4: Wildlife
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit explores wildlife topics while developing vocabulary skills, understanding word meanings, and reviewing conditional structures.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>4.1. Listening: Human-wildlife interaction</li>
            <li>4.2. Reading: Africa's wild animals</li>
            <li>4.3. Vocabulary: Denotative and connotative meanings</li>
            <li>4.4. Grammar focus: Conditionals revised</li>
            <li>4.5. Reflections</li>
            <li>4.6. Self-assessment</li>
            <li>4.7. Summary</li>
          </ul>
        </section>

        <section className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-rose-700 dark:text-rose-300 mb-2">
            Key Concepts
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Human-wildlife interaction and conservation</li>
            <li>African wildlife and biodiversity</li>
            <li>Understanding denotative vs. connotative meanings</li>
            <li>Advanced conditional sentence structures</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
