import React from 'react'

const RemedialChemistryIntroduction: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Remedial Chemistry</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Welcome to Remedial Chemistry, where you'll discover the fascinating world of 
            atoms, molecules, and the chemical reactions that shape our everyday lives.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Course Overview</h2>
            <p className="text-gray-700">
              This course introduces fundamental chemistry concepts including atoms, elements, 
              compounds, and chemical reactions. You'll learn how matter behaves at the 
              molecular level and understand the chemical processes around you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">What You'll Learn</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Structure of atoms and elements</li>
                <li>• Chemical compounds and formulas</li>
                <li>• Types of chemical reactions</li>
                <li>• Chemistry in everyday life</li>
                <li>• Basic laboratory safety</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Skills Developed</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Scientific observation</li>
                <li>• Analytical thinking</li>
                <li>• Problem-solving</li>
                <li>• Understanding cause and effect</li>
                <li>• Laboratory techniques</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Why Chemistry Matters</h3>
            <p className="text-gray-700">
              Chemistry is central to understanding life, medicine, technology, and the environment. 
              From the food we eat to the medicines that heal us, chemistry plays a vital role 
              in improving human life and solving global challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemedialChemistryIntroduction