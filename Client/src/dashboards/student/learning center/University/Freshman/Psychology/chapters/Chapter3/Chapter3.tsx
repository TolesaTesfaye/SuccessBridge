import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter3: React.FC = () => {
  return (
    <div className="w-full">
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 3
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          LEARNING AND THEORIES
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20 px-4 md:px-8">
        
        {/* Section 3.1: Definition */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            3.1. Definition and Characteristics of Learning
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              <span className="font-bold text-pink-600">Learning</span> is defined as a relatively permanent change in behavior or knowledge resulting from experience or practice.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Key Characteristics:</h4>
              <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
                {[
                  'Relatively permanent change',
                  'Result of experience',
                  'Universal process',
                  'Purposeful and goal-oriented',
                  'Active process',
                  'Involves reconstruction of experience'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center flex-shrink-0">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3.3: Theories */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            3.3. Major Learning Theories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all">
              <h4 className="font-black text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-tighter">Classical Conditioning</h4>
              <p className="text-xs text-slate-400 mb-4 font-bold">Ivan Pavlov</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Learning through association. A neutral stimulus becomes paired with a meaningful stimulus to produce a response.</p>
            </div>
            <div className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all">
              <h4 className="font-black text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-tighter">Operant Conditioning</h4>
              <p className="text-xs text-slate-400 mb-4 font-bold">B.F. Skinner</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Learning through consequences. Behavior is strengthened by reinforcement or weakened by punishment.</p>
            </div>
            <div className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-all">
              <h4 className="font-black text-purple-600 dark:text-purple-400 mb-2 uppercase tracking-tighter">Social Learning</h4>
              <p className="text-xs text-slate-400 mb-4 font-bold">Albert Bandura</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Learning through observation and imitation of others (modeling). No direct reinforcement is needed.</p>
            </div>
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-6">Test Your Knowledge</h3>
              <p className="text-slate-400 leading-relaxed">
                Identify the specific mechanism of learning in this real-world scenario.
              </p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 mt-6">
                <p className="text-sm italic">"A student studies hard because they received a scholarship after getting an A in their previous exam."</p>
              </div>
            </div>
            <ExerciseQuestion 
              question="Which learning theory best explains the scenario described on the left?"
              options={[
                'Classical Conditioning',
                'Operant Conditioning',
                'Social Learning Theory',
                'Gestalt Learning'
              ]}
              correctAnswer={1}
              explanation="The student's behavior (studying) was strengthened by a reward (scholarship), which is a clear example of reinforcement in Operant Conditioning."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter3;
