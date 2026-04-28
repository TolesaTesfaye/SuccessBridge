import React from 'react';
import { Chapter1 } from './Chapter1/Chapter1';
import { Chapter2 } from './Chapter2/Chapter2';
import { Chapter3 } from './Chapter3/Chapter3';
import { Chapter4 } from './Chapter4/Chapter4';

interface MathNaturalChapterContentProps {
  chapterId: string;
  selectedSubtopic?: string;
  setSelectedMathNaturalChapter: (chapterId: string) => void;
  setSelectedSubtopic: (subtopic: string) => void;
}

export const MathNaturalChapterContent: React.FC<MathNaturalChapterContentProps> = ({ 
  chapterId, 
  selectedSubtopic,
  setSelectedMathNaturalChapter,
  setSelectedSubtopic
}) => {
  // Math Natural chapters list
  const mathNaturalChapters = [
    { id: 'chapter1', title: 'Chapter 1: Propositional Logic and Set Theory' },
    { id: 'chapter2', title: 'Chapter 2: The Real and Complex Number Systems' },
    { id: 'chapter3', title: 'Chapter 3: Functions' },
    { id: 'chapter4', title: 'Chapter 4: Analytic Geometry' }
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
              setSelectedMathNaturalChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
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
              setSelectedMathNaturalChapter('chapter1');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedMathNaturalChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
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
              setSelectedMathNaturalChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedMathNaturalChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
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
              setSelectedMathNaturalChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
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
        {chapterId.replace('chapter', 'Chapter ')}
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        Content for this chapter will be added soon...
      </p>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center p-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            const currentIndex = mathNaturalChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex > 0) {
              setSelectedMathNaturalChapter(mathNaturalChapters[currentIndex - 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={mathNaturalChapters.findIndex(ch => ch.id === chapterId) === 0}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            mathNaturalChapters.findIndex(ch => ch.id === chapterId) === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          ❮ Previous
        </button>

        <button
          onClick={() => {
            const currentIndex = mathNaturalChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex < mathNaturalChapters.length - 1) {
              setSelectedMathNaturalChapter(mathNaturalChapters[currentIndex + 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={mathNaturalChapters.findIndex(ch => ch.id === chapterId) === mathNaturalChapters.length - 1}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            mathNaturalChapters.findIndex(ch => ch.id === chapterId) === mathNaturalChapters.length - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Next ❯
        </button>
      </div>
    </div>
  );
};
