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
        <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          FUNCTIONS AND GRAPHS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          Functions are mathematical relationships that map inputs to outputs, fundamental to understanding calculus and advanced mathematics.
        </p>
      </div>

      <div className="space-y-16 pb-20 px-4 md:px-8">
        
        {/* SUBTOPIC 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4">
            1.1. Types of Functions
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A function is a relation where each input (x) corresponds to exactly one output (y). Different types of 
              functions have unique properties and applications.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Common Function Types
          </h3>

          <div className="space-y-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-bold text-slate-900 dark:text-white mb-2">1. Linear Functions: f(x) = mx + b</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Straight line graphs. Example: Cost of Ethiopian coffee = 200 birr/kg × weight + 50 birr (packaging)
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-bold text-slate-900 dark:text-white mb-2">2. Quadratic Functions: f(x) = ax² + bx + c</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Parabola graphs. Example: Projectile motion of a ball thrown in Meskel Square
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-bold text-slate-900 dark:text-white mb-2">3. Polynomial Functions: f(x) = aₙxⁿ + ... + a₁x + a₀</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Higher degree curves used in engineering and physics calculations
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <p className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">Real-World Example: Ethiopian Airlines Flight Path</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              When an Ethiopian Airlines plane takes off from Bole International Airport, its altitude can be modeled 
              by a function. During takeoff, altitude increases rapidly (steep slope), then levels off during cruise 
              (gentle slope). This is a piecewise function combining different function types for different flight phases.
            </p>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion 
              question="True or False: In a function, one input can correspond to multiple outputs."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. By definition, a function maps each input to exactly ONE output. If one input gives multiple outputs, it's a relation but not a function. This is called the 'vertical line test' - if a vertical line crosses the graph more than once, it's not a function."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-blue-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise</h3>
            
            <div className="space-y-6">
              <ExerciseQuestion 
                question="Which of the following represents a linear function?"
                options={[
                  'f(x) = x² + 3',
                  'f(x) = 2x + 5',
                  'f(x) = 1/x',
                  'f(x) = x³ - 2x'
                ]}
                correctAnswer={1}
                explanation="f(x) = 2x + 5 is a linear function because it has the form f(x) = mx + b where m=2 (slope) and b=5 (y-intercept). The other options are: quadratic (x²), rational (1/x), and cubic (x³) functions."
              />

              <ExerciseQuestion 
                question="If f(x) = 3x - 2, what is f(4)?"
                options={[
                  '8',
                  '10',
                  '12',
                  '14'
                ]}
                correctAnswer={1}
                explanation="Substitute x=4 into the function: f(4) = 3(4) - 2 = 12 - 2 = 10. This means when the input is 4, the output is 10."
              />
            </div>
          </div>
        </section>

        {/* Placeholder for remaining subtopics */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Note:</strong> Additional subtopics (1.2, 1.3, 1.4) should be added covering composite functions, 
            inverse functions, exponential/logarithmic functions, and graphing techniques with Ethiopian examples.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
