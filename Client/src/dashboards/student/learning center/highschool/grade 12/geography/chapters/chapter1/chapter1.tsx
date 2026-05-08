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
        <span className="inline-block px-4 py-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          POPULATION GEOGRAPHY
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-teal-600 to-cyan-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          Population geography studies the distribution, density, growth, and movement of human populations across space.
        </p>
      </div>

      <div className="space-y-16 pb-20 px-4 md:px-8">
        
        {/* SUBTOPIC 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-teal-600 pl-4">
            1.1. Population Distribution and Density
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Population distribution refers to how people are spread across Earth's surface, while population density 
              measures the number of people per unit area.
            </p>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg mb-6">
            <p className="text-sm font-bold text-teal-900 dark:text-teal-300 mb-2">Ethiopian Example: Population Distribution</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ethiopia's population of over 120 million is unevenly distributed. The highlands (Amhara, Oromia, SNNPR) 
              have high population density due to fertile soil, moderate climate, and water availability. In contrast, 
              the Afar and Somali regions have low density due to arid conditions. Addis Ababa, with over 5 million 
              people, shows extreme urban density compared to rural areas.
            </p>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion 
              question="True or False: Population density is calculated by dividing total population by total land area."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. Population density = Total Population ÷ Total Land Area. It's typically expressed as people per square kilometer (people/km²). This measure helps compare how crowded different regions are."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-teal-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise</h3>
            
            <div className="space-y-6">
              <ExerciseQuestion 
                question="Which factor MOST influences high population density in Ethiopian highlands?"
                options={[
                  'Proximity to the ocean',
                  'Fertile soil and favorable climate',
                  'Desert conditions',
                  'Extreme cold temperatures'
                ]}
                correctAnswer={1}
                explanation="Fertile soil and favorable climate are the main factors. The Ethiopian highlands have rich volcanic soil, adequate rainfall, and moderate temperatures ideal for agriculture. This supports large populations through food production, unlike arid lowlands or extreme environments."
              />
            </div>
          </div>
        </section>

        {/* Placeholder for remaining subtopics */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Note:</strong> Additional subtopics (1.2, 1.3, 1.4) should be added following the same structure 
            with Ethiopian examples, exercises, and detailed explanations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
