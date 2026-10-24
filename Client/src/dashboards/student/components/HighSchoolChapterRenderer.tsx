import React from "react";

type ChapterComponentProps = {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
};

// Lazy load Grade 11 Chemistry chapters
const Grade11ChemistryCh1 = React.lazy(
  () =>
    import("@learningCenter/highschool/grade 11/chemistry/chapters/Chapter1"),
);
const Grade11ChemistryCh2 = React.lazy(
  () =>
    import("@learningCenter/highschool/grade 11/chemistry/chapters/Chapter 2"),
);

// Lazy load Grade 11 Biology chapters
const Grade11BiologyCh1 = React.lazy(
  () =>
    import("@learningCenter/highschool/grade 11/biology/chapters/Chapter1"),
);
const Grade11BiologyCh2 = React.lazy(
  () =>
    import("@learningCenter/highschool/grade 11/biology/chapters/Chapter2"),
);

// Lazy load Grade 11 Physics chapters
const Grade11PhysicsCh1 = React.lazy(
  () =>
    import("@learningCenter/highschool/grade 11/physics/chapters/Chapter1"),
);

// Lazy load Grade 11 Math chapters
const Grade11MathCh1 = React.lazy(
  () =>
    import("@learningCenter/highschool/grade 11/math/chapters/Chapter1"),
);

// Lazy load Grade 11 English chapters
const Grade11EnglishCh1 = React.lazy(
  () =>
    import("@learningCenter/highschool/grade 11/english/chapters/Chapter1"),
);

// Lazy load Grade 11 Geography chapters
const Grade11GeographyCh1 = React.lazy(
  () =>
    import("@learningCenter/highschool/grade 11/geography/chapters/Chapter1"),
);

// Lazy load Grade 11 History chapters
const Grade11HistoryCh1 = React.lazy(
  () =>
    import("@learningCenter/highschool/grade 11/history/chapters/Chapter1"),
);

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
  grade_11: {
    Chemistry: {
      chapter1: Grade11ChemistryCh1,
      chapter2: Grade11ChemistryCh2,
    },
    Biology: {
      chapter1: Grade11BiologyCh1,
      chapter2: Grade11BiologyCh2,
    },
    Physics: {
      chapter1: Grade11PhysicsCh1,
    },
    Math: {
      chapter1: Grade11MathCh1,
    },
    English: {
      chapter1: Grade11EnglishCh1,
    },
    Geography: {
      chapter1: Grade11GeographyCh1,
    },
    History: {
      chapter1: Grade11HistoryCh1,
    },
  },
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
