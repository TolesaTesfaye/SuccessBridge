import React from 'react';

const Chapter6: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 6
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          CATEGORICAL PROPOSITIONS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      </div>
      <div className="space-y-12 pb-20">
        {/* Lesson 1 */}
        <section className="prose dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">6.1</span>
              General Introduction
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-8">
              A <strong className="text-slate-900 dark:text-white">categorical proposition</strong> is a statement that relates two classes or categories. It asserts or denies that members of one category are included in another.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { l: 'A', t: 'Universal Affirmative', f: 'All S are P', e: 'All dogs are mammals.' },
                { l: 'E', t: 'Universal Negative', f: 'No S are P', e: 'No cats are reptiles.' },
                { l: 'I', t: 'Particular Affirmative', f: 'Some S are P', e: 'Some students are athletes.' },
                { l: 'O', t: 'Particular Negative', f: 'Some S are not P', e: 'Some birds are not flightless.' }
              ].map((p, i) => (
                <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center font-bold text-xs">{p.l}</span>
                    <h5 className="font-bold text-slate-900 dark:text-white text-xs uppercase">{p.t}</h5>
                  </div>
                  <p className="text-sm font-mono text-blue-500 mb-1">"{p.f}"</p>
                  <p className="text-[10px] text-slate-500 italic">{p.e}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lesson 2 - Attributes */}
        <section>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center text-sm">6.2</span>
            Attributes: Quality & Quantity
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-black text-blue-600 text-xs uppercase mb-4 tracking-widest">Quality</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Whether it affirms or denies membership.</p>
              <div className="space-y-2">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded text-[10px] flex justify-between"><span>Affirmative</span><span className="font-bold">A, I</span></div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded text-[10px] flex justify-between"><span>Negative</span><span className="font-bold">E, O</span></div>
              </div>
            </div>
            
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-black text-emerald-600 text-xs uppercase mb-4 tracking-widest">Quantity</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Whether it refers to all or some members.</p>
              <div className="space-y-2">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded text-[10px] flex justify-between"><span>Universal</span><span className="font-bold">A, E</span></div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded text-[10px] flex justify-between"><span>Particular</span><span className="font-bold">I, O</span></div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl">
              <h4 className="font-black text-blue-400 text-xs uppercase mb-4 tracking-widest">Distribution Rule</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-4 italic">"A term is distributed if the proposition makes a claim about every member of its class."</p>
              <div className="text-[10px] space-y-1 font-mono">
                <p>A: S Distributed</p>
                <p>E: Both Distributed</p>
                <p>I: Neither Distributed</p>
                <p>O: P Distributed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Lesson 3 - Venn Diagrams */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase">Venn Visualization</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: 'All S are P', d: 'Shade S outside P' },
              { t: 'No S are P', d: 'Shade overlap' },
              { t: 'Some S are P', d: 'X in overlap' },
              { t: 'Some S are not P', d: 'X in S outside P' }
            ].map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3 border-2 border-dashed border-slate-300 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Diagram</span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white mb-1">{v.t}</h5>
                <p className="text-[9px] text-slate-500 uppercase tracking-tighter">{v.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter6;
