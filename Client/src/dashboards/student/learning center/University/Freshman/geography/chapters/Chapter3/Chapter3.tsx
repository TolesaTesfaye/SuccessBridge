import React from 'react';

export const Chapter3: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-6">
        Chapter 3: The Topography of Ethiopia and the Horn
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Chapter Overview
          </h2>
          <p className="leading-relaxed">
            This chapter examines the topographical features and physiographic divisions of Ethiopia and the Horn of Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>3.1. Introduction</li>
            <li>3.2. The Physiographic Divisions of Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>3.2.1. The western highlands and lowlands</li>
                <li>3.2.2. The southeastern highlands and lowlands</li>
                <li>3.2.3. The Rift Valley</li>
              </ul>
            </li>
            <li>3.3. The Impacts of Relief on Biophysical and Socioeconomic Conditions</li>
          </ul>
        </section>

        <section className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
            Key Topics
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Western and southeastern highlands and lowlands</li>
            <li>The Great Rift Valley system</li>
            <li>Impact of relief on environment and society</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
