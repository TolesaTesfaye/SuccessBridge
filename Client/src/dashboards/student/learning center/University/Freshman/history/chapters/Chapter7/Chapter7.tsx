import React from 'react';

export const Chapter7: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-amber-700 dark:text-amber-400 mb-6">
        Unit 7: Internal Developments and External Relations, 1941-1995
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit covers the post-liberation imperial period, the Derg military regime, and the transitional government that followed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Topics Covered (5 Hours)
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>7.1. Post-1941 Imperial Period</li>
            <li>7.2. The Derg Regime (1974-1991)</li>
            <li>7.3. Transitional Government</li>
          </ul>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-2">
            Major Historical Periods
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Restoration of Haile Selassie and post-war reconstruction</li>
            <li>Modernization and centralization efforts</li>
            <li>1974 Revolution and fall of the monarchy</li>
            <li>Derg military regime and socialist policies</li>
            <li>Civil wars and liberation movements</li>
            <li>Fall of the Derg and transitional government (1991-1995)</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
