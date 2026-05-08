import React, { useEffect } from "react";

interface ChapterProps {
  selectedSubtopic?: string;
}

export const ChapterX: React.FC<ChapterProps> = ({ selectedSubtopic }) => {
  // Scroll to subtopic when selected
  useEffect(() => {
    if (selectedSubtopic) {
      const subtopicId = selectedSubtopic
        .split(".")
        .slice(0, 2)
        .join(".")
        .trim();
      const element = document.getElementById(`subtopic-${subtopicId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedSubtopic]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-[SUBJECT-COLOR]-100 dark:bg-[SUBJECT-COLOR]-900/30 text-[SUBJECT-COLOR]-600 dark:text-[SUBJECT-COLOR]-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter X
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          [CHAPTER TITLE IN CAPS]
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-[SUBJECT-COLOR]-600 to-[SECONDARY-COLOR]-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        {/* Section X.1 */}
        <section id="subtopic-X.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-[SUBJECT-COLOR]-100 dark:bg-[SUBJECT-COLOR]-900/30 text-[SUBJECT-COLOR]-600 dark:text-[SUBJECT-COLOR]-400 rounded-lg flex items-center justify-center text-sm">
                X.1
              </span>
              [Subtopic Title]
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              [Introduction paragraph explaining the main concept]
            </p>

            {/* Optional: Two-column layout for key concepts */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
                  [Concept 1]
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  [Description]
                </p>
              </div>

              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">
                  [Concept 2]
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  [Description]
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section X.2 */}
        <section id="subtopic-X.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-[SUBJECT-COLOR]-100 dark:bg-[SUBJECT-COLOR]-900/30 text-[SUBJECT-COLOR]-600 dark:text-[SUBJECT-COLOR]-400 rounded-lg flex items-center justify-center text-sm">
                X.2
              </span>
              [Subtopic Title]
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              [Content]
            </p>

            {/* Optional: Highlighted box for important information */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 mb-6">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3">
                [Important Note Title]
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>
                  <strong>1.</strong> [Point 1]
                </li>
                <li>
                  <strong>2.</strong> [Point 2]
                </li>
                <li>
                  <strong>3.</strong> [Point 3]
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section X.3 - Dark theme variant */}
        <section id="subtopic-X.3" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">
                X.3
              </span>
              [Subtopic Title]
            </h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              [Introduction]
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-[SUBJECT-COLOR]-400 font-bold mb-3">
                  [Concept A]
                </h4>
                <p className="text-sm text-slate-400 mb-4">[Description]</p>
                <div className="bg-white/10 rounded p-3 font-mono text-xs">
                  [Formula or Code]
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-blue-400 font-bold mb-3">[Concept B]</h4>
                <p className="text-sm text-slate-400 mb-4">[Description]</p>
                <div className="bg-white/10 rounded p-3 font-mono text-xs">
                  [Formula or Code]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section X.4 */}
        <section id="subtopic-X.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-[SUBJECT-COLOR]-100 dark:bg-[SUBJECT-COLOR]-900/30 text-[SUBJECT-COLOR]-600 dark:text-[SUBJECT-COLOR]-400 rounded-lg flex items-center justify-center text-sm">
                X.4
              </span>
              [Subtopic Title]
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              [Content]
            </p>

            {/* Optional: Three-column grid for multiple items */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-[SUBJECT-COLOR]-600 mb-1">
                  [Icon/Symbol]
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  [Label]
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  [Icon/Symbol]
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  [Label]
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  [Icon/Symbol]
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  [Label]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section X.5 */}
        <section id="subtopic-X.5" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-[SUBJECT-COLOR]-100 dark:bg-[SUBJECT-COLOR]-900/30 text-[SUBJECT-COLOR]-600 dark:text-[SUBJECT-COLOR]-400 rounded-lg flex items-center justify-center text-sm">
                X.5
              </span>
              [Subtopic Title]
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              [Content]
            </p>

            {/* Optional: List with numbered items */}
            <div className="space-y-4">
              {[
                { title: "[Item 1]", desc: "[Description 1]" },
                { title: "[Item 2]", desc: "[Description 2]" },
                { title: "[Item 3]", desc: "[Description 3]" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-10 h-10 bg-[SUBJECT-COLOR]-100 dark:bg-[SUBJECT-COLOR]-900/30 text-[SUBJECT-COLOR]-600 dark:text-[SUBJECT-COLOR]-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optional: Knowledge Check / Exercise Section */}
        <section className="bg-gradient-to-r from-[SUBJECT-COLOR]-600 to-[SECONDARY-COLOR]-700 rounded-3xl p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">
                Chapter X Knowledge Check
              </h3>
              <p className="text-[SUBJECT-COLOR]-100 mb-0">
                Test your understanding of the concepts covered in this chapter.
              </p>
            </div>
            <div className="w-full md:w-96 bg-white rounded-2xl p-6 text-slate-900 shadow-2xl">
              {/* Add ExerciseQuestion component here if available */}
              <p className="text-sm text-slate-600">
                Interactive exercise will be added here.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChapterX; // ⚠️ CRITICAL: Required for React.lazy to work!

/*
USAGE INSTRUCTIONS:
==================

1. REPLACE PLACEHOLDERS:
   - ChapterX → Chapter1, Chapter2, etc.
   - [SUBJECT-COLOR] → green, blue, pink, etc. (from config)
   - [SECONDARY-COLOR] → emerald, indigo, purple, etc. (from config)
   - [CHAPTER TITLE] → Actual chapter title
   - X.1, X.2, etc. → Actual subtopic numbers
   - [Subtopic Title] → Actual subtopic titles
   - [Content] → Actual educational content

2. COLOR REFERENCE:
   - Psychology: pink/purple
   - Logic: indigo/violet
   - Physics: green/emerald
   - Math (Natural): blue/indigo
   - Math (Social): cyan/blue
   - Geography: teal/cyan
   - History: amber/orange
   - English: rose/red

3. SECTION LAYOUTS:
   - Use white cards for standard content
   - Use dark (slate-900) cards for emphasis
   - Use colored backgrounds for highlights
   - Use grids for multiple related items

4. IMPORTANT:
   - Always include id="subtopic-X.Y" on each section
   - Always include className="scroll-mt-8" for proper scrolling
   - Always accept selectedSubtopic prop
   - Always implement the useEffect scroll logic

5. SAVE LOCATION:
   Client/src/dashboards/student/learning center/University/Freshman/
   [SubjectName]/chapters/Chapter[X]/Chapter[X].tsx
*/
