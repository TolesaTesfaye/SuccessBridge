import React from 'react';

export const PhysicsIntroduction: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Physics Introduction
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Physics is the fundamental science that seeks to understand how the universe works.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is Physics?
        </h2>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Physics studies matter, energy, and their interactions
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It explains natural phenomena from atoms to galaxies
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Physics forms the foundation for all other sciences
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It drives technological advancement and innovation
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Why Study Physics?
        </h2>
        
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Understanding physics helps us:
        </p>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Understand the fundamental laws of nature
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Develop problem-solving and analytical skills
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Contribute to scientific and technological progress
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Make sense of the world around us
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