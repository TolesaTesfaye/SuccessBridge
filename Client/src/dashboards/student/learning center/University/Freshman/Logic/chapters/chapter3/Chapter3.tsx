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
          Chapter 3
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          LOGIC AND LANGUAGE
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Welcome to Chapter 3! Language is the primary vehicle through which we express and evaluate logical arguments. In this chapter, you will explore the primary functions of language, intentional and extensional meanings, emotive words, methods of definition, and the rules governing definitions.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 3.1: Language and Logic */}
        <section id="subtopic-3.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            3.1. Language and Logic
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Language serves many purposes in daily communication. However, logic is primarily interested in language as a means of expressing <strong>arguments</strong> and <strong>propositions</strong>. To analyze logic effectively, we must first understand the fundamental functions of language.
            </p>

            <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">The Primary Functions of Language</h3>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  title: '1. Cognitive / Informative Function',
                  desc: 'Used to convey information, describe facts, or assert propositions that can be judged as either TRUE or FALSE. Logic deals primarily with this function.',
                  example: '"Addis Ababa is the capital city of Ethiopia."',
                  color: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
                  icon: '📘'
                },
                {
                  title: '2. Expressive Function',
                  desc: 'Used to express or evoke feelings, emotions, attitudes, or moods. Expressive statements are neither true nor false.',
                  example: '"Ouch! That hot coffee burned my tongue!"',
                  color: 'border-pink-500 bg-pink-50 dark:bg-pink-900/20',
                  icon: '❤️'
                },
                {
                  title: '3. Directive Function',
                  desc: 'Used to cause or prevent an action, such as commands, requests, or instructions. Commands cannot be true or false.',
                  example: '"Please turn off the lights when leaving the room."',
                  color: 'border-amber-500 bg-amber-50 dark:bg-amber-900/20',
                  icon: '📢'
                },
                {
                  title: '4. Performative Function',
                  desc: 'Language that performs the action it describes when uttered under appropriate circumstances.',
                  example: '"I now pronounce you husband and wife."',
                  color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
                  icon: '✨'
                }
              ].map((func, i) => (
                <div key={i} className={`p-4 md:p-6 border-l-4 rounded-xl ${func.color} border-slate-200 dark:border-slate-800`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{func.icon}</span>
                    <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white">{func.title}</h4>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">{func.desc}</p>
                  <div className="p-2 md:p-3 bg-white/70 dark:bg-slate-900/70 rounded text-xs md:text-sm italic font-mono text-slate-700 dark:text-slate-300">
                    {func.example}
                  </div>
                </div>
              ))}
            </div>

            {/* Detail Note 1 */}
            <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
              <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
                <span>📝</span> Detail Note: Disagreements in Belief vs Disagreements in Attitude
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Logicians distinguish between two types of disputes in communication:
                <br/>
                <strong>1. Disagreement in Belief:</strong> Occurs when parties disagree over factual claims (Cognitive). Example: Disagreeing on the exact population of a city. Can be resolved by consulting facts.
                <br/>
                <strong>2. Disagreement in Attitude:</strong> Occurs when parties disagree in their feelings, evaluations, or preferences (Expressive). Example: Disagreeing on whether a movie is "great" or "boring".
              </p>
            </div>

            {/* Real-World Example */}
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
              <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
                <span>🌍</span> Real-World Example: Political Speeches & Advertising
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Political speeches often mix <strong>expressive language</strong> ("We are fighting for justice and dignity!") with <strong>directive language</strong> ("Vote for Candidate X on Tuesday!"). Logicians must carefully separate the emotional appeal (expressive) from the factual claims (informative) to evaluate whether the argument itself is logically sound.
              </p>
            </div>

            {/* Practice Exercises at Key Points */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Practice Question 1: Truth Values & Functions</h4>
                <ExerciseQuestion 
                  question="Which function of language is directly involved in statements that can be judged as True or False?"
                  options={[
                    'Expressive Function',
                    'Cognitive / Informative Function',
                    'Directive Function',
                    'Performative Function'
                  ]}
                  correctAnswer={1}
                  explanation="The Cognitive / Informative function is the ONLY function that conveys factual statements that have a truth value (can be True or False)."
                />
              </div>

              <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Practice Question 2: Identifying Language Functions</h4>
                <ExerciseQuestion 
                  question="A sign in a library reads: 'Please keep quiet and turn off your mobile phones.' What primary function of language does this serve?"
                  options={[
                    'Informative Function',
                    'Expressive Function',
                    'Directive Function',
                    'Performative Function'
                  ]}
                  correctAnswer={2}
                  explanation="This is the DIRECTIVE function because it gives instructions or commands aimed at causing or preventing specific actions."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 3.2: Types of Language & Meaning */}
        <section id="subtopic-3.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            3.2. Intentional & Extensional Meaning & Emotive Words
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 md:mb-8">
            Words are symbols that stand for things, qualities, or concepts. In logic, terms have two basic kinds of meaning: <strong>Intentional (Connotative)</strong> and <strong>Extensional (Denotative)</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 border-l-4 border-indigo-500 bg-white dark:bg-slate-900 shadow-sm rounded-r-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Intentional Meaning (Connotation)</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                Consists of the <strong>qualities or attributes</strong> that a term connotes or implies. It is the definition or essential characteristics of the concept.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded">
                <p className="text-xs font-bold text-indigo-500 uppercase mb-1">Example: "Cat"</p>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200">Attribute: Furry, carnivorous, quadruped, feline mammal.</p>
              </div>
            </div>

            <div className="p-6 border-l-4 border-blue-500 bg-white dark:bg-slate-900 shadow-sm rounded-r-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Extensional Meaning (Denotation)</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                Consists of the <strong>members of the class</strong> that the term denotes or refers to in the real world.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded">
                <p className="text-xs font-bold text-blue-500 uppercase mb-1">Example: "Cat"</p>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200">Members: All individual cats that exist in the world (Lions, Tigers, Domestic Cats, etc.).</p>
              </div>
            </div>
          </div>

          {/* Key Concept: Order of Terms */}
          <div className="p-6 border-2 border-indigo-200 dark:border-indigo-900 rounded-2xl bg-white dark:bg-slate-900 mb-8">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3">Order of Terms: Connotation vs Denotation</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              As terms become more specific, their <strong>intentional meaning (connotation) increases</strong> while their <strong>extensional meaning (denotation) decreases</strong>.
            </p>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <p><strong>Increasing Intention (Connotation):</strong> Animal → Mammal → Feline → Tiger</p>
              <p className="text-xs text-slate-500">(Each step adds more specific qualities/attributes).</p>
              <hr className="my-2 border-indigo-200 dark:border-indigo-800"/>
              <p><strong>Increasing Extension (Denotation):</strong> Tiger → Feline → Mammal → Animal</p>
              <p className="text-xs text-slate-500">(Each step includes a larger group/class of living things).</p>
            </div>
          </div>

          {/* Emotive Words */}
          <div className="p-6 border-2 border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Emotive Words & Loaded Terminology</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Many terms possess both a literal (cognitive) meaning and an <strong>emotive resonance</strong>. Using "loaded" language can subtly manipulate an audience by triggering positive or negative feelings rather than providing rational proof.
            </p>
            <div className="grid grid-cols-3 gap-2 md:gap-4 text-center text-xs md:text-sm font-medium">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-lg">
                <span className="block font-bold mb-1">Positive Connotation</span>
                "Frugal / Thrifty"
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg">
                <span className="block font-bold mb-1">Neutral Term</span>
                "Careful with money"
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg">
                <span className="block font-bold mb-1">Negative Connotation</span>
                "Stingy / Cheap"
              </div>
            </div>
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Empty Extension
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Some terms have intentional meaning (connotation) but an <strong>empty extension</strong> (denotation). For example, terms like "Unicorn", "Dragon", or "Current King of France" have clear attributes and meanings, but refer to zero real objects in the physical world.
            </p>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Advertising & Rebranding
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Car dealerships rarely sell "used cars"—they sell <strong>"pre-owned certified vehicles"</strong>. The factual denotation is identical, but the loaded emotive term "pre-owned" avoids the negative feelings associated with the word "used". Recognizing loaded language helps consumers make rational decisions.
            </p>
          </div>

          {/* Practice Exercises at Key Points */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Extensional Meaning</h4>
              <ExerciseQuestion 
                question="What is the extensional meaning (denotation) of the term 'Planet in our solar system'?"
                options={[
                  'A large celestial body orbiting a star',
                  'Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
                  'Spherical, massive, and gravitationally dominant',
                  'The dictionary entry for the word planet'
                ]}
                correctAnswer={1}
                explanation="Extensional meaning (denotation) refers to the actual individual members of the class (the planets themselves: Earth, Mars, etc.). The qualities/attributes describe the INTENTIONAL meaning (connotation)."
              />
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Term Ordering</h4>
              <ExerciseQuestion 
                question="Which of the following sequences is arranged in order of INCREASING INTENTION (Connotation)?"
                options={[
                  'Golden Retriever → Dog → Canine → Animal',
                  'Animal → Canine → Dog → Golden Retriever',
                  'Dog → Golden Retriever → Animal → Canine',
                  'Animal → Dog → Golden Retriever → Canine'
                ]}
                correctAnswer={1}
                explanation="Intention (Connotation) increases as terms become MORE SPECIFIC because more defining attributes are added at each step (Animal → Canine → Dog → Golden Retriever)."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 3.3: Definitions and Their Types */}
        <section id="subtopic-3.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            3.3. Definitions and Their Types
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            A <strong>definition</strong> is a statement that assigns a meaning to a word or group of words. Every definition consists of two essential parts:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 md:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-600">
              <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">Definiendum</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">The word or symbol being defined.</p>
            </div>
            <div className="p-4 md:p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border-l-4 border-indigo-600">
              <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">Definiens</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">The group of words that assigns the meaning to the definiendum.</p>
            </div>
          </div>

          <h3 className="text-base md:text-2xl font-bold text-slate-900 dark:text-white mb-4">The Five Major Types of Definitions</h3>

          <div className="space-y-4 mb-8">
            {[
              {
                type: '1. Stipulative Definition',
                desc: 'Assigns a completely new meaning to a word (or creates a brand-new word) for a specific purpose.',
                example: 'Coining terms like "Selfie", "Byte", or naming a new scientific element.',
                border: 'border-blue-500'
              },
              {
                type: '2. Lexical Definition',
                desc: 'Reports the meaning that a word already has in standard usage (e.g., dictionary definition). Can be true or false based on actual usage.',
                example: '"Bachelor: An unmarried man."',
                border: 'border-emerald-500'
              },
              {
                type: '3. Precising Definition',
                desc: 'Reduces the vagueness of a word in a specific context (e.g., legal or technical contexts).',
                example: '"Poor: Having an annual household income below $15,000."',
                border: 'border-indigo-500'
              },
              {
                type: '4. Theoretical Definition',
                desc: 'Formulates a characterization of the term based on a specific scientific or philosophical theory.',
                example: '"Heat: The energy of random molecular motion."',
                border: 'border-purple-500'
              },
              {
                type: '5. Persuasive Definition',
                desc: 'Engenders a favorable or unfavorable attitude toward the thing defined by using emotionally loaded language.',
                example: '"Abortion: The ruthless murder of an innocent unborn child."',
                border: 'border-red-500'
              }
            ].map((item, i) => (
              <div key={i} className={`p-4 md:p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 ${item.border} shadow-sm`}>
                <h4 className="font-bold text-sm md:text-lg text-slate-900 dark:text-white mb-2">{item.type}</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">{item.desc}</p>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 italic">Example: {item.example}</p>
              </div>
            ))}
          </div>

          {/* Methods of Defining Terms */}
          <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900 mb-8">
            <h4 className="font-bold text-base md:text-xl text-slate-900 dark:text-white mb-4">⚙️ Key Methods of Defining Terms</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h5 className="font-bold text-sm text-blue-900 dark:text-blue-200 mb-2">Intentional (Connotative) Methods</h5>
                <ul className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc ml-4">
                  <li><strong>Synonymous Definition:</strong> Giving another word with the same meaning (e.g., "Physician means doctor").</li>
                  <li><strong>Etymological Definition:</strong> Explaining the historical roots/origin of the word.</li>
                  <li><strong>Operational Definition:</strong> Defining a term by specifying a test or procedure (e.g., "Acid means a substance that turns blue litmus paper red").</li>
                  <li><strong>Definition by Genus and Difference:</strong> Specifying the larger class (genus) and the specific attribute that sets it apart (difference).</li>
                </ul>
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <h5 className="font-bold text-sm text-indigo-900 dark:text-indigo-200 mb-2">Extensional (Denotative) Methods</h5>
                <ul className="text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc ml-4">
                  <li><strong>Ostensive (Demonstrative):</strong> Pointing to the object directly (e.g., pointing at a chair and saying "That is a chair").</li>
                  <li><strong>Enumerative Definition:</strong> Listing specific individual members of the class (e.g., "Ocean means the Atlantic, Pacific, Indian, Arctic, or Southern ocean").</li>
                  <li><strong>Definition by Subclass:</strong> Listing smaller categories within the class (e.g., "Cetacean means whales, dolphins, or porpoises").</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rules of Lexical Definitions */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8">
            <h4 className="font-bold text-base md:text-xl text-slate-900 dark:text-white mb-4">📋 Rules for Constructing Good Lexical Definitions</h4>
            <ul className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">Rule 1:</span>
                <span>Should conform to standard grammatical usage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">Rule 2:</span>
                <span>Should convey the essential meaning of the word.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">Rule 3:</span>
                <span>Should be neither too broad nor too narrow. (e.g., "Bird: A flying animal" is too broad because bats fly).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">Rule 4:</span>
                <span>Should avoid circularity. (e.g., "Scientist: A person who practices science").</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">Rule 5:</span>
                <span>Should not be negative when it can be affirmative.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600">Rule 6:</span>
                <span>Should avoid figurative, obscure, or vague language.</span>
              </li>
            </ul>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Tax Law & Precising Definitions
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              In everyday language, "dependent" is vague. However, the IRS uses a <strong>Precising Definition</strong>: "A dependent is an individual who is a qualifying child or relative who receives over 50% of financial support from the taxpayer." This eliminates ambiguity so tax laws can be applied fairly and strictly.
            </p>
          </div>

          {/* Practice Exercises at Key Points */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Practice Question 1: Types of Definitions</h4>
              <ExerciseQuestion 
                question="A definition created by a law to state exactly what constitutes 'speeding' (e.g. driving over 60 km/h) is best classified as a:"
                options={[
                  'Stipulative definition',
                  'Precising definition',
                  'Theoretical definition',
                  'Persuasive definition'
                ]}
                correctAnswer={1}
                explanation="This is a Precising definition. It takes a vague everyday term ('speeding') and defines strict numerical boundaries to remove vagueness for legal enforcement."
              />
            </div>

            <div className="p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🤔 Practice Question 2: Flaws in Definitions</h4>
              <ExerciseQuestion 
                question="What rule of lexical definition is violated by: 'An architect is a person who designs architectural buildings'?"
                options={[
                  'The definition is too narrow',
                  'The definition is circular',
                  'The definition is figurative',
                  'The definition is negative'
                ]}
                correctAnswer={1}
                explanation="This definition is CIRCULAR because it uses the root word 'architectural' inside the definiens to define 'architect', providing no real explanation of what the work entails."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 3 Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Functions of Language:</strong> Logic focuses primarily on the Cognitive/Informative function because it deals with truth values (True/False).</p>
            <p><strong>✓ Connotation & Denotation:</strong> Intentional meaning refers to attributes (connotation); Extensional meaning refers to real-world members (denotation).</p>
            <p><strong>✓ Emotive Words:</strong> Loaded language can obscure logical argument analysis by triggering emotional rather than rational responses.</p>
            <p><strong>✓ Types & Methods of Definitions:</strong> Includes Stipulative, Lexical, Precising, Theoretical, and Persuasive definitions, as well as Intentional (Genus & Difference) and Extensional (Ostensive, Enumerative) methods.</p>
            <p><strong>✓ Rules of Definition:</strong> Good definitions must avoid circularity, avoid vague/figurative language, and be neither too broad nor too narrow.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 2
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
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
