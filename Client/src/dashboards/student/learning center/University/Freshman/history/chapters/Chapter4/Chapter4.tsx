import React from 'react';

export const Chapter4: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-amber-700 dark:text-amber-400 mb-6">
        Unit 4: Politics, Economy and Society from the Late 13th to the Beginning of the 16th Centuries
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit examines the restoration of the Solomonic dynasty, power struggles, the dynamics of Muslim sultanates, and rivalry between Christian and Muslim states.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Topics Covered (6 Hours)
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>4.1. The "Restoration" of the "Solomonic" Dynasty</li>
            <li>4.2. Power Struggle, Consolidation, Territorial Expansion and Religious Processes</li>
            <li>4.3. Political and Socio-Economic Dynamics in Muslim Sultanates</li>
            <li>4.4. Rivalry Between the Christian Kingdom and the Muslim Sultanates</li>
            <li>4.5. External Relations</li>
          </ul>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-2">
            Key Historical Developments
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Restoration and consolidation of the Solomonic dynasty</li>
            <li>Territorial expansion and religious conflicts</li>
            <li>Rise and development of Muslim sultanates</li>
            <li>Christian-Muslim rivalry and interactions</li>
            <li>External diplomatic and trade relations</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
