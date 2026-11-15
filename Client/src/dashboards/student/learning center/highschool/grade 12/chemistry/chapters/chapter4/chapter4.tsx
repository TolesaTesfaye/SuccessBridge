import React, { useEffect } from "react";
import { ExerciseQuestion } from "../../../../../University/Freshman/components/ExerciseQuestion";
import {
  AdditionPolymerizationDiagram,
  CondensationPolymerizationDiagram,
  PolymerClassificationGrid,
} from "../../components/ChemDiagrams";

interface ChapterProps {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter4: React.FC<ChapterProps> = ({ selectedSubtopic, onNavigateChapter }) => {
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
      <div className="relative mb-8 md:mb-12 px-2 sm:px-4 md:px-8 py-6 md:py-8">
        <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 4
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 md:mb-6 tracking-tight">
          POLYMERS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-violet-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          Polymers are giant molecules built from thousands of small repeating units. They make up cotton shirts, plastic
          jerrycans, car tyres, water pipes, food packaging and even the proteins in your body. This unit explains how
          small monomers join into giant chains, how the two main polymerization methods differ, and how polymer
          structure determines whether a material is a soft bag, a strong fibre or a hard thermoset.
        </p>
      </div>

      <div className="space-y-10 md:space-y-16 pb-12 md:pb-20 px-2 sm:px-4 md:px-8">

        {/* ================= SECTION 4.1 ================= */}
        <section id="subtopic-4.1" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            4.1. Introduction to Polymers
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>polymer</strong> is a very large molecule formed by joining many small molecules called
              <strong> monomers</strong>. The word comes from the Greek <em>poly</em> (many) and <em>meros</em> (parts). The
              process of joining monomers is called <strong>polymerization</strong>. Because polymers can be tailored to be
              flexible, strong, transparent, heat-resistant or elastic, they are among the most useful materials in modern
              life.
            </p>
          </div>

