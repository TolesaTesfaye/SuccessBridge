import React from 'react';

export const DeductionVsInduction: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Deduction vs. Induction
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          There are two main types of logical reasoning: deductive and inductive arguments.
        </p>

        <div className="space-y-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              Deductive Argument
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              An argument in which the conclusion is claimed to follow from the premises with absolute necessity.
            </p>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Example:</p>
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                <strong>Premise 1:</strong> All birds have feathers.
              </p>
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                <strong>Premise 2:</strong> A robin is a bird.
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Conclusion:</strong> Therefore, a robin has feathers.
              </p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Characteristics of Deductive Arguments:
              </h3>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                <li>• If premises are true, conclusion must be true</li>
                <li>• Moves from general to specific</li>
                <li>• Provides certainty (when valid and sound)</li>
                <li>• Cannot provide new information beyond premises</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
              Inductive Argument
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              An argument in which the conclusion is claimed to follow from the premises with probability.
            </p>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-green-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Example:</p>
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                <strong>Premise 1:</strong> The sun has risen every day for the past 1000 years.
              </p>
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                <strong>Premise 2:</strong> There's no reason to expect this pattern to change.
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Conclusion:</strong> Therefore, the sun will probably rise tomorrow.
              </p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                Characteristics of Inductive Arguments:
              </h3>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                <li>• Conclusion is probable, not certain</li>
                <li>• Moves from specific to general</li>
                <li>• Can provide new information</li>
                <li>• Strength varies by evidence quality</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Key Differences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-600 dark:text-blue-400">Deductive</h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Certainty (if valid)</li>
                <li>• General → Specific</li>
                <li>• No new information</li>
                <li>• Mathematical proofs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 dark:text-green-400">Inductive</h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Probability</li>
                <li>• Specific → General</li>
                <li>• New information</li>
                <li>• Scientific theories</li>
              </ul>
            </div>
          </div>
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