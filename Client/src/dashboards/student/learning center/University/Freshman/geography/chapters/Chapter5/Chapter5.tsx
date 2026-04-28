import React from 'react';

export const Chapter5: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-6">
        Chapter 5: The Climate of Ethiopia and the Horn
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Chapter Overview
          </h2>
          <p className="leading-relaxed">
            This chapter examines the climate patterns, agro-ecological zones, and climate change in Ethiopia and the Horn of Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>5.1. Introduction</li>
            <li>5.2. Elements and Controls of Weather and Climate</li>
            <li>5.3. Spatiotemporal Patterns and Distribution of Temperature and Rainfall in Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>5.3.1. Spatiotemporal distribution of temperature</li>
                <li>5.3.2. Spatiotemporal distribution of rainfall</li>
              </ul>
            </li>
            <li>5.4. Agro-ecological Zones of Ethiopia</li>
            <li>5.5. Climate Change/Global Warming: Causes, Consequences and Response Mechanisms
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>5.5.1. Current Trends of Climate Change in Ethiopia</li>
                <li>5.5.2. Causes of Climate Change</li>
                <li>5.5.3. Consequences of Climate Change</li>
                <li>5.5.4. Climate Response Mechanisms</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
            Important Concepts
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Weather and climate elements and controls</li>
            <li>Temperature and rainfall distribution patterns</li>
            <li>Agro-ecological zones</li>
            <li>Climate change impacts and responses</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
