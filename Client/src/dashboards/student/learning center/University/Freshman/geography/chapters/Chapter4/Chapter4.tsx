import React from 'react';

export const Chapter4: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-6">
        Chapter 4: Drainage Systems and Water Resource of Ethiopia and the Horn
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Chapter Overview
          </h2>
          <p className="leading-relaxed">
            This chapter explores the drainage systems and water resources of Ethiopia and the Horn of Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>4.1. Introduction</li>
            <li>4.2. Major Drainage System of Ethiopia
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>4.2.1. The western drainage system</li>
                <li>4.2.2. The southeastern drainage system</li>
                <li>4.2.3. The Rift Valley drainage system</li>
              </ul>
            </li>
            <li>4.3. Water Resources: Rivers, Lakes and Sub-Surface Water
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>4.3.1. The Ethiopian rivers</li>
                <li>4.3.2. The Ethiopian lakes</li>
                <li>4.3.3. Subsurface (ground) water resource of Ethiopia</li>
              </ul>
            </li>
            <li>4.4. Water Resources Potentials and Development in Ethiopia</li>
          </ul>
        </section>

        <section className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
            Key Focus Areas
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Three major drainage systems of Ethiopia</li>
            <li>Rivers, lakes, and groundwater resources</li>
            <li>Water resource development potential</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
