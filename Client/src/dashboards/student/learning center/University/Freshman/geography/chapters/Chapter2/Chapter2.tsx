import React from 'react';

export const Chapter2: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-6">
        Chapter 2: The Geology of Ethiopia and the Horn
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Chapter Overview
          </h2>
          <p className="leading-relaxed">
            This chapter explores the geological processes and formations that shaped Ethiopia and the Horn of Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>2.1. Introduction</li>
            <li>2.2. The Geologic Processes: Endogenic and Exogenic Forces</li>
            <li>2.3. The Geological Time scale and Age Dating Techniques</li>
            <li>2.4. Geological Processes and the Resulting Landforms of Ethiopia and the Horn
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>2.4.1. The Precambrian Era geologic processes (4.5 billion - 600 million years ago)</li>
                <li>2.4.2. The Paleozoic Era geologic processes (600 million - 225 million years ago)</li>
                <li>2.4.3. The Mesozoic Era geologic processes (225-70 million years ago)</li>
                <li>2.4.4. The Cenozoic Era geologic processes (70 million years ago - Present)</li>
              </ul>
            </li>
            <li>2.5. Rock and Mineral Resources of Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>2.5.1. Brief facts and current state of main minerals in Ethiopia</li>
                <li>2.5.2. Mineral potential sites of Ethiopia</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
            Key Concepts
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Endogenic and exogenic geological forces</li>
            <li>Geological time scale and eras</li>
            <li>Rock and mineral resources of Ethiopia</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
