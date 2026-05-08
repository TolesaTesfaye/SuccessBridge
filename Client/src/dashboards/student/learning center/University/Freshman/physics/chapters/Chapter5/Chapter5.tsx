import React from 'react';

export const Chapter5: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER FIVE
        </h1>
        <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-2">
          OSCILLATIONS, WAVES AND OPTICS
        </h2>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <p className="text-gray-700 dark:text-gray-300">
          Content for Chapter 5: Oscillations, Waves and Optics will be added soon...
        </p>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          <li>• 5.1. Simple Harmonic Motion</li>
          <li>• 5.2. The Simple Pendulum</li>
          <li>• 5.3. Wave and Its Characteristics</li>
          <li>• 5.4. Resonance</li>
          <li>• 5.5. The Doppler Effect</li>
          <li>• 5.6. Image Formation by Thin Lenses and Mirrors</li>
        </ul>
      </div>
    </div>
  );
};

export default Chapter5;
