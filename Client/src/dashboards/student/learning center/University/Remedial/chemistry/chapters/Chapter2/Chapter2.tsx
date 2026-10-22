import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../../../University/Freshman/components/ExerciseQuestion';

interface Chapter2Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter2: React.FC<Chapter2Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Chapter 2 • 6 Hours
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          CHEMICAL BONDING AND STRUCTURE
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-teal-600 to-blue-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Discover how atoms bond together to form molecules and compounds. Chemical bonding is the force that holds matter together and gives substances their unique properties.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 2.1: Introduction */}
        <section id="subtopic-2.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-teal-600 pl-2 md:pl-4">
            2.1. Introduction to Chemical Bonding
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            {/* Key Concepts */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-l-4 border-teal-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-teal-900 dark:text-teal-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🔑</span>
                Key Concepts
              </h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li><strong>Chemical Bond:</strong> An attractive force that holds atoms together in molecules or compounds</li>
                <li><strong>Octet Rule:</strong> Atoms tend to gain, lose, or share electrons to have 8 valence electrons</li>
                <li><strong>Valence Electrons:</strong> Electrons in the outermost shell that participate in bonding</li>
                <li><strong>Stability:</strong> Bonding occurs because it creates a more stable, lower energy state</li>
              </ul>
            </div>

            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong className="text-teal-600 dark:text-teal-400">chemical bond</strong> is the attractive force that holds atoms together in molecules and compounds. 
              Without chemical bonds, there would be no molecules, no water, no DNA, and no complex structures necessary for life!
            </p>

            {/* Real-World Opening */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-l-4 border-indigo-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🌍</span>
                Real-World Connection: Bonds Are Everywhere!
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  Everything you see, touch, and use involves chemical bonds:
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li><strong>Water (H₂O):</strong> Hydrogen and oxygen atoms bonded together - you drink trillions of molecules every sip!</li>
                  <li><strong>Your phone screen:</strong> Made of bonded silicon atoms arranged in a crystal structure</li>
                  <li><strong>Your DNA:</strong> Millions of atoms bonded in a precise sequence that makes you unique!</li>
                  <li><strong>Table salt (NaCl):</strong> Sodium and chlorine atoms bonded - deadly elements alone, tasty together!</li>
                  <li><strong>Your body:</strong> Proteins, carbohydrates, fats - all held together by chemical bonds</li>
                </ul>
                <div className="mt-2 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded">
                  <p className="text-xs md:text-sm text-indigo-900 dark:text-indigo-200">
                    <strong>🤔 Think about it:</strong> Right now, billions of chemical bonds in your brain cells are forming and breaking 
                    as you read and understand this text. Chemistry is literally happening in your head!
                  </p>
                </div>
              </div>
            </div>

            {/* Why Do Atoms Bond? */}
            <div className="p-3 md:p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">
                🤔 Why Do Atoms Bond?
              </h3>
              
              {/* Dating Analogy */}
              <div className="mb-3 p-2 md:p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded border border-pink-300 dark:border-pink-700">
                <p className="text-xs md:text-sm text-pink-900 dark:text-pink-200 font-semibold mb-1">
                  💕 Think of Atoms Like People Looking for Friends:
                </p>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  Just like people feel happier and more stable with good friends, atoms feel more "stable" when they bond with other atoms! 
                  <br/><br/>
                  • <strong>Lonely atoms</strong> (high energy) = Not stable, looking for partners<br/>
                  • <strong>Bonded atoms</strong> (lower energy) = Stable and "happy"<br/>
                  • <strong>Noble gases</strong> (full outer shell) = Already "complete," don't need friends!<br/>
                  <br/>
                  In chemistry, lower energy = more stable = atoms "want" to bond!
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs md:text-base text-slate-700 dark:text-slate-300">
                  Atoms bond because it allows them to achieve a more <strong>stable electron configuration</strong>. 
                  The most stable configuration is to have a full outer electron shell, like the noble gases.
                </p>

                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded border border-purple-300 dark:border-purple-700">
                  <h4 className="font-semibold text-xs md:text-base text-purple-900 dark:text-purple-200 mb-2">Energy Considerations:</h4>
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1">
                    <li><strong>Bonded atoms</strong> have <span className="text-green-600 dark:text-green-400 font-semibold">lower energy</span> than separate atoms</li>
                    <li><strong>Energy is released</strong> when bonds form (exothermic - gives off heat!)</li>
                    <li><strong>Energy is required</strong> to break bonds (endothermic - needs heat!)</li>
                    <li><strong>Lower energy = More stable</strong> (Nature favors stability)</li>
                  </ul>
                  
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <p className="text-[10px] md:text-sm text-green-900 dark:text-green-200">
                      <strong>🔥 Real Example:</strong> When you burn wood, you're breaking chemical bonds (requires energy) and forming new ones 
                      (releases MORE energy). The extra energy released is what you feel as heat and see as fire!
                    </p>
                  </div>
                </div>

                {/* Octet Rule Explained */}
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 md:p-4 rounded">
                  <p className="text-xs md:text-sm text-purple-900 dark:text-purple-200 font-semibold mb-2">
                    🎯 The Octet Rule: The "Magic Number 8"
                  </p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                    Atoms are most stable when they have <strong>8 electrons</strong> in their valence (outermost) shell. 
                    This is why noble gases (He, Ne, Ar, Kr, Xe) are so unreactive - they already have full outer shells!
                  </p>
                  
                  <div className="mt-2 p-2 bg-white dark:bg-slate-800 rounded border border-purple-300 dark:border-purple-700">
                    <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Why 8? Let's use a parking lot analogy:
                    </p>
                    <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                      Imagine the outer electron shell is like a parking lot with exactly 8 parking spaces. Atoms are "happiest" when all 8 spaces are filled! 
                      <br/><br/>
                      • <strong>Oxygen (6 electrons):</strong> Has 6 cars, wants 2 more to fill the lot → bonds to get 2 electrons<br/>
                      • <strong>Neon (8 electrons):</strong> Parking lot is full → doesn't need to bond with anyone!<br/>
                      • <strong>Sodium (1 electron):</strong> Has only 1 car in an 8-space lot → easier to give it away than find 7 more!
                    </p>
                  </div>
                  
                  <p className="text-[10px] md:text-xs text-purple-800 dark:text-purple-300 mt-2 italic">
                    <em>Exception: Hydrogen and helium are stable with only 2 electrons (duet rule) - they have a smaller "parking lot" with only 2 spaces!</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Valence Electrons */}
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                <h4 className="font-bold text-xs md:text-base text-slate-900 dark:text-white mb-2 flex items-center gap-1">
                  <span>⚡</span> Valence Electrons
                </h4>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-2">
                  The electrons in the outermost shell that participate in chemical bonding.
                </p>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  <strong>Example:</strong><br/>
                  • Carbon: 4 valence electrons<br/>
                  • Oxygen: 6 valence electrons<br/>
                  • Sodium: 1 valence electron
                </p>
              </div>
              <div className="p-3 md:p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                <h4 className="font-bold text-xs md:text-base text-slate-900 dark:text-white mb-2 flex items-center gap-1">
                  <span>🎯</span> Lewis Dot Symbols
                </h4>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-2">
                  A notation showing valence electrons as dots around the element symbol.
                </p>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  <strong>Examples:</strong><br/>
                  • H· (1 electron)<br/>
                  • ·C· (4 electrons)<br/>
                  • :O: (6 electrons)
                </p>
              </div>
            </div>

            {/* Inline Quiz */}
            <div className="mt-6 md:mt-8 p-3 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-lg md:text-2xl">✏️</span>
                Check Your Understanding
              </h4>
              
              <div className="space-y-4 md:space-y-6">
                <ExerciseQuestion
                  question="According to the octet rule, how many valence electrons do atoms want to have for maximum stability?"
                  options={[
                    "2 electrons",
                    "4 electrons",
                    "6 electrons",
                    "8 electrons"
                  ]}
                  correctAnswer={3}
                  explanation="The octet rule states that atoms are most stable with 8 valence electrons in their outer shell, similar to noble gases. This is why atoms form bonds - to achieve this stable configuration."
                />

                <ExerciseQuestion
                  question="What are valence electrons?"
                  options={[
                    "Electrons in the nucleus",
                    "Electrons in the innermost shell",
                    "Electrons in the outermost shell",
                    "Protons in the outer shell"
                  ]}
                  correctAnswer={2}
                  explanation="Valence electrons are the electrons in the outermost shell of an atom. These are the electrons that participate in chemical bonding."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.2: Types of Chemical Bonding */}
        <section id="subtopic-2.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-teal-600 pl-2 md:pl-4">
            2.2. Types of Chemical Bonding
          </h2>

          {/* Key Concepts */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-l-4 border-teal-600 p-3 md:p-6 rounded-r-lg mb-4">
            <h3 className="text-sm md:text-xl font-bold text-teal-900 dark:text-teal-100 mb-2 md:mb-3 flex items-center gap-2">
              <span className="text-lg md:text-2xl">🔑</span>
              Key Concepts - Three Main Types of Bonds
            </h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
              <li><strong>Ionic Bonding:</strong> Transfer of electrons (Metal + Non-metal)</li>
              <li><strong>Covalent Bonding:</strong> Sharing of electrons (Non-metal + Non-metal)</li>
              <li><strong>Metallic Bonding:</strong> Delocalized electrons (Metal + Metal)</li>
            </ul>
          </div>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            There are three main types of chemical bonds, each with distinct characteristics and properties. The type of bond that forms depends on the 
            <strong> electronegativity difference</strong> between the atoms involved.
          </p>

          {/* 2.2.1 Ionic Bonding */}
          <div id="subtopic-2.2.1" className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <div className="p-3 md:p-6 border-2 border-red-300 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
              <h3 className="font-bold text-sm md:text-xl text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-3xl">⚡</span>
                2.2.1. Ionic Bonding
              </h3>

              <div className="bg-red-100 dark:bg-red-900/30 p-3 md:p-4 rounded mb-3">
                <h4 className="text-xs md:text-base font-semibold text-red-900 dark:text-red-300 mb-2">
                  📚 Detailed Example: Formation of NaCl (Table Salt)
                </h4>
                
                {/* Visual Story */}
                <div className="mb-3 p-2 bg-white dark:bg-slate-800 rounded">
                  <p className="text-[10px] md:text-sm text-blue-800 dark:text-blue-300 font-semibold mb-1">
                    🎭 The Story of Sodium and Chlorine:
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    <strong>Sodium (Na):</strong> "I'm so close to stability! I have 1 electron in my outer shell, but I need 8. 
                    It's easier to give away this 1 electron than to find 7 more!"<br/><br/>
                    
                    <strong>Chlorine (Cl):</strong> "I have 7 electrons in my outer shell. I just need 1 more electron to complete my octet. 
                    I'll take yours, Sodium!"<br/><br/>
                    
                    <strong>Result:</strong> Sodium gives its electron to Chlorine. Now both are happy with complete octets! 
                    But now Sodium is positive (Na⁺) and Chlorine is negative (Cl⁻), so they attract each other like magnets!
                  </p>
                </div>
                
                <div className="space-y-2 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p><strong>Sodium (Na) - The Giver:</strong></p>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      <li>Electronic configuration: 2, 8, 1 (1 valence electron)</li>
                      <li>Loses 1 electron → Na⁺ (cation with +1 charge)</li>
                      <li>Now has stable octet: 2, 8 (like Neon!)</li>
                      <li>Becomes smaller after losing an electron</li>
                    </ul>
                  </div>
                  
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <p><strong>Chlorine (Cl) - The Taker:</strong></p>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      <li>Electronic configuration: 2, 8, 7 (7 valence electrons)</li>
                      <li>Gains 1 electron → Cl⁻ (anion with -1 charge)</li>
                      <li>Now has stable octet: 2, 8, 8 (like Argon!)</li>
                      <li>Becomes bigger after gaining an electron</li>
                    </ul>
                  </div>
                  
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border-2 border-green-500">
                    <p className="font-semibold text-green-800 dark:text-green-200 text-center">
                      Na⁺ + Cl⁻ → NaCl (sodium chloride - Table Salt!)
                    </p>
                    <p className="text-center text-[9px] md:text-xs mt-1">
                      Opposite charges attract: The positive sodium and negative chlorine stick together!
                    </p>
                  </div>
                </div>

                {/* Dangerous Alone, Safe Together */}
                <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-400">
                  <p className="text-[10px] md:text-sm text-yellow-900 dark:text-yellow-200 font-semibold mb-1">
                    ⚠️ Amazing Fact: Dangerous Alone, Safe Together!
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    • <strong>Sodium (Na):</strong> Pure sodium metal explodes when it touches water! It's so reactive that it must be stored in oil.<br/>
                    • <strong>Chlorine (Cl):</strong> Chlorine gas is toxic and was used as a chemical weapon in World War I!<br/>
                    • <strong>Together as NaCl:</strong> Perfectly safe! You eat it on your food every day. Chemical bonding completely changes properties!
                  </p>
                </div>
              </div>

              <div className="border border-red-300 dark:border-red-700 rounded p-3 md:p-4">
                <h4 className="text-xs md:text-base font-semibold text-red-900 dark:text-red-200 mb-2">
                  ⭐ Properties of Ionic Compounds (With Real Examples)
                </h4>
                <div className="grid md:grid-cols-2 gap-3 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <p className="font-semibold mb-1 text-red-800 dark:text-red-200">Physical Properties:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>High melting & boiling points</strong><br/>
                      <span className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                        Example: Salt melts at 801°C! Strong ionic bonds need lots of heat to break.
                      </span></li>
                      <li><strong>Hard and brittle crystals</strong><br/>
                      <span className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                        Example: Drop salt crystals and they shatter. Hit a diamond (ionic carbon) - it can crack!
                      </span></li>
                      <li><strong>Form crystalline structures</strong><br/>
                      <span className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                        Example: Look at salt under a microscope - perfect cubes! Each Na⁺ is surrounded by 6 Cl⁻.
                      </span></li>
                    </ul>
                  </div>
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="font-semibold mb-1 text-blue-800 dark:text-blue-200">Electrical Properties:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Conduct when dissolved in water</strong><br/>
                      <span className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                        Example: Salt water conducts electricity. That's why you can get shocked in a bathtub!
                      </span></li>
                      <li><strong>Conduct when melted</strong><br/>
                      <span className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                        Example: Molten salt is used in some batteries and metal refining.
                      </span></li>
                      <li><strong>Don't conduct as solids</strong><br/>
                      <span className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                        Example: Dry salt doesn't conduct. Ions are locked in place and can't move.
                      </span></li>
                    </ul>
                  </div>
                </div>
                
                {/* Why They Conduct */}
                <div className="mt-3 p-2 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded border border-cyan-300 dark:border-cyan-700">
                  <p className="text-[10px] md:text-sm font-semibold text-cyan-900 dark:text-cyan-200 mb-1">
                    🔌 Why Do Ionic Compounds Conduct Electricity in Water?
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                    Think of it like a dance floor! <br/><br/>
                    • <strong>Solid ionic compound:</strong> Everyone (ions) is locked in their seats, can't move → No electricity<br/>
                    • <strong>Dissolved in water:</strong> Everyone can move freely on the dance floor! Positive ions (Na⁺) and negative ions (Cl⁻) 
                    can flow and carry electric charge → Conducts electricity!<br/><br/>
                    This is why sports drinks (with dissolved ionic compounds) help your body conduct nerve signals better than plain water!
                  </p>
                </div>
              </div>

              <div className="mt-3 p-2 md:p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 rounded-r">
                <p className="text-xs md:text-sm text-yellow-900 dark:text-yellow-200">
                  <strong>💡 Remember:</strong> Ionic bonds form between atoms with <strong>large electronegativity differences</strong> (typically &gt; 1.7). 
                  This usually means a metal bonding with a non-metal!
                </p>
              </div>
            </div>

            {/* Ionic Bonding Quiz */}
            <div className="p-3 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-lg md:text-2xl">✏️</span>
                Practice: Ionic Bonding
              </h4>
              
              <div className="space-y-4 md:space-y-6">
                <ExerciseQuestion
                  question="In ionic bonding, what happens to electrons?"
                  options={[
                    "They are shared equally between atoms",
                    "They are completely transferred from one atom to another",
                    "They disappear",
                    "They stay in the nucleus"
                  ]}
                  correctAnswer={1}
                  explanation="In ionic bonding, electrons are completely transferred from one atom (usually a metal) to another atom (usually a non-metal), creating ions that attract each other."
                />

                <ExerciseQuestion
                  question="Why do ionic compounds conduct electricity when dissolved in water but not as solids?"
                  options={[
                    "Water makes them magnetic",
                    "Ions can move freely in solution but are fixed in the solid lattice",
                    "Solids are too cold to conduct",
                    "Water removes all the electrons"
                  ]}
                  correctAnswer={1}
                  explanation="In solid form, ions are locked in a rigid crystal lattice and cannot move. When dissolved in water or melted, ions are free to move and carry electric charge."
                />

                <ExerciseQuestion
                  question="Which pair of elements would most likely form an ionic bond?"
                  options={[
                    "Carbon and Oxygen (both non-metals)",
                    "Hydrogen and Chlorine (both non-metals)",
                    "Sodium and Chlorine (metal and non-metal)",
                    "Iron and Copper (both metals)"
                  ]}
                  correctAnswer={2}
                  explanation="Ionic bonds typically form between metals and non-metals. Sodium (metal) readily loses an electron while chlorine (non-metal) readily gains one, forming Na⁺ and Cl⁻ ions that attract each other."
                />
              </div>
            </div>
          </div>

          {/* 2.2.2 Covalent Bonding */}
          <div id="subtopic-2.2.2" className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <div className="p-3 md:p-6 border-2 border-blue-300 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <h3 className="font-bold text-sm md:text-xl text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🤝</span>
                2.2.2. Covalent Bonding
              </h3>

              {/* Sharing Analogy */}
              <div className="mb-3 p-2 md:p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded border border-blue-300 dark:border-blue-700">
                <p className="text-xs md:text-sm text-blue-900 dark:text-blue-200 font-semibold mb-1">
                  👫 Think of Covalent Bonds Like Sharing:
                </p>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  In ionic bonding, one atom gives electrons to another (like giving a gift). In covalent bonding, atoms <strong>share</strong> electrons 
                  (like two friends sharing a pizza)! 🍕<br/><br/>
                  • Both atoms hold onto the shared electrons<br/>
                  • Neither atom completely takes or gives electrons<br/>
                  • They both get to "count" the shared electrons toward their octet<br/>
                  • It's teamwork, not a giveaway!
                </p>
              </div>
              
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                <strong>Covalent bonds</strong> form when atoms <strong className="text-blue-600 dark:text-blue-400">share</strong> electrons to achieve stable electron configurations. 
                This typically happens between <strong>non-metal atoms</strong> with similar electronegativities.
              </p>
              
              <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded border border-blue-300 dark:border-blue-700 mb-3">
                <h4 className="text-xs md:text-base font-semibold text-blue-900 dark:text-blue-300 mb-2">Key Characteristics:</h4>
                <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1">
                  <li><strong>Formation:</strong> Non-metal + Non-metal</li>
                  <li><strong>Electron sharing:</strong> Both atoms contribute electrons</li>
                  <li><strong>Types:</strong> Single, double, or triple bonds</li>
                  <li><strong>Result:</strong> Molecules with shared electron pairs</li>
                </ul>
              </div>

              {/* Detailed Water Example */}
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 md:p-4 rounded mb-3">
                <h4 className="text-xs md:text-base font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  💧 Real-World Example: Water (H₂O) - The Most Important Molecule!
                </h4>
                
                <div className="space-y-2 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded">
                    <p className="font-semibold mb-1">How Water Forms:</p>
                    <p><strong>Oxygen atom:</strong> Has 6 valence electrons, needs 2 more for octet</p>
                    <p><strong>Hydrogen atoms (×2):</strong> Each has 1 electron, needs 1 more</p>
                    <p className="mt-2 text-blue-700 dark:text-blue-300 font-semibold">
                      Solution: Oxygen shares 1 electron with each hydrogen. Each hydrogen shares its electron with oxygen.
                      <br/>Now everyone's happy! Oxygen has 8, each hydrogen has 2.
                    </p>
                  </div>

                  <div className="p-2 bg-cyan-50 dark:bg-cyan-900/20 rounded border border-cyan-300 dark:border-cyan-700">
                    <p className="font-semibold text-cyan-900 dark:text-cyan-200 mb-1">🌊 Why Water Is Special:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Your body is <strong>60% water</strong> - all held together by covalent bonds!</li>
                      <li>Water molecules stick together (hydrogen bonding) - that's why water forms drops!</li>
                      <li>Ice floats because of the way water molecules bond - saving fish in winter!</li>
                      <li>Water dissolves many substances - making it the "universal solvent"</li>
                      <li>Life on Earth exists because water can form covalent bonds!</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Types of Covalent Bonds */}
              <div className="mb-3">
                <h4 className="text-xs md:text-base font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  🔗 Types of Covalent Bonds
                </h4>
                <div className="grid md:grid-cols-3 gap-2">
                  <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-2 border-blue-400">
                    <p className="text-[10px] md:text-sm font-semibold text-slate-900 dark:text-white">Single Bond (—)</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 mb-1">1 pair of shared electrons</p>
                    <p className="text-[9px] md:text-xs text-blue-700 dark:text-blue-300 font-mono">H—H (H₂)</p>
                    <div className="mt-1 text-[9px] md:text-xs bg-blue-50 dark:bg-blue-900/20 p-1 rounded">
                      <strong>Real example:</strong> Hydrogen gas (H₂) - used in fuel cells for clean energy!
                    </div>
                  </div>
                  <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-2 border-blue-500">
                    <p className="text-[10px] md:text-sm font-semibold text-slate-900 dark:text-white">Double Bond (=)</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 mb-1">2 pairs of shared electrons</p>
                    <p className="text-[9px] md:text-xs text-blue-700 dark:text-blue-300 font-mono">O=O (O₂)</p>
                    <div className="mt-1 text-[9px] md:text-xs bg-blue-50 dark:bg-blue-900/20 p-1 rounded">
                      <strong>Real example:</strong> Oxygen gas (O₂) - you breathe this! Stronger than single bond.
                    </div>
                  </div>
                  <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-2 border-blue-600">
                    <p className="text-[10px] md:text-sm font-semibold text-slate-900 dark:text-white">Triple Bond (≡)</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 mb-1">3 pairs of shared electrons</p>
                    <p className="text-[9px] md:text-xs text-blue-700 dark:text-blue-300 font-mono">N≡N (N₂)</p>
                    <div className="mt-1 text-[9px] md:text-xs bg-blue-50 dark:bg-blue-900/20 p-1 rounded">
                      <strong>Real example:</strong> Nitrogen gas (N₂) - 78% of air. Very strong, hard to break!
                    </div>
                  </div>
                </div>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-2">
                  💪 <strong>Bond Strength:</strong> Triple bonds &gt; Double bonds &gt; Single bonds (More shared electrons = Stronger bond!)
                </p>
              </div>

              {/* More Examples */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 md:p-4 rounded border border-green-300 dark:border-green-700">
                <h4 className="text-xs md:text-base font-semibold text-green-900 dark:text-green-200 mb-2">
                  🌟 Covalent Bonds in Your Daily Life:
                </h4>
                <div className="grid md:grid-cols-2 gap-2 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  <div>
                    <p><strong>• Sugar (C₁₂H₂₂O₁₁):</strong> All atoms held by covalent bonds. Sweet because of its shape!</p>
                    <p><strong>• DNA:</strong> Your genetic code, billions of covalent bonds forming the double helix</p>
                    <p><strong>• Proteins:</strong> In your muscles, skin, hair - all covalent bonds</p>
                    <p><strong>• Methane (CH₄):</strong> Natural gas for cooking and heating</p>
                  </div>
                  <div>
                    <p><strong>• Carbon dioxide (CO₂):</strong> What you breathe out, what plants need</p>
                    <p><strong>• Plastics:</strong> Long chains of carbon atoms sharing electrons</p>
                    <p><strong>• Medicines:</strong> Aspirin, antibiotics - carefully designed covalent molecules</p>
                    <p><strong>• Your phone screen:</strong> Silicon dioxide (SiO₂) with covalent bonds</p>
                  </div>
                </div>
              </div>

              {/* Properties */}
              <div className="mt-3 border border-blue-300 dark:border-blue-700 rounded p-3 md:p-4">
                <h4 className="text-xs md:text-base font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  ⭐ Properties of Covalent Compounds
                </h4>
                <div className="grid md:grid-cols-2 gap-2 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Lower melting/boiling points</strong> than ionic (but varies!)</li>
                    <li><strong>Can be gases, liquids, or soft solids</strong> at room temperature</li>
                    <li><strong>Poor conductors of electricity</strong> (no charged particles to move)</li>
                    <li><strong>Can be polar or non-polar</strong> depending on electron sharing</li>
                  </ul>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                    <p className="font-semibold mb-1">Compare with your experience:</p>
                    <p className="text-[9px] md:text-xs">• Water (covalent) boils at 100°C</p>
                    <p className="text-[9px] md:text-xs">• Salt (ionic) melts at 801°C</p>
                    <p className="text-[9px] md:text-xs">• Covalent bonds are generally easier to break!</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2 md:p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 rounded-r">
                <p className="text-xs md:text-sm text-yellow-900 dark:text-yellow-200">
                  <strong>💡 Key Difference:</strong> Ionic = "I'll take your electrons!" (transfer). Covalent = "Let's share!" (sharing). 
                  Same goal (stable octet), different methods!
                </p>
              </div>
            </div>

            {/* Covalent Bonding Quiz */}
            <div className="p-3 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-lg md:text-2xl">✏️</span>
                Practice: Covalent Bonding
              </h4>
              
              <div className="space-y-4 md:space-y-6">
                <ExerciseQuestion
                  question="What is the main difference between ionic and covalent bonding?"
                  options={[
                    "Ionic bonds are stronger than covalent bonds",
                    "Ionic bonds involve electron transfer, covalent bonds involve electron sharing",
                    "Only metals can form covalent bonds",
                    "Covalent bonds only form in liquids"
                  ]}
                  correctAnswer={1}
                  explanation="The key difference is how electrons are handled: ionic bonds involve complete transfer of electrons from one atom to another, while covalent bonds involve sharing electrons between atoms."
                />

                <ExerciseQuestion
                  question="In a water molecule (H₂O), what type of bonds hold the hydrogen and oxygen atoms together?"
                  options={[
                    "Ionic bonds",
                    "Metallic bonds",
                    "Covalent bonds",
                    "Hydrogen bonds"
                  ]}
                  correctAnswer={2}
                  explanation="Water molecules are held together by covalent bonds, where oxygen shares electrons with hydrogen atoms. (Note: Hydrogen bonds are attractions between water molecules, not within them!)"
                />

                <ExerciseQuestion
                  question="Which molecule has a triple covalent bond?"
                  options={[
                    "H₂ (Hydrogen gas)",
                    "O₂ (Oxygen gas)",
                    "N₂ (Nitrogen gas)",
                    "H₂O (Water)"
                  ]}
                  correctAnswer={2}
                  explanation="Nitrogen gas (N₂) has a triple bond (N≡N), sharing 3 pairs of electrons. This makes it very stable and hard to break, which is why nitrogen is relatively unreactive despite being 78% of air."
                />
              </div>
            </div>
          </div>

          {/* 2.2.3 Metallic Bonding */}
          <div id="subtopic-2.2.3" className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <div className="p-3 md:p-6 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <h3 className="font-bold text-sm md:text-xl text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🥇</span>
                2.2.3. Metallic Bonding
              </h3>

              {/* Sea of Electrons Analogy */}
              <div className="mb-3 p-2 md:p-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded border border-amber-300 dark:border-amber-700">
                <p className="text-xs md:text-sm text-amber-900 dark:text-amber-200 font-semibold mb-1">
                  🌊 Think of Metallic Bonds Like a "Sea of Electrons":
                </p>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  Imagine a swimming pool filled with floating beach balls (positive metal ions) and water (electrons flowing freely around them). 
                  The balls don't sink because they're supported by the water everywhere!<br/><br/>
                  In metals, positive metal ions are held together by a "sea" of electrons that can move freely throughout the entire metal. 
                  This is why metals conduct electricity so well - the electrons are free to flow!
                </p>
              </div>
              
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                <strong>Metallic bonds</strong> occur in metals where electrons are <strong className="text-yellow-600 dark:text-yellow-400">delocalized</strong> 
                and free to move throughout the metal structure. This unique bonding gives metals their special properties!
              </p>
              
              <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded border border-yellow-300 dark:border-yellow-700 mb-3">
                <h4 className="text-xs md:text-base font-semibold text-yellow-900 dark:text-yellow-300 mb-2">Key Characteristics:</h4>
                <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1">
                  <li><strong>Formation:</strong> Metal atoms only (like copper, iron, gold)</li>
                  <li><strong>Structure:</strong> "Sea of electrons" model - electrons don't belong to any single atom</li>
                  <li><strong>Electrons:</strong> Valence electrons move freely throughout the metal</li>
                  <li><strong>Result:</strong> Strong metallic bonds with unique properties</li>
                </ul>
              </div>

              {/* Properties with Real Examples */}
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 md:p-4 rounded mb-3">
                <h4 className="text-xs md:text-base font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
                  ⭐ Amazing Properties of Metals (And Why!)
                </h4>
                
                <div className="space-y-2 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded border-l-4 border-yellow-500">
                    <p className="font-semibold mb-1">🔌 Conductivity - Electricity flows easily</p>
                    <p><strong>Why:</strong> Free electrons can carry electric charge</p>
                    <p className="text-[9px] md:text-xs text-yellow-800 dark:text-yellow-300 mt-1">
                      <strong>Example:</strong> Copper wires in your house, gold connectors in electronics, aluminum power lines
                    </p>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-800 rounded border-l-4 border-orange-500">
                    <p className="font-semibold mb-1">🔥 Thermal Conductivity - Heat travels fast</p>
                    <p><strong>Why:</strong> Free electrons transfer kinetic energy quickly</p>
                    <p className="text-[9px] md:text-xs text-orange-800 dark:text-orange-300 mt-1">
                      <strong>Example:</strong> Metal spoon gets hot in soup, copper-bottom pans cook evenly, metal heatsinks cool computers
                    </p>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-800 rounded border-l-4 border-green-500">
                    <p className="font-semibold mb-1">🔨 Malleability - Can be hammered into sheets</p>
                    <p><strong>Why:</strong> Metal ions can slide past each other while staying in the electron sea</p>
                    <p className="text-[9px] md:text-xs text-green-800 dark:text-green-300 mt-1">
                      <strong>Example:</strong> Aluminum foil (rolled super thin!), gold leaf (can be hammered to 0.0001mm thick!), car body panels
                    </p>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-800 rounded border-l-4 border-blue-500">
                    <p className="font-semibold mb-1">🎸 Ductility - Can be drawn into wires</p>
                    <p><strong>Why:</strong> Metal structure can be stretched without breaking</p>
                    <p className="text-[9px] md:text-xs text-blue-800 dark:text-blue-300 mt-1">
                      <strong>Example:</strong> Copper wires (1kg copper can make 200km of wire!), steel cables in bridges, tungsten filaments in bulbs
                    </p>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-800 rounded border-l-4 border-purple-500">
                    <p className="font-semibold mb-1">✨ Luster - Shiny appearance</p>
                    <p><strong>Why:</strong> Free electrons reflect light efficiently</p>
                    <p className="text-[9px] md:text-xs text-purple-800 dark:text-purple-300 mt-1">
                      <strong>Example:</strong> Gold jewelry sparkles, chrome on cars shines, mirrors use metallic coatings
                    </p>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-800 rounded border-l-4 border-red-500">
                    <p className="font-semibold mb-1">💪 High Strength & Melting Points</p>
                    <p><strong>Why:</strong> Strong metallic bonds between atoms</p>
                    <p className="text-[9px] md:text-xs text-red-800 dark:text-red-300 mt-1">
                      <strong>Example:</strong> Iron melts at 1538°C (used in construction), Tungsten melts at 3422°C (highest of all metals!)
                    </p>
                  </div>
                </div>
              </div>

              {/* Everyday Metal Examples */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-3 md:p-4 rounded border border-orange-300 dark:border-orange-700">
                <h4 className="text-xs md:text-base font-semibold text-orange-900 dark:text-orange-200 mb-2">
                  🏠 Metals You Use Every Day:
                </h4>
                <div className="grid md:grid-cols-2 gap-2 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  <div>
                    <p><strong>🚗 Iron/Steel:</strong> Cars, buildings, bridges, tools</p>
                    <p><strong>💎 Copper:</strong> Electrical wiring, plumbing pipes</p>
                    <p><strong>📱 Aluminum:</strong> Cans, foil, airplanes, phones</p>
                    <p><strong>💍 Gold:</strong> Jewelry, electronics (doesn't corrode!)</p>
                  </div>
                  <div>
                    <p><strong>🪙 Silver:</strong> Mirrors, conductors, medical tools</p>
                    <p><strong>💡 Tungsten:</strong> Light bulb filaments</p>
                    <p><strong>🔋 Lithium:</strong> Phone and laptop batteries</p>
                    <p><strong>🏅 Titanium:</strong> Airplanes, medical implants</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2 md:p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 rounded-r">
                <p className="text-xs md:text-sm text-yellow-900 dark:text-yellow-200">
                  <strong>💡 Fun Fact:</strong> Without metallic bonding, we wouldn't have electricity in our homes, cars, computers, or most modern technology! 
                  The "sea of electrons" makes our technological world possible!
                </p>
              </div>
            </div>

            {/* Metallic Bonding Quiz */}
            <div className="p-3 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-lg md:text-2xl">✏️</span>
                Practice: Metallic Bonding
              </h4>
              
              <div className="space-y-4 md:space-y-6">
                <ExerciseQuestion
                  question="Why do metals conduct electricity so well?"
                  options={[
                    "Because they have tightly bound electrons",
                    "Because they have free-moving electrons in a 'sea of electrons'",
                    "Because they are always hot",
                    "Because they form ionic bonds"
                  ]}
                  correctAnswer={1}
                  explanation="Metals conduct electricity because they have delocalized electrons that can move freely throughout the metal structure. These free electrons can carry electric charge, making metals excellent conductors."
                />

                <ExerciseQuestion
                  question="Why can metals like aluminum be hammered into thin foil without breaking?"
                  options={[
                    "Because they are weak",
                    "Because they melt easily",
                    "Because metal ions can slide past each other while staying in the electron sea",
                    "Because they have ionic bonds"
                  ]}
                  correctAnswer={2}
                  explanation="Metals are malleable because the metal ions can slide past each other while remaining surrounded by the 'sea of electrons.' The metallic bonds don't break; they just rearrange, allowing the metal to change shape without shattering."
                />

                <ExerciseQuestion
                  question="Which property is NOT characteristic of metallic bonding?"
                  options={[
                    "Good conductor of electricity",
                    "Shiny luster",
                    "Brittle and shatters easily",
                    "Can be drawn into wires"
                  ]}
                  correctAnswer={2}
                  explanation="Metals are NOT brittle - that's a property of ionic compounds! Metals are malleable and ductile, meaning they can bend and stretch without breaking. This is due to the flexible nature of metallic bonding."
                />
              </div>
            </div>
          </div>
          <div className="p-3 md:p-4 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border border-teal-200 dark:border-teal-800 rounded-lg mt-8">
            <h3 className="text-sm md:text-lg font-bold text-teal-900 dark:text-teal-100 mb-2 flex items-center gap-2">
              <span className="text-xl md:text-2xl">📝</span>
              Chapter 2 Summary - Chemical Bonding
            </h3>
            <ul className="text-xs md:text-base text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
              <li>Chemical bonds form because atoms seek stable electron configurations (octet rule)</li>
              <li><strong>Ionic bonds:</strong> Electron transfer between metals and non-metals (like table salt NaCl)</li>
              <li><strong>Covalent bonds:</strong> Electron sharing between non-metals (like water H₂O)</li>
              <li><strong>Metallic bonds:</strong> Delocalized electrons in metals (like copper wires)</li>
              <li>Bond type determines the physical and chemical properties of substances</li>
              <li>Understanding bonding helps explain everything from why salt conducts electricity in water to why metals are shiny!</li>
            </ul>
          </div>

          <div className="mt-6 p-3 md:p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-600 rounded-r">
            <h3 className="text-sm md:text-base font-bold text-purple-900 dark:text-purple-200 mb-2">
              🎓 What You've Learned:
            </h3>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
              You now understand the three main types of chemical bonds and can explain why:
              <br/>• Salt dissolves in water and conducts electricity
              <br/>• Water is essential for life
              <br/>• Metals can be bent and stretched
              <br/>• Your phone screen is made of silicon bonded in a specific way
              <br/>• Chemical reactions involve breaking and forming bonds
              <br/><br/>
              <strong>Chemistry is all around you, and now you can see it!</strong> Every material you touch, every breath you take, 
              involves chemical bonds working exactly as we've learned. 🧪✨
            </p>
          </div>

          <div className="mt-6 p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded-r">
            <p className="text-xs md:text-sm text-blue-900 dark:text-blue-200">
              <strong>📖 Review Questions & Unit Summary sections are included in your textbook.</strong> Make sure to practice the problems 
              at the end of this chapter to reinforce your understanding of chemical bonding!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter2;
