import React from 'react';

export const Chapter8: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-6">
        Chapter 8: Economic Activities in Ethiopia
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Chapter Overview
          </h2>
          <p className="leading-relaxed">
            This chapter explores the various economic activities and sectors in Ethiopia, including mining, agriculture, manufacturing, and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>8.1. Introduction</li>
            <li>8.2. Mining Activity in Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>8.2.1. Introduction</li>
                <li>8.2.2. Status of mining sector investment in Ethiopia</li>
                <li>8.2.3. Importance of mining sector in Ethiopia</li>
                <li>8.2.4. Environmental issues and management related to mining</li>
              </ul>
            </li>
            <li>8.3. Forestry</li>
            <li>8.4. Fishery
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>8.4.1. Introduction</li>
                <li>8.4.2. Fishing Grounds in Ethiopia</li>
                <li>8.4.3. Demand and consumption of fish</li>
                <li>8.4.4. Constraints and opportunities of the fishing sector</li>
              </ul>
            </li>
            <li>8.5. Agriculture in Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>8.5.1. Introduction</li>
                <li>8.5.2. Contributions, potentials and characteristics of agriculture in Ethiopia</li>
                <li>8.5.3. Agriculture systems in Ethiopia</li>
                <li>8.5.4. Major problems of Ethiopian agriculture</li>
              </ul>
            </li>
            <li>8.6. Manufacturing Industry in Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>8.6.1. Introduction</li>
                <li>8.6.2. Types, characteristics of manufacturing</li>
                <li>8.6.3. The spatial distribution of manufacturing industries in Ethiopia</li>
                <li>8.6.4. Industrial development in Ethiopia: Challenges and opportunities</li>
              </ul>
            </li>
            <li>8.7. The Service Sector in Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>8.7.1. Introduction</li>
                <li>8.7.2. Transportation and communication in Ethiopia: types, roles and characteristics</li>
                <li>8.7.3. Trade in Ethiopia</li>
                <li>8.7.4. Tourism in Ethiopia: Types, tourist attraction sites, challenges and prospects</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
            Economic Sectors Covered
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Primary sector: Mining, forestry, fishery, agriculture</li>
            <li>Secondary sector: Manufacturing industry</li>
            <li>Tertiary sector: Transportation, trade, tourism</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
