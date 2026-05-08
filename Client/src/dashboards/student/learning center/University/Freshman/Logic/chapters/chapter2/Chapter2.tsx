import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter2: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 2
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          BASIC CONCEPTS OF LOGIC
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        {/* Lesson 1 */}
        <section className="prose dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">2.1</span>
              Arguments, Premises and Conclusions
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
              An <strong className="text-slate-900 dark:text-white">argument</strong> is a set of statements where some statements (premises) are intended to support another statement (conclusion).
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-4 uppercase tracking-widest text-xs">Components:</h4>
                <ul className="space-y-3 list-none p-0 m-0">
                  {[
                    { t: 'Premises', d: 'Statements providing reasons/evidence.' },
                    { t: 'Conclusion', d: 'The statement being supported.' },
                    { t: 'Inference', d: 'The reasoning process connecting them.' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.t}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest text-xs">Indicator Words:</h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase mb-1 block">Premise Indicators</span>
                    <p className="text-xs text-slate-500 font-medium">since, because, for, given that, as indicated by</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase mb-1 block">Conclusion Indicators</span>
                    <p className="text-xs text-slate-500 font-medium">therefore, thus, hence, so, consequently, it follows that</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exercises */}
        <section className="bg-slate-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-black mb-4">Test Your Logic</h3>
              <p className="text-slate-400 leading-relaxed">
                Can you identify the core components of an argument? try these practice questions to sharpen your analytical skills.
              </p>
            </div>
            <ExerciseQuestion
              question="In an argument, what is the conclusion?"
              options={["The evidence provided", "The statement being supported", "The reasoning process", "The indicator words"]}
              correctAnswer={1}
            />
          </div>
        </section>

        {/* Deduction vs Induction */}
        <section>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center text-sm">2.3</span>
            Deduction vs Induction
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-black text-blue-600 mb-2">Deductive</h4>
              <p className="text-slate-500 text-sm mb-6">Conclusion follows <span className="text-slate-900 dark:text-white font-bold italic">necessarily</span>.</p>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-blue-500">
                <p className="text-xs font-bold text-slate-400 mb-1">Example</p>
                <p className="text-xs text-slate-700 dark:text-slate-300">All humans are mortal. Socrates is human. Therefore, Socrates is mortal.</p>
              </div>
            </div>

            <div className="relative p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-black text-emerald-600 mb-2">Inductive</h4>
              <p className="text-slate-500 text-sm mb-6">Conclusion follows <span className="text-slate-900 dark:text-white font-bold italic">probably</span>.</p>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border-l-4 border-emerald-500">
                <p className="text-xs font-bold text-slate-400 mb-1">Example</p>
                <p className="text-xs text-slate-700 dark:text-slate-300">The sun has risen every day. Therefore, it will probably rise tomorrow.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter2;
