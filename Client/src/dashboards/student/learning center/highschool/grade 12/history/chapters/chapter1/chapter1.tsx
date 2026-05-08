import React, { useEffect } from "react";
import { ExerciseQuestion } from "../../../../../University/Freshman/components/ExerciseQuestion";

interface ChapterProps {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter1: React.FC<ChapterProps> = ({ selectedSubtopic }) => {
  useEffect(() => {
    if (selectedSubtopic) {
      const subtopicId = selectedSubtopic.split('.').slice(0, 2).join('.').trim();
      const element = document.getElementById(`subtopic-${subtopicId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedSubtopic]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          THE COLD WAR
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-amber-600 to-orange-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          The Cold War was a period of geopolitical tension between the United States and Soviet Union from 1947 to 1991.
        </p>
      </div>

      <div className="space-y-16 pb-20 px-4 md:px-8">
        
        {/* SUBTOPIC 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-600 pl-4">
            1.1. Origins of the Cold War
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              The Cold War emerged from ideological differences between capitalism (USA) and communism (USSR), 
              competing for global influence after World War II.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg mb-6">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-2">Ethiopian Context: Cold War Influence</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ethiopia was significantly affected by the Cold War. Emperor Haile Selassie aligned with the West (USA), 
              receiving military and economic aid. However, after the 1974 revolution, the Derg regime shifted to the 
              Soviet bloc, receiving massive Soviet military support. This shift transformed Ethiopia's political and 
              economic systems, introducing socialist policies and Soviet-style governance.
            </p>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion 
              question="True or False: The Cold War involved direct military conflict between the USA and USSR."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. The Cold War was called 'cold' because the USA and USSR never fought each other directly. Instead, they competed through proxy wars (supporting opposing sides in other countries' conflicts), arms races, space races, and ideological propaganda. Direct war was avoided due to nuclear weapons deterrence."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-amber-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise</h3>
            
            <div className="space-y-6">
              <ExerciseQuestion 
                question="What was the main ideological difference between the USA and USSR during the Cold War?"
                options={[
                  'Religious beliefs',
                  'Capitalism vs. Communism',
                  'Language differences',
                  'Geographic location'
                ]}
                correctAnswer={1}
                explanation="The main difference was Capitalism vs. Communism. The USA promoted capitalism (free markets, private property, democracy) while the USSR promoted communism (state-controlled economy, collective ownership, single-party rule). This ideological conflict drove the Cold War competition for global influence."
              />
            </div>
          </div>
        </section>

        {/* Placeholder for remaining subtopics */}
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Note:</strong> Additional subtopics (1.2, 1.3, 1.4) should be added with detailed content about 
            major Cold War events, the arms race, and the end of the Cold War, including Ethiopian perspectives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
