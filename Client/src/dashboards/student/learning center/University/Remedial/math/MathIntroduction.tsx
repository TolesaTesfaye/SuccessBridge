import React from 'react'

const RemedialMathIntroduction: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Remedial Mathematics</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Welcome to Remedial Mathematics, designed to strengthen your foundational math skills 
            and prepare you for college-level mathematics courses.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Course Overview</h2>
            <p className="text-gray-700">
              This course covers essential mathematical concepts including basic arithmetic, fractions, 
              decimals, and problem-solving strategies. You'll build confidence in mathematical reasoning 
              and develop skills needed for success in higher-level math courses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">What You'll Learn</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Basic arithmetic operations</li>
                <li>• Working with fractions and decimals</li>
                <li>• Problem-solving strategies</li>
                <li>• Mathematical reasoning</li>
                <li>• Preparation for algebra</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Skills Developed</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Computational fluency</li>
                <li>• Number sense</li>
                <li>• Logical thinking</li>
                <li>• Mathematical confidence</li>
                <li>• Study strategies</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Why Remedial Math Matters</h3>
            <p className="text-gray-700">
              Strong foundational math skills are essential for success in college and career. 
              This course provides the support and practice needed to master basic concepts, 
              build confidence, and prepare for more advanced mathematical studies.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemedialMathIntroduction