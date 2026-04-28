import React from 'react';

export const Chapter5: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-amber-700 dark:text-amber-400 mb-6">
        Unit 5: Politics, Economy and Social Processes from the Early 16th to the End of the 18th Centuries
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Unit Overview
          </h2>
          <p className="leading-relaxed">
            This unit covers conflicts between Christian and Muslim states, foreign interventions, population movements, and the Gondarine period through the Zemene Mesafint.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-300 mb-3">
            Topics Covered (10 Hours)
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>5.1. Conflict Between the Christian Kingdom and the Sultanate of Adal and After</li>
            <li>5.2. Foreign Intervention and Religious Controversies</li>
            <li>5.3. Population Movements</li>
            <li>5.4. Interaction and Integration Across Ethnic and Religious Diversities</li>
            <li>5.5. Peoples and States in Eastern, Central, Southern and Western Regions</li>
            <li>5.6. The Gondarine Period and Zemene-Mesafint</li>
          </ul>
        </section>

        <section className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-2">
            Major Historical Events
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Wars between Christian Ethiopia and Adal Sultanate</li>
            <li>Portuguese and Ottoman interventions</li>
            <li>Oromo population movements and expansion</li>
            <li>Ethnic and religious integration processes</li>
            <li>Gondarine period and its achievements</li>
            <li>Zemene Mesafint (Era of Princes)</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
