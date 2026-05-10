import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter2Props {
  selectedSubtopic?: string;
}

const Chapter2: React.FC<Chapter2Props> = ({ selectedSubtopic }) => {
  // Scroll to subtopic when selected
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
        <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 2
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          HUMAN DEVELOPMENT
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20 px-4 md:px-8">
        
        {/* Section 2.1: Basics */}
        <section id="subtopic-2.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-pink-600 pl-2 md:pl-4">
            2.1. Basics of Human Development
          </h2>
          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-3 md:mb-6">
            Development refers to the pattern of movement or change that begins at conception and continues through the human life span. 
            It is a <span className="font-bold text-pink-600">lifelong process</span> that is multi-dimensional, multi-directional, plastic, multidisciplinary, and contextual.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 border-l-4 border-blue-600">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Nature vs. Nurture</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">The debate about whether development is primarily influenced by biology (nature) or environmental experiences (nurture).</p>
            </div>
            <div className="p-5 border-l-4 border-purple-600">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Continuity vs. Discontinuity</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Does development involve gradual, cumulative change or distinct, sudden stages?</p>
            </div>
          </div>
        </section>

        {/* Section 2.2: Principles */}
        <section id="subtopic-2.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-pink-600 pl-2 md:pl-4">
            2.2. Principles of Development
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Development is Lifelong', desc: 'No age period dominates development; it occurs from conception to death.' },
              { title: 'Development is Multidimensional', desc: 'It consists of biological, cognitive, and socio-emotional dimensions.' },
              { title: 'Development is Plastic', desc: 'Plasticity means the capacity for change throughout the lifespan.' },
              { title: 'Development is Contextual', desc: 'All development occurs within a context (family, school, country, time).' }
            ].map((principle, i) => (
              <div key={i} className="flex gap-4 p-4 border-l-4 border-pink-600">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{principle.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2.3: Aspects */}
        <section id="subtopic-2.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-pink-600 pl-2 md:pl-4">
            2.3. Aspects of Development
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border-l-4 border-emerald-600">
              <div className="text-3xl mb-4">💪</div>
              <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">Physical</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Changes in body size, proportions, appearance, and brain development.</p>
            </div>
            <div className="p-6 border-l-4 border-blue-600">
              <div className="text-3xl mb-4">🧠</div>
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Cognitive</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Changes in intellectual abilities, including attention, memory, and language.</p>
            </div>
            <div className="p-6 border-l-4 border-amber-600">
              <div className="text-3xl mb-4">🤝</div>
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2">Psychosocial</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Changes in emotional communication, self-understanding, and relationships.</p>
            </div>
          </div>
        </section>

        {/* Section 2.4: Theories */}
        <section id="subtopic-2.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-pink-600 pl-2 md:pl-4">
            2.4. Theories of Development
          </h2>
          <div className="p-8 border-t-4 border-slate-700">
            <div className="space-y-8">
              <div className="flex gap-6 items-start border-l-4 border-pink-600 pl-4">
                <div className="bg-pink-600 px-4 py-2 text-white font-bold whitespace-nowrap">Piaget</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-pink-600 dark:text-pink-400">Cognitive Developmental Theory</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Children actively construct knowledge as they manipulate and explore their world through stages (Sensorimotor, Preoperational, etc.).</p>
                </div>
              </div>
              <div className="flex gap-6 items-start border-l-4 border-blue-600 pl-4">
                <div className="bg-blue-600 px-4 py-2 text-white font-bold whitespace-nowrap">Erikson</div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Psychosocial Theory</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Focuses on social relationships and how we resolve "crises" at different life stages (e.g., Trust vs. Mistrust).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Exercise */}
        <section className="p-10 border-t-4 border-pink-600">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Chapter 2 Knowledge Check</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-0">Test your understanding of the principles and aspects of human development.</p>
            </div>
            <ExerciseQuestion 
              question="Which principle states that development capacity for change exists throughout the lifespan?"
              options={['Multidimensional', 'Contextual', 'Plasticity', 'Multidirectional']}
              correctAnswer={2}
              explanation="Plasticity refers to the brain's and the person's ability to adapt and change at any age."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter2;
