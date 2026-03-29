import React from 'react'

const EnglishIntroduction: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">English - Communication Skills</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Welcome to English Communication Skills, a fundamental course designed to enhance your ability to communicate effectively in academic and professional settings.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Course Overview</h2>
            <p className="text-gray-700">
              This course focuses on developing essential communication skills including written and oral communication, 
              critical thinking, and effective presentation techniques. You'll learn to express ideas clearly, 
              analyze texts critically, and communicate with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">What You'll Learn</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Effective communication principles</li>
                <li>• Written communication skills</li>
                <li>• Oral presentation techniques</li>
                <li>• Critical reading and analysis</li>
                <li>• Professional communication</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Skills Developed</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Clear and concise writing</li>
                <li>• Confident public speaking</li>
                <li>• Active listening</li>
                <li>• Critical thinking</li>
                <li>• Professional etiquette</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Why Communication Skills Matter</h3>
            <p className="text-gray-700">
              Strong communication skills are essential for academic success and career advancement. 
              They enable you to express ideas effectively, collaborate with others, and make a positive impact 
              in your chosen field. These skills are transferable across all disciplines and professions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnglishIntroduction