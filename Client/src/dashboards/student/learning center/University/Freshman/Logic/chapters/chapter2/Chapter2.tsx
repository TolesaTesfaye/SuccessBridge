import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter2Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter2: React.FC<Chapter2Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Chapter 2
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          BASIC CONCEPTS OF LOGIC
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Welcome to Chapter 2! Now that we know what philosophy is, we will dive into Logic—the tool philosophers use to build and evaluate arguments. You will learn how to identify premises and conclusions, distinguish between different types of arguments, and evaluate their strength and validity.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 2.1: Arguments, Premises and Conclusions */}
        <section id="subtopic-2.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.1. Arguments, Premises and Conclusions
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              In everyday language, an "argument" might mean a verbal fight or disagreement. In logic, however, an <strong>argument</strong> has a very specific meaning. It is a set of statements (propositions) where some statements (premises) are intended to provide support or evidence for another statement (the conclusion).
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 my-3 md:my-6">
              <div className="p-4 md:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-4 uppercase tracking-widest text-xs md:text-sm">Components of an Argument:</h4>
                <ul className="space-y-3 list-none p-0 m-0">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">Premises</p>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Statements that set forth the reasons or evidence.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">Conclusion</p>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">The statement that the evidence is claimed to support or imply.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">Inference</p>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">The reasoning process expressed by an argument.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest text-xs md:text-sm">Indicator Words:</h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] md:text-xs font-black text-blue-600 uppercase mb-1 md:mb-2 block">Premise Indicators</span>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">since, because, for, in that, as indicated by, seeing that, given that, owing to</p>
                  </div>
                  <div className="pt-2 md:pt-4 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] md:text-xs font-black text-indigo-600 uppercase mb-1 md:mb-2 block">Conclusion Indicators</span>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">therefore, thus, hence, so, consequently, it follows that, accordingly, entails that</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-l-4 border-indigo-600 bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="font-bold text-sm md:text-lg text-slate-900 dark:text-white mb-2">Example of an Argument:</h3>
              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 italic mb-2">
                "All humans are mortal. Socrates is human. <strong>Therefore</strong>, Socrates is mortal."
              </p>
              <ul className="text-xs md:text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4 list-disc">
                <li><strong>Premise 1:</strong> All humans are mortal.</li>
                <li><strong>Premise 2:</strong> Socrates is human.</li>
                <li><strong>Conclusion:</strong> Socrates is mortal.</li>
              </ul>
            </div>

            {/* Detail Note */}
            <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
              <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
                <span>📝</span> Detail Note: Enthymemes
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                In real life, people rarely state all their premises explicitly. An argument with an unstated premise or conclusion is called an <strong>enthymeme</strong>. For example, "He's a politician, so he's probably lying." The hidden premise here is "Politicians probably lie." Recognizing hidden premises is a key skill in logic.
              </p>
            </div>

            {/* True/False Check */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Quick Check</h4>
              <ExerciseQuestion 
                question="The word 'because' is typically a conclusion indicator."
                options={[
                  'True',
                  'False'
                ]}
                correctAnswer={1}
                explanation="FALSE. 'Because' introduces a reason or evidence, making it a PREMISE indicator. Example: 'The ground is wet BECAUSE it rained.' (It rained = premise/reason)."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.2: Recognizing Arguments */}
        <section id="subtopic-2.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.2. Recognizing Arguments
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 md:mb-8">
            Not all passages of text or speech contain arguments. For a passage to contain an argument, it must purport to prove something. Two conditions must be fulfilled: (1) <strong>Factual claim:</strong> at least one statement must claim to present evidence or reasons, and (2) <strong>Inferential claim:</strong> there must be a claim that the evidence supports or implies something.
          </p>

          <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-4">Non-Inferential Passages (Not Arguments)</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Warnings & Pieces of Advice',
                content: 'Recommendations about future action or conduct. They don\'t try to prove anything.',
                example: '"Watch out for the icy steps!" or "You should study hard for the exam."',
                icon: '⚠️'
              },
              {
                title: 'Statements of Belief or Opinion',
                content: 'Expressions of what someone happens to believe or think, without offering evidence.',
                example: '"I believe that chocolate ice cream is the best flavor ever created."',
                icon: '💭'
              },
              {
                title: 'Loosely Associated Statements',
                content: 'Statements about the same general subject that lack an inferential connection.',
                example: '"The sky is blue. I am hungry. Tomorrow is Tuesday." (No statement supports another).',
                icon: '🔗'
              },
              {
                title: 'Explanations',
                content: 'Passages that shed light on some event or phenomenon that is usually already accepted as matter of fact.',
                example: '"The sky is blue because molecules in the air scatter blue light from the sun." (Explains WHY, doesn\'t prove THAT the sky is blue).',
                icon: '💡'
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 border-l-4 border-indigo-500 bg-white dark:bg-slate-900 shadow-sm rounded-r-xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl md:text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm mb-4 leading-relaxed">{feature.content}</p>
                
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded">
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1 md:mb-2">Example:</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200">{feature.example}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 border-t-4 border-indigo-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Recognizing Arguments</h3>
            <ExerciseQuestion 
              question="Does the following passage contain an argument? 'I think everyone should learn to code. It is just my personal view that it builds character.'"
              options={[
                'Yes, it is an argument.',
                'No, it is a statement of belief/opinion.',
                'No, it is a warning.',
                'No, it is an explanation.'
              ]}
              correctAnswer={1}
              explanation="This is a statement of belief or opinion. The speaker is expressing what they think, but they are not offering any evidence or premises to PROVE why everyone should learn to code."
            />
          </div>
        </section>

        {/* SUBTOPIC 2.3: Deduction vs Induction */}
        <section id="subtopic-2.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.3. Deduction vs Induction
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            Once we know we have an argument, we can classify it into one of two major categories based on the strength of the inferential link: <strong>Deductive</strong> or <strong>Inductive</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative p-6 md:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg md:text-2xl font-black text-blue-600 mb-2 md:mb-4">Deductive Arguments</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mb-4 md:mb-6">
                An argument incorporating the claim that it is impossible for the conclusion to be false given that the premises are true. The conclusion follows <strong>necessarily</strong> from the premises.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Common Forms:</h5>
                  <ul className="text-xs md:text-sm text-slate-600 dark:text-slate-400 list-disc ml-4">
                    <li>Mathematics (excluding statistics)</li>
                    <li>Arguments from definition</li>
                    <li>Syllogisms (Categorical, Hypothetical, Disjunctive)</li>
                  </ul>
                </div>
                
                <div className="p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                  <p className="text-[10px] md:text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">Example</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">"If it is raining, the street is wet. It is raining. Therefore, the street is wet."</p>
                </div>
              </div>
            </div>

            <div className="relative p-6 md:p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg md:text-2xl font-black text-emerald-600 mb-2 md:mb-4">Inductive Arguments</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mb-4 md:mb-6">
                An argument incorporating the claim that it is improbable that the conclusion be false given that the premises are true. The conclusion follows <strong>probably</strong> from the premises.
              </p>

              <div className="space-y-4">
                <div>
                  <h5 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Common Forms:</h5>
                  <ul className="text-xs md:text-sm text-slate-600 dark:text-slate-400 list-disc ml-4">
                    <li>Predictions</li>
                    <li>Arguments from analogy</li>
                    <li>Generalizations (e.g., from a sample)</li>
                    <li>Arguments from authority</li>
                  </ul>
                </div>

                <div className="p-3 md:p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-500">
                  <p className="text-[10px] md:text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">Example</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">"95% of the students in this class passed the exam. John is in this class. Therefore, John probably passed the exam."</p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Inductive Reasoning in Law
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              During a criminal trial, prosecutors often use <strong>inductive reasoning</strong>. They present circumstantial evidence (fingerprints, motives, witnesses) to argue that the defendant is guilty beyond a reasonable doubt. Because it is rarely <em>impossible</em> for the defendant to be innocent given the evidence (only highly improbable), court verdicts rely on strong inductive arguments rather than absolute deductive certainty.
            </p>
          </div>

          <div className="mt-10 p-8 border-t-4 border-blue-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Deduction vs Induction</h3>
            <ExerciseQuestion 
              question="An argument that relies on a weather forecast to predict tomorrow's weather is an example of a(n):"
              options={[
                'Deductive argument',
                'Inductive argument',
                'Non-argument',
                'Syllogism'
              ]}
              correctAnswer={1}
              explanation="This is an inductive argument (specifically a prediction). Predictions about the future are based on past or present evidence, and their conclusions only follow PROBABLY, not with absolute certainty."
            />
          </div>
        </section>

        {/* SUBTOPIC 2.4: Evaluating Arguments */}
        <section id="subtopic-2.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4">
            2.4. Evaluating Arguments (Validity, Truth, Soundness)
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
            How do we know if an argument is "good"? For deductive arguments, we use the concepts of validity and soundness. For inductive arguments, we use strength and cogency.
          </p>

          <div className="space-y-8">
            {/* Deductive Evaluation */}
            <div className="p-6 md:p-8 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900">
              <h3 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 border-b pb-2">Evaluating Deductive Arguments</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-blue-500">1.</span> Validity
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2">
                    A <strong>valid</strong> deductive argument is one in which it is impossible for the conclusion to be false given that the premises are true. Validity is entirely about the <em>logical structure</em>, not the actual truth of the premises.
                  </p>
                  <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded text-sm">
                    <strong>Valid but False Example:</strong> All dogs are cats. Fido is a dog. Therefore, Fido is a cat. (Valid structure, but false premises).
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-blue-500">2.</span> Soundness
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2">
                    A <strong>sound</strong> argument is a deductive argument that is BOTH valid AND has all true premises. A sound argument always has a true conclusion.
                    <br/><br/>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Soundness = Validity + All True Premises</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Inductive Evaluation */}
            <div className="p-6 md:p-8 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900">
              <h3 className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 border-b pb-2">Evaluating Inductive Arguments</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-500">1.</span> Strength
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2">
                    A <strong>strong</strong> inductive argument is one in which it is improbable that the conclusion be false given that the premises are true. It depends on how much support the premises give the conclusion.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-500">2.</span> Cogency
                  </h4>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2">
                    A <strong>cogent</strong> argument is an inductive argument that is BOTH strong AND has all true premises.
                    <br/><br/>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Cogency = Strength + All True Premises</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Quick Check</h4>
            <ExerciseQuestion 
              question="If a deductive argument has a valid structure and true premises, what do we call it?"
              options={[
                'Cogent',
                'Strong',
                'Sound',
                'Probable'
              ]}
              correctAnswer={2}
              explanation="A deductive argument that is both valid and has true premises is called a SOUND argument."
            />
          </div>
        </section>


        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 2 Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Argument:</strong> A set of statements comprising premises (evidence/reasons) and a conclusion (what is being supported).</p>
            <p><strong>✓ Recognizing Arguments:</strong> Look for inferential claims. Warnings, opinions, and explanations are not arguments.</p>
            <p><strong>✓ Deductive Arguments:</strong> Claim that the conclusion follows <em>necessarily</em> from the premises (e.g., math, definitions, syllogisms).</p>
            <p><strong>✓ Inductive Arguments:</strong> Claim that the conclusion follows <em>probably</em> from the premises (e.g., predictions, generalizations).</p>
            <p><strong>✓ Evaluation:</strong> Deductive arguments are evaluated by Validity and Soundness. Inductive arguments are evaluated by Strength and Cogency.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter1');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 1
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter3');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 3
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter2;
