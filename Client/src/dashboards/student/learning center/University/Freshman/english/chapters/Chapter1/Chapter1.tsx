import React from 'react';

export const Chapter1: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-rose-700 dark:text-rose-400 mb-6">
        Unit 1: Study Skills
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit focuses on developing essential study skills including listening, reading comprehension, and grammar fundamentals for academic success.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>1.1. Listening: What is a lecture?</li>
            <li>1.2. Grammar focus: Modals and infinitives for giving advice</li>
            <li>1.3. Reading: Reading for study</li>
            <li>1.4. Grammar focus: Present perfect tense</li>
            <li>1.5. Reflections</li>
            <li>1.6. Self-assessment</li>
            <li>1.7. Summary</li>
          </ul>
        </section>

        <section className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-rose-700 dark:text-rose-300 mb-2">
            Key Learning Areas
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Effective listening strategies for lectures</li>
            <li>Using modals and infinitives for advice</li>
            <li>Academic reading techniques</li>
            <li>Present perfect tense usage</li>
            <li>Self-reflection and assessment skills</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
