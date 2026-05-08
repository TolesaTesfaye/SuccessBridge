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
        <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          CHEMICAL KINETICS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-violet-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          Chemical kinetics is the study of reaction rates and the factors that affect how fast chemical reactions occur.
        </p>
      </div>

      <div className="space-y-16 pb-20 px-4 md:px-8">
        
        {/* SUBTOPIC 1.1: Reaction Rates */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            1.1. Reaction Rates
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              The reaction rate measures how quickly reactants are consumed or products are formed in a chemical reaction. 
              Understanding reaction rates is essential for controlling industrial processes, developing new materials, and 
              understanding biological systems.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            What is Reaction Rate?
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Reaction rate is the change in concentration of reactants or products per unit time. It can be expressed as:
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-lg text-slate-900 dark:text-white">
                Rate = -Δ[Reactant]/Δt = +Δ[Product]/Δt
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Where Δ represents change and t represents time. The negative sign for reactants indicates their concentration decreases.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Measuring Reaction Rates
          </h3>

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-purple-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Methods of Measurement
              </h4>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2">Real-World Example: Ethiopian Coffee Roasting</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  When roasting Ethiopian coffee beans, the rate of chemical reactions determines the flavor profile. Roasters 
                  monitor color change, temperature, and gas release (CO₂) to measure reaction rates. Faster roasting (higher 
                  temperature) produces different flavors than slower roasting. Understanding reaction kinetics helps Ethiopian 
                  coffee producers optimize roasting for export quality.
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Common Measurement Techniques:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Spectrophotometry - measuring color intensity changes</li>
                <li>• Gas volume measurement - collecting gas produced</li>
                <li>• Mass change - weighing reactants/products over time</li>
                <li>• pH measurement - tracking acid/base concentration</li>
                <li>• Conductivity - measuring ion concentration changes</li>
              </ul>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion 
              question="True or False: A faster reaction rate means reactants are consumed more quickly."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. Reaction rate measures how quickly reactants are consumed or products are formed. A faster rate means the concentration of reactants decreases more rapidly per unit time, and products form more quickly."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Reaction Rates</h3>
            
            <div className="space-y-6">
              <ExerciseQuestion 
                question="In a reaction, the concentration of reactant A decreases from 2.0 M to 1.0 M in 10 seconds. What is the average reaction rate?"
                options={[
                  '0.05 M/s',
                  '0.1 M/s',
                  '0.2 M/s',
                  '1.0 M/s'
                ]}
                correctAnswer={1}
                explanation="The average rate = -Δ[A]/Δt = -(1.0 - 2.0)/10 = -(-1.0)/10 = 0.1 M/s. The concentration decreased by 1.0 M over 10 seconds, giving a rate of 0.1 M/s. The negative sign indicates consumption, but rate is expressed as a positive value."
              />

              <ExerciseQuestion 
                question="Which method would be BEST for measuring the rate of a reaction that produces a colored product?"
                options={[
                  'Weighing the reaction vessel',
                  'Spectrophotometry (measuring light absorption)',
                  'Measuring pH',
                  'Collecting gas in a syringe'
                ]}
                correctAnswer={1}
                explanation="Spectrophotometry is best for reactions producing colored products. It measures how much light is absorbed by the solution, which changes as the colored product concentration increases. This method is precise, non-invasive, and can provide continuous measurements throughout the reaction."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.2: Rate Laws and Reaction Order */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            1.2. Rate Laws and Reaction Order
          </h2>

          <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Rate laws express the mathematical relationship between reaction rate and reactant concentrations. 
              They help predict how changing conditions will affect reaction speed.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Rate Law Expression
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              For a general reaction: aA + bB → products
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-lg text-slate-900 dark:text-white">
                Rate = k[A]<sup>m</sup>[B]<sup>n</sup>
              </p>
            </div>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>k</strong> = rate constant (depends on temperature)</li>
              <li>• <strong>m, n</strong> = reaction orders (determined experimentally)</li>
              <li>• <strong>Overall order</strong> = m + n</li>
            </ul>
          </div>

          {/* Content continues... */}
          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg mb-6">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Note:</strong> This is a template chapter. Complete content with more subtopics, examples, 
              and exercises should be added following the Biology chapter structure.
            </p>
          </div>
        </section>

        {/* Additional subtopics 1.3 and 1.4 would go here */}
      </div>
    </div>
  );
};

export default Chapter1;
