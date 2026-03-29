import React from 'react'

const RemedialEnglishIntroduction: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Remedial English</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Welcome to Remedial English, designed to strengthen your foundational language skills 
            and prepare you for college-level reading and writing courses.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Course Overview</h2>
            <p className="text-gray-700">
              This course focuses on essential English skills including grammar, sentence structure, 
              reading comprehension, and basic writing. You'll build confidence in language use 
              and develop skills needed for academic success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">What You'll Learn</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Basic grammar and parts of speech</li>
                <li>• Sentence structure and mechanics</li>
                <li>• Reading comprehension strategies</li>
                <li>• Vocabulary development</li>
                <li>• Basic writing skills</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Skills Developed</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Clear communication</li>
                <li>• Critical reading</li>
                <li>• Proper grammar usage</li>
                <li>• Academic vocabulary</li>
                <li>• Study strategies</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Why Remedial English Matters</h3>
            <p className="text-gray-700">
              Strong language skills are essential for success in all college courses and future careers. 
              This course provides the foundation you need to communicate effectively, understand complex texts, 
              and express your ideas clearly in writing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemedialEnglishIntroduction