import React from 'react';

export const Chapter4: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER FOUR
        </h1>
        <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-2">
          HEAT AND THERMODYNAMICS
        </h2>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <p className="text-gray-700 dark:text-gray-300">
          Content for Chapter 4: Heat and Thermodynamics will be added soon...
        </p>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          <li>• 4.1. The Concept of Temperature and the Zeroth Law of Thermodynamics</li>
          <li>• 4.2. Thermal Expansion</li>
          <li>• 4.3. The Concept of Heat, Work and Internal Energy</li>
          <li>• 4.4. Specific Heat and Latent Heat</li>
          <li>• 4.5. Heat Transfer Mechanisms</li>
          <li>• 4.6. The First Law of Thermodynamics</li>
        </ul>
      </div>
    </div>
  );
};

export default Chapter4;
