import React from 'react';

export const Chapter2: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER TWO
        </h1>
        <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-2">
          KINEMATICS AND DYNAMICS OF PARTICLES
        </h2>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <p className="text-gray-700 dark:text-gray-300">
          Content for Chapter 2: Kinematics and Dynamics of Particles will be added soon...
        </p>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          <li>• 2.1. Kinematics in One and Two Dimensions</li>
          <li>• 2.2. Particle Dynamics and Planetary Motion</li>
          <li>• 2.3. Work, Energy and Linear Momentum</li>
        </ul>
      </div>
    </div>
  );
};

export default Chapter2;
