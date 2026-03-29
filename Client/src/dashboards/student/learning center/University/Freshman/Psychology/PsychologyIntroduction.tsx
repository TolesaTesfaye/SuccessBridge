import React from 'react';

export const PsychologyIntroduction: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Psychology Introduction
      </h1>
      
      <div className="flex gap-4 mb-8">
        <button className="px-4 py-2 bg-[#04aa6d] text-white rounded text-sm font-medium hover:bg-[#038a5a] transition-colors">
          ❮ Previous
        </button>
        <button className="px-4 py-2 bg-[#04aa6d] text-white rounded text-sm font-medium hover:bg-[#038a5a] transition-colors">
          Next ❯
        </button>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Psychology is the scientific study of behavior and mental processes.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is Psychology?
        </h2>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Psychology studies both observable behavior and internal mental processes
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It uses scientific methods to understand human and animal behavior
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Psychology has applications in therapy, education, business, and research
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It bridges the gap between biological sciences and social sciences
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Why Study Psychology?
        </h2>
        
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Understanding psychology helps us:
        </p>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Better understand ourselves and others
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Improve relationships and communication
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Make informed decisions about mental health
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Apply scientific thinking to everyday problems
          </li>
        </ul>
      </div>
    </div>
  );
};