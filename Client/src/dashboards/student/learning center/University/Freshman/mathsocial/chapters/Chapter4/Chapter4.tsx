import React from 'react';

export const Chapter4: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER FOUR
        </h1>
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          INTRODUCTION TO CALCULUS
        </h2>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <p className="text-gray-700 dark:text-gray-300">
          Content for Chapter 4: Introduction to Calculus will be added soon...
        </p>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          <li>• 4.1. Limit and Continuity</li>
          <li>• 4.2. Derivatives</li>
          <li>• 4.3. Application of Derivative</li>
          <li>• 4.4. Integrals and Their Applications</li>
        </ul>
      </div>
    </div>
  );
};
