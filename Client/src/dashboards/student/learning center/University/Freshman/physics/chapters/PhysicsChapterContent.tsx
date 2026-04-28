import React from 'react';
import { Chapter1 } from './Chapter1/Chapter1';
import { Chapter2 } from './Chapter2/Chapter2';
import { Chapter3 } from './Chapter3/Chapter3';
import { Chapter4 } from './Chapter4/Chapter4';
import { Chapter5 } from './Chapter5/Chapter5';
import { Chapter6 } from './Chapter6/Chapter6';
import { Chapter7 } from './Chapter7/Chapter7';

interface PhysicsChapterContentProps {
  chapterId: string;
  selectedSubtopic?: string;
  setSelectedPhysicsChapter: (chapterId: string) => void;
  setSelectedSubtopic: (subtopic: string) => void;
}

export const PhysicsChapterContent: React.FC<PhysicsChapterContentProps> = ({ 
  chapterId, 
  selectedSubtopic,
  setSelectedPhysicsChapter,
  setSelectedSubtopic
}) => {
  // Physics chapters list
  const physicsChapters = [
    { id: 'chapter1', title: 'Chapter 1: Preliminaries' },
    { id: 'chapter2', title: 'Chapter 2: Kinematics and Dynamics of Particles' },
    { id: 'chapter3', title: 'Chapter 3: Fluid Mechanics' },
    { id: 'chapter4', title: 'Chapter 4: Heat and Thermodynamics' },
    { id: 'chapter5', title: 'Chapter 5: Oscillations, Waves and Optics' },
    { id: 'chapter6', title: 'Chapter 6: Electromagnetism and Electronics' },
    { id: 'chapter7', title: 'Chapter 7: Cross Cutting Applications of Physics' }
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
              setSelectedPhysicsChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
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
              setSelectedPhysicsChapter('chapter1');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedPhysicsChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
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
              setSelectedPhysicsChapter('chapter2');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedPhysicsChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
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
              setSelectedPhysicsChapter('chapter3');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedPhysicsChapter('chapter5');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
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
              setSelectedPhysicsChapter('chapter4');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedPhysicsChapter('chapter6');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
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
              setSelectedPhysicsChapter('chapter5');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            ❮ Previous
          </button>

          <button
            onClick={() => {
              setSelectedPhysicsChapter('chapter7');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
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
              setSelectedPhysicsChapter('chapter6');
              setSelectedSubtopic('');
            }}
            className="px-6 py-3 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
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
            const currentIndex = physicsChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex > 0) {
              setSelectedPhysicsChapter(physicsChapters[currentIndex - 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={physicsChapters.findIndex(ch => ch.id === chapterId) === 0}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            physicsChapters.findIndex(ch => ch.id === chapterId) === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          ❮ Previous
        </button>

        <button
          onClick={() => {
            const currentIndex = physicsChapters.findIndex(ch => ch.id === chapterId);
            if (currentIndex < physicsChapters.length - 1) {
              setSelectedPhysicsChapter(physicsChapters[currentIndex + 1].id);
              setSelectedSubtopic('');
            }
          }}
          disabled={physicsChapters.findIndex(ch => ch.id === chapterId) === physicsChapters.length - 1}
          className={`px-6 py-3 rounded text-sm font-medium transition-colors ${
            physicsChapters.findIndex(ch => ch.id === chapterId) === physicsChapters.length - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Next ❯
        </button>
      </div>
    </div>
  );
};
