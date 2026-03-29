import React from 'react';

export const ChronologyAndPeriodization: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Chronology and Periodization
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Understanding time is fundamental to historical study.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Understanding Time in History
        </h2>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Chronology
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The arrangement of events in order of occurrence.
            </p>
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Example Timeline:</p>
              <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                <li>• 1776: American Declaration of Independence</li>
                <li>• 1789: French Revolution begins</li>
                <li>• 1804: Napoleon becomes Emperor</li>
                <li>• 1815: Battle of Waterloo</li>
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Why Chronology Matters:</h4>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Shows sequence of cause and effect</li>
                <li>• Helps identify patterns and trends</li>
                <li>• Provides context for understanding events</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
              Periodization
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Dividing history into distinct periods based on common characteristics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Ancient Period</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  Prehistory to ~500 CE
                </p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Early civilizations</li>
                  <li>• Classical antiquity</li>
                  <li>• Rise of major religions</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Medieval Period</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  ~500-1500 CE
                </p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Feudalism</li>
                  <li>• Islamic Golden Age</li>
                  <li>• Byzantine Empire</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Modern Period</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  1500 CE-Present
                </p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Renaissance</li>
                  <li>• Industrial Revolution</li>
                  <li>• Global conflicts</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
              Dating Systems
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Different systems for marking time in history.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">BCE/CE System:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• <strong>BCE:</strong> Before Common Era</li>
                  <li>• <strong>CE:</strong> Common Era</li>
                  <li>• Secular alternative to BC/AD</li>
                  <li>• Same numbering system</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Other Systems:</h4>
                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>• Islamic calendar (AH)</li>
                  <li>• Jewish calendar (AM)</li>
                  <li>• Chinese calendar</li>
                  <li>• Hindu calendar</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
              Historical Context
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Understanding events within their time period and circumstances.
            </p>
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-purple-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Key Questions for Context:</p>
              <ul className="text-slate-700 dark:text-slate-300 space-y-1">
                <li>• What was happening in the world at this time?</li>
                <li>• What were the social, political, and economic conditions?</li>
                <li>• How did people think and live during this period?</li>
                <li>• What technologies and ideas were available?</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Working with Historical Time
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Tips for Students:</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Create timelines for major events</li>
                <li>• Look for patterns across time periods</li>
                <li>• Consider multiple perspectives on the same era</li>
                <li>• Connect past events to present situations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Common Challenges:</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Avoiding presentism (judging past by present standards)</li>
                <li>• Understanding different calendar systems</li>
                <li>• Recognizing that periods overlap and vary by region</li>
                <li>• Balancing broad trends with specific events</li>
              </ul>
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