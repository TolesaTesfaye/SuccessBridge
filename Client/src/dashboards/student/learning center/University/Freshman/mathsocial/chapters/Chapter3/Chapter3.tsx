import React from 'react';

export const Chapter3: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Chapter Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          CHAPTER THREE
        </h1>
        <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
          MATRICES AND DETERMINANT
        </h2>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <p className="text-gray-700 dark:text-gray-300">
          Content for Chapter 3: Matrices and Determinant will be added soon...
        </p>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
          <li>• 3.1. Definition of a Matrix</li>
          <li>• 3.2. Matrix Algebra</li>
          <li>• 3.3. Types of Matrices</li>
          <li>• 3.4. Elementary Row Operations</li>
          <li>• 3.5. Row Echelon Form and Reduced Row Echelon Form</li>
          <li>• 3.6. Rank of a Matrix</li>
          <li>• 3.7. Determinant and Its Properties</li>
          <li>• 3.8. Adjoint and Inverse of a Matrix</li>
          <li>• 3.9. System of Linear Equations</li>
        </ul>
      </div>
    </div>
  );
};
