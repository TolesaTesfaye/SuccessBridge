import React from 'react'

const AdditionSubtraction: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Addition and Subtraction</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Addition and subtraction are the foundation of all mathematics. 
            Let's master these essential operations step by step.
          </p>

          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Addition (+)</h2>
            <p className="text-gray-700 mb-4">
              Addition means combining numbers to find their total sum.
            </p>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">Example:</h4>
              <div className="font-mono text-lg">
                <div>  25</div>
                <div>+ 17</div>
                <div>----</div>
                <div>  42</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Properties of Addition</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-blue-700">Commutative Property</h4>
                <p className="text-gray-700">Order doesn't matter: a + b = b + a</p>
                <p className="font-mono">5 + 3 = 3 + 5 = 8</p>
              </div>
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-blue-700">Associative Property</h4>
                <p className="text-gray-700">Grouping doesn't matter: (a + b) + c = a + (b + c)</p>
                <p className="font-mono">(2 + 3) + 4 = 2 + (3 + 4) = 9</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-red-800 mb-4">Subtraction (-)</h2>
            <p className="text-gray-700 mb-4">
              Subtraction means taking away one number from another.
            </p>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">Example:</h4>
              <div className="font-mono text-lg">
                <div>  42</div>
                <div>- 17</div>
                <div>----</div>
                <div>  25</div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Step-by-Step Process</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-purple-700 mb-2">Addition Steps</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>Line up numbers by place value</li>
                  <li>Start with the ones column</li>
                  <li>Add digits in each column</li>
                  <li>Carry over if sum ≥ 10</li>
                  <li>Continue to the left</li>
                </ol>
              </div>
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-purple-700 mb-2">Subtraction Steps</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  <li>Line up numbers by place value</li>
                  <li>Start with the ones column</li>
                  <li>Subtract bottom from top</li>
                  <li>Borrow if top digit is smaller</li>
                  <li>Continue to the left</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Practice Tips</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Always line up digits by place value (ones under ones, tens under tens)</li>
              <li>• Check your work by using the inverse operation</li>
              <li>• For addition: 25 + 17 = 42, check: 42 - 17 = 25 ✓</li>
              <li>• For subtraction: 42 - 17 = 25, check: 25 + 17 = 42 ✓</li>
              <li>• Practice with smaller numbers first, then work up to larger ones</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdditionSubtraction