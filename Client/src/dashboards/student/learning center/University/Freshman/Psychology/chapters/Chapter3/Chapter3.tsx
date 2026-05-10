import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter3Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter3: React.FC<Chapter3Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative mb-6 md:mb-12 px-0 md:px-8 py-4 md:py-8">
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Chapter 3
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          LEARNING AND THEORIES
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-teal-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Discover how we learn and the major theories that explain the learning process. From classical conditioning to social learning, understand the mechanisms behind behavior change.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">

        {/* SUBTOPIC 3.1: Definition and Nature of Learning */}
        <section id="subtopic-3.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            3.1. Definition and Nature of Learning
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-emerald-600 dark:text-emerald-400">Learning</strong> is a <strong>relatively permanent change in behavior or knowledge</strong> that results from experience or practice. 
              It is one of the most fundamental processes in psychology and is essential for adaptation and survival.
            </p>

            <div className="p-3 md:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-600">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">What is Learning?</h3>
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-2 md:mb-4">
                Learning involves acquiring new knowledge, behaviors, skills, values, attitudes, or preferences. 
                It's not just about memorizing facts—it's about changing how we think and act.
              </p>
              <div className="grid md:grid-cols-3 gap-2 md:gap-4">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-sm text-emerald-600 dark:text-emerald-400">Knowledge</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">Facts, concepts, understanding</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-sm text-emerald-600 dark:text-emerald-400">Skills</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">Abilities, competencies, techniques</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-sm text-emerald-600 dark:text-emerald-400">Behaviors</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">Actions, habits, responses</p>
                </div>
              </div>
            </div>

            <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">Key Characteristics of Learning</h3>
            
            <div className="space-y-2 md:space-y-4">
              <div className="p-3 md:p-6 border-l-4 border-blue-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">1. Relatively Permanent Change</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Learning produces changes that <strong>last over time</strong>. Temporary changes due to fatigue, drugs, or illness are not considered learning. 
                  The change must persist beyond the immediate situation.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-blue-900 dark:text-blue-300">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    ✓ Learning to ride a bike (permanent) vs. ✗ Being tired after staying up late (temporary)
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-purple-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">2. Results from Experience</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Learning occurs through <strong>interaction with the environment</strong>. Changes due to maturation (biological growth) or instinct are not learning. 
                  Experience includes practice, observation, and instruction.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-purple-900 dark:text-purple-300">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    ✓ Learning a language through practice (experience) vs. ✗ Growing taller (maturation)
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-amber-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">3. Active Process</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Learning requires <strong>engagement and participation</strong>. The learner must be actively involved, 
                  whether through physical practice, mental rehearsal, or observation.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-amber-900 dark:text-amber-300">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    Actively solving math problems leads to better learning than passively watching someone else solve them.
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-rose-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">4. Universal Process</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Learning occurs in <strong>all organisms</strong>, from simple animals to humans. 
                  The basic principles of learning apply across species, though the complexity varies.
                </p>
                <div className="bg-rose-50 dark:bg-rose-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-rose-900 dark:text-rose-300">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    Dogs can learn tricks, rats can learn to navigate mazes, and humans can learn complex languages.
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-cyan-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">5. Purposeful and Goal-Oriented</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Learning is typically <strong>directed toward achieving goals</strong>. 
                  We learn to satisfy needs, solve problems, or adapt to our environment.
                </p>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-cyan-900 dark:text-cyan-300">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    A student learns to study effectively to achieve good grades and career success.
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-indigo-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">6. Involves Reconstruction of Experience</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  Learning isn't just storing information—it involves <strong>organizing, interpreting, and integrating</strong> new information with existing knowledge.
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-indigo-900 dark:text-indigo-300">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    When learning about photosynthesis, you connect it to what you already know about plants and energy.
                  </p>
                </div>
              </div>
            </div>

            {/* What is NOT Learning */}
            <div className="mt-4 md:mt-8 p-3 md:p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">❌ What is NOT Learning?</h4>
              <div className="space-y-2">
                <div className="flex gap-2 items-start">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">Maturation</p>
                    <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">Biological changes due to aging (e.g., puberty, gray hair)</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">Temporary States</p>
                    <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">Changes due to fatigue, drugs, illness, or motivation</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">Instinctive Behaviors</p>
                    <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">Innate responses (e.g., reflexes, fixed action patterns)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Check Exercise */}
            <div className="mt-4 md:mt-8 p-3 md:p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🤔 Quick Check</h4>
              <ExerciseQuestion 
                question="A baby starts walking at 12 months old. Is this an example of learning?"
                options={[
                  'Yes, because it is a permanent change in behavior',
                  'Yes, because the baby practiced and improved',
                  'No, because it is primarily due to biological maturation',
                  'No, because it is an instinctive behavior'
                ]}
                correctAnswer={2}
                explanation="This is NOT learning—it's MATURATION. While practice helps refine walking skills, the ability to walk emerges primarily due to biological maturation of the nervous system and muscles. All healthy children learn to walk around the same age regardless of practice, which indicates it's a maturational milestone. However, learning to walk in a specific style (like a model's runway walk) would be learning because it requires specific experience and practice beyond normal maturation."
              />
            </div>
          </div>

          {/* Exercise for Subtopic 3.1 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-emerald-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Nature of Learning</h3>
            <ExerciseQuestion 
              question="A student who was very tired performed poorly on a test, but after getting proper sleep, performed well on a similar test. Why is the initial poor performance NOT considered a failure of learning?"
              options={[
                'Because the student did not study enough',
                'Because the change was temporary and due to fatigue, not lack of knowledge',
                'Because the test was too difficult',
                'Because learning only occurs in classroom settings'
              ]}
              correctAnswer={1}
              explanation="The correct answer is that the change was TEMPORARY and due to FATIGUE, not lack of knowledge. Learning involves relatively permanent changes. The student's poor performance was a temporary state caused by fatigue, not a permanent loss of knowledge. Once rested, the student demonstrated they had learned the material. This illustrates that learning must be distinguished from temporary performance factors like fatigue, illness, or motivation."
            />
          </div>
        </section>


        {/* SUBTOPIC 3.2: Classical Conditioning */}
        <section id="subtopic-3.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            3.2. Classical Conditioning
          </h2>

          <div className="space-y-3 md:space-y-6">
            <div className="p-4 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl md:text-3xl">🔔</span>
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-blue-600 dark:text-blue-400 uppercase">Ivan Pavlov (1849-1936)</h3>
                  <p className="text-xs md:text-lg font-bold text-slate-700 dark:text-slate-300">Classical Conditioning Theory</p>
                </div>
              </div>

              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-3 md:mb-6">
                <strong>Classical conditioning</strong> is a type of learning in which a <strong>neutral stimulus comes to elicit a response</strong> after being paired with a stimulus that naturally elicits that response. 
                It was discovered by Russian physiologist Ivan Pavlov while studying digestion in dogs.
              </p>

              <div className="bg-white dark:bg-slate-800 p-3 md:p-6 rounded-lg mb-3 md:mb-6">
                <h4 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">Pavlov's Famous Experiment</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-4">
                  Pavlov noticed that dogs would salivate not only when food was presented, but also when they heard footsteps of the person who fed them. 
                  This led him to conduct systematic experiments on learning through association.
                </p>
                
                <div className="space-y-2 md:space-y-3">
                  <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="text-[10px] md:text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Before Conditioning:</p>
                    <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                      Food (UCS) → Salivation (UCR) | Bell (NS) → No salivation
                    </p>
                  </div>
                  <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <p className="text-[10px] md:text-sm font-bold text-purple-900 dark:text-purple-300 mb-1">During Conditioning:</p>
                    <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                      Bell (NS) + Food (UCS) → Salivation (UCR) [Repeated pairings]
                    </p>
                  </div>
                  <div className="p-2 md:p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded">
                    <p className="text-[10px] md:text-sm font-bold text-emerald-900 dark:text-emerald-300 mb-1">After Conditioning:</p>
                    <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                      Bell (CS) → Salivation (CR)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">Key Terms in Classical Conditioning</h3>

            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              <div className="p-3 md:p-6 border-l-4 border-blue-600">
                <h4 className="text-xs md:text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Unconditioned Stimulus (UCS)</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  A stimulus that <strong>naturally and automatically</strong> triggers a response without any learning.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Examples:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Food causing salivation</li>
                    <li>Loud noise causing fear</li>
                    <li>Puff of air causing eye blink</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-purple-600">
                <h4 className="text-xs md:text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">Unconditioned Response (UCR)</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  An <strong>unlearned, naturally occurring</strong> response to the unconditioned stimulus.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-purple-900 dark:text-purple-300 mb-1">Examples:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Salivation to food</li>
                    <li>Fear response to loud noise</li>
                    <li>Eye blink to puff of air</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-emerald-600">
                <h4 className="text-xs md:text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">Neutral Stimulus (NS)</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  A stimulus that initially <strong>produces no specific response</strong> other than focusing attention.
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-emerald-900 dark:text-emerald-300 mb-1">Examples:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Bell sound (before conditioning)</li>
                    <li>White lab coat</li>
                    <li>Specific room or location</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-amber-600">
                <h4 className="text-xs md:text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">Conditioned Stimulus (CS)</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  A previously neutral stimulus that, after being paired with the UCS, <strong>now triggers a conditioned response</strong>.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-amber-900 dark:text-amber-300 mb-1">Examples:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Bell sound (after conditioning)</li>
                    <li>White lab coat (after pairing with shots)</li>
                    <li>Dentist's office (after painful procedures)</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-rose-600 md:col-span-2">
                <h4 className="text-xs md:text-lg font-bold text-rose-600 dark:text-rose-400 mb-2">Conditioned Response (CR)</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  A <strong>learned response</strong> to the conditioned stimulus. It's similar to the UCR but is now triggered by the CS.
                </p>
                <div className="bg-rose-50 dark:bg-rose-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-rose-900 dark:text-rose-300 mb-1">Examples:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Salivation to bell sound</li>
                    <li>Anxiety when seeing white lab coat</li>
                    <li>Nervousness when entering dentist's office</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Important Processes */}
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">Important Processes in Classical Conditioning</h3>

            <div className="space-y-2 md:space-y-4">
              <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border-l-4 border-indigo-600 rounded-lg">
                <h4 className="text-xs md:text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">Acquisition</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  The initial stage when the CS and UCS are paired, and the CR is established. 
                  <strong>Timing is crucial</strong>—the CS should come slightly before the UCS.
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    Best timing: CS presented 0.5 seconds before UCS
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border-l-4 border-red-600 rounded-lg">
                <h4 className="text-xs md:text-lg font-bold text-red-600 dark:text-red-400 mb-2">Extinction</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  The gradual weakening and disappearance of the CR when the CS is repeatedly presented <strong>without the UCS</strong>.
                </p>
                <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    Example: Bell without food → Eventually, dog stops salivating to bell
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border-l-4 border-green-600 rounded-lg">
                <h4 className="text-xs md:text-lg font-bold text-green-600 dark:text-green-400 mb-2">Spontaneous Recovery</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  After extinction, the CR may <strong>reappear</strong> when the CS is presented again after a rest period, 
                  though usually weaker than before.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    Example: After extinction, dog may salivate again to bell after a few days of rest
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border-l-4 border-purple-600 rounded-lg">
                <h4 className="text-xs md:text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">Generalization</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  The tendency to respond to stimuli that are <strong>similar to the CS</strong>. 
                  The more similar the stimulus, the stronger the response.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    Example: Dog salivates not only to original bell, but also to similar sounds like chimes
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border-l-4 border-cyan-600 rounded-lg">
                <h4 className="text-xs md:text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-2">Discrimination</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  Learning to respond to the CS but <strong>not to similar stimuli</strong>. 
                  This is the opposite of generalization.
                </p>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    Example: Dog learns to salivate only to a specific bell tone, not to other sounds
                  </p>
                </div>
              </div>
            </div>

            {/* Real-World Applications */}
            <div className="mt-4 md:mt-8 p-3 md:p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-l-4 border-orange-600">
              <h4 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🌍 Real-World Applications</h4>
              <div className="space-y-2 md:space-y-3">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-xs md:text-sm font-bold text-orange-600 dark:text-orange-400 mb-1">Phobias</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                    Many fears are learned through classical conditioning (e.g., fear of dogs after being bitten)
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-xs md:text-sm font-bold text-orange-600 dark:text-orange-400 mb-1">Advertising</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                    Products paired with attractive people or pleasant music to create positive associations
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-xs md:text-sm font-bold text-orange-600 dark:text-orange-400 mb-1">Taste Aversions</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                    Getting sick after eating a food can create a lasting aversion to that food
                  </p>
                </div>
              </div>
            </div>

            {/* Mid-Section Exercise */}
            <div className="mt-4 md:mt-8 p-3 md:p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🎯 Apply Your Knowledge</h4>
              <ExerciseQuestion 
                question="A child hears a loud thunderclap (UCS) and feels afraid (UCR). After several experiences, the child becomes afraid (CR) just by seeing dark clouds (CS). If the child later experiences many dark clouds without thunder, what will likely happen?"
                options={[
                  'Generalization - fear of all clouds',
                  'Discrimination - fear only of specific cloud types',
                  'Extinction - gradual decrease in fear of dark clouds',
                  'Spontaneous Recovery - immediate increase in fear'
                ]}
                correctAnswer={2}
                explanation="This is EXTINCTION. When the CS (dark clouds) is repeatedly presented without the UCS (thunder), the CR (fear) will gradually weaken and disappear. The child learns that dark clouds no longer predict thunder, so the conditioned fear response extinguishes. Generalization would involve fear of all clouds, discrimination would be learning to fear only certain clouds, and spontaneous recovery would occur after extinction if the fear briefly returned after a rest period."
              />
            </div>
          </div>

          {/* Exercise for Subtopic 3.2 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-blue-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Classical Conditioning</h3>
            <ExerciseQuestion 
              question="In the famous 'Little Albert' experiment, a baby was shown a white rat (NS) and then a loud noise (UCS) was made, causing fear (UCR). After several pairings, Albert became afraid (CR) of the white rat (CS). Later, Albert also showed fear of a white rabbit, cotton wool, and a Santa Claus mask. This demonstrates:"
              options={[
                'Extinction',
                'Discrimination',
                'Generalization',
                'Spontaneous Recovery'
              ]}
              correctAnswer={2}
              explanation="This is GENERALIZATION. Albert learned to fear not just the white rat, but also other similar white, furry objects. Generalization occurs when the conditioned response extends to stimuli that are similar to the original conditioned stimulus. The more similar the new stimulus is to the CS, the stronger the response. This experiment (though ethically problematic by today's standards) demonstrated how phobias can generalize to related stimuli."
            />
          </div>
        </section>


        {/* SUBTOPIC 3.3: Operant Conditioning */}
        <section id="subtopic-3.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            3.3. Operant Conditioning
          </h2>

          <div className="space-y-3 md:space-y-6">
            <div className="p-4 md:p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-600">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl md:text-3xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-emerald-600 dark:text-emerald-400 uppercase">B.F. Skinner (1904-1990)</h3>
                  <p className="text-xs md:text-lg font-bold text-slate-700 dark:text-slate-300">Operant Conditioning Theory</p>
                </div>
              </div>

              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-3 md:mb-6">
                <strong>Operant conditioning</strong> is a type of learning in which behavior is <strong>strengthened or weakened by consequences</strong>. 
                Unlike classical conditioning (which involves involuntary responses), operant conditioning involves <strong>voluntary behaviors</strong>.
              </p>

              <div className="bg-white dark:bg-slate-800 p-3 md:p-6 rounded-lg">
                <h4 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">Key Principle</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400">
                  Behaviors followed by <strong>positive consequences</strong> are more likely to be repeated, 
                  while behaviors followed by <strong>negative consequences</strong> are less likely to be repeated.
                </p>
              </div>
            </div>

            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">Types of Consequences</h3>

            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              {/* Positive Reinforcement */}
              <div className="p-3 md:p-6 border-l-4 border-green-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl md:text-2xl">➕</span>
                  <h4 className="text-xs md:text-lg font-bold text-green-600 dark:text-green-400">Positive Reinforcement</h4>
                </div>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  <strong>Adding</strong> a pleasant stimulus to <strong>increase</strong> behavior
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-green-900 dark:text-green-300 mb-1">Examples:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Praise for good work → Work harder</li>
                    <li>Money for chores → Do more chores</li>
                    <li>Good grades → Study more</li>
                  </ul>
                </div>
              </div>

              {/* Negative Reinforcement */}
              <div className="p-3 md:p-6 border-l-4 border-blue-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl md:text-2xl">➖</span>
                  <h4 className="text-xs md:text-lg font-bold text-blue-600 dark:text-blue-400">Negative Reinforcement</h4>
                </div>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  <strong>Removing</strong> an unpleasant stimulus to <strong>increase</strong> behavior
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Examples:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Take aspirin → Headache stops</li>
                    <li>Buckle seatbelt → Annoying beep stops</li>
                    <li>Do homework → Nagging stops</li>
                  </ul>
                </div>
              </div>

              {/* Positive Punishment */}
              <div className="p-3 md:p-6 border-l-4 border-red-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl md:text-2xl">➕❌</span>
                  <h4 className="text-xs md:text-lg font-bold text-red-600 dark:text-red-400">Positive Punishment</h4>
                </div>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  <strong>Adding</strong> an unpleasant stimulus to <strong>decrease</strong> behavior
                </p>
                <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-red-900 dark:text-red-300 mb-1">Examples:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Speeding → Get a ticket</li>
                    <li>Misbehave → Get scolded</li>
                    <li>Late to work → Extra duties</li>
                  </ul>
                </div>
              </div>

              {/* Negative Punishment */}
              <div className="p-3 md:p-6 border-l-4 border-orange-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl md:text-2xl">➖❌</span>
                  <h4 className="text-xs md:text-lg font-bold text-orange-600 dark:text-orange-400">Negative Punishment</h4>
                </div>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  <strong>Removing</strong> a pleasant stimulus to <strong>decrease</strong> behavior
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-orange-900 dark:text-orange-300 mb-1">Examples:</p>
                  <ul className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Misbehave → Lose phone privileges</li>
                    <li>Break rules → Lose recess time</li>
                    <li>Bad grades → Can't go out with friends</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Memory Aid */}
            <div className="p-3 md:p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2">💡 Memory Aid</h4>
              <div className="space-y-1 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <p><strong>Reinforcement</strong> = Increases behavior (makes it stronger)</p>
                <p><strong>Punishment</strong> = Decreases behavior (makes it weaker)</p>
                <p><strong>Positive</strong> = Adding something</p>
                <p><strong>Negative</strong> = Removing something</p>
              </div>
            </div>

            {/* Schedules of Reinforcement */}
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">Schedules of Reinforcement</h3>
            <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-4">
              The pattern or timing of reinforcement affects how quickly behavior is learned and how resistant it is to extinction.
            </p>

            <div className="space-y-2 md:space-y-3">
              <div className="p-3 md:p-4 bg-white dark:bg-slate-800 border-l-4 border-cyan-600 rounded">
                <h4 className="text-xs md:text-base font-bold text-cyan-600 dark:text-cyan-400 mb-1">Continuous Reinforcement</h4>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Reinforcing behavior <strong>every time</strong> it occurs. Fast learning, but quick extinction.
                </p>
                <p className="text-[9px] md:text-xs text-slate-500 dark:text-slate-500 italic">Example: Vending machine (get snack every time you pay)</p>
              </div>

              <div className="p-3 md:p-4 bg-white dark:bg-slate-800 border-l-4 border-indigo-600 rounded">
                <h4 className="text-xs md:text-base font-bold text-indigo-600 dark:text-indigo-400 mb-1">Fixed-Ratio Schedule</h4>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Reinforcement after a <strong>set number</strong> of responses. High response rate.
                </p>
                <p className="text-[9px] md:text-xs text-slate-500 dark:text-slate-500 italic">Example: Buy 10 coffees, get 1 free</p>
              </div>

              <div className="p-3 md:p-4 bg-white dark:bg-slate-800 border-l-4 border-purple-600 rounded">
                <h4 className="text-xs md:text-base font-bold text-purple-600 dark:text-purple-400 mb-1">Variable-Ratio Schedule</h4>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Reinforcement after an <strong>unpredictable number</strong> of responses. Very high response rate, resistant to extinction.
                </p>
                <p className="text-[9px] md:text-xs text-slate-500 dark:text-slate-500 italic">Example: Slot machines, fishing</p>
              </div>

              <div className="p-3 md:p-4 bg-white dark:bg-slate-800 border-l-4 border-pink-600 rounded">
                <h4 className="text-xs md:text-base font-bold text-pink-600 dark:text-pink-400 mb-1">Fixed-Interval Schedule</h4>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Reinforcement after a <strong>set time period</strong>. Response rate increases as time approaches.
                </p>
                <p className="text-[9px] md:text-xs text-slate-500 dark:text-slate-500 italic">Example: Weekly paycheck, semester exams</p>
              </div>

              <div className="p-3 md:p-4 bg-white dark:bg-slate-800 border-l-4 border-amber-600 rounded">
                <h4 className="text-xs md:text-base font-bold text-amber-600 dark:text-amber-400 mb-1">Variable-Interval Schedule</h4>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Reinforcement after <strong>unpredictable time periods</strong>. Steady, consistent response rate.
                </p>
                <p className="text-[9px] md:text-xs text-slate-500 dark:text-slate-500 italic">Example: Pop quizzes, checking email</p>
              </div>
            </div>

            {/* Quick Check */}
            <div className="mt-4 md:mt-8 p-3 md:p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🤔 Quick Check</h4>
              <ExerciseQuestion 
                question="A child cleans their room and their parents stop nagging them. The child is now more likely to clean their room in the future. This is an example of:"
                options={[
                  'Positive Reinforcement',
                  'Negative Reinforcement',
                  'Positive Punishment',
                  'Negative Punishment'
                ]}
                correctAnswer={1}
                explanation="This is NEGATIVE REINFORCEMENT. The behavior (cleaning room) increased because an unpleasant stimulus (nagging) was removed. Remember: 'Negative' means removing something, and 'Reinforcement' means the behavior increases. Many people confuse negative reinforcement with punishment, but reinforcement always increases behavior, while punishment decreases it."
              />
            </div>
          </div>

          {/* Exercise for Subtopic 3.3 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-emerald-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Operant Conditioning</h3>
            <ExerciseQuestion 
              question="A gambler keeps playing slot machines even though they rarely win. Which schedule of reinforcement best explains why this behavior is so persistent and resistant to extinction?"
              options={[
                'Continuous Reinforcement',
                'Fixed-Ratio Schedule',
                'Variable-Ratio Schedule',
                'Fixed-Interval Schedule'
              ]}
              correctAnswer={2}
              explanation="This is a VARIABLE-RATIO SCHEDULE. Slot machines pay out after an unpredictable number of plays, which creates a very high response rate and makes the behavior extremely resistant to extinction. The gambler never knows if the next pull will be the winning one, so they keep playing. This is why gambling can be so addictive—the variable-ratio schedule is the most powerful schedule for maintaining behavior. Fixed schedules are predictable, and continuous reinforcement leads to quick extinction when rewards stop."
            />
          </div>
        </section>


        {/* SUBTOPIC 3.4: Social Learning Theory */}
        <section id="subtopic-3.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            3.4. Social Learning Theory
          </h2>

          <div className="space-y-3 md:space-y-6">
            <div className="p-4 md:p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-600">
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl md:text-3xl">👥</span>
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-purple-600 dark:text-purple-400 uppercase">Albert Bandura (1925-2021)</h3>
                  <p className="text-xs md:text-lg font-bold text-slate-700 dark:text-slate-300">Social Learning Theory / Observational Learning</p>
                </div>
              </div>

              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-3 md:mb-6">
                <strong>Social learning theory</strong> emphasizes that we learn by <strong>observing and imitating others</strong>. 
                Unlike classical and operant conditioning, social learning doesn't require direct experience or reinforcement—we can learn simply by watching.
              </p>

              <div className="bg-white dark:bg-slate-800 p-3 md:p-6 rounded-lg mb-3 md:mb-6">
                <h4 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">The Bobo Doll Experiment (1961)</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-4">
                  Bandura's famous experiment demonstrated that children learn aggressive behaviors by observing adults.
                </p>
                
                <div className="space-y-2 md:space-y-3">
                  <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <p className="text-[10px] md:text-sm font-bold text-purple-900 dark:text-purple-300 mb-1">Procedure:</p>
                    <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                      Children watched an adult model aggressively hit and kick a Bobo doll (inflatable clown). 
                      Later, children were left alone with the doll.
                    </p>
                  </div>
                  <div className="p-2 md:p-3 bg-pink-50 dark:bg-pink-900/20 rounded">
                    <p className="text-[10px] md:text-sm font-bold text-pink-900 dark:text-pink-300 mb-1">Results:</p>
                    <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                      Children who observed the aggressive model were much more likely to imitate the aggressive behaviors, 
                      even though they received no direct reinforcement for doing so.
                    </p>
                  </div>
                  <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="text-[10px] md:text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Conclusion:</p>
                    <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                      Learning can occur through observation alone, without direct experience or reinforcement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">Four Processes of Observational Learning</h3>
            <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-4">
              For observational learning to occur, four cognitive processes must take place:
            </p>

            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              <div className="p-3 md:p-6 border-l-4 border-blue-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">1</span>
                  <h4 className="text-xs md:text-lg font-bold text-blue-600 dark:text-blue-400">Attention</h4>
                </div>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  You must <strong>pay attention</strong> to the model's behavior. Factors that increase attention include:
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Model is attractive or prestigious</li>
                    <li>Behavior is distinctive or novel</li>
                    <li>You're motivated to learn</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-purple-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 md:w-8 md:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">2</span>
                  <h4 className="text-xs md:text-lg font-bold text-purple-600 dark:text-purple-400">Retention</h4>
                </div>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  You must <strong>remember</strong> what you observed. This involves:
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Forming mental images</li>
                    <li>Verbal descriptions</li>
                    <li>Mental rehearsal</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-emerald-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 md:w-8 md:h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">3</span>
                  <h4 className="text-xs md:text-lg font-bold text-emerald-600 dark:text-emerald-400">Reproduction</h4>
                </div>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  You must be <strong>physically capable</strong> of performing the behavior:
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded">
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Have necessary physical abilities</li>
                    <li>Practice the behavior</li>
                    <li>Refine through feedback</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-amber-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 md:w-8 md:h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">4</span>
                  <h4 className="text-xs md:text-lg font-bold text-amber-600 dark:text-amber-400">Motivation</h4>
                </div>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2">
                  You must be <strong>motivated</strong> to perform the behavior:
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                    <li>Expect positive outcomes</li>
                    <li>See model being rewarded</li>
                    <li>Value the behavior</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Types of Models */}
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">Types of Models</h3>

            <div className="grid md:grid-cols-3 gap-3 md:gap-4">
              <div className="p-3 md:p-4 bg-white dark:bg-slate-800 border-l-4 border-rose-600 rounded">
                <h4 className="text-xs md:text-base font-bold text-rose-600 dark:text-rose-400 mb-1">Live Models</h4>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                  Real people demonstrating behavior in person (parents, teachers, peers)
                </p>
              </div>

              <div className="p-3 md:p-4 bg-white dark:bg-slate-800 border-l-4 border-cyan-600 rounded">
                <h4 className="text-xs md:text-base font-bold text-cyan-600 dark:text-cyan-400 mb-1">Symbolic Models</h4>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                  People in media (TV, movies, books, social media influencers)
                </p>
              </div>

              <div className="p-3 md:p-4 bg-white dark:bg-slate-800 border-l-4 border-indigo-600 rounded">
                <h4 className="text-xs md:text-base font-bold text-indigo-600 dark:text-indigo-400 mb-1">Verbal Models</h4>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                  Descriptions or instructions about how to behave
                </p>
              </div>
            </div>

            {/* Vicarious Reinforcement */}
            <div className="mt-4 md:mt-6 p-3 md:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-l-4 border-indigo-600">
              <h4 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">Vicarious Reinforcement & Punishment</h4>
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-2 md:mb-4">
                We're more likely to imitate behaviors when we see the model being <strong>rewarded</strong> (vicarious reinforcement), 
                and less likely when we see them being <strong>punished</strong> (vicarious punishment).
              </p>
              <div className="grid md:grid-cols-2 gap-2 md:gap-3">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-green-600 dark:text-green-400 mb-1">Vicarious Reinforcement:</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                    Seeing a classmate praised for helping → More likely to help
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-red-600 dark:text-red-400 mb-1">Vicarious Punishment:</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                    Seeing a classmate scolded for talking → Less likely to talk
                  </p>
                </div>
              </div>
            </div>

            {/* Real-World Applications */}
            <div className="mt-4 md:mt-6 p-3 md:p-6 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600">
              <h4 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🌍 Real-World Applications</h4>
              <div className="space-y-2 md:space-y-3">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-xs md:text-sm font-bold text-orange-600 dark:text-orange-400 mb-1">Media Violence</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                    Children who watch violent TV shows may imitate aggressive behaviors
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-xs md:text-sm font-bold text-orange-600 dark:text-orange-400 mb-1">Role Models</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                    Athletes, celebrities, and influencers shape behavior of fans and followers
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-xs md:text-sm font-bold text-orange-600 dark:text-orange-400 mb-1">Education</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                    Demonstrations and modeling are effective teaching strategies
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-xs md:text-sm font-bold text-orange-600 dark:text-orange-400 mb-1">Therapy</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">
                    Modeling used to treat phobias and teach social skills
                  </p>
                </div>
              </div>
            </div>

            {/* Comparison Exercise */}
            <div className="mt-4 md:mt-8 p-3 md:p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🔄 Compare Learning Theories</h4>
              <ExerciseQuestion 
                question="A child learns to say 'please' and 'thank you' by watching their parents use these words and seeing others respond positively. Which learning theory best explains this?"
                options={[
                  'Classical Conditioning',
                  'Operant Conditioning',
                  'Social Learning Theory',
                  'All three equally'
                ]}
                correctAnswer={2}
                explanation="This is SOCIAL LEARNING THEORY. The child learned by observing and imitating their parents (modeling), and was motivated by seeing positive responses (vicarious reinforcement). While operant conditioning could also play a role if the child is directly praised, the key element here is learning through observation of others. Classical conditioning involves involuntary responses to stimuli, which doesn't apply here. Social learning theory emphasizes that we can learn without direct experience or reinforcement—just by watching others."
              />
            </div>
          </div>

          {/* Exercise for Subtopic 3.4 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Social Learning Theory</h3>
            <ExerciseQuestion 
              question="A teenager watches a YouTube tutorial on how to solve a Rubik's cube. They pay close attention, remember the steps, and have the physical ability to perform the moves. However, they never actually try to solve the cube. Which of Bandura's four processes is missing?"
              options={[
                'Attention',
                'Retention',
                'Reproduction',
                'Motivation'
              ]}
              correctAnswer={3}
              explanation="The missing process is MOTIVATION. The teenager has paid attention (watched the tutorial), retained the information (remembers the steps), and has the ability to reproduce the behavior (physical capability). However, they lack the motivation to actually perform the behavior. This demonstrates that all four processes must be present for observational learning to result in actual behavior. Motivation can come from expecting positive outcomes, seeing others rewarded, or valuing the skill."
            />
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-4 md:p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-600">
          <h2 className="text-base md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">📚 Chapter 3 Summary</h2>
          <div className="space-y-2 md:space-y-3 text-xs md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Definition:</strong> Learning is a relatively permanent change in behavior or knowledge resulting from experience.</p>
            <p><strong>✓ Classical Conditioning (Pavlov):</strong> Learning through association. A neutral stimulus becomes paired with a meaningful stimulus to elicit a response.</p>
            <p><strong>✓ Operant Conditioning (Skinner):</strong> Learning through consequences. Behavior is strengthened by reinforcement or weakened by punishment.</p>
            <p><strong>✓ Social Learning (Bandura):</strong> Learning through observation and imitation. Requires attention, retention, reproduction, and motivation.</p>
            <p><strong>✓ Key Processes:</strong> Acquisition, extinction, generalization, discrimination, and spontaneous recovery apply to conditioning.</p>
            <p><strong>✓ Reinforcement Schedules:</strong> Variable-ratio schedules produce the highest response rates and greatest resistance to extinction.</p>
            <p><strong>✓ Key Insight:</strong> All three theories explain different aspects of learning, and all are important for understanding how we acquire new behaviors and knowledge.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4 md:pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors font-medium text-xs md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-xs md:text-base"
          >
            Next: Chapter 4
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter3;
