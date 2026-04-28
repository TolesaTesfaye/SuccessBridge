import React from 'react';
import { Chapter1 } from './Chapter1/Chapter1';
import { Chapter2 } from './Chapter2/Chapter2';
import { Chapter3 } from './Chapter3/Chapter3';
import { Chapter4 } from './Chapter4/Chapter4';
import { Chapter5 } from './Chapter5/Chapter5';
import { Chapter6 } from './Chapter6/Chapter6';
import { Chapter7 } from './Chapter7/Chapter7';

interface HistoryChapterContentProps {
  chapterId: string;
  selectedSubtopic?: string;
  setSelectedHistoryChapter: (chapterId: string) => void;
  setSelectedSubtopic: (subtopic: string) => void;
}

export const HistoryChapterContent: React.FC<HistoryChapterContentProps> = ({ 
  chapterId, 
  selectedSubtopic,
  setSelectedHistoryChapter,
  setSelectedSubtopic
}) => {
  // History chapters list
  const historyChapters = [
    { id: 'chapter1', title: 'Unit 1: Introduction' },
    { id: 'chapter2', title: 'Unit 2: Peoples and Cultures in Ethiopia and the Horn' },
    { id: 'chapter3', title: 'Unit 3: Politics, Economy and Society to the 13th Century' },
    { id: 'chapter4', title: 'Unit 4: Politics, Economy and Society (13th-16th Centuries)' },
    { id: 'chapter5', title: 'Unit 5: Politics, Economy and Social Processes (16th-18th Centuries)' },
    { id: 'chapter6', title: 'Unit 6: Internal Developments and External Relations, 1800-1941' },
    { id: 'chapter7', title: 'Unit 7: Internal Developments and External Relations, 1941-1995' }
  ];

  if (chapterId === 'chapter1') {
    return (
      <div className="space-y-3">
        <Chapter1 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            disabled
            className="px-6 py-3 rounded text-sm font-medium bg-slate-200 text-slate-400 cursor-not-allowed"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter2') {
    return (
      <div className="space-y-3">
        <Chapter2 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter1');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter3') {
    return (
      <div className="space-y-3">
        <Chapter3 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter4') {
    return (
      <div className="space-y-3">
        <Chapter4 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter5');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter5') {
    return (
      <div className="space-y-3">
        <Chapter5 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter6');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter6') {
    return (
      <div className="space-y-3">
        <Chapter6 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter5');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter7');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter7') {
    return (
      <div className="space-y-3">
        <Chapter7 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedHistoryChapter('chapter6');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            disabled
            className="px-6 py-3 rounded text-sm font-medium bg-slate-200 text-slate-400 cursor-not-allowed"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  // Placeholder for other chapters
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {chapterId.replace('chapter', 'Unit ')}
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Content for this unit will be added soon...
      </p>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center p-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            const currentIndex = historyChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex > 0) {
              setSelectedHistoryChapter(historyChapters[currentIndex - 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={historyChapters.findIndex(ch => ch.id === chapterId) === 0}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            historyChapters.findIndex(ch => ch.id === chapterId) === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}
        >
          ❮ Previous
        </button>

        <button
          onClick={() => {
            const currentIndex = historyChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex < historyChapters.length - 1) {
              setSelectedHistoryChapter(historyChapters[currentIndex + 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={historyChapters.findIndex(ch => ch.id === chapterId) === historyChapters.length - 1}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            historyChapters.findIndex(ch => ch.id === chapterId) === historyChapters.length - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}
        >
          Next ❯
        </button>
      </div>
    </div>
  );
};
