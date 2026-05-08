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
        <span className="inline-block px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          ELECTROSTATICS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-red-600 to-rose-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          Electrostatics is the study of electric charges at rest and the forces, fields, and potentials they create.
        </p>
      </div>

      <div className="space-y-16 pb-20 px-4 md:px-8">
        
        {/* SUBTOPIC 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-red-600 pl-4">
            1.1. Electric Charge and Force
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Electric charge is a fundamental property of matter. There are two types: positive and negative. 
              Like charges repel, opposite charges attract.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Properties of Electric Charge
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li>• <strong>Quantization:</strong> Charge exists in discrete units (multiples of electron charge e = 1.6 × 10⁻¹⁹ C)</li>
              <li>• <strong>Conservation:</strong> Total charge in an isolated system remains constant</li>
              <li>• <strong>Two types:</strong> Positive (protons) and negative (electrons)</li>
              <li>• <strong>SI Unit:</strong> Coulomb (C)</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Coulomb's Law
          </h3>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border-2 border-red-300 dark:border-red-700 mb-6">
            <p className="text-center font-mono text-lg text-slate-900 dark:text-white mb-4">
              F = k × (q₁ × q₂) / r²
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 text-center">
              Where k = 9 × 10⁹ N·m²/C² (Coulomb's constant)
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg mb-6">
            <p className="text-sm font-bold text-red-900 dark:text-red-300 mb-2">Real-World Example: Lightning in Ethiopian Highlands</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              During Ethiopia's rainy season, lightning is common in the highlands. Lightning occurs when negative charges 
              accumulate at the bottom of clouds and positive charges build up on the ground. When the electric force 
              becomes strong enough to overcome air resistance, a massive discharge occurs - lightning! The Grand Ethiopian 
              Renaissance Dam uses lightning rods to protect its electrical systems from these powerful electrostatic discharges.
            </p>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion 
              question="True or False: Like charges attract each other."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Like charges (both positive or both negative) REPEL each other. Only opposite charges (positive and negative) attract. This is a fundamental principle of electrostatics."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-red-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise</h3>
            
            <div className="space-y-6">
              <ExerciseQuestion 
                question="Two charges of +3 μC and -3 μC are separated by 2 meters. What happens to the force if the distance is doubled to 4 meters?"
                options={[
                  'Force doubles',
                  'Force stays the same',
                  'Force becomes one-fourth',
                  'Force becomes one-half'
                ]}
                correctAnswer={2}
                explanation="The force becomes one-fourth. According to Coulomb's Law, F ∝ 1/r². If distance doubles (r → 2r), then F → F/(2²) = F/4. The inverse square relationship means doubling distance reduces force to 1/4 of its original value."
              />

              <ExerciseQuestion 
                question="Which statement about electric charge is TRUE?"
                options={[
                  'Charge can be created from nothing',
                  'Charge is always conserved in isolated systems',
                  'Only positive charges exist in nature',
                  'Charge can have any value'
                ]}
                correctAnswer={1}
                explanation="Charge is always conserved in isolated systems. This is the law of conservation of charge - the total charge before and after any process remains constant. Charge cannot be created or destroyed, only transferred. Charge is also quantized (comes in discrete units) and exists in both positive and negative forms."
              />
            </div>
          </div>
        </section>

        {/* Placeholder for remaining subtopics */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300">
            <strong>Note:</strong> Additional subtopics (1.2, 1.3, 1.4) should be added covering electric fields, 
            electric potential, and capacitance with Ethiopian examples and detailed exercises.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
