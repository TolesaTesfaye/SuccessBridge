import React from 'react';

export const SimplifyingExpressions: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Simplifying Expressions
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Simplifying expressions means combining like terms and reducing to the simplest form.
        </p>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Steps to Simplify
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
              <li><strong>Remove parentheses</strong> using distributive property</li>
              <li><strong>Identify like terms</strong> (same variable, same exponent)</li>
              <li><strong>Combine like terms</strong> by adding/subtracting coefficients</li>
              <li><strong>Arrange terms</strong> in descending order of exponents</li>
            </ol>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
              Distributive Property
            </h3>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p><strong>Formula:</strong> a(b + c) = ab + ac</p>
              <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-green-500">
                <p><strong>Example 1:</strong> 3(x + 4) = 3x + 12</p>
                <p><strong>Example 2:</strong> -2(3y - 5) = -6y + 10</p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
              Combining Like Terms
            </h3>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p><strong>Like terms</strong> have the same variable and exponent.</p>
              <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-orange-500">
                <p><strong>Example 1:</strong> 2x + 3x - x = 4x</p>
                <p><strong>Example 2:</strong> 5y² + 2y - 3y² + 7y = 2y² + 9y</p>
                <p><strong>Example 3:</strong> 3(x + 2) + 4x = 3x + 6 + 4x = 7x + 6</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
              Practice Problems
            </h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <div className="bg-white dark:bg-slate-800 p-4 rounded">
                <p><strong>Problem 1:</strong> Simplify 4x + 7x - 2x</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Solution: Combine like terms → (4 + 7 - 2)x = 9x
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded">
                <p><strong>Problem 2:</strong> Simplify 2(3x + 1) + 5x</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Solution: Distribute → 6x + 2 + 5x → Combine → 11x + 2
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded">
                <p><strong>Problem 3:</strong> Simplify 3y² + 2y + 4y² - 5y + 1</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Solution: Group like terms → (3y² + 4y²) + (2y - 5y) + 1 → 7y² - 3y + 1
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Key Reminders
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>Only combine terms with identical variables and exponents</li>
            <li>When distributing, multiply the outside term by every term inside</li>
            <li>Pay attention to signs (positive and negative)</li>
            <li>Always check your work by expanding back if possible</li>
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