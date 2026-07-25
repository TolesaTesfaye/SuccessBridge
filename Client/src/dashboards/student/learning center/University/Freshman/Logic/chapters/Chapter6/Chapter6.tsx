import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter6Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter6: React.FC<Chapter6Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Chapter 6
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          CATEGORICAL PROPOSITIONS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Welcome to Chapter 6! Categorical propositions are the building blocks of deductive syllogistic logic. In this chapter, you will master the four standard forms (A, E, I, O), quality, quantity, distribution, Venn diagrams, the Traditional Square of Opposition, and immediate inferences.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 6.1: General Introduction */}
        <section id="subtopic-6.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            6.1. General Introduction to Categorical Propositions
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>categorical proposition</strong> is a statement that asserts a relationship between two categories or classes of objects: a <strong>Subject Class (S)</strong> and a <strong>Predicate Class (P)</strong>.
            </p>

            <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 mb-4">
              <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-3">The Four Structural Components:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs md:text-sm">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 rounded-lg">
                  <span className="block font-bold text-xs uppercase mb-1">1. Quantifier</span>
                  "All", "No", "Some"
                </div>
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200 rounded-lg">
                  <span className="block font-bold text-xs uppercase mb-1">2. Subject Term (S)</span>
                  "Dogs", "Doctors"
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-200 rounded-lg">
                  <span className="block font-bold text-xs uppercase mb-1">3. Copula</span>
                  "are", "are not"
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 rounded-lg">
                  <span className="block font-bold text-xs uppercase mb-1">4. Predicate Term (P)</span>
                  "Mammals", "Heroes"
                </div>
              </div>
            </div>

            <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">The Four Standard Forms (A, E, I, O)</h3>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  code: 'A',
                  name: 'Universal Affirmative',
                  form: 'All S are P',
                  examples: [
                    'Example 1: "All cats are mammals."',
                    'Example 2: "All triangles are three-sided polygons."'
                  ],
                  color: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                },
                {
                  code: 'E',
                  name: 'Universal Negative',
                  form: 'No S are P',
                  examples: [
                    'Example 1: "No reptiles are birds."',
                    'Example 2: "No circles are squares."'
                  ],
                  color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                },
                {
                  code: 'I',
                  name: 'Particular Affirmative',
                  form: 'Some S are P',
                  examples: [
                    'Example 1: "Some students are athletes."',
                    'Example 2: "Some doctors are surgeons."'
                  ],
                  color: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                },
                {
                  code: 'O',
                  name: 'Particular Negative',
                  form: 'Some S are not P',
                  examples: [
                    'Example 1: "Some fruits are not apples."',
                    'Example 2: "Some politicians are not lawyers."'
                  ],
                  color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                }
              ].map((item, i) => (
                <div key={i} className={`p-4 md:p-6 border-l-4 rounded-xl ${item.color}`}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white">
                      Type {item.code}: {item.name}
                    </h4>
                    <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded font-mono font-bold text-xs">
                      {item.form}
                    </span>
                  </div>
                  <div className="space-y-1 mt-3 bg-white/70 dark:bg-slate-900/70 p-2.5 rounded text-xs text-slate-700 dark:text-slate-300 italic">
                    {item.examples.map((ex, idx) => (
                      <p key={idx}>{ex}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Note */}
            <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
              <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
                <span>📝</span> Detail Note: Mnemonic for A, E, I, O
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                The letters come from the Latin words <strong>AFFIRMO</strong> (I affirm → <strong>A</strong> & <strong>I</strong>) and <strong>NEGO</strong> (I deny → <strong>E</strong> & <strong>O</strong>). First vowels represent universal; second vowels represent particular!
              </p>
            </div>

            {/* Real-World Example */}
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
              <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
                <span>🌍</span> Real-World Example: SQL & Database Queries
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Database queries reflect categorical propositions! A query like `SELECT * FROM Users WHERE status = 'Active'` asserts an **A-proposition** (All returned records are Active users), while `WHERE status != 'Active'` forms an **E-proposition**.
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Practice Question 1: Identifying Form</h4>
                <ExerciseQuestion 
                  question="What is the standard categorical form of the statement: 'No triangles are four-sided figures'?"
                  options={[
                    'A (Universal Affirmative)',
                    'E (Universal Negative)',
                    'I (Particular Affirmative)',
                    'O (Particular Negative)'
                  ]}
                  correctAnswer={1}
                  explanation="'No S are P' is the standard form of an E-proposition (Universal Negative)."
                />
              </div>

              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Practice Question 2: Components of Propositions</h4>
                <ExerciseQuestion 
                  question="In the proposition 'Some scientists are Nobel laureates', what word acts as the Quantifier?"
                  options={[
                    'Some',
                    'Scientists',
                    'are',
                    'Nobel laureates'
                  ]}
                  correctAnswer={0}
                  explanation="'Some' specifies the quantity of the subject class, making it the Quantifier."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.2: Quality, Quantity, and Distribution */}
        <section id="subtopic-6.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            6.2. Attributes of Categorical Propositions (Quality, Quantity, and Distribution)
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Every categorical proposition has three fundamental attributes: <strong>Quality</strong>, <strong>Quantity</strong>, and <strong>Distribution</strong> of terms.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-blue-500 shadow-sm">
              <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-2">1. Quality</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                Refers to whether the proposition affirms or denies class membership.
              </p>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc ml-4">
                <li><strong>Affirmative:</strong> A ("All S are P"), I ("Some S are P").</li>
                <li><strong>Negative:</strong> E ("No S are P"), O ("Some S are not P").</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-indigo-500 shadow-sm">
              <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-2">2. Quantity</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                Refers to whether the proposition makes a claim about all members or some members.
              </p>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc ml-4">
                <li><strong>Universal:</strong> A ("All S are P"), E ("No S are P").</li>
                <li><strong>Particular:</strong> I ("Some S are P"), O ("Some S are not P").</li>
              </ul>
            </div>
          </div>

          {/* Distribution Section */}
          <div className="p-6 border-2 border-indigo-200 dark:border-indigo-900 rounded-2xl bg-white dark:bg-slate-900 mb-8">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3">3. Distribution of Terms</h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              A term is <strong>distributed</strong> if the proposition makes a claim about <em>every single member</em> of that term's class.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm text-left text-slate-700 dark:text-slate-300 border-collapse">
                <thead>
                  <tr className="bg-indigo-50 dark:bg-indigo-900/40 text-slate-900 dark:text-white border-b border-indigo-200 dark:border-indigo-800">
                    <th className="p-3">Type</th>
                    <th className="p-3">Form</th>
                    <th className="p-3">Subject (S)</th>
                    <th className="p-3">Predicate (P)</th>
                    <th className="p-3">Mnemonic Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="p-3 font-bold text-blue-600">A</td>
                    <td className="p-3 font-mono">All S are P</td>
                    <td className="p-3 font-bold text-emerald-600">Distributed</td>
                    <td className="p-3 text-red-500">Un-distributed</td>
                    <td className="p-3 italic">"All dogs are animals" (tells us about ALL dogs, not all animals).</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="p-3 font-bold text-indigo-600">E</td>
                    <td className="p-3 font-mono">No S are P</td>
                    <td className="p-3 font-bold text-emerald-600">Distributed</td>
                    <td className="p-3 font-bold text-emerald-600">Distributed</td>
                    <td className="p-3 italic">"No cats are dogs" (separates ALL cats from ALL dogs completely).</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="p-3 font-bold text-purple-600">I</td>
                    <td className="p-3 font-mono">Some S are P</td>
                    <td className="p-3 text-red-500">Un-distributed</td>
                    <td className="p-3 text-red-500">Un-distributed</td>
                    <td className="p-3 italic">"Some doctors are golfers" (tells us about SOME of both classes).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-600">O</td>
                    <td className="p-3 font-mono">Some S are not P</td>
                    <td className="p-3 text-red-500">Un-distributed</td>
                    <td className="p-3 font-bold text-emerald-600">Distributed</td>
                    <td className="p-3 italic">"Some birds are not eagles" (excludes some birds from EVERY eagle).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Distribution Rule Mnemonic
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Remember <strong>"Unprepared Students Never Pass"</strong> or <strong>"As In Each Both"</strong>:
              <br/>
              • <strong>A</strong> distributes <strong>S</strong>ubject.
              <br/>
              • <strong>E</strong> distributes <strong>B</strong>oth (Subject & Predicate).
              <br/>
              • <strong>I</strong> distributes <strong>N</strong>either.
              <br/>
              • <strong>O</strong> distributes <strong>P</strong>redicate.
            </p>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Legal Contracts & Scope
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              In contract law, an **E-proposition** ("No employee shall disclose company secrets") distributes both subject and predicate, creating an absolute ban with zero exceptions for all employees and all secrets.
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Distribution in A Propositions</h4>
              <ExerciseQuestion 
                question="In an A-proposition ('All S are P'), which terms are distributed?"
                options={[
                  'Subject term only',
                  'Predicate term only',
                  'Both Subject and Predicate terms',
                  'Neither term is distributed'
                ]}
                correctAnswer={0}
                explanation="An A-proposition distributes the Subject term ONLY because it makes a claim about all members of S, but not all members of P."
              />
            </div>

            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Distribution in E Propositions</h4>
              <ExerciseQuestion 
                question="Which categorical proposition form distributes BOTH the Subject and Predicate terms?"
                options={[
                  'A (Universal Affirmative)',
                  'E (Universal Negative)',
                  'I (Particular Affirmative)',
                  'O (Particular Negative)'
                ]}
                correctAnswer={1}
                explanation="An E-proposition ('No S are P') distributes BOTH terms because it completely separates all members of S from all members of P."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.3: Traditional Square of Opposition */}
        <section id="subtopic-6.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            6.3. Venn Diagrams and Traditional Square of Opposition
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            The <strong>Traditional Square of Opposition</strong> illustrates the necessary logical relationships between the four standard propositions (A, E, I, O) when assuming existential import (Aristotelian Standpoint).
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold text-sm md:text-base text-blue-600 mb-2">1. Contradictory (A & O, E & I)</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                Must have <strong>opposite truth values</strong>. If one is True, the other MUST be False, and vice-versa.
              </p>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
                Example 1: If "All S are P" (A) is TRUE, then "Some S are not P" (O) MUST be FALSE.
                <br/>
                Example 2: If "No S are P" (E) is FALSE, then "Some S are P" (I) MUST be TRUE.
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold text-sm md:text-base text-indigo-600 mb-2">2. Contrary (A & E)</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                Cannot <strong>both be True</strong>, but CAN both be False.
              </p>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded text-xs">
                Example 1: If "All S are P" (A) is TRUE, then "No S are P" (E) MUST be FALSE.
                <br/>
                Example 2: If "All S are P" (A) is FALSE, the truth value of "No S are P" (E) is UNDETERMINED.
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold text-sm md:text-base text-purple-600 mb-2">3. Subcontrary (I & O)</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                Cannot <strong>both be False</strong>, but CAN both be True.
              </p>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-xs">
                Example 1: If "Some S are P" (I) is FALSE, then "Some S are not P" (O) MUST be TRUE.
                <br/>
                Example 2: Both "Some students are athletes" (I) and "Some students are not athletes" (O) are TRUE.
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold text-sm md:text-base text-emerald-600 mb-2">4. Subalternation (A → I, E → O)</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                Truth flows <strong>downward</strong> (Universal True → Particular True). Falsity flows <strong>upward</strong> (Particular False → Universal False).
              </p>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded text-xs">
                Example 1: If "All S are P" (A) is TRUE, then "Some S are P" (I) MUST be TRUE.
                <br/>
                Example 2: If "Some S are P" (I) is FALSE, then "All S are P" (A) MUST be FALSE.
              </div>
            </div>
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Aristotelian vs Boolean Standpoint
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              The <strong>Aristotelian standpoint</strong> assumes universal statements have <em>existential import</em> (the subject class actually exists in reality). The modern <strong>Boolean standpoint</strong> makes no assumption of existence for universal statements (A & E), recognizing only Contradictory relations as valid for non-existent subjects.
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Contradictory Relation</h4>
              <ExerciseQuestion 
                question="If the statement 'All dogs are animals' (A) is TRUE, what is the truth value of 'Some dogs are not animals' (O)?"
                options={[
                  'True',
                  'False',
                  'Undetermined',
                  'Probable'
                ]}
                correctAnswer={1}
                explanation="A and O propositions are CONTRADICTORY. If A is True, O MUST be False."
              />
            </div>

            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Contrary Relation</h4>
              <ExerciseQuestion 
                question="According to the Traditional Square of Opposition, can two Contrary propositions (A and E) both be True at the same time?"
                options={[
                  'Yes, always',
                  'No, never',
                  'Only if the subject is empty',
                  'Sometimes'
                ]}
                correctAnswer={1}
                explanation="CONTRARY propositions (A and E) CANNOT both be True at the same time. If one is True, the other MUST be False."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.4: Evaluating Immediate Inferences */}
        <section id="subtopic-6.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            6.4. Evaluating Immediate Inferences (Conversion, Obversion, Contraposition)
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            An <strong>immediate inference</strong> is an argument consisting of a single premise and a single conclusion. The three primary operations are:
          </p>

          <div className="space-y-6 mb-8">
            {[
              {
                title: '1. Conversion (Switch S and P)',
                desc: 'Switching the subject term with the predicate term.',
                validity: 'VALID for E and I propositions. ILLICIT (Invalid) for A and O propositions.',
                examples: [
                  'Example 1 (Valid E Conversion): "No cats are dogs" → "No dogs are cats." (Valid)',
                  'Example 2 (Illicit A Conversion): "All dogs are animals" → "All animals are dogs." (FALSE / Invalid!)'
                ]
              },
              {
                title: '2. Obversion (Change Quality + Complement Predicate)',
                desc: 'Changing the quality (affirmative to negative or vice versa) and replacing the predicate term with its non-complement (e.g. "P" → "non-P").',
                validity: 'VALID for ALL four standard forms (A, E, I, O). Logically equivalent.',
                examples: [
                  'Example 1 (A Obversion): "All dogs are animals" → "No dogs are non-animals." (Valid & Logically Equivalent)',
                  'Example 2 (I Obversion): "Some students are athletes" → "Some students are not non-athletes." (Valid)'
                ]
              },
              {
                title: '3. Contraposition (Switch S and P + Complement Both)',
                desc: 'Switching the subject and predicate terms AND replacing both with their complements ("non-S" and "non-P").',
                validity: 'VALID for A and O propositions. ILLICIT (Invalid) for E and I propositions.',
                examples: [
                  'Example 1 (Valid A Contraposition): "All cats are mammals" → "All non-mammals are non-cats." (Valid)',
                  'Example 2 (Illicit I Contraposition): "Some mammals are non-dogs" → "Some dogs are non-mammals." (Invalid!)'
                ]
              }
            ].map((op, i) => (
              <div key={i} className="p-5 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-1">{op.title}</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">{op.desc}</p>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wider">{op.validity}</p>
                <div className="space-y-1 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg text-xs font-mono">
                  {op.examples.map((ex, idx) => (
                    <p key={idx}>{ex}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Valid Conversion</h4>
              <ExerciseQuestion 
                question="Which of the following propositions can be VALIDLY converted simply by switching the subject and predicate terms?"
                options={[
                  'A and O propositions',
                  'E and I propositions',
                  'A and E propositions',
                  'I and O propositions'
                ]}
                correctAnswer={1}
                explanation="CONVERSION is valid ONLY for E ('No S are P') and I ('Some S are P') propositions. Converting A or O propositions produces illicit inferences."
              />
            </div>

            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Obversion Validity</h4>
              <ExerciseQuestion 
                question="True or False: Obversion produces a logically equivalent statement for ALL four categorical proposition forms (A, E, I, O)."
                options={[
                  'True',
                  'False'
                ]}
                correctAnswer={0}
                explanation="TRUE. Obversion (changing the quality and negating the predicate) is valid and logically equivalent for all four standard forms (A, E, I, O)."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 6 Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Four Standard Forms:</strong> A (All S are P), E (No S are P), I (Some S are P), O (Some S are not P).</p>
            <p><strong>✓ Quality & Quantity:</strong> Quality (Affirmative/Negative); Quantity (Universal/Particular).</p>
            <p><strong>✓ Distribution:</strong> A distributes S; E distributes S & P; I distributes Neither; O distributes P ("Unprepared Students Never Pass").</p>
            <p><strong>✓ Square of Opposition:</strong> Contradictory (opposite truth values), Contrary (cannot both be true), Subcontrary (cannot both be false), Subalternation (truth flows down, falsity flows up).</p>
            <p><strong>✓ Immediate Inferences:</strong> Conversion valid for E & I; Obversion valid for A, E, I, O; Contraposition valid for A & O.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter5');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 5
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter1');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Review Chapter 1
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter6;
