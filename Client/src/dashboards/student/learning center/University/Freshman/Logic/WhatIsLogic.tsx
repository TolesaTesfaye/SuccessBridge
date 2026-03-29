import React from 'react';

export const WhatIsLogic: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        What is Logic?
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Logic is the scientific study of the rules and principles of reasoning.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Key Concepts in Logic
        </h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">Argument</h3>
            <p className="text-slate-700 dark:text-slate-300">
              A set of statements, one or more of which (premises) are claimed to provide support for, 
              or reasons to believe, one of the others (conclusion).
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">Premise</h3>
            <p className="text-slate-700 dark:text-slate-300">
              A statement in an argument that sets forth evidence or reasons to support the conclusion.
            </p>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">Conclusion</h3>
            <p className="text-slate-700 dark:text-slate-300">
              The statement that the evidence is claimed to support. This is what the argument is trying to prove.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Example of a Logical Argument
        </h2>
        
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300 mb-2">
            <strong>Premise 1:</strong> All humans are mortal.
          </p>
          <p className="text-slate-700 dark:text-slate-300 mb-2">
            <strong>Premise 2:</strong> Socrates is human.
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Conclusion:</strong> Therefore, Socrates is mortal.
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
        <button className="px-6 py-3 rounded text-sm font-medium bg-[#04aa6d] text-white hover:bg-[#038a5a] transition-colors">
          ❮ Previous
        </button>
        <button className="px-6 py-3 rounded text-sm font-medium bg-[#04aa6d] text-white hover:bg-[#038a5a] transition-colors">
          Next ❯
        </button>
      </div>
    </div>
  );
};