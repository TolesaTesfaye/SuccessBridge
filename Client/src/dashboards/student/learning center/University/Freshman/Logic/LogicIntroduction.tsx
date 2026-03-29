import React from 'react';

export const LogicIntroduction: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Logic Introduction
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Logic is the scientific study of the rules and principles of reasoning.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is Logic?
        </h2>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Logic studies the structure of arguments and valid reasoning
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It provides tools for evaluating the strength of arguments
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Logic helps distinguish between valid and invalid reasoning
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It's fundamental to mathematics, philosophy, and computer science
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Why Study Logic?
        </h2>
        
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Understanding logic helps us:
        </p>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Think more clearly and systematically
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Evaluate arguments and claims critically
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Construct valid and sound arguments
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Avoid common logical fallacies
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