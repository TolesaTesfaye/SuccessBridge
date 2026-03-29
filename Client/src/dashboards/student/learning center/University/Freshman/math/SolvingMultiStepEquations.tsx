import React from 'react';

export const SolvingMultiStepEquations: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Solving Multi-Step Equations
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Multi-step equations require several operations to isolate the variable.
        </p>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              General Strategy
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Clear fractions</strong> (multiply by LCD if needed)</li>
              <li><strong>Distribute</strong> to remove parentheses</li>
              <li><strong>Combine like terms</strong> on each side</li>
              <li><strong>Move variables</strong> to one side</li>
              <li><strong>Move constants</strong> to the other side</li>
              <li><strong>Solve for the variable</strong></li>
            </ol>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
              Example 1: With Parentheses
            </h3>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-green-500">
                <p><strong>Solve:</strong> 3(x + 2) = 15</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p><strong>Step 1:</strong> Distribute → 3x + 6 = 15</p>
                  <p><strong>Step 2:</strong> Subtract 6 → 3x = 9</p>
                  <p><strong>Step 3:</strong> Divide by 3 → x = 3</p>
                  <p className="text-green-600 dark:text-green-400"><strong>Check:</strong> 3(3 + 2) = 3(5) = 15 ✓</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
              Example 2: Variables on Both Sides
            </h3>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-orange-500">
                <p><strong>Solve:</strong> 2x + 5 = 3x - 7</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p><strong>Step 1:</strong> Subtract 2x from both sides → 5 = x - 7</p>
                  <p><strong>Step 2:</strong> Add 7 to both sides → 12 = x</p>
                  <p><strong>Step 3:</strong> Therefore x = 12</p>
                  <p className="text-orange-600 dark:text-orange-400"><strong>Check:</strong> 2(12) + 5 = 29 and 3(12) - 7 = 29 ✓</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
              Example 3: Complex Multi-Step
            </h3>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-purple-500">
                <p><strong>Solve:</strong> 4(2x - 1) + 3 = 2(x + 5) + 1</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p><strong>Step 1:</strong> Distribute → 8x - 4 + 3 = 2x + 10 + 1</p>
                  <p><strong>Step 2:</strong> Combine like terms → 8x - 1 = 2x + 11</p>
                  <p><strong>Step 3:</strong> Subtract 2x → 6x - 1 = 11</p>
                  <p><strong>Step 4:</strong> Add 1 → 6x = 12</p>
                  <p><strong>Step 5:</strong> Divide by 6 → x = 2</p>
                  <p className="text-purple-600 dark:text-purple-400"><strong>Check:</strong> Left: 4(4-1)+3 = 15, Right: 2(2+5)+1 = 15 ✓</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
              Checking Your Solutions
            </h3>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p><strong>Always check your answer by:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Substituting your answer back into the original equation</li>
                <li>Verifying that both sides are equal</li>
                <li>If they're not equal, review your work for errors</li>
              </ul>
              <div className="bg-white dark:bg-slate-800 p-3 rounded mt-3">
                <p className="text-sm"><strong>Common Mistakes:</strong></p>
                <ul className="text-sm list-disc list-inside ml-2 space-y-1">
                  <li>Sign errors when distributing negative numbers</li>
                  <li>Forgetting to distribute to all terms</li>
                  <li>Arithmetic errors when combining like terms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Practice Tips
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>Work step by step - don't try to do multiple operations at once</li>
            <li>Keep your work organized and show each step clearly</li>
            <li>Double-check your arithmetic at each step</li>
            <li>Always verify your final answer</li>
          </ul>
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