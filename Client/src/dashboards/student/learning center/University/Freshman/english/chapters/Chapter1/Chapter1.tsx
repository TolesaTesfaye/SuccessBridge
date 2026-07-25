import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
  useEffect(() => {
    if (selectedSubtopic) {
      const match = selectedSubtopic.match(/(\d+\.\d+)/);
      const subtopicId = match ? match[1] : selectedSubtopic.split('.').slice(0, 2).join('.').trim();
      const element = document.getElementById(`subtopic-${subtopicId}`) || document.getElementById(`subtopic-${selectedSubtopic}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedSubtopic]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative mb-6 md:mb-12 px-0 md:px-8 py-4 md:py-8">
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4 rounded-full">
          English Chapter 1 • Comprehensive Grammar Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          ENGLISH GRAMMAR FUNDAMENTALS & SYNTAX
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-rose-600 to-red-600 rounded-full" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Mastering English grammar requires a deep understanding of word functions, clause structures, tense aspects, agreement rules, and voice transformations. This comprehensive master guide provides granular rule breakdowns, structural formulas, OSASCOMP adjective orders, complete 12-tense matrices, 10 subject-verb agreement rules, active-to-passive voice transformations, and interactive practice exercises.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 1.1: Parts of Speech */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-rose-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>📚</span> 1.1. In-Depth Parts of Speech Breakdown & Classification
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Every English word fulfills a specific syntactic role. Below is the detailed breakdown of the 8 parts of speech and their sub-categories:
            </p>

            {/* Granular Parts Breakdown Cards */}
            <div className="space-y-4">
              {/* 1. Nouns */}
              <div className="p-5 bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800/60 space-y-3">
                <h3 className="font-bold text-rose-900 dark:text-rose-300 text-sm md:text-base">1. Nouns (Classification & Quantifiers)</h3>
                <div className="grid md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Common vs Proper Nouns</strong>
                    Common: <em>city, country, professor</em>.<br/>Proper (capitalized): <em>Addis Ababa, Ethiopia, Dr. Thorne</em>.
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Concrete vs Abstract Nouns</strong>
                    Concrete (perceivable): <em>microscope, book, desk</em>.<br/>Abstract (concepts): <em>integrity, freedom, courage</em>.
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Countable vs Uncountable (Mass)</strong>
                    Countable (use <em>many / few</em>): <em>books, students</em>.<br/>Uncountable (use <em>much / little</em>): <em>information, water, research</em>.
                  </div>
                </div>
              </div>

              {/* 2. Pronouns */}
              <div className="p-5 bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800/60 space-y-3">
                <h3 className="font-bold text-rose-900 dark:text-rose-300 text-sm md:text-base">2. Pronouns (System & Case Matrix)</h3>
                <div className="grid md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Subject Case</strong>
                    <em>I, you, he, she, it, we, they, who</em>.<br/><span className="text-[11px] text-slate-500">Subject of the verb.</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Object Case</strong>
                    <em>me, you, him, her, it, us, them, whom</em>.<br/><span className="text-[11px] text-slate-500">Receiver of verb/prep.</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Possessive Case</strong>
                    Adj: <em>my, his, their</em>.<br/>Pronoun: <em>mine, his, theirs</em>.
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Relative & Indefinite</strong>
                    Relative: <em>who, which, that</em>.<br/>Indefinite: <em>everyone, each, none</em>.
                  </div>
                </div>
              </div>

              {/* 3. Verbs & Auxiliaries */}
              <div className="p-5 bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800/60 space-y-3">
                <h3 className="font-bold text-rose-900 dark:text-rose-300 text-sm md:text-base">3. Verbs & Modal Auxiliaries</h3>
                <div className="grid md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Transitive vs Intransitive</strong>
                    Transitive (requires object): <em>"She wrote a thesis."</em><br/>Intransitive (no object): <em>"The baby slept."</em>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Linking Verbs</strong>
                    Connect subject to state/descriptor: <em>be, seem, appear, become, feel, smell</em>. Ex: <em>"He seems confident."</em>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Modal Auxiliaries</strong>
                    Express necessity/possibility: <em>can, could, may, might, must, should, would</em>. Followed by base verb!
                  </div>
                </div>
              </div>

              {/* 4. Adjectives & OSASCOMP Rule */}
              <div className="p-5 bg-rose-50/60 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800/60 space-y-3">
                <h3 className="font-bold text-rose-900 dark:text-rose-300 text-sm md:text-base">4. Adjectives & The OSASCOMP Order Rule</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  When multiple adjectives modify a single noun, follow the strict <strong>OSASCOMP</strong> order:
                </p>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs text-center font-bold text-rose-700 dark:text-rose-300 border">
                  Opinion → Size → Age → Shape → Color → Origin → Material → Purpose + NOUN
                </div>
                <p className="text-xs text-slate-500 italic">
                  Example: <em>"A <strong>beautiful</strong> (Opinion) <strong>large</strong> (Size) <strong>ancient</strong> (Age) <strong>circular</strong> (Shape) <strong>black</strong> (Color) <strong>Ethiopian</strong> (Origin) <strong>wooden</strong> (Material) <strong>writing</strong> (Purpose) desk."</em>
                </p>
              </div>

              {/* 5-8. Adverbs, Prepositions, Conjunctions */}
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-2">
                  <h4 className="font-bold text-rose-900 dark:text-rose-300 text-sm">5. Adverbs & Conjunctive Adverbs</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Modifies verbs, adjectives, or other adverbs (answers <em>how, when, where, to what extent</em>).
                  </p>
                  <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded font-mono">
                    <strong>Conjunctive Adverbs:</strong> <em>however, furthermore, therefore, nevertheless, consequently</em>. Requires semicolon before and comma after when connecting independent clauses!
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-2">
                  <h4 className="font-bold text-rose-900 dark:text-rose-300 text-sm">6. Prepositions & Dependent Combinations</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Shows spatial, temporal, or logical relationship between noun and rest of sentence.
                  </p>
                  <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded font-mono">
                    <strong>Dependent Prepositions:</strong> <em>depend on, interested in, capable of, compliant with, responsible for</em>.
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: OSASCOMP Adjective Order</h4>
                <ExerciseQuestion 
                  question="Select the sentence that correctly follows the OSASCOMP adjective order rule:"
                  options={[
                    'He bought a lovely small antique rectangular brown wooden dining table.',
                    'He bought a wooden brown small antique rectangular lovely dining table.',
                    'He bought a small lovely antique brown rectangular wooden dining table.',
                    'He bought a rectangular small antique brown lovely wooden dining table.'
                  ]}
                  correctAnswer={0}
                  explanation="Following OSASCOMP: Opinion ('lovely') → Size ('small') → Age ('antique') → Shape ('rectangular') → Color ('brown') → Material ('wooden') → Purpose ('dining') + NOUN ('table')."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.2: Sentence Structure */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-rose-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>⚙️</span> 1.2. Sentence Mechanics, Clause Types & Punctuation Errors
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Sentences are built from <strong>Independent Clauses</strong> (express a complete thought) and <strong>Dependent Clauses</strong> (cannot stand alone).
            </p>

            {/* Sentence Types Grid */}
            <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-800 shadow-sm space-y-2">
                <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">1. Simple Sentence</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs">1 Independent Clause.</p>
                <div className="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-xl font-mono text-xs italic">
                  "The university library opens at 8:00 AM."
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-800 shadow-sm space-y-2">
                <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">2. Compound Sentence</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs">2+ Independent Clauses joined by FANBOYS (for, and, nor, but, or, yet, so) or semicolon.</p>
                <div className="p-3 bg-rose-50 dark:bg-rose-900/30 rounded-xl font-mono text-xs italic">
                  "The exam was challenging, but the students performed exceptionally well."
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-800 shadow-sm space-y-2">
                <span className="font-bold text-red-900 dark:text-red-300 text-sm block">3. Complex Sentence</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs">1 Independent Clause + 1+ Dependent Clauses (introduced by although, because, since, when).</p>
                <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl font-mono text-xs italic">
                  "Although it rained heavily, the outdoor lecture continued."
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-800 shadow-sm space-y-2">
                <span className="font-bold text-red-900 dark:text-red-300 text-sm block">4. Compound-Complex Sentence</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs">2+ Independent Clauses + 1+ Dependent Clauses.</p>
                <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl font-mono text-xs italic">
                  "When the bell rang, students submitted their papers, and the professor left."
                </div>
              </div>
            </div>

            {/* Punctuation Error Pitfalls Box */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <span>⚠️</span> Common Sentence Structure Errors
              </h3>
              <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200">
                  <strong className="text-rose-900 dark:text-rose-300 block mb-1">Comma Splice Error</strong>
                  Joining two independent clauses with only a comma.<br/>
                  <span className="text-rose-600 line-through">"I studied hard, I passed."</span><br/>
                  <span className="text-emerald-600 font-bold">Fix: "I studied hard; I passed." OR "I studied hard, so I passed."</span>
                </div>
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200">
                  <strong className="text-rose-900 dark:text-rose-300 block mb-1">Fused (Run-on) Sentence</strong>
                  Running two independent clauses together with zero punctuation.<br/>
                  <span className="text-rose-600 line-through">"She wrote the paper he edited it."</span><br/>
                  <span className="text-emerald-600 font-bold">Fix: "She wrote the paper; he edited it."</span>
                </div>
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200">
                  <strong className="text-rose-900 dark:text-rose-300 block mb-1">Sentence Fragment</strong>
                  Incomplete thought lacking a subject or main verb.<br/>
                  <span className="text-rose-600 line-through">"Because the lecture was long."</span><br/>
                  <span className="text-emerald-600 font-bold">Fix: "Because the lecture was long, we took notes."</span>
                </div>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Fixing Comma Splice Errors</h4>
                <ExerciseQuestion 
                  question="Identify the grammatically correct correction for the comma splice: 'The semester ended, students went home for vacation.'"
                  options={[
                    'The semester ended; students went home for vacation.',
                    'The semester ended, students went home for vacation.',
                    'The semester ended students went home for vacation.',
                    'The semester ended, because students went home for vacation.'
                  ]}
                  correctAnswer={0}
                  explanation="A semicolon correctly connects two closely related independent clauses without creating a comma splice."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.3: All 12 Tenses */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-rose-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>⏰</span> 1.3. Complete 12-Tense & Aspect System Matrix
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              English verb tenses combine 3 time frames (Present, Past, Future) with 4 aspects (Simple, Continuous, Perfect, Perfect Continuous):
            </p>

            {/* Complete 12 Tenses Table */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>📊</span> Complete 12-Tense Academic Formula & Usage Matrix
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                      <th className="p-2.5">Tense Name</th>
                      <th className="p-2.5">Structural Formula</th>
                      <th className="p-2.5">Example Sentence</th>
                      <th className="p-2.5">Academic Usage Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="p-2.5 font-bold font-sans">1. Simple Present</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + V₁(s/es)</td>
                      <td className="p-2.5 italic">She writes reports.</td>
                      <td className="p-2.5 font-sans">General truths, facts, literature analysis.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">2. Present Continuous</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + am/is/are + V-ing</td>
                      <td className="p-2.5 italic">She is writing a report.</td>
                      <td className="p-2.5 font-sans">Action happening right now, current trends.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">3. Present Perfect</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + has/have + V₃</td>
                      <td className="p-2.5 italic">She has written three reports.</td>
                      <td className="p-2.5 font-sans">Past action with current relevance.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">4. Present Perf. Cont.</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + has/have been + V-ing</td>
                      <td className="p-2.5 italic">She has been writing for hours.</td>
                      <td className="p-2.5 font-sans">Ongoing duration started in past up to now.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">5. Simple Past</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + V₂</td>
                      <td className="p-2.5 italic">She wrote a report yesterday.</td>
                      <td className="p-2.5 font-sans">Completed past action at specified time.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">6. Past Continuous</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + was/were + V-ing</td>
                      <td className="p-2.5 italic">She was writing when I entered.</td>
                      <td className="p-2.5 font-sans">Ongoing past action interrupted by another.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">7. Past Perfect</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + had + V₃</td>
                      <td className="p-2.5 italic">She had written it before 5 PM.</td>
                      <td className="p-2.5 font-sans">Action completed PRIOR to another past event.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">8. Past Perf. Cont.</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + had been + V-ing</td>
                      <td className="p-2.5 italic">She had been writing for two hours.</td>
                      <td className="p-2.5 font-sans">Past continuous duration prior to a past point.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">9. Simple Future</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + will + V₁</td>
                      <td className="p-2.5 italic">She will write a report tomorrow.</td>
                      <td className="p-2.5 font-sans">Predictions, spontaneous decisions.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">10. Future Continuous</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + will be + V-ing</td>
                      <td className="p-2.5 italic">She will be writing at 10 AM.</td>
                      <td className="p-2.5 font-sans">Ongoing action at a specific future time.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">11. Future Perfect</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + will have + V₃</td>
                      <td className="p-2.5 italic">She will have written it by Friday.</td>
                      <td className="p-2.5 font-sans">Action that will be completed by a future deadline.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">12. Future Perf. Cont.</td>
                      <td className="p-2.5 text-rose-600 font-bold">S + will have been + V-ing</td>
                      <td className="p-2.5 italic">She will have been writing for a year.</td>
                      <td className="p-2.5 font-sans">Future duration measured up to a future point.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 3: Future Perfect Deadline Usage</h4>
                <ExerciseQuestion 
                  question="By June 2027, Dr. Thorne _____ his longitudinal study on renewable energy."
                  options={[
                    'will have completed (Future Perfect - completed before a future deadline)',
                    'will complete',
                    'has completed',
                    'would complete'
                  ]}
                  correctAnswer={0}
                  explanation="The signal phrase 'By June 2027' sets a future deadline before which an action will be finished, requiring the Future Perfect tense ('will have completed')."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.4: Subject-Verb Agreement (10 Rules) */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-rose-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>⚖️</span> 1.4. The 10 Essential Subject-Verb Agreement Rules
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Master these 10 definitive rules governing subject-verb agreement in formal academic English:
            </p>

            {/* 10 Rules Cards */}
            <div className="grid md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-1">
                <strong className="text-rose-900 dark:text-rose-300 font-bold block text-sm">Rule 1: Intervening Prepositional Phrases</strong>
                <p className="text-slate-600 dark:text-slate-300">Ignore words between subject and verb (e.g. <em>of, as well as, along with</em>).</p>
                <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded font-mono text-[11px]">
                  "The box of chocolates <strong>is</strong> on the table." (Subject = box)
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-1">
                <strong className="text-rose-900 dark:text-rose-300 font-bold block text-sm">Rule 2: Either / Or & Neither / Nor</strong>
                <p className="text-slate-600 dark:text-slate-300">Verb agrees with the subject <em>closest</em> to the verb!</p>
                <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded font-mono text-[11px]">
                  "Neither the teacher nor the <strong>students are</strong> present."
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-1">
                <strong className="text-rose-900 dark:text-rose-300 font-bold block text-sm">Rule 3: Always Singular Indefinite Pronouns</strong>
                <p className="text-slate-600 dark:text-slate-300"><em>Everyone, somebody, anyone, nobody, each, either, neither</em> take singular verbs.</p>
                <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded font-mono text-[11px]">
                  "Everyone <strong>has</strong> submitted their assignment."
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-1">
                <strong className="text-rose-900 dark:text-rose-300 font-bold block text-sm">Rule 4: Variable Indefinite Pronouns (SANAM)</strong>
                <p className="text-slate-600 dark:text-slate-300"><em>Some, All, None, Any, Most</em> depend on the noun in the <em>of</em> phrase!</p>
                <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded font-mono text-[11px]">
                  "Some of the <strong>pie is</strong> gone." vs "Some of the <strong>pies are</strong> gone."
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-1">
                <strong className="text-rose-900 dark:text-rose-300 font-bold block text-sm">Rule 5: Collective Nouns</strong>
                <p className="text-slate-600 dark:text-slate-300"><em>Team, committee, audience</em> take singular verb when acting as a unified unit.</p>
                <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded font-mono text-[11px]">
                  "The committee <strong>meets</strong> every Monday."
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-1">
                <strong className="text-rose-900 dark:text-rose-300 font-bold block text-sm">Rule 6: Inverted Sentences (Here / There)</strong>
                <p className="text-slate-600 dark:text-slate-300">Subject comes AFTER the verb in sentences starting with <em>Here</em> or <em>There</em>.</p>
                <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded font-mono text-[11px]">
                  "There <strong>are three distinct reasons</strong> for this result."
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-1">
                <strong className="text-rose-900 dark:text-rose-300 font-bold block text-sm">Rule 7: Expressions of Quantity / Distance</strong>
                <p className="text-slate-600 dark:text-slate-300">Amounts of money, periods of time, and distances take singular verbs.</p>
                <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded font-mono text-[11px]">
                  "Ten kilometers <strong>is</strong> a long distance to walk."
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-1">
                <strong className="text-rose-900 dark:text-rose-300 font-bold block text-sm">Rule 8: Plural Form Nouns with Singular Meaning</strong>
                <p className="text-slate-600 dark:text-slate-300">Subjects ending in <em>-s</em> like <em>Mathematics, Physics, News, Economics</em> take singular verbs.</p>
                <div className="p-2 bg-rose-50 dark:bg-rose-900/30 rounded font-mono text-[11px]">
                  "Mathematics <strong>is</strong> a core subject."
                </div>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 4: Agreement in Inverted Sentences</h4>
                <ExerciseQuestion 
                  question="Choose the sentence with correct subject-verb agreement:"
                  options={[
                    'There exist multiple valid interpretations of this poem.',
                    'There exists multiple valid interpretations of this poem.',
                    'There is multiple valid interpretations of this poem.',
                    'There has been multiple valid interpretations of this poem.'
                  ]}
                  correctAnswer={0}
                  explanation="In an inverted sentence starting with 'There', the subject is 'multiple valid interpretations' (plural). Therefore, the plural verb 'exist' is required."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.5: Active and Passive Voice */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-rose-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>📢</span> 1.5. Active & Passive Voice Transformation Matrix
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              To convert an Active sentence to Passive voice:
              <br/>1. Move direct object to subject position.
              <br/>2. Change main verb to <strong>be + V₃ (Past Participle)</strong> matching original tense.
              <br/>3. Move original subject to <em>by + agent</em> phrase (or omit if agent is unknown/irrelevant).
            </p>

            {/* Voice Tense Transformation Table */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🔄</span> Tense-by-Tense Active to Passive Transformation Chart
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                      <th className="p-2.5">Tense</th>
                      <th className="p-2.5">Active Voice Example</th>
                      <th className="p-2.5">Passive Voice Transformation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="p-2.5 font-bold font-sans">Simple Present</td>
                      <td className="p-2.5">The chef cooks the meal.</td>
                      <td className="p-2.5 text-rose-600 font-bold">The meal is cooked by the chef.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">Present Continuous</td>
                      <td className="p-2.5">The chef is cooking the meal.</td>
                      <td className="p-2.5 text-rose-600 font-bold">The meal is being cooked by the chef.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">Present Perfect</td>
                      <td className="p-2.5">The chef has cooked the meal.</td>
                      <td className="p-2.5 text-rose-600 font-bold">The meal has been cooked by the chef.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">Simple Past</td>
                      <td className="p-2.5">The chef cooked the meal.</td>
                      <td className="p-2.5 text-rose-600 font-bold">The meal was cooked by the chef.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">Past Continuous</td>
                      <td className="p-2.5">The chef was cooking the meal.</td>
                      <td className="p-2.5 text-rose-600 font-bold">The meal was being cooked by the chef.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">Past Perfect</td>
                      <td className="p-2.5">The chef had cooked the meal.</td>
                      <td className="p-2.5 text-rose-600 font-bold">The meal had been cooked by the chef.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">Simple Future</td>
                      <td className="p-2.5">The chef will cook the meal.</td>
                      <td className="p-2.5 text-rose-600 font-bold">The meal will be cooked by the chef.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">Modals (can/must/should)</td>
                      <td className="p-2.5">The chef must cook the meal.</td>
                      <td className="p-2.5 text-rose-600 font-bold">The meal must be cooked by the chef.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 5: Modal Passive Conversion</h4>
                <ExerciseQuestion 
                  question="Convert to Passive Voice: 'Students must submit their assignments by Friday.'"
                  options={[
                    'Assignments must be submitted by students by Friday.',
                    'Assignments must submitted by students by Friday.',
                    'Assignments are submitted by Friday by students.',
                    'Assignments had been submitted by students by Friday.'
                  ]}
                  correctAnswer={0}
                  explanation="Modal passive formula: Object ('Assignments') + Modal ('must') + 'be' + Past Participle ('submitted') + 'by students by Friday'."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
          <button
            disabled
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 text-slate-400 cursor-not-allowed rounded-lg font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 2
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter1;
