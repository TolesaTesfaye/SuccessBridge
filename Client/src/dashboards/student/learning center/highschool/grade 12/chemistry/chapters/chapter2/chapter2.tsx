import React, { useEffect } from "react";
import { ExerciseQuestion } from "../../../../../University/Freshman/components/ExerciseQuestion";
import {
  RedoxElectronTransferDiagram,
  ElectrolyticCellDiagram,
  FaradayLawGraph,
  VoltaicCellDiagram,
} from "../../components/ChemDiagrams";

interface ChapterProps {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter2: React.FC<ChapterProps> = ({ selectedSubtopic, onNavigateChapter }) => {
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
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 2
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          ELECTROCHEMISTRY
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-violet-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          Electrochemistry is the two-way link between electricity and chemical change: electricity can drive chemical
          reactions (electrolysis), and chemical reactions can generate electricity (voltaic cells). From the battery in a
          radio to the electroplating of a bracelet in an Addis Ababa workshop, this unit explains the electron-transfer
          (redox) chemistry behind it all.
        </p>
      </div>

      <div className="space-y-16 pb-20 px-4 md:px-8">

        {/* ================= SECTION 2.1 ================= */}
        <section id="subtopic-2.1" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            2.1. Oxidation-Reduction Reactions
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Oxidation-reduction (<strong>redox</strong>) reactions are reactions in which electrons are transferred from one
              species to another. They are tracked using <strong>oxidation numbers</strong>. Oxidation and reduction always
              occur together — you cannot have one without the other.
            </p>
          </div>

          {/* 2.1.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.1.1 Oxidation
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Oxidation</strong> is the <strong>loss of electrons</strong> by a species. Its oxidation number
              <strong> increases</strong>. The species that is oxidized acts as the <strong>reducing agent</strong> (it causes
              something else to be reduced).
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                Zn → Zn²⁺ + 2e⁻   (oxidation: loses electrons)
              </p>
            </div>
          </div>

          {/* 2.1.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.1.2 Reduction
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Reduction</strong> is the <strong>gain of electrons</strong> by a species. Its oxidation number
              <strong> decreases</strong>. The species that is reduced acts as the <strong>oxidizing agent</strong>.
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                Cu²⁺ + 2e⁻ → Cu   (reduction: gains electrons)
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Memory aid: <strong>"OIL RIG"</strong> — Oxidation Is Loss, Reduction Is Gain (of electrons). Or
              <strong> "LEO the lion says GER"</strong> — Lose Electrons = Oxidation, Gain Electrons = Reduction.
            </p>
          </div>

          <RedoxElectronTransferDiagram />

          {/* 2.1.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.1.3 Balancing Oxidation-Reduction (Redox) Reactions
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Redox equations must balance both <strong>atoms</strong> and <strong>charge</strong> (electrons lost = electrons
              gained). The <strong>half-reaction (ion-electron) method</strong> in acidic solution:
            </p>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• 1. Split into oxidation and reduction half-reactions.</li>
              <li>• 2. Balance all atoms except O and H.</li>
              <li>• 3. Balance O by adding H₂O.</li>
              <li>• 4. Balance H by adding H⁺.</li>
              <li>• 5. Balance charge by adding electrons (e⁻).</li>
              <li>• 6. Multiply half-reactions so electrons lost = electrons gained, then add.</li>
            </ul>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                Example: Zn + Cu²⁺ → Zn²⁺ + Cu<br />
                (Zn loses 2e⁻; Cu²⁺ gains 2e⁻ — already balanced)
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-purple-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Redox All Around Us
              </h4>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2">Real-World Example: Rusting of Iron in the Highlands</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  During the rainy season, iron roofs and fences across the Ethiopian highlands rust. Rusting is a redox
                  reaction: iron is <strong>oxidized</strong> (Fe → Fe²⁺/Fe³⁺, losing electrons) while oxygen is
                  <strong> reduced</strong> (gaining electrons, with water). Painting or galvanising the metal blocks this
                  electron transfer and slows corrosion — a direct application of redox chemistry.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: Oxidation and reduction always occur together in a redox reaction."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. Electrons lost by one species must be gained by another. Therefore oxidation (loss of electrons) and reduction (gain of electrons) always happen simultaneously in a redox reaction."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Redox Reactions</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="In the reaction Zn + Cu²⁺ → Zn²⁺ + Cu, which species is OXIDIZED?"
                options={[
                  'Zn',
                  'Cu²⁺',
                  'Zn²⁺',
                  'Cu'
                ]}
                correctAnswer={0}
                explanation="Zn loses two electrons to become Zn²⁺ (Zn → Zn²⁺ + 2e⁻), so Zn is oxidized. Cu²⁺ gains those electrons and is reduced. Zn is also the reducing agent."
              />

              <ExerciseQuestion
                question="What happens to the oxidation number of a species that is REDUCED?"
                options={[
                  'It increases',
                  'It decreases',
                  'It stays the same',
                  'It becomes zero always'
                ]}
                correctAnswer={1}
                explanation="Reduction is the gain of electrons, which lowers (decreases) the oxidation number. For example Cu²⁺ (+2) gaining 2e⁻ becomes Cu (0)."
              />

              <ExerciseQuestion
                question="In the half-reaction method, how do we balance oxygen atoms in acidic solution?"
                options={[
                  'Add O₂ molecules',
                  'Add H₂O molecules',
                  'Add H⁺ ions',
                  'Add electrons'
                ]}
                correctAnswer={1}
                explanation="In acidic solution we balance oxygen by adding H₂O to the side lacking oxygen. Then we balance hydrogen by adding H⁺, and finally balance charge by adding electrons."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 2.2 ================= */}
        <section id="subtopic-2.2" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            2.2. Electrolysis of Aqueous Solutions
          </h2>

