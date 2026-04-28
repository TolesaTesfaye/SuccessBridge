import React from 'react';

export const Chapter6: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-6">
        Chapter 6: Soils, Natural Vegetation and Wildlife Resources of Ethiopia and the Horn
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Chapter Overview
          </h2>
          <p className="leading-relaxed">
            This chapter explores the soil types, natural vegetation, and wildlife resources of Ethiopia and the Horn of Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>6.1. Introduction</li>
            <li>6.2. Ethiopian Soils: Types, Degradation and Conservation
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>6.2.1. Introduction</li>
                <li>6.2.2. Major soil types in Ethiopia</li>
                <li>6.2.3. Soil degradation</li>
                <li>6.2.4. Soil erosion control measures</li>
              </ul>
            </li>
            <li>6.3. Natural Vegetation of Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>6.3.1. Introduction</li>
                <li>6.3.2. Major vegetation types of Ethiopia</li>
                <li>6.3.3. Natural vegetation degradation</li>
                <li>6.3.4. Natural vegetation conservation</li>
              </ul>
            </li>
            <li>6.4. Wild Life/Wild Animals in Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>6.4.1. Introduction</li>
                <li>6.4.2. Wildlife conservation</li>
                <li>6.4.3. Challenges of wildlife conservation in Ethiopia</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
            Key Learning Points
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Soil types and conservation methods</li>
            <li>Vegetation types and their distribution</li>
            <li>Wildlife resources and conservation challenges</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