          {/* 4.1.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.1.1 From Monomers to Polymers
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              When many identical monomers join, the resulting polymer contains a repeating structural unit. For example,
              ethene (CH₂=CH₂) polymerizes to polythene:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                n CH₂=CH₂ → [–CH₂–CH₂–]ₙ
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Here <strong>n</strong> is the number of monomer units in the chain, called the
              <strong> degree of polymerization (DP)</strong>. It can range from a few hundred to hundreds of thousands. The
              brackets show the <strong>repeating unit</strong>.
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Monomer</strong> — the small molecule that is repeated (ethene, CH₂=CH₂).</li>
              <li>• <strong>Repeating unit</strong> — the part of the chain that repeats ([–CH₂–CH₂–]).</li>
              <li>• <strong>Degree of polymerization</strong> — the number of repeating units, n.</li>
              <li>• <strong>Molar mass of polymer</strong> ≈ n × molar mass of the repeating unit.</li>
            </ul>
          </div>

          {/* 4.1.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.1.2 Natural and Synthetic Polymers
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Polymers are not only manufactured in factories. Nature is a master polymer chemist:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Starch</strong> — a polymer of glucose, the energy store of plants.</li>
              <li>• <strong>Cellulose</strong> — a glucose polymer forming plant cell walls; the raw material of cotton and
                paper.</li>
              <li>• <strong>Proteins</strong> — polymers of amino acids; enzymes, muscle and hair.</li>
              <li>• <strong>Natural rubber</strong> — a polymer of isoprene, tapped from rubber trees.</li>
              <li>• <strong>DNA</strong> — a polymer of nucleotides carrying genetic information.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Synthetic polymers — such as polythene, PVC, polystyrene, nylon and PET — are made by chemical
              polymerization. They often have properties that natural polymers lack: for example, polythene is waterproof
              and cheap, while nylon is exceptionally strong.
            </p>
          </div>

          {/* 4.1.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.1.3 Structure and Properties of Polymers
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              A polymer's properties depend on the length of its chains, how the chains are arranged, and the forces
              between them:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Longer chains</strong> generally make the material stronger and tougher, but harder to melt and
                process.</li>
              <li>• <strong>Straight, regular chains</strong> can pack closely and form crystalline regions — this increases
                density, strength and stiffness (e.g. high-density polythene).</li>
              <li>• <strong>Branched chains</strong> pack less well, giving softer, lower-density materials (e.g. low-density
                polythene).</li>
              <li>• <strong>Cross-links</strong> between chains lock them into a network, making the material rigid or elastic
                and preventing melting (e.g. vulcanised rubber, bakelite).</li>
              <li>• <strong>Intermolecular forces</strong> between chains control flexibility and melting point; strong forces
                give rigid, heat-resistant polymers.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              By controlling these structural features, chemists can design a material for a specific job — a flexible
              bag, a rigid pipe, a stretchy tyre or a heat-proof handle.
            </p>
          </div>

          {/* 4.1.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.1.4 Polymers in Everyday Life
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Look around and you will find polymers everywhere:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Packaging</strong> — polythene bags and bottles, polystyrene trays.</li>
              <li>• <strong>Construction</strong> — PVC pipes, plastic water tanks, insulation.</li>
              <li>• <strong>Clothing</strong> — cotton (cellulose), polyester, nylon and elastane.</li>
              <li>• <strong>Transport</strong> — tyres (rubber), plastic bumpers and dashboards.</li>
              <li>• <strong>Medical</strong> — disposable syringes, gloves, sutures and prosthetics.</li>
            </ul>
          </div>

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-violet-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Polymers in Daily Life
              </h4>
              <div className="bg-violet-50 dark:bg-violet-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-violet-900 dark:text-violet-300 mb-2">Real-World Example: The Water Jerrycan</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  A yellow plastic jerrycan is usually made from high-density polythene (HDPE). Its long, straight chains
                  pack tightly, giving the material the strength and rigidity to carry 20 litres without bulging. The
                  same chemistry, with branched chains, produces the thin flexible film used for shopping bags — same
                  monomer, different chain structure, very different properties.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Worked Example:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                One ethene unit, C₂H₄, has a molar mass of 28 g/mol. If a polythene sample has an average molar mass of
                56,000 g/mol, its degree of polymerization is 56,000 ÷ 28 = 2,000 repeating units. A longer chain means
                a stronger, more rigid plastic.
              </p>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: A polymer is formed by joining many small molecules called monomers."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. Monomers are the small molecules that join together to form the long-chain polymer. The repeating part of the chain is called the repeating unit, and n is the degree of polymerization."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Introduction to Polymers</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Which of the following is a NATURAL polymer?"
                options={[
                  'Polythene',
                  'Nylon',
                  'Cellulose',
                  'Polystyrene'
                ]}
                correctAnswer={2}
                explanation="Cellulose is a glucose polymer found in plant cell walls, so it is natural. Polythene, nylon and polystyrene are synthetic polymers made in factories."
              />

              <ExerciseQuestion
                question="The degree of polymerization (DP) of a polymer tells you:"
                options={[
                  'How many monomer units are in the chain',
                  'The colour of the polymer',
                  'The temperature at which it burns',
                  'How many double bonds it contains'
                ]}
                correctAnswer={0}
                explanation="The degree of polymerization is the number n of repeating monomer units in the polymer chain. It strongly influences molar mass, strength and melting behaviour."
              />

              <ExerciseQuestion
                question="Why does high-density polythene (HDPE) tend to be stronger than low-density polythene (LDPE)?"
                options={[
                  'HDPE contains no carbon atoms',
                  'HDPE chains are more linear and pack more closely, forming crystalline regions',
                  'LDPE is made from a different element',
                  'HDPE has no repeating units'
                ]}
                correctAnswer={1}
                explanation="HDPE has straighter, less branched chains that pack closely and form crystalline regions, giving a denser, stronger material. LDPE's branched chains pack poorly and give a softer, more flexible plastic."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 4.2 ================= */}
        <section id="subtopic-4.2" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            4.2. Polymerization Reactions
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              There are two main ways monomers can join into polymers. <strong>Addition polymerization</strong> joins
              monomers that contain carbon–carbon double bonds, with no other product formed. <strong>Condensation
              polymerization</strong> joins monomers that have two reactive groups, releasing a small molecule such as
              water at each link.
            </p>
          </div>