          <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Electrolysis</strong> uses electrical energy to force a non-spontaneous chemical reaction to occur. When
              the electrolyte is an aqueous solution, water itself can also react, so we must predict which species actually
              discharges at each electrode.
            </p>
          </div>

          {/* 2.2.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.2.1 Electrolytic Cells
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              An <strong>electrolytic cell</strong> converts electrical energy into chemical energy. Its parts:
            </p>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• A <strong>power source</strong> (battery) that pushes electrons.</li>
              <li>• Two <strong>electrodes</strong>: the <strong>anode</strong> (positive, where oxidation occurs) and the
                <strong> cathode</strong> (negative, where reduction occurs).</li>
              <li>• An <strong>electrolyte</strong> (molten or aqueous) that conducts ions.</li>
            </ul>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                Anode = oxidation (+)   |   Cathode = reduction (−)
              </p>
            </div>
          </div>

          <ElectrolyticCellDiagram />

          {/* 2.2.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.2.2 Preferential Discharge
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              In aqueous solution several ions (and water) compete to discharge at each electrode. Which one wins depends on:
            </p>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Position in the electrochemical series</strong> — the species easier to discharge goes first.</li>
              <li>• <strong>Concentration</strong> — a more concentrated ion is favoured.</li>
              <li>• <strong>Nature of the electrode</strong> — inert (Pt, graphite) vs. active electrodes behave differently.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mt-4">
              Generally, at the cathode the less-reactive metal cation (e.g. Cu²⁺, Ag⁺) discharges in preference to H⁺/water;
              at the anode, halide ions (Cl⁻, Br⁻) in concentrated solution discharge in preference to water/OH⁻.
            </p>
          </div>

          {/* 2.2.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.2.3 Electrolysis of Some Selected Aqueous Solutions
          </h3>
          <div className="space-y-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-bold text-slate-900 dark:text-white mb-2">Dilute / concentrated NaCl (brine)</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Cathode: H₂ (from water/H⁺) is liberated. Anode: Cl₂ gas (from Cl⁻) in concentrated brine. The remaining
                solution becomes NaOH — the basis of the chlor-alkali industry.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-bold text-slate-900 dark:text-white mb-2">Copper(II) sulfate, CuSO₄ (inert electrodes)</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Cathode: copper metal deposits (Cu²⁺ + 2e⁻ → Cu). Anode: oxygen gas from water. The blue colour fades as
                Cu²⁺ is removed.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-bold text-slate-900 dark:text-white mb-2">Dilute sulfuric acid, H₂SO₄ (electrolysis of water)</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Cathode: H₂ gas. Anode: O₂ gas. Overall this splits water into hydrogen and oxygen in a 2:1 volume ratio.
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-violet-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Electrolysis at Work
              </h4>
              <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-violet-900 dark:text-violet-300 mb-2">Real-World Example: Electroplating Workshops in Addis Ababa</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Small metal-finishing workshops electroplate jewellery, buckles, and tools with a thin shiny layer of silver,
                  nickel, or chromium. The object is made the cathode in a solution of the plating metal's salt; when current
                  flows, metal ions are reduced and deposit as a coating. This is electrolysis of an aqueous solution used for
                  beauty and corrosion protection.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: In an electrolytic cell, oxidation occurs at the anode."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. In ALL electrochemical cells (electrolytic and voltaic), oxidation occurs at the anode and reduction at the cathode. In an electrolytic cell the anode is the positive electrode."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Electrolysis</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="During electrolysis of concentrated NaCl brine with inert electrodes, what gas forms at the ANODE?"
                options={[
                  'Hydrogen (H₂)',
                  'Chlorine (Cl₂)',
                  'Oxygen (O₂)',
                  'Sodium metal'
                ]}
                correctAnswer={1}
                explanation="In concentrated brine, Cl⁻ ions discharge in preference to water/OH⁻ at the anode, producing chlorine gas (2Cl⁻ → Cl₂ + 2e⁻). Hydrogen forms at the cathode."
              />

              <ExerciseQuestion
                question="In the electrolysis of CuSO₄ solution with inert electrodes, what forms at the CATHODE?"
                options={[
                  'Oxygen gas',
                  'Copper metal',
                  'Sulfur',
                  'Hydrogen gas only'
                ]}
                correctAnswer={1}
                explanation="Cu²⁺ is easier to reduce than water/H⁺, so copper metal deposits at the cathode (Cu²⁺ + 2e⁻ → Cu). Oxygen forms at the anode from water."
              />

              <ExerciseQuestion
                question="Which factor does NOT influence preferential discharge of ions?"
                options={[
                  'Position in the electrochemical series',
                  'Concentration of the ion',
                  'Nature of the electrode',
                  'The colour of the solution'
                ]}
                correctAnswer={3}
                explanation="Preferential discharge depends on the electrochemical series position, ion concentration, and electrode nature. The colour of the solution has no effect on which ion discharges."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 2.3 ================= */}
        <section id="subtopic-2.3" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            2.3. Quantitative Aspects of Electrolysis
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Michael Faraday established the quantitative laws that let us calculate exactly how much substance is deposited
              or liberated during electrolysis. These laws connect electricity (charge) to chemistry (moles and mass).
            </p>
          </div>

