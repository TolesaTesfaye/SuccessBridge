import React from 'react';

export const Chapter7: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-6">
        Chapter 7: Population of Ethiopia and the Horn
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Chapter Overview
          </h2>
          <p className="leading-relaxed">
            This chapter examines population dynamics, distribution, and socio-cultural aspects of Ethiopia and the Horn of Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>7.1. Introduction</li>
            <li>7.2. Population Data: Uses and Sources</li>
            <li>7.3. Population Dynamics: Fertility, Mortality and Migration
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>7.3.1. Demographic Measurements</li>
                <li>7.3.2. Levels and trends in fertility and mortality rates in Ethiopia</li>
                <li>7.3.3. Migration in Ethiopia and the Horn</li>
              </ul>
            </li>
            <li>7.4. Age and Sex Structure of Ethiopian Population</li>
            <li>7.5. Population Distribution in Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>7.5.1. Measures of population distribution</li>
                <li>7.5.2. Factors affecting population distribution in Ethiopia</li>
              </ul>
            </li>
            <li>7.6. Socio-cultural Aspects of Ethiopian Population: Education, Health and Languages
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>7.6.1. Education</li>
                <li>7.6.2. Health</li>
                <li>7.6.3. Languages families and languages of Ethiopia</li>
              </ul>
            </li>
            <li>7.7. Settlement Types and Patterns
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>7.7.1. Types of Settlement</li>
                <li>7.7.2. Urban Settlements and Urbanization in Ethiopia</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
            Core Topics
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Population dynamics and demographic measurements</li>
            <li>Population distribution and structure</li>
            <li>Socio-cultural aspects and settlement patterns</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