          {/* 4.2.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.2.1 Addition Polymerization
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              In addition polymerization, the double bond of each monomer opens and the units link together into a long
              chain. No atoms are lost, so the empirical formula of the polymer is the same as that of the monomer:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                n CH₂=CH₂ → [–CH₂–CH₂–]ₙ
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              The free-radical mechanism has three stages:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Initiation</strong> — an initiator produces radicals (R•), which open a monomer double bond and
                start the chain.</li>
              <li>• <strong>Propagation</strong> — the radical end attacks another monomer, adding one unit at a time and
                keeping the chain growing.</li>
              <li>• <strong>Termination</strong> — two radical ends combine or react, stopping growth.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mb-3">Common addition polymers:</p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Polythene (PE)</strong> — from ethene; bags, bottles, pipes.</li>
              <li>• <strong>Polypropene (PP)</strong> — from propene; rope, containers, car parts.</li>
              <li>• <strong>PVC</strong> — from vinyl chloride; pipes, window frames, cable insulation.</li>
              <li>• <strong>Polystyrene (PS)</strong> — from styrene; packing foam, cups.</li>
              <li>• <strong>PTFE</strong> — from tetrafluoroethene; non-stick coatings and seals.</li>
            </ul>
          </div>

          <AdditionPolymerizationDiagram />

          {/* 4.2.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.2.2 Condensation Polymerization
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              In condensation polymerization, each monomer has at least two reactive groups. As the groups react, a small
              molecule (often water or HCl) is eliminated and a strong covalent link forms between the units:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                adipic acid + hexamethylenediamine → nylon-6,6 + n H₂O
              </p>
            </div>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Nylon-6,6</strong> — made from a dicarboxylic acid and a diamine; strong fibres for textiles, ropes
                and brushes.</li>
              <li>• <strong>PET (polyethylene terephthalate)</strong> — from a diol and a dicarboxylic acid; drink bottles and
                polyester fibres.</li>
              <li>• <strong>Bakelite</strong> — a thermosetting polymer made from phenol and formaldehyde; electrical fittings
                and pan handles.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Condensation polymers can often be recycled chemically: PET can be broken back down into its monomers and
              re-polymerized, which is one reason PET bottles are widely collected.
            </p>
          </div>

          <CondensationPolymerizationDiagram />

          {/* 4.2.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.2.3 Copolymerization
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              When two or more different monomers are polymerized together, the product is a
              <strong> copolymer</strong>. Combining monomers allows chemists to blend properties:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>SBR (styrene–butadiene rubber)</strong> — a synthetic rubber used in tyres, tougher than natural
                rubber alone.</li>
              <li>• <strong>ABS</strong> — acrylonitrile, butadiene and styrene; strong, impact-resistant plastic for casings.</li>
              <li>• <strong>EVA</strong> — ethylene and vinyl acetate; flexible foam and shoe soles.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              A copolymer may be <strong>random</strong> (units in no fixed order), <strong>alternating</strong> (strictly
              alternating), <strong>block</strong> (long runs of each monomer) or <strong>graft</strong> (chains of one
              polymer attached to a backbone of another).
            </p>
          </div>

          {/* 4.2.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.2.4 Degree of Polymerization and Molar Mass
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The degree of polymerization can be calculated from the molar mass of the polymer and the molar mass of the
              repeating unit:
            </p>
            <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 md:p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                DP = molar mass of polymer ÷ molar mass of repeating unit
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Example: a PVC sample has an average molar mass of 62,500 g/mol. The repeating unit –CH₂–CHCl– has a molar
              mass of 62.5 g/mol. DP = 62,500 ÷ 62.5 = 1,000. Real polymers contain a range of chain lengths, so an
              <em> average</em> molar mass is always quoted.
            </p>
          </div>

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-purple-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Polymerization in Industry
              </h4>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2">Real-World Example: Tyres and Rubber</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Natural rubber is soft and sticky until it is <strong>vulcanised</strong>: heating it with sulfur forms
                  cross-links (sulfur bridges) between the polymer chains. The cross-linked network springs back after
                  stretching, giving the tough, elastic material a tyre needs. Without cross-links, the rubber would flow
                  and wear away quickly.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Worked Example:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Polypropene is made from propene, C₃H₆ (42 g/mol). If a sample has DP = 20,000, its average molar mass is
                20,000 × 42 = 840,000 g/mol. Such very long chains give the strength needed for ropes and car parts.
              </p>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: In addition polymerization, a small molecule such as water is released at every link."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Addition polymerization involves no elimination — monomers with C=C double bonds simply add together. Condensation polymerization is the type that releases a small molecule such as water at each new link."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Polymerization Reactions</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Nylon-6,6 is formed by which type of polymerization?"
                options={[
                  'Addition polymerization',
                  'Condensation polymerization',
                  'Cracking',
                  'Vulcanisation'
                ]}
                correctAnswer={1}
                explanation="Nylon-6,6 forms when a dicarboxylic acid and a diamine react, eliminating water at each amide link. That makes it a condensation polymer."
              />

              <ExerciseQuestion
                question="Which monomer produces polythene?"
                options={[
                  'Propene',
                  'Ethene',
                  'Vinyl chloride',
                  'Styrene'
                ]}
                correctAnswer={1}
                explanation="Polythene (polyethylene) is made by addition polymerization of ethene, CH₂=CH₂. Propene gives polypropene, vinyl chloride gives PVC, and styrene gives polystyrene."
              />

              <ExerciseQuestion
                question="A polymer has an average molar mass of 84,000 g/mol and its repeating unit has a molar mass of 42 g/mol. What is the degree of polymerization?"
                options={[
                  '200',
                  '2,000',
                  '20,000',
                  '42,000'
                ]}
                correctAnswer={1}
                explanation="DP = molar mass of polymer ÷ molar mass of repeating unit = 84,000 ÷ 42 = 2,000."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 4.3 ================= */}
        <section id="subtopic-4.3" className="scroll-mt-6 md:mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 border-l-4 border-purple-600 pl-4">
            4.3. Classification of Polymers
          </h2>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-3 sm:p-4 md:p-6 mb-4 md:mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              With thousands of polymers in use, chemists classify them by origin, by the way they are made, by their
              behaviour on heating, and by their physical role. The same polymer may appear in more than one class — for
              example, nylon is a synthetic, condensation-formed thermoplastic fibre.
            </p>
          </div>

          {/* 4.3.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.3.1 Natural and Synthetic Polymers
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Natural polymers</strong> are produced by living organisms: starch, cellulose, proteins, natural
                rubber and DNA.</li>
              <li>• <strong>Synthetic polymers</strong> are manufactured by chemical industry: polythene, PVC, polystyrene,
                nylon, polyester and bakelite.</li>
              <li>• <strong>Semi-synthetic polymers</strong> are natural polymers that have been chemically modified, such as
                cellulose acetate (used in films and fibres).</li>
            </ul>
          </div>

          {/* 4.3.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.3.2 Addition and Condensation Polymers
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              This classification is based on the reaction that forms the polymer:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Addition polymers</strong> come from monomers with C=C bonds; no by-product is formed. Examples:
                PE, PP, PVC, PS, PTFE.</li>
              <li>• <strong>Condensation polymers</strong> come from monomers with two reactive groups; a small molecule is
                eliminated. Examples: nylon, PET, bakelite.</li>
            </ul>
          </div>

          {/* 4.3.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.3.3 Thermoplastic and Thermosetting Polymers
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              This is one of the most important practical classifications, because it decides whether a plastic can be
              recycled or remoulded:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• <strong>Thermoplastics</strong> — long chains are held together by weak intermolecular forces, so the
                material softens on heating and hardens on cooling. It can be remoulded repeatedly and is recyclable.
                Examples: polythene, polypropene, PVC, polystyrene, PET.</li>
              <li>• <strong>Thermosetting plastics (thermosets)</strong> — covalent cross-links form a rigid three-dimensional
                network. Once set, they cannot be softened or remoulded; heating causes charring or decomposition.
                Examples: bakelite, melamine, epoxy resin.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              This is why plastic recycling codes matter: thermoplastics can be melted and reshaped, while thermosets can
              usually only be ground up and used as filler.
            </p>
          </div>

          {/* 4.3.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.3.4 Elastomers, Fibres and Plastics
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Elastomers</strong> — weakly cross-linked chains that stretch greatly and snap back. Examples:
                natural rubber, SBR, neoprene. Used in tyres, seals and gloves.</li>
              <li>• <strong>Fibres</strong> — long, thin, closely packed chains that can be drawn into threads. Examples: nylon,
                polyester, cotton, wool. Used in clothing, ropes and carpets.</li>
              <li>• <strong>Plastics</strong> — can be moulded into shapes. Examples: PE, PP, PVC, PS. Used in packaging,
                containers, pipes and furniture.</li>
            </ul>
          </div>

          {/* 4.3.5 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.3.5 Homopolymers, Copolymers and Chain Architecture
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Polymers can also be classified by composition and chain shape:
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Homopolymer</strong> — made from one type of monomer (e.g. polythene from ethene).</li>
              <li>• <strong>Copolymer</strong> — made from two or more monomers (e.g. SBR from styrene and butadiene).</li>
              <li>• <strong>Linear</strong> — long chains with few branches; pack well, often strong and dense.</li>
              <li>• <strong>Branched</strong> — side chains prevent close packing; softer and less dense.</li>
              <li>• <strong>Cross-linked</strong> — chains joined by covalent bonds; rigid or elastic, and cannot melt.</li>
              <li>• <strong>Network</strong> — a three-dimensional web, typical of thermosets.</li>
            </ul>
          </div>

          <PolymerClassificationGrid />

          {/* 4.3.6 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 md:mt-8 mb-4">
            4.3.6 Polymers and the Environment
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 md:p-6 rounded-lg mb-4 md:mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Most synthetic polymers are chemically inert — an advantage in use, but a serious problem when discarded.
              They do not rot, so plastic bags and bottles can persist for decades and break into microplastics that enter
              soil, rivers and food chains.
            </p>
            <ul className="space-y-2 ml-3 sm:ml-4 md:ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Reduce, reuse, recycle</strong> — the most effective response.</li>
              <li>• <strong>Mechanical recycling</strong> — melting and reshaping thermoplastics.</li>
              <li>• <strong>Chemical recycling</strong> — breaking polymers back into monomers (e.g. PET).</li>
              <li>• <strong>Energy recovery</strong> — controlled incineration, with emission controls.</li>
              <li>• <strong>Biodegradable plastics</strong> — e.g. PLA from plant starch, designed to break down in compost.</li>
              <li>• <strong>Policy</strong> — restrictions on thin plastic bags and promotion of reusable alternatives.</li>
            </ul>
          </div>

          <div className="space-y-6 mb-4 md:mb-6">
            <div className="p-6 border-l-4 border-green-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Choosing the Right Polymer
              </h4>
              <div className="bg-green-50 dark:bg-green-900/20 p-2.5 sm:p-3 md:p-4 rounded mb-4">
                <p className="text-sm font-bold text-green-900 dark:text-green-300 mb-2">Real-World Example: Sorting Plastic Waste</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  A recycling centre separates plastics by resin code: PET (1) bottles, HDPE (2) containers, PVC (3) pipes
                  and so on. Thermoplastics can be melted and remoulded into new products. Thermosets such as bakelite
                  cannot be remelted, so they are downcycled into filler or used for energy recovery — the classification
                  directly determines the recycling route.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: A thermosetting plastic can be melted and remoulded many times."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Thermosetting plastics form covalent cross-links that lock the chains into a network. They cannot be softened or remoulded; heating them causes charring or decomposition. Thermoplastics are the ones that can be remelted."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-8 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">✏️ Practice Exercise: Classification of Polymers</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Which polymer is a thermosetting plastic?"
                options={[
                  'Polythene',
                  'Polypropene',
                  'Bakelite',
                  'Polystyrene'
                ]}
                correctAnswer={2}
                explanation="Bakelite is a thermosetting polymer: cross-links form a rigid network that cannot be remelted. Polythene, polypropene and polystyrene are thermoplastics."
              />

              <ExerciseQuestion
                question="A polymer made from two different monomers is called a:"
                options={[
                  'Homopolymer',
                  'Copolymer',
                  'Thermoset',
                  'Monomer'
                ]}
                correctAnswer={1}
                explanation="A copolymer is formed from two or more different monomers, such as styrene and butadiene in SBR. A homopolymer uses only one type of monomer."
              />

              <ExerciseQuestion
                question="Which property is typical of an elastomer such as vulcanised rubber?"
                options={[
                  'It shatters like glass when struck',
                  'It stretches greatly and returns to its original shape',
                  'It cannot be deformed at all',
                  'It dissolves completely in water'
                ]}
                correctAnswer={1}
                explanation="Elastomers have lightly cross-linked chains that uncoil when stretched and recoil when released. This rubber-like elasticity is used in tyres, seals and elastic bands."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-8 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 4 Summary</h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p><strong>✓ Polymers:</strong> Very large molecules made by joining monomers. The repeating unit and the degree of polymerization (n) describe the chain; polymer molar mass ≈ n × repeating-unit mass.</p>
            <p><strong>✓ Natural and Synthetic:</strong> Starch, cellulose, proteins, natural rubber and DNA are natural; polythene, PVC, nylon, PET and bakelite are synthetic.</p>
            <p><strong>✓ Addition Polymerization:</strong> Monomers with C=C bonds add together with no by-product (free-radical initiation, propagation, termination). Examples: PE, PP, PVC, PS, PTFE.</p>
            <p><strong>✓ Condensation Polymerization:</strong> Monomers with two reactive groups join with elimination of a small molecule such as water. Examples: nylon-6,6, PET, bakelite.</p>
            <p><strong>✓ Classification:</strong> By origin (natural/synthetic), by reaction (addition/condensation), by heating behaviour (thermoplastic/thermoset), and by role (elastomer/fibre/plastic). Copolymers and chain architecture (linear, branched, cross-linked, network) add further classes.</p>
            <p><strong>✓ Key Insight:</strong> Polymer structure controls properties — long linear chains make strong, dense plastics, branches make soft ones, and cross-links make rubber elastic or thermosets rigid. Design the structure, and you design the material.</p>
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
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            Next: Chapter 5
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter4;
