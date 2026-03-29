import React from 'react'

const RemedialGeographyIntroduction: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Remedial Geography</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Welcome to Remedial Geography, where you'll explore our amazing planet and 
            learn how people interact with the world around them.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Course Overview</h2>
            <p className="text-gray-700">
              This course covers fundamental geography concepts including physical features, 
              climate, maps, and human-environment interactions. You'll develop spatial 
              thinking skills and understand how geography shapes our world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">What You'll Learn</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Reading and interpreting maps</li>
                <li>• Physical features of Earth</li>
                <li>• Weather and climate patterns</li>
                <li>• Human-environment interactions</li>
                <li>• Geographic tools and technology</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Skills Developed</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Spatial thinking</li>
                <li>• Map reading and navigation</li>
                <li>• Environmental awareness</li>
                <li>• Cultural understanding</li>
                <li>• Critical analysis</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Why Geography Matters</h3>
            <p className="text-gray-700">
              Geography helps us understand current events, environmental issues, and cultural 
              differences. It's essential for careers in travel, international business, 
              environmental science, and urban planning.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemedialGeographyIntroduction