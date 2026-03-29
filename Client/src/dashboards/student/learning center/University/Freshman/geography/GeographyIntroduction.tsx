import React from 'react';

export const GeographyIntroduction: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Geography Introduction
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Geography is the study of places and the relationships between people and their environments.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is Geography?
        </h2>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Geography examines both physical and human aspects of our world
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It studies spatial relationships and patterns
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Geography connects natural sciences with social sciences
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It helps us understand global challenges and solutions
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Why Study Geography?
        </h2>
        
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Understanding geography helps us:
        </p>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Make sense of our interconnected world
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Understand environmental and social issues
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Develop spatial thinking skills
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Become informed global citizens
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