import React from 'react'

const RemedialPhysicsIntroduction: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Remedial Physics</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Welcome to Remedial Physics, designed to introduce you to the fundamental concepts 
            of how the physical world works around us.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Course Overview</h2>
            <p className="text-gray-700">
              This course covers basic physics concepts including matter, energy, motion, and forces. 
              You'll learn to observe and understand physical phenomena in everyday life, 
              building a foundation for more advanced scientific studies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">What You'll Learn</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Basic concepts of matter and energy</li>
                <li>• Understanding motion and forces</li>
                <li>• Scientific measurement and units</li>
                <li>• Physics in everyday life</li>
                <li>• Problem-solving with simple formulas</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Skills Developed</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Scientific observation</li>
                <li>• Logical reasoning</li>
                <li>• Mathematical problem-solving</li>
                <li>• Critical thinking</li>
                <li>• Understanding cause and effect</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Why Physics Matters</h3>
            <p className="text-gray-700">
              Physics helps us understand the world around us, from why objects fall to how 
              technology works. These fundamental concepts are essential for careers in 
              science, engineering, medicine, and technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemedialPhysicsIntroduction