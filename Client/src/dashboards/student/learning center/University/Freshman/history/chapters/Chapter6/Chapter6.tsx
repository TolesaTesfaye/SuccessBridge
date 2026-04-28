import React from 'react';

export const Chapter6: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-amber-700 dark:text-amber-400 mb-6">
        Unit 6: Internal Developments and External Relations of Ethiopia and the Horn, 1800-1941
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit examines the making of the modern Ethiopian state, modernization attempts, socio-economic developments, and external relations during the 19th and early 20th centuries.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Topics Covered (10 Hours)
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>6.1. The Nature of Interactions Among Peoples and States of Ethiopia and the Horn</li>
            <li>6.2. The Making of Modern Ethiopian State</li>
            <li>6.3. Modernization Attempts</li>
            <li>6.4. Socio-Economic Developments</li>
            <li>6.5. External Relations</li>
          </ul>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-2">
            Critical Periods
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Reunification under Tewodros II</li>
            <li>Territorial expansion under Menelik II</li>
            <li>Battle of Adwa and its significance</li>
            <li>Modernization reforms and infrastructure development</li>
            <li>European colonialism and the Scramble for Africa</li>
            <li>Italian invasion and occupation (1936-1941)</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
