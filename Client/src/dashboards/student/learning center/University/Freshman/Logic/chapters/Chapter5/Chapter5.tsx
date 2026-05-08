import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter5: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 5
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          INFORMAL FALLACIES
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20">
        {/* Lesson 1 */}
        <section className="prose dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center text-sm">5.1</span>
              The Nature of Fallacies
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
              A <strong className="text-slate-900 dark:text-white">fallacy</strong> is a defect in an argument that consists of something other than merely false premises. They are common errors in reasoning that can be <span className="italic">psychologically persuasive</span> even when logically invalid.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { t: 'Relevance', d: 'Premises irrelevant to conclusion.', c: 'red' },
                { t: 'Weak Induction', d: 'Premises provide weak support.', c: 'orange' },
                { t: 'Presumption', d: 'Premises presume what they prove.', c: 'yellow' },
                { t: 'Ambiguity', d: 'Unclear language misleads.', c: 'purple' }
              ].map((f, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h5 className="font-bold text-slate-900 dark:text-white text-[10px] uppercase mb-1">{f.t}</h5>
                  <p className="text-[10px] text-slate-500 leading-tight">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lesson 2 - Relevance Fallacies */}
        <section>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center text-sm">5.2</span>
            Fallacies of Relevance
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { t: 'Ad Hominem', d: 'Attacking the person instead of the argument.', e: '"You can\'t trust John, he failed math."' },
              { t: 'Straw Man', d: 'Misrepresenting an argument to attack it easily.', e: '"They want to destroy the industry!"' },
              { t: 'Appeal to Force', d: 'Using threats or force for acceptance.', e: '"Agree or you might lose your job."' },
              { t: 'Red Herring', d: 'Diverting attention with an irrelevant topic.', e: '"Why worry about bees when people are hungry?"' }
            ].map((f, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-colors shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{f.t}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{f.d}</p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border-l-4 border-orange-500 font-mono text-[10px] italic text-slate-600 dark:text-slate-400">
                  {f.e}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exercises */}
        <section className="bg-slate-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-black mb-6 uppercase">Reasoning Audit</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Identifying fallacies is the first step toward critical thinking. Practice your skills on these real-world examples of flawed reasoning.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Focus</p>
                  <p className="text-xs text-white">Detection of logical flaws</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Skill</p>
                  <p className="text-xs text-white">Analytical precision</p>
                </div>
              </div>
            </div>
            <ExerciseQuestion
              question="'Everyone is buying this smartphone, so it must be the best one available.' Which fallacy is this?"
              options={["Appeal to Force", "Straw Man", "Appeal to the People", "Red Herring"]}
              correctAnswer={2}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter5;
