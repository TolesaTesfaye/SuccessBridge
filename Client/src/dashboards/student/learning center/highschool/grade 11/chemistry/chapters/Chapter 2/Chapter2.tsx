import React, { useEffect } from "react";
import { ExerciseQuestion } from "../../../../../University/Freshman/components/ExerciseQuestion";
import {
  ArrowRight,
  Beaker,
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

const LEWIS_DOT_POSITIONS: React.CSSProperties[] = [
  { top: "2%", left: "30%" },
  { top: "2%", left: "58%" },
  { top: "32%", right: "4%" },
  { top: "58%", right: "4%" },
  { bottom: "2%", left: "58%" },
  { bottom: "2%", left: "30%" },
  { top: "32%", left: "4%" },
  { top: "58%", left: "4%" },
];

const LewisSymbol: React.FC<{
  symbol: string;
  electrons: number;
  charge?: string;
}> = ({ symbol, electrons, charge }) => (
  <div
    className={`relative flex h-20 w-20 items-center justify-center ${
      charge
        ? "rounded-lg border border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900"
        : ""
    }`}
  >
    <span className="text-xl font-bold text-slate-900 dark:text-white">
      {symbol}
    </span>
    {charge && (
      <span className="absolute -right-1 -top-2 rounded-full bg-white px-1 text-xs font-bold text-slate-700 dark:bg-slate-900 dark:text-slate-200">
        {charge}
      </span>
    )}
    {LEWIS_DOT_POSITIONS.slice(0, electrons).map((position, index) => (
      <span
        key={index}
        className="absolute h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white"
        style={position}
      />
    ))}
  </div>
);

export const Chapter2: React.FC<ChapterProps> = ({ selectedSubtopic }) => {
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
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold tracking-widest uppercase mb-4">
          <Beaker size={14} />
          Unit 2
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          Chemical Bonding and <br className="hidden sm:block" />
          Structure
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-green-600 to-emerald-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Atoms rarely exist alone. They join together by transferring, sharing,
          or pooling electrons — and the type of bond they form decides
          everything from the melting point of salt to the strength of steel.
        </p>
      </div>

      <div className="space-y-16 pb-20 px-4 md:px-8">
        {/* SUBTOPIC 2.1: Introduction */}
        <section id="subtopic-2.1" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-green-600 pl-4">
            2.1. Introduction
          </h2>

          <Lead>
            A chemical bond is the force that holds atoms together in a compound.
            Bonding is not random: atoms combine in ways that lower their total
            energy, usually by moving toward a more stable arrangement of
            valence electrons.
          </Lead>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Why Atoms Bond
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Two atoms that are far apart attract each other only weakly. As they
            move closer, their nuclei attract each other's electrons and the
            potential energy of the system falls. At a certain separation — the{" "}
            <strong>bond length</strong> — the energy reaches a minimum and the
            atoms are held together. If they are pushed even closer, the
            repulsion between the two positive nuclei dominates and the energy
            rises sharply.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-t-4 border-slate-400">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                1. Far apart
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                High potential energy. The atoms have little influence on each
                other.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-t-4 border-amber-500">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                2. Approaching
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                Attraction between nuclei and electrons lowers the energy.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border-t-4 border-green-600">
              <p className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 mb-1">
                3. Bond length
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                Energy is at its minimum. A stable bond has formed.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-t-4 border-red-500">
              <p className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-1">
                4. Too close
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                Nucleus–nucleus repulsion rises steeply. The bond is compressed.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The energy released when a bond forms is called the{" "}
              <strong>bond energy</strong>. A larger bond energy means a stronger
              bond. The same amount of energy must be supplied to break the bond.
              Bond strength depends on the atoms involved: the H–H bond stores
              about 436 kJ per mole, while the H–Cl bond stores about 431 kJ per
              mole.
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="w-full min-w-[480px] text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                      Bond
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                      Bond length (pm)
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                      Bond energy (kJ/mol)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      H–H
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      74
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      436
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      Cl–Cl
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      199
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      243
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      H–Cl
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      127
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      431
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Valence Electrons: The Electrons That Do the Bonding
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Only the electrons in the outermost shell — the{" "}
            <strong>valence electrons</strong> — are normally involved in
            bonding. The inner electrons are too tightly held by the nucleus.
            For main-group elements, the number of valence electrons is the same
            as the group number in the modern periodic table, except for helium.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Group
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Valence electrons
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Typical behaviour
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Example
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  {
                    group: "1",
                    electrons: "1",
                    behaviour: "Lose 1 electron to form a 1+ ion",
                    example: "Na → Na⁺",
                  },
                  {
                    group: "2",
                    electrons: "2",
                    behaviour: "Lose 2 electrons to form a 2+ ion",
                    example: "Mg → Mg²⁺",
                  },
                  {
                    group: "13",
                    electrons: "3",
                    behaviour: "Lose 3 electrons, or share",
                    example: "Al → Al³⁺",
                  },
                  {
                    group: "14",
                    electrons: "4",
                    behaviour: "Usually shares electrons",
                    example: "C in CH₄",
                  },
                  {
                    group: "15",
                    electrons: "5",
                    behaviour: "Gain 3 electrons, or share",
                    example: "N → N³⁻",
                  },
                  {
                    group: "16",
                    electrons: "6",
                    behaviour: "Gain 2 electrons, or share",
                    example: "O → O²⁻",
                  },
                  {
                    group: "17",
                    electrons: "7",
                    behaviour: "Gain 1 electron to form a 1− ion",
                    example: "Cl → Cl⁻",
                  },
                  {
                    group: "18",
                    electrons: "8 (He: 2)",
                    behaviour: "Already stable; rarely bond",
                    example: "Ne, Ar",
                  },
                ].map((row) => (
                  <tr key={row.group}>
                    <td className="px-4 py-3 font-bold text-green-700 dark:text-green-400">
                      {row.group}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {row.electrons}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {row.behaviour}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                      {row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.1.1 The Octet Rule
          </h3>

          <div className="bg-white dark:bg-slate-900 border-2 border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
            <h4 className="flex items-center gap-2 text-lg font-bold text-green-700 dark:text-green-300 mb-3">
              <Target size={20} />
              The Octet Rule
            </h4>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Atoms tend to gain, lose, or share electrons until they are
              surrounded by <strong>eight valence electrons</strong>, giving them
              the same electron configuration as a noble gas. Eight electrons
              fill the outermost s and p orbitals: <strong>ns² np⁶</strong>.
            </p>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The octet rule explains a great deal of main-group chemistry. Sodium
            has one valence electron, so it tends to lose that electron and
            expose the stable neon core. Chlorine has seven valence electrons, so
            it tends to gain one more to complete an argon-like octet. Carbon has
            four valence electrons and completes its octet by sharing four pairs.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              The duet rule: hydrogen and helium
            </h4>
            <p className="text-slate-700 dark:text-slate-300 m-0">
              Hydrogen and helium have only the 1s subshell, which holds a
              maximum of two electrons. Their “full shell” is therefore a{" "}
              <strong>duet</strong>, not an octet. Hydrogen forms one bond (as in
              H₂ or H₂O), and helium is already stable with two electrons.
            </p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Exceptions to the Octet Rule
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The octet rule is a useful guideline, not an absolute law. Several
            important classes of molecules and ions do not obey it.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-amber-500">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Incomplete octet
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                The central atom has fewer than eight electrons. This is common
                for beryllium and boron.
              </p>
              <p className="text-sm font-mono text-amber-700 dark:text-amber-400 m-0">
                BeCl₂ (4 e⁻) · BF₃ (6 e⁻)
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-purple-500">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Odd-electron species
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                The total number of valence electrons is odd, so one electron
                cannot be paired.
              </p>
              <p className="text-sm font-mono text-purple-700 dark:text-purple-400 m-0">
                NO (11 e⁻) · NO₂ (17 e⁻)
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-blue-500">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Expanded octet
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                The central atom has more than eight electrons by using empty d
                orbitals. This occurs from period 3 onward.
              </p>
              <p className="text-sm font-mono text-blue-700 dark:text-blue-400 m-0">
                PCl₅ (10 e⁻) · SF₆ (12 e⁻)
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-teal-500">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Duet rule
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Hydrogen and helium are stable with two electrons rather than
                eight.
              </p>
              <p className="text-sm font-mono text-teal-700 dark:text-teal-400 m-0">
                H₂ (2 e⁻) · He (2 e⁻)
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>Why the exceptions matter:</strong> they remind us that
              bonding is governed by energy, not by a simple counting rule.
              Molecules such as BF₃ and NO are perfectly stable even though
              their central atoms do not have an octet.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.1.2 Types of Chemical Bonding
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Atoms can reach a more stable electron arrangement in three main
            ways: by transferring electrons, by sharing electrons, or by pooling
            electrons across a lattice of metal atoms. Each mechanism produces a
            different type of bond and very different physical properties.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border-t-4 border-green-600">
              <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                Ionic bonding
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                Electrons are <strong>transferred</strong> from a metal to a
                nonmetal. The resulting positive and negative ions attract each
                other.
              </p>
              <p className="text-xs font-mono text-green-700 dark:text-green-400 m-0">
                Na⁺ Cl⁻ in NaCl
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border-t-4 border-blue-600">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">
                Covalent bonding
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                Electrons are <strong>shared</strong> between two nonmetal atoms.
                Each atom contributes at least one electron to the shared pair.
              </p>
              <p className="text-xs font-mono text-blue-700 dark:text-blue-400 m-0">
                H–H in H₂ · O=C=O in CO₂
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-lg border-t-4 border-amber-600">
              <h4 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">
                Metallic bonding
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                Valence electrons are <strong>delocalized</strong> over a lattice
                of positive metal ions, forming a “sea” of electrons.
              </p>
              <p className="text-xs font-mono text-amber-700 dark:text-amber-400 m-0">
                Cu, Fe, Al
              </p>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Polar and nonpolar covalent bonds
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Not all covalent bonds share electrons equally. When two identical
            atoms bond, as in Cl₂ or H₂, the shared electrons are pulled equally
            and the bond is <strong>nonpolar</strong>. When the atoms have
            different electronegativities, the electron pair spends more time
            near the more electronegative atom. The bond is then{" "}
            <strong>polar covalent</strong>, with a partial negative charge (δ−)
            on one end and a partial positive charge (δ+) on the other.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Nonpolar covalent
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Electrons shared equally. Electronegativity difference is very
                small (roughly less than 0.4). Example: Cl–Cl.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Polar covalent
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Electrons shared unequally. Difference is roughly 0.4–1.7.
                Example: H–Cl, with δ+ on H and δ− on Cl.
              </p>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Coordinate covalent bonds
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            In an ordinary covalent bond, each atom contributes one electron to
            the shared pair. In a <strong>coordinate covalent bond</strong> (also
            called a dative bond), one atom donates both electrons from a lone
            pair. The bond is chemically identical to an ordinary covalent bond
            once formed.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Example: formation of the ammonium ion
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-sm">
              <span className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded">
                NH₃
              </span>
              <span className="text-slate-500">+</span>
              <span className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded">
                H⁺
              </span>
              <ArrowRight size={16} className="text-green-600" />
              <span className="px-3 py-2 bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded text-green-800 dark:text-green-300">
                NH₄⁺
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 mb-0">
              Nitrogen's lone pair is donated to the empty 1s orbital of H⁺.
              After bonding, all four N–H bonds are equivalent.
            </p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Comparing the three bond types
          </h4>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Ionic
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Covalent
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Metallic
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                    How electrons behave
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Transferred
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Shared in pairs
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Delocalized
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                    Typical elements
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Metal + nonmetal
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Nonmetal + nonmetal
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Metal atoms
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                    Examples
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    NaCl, MgO, CaCl₂
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    H₂O, CO₂, CH₄
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Cu, Fe, Al
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                    Melting point
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    High
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Low to high (network solids are very high)
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Low to very high
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                    Electrical conductivity
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Only when molten or dissolved
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Usually none
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Good in the solid state
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                    Solubility in water
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Often soluble
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Usually insoluble
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Insoluble
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
                  Real-World Example: A Smartphone Uses All Three Bond Types
                </h4>
                <p className="m-0 text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                  The copper wiring and aluminium frame rely on{" "}
                  <strong>metallic bonding</strong> to conduct electricity and
                  resist bending. The glass screen is a{" "}
                  <strong>covalent network</strong> of silicon and oxygen atoms.
                  The plastic casing and the lithium salts inside the battery
                  depend on <strong>covalent</strong> and{" "}
                  <strong>ionic</strong> interactions respectively. A single
                  device is a lesson in how bonding controls function.
                </p>
              </div>
            </div>
          </div>

          {/* Key Concept Box */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-green-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4 text-xl">
              <Target className="text-green-500" />
              Key Idea: Electrons Decide Everything
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-center flex-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Valence electrons
                </div>
                <div className="text-xs text-slate-500">
                  1–8 per main-group atom
                </div>
              </div>
              <div className="text-green-500 font-bold">→</div>
              <div className="text-center flex-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Drive for stability
                </div>
                <div className="text-xs text-slate-500">
                  octet or duet
                </div>
              </div>
              <div className="text-green-500 font-bold">→</div>
              <div className="text-center flex-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Transfer / share / pool
                </div>
                <div className="text-xs text-slate-500">
                  ionic / covalent / metallic
                </div>
              </div>
              <div className="text-green-500 font-bold">→</div>
              <div className="text-center flex-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Properties
                </div>
                <div className="text-xs text-slate-500">
                  melting point, conductivity, strength
                </div>
              </div>
            </div>
          </div>

          <Practice number="2.1">
            <ExerciseQuestion
              question="Which pair of elements is most likely to form an ionic bond?"
              options={[
                "Carbon and oxygen",
                "Sodium and chlorine",
                "Hydrogen and hydrogen",
                "Nitrogen and nitrogen",
              ]}
              correctAnswer={1}
              explanation="Ionic bonds usually form between a metal with low electronegativity and a nonmetal with high electronegativity. Sodium is a group 1 metal that readily loses one electron, while chlorine is a group 17 nonmetal that readily gains one. Carbon–oxygen, H–H, and N–N bonds are covalent because the atoms have similar electronegativities and share electrons instead."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 2.2: Ionic Bonds */}
        <section id="subtopic-2.2" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-blue-600 pl-4">
            2.2. Ionic Bonds
          </h2>

          <Lead>
            An ionic bond is the electrostatic attraction between positively and
            negatively charged ions. It forms when one atom transfers one or more
            electrons to another, creating ions with stable noble-gas
            configurations.
          </Lead>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Ionic bonding is most common between a metal from the left side of
            the periodic table and a nonmetal from the right side. The metal has
            a low ionization energy and loses electrons easily; the nonmetal has
            a high electron affinity and gains them readily. The two ions then
            pack together into a repeating three-dimensional structure called a{" "}
            <strong>crystal lattice</strong>.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.2.1 Lewis Electron-Dot Symbols
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            A <strong>Lewis electron-dot symbol</strong> shows the valence
            electrons of an atom as dots placed around the element symbol. The
            symbol itself stands for the nucleus and all inner electrons. The
            dots are drawn one at a time on the four sides of the symbol; pairing
            begins only after each side has one dot.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Lewis symbols of the period 2 elements
            </h4>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { symbol: "Na", electrons: 1 },
                { symbol: "Mg", electrons: 2 },
                { symbol: "Al", electrons: 3 },
                { symbol: "C", electrons: 4 },
                { symbol: "N", electrons: 5 },
                { symbol: "O", electrons: 6 },
                { symbol: "F", electrons: 7 },
                { symbol: "Ne", electrons: 8 },
              ].map((item) => (
                <div key={item.symbol} className="text-center">
                  <LewisSymbol
                    symbol={item.symbol}
                    electrons={item.electrons}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-0">
                    {item.electrons} valence e⁻
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 mb-0">
              The dots are not meant to show the actual positions of electrons in
              space. They are a bookkeeping device for counting valence electrons
              and predicting how many bonds an atom will form.
            </p>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            When an atom loses or gains electrons, the Lewis symbol changes. A
            cation has lost its valence electrons and carries a positive charge.
            An anion has a complete octet and carries a negative charge. By
            convention, the ion symbol and its dots are enclosed in square
            brackets with the charge written outside.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Lewis symbols of common ions
            </h4>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { symbol: "Na", electrons: 0, charge: "+" },
                { symbol: "Mg", electrons: 0, charge: "2+" },
                { symbol: "Al", electrons: 0, charge: "3+" },
                { symbol: "Cl", electrons: 8, charge: "−" },
                { symbol: "O", electrons: 8, charge: "2−" },
                { symbol: "N", electrons: 8, charge: "3−" },
              ].map((item) => (
                <div key={item.symbol} className="text-center">
                  <LewisSymbol
                    symbol={item.symbol}
                    electrons={item.electrons}
                    charge={item.charge}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-0">
                    {item.electrons === 0
                      ? "lost all valence e⁻"
                      : "complete octet"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>Quick check:</strong> a neutral sodium atom has one dot.
              The Na⁺ ion has no dots and a + charge because it lost that
              electron. A neutral chlorine atom has seven dots. The Cl⁻ ion has
              eight dots because it gained one electron.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.2.2 Formation of Ionic Bonds
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Consider sodium and chlorine. Sodium has the configuration [Ne] 3s¹,
            and chlorine has [Ne] 3s² 3p⁵. Sodium can reach a neon configuration
            by losing its single 3s electron. Chlorine can reach an argon
            configuration by gaining one electron. The transfer satisfies both
            atoms at once.
          </p>

          <div className="grid gap-3 sm:grid-cols-3 mb-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3">
                Step 1 — Sodium loses an electron
              </p>
              <div className="flex items-center justify-center gap-2">
                <LewisSymbol symbol="Na" electrons={1} />
                <ArrowRight size={18} className="text-amber-600" />
                <LewisSymbol symbol="Na" electrons={0} charge="+" />
              </div>
              <p className="text-sm text-center text-slate-600 dark:text-slate-400 mt-3 mb-0">
                Na → Na⁺ + e⁻
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 mb-3">
                Step 2 — Chlorine gains it
              </p>
              <div className="flex items-center justify-center gap-2">
                <LewisSymbol symbol="Cl" electrons={7} />
                <ArrowRight size={18} className="text-green-600" />
                <LewisSymbol symbol="Cl" electrons={8} charge="−" />
              </div>
              <p className="text-sm text-center text-slate-600 dark:text-slate-400 mt-3 mb-0">
                Cl + e⁻ → Cl⁻
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-3">
                Step 3 — Ions attract
              </p>
              <div className="flex items-center justify-center gap-2">
                <LewisSymbol symbol="Na" electrons={0} charge="+" />
                <LewisSymbol symbol="Cl" electrons={8} charge="−" />
              </div>
              <p className="text-sm text-center text-slate-600 dark:text-slate-400 mt-3 mb-0">
                Na⁺ + Cl⁻ → NaCl
              </p>
            </div>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The overall reaction releases energy because the product lattice is
            much lower in energy than the separated atoms. The energy released
            when one mole of an ionic solid forms from its gaseous ions is called
            the <strong>lattice energy</strong>. It is a measure of how strongly
            the ions hold each other.
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The force between two ions follows Coulomb's law: it is proportional
            to the product of their charges and inversely proportional to the
            square of the distance between them.
          </p>

          <div className="mb-6">
            <Formula>E ∝ (q₁ × q₂) / r²</Formula>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2 mb-0">
              q₁ and q₂ are the ion charges; r is the distance between their
              centres.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Higher charges
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                A 2+ ion and a 2− ion attract more strongly than a 1+ and a 1−
                ion. MgO therefore has a much higher lattice energy than NaCl.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Smaller ions
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Smaller ions can get closer together, increasing the attraction.
                LiF has a higher lattice energy than KBr.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Stronger lattice
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                A higher lattice energy means a higher melting point and a harder
                crystal.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Ionic compound
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Ions
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Lattice energy (kJ/mol)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { compound: "NaCl", ions: "Na⁺, Cl⁻", energy: "787" },
                  { compound: "KBr", ions: "K⁺, Br⁻", energy: "682" },
                  { compound: "LiF", ions: "Li⁺, F⁻", energy: "1030" },
                  { compound: "CaO", ions: "Ca²⁺, O²⁻", energy: "3414" },
                  { compound: "MgO", ions: "Mg²⁺, O²⁻", energy: "3795" },
                ].map((row) => (
                  <tr key={row.compound}>
                    <td className="px-4 py-3 font-bold text-blue-700 dark:text-blue-400">
                      {row.compound}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {row.ions}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {row.energy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>Why ionic bonds are non-directional:</strong> an ion
              attracts every oppositely charged ion around it, not just one
              partner. Ionic compounds therefore form extended lattices rather
              than discrete molecules. The formula NaCl gives the simplest ratio
              of ions, not the number of atoms in a single molecule.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Charge Balance: Writing Ionic Formulas
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            An ionic compound is electrically neutral, so the total positive
            charge must equal the total negative charge. To write a formula, find
            the smallest whole-number ratio of cations to anions that balances
            the charges.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Compound
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Cation
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Anion
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Charge balance
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Formula
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  {
                    name: "Sodium chloride",
                    cation: "Na⁺",
                    anion: "Cl⁻",
                    balance: "1(+1) + 1(−1) = 0",
                    formula: "NaCl",
                  },
                  {
                    name: "Magnesium chloride",
                    cation: "Mg²⁺",
                    anion: "Cl⁻",
                    balance: "1(+2) + 2(−1) = 0",
                    formula: "MgCl₂",
                  },
                  {
                    name: "Aluminium oxide",
                    cation: "Al³⁺",
                    anion: "O²⁻",
                    balance: "2(+3) + 3(−2) = 0",
                    formula: "Al₂O₃",
                  },
                  {
                    name: "Calcium nitride",
                    cation: "Ca²⁺",
                    anion: "N³⁻",
                    balance: "3(+2) + 2(−3) = 0",
                    formula: "Ca₃N₂",
                  },
                ].map((row) => (
                  <tr key={row.formula}>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                      {row.cation}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                      {row.anion}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                      {row.balance}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-blue-700 dark:text-blue-400">
                      {row.formula}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            The same method works for any pair of ions. For example, magnesium
            (Mg²⁺) and nitrogen (N³⁻) combine in a 3:2 ratio, giving Mg₃N₂.
            Aluminium (Al³⁺) and oxygen (O²⁻) combine in a 2:3 ratio, giving
            Al₂O₃.
          </p>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Polyatomic ions
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Many ionic compounds contain <strong>polyatomic ions</strong> — groups
            of atoms held together by covalent bonds that carry a single overall
            charge. The group behaves as one unit when balancing charges. If more
            than one polyatomic ion is needed, its formula is placed in
            parentheses.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Polyatomic ion
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Formula
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Charge
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { name: "Ammonium", formula: "NH₄", charge: "1+" },
                  { name: "Hydroxide", formula: "OH", charge: "1−" },
                  { name: "Nitrate", formula: "NO₃", charge: "1−" },
                  { name: "Hydrogen carbonate", formula: "HCO₃", charge: "1−" },
                  { name: "Carbonate", formula: "CO₃", charge: "2−" },
                  { name: "Sulfate", formula: "SO₄", charge: "2−" },
                  { name: "Phosphate", formula: "PO₄", charge: "3−" },
                ].map((row) => (
                  <tr key={row.name}>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">
                      {row.formula}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">
                      {row.charge}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Worked examples with polyatomic ions
            </p>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 m-0 pl-5 list-disc">
              <li>
                NaOH: Na⁺ and OH⁻ balance 1:1.
              </li>
              <li>
                Ca(OH)₂: one Ca²⁺ needs two OH⁻ ions, so the hydroxide group is
                placed in parentheses.
              </li>
              <li>
                (NH₄)₂SO₄: two NH₄⁺ ions balance one SO₄²⁻ ion.
              </li>
              <li>
                Al(NO₃)₃: one Al³⁺ ion needs three NO₃⁻ ions.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.2.3 Exceptions to the Octet Rule in Ionic Compounds
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Most main-group ions achieve a noble-gas octet, but not all ions do.
            The exceptions fall into several recognizable groups.
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                1. Ions with a duet (2 electrons)
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Small ions in period 1 and the left side of period 2 have only
                the 1s shell. Li⁺ and Be²⁺ have the helium configuration (2
                electrons). The hydride ion, H⁻, also has two electrons.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-teal-500">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                2. Pseudo-noble-gas ions (18 electrons)
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Some metal ions have a filled d subshell rather than a noble-gas
                octet. Zn²⁺ ([Ar] 3d¹⁰), Cd²⁺, Ag⁺, and Hg²⁺ are common examples.
                Their outermost shell contains 18 electrons and is still
                spherically filled and stable.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                3. Transition-metal ions with incomplete d subshells
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Ions such as Fe²⁺, Fe³⁺, Cu²⁺, Co²⁺, and Mn²⁺ do not have a
                noble-gas configuration; their d subshells are partly filled.
                The simple octet rule is not useful for these ions. Their
                partially filled d orbitals are responsible for colour and
                magnetic behaviour.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                4. The inert-pair effect
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Heavy p-block elements sometimes form ions with a charge two
                less than the group number because the outer ns² pair is
                reluctant to leave. Tl⁺, Sn²⁺, Pb²⁺, and Bi³⁺ are examples.
                For instance, lead ([Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²) commonly forms Pb²⁺,
                keeping its 6s² pair.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                5. Expanded octets in complex ions
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                In complex ions, a central atom from period 3 or later may be
                surrounded by more than eight electrons. Examples include
                [AlF₆]³⁻, [SiF₆]²⁻, [PCl₆]⁻, and [PF₆]⁻, in which the central atom
                holds 12 electrons.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Species
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Valence electrons around central atom / ion
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Explanation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  {
                    species: "Li⁺, Be²⁺, H⁻",
                    electrons: "2",
                    reason: "Duet: only the 1s shell is occupied",
                  },
                  {
                    species: "Zn²⁺, Ag⁺, Hg²⁺",
                    electrons: "18",
                    reason: "Pseudo-noble-gas configuration with filled d subshell",
                  },
                  {
                    species: "Fe²⁺, Cu²⁺, Mn²⁺",
                    electrons: "partly filled d",
                    reason: "Transition-metal ions do not complete an octet",
                  },
                  {
                    species: "Pb²⁺, Sn²⁺, Tl⁺",
                    electrons: "inert s² pair",
                    reason: "The outer ns² pair resists removal",
                  },
                  {
                    species: "[AlF₆]³⁻, [PCl₆]⁻",
                    electrons: "12",
                    reason: "Expanded octet using empty d orbitals",
                  },
                ].map((row) => (
                  <tr key={row.species}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-blue-700 dark:text-blue-400">
                      {row.species}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {row.electrons}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>Remember:</strong> the octet rule is a model for predicting
              bonding, not a law of nature. The real driving force is always the
              lowering of energy.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.2.4 Properties of Ionic Compounds
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Because ionic compounds are built from a lattice of charged
            particles, their physical properties are very different from those of
            covalent molecules or metals.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Crystalline solids at room temperature
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Ions pack in a regular, repeating pattern. The resulting crystals
                are often brittle and cleave along flat planes.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                High melting and boiling points
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Strong electrostatic attractions must be overcome to separate the
                ions. MgO melts at about 2852 °C, while NaCl melts at 801 °C.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Hard and brittle
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                A stress that shifts one layer of ions can bring ions of the same
                charge next to each other. The resulting repulsion cracks the
                crystal.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Conduct electricity when molten or dissolved
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Solid ionic compounds do not conduct because the ions are locked
                in place. When melted or dissolved in water, the ions become
                mobile and carry current.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Soluble in polar solvents
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Water molecules surround and stabilize the ions through
                ion–dipole attractions. Ionic compounds are usually insoluble in
                nonpolar solvents such as hexane.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Electrolytes
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                A solution that conducts electricity because of dissolved ions is
                called an electrolyte. This is why salt water conducts while pure
                water conducts very poorly.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Ionic compound
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Melting point (°C)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { compound: "KBr", mp: "734" },
                  { compound: "NaCl", mp: "801" },
                  { compound: "LiF", mp: "845" },
                  { compound: "CaO", mp: "2572" },
                  { compound: "MgO", mp: "2852" },
                ].map((row) => (
                  <tr key={row.compound}>
                    <td className="px-4 py-3 font-bold text-blue-700 dark:text-blue-400">
                      {row.compound}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {row.mp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Why ionic crystals shatter instead of bending
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <div className="grid sm:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Normal lattice
                </p>
                <div className="space-y-1 max-w-[210px]">
                  {[
                    ["+", "−", "+", "−", ""],
                    ["−", "+", "−", "+", ""],
                  ].map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-5 gap-1">
                      {row.map((charge, index) =>
                        charge ? (
                          <div
                            key={index}
                            className={`flex h-9 items-center justify-center rounded text-sm font-bold ${
                              charge === "+"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                            }`}
                          >
                            {charge}
                          </div>
                        ) : (
                          <div key={index} />
                        )
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-0">
                  Each ion sits beside ions of the opposite charge.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  One layer shifted sideways
                </p>
                <div className="space-y-1 max-w-[210px]">
                  {[
                    ["+", "−", "+", "−", ""],
                    ["", "−", "+", "−", "+"],
                  ].map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-5 gap-1">
                      {row.map((charge, index) => {
                        const aligned = rowIndex === 1 && index >= 1 && index <= 3;
                        return charge ? (
                          <div
                            key={index}
                            className={`flex h-9 items-center justify-center rounded text-sm font-bold ${
                              aligned
                                ? "bg-red-100 text-red-700 ring-1 ring-red-400 dark:bg-red-900/40 dark:text-red-300"
                                : charge === "+"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                            }`}
                          >
                            {charge}
                          </div>
                        ) : (
                          <div key={index} />
                        );
                      })}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-0">
                  Like charges line up and repel — the crystal cracks.
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
              This is why ionic solids are brittle. Metals, whose electrons are
              delocalized, can shift layers without this kind of repulsion — which
              is why metals are malleable.
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
                  Real-World Example: Why Your Body Needs Electrolytes
                </h4>
                <p className="m-0 text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                  Sodium, potassium, calcium, and chloride ions carry electrical
                  signals along nerves, trigger muscle contractions, and maintain
                  the water balance of your cells. When you sweat heavily, you
                  lose these ions. An oral rehydration drink replaces them as
                  dissolved salts, which is why it restores the body's ability to
                  conduct nerve impulses — a direct application of ionic
                  conductivity in solution.
                </p>
              </div>
            </div>
          </div>

          {/* Key Concept Box */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-blue-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4 text-xl">
              <Target className="text-blue-500" />
              Key Idea: Lattice Structure Determines Ionic Properties
            </h4>
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <p className="m-0">
                <strong>Charged particles in a fixed lattice</strong> → hard,
                brittle crystals with high melting points.
              </p>
              <p className="m-0">
                <strong>No mobile charges in the solid</strong> → no electrical
                conductivity.
              </p>
              <p className="m-0">
                <strong>Mobile ions when molten or dissolved</strong> → conducts
                electricity and acts as an electrolyte.
              </p>
              <p className="m-0">
                <strong>Ion–dipole attraction with water</strong> → many ionic
                compounds dissolve in polar solvents.
              </p>
            </div>
          </div>

          <Practice number="2.2">
            <ExerciseQuestion
              question="Solid sodium chloride does not conduct electricity, but molten sodium chloride does. What is the best explanation?"
              options={[
                "Melting removes the electrons from the sodium ions.",
                "Melting frees the ions so they can move and carry current.",
                "Molten sodium chloride contains free chlorine molecules.",
                "Solid sodium chloride contains no charged particles.",
              ]}
              correctAnswer={1}
              explanation="In the solid state, Na⁺ and Cl⁻ ions are held in fixed positions in the lattice, so they cannot move to carry a current. Melting breaks the lattice apart and allows the ions to move freely. The ions themselves already exist in the solid; melting does not create or remove them."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 2.3: Covalent Bonds and Molecular Geometry */}
        <section id="subtopic-2.3" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            2.3. Covalent Bonds and Molecular Geometry
          </h2>

          <Lead>
            A covalent bond forms when two atoms share one or more pairs of
            electrons. Unlike an ionic bond, it has a definite direction in
            space — and that direction determines the shape of the molecule.
          </Lead>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Covalent bonding usually occurs between nonmetals. Neither atom is
            willing to give up electrons completely, so both contribute to a
            shared pair. The shared electrons belong to the outermost shells of
            both atoms at once, which allows each atom to count them toward its
            own octet.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            How a Covalent Bond Forms
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Two hydrogen atoms each have one electron in a 1s orbital. As the
            atoms approach, their half-filled 1s orbitals overlap. The two
            electrons occupy the region between the nuclei, where they are
            attracted by both positive nuclei at once. This shared electron
            density lowers the energy and holds the atoms together.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white m-0">
                  H·
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-0">
                  1 valence e⁻
                </p>
              </div>
              <span className="text-slate-400 font-bold">+</span>
              <div className="text-center">
                <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white m-0">
                  ·H
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-0">
                  1 valence e⁻
                </p>
              </div>
              <ArrowRight size={20} className="text-purple-600" />
              <div className="text-center">
                <p className="text-2xl font-bold font-mono text-purple-700 dark:text-purple-300 m-0">
                  H–H
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-0">
                  shared pair · duet
                </p>
              </div>
            </div>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            A shared pair is represented by a single line in a structural
            formula. Two shared pairs make a <strong>double bond</strong> (written
            =), and three shared pairs make a <strong>triple bond</strong> (written
            ≡). Multiple bonds are shorter and stronger than single bonds between
            the same two atoms.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Bond
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Length (pm)
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Energy (kJ/mol)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { bond: "C–C", type: "single", length: "154", energy: "347" },
                  { bond: "C=C", type: "double", length: "134", energy: "614" },
                  { bond: "C≡C", type: "triple", length: "120", energy: "839" },
                  { bond: "N–N", type: "single", length: "145", energy: "163" },
                  { bond: "N≡N", type: "triple", length: "110", energy: "945" },
                  { bond: "O=O", type: "double", length: "121", energy: "498" },
                  { bond: "H–O", type: "single", length: "96", energy: "463" },
                  { bond: "H–Cl", type: "single", length: "127", energy: "431" },
                ].map((row) => (
                  <tr key={row.bond}>
                    <td className="px-4 py-3 font-mono font-bold text-purple-700 dark:text-purple-300">
                      {row.bond}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.length}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.energy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>Pattern to notice:</strong> as the number of shared pairs
              increases, bond length decreases and bond energy increases. The
              N≡N triple bond is one of the strongest known, which is why nitrogen
              gas is so unreactive.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.3.1 Molecular Geometry
          </h3>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-3">
            Drawing Lewis structures
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            A <strong>Lewis structure</strong> shows how valence electrons are
            arranged in a molecule: which atoms are bonded, whether the bonds are
            single, double, or triple, and where the lone pairs sit. Follow these
            steps.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <ol className="text-sm text-slate-700 dark:text-slate-300 space-y-2 m-0 pl-5 list-decimal">
              <li>
                Count the total number of valence electrons. Add one electron for
                each negative charge; subtract one for each positive charge.
              </li>
              <li>
                Connect the atoms with single bonds. The least electronegative
                atom is usually central; hydrogen is always terminal.
              </li>
              <li>
                Complete the octet of every terminal atom with lone pairs.
              </li>
              <li>
                Place any remaining electrons on the central atom.
              </li>
              <li>
                If the central atom still lacks an octet, convert one or more
                lone pairs on a terminal atom into a double or triple bond.
              </li>
              <li>
                Check that every atom has a reasonable electron count and that
                the total number of electrons matches step 1.
              </li>
            </ol>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[700px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Molecule
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Valence electrons
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Lewis structure summary
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Shape
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  {
                    molecule: "H₂O",
                    electrons: "2(1) + 6 = 8",
                    structure: "H–O–H, two lone pairs on O",
                    shape: "Bent",
                  },
                  {
                    molecule: "NH₃",
                    electrons: "5 + 3(1) = 8",
                    structure: "Three N–H bonds, one lone pair on N",
                    shape: "Trigonal pyramidal",
                  },
                  {
                    molecule: "CO₂",
                    electrons: "4 + 2(6) = 16",
                    structure: "O=C=O, two lone pairs on each O",
                    shape: "Linear",
                  },
                  {
                    molecule: "N₂",
                    electrons: "5 + 5 = 10",
                    structure: "N≡N, one lone pair on each N",
                    shape: "Linear",
                  },
                  {
                    molecule: "CH₂O",
                    electrons: "4 + 2(1) + 6 = 12",
                    structure: "H–C(=O)–H, two lone pairs on O",
                    shape: "Trigonal planar",
                  },
                ].map((row) => (
                  <tr key={row.molecule}>
                    <td className="px-4 py-3 font-mono font-bold text-purple-700 dark:text-purple-300">
                      {row.molecule}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.electrons}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.structure}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.shape}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h5 className="font-bold text-slate-900 dark:text-white mb-3">
              Worked example: carbon dioxide
            </h5>
            <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-1 m-0 pl-5 list-decimal">
              <li>Total valence electrons: 4 + 2(6) = 16.</li>
              <li>
                Carbon is central: O–C–O. Two single bonds use 4 electrons,
                leaving 12.
              </li>
              <li>
                Give each oxygen three lone pairs (12 electrons). Now each O has
                eight electrons, but C has only four.
              </li>
              <li>
                Move one lone pair from each oxygen into a C=O double bond. The
                result is O=C=O, with two lone pairs on each oxygen.
              </li>
              <li>
                Every atom now has an octet, and all 16 electrons are used.
              </li>
            </ol>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The octet exceptions from section 2.1 also appear in covalent
            molecules: BF₃ has only six electrons around boron, NO has an odd
            electron count, and PCl₅ and SF₆ have expanded octets. Lewis
            structures are a model — useful, but not the final word.
          </p>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Polar bonds and molecular polarity
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            A covalent bond is <strong>polar</strong> when the two atoms have
            different electronegativities. The more electronegative atom pulls
            the shared electrons toward itself, creating a partial negative
            charge (δ−); the other atom becomes partially positive (δ+). The
            bond has a <strong>dipole moment</strong>, drawn as an arrow pointing
            from δ+ to δ−.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Bond
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Approximate ΔEN
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Classification
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { bond: "C–H", delta: "0.4", type: "Essentially nonpolar" },
                  { bond: "C–O", delta: "1.0", type: "Polar covalent" },
                  { bond: "H–Cl", delta: "1.0", type: "Polar covalent" },
                  { bond: "O–H", delta: "1.4", type: "Polar covalent" },
                  { bond: "Na–Cl", delta: "2.2", type: "Ionic" },
                ].map((row) => (
                  <tr key={row.bond}>
                    <td className="px-4 py-3 font-mono font-bold text-purple-700 dark:text-purple-300">
                      {row.bond}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.delta}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            These cut-offs are rough guidelines, not sharp boundaries. Bond
            polarity is a spectrum that runs from pure covalent to almost
            completely ionic.
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            A molecule can contain polar bonds and still be nonpolar overall. What
            matters is whether the individual bond dipoles cancel. In CO₂, the
            two C=O dipoles point in opposite directions along a straight line,
            so they cancel. In H₂O, the two O–H dipoles point toward oxygen at an
            angle, so they add to give a net molecular dipole.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[680px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Molecule
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Shape
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Do bond dipoles cancel?
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Molecular polarity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  {
                    molecule: "CO₂",
                    shape: "Linear",
                    cancel: "Yes — equal and opposite",
                    polarity: "Nonpolar",
                  },
                  {
                    molecule: "H₂O",
                    shape: "Bent",
                    cancel: "No — they add",
                    polarity: "Polar",
                  },
                  {
                    molecule: "CCl₄",
                    shape: "Tetrahedral",
                    cancel: "Yes — symmetric",
                    polarity: "Nonpolar",
                  },
                  {
                    molecule: "CHCl₃",
                    shape: "Tetrahedral",
                    cancel: "No — asymmetric",
                    polarity: "Polar",
                  },
                  {
                    molecule: "BF₃",
                    shape: "Trigonal planar",
                    cancel: "Yes — symmetric",
                    polarity: "Nonpolar",
                  },
                  {
                    molecule: "NH₃",
                    shape: "Trigonal pyramidal",
                    cancel: "No — lone pair breaks symmetry",
                    polarity: "Polar",
                  },
                ].map((row) => (
                  <tr key={row.molecule}>
                    <td className="px-4 py-3 font-mono font-bold text-purple-700 dark:text-purple-300">
                      {row.molecule}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.shape}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.cancel}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">
                      {row.polarity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            VSEPR theory: predicting molecular shape
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <strong>Valence Shell Electron Pair Repulsion (VSEPR)</strong> theory
            is based on a simple idea: electron pairs around a central atom repel
            one another and arrange themselves as far apart as possible. Both
            bonding pairs and lone pairs count as <strong>electron domains</strong>.
            The arrangement of domains gives the electron geometry; the positions
            of the atoms give the molecular geometry.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              The VSEPR procedure
            </p>
            <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-1 m-0 pl-5 list-decimal">
              <li>Draw the Lewis structure of the molecule or ion.</li>
              <li>
                Count the electron domains around the central atom: each single,
                double, or triple bond counts as one domain, and each lone pair
                counts as one domain.
              </li>
              <li>
                Find the electron-domain arrangement that maximizes separation.
              </li>
              <li>
                Treat lone pairs as invisible when naming the molecular shape;
                they still affect the bond angles.
              </li>
            </ol>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Domains
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Lone pairs
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Electron geometry
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Molecular shape
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Ideal angle
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Example
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { domains: "2", lone: "0", electron: "Linear", shape: "Linear", angle: "180°", example: "CO₂, BeCl₂" },
                  { domains: "3", lone: "0", electron: "Trigonal planar", shape: "Trigonal planar", angle: "120°", example: "BF₃, SO₃" },
                  { domains: "4", lone: "0", electron: "Tetrahedral", shape: "Tetrahedral", angle: "109.5°", example: "CH₄, CCl₄" },
                  { domains: "4", lone: "1", electron: "Tetrahedral", shape: "Trigonal pyramidal", angle: "≈107°", example: "NH₃" },
                  { domains: "4", lone: "2", electron: "Tetrahedral", shape: "Bent", angle: "≈104.5°", example: "H₂O" },
                  { domains: "5", lone: "0", electron: "Trigonal bipyramidal", shape: "Trigonal bipyramidal", angle: "90°, 120°", example: "PCl₅" },
                  { domains: "5", lone: "1", electron: "Trigonal bipyramidal", shape: "Seesaw", angle: "≈89°, 117°", example: "SF₄" },
                  { domains: "5", lone: "2", electron: "Trigonal bipyramidal", shape: "T-shaped", angle: "≈87°", example: "ClF₃" },
                  { domains: "5", lone: "3", electron: "Trigonal bipyramidal", shape: "Linear", angle: "180°", example: "XeF₂" },
                  { domains: "6", lone: "0", electron: "Octahedral", shape: "Octahedral", angle: "90°", example: "SF₆" },
                  { domains: "6", lone: "1", electron: "Octahedral", shape: "Square pyramidal", angle: "≈90°", example: "BrF₅" },
                  { domains: "6", lone: "2", electron: "Octahedral", shape: "Square planar", angle: "90°", example: "XeF₄" },
                ].map((row) => (
                  <tr key={`${row.domains}-${row.lone}-${row.example}`}>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {row.domains}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {row.lone}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.electron}
                    </td>
                    <td className="px-4 py-3 font-medium text-purple-700 dark:text-purple-300">
                      {row.shape}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.angle}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                      {row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>Why lone pairs shrink bond angles:</strong> a lone pair is
              held by only one nucleus, so its electron cloud is more spread out
              than a bonding pair. It pushes harder on the bonding pairs. This is
              why the H–N–H angle in NH₃ (≈107°) is smaller than the H–C–H angle
              in CH₄ (109.5°), and why the H–O–H angle in H₂O is smaller still
              (≈104.5°).
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h5 className="font-bold text-slate-900 dark:text-white mb-3">
              Worked example: predict the shape of NH₃
            </h5>
            <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-1 m-0 pl-5 list-decimal">
              <li>Lewis structure: N is central, with three N–H bonds and one lone pair.</li>
              <li>Electron domains = 3 bonds + 1 lone pair = 4.</li>
              <li>Four domains adopt a tetrahedral electron geometry.</li>
              <li>
                The lone pair is invisible when naming the shape, leaving three
                bonds arranged in a pyramid: trigonal pyramidal.
              </li>
              <li>
                The lone pair compresses the angle from 109.5° to about 107°.
              </li>
            </ol>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            VSEPR also explains polarity. A molecule whose bond dipoles are
            arranged symmetrically is nonpolar even when each bond is polar.
            Asymmetric molecules with polar bonds have a net dipole. This is why
            CO₂ is nonpolar but H₂O is polar, and why CCl₄ is nonpolar but CHCl₃
            is polar.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.3.2 Intermolecular Forces in Covalent Compounds
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <strong>Intermolecular forces (IMFs)</strong> are the attractions
            between separate molecules. They are much weaker than covalent bonds,
            but they determine whether a substance is a gas, a liquid, or a solid
            at room temperature, as well as its boiling point, viscosity, and
            surface tension.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-purple-500">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Intramolecular forces
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                The covalent bonds inside a molecule. Strong: typically
                150–1000 kJ/mol. Breaking them changes the molecule itself.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-teal-500">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Intermolecular forces
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                The attractions between molecules. Weak: typically
                0.05–40 kJ/mol. Breaking them changes the physical state, not the
                molecule.
              </p>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            1. London dispersion forces
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Electrons are constantly moving, so at any instant a molecule may have
            a temporary uneven distribution of charge. This{" "}
            <strong>instantaneous dipole</strong> induces a matching dipole in a
            neighbouring molecule, and the two attract. London dispersion forces
            exist between <em>all</em> atoms and molecules, polar or not.
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Dispersion forces grow stronger as the number of electrons increases
            and as the molecular surface area increases. That is why the halogens
            change state down the group: fluorine and chlorine are gases, bromine
            is a liquid, and iodine is a solid. Larger, more polarizable electron
            clouds produce stronger temporary dipoles.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Halogen trends at room temperature
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {[
                { formula: "F₂", state: "Gas", color: "text-green-600" },
                { formula: "Cl₂", state: "Gas", color: "text-yellow-600" },
                { formula: "Br₂", state: "Liquid", color: "text-amber-700" },
                { formula: "I₂", state: "Solid", color: "text-purple-600" },
              ].map((item) => (
                <div
                  key={item.formula}
                  className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <p className={`text-lg font-bold m-0 ${item.color}`}>
                    {item.formula}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-1">
                    {item.state}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-0">
              More electrons → stronger dispersion forces → higher melting and
              boiling points.
            </p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            2. Dipole–dipole forces
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Polar molecules have permanent dipoles. The δ+ end of one molecule
            attracts the δ− end of another, and the molecules tend to align.
            Dipole–dipole forces are stronger than dispersion forces of comparable
            size, but still much weaker than covalent bonds. Hydrogen chloride,
            acetone, and sulfur dioxide are examples.
          </p>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            3. Hydrogen bonding
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            A <strong>hydrogen bond</strong> is a particularly strong
            dipole–dipole attraction between a hydrogen atom bonded to nitrogen,
            oxygen, or fluorine and a lone pair on a nearby N, O, or F atom. The
            large electronegativity difference leaves the hydrogen with a large
            δ+ charge, and its small size lets the interacting atoms approach
            closely.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <div className="grid sm:grid-cols-3 gap-3 text-center">
              {[
                { molecule: "H₂O", detail: "Two O–H donors and two lone pairs per molecule" },
                { molecule: "NH₃", detail: "Three N–H donors and one lone pair per molecule" },
                { molecule: "HF", detail: "One H–F donor and three lone pairs per molecule" },
              ].map((item) => (
                <div
                  key={item.molecule}
                  className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <p className="text-lg font-bold font-mono text-purple-700 dark:text-purple-300 m-0">
                    {item.molecule}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-0">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 mb-0">
              Hydrogen bonds are about 10–40 kJ/mol — strong enough to matter at
              room temperature, but weak enough to break and re-form constantly.
            </p>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Hydrogen bonding explains some of water's most unusual properties.
            Water has a much higher boiling point than similar-sized molecules
            because each molecule can form up to four hydrogen bonds. Ice is less
            dense than liquid water because the hydrogen-bond network holds the
            molecules in an open hexagonal arrangement. The same interactions
            stabilize the double helix of DNA and the folded shapes of proteins.
          </p>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            4. Ion–dipole forces
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            When an ionic compound dissolves, the δ+ or δ− end of a polar solvent
            molecule surrounds each ion. The attraction between an ion and a
            polar molecule is called an <strong>ion–dipole force</strong>. In
            water, these forces hydrate the ions and help overcome the lattice
            energy, which is why many ionic solids dissolve.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[680px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Force
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Origin
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Typical strength
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  {
                    force: "London dispersion",
                    origin: "Temporary dipoles",
                    strength: "0.05–40 kJ/mol",
                    examples: "CH₄, I₂, noble gases",
                  },
                  {
                    force: "Dipole–dipole",
                    origin: "Permanent dipoles",
                    strength: "5–25 kJ/mol",
                    examples: "HCl, acetone, SO₂",
                  },
                  {
                    force: "Hydrogen bond",
                    origin: "H on N, O, or F",
                    strength: "10–40 kJ/mol",
                    examples: "H₂O, NH₃, HF",
                  },
                  {
                    force: "Ion–dipole",
                    origin: "Ion + polar molecule",
                    strength: "40–600 kJ/mol",
                    examples: "Na⁺(aq), Cl⁻(aq)",
                  },
                ].map((row) => (
                  <tr key={row.force}>
                    <td className="px-4 py-3 font-medium text-purple-700 dark:text-purple-300">
                      {row.force}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.origin}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.strength}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.examples}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Boiling points reflect the strength of intermolecular forces
            </p>
            <div className="space-y-2">
              {[
                { molecule: "CH₄", bp: "−161.5 °C", force: "Dispersion only", width: "w-1/4" },
                { molecule: "HCl", bp: "−85.1 °C", force: "Dipole–dipole + dispersion", width: "w-2/5" },
                { molecule: "NH₃", bp: "−33.3 °C", force: "Hydrogen bonding", width: "w-1/2" },
                { molecule: "HF", bp: "19.5 °C", force: "Strong hydrogen bonding", width: "w-3/5" },
                { molecule: "H₂O", bp: "100 °C", force: "Extensive hydrogen bonding", width: "w-full" },
              ].map((row) => (
                <div key={row.molecule} className="flex items-center gap-3">
                  <span className="w-14 shrink-0 font-mono text-sm font-bold text-purple-700 dark:text-purple-300">
                    {row.molecule}
                  </span>
                  <div className="flex-1">
                    <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className={`h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 ${row.width}`}
                      />
                    </div>
                  </div>
                  <span className="w-24 shrink-0 text-right text-xs text-slate-600 dark:text-slate-400">
                    {row.bp}
                  </span>
                  <span className="hidden sm:block w-44 shrink-0 text-xs text-slate-500 dark:text-slate-400">
                    {row.force}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-0">
              The bar lengths are qualitative. Within a series, stronger
              intermolecular forces require more energy to overcome and therefore
              raise the boiling point.
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
                  Real-World Example: Hydrogen Bonds Make Water Liquid
                </h4>
                <p className="m-0 text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                  Water is a tiny molecule, yet it boils at 100 °C while methane
                  (similar size) boils at −161.5 °C. The difference is hydrogen
                  bonding. Water's strong intermolecular network also gives it a
                  high surface tension — enough for a water strider to walk on a
                  pond — and a high specific heat, which helps lakes and oceans
                  moderate the climate.
                </p>
              </div>
            </div>
          </div>

          {/* Key Concept Box */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-purple-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4 text-xl">
              <FlaskConical className="text-purple-500" />
              Key Idea: Shape and Polarity Control the Physical World
            </h4>
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <p className="m-0">
                <strong>Lewis structures</strong> show which atoms are bonded and
                where the lone pairs are.
              </p>
              <p className="m-0">
                <strong>VSEPR</strong> turns Lewis structures into three-dimensional
                shapes by maximizing electron-domain separation.
              </p>
              <p className="m-0">
                <strong>Molecular polarity</strong> depends on both bond polarity
                and molecular symmetry.
              </p>
              <p className="m-0">
                <strong>Intermolecular forces</strong> — dispersion, dipole–dipole,
                hydrogen bonding, and ion–dipole — decide boiling points,
                solubility, and the behaviour of biological molecules.
              </p>
            </div>
          </div>

          <Practice number="2.3">
            <ExerciseQuestion
              question="According to VSEPR theory, what is the molecular geometry of NH₃?"
              options={[
                "Linear",
                "Trigonal planar",
                "Trigonal pyramidal",
                "Tetrahedral",
              ]}
              correctAnswer={2}
              explanation="Nitrogen in NH₃ has three bonded pairs and one lone pair, giving four electron domains. The electron-domain geometry is tetrahedral, but the lone pair is not counted when naming the molecular shape. The three hydrogen atoms therefore occupy three corners of a tetrahedron, producing a trigonal pyramidal shape with a bond angle of about 107°."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 2.4: Metallic Bonding */}
        <section id="subtopic-2.4" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-amber-600 pl-4">
            2.4. Metallic Bonding
          </h2>

          <Lead>
            A metallic bond is the attraction between a lattice of positive metal
            ions and a sea of delocalized valence electrons. This non-directional
            bonding explains why metals conduct electricity, bend without
            breaking, and reflect light.
          </Lead>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Metals occupy the left and centre of the periodic table. They have
            relatively few valence electrons, low ionization energies, and
            partially filled valence orbitals. Instead of transferring electrons
            to a specific partner or sharing them with one atom, metals release
            some of their valence electrons into a common pool that extends over
            the entire crystal.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.4.1 Formation of Metallic Bonding
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            When metal atoms pack together, their valence orbitals overlap. The
            electrons in these orbitals become delocalized — they are no longer
            associated with any single atom. What remains is a regular lattice of
            cations embedded in this mobile electron cloud. The electrostatic
            attraction between the cations and the delocalized electrons holds
            the structure together.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Group 1 metals
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                One valence electron per atom is donated to the sea. Example:
                sodium, Na → Na⁺ + e⁻.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Group 2 metals
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Two valence electrons per atom are donated. Example: magnesium,
                Mg → Mg²⁺ + 2e⁻.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Transition metals
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Both s and some d electrons can join the sea. More delocalized
                electrons usually mean stronger bonding.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>Non-directional bonding:</strong> a metal cation does not
              have a single “bond partner.” It is attracted to the electron density
              around it in every direction. This is the key difference from a
              covalent bond, which points between two specific atoms.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.4.2 Electron-Sea Model
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The simplest picture of metallic bonding is the{" "}
            <strong>electron-sea model</strong>: positive metal ions are fixed in
            a regular lattice, while their valence electrons move freely through
            the spaces between them, like water in a sponge.
          </p>

          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/30 border border-blue-100 dark:border-blue-900 p-6 mb-6">
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-sm mx-auto">
              {Array.from({ length: 16 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-200 dark:bg-blue-900/60 text-sm font-black text-blue-800 dark:text-blue-200 shadow-sm"
                >
                  +
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0">
              {[
                { top: "12%", left: "8%" },
                { top: "24%", left: "44%" },
                { top: "8%", left: "70%" },
                { top: "38%", left: "20%" },
                { top: "50%", left: "55%" },
                { top: "36%", left: "86%" },
                { top: "64%", left: "10%" },
                { top: "72%", left: "38%" },
                { top: "60%", left: "72%" },
                { top: "84%", left: "88%" },
                { top: "86%", left: "54%" },
                { top: "18%", left: "92%" },
              ].map((position, index) => (
                <span
                  key={index}
                  className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-amber-300 text-[9px] font-bold text-amber-900 shadow"
                  style={position}
                >
                  e⁻
                </span>
              ))}
            </div>
            <p className="relative mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
              Positive metal ions (blue) are held in place by a mobile “sea” of
              delocalized electrons (yellow).
            </p>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The electron-sea model explains the most familiar properties of
            metals in a single picture.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Property
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    How the electron sea explains it
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  {
                    property: "Electrical conductivity",
                    explanation: "Delocalized electrons move freely when a voltage is applied.",
                  },
                  {
                    property: "Thermal conductivity",
                    explanation: "Mobile electrons carry kinetic energy from hot regions to cooler ones.",
                  },
                  {
                    property: "Malleability and ductility",
                    explanation: "Layers of cations can slide without breaking the electron sea.",
                  },
                  {
                    property: "Metallic luster",
                    explanation: "Delocalized electrons absorb and re-emit light of many wavelengths.",
                  },
                  {
                    property: "Variable strength",
                    explanation: "More delocalized electrons and smaller cations produce stronger attraction.",
                  },
                ].map((row) => (
                  <tr key={row.property}>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      {row.property}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.explanation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The electron-sea model is powerful but incomplete. It does not explain
            why different metals have such different melting points and hardness,
            why some metals are coloured, or why some are magnetic. A more
            complete description treats the metal's orbitals as overlapping to
            form continuous <strong>energy bands</strong>; this band theory also
            explains semiconductors.
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.4.3 Properties of Metals and Bonding
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The strength of a metallic bond depends on three main factors: the
            charge on the metal cation, the number of delocalized electrons per
            atom, and the size of the cation. Higher charges and smaller cations
            bring the ions closer together and increase the electrostatic
            attraction.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Electrical conductivity
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Mobile electrons carry charge through the metal. Silver is the best
                conductor, followed by copper and gold; copper is preferred in
                wiring because it is much cheaper than silver.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Thermal conductivity
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                The same mobile electrons transport heat. This is why a metal
                spoon heats up quickly when left in hot soup.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Malleability and ductility
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Malleable means a metal can be hammered into sheets; ductile means
                it can be drawn into wires. The electron sea adjusts as cation
                layers slide, so the metal does not shatter.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Luster
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Free electrons absorb light and re-emit it, giving polished metals
                their characteristic shine. Copper and gold also absorb some
                wavelengths, which gives them their colour.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Metal
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Melting point (°C)
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Relative bonding strength
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { metal: "Mercury (Hg)", mp: "−38.8", strength: "Very weak" },
                  { metal: "Sodium (Na)", mp: "97.8", strength: "Weak (1 e⁻ per atom)" },
                  { metal: "Lead (Pb)", mp: "327.5", strength: "Moderate" },
                  { metal: "Aluminium (Al)", mp: "660.3", strength: "Strong (3 e⁻ per atom)" },
                  { metal: "Copper (Cu)", mp: "1085", strength: "Strong" },
                  { metal: "Iron (Fe)", mp: "1538", strength: "Very strong" },
                  { metal: "Tungsten (W)", mp: "3422", strength: "Extremely strong" },
                ].map((row) => (
                  <tr key={row.metal}>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      {row.metal}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.mp}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.strength}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Alloys: engineering better metals
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            An <strong>alloy</strong> is a mixture of a metal with one or more
            other elements. Atoms of different sizes disrupt the regular layers
            of the pure metal, making it harder for the layers to slide. This is
            why alloys are often harder and stronger than their parent metals.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Substitutional alloys
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Atoms of similar size replace some host atoms in the lattice.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Examples: brass (Cu + Zn), bronze (Cu + Sn), sterling silver
                (Ag + Cu).
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Interstitial alloys
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Small atoms fit into the gaps between larger host atoms.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Example: steel (Fe + C), where carbon atoms sit in the spaces
                between iron atoms.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Alloy
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Composition
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Main advantage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { alloy: "Brass", composition: "Cu + Zn", type: "Substitutional", advantage: "Harder, corrosion resistant" },
                  { alloy: "Bronze", composition: "Cu + Sn", type: "Substitutional", advantage: "Hard, low friction" },
                  { alloy: "Steel", composition: "Fe + C", type: "Interstitial", advantage: "Much stronger than pure iron" },
                  { alloy: "Stainless steel", composition: "Fe + Cr + Ni + C", type: "Mixed", advantage: "Corrosion resistant" },
                  { alloy: "Solder", composition: "Sn + Pb (or Sn + Ag)", type: "Mixed", advantage: "Low melting point" },
                ].map((row) => (
                  <tr key={row.alloy}>
                    <td className="px-4 py-3 font-medium text-amber-700 dark:text-amber-400">
                      {row.alloy}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                      {row.composition}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.advantage}
                    </td>
                  </tr>
                ))}
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
                  Real-World Example: Copper Wiring and Aluminium Aircraft
                </h4>
                <p className="m-0 text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                  Copper is used for household wiring because its delocalized
                  electrons make it an excellent conductor and its ductility
                  allows it to be drawn into thin wires. Pure aluminium is light
                  but soft; alloying it with copper, magnesium, and zinc produces
                  a material strong enough for aircraft frames while keeping the
                  low density and corrosion resistance that aerospace engineers
                  need.
                </p>
              </div>
            </div>
          </div>

          {/* Key Concept Box */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-amber-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4 text-xl">
              <Zap className="text-amber-500" />
              Key Idea: A Sea of Electrons Explains Metallic Behaviour
            </h4>
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <p className="m-0">
                <strong>Mobile electrons</strong> → electrical and thermal
                conductivity.
              </p>
              <p className="m-0">
                <strong>Non-directional attraction</strong> → layers can slide, so
                metals are malleable and ductile.
              </p>
              <p className="m-0">
                <strong>More delocalized electrons and smaller cations</strong> →
                stronger bonding, higher melting point, greater hardness.
              </p>
              <p className="m-0">
                <strong>Alloying</strong> → disrupted layers make a metal harder
                and stronger.
              </p>
            </div>
          </div>

          <Practice number="2.4">
            <ExerciseQuestion
              question="Why are metals malleable, while ionic crystals are brittle?"
              options={[
                "Metal atoms are larger than ions, so they cannot break.",
                "Metals have delocalized electrons, so cation layers can slide without like-charge repulsion.",
                "Ionic crystals contain no chemical bonds.",
                "Metals melt at lower temperatures than ionic compounds.",
              ]}
              correctAnswer={1}
              explanation="In a metal, the delocalized electron sea continues to attract the cations even when layers slide past one another, so the metal deforms instead of breaking. In an ionic crystal, shifting a layer brings ions of the same charge next to each other; the strong repulsion causes the crystal to crack. Melting point is not the reason for brittleness."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 2.5: Chemical Bonding Theories */}
        <section id="subtopic-2.5" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-cyan-600 pl-4">
            2.5. Chemical Bonding Theories
          </h2>

          <Lead>
            Lewis structures and VSEPR tell us what bonds exist and how molecules
            are shaped. They do not explain why the bonds form, how the electrons
            are distributed, or why O₂ is magnetic. Quantum-mechanical bonding
            theories fill that gap.
          </Lead>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Two complementary theories are used to describe covalent bonding.
            <strong> Valence Bond (VB) theory</strong> treats a bond as the
            overlap of atomic orbitals localized between two atoms.{" "}
            <strong>Molecular Orbital (MO) theory</strong> treats electrons as
            occupying orbitals that extend over the entire molecule. VB theory is
            especially good at explaining shapes and local bonding; MO theory is
            essential for magnetism, spectroscopy, and delocalized electrons.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border-t-4 border-blue-600">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">
                Valence Bond theory
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                A bond is a localized overlap of half-filled atomic orbitals.
                Hybridization explains the observed molecular geometries.
              </p>
            </div>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-lg border-t-4 border-cyan-600">
              <h4 className="text-lg font-bold text-cyan-800 dark:text-cyan-300 mb-2">
                Molecular Orbital theory
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                Atomic orbitals combine into molecular orbitals that belong to
                the whole molecule. Bond order and magnetism follow from the
                electron filling.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.5.1 Valence Bond (VB) Theory
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            In VB theory, a covalent bond forms when a half-filled valence orbital
            on one atom overlaps with a half-filled valence orbital on another
            atom. The two electrons pair up in the overlap region, where they are
            attracted by both nuclei. The greater the overlap, the stronger the
            bond — up to the point where nuclear repulsion becomes important.
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The classic example is H₂. Each hydrogen atom has a single electron in
            a 1s orbital. When the two 1s orbitals overlap head-on, the electrons
            pair and form a <strong>sigma (σ) bond</strong>. The electron density
            is concentrated along the line joining the two nuclei.
          </p>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Sigma and pi bonds
          </h4>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-blue-500">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Sigma (σ) bond
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Formed by <strong>head-on</strong> overlap of orbitals (s–s,
                s–p, or p–p). The electron density is symmetric about the
                internuclear axis.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                Found in every single bond. Rotation about a σ bond is possible
                without breaking it.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg border-l-4 border-purple-500">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Pi (π) bond
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Formed by <strong>side-on</strong> overlap of parallel p orbitals.
                The electron density lies above and below the internuclear axis,
                with a node along the axis.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                Found in double and triple bonds. Rotation is restricted because
                it would break the π overlap.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[540px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Bond type
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Composition
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Example
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Rotation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { type: "Single", composition: "1 σ", example: "H–H, C–C", rotation: "Free" },
                  { type: "Double", composition: "1 σ + 1 π", example: "C=C, C=O", rotation: "Restricted" },
                  { type: "Triple", composition: "1 σ + 2 π", example: "C≡C, N≡N", rotation: "Restricted" },
                ].map((row) => (
                  <tr key={row.type}>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                      {row.composition}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                      {row.example}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.rotation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Hybridization: matching orbitals to geometry
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Carbon's ground-state configuration is 1s² 2s² 2p². It has only two
            unpaired electrons, so simple VB theory would predict two bonds — yet
            methane, CH₄, has four identical C–H bonds at 109.5°. The solution is{" "}
            <strong>hybridization</strong>: the atomic orbitals mix to form new,
            equivalent hybrid orbitals.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <h5 className="font-bold text-slate-900 dark:text-white mb-3">
              Worked example: sp³ hybridization in methane
            </h5>
            <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-1 m-0 pl-5 list-decimal">
              <li>
                Promote one 2s electron to the empty 2p orbital: 2s¹ 2p³. Now
                carbon has four unpaired electrons.
              </li>
              <li>
                Mix the one 2s orbital with the three 2p orbitals to form four
                equivalent sp³ hybrid orbitals.
              </li>
              <li>
                Each sp³ orbital points toward one corner of a tetrahedron, giving
                bond angles of 109.5°.
              </li>
              <li>
                Each hybrid orbital overlaps with a hydrogen 1s orbital, forming
                four equivalent σ bonds.
              </li>
            </ol>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[700px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Hybridization
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Orbitals mixed
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Hybrid orbitals
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Geometry
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Angle
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { hybrid: "sp", orbitals: "1s + 1p", number: "2", geometry: "Linear", angle: "180°", examples: "BeCl₂, C₂H₂" },
                  { hybrid: "sp²", orbitals: "1s + 2p", number: "3", geometry: "Trigonal planar", angle: "120°", examples: "BF₃, C₂H₄" },
                  { hybrid: "sp³", orbitals: "1s + 3p", number: "4", geometry: "Tetrahedral", angle: "109.5°", examples: "CH₄, NH₃, H₂O" },
                  { hybrid: "sp³d", orbitals: "1s + 3p + 1d", number: "5", geometry: "Trigonal bipyramidal", angle: "90°, 120°", examples: "PCl₅" },
                  { hybrid: "sp³d²", orbitals: "1s + 3p + 2d", number: "6", geometry: "Octahedral", angle: "90°", examples: "SF₆" },
                ].map((row) => (
                  <tr key={row.hybrid}>
                    <td className="px-4 py-3 font-mono font-bold text-cyan-700 dark:text-cyan-300">
                      {row.hybrid}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.orbitals}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.number}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.geometry}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.angle}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                      {row.examples}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Multiple bonds in ethene and ethyne
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Hybridization also explains the structures of molecules with double
            and triple bonds. In ethene (C₂H₄), each carbon is sp² hybridized. The
            three sp² orbitals form a σ framework: two C–H bonds and one C–C bond.
            The remaining unhybridized 2p orbital on each carbon overlaps side-on
            to form a π bond. The molecule is planar, with 120° angles, and
            rotation about the C=C bond is restricted.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Ethene, C₂H₄
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Each carbon: sp². One σ C–C bond plus one π bond. Planar, 120°.
              </p>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 m-0">
                H₂C=CH₂
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Ethyne, C₂H₂
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Each carbon: sp. One σ C–C bond plus two perpendicular π bonds.
                Linear, 180°.
              </p>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 m-0">
                H–C≡C–H
              </p>
            </div>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Benzene, C₆H₆, is a special case. Each carbon is sp² hybridized, giving
            a planar hexagonal σ framework. Each carbon also has one unhybridized
            p orbital, and these six p orbitals overlap to form a delocalized π
            system above and below the ring. The electrons are shared equally
            around the ring, so all six C–C bonds have the same length — a fact
            that simple alternating double/single bonds cannot explain.
          </p>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Limitations of VB theory
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg mb-6">
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 m-0 pl-5 list-disc">
              <li>
                It predicts that O₂ has all electrons paired, but O₂ is
                paramagnetic — it has two unpaired electrons.
              </li>
              <li>
                It handles delocalized electrons and resonance poorly; benzene
                must be drawn as two alternating structures.
              </li>
              <li>
                It does not naturally explain electronic spectra or excited
                states.
              </li>
              <li>
                Hybridization is a useful model, not a physical process that an
                atom actually performs.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2.5.2 Molecular Orbital Theory (MOT)
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Molecular orbital theory takes a different view. When atoms bond, their
            atomic orbitals combine to form <strong>molecular orbitals</strong>{" "}
            that extend over the whole molecule. The number of molecular orbitals
            equals the number of atomic orbitals combined. Electrons occupy these
            molecular orbitals according to the same rules used for atoms: the
            Aufbau principle, the Pauli exclusion principle, and Hund's rule.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border-l-4 border-blue-600">
              <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
                Bonding molecular orbital
              </h5>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                Constructive overlap of atomic orbitals. It has lower energy than
                the original atomic orbitals, and its electron density is
                concentrated between the nuclei. Filling it strengthens the bond.
              </p>
            </div>
            <div className="bg-rose-50 dark:bg-rose-900/20 p-5 rounded-lg border-l-4 border-rose-600">
              <h5 className="font-bold text-rose-900 dark:text-rose-300 mb-2">
                Antibonding molecular orbital
              </h5>
              <p className="text-sm text-slate-700 dark:text-slate-300 m-0">
                Destructive overlap of atomic orbitals. It has higher energy and
                a node between the nuclei. It is labelled with an asterisk (σ* or
                π*). Filling it weakens the bond.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <Formula>Bond order = (N<sub>bonding</sub> − N<sub>antibonding</sub>) / 2</Formula>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2 mb-0">
              A higher bond order means a stronger, shorter bond. A bond order of
              zero means the molecule is not stable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-3">
                H₂: bond order 1
              </h5>
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <div className="w-40 border-t-2 border-dashed border-slate-400 pt-1 text-center text-[10px] text-slate-500 dark:text-slate-400">
                    σ*1s (empty)
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-40 border-t-2 border-blue-600 pt-1 text-center text-[11px] font-bold text-blue-700 dark:text-blue-300">
                    σ1s ↑↓
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 mb-0">
                N<sub>bonding</sub> = 2, N<sub>antibonding</sub> = 0 → bond order
                = 1. Diamagnetic.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-3">
                He₂: bond order 0
              </h5>
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <div className="w-40 border-t-2 border-rose-500 pt-1 text-center text-[11px] font-bold text-rose-700 dark:text-rose-300">
                    σ*1s ↑↓
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-40 border-t-2 border-blue-600 pt-1 text-center text-[11px] font-bold text-blue-700 dark:text-blue-300">
                    σ1s ↑↓
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 mb-0">
                N<sub>bonding</sub> = 2, N<sub>antibonding</sub> = 2 → bond order
                = 0. He₂ does not exist under normal conditions.
              </p>
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Molecular orbitals in second-period diatomic molecules
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            For the second-period elements, the valence 2s and 2p orbitals combine
            to form a set of σ and π molecular orbitals. The energy order is not
            the same for every molecule because the 2s and 2p orbitals can mix.
            The two common orders are shown below.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-bold text-slate-900 dark:text-white mb-1">
                  Li₂ to N₂
                </p>
                <p className="font-mono text-xs text-cyan-700 dark:text-cyan-300 m-0">
                  σ2s &lt; σ*2s &lt; π2p<sub>x</sub> = π2p<sub>y</sub> &lt;
                  σ2p<sub>z</sub> &lt; π*2p<sub>x</sub> = π*2p<sub>y</sub> &lt;
                  σ*2p<sub>z</sub>
                </p>
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white mb-1">
                  O₂ to Ne₂
                </p>
                <p className="font-mono text-xs text-cyan-700 dark:text-cyan-300 m-0">
                  σ2s &lt; σ*2s &lt; σ2p<sub>z</sub> &lt; π2p<sub>x</sub> = π2p
                  <sub>y</sub> &lt; π*2p<sub>x</sub> = π*2p<sub>y</sub> &lt;
                  σ*2p<sub>z</sub>
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 mb-0">
              In the first group, the σ2p orbital is raised above the π2p
              orbitals by s–p mixing. In O₂ and F₂, the σ2p orbital lies below the
              π2p orbitals.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Molecule
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Valence e⁻
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    MO configuration
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Bond order
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Magnetism
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { molecule: "Li₂", electrons: "2", config: "σ2s²", order: "1", magnetism: "Diamagnetic" },
                  { molecule: "Be₂", electrons: "4", config: "σ2s² σ*2s²", order: "0", magnetism: "Not stable" },
                  { molecule: "B₂", electrons: "6", config: "σ2s² σ*2s² π2p²", order: "1", magnetism: "Paramagnetic (2 unpaired)" },
                  { molecule: "C₂", electrons: "8", config: "σ2s² σ*2s² π2p⁴", order: "2", magnetism: "Diamagnetic" },
                  { molecule: "N₂", electrons: "10", config: "σ2s² σ*2s² π2p⁴ σ2p²", order: "3", magnetism: "Diamagnetic" },
                  { molecule: "O₂", electrons: "12", config: "σ2s² σ*2s² σ2p² π2p⁴ π*2p²", order: "2", magnetism: "Paramagnetic (2 unpaired)" },
                  { molecule: "F₂", electrons: "14", config: "σ2s² σ*2s² σ2p² π2p⁴ π*2p⁴", order: "1", magnetism: "Diamagnetic" },
                  { molecule: "Ne₂", electrons: "16", config: "σ2s² σ*2s² σ2p² π2p⁴ π*2p⁴ σ*2p²", order: "0", magnetism: "Not stable" },
                ].map((row) => (
                  <tr key={row.molecule}>
                    <td className="px-4 py-3 font-mono font-bold text-cyan-700 dark:text-cyan-300">
                      {row.molecule}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.electrons}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      {row.config}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-300">
                      {row.order}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.magnetism}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Why O₂ is paramagnetic
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            O₂ has 12 valence electrons. Following the MO diagram for O₂, the last
            two electrons enter the two degenerate π*2p orbitals singly, with
            parallel spins, according to Hund's rule. These two unpaired electrons
            make the molecule <strong>paramagnetic</strong>: it is attracted into a
            magnetic field.
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Valence bond theory cannot explain this because it pairs all the
            electrons in localized bonds. MO theory predicts the unpaired π*
            electrons naturally. The effect is dramatic enough to see: liquid
            oxygen is pale blue and clings to the poles of a strong magnet.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>MO theory explains other ions too.</strong> NO has 11 valence
              electrons, giving one unpaired electron in π*2p and a bond order of
              2.5. The superoxide ion O₂⁻ has 13 valence electrons (three in π*2p)
              and a bond order of 1.5. The peroxide ion O₂²⁻ has 14 valence
              electrons (four in π*2p), a bond order of 1, and no unpaired
              electrons.
            </p>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Bond order, bond length, and bond strength
          </h4>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Bond order is a direct measure of how many electron pairs hold two
            atoms together. As bond order increases, bond length decreases and
            bond energy increases.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Species
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Bond order
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Bond length (pm)
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Bond energy (kJ/mol)
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Magnetism
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { species: "N₂", order: "3", length: "110", energy: "945", magnetism: "Diamagnetic" },
                  { species: "O₂", order: "2", length: "121", energy: "498", magnetism: "Paramagnetic" },
                  { species: "F₂", order: "1", length: "142", energy: "159", magnetism: "Diamagnetic" },
                  { species: "NO", order: "2.5", length: "115", energy: "607", magnetism: "Paramagnetic" },
                  { species: "O₂⁺", order: "2.5", length: "112", energy: "625", magnetism: "Paramagnetic" },
                  { species: "O₂⁻", order: "1.5", length: "128", energy: "393", magnetism: "Paramagnetic" },
                  { species: "O₂²⁻", order: "1", length: "149", energy: "204", magnetism: "Diamagnetic" },
                ].map((row) => (
                  <tr key={row.species}>
                    <td className="px-4 py-3 font-mono font-bold text-cyan-700 dark:text-cyan-300">
                      {row.species}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.order}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.length}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.energy}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.magnetism}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-3">
            Comparing VB and MO theory
          </h4>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[680px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Question
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Valence Bond theory
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Molecular Orbital theory
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { question: "Where are the electrons?", answerVb: "In localized bonds between two atoms", answerMo: "In orbitals spread over the whole molecule" },
                  { question: "How is bonding described?", answerVb: "Overlap of half-filled atomic orbitals", answerMo: "Filling of bonding and antibonding MOs" },
                  { question: "What explains shape?", answerVb: "Hybridization and VSEPR", answerMo: "MO shapes, combined with geometry" },
                  { question: "O₂ magnetism", answerVb: "Predicts diamagnetic (incorrect)", answerMo: "Predicts two unpaired π* electrons (correct)" },
                  { question: "Delocalized systems", answerVb: "Needs resonance structures", answerMo: "Natural consequence of MOs" },
                  { question: "Best used for", answerVb: "Local bonds, shapes, organic molecules", answerMo: "Magnetism, spectra, delocalized and excited states" },
                ].map((row) => (
                  <tr key={row.question}>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      {row.question}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.answerVb}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.answerMo}
                    </td>
                  </tr>
                ))}
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
                  Real-World Example: Liquid Oxygen Sticks to a Magnet
                </h4>
                <p className="m-0 text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                  If you pour liquid oxygen between the poles of a strong magnet,
                  it stays suspended there instead of falling straight through.
                  The two unpaired electrons in O₂'s π* molecular orbitals give
                  the molecule a net magnetic moment, so it is drawn into the
                  field. This simple demonstration is one of the clearest
                  confirmations of molecular orbital theory — and a striking
                  failure of the simpler Lewis/VB picture.
                </p>
              </div>
            </div>
          </div>

          {/* Key Concept Box */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-cyan-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4 text-xl">
              <Target className="text-cyan-500" />
              Key Idea: Two Models, One Reality
            </h4>
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <p className="m-0">
                <strong>VB theory</strong> describes bonds as localized orbital
                overlaps and uses hybridization to explain molecular geometry.
              </p>
              <p className="m-0">
                <strong>MO theory</strong> distributes electrons over the whole
                molecule and uses bond order to predict stability, bond length,
                and magnetism.
              </p>
              <p className="m-0">
                Use VB when you need a quick, intuitive picture of local bonding
                and shape.
              </p>
              <p className="m-0">
                Use MO when magnetism, delocalization, or electronic structure
                matters.
              </p>
            </div>
          </div>

          <Practice number="2.5">
            <ExerciseQuestion
              question="The MO configuration of O₂ ends with two electrons in the π*2p orbitals. What are the bond order and magnetic behaviour of O₂?"
              options={[
                "Bond order 1; diamagnetic",
                "Bond order 2; paramagnetic",
                "Bond order 2; diamagnetic",
                "Bond order 3; paramagnetic",
              ]}
              correctAnswer={1}
              explanation="O₂ has eight bonding electrons and four antibonding electrons (two in σ*2s and two in π*2p). Bond order = (8 − 4) / 2 = 2. The two electrons in the degenerate π*2p orbitals occupy them singly with parallel spins, so O₂ has two unpaired electrons and is paramagnetic. This is the observation that valence bond theory cannot explain."
            />
          </Practice>
        </section>

        {/* SUBTOPIC 2.6: Types of Crystals */}
        <section id="subtopic-2.6" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-teal-600 pl-4">
            2.6. Types of Crystals
          </h2>

          <Lead>
            A crystal is a solid in which particles are arranged in a repeating
            three-dimensional pattern. The type of particle and the force holding
            the lattice together determine the crystal's melting point, hardness,
            conductivity, and solubility.
          </Lead>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            The repeating arrangement is called a <strong>crystal lattice</strong>.
            The smallest repeating unit of the lattice is the{" "}
            <strong>unit cell</strong>, and the number of nearest neighbours
            around a particle is its <strong>coordination number</strong>. Solids
            without long-range order — such as glass, rubber, and many plastics —
            are <strong>amorphous</strong> rather than crystalline.
          </p>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Crystals are classified by the particles at the lattice points and by
            the forces between them. There are four main types: ionic, covalent
            network, metallic, and molecular.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border-t-4 border-green-600">
              <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                1. Ionic crystals
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                Lattice points are occupied by cations and anions. The forces are
                strong electrostatic attractions.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Examples: NaCl, MgO, CaF₂, KBr.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-lg border-t-4 border-purple-600">
              <h4 className="text-lg font-bold text-purple-800 dark:text-purple-300 mb-2">
                2. Covalent network crystals
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                Atoms are joined by a continuous network of covalent bonds. The
                entire crystal is effectively one giant molecule.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Examples: diamond, graphite, quartz (SiO₂), silicon carbide.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-lg border-t-4 border-amber-600">
              <h4 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">
                3. Metallic crystals
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                Cations sit at lattice points, surrounded by a sea of delocalized
                valence electrons.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Examples: Fe, Cu, Al, Na, Mg.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border-t-4 border-blue-600">
              <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">
                4. Molecular crystals
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                Lattice points are occupied by whole molecules held together by
                weak intermolecular forces.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
                Examples: ice, dry ice (CO₂), iodine, sucrose.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[920px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Particles
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Forces
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Examples
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Melting point
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Conductivity
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Solubility
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  {
                    type: "Ionic",
                    particles: "Cations and anions",
                    forces: "Electrostatic attraction",
                    examples: "NaCl, MgO",
                    mp: "High",
                    conductivity: "Molten or aqueous only",
                    solubility: "Polar solvents",
                  },
                  {
                    type: "Covalent network",
                    particles: "Atoms",
                    forces: "Covalent bonds throughout",
                    examples: "Diamond, quartz",
                    mp: "Very high",
                    conductivity: "Usually none (graphite is an exception)",
                    solubility: "Insoluble",
                  },
                  {
                    type: "Metallic",
                    particles: "Cations + electron sea",
                    forces: "Metallic bonding",
                    examples: "Cu, Fe, Al",
                    mp: "Low to very high",
                    conductivity: "Good in the solid state",
                    solubility: "Insoluble",
                  },
                  {
                    type: "Molecular",
                    particles: "Molecules",
                    forces: "Dispersion, dipole–dipole, H-bonds",
                    examples: "Ice, CO₂(s), I₂",
                    mp: "Low",
                    conductivity: "None",
                    solubility: "Depends on polarity",
                  },
                ].map((row) => (
                  <tr key={row.type}>
                    <td className="px-4 py-3 font-bold text-teal-700 dark:text-teal-300">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.particles}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.forces}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.examples}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.mp}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.conductivity}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.solubility}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Lattices and Coordination Numbers
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The coordination number depends on the relative sizes and charges of
            the particles. Larger cations and smaller anions generally allow
            higher coordination numbers because more anions can fit around the
            cation.
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[620px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Structure
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Coordination
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Example
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  { structure: "Rock salt", coordination: "6:6", example: "NaCl", description: "Each ion is surrounded by six of the opposite charge." },
                  { structure: "Caesium chloride", coordination: "8:8", example: "CsCl", description: "Each ion sits at the centre of a cube of eight opposite ions." },
                  { structure: "Diamond", coordination: "4", example: "C (diamond)", description: "Each carbon is tetrahedrally bonded to four others." },
                  { structure: "Face-centred cubic metal", coordination: "12", example: "Cu, Al, Ag", description: "Each atom touches twelve neighbours." },
                  { structure: "Body-centred cubic metal", coordination: "8", example: "Fe, W, Na", description: "Each atom touches eight neighbours." },
                ].map((row) => (
                  <tr key={row.structure}>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      {row.structure}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                      {row.coordination}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                      {row.example}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Diamond and Graphite: Same Element, Different Networks
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Diamond and graphite are both covalent network crystals made only of
            carbon, yet their properties could hardly be more different. The
            difference lies in how the carbon atoms are connected.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Diamond
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Each carbon is sp³ hybridized and bonded to four others in a
                three-dimensional tetrahedral network. Every bond must be broken
                to melt or scratch the crystal.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Extremely hard, very high melting point, electrical insulator,
                transparent.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Graphite
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Each carbon is sp² hybridized and bonded to three others in flat
                hexagonal layers. The layers are held together by dispersion
                forces, and each carbon has one delocalized p electron.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                Soft and slippery, conducts electricity along the layers, used as
                a lubricant and in pencil leads.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 m-0">
              <strong>The lesson:</strong> the identity of the atoms is not enough
              to predict a material's properties. The arrangement of the atoms and
              the type of bonding between them matter just as much.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            Amorphous Solids
          </h3>

          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Not every solid is crystalline. In an <strong>amorphous solid</strong>,
            the particles are frozen in a disordered arrangement with no
            long-range repeating pattern. Glass, rubber, and many plastics are
            amorphous. They do not have a sharp melting point; instead, they
            soften gradually over a range of temperatures.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Crystalline quartz
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                SiO₂ with an ordered covalent network. It has a regular
                repeating structure, a sharp melting point, and cleaves along
                definite planes.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-lg">
              <h5 className="font-bold text-slate-900 dark:text-white mb-2">
                Amorphous glass
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                SiO₂ with additives, cooled without crystallizing. The network is
                disordered, so glass softens gradually and breaks with a curved
                fracture.
              </p>
            </div>
          </div>

          {/* Real World Example */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200/50 dark:border-amber-700/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-800/50 rounded-xl text-amber-600 dark:text-amber-400 mt-1">
                <Lightbulb size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-amber-900 dark:text-amber-300 mb-2 m-0">
                  Real-World Example: From Sand to a Smartphone Screen
                </h4>
                <p className="m-0 text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                  Sand is mostly quartz — a covalent network of silicon and
                  oxygen atoms with a very high melting point. Melt it with
                  sodium and calcium compounds and cool it quickly, and you get
                  glass: the same covalent network, but frozen in a disordered
                  arrangement. That disorder lets glass be shaped and softened,
                  while its strong Si–O bonds make it transparent, hard, and
                  chemically resistant. The screen on your phone is a specially
                  strengthened amorphous silicate, while the processor inside is a
                  crystalline silicon network — two different crystal outcomes
                  from the same element.
                </p>
              </div>
            </div>
          </div>

          {/* Key Concept Box */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6 border-l-4 border-teal-600">
            <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4 text-xl">
              <Target className="text-teal-500" />
              Key Idea: Particles and Forces Define the Crystal
            </h4>
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <p className="m-0">
                <strong>Ionic</strong> → ions + electrostatic forces → hard,
                brittle, high melting, conducts when molten or dissolved.
              </p>
              <p className="m-0">
                <strong>Covalent network</strong> → atoms + continuous covalent
                bonds → very hard, very high melting, usually insulating.
              </p>
              <p className="m-0">
                <strong>Metallic</strong> → cations + electron sea → conductive,
                malleable, lustrous.
              </p>
              <p className="m-0">
                <strong>Molecular</strong> → molecules + weak IMFs → soft, low
                melting, nonconducting.
              </p>
            </div>
          </div>

          <Practice number="2.6">
            <ExerciseQuestion
              question="A solid is soft, has a low melting point, does not conduct electricity, and dissolves in hexane but not in water. Which type of crystal is it most likely to be?"
              options={[
                "Ionic crystal",
                "Metallic crystal",
                "Molecular crystal",
                "Covalent network crystal",
              ]}
              correctAnswer={2}
              explanation="Molecular crystals are held together by weak intermolecular forces, so they are soft, melt at low temperatures, and do not conduct electricity. A nonpolar molecular solid dissolves in a nonpolar solvent such as hexane rather than in water. Ionic crystals would be hard, high-melting, and soluble in water; metallic crystals would conduct; covalent network crystals would be very hard and insoluble."
            />
          </Practice>
        </section>

        {/* Chapter Summary */}
        <section className="scroll-mt-8">
          <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-lg p-8 sm:p-10 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Chapter 2 Summary</h2>
            <div className="space-y-3 text-green-50">
              {[
                "Atoms bond to lower their energy. Valence electrons are the electrons that participate in bonding.",
                "The octet rule predicts that main-group atoms gain, lose, or share electrons to reach eight valence electrons; hydrogen and helium follow the duet rule. Incomplete octets, odd-electron species, and expanded octets are important exceptions.",
                "Ionic bonds form by electron transfer and produce lattices of ions. Lattice energy increases with higher charges and smaller ions.",
                "Covalent bonds form by sharing electrons. Lewis structures, VSEPR theory, and molecular polarity explain molecular shape and behaviour.",
                "Intermolecular forces — dispersion, dipole–dipole, hydrogen bonding, and ion–dipole — are weaker than covalent bonds but control boiling points and solubility.",
                "Metallic bonds consist of cations in a sea of delocalized electrons, explaining conductivity, malleability, luster, and the properties of alloys.",
                "Valence bond theory describes localized orbital overlap and hybridization; molecular orbital theory describes delocalized molecular orbitals, bond order, and magnetism.",
                "Crystals are classified as ionic, covalent network, metallic, or molecular. Amorphous solids lack long-range order.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-200" />
                  <p className="m-0">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-white/20 bg-white/10 p-5">
              <p className="m-0 text-sm font-bold uppercase tracking-wider text-green-200">
                Core formulas to remember
              </p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <p className="m-0 font-mono font-bold">E ∝ q₁q₂ / r²</p>
                  <p className="m-0 mt-1 text-xs text-green-100">
                    Coulomb's law for ionic attraction
                  </p>
                </div>
                <div>
                  <p className="m-0 font-mono font-bold">
                    Bond order = (N<sub>b</sub> − N<sub>a</sub>) / 2
                  </p>
                  <p className="m-0 mt-1 text-xs text-green-100">
                    Molecular orbital theory
                  </p>
                </div>
                <div>
                  <p className="m-0 font-mono font-bold">
                    Domains = bonds + lone pairs
                  </p>
                  <p className="m-0 mt-1 text-xs text-green-100">
                    VSEPR electron counting
                  </p>
                </div>
                <div>
                  <p className="m-0 font-mono font-bold">ΔEN</p>
                  <p className="m-0 mt-1 text-xs text-green-100">
                    Nonpolar: less than 0.4 · polar covalent: 0.4–1.7 · ionic:
                    greater than 1.7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bonding at a Glance */}
        <section className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-green-600 pl-4">
            Bonding at a Glance
          </h2>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Model
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    What holds the particles together?
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Typical properties
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700 dark:text-slate-200">
                    Key examples
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {[
                  {
                    model: "Ionic",
                    force: "Electrostatic attraction between ions",
                    properties: "High melting point, hard, brittle, conducts when molten or dissolved",
                    examples: "NaCl, MgO",
                  },
                  {
                    model: "Covalent molecular",
                    force: "Weak intermolecular forces between molecules",
                    properties: "Low melting point, soft, nonconducting, often volatile",
                    examples: "H₂O, CO₂, I₂",
                  },
                  {
                    model: "Covalent network",
                    force: "Continuous covalent bonds",
                    properties: "Very high melting point, extremely hard, usually insulating",
                    examples: "Diamond, quartz",
                  },
                  {
                    model: "Metallic",
                    force: "Cations attracted to delocalized electrons",
                    properties: "Conductive, malleable, ductile, lustrous",
                    examples: "Cu, Fe, Al",
                  },
                ].map((row) => (
                  <tr key={row.model}>
                    <td className="px-4 py-3 font-bold text-green-700 dark:text-green-400">
                      {row.model}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.force}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {row.properties}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                      {row.examples}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-blue-600">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              Check your understanding
            </h3>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5 m-0 pl-5 list-disc">
              <li>Can you draw a Lewis structure and count valence electrons correctly?</li>
              <li>Can you assign a VSEPR shape and estimate its bond angles?</li>
              <li>Can you decide whether a molecule with polar bonds is polar overall?</li>
              <li>Can you rank substances by boiling point using intermolecular forces?</li>
              <li>Can you calculate a bond order from an MO electron configuration?</li>
              <li>Can you classify a crystal and predict its physical properties?</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter2;
