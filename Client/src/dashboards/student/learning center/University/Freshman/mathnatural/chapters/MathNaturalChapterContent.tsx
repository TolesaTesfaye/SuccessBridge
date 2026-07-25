import React from 'react';
import { Chapter1 } from './Chapter1/Chapter1';
import { Chapter2 } from './Chapter2/Chapter2';
import { Chapter3 } from './Chapter3/Chapter3';
import { Chapter4 } from './Chapter4/Chapter4';
import { Chapter5 } from './Chapter5/Chapter5';
import { Chapter6 } from './Chapter6/Chapter6';
import { Chapter7 } from './Chapter7/Chapter7';

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
  const handleNavigate = (id: string) => {
    setSelectedMathNaturalChapter(id);
    setSelectedSubtopic('');
  };

  if (chapterId === 'chapter1') {
    return (
      <div className="space-y-3">
        <Chapter1 
          selectedSubtopic={selectedSubtopic} 
          onNavigateChapter={handleNavigate} 
        />
      </div>
    );
  }

  if (chapterId === 'chapter2') {
    return (
      <div className="space-y-3">
        <Chapter2 
          selectedSubtopic={selectedSubtopic} 
          onNavigateChapter={handleNavigate} 
        />
      </div>
    );
  }

  if (chapterId === 'chapter3') {
    return (
      <div className="space-y-3">
        <Chapter3 
          selectedSubtopic={selectedSubtopic} 
          onNavigateChapter={handleNavigate} 
        />
      </div>
    );
  }

  if (chapterId === 'chapter4') {
    return (
      <div className="space-y-3">
        <Chapter4 
          selectedSubtopic={selectedSubtopic} 
          onNavigateChapter={handleNavigate} 
        />
      </div>
    );
  }

  if (chapterId === 'chapter5') {
    return (
      <div className="space-y-3">
        <Chapter5 
          selectedSubtopic={selectedSubtopic} 
          onNavigateChapter={handleNavigate} 
        />
      </div>
    );
  }

  if (chapterId === 'chapter6') {
    return (
      <div className="space-y-3">
        <Chapter6 
          selectedSubtopic={selectedSubtopic} 
          onNavigateChapter={handleNavigate} 
        />
      </div>
    );
  }

  if (chapterId === 'chapter7') {
    return (
      <div className="space-y-3">
        <Chapter7 
          selectedSubtopic={selectedSubtopic} 
          onNavigateChapter={handleNavigate} 
        />
      </div>
    );
  }

  return null;
};

export default MathNaturalChapterContent;
