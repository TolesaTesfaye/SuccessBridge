import React from 'react';

export const RealNumberSystem: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        The Real Number System
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          The real number system includes all the numbers we use in everyday mathematics.
        </p>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Natural Numbers (N)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              The counting numbers: {"{1, 2, 3, 4, 5, ...}"}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              These are the numbers we use for counting objects.
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
              Whole Numbers (W)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              Natural numbers plus zero: {"{0, 1, 2, 3, 4, ...}"}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Includes all natural numbers and zero.
            </p>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
              Integers (Z)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              Positive and negative whole numbers: {"..., -2, -1, 0, 1, 2, ..."}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Includes positive numbers, negative numbers, and zero.
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
              Rational Numbers (Q)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              Numbers that can be expressed as p/q where p and q are integers and q ≠ 0
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Examples: 1/2, 3/4, -2/3, 0.5, 0.333...
            </p>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
              Irrational Numbers
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              Numbers that cannot be expressed as fractions
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Examples: √2, π, e, √3
            </p>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Number System Hierarchy
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
            Natural Numbers ⊂ Whole Numbers ⊂ Integers ⊂ Rational Numbers ⊂ Real Numbers
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
        <button className="px-6 py-3 rounded text-sm font-medium bg-[#04aa6d] text-white hover:bg-[#038a5a] transition-colors">
          ❮ Previous
        </button>
        <button className="px-6 py-3 rounded text-sm font-medium bg-slate-200 text-slate-400 cursor-not-allowed">
          Next ❯
        </button>
      </div>
    </div>
  );
};