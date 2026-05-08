import React, { useEffect } from 'react';

interface Chapter1Props {
  selectedSubtopic?: string;
}

const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic }) => {
  useEffect(() => {
    if (selectedSubtopic) {
      const subtopicId = selectedSubtopic.split('.').slice(0, 2).join('.').trim();
      const element = document.getElementById(`subtopic-${subtopicId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedSubtopic]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          GRAMMAR FUNDAMENTALS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-rose-600 to-red-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">1.1</span>
              Parts of Speech
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              The <strong>parts of speech</strong> are the building blocks of language. Every word belongs to one of eight categories.
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { name: 'Noun', desc: 'Person, place, thing', example: 'cat, city, joy' },
                { name: 'Verb', desc: 'Action or state', example: 'run, is, think' },
                { name: 'Adjective', desc: 'Describes noun', example: 'blue, happy, tall' },
                { name: 'Adverb', desc: 'Modifies verb', example: 'quickly, very, well' },
                { name: 'Pronoun', desc: 'Replaces noun', example: 'he, she, it, they' },
                { name: 'Preposition', desc: 'Shows relation', example: 'in, on, at, by' },
                { name: 'Conjunction', desc: 'Connects words', example: 'and, but, or, so' },
                { name: 'Interjection', desc: 'Expresses emotion', example: 'wow, oh, hey' }
              ].map((part, i) => (
                <div key={i} className="p-4 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 rounded-xl border border-rose-200 dark:border-rose-800">
                  <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-1">{part.name}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{part.desc}</p>
                  <code className="text-[10px] bg-white dark:bg-slate-800 px-2 py-1 rounded">{part.example}</code>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">1.2</span>
              Sentence Structure
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-rose-400 font-bold mb-3">Simple Sentence</h4>
                <p className="text-sm text-slate-400 mb-3">One independent clause with subject and predicate.</p>
                <div className="bg-white/10 rounded p-3 text-sm italic">The cat sleeps.</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-red-400 font-bold mb-3">Compound Sentence</h4>
                <p className="text-sm text-slate-400 mb-3">Two independent clauses joined by conjunction.</p>
                <div className="bg-white/10 rounded p-3 text-sm italic">The cat sleeps, and the dog barks.</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-pink-400 font-bold mb-3">Complex Sentence</h4>
                <p className="text-sm text-slate-400 mb-3">Independent clause + dependent clause.</p>
                <div className="bg-white/10 rounded p-3 text-sm italic">The cat sleeps when it's tired.</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-orange-400 font-bold mb-3">Compound-Complex</h4>
                <p className="text-sm text-slate-400 mb-3">Multiple independent + dependent clauses.</p>
                <div className="bg-white/10 rounded p-3 text-sm italic">The cat sleeps when tired, and the dog plays.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">1.3</span>
              Tenses
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              <strong>Tenses</strong> indicate when an action occurs: past, present, or future.
            </p>
            <div className="space-y-4">
              {[
                { tense: 'Simple Present', form: 'I walk', use: 'Habitual actions, facts' },
                { tense: 'Present Continuous', form: 'I am walking', use: 'Actions happening now' },
                { tense: 'Simple Past', form: 'I walked', use: 'Completed actions' },
                { tense: 'Past Continuous', form: 'I was walking', use: 'Ongoing past actions' },
                { tense: 'Simple Future', form: 'I will walk', use: 'Future actions' },
                { tense: 'Present Perfect', form: 'I have walked', use: 'Past actions with present relevance' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.tense}</h4>
                    <div className="flex gap-4 mt-1">
                      <code className="text-sm bg-white dark:bg-slate-900 px-3 py-1 rounded">{item.form}</code>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{item.use}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">1.4</span>
              Subject-Verb Agreement
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              The subject and verb must agree in number (singular or plural).
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <h4 className="font-bold text-green-900 dark:text-green-300 mb-3 flex items-center gap-2">
                  <span className="text-2xl">✓</span> Correct
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-slate-700 dark:text-slate-300">• The cat <strong>sleeps</strong> on the mat.</li>
                  <li className="text-slate-700 dark:text-slate-300">• The cats <strong>sleep</strong> on the mat.</li>
                  <li className="text-slate-700 dark:text-slate-300">• She <strong>writes</strong> every day.</li>
                  <li className="text-slate-700 dark:text-slate-300">• They <strong>write</strong> every day.</li>
                </ul>
              </div>
              <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <h4 className="font-bold text-red-900 dark:text-red-300 mb-3 flex items-center gap-2">
                  <span className="text-2xl">✗</span> Incorrect
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-slate-700 dark:text-slate-300 line-through">• The cat sleep on the mat.</li>
                  <li className="text-slate-700 dark:text-slate-300 line-through">• The cats sleeps on the mat.</li>
                  <li className="text-slate-700 dark:text-slate-300 line-through">• She write every day.</li>
                  <li className="text-slate-700 dark:text-slate-300 line-through">• They writes every day.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="subtopic-1.5" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">1.5</span>
              Active and Passive Voice
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Voice shows whether the subject performs or receives the action.
            </p>
            <div className="bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 rounded-xl p-6 border border-rose-200 dark:border-rose-800">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-3">Active Voice</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Subject performs the action (more direct and clear).</p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-sm italic">The chef <strong>cooks</strong> the meal.</p>
                    <p className="text-xs text-slate-500 mt-2">Subject → Verb → Object</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-red-900 dark:text-red-300 mb-3">Passive Voice</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Subject receives the action (emphasizes action/object).</p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-sm italic">The meal <strong>is cooked</strong> by the chef.</p>
                    <p className="text-xs text-slate-500 mt-2">Object → be + past participle → by + Subject</p>
                  </div>
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
