import React from 'react';

export const WhatIsGeography: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        What is Geography?
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Geography is the study of places and the relationships between people and their environments.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Two Main Branches of Geography
        </h2>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Physical Geography
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Studies natural features and processes of the Earth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Areas of Study:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Climate and weather patterns</li>
                  <li>• Landforms and geology</li>
                  <li>• Ecosystems and biodiversity</li>
                  <li>• Water systems and oceans</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Examples:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Mountain formation</li>
                  <li>• River systems</li>
                  <li>• Climate zones</li>
                  <li>• Natural disasters</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
              Human Geography
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Studies human activities and their relationship with the environment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Areas of Study:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Population and migration</li>
                  <li>• Cities and urbanization</li>
                  <li>• Economic activities</li>
                  <li>• Cultural patterns</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Examples:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• City planning</li>
                  <li>• Trade routes</li>
                  <li>• Cultural regions</li>
                  <li>• Land use patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Geographic Tools
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Traditional Tools:</h4>
            <ul className="text-slate-700 dark:text-slate-300 space-y-1">
              <li>• Maps and atlases</li>
              <li>• Compass and surveying tools</li>
              <li>• Field observations</li>
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Modern Tools:</h4>
            <ul className="text-slate-700 dark:text-slate-300 space-y-1">
              <li>• GPS (Global Positioning System)</li>
              <li>• GIS (Geographic Information Systems)</li>
              <li>• Remote sensing and satellites</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
        <button className="px-6 py-3 rounded text-sm font-medium bg-[#04aa6d] text-white hover:bg-[#038a5a] transition-colors">
          ❮ Previous
        </button>
        <button className="px-6 py-3 rounded text-sm font-medium bg-[#04aa6d] text-white hover:bg-[#038a5a] transition-colors">
          Next ❯
        </button>
      </div>
    </div>
  );
};