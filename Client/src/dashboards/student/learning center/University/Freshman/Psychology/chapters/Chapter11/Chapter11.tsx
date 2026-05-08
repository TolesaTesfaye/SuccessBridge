import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter11: React.FC = () => {
  return (
    <div className="w-full">
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 11
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          SOCIAL SKILLS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20 px-4 md:px-8">
        
        {/* Section 11.3: Communication */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            11.3. Interpersonal Communication
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Effective communication involves the exchange of information, ideas, and feelings. It is not just about what is said, but how it is perceived.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                 <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Verbal Communication</h4>
                 <p className="text-sm text-slate-600 dark:text-slate-400">The use of sounds and language to convey a message. Includes pitch, volume, and speed.</p>
               </div>
               <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
                 <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Non-Verbal Communication</h4>
                 <p className="text-sm text-slate-600 dark:text-slate-400">Body language, facial expressions, gestures, and eye contact. Often conveys more than words.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Section 11.6: Assertiveness */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            11.6. Assertiveness
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800">
              <h4 className="font-bold text-red-900 dark:text-red-400 mb-2">Passive</h4>
              <p className="text-xs text-slate-500">Failing to express feelings or needs; allowing others to infringe on your rights.</p>
            </div>
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-400 mb-2">Assertive</h4>
              <p className="text-xs text-slate-500">Directly expressing needs and feelings in a way that respects others.</p>
            </div>
            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800">
              <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-2">Aggressive</h4>
              <p className="text-xs text-slate-500">Expressing needs in a way that violates the rights of others.</p>
            </div>
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="bg-slate-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Social Skills Quiz</h3>
              <p className="text-slate-400">Can you distinguish between different communication styles?</p>
            </div>
            <ExerciseQuestion 
              question="Which communication style involves standing up for your own rights while also respecting the rights of others?"
              options={[
                'Passive',
                'Aggressive',
                'Assertive',
                'Passive-Aggressive'
              ]}
              correctAnswer={2}
              explanation="Assertiveness is the healthy middle ground between being a doormat (passive) and being a bully (aggressive)."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter11;
