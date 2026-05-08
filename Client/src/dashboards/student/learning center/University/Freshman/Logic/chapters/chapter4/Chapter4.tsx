import React from 'react';

const Chapter4: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 4
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          BASIC CONCEPTS OF CRITICAL THINKING
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20">
        <section className="prose dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">4.1</span>
              Meaning of Critical Thinking
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
              Critical thinking is the intellectually disciplined process of actively and skillfully conceptualizing, applying, analyzing, synthesizing, and evaluating information gathered from observation, experience, reflection, reasoning, or communication.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-4 uppercase tracking-widest text-xs">Core Elements:</h4>
              <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
                {[
                  'Analysis: Breaking down information into parts',
                  'Evaluation: Assessing credibility and relevance',
                  'Inference: Drawing reasonable conclusions',
                  'Explanation: Articulating reasoning clearly',
                  'Self-regulation: Correcting one\'s own thinking'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="relative">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center text-sm">4.2</span>
            Standards of Critical Thinking
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: 'Clarity', d: 'Easily understood and elaborated.' },
              { t: 'Accuracy', d: 'Verified, factual, and free from error.' },
              { t: 'Precision', d: 'Exact details and specific info.' },
              { t: 'Relevance', d: 'Directly relates to the issue.' },
              { t: 'Depth', d: 'Addresses complexities thoroughly.' },
              { t: 'Breadth', d: 'Considers multiple viewpoints.' },
              { t: 'Logic', d: 'Arguments are well-reasoned.' },
              { t: 'Fairness', d: 'Thinking without bias or interest.' }
            ].map((s, i) => (
              <div key={i} className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 transition-colors">
                <h5 className="font-black text-blue-600 dark:text-blue-400 text-xs mb-2 uppercase tracking-tighter">{s.t}</h5>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] leading-relaxed uppercase font-bold">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
          <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Characteristics of Thinkers</h3>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-4">Intellectual Virtues</h4>
              <ul className="space-y-3 list-none p-0">
                {['Intellectual Curiosity', 'Intellectual Courage', 'Intellectual Empathy', 'Intellectual Integrity', 'Intellectual Perseverance', 'Fair-mindedness'].map((v, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-4">Traits to Avoid</h4>
              <ul className="space-y-2 list-none p-0">
                {['Intellectual Arrogance', 'Intellectual Cowardice', 'Intellectual Conformity', 'Egocentrism', 'Wishful Thinking'].map((t, i) => (
                  <li key={i} className="text-xs text-slate-500 font-medium line-through decoration-red-500/50">{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter4;
