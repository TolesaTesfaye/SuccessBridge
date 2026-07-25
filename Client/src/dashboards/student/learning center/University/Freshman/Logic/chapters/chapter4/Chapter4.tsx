import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter4Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter4: React.FC<Chapter4Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Chapter 4
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          BASIC CONCEPTS OF CRITICAL THINKING
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Welcome to Chapter 4! Critical thinking is the backbone of intellectual maturity. In this chapter, you will learn the core meaning of critical thinking, universal standards of reasoning, cognitive barriers to clear thinking, and the intellectual virtues that characterize critical thinkers.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 4.1: Meaning of Critical Thinking */}
        <section id="subtopic-4.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            4.1. Meaning of Critical Thinking
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Critical Thinking</strong> is the disciplined, self-directed process of actively conceptualizing, analyzing, evaluating, and synthesizing information to reach well-reasoned conclusions. It is not merely thinking lots of thoughts, but rather <em>thinking about your thinking</em> while you are thinking, to make it clearer, more accurate, and more defensible.
            </p>

            <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">Core Cognitive Skills of Critical Thinking</h3>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  title: '1. Analysis',
                  desc: 'Examining ideas, identifying arguments, and breaking down complex information into its component parts.',
                  icon: '🔍',
                  color: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                },
                {
                  title: '2. Evaluation',
                  desc: 'Assessing the credibility of sources, strength of evidence, and logical soundness of arguments.',
                  icon: '⚖️',
                  color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                },
                {
                  title: '3. Inference',
                  desc: 'Drawing reasonable conclusions based on evidence, data, and logical deduction or induction.',
                  icon: '🧩',
                  color: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                },
                {
                  title: '4. Self-Regulation (Metacognition)',
                  desc: 'Monitoring and evaluating one\'s own cognitive processes, recognizing personal biases, and correcting errors.',
                  icon: '🧠',
                  color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                }
              ].map((skill, i) => (
                <div key={i} className={`p-4 md:p-6 border-l-4 rounded-xl ${skill.color}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{skill.icon}</span>
                    <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white">{skill.title}</h4>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">{skill.desc}</p>
                </div>
              ))}
            </div>

            {/* Detail Note */}
            <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
              <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
                <span>📝</span> Detail Note: Passive vs Active Thinking
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Passive thinkers</strong> absorb information like a sponge, accepting claims without questioning authority or evidence. <strong>Critical thinkers</strong> act like miners—digging, sifting through evidence, questioning assumptions, and separating golden facts from worthless debris.
              </p>
            </div>

            {/* Real-World Example */}
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
              <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
                <span>🌍</span> Real-World Example: Social Media & Clickbait Headlines
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                When encountering a sensational headline like "Miracle Herb Cures Disease Overnight!", a passive thinker shares it immediately. A critical thinker applies <strong>self-regulation</strong> and <strong>evaluation</strong>: Who authored this? What scientific study backs it up? What is the author's financial incentive?
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Practice Question 1: Core Definition</h4>
                <ExerciseQuestion 
                  question="Which core critical thinking skill involves reflecting on one's own thinking process and correcting personal errors?"
                  options={[
                    'Analysis',
                    'Self-Regulation (Metacognition)',
                    'Explanation',
                    'Observation'
                  ]}
                  correctAnswer={1}
                  explanation="Self-Regulation (Metacognition) is the ability to monitor, question, and correct one's own thinking processes and biases."
                />
              </div>

              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Practice Question 2: Passive vs Critical Thinking</h4>
                <ExerciseQuestion 
                  question="True or False: Critical thinking means being negative and finding fault with everything someone says."
                  options={[
                    'True',
                    'False'
                  ]}
                  correctAnswer={1}
                  explanation="FALSE. 'Critical' in critical thinking does not mean being cynical or argumentative; it means engaging in careful, objective, and disciplined evaluation based on sound standards."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 4.2: Standards of Critical Thinking */}
        <section id="subtopic-4.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            4.2. Standards of Critical Thinking
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            To evaluate whether an argument or piece of reasoning is sound, critical thinkers apply universal intellectual standards. Below are the <strong>eight key standards</strong>, along with multiple real-world examples for each:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: '1. Clarity',
                desc: 'A gateway standard. If a statement is unclear, we cannot determine whether it is accurate or relevant.',
                examples: [
                  'Example 1: Vague: "We need to fix education." → Clear: "We need to reduce student-to-teacher ratios in public elementary schools to 15:1."',
                  'Example 2: Unclear instruction: "Be good today." → Clear instruction: "Finish your assigned reading before 8 PM and turn off your screen."'
                ]
              },
              {
                title: '2. Accuracy',
                desc: 'Free from errors, mistakes, or factual distortions. A statement can be perfectly clear, yet completely inaccurate.',
                examples: [
                  'Example 1: Clear but inaccurate: "The Earth is 6,000 kilometers away from the Sun." (Clear sentence, but factually false).',
                  'Example 2: Reporting error: Claiming "90% of students failed the final exam" when official records show only 9% failed.'
                ]
              },
              {
                title: '3. Precision',
                desc: 'Providing exact details, specific measurements, or precise boundaries rather than vague generalizations.',
                examples: [
                  'Example 1: Imprecise: "John is overweight." → Precise: "John weighs 110 kg and has a BMI of 32."',
                  'Example 2: Imprecise recipe: "Add some salt." → Precise recipe: "Add 5 grams (1 teaspoon) of fine sea salt."'
                ]
              },
              {
                title: '4. Relevance',
                desc: 'Focusing on information that directly impacts or bears upon the specific question at hand.',
                examples: [
                  'Example 1: In a job interview for an IT engineer, discussing the candidate\'s favorite color is irrelevant to their coding competence.',
                  'Example 2: Dismissing a scientist\'s climate research paper by pointing out that the scientist drives an old vehicle.'
                ]
              },
              {
                title: '5. Depth',
                desc: 'Addressing the complexities, underlying root causes, and nuances of an issue rather than superficial symptoms.',
                examples: [
                  'Example 1: Shallow: "Crime exists because people are evil." → Deep: "Crime is driven by poverty, lack of education, and systemic breakdown."',
                  'Example 2: Superficial medical care: Giving pain medication for chronic head pain without scanning to find the underlying brain tumor.'
                ]
              },
              {
                title: '6. Breadth',
                desc: 'Considering multiple viewpoints, alternative perspectives, and different angles before concluding.',
                examples: [
                  'Example 1: Evaluating a new environmental policy strictly from factory owners\' views while ignoring local residents breathing polluted air.',
                  'Example 2: Judging a historical conflict solely using your own country\'s history textbook without reading international accounts.'
                ]
              },
              {
                title: '7. Logic',
                desc: 'Ensuring thoughts, claims, and conclusions fit together coherently without internal contradictions.',
                examples: [
                  'Example 1: Contradiction: "I value human life above all else, but I support executing people for minor traffic violations."',
                  'Example 2: Non-sequitur: "She is a world-class pianist, so she will make an outstanding financial auditor."'
                ]
              },
              {
                title: '8. Fairness',
                desc: 'Treating all relevant viewpoints impartially without self-interest, prejudice, or emotional bias.',
                examples: [
                  'Example 1: Fair debate: Representing your opponent\'s argument in its strongest form before attempting to refute it.',
                  'Example 2: Judicial fairness: A judge evaluating evidence impartially without favoring a wealthy corporation over an individual citizen.'
                ]
              }
            ].map((std, i) => (
              <div key={i} className="p-5 md:p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-base md:text-lg text-blue-600 dark:text-blue-400 mb-2">{std.title}</h4>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-4">{std.desc}</p>
                </div>
                <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Best Examples:</p>
                  {std.examples.map((ex, idx) => (
                    <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 border-l-2 border-blue-500 pl-2 py-0.5">
                      {ex}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Precision vs Accuracy
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              A statement can be extremely <strong>precise</strong> without being <strong>accurate</strong>! For example: "The sun is exactly 4,521.892 kilometers away from Earth." This statement is highly precise (exact figures), but completely inaccurate (factually wrong).
            </p>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Medical Diagnoses
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              In medicine, a doctor saying "You are sick" lacks <strong>precision</strong>. Saying "You have an infection" adds clarity. Prescribing "500 mg of Amoxicillin twice daily for 7 days" applies <strong>precision, depth, and accuracy</strong>, ensuring safe patient outcomes.
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Identifying Standards</h4>
              <ExerciseQuestion 
                question="If a speaker gives a speech that is clear, detailed, and accurate, but only considers one side of a multi-sided issue, which standard have they failed to meet?"
                options={[
                  'Clarity',
                  'Precision',
                  'Breadth',
                  'Accuracy'
                ]}
                correctAnswer={2}
                explanation="BREADTH requires considering multiple perspectives and alternative viewpoints. Failing to look at other sides of an issue violates breadth."
              />
            </div>

            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Standard of Relevance</h4>
              <ExerciseQuestion 
                question="In a discussion about building a new school, a board member complains about the mayor's personal wardrobe choices. Which standard is violated?"
                options={[
                  'Relevance',
                  'Accuracy',
                  'Precision',
                  'Logic'
                ]}
                correctAnswer={0}
                explanation="The mayor's wardrobe is IRRELEVANT to the discussion about constructing a new school."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 4.3: Barriers to Critical Thinking */}
        <section id="subtopic-4.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            4.3. Barriers to Critical Thinking
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Human minds are prone to psychological habits and cognitive biases that block logical thinking. Below are the <strong>five major barriers</strong> to critical thinking, along with multiple practical examples for each:
          </p>

          <div className="space-y-6 mb-8">
            {[
              {
                title: '1. Egocentrism (Self-Centered Thinking)',
                desc: 'The tendency to view everything in relation to oneself and assume one\'s own opinions, interests, and desires are superior.',
                examples: [
                  'Example 1 (Self-Interested Thinking): A CEO claiming minimum wage hikes will ruin the economy, simply because it lowers his personal company profits.',
                  'Example 2 (Self-Serving Bias): A student attributing an "A" grade to their brilliant intellect, but blaming a "D" grade on a "biased, unfair teacher."'
                ]
              },
              {
                title: '2. Sociocentrism (Group-Centered Thinking)',
                desc: 'The tendency to prioritize the beliefs, dogmas, and norms of one\'s social group, tribe, or nation above objective evidence.',
                examples: [
                  'Example 1 (Groupthink): NASA engineers noticing an O-ring safety issue before the Challenger launch, but staying silent due to peer pressure to launch.',
                  'Example 2 (Ethnocentrism): Viewing foreign cultural customs as "weird or uneducated" simply because they differ from one\'s own upbringing.'
                ]
              },
              {
                title: '3. Wishful Thinking & Denial',
                desc: 'Believing something simply because one wants it to be true, or refusing to accept uncomfortable facts despite overwhelming evidence.',
                examples: [
                  'Example 1: A smoker insisting "My grandfather smoked 2 packs a day and lived to 95, so smoking won\'t harm me," denying medical evidence.',
                  'Example 2: An investor keeping all money in a collapsing stock because they desperately want to get rich, ignoring financial bankruptcy reports.'
                ]
              },
              {
                title: '4. Relativistic Thinking (Subjectivism & Cultural Relativism)',
                desc: 'The view that truth is entirely subjective or cultural. If all beliefs are equally true, then rational evaluation becomes impossible.',
                examples: [
                  'Example 1 (Subjectivism): Claiming "Astrology works for me, so it\'s true for me, regardless of astronomical physics."',
                  'Example 2 (Cultural Relativism): Arguing that human rights violations like slavery cannot be condemned because "it was part of their culture."'
                ]
              },
              {
                title: '5. Unwarranted Assumptions & Stereotyping',
                desc: 'Accepting claims without proof or forming rigid, generalized beliefs about all members of a group based on limited experience.',
                examples: [
                  'Example 1 (Stereotyping): Assuming a candidate will be terrible at quantitative data analysis based solely on their gender or regional accent.',
                  'Example 2 (Unwarranted Assumption): Assuming that because an expensive product has glossy packaging, it must be higher quality than a plain alternative.'
                ]
              }
            ].map((barrier, i) => (
              <div key={i} className="p-5 md:p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-red-500 shadow-sm">
                <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-2">{barrier.title}</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-4">{barrier.desc}</p>
                <div className="space-y-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  <p className="text-[10px] font-bold text-red-700 dark:text-red-300 uppercase tracking-wider">Concrete Examples:</p>
                  {barrier.examples.map((ex, idx) => (
                    <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 border-l-2 border-red-500 pl-2 py-0.5">
                      {ex}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Why Relativism Destroys Critical Thinking
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              If someone claims "What is true for you is true for you, and what is true for me is true for me," they eliminate the possibility of error. If no belief can be false, then no belief requires evidence, destroying the very foundation of critical inquiry.
            </p>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Corporate Groupthink
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              In the early 2000s, Kodak engineers invented digital photography technology. However, executive leadership suffered from <strong>Sociocentrism & Groupthink</strong>—conforming to the internal consensus that film revenue would never die. This refusal to critically evaluate market trends led to bankruptcy.
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Recognizing Barriers</h4>
              <ExerciseQuestion 
                question="A student refuses to accept scientific research on climate change because all their friends on social media say it is a hoax. Which barrier is this?"
                options={[
                  'Egocentrism',
                  'Sociocentrism (Groupthink)',
                  'Wishful Thinking',
                  'Subjectivism'
                ]}
                correctAnswer={1}
                explanation="This is Sociocentrism (specifically Groupthink), conforming to the beliefs of one's peer group rather than evaluating objective scientific evidence."
              />
            </div>

            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Self-Interested Thinking</h4>
              <ExerciseQuestion 
                question="A landlord argues that laws capping rent prices are unconstitutional simply because rent caps would reduce his personal income. What barrier is he displaying?"
                options={[
                  'Self-Interested Thinking (Egocentrism)',
                  'Ethnocentrism',
                  'Relativism',
                  'Self-Regulation'
                ]}
                correctAnswer={0}
                explanation="Self-Interested Thinking occurs when someone evaluates a policy strictly by whether it benefits their personal wallet or status rather than its objective merits."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 4.4: Characteristics of Critical Thinkers */}
        <section id="subtopic-4.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            4.4. Characteristics & Traits of Critical Thinkers
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Critical thinking is not just a skill set; it is a character trait. Critical thinkers cultivate specific <strong>intellectual virtues</strong> while overcoming uncritical habits.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-4 uppercase tracking-wider">🌟 Intellectual Virtues</h4>
              <ul className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <li><strong>Intellectual Humility:</strong> Recognizing the limits of one\'s knowledge and admitting when wrong.</li>
                <li><strong>Intellectual Courage:</strong> Willingness to examine and face ideas or beliefs even when uncomfortable.</li>
                <li><strong>Intellectual Empathy:</strong> Imagining oneself in the place of others to understand their perspective.</li>
                <li><strong>Intellectual Integrity:</strong> Holding oneself to the same strict standards one expects of opponents.</li>
                <li><strong>Intellectual Perseverance:</strong> Persisting through complex, confusing problems without giving up easily.</li>
                <li><strong>Faith in Reason:</strong> Trusting that logical evidence and reason lead to the best outcomes for humanity.</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-red-200 dark:border-red-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-lg text-red-600 dark:text-red-400 mb-4 uppercase tracking-wider">⚠️ Uncritical Traits to Avoid</h4>
              <ul className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <li className="line-through decoration-red-500"><strong>Intellectual Arrogance:</strong> Assuming one knows everything.</li>
                <li className="line-through decoration-red-500"><strong>Intellectual Cowardice:</strong> Fearing ideas that challenge norms.</li>
                <li className="line-through decoration-red-500"><strong>Intellectual Self-Centeredness:</strong> Ignoring others' viewpoints.</li>
                <li className="line-through decoration-red-500"><strong>Intellectual Hypocrisy:</strong> Holding double standards.</li>
                <li className="line-through decoration-red-500"><strong>Intellectual Laziness:</strong> Giving up when facing complexity.</li>
                <li className="line-through decoration-red-500"><strong>Distrust of Reason:</strong> Relying on gut feelings or dogma.</li>
              </ul>
            </div>
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Socrates on Intellectual Humility
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Socrates was declared the wisest man in Athens by the Oracle of Delphi. He concluded that he was wise only because: <em>"I know one thing, and that is that I know nothing."</em> Recognizing one's own ignorance is the prerequisite for all learning.
            </p>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Scientific Peer Review
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              When scientists submit papers for publication, independent experts rigorously attempt to find flaws in their research. Demonstrating <strong>Intellectual Integrity and Humility</strong>, scientists welcome critique, adjust their hypotheses based on flaws found, and improve scientific knowledge.
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Intellectual Virtues</h4>
              <ExerciseQuestion 
                question="A researcher discovers evidence that contradicts her own published theory, but publicly acknowledges the new data and updates her view. Which virtue is she exhibiting?"
                options={[
                  'Intellectual Arrogance',
                  'Intellectual Integrity & Humility',
                  'Sociocentrism',
                  'Wishful Thinking'
                ]}
                correctAnswer={1}
                explanation="Intellectual Integrity and Humility involve holding oneself accountable to truth, admitting errors, and submitting to evidence regardless of personal pride."
              />
            </div>

            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Intellectual Courage</h4>
              <ExerciseQuestion 
                question="Willingness to fairly evaluate ideas that are considered taboo or dangerous by one's society demonstrates:"
                options={[
                  'Intellectual Empathy',
                  'Intellectual Courage',
                  'Intellectual Laziness',
                  'Groupthink'
                ]}
                correctAnswer={1}
                explanation="Intellectual Courage is the willingness to examine ideas even when they trigger strong negative reactions from one's social group."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 4 Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Critical Thinking:</strong> The disciplined, metacognitive process of evaluating and refining one's reasoning through Analysis, Evaluation, Inference, and Self-Regulation.</p>
            <p><strong>✓ Intellectual Standards:</strong> Evaluated against Clarity, Accuracy, Precision, Relevance, Depth, Breadth, Logic, and Fairness.</p>
            <p><strong>✓ Cognitive Barriers:</strong> Must overcome Egocentrism, Sociocentrism (Groupthink), Wishful Thinking, Relativism, and Unwarranted Assumptions.</p>
            <p><strong>✓ Virtues of Thinkers:</strong> Cultivates Intellectual Humility, Courage, Empathy, Integrity, Perseverance, and Faith in Reason.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter3');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 3
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter5');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 5
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter4;