          {/* 2.3.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.3.1 Faraday's First Law of Electrolysis
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>First Law:</strong> The mass (m) of substance deposited or liberated at an electrode is directly
              proportional to the quantity of electricity (charge, Q) passed through the electrolyte.
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                m ∝ Q   →   m = Z·Q = Z·I·t
              </p>
            </div>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300">
              <li>• Q = charge in coulombs = current (I, amperes) × time (t, seconds)</li>
              <li>• Z = electrochemical equivalent (mass deposited per coulomb)</li>
              <li>• 1 Faraday (F) = 96,500 C = charge of 1 mole of electrons</li>
            </ul>
          </div>

          <FaradayLawGraph />

          {/* 2.3.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.3.2 Faraday's Second Law of Electrolysis
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Second Law:</strong> When the same quantity of electricity is passed through different electrolytes
              connected in series, the masses of substances deposited are proportional to their <strong>equivalent weights</strong>
              (chemical equivalents).
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                m₁ / m₂ = E₁ / E₂
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Equivalent weight E = molar mass ÷ number of electrons transferred per ion (the charge on the ion). This law lets
              us compare how much of two different metals the same current will deposit.
            </p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-purple-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Applying Faraday's Laws
              </h4>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2">Worked Example: Plating a Spoon with Silver</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Suppose a current of 2.0 A flows for 965 s through a silver solution (Ag⁺ + e⁻ → Ag). Charge Q = I·t = 2.0 ×
                  965 = 1930 C. Moles of electrons = 1930 / 96500 = 0.02 mol, so 0.02 mol of Ag deposits. Mass = 0.02 × 108 g/mol
                  ≈ 2.16 g of silver. Faraday's laws let a plater control coating thickness precisely by controlling current
                  and time.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: One Faraday (96,500 C) corresponds to one mole of electrons."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. One Faraday is the charge carried by one mole of electrons, approximately 96,500 coulombs. Passing 1 F deposits one equivalent of a substance."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Faraday's Laws</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="A current of 3.0 A flows for 100 s. What is the total charge Q passed?"
                options={[
                  '30 C',
                  '300 C',
                  '3000 C',
                  '96,500 C'
                ]}
                correctAnswer={1}
                explanation="Q = I × t = 3.0 A × 100 s = 300 C."
              />

              <ExerciseQuestion
                question="Faraday's SECOND law relates the masses of substances deposited to their:"
                options={[
                  'Densities',
                  'Equivalent weights',
                  'Colours',
                  'Melting points'
                ]}
                correctAnswer={1}
                explanation="The second law states that for the same charge, the masses deposited are proportional to the equivalent weights (m₁/m₂ = E₁/E₂)."
              />

              <ExerciseQuestion
                question="How many moles of electrons are in 19,300 C of charge?"
                options={[
                  '0.1 mol',
                  '0.2 mol',
                  '1.0 mol',
                  '2.0 mol'
                ]}
                correctAnswer={1}
                explanation="Moles of electrons = Q / F = 19,300 / 96,500 = 0.2 mol."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 2.4 ================= */}
        <section id="subtopic-2.4" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            2.4. Industrial Application of Electrolysis
          </h2>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Electrolysis is a workhorse of modern industry. It is used to purify metals, extract reactive metals that cannot
              be obtained by simple heating, coat objects for protection and beauty, and manufacture important chemicals.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Major Industrial Uses
          </h3>
          <div className="space-y-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-bold text-slate-900 dark:text-white mb-2">1. Electroplating</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Coating an object with a thin layer of a protective or decorative metal (chromium, nickel, silver, gold) to
                prevent corrosion and improve appearance.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-bold text-slate-900 dark:text-white mb-2">2. Electrorefining (purification of metals)</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Impure copper is made the anode and pure copper the cathode; copper dissolves from the anode and deposits pure
                at the cathode, yielding &gt;99.9% pure copper for electrical wiring.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-bold text-slate-900 dark:text-white mb-2">3. Extraction of reactive metals</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Highly reactive metals such as aluminium, sodium, and magnesium are extracted by electrolysing their molten
                compounds (e.g. aluminium from molten alumina in the Hall-Héroult process).
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="font-bold text-slate-900 dark:text-white mb-2">4. Chlor-alkali process</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Electrolysis of brine produces chlorine gas, hydrogen gas, and sodium hydroxide — key chemicals for water
                treatment, soap, and plastics.
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-green-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Industry and Daily Life
              </h4>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-green-900 dark:text-green-300 mb-2">Real-World Example: Clean Water and Shiny Metal</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  The chlorine used to disinfect drinking water in Ethiopian towns is largely produced by the chlor-alkali
                  electrolysis of brine. Meanwhile, the chrome-plated taps and nickel-plated tools in homes and workshops are
                  finished by electroplating. Both are everyday products of industrial electrolysis.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: Highly reactive metals like aluminium are extracted by electrolysis of their molten compounds."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. Reactive metals (Al, Na, Mg) cannot be reduced by simple heating with carbon; they are obtained by electrolysing their molten compounds, e.g. aluminium via the Hall-Héroult process on molten alumina."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Industrial Electrolysis</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="In the electrorefining of copper, which electrode is made of IMPURE copper?"
                options={[
                  'The cathode',
                  'The anode',
                  'Both electrodes',
                  'Neither; copper is in solution only'
                ]}
                correctAnswer={1}
                explanation="Impure copper is the anode: it dissolves (oxidizes) into Cu²⁺. Pure copper deposits at the cathode (reduction), leaving impurities behind. This purifies the copper."
              />

