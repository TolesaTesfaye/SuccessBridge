import React from 'react';
import { Chapter1 } from './Chapter1/Chapter1';
import { Chapter2 } from './Chapter2/Chapter2';
import { Chapter3 } from './Chapter3/Chapter3';
import { Chapter4 } from './Chapter4/Chapter4';
import { Chapter5 } from './Chapter5/Chapter5';
import { Chapter6 } from './Chapter6/Chapter6';
import { Chapter7 } from './Chapter7/Chapter7';
import { Chapter8 } from './Chapter8/Chapter8';

interface GeographyChapterContentProps {
  chapterId: string;
  selectedSubtopic?: string;
  setSelectedGeographyChapter: (chapterId: string) => void;
  setSelectedSubtopic: (subtopic: string) => void;
}

export const GeographyChapterContent: React.FC<GeographyChapterContentProps> = ({ 
  chapterId, 
  selectedSubtopic,
  setSelectedGeographyChapter,
  setSelectedSubtopic
}) => {
  // Geography chapters list
  const geographyChapters = [
    { id: 'chapter1', title: 'Chapter 1: Introduction' },
    { id: 'chapter2', title: 'Chapter 2: The Geology of Ethiopia and the Horn' },
    { id: 'chapter3', title: 'Chapter 3: The Topography of Ethiopia and the Horn' },
    { id: 'chapter4', title: 'Chapter 4: Drainage Systems and Water Resource' },
    { id: 'chapter5', title: 'Chapter 5: The Climate of Ethiopia and the Horn' },
    { id: 'chapter6', title: 'Chapter 6: Soils, Natural Vegetation and Wildlife Resources' },
    { id: 'chapter7', title: 'Chapter 7: Population of Ethiopia and the Horn' },
    { id: 'chapter8', title: 'Chapter 8: Economic Activities in Ethiopia' }
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
              setSelectedGeographyChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
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
              setSelectedGeographyChapter('chapter1');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedGeographyChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
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
              setSelectedGeographyChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedGeographyChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
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
              setSelectedGeographyChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedGeographyChapter('chapter5');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
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
              setSelectedGeographyChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedGeographyChapter('chapter6');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
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
              setSelectedGeographyChapter('chapter5');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedGeographyChapter('chapter7');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
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
              setSelectedGeographyChapter('chapter6');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedGeographyChapter('chapter8');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
          >
            Next ❯
          </button>
        </div>
      </div>
    );
  }

  if (chapterId === 'chapter8') {
    return (
      <div className="space-y-3">
        <Chapter8 />
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => {
              setSelectedGeographyChapter('chapter7');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
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
            const currentIndex = geographyChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex > 0) {
              setSelectedGeographyChapter(geographyChapters[currentIndex - 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={geographyChapters.findIndex(ch => ch.id === chapterId) === 0}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            geographyChapters.findIndex(ch => ch.id === chapterId) === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-teal-600 text-white hover:bg-teal-700'
          }`}
        >
          ❮ Previous
        </button>

        <button
          onClick={() => {
            const currentIndex = geographyChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex < geographyChapters.length - 1) {
              setSelectedGeographyChapter(geographyChapters[currentIndex + 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={geographyChapters.findIndex(ch => ch.id === chapterId) === geographyChapters.length - 1}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            geographyChapters.findIndex(ch => ch.id === chapterId) === geographyChapters.length - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-teal-600 text-white hover:bg-teal-700'
          }`}
        >
          Next ❯
        </button>
      </div>
    </div>
  );
};
