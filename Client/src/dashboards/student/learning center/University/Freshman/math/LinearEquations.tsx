import React from 'react';

export const LinearEquations: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Linear Equations in One Variable</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Linear equations are the foundation of algebra, representing relationships 
            where the variable appears to the first power only.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">What is a Linear Equation?</h2>
            <p className="text-gray-700 mb-4">
              A linear equation in one variable can be written in the form <strong>ax + b = c</strong>, 
              where a, b, and c are constants and a ≠ 0.
            </p>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">Standard Form:</h4>
              <code className="text-lg font-mono">ax + b = c</code>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Characteristics</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Contains only one variable</li>
                <li>• Variable has an exponent of 1</li>
                <li>• Graph is a straight line</li>
                <li>• Has exactly one solution</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Examples</h3>
              <ul className="text-gray-700 space-y-2">
                <li><code className="bg-gray-200 px-2 py-1 rounded">2x + 5 = 11</code></li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">3y - 7 = 14</code></li>
                <li><code className="bg-gray-200 px-2 py-1 rounded">4z + 1 = 2z + 9</code></li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-orange-800 mb-4">Solving Linear Equations</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-orange-700 mb-2">Step-by-Step Process:</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>Simplify both sides if needed</li>
                  <li>Move variables to one side</li>
                  <li>Move constants to the other side</li>
                  <li>Divide by the coefficient of the variable</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Worked Example</h3>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-4 border-blue-400">
                <p className="font-semibold">Solve: 2x + 5 = 11</p>
              </div>
              <div className="bg-white p-3 rounded">
                <p><strong>Step 1:</strong> Subtract 5 from both sides</p>
                <code className="block mt-1 text-lg">2x + 5 - 5 = 11 - 5</code>
                <code className="block mt-1 text-lg">2x = 6</code>
              </div>
              <div className="bg-white p-3 rounded">
                <p><strong>Step 2:</strong> Divide both sides by 2</p>
                <code className="block mt-1 text-lg">2x ÷ 2 = 6 ÷ 2</code>
                <code className="block mt-1 text-lg font-bold text-green-600">x = 3</code>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p><strong>Check:</strong> Substitute x = 3 back into original equation</p>
                <code className="block mt-1">2(3) + 5 = 6 + 5 = 11 ✓</code>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Practice Tips</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Always perform the same operation on both sides of the equation</li>
              <li>• Work systematically through each step</li>
              <li>• Check your answer by substituting back into the original equation</li>
              <li>• If you get a false statement, check your work for errors</li>
              <li>• Remember: whatever you do to one side, do to the other side</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};