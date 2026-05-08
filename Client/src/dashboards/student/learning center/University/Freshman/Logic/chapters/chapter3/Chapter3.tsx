import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter3: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 3
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          LOGIC AND LANGUAGE
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20">
        {/* Lesson 1 */}
        <section className="prose dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">3.1</span>
              Language and Logic
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
              Language is the primary tool of logic. Logic primarily deals with <strong className="text-blue-600">informative language</strong> because only informative statements can be true or false.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { t: 'Informative', d: 'Conveys facts or information.', e: 'Water boils at 100°C.' },
                { t: 'Expressive', d: 'Expresses feelings or emotions.', e: 'I\'m so happy!' },
                { t: 'Directive', d: 'Commands or instructs.', e: 'Close the door.' },
                { t: 'Performative', d: 'Performs an action through words.', e: 'I promise to help.' }
              ].map((f, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h5 className="font-bold text-slate-900 dark:text-white text-xs uppercase mb-2">{f.t}</h5>
                  <p className="text-[10px] text-slate-500 mb-2">{f.d}</p>
                  <p className="text-[10px] font-mono text-blue-500 italic">"{f.e}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lesson 3 - Definitions */}
        <section>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center text-sm">3.3</span>
            Types of Definitions
          </h3>
          <div className="space-y-4">
            {[
              { t: 'Lexical', d: 'Reports commonly accepted meanings (Dictionary).', c: 'blue' },
              { t: 'Stipulative', d: 'Assigns new or specific meanings for a purpose.', c: 'emerald' },
              { t: 'Precising', d: 'Reduces vagueness by being specific.', c: 'indigo' },
              { t: 'Theoretical', d: 'Technical meaning based on scientific theory.', c: 'orange' },
              { t: 'Persuasive', d: 'Biased definition meant to influence attitudes.', c: 'red' }
            ].map((type, i) => (
              <div key={i} className="flex items-center gap-6 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className={`w-2 h-12 bg-${type.c}-500 rounded-full`} />
                <div>
                  <h5 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest">{type.t} Definition</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{type.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exercises */}
        <section className="bg-slate-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-black mb-6">Language Check</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                In logic, precision is everything. Test your ability to distinguish between different types of language and definitions.
              </p>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-blue-400 uppercase mb-2 tracking-widest">Pro Tip</p>
                <p className="text-xs text-slate-400 italic">Always look for informative content when analyzing logical arguments.</p>
              </div>
            </div>
            <ExerciseQuestion
              question="'That corrupt official is destroying our country!' What type of language is this?"
              options={["Neutral and precise", "Emotive and loaded", "Literal and clear", "Figurative and vague"]}
              correctAnswer={1}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter3;