              <ExerciseQuestion
                question="The chlor-alkali process (electrolysis of brine) produces which set of products?"
                options={[
                  'Sodium metal and oxygen',
                  'Chlorine gas, hydrogen gas, and sodium hydroxide',
                  'Only table salt',
                  'Copper and chlorine'
                ]}
                correctAnswer={1}
                explanation="Electrolysis of concentrated NaCl solution gives chlorine at the anode, hydrogen at the cathode, and leaves sodium hydroxide in solution — the three products of the chlor-alkali industry."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 2.5 ================= */}
        <section id="subtopic-2.5" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            2.5. Voltaic Cells
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>voltaic (galvanic) cell</strong> does the reverse of electrolysis: it converts the energy of a
              <strong> spontaneous</strong> redox reaction into electrical energy. Batteries — from torch cells to phone
              power banks — are voltaic cells.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            How a Voltaic Cell Works
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              A voltaic cell has two half-cells joined by a wire and a <strong>salt bridge</strong>:
            </p>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Anode (−):</strong> oxidation occurs; electrons are released and flow out through the wire.</li>
              <li>• <strong>Cathode (+):</strong> reduction occurs; electrons arrive and are consumed.</li>
              <li>• <strong>Salt bridge:</strong> allows ions to migrate, keeping each half-cell electrically neutral and
                completing the circuit.</li>
            </ul>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                Daniell cell: Zn | Zn²⁺ || Cu²⁺ | Cu<br />
                Anode: Zn → Zn²⁺ + 2e⁻   Cathode: Cu²⁺ + 2e⁻ → Cu
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              The driving force is the cell's <strong>electromotive force (EMF)</strong>, measured in volts. A positive EMF
              means the reaction is spontaneous and the cell can deliver current.
            </p>
          </div>

          <VoltaicCellDiagram />

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-orange-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Voltaic Cells in Everyday Life
              </h4>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-orange-900 dark:text-orange-300 mb-2">Real-World Example: Powering Radios and Torches Off-Grid</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  In rural Ethiopian homes without grid electricity, dry-cell batteries power radios, torches, and phone
                  charging. Each dry cell is a voltaic cell: a spontaneous redox reaction (commonly zinc oxidizing while
                  manganese dioxide is reduced) pushes electrons through the device. When the reactants are used up, the cell
                  is "dead" — the redox reaction can no longer proceed.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: In a voltaic cell, the anode is the negative electrode."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. In a voltaic (galvanic) cell the anode is negative because oxidation releases electrons there, which then flow out to the circuit. (This is opposite to an electrolytic cell, where the anode is positive.) Oxidation still occurs at the anode in both."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Voltaic Cells</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="A voltaic cell converts:"
                options={[
                  'Electrical energy into chemical energy',
                  'Chemical energy of a spontaneous redox reaction into electrical energy',
                  'Heat into electricity only',
                  'Light into electricity'
                ]}
                correctAnswer={1}
                explanation="A voltaic (galvanic) cell harnesses a spontaneous redox reaction to produce electrical energy. (Electrolysis does the opposite: electrical to chemical.)"
              />

              <ExerciseQuestion
                question="In the Daniell cell (Zn | Zn²⁺ || Cu²⁺ | Cu), which metal is the anode?"
                options={[
                  'Copper',
                  'Zinc',
                  'Both',
                  'Neither'
                ]}
                correctAnswer={1}
                explanation="Zinc is oxidized (Zn → Zn²⁺ + 2e⁻), so zinc is the anode (negative electrode). Copper ions are reduced at the copper cathode."
              />

              <ExerciseQuestion
                question="What is the role of the salt bridge in a voltaic cell?"
                options={[
                  'It supplies the electricity',
                  'It allows ions to migrate to keep the half-cells neutral and complete the circuit',
                  'It increases the temperature',
                  'It prevents the reaction from happening'
                ]}
                correctAnswer={1}
                explanation="The salt bridge lets ions flow between the half-cells, balancing charge as electrons move through the wire. Without it, charge would build up and the current would stop."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-8 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 2 Summary</h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p><strong>✓ Redox Reactions:</strong> Oxidation = loss of electrons (oxidation number increases); reduction = gain of electrons (number decreases). They always occur together; balance them by the half-reaction method.</p>
            <p><strong>✓ Electrolysis of Aqueous Solutions:</strong> An electrolytic cell uses electricity to drive a non-spontaneous reaction (anode = oxidation +, cathode = reduction −). Preferential discharge decides which ion reacts; e.g. brine gives Cl₂ and H₂, CuSO₄ deposits Cu.</p>
            <p><strong>✓ Quantitative Aspects:</strong> Faraday's 1st law m = Z·I·t; 2nd law m₁/m₂ = E₁/E₂. 1 F = 96,500 C = 1 mole of electrons.</p>
            <p><strong>✓ Industrial Applications:</strong> Electroplating, electrorefining of copper, extraction of reactive metals (Al), and the chlor-alkali process.</p>
            <p><strong>✓ Voltaic Cells:</strong> Spontaneous redox produces electricity; anode (−) oxidation, cathode (+) reduction, salt bridge completes the circuit (e.g. Daniell cell, dry-cell batteries).</p>
            <p><strong>✓ Key Insight:</strong> The same electron-transfer chemistry that rusts a roof can be harnessed to plate a bracelet, purify copper, or light a home — electrochemistry is redox put to work.</p>
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
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            Next: Chapter 3
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter2;
