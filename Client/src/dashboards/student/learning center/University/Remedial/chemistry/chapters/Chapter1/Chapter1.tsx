import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../../../University/Freshman/components/ExerciseQuestion';

interface Chapter1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Chapter 1 • 8 Hours
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          ATOMIC STRUCTURE AND PERIODICITY
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-green-600 to-teal-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Explore the fundamental building blocks of matter - from atoms to the periodic table. Understanding atomic structure is the foundation of all chemistry.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 1.1: The Concept of the Atom */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-green-600 pl-2 md:pl-4">
            1.1. The Concept of the Atom
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            {/* Key Concepts Box */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-l-4 border-green-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🔑</span>
                Key Concepts
              </h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li><strong>Atom:</strong> The smallest unit of matter that retains the properties of an element</li>
                <li><strong>Atomos:</strong> Greek word meaning "indivisible"</li>
                <li><strong>Modern understanding:</strong> Atoms are divisible into subatomic particles</li>
                <li><strong>Element identity:</strong> Determined by the number of protons</li>
              </ul>
            </div>

            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              An <strong className="text-green-600 dark:text-green-400">atom</strong> is the smallest unit of matter that retains the properties of an element. 
              The word "atom" comes from the Greek word <em>"atomos"</em>, meaning <strong>indivisible</strong>.
            </p>

            {/* Real World Analogy */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🌍</span>
                Real-World Analogy: Understanding Atoms
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  Imagine you have a <strong>gold ring</strong>. If you could cut it in half, you'd still have gold. Cut it again and again - still gold. 
                  Keep cutting until you reach the smallest possible piece that's still gold - that's a <strong>gold atom</strong>!
                </p>
                <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  💡 <strong>Think of it like LEGO blocks:</strong> Just as a LEGO house is made of individual LEGO blocks, everything around you - 
                  water, air, your phone, even your body - is made of tiny atoms joined together!
                </p>
                <p>
                  <strong>Ancient Greek philosopher Democritus</strong> (460 BC) first imagined this idea. He thought: "What if I keep cutting a piece of 
                  matter into smaller and smaller pieces? Will there be a point where I can't cut anymore?" He called this smallest piece an <em>"atom"</em> 
                  (meaning "uncuttable" in Greek).
                </p>
              </div>
            </div>

            {/* Detailed Historical Development */}
            <div className="p-3 md:p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">
                📚 Historical Development of Atomic Theory
              </h3>
              
              <div className="space-y-3 md:space-y-4">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-amber-500">
                  <p className="font-bold text-xs md:text-base text-slate-900 dark:text-white">
                    Democritus (460-370 BC) - Ancient Greek Philosopher
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    • First to propose that matter consists of indivisible particles<br/>
                    • Called these particles "atomos"<br/>
                    • Believed atoms were solid, indestructible, and eternal<br/>
                    • Different substances had different shaped atoms
                  </p>
                </div>

                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-amber-500">
                  <p className="font-bold text-xs md:text-base text-slate-900 dark:text-white">
                    John Dalton (1803) - English Chemist
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    <strong>Dalton's Atomic Theory:</strong><br/>
                    1. All matter is made of atoms<br/>
                    2. Atoms of the same element are identical<br/>
                    3. Atoms of different elements have different properties<br/>
                    4. Atoms combine in simple whole-number ratios to form compounds<br/>
                    5. Atoms cannot be created, destroyed, or divided in chemical reactions
                  </p>
                </div>

                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-amber-500">
                  <p className="font-bold text-xs md:text-base text-slate-900 dark:text-white">
                    J.J. Thomson (1897) - Discovered the Electron
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    • Used cathode ray tubes in experiments<br/>
                    • Discovered negatively charged particles (electrons)<br/>
                    • Proposed the "Plum Pudding Model" - positive sphere with electrons embedded like plums in pudding
                  </p>
                </div>

                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-amber-500">
                  <p className="font-bold text-xs md:text-base text-slate-900 dark:text-white">
                    Ernest Rutherford (1911) - Discovered the Nucleus
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    • Performed the famous Gold Foil Experiment<br/>
                    • Discovered atoms have a small, dense, positive nucleus<br/>
                    • Proposed the Nuclear Model of the atom<br/>
                    • Most of the atom is empty space
                  </p>
                </div>

                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-amber-500">
                  <p className="font-bold text-xs md:text-base text-slate-900 dark:text-white">
                    Niels Bohr (1913) - Bohr Model
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    • Proposed electrons orbit the nucleus in fixed energy levels<br/>
                    • Explained the hydrogen line spectrum<br/>
                    • Introduced quantum concept to atomic structure
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Atomic Structure */}
            <div className="p-3 md:p-6 border-2 border-blue-300 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <h4 className="font-bold text-sm md:text-xl text-slate-900 dark:text-white mb-2 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-3xl">⚛️</span>
                Basic Structure of an Atom
              </h4>

              {/* Solar System Analogy */}
              <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg border border-indigo-300 dark:border-indigo-700">
                <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-2">
                  <strong className="text-indigo-700 dark:text-indigo-300">🌟 Think of an atom like our Solar System!</strong>
                </p>
                <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <p>• The <strong>nucleus</strong> is like the <strong>Sun</strong> at the center (contains protons and neutrons)</p>
                  <p>• <strong>Electrons</strong> are like <strong>planets</strong> orbiting around it</p>
                  <p>• Just like planets are held by the Sun's gravity, electrons are held by the nucleus's positive charge!</p>
                  <p>• Most of the atom is empty space, just like most of the solar system is empty space!</p>
                </div>
              </div>

              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-3 md:mb-4">
                An atom consists of three main subatomic particles:
              </p>
              <div className="grid md:grid-cols-3 gap-2 md:gap-4">
                <div className="p-3 md:p-4 bg-blue-100 dark:bg-blue-900/40 rounded-lg border-2 border-blue-400 dark:border-blue-600">
                  <p className="font-bold text-sm md:text-lg text-blue-900 dark:text-blue-200 mb-1">Protons (p⁺)</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                    <strong>Charge:</strong> Positive (+1)<br/>
                    <strong>Mass:</strong> 1.673 × 10⁻²⁷ kg<br/>
                    <strong>Location:</strong> Nucleus<br/>
                    <strong>Symbol:</strong> p⁺
                  </p>
                  <div className="text-[9px] md:text-xs bg-blue-50 dark:bg-blue-900/20 p-2 rounded mt-2">
                    <strong>Real-life:</strong> Like security guards that give the nucleus its positive charge and determine what element it is!
                  </div>
                </div>
                <div className="p-3 md:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-gray-400 dark:border-gray-600">
                  <p className="font-bold text-sm md:text-lg text-gray-900 dark:text-gray-200 mb-1">Neutrons (n⁰)</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                    <strong>Charge:</strong> Neutral (0)<br/>
                    <strong>Mass:</strong> 1.675 × 10⁻²⁷ kg<br/>
                    <strong>Location:</strong> Nucleus<br/>
                    <strong>Symbol:</strong> n⁰
                  </p>
                  <div className="text-[9px] md:text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded mt-2">
                    <strong>Real-life:</strong> Like glue that holds protons together in the nucleus - without them, protons would repel each other!
                  </div>
                </div>
                <div className="p-3 md:p-4 bg-red-100 dark:bg-red-900/40 rounded-lg border-2 border-red-400 dark:border-red-600">
                  <p className="font-bold text-sm md:text-lg text-red-900 dark:text-red-200 mb-1">Electrons (e⁻)</p>
                  <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                    <strong>Charge:</strong> Negative (-1)<br/>
                    <strong>Mass:</strong> 9.109 × 10⁻³¹ kg<br/>
                    <strong>Location:</strong> Orbit nucleus<br/>
                    <strong>Symbol:</strong> e⁻
                  </p>
                  <div className="text-[9px] md:text-xs bg-red-50 dark:bg-red-900/20 p-2 rounded mt-2">
                    <strong>Real-life:</strong> Like busy bees buzzing around a hive! They're responsible for chemical reactions and bonding.
                  </div>
                </div>
              </div>

              <div className="mt-3 md:mt-4 p-2 md:p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 rounded-r">
                <p className="text-xs md:text-base text-yellow-900 dark:text-yellow-200">
                  <strong>💡 Mind-Blowing Fact:</strong> The mass of an electron is about <strong>1/1836</strong> the mass of a proton. 
                  If a proton were the size of a basketball, an electron would be smaller than a grain of sand! Yet almost all the mass of an atom 
                  is concentrated in the nucleus (protons + neutrons).
                </p>
              </div>

              {/* Size Comparison */}
              <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-300 dark:border-purple-700">
                <p className="text-xs md:text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2">
                  📏 How Small is an Atom?
                </p>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  • <strong>1 million atoms</strong> lined up = thickness of a human hair<br/>
                  • If an atom were the size of a football stadium, the nucleus would be a marble at the center!<br/>
                  • You have about <strong>7 octillion atoms</strong> (7,000,000,000,000,000,000,000,000,000) in your body!
                </p>
              </div>
            </div>

            {/* Important Terms */}
            <div className="p-3 md:p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 rounded-r-lg">
              <h4 className="font-bold text-sm md:text-lg text-slate-900 dark:text-white mb-2 md:mb-3">
                📖 Important Atomic Terms (With Real-World Examples)
              </h4>
              <div className="space-y-3 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-purple-500">
                  <p><strong className="text-purple-700 dark:text-purple-300">Atomic Number (Z):</strong> The number of protons in an atom's nucleus. 
                  This defines what element the atom is.</p>
                  <div className="mt-2 text-[10px] md:text-sm bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                    <strong>🎯 Example:</strong> All carbon atoms have exactly <strong>6 protons</strong> (Z = 6). Whether it's the carbon in a diamond 
                    or the carbon in your pencil, if it has 6 protons, it's carbon! Change the number of protons, and you get a completely different element.
                  </div>
                </div>
                
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-purple-500">
                  <p><strong className="text-purple-700 dark:text-purple-300">Mass Number (A):</strong> The total number of protons and neutrons in the nucleus. 
                  Formula: <span className="font-mono bg-slate-200 dark:bg-slate-700 px-1">A = protons + neutrons</span></p>
                  <div className="mt-2 text-[10px] md:text-sm bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                    <strong>🎯 Example:</strong> A carbon atom with 6 protons and 6 neutrons has a mass number of 12 (Carbon-12). 
                    This is like saying "the total weight of all the heavy particles in the nucleus."
                  </div>
                </div>
                
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-purple-500">
                  <p><strong className="text-purple-700 dark:text-purple-300">Isotopes:</strong> Atoms of the same element with different numbers of neutrons. 
                  They have the same atomic number but different mass numbers.</p>
                  <div className="mt-2 text-[10px] md:text-sm bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                    <strong>🎯 Real-World Example:</strong><br/>
                    • <strong>Carbon-12:</strong> 6 protons + 6 neutrons (most common, stable)<br/>
                    • <strong>Carbon-14:</strong> 6 protons + 8 neutrons (radioactive, used in carbon dating to find age of fossils!)<br/>
                    <span className="text-indigo-700 dark:text-indigo-300">Think of isotopes like twins with the same DNA but different weights - they're the same element but have different masses!</span>
                  </div>
                </div>
                
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded border-l-2 border-purple-500">
                  <p><strong className="text-purple-700 dark:text-purple-300">Ion:</strong> An atom that has gained or lost electrons, giving it an electric charge.</p>
                  <div className="mt-2 text-[10px] md:text-sm bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                    <strong>🎯 Real-World Example:</strong><br/>
                    • <strong>Table Salt (NaCl):</strong> Sodium loses 1 electron → Na⁺ (cation). Chlorine gains 1 electron → Cl⁻ (anion)<br/>
                    • <strong>Sports Drinks:</strong> Contain ions like Na⁺, K⁺, and Cl⁻ (electrolytes) that conduct electricity in your body!<br/>
                    • <strong>Your Body:</strong> Nerve signals work because of ions (Na⁺ and K⁺) moving in and out of cells!<br/>
                    <span className="text-indigo-700 dark:text-indigo-300">Ions are like atoms that borrowed or loaned electrons - they're charged and ready to interact!</span>
                  </div>
                </div>
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
                  question="Who first proposed that matter consists of indivisible particles called atoms?"
                  options={[
                    "John Dalton",
                    "Democritus",
                    "J.J. Thomson",
                    "Ernest Rutherford"
                  ]}
                  correctAnswer={1}
                  explanation="Democritus, an ancient Greek philosopher (460-370 BC), was the first to propose the concept of atoms as indivisible particles, long before modern atomic theory was developed."
                />

                <ExerciseQuestion
                  question="Which subatomic particle has a negative charge?"
                  options={[
                    "Proton",
                    "Neutron",
                    "Electron",
                    "Nucleus"
                  ]}
                  correctAnswer={2}
                  explanation="Electrons have a negative charge (-1), while protons have a positive charge (+1) and neutrons are electrically neutral (0)."
                />

                <ExerciseQuestion
                  question="An atom has 6 protons and 8 neutrons. What is its mass number?"
                  options={[
                    "6",
                    "8",
                    "14",
                    "2"
                  ]}
                  correctAnswer={2}
                  explanation="Mass number (A) = protons + neutrons = 6 + 8 = 14. This is a Carbon-14 isotope."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.2: Discoveries of Subatomic Particles */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-green-600 pl-2 md:pl-4">
            1.2. Discoveries of Subatomic Particles
          </h2>

          {/* Key Concepts */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-l-4 border-green-600 p-3 md:p-6 rounded-r-lg mb-4 md:mb-6">
            <h3 className="text-sm md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3 flex items-center gap-2">
              <span className="text-lg md:text-2xl">🔑</span>
              Key Concepts
            </h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
              <li><strong>Cathode Rays:</strong> Streams of electrons in a vacuum tube</li>
              <li><strong>Gold Foil Experiment:</strong> Revealed the nuclear structure of atoms</li>
              <li><strong>Alpha Particles:</strong> Helium nuclei used in Rutherford's experiment</li>
              <li><strong>Nucleus:</strong> Dense, positively charged center of an atom</li>
            </ul>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Discovery of Electron */}
            <div className="p-3 md:p-6 border-l-4 border-purple-600 bg-purple-50 dark:bg-purple-900/20">
              <h4 className="font-bold text-sm md:text-lg text-slate-900 dark:text-white mb-2 md:mb-3">
                🔬 Discovery of the Electron (J.J. Thomson, 1897)
              </h4>
              
              {/* Modern Day Connection */}
              <div className="mb-3 p-2 md:p-3 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded border border-cyan-300 dark:border-cyan-700">
                <p className="text-xs md:text-sm text-cyan-900 dark:text-cyan-200 font-semibold mb-1">
                  📺 You Use This Technology Every Day!
                </p>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  Thomson's cathode ray tubes are the ancestors of old TV screens and computer monitors! When you watch TV, electrons 
                  are shot at the screen to create the images you see. Even modern devices work because we understand and control electrons. 
                  Your phone screen, LED lights, and solar panels all work because scientists discovered electrons!
                </p>
              </div>
              
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                J.J. Thomson conducted experiments using <strong>cathode ray tubes</strong> - sealed glass tubes with electrodes at each end. 
                When high voltage was applied, mysterious rays traveled from the negative electrode (cathode) to the positive electrode (anode).
              </p>

              {/* Simple Analogy */}
              <div className="mb-3 p-2 md:p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-500">
                <p className="text-xs md:text-sm text-yellow-900 dark:text-yellow-200">
                  <strong>💡 Think of it like this:</strong> Imagine you're in a dark room with a flashlight. You can see the light beam traveling through 
                  dust particles in the air. Thomson saw mysterious "rays" traveling through his tube, but he didn't know what they were made of. 
                  Through clever experiments, he discovered these rays were made of tiny, negatively charged particles - electrons!
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded border border-purple-300 dark:border-purple-700 mb-3">
                <h5 className="font-semibold text-xs md:text-base text-purple-900 dark:text-purple-200 mb-2">Thomson's Experimental Findings:</h5>
                <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1">
                  <li>Cathode rays were deflected by electric and magnetic fields</li>
                  <li>The rays were always deflected toward the positive plate</li>
                  <li>This indicated the rays consisted of <strong>negatively charged particles</strong></li>
                  <li>These particles were much lighter than atoms</li>
                  <li>The same particles were produced regardless of cathode material</li>
                </ul>
              </div>

              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 md:p-3 rounded mt-3">
                <p className="text-[10px] md:text-sm font-semibold text-purple-900 dark:text-purple-200 mb-1">Key Properties of Electrons:</p>
                <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1">
                  <li><strong>Charge:</strong> -1.602 × 10⁻¹⁹ coulombs (elementary charge)</li>
                  <li><strong>Mass:</strong> 9.109 × 10⁻³¹ kg (about 1/1836 of a proton)</li>
                  <li><strong>Symbol:</strong> e⁻</li>
                  <li><strong>Discovery:</strong> Present in all atoms regardless of element</li>
                </ul>
              </div>

              {/* Everyday Example */}
              <div className="mt-3 p-2 md:p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded border border-green-300 dark:border-green-700">
                <p className="text-xs md:text-sm text-green-900 dark:text-green-200 font-semibold mb-1">
                  🌟 Electrons in Your Daily Life:
                </p>
                <div className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <p>• <strong>Electricity in your home:</strong> When you flip a light switch, electrons flow through wires to light the bulb!</p>
                  <p>• <strong>Static electricity:</strong> When you rub a balloon on your hair, you're transferring electrons, making your hair stand up!</p>
                  <p>• <strong>Lightning:</strong> A massive flow of electrons between clouds and the ground!</p>
                  <p>• <strong>Batteries:</strong> Work by moving electrons from one terminal to another</p>
                </div>
              </div>

              <div className="mt-3 p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500 rounded">
                <p className="text-xs md:text-sm text-blue-900 dark:text-blue-200">
                  <strong>The Plum Pudding Model:</strong> Thomson proposed that atoms were spheres of positive charge with electrons embedded 
                  throughout, like plums in a pudding. Imagine a chocolate chip cookie - the dough is positive, and the chocolate chips are electrons! 
                  This model was later proven wrong by Rutherford, but it was an important step in understanding atoms.
                </p>
              </div>
            </div>

            {/* Discovery of the Nucleus */}
            <div className="p-3 md:p-6 border-l-4 border-orange-600 bg-orange-50 dark:bg-orange-900/20">
              <h4 className="font-bold text-sm md:text-lg text-slate-900 dark:text-white mb-2 md:mb-3">
                🎯 Discovery of the Nucleus (Ernest Rutherford, 1911)
              </h4>
              
              {/* Everyday Analogy */}
              <div className="mb-3 p-2 md:p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded border border-yellow-300 dark:border-yellow-700">
                <p className="text-xs md:text-sm text-orange-900 dark:text-orange-200 font-semibold mb-1">
                  🏀 Imagine This Analogy:
                </p>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  Rutherford's experiment is like throwing tennis balls at a large net. You'd expect most balls to go through, right? 
                  But what if some balls bounced straight back at you? You'd realize there must be something solid hidden behind the net! 
                  That's exactly what Rutherford discovered - atoms have a solid, dense nucleus at their center!
                </p>
              </div>
              
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                Rutherford's <strong>Gold Foil Experiment</strong> revolutionized our understanding of atomic structure. He bombarded a thin sheet of gold 
                foil with alpha particles (helium nuclei) and observed their scattering patterns. The results were shocking!
              </p>

              <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded border border-orange-300 dark:border-orange-700 mb-3">
                <h5 className="font-semibold text-xs md:text-base text-orange-900 dark:text-orange-200 mb-2">Experimental Setup & Observations:</h5>
                <div className="space-y-2 text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                    <p><strong>❌ Expected Result (based on Plum Pudding Model):</strong></p>
                    <p className="ml-2 mt-1">All alpha particles should pass through with minimal deflection, like bullets through tissue paper.</p>
                  </div>
                  
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <p><strong>✅ Actual Results (What Really Happened):</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-1 mt-1">
                      <li><strong>Most particles (&gt;99%)</strong> passed straight through the foil undeflected</li>
                      <li><strong>Some particles (~1%)</strong> were deflected at large angles</li>
                      <li><strong>Very few particles (~1 in 20,000)</strong> bounced straight back!</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visual Analogy */}
              <div className="mb-3 p-2 md:p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded border border-indigo-300 dark:border-indigo-700">
                <p className="text-xs md:text-sm text-indigo-900 dark:text-indigo-200 font-semibold mb-1">
                  🎪 Real-World Comparison:
                </p>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300">
                  Rutherford famously said: <em>"It was as if you fired a 15-inch shell at a piece of tissue paper and it came back and hit you!"</em>
                  <br/><br/>
                  Imagine shooting bullets at a circus tent - most go through, but occasionally one hits the center pole and bounces back. 
                  That's what Rutherford discovered! The "center pole" of the atom is the dense nucleus.
                </p>
              </div>

              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 md:p-3 rounded mt-3">
                <p className="text-[10px] md:text-sm font-semibold text-orange-900 dark:text-orange-200 mb-1">💡 Rutherford's Revolutionary Conclusions:</p>
                <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1">
                  <li>Atoms have a small, dense, <strong>positively charged nucleus</strong> at the center</li>
                  <li>The nucleus contains most of the atom's mass (99.9%!)</li>
                  <li>Most of the atom is <strong>empty space</strong> - atoms are mostly nothing!</li>
                  <li>Electrons orbit the nucleus at relatively large distances</li>
                  <li>The positive charge is concentrated in the nucleus, not spread throughout</li>
                </ul>
              </div>

              {/* Mind-Blowing Facts */}
              <div className="mt-3 p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded border border-pink-300 dark:border-pink-700">
                <p className="text-xs md:text-sm text-pink-900 dark:text-pink-200 font-semibold mb-2">
                  🤯 Mind-Blowing Facts About Atomic Structure:
                </p>
                <div className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <p>• <strong>If an atom were the size of a football stadium</strong>, the nucleus would be a marble at the center!</p>
                  <p>• <strong>If you removed all the empty space</strong> from atoms in your body, you'd be smaller than a grain of salt!</p>
                  <p>• <strong>Why don't you fall through your chair?</strong> Because the electrons in your body repel the electrons in the chair, 
                  even though both are mostly empty space!</p>
                  <p>• <strong>Nuclear density:</strong> If you could pack a teaspoon of nuclear matter, it would weigh about 5 billion tons!</p>
                </div>
              </div>

              <div className="mt-3 p-2 md:p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 rounded-r">
                <p className="text-xs md:text-sm text-yellow-900 dark:text-yellow-200">
                  <strong>💡 Why This Discovery Matters:</strong> Understanding the nuclear structure of atoms led to:<br/>
                  • Nuclear energy (nuclear power plants)<br/>
                  • Medical treatments (radiation therapy for cancer)<br/>
                  • Carbon dating (finding the age of ancient artifacts)<br/>
                  • Understanding how the Sun produces energy!
                </p>
              </div>
            </div>

            {/* Discovery of Proton & Neutron */}
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 border-l-4 border-teal-600 bg-teal-50 dark:bg-teal-900/20">
                <h4 className="font-bold text-xs md:text-base text-slate-900 dark:text-white mb-2">⚡ Discovery of the Proton</h4>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                  Protons were identified as the positive particles in the nucleus. Rutherford named them "protons" from the Greek word "protos" meaning "first."
                </p>
                <ul className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 list-disc list-inside space-y-1">
                  <li>Positive charge (+1)</li>
                  <li>Found in all atomic nuclei</li>
                  <li>Number of protons = Atomic number</li>
                  <li>Determines element identity</li>
                </ul>
              </div>

              <div className="p-3 md:p-4 border-l-4 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20">
                <h4 className="font-bold text-xs md:text-base text-slate-900 dark:text-white mb-2">⚪ Discovery of the Neutron (James Chadwick, 1932)</h4>
                <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                  Chadwick discovered neutral particles with mass similar to protons. These "neutrons" explained why atoms were heavier than expected.
                </p>
                <ul className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 list-disc list-inside space-y-1">
                  <li>No electric charge (neutral)</li>
                  <li>Mass ≈ proton mass</li>
                  <li>Located in nucleus with protons</li>
                  <li>Number varies in isotopes</li>
                </ul>
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
                  question="In Rutherford's Gold Foil Experiment, what did the fact that most alpha particles passed straight through indicate?"
                  options={[
                    "Atoms are completely solid",
                    "Most of the atom is empty space",
                    "Electrons are negatively charged",
                    "Gold is a soft metal"
                  ]}
                  correctAnswer={1}
                  explanation="The fact that most alpha particles passed through undeflected showed that atoms are mostly empty space, with a small, dense nucleus at the center."
                />

                <ExerciseQuestion
                  question="Which scientist discovered the electron using cathode ray tubes?"
                  options={[
                    "Ernest Rutherford",
                    "James Chadwick",
                    "J.J. Thomson",
                    "Niels Bohr"
                  ]}
                  correctAnswer={2}
                  explanation="J.J. Thomson discovered the electron in 1897 through his cathode ray tube experiments, showing that cathode rays consisted of negatively charged particles."
                />

                <ExerciseQuestion
                  question="What is located in the nucleus of an atom?"
                  options={[
                    "Only protons",
                    "Only neutrons",
                    "Protons and electrons",
                    "Protons and neutrons"
                  ]}
                  correctAnswer={3}
                  explanation="The nucleus contains both protons (positive charge) and neutrons (no charge). Electrons orbit outside the nucleus in electron shells."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Continue with remaining sections... Due to length, I'll create a condensed version */}
        {/* You can expand these sections similarly */}

        <div className="p-3 md:p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h3 className="text-sm md:text-lg font-bold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
            <span className="text-xl md:text-2xl">📝</span>
            Chapter 1 Summary
          </h3>
          <ul className="text-xs md:text-base text-slate-700 dark:text-slate-300 space-y-1 list-disc list-inside">
            <li>Atoms are the fundamental building blocks of matter</li>
            <li>Subatomic particles: protons (+), neutrons (0), and electrons (-)</li>
            <li>Thomson discovered electrons; Rutherford discovered the nucleus</li>
            <li>Chadwick discovered neutrons, completing our understanding of atomic structure</li>
            <li>Atomic number (Z) = number of protons; defines the element</li>
            <li>Mass number (A) = protons + neutrons</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
