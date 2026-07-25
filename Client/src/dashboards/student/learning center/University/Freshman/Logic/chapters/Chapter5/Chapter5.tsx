import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter5Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter5: React.FC<Chapter5Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Chapter 5 • Master Study Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          INFORMAL FALLACIES
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Welcome to Chapter 5! Informal fallacies are mistakes in reasoning that occur in everyday language. Because fallacies are psychologically persuasive, students often find them tricky. This guide breaks down <strong>every single fallacy</strong> with instant memory shortcuts, exam comparison callouts, real-life examples, and step-by-step practice questions!
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 5.1: Fallacy in General */}
        <section id="subtopic-5.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            5.1. Fallacy in General (Formal vs. Informal)
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>fallacy</strong> is a defect in an argument that arises from a flaw in reasoning or the creation of an illusion that makes a bad argument appear good.
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 md:p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">1. Formal Fallacies</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Errors detectable purely by inspecting the <em>form or structure</em> of a deductive argument. You don't even need to know what the words mean!
                </p>
                <div className="p-3 bg-white/90 dark:bg-slate-900/90 rounded text-xs font-mono text-slate-800 dark:text-slate-200">
                  <strong>Form:</strong> If P then Q. Q. Therefore P.<br/>
                  <em>Example:</em> "If it rains, the grass is wet. The grass is wet. Therefore, it rained." (Flawed structure!)
                </div>
              </div>

              <div className="p-4 md:p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">2. Informal Fallacies</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Errors detectable only by examining the <em>content, meaning, and context</em> of the statements in natural language.
                </p>
                <div className="p-3 bg-white/90 dark:bg-slate-900/90 rounded text-xs font-mono text-slate-800 dark:text-slate-200">
                  <strong>Content:</strong> "A feather is light. What is light cannot be dark. Therefore, a feather is not dark." (Flawed meaning of the word 'light').
                </div>
              </div>
            </div>

            {/* Exam Tip Callout */}
            <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-xl">
              <h4 className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400 mb-1 text-sm md:text-base">
                💡 Exam Warning: Truth Value vs. Fallacious Reasoning
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                A fallacious argument can still have a conclusion that happens to be factually true in real life! Calling an argument fallacious means the <strong>link between premise and conclusion is broken</strong>, NOT that the conclusion is automatically false.
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Exam Check Question 1</h4>
                <ExerciseQuestion 
                  question="Why can informal fallacies NOT be detected simply by looking at the symbolic pattern or algebraic structure of an argument?"
                  options={[
                    'Because informal fallacies only occur in mathematics',
                    'Because informal fallacies depend on the meaning, context, and content of words in natural language',
                    'Because informal fallacies are always deductive',
                    'Because informal fallacies only have one premise'
                  ]}
                  correctAnswer={1}
                  explanation="Informal fallacies rely on word ambiguity, psychological manipulation, or irrelevant content, which requires understanding natural language meaning rather than simple structural symbols."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.2: Fallacies of Relevance */}
        <section id="subtopic-5.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            5.2. Fallacies of Relevance
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Fallacies of relevance occur when the premises have <strong>no logical connection</strong> to the conclusion, even though they are psychologically persuasive.
          </p>

          <div className="space-y-6 mb-8">
            {[
              {
                name: '1. Appeal to Force (Argumentum ad Baculum)',
                shortcut: '💡 Memory Shortcut: "Agree with me or suffer harm/punishment!"',
                explanation: 'The arguer uses a physical, financial, or psychological threat instead of logical evidence to force compliance.',
                examples: [
                  'Example A: A boss tells an employee: "You should agree with my project proposal, unless you want to be fired before rent is due."',
                  'Example B: A country\'s diplomat states: "Accept our border terms, or our army will bomb your ports."',
                  'Example C: "If you don\'t vote for our party, God will punish our nation with disasters."'
                ]
              },
              {
                name: '2. Appeal to Pity (Argumentum ad Misericordiam)',
                shortcut: '💡 Memory Shortcut: "Evoke tears/sympathy instead of presenting evidence!"',
                explanation: 'The arguer attempts to support a conclusion by playing on the audience\'s feelings of pity, sadness, or hardship.',
                examples: [
                  'Example A: A student: "Professor, please give me a passing grade. My dog died, my phone broke, and I worked 30 hours this weekend!"',
                  'Example B: A lawyer in court: "Do not convict my client of bank robbery; he is an orphan who grew up in extreme poverty."',
                  'Example C: "You should hire me for this software engineering job because I have 4 hungry children at home."'
                ]
              },
              {
                name: '3. Appeal to the People (Argumentum ad Populum)',
                shortcut: '💡 Memory Shortcut: "Everyone is doing it / Join the winning group!"',
                explanation: 'Uses mob emotional desire for acceptance, popularity, or status. Has 2 main forms: Direct (mob passion) & Indirect (Bandwagon, Appeal to Vanity, Appeal to Snobbery).',
                examples: [
                  'Example A (Bandwagon): "80% of teenagers use app X, so you should download it right now!"',
                  'Example B (Appeal to Vanity): "Only elite, successful executives wear Rolex watches. Buy a Rolex today."',
                  'Example C (Direct Mob): A politician shouting to a roaring crowd to ignite mob enthusiasm without giving facts.'
                ]
              },
              {
                name: '4. Argument Against the Person (Ad Hominem)',
                shortcut: '💡 Memory Shortcut: "Attack the PERSON, not the ARGUMENT!"',
                explanation: 'Attacking the person presenting the claim rather than evaluating the claim itself. 3 Types:',
                subtypes: [
                  '• Abusive: Direct personal insults ("He is a liar / uneducated / stupid").',
                  '• Circumstantial: Attacking their personal situation or interest ("She only says that because she owns stock in the company").',
                  '• Tu Quoque ("You Too" / Hypocrisy): Rejecting advice because the speaker doesn\'t follow it ("Doctor: Stop smoking. Patient: You smoke too, so your medical advice is wrong!").'
                ],
                examples: [
                  'Example A (Abusive): "Ignore Dr. Smith\'s climate paper; he is an arrogant jerk."',
                  'Example B (Circumstantial): "Of course the mayor wants to build a bridge; his brother owns a construction firm."',
                  'Example C (Tu Quoque): "You tell me to save money, but you spent $500 on shoes last week!"'
                ]
              },
              {
                name: '5. Fallacy of Accident',
                shortcut: '💡 Memory Shortcut: "Applying a general rule to an extreme, exceptional situation!"',
                explanation: 'Occurs when a general rule is applied to a specific case that the rule was never intended to cover.',
                examples: [
                  'Example A: "Freedom of speech is a constitutional right. Therefore, shouting \'FIRE!\' in a crowded theater is legally protected."',
                  'Example B: "Thou shalt not kill. Therefore, a soldier killing an enemy in battlefield defense is a murderer."',
                  'Example C: "You should return borrowed items. Your friend gave you a gun, but is now suicidal. You must give him the gun back."'
                ]
              },
              {
                name: '6. Straw Man Fallacy',
                shortcut: '💡 Memory Shortcut: "Exaggerate/Distort opponent\'s argument into a weak dummy, then knock it down!"',
                explanation: 'Occurs when an arguer distorts an opponent\'s real argument into an extreme, ridiculous version, refutes the ridiculous version, and claims victory.',
                examples: [
                  'Example A: Candidate A: "We should increase funding for public schools." Candidate B: "My opponent wants to abolish the military and leave us defenseless!"',
                  'Example B: "He suggested eating less fast food, which means he wants the government to ban all meat worldwide."',
                  'Example C: "She wants to lower tuition fees, which means she wants universities to close down forever."'
                ]
              },
              {
                name: '7. Missing the Point (Ignoratio Elenchi)',
                shortcut: '💡 Memory Shortcut: "Premises support Conclusion A, but arguer draws wild Conclusion B instead!"',
                explanation: 'Occurs when the premises support one specific conclusion, but a completely unexpected, illogical conclusion is drawn instead.',
                examples: [
                  'Example A: "Crimes of theft have increased by 50% in our city. Therefore, we should abolish all police departments immediately!"',
                  'Example B: "Housing costs are skyrocketing. Therefore, all citizens should be forced to live in tents."',
                  'Example C: "Abuse of alcohol causes severe health problems. Therefore, we must ban the sale of all soft drinks."'
                ]
              },
              {
                name: '8. Red Herring Fallacy',
                shortcut: '💡 Memory Shortcut: "Change the subject completely to a distracting topic!"',
                explanation: 'Occurs when the arguer diverts the attention of the audience by introducing a different, highly emotional topic, then drawing a conclusion on the new topic.',
                examples: [
                  'Example A: "Why worry about climate change when thousands of people are struggling to pay rent right now? Rent is the real crisis!"',
                  'Example B: Reporter: "Did you take bribes?" Politician: "What we really need to focus on is how hard our police force works every day!"',
                  'Example C: "Daughter: Mom, why can\'t I go to the party? Mom: Look at how dirty your bedroom is! Go clean it."'
                ]
              }
            ].map((fallacy, i) => (
              <div key={i} className="p-5 md:p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-blue-500 shadow-sm">
                <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-1">{fallacy.name}</h4>
                <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded font-mono text-xs font-bold mb-3">
                  {fallacy.shortcut}
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">{fallacy.explanation}</p>
                {fallacy.subtypes && (
                  <div className="mb-3 p-3 bg-slate-50 dark:bg-slate-800 rounded text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    {fallacy.subtypes.map((st, idx) => <p key={idx}>{st}</p>)}
                  </div>
                )}
                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">3 Clear Real-Life Examples:</p>
                  {fallacy.examples.map((ex, idx) => (
                    <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 border-l-2 border-blue-400 pl-2">
                      {ex}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Exam Comparison Callout */}
          <div className="my-6 p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 rounded-xl">
            <h4 className="font-bold text-purple-900 dark:text-purple-300 text-sm md:text-base mb-2">
              ⚡ Exam Comparison: Straw Man vs. Red Herring vs. Missing the Point
            </h4>
            <ul className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2">
              <li>• <strong>Straw Man:</strong> Distorts opponent's argument ("He said X, but he really means extreme Y!").</li>
              <li>• <strong>Red Herring:</strong> Changes the subject entirely ("Forget X, let's talk about emotional topic Z!").</li>
              <li>• <strong>Missing the Point:</strong> Keeps the topic, but draws a wild/wrong conclusion ("Evidence shows X, so we should do crazy action Y!").</li>
            </ul>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Straw Man</h4>
              <ExerciseQuestion 
                question="A town council member suggests installing a bicycle lane. An opponent responds: 'My colleague wants to ban all cars and force citizens to ride bikes in winter weather!' What fallacy is this?"
                options={[
                  'Straw Man Fallacy',
                  'Red Herring Fallacy',
                  'Appeal to Force',
                  'Ad Hominem Tu Quoque'
                ]}
                correctAnswer={0}
                explanation="STRAW MAN because the opponent distorts a modest proposal (bike lane) into an extreme ridiculous version (banning all cars)."
              />
            </div>

            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Ad Hominem Tu Quoque</h4>
              <ExerciseQuestion 
                question="A physician advises a patient to exercise regularly. The patient rejects the advice saying: 'You are overweight yourself, so why should I listen to you?' What fallacy is committed?"
                options={[
                  'Ad Hominem Tu Quoque ("You Too")',
                  'Fallacy of Accident',
                  'Missing the Point',
                  'Appeal to Ignorance'
                ]}
                correctAnswer={0}
                explanation="AD HOMINEM TU QUOQUE because the patient dismisses medical advice by pointing out the doctor's personal hypocrisy."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.3: Fallacies of Weak Induction */}
        <section id="subtopic-5.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            5.3. Fallacies of Weak Induction
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Fallacies of weak induction occur when the connection between premises and conclusion is <strong>too weak to support the conclusion</strong>.
          </p>

          <div className="space-y-6 mb-8">
            {[
              {
                name: '1. Appeal to Unqualified Authority (Ad Verecundiam)',
                shortcut: '💡 Memory Shortcut: "Cited expert lacks relevant expertise in THIS field!"',
                explanation: 'Occurs when an arguer cites a witness or famous figure who lacks expertise in the specific subject matter being debated.',
                examples: [
                  'Example A: A world-famous movie star endorsing a complex prescription heart medication on TV.',
                  'Example B: Quoting a top football player to prove a point about international constitutional law.',
                  'Example C: A brilliant chemist giving advice on how to treat clinical psychological depression.'
                ]
              },
              {
                name: '2. Appeal to Ignorance (Ad Ignorantiam)',
                shortcut: '💡 Memory Shortcut: "Unproven false = Must be true!" (or vice-versa)',
                explanation: 'Arguing that a claim must be true simply because nobody has proven it false, or false because nobody has proven it true.',
                examples: [
                  'Example A: "No scientist has ever proven that aliens don\'t exist, so aliens definitely exist!"',
                  'Example B: "Nobody has proven that ghosts exist, so ghosts are 100% impossible."',
                  'Example C: "You can\'t prove I cheated on the test, so I am innocent!"'
                ]
              },
              {
                name: '3. Hasty Generalization (Converse Accident)',
                shortcut: '💡 Memory Shortcut: "Small/Unrepresentative Sample → Generalizing to ALL!"',
                explanation: 'Drawing a universal conclusion about an entire group based on an unrepresentatively small sample size.',
                examples: [
                  'Example A: "I met two rude tourists from Country X today. Everyone from Country X is rude!"',
                  'Example B: "My Samsung phone glitched today, so all Samsung electronics are junk."',
                  'Example C: "Two students failed the quiz, so the professor is terrible at teaching."'
                ]
              },
              {
                name: '4. False Cause (Post Hoc & Oversimplified Cause)',
                shortcut: '💡 Memory Shortcut: "B happened AFTER A → Therefore A caused B!"',
                explanation: 'Assuming that because Event A happened before Event B, Event A caused Event B (Post Hoc Ergo Propter Hoc).',
                examples: [
                  'Example A (Post Hoc): "I wore red socks today and won the lottery; red socks cause lottery wins!"',
                  'Example B (Post Hoc): "A black cat crossed the street, and 10 minutes later I slipped. The cat caused my fall."',
                  'Example C (Oversimplified Cause): "Crime dropped in the city solely because of the new mayor," ignoring employment, police hiring, and population shifts.'
                ]
              },
              {
                name: '5. Slippery Slope',
                shortcut: '💡 Memory Shortcut: "One tiny step will trigger an unstoppable disaster avalanche!"',
                explanation: 'Arguing without evidence that a small initial step will inevitably lead to a chain reaction of catastrophic events.',
                examples: [
                  'Example A: "If we let students retake one quiz, they will stop studying, schools will fail, and society will collapse!"',
                  'Example B: "If you buy a cheap laptop, it will break, you will fail college, and end up homeless under a bridge."',
                  'Example C: "If we grant a 5-minute break, workers will demand 4-hour workdays next week."'
                ]
              },
              {
                name: '6. Weak Analogy',
                shortcut: '💡 Memory Shortcut: "Comparing two things whose differences outweigh similarities!"',
                explanation: 'Occurs when an argument depends on an analogy between two things that are not similar enough in relevant aspects.',
                examples: [
                  'Example A: "Employees are like nails. Just as you must hit nails on the head to make them work, you must beat employees to make them work."',
                  'Example B: "Water is liquid and coffee is liquid. Since water freezes at 0°C, coffee will turn into ice at 0°C under any condition."',
                  'Example C: "Cars require oil changes every 5,000 miles, so humans should drink oil every 5,000 miles."'
                ]
              }
            ].map((fallacy, i) => (
              <div key={i} className="p-5 md:p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-1">{fallacy.name}</h4>
                <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 rounded font-mono text-xs font-bold mb-3">
                  {fallacy.shortcut}
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">{fallacy.explanation}</p>
                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">3 Clear Real-Life Examples:</p>
                  {fallacy.examples.map((ex, idx) => (
                    <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 border-l-2 border-indigo-400 pl-2">
                      {ex}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Exam Comparison Callout */}
          <div className="my-6 p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-xl">
            <h4 className="font-bold text-amber-900 dark:text-amber-300 text-sm md:text-base mb-2">
              ⚡ Exam Tip: Hasty Generalization vs. Post Hoc (False Cause)
            </h4>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
              • <strong>Hasty Generalization:</strong> Generalizing about a whole GROUP based on a small sample ("I met 2 rude doctors, ALL doctors are rude").<br/>
              • <strong>Post Hoc (False Cause):</strong> Claiming TIME SEQUENCE proves causation ("I washed my car, THEN it rained, so washing my car caused rain").
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Post Hoc Ergo Propter Hoc</h4>
              <ExerciseQuestion 
                question="A rooster crows every morning at 5:30 AM right before sunrise. He concludes: 'My crowing causes the sun to rise.' What fallacy is this?"
                options={[
                  'Post Hoc (False Cause)',
                  'Slippery Slope',
                  'Appeal to Ignorance',
                  'Weak Analogy'
                ]}
                correctAnswer={0}
                explanation="POST HOC (False Cause) because the rooster assumes time sequence (crowing before sunrise) proves causal effect."
              />
            </div>

            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Appeal to Unqualified Authority</h4>
              <ExerciseQuestion 
                question="A pop singer in a TV commercial states that a specific brand of motor oil extends car engine life by 50%. What fallacy is committed?"
                options={[
                  'Appeal to Unqualified Authority',
                  'Hasty Generalization',
                  'Straw Man',
                  'Equivocation'
                ]}
                correctAnswer={0}
                explanation="APPEAL TO UNQUALIFIED AUTHORITY because a pop singer has no professional engineering expertise in automotive engines."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.4: Fallacies of Presumption */}
        <section id="subtopic-5.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            5.4. Fallacies of Presumption
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Fallacies of presumption occur when the premises <strong>assume what they are supposed to prove</strong>.
          </p>

          <div className="space-y-6 mb-8">
            {[
              {
                name: '1. Begging the Question (Petitio Principii)',
                shortcut: '💡 Memory Shortcut: "Circular Reasoning / Assuming the conclusion in the premise!"',
                explanation: 'The arguer creates the illusion that inadequate premises provide support by leaving out a key premise, restating the conclusion in different words, or reasoning in a circle.',
                examples: [
                  'Example A: "Capital punishment is justified because executing murderers is morally right."',
                  'Example B: "The Bible is inspired by God because God wrote it, and God wouldn\'t lie because the Bible says so."',
                  'Example C: "Opium induces sleep because it possesses a dormitive property."'
                ]
              },
              {
                name: '2. Complex Question',
                shortcut: '💡 Memory Shortcut: "Loaded trick question with a hidden unproven trap!"',
                explanation: 'Asking a single question that conceals a hidden, unproven assumption so that any direct answer traps the respondent into admitting guilt.',
                examples: [
                  'Example A: "Have you stopped cheating on your exams?" (Answering YES admits you used to cheat; answering NO admits you still cheat!).',
                  'Example B: "Why is your company polluting the river?" (Presumes as fact that the company IS polluting).',
                  'Example C: "Where did you hide the stolen money?" (Presumes as fact that you stole money).'
                ]
              },
              {
                name: '3. False Dichotomy (Either-Or Fallacy)',
                shortcut: '💡 Memory Shortcut: "Forcing TWO extreme options when middle options exist!"',
                explanation: 'Presenting two extreme options as the only possible choices when in reality more reasonable intermediate options exist.',
                examples: [
                  'Example A: "Either you buy this $1,000 security system today, or your house will be burgled tomorrow."',
                  'Example B: "Either you support our political party 100%, or you hate your country."',
                  'Example C: "Either you study 15 hours a day, or you will fail life."'
                ]
              },
              {
                name: '4. Suppressed Evidence',
                shortcut: '💡 Memory Shortcut: "Hiding crucial counter-evidence that ruins the argument!"',
                explanation: 'Ignoring or intentionally omitting key evidence that undermines the argument and leads to a completely different conclusion.',
                examples: [
                  'Example A: Advertising a sports car as "0 to 100 km/h in 3 seconds!" while hiding that the transmission fails after 50 miles.',
                  'Example B: Promoting a city\'s tourism by showing sunny beach photos while suppressing the fact that it has 6 months of freezing blizzards.',
                  'Example C: Arguing a drug is safe based on 1 trial while hiding 10 trials showing dangerous side effects.'
                ]
              }
            ].map((fallacy, i) => (
              <div key={i} className="p-5 md:p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-purple-500 shadow-sm">
                <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-1">{fallacy.name}</h4>
                <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 rounded font-mono text-xs font-bold mb-3">
                  {fallacy.shortcut}
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">{fallacy.explanation}</p>
                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">3 Clear Real-Life Examples:</p>
                  {fallacy.examples.map((ex, idx) => (
                    <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 border-l-2 border-purple-400 pl-2">
                      {ex}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Complex Question</h4>
              <ExerciseQuestion 
                question="A reporter asks a mayor: 'When will you stop wasting taxpayer money on useless projects?' What fallacy is this?"
                options={[
                  'Complex Question',
                  'False Dichotomy',
                  'Begging the Question',
                  'Red Herring'
                ]}
                correctAnswer={0}
                explanation="COMPLEX QUESTION because it contains a hidden presumption that the mayor is currently wasting money."
              />
            </div>

            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: False Dichotomy</h4>
              <ExerciseQuestion 
                question="'Either you agree with my plan, or you want our company to go bankrupt!' What fallacy is committed?"
                options={[
                  'False Dichotomy (Either-Or)',
                  'Suppressed Evidence',
                  'Equivocation',
                  'Hasty Generalization'
                ]}
                correctAnswer={0}
                explanation="FALSE DICHOTOMY because it forces two extreme options while ignoring compromise plans."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.5: Fallacies of Ambiguity and Grammatical Analogy */}
        <section id="subtopic-5.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            5.5. Fallacies of Ambiguity and Grammatical Analogy
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            These fallacies arise from double meanings of words (Ambiguity) or flawed transfers between parts and wholes (Grammatical Analogy).
          </p>

          <div className="space-y-6 mb-8">
            {[
              {
                name: '1. Equivocation (Ambiguity of a Word)',
                shortcut: '💡 Memory Shortcut: "Using ONE word with TWO DIFFERENT meanings in the same argument!"',
                explanation: 'Occurs when a key word or phrase shifts meaning from one part of the argument to another.',
                examples: [
                  'Example A: "A feather is light. What is light cannot be dark. Therefore, a feather is not dark." (Shifts between light weight vs light color).',
                  'Example B: "All laws require a lawmaker. Gravity is a natural law. Therefore, gravity requires a lawmaker." (Shifts between human legal law vs physical law).',
                  'Example C: "Giving to charity is good. Making profit is good. Therefore, giving to charity makes profit."'
                ]
              },
              {
                name: '2. Amphiboly (Ambiguity of Syntax/Grammar)',
                shortcut: '💡 Memory Shortcut: "Faulty sentence grammar creates a double meaning!"',
                explanation: 'Occurs when the arguer misinterprets a statement whose ambiguity is caused by bad grammar or awkward punctuation.',
                examples: [
                  'Example A: "The professor said he would give a lecture on Tuesday about alien life in the auditorium." (Is alien life inside the auditorium?).',
                  'Example B: "For sale: Antique desk suitable for lady with thick curved legs."',
                  'Example C: "Save soap and waste paper." (Save soap & waste paper, OR save soap & save paper?)'
                ]
              },
              {
                name: '3. Fallacy of Composition (Part → Whole)',
                shortcut: '💡 Memory Shortcut: "Attribute of PARTS incorrectly applied to the WHOLE!"',
                explanation: 'Erroneously transferring an attribute from individual parts/members of a whole to the whole itself.',
                examples: [
                  'Example A: "Every brick in this building weighs 1 kg. Therefore, the entire building weighs 1 kg."',
                  'Example B: "Every player on this basketball team is a superstar, so this team will easily win."',
                  'Example C: "Every atom in this table is invisible to the naked eye. Therefore, the table is invisible."'
                ]
              },
              {
                name: '4. Fallacy of Division (Whole → Part)',
                shortcut: '💡 Memory Shortcut: "Attribute of WHOLE incorrectly applied to the PARTS!"',
                explanation: 'Erroneously transferring an attribute from the whole to its individual parts/members.',
                examples: [
                  'Example A: "This airplane is massive, so every bolt inside it must be massive."',
                  'Example B: "Company Z is extremely profitable, so every employee working there earns a huge salary."',
                  'Example C: "Water is liquid, so every hydrogen atom inside water is liquid."'
                ]
              }
            ].map((fallacy, i) => (
              <div key={i} className="p-5 md:p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-emerald-500 shadow-sm">
                <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-1">{fallacy.name}</h4>
                <div className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 rounded font-mono text-xs font-bold mb-3">
                  {fallacy.shortcut}
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">{fallacy.explanation}</p>
                <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">3 Clear Real-Life Examples:</p>
                  {fallacy.examples.map((ex, idx) => (
                    <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 border-l-2 border-emerald-400 pl-2">
                      {ex}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Exam Comparison Callout */}
          <div className="my-6 p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-xl">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm md:text-base mb-2">
              ⚡ Exam Tip: Composition vs. Hasty Generalization
            </h4>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
              • <strong>Composition:</strong> Moves from PART of a structure to the WHOLE structure ("Bricks → Building").<br/>
              • <strong>Hasty Generalization:</strong> Moves from SAMPLE members of a class to ALL members of a class ("Sample students → All students").
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Fallacy of Division</h4>
              <ExerciseQuestion 
                question="'Harvard University is a prestigious institution. Therefore, every student attending Harvard must be exceptionally brilliant.' What fallacy is this?"
                options={[
                  'Fallacy of Division',
                  'Fallacy of Composition',
                  'Equivocation',
                  'Hasty Generalization'
                ]}
                correctAnswer={0}
                explanation="FALLACY OF DIVISION because an attribute of the whole institution (prestige) is improperly assigned to every individual student part."
              />
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Equivocation</h4>
              <ExerciseQuestion 
                question="'Man is the only rational animal. No woman is a man. Therefore, no woman is a rational animal.' What fallacy is committed?"
                options={[
                  'Equivocation',
                  'Amphiboly',
                  'Division',
                  'Straw Man'
                ]}
                correctAnswer={0}
                explanation="EQUIVOCATION because 'man' shifts from meaning mankind/humanity in premise 1 to biological male in premise 2."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 5 Ultimate Cheat Sheet</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Relevance:</strong> Ad Hominem (attack person), Straw Man (distort argument), Red Herring (change topic), Ad Baculum (threats), Ad Misericordiam (pity).</p>
            <p><strong>✓ Weak Induction:</strong> Ad Verecundiam (fake expert), Ad Ignorantiam (unproven = true), Hasty Generalization (small sample), Post Hoc (time = cause), Slippery Slope (avalanche), Weak Analogy (bad comparison).</p>
            <p><strong>✓ Presumption:</strong> Begging the Question (circular), Complex Question (loaded trap), False Dichotomy (either-or), Suppressed Evidence (hiding facts).</p>
            <p><strong>✓ Ambiguity & Analogy:</strong> Equivocation (double word meaning), Amphiboly (bad grammar), Composition (Part → Whole), Division (Whole → Part).</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 4
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter6');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 6
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter5;
