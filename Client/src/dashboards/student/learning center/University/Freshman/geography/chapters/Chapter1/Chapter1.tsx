import React from 'react';

export const Chapter1: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 mb-6">
        Chapter 1: Introduction
      </h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Chapter Overview
          </h2>
          <p className="leading-relaxed">
            This chapter introduces the fundamental concepts of Geography, focusing on Ethiopia and the Horn of Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-300 mb-3">
            Topics Covered
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>1.1. Geography: Definition, Scope and Themes
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>1.1.1. Meaning of Geography</li>
                <li>1.1.2. The Scope, Approaches and Themes of Geography</li>
              </ul>
            </li>
            <li>1.2. Location, Shape and Size of Ethiopia and the Horn
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>1.2.1. Location of Ethiopia</li>
                <li>1.2.2. Size of Ethiopia</li>
                <li>1.2.3. The shape of Ethiopia and its implication</li>
              </ul>
            </li>
            <li>1.3. Basic Skills of Map Reading</li>
          </ul>
        </section>

        <section className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300 mb-2">
            Learning Objectives
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Understand the definition and scope of Geography</li>
            <li>Learn about Ethiopia's location, size, and shape</li>
            <li>Develop basic map reading skills</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
