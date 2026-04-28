import React from 'react';
import { Chapter1 } from './Chapter1/Chapter1';
import { Chapter2 } from './Chapter2/Chapter2';
import { Chapter3 } from './Chapter3/Chapter3';
import { Chapter4 } from './Chapter4/Chapter4';
import { Chapter5 } from './Chapter5/Chapter5';

interface EnglishChapterContentProps {
  chapterId: string;
  selectedSubtopic?: string;
  setSelectedEnglishChapter: (chapterId: string) => void;
  setSelectedSubtopic: (subtopic: string) => void;
}

export const EnglishChapterContent: React.FC<EnglishChapterContentProps> = ({ 
  chapterId, 
  selectedSubtopic,
  setSelectedEnglishChapter,
  setSelectedSubtopic
}) => {
  // English chapters list
  const englishChapters = [
    { id: 'chapter1', title: 'Unit 1: Study Skills' },
    { id: 'chapter2', title: 'Unit 2: Health and Fitness' },
    { id: 'chapter3', title: 'Unit 3: Cultural Values' },
    { id: 'chapter4', title: 'Unit 4: Wildlife' },
    { id: 'chapter5', title: 'Unit 5: Population' }
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
              setSelectedEnglishChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors"
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
              setSelectedEnglishChapter('chapter1');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedEnglishChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors"
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
              setSelectedEnglishChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedEnglishChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors"
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
              setSelectedEnglishChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedEnglishChapter('chapter5');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors"
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
              setSelectedEnglishChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors"
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
            const currentIndex = englishChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex > 0) {
              setSelectedEnglishChapter(englishChapters[currentIndex - 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={englishChapters.findIndex(ch => ch.id === chapterId) === 0}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            englishChapters.findIndex(ch => ch.id === chapterId) === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-rose-600 text-white hover:bg-rose-700'
          }`}
        >
          ❮ Previous
        </button>

        <button
          onClick={() => {
            const currentIndex = englishChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex < englishChapters.length - 1) {
              setSelectedEnglishChapter(englishChapters[currentIndex + 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={englishChapters.findIndex(ch => ch.id === chapterId) === englishChapters.length - 1}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            englishChapters.findIndex(ch => ch.id === chapterId) === englishChapters.length - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-rose-600 text-white hover:bg-rose-700'
          }`}
        >
          Next ❯
        </button>
      </div>
    </div>
  );
};
