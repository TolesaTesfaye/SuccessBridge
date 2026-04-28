import React from 'react';

export const Chapter2: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-amber-700 dark:text-amber-400 mb-6">
        Unit 2: Peoples and Cultures in Ethiopia and the Horn
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit examines human evolution, the Neolithic revolution, the peopling of the region, and religious processes in Ethiopia and the Horn of Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Topics Covered (4 Hours)
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>2.1. Human Evolution</li>
            <li>2.2. Neolithic Revolution</li>
            <li>2.3. The Peopling of the Region</li>
            <li>2.4. Religion and Religious Processes</li>
          </ul>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-2">
            Key Themes
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Early human evolution and archaeological evidence</li>
            <li>Transition from hunting-gathering to agriculture</li>
            <li>Migration patterns and settlement of diverse peoples</li>
            <li>Development of religious beliefs and practices</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
