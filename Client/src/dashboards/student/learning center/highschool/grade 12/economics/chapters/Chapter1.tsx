import React from 'react';

export const Chapter1: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Chapter 1: Introduction to Economics
      </h1>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            1.1. Basic Economic Concepts
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Economics is the social science that studies how individuals, businesses, governments, and nations make choices about allocating scarce resources to satisfy unlimited wants and needs.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Key Concept:</strong> Economics deals with the fundamental problem of scarcity - the gap between limited resources and unlimited human wants.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            1.2. Economic Systems
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            An economic system is the method used by a society to produce and distribute goods and services. The main types include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Market Economy:</strong> Decisions made by individuals and businesses</li>
            <li><strong>Command Economy:</strong> Government makes all economic decisions</li>
            <li><strong>Mixed Economy:</strong> Combination of market and command systems</li>
            <li><strong>Traditional Economy:</strong> Based on customs and traditions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            1.3. Scarcity and Choice
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Scarcity forces individuals and societies to make choices. Every choice involves an opportunity cost - the value of the next best alternative that must be given up.
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-4">
            <p className="text-sm text-amber-900 dark:text-amber-200">
              <strong>Example:</strong> If you choose to spend money on a new phone, the opportunity cost might be the vacation you could have taken instead.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            1.4. Production Possibilities
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The Production Possibilities Frontier (PPF) is a curve showing the maximum possible output combinations of two goods that an economy can produce given its resources and technology.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-4">
            <p className="text-sm text-green-900 dark:text-green-200">
              <strong>Key Points:</strong>
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm text-green-900 dark:text-green-200">
              <li>Points on the curve represent efficient production</li>
              <li>Points inside the curve represent inefficient production</li>
              <li>Points outside the curve are currently unattainable</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
