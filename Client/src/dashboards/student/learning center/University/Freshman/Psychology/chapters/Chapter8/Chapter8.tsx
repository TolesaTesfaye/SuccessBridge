import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter8: React.FC = () => {
  return (
    <div className="w-full">
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 8
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          INTRODUCTION TO LIFE SKILLS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20 px-4 md:px-8">
        
        {/* Section 8.1: Nature */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            8.1. Nature and Definition
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              According to the World Health Organization (WHO), <span className="font-bold text-pink-600">Life Skills</span> are "abilities for adaptive and positive behavior that enable individuals to deal effectively with the demands and challenges of everyday life."
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 italic">Adaptive Behavior</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">The ability to remain flexible and adjust to different situations and environments.</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 italic">Positive Behavior</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Maintaining an optimistic outlook even when facing difficult circumstances.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8.3: Components */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            8.3. Core Components of Life Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Self-Awareness', icon: '👤' },
              { label: 'Empathy', icon: '❤️' },
              { label: 'Critical Thinking', icon: '🧠' },
              { label: 'Creative Thinking', icon: '🎨' },
              { label: 'Decision Making', icon: '⚖️' },
              { label: 'Problem Solving', icon: '🧩' },
              { label: 'Communication', icon: '💬' },
              { label: 'Interpersonal Skills', icon: '🤝' },
              { label: 'Coping with Stress', icon: '🌊' },
              { label: 'Coping with Emotion', icon: '🎭' }
            ].map((skill, i) => (
              <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center gap-2 hover:scale-105 transition-transform cursor-default">
                <div className="text-2xl">{skill.icon}</div>
                <p className="text-[10px] font-black uppercase tracking-tighter text-slate-600 dark:text-slate-400">{skill.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="bg-gradient-to-r from-pink-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">🚀</div>
                Ready for Life?
              </h3>
              <p className="text-blue-100">Test your understanding of the definition of life skills.</p>
            </div>
            <ExerciseQuestion 
              question="According to the WHO, Life Skills are primarily used to deal effectively with:"
              options={[
                'Academic exams only',
                'Demands and challenges of everyday life',
                'Biological growth',
                'Professional career success only'
              ]}
              correctAnswer={1}
              explanation="Life skills are essential for managing all the routine challenges we face in our daily lives."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter8;
