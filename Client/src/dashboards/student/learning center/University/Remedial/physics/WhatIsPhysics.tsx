import React from 'react'

const WhatIsPhysics: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">What is Physics?</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            Physics is the science that helps us understand how everything in the universe works, 
            from the smallest particles to the largest galaxies.
          </p>

          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">The Study of Everything</h2>
            <p className="text-gray-700 mb-4">
              Physics studies the fundamental building blocks of our universe and how they interact.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-green-700 mb-2">Matter</h4>
                <p className="text-gray-600 text-sm">Everything that has mass and takes up space - from air to rocks to people</p>
              </div>
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-green-700 mb-2">Energy</h4>
                <p className="text-gray-600 text-sm">The ability to do work or cause change - like heat, light, and motion</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Physics in Your Daily Life</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 mb-3">At Home</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Light bulbs converting electricity to light</li>
                  <li>• Microwaves heating food with waves</li>
                  <li>• Refrigerators removing heat to keep food cold</li>
                  <li>• Water flowing through pipes due to pressure</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-3">Transportation</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Cars using combustion engines for motion</li>
                  <li>• Airplanes flying using lift and thrust</li>
                  <li>• Bicycles using wheels and gears</li>
                  <li>• Brakes using friction to stop motion</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Why Study Physics?</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-purple-700 mb-2">Understanding the World</h4>
                <p className="text-gray-700">Physics explains why things happen the way they do - from why the sky is blue to how your phone works.</p>
              </div>
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-purple-700 mb-2">Problem-Solving Skills</h4>
                <p className="text-gray-700">Learning physics develops logical thinking and analytical skills useful in any career.</p>
              </div>
              <div className="bg-white p-4 rounded">
                <h4 className="font-semibold text-purple-700 mb-2">Technology Foundation</h4>
                <p className="text-gray-700">All modern technology - computers, phones, medical devices - is based on physics principles.</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-orange-800 mb-4">Branches of Physics</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded text-center">
                <h4 className="font-semibold text-orange-700 mb-2">Mechanics</h4>
                <p className="text-gray-600 text-sm">Motion and forces</p>
              </div>
              <div className="bg-white p-4 rounded text-center">
                <h4 className="font-semibold text-orange-700 mb-2">Thermodynamics</h4>
                <p className="text-gray-600 text-sm">Heat and energy</p>
              </div>
              <div className="bg-white p-4 rounded text-center">
                <h4 className="font-semibold text-orange-700 mb-2">Optics</h4>
                <p className="text-gray-600 text-sm">Light and vision</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-3">Getting Started</h3>
            <p className="text-gray-700 mb-3">
              Physics might seem challenging, but it starts with simple observations about the world around you.
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>• Start by observing everyday phenomena</li>
              <li>• Ask "why" and "how" questions about what you see</li>
              <li>• Practice with simple measurements and calculations</li>
              <li>• Connect physics concepts to real-life examples</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatIsPhysics