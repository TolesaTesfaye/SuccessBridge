import React from 'react';

export const HistoryIntroduction: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        History Introduction
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          History is the study of past events, particularly in human affairs.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is History?
        </h2>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • History examines human experiences across time and cultures
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It analyzes causes and effects of historical events
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • History helps us understand how societies develop and change
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It provides context for understanding the present
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Why Study History?
        </h2>
        
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Understanding history helps us:
        </p>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Learn from past successes and mistakes
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Develop critical thinking and analytical skills
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Understand different perspectives and cultures
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Make informed decisions as citizens
          </li>
        </ul>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
        <button className="px-6 py-3 rounded text-sm font-medium bg-slate-200 text-slate-400 cursor-not-allowed">
          ❮ Previous
        </button>
        <button className="px-6 py-3 rounded text-sm font-medium bg-[#04aa6d] text-white hover:bg-[#038a5a] transition-colors">
          Next ❯
        </button>
      </div>
    </div>
  );
};