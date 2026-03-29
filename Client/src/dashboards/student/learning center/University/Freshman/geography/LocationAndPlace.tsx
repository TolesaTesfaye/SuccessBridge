import React from 'react';

export const LocationAndPlace: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Location and Place
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Understanding location and place is fundamental to geographic thinking.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Key Geographic Concepts
        </h2>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Absolute Location
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Exact position using coordinates (latitude and longitude).
            </p>
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Example:</p>
              <p className="text-slate-700 dark:text-slate-300">
                New York City: 40.7128° N, 74.0060° W
              </p>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
              Relative Location
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Position in relation to other places.
            </p>
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-green-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Example:</p>
              <p className="text-slate-700 dark:text-slate-300">
                "Chicago is located south of Milwaukee and north of St. Louis."
              </p>
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
              Place
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Physical and human characteristics that make a location unique.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Physical Characteristics:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Climate and weather</li>
                  <li>• Landforms and terrain</li>
                  <li>• Natural resources</li>
                  <li>• Flora and fauna</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Human Characteristics:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Population and culture</li>
                  <li>• Language and religion</li>
                  <li>• Architecture and buildings</li>
                  <li>• Economic activities</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
              Region
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Areas with common characteristics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Formal Regions:</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Defined by official boundaries (countries, states)
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Functional Regions:</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Organized around a central point (metropolitan areas)
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Perceptual Regions:</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Based on people's perceptions ("The South", "Middle East")
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
              Movement
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              How people, goods, and ideas travel from place to place.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">People:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Migration</li>
                  <li>• Tourism</li>
                  <li>• Commuting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Goods:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Trade routes</li>
                  <li>• Supply chains</li>
                  <li>• Transportation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Ideas:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Communication</li>
                  <li>• Cultural diffusion</li>
                  <li>• Technology transfer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
        <button className="px-6 py-3 rounded text-sm font-medium bg-[#04aa6d] text-white hover:bg-[#038a5a] transition-colors">
          ❮ Previous
        </button>
        <button className="px-6 py-3 rounded text-sm font-medium bg-slate-200 text-slate-400 cursor-not-allowed">
          Next ❯
        </button>
      </div>
    </div>
  );
};