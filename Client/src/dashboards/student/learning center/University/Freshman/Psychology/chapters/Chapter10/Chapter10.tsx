import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter10: React.FC = () => {
  return (
    <div className="w-full">
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 10
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          ACADEMIC SKILLS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20 px-4 md:px-8">
        
        {/* Section 10.1: Time Management */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            10.1. Time Management
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-6xl opacity-5">⏰</div>
             <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
               Time management is the process of planning and exercising conscious control over the amount of time spent on specific activities, especially to increase effectiveness, efficiency, or productivity.
             </p>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">The Eisenhower Matrix</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 list-none p-0">
                    <li>• <span className="font-bold">Urgent & Important:</span> Do First.</li>
                    <li>• <span className="font-bold">Not Urgent & Important:</span> Schedule.</li>
                  </ul>
                </div>
                <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">SMART Goals</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Specific, Measurable, Achievable, Relevant, and Time-bound.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Section 10.4: Test Anxiety */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            10.4. Overcoming Test Anxiety
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Preparation', desc: 'Starting early and using active recall reduces the fear of the unknown.', icon: '📚' },
              { title: 'Relaxation', icon: '🧘', desc: 'Deep breathing and visualization can lower physical stress symptoms.' },
              { title: 'Positive Talk', icon: '🗣️', desc: 'Replacing "I will fail" with "I have prepared and will do my best."' }
            ].map((tip, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center hover:border-pink-500 transition-colors">
                <div className="text-3xl mb-3">{tip.icon}</div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{tip.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="bg-slate-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Academic Success Quiz</h3>
              <p className="text-slate-400">Master your study habits for the upcoming exams.</p>
            </div>
            <ExerciseQuestion 
              question="In the SMART goal framework, what does the 'T' stand for?"
              options={[
                'Theoretical',
                'Time-bound',
                'Technical',
                'Targeted'
              ]}
              correctAnswer={1}
              explanation="Goals must have a deadline (Time-bound) to create a sense of urgency and track progress."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter10;
