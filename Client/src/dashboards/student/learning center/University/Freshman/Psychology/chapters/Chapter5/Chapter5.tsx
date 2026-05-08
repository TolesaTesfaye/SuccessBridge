import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter5: React.FC = () => {
  return (
    <div className="w-full">
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 5
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          MOTIVATION AND EMOTIONS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20 px-4 md:px-8">
        
        {/* Section 5.1: Motivation */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            5.1. Motivation
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Motivation is the force that initiates, guides, and maintains goal-oriented behaviors. It is what causes you to act, whether it is getting a glass of water to reduce thirst or reading a book to gain knowledge.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-4xl opacity-20">🎯</div>
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 text-xl">Intrinsic Motivation</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Behavior that is driven by internal rewards. The motivation to engage in a behavior arises from within the individual because it is naturally satisfying to you.</p>
              </div>
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-4xl opacity-20">🏆</div>
                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2 text-xl">Extrinsic Motivation</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Behavior that is driven by external rewards such as money, fame, grades, and praise. This type of motivation arises from outside the individual.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5.2: Emotions */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            5.2. Emotions
          </h2>
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-600/20 rounded-full blur-3xl" />
            <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
              Components of Emotion
            </h4>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Physiological', desc: 'Bodily changes like increased heart rate or sweating.', icon: '💓' },
                { title: 'Behavioral', desc: 'Outward expressions like smiling, frowning, or crying.', icon: '😊' },
                { title: 'Cognitive', desc: 'The subjective experience and interpretation of the feeling.', icon: '💭' }
              ].map((comp, i) => (
                <div key={i} className="p-5 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-2xl mb-2">{comp.icon}</div>
                  <h5 className="font-bold text-pink-400 mb-2">{comp.title}</h5>
                  <p className="text-xs text-white/60 leading-relaxed">{comp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Theories of Emotion */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <div className="space-y-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-l-8 border-blue-600 shadow-sm">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">James-Lange Theory</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Emotions occur as a result of physiological reactions to events. (I am trembling, therefore I am afraid).</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-l-8 border-purple-600 shadow-sm">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Cannon-Bard Theory</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">We feel emotions and experience physiological reactions simultaneously.</p>
            </div>
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Motivation & Emotion Quiz</h3>
              <p className="text-emerald-100">Are you driven by the task itself or the reward?</p>
            </div>
            <ExerciseQuestion 
              question="If a student studies because they find the subject interesting and personally rewarding, they are showing:"
              options={[
                'Extrinsic Motivation',
                'Intrinsic Motivation',
                'Physiological Drive',
                'Social Pressure'
              ]}
              correctAnswer={1}
              explanation="Intrinsic motivation comes from internal satisfaction rather than external rewards like grades or money."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter5;
