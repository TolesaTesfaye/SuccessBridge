import React from 'react';

const Chapter1: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          INTRODUCING PHILOSOPHY
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20">
        {/* Lesson 1 */}
        <section className="prose dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">L1</span>
              Meaning and Nature of Philosophy
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
              <strong className="text-slate-900 dark:text-white">Philosophy</strong> comes from the Greek words <span className="italic">"philos"</span> (love) and <span className="italic">"sophia"</span> (wisdom), meaning "love of wisdom."
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">Key Characteristics:</h4>
              <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
                {[
                  'Seeks fundamental truths about reality',
                  'Uses rational inquiry and critical thinking',
                  'Questions assumptions and examines beliefs',
                  'Explores values, knowledge, and reasoning'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Lesson 2 */}
        <section>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center text-sm">L2</span>
            Basic Features of Philosophy
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { t: 'Critical Thinking', d: 'Analyzing arguments and identifying assumptions systematically.', c: 'blue' },
              { t: 'Systematic Approach', d: 'Organized and methodical examination of problems.', c: 'purple' },
              { t: 'Rational Inquiry', d: 'Using reason and logic over emotion or tradition.', c: 'orange' },
              { t: 'Universal Questions', d: 'Addressing fundamental questions relevant to all humans.', c: 'red' }
            ].map((f, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all group">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{f.t}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lesson 3 & 4 */}
        <section className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
              <h4 className="text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-6">Core Branches</h4>
              <div className="space-y-8">
                <div>
                  <h5 className="text-xl font-bold mb-2">Metaphysics</h5>
                  <p className="text-slate-400 text-sm italic mb-4">"What is the nature of reality?"</p>
                  <ul className="text-xs text-slate-500 space-y-1 list-none p-0">
                    <li>• Existence and Essence</li>
                    <li>• Mind-Body Relationship</li>
                    <li>• Free Will vs Determinism</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-xl font-bold mb-2">Epistemology</h5>
                  <p className="text-slate-400 text-sm italic mb-4">"How do we know what we know?"</p>
                  <ul className="text-xs text-slate-500 space-y-1 list-none p-0">
                    <li>• Sources of Knowledge</li>
                    <li>• Truth and Justification</li>
                    <li>• Limits of Human Reason</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-l border-white/10 md:pl-12">
              <h4 className="text-pink-400 font-black text-xs uppercase tracking-[0.2em] mb-6">Values & Reasoning</h4>
              <div className="space-y-8">
                <div>
                  <h5 className="text-xl font-bold mb-2 text-pink-500/80">Axiology</h5>
                  <p className="text-slate-400 text-sm mb-4">The study of value, including <span className="text-white">Ethics</span> (moral) and <span className="text-white">Aesthetics</span> (beauty).</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="text-xl font-bold mb-2 text-blue-400">Logic</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    The study of correct reasoning and argumentation. Provides principles for distinguishing good arguments from bad ones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
