import React, { useEffect } from "react";
import { ExerciseQuestion } from "../../../../../University/Freshman/components/ExerciseQuestion";
import {
  Atom,
  Beaker,
  BookOpen,
  FlaskConical,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";

interface ChapterProps {
  selectedSubtopic?: string;
}

const Lead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
    <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
      {children}
    </p>
  </div>
);

const Practice: React.FC<{ number: string; children: React.ReactNode }> = ({
  number,
  children,
}) => (
  <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
      ✏️ Practice Exercise {number}
    </h3>
    {children}
  </div>
);

const Formula: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center font-mono text-lg font-bold text-green-700 dark:text-green-300">
    {children}
  </div>
);

const OrbitalDiagram: React.FC<{ label: string; occupancy: number[] }> = ({
  label,
  occupancy,
}) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
      {label}
    </span>
    <div className="flex gap-1">
      {occupancy.map((electrons, index) => (
        <div
          key={index}
          className="flex h-9 w-9 items-center justify-center border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white"
        >
          {electrons === 2 ? "↑↓" : electrons === 1 ? "↑" : ""}
        </div>
      ))}
    </div>
  </div>
);

const atomicTimeline = [
  {
    year: "c. 400 BCE",
    name: "Democritus",
    idea: "Matter is made of tiny, indivisible particles called atomos.",
    color: "bg-slate-500",
  },
  {
    year: "1803",
    name: "John Dalton",
    idea: "Atoms are solid spheres; each element has its own kind of atom.",
    color: "bg-green-600",
  },
  {
    year: "1897",
    name: "J. J. Thomson",
    idea: "Electrons are embedded in a positive sphere — the plum pudding model.",
    color: "bg-blue-600",
  },
  {
    year: "1911",
    name: "Ernest Rutherford",
    idea: "A tiny, dense, positive nucleus sits at the centre of the atom.",
    color: "bg-purple-600",
  },
  {
    year: "1913",
    name: "Niels Bohr",
    idea: "Electrons occupy fixed, quantized orbits around the nucleus.",
    color: "bg-amber-600",
  },
  {
    year: "1926",
    name: "Erwin Schrödinger",
    idea: "Electrons are described by wavefunctions and probability clouds.",
    color: "bg-teal-600",
  },
];

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
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative mb-12 px-4 md:px-8 py-8">
        <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold tracking-widest uppercase mb-4">
          <Beaker size={14} className="mr-2" />
          Unit 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          Atomic Structure and <br className="hidden sm:block" />
          Periodic Properties of the Elements
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-green-600 to-emerald-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          From Dalton's solid spheres to the quantum-mechanical atom, follow the
          experiments and ideas that revealed what matter is made of — and how
          that structure explains the periodic table.
        </p>
      </div>

      <div className="space-y-16 pb-20 px-4 md:px-8">
        {/* SUBTOPIC 1.1: Introduction */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-green-600 pl-4">
            1.1. Introduction
          </h2>

          <Lead>
            Everything around you — the air you breathe, the water you drink,
            the cells in your body, and the stars in the night sky — is built
            from atoms. Chemistry begins with a simple question: what are atoms
            made of, and how does their structure explain the behaviour of
            matter?
          </Lead>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Why Atomic Structure Matters
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              An <strong>atom</strong> is the smallest particle of an element
              that retains the chemical identity of that element. Atoms are
              extraordinarily small: a single drop of water contains more than
              10²¹ atoms. Yet the internal structure of an atom — the number and
              arrangement of its electrons, protons, and neutrons — controls
              almost everything we observe.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              The number of protons identifies the element. The arrangement of
              electrons determines how atoms bond, what colour of light they
              absorb or emit, and whether a material conducts electricity. The
              number of neutrons affects the mass and stability of the nucleus.
              Atomic structure is therefore the foundation for understanding the
              periodic table, chemical bonding, materials, and nuclear energy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Medicine
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Radioactive isotopes are used in diagnosis and treatment.
                Iodine-131 targets the thyroid, while technetium-99m helps
                doctors image organs.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Materials
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Silicon's electron arrangement makes it a semiconductor — the
                basis of computer chips, solar cells, and modern electronics.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Energy
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Nuclear reactions release energy by changing the structure of
                nuclei, powering stars and nuclear power stations.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            From Philosophy to Quantum Mechanics
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            The idea of the atom has changed dramatically over more than two
            thousand years. Each model was accepted until new experiments
            revealed effects it could not explain. The result is a story of
            science refining itself — from an indivisible sphere to a
            probability cloud.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {atomicTimeline.map((item) => (
              <div
                key={item.name}
                className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-slate-300 dark:border-slate-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {item.year}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                  {item.idea}
                </p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            What You Will Learn in This Unit
          </h3>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Section
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Main focus
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    1.2
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Dalton's atomic theory and the modern revisions that
                    replaced it
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    1.3
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    The experiments that discovered the electron, nucleus, and
                    neutron
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    1.4
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Subatomic particles, atomic number, mass number, and
                    isotopes
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    1.5
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Electromagnetic radiation, photons, atomic spectra, and the
                    Bohr model
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    1.6
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    The quantum mechanical model: uncertainty, quantum numbers,
                    and orbital shapes
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    1.7
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Electron configurations and orbital diagrams
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    1.8
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    The periodic table, classification of elements, and periodic
                    trends
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Real World Example */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200/50 dark:border-amber-700/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-800/50 rounded-xl text-amber-600 dark:text-amber-400 mt-1">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2 m-0">
                  Real-World Example: One Element, Two Very Different Materials
                </h4>
                <p className="m-0 text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                  Diamond and graphite are both made of pure carbon, yet diamond
                  is the hardest natural material and an electrical insulator,
                  while graphite is soft and conducts electricity. The difference
                  is not the element — it is the <strong>arrangement and bonding
                  of the atoms</strong>. In diamond, each carbon atom is bonded
                  to four others in a rigid three-dimensional network. In
                  graphite, carbon atoms form layers that can slide over each
                  other, with delocalized electrons between them. Structure
                  determines properties.
                </p>
              </div>
            </div>
          </div>

          {/* Key Concept Box */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-green-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4 text-xl">
              <Target className="text-green-500" />
              Key Idea: Structure Determines Properties
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-center flex-1">
                <Atom className="mx-auto mb-1 text-green-600 dark:text-green-400" size={22} />
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Subatomic particles
                </div>
                <div className="text-xs text-slate-500">
                  protons, neutrons, electrons
                </div>
              </div>
              <div className="text-green-500 font-bold">→</div>
              <div className="text-center flex-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Arrangement
                </div>
                <div className="text-xs text-slate-500">
                  energy levels and orbitals
                </div>
              </div>
              <div className="text-green-500 font-bold">→</div>
              <div className="text-center flex-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Interactions
                </div>
                <div className="text-xs text-slate-500">
                  bonding and reactions
                </div>
              </div>
              <div className="text-green-500 font-bold">→</div>
              <div className="text-center flex-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Properties
                </div>
                <div className="text-xs text-slate-500">
                  colour, strength, conductivity
                </div>
              </div>
            </div>
            <p className="text-center mt-4 mb-0 text-sm text-slate-500 dark:text-slate-400 italic">
              "To understand a material, start with its atoms — and how those
              atoms are put together."
            </p>
          </div>

          <Practice number="1.1">
            <ExerciseQuestion
              question="Which of the following provides the strongest evidence that atoms are divisible into smaller particles?"
              options={[
                "Compounds always contain elements in fixed mass ratios.",
                "Cathode rays are deflected by electric and magnetic fields.",
                "Mass is conserved during a chemical reaction.",
                "Atoms combine in simple whole-number ratios.",
              ]}
              correctAnswer={1}
              explanation="Cathode rays consist of electrons, which are subatomic particles. Their deflection by electric and magnetic fields shows that atoms contain charged components and are therefore divisible. The other observations are explained by Dalton's model without requiring subatomic particles."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 1.2: Dalton's Atomic Theory and the Modern Atomic Theory */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4">
            1.2. Dalton's Atomic Theory and the Modern Atomic Theory
          </h2>

          <Lead>
            At the beginning of the nineteenth century, chemists noticed that
            substances always combine in fixed mass ratios. John Dalton turned
            those observations into the first scientific atomic theory — a model
            that dominated chemistry for nearly a century.
          </Lead>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            The Laws That Led to Dalton's Theory
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Three quantitative laws of chemical combination provided the
            evidence Dalton needed. Together, they suggested that matter is made
            of discrete particles that combine in fixed, whole-number ways.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Law of Conservation of Mass
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                In a chemical reaction, matter is neither created nor destroyed.
                The total mass of the reactants equals the total mass of the
                products.
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 text-xs font-mono text-slate-700 dark:text-slate-300">
                4 g H₂ + 32 g O₂ → 36 g H₂O
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Law of Definite Proportions
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                A given compound always contains the same elements in the same
                mass ratio, regardless of how it was made.
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 text-xs font-mono text-slate-700 dark:text-slate-300">
                H₂O: 1 g H : 8 g O
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Law of Multiple Proportions
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                When two elements form more than one compound, the masses of one
                element that combine with a fixed mass of the other are in a
                small whole-number ratio.
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 text-xs font-mono text-slate-700 dark:text-slate-300">
                CO: 12 g C : 16 g O; CO₂: 12 g C : 32 g O
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              For a fixed mass of carbon (12 g), carbon monoxide contains 16 g
              of oxygen and carbon dioxide contains 32 g. The ratio of oxygen
              masses is 16 : 32 = <strong>1 : 2</strong>, a small whole-number
              ratio. If matter were continuous rather than particulate, such
              simple ratios would be extremely unlikely.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.2.1 Postulates of Dalton's Atomic Theory
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Dalton published his atomic theory in 1803 and elaborated it in his
            book <em>A New System of Chemical Philosophy</em> (1808). Its core
            postulates can be stated as follows.
          </p>

          <ol className="space-y-4 mb-6">
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                1. All matter is made of atoms.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                Atoms are the smallest units of matter that take part in
                chemical reactions. They cannot be divided during ordinary
                chemical change.
              </span>
            </li>
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                2. Atoms of a given element are identical.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                According to Dalton, every atom of an element has the same mass
                and the same chemical properties. This postulate later required
                modification when isotopes were discovered.
              </span>
            </li>
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                3. Atoms of different elements are different.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                Each element has atoms with a characteristic mass and set of
                properties. This is why elements behave differently from one
                another.
              </span>
            </li>
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                4. Atoms combine in simple whole-number ratios.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                Compounds form when atoms of different elements join in fixed
                ratios, such as 1 : 1 in CO or 1 : 2 in CO₂. This explains the
                law of definite proportions.
              </span>
            </li>
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                5. Atoms are neither created nor destroyed in chemical reactions.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                A reaction simply rearranges atoms into new combinations. This
                explains why mass is conserved.
              </span>
            </li>
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                6. Atoms are indivisible.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                Dalton pictured atoms as solid, indestructible spheres with no
                internal structure. This is the postulate that later experiments
                overturned.
              </span>
            </li>
          </ol>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-green-900 dark:text-green-300 mb-3">
              Why Dalton's Theory Was So Powerful
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 m-0">
              <li>It explained the law of conservation of mass: atoms are only rearranged.</li>
              <li>It explained the law of definite proportions: compounds have fixed atomic ratios.</li>
              <li>It explained the law of multiple proportions: different compounds use different whole-number ratios.</li>
              <li>It provided the first quantitative basis for chemical formulas and stoichiometry.</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.2.2 Postulates of Modern Atomic Theory
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Experiments in the late nineteenth and twentieth centuries showed
            that atoms are not indivisible and that atoms of the same element are
            not always identical. Modern atomic theory keeps the idea of atoms
            but revises Dalton's postulates.
          </p>

          <ol className="space-y-4 mb-6">
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                1. Atoms are divisible into subatomic particles.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                Atoms contain electrons, protons, and neutrons, and even protons
                and neutrons are made of smaller particles called quarks.
              </span>
            </li>
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                2. Atoms of the same element can have different masses.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                These are called isotopes. For example, chlorine exists as
                chlorine-35 and chlorine-37, both with 17 protons but different
                numbers of neutrons.
              </span>
            </li>
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                3. Atoms of different elements can have the same mass.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                Such atoms are called isobars. Argon-40 and calcium-40 both have
                mass number 40, but they have different atomic numbers.
              </span>
            </li>
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                4. Atoms can be transformed by nuclear reactions.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                Radioactive decay, fission, and fusion change one element into
                another by altering the nucleus. Dalton's theory allowed only
                rearrangement, not transmutation.
              </span>
            </li>
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                5. An atom has a tiny, dense nucleus surrounded by electrons.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                The nucleus contains protons and neutrons and holds nearly all
                the mass, while electrons occupy the much larger space around it.
              </span>
            </li>
            <li className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <strong className="text-slate-900 dark:text-white">
                6. Electrons have wave-particle duality.
              </strong>{" "}
              <span className="text-slate-600 dark:text-slate-400">
                Electrons can behave as particles in some experiments and as
                waves in others. Their positions are described by probability
                distributions, not definite orbits.
              </span>
            </li>
          </ol>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Dalton's Theory vs. Modern Atomic Theory
          </h3>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Feature
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Dalton's theory
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Modern theory
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Divisibility
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Atoms are indivisible solid spheres.
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Atoms contain electrons, protons, and neutrons.
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Atoms of an element
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    All atoms of an element have identical mass.
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Atoms of an element may differ in mass (isotopes).
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Different elements
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Atoms of different elements always have different masses.
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Different elements can have the same mass number (isobars).
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Chemical reactions
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Atoms are rearranged but never changed.
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Atoms are rearranged; nuclear reactions can change them.
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Structure
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    No internal structure.
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Dense nucleus surrounded by a probability cloud of electrons.
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Electron behaviour
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Not considered; atoms are neutral spheres.
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Electrons show wave-particle duality and occupy orbitals.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-red-900 dark:text-red-300 mb-3">
              Limitations of Dalton's Atomic Theory
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 m-0">
              <li>It could not explain isotopes — atoms of the same element with different masses.</li>
              <li>It could not explain isobars — atoms of different elements with the same mass.</li>
              <li>It treated atoms as indivisible, but electrons, protons, and neutrons exist.</li>
              <li>It could not explain radioactivity or nuclear transformations.</li>
              <li>It could not explain why atoms emit characteristic spectra or form chemical bonds.</li>
              <li>It assumed all atoms of an element are identical, which is not true for isotopes.</li>
            </ul>
          </div>

          {/* Real World Example */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200/50 dark:border-amber-700/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-800/50 rounded-xl text-amber-600 dark:text-amber-400 mt-1">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2 m-0">
                  Real-World Example: Nuclear Energy Proves Atoms Are Divisible
                </h4>
                <p className="m-0 text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                  In a nuclear power station, a slow neutron strikes a uranium-235
                  nucleus, which splits into smaller nuclei and releases energy.
                  This process, called <strong>nuclear fission</strong>, changes
                  one element into others. Dalton's indivisible, unchangeable
                  atom cannot account for it. The atom has an internal structure,
                  and that structure stores enormous energy.
                </p>
              </div>
            </div>
          </div>

          <Practice number="1.2">
            <ExerciseQuestion
              question="Which postulate of Dalton's atomic theory is directly contradicted by the existence of isotopes?"
              options={[
                "Atoms combine in simple whole-number ratios.",
                "Atoms are neither created nor destroyed in chemical reactions.",
                "Atoms of the same element have identical masses.",
                "Atoms of different elements have different properties.",
              ]}
              correctAnswer={2}
              explanation="Isotopes are atoms of the same element with different numbers of neutrons, so their masses differ. This contradicts Dalton's postulate that all atoms of a given element are identical in mass. Isotopes of chlorine, for example, have masses of about 35 u and 37 u."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 1.3: Early Experiments to Characterize the Atom */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            1.3. Early Experiments to Characterize the Atom
          </h2>

          <Lead>
            By the end of the nineteenth century, chemists knew that atoms
            combine in fixed ratios, but they had no idea that atoms themselves
            have parts. A series of brilliant experiments with electricity,
            gases, and radioactive rays revealed the first subatomic particles —
            and proved that Dalton's indivisible sphere was wrong.
          </Lead>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.3.1. Discovery of the Electron
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The story begins with <strong>Michael Faraday</strong>, who showed
              in the 1830s that electric currents could decompose chemical
              compounds in a process called <strong>electrolysis</strong>. This
              suggested that electricity and matter are connected. Later, in the
              1850s, experimenters sealed a gas at very low pressure inside a
              glass tube fitted with two metal electrodes and applied a high
              voltage. The tube glowed, and an invisible ray travelled from the
              negative electrode (the <strong>cathode</strong>) toward the
              positive electrode. These rays were called{" "}
              <strong>cathode rays</strong>.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Cathode rays had striking properties: they travelled in straight
              lines, cast sharp shadows, made certain materials fluoresce, could
              turn a small paddle wheel placed inside the tube, and — most
              importantly — were deflected by electric and magnetic fields. The
              direction of deflection showed that cathode rays carry a{" "}
              <strong>negative charge</strong>.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-6 mb-6">
            <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
              <FlaskConical className="text-purple-500" size={20} />
              Evidence from the Cathode-Ray Tube
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Observation
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      What it tells us
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      Deflected toward the positive plate
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      Cathode rays are negatively charged particles.
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      Turn a paddle wheel
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      They have mass and momentum — they are particles, not
                      pure energy.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      Same behaviour for any gas or electrode metal
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      The particles are a universal component of all atoms.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Thomson Measures the Electron
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              In 1897, <strong>J. J. Thomson</strong> passed cathode rays through
              crossed electric and magnetic fields and measured how much they
              were deflected. By balancing the two deflections, he determined the
              ratio of the electron's charge to its mass, written <em>e/m</em>.
              His result was approximately{" "}
              <strong>1.76 × 10¹¹ C/kg</strong>. Crucially, the value was the same
              no matter which gas was used or which metal the electrodes were
              made from.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Thomson concluded that cathode rays consist of identical, very
              light, negatively charged particles that are present in every atom.
              These particles were later named <strong>electrons</strong>. He
              also estimated that an electron is roughly a thousand times lighter
              than a hydrogen atom — an astonishing result at the time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Charge-to-Mass Ratio (Thomson, 1897)
              </h4>
              <Formula>e/m = 1.76 × 10¹¹ C/kg</Formula>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-0">
                The same value for every gas proved electrons are universal
                constituents of matter.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Charge and Mass (Millikan, 1909)
              </h4>
              <Formula>e = −1.602 × 10⁻¹⁹ C</Formula>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-0">
                Combining e with e/m gives the electron mass: 9.109 × 10⁻³¹ kg,
                about 1/1837 of a proton.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              The Oil-Drop Experiment
            </h4>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>Robert Millikan</strong> sprayed tiny oil droplets between
              two horizontal plates and used a microscope to watch them. By
              adjusting the voltage, he could make a charged droplet hover
              motionless, so the electric force balanced its weight. Repeating the
              measurement for many droplets, he found that every charge was a
              whole-number multiple of one smallest value:{" "}
              <strong>1.602 × 10⁻¹⁹ C</strong>. This is the magnitude of the
              charge of a single electron. Together with Thomson's ratio, it gave
              the electron's mass.
            </p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Thomson's Plum-Pudding Model
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Now that atoms were known to contain negative electrons, and since
              atoms are electrically neutral, Thomson proposed in 1904 that each
              atom is a uniform sphere of positive charge with electrons embedded
              in it — like raisins in a plum pudding, or seeds in a watermelon.
              The electrons were thought to be arranged so that the atom's total
              charge is zero.
            </p>
            <div className="flex justify-center">
              <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-rose-200 to-rose-300 dark:from-rose-900/50 dark:to-rose-800/50 border-2 border-rose-300 dark:border-rose-700 flex items-center justify-center">
                {[
                  { top: "18%", left: "30%" },
                  { top: "30%", left: "62%" },
                  { top: "50%", left: "20%" },
                  { top: "62%", left: "55%" },
                  { top: "72%", left: "32%" },
                  { top: "42%", left: "44%" },
                ].map((pos, i) => (
                  <span
                    key={i}
                    className="absolute h-4 w-4 rounded-full bg-blue-600 shadow"
                    style={{ top: pos.top, left: pos.left }}
                  />
                ))}
                <span className="absolute bottom-2 right-3 text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                  Positive sphere
                </span>
              </div>
            </div>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 mb-0 italic">
              Blue dots represent negatively charged electrons; the pink sphere
              represents the spread-out positive charge.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-red-900 dark:text-red-300 mb-3">
              Why the Plum-Pudding Model Failed
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
              If positive charge were spread evenly throughout the atom, fast,
              heavy alpha particles fired at a thin foil should plow through with
              only tiny deflections. Rutherford's gold-foil experiment showed
              otherwise: a few alpha particles were deflected through very large
              angles, even straight back. The positive charge must therefore be
              concentrated in a tiny, dense region — a nucleus.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.3.2. Discovery of the Nucleus
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              In 1896, <strong>Henri Becquerel</strong> discovered that uranium
              salts spontaneously emit penetrating radiation without any
              external source of energy. <strong>Marie Curie</strong> and{" "}
              <strong>Pierre Curie</strong> isolated new radioactive elements,
              polonium and radium, and showed that radioactivity is a property of
              certain atoms. Three kinds of radiation were identified:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 m-0">
              <li>
                <strong>Alpha (α) particles</strong> — helium nuclei, charge +2,
                relatively heavy and stopped by paper or skin.
              </li>
              <li>
                <strong>Beta (β) particles</strong> — fast electrons, charge −1,
                stopped by a few millimetres of metal.
              </li>
              <li>
                <strong>Gamma (γ) rays</strong> — high-energy electromagnetic
                radiation, no charge, requires thick lead or concrete to stop.
              </li>
            </ul>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Rutherford's Gold-Foil Experiment (1909–1911)
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Ernest Rutherford</strong>, working with{" "}
              <strong>Hans Geiger</strong> and <strong>Ernest Marsden</strong>,
              aimed a narrow beam of alpha particles at an extremely thin gold
              foil (only a few hundred atoms thick). A fluorescent zinc-sulfide
              screen around the foil flashed whenever an alpha particle struck
              it, allowing the team to count particles at every angle.
            </p>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-semibold mb-4">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl mb-1">→</div>
                <div className="text-slate-700 dark:text-slate-300">
                  Most passed straight through
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl mb-1">↗</div>
                <div className="text-slate-700 dark:text-slate-300">
                  Some deflected at small angles
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <div className="text-2xl mb-1">↩</div>
                <div className="text-slate-700 dark:text-slate-300">
                  About 1 in 20,000 bounced back
                </div>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Rutherford later remarked that this was as surprising as firing a
              shell at a piece of tissue paper and having it bounce back at you.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Observation
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Interpretation
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Nearly all alpha particles pass through undeflected
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    The atom is mostly empty space.
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    A few are deflected through small angles
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    They pass near a concentrated region of positive charge.
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    About 1 in 20,000 is deflected by more than 90°
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    The positive charge and most of the mass are packed into a
                    tiny, dense nucleus.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-green-900 dark:text-green-300 mb-3">
              The Nuclear Model of the Atom
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 m-0">
              <li>
                The atom has a tiny, dense, positively charged{" "}
                <strong>nucleus</strong> that contains almost all of its mass.
              </li>
              <li>
                The nucleus occupies only about 1/10,000 of the atom's diameter,
                yet contains more than 99.9% of its mass.
              </li>
              <li>
                Electrons move in the vast empty space around the nucleus and
                make the atom electrically neutral overall.
              </li>
              <li>
                If the atom were the size of a football stadium, the nucleus
                would be a marble at the centre of the field.
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              In 1919, Rutherford bombarded nitrogen gas with alpha particles and
              detected hydrogen nuclei being ejected. He concluded that the
              positive particles in nuclei are a fundamental building block,
              which he named the <strong>proton</strong> in 1920. The proton has
              a charge of +1.602 × 10⁻¹⁹ C, equal in magnitude to the electron's
              charge, and a mass of 1.673 × 10⁻²⁷ kg — about 1836 times the
              electron's mass.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.3.3. Discovery of the Neutron
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The nuclear model left a puzzle. A helium nucleus has a charge of
              +2 (two protons), yet its mass is about four times that of a
              hydrogen atom. Where does the extra mass come from? Rutherford
              suggested in 1920 that the nucleus might contain a particle with
              about the same mass as a proton but with no charge.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              In 1932, <strong>James Chadwick</strong> solved the puzzle. He
              bombarded beryllium-9 with alpha particles and found that a highly
              penetrating, electrically neutral radiation was emitted. The
              radiation could knock protons out of paraffin wax, which required a
              particle with a mass comparable to a proton. Chadwick identified
              this particle as the <strong>neutron</strong>.
            </p>
            <Formula>
              <span className="text-sm sm:text-base">
                ⁴₂He + ⁹₄Be → ¹²₆C + ¹₀n
              </span>
            </Formula>
            <p className="text-slate-700 dark:text-slate-300 mt-4 m-0">
              The neutron has no electrical charge, a mass of 1.675 × 10⁻²⁷ kg
              (slightly greater than a proton's), and is found in every nucleus
              except ordinary hydrogen-1. Its discovery explained why atomic
              masses are roughly twice the proton count for many light elements,
              and it finally made sense of isotopes.
            </p>
          </div>

          {/* Real World Example */}
          <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 rounded-2xl p-6 sm:p-8 mb-6 border border-purple-200/50 dark:border-purple-700/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-800/50 rounded-xl text-purple-600 dark:text-purple-400 mt-1">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-purple-900 dark:text-purple-300 mb-2 m-0">
                  Real-World Example: Electron Microscopes
                </h4>
                <p className="m-0 text-purple-800/80 dark:text-purple-200/80 leading-relaxed">
                  The electron, once a curious glow in a glass tube, is now a tool
                  for seeing the invisible. Because electrons behave as waves with
                  wavelengths far shorter than visible light, electron microscopes
                  can resolve viruses, cell structures, and even individual atoms
                  — details a light microscope cannot show. The same particle that
                  Thomson discovered is used today to study materials atom by
                  atom.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-purple-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3 text-lg">
              <BookOpen className="text-purple-500" size={20} />
              Key Idea: How the Atom Was Opened Up
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
              The electron was found by deflecting cathode rays; the nucleus was
              found by scattering alpha particles; the neutron was found by
              detecting neutral radiation with proton-like mass. Each discovery
              came from a new experiment that the previous model could not
              explain. This is the scientific method in action: models survive
              until evidence overturns them.
            </p>
          </div>

          <Practice number="1.3">
            <ExerciseQuestion
              question="In Rutherford's gold-foil experiment, which observation led directly to the conclusion that the atom has a small, dense, positively charged nucleus?"
              options={[
                "Most alpha particles passed straight through the foil.",
                "Some alpha particles were deflected through small angles.",
                "A few alpha particles were deflected backward through angles greater than 90°.",
                "The gold foil became electrically charged.",
              ]}
              correctAnswer={2}
              explanation="A backward deflection requires a concentrated, massive positive charge capable of reversing a fast alpha particle. Most particles passing straight through only shows that the atom is mostly empty space; it does not by itself locate the positive charge."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 1.4: Make-up of the Nucleus */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4">
            1.4. Make-up of the Nucleus
          </h2>

          <Lead>
            The nucleus is the atom's control centre. Its proton count decides
            the element's identity, its neutron count decides the isotope, and
            together they account for nearly all the atom's mass. Understanding
            this tiny region explains isotopes, ions, atomic masses, and even
            nuclear stability.
          </Lead>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.4.1. The Three Fundamental Subatomic Particles
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Ordinary atoms are built from three particles:{" "}
            <strong>protons</strong>, <strong>neutrons</strong>, and{" "}
            <strong>electrons</strong>. Protons and neutrons are collectively
            called <strong>nucleons</strong> because they live in the nucleus.
            Electrons occupy the space outside the nucleus.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Particle
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Symbol
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Relative charge
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Actual charge (C)
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Mass (kg)
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Proton
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    p⁺
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    +1
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    +1.602 × 10⁻¹⁹
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    1.673 × 10⁻²⁷
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Nucleus
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Neutron
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    n⁰
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    0
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    0
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    1.675 × 10⁻²⁷
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Nucleus
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Electron
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    e⁻
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    −1
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    −1.602 × 10⁻¹⁹
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    9.109 × 10⁻³¹
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Outside nucleus
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Notice that the proton and neutron have almost the same mass, while
              the electron is about 1837 times lighter than a proton. Nearly all
              of an atom's mass therefore comes from its nucleus. Because the
              number of protons equals the number of electrons in a neutral atom,
              the positive and negative charges cancel exactly, making the atom
              electrically neutral.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.4.2. Atomic Number, Mass Number, and Nuclide Notation
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Atomic Number (Z)
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                The number of protons in the nucleus. It is the element's
                identity card: every atom with Z = 6 is carbon, every atom with
                Z = 17 is chlorine.
              </p>
              <Formula>Z = number of protons</Formula>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-0">
                In a neutral atom, electrons = Z.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Mass Number (A)
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                The total number of protons and neutrons in the nucleus.
                Electrons contribute almost nothing to the mass and are ignored.
              </p>
              <Formula>A = Z + N</Formula>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-0">
                Rearranged: neutrons N = A − Z.
              </p>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Nuclide Notation
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              A nuclide is a particular combination of protons and neutrons. It
              is written with the mass number as a superscript on the left, the
              atomic number as a subscript on the left, and the element symbol:
            </p>
            <div className="flex justify-center">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-8 py-5 text-center">
                <p className="text-5xl font-mono text-slate-900 dark:text-white m-0">
                  <sup className="text-2xl font-bold">A</sup>
                  <sub className="text-2xl font-bold">Z</sub>X
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-5 text-sm">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white">A</strong>{" "}
                <span className="text-slate-600 dark:text-slate-400">
                  = mass number (protons + neutrons)
                </span>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white">Z</strong>{" "}
                <span className="text-slate-600 dark:text-slate-400">
                  = atomic number (protons)
                </span>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white">X</strong>{" "}
                <span className="text-slate-600 dark:text-slate-400">
                  = chemical symbol of the element
                </span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { nuclide: "¹²₆C", protons: 6, neutrons: 6, electrons: 6 },
              { nuclide: "²³₁₁Na", protons: 11, neutrons: 12, electrons: 11 },
              { nuclide: "³⁵₁₇Cl", protons: 17, neutrons: 18, electrons: 17 },
              { nuclide: "⁵⁶₂₆Fe", protons: 26, neutrons: 30, electrons: 26 },
            ].map((item) => (
              <div
                key={item.nuclide}
                className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 text-center"
              >
                <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white mb-2">
                  {item.nuclide}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                  p⁺ = {item.protons}, n⁰ = {item.neutrons}, e⁻ ={" "}
                  {item.electrons}
                </p>
              </div>
            ))}
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Ions: Atoms That Have Gained or Lost Electrons
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              When an atom gains or loses electrons, it becomes an{" "}
              <strong>ion</strong>. The nucleus does not change, so the atomic
              number and mass number stay the same, but the electron count
              becomes different from Z. A positive ion (cation) has lost
              electrons; a negative ion (anion) has gained electrons.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Species
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Protons
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Neutrons
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Electrons
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Charge
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      Na atom
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      11
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      12
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      11
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      0
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      Na⁺ ion
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      11
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      12
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      10
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      +1
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      Cl atom
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      17
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      18
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      17
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      0
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      Cl⁻ ion
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      17
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      18
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      18
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      −1
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      Mg²⁺ ion
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      12
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      12
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      10
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      +2
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 mb-0">
              <strong>Charge = protons − electrons.</strong> For Na⁺: 11 − 10 =
              +1. For Cl⁻: 17 − 18 = −1. When the ion's symbol carries a charge,
              the charge is written as a superscript on the right.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.4.3. Isotopes
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Isotopes</strong> are atoms of the same element that have
              the same number of protons but different numbers of neutrons. They
              therefore have the same atomic number Z but different mass numbers
              A. Isotopes occupy the same place in the periodic table and have
              almost identical chemical properties, because chemical behaviour is
              controlled by electrons, not neutrons.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Their physical properties can differ, however — especially mass.
              Some isotopes are stable, while others are radioactive and decay
              over time. The relative amounts of an element's isotopes in nature
              are called their <strong>natural abundances</strong>.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Element
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Isotopes
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Protons
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Neutrons
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Natural abundance
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td
                    rowSpan={3}
                    className="border border-slate-200 dark:border-slate-700 p-3 font-semibold align-top"
                  >
                    Hydrogen
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    ¹₁H (protium)
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    1
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    0
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    99.985%
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    ²₁H (deuterium)
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    1
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    1
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    0.015%
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    ³₁H (tritium)
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    1
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    2
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    trace (radioactive)
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td
                    rowSpan={2}
                    className="border border-slate-200 dark:border-slate-700 p-3 font-semibold align-top"
                  >
                    Chlorine
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    ³⁵₁₇Cl
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    17
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    18
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    75.76%
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    ³⁷₁₇Cl
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    17
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    20
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    24.24%
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td
                    rowSpan={2}
                    className="border border-slate-200 dark:border-slate-700 p-3 font-semibold align-top"
                  >
                    Carbon
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    ¹²₆C
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    6
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    6
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    98.93%
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    ¹³₆C
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    6
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    7
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    1.07%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Relative Atomic Mass and the Atomic Mass Unit
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Because atoms are far too small to weigh individually in grams,
              chemists use a relative scale based on carbon-12. One{" "}
              <strong>atomic mass unit (u)</strong> is defined as exactly
              one-twelfth of the mass of a carbon-12 atom:
            </p>
            <Formula>1 u = (mass of one ¹²C atom) ÷ 12</Formula>
            <p className="text-slate-700 dark:text-slate-300 mt-4 mb-0">
              The <strong>relative atomic mass</strong> of an element (often
              called its atomic weight) is the weighted average of the masses of
              its naturally occurring isotopes, expressed in atomic mass units.
              Because it is an average, it is often not a whole number — the
              periodic table value for chlorine is 35.45 u, not 35 or 37.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-green-900 dark:text-green-300 mb-3">
              Worked Example: Average Atomic Mass of Chlorine
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
              Chlorine is 75.76% chlorine-35 (34.969 u) and 24.24% chlorine-37
              (36.966 u). Convert the percentages to decimals and multiply each
              by its isotopic mass:
            </p>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-800 dark:text-slate-200 mb-3 overflow-x-auto">
              average mass = (0.7576 × 34.969) + (0.2424 × 36.966)
              <br />
              average mass = 26.49 + 8.96 = <strong>35.45 u</strong>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
              The average is closer to 35 than to 37 because chlorine-35 is much
              more abundant. This is why the periodic table lists 35.45 for
              chlorine.
            </p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Mass Spectrometry
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Isotopes and their abundances are measured with a{" "}
              <strong>mass spectrometer</strong>. A sample is vaporized, ionized,
              and accelerated through electric and magnetic fields. Because ions
              with different masses are deflected by different amounts, they
              separate and strike a detector. The resulting mass spectrum shows a
              peak for each isotope, and the height of each peak gives its
              relative abundance. Mass spectrometry is used in medicine, drug
              testing, environmental analysis, and space science.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.4.4. Forces That Hold the Nucleus Together
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              If protons are all positive, why doesn't the nucleus fly apart from
              electrostatic repulsion? The answer is the{" "}
              <strong>strong nuclear force</strong>, an attractive force that
              acts between nucleons at extremely short distances (about 10⁻¹⁵ m).
              Within that tiny range it is far stronger than the electrostatic
              repulsion between protons.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-0">
              Neutrons contribute to this attraction without adding any positive
              charge, so they help stabilize the nucleus. In small nuclei, roughly
              equal numbers of protons and neutrons work best. In larger nuclei,
              more neutrons are needed to outweigh proton repulsion — for
              example, lead-208 has 82 protons and 126 neutrons. If a nucleus has
              too few or too many neutrons, it may be unstable and undergo
              radioactive decay.
            </p>
          </div>

          {/* Real World Example */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200/50 dark:border-amber-700/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-800/50 rounded-xl text-amber-600 dark:text-amber-400 mt-1">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2 m-0">
                  Real-World Example: Radioactive Isotopes as Medical Tracers
                </h4>
                <p className="m-0 text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                  Technetium-99m is an isotope of technetium used in millions of
                  medical scans every year. Its chemical behaviour lets it target
                  specific organs, and its short half-life means it decays away
                  quickly after imaging. Iodine-131 is used to treat an
                  overactive thyroid because the thyroid absorbs iodine
                  preferentially. In both cases, the isotope's nuclear structure —
                  not its chemistry — provides the diagnostic or therapeutic
                  effect.
                </p>
              </div>
            </div>
          </div>

          <Practice number="1.4">
            <ExerciseQuestion
              question="An atom contains 16 protons, 18 neutrons, and 18 electrons. Which statement about this species is correct?"
              options={[
                "It is a neutral atom with mass number 34.",
                "It is a sulfide ion, S²⁻, with mass number 34.",
                "It is a sulfide ion, S²⁻, with mass number 36.",
                "It is a chlorine ion, Cl⁻, with mass number 34.",
              ]}
              correctAnswer={1}
              explanation="Z = 16 identifies the element as sulfur (S). A = 16 + 18 = 34, so the nuclide is sulfur-34. The atom has gained 2 electrons, giving a charge of 16 − 18 = −2. The species is therefore ³⁴₁₆S²⁻."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 1.5: Electromagnetic Radiation and Atomic Spectra */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-500 pl-4">
            1.5. Electromagnetic Radiation and Atomic Spectra
          </h2>

          <Lead>
            Atoms do not just absorb and emit matter — they also absorb and emit
            light. When white light passes through a gas or a gas is heated in a
            flame, the light produced contains only certain sharp colours. Those
            colours are a fingerprint of the atom's electron arrangement, and
            explaining them required a new kind of physics: quantum theory.
          </Lead>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.5.1. The Nature of Electromagnetic Radiation
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Electromagnetic radiation</strong> is energy carried by
              oscillating electric and magnetic fields that travel through space.
              Visible light is one form; radio waves, microwaves, infrared
              radiation, ultraviolet light, X-rays, and gamma rays are others.
              Together they form the <strong>electromagnetic spectrum</strong>.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              In a vacuum, all electromagnetic radiation travels at the same
              speed: the <strong>speed of light</strong>,{" "}
              <strong>c = 3.00 × 10⁸ m/s</strong>. The radiation can be described
              by its <strong>wavelength (λ)</strong> — the distance between
              successive crests, usually measured in metres or nanometres — and
              its <strong>frequency (ν)</strong> — the number of complete waves
              passing a point per second, measured in hertz (Hz = s⁻¹).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                The Wave Equation
              </h4>
              <Formula>c = λν</Formula>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-0">
                Rearranged: ν = c / λ and λ = c / ν. Wavelength and frequency
                are inversely related.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Worked Example
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Find the frequency of green light with λ = 500 nm.
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                500 nm = 5.00 × 10⁻⁷ m
                <br />
                ν = (3.00 × 10⁸) / (5.00 × 10⁻⁷)
                <br />
                ν = 6.00 × 10¹⁴ Hz
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              The relationship is inverse: <strong>shorter wavelength means
              higher frequency</strong>, and — as we will see — higher energy.
              Radio waves are long and low-energy; gamma rays are short and
              extremely energetic. Visible light occupies only a tiny window of
              the spectrum, from about <strong>400 nm (violet)</strong> to{" "}
              <strong>700 nm (red)</strong>.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Region
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Typical wavelength
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Energy trend
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Common use or effect
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Radio waves
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Greater than 1 m
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Lowest
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Broadcasting, MRI, communication
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Microwaves
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    1 mm – 1 m
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Low
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Cooking, radar, Wi-Fi
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Infrared
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    700 nm – 1 mm
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Moderate
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Heat radiation, remote controls, thermal cameras
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Visible light
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    400 – 700 nm
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Moderate
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Vision, photosynthesis, colour
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Ultraviolet
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    10 – 400 nm
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    High
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Vitamin D production, sterilization, sunburn
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    X-rays
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    0.01 – 10 nm
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Very high
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Medical imaging, crystal structure analysis
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Gamma rays
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Less than 0.01 nm
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Highest
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Nuclear decay, cancer therapy, sterilization
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              The Visible Spectrum
            </h4>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              White light contains all visible wavelengths. When it passes
              through a prism, the different wavelengths bend by different
              amounts and spread into a continuous rainbow: red, orange, yellow,
              green, blue, indigo, violet. Red light has the longest wavelength
              (lowest frequency and energy); violet has the shortest.
            </p>
            <div
              className="h-8 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, #dc2626, #f97316, #facc15, #22c55e, #3b82f6, #6366f1, #8b5cf6)",
              }}
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
              <span>700 nm — red</span>
              <span>550 nm — green</span>
              <span>400 nm — violet</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.5.2. Quantum Theory and Photons
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Classical physics predicted that an object should emit more and
              more energy at shorter wavelengths, leading to an absurd result
              called the ultraviolet catastrophe. In 1900, <strong>Max
              Planck</strong> solved the problem by proposing that energy is not
              continuous. Instead, atoms emit or absorb energy in discrete
              packets called <strong>quanta</strong>. The energy of one quantum is
              proportional to the frequency of the radiation:
            </p>
            <Formula>E = hν</Formula>
            <p className="text-slate-700 dark:text-slate-300 mt-4 mb-0">
              Here <strong>h</strong> is Planck's constant:{" "}
              <strong>h = 6.626 × 10⁻³⁴ J·s</strong>. A quantum of
              electromagnetic radiation is called a <strong>photon</strong>.
              Combining E = hν with c = λν gives:
            </p>
            <div className="mt-4">
              <Formula>E = hc / λ</Formula>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mt-4 mb-0">
              This equation shows that short-wavelength radiation carries more
              energy per photon. A single ultraviolet photon has more energy than
              a single red photon, even if the red beam is brighter overall.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-green-900 dark:text-green-300 mb-3">
                Worked Example: Energy of a Photon
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Calculate the energy of a red photon with λ = 700 nm.
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                λ = 7.00 × 10⁻⁷ m
                <br />
                E = hc / λ
                <br />
                E = (6.626 × 10⁻³⁴ × 3.00 × 10⁸) / (7.00 × 10⁻⁷)
                <br />
                E = 2.84 × 10⁻¹⁹ J
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Comparing Photons
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                A 400 nm violet photon carries about 75% more energy than a 700
                nm red photon. Gamma-ray photons carry millions of times more
                energy than visible photons, which is why they can damage DNA and
                ionize atoms.
              </p>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            The Photoelectric Effect
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              In 1905, <strong>Albert Einstein</strong> used Planck's idea to
              explain the <strong>photoelectric effect</strong>: when light shines
              on a metal surface, electrons can be ejected. Classical wave theory
              predicted that any frequency should work if the light is intense
              enough. Experiments showed the opposite:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
              <li>
                Below a certain <strong>threshold frequency</strong>, no electrons
                are emitted, no matter how intense the light.
              </li>
              <li>
                Above the threshold, increasing the intensity increases the{" "}
                <em>number</em> of electrons but not their maximum kinetic energy.
              </li>
              <li>
                Increasing the frequency increases the maximum kinetic energy of
                the ejected electrons.
              </li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Einstein explained this by treating light as a stream of photons.
              One photon is absorbed by one electron. The electron must use a
              minimum energy, called the <strong>work function (φ)</strong>, to
              escape the metal. Any leftover energy becomes kinetic energy:
            </p>
            <Formula>K<sub>max</sub> = hν − φ</Formula>
            <p className="text-slate-700 dark:text-slate-300 mt-4 mb-0">
              Red light may have too little energy per photon to overcome φ, while
              blue light has enough. This is strong evidence that light behaves as
              particles — photons — not merely as continuous waves.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.5.3. Atomic Spectra
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              When a solid, liquid, or dense gas is heated, it emits a{" "}
              <strong>continuous spectrum</strong>: all wavelengths are present,
              producing a rainbow with no gaps. But when a gas of individual atoms
              is excited — by heating it in a flame or passing an electric
              discharge through it — it emits only a few sharp wavelengths. This
              is a <strong>line spectrum</strong> (or emission spectrum), and each
              line appears as a coloured image of the slit in a spectroscope.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              If white light passes through a cool gas, the gas absorbs exactly
              the same wavelengths it would emit. The result is a{" "}
              <strong>continuous spectrum interrupted by dark lines</strong> — an{" "}
              <strong>absorption spectrum</strong>. The dark lines occur at the
              same wavelengths as the bright emission lines. Every element has a
              unique set of lines, so spectra can be used to identify elements,
              even in distant stars.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Emission Spectrum
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Bright lines on a dark background. Produced when excited atoms
                release photons and fall to lower energy levels.
              </p>
              <div className="bg-slate-950 rounded-lg h-12 flex items-center justify-center gap-2 px-4">
                <span className="h-6 w-1 bg-violet-500" />
                <span className="h-6 w-1 bg-blue-500" />
                <span className="h-6 w-1 bg-cyan-400" />
                <span className="h-6 w-1 bg-green-500" />
                <span className="h-6 w-1 bg-yellow-400" />
                <span className="h-6 w-1 bg-orange-500" />
                <span className="h-6 w-1 bg-red-500" />
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Absorption Spectrum
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Dark lines on a continuous rainbow. Produced when atoms absorb
                photons of specific energies.
              </p>
              <div
                className="rounded-lg h-12 flex items-center justify-center gap-2 px-4"
                style={{
                  background:
                    "linear-gradient(to right, #8b5cf6, #22c55e, #facc15, #ef4444)",
                }}
              >
                <span className="h-6 w-1 bg-slate-950" />
                <span className="h-6 w-1 bg-slate-950" />
                <span className="h-6 w-1 bg-slate-950" />
                <span className="h-6 w-1 bg-slate-950" />
                <span className="h-6 w-1 bg-slate-950" />
                <span className="h-6 w-1 bg-slate-950" />
                <span className="h-6 w-1 bg-slate-950" />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              The Hydrogen Line Spectrum
            </h4>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Hydrogen produces particularly simple spectra. Its visible lines,
              called the <strong>Balmer series</strong>, occur at 656 nm (red),
              486 nm (blue-green), 434 nm (blue-violet), and 410 nm (violet).
              Additional series lie in the ultraviolet (the <strong>Lyman
              series</strong>) and infrared (the <strong>Paschen series</strong>).
              In 1885, Johann Balmer found an empirical formula for the visible
              lines; Johannes Rydberg generalized it:
            </p>
            <Formula>
              1/λ = R<sub>H</sub> (1/n₁² − 1/n₂²)
            </Formula>
            <p className="text-slate-700 dark:text-slate-300 mt-4 mb-0">
              Here <strong>R<sub>H</sub> = 1.097 × 10⁷ m⁻¹</strong>,{" "}
              <strong>n₁</strong> is the lower energy level, and{" "}
              <strong>n₂</strong> is the higher level (n₂ is greater than n₁).
              For the Balmer series n₁ = 2; for Lyman n₁ = 1; for Paschen n₁ = 3.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Series
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Lower level (n₁)
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Region
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Example transition
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Lyman
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    1
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Ultraviolet
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    n = 2 → 1 (121.6 nm)
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Balmer
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    2
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Visible
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    n = 3 → 2 (656 nm)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Paschen
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    3
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Infrared
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    n = 4 → 3 (1875 nm)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.5.4. The Bohr Model of the Hydrogen Atom
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              In 1913, <strong>Niels Bohr</strong> proposed a model that explained
              the hydrogen spectrum. It combined Rutherford's nuclear atom with
              Planck's quantum idea:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
              <li>
                Electrons move in circular <strong>orbits</strong> around the
                nucleus, but only certain orbits are allowed. Each allowed orbit
                has a fixed energy level.
              </li>
              <li>
                An electron in an allowed orbit does not emit energy, even though
                it is accelerating.
              </li>
              <li>
                An electron can move between levels by absorbing or emitting a
                photon whose energy equals the difference between the levels:{" "}
                <strong>ΔE = hν</strong>.
              </li>
            </ol>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Bohr derived that the energy of the nth level of hydrogen is:
            </p>
            <Formula>E<sub>n</sub> = −13.6 / n² eV</Formula>
            <p className="text-slate-700 dark:text-slate-300 mt-4 mb-0">
              The negative sign means the electron is bound to the nucleus. The
              energy is zero when the electron is completely free (n = ∞). The{" "}
              <strong>ground state</strong> is n = 1, with E₁ = −13.6 eV — the
              lowest and most stable energy level.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Level (n)
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Energy (eV)
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Energy relative to ground state (eV)
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Orbit radius
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    1
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    −13.6
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    0
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    52.9 pm
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    2
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    −3.40
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    10.2
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    212 pm
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    3
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    −1.51
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    12.1
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    476 pm
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    4
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    −0.850
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    12.8
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    847 pm
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    ∞
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    0
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    13.6
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    —
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-green-900 dark:text-green-300 mb-3">
              Worked Example: The Red Line of Hydrogen
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
              Find the energy and wavelength of the photon emitted when hydrogen
              falls from n = 3 to n = 2.
            </p>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1 overflow-x-auto">
              <div>ΔE = E₃ − E₂ = (−1.51) − (−3.40) = +1.89 eV</div>
              <div>The positive value is the energy released as a photon.</div>
              <div>λ = hc / ΔE = 1240 eV·nm / 1.89 eV ≈ 656 nm</div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-3 mb-0">
              656 nm is red light — exactly the first line of the Balmer series.
              Bohr's model therefore explained a spectrum that classical physics
              could not.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Bohr's model also predicts the size of the orbits. The radius of the
              nth orbit is <strong>r<sub>n</sub> = n²a₀</strong>, where{" "}
              <strong>a₀ = 52.9 pm</strong> is the Bohr radius. The n = 2 orbit is
              four times larger than the ground state, and the n = 3 orbit is nine
              times larger.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              The energy needed to remove an electron completely from the ground
              state is <strong>13.6 eV</strong>. This is hydrogen's ionization
              energy. Photons with energy greater than 13.6 eV can ionize hydrogen
              atoms, and any excess energy becomes the ejected electron's kinetic
              energy.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-red-900 dark:text-red-300 mb-3">
              Limitations of the Bohr Model
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 m-0">
              <li>
                It works accurately only for hydrogen and other one-electron
                species such as He⁺ and Li²⁺.
              </li>
              <li>
                It cannot explain the spectra of atoms with more than one
                electron, because it ignores electron–electron repulsion.
              </li>
              <li>
                It treats electrons as particles in definite circular orbits,
                which contradicts the uncertainty principle.
              </li>
              <li>
                It cannot explain why spectral lines split in a magnetic field
                (the Zeeman effect) or why some lines are more intense than
                others.
              </li>
              <li>
                It does not explain chemical bonding, which depends on the
                wave nature and distribution of electrons.
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-amber-500">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3 text-lg">
              <Zap className="text-amber-500" size={20} />
              Key Idea: Light Is Both Wave and Particle
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
              Electromagnetic radiation travels as a wave and is described by
              c = λν, but it interacts with matter as discrete photons of energy
              E = hν. This wave-particle duality is the doorway to the quantum
              mechanical model, where electrons themselves also behave as waves.
            </p>
          </div>

          {/* Real World Example */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200/50 dark:border-amber-700/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-800/50 rounded-xl text-amber-600 dark:text-amber-400 mt-1">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2 m-0">
                  Real-World Example: Reading the Composition of Stars
                </h4>
                <p className="m-0 text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                  Astronomers spread starlight into a spectrum and look for dark
                  absorption lines. Each line identifies an element: hydrogen,
                  helium, sodium, iron, and so on. This is how we know what the
                  Sun and distant galaxies are made of without ever visiting
                  them. Helium was in fact discovered in the Sun's spectrum before
                  it was found on Earth — its name comes from the Greek word for
                  the Sun.
                </p>
              </div>
            </div>
          </div>

          <Practice number="1.5">
            <ExerciseQuestion
              question="Which transition in a hydrogen atom emits a photon with the shortest wavelength?"
              options={[
                "n = 3 → n = 2",
                "n = 4 → n = 2",
                "n = 2 → n = 1",
                "n = 5 → n = 3",
              ]}
              correctAnswer={2}
              explanation="The shortest wavelength corresponds to the largest energy difference. ΔE for n = 2 → 1 is 10.2 eV, much larger than the others. It produces a 121.6 nm ultraviolet photon in the Lyman series."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 1.6: The Quantum Mechanical Model of the Atom */}
        <section id="subtopic-1.6" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-indigo-600 pl-4">
            1.6. The Quantum Mechanical Model of the Atom
          </h2>

          <Lead>
            Bohr's orbits explained hydrogen but failed for every other atom. A
            new model replaced definite circular paths with something stranger and
            more powerful: electrons described by waves of probability. This
            quantum mechanical model is the basis of modern chemistry.
          </Lead>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.6.1. Wave-Particle Duality and de Broglie Waves
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Einstein showed that light — a wave — can behave as a stream of
              particles. In 1924, <strong>Louis de Broglie</strong> proposed the
              reverse: any moving particle has an associated wavelength. The
              wavelength is given by:
            </p>
            <Formula>λ = h / (mv) = h / p</Formula>
            <p className="text-slate-700 dark:text-slate-300 mt-4 mb-0">
              Here <strong>h</strong> is Planck's constant, <strong>m</strong> is
              the mass, <strong>v</strong> is the speed, and{" "}
              <strong>p = mv</strong> is the momentum. For everyday objects, the
              wavelength is unimaginably small and unobservable. For an electron,
              however, the wavelength is comparable to the size of an atom — so
              wave behaviour matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-green-900 dark:text-green-300 mb-3">
                Worked Example: Electron Wavelength
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Find λ for an electron (m = 9.109 × 10⁻³¹ kg) moving at 1.00 ×
                10⁶ m/s.
              </p>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                λ = h / (mv)
                <br />
                λ = 6.626 × 10⁻³⁴ / (9.109 × 10⁻³¹ × 1.00 × 10⁶)
                <br />
                λ = 7.27 × 10⁻¹⁰ m = 0.727 nm
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                The Davisson–Germer Experiment
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                In 1927, Clinton Davisson and Lester Germer fired electrons at a
                nickel crystal and observed a diffraction pattern — the same kind
                of pattern produced by X-rays. This was direct evidence that
                electrons behave as waves. Today, electron diffraction is used to
                study crystal structures and surfaces.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.6.2. Heisenberg's Uncertainty Principle
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              If an electron is a wave, it cannot also be a point particle moving
              along a precise path. In 1927, <strong>Werner Heisenberg</strong>{" "}
              stated that it is impossible to know both the exact position and the
              exact momentum of a particle at the same time:
            </p>
            <Formula>Δx · Δp ≥ h / 4π</Formula>
            <p className="text-slate-700 dark:text-slate-300 mt-4 mb-4">
              Here Δx is the uncertainty in position and Δp is the uncertainty in
              momentum. This is not a limitation of our instruments — it is a
              fundamental property of nature. If we measure position very
              precisely (small Δx), the momentum uncertainty must become large,
              and vice versa.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              The consequence is profound: electrons do not travel in definite
              orbits. Instead, we can only describe the <strong>probability</strong>{" "}
              of finding an electron in a given region of space.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-green-900 dark:text-green-300 mb-3">
              Worked Example: Uncertainty in Electron Speed
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
              If an electron is confined to a region about the size of an atom,
              Δx = 1.00 × 10⁻¹⁰ m, what is the minimum uncertainty in its speed?
            </p>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1 overflow-x-auto">
              <div>Δp ≥ h / (4πΔx)</div>
              <div>Δp ≥ 6.626 × 10⁻³⁴ / (4π × 1.00 × 10⁻¹⁰)</div>
              <div>Δp ≥ 5.27 × 10⁻²⁵ kg·m/s</div>
              <div>Δv = Δp / m = 5.27 × 10⁻²⁵ / 9.109 × 10⁻³¹ ≈ 5.8 × 10⁵ m/s</div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-3 mb-0">
              An uncertainty of nearly 600 km/s in the electron's speed is huge
              on the atomic scale. This is why the idea of a well-defined orbit
              breaks down.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.6.3. The Schrödinger Equation and Orbitals
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              In 1926, <strong>Erwin Schrödinger</strong> developed an equation
              that treats the electron as a wave. Solving it gives a{" "}
              <strong>wavefunction (ψ)</strong> for each allowed energy state. The
              wavefunction itself has no direct physical meaning, but its square,{" "}
              <strong>ψ²</strong>, gives the <strong>probability density</strong> —
              the likelihood of finding the electron at a particular point in
              space.
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The region of space where an electron is most likely to be found is
              called an <strong>orbital</strong>. By convention, orbitals are
              drawn to enclose about a <strong>90% probability</strong> of finding
              the electron. An orbital is not a container or a path; it is a map
              of probability.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              The probability density is not uniform. In some places it is high,
              forming lobes or shells. Surfaces where the probability density is
              exactly zero are called <strong>nodes</strong>. An s orbital has
              spherical shells of high probability, while p and d orbitals have
              directional lobes separated by nodal planes.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Feature
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Bohr orbit
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Quantum mechanical orbital
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Shape
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Circular path in a plane
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Three-dimensional probability region
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Electron path
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Definite, predictable path
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    No definite path; only probability
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Model of electron
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Particle
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Wave-particle (wavefunction)
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Applies to
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Hydrogen and one-electron ions only
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    All atoms and molecules
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.6.4. Quantum Numbers
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Solving the Schrödinger equation produces a set of numbers called{" "}
              <strong>quantum numbers</strong>. Four quantum numbers completely
              describe an electron's energy, orbital, orientation, and spin. No
              two electrons in an atom can have exactly the same set of four
              quantum numbers — this is the Pauli exclusion principle.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Quantum number
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Symbol
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Allowed values
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    What it describes
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Principal
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    n
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    1, 2, 3, ...
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Main energy level (shell) and approximate size
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Angular momentum
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    l
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    0 to n − 1
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Subshell and shape of the orbital (s, p, d, f)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Magnetic
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    m<sub>l</sub>
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    −l to +l
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Orientation of the orbital in space
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Spin
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    m<sub>s</sub>
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    +1/2 or −1/2
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Direction of electron spin
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Subshells and Their Capacity
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      l
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Subshell
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      m<sub>l</sub> values
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Number of orbitals
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Maximum electrons
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      0
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      s
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      0
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      1
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      2
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      1
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      p
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      −1, 0, +1
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      3
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      6
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      2
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      d
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      −2, −1, 0, +1, +2
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      5
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      10
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      3
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      f
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      −3 to +3
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      7
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      14
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 mb-0">
              For a given principal level n, there are n subshells and n²
              orbitals, holding a maximum of <strong>2n²</strong> electrons. For
              n = 3: 3s (1 orbital), 3p (3 orbitals), 3d (5 orbitals) — 9 orbitals
              and 18 electrons.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-green-900 dark:text-green-300 mb-3">
              Worked Example: Are These Quantum Numbers Allowed?
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
              Consider n = 2, l = 2, m<sub>l</sub> = 0, m<sub>s</sub> = +1/2. Is
              this set allowed?
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
              No. For n = 2, the angular momentum quantum number l can only be 0
              or 1, not 2. The allowed subshells are 2s (l = 0) and 2p (l = 1).
              The set would be allowed if n were 3 or higher, because then l = 2
              (a 3d subshell) becomes possible.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.6.5. Shapes of Orbitals
          </h3>

          <div className="grid sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg text-center">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                s Orbital
              </h4>
              <div className="flex justify-center mb-4">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-300 via-blue-500 to-indigo-700 opacity-80 ring-4 ring-blue-200 dark:ring-blue-900/50" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Spherical. Only one s orbital per subshell. The 2s orbital has a
                spherical node separating an inner and outer region.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg text-center">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                p Orbitals
              </h4>
              <div className="flex items-center justify-center gap-1 mb-4 h-24">
                <div className="h-12 w-12 rounded-full bg-gradient-to-l from-rose-400 to-rose-600 opacity-80" />
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-rose-400 to-rose-600 opacity-80" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Dumbbell-shaped, with two lobes and a nodal plane between them.
                Three p orbitals — p<sub>x</sub>, p<sub>y</sub>, p<sub>z</sub> —
                point along the x, y, and z axes.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg text-center">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                d Orbitals
              </h4>
              <div className="flex items-center justify-center mb-4 h-24">
                <div className="grid grid-cols-2 gap-1 rotate-45">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 opacity-80" />
                  <div className="h-9 w-9 rounded-full bg-gradient-to-bl from-emerald-400 to-teal-600 opacity-80" />
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-600 opacity-80" />
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tl from-emerald-400 to-teal-600 opacity-80" />
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Mostly four-lobed (clover-shaped), with one exception (d<sub>z²</sub>).
                Five d orbitals exist in every d subshell.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Orbital Energy Order
            </h4>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              In a one-electron atom, energy depends only on n, so all subshells
              within a shell are equal in energy: 1s is lowest, then 2s = 2p, then
              3s = 3p = 3d, and so on. In multi-electron atoms, electron–electron
              repulsion and shielding split the subshell energies:
            </p>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 text-center font-mono text-sm text-slate-800 dark:text-slate-200 overflow-x-auto">
              1s &lt; 2s &lt; 2p &lt; 3s &lt; 3p &lt; 4s &lt; 3d &lt; 4p &lt; 5s
              &lt; 4d &lt; 5p ...
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 mb-0">
              Notice that 4s lies below 3d. This ordering explains many electron
              configurations and the structure of the periodic table.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-indigo-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3 text-lg">
              <BookOpen className="text-indigo-500" size={20} />
              Key Idea: Orbitals Are Probability Maps
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
              The quantum mechanical model does not tell us where an electron is.
              It tells us where an electron is likely to be. Quantum numbers
              label each orbital, and orbital shapes show the regions of high
              probability. This probabilistic picture is what makes chemistry —
              bonding, reactivity, and the periodic table — understandable.
            </p>
          </div>

          {/* Real World Example */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 sm:p-8 mb-6 border border-indigo-200/50 dark:border-indigo-700/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-800/50 rounded-xl text-indigo-600 dark:text-indigo-400 mt-1">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-2 m-0">
                  Real-World Example: Lasers and Quantized Energy Levels
                </h4>
                <p className="m-0 text-indigo-800/80 dark:text-indigo-200/80 leading-relaxed">
                  A laser works because atoms have discrete energy levels. Energy
                  is pumped into the atoms, raising electrons to a higher level.
                  When an electron falls back, it emits a photon. In a laser,
                  that photon stimulates other excited atoms to emit identical
                  photons — same energy, same wavelength, same direction. The
                  result is a narrow, intense beam. Barcode scanners, fibre-optic
                  communication, and eye surgery all depend on this quantum
                  behaviour.
                </p>
              </div>
            </div>
          </div>

          <Practice number="1.6">
            <ExerciseQuestion
              question="Which set of quantum numbers is NOT allowed for an electron in an atom?"
              options={[
                "n = 1, l = 0, mₗ = 0, mₛ = +1/2",
                "n = 2, l = 1, mₗ = −1, mₛ = −1/2",
                "n = 2, l = 2, mₗ = 0, mₛ = +1/2",
                "n = 3, l = 2, mₗ = +2, mₛ = −1/2",
              ]}
              correctAnswer={2}
              explanation="The angular momentum quantum number l can range only from 0 to n − 1. For n = 2, l can be 0 or 1, so the set with n = 2 and l = 2 is impossible. All the other sets satisfy the allowed ranges."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 1.7: Electronic Configurations and Orbital Diagrams */}
        <section id="subtopic-1.7" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-teal-600 pl-4">
            1.7. Electronic Configurations and Orbital Diagrams
          </h2>

          <Lead>
            Knowing that electrons occupy orbitals is only the beginning. We also
            need to know which orbitals they fill, in what order, and how they
            pair up. Three simple rules let us write the electron configuration of
            any element — and those configurations explain the periodic table.
          </Lead>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.7.1. Three Rules for Filling Orbitals
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Aufbau Principle
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Electrons fill the lowest-energy orbital available first. Only
                when a lower-energy orbital is full do electrons begin to occupy
                a higher-energy one. "Aufbau" is German for "building up."
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Pauli Exclusion Principle
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                An orbital can hold at most two electrons, and those two
                electrons must have opposite spins. No two electrons in an atom
                can have the same four quantum numbers.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Hund's Rule
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Within a set of orbitals of equal energy (such as the three p
                orbitals), electrons occupy separate orbitals with parallel spins
                before any orbital is doubly occupied.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              The Filling Order
            </h4>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The Aufbau order can be remembered with the diagonal rule. Write
              the subshells in rows by principal quantum number, then read along
              diagonals from top-left to bottom-right:
            </p>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-5 font-mono text-sm text-slate-800 dark:text-slate-200 overflow-x-auto">
              <div className="space-y-1">
                <div>1s</div>
                <div>2s&nbsp;&nbsp;2p</div>
                <div>3s&nbsp;&nbsp;3p&nbsp;&nbsp;3d</div>
                <div>4s&nbsp;&nbsp;4p&nbsp;&nbsp;4d&nbsp;&nbsp;4f</div>
                <div>5s&nbsp;&nbsp;5p&nbsp;&nbsp;5d&nbsp;&nbsp;5f</div>
                <div>6s&nbsp;&nbsp;6p&nbsp;&nbsp;6d</div>
                <div>7s&nbsp;&nbsp;7p</div>
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                <strong>Filling order:</strong> 1s → 2s → 2p → 3s → 3p → 4s →
                3d → 4p → 5s → 4d → 5p → 6s → 4f → 5d → 6p → 7s → 5f → 6d → 7p
              </p>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Applying the Rules: Carbon, Nitrogen, and Oxygen
          </h4>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Nitrogen (Z = 7): 1s² 2s² 2p³
              </h4>
              <div className="flex flex-wrap justify-center gap-4">
                <OrbitalDiagram label="1s" occupancy={[2]} />
                <OrbitalDiagram label="2s" occupancy={[2]} />
                <OrbitalDiagram label="2p" occupancy={[1, 1, 1]} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 mb-0">
                The three 2p electrons occupy separate orbitals with parallel
                spins, as Hund's rule requires. No pairing occurs until the
                fourth p electron is added.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Oxygen (Z = 8): 1s² 2s² 2p⁴
              </h4>
              <div className="flex flex-wrap justify-center gap-4">
                <OrbitalDiagram label="1s" occupancy={[2]} />
                <OrbitalDiagram label="2s" occupancy={[2]} />
                <OrbitalDiagram label="2p" occupancy={[2, 1, 1]} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 mb-0">
                The fourth p electron pairs with one of the unpaired electrons,
                leaving two unpaired electrons. This gives oxygen two unpaired
                spins.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.7.2. Writing Electron Configurations
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              An <strong>electron configuration</strong> lists how many electrons
              occupy each subshell. The notation uses the principal quantum
              number and subshell letter, followed by a superscript for the
              electron count — for example, 2p⁶ means six electrons in the 2p
              subshell. The superscripts must add up to the total number of
              electrons in the atom.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              An <strong>orbital diagram</strong> shows the same information
              visually: a box for each orbital, with arrows representing
              electrons. Up and down arrows represent opposite spins. Hund's rule
              is easy to see in an orbital diagram because unpaired electrons
              appear as single arrows in separate boxes.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Element
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Z
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Full configuration
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Shorthand
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                {[
                  ["Hydrogen", "1", "1s¹", "1s¹"],
                  ["Helium", "2", "1s²", "1s²"],
                  ["Lithium", "3", "1s² 2s¹", "[He] 2s¹"],
                  ["Carbon", "6", "1s² 2s² 2p²", "[He] 2s² 2p²"],
                  ["Nitrogen", "7", "1s² 2s² 2p³", "[He] 2s² 2p³"],
                  ["Oxygen", "8", "1s² 2s² 2p⁴", "[He] 2s² 2p⁴"],
                  ["Neon", "10", "1s² 2s² 2p⁶", "[He] 2s² 2p⁶"],
                  ["Sodium", "11", "1s² 2s² 2p⁶ 3s¹", "[Ne] 3s¹"],
                  ["Magnesium", "12", "1s² 2s² 2p⁶ 3s²", "[Ne] 3s²"],
                  ["Aluminium", "13", "1s² 2s² 2p⁶ 3s² 3p¹", "[Ne] 3s² 3p¹"],
                  ["Chlorine", "17", "1s² 2s² 2p⁶ 3s² 3p⁵", "[Ne] 3s² 3p⁵"],
                  ["Argon", "18", "1s² 2s² 2p⁶ 3s² 3p⁶", "[Ar]"],
                  ["Potassium", "19", "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹", "[Ar] 4s¹"],
                  ["Calcium", "20", "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²", "[Ar] 4s²"],
                  ["Iron", "26", "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²", "[Ar] 3d⁶ 4s²"],
                ].map(([name, z, full, short], index) => (
                  <tr
                    key={name}
                    className={index % 2 === 1 ? "bg-slate-50 dark:bg-slate-800/50" : ""}
                  >
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      {name}
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      {z}
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-mono text-xs sm:text-sm">
                      {full}
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-mono text-xs sm:text-sm">
                      {short}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Notice the writing convention: configurations are normally listed
              in order of increasing principal quantum number, so iron is written{" "}
              <strong>[Ar] 3d⁶ 4s²</strong>, even though the 4s orbital was filled
              before the 3d orbital. The filling order (4s before 3d) and the
              written order (3d before 4s) are both correct — they answer
              different questions.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.7.3. Noble-Gas Shorthand
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Because inner-shell configurations are long and repetitive, chemists
              often replace them with the symbol of the previous noble gas in
              square brackets. The noble gas represents a complete, stable inner
              core. For example:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 font-mono">
                Na: [Ne] 3s¹
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 font-mono">
                Mg: [Ne] 3s²
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 font-mono">
                Cl: [Ne] 3s² 3p⁵
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700 font-mono">
                Fe: [Ar] 3d⁶ 4s²
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 mb-0">
              The shorthand is especially useful for heavier elements. It also
              highlights the outermost electrons — the ones most important for
              chemical behaviour.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.7.4. Exceptions to the Aufbau Principle
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              A few elements do not follow the expected filling order because a
              half-filled or completely filled d subshell is unusually stable.
              The two most important examples are chromium and copper:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Chromium (Z = 24)
                </p>
                <p className="font-mono text-sm text-slate-900 dark:text-white m-0">
                  Expected: [Ar] 3d⁴ 4s²
                </p>
                <p className="font-mono text-sm text-green-700 dark:text-green-300 m-0 mt-1">
                  Actual: [Ar] 3d⁵ 4s¹
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Copper (Z = 29)
                </p>
                <p className="font-mono text-sm text-slate-900 dark:text-white m-0">
                  Expected: [Ar] 3d⁹ 4s²
                </p>
                <p className="font-mono text-sm text-green-700 dark:text-green-300 m-0 mt-1">
                  Actual: [Ar] 3d¹⁰ 4s¹
                </p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              In chromium, moving one 4s electron into 3d produces a half-filled
              3d⁵ subshell. In copper, it produces a fully filled 3d¹⁰ subshell.
              Both arrangements lower the overall energy. Similar exceptions
              occur for some heavier transition metals, including niobium,
              molybdenum, ruthenium, rhodium, palladium, silver, platinum, and
              gold.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.7.5. Electron Configurations of Ions
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              When a neutral atom forms an ion, electrons are added or removed
              from its configuration. <strong>Anions</strong> gain electrons and
              fill orbitals in the normal Aufbau order. <strong>Cations</strong>{" "}
              lose electrons from the highest principal energy level first. For
              transition metals, the 4s electrons are removed before the 3d
              electrons, because the 4s orbital is higher in energy in the ion.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Species
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Electrons
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Configuration
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Noble-gas core
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      Na⁺
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      10
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-mono">
                      1s² 2s² 2p⁶
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      [Ne]
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      Mg²⁺
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      10
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-mono">
                      1s² 2s² 2p⁶
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      [Ne]
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      O²⁻
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      10
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-mono">
                      1s² 2s² 2p⁶
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      [Ne]
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      Cl⁻
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      18
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-mono">
                      1s² 2s² 2p⁶ 3s² 3p⁶
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      [Ar]
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      Fe²⁺
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      24
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-mono">
                      [Ar] 3d⁶
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      [Ar]
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      Fe³⁺
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      23
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-mono">
                      [Ar] 3d⁵
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      [Ar]
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 mb-0">
              Na⁺, Mg²⁺, and O²⁻ are <strong>isoelectronic</strong> — they all
              have the same electron configuration as neon. Isoelectronic species
              often have similar chemical behaviour.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-teal-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3 text-lg">
              <BookOpen className="text-teal-500" size={20} />
              Key Idea: Configuration Explains Chemistry
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
              The outermost electron configuration determines how an atom bonds,
              what ions it forms, and where it sits in the periodic table. Noble
              gases have full outer shells and are unreactive. Alkali metals have
              a single outer s electron and lose it easily. Halogens are one
              electron short of a full shell and gain one readily. Section 1.8
              turns these observations into the periodic law.
            </p>
          </div>

          {/* Real World Example */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-6 sm:p-8 mb-6 border border-teal-200/50 dark:border-teal-700/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-teal-100 dark:bg-teal-800/50 rounded-xl text-teal-600 dark:text-teal-400 mt-1">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-teal-900 dark:text-teal-300 mb-2 m-0">
                  Real-World Example: Unpaired Electrons and Magnetism
                </h4>
                <p className="m-0 text-teal-800/80 dark:text-teal-200/80 leading-relaxed">
                  Oxygen's orbital diagram has two unpaired electrons in its 2p
                  subshell. Because of these unpaired spins, oxygen is
                  paramagnetic — liquid oxygen is attracted to a magnet. Gadolinium
                  compounds with many unpaired electrons are used as contrast
                  agents in MRI scans, where they alter the magnetic behaviour of
                  nearby water molecules. Electron configurations are not abstract
                  bookkeeping; they determine measurable physical properties.
                </p>
              </div>
            </div>
          </div>

          <Practice number="1.7">
            <ExerciseQuestion
              question="What is the ground-state electron configuration of chromium (Z = 24)?"
              options={[
                "[Ar] 3d⁴ 4s²",
                "[Ar] 3d⁵ 4s¹",
                "[Ar] 3d⁶",
                "[Ar] 3d³ 4s² 4p¹",
              ]}
              correctAnswer={1}
              explanation="Chromium is an exception to the Aufbau principle. Moving one 4s electron into the 3d subshell gives a half-filled 3d⁵ configuration, which is unusually stable. The expected [Ar] 3d⁴ 4s² arrangement is not the lowest-energy ground state."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 1.8: Electronic Configurations and the Periodic Table of the Elements */}
        <section id="subtopic-1.8" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-green-600 pl-4">
            1.8. Electronic Configurations and the Periodic Table of the Elements
          </h2>

          <Lead>
            The periodic table is not an arbitrary list — it is a map of electron
            configurations. An element's position reveals how many electrons it
            has in its outer shell, which in turn predicts its reactivity, the
            ions it forms, and how its size and energy change across the table.
          </Lead>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.8.1. Development of the Periodic Table
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              By the nineteenth century, chemists had discovered dozens of
              elements and noticed that some groups had strikingly similar
              properties. In 1817, <strong>Johann Döbereiner</strong> grouped
              elements into <strong>triads</strong> — sets of three with similar
              behaviour, such as lithium, sodium, and potassium. In 1864,{" "}
              <strong>John Newlands</strong> proposed the <strong>law of
              octaves</strong>, noting that properties seemed to repeat every
              eight elements when arranged by atomic weight.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              In 1869, <strong>Dmitri Mendeleev</strong> (and independently{" "}
              <strong>Lothar Meyer</strong>) produced a more comprehensive table.
              Mendeleev arranged the known elements by increasing atomic weight
              and placed elements with similar properties in the same vertical
              column. Crucially, he left <strong>gaps</strong> for elements he
              believed had not yet been discovered, and he predicted their
              properties.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Mendeleev's prediction
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                <strong>Eka-aluminium</strong> — a metal with atomic mass about
                68, low melting point, and a formula of Ea₂O₃.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Element found (1875)
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                <strong>Gallium (Ga)</strong> — atomic mass 69.7, melting point
                29.8 °C, oxide Ga₂O₃. The prediction was remarkably accurate.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Other successful predictions
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                <strong>Scandium</strong> (eka-boron) and{" "}
                <strong>germanium</strong> (eka-silicon) were discovered later
                with properties close to Mendeleev's predictions.
              </p>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-red-900 dark:text-red-300 mb-3">
              Limitations of Mendeleev's Table
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 m-0">
              <li>
                Ordering by atomic weight placed some elements in the wrong
                order. Tellurium (127.6) seemed heavier than iodine (126.9), yet
                their properties required the opposite order.
              </li>
              <li>
                Cobalt and nickel, and argon and potassium, created similar
                contradictions.
              </li>
              <li>
                Isotopes could not be explained, because they have different
                masses but identical chemical properties.
              </li>
              <li>
                The noble gases were unknown when Mendeleev constructed his
                table, so they had no place until later.
              </li>
              <li>
                The lanthanides (rare earths) fitted awkwardly and disrupted the
                pattern.
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The problem was solved in 1913 by <strong>Henry Moseley</strong>,
              who studied the X-ray spectra of elements. He found that the
              frequency of emitted X-rays increased in a regular way with an
              integer that we now call the <strong>atomic number (Z)</strong>.
              Atomic number — not atomic mass — is the true basis of ordering.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm font-bold text-green-900 dark:text-green-300 mb-2">
                Modern periodic law
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                The properties of the elements are periodic functions of their
                atomic numbers.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.8.2. Structure of the Modern Periodic Table
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The modern table is arranged in <strong>periods</strong> (horizontal
              rows) and <strong>groups</strong> (vertical columns). There are
              seven periods and eighteen groups, numbered 1 to 18 according to
              IUPAC. Elements in the same group have the same number of{" "}
              <strong>valence electrons</strong> in their outermost shell, which
              is why they have similar chemical properties. Elements in the same
              period have their outermost electrons in the same principal energy
              level.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Period
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Number of elements
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Subshells being filled
                    </th>
                    <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      1
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      2
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      1s
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      H, He
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      2
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      8
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      2s, 2p
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      Li to Ne
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      3
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      8
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      3s, 3p
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      Na to Ar
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      4
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      18
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      4s, 3d, 4p
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      K to Kr
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      5
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      18
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      5s, 4d, 5p
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      Rb to Xe
                    </td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      6
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      32
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      6s, 4f, 5d, 6p
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      Cs to Rn
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                      7
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      32
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      7s, 5f, 6d, 7p
                    </td>
                    <td className="border border-slate-200 dark:border-slate-700 p-3">
                      Fr to Og
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Blocks of the Periodic Table
          </h4>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                s-Block
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Groups 1 and 2, plus helium. The outermost electrons are in an s
                orbital. Group 1 elements have ns¹ configurations; group 2
                elements have ns² configurations.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                p-Block
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Groups 13 to 18, except helium. The outermost p orbitals are
                being filled. This block contains metals, metalloids, nonmetals,
                halogens, and noble gases.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                d-Block
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Groups 3 to 12 — the transition metals. The d subshell is being
                filled. These metals often form coloured compounds, show variable
                oxidation states, and act as catalysts.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                f-Block
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                The lanthanides and actinides, usually placed below the main
                table. The f subshell is being filled. Many actinides are
                radioactive.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Locating an Element from Its Configuration
            </h4>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              The highest principal quantum number gives the period. The type of
              subshell being filled gives the block. The number of valence
              electrons gives the group for s- and p-block elements.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <p className="font-mono font-bold text-slate-900 dark:text-white mb-1">
                  Mg: [Ne] 3s²
                </p>
                <p className="text-slate-600 dark:text-slate-400 m-0">
                  Period 3, group 2, s-block
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <p className="font-mono font-bold text-slate-900 dark:text-white mb-1">
                  Cl: [Ne] 3s² 3p⁵
                </p>
                <p className="text-slate-600 dark:text-slate-400 m-0">
                  Period 3, group 17, p-block
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                <p className="font-mono font-bold text-slate-900 dark:text-white mb-1">
                  Fe: [Ar] 3d⁶ 4s²
                </p>
                <p className="text-slate-600 dark:text-slate-400 m-0">
                  Period 4, group 8, d-block
                </p>
              </div>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Metals, Nonmetals, and Metalloids
          </h4>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Class
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Position
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Typical properties
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Metals
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Left and centre of the table
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Shiny, malleable, ductile, good conductors of heat and
                    electricity; tend to lose electrons and form positive ions.
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Nonmetals
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Upper right, plus hydrogen
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Poor conductors, often brittle solids or gases; tend to gain
                    electrons and form negative ions.
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Metalloids
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Along the staircase line: B, Si, Ge, As, Sb, Te
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Intermediate properties; semiconductors such as silicon and
                    germanium are essential to electronics.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Important Element Families
            </h4>
            <ul className="list-disc pl-5 space-y-3 text-sm text-slate-700 dark:text-slate-300 m-0">
              <li>
                <strong>Group 1 — alkali metals (Li, Na, K, Rb, Cs, Fr):</strong>{" "}
                ns¹ configuration; soft, highly reactive metals that react
                vigorously with water and form +1 ions.
              </li>
              <li>
                <strong>Group 2 — alkaline earth metals (Be, Mg, Ca, Sr, Ba, Ra):</strong>{" "}
                ns² configuration; reactive metals that form +2 ions.
              </li>
              <li>
                <strong>Group 17 — halogens (F, Cl, Br, I, At):</strong> ns²np⁵
                configuration; reactive nonmetals that form −1 ions and exist as
                diatomic molecules.
              </li>
              <li>
                <strong>Group 18 — noble gases (He, Ne, Ar, Kr, Xe, Rn):</strong>{" "}
                full outer shells (except He, which has 1s²); very unreactive,
                monatomic gases.
              </li>
              <li>
                <strong>Groups 3–12 — transition metals:</strong> d-block metals
                with variable oxidation states, coloured ions, and catalytic
                activity.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.8.3. Periodic Trends
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The trends across and down the table can be understood through two
              ideas: <strong>effective nuclear charge</strong> and{" "}
              <strong>distance from the nucleus</strong>. The effective nuclear
              charge (<strong>Z<sub>eff</sub></strong>) is the net positive charge
              felt by an outer electron after inner electrons shield some of the
              nucleus's attraction:
            </p>
            <Formula>Z<sub>eff</sub> = Z − S</Formula>
            <p className="text-slate-700 dark:text-slate-300 mt-4 mb-0">
              Here S is the shielding constant. Across a period, protons are
              added but electrons enter the same outer shell, so shielding
              increases only slightly. Z<sub>eff</sub> therefore increases from
              left to right, pulling electrons closer and making them harder to
              remove. Down a group, new shells are added, so the outer electrons
              are farther from the nucleus and are more shielded — even though Z
              increases, the distance effect dominates.
            </p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Atomic Radius
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              <strong>Atomic radius decreases across a period</strong> because
              Z<sub>eff</sub> increases and pulls the electron cloud inward.{" "}
              <strong>Atomic radius increases down a group</strong> because each
              new period adds a principal shell, placing valence electrons farther
              from the nucleus. For example, in period 3: Na (186 pm) → Mg (160
              pm) → Al (143 pm) → Si (117 pm) → P (110 pm) → S (104 pm) → Cl (99
              pm). Down group 1: Li (152 pm) → Na (186 pm) → K (227 pm) → Rb (248
              pm) → Cs (265 pm).
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Ions follow related rules. A <strong>cation</strong> is smaller than
              its parent atom because it has lost an outer electron and often an
              entire shell. An <strong>anion</strong> is larger because added
              electrons increase repulsion and the electron cloud expands. In an
              isoelectronic series, the largest species has the smallest nuclear
              charge: O²⁻ is larger than F⁻, which is larger than Ne, which is
              larger than Na⁺, which is larger than Mg²⁺.
            </p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Ionization Energy
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The <strong>first ionization energy (IE₁)</strong> is the energy
              needed to remove one electron from a gaseous atom:
            </p>
            <Formula>X(g) → X⁺(g) + e⁻</Formula>
            <p className="text-slate-700 dark:text-slate-300 mt-4 mb-4">
              Ionization energy generally <strong>increases across a period</strong>{" "}
              because Z<sub>eff</sub> increases and the electron is held more
              tightly. It generally <strong>decreases down a group</strong>{" "}
              because the outer electron is farther away and more shielded. The
              second ionization energy is always larger than the first, and
              removing an electron from a full inner shell requires a very large
              jump.
            </p>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              There are important irregularities. Boron's IE₁ (801 kJ/mol) is
              slightly lower than beryllium's (899 kJ/mol), because boron's
              electron is removed from a higher-energy 2p orbital while beryllium
              loses a 2s electron from a filled subshell. Oxygen's IE₁ (1314
              kJ/mol) is slightly lower than nitrogen's (1402 kJ/mol), because
              oxygen's fourth 2p electron is paired and experiences extra
              electron–electron repulsion. Similar exceptions occur between Mg
              and Al and between P and S.
            </p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Electron Affinity and Electronegativity
          </h4>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Electron Affinity
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                The energy change when a gaseous atom gains an electron. It
                generally becomes more exothermic across a period and less
                exothermic down a group. Noble gases have near-zero electron
                affinity because a new electron would have to enter a
                higher-energy shell. Chlorine has a greater electron affinity than
                fluorine, because fluorine's very small 2p orbitals cause strong
                electron–electron repulsion.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Electronegativity
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                A measure of how strongly an atom attracts shared electrons in a
                chemical bond (Pauling scale). It generally increases across a
                period and decreases down a group. Fluorine is the most
                electronegative element (4.0), followed by oxygen (3.44) and
                chlorine (3.16). Caesium is among the least electronegative. The
                difference in electronegativity between two bonded atoms helps
                predict whether a bond is nonpolar covalent, polar covalent, or
                ionic.
              </p>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Metallic Character
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>Metallic character decreases across a period</strong> and{" "}
              <strong>increases down a group</strong>. Metals lose electrons
              easily, so metallic character follows the opposite trend to
              ionization energy and electronegativity. This is why the metals
              cluster on the left and bottom-left of the table, while nonmetals
              occupy the upper right. Francium is the most metallic naturally
              occurring element; fluorine is the most nonmetallic.
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Property
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Across a period (left → right)
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Down a group (top → bottom)
                  </th>
                  <th className="border border-slate-200 dark:border-slate-600 p-3 text-left text-slate-900 dark:text-white">
                    Main reason
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Atomic radius
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Decreases
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Increases
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Increasing Z<sub>eff</sub> pulls electrons in; extra shells
                    increase distance.
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Ionization energy
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Increases
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Decreases
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Stronger attraction makes electrons harder to remove; larger
                    distance makes them easier to remove.
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Electron affinity
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    More exothermic
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Less exothermic
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Stronger nuclear attraction favours gaining an electron;
                    larger size reduces it.
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Electronegativity
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Increases
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Decreases
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Atoms with higher Z<sub>eff</sub> and smaller size attract
                    bonding electrons more strongly.
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-700 p-3 font-semibold">
                    Metallic character
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Decreases
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Increases
                  </td>
                  <td className="border border-slate-200 dark:border-slate-700 p-3">
                    Easier loss of electrons corresponds to larger size and lower
                    ionization energy.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.8.4. Advantages of Periodic Classification of the Elements
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <ul className="list-disc pl-5 space-y-3 text-sm text-slate-700 dark:text-slate-300 m-0">
              <li>
                <strong>Systematic study:</strong> thousands of elements and
                their compounds can be organized and studied in a logical
                framework instead of as isolated facts.
              </li>
              <li>
                <strong>Prediction of new elements:</strong> Mendeleev's gaps and
                predictions led to the discovery of gallium, scandium, and
                germanium. Modern predictions continue to guide the synthesis of
                new elements.
              </li>
              <li>
                <strong>Explanation of similarities:</strong> elements in the
                same group have similar valence-electron configurations, so their
                chemical behaviour can be predicted and explained.
              </li>
              <li>
                <strong>Understanding of trends:</strong> properties such as
                atomic radius, ionization energy, and electronegativity change in
                regular ways that can be explained by nuclear charge and electron
                shielding.
              </li>
              <li>
                <strong>Link between structure and properties:</strong> the table
                directly reflects the order in which electron subshells fill,
                connecting atomic structure to observable chemistry.
              </li>
              <li>
                <strong>Prediction of compounds and reactions:</strong> valence
                and likely oxidation states can be inferred from group position,
                helping chemists design reactions, materials, and drugs.
              </li>
              <li>
                <strong>Identification of relationships:</strong> the table shows
                families of elements (alkali metals, halogens, noble gases) and
                the transition from metals to nonmetals.
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-green-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3 text-lg">
              <Target className="text-green-500" size={20} />
              Key Idea: Position Predicts Properties
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
              An element's group tells you its valence electrons; its period tells
              you its outer shell. From those two pieces of information, you can
              predict the ions it forms, whether it is a metal or nonmetal, and
              how its size and ionization energy compare with its neighbours. The
              periodic table is the most useful map in chemistry.
            </p>
          </div>

          {/* Real World Example */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 sm:p-8 mb-6 border border-green-200/50 dark:border-green-700/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-800/50 rounded-xl text-green-600 dark:text-green-400 mt-1">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-green-900 dark:text-green-300 mb-2 m-0">
                  Real-World Example: LEDs and the Periodic Table
                </h4>
                <p className="m-0 text-green-800/80 dark:text-green-200/80 leading-relaxed">
                  The colours of modern LEDs come from combining elements from
                  specific groups. Gallium nitride (GaN) produces blue light;
                  indium and aluminium are added to tune the wavelength. Red and
                  orange LEDs use gallium arsenide phosphide (GaAsP). Because
                  these elements sit near the metalloid staircase, their
                  semiconductors have band gaps suited to emitting particular
                  wavelengths. The periodic table helped engineers choose the
                  right combinations — and blue LEDs won the 2014 Nobel Prize in
                  Physics.
                </p>
              </div>
            </div>
          </div>

          <Practice number="1.8">
            <ExerciseQuestion
              question="Which option correctly arranges Na, Mg, Al, and Si in order of increasing first ionization energy?"
              options={[
                "Na < Mg < Al < Si",
                "Na < Al < Mg < Si",
                "Si < Al < Mg < Na",
                "Al < Na < Si < Mg",
              ]}
              correctAnswer={1}
              explanation="Ionization energy generally increases across period 3, but aluminium is an exception: its first electron is removed from a 3p orbital, which is higher in energy than magnesium's 3s electron. The correct order is Na (496) < Al (578) < Mg (738) < Si (786 kJ/mol)."
            />
          </Practice>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
