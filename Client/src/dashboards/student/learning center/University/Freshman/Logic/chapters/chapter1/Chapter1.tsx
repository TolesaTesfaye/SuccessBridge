import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Chapter 1
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          INTRODUCING PHILOSOPHY
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Welcome to the fascinating world of Logic and Philosophy! In this chapter, you'll discover what philosophy is, its core features, and its fundamental branches such as Metaphysics, Epistemology, Axiology, and Logic.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 1.1: Meaning and Nature of Philosophy */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.1. Meaning and Nature of Philosophy
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>What is Philosophy?</strong><br />
              Philosophy comes from the Greek words 'philos' (love) and 'sophia' (wisdom), literally meaning 'love of wisdom.' It is the systematic and critical examination of fundamental questions about existence, knowledge, values, reason, mind, and language. Unlike other disciplines that focus on specific aspects of reality, philosophy addresses the most fundamental questions that underlie all human knowledge and experience.
            </p>

            <div className="grid md:grid-cols-2 gap-2 md:gap-4 my-3 md:my-6">
              <div className="p-2 md:p-4 border-l-4 border-blue-500">
                <p className="font-bold text-xs md:text-base text-slate-900 dark:text-white">Philos (φίλος)</p>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Meaning: Love</p>
              </div>
              <div className="p-2 md:p-4 border-l-4 border-indigo-500">
                <p className="font-bold text-xs md:text-base text-slate-900 dark:text-white">Sophia (σοφία)</p>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Meaning: Wisdom</p>
              </div>
            </div>

            {/* Detail Note */}
            <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
              <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
                <span>📝</span> Detail Note: The Origins of Philosophy
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                In ancient Greece, "philosopher" was used to distinguish thinkers from "sophists." Sophists were paid teachers of rhetoric who often claimed to possess wisdom and taught how to win arguments regardless of truth. Philosophers, like Socrates, claimed they did not possess wisdom but merely <em>loved</em> and <em>sought</em> it.
              </p>
            </div>

            <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">The Nature of Philosophy</h3>
            <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-4">
              Philosophy is unique because it questions the very foundations and assumptions that other fields take for granted. While science investigates how the natural world works, philosophy asks what science is, what makes scientific knowledge valid, and what the limits of scientific inquiry are.
            </p>
            
            <div className="space-y-2 md:space-y-4">
              <div className="p-3 md:p-6 border-l-4 border-blue-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">1. Rational Inquiry</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Philosophy relies on reason and logical argumentation rather than faith, tradition, or authority alone. It demands that claims be supported by sound arguments.
                </p>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-indigo-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">2. Critical Examination</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Philosophers question assumptions, analyze arguments, and evaluate evidence systematically. Nothing is accepted at face value without rigorous analysis.
                </p>
              </div>
            </div>

            {/* True/False Check */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Quick Check</h4>
              <ExerciseQuestion 
                question="True or False: Philosophy relies entirely on faith and tradition to answer fundamental questions about existence."
                options={[
                  'True',
                  'False'
                ]}
                correctAnswer={1}
                explanation="FALSE. Philosophy relies on RATIONAL INQUIRY and logic. It specifically avoids relying solely on faith, tradition, or authority, demanding instead that beliefs be supported by sound reasoning and critical examination."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.2: Basic Features of Philosophy */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.2. Basic Features of Philosophy
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 md:mb-8">
            Philosophy possesses several unique characteristics that distinguish it from other academic disciplines. These features work together to make philosophy a discipline that helps us think more clearly, reason more effectively, and understand ourselves and our world more deeply.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Critical Thinking',
                content: 'Careful analysis of arguments and identification of hidden assumptions. Philosophers don\'t simply accept claims at face value but examine them rigorously.',
                example: 'Identifying logical fallacies and errors in someone\'s reasoning during a debate.',
                icon: '🔍'
              },
              {
                title: 'Conceptual Analysis',
                content: 'Careful examination and clarification of concepts, terms, and ideas to resolve confusion and ambiguity.',
                example: 'Breaking down what the word "freedom" actually means—does it mean doing whatever you want, or does it mean self-mastery?',
                icon: '🧠'
              },
              {
                title: 'Systematic Approach',
                content: 'Philosophical inquiry is organized, methodical, and seeks to develop coherent and comprehensive understanding.',
                example: 'Building a comprehensive ethical theory that applies consistently across medical, business, and personal situations.',
                icon: '🧩'
              },
              {
                title: 'Normative Inquiry',
                content: 'Philosophy doesn\'t just describe how things are but examines how things ought to be. It addresses questions of value.',
                example: 'Evaluating whether a specific law is "just" or "unjust", rather than simply describing what the law is.',
                icon: '⚖️'
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 border-l-4 border-indigo-500 bg-white dark:bg-slate-900 shadow-sm rounded-r-xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">{feature.content}</p>
                
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Detailed Example:</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{feature.example}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Philosophy in Tech
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              When software engineers build self-driving cars, they must program the car on how to react in an unavoidable crash. Should it prioritize the driver's life or the pedestrians'? This isn't just a coding problem; it's a classic <strong>normative inquiry</strong>. Tech companies increasingly rely on philosophers to help guide these critical ethical decisions.
            </p>
          </div>

          <div className="mt-10 p-8 border-t-4 border-indigo-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Basic Features</h3>
            <ExerciseQuestion 
              question="True or False: Normative inquiry in philosophy is concerned strictly with describing facts as they exist in the world, without judging them as good or bad."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Normative inquiry is exactly the opposite—it is concerned with how things OUGHT to be, dealing with values, morals, and judgments of what is good or bad, rather than just describing facts."
            />
          </div>
        </section>

        {/* SUBTOPIC 1.3: Metaphysics and Epistemology */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.3. Metaphysics and Epistemology
          </h2>

          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
            Philosophy is divided into major branches. The two most foundational branches focus on reality and knowledge. Both are fundamental because they address the most basic questions about what exists and how we can know about it.
          </p>

          <div className="space-y-6">
            <div className="p-6 border-l-4 border-blue-500">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Metaphysics</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                The branch of philosophy that investigates the fundamental nature of reality. It studies Ontology (what exists), causation, time and space, and identity. Major positions include <strong>Materialism</strong> (only physical matter exists), <strong>Idealism</strong> (reality is mental/spiritual), and <strong>Dualism</strong> (both physical and mental exist independently).
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                <p className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">💡 Classic Example: The Ship of Theseus</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  If you replace every single wooden plank on a ship over time until no original pieces remain, is it still the same ship? What if you used the old planks to build a second ship—which one is the "real" Ship of Theseus? This tests our understanding of <strong>identity and existence</strong>.
                </p>
              </div>
            </div>

            <div className="p-6 border-l-4 border-indigo-500">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Epistemology</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                The study of knowledge and justified belief. It traditionally defines knowledge as <strong>Justified True Belief</strong>. Major positions include <strong>Rationalism</strong> (reason is the primary source of knowledge) and <strong>Empiricism</strong> (experience and sensory perception are the primary sources).
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded">
                <p className="text-sm font-bold text-indigo-900 dark:text-indigo-300 mb-2">💡 Classic Example: The Dream Argument</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  When you are dreaming, it feels completely real. Since your senses can deceive you in a dream, how can you be absolutely certain that you are not dreaming right now? This challenges our <strong>sources of knowledge</strong> and highlights skepticism.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 p-8 border-t-4 border-blue-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Reality and Knowledge</h3>
            <ExerciseQuestion 
              question="A philosopher who argues that 'we can only gain true knowledge through our five senses and personal experience' is expressing a view most closely aligned with:"
              options={[
                'Rationalism',
                'Empiricism',
                'Dualism',
                'Idealism'
              ]}
              correctAnswer={1}
              explanation="This is Empiricism, which is an epistemological position asserting that experience (via the senses) is the primary source of knowledge. Rationalism would argue that reason is the primary source. Dualism and Idealism are metaphysical positions about the nature of reality, not sources of knowledge."
            />
          </div>
        </section>

        {/* SUBTOPIC 1.4: Axiology and Logic */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.4. Axiology and Logic
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">⚖️</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Axiology</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-1">The philosophical study of value</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Axiology examines what makes things valuable and how we evaluate them. It has two main sub-branches:
                  <br/><br/>
                  <strong>1. Ethics (Moral Philosophy):</strong> Studies right and wrong. Explores theories like Consequentialism (focus on results) and Deontology (focus on rules/duty).<br/>
                  <strong>2. Aesthetics:</strong> Studies beauty, art, taste, and what constitutes a 'good' work of art.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                  <p className="text-xs font-bold text-blue-900 dark:text-blue-300 mb-1">EXAMPLE (Ethics):</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Is it morally acceptable to steal bread to feed your starving family? A consequentialist might say yes (saving a life is a better outcome), while a strict deontologist might say no (stealing breaks a moral rule).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-l-4 border-indigo-500">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">🧩</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Logic</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-1">The study of correct reasoning</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Logic provides principles for distinguishing good arguments from bad ones. It examines the structure of arguments, the relationships between premises and conclusions, and the principles of valid inference. It is foundational for critical thinking.
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded">
                  <p className="text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-1">EXAMPLE (Logical Fallacy - Ad Hominem):</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    "You can't trust his argument about climate change because he failed his math class." This is bad logic because it attacks the person instead of addressing the actual argument.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Quick Check</h4>
            <ExerciseQuestion 
              question="A movie critic who analyzes why a film's cinematography and soundtrack make it a masterpiece is engaging in which branch of philosophy?"
              options={[
                'Ethics',
                'Aesthetics',
                'Logic',
                'Metaphysics'
              ]}
              correctAnswer={1}
              explanation="This is Aesthetics, the sub-branch of Axiology that deals with beauty, art, and taste. Ethics deals with moral right and wrong, Logic deals with reasoning, and Metaphysics deals with reality."
            />
          </div>
        </section>

        {/* SUBTOPIC 1.5: Importance of Philosophy */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.5. Importance of Learning Philosophy
          </h2>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Philosophy is not just abstract theory—it provides highly transferable skills that are valued across numerous professions and enriches personal life by cultivating intellectual virtues like curiosity, humility, and fair-mindedness.
            </p>

            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1.</span>
                <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Develops Critical Thinking:</strong> Learn to analyze arguments, detect fallacies, and identify hidden assumptions. Highly valued in law, consulting, and management.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2.</span>
                <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Enhances Clarity of Thought and Expression:</strong> Emphasizes precise thinking and coherent communication, essential for writing, editing, and public speaking.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">3.</span>
                <p className="text-sm text-slate-700 dark:text-slate-300"><strong>Promotes Ethical Awareness:</strong> Provides tools to systematically analyze moral dilemmas, crucial for medical ethics, corporate responsibility, and AI development.</p>
              </li>
            </ul>
            
            {/* True/False Check */}
            <div className="my-6">
              <ExerciseQuestion 
                question="True or False: The study of philosophy is only useful for people who want to become academic philosophers or professors."
                options={[
                  'True',
                  'False'
                ]}
                correctAnswer={1}
                explanation="FALSE. Philosophy develops highly transferable skills like critical thinking, ethical reasoning, and clear communication. These are extremely valuable in law, business, medicine, technology, journalism, and everyday decision-making."
              />
            </div>

            <div className="p-4 bg-white/60 dark:bg-slate-900/60 rounded-xl text-center italic text-sm sm:text-base text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              "The unexamined life is not worth living." — Socrates
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 1 Summary</h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p><strong>✓ Definition:</strong> Philosophy is the love of wisdom; the critical examination of fundamental questions.</p>
            <p><strong>✓ Features:</strong> Includes rational inquiry, critical thinking, conceptual analysis, and normative inquiry.</p>
            <p><strong>✓ Metaphysics & Epistemology:</strong> The study of reality/existence, and the study of knowledge/truth, respectively.</p>
            <p><strong>✓ Axiology & Logic:</strong> The study of values (ethics and aesthetics), and the study of correct reasoning.</p>
            <p><strong>✓ Practical Value:</strong> Philosophy trains the mind for critical thinking, ethical awareness, and clarity of expression used in law, tech, and everyday life.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Next: Chapter 2
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter1;
