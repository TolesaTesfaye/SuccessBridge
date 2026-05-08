import React from "react";

type ChapterComponentProps = {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
};

// Lazy load Grade 12 Biology chapters
const Grade12BioCh1 = React.lazy(
  () =>
    import("@learningCenter/highschool/grade 12/biology/chapters/chapter1/chapter1"),
);

// Chapter component mapping for high school subjects
const CHAPTER_COMPONENTS: Record<
  string,
  Record<
    string,
    Record<
      string,
      React.LazyExoticComponent<React.ComponentType<ChapterComponentProps>>
    >
  >
> = {
  grade_12: {
    Biology: {
      chapter1: Grade12BioCh1,
    },
  },
};

interface HighSchoolChapterRendererProps {
  grade: string;
  subject: string;
  chapterId: string;
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
}

export const HighSchoolChapterRenderer: React.FC<HighSchoolChapterRendererProps> = ({
  grade,
  subject,
  chapterId,
  selectedSubtopic,
  onNavigateChapter,
}) => {
  const ChapterComponent = CHAPTER_COMPONENTS[grade]?.[subject]?.[chapterId];

  if (!ChapterComponent) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        <p>Chapter content not available yet.</p>
        <p className="text-sm mt-2">
          Grade: {grade}, Subject: {subject}, Chapter: {chapterId}
        </p>
      </div>
    );
  }

  return (
    <React.Suspense
      fallback={
        <div className="p-8 animate-pulse text-slate-400">
          Loading chapter content...
        </div>
      }
    >
      <ChapterComponent
        selectedSubtopic={selectedSubtopic}
        onNavigateChapter={onNavigateChapter}
        currentChapterId={chapterId}
      />
    </React.Suspense>
  );
};
