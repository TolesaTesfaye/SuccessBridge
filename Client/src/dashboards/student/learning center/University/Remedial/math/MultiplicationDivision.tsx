import React from 'react'

const MultiplicationDivision: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Multiplication and Division</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Multiplication and division are powerful operations that help us solve 
            problems involving groups, rates, and equal sharing.
          </p>

          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Multiplication (×)</h2>
            <p className="text-gray-700 mb-4">
              Multiplication is repeated addition of the same number.
            </p>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">Example:</h4>
              <p className="font-mono text-lg">4 × 3 = 4 + 4 + 4 = 12</p>
              <p className="text-gray-600 mt-2">Read as: "4 times 3" or "4 groups of 3"</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Multiplication Table Patterns</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-blue-700 mb-2">Times 2 (Doubles)</h4>
                <div className="font-mono text-sm space-y-1">
                  <div>2 × 1 = 2</div>
                  <div>2 × 2 = 4</div>
                  <div>2 × 3 = 6</div>
                  <div>2 × 4 = 8</div>
                  <div>2 × 5 = 10</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-blue-700 mb-2">Times 5 (Count by 5s)</h4>
                <div className="font-mono text-sm space-y-1">
                  <div>5 × 1 = 5</div>
                  <div>5 × 2 = 10</div>
                  <div>5 × 3 = 15</div>
                  <div>5 × 4 = 20</div>
                  <div>5 × 5 = 25</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-red-800 mb-4">Division (÷)</h2>
            <p className="text-gray-700 mb-4">
              Division splits a number into equal groups or finds how many times one number fits into another.
            </p>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">Example:</h4>
              <p className="font-mono text-lg">12 ÷ 3 = 4</p>
              <p className="text-gray-600 mt-2">Read as: "12 divided by 3 equals 4" or "How many 3s are in 12?"</p>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Long Division Steps</h2>
            <div className="bg-white p-4 rounded">
              <h4 className="font-semibold text-purple-700 mb-3">Remember: Does McDonald's Sell Burgers?</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li><strong>Divide:</strong> How many times does the divisor go into the first digit(s)?</li>
                <li><strong>Multiply:</strong> Multiply the quotient by the divisor</li>
                <li><strong>Subtract:</strong> Subtract the result from the dividend</li>
                <li><strong>Bring down:</strong> Bring down the next digit and repeat</li>
              </ol>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-orange-800 mb-4">Relationship Between Operations</h2>
            <div className="bg-white p-4 rounded">
              <p className="text-gray-700 mb-3">Multiplication and division are inverse operations:</p>
              <div className="font-mono text-lg space-y-2">
                <div>If 4 × 3 = 12, then 12 ÷ 3 = 4</div>
                <div>If 6 × 7 = 42, then 42 ÷ 7 = 6</div>
              </div>
              <p className="text-gray-600 mt-3">Use this relationship to check your answers!</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Study Strategies</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Learn multiplication facts through 12 × 12</li>
              <li>• Use skip counting to learn multiplication tables</li>
              <li>• Practice with flashcards or online games</li>
              <li>• Look for patterns (all multiples of 5 end in 0 or 5)</li>
              <li>• Check division by multiplying the answer by the divisor</li>
              <li>• Start with single-digit problems, then progress to larger numbers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiplicationDivision