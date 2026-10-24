import React, { useEffect } from "react";

interface ChapterProps {
  selectedSubtopic?: string;
}

export const Chapter1: React.FC<ChapterProps> = ({ selectedSubtopic }) => {
  // Scroll to subtopic when selected
  useEffect(() => {
    if (selectedSubtopic) {
      const subtopicId = selectedSubtopic
        .split(".")
        .slice(0, 2)
        .join(".")
        .trim();
      const element = document.getElementById(`subtopic-${subtopicId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedSubtopic]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Unit 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          ATOMIC STRUCTURE AND PERIODIC PROPERTIES OF THE ELEMENTS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-green-600 to-teal-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        {/* Section 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center text-sm">
                1.1
              </span>
              Introduction
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              The atom is the fundamental building block of all matter. Understanding atomic structure is essential 
              for comprehending chemical behavior, bonding, and the properties of elements. This unit explores how 
              our understanding of the atom has evolved from ancient philosophical concepts to the sophisticated 
              quantum mechanical model we use today.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800 mb-6">
              <h4 className="font-bold text-green-900 dark:text-green-300 mb-3">
                🎯 Learning Objectives
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400">•</span>
                  <span>Trace the historical development of atomic theory from Dalton to quantum mechanics</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400">•</span>
                  <span>Understand the structure of atoms: protons, neutrons, and electrons</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400">•</span>
                  <span>Explain electromagnetic radiation and atomic spectra</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400">•</span>
                  <span>Apply quantum mechanical principles to electron configurations</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 dark:text-green-400">•</span>
                  <span>Relate atomic structure to periodic properties of elements</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">
                📚 Historical Context
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                The word "atom" comes from the Greek word <em>atomos</em>, meaning "indivisible." Ancient Greek 
                philosophers like Democritus (460-370 BC) proposed that matter consists of tiny, indivisible particles. 
                However, it wasn't until the early 19th century that John Dalton provided scientific evidence for 
                atomic theory, revolutionizing our understanding of matter and chemical reactions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1.2 */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center text-sm">
                1.2
              </span>
              Dalton's Atomic Theory and the Modern Atomic Theory
            </h3>

            {/* Dalton's Atomic Theory */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🔬</span>
                1.2.1 Postulates of Dalton's Atomic Theory (1803)
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                John Dalton proposed the first scientific atomic theory, which explained the laws of chemical 
                combination and laid the foundation for modern chemistry.
              </p>

              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: "Matter consists of indivisible atoms",
                    desc: "All matter is made up of extremely small particles called atoms, which cannot be subdivided, created, or destroyed."
                  },
                  {
                    num: 2,
                    title: "Atoms of the same element are identical",
                    desc: "All atoms of a given element are identical in mass and properties. Atoms of different elements have different masses and properties."
                  },
                  {
                    num: 3,
                    title: "Compounds form by combination of atoms",
                    desc: "Compounds are formed when atoms of different elements combine in simple whole-number ratios."
                  },
                  {
                    num: 4,
                    title: "Chemical reactions are rearrangements",
                    desc: "In chemical reactions, atoms are combined, separated, or rearranged, but never created or destroyed."
                  }
                ].map((postulate) => (
                  <div
                    key={postulate.num}
                    className="flex gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {postulate.num}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                        {postulate.title}
                      </h5>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {postulate.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
                <h5 className="font-bold text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-2">
                  <span>⚠️</span>
                  Limitations of Dalton's Theory
                </h5>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Atoms are divisible into subatomic particles (electrons, protons, neutrons)</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Atoms of the same element can have different masses (isotopes)</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Atoms can be created or destroyed in nuclear reactions</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Does not explain the nature of attractive forces between atoms</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Modern Atomic Theory */}
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">⚛️</span>
                1.2.2 Postulates of Modern Atomic Theory
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Modern atomic theory incorporates discoveries from quantum mechanics and nuclear physics, 
                providing a more complete and accurate description of atomic structure.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                  <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
                    Atoms are divisible
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Atoms consist of subatomic particles: protons, neutrons in the nucleus, and electrons in orbitals around the nucleus.
                  </p>
                </div>

                <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                  <h5 className="font-bold text-purple-900 dark:text-purple-300 mb-2">
                    Isotopes exist
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Atoms of the same element can have different numbers of neutrons, resulting in different atomic masses (isotopes).
                  </p>
                </div>

                <div className="p-5 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800">
                  <h5 className="font-bold text-teal-900 dark:text-teal-300 mb-2">
                    Quantum behavior
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Electrons exist in specific energy levels and orbitals described by quantum numbers, not in fixed orbits.
                  </p>
                </div>

                <div className="p-5 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-100 dark:border-pink-800">
                  <h5 className="font-bold text-pink-900 dark:text-pink-300 mb-2">
                    Nuclear reactions
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Atoms can be transformed in nuclear reactions, converting mass to energy according to E = mc².
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.3 */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center text-sm">
                1.3
              </span>
              Early Experiments to Characterize the Atom
            </h3>

            {/* Discovery of Electron */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                1.3.1 The Discovery of the Electron
              </h4>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800 mb-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🔋</div>
                  <div>
                    <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-2 text-lg">
                      J.J. Thomson's Cathode Ray Experiment (1897)
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      Thomson used a cathode ray tube to study the properties of cathode rays (streams of particles 
                      emitted from the negative electrode in a vacuum tube).
                    </p>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                      <p className="font-bold text-slate-900 dark:text-white mb-2">Key Observations:</p>
                      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>• Cathode rays travel in straight lines from cathode to anode</li>
                        <li>• They are deflected by electric and magnetic fields</li>
                        <li>• They carry negative charge</li>
                        <li>• The particles have the same properties regardless of cathode material</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-6">
                <h5 className="font-bold text-slate-900 dark:text-white mb-3">
                  Charge-to-Mass Ratio (e/m)
                </h5>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Thomson measured the deflection of cathode rays in electric and magnetic fields to determine 
                  the charge-to-mass ratio of the electron:
                </p>
                <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <p className="font-mono text-center text-lg text-green-600 dark:text-green-400">
                    e/m = 1.76 × 10<sup>11</sup> C/kg
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-100 dark:border-green-800">
                <h5 className="font-bold text-green-900 dark:text-green-300 mb-2">
                  Thomson's "Plum Pudding" Model
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Based on his discovery, Thomson proposed that atoms are spheres of positive charge with 
                  negatively charged electrons embedded throughout, like plums in a pudding.
                </p>
              </div>
            </div>

            {/* Radioactivity and Nucleus */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                1.3.2 Radioactivity and the Discovery of the Nucleus
              </h4>

              <div className="mb-6">
                <h5 className="font-semibold text-slate-900 dark:text-white mb-3">Discovery of Radioactivity</h5>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Henri Becquerel (1896) discovered that uranium salts emit radiation spontaneously. Marie and 
                  Pierre Curie coined the term "radioactivity" and discovered new radioactive elements (polonium and radium).
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                    <h6 className="font-bold text-red-900 dark:text-red-300 mb-2">Alpha (α) Rays</h6>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Helium nuclei (He<sup>2+</sup>), positively charged, low penetration
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h6 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Beta (β) Rays</h6>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      High-speed electrons, negatively charged, moderate penetration
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                    <h6 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Gamma (γ) Rays</h6>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      High-energy photons, no charge, high penetration
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-100 dark:border-amber-800">
                <h5 className="font-bold text-amber-900 dark:text-amber-300 mb-3 text-lg">
                  Rutherford's Gold Foil Experiment (1911)
                </h5>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Ernest Rutherford bombarded a thin gold foil with alpha particles and observed their scattering pattern.
                </p>
                
                <div className="bg-white dark:bg-slate-800 rounded-lg p-5 mb-4">
                  <p className="font-bold text-slate-900 dark:text-white mb-3">Observations:</p>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Most alpha particles passed straight through the foil</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Some particles were deflected at small angles</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>A very few particles (1 in 8000) bounced back at large angles</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-5">
                  <p className="font-bold text-slate-900 dark:text-white mb-3">Conclusions:</p>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-amber-600">→</span>
                      <span>Atoms are mostly empty space</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600">→</span>
                      <span>The positive charge and most of the mass are concentrated in a tiny, dense nucleus</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600">→</span>
                      <span>Electrons orbit the nucleus at relatively large distances</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Discovery of Neutron */}
            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                1.3.3 Discovery of the Neutron
              </h4>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
                <h5 className="font-bold text-purple-900 dark:text-purple-300 mb-3 text-lg">
                  James Chadwick's Discovery (1932)
                </h5>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  Chadwick discovered the neutron by bombarding beryllium with alpha particles, which produced 
                  a penetrating radiation that was unaffected by electric or magnetic fields.
                </p>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-5">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    <strong>Properties of the Neutron:</strong>
                  </p>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <li>• No electrical charge (neutral particle)</li>
                    <li>• Mass approximately equal to that of a proton (1.675 × 10<sup>-27</sup> kg)</li>
                    <li>• Located in the nucleus along with protons</li>
                    <li>• Explains isotopes: atoms with same protons but different neutrons</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.4 - Dark theme variant */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">
                1.4
              </span>
              Make-up of the Nucleus
            </h3>

            {/* Subatomic Particles */}
            <div className="mb-8">
              <h4 className="text-2xl font-bold mb-4 text-white">
                1.4.1 Subatomic Particles
              </h4>
              <p className="text-slate-300 mb-6 leading-relaxed">
                The atom consists of three fundamental subatomic particles: protons, neutrons, and electrons. 
                Understanding their properties is essential for comprehending atomic structure and behavior.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h5 className="text-red-400 font-bold mb-3 text-lg">Proton (p⁺)</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-white">Charge:</strong> +1 (1.602 × 10<sup>-19</sup> C)</p>
                    <p><strong className="text-white">Mass:</strong> 1.673 × 10<sup>-27</sup> kg (1 amu)</p>
                    <p><strong className="text-white">Location:</strong> Nucleus</p>
                    <p><strong className="text-white">Role:</strong> Determines atomic number</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h5 className="text-blue-400 font-bold mb-3 text-lg">Neutron (n⁰)</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-white">Charge:</strong> 0 (neutral)</p>
                    <p><strong className="text-white">Mass:</strong> 1.675 × 10<sup>-27</sup> kg (1 amu)</p>
                    <p><strong className="text-white">Location:</strong> Nucleus</p>
                    <p><strong className="text-white">Role:</strong> Adds mass, creates isotopes</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h5 className="text-green-400 font-bold mb-3 text-lg">Electron (e⁻)</h5>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p><strong className="text-white">Charge:</strong> -1 (1.602 × 10<sup>-19</sup> C)</p>
                    <p><strong className="text-white">Mass:</strong> 9.109 × 10<sup>-31</sup> kg (0.0005 amu)</p>
                    <p><strong className="text-white">Location:</strong> Orbitals around nucleus</p>
                    <p><strong className="text-white">Role:</strong> Chemical bonding</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl p-6 border border-green-700/50">
                <h5 className="text-green-400 font-bold mb-3">Important Relationships</h5>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                  <div>
                    <p className="mb-2"><strong className="text-white">Atomic Number (Z):</strong></p>
                    <p className="bg-slate-800 rounded p-3 font-mono">Z = Number of protons = Number of electrons (neutral atom)</p>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Mass Number (A):</strong></p>
                    <p className="bg-slate-800 rounded p-3 font-mono">A = Number of protons + Number of neutrons</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Atomic Mass and Isotopes */}
            <div>
              <h4 className="text-2xl font-bold mb-4 text-white">
                1.4.2 Atomic Mass and Isotopes
              </h4>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons, 
                resulting in different mass numbers.
              </p>

              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-6 border border-blue-700/50 mb-6">
                <h5 className="text-blue-400 font-bold mb-3 text-lg">Isotope Notation</h5>
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="inline-block bg-white/10 rounded-xl p-6">
                      <p className="text-4xl font-mono text-white">
                        <sup className="text-2xl">A</sup>
                        <sub className="text-2xl">Z</sub>
                        X
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-300">
                    <div className="text-center">
                      <p className="font-bold text-white mb-1">X</p>
                      <p>Element symbol</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-white mb-1">Z</p>
                      <p>Atomic number (protons)</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-white mb-1">A</p>
                      <p>Mass number (p⁺ + n⁰)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h5 className="text-yellow-400 font-bold mb-4 text-lg">Example: Carbon Isotopes</h5>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-mono text-white mb-2">
                      <sup>12</sup><sub>6</sub>C
                    </p>
                    <p className="text-sm text-slate-400">Carbon-12</p>
                    <p className="text-xs text-slate-500 mt-2">6p⁺, 6n⁰, 6e⁻</p>
                    <p className="text-xs text-green-400 mt-1">98.9% abundant</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-mono text-white mb-2">
                      <sup>13</sup><sub>6</sub>C
                    </p>
                    <p className="text-sm text-slate-400">Carbon-13</p>
                    <p className="text-xs text-slate-500 mt-2">6p⁺, 7n⁰, 6e⁻</p>
                    <p className="text-xs text-green-400 mt-1">1.1% abundant</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-mono text-white mb-2">
                      <sup>14</sup><sub>6</sub>C
                    </p>
                    <p className="text-sm text-slate-400">Carbon-14</p>
                    <p className="text-xs text-slate-500 mt-2">6p⁺, 8n⁰, 6e⁻</p>
                    <p className="text-xs text-red-400 mt-1">Radioactive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sections 1.5-1.8 Preview */}
        <section className="bg-gradient-to-r from-green-600 to-teal-700 rounded-3xl p-10 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-6">📖 Coming Up in This Unit</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-xl p-5 backdrop-blur">
              <h4 className="font-bold text-lg mb-2">1.5 Electromagnetic Radiation & Spectra</h4>
              <p className="text-sm text-green-50">
                Wave-particle duality, photons, and atomic line spectra
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 backdrop-blur">
              <h4 className="font-bold text-lg mb-2">1.6 Quantum Mechanical Model</h4>
              <p className="text-sm text-green-50">
                Heisenberg principle, quantum numbers, and orbital shapes
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 backdrop-blur">
              <h4 className="font-bold text-lg mb-2">1.7 Electronic Configurations</h4>
              <p className="text-sm text-green-50">
                Aufbau principle, Hund's rule, and orbital diagrams
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 backdrop-blur">
              <h4 className="font-bold text-lg mb-2">1.8 Periodic Table & Properties</h4>
              <p className="text-sm text-green-50">
                Periodic trends: atomic radius, ionization energy, electronegativity
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
