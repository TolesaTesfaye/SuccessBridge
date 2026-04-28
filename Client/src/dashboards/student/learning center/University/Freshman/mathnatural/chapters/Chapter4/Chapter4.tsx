import React from 'react';

export const Chapter4: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER FOUR
        </h1>
        <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-2">
          ANALYTIC GEOMETRY
        </h2>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <p className="text-gray-700 dark:text-gray-300">
          Content for Chapter 4: Analytic Geometry will be added soon...
        </p>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          <li>• 4.1. Distance Formula and Equation of Lines</li>
          <li>• 4.2. Circles</li>
          <li>• 4.3. Parabolas</li>
          <li>• 4.4. Ellipse</li>
          <li>• 4.5. Hyperbola</li>
          <li>• 4.6. The General Second Degree Equation</li>
        </ul>
      </div>
    </div>
  );
};
