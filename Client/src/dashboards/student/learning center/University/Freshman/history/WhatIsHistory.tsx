import React from 'react';

export const WhatIsHistory: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        What is History?
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          History is the study of past events, particularly in human affairs.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Historical Methodology
        </h2>
        
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          Historians use specific methods to study and understand the past.
        </p>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Primary Sources
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Original documents, artifacts, or evidence from the time period being studied.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Written Sources:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Letters and diaries</li>
                  <li>• Government documents</li>
                  <li>• Newspapers and magazines</li>
                  <li>• Official records</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Non-Written Sources:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Artifacts and tools</li>
                  <li>• Photographs and artwork</li>
                  <li>• Buildings and monuments</li>
                  <li>• Oral testimonies</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
              Secondary Sources
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Interpretations and analyses of primary sources, created after the events occurred.
            </p>
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-green-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Examples:</p>
              <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                <li>• History textbooks</li>
                <li>• Scholarly articles and books</li>
                <li>• Documentaries</li>
                <li>• Encyclopedia entries</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
              Historical Thinking
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The skills and processes historians use to analyze and interpret the past.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Cause and Effect:</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Understanding why events happened and their consequences
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Change Over Time:</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Analyzing how things develop and evolve
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Multiple Perspectives:</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Considering different viewpoints and experiences
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            The Historian's Process
          </h3>
          <ol className="space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>1. Ask Questions:</strong> What happened? When? Where? Who was involved?</li>
            <li><strong>2. Gather Evidence:</strong> Collect and examine primary and secondary sources</li>
            <li><strong>3. Analyze Sources:</strong> Evaluate reliability, bias, and perspective</li>
            <li><strong>4. Interpret Evidence:</strong> Draw conclusions based on available information</li>
            <li><strong>5. Communicate Findings:</strong> Share discoveries through writing or presentation</li>
          </ol>
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