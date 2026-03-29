import React from 'react'

const RemedialHistoryIntroduction: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Remedial History</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Welcome to Remedial History, where you'll discover the fascinating stories 
            of human civilization and learn how the past connects to our present.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Course Overview</h2>
            <p className="text-gray-700">
              This course introduces fundamental historical concepts including chronology, 
              primary and secondary sources, and the development of early civilizations. 
              You'll learn to think like a historian and understand how past events shape our world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">What You'll Learn</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Understanding historical time and chronology</li>
                <li>• Analyzing primary and secondary sources</li>
                <li>• Early human civilizations</li>
                <li>• Cause and effect in history</li>
                <li>• Historical thinking skills</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Skills Developed</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Critical thinking</li>
                <li>• Source analysis</li>
                <li>• Timeline construction</li>
                <li>• Cultural awareness</li>
                <li>• Research techniques</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Why History Matters</h3>
            <p className="text-gray-700">
              History helps us understand how societies develop, why events happen, and how 
              past decisions affect the present. These skills are valuable for citizenship, 
              critical thinking, and understanding our diverse world.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemedialHistoryIntroduction