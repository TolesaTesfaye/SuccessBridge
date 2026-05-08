import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter6: React.FC = () => {
  return (
    <div className="w-full">
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 6
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          PERSONALITY
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20 px-4 md:px-8">
        
        {/* Section 6.1: Meaning */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            6.1. Meaning of Personality
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-pink-600">Personality</span> refers to the unique and relatively stable patterns of thoughts, feelings, and behaviors that distinguish one person from another. It is what makes you "you" consistently across different situations.
            </p>
          </div>
        </section>

        {/* Section 6.2: Theories */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            6.2. Theories of Personality
          </h2>
          
          <div className="space-y-8">
            {/* Psychoanalytic */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">⚓</div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Psychoanalytic Theory</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6 italic">Sigmund Freud</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-blue-600">Id:</span> Unconscious, pleasure-seeking, impulsive.
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-blue-600">Ego:</span> Reality principle, rational, mediator.
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-blue-600">Superego:</span> Morality, conscience, ideal self.
                </div>
              </div>
            </div>

            {/* Trait Theory */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Trait Perspective: The Big Five</h4>
              <div className="flex flex-wrap gap-2">
                {['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'].map((trait, i) => (
                  <span key={i} className="px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-2xl text-sm font-bold shadow-sm">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Personality Challenge</h3>
              <p className="text-blue-100 mb-0">Which part of your personality is making the decisions today?</p>
            </div>
            <ExerciseQuestion 
              question="According to Freud, which part of the personality acts on the 'Pleasure Principle'?"
              options={['Ego', 'Superego', 'Id', 'Ideal Self']}
              correctAnswer={2}
              explanation="The Id is the primitive and instinctive component of personality that wants immediate gratification of all needs and desires."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter6;
