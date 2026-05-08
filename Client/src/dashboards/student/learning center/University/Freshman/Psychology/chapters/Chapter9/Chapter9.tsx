import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter9: React.FC = () => {
  return (
    <div className="w-full">
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 9
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          INTRA-PERSONAL SKILLS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20 px-4 md:px-8">
        
        {/* Section 9.1: Self-Concept & Esteem */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            9.1 & 9.2. Self-Concept and Self-Esteem
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Self-Concept</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">The cognitive aspect of the self. It answers the question <span className="font-bold italic">"Who am I?"</span> and includes your beliefs about your attributes and qualities.</p>
            </div>
            <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Self-Esteem</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">The evaluative aspect of the self. It answers the question <span className="font-bold italic">"How do I feel about myself?"</span> and represents your overall sense of self-worth.</p>
            </div>
          </div>
        </section>

        {/* Section 9.5: Emotional Intelligence */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            9.5. Emotional Intelligence (EQ)
          </h2>
          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <p className="text-slate-400 mb-8 leading-relaxed">Emotional Intelligence is the ability to recognize, understand, and manage our own emotions and the emotions of others.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: 'Self-Awareness', icon: '🔍' },
                { title: 'Self-Regulation', icon: '⚖️' },
                { title: 'Social Skills', icon: '🤝' },
                { title: 'Empathy', icon: '❤️' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="text-2xl">{item.icon}</div>
                  <p className="text-xs font-bold text-center">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Intra-Personal Quiz</h3>
              <p className="text-blue-100">Do you know the difference between your concept and your esteem?</p>
            </div>
            <ExerciseQuestion 
              question="The overall sense of self-worth and value we assign to ourselves is known as:"
              options={[
                'Self-Concept',
                'Self-Esteem',
                'Self-Regulation',
                'Self-Awareness'
              ]}
              correctAnswer={1}
              explanation="While self-concept is the factual 'who am I', self-esteem is the emotional 'how much do I value myself'."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter9;
