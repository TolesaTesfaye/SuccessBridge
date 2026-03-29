import React from 'react';

export const MathIntroduction: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Math Introduction
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Mathematics is the study of numbers, quantities, shapes, and patterns.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          What is Mathematics?
        </h2>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Mathematics provides tools for solving problems and understanding patterns
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It forms the foundation for science, engineering, and technology
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Math develops logical thinking and analytical skills
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • It's essential for understanding the world around us
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