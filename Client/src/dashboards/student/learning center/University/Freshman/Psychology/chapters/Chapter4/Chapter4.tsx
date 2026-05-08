import React from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

const Chapter4: React.FC = () => {
  return (
    <div className="w-full">
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 4
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          MEMORY AND FORGETTING
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20 px-4 md:px-8">
        
        {/* Section 4.1: Memory Processes */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            4.1. Memory Processes
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-10">
            Memory is the process of maintaining information over time. It involves three fundamental stages that work like a computer's information processing system.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Encoding', icon: '📥', desc: 'The process of transforming information into a form that can be entered and retained by the memory system.' },
              { title: 'Storage', icon: '💾', desc: 'The process of retaining information in memory so that it can be used at a later time.' },
              { title: 'Retrieval', icon: '📤', desc: 'The process of accessing and bringing into conscious awareness information stored in memory.' }
            ].map((step, i) => (
              <div key={i} className="relative p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{step.icon}</div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                <div className="absolute top-4 right-4 w-8 h-8 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-xs font-black text-slate-300 dark:text-slate-700">0{i+1}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sensory, Short-term, Long-term */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 text-center uppercase tracking-widest">The Multi-Store Model</h3>
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex-1 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h5 className="font-bold text-blue-600 mb-2">Sensory Memory</h5>
                <p className="text-xs text-slate-500">Duration: 1-3 seconds. Large capacity. Holds raw sensory data.</p>
              </div>
              <div className="flex items-center justify-center text-slate-300">➜</div>
              <div className="flex-1 p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-pink-500 shadow-lg shadow-pink-500/10">
                <h5 className="font-bold text-pink-600 mb-2">Short-Term (Working)</h5>
                <p className="text-xs text-slate-500">Duration: 20-30 seconds. Capacity: 7 ± 2 items. Active processing.</p>
              </div>
              <div className="flex items-center justify-center text-slate-300">➜</div>
              <div className="flex-1 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h5 className="font-bold text-purple-600 mb-2">Long-Term Memory</h5>
                <p className="text-xs text-slate-500">Duration: Permanent. Capacity: Unlimited. Permanent storage.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4.2: Forgetting */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-pink-600 pl-4">
            4.2. Why We Forget
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30">
              <h4 className="font-bold text-red-900 dark:text-red-400 mb-3">Interference Theory</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Other memories get in the way of what we are trying to recall. (Proactive vs. Retroactive)</p>
            </div>
            <div className="p-6 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-3">Decay Theory</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Information fades over time if it is not used or rehearsed.</p>
            </div>
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Memory Challenge</h3>
              <p className="text-purple-100">Test your understanding of memory duration and capacity.</p>
            </div>
            <ExerciseQuestion 
              question="Which type of memory has a very large capacity but a duration of only about 1 to 3 seconds?"
              options={[
                'Short-Term Memory',
                'Sensory Memory',
                'Long-Term Memory',
                'Working Memory'
              ]}
              correctAnswer={1}
              explanation="Sensory memory holds a snapshot of the world for a very brief period before it is either passed to short-term memory or lost."
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter4;
