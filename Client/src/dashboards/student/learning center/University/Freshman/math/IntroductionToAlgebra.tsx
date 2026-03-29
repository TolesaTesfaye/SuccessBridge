import React from 'react';

export const IntroductionToAlgebra: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Introduction to Algebra</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Algebra is the gateway to advanced mathematics, using letters and symbols to represent 
            numbers and solve complex problems.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">What is Algebra?</h2>
            <p className="text-gray-700">
              Algebra is the branch of mathematics that uses letters and symbols to represent 
              numbers and quantities in equations and expressions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Key Terms</h3>
              <ul className="text-gray-700 space-y-2">
                <li><strong>Variables:</strong> Letters representing unknown numbers (x, y, z)</li>
                <li><strong>Constants:</strong> Fixed numbers that don't change (5, -3, π)</li>
                <li><strong>Coefficients:</strong> Numbers multiplied by variables</li>
                <li><strong>Terms:</strong> Parts separated by + or - signs</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Examples</h3>
              <ul className="text-gray-700 space-y-2">
                <li>In <code className="bg-gray-200 px-2 py-1 rounded">3x + 5</code>: 3 is the coefficient, x is the variable</li>
                <li>In <code className="bg-gray-200 px-2 py-1 rounded">2y - 7</code>: Two terms separated by minus</li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">x² + 4x + 3</code>: Three terms (trinomial)</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Why Learn Algebra?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Problem Solving</h4>
                <p className="text-gray-700 text-sm">Solve problems with unknown quantities systematically</p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Real-World Applications</h4>
                <p className="text-gray-700 text-sm">Model situations like calculating costs, distances, and rates</p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Foundation</h4>
                <p className="text-gray-700 text-sm">Essential for calculus, physics, engineering, and economics</p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Logical Thinking</h4>
                <p className="text-gray-700 text-sm">Develops analytical and logical reasoning skills</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">From Arithmetic to Algebra</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded">
                <span className="font-medium">Arithmetic:</span>
                <code className="bg-gray-200 px-3 py-1 rounded">5 + 3 = 8</code>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded">
                <span className="font-medium">Algebra:</span>
                <code className="bg-gray-200 px-3 py-1 rounded">x + 3 = 8, so x = 5</code>
              </div>
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              Algebra generalizes arithmetic by using variables to represent any number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};