import React from 'react';

export const Chapter3: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER THREE
        </h1>
        <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-2">
          FLUID MECHANICS
        </h2>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <p className="text-gray-700 dark:text-gray-300">
          Content for Chapter 3: Fluid Mechanics will be added soon...
        </p>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          <li>• 3.1. Properties of Bulk Matter</li>
          <li>• 3.2. Density and Pressure in Static Fluids</li>
          <li>• 3.3. Buoyant Force and Archimedes' Principles</li>
          <li>• 3.4. Moving Fluids and Bernoulli Equations</li>
        </ul>
      </div>
    </div>
  );
};

export default Chapter3;
