import React from "react";

type ChapterComponentProps = {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
};

// Lazy load Psychology chapters
const PsychCh1 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter1/Chapter1"),
);
const PsychCh2 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter2/Chapter2"),
);
const PsychCh3 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter3/Chapter3"),
);
const PsychCh4 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter4/Chapter4"),
);
const PsychCh5 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter5/Chapter5"),
);
const PsychCh6 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter6/Chapter6"),
);
const PsychCh7 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter7/Chapter7"),
);
const PsychCh8 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter8/Chapter8"),
);
const PsychCh9 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter9/Chapter9"),
);
const PsychCh10 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter10/Chapter10"),
);
const PsychCh11 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Psychology/chapters/Chapter11/Chapter11"),
);

// Lazy load Logic chapters
const LogicCh1 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Logic/chapters/chapter1/Chapter1"),
);
const LogicCh2 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Logic/chapters/chapter2/Chapter2"),
);
const LogicCh3 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Logic/chapters/chapter3/Chapter3"),
);
const LogicCh4 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Logic/chapters/chapter4/Chapter4"),
);
const LogicCh5 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Logic/chapters/Chapter5/Chapter5"),
);
const LogicCh6 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/Logic/chapters/Chapter6/Chapter6"),
);

// Lazy load Physics chapters
const PhysicsCh1 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/physics/chapters/Chapter1/Chapter1"),
);
const PhysicsCh2 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/physics/chapters/Chapter2/Chapter2"),
);
const PhysicsCh3 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/physics/chapters/Chapter3/Chapter3"),
);
const PhysicsCh4 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/physics/chapters/Chapter4/Chapter4"),
);
const PhysicsCh5 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/physics/chapters/Chapter5/Chapter5"),
);
const PhysicsCh6 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/physics/chapters/Chapter6/Chapter6"),
);
const PhysicsCh7 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/physics/chapters/Chapter7/Chapter7"),
);

// Lazy load Math (Natural Science) chapters
const MathNatCh1 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/mathnatural/chapters/Chapter1/Chapter1"),
);

// Lazy load Math (Social Science) chapters
const MathSocCh1 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/mathsocial/chapters/Chapter1/Chapter1"),
);

// Lazy load Geography chapters
const GeoCh1 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/geography/chapters/Chapter1/Chapter1"),
);

// Lazy load History chapters
const HistCh1 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/history/chapters/Chapter1/Chapter1"),
);

// Lazy load English chapters
const EngCh1 = React.lazy(
  () =>
    import("@learningCenter/University/Freshman/english/chapters/Chapter1/Chapter1"),
);

// Chapter component mapping
const CHAPTER_COMPONENTS: Record<
  string,
  Record<
    string,
    React.LazyExoticComponent<React.ComponentType<ChapterComponentProps>>
  >
> = {
  Psychology: {
    chapter1: PsychCh1,
    chapter2: PsychCh2,
    chapter3: PsychCh3,
    chapter4: PsychCh4,
    chapter5: PsychCh5,
    chapter6: PsychCh6,
    chapter7: PsychCh7,
    chapter8: PsychCh8,
    chapter9: PsychCh9,
    chapter10: PsychCh10,
    chapter11: PsychCh11,
  },
  Logic: {
    chapter1: LogicCh1,
    chapter2: LogicCh2,
    chapter3: LogicCh3,
    chapter4: LogicCh4,
    chapter5: LogicCh5,
    chapter6: LogicCh6,
  },
  Physics: {
    chapter1: PhysicsCh1,
    chapter2: PhysicsCh2,
    chapter3: PhysicsCh3,
    chapter4: PhysicsCh4,
    chapter5: PhysicsCh5,
    chapter6: PhysicsCh6,
    chapter7: PhysicsCh7,
  },
  "Math (Natural Science)": {
    chapter1: MathNatCh1,
  },
  "Math (Social Science)": {
    chapter1: MathSocCh1,
  },
  Geography: {
    chapter1: GeoCh1,
  },
  History: {
    chapter1: HistCh1,
  },
  English: {
    chapter1: EngCh1,
  },
};

interface SubjectChapterRendererProps {
  subject: string;
  chapterId: string;
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
}

export const SubjectChapterRenderer: React.FC<SubjectChapterRendererProps> = ({
  subject,
  chapterId,
  selectedSubtopic,
  onNavigateChapter,
}) => {
  const ChapterComponent = CHAPTER_COMPONENTS[subject]?.[chapterId];

  if (!ChapterComponent) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        <p>Chapter content not available yet.</p>
        <p className="text-sm mt-2">
          Subject: {subject}, Chapter: {chapterId}
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
