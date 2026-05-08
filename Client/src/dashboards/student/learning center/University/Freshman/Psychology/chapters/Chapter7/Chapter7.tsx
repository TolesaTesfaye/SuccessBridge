import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter7: React.FC = () => {
  return (
    <div className="w-full">
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 7
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          PSYCHOLOGICAL DISORDERS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20 px-4 md:px-8">
        
        {/* Section 7.1: Nature */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            7.1. Nature of Disorders
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              A <span className="font-bold text-pink-600">Psychological Disorder</span> is a syndrome characterized by clinically significant disturbance in an individual's cognition, emotion regulation, or behavior.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">Distress</h5>
                <p className="text-xs text-slate-500">The behavior causes the person significant physical or emotional pain.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">Dysfunction</h5>
                <p className="text-xs text-slate-500">The behavior interferes with daily life and responsibilities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7.3: Types */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            7.3. Types of Psychological Disorders
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Anxiety Disorders', desc: 'Characterized by excessive fear, anxiety, and related behavioral disturbances.', examples: 'Phobias, Panic Disorder, GAD.', color: 'blue' },
              { title: 'Mood Disorders', desc: 'Disturbances in emotion that are strong enough to intrude on everyday living.', examples: 'Depression, Bipolar Disorder.', color: 'purple' },
              { title: 'Schizophrenia', desc: 'A severe disorder characterized by disorganized thought, perceptions, and behavior.', examples: 'Hallucinations, Delusions.', color: 'emerald' },
              { title: 'Personality Disorders', desc: 'Inflexible and enduring behavior patterns that impair social functioning.', examples: 'Antisocial, Borderline.', color: 'amber' }
            ].map((type, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all border-t-4" style={{ borderTopColor: type.color }}>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{type.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{type.desc}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Common Examples: {type.examples}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="bg-slate-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Diagnostic Quiz</h3>
              <p className="text-slate-400">Can you identify the disorder category?</p>
            </div>
            <ExerciseQuestion 
              question="Which category of disorders is primarily characterized by disturbances in emotional state (extreme sadness or extreme elation)?"
              options={['Anxiety Disorders', 'Mood Disorders', 'Schizophrenia', 'Personality Disorders']}
              correctAnswer={1}
              explanation="Mood disorders (like Depression and Bipolar) are defined by extreme fluctuations in the individual's emotional state."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter7;
