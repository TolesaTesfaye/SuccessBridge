import React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { ChapterConfig } from "@learningCenter/University/Freshman/subjectRegistry";

interface SubjectChapterSidebarProps {
  chapters: ChapterConfig[];
  selectedChapter: string;
  selectedSubtopic: string;
  expandedChapters: Set<string>;
  onChapterClick: (chapterId: string) => void;
  onSubtopicClick: (chapterId: string, subtopic: string) => void;
  onToggleExpand: (chapterId: string) => void;
  onCloseSidebar: () => void;
}

export const SubjectChapterSidebar: React.FC<SubjectChapterSidebarProps> = ({
  chapters,
  selectedChapter,
  selectedSubtopic,
  expandedChapters,
  onChapterClick,
  onSubtopicClick,
  onToggleExpand,
  onCloseSidebar,
}) => {
  return (
    <>
      {chapters.map((chapter) => (
        <div key={chapter.id}>
          {/* Chapter Header with Expand/Collapse */}
          <div className="flex items-center border-b border-slate-300/50 dark:border-slate-700/50">
            <button
              onClick={() => {
                onChapterClick(chapter.id);
                onCloseSidebar();
              }}
              className="flex-1 text-left px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium transition-colors text-slate-900 dark:text-slate-300 hover:bg-slate-300/30 dark:hover:bg-slate-700/50 hover:text-black dark:hover:text-white"
            >
              {chapter.title}
            </button>
            {chapter.subtopics && chapter.subtopics.length > 0 && (
              <button
                onClick={() => onToggleExpand(chapter.id)}
                className="px-2 py-2.5 md:py-3 transition-colors text-slate-700 dark:text-slate-400 hover:text-black dark:hover:text-white"
              >
                {expandedChapters.has(chapter.id) ? (
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </button>
            )}
          </div>

          {/* Subtopics under expanded chapter */}
          {expandedChapters.has(chapter.id) &&
            chapter.subtopics?.map((subtopic, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSubtopicClick(chapter.id, subtopic);
                  onCloseSidebar();
                }}
                className={`w-full text-left px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs transition-colors border-b border-slate-300/30 dark:border-slate-700/30 ${
                  selectedChapter === chapter.id &&
                  selectedSubtopic === subtopic
                    ? "bg-blue-600 text-white font-medium"
                    : "text-slate-800 dark:text-slate-400 hover:bg-slate-300/30 dark:hover:bg-slate-700/50 hover:text-black dark:hover:text-white"
                }`}
              >
                {subtopic}
              </button>
            ))}
        </div>
      ))}
    </>
  );
};
