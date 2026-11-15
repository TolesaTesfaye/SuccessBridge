import React, { useEffect } from "react";
import { ExerciseQuestion } from "../../../../../University/Freshman/components/ExerciseQuestion";
import {
  PhScaleDiagram,
  ProtonTransferDiagram,
  BufferActionDiagram,
  SaltHydrolysisGrid,
  TitrationCurveDiagram,
} from "../../components/ChemDiagrams";

interface ChapterProps {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter1: React.FC<ChapterProps> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          ACID-BASE EQUILIBRIA
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-violet-600" />
        <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
          Acids and bases are everywhere — in the sour taste of <em>ergo</em>, in soap, in your stomach, and in the soil
          where teff grows. This unit builds a complete picture of acid–base chemistry: the three great concepts
          (Arrhenius, Brønsted–Lowry, Lewis), the ionic equilibria of weak acids and bases, buffers, the hydrolysis of
          salts, and how we measure acids and bases with indicators and titrations.
        </p>
      </div>

      <div className="space-y-16 pb-20 px-4 md:px-8">

        {/* ================= SECTION 1.1 ================= */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            1.1. Acid-Base Concepts
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Chemists have developed three increasingly general definitions of acids and bases. Each new concept explains
              everything the previous one did, plus more. Knowing all three lets you classify almost any substance and
              predict how it will behave in a reaction.
            </p>
          </div>

          {/* 1.1.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.1.1 Arrhenius Concept of Acids and Bases
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Svante Arrhenius (1887) defined acids and bases by what they produce in <strong>water</strong>:
            </p>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• An <strong>acid</strong> is a substance that ionizes in water to produce hydrogen ions, H⁺ (hydronium, H₃O⁺).</li>
              <li>• A <strong>base</strong> is a substance that ionizes in water to produce hydroxide ions, OH⁻.</li>
            </ul>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                HCl → H⁺ + Cl⁻  (acid)<br />
                NaOH → Na⁺ + OH⁻  (base)
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Limitation:</strong> the Arrhenius concept only works in aqueous solution and cannot explain bases
              like ammonia (NH₃) or carbonates, which contain no OH⁻ but still behave as bases.
            </p>
          </div>

          {/* 1.1.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.1.2 Brønsted-Lowry Concept of Acids and Bases
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Brønsted and Lowry (1923) broadened the idea using <strong>proton (H⁺) transfer</strong>, which works in any
              solvent, not just water:
            </p>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• An <strong>acid</strong> is a proton (H⁺) <strong>donor</strong>.</li>
              <li>• A <strong>base</strong> is a proton (H⁺) <strong>acceptor</strong>.</li>
            </ul>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                HCl + H₂O → H₃O⁺ + Cl⁻<br />
                (acid)  (base)
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Every Brønsted–Lowry acid–base reaction creates a <strong>conjugate acid–base pair</strong>: when an acid loses
              a proton it becomes its conjugate base; when a base gains a proton it becomes its conjugate acid. In the
              reaction above, HCl/Cl⁻ is one pair and H₃O⁺/H₂O is the other. Water is <strong>amphoteric</strong> — it can act
              as either an acid or a base.
            </p>
          </div>

          <ProtonTransferDiagram />

          {/* 1.1.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.1.3 Lewis Concept of Acids and Bases
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              G. N. Lewis (1923) gave the broadest definition, based on <strong>electron pairs</strong> rather than protons:
            </p>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• A <strong>Lewis acid</strong> is an electron-pair <strong>acceptor</strong> (electron-poor, e.g. BF₃, AlCl₃, H⁺).</li>
              <li>• A <strong>Lewis base</strong> is an electron-pair <strong>donor</strong> (has a lone pair, e.g. NH₃, H₂O, OH⁻).</li>
            </ul>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                BF₃ + :NH₃ → F₃B–NH₃<br />
                (Lewis acid) (Lewis base)
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              The Lewis concept explains reactions with no proton transfer at all, such as BF₃ bonding to NH₃. All Arrhenius
              and Brønsted–Lowry acids/bases are also covered by the Lewis definition, making it the most general.
            </p>
          </div>

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-purple-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Comparing the Three Concepts
              </h4>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2">Real-World Example: Acids and Bases in an Ethiopian Kitchen</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <em>Ergo</em> (fermented milk) and <em>tej</em> taste sour because they contain acids (lactic acid, acetic
                  acid) that release H⁺ — Arrhenius acids and proton donors. Wood ash, traditionally used in soap-making and
                  to treat acidic soil, is basic: it supplies OH⁻ and accepts protons. When you neutralise sour milk residue
                  with ash, an acid–base reaction occurs — the same chemistry described by all three concepts.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Quick Comparison:</p>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-4">
                <li>• Arrhenius — defined by H⁺ / OH⁻ produced in water (narrowest)</li>
                <li>• Brønsted–Lowry — defined by proton donation / acceptance (any solvent)</li>
                <li>• Lewis — defined by electron-pair acceptance / donation (broadest)</li>
              </ul>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: In the Brønsted-Lowry concept, a base is a proton (H⁺) acceptor."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. Brønsted-Lowry defines an acid as a proton donor and a base as a proton acceptor. For example, in NH₃ + H₂O → NH₄⁺ + OH, ammonia accepts a proton and is therefore the base."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Acid-Base Concepts</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="In the reaction NH₃ + H₂O → NH₄⁺ + OH⁻, which species acts as the Brønsted-Lowry base?"
                options={[
                  'NH₃',
                  'H₂O',
                  'NH₄⁺',
                  'OH⁻'
                ]}
                correctAnswer={0}
                explanation="NH₃ accepts a proton (H⁺) from water to become NH₄⁺, so NH₃ is the Brønsted-Lowry base. Water donates the proton, acting as the acid. NH₄⁺ and OH⁻ are the conjugate acid and conjugate base respectively."
              />

              <ExerciseQuestion
                question="Which concept of acids and bases is the MOST general, explaining reactions with no proton transfer?"
                options={[
                  'Arrhenius',
                  'Brønsted-Lowry',
                  'Lewis',
                  'All three are equally general'
                ]}
                correctAnswer={2}
                explanation="The Lewis concept is the most general because it defines acids as electron-pair acceptors and bases as electron-pair donors. It explains reactions like BF₃ + NH₃ that involve no proton transfer at all, which the other two concepts cannot."
              />

              <ExerciseQuestion
                question="Why can the Arrhenius concept NOT classify ammonia (NH₃) as a base?"
                options={[
                  'Because NH₃ is a gas',
                  'Because NH₃ contains no OH⁻ to release in water',
                  'Because NH₃ is neutral',
                  'Because NH₃ donates protons'
                ]}
                correctAnswer={1}
                explanation="Arrhenius defines a base as a substance that releases OH⁻ ions in water. NH₃ has no hydroxide group, yet it clearly behaves as a base. The Brønsted-Lowry concept fixes this by defining a base as a proton acceptor, which NH₃ is."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 1.2 ================= */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            1.2. Ionic Equilibria of Weak Acids and Bases
          </h2>

          <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Strong acids and bases ionize completely, but <strong>weak</strong> acids and bases only partially ionize,
              establishing an equilibrium between the ionized and unionized forms. These equilibria are described by
              equilibrium constants and are the reason water itself has a measurable (tiny) ionization.
            </p>
          </div>

          {/* 1.2.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.2.1 Ionization of Water
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Pure water ionizes very slightly in a process called <strong>autoionization</strong>:
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                H₂O ⇌ H⁺ + OH⁻<br />
                Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (at 25 °C)
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Kw is the <strong>ion-product constant of water</strong>. In pure water, [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M, which is
              why pure water is neutral with pH = 7. In ANY aqueous solution at 25 °C, the product [H⁺][OH⁻] always equals
              1.0 × 10⁻¹⁴. This leads to the useful relationship:
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                pH + pOH = 14  (at 25 °C)
              </p>
            </div>
          </div>

          {/* 1.2.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.2.2 Measures of the Strength of Acids and Bases in Aqueous Solution
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              The strength of a weak acid is measured by its <strong>acid ionization constant, Ka</strong>; the strength of a
              weak base by its <strong>base ionization constant, Kb</strong>:
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                HA ⇌ H⁺ + A⁻   Ka = [H⁺][A⁻]/[HA]<br />
                B + H₂O ⇌ BH⁺ + OH⁻   Kb = [BH⁺][OH⁻]/[B]
              </p>
            </div>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• A <strong>larger Ka</strong> (or Kb) means a <strong>stronger</strong> acid (or base) — more ionization.</li>
              <li>• pKa = −log Ka and pKb = −log Kb; a <strong>smaller pKa</strong> means a stronger acid.</li>
              <li>• For a conjugate pair: Ka × Kb = Kw = 1.0 × 10⁻¹⁴.</li>
              <li>• Acidity is expressed as pH = −log[H⁺]; pH &lt; 7 acidic, pH = 7 neutral, pH &gt; 7 basic.</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300">
              Strong acids (HCl, HNO₃, H₂SO₄) and strong bases (NaOH, KOH) ionize ~100%, so we do not use Ka/Kb for them.
              Weak acids (acetic acid, CH₃COOH) and weak bases (NH₃) have small Ka/Kb values and exist mostly in unionized form.
            </p>
          </div>

          <PhScaleDiagram />

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-violet-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Why Weak-Acid Equilibria Matter
              </h4>
              <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-violet-900 dark:text-violet-300 mb-2">Real-World Example: The Sour Taste of Tej and Ergo</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  The pleasant sourness of <em>tej</em> and <em>ergo</em> comes from weak organic acids (acetic and lactic
                  acid) that only partially ionize. Their small Ka values mean only a fraction of molecules release H⁺, giving
                  a mild, pleasant acidity (pH around 3–4) instead of the harsh burn of a strong acid. Controlling this weak-acid
                  equilibrium is exactly what gives fermented Ethiopian foods and drinks their characteristic taste.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Worked Example:</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                If [H⁺] = 1.0 × 10⁻³ M, then pH = −log(1.0 × 10⁻³) = 3, and pOH = 14 − 3 = 11, so [OH⁻] = 1.0 × 10⁻¹¹ M.
                Check: (1.0 × 10⁻³)(1.0 × 10⁻¹¹) = 1.0 × 10⁻¹⁴ = Kw. ✓
              </p>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: In pure water at 25 °C, the concentration of H⁺ equals the concentration of OH⁻."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. Water autoionizes to give equal amounts of H⁺ and OH⁻: [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M. This is why pure water is neutral (pH = 7)."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Ionic Equilibria</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="A solution has [H⁺] = 1.0 × 10⁻⁵ M. What is its pH and is it acidic or basic?"
                options={[
                  'pH 5, acidic',
                  'pH 5, basic',
                  'pH 9, acidic',
                  'pH 9, basic'
                ]}
                correctAnswer={0}
                explanation="pH = −log(1.0 × 10⁻⁵) = 5. Since pH is less than 7, the solution is acidic."
              />

              <ExerciseQuestion
                question="If the pH of a solution is 10, what is the [OH⁻] concentration at 25 °C?"
                options={[
                  '1.0 × 10⁻¹⁰ M',
                  '1.0 × 10⁻⁴ M',
                  '1.0 × 10⁻⁷ M',
                  '1.0 × 10⁻¹⁴ M'
                ]}
                correctAnswer={1}
                explanation="pOH = 14 − pH = 14 − 10 = 4, so [OH⁻] = 1.0 × 10⁻⁴ M. (Equivalently, [H⁺] = 10⁻¹⁰ M and [OH⁻] = Kw/[H⁺] = 10⁻¹⁴/10⁻¹⁰ = 10⁻⁴ M.)"
              />

              <ExerciseQuestion
                question="Which statement correctly describes a LARGER Ka value for a weak acid?"
                options={[
                  'The acid is weaker and ionizes less',
                  'The acid is stronger and ionizes more',
                  'The acid is neutral',
                  'Ka has no relation to acid strength'
                ]}
                correctAnswer={1}
                explanation="Ka = [H⁺][A⁻]/[HA]. A larger Ka means more of the acid is ionized into H⁺ and A⁻ at equilibrium, i.e. a stronger acid. Smaller Ka means weaker acid."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 1.3 ================= */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            1.3. Common Ion Effect and Buffer Solution
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Adding an ion that is already part of an equilibrium shifts that equilibrium (Le Chatelier's principle). This
              "common ion effect" is the foundation of <strong>buffer solutions</strong>, which resist changes in pH and are
              essential in biology, industry, and the laboratory.
            </p>
          </div>

          {/* 1.3.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.3.1 The Common Ion Effect
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Consider the weak-acid equilibrium of acetic acid:
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                CH₃COOH  H⁺ + CH₃COO⁻
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              If we add sodium acetate (NaCH₃COO), we flood the solution with the common ion CH₃COO. By Le Chatelier's
              principle the equilibrium shifts <strong>left</strong>, suppressing the ionization of the acid. The result: the
              solution becomes <strong>less acidic</strong> (higher pH) than the acid alone. The same idea applies to weak
              bases when a common cation is added.
            </p>
          </div>

          {/* 1.3.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.3.2 Buffer Solutions
          </h3>

          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              A <strong>buffer</strong> is a solution that resists large changes in pH when small amounts of acid or base are
              added. A buffer is made from a <strong>weak acid plus its conjugate-base salt</strong> (e.g. CH₃COOH +
              CH₃COONa) or a <strong>weak base plus its conjugate-acid salt</strong> (e.g. NH₃ + NH₄Cl).
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              How it works: the weak acid neutralises any added base, and the conjugate base neutralises any added acid, so
              [H⁺] — and therefore pH — stays nearly constant. The pH of a buffer is given by the
              <strong> Henderson–Hasselbalch equation</strong>:
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                pH = pKa + log([A⁻]/[HA])
              </p>
            </div>
          </div>

          <BufferActionDiagram />

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-purple-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Buffers in Living Systems
              </h4>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-purple-900 dark:text-purple-300 mb-2">Real-World Example: Blood — A Life-Saving Buffer</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Human blood must stay near pH 7.4. It is buffered by the carbonic-acid / bicarbonate pair
                  (H₂CO₃ / HCO₃⁻). When acid enters the blood, HCO₃⁻ absorbs it; when base enters, H₂CO₃ neutralises it.
                  Without this buffer, even a small pH shift would be fatal. The same buffering idea keeps fermented foods
                  and soils from swinging to harmful pH levels.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: Adding a common ion to a weak-acid solution increases the ionization of the weak acid."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={1}
              explanation="FALSE. Adding a common ion shifts the equilibrium toward the unionized acid (Le Chatelier's principle), SUPPRESSING ionization. This is the common ion effect."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Common Ion Effect and Buffers</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Which pair of substances can form a buffer solution?"
                options={[
                  'HCl and NaCl',
                  'CH₃COOH and CH₃COONa',
                  'NaOH and NaCl',
                  'HCl and NaOH'
                ]}
                correctAnswer={1}
                explanation="A buffer needs a weak acid plus its conjugate-base salt (or a weak base plus its conjugate-acid salt). CH₃COOH (weak acid) with CH₃COONa (its salt) forms a buffer. HCl and NaOH are strong and cannot buffer."
              />

              <ExerciseQuestion
                question="A buffer resists pH change mainly because:"
                options={[
                  'It is always neutral (pH 7)',
                  'It contains both a weak acid and its conjugate base to neutralise added acid or base',
                  'It has a very high concentration of water',
                  'It prevents all chemical reactions'
                ]}
                correctAnswer={1}
                explanation="A buffer contains a weak acid (to neutralise added base) and its conjugate base (to neutralise added acid). This pair absorbs added H⁺ or OH⁻, keeping pH nearly constant."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 1.4 ================= */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            1.4. Hydrolysis of Salts
          </h2>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              When a salt dissolves in water, its ions can react with water — a process called <strong>hydrolysis</strong>.
              Depending on whether the salt came from a strong or weak acid and base, the resulting solution can be neutral,
              acidic, or basic. Predicting this is a key skill.
            </p>
          </div>

          <SaltHydrolysisGrid />

          {/* 1.4.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.4.1 Hydrolysis of Salts of Strong Acids and Strong Bases
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Example: NaCl (from HCl + NaOH). Neither Na⁺ nor Cl⁻ reacts with water, because both are the conjugates of
              strong species. The solution stays <strong>neutral, pH = 7</strong>. No hydrolysis occurs.
            </p>
          </div>

          {/* 1.4.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.4.2 Hydrolysis of Salts of Weak Acids and Strong Bases
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Example: CH₃COONa (sodium acetate, from CH₃COOH + NaOH). The acetate ion is the conjugate base of a weak acid,
              so it hydrolyses:
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-3">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Producing OH⁻ makes the solution <strong>basic, pH &gt; 7</strong>.
            </p>
          </div>

          {/* 1.4.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.4.3 Hydrolysis of Salts of Strong Acids and Weak Bases
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Example: NH₄Cl (from HCl + NH₃). The ammonium ion is the conjugate acid of a weak base, so it hydrolyses:
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-3">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Producing H₃O⁺ makes the solution <strong>acidic, pH &lt; 7</strong>.
            </p>
          </div>

          {/* 1.4.4 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.4.4 Hydrolysis of Salts of Weak Acids and Weak Bases
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Example: CH₃COONH₄ (ammonium acetate). Both ions hydrolyse, so the final pH depends on which is stronger —
              compare Ka of the weak acid with Kb of the weak base:
            </p>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300">
              <li>• If Ka &gt; Kb → acidic solution</li>
              <li>• If Kb &gt; Ka → basic solution</li>
              <li>• If Ka ≈ Kb → nearly neutral (ammonium acetate is close to neutral because Ka ≈ Kb)</li>
            </ul>
          </div>

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-green-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Hydrolysis in Agriculture
              </h4>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-green-900 dark:text-green-300 mb-2">Real-World Example: Treating Acidic Ethiopian Soils</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Some Ethiopian highland soils are too acidic for teff and wheat. Farmers add wood ash or lime, whose
                  carbonate and oxide ions are the conjugate bases of weak acids; they hydrolyse to release OH⁻ and raise the
                  soil pH. Understanding salt hydrolysis lets agronomists choose the right amendment to bring soil to the
                  ideal pH for each crop.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: A salt formed from a weak acid and a strong base gives a basic solution (pH greater than 7)."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. The anion of the weak acid hydrolyses water to produce OH⁻ (e.g. CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻), making the solution basic with pH greater than 7."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Hydrolysis of Salts</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="What is the nature of an aqueous solution of NH₄Cl?"
                options={[
                  'Neutral (pH 7)',
                  'Acidic (pH less than 7)',
                  'Basic (pH greater than 7)',
                  'It cannot dissolve'
                ]}
                correctAnswer={1}
                explanation="NH₄Cl comes from a strong acid (HCl) and a weak base (NH₃). The NH₄⁺ ion hydrolyses to produce H₃O⁺, making the solution acidic (pH less than 7)."
              />

              <ExerciseQuestion
                question="Which salt produces a NEUTRAL solution (pH 7) when dissolved in water?"
                options={[
                  'CH₃COONa',
                  'NH₄Cl',
                  'NaCl',
                  'CH₃COONH₄ (with Ka much greater than Kb)'
                ]}
                correctAnswer={2}
                explanation="NaCl comes from a strong acid (HCl) and a strong base (NaOH). Neither ion hydrolyses, so the solution remains neutral at pH 7."
              />

              <ExerciseQuestion
                question="For a salt of a weak acid and a weak base, the solution is acidic when:"
                options={[
                  'Ka of the weak acid is greater than Kb of the weak base',
                  'Kb of the weak base is greater than Ka of the weak acid',
                  'Ka equals Kb exactly',
                  'The salt is insoluble'
                ]}
                correctAnswer={0}
                explanation="When both ions hydrolyse, the stronger tendency wins. If Ka (acid) is greater than Kb (base), the acid character dominates and the solution is acidic. If Kb is greater, it is basic; if equal, nearly neutral."
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 1.5 ================= */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-purple-600 pl-4">
            1.5. Acid-Base Indicators and Titrations
          </h2>

          <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600 p-6 mb-6 rounded-r-lg">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              To use acid–base chemistry in the laboratory we must be able to <strong>see</strong> acidity and
              <strong> measure</strong> it precisely. Indicators let us see pH changes with colour, and titration lets us
              determine an unknown concentration exactly.
            </p>
          </div>

          {/* 1.5.1 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.5.1 Acid-Base Indicators
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              An <strong>indicator</strong> is a weak organic acid or base whose colour changes over a specific pH range.
              Common indicators and their ranges:
            </p>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300">
              <li>• <strong>Litmus:</strong> red below pH ~5, blue above pH ~8</li>
              <li>• <strong>Methyl orange:</strong> red in acid (pH &lt; 3.1), yellow in base (pH &gt; 4.4)</li>
              <li>• <strong>Phenolphthalein:</strong> colourless in acid, pink in base (pH ~8.2–10)</li>
            </ul>
            <p className="text-slate-700 dark:text-slate-300 mt-4">
              We choose an indicator whose colour-change range matches the pH at the titration's equivalence point.
            </p>
          </div>

          {/* 1.5.2 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.5.2 Equivalents of Acids and Bases
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              An <strong>equivalent</strong> measures the reactive capacity of an acid or base:
            </p>
            <ul className="space-y-2 ml-6 text-slate-700 dark:text-slate-300 mb-4">
              <li>• One equivalent of an acid supplies <strong>1 mole of H⁺</strong>.</li>
              <li>• One equivalent of a base supplies <strong>1 mole of OH⁻</strong> (or accepts 1 mole of H⁺).</li>
              <li>• Equivalent weight = molar mass ÷ number of H⁺ (or OH⁻) per formula unit.</li>
            </ul>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                H₂SO₄ supplies 2 H⁺ → equivalent weight = molar mass / 2
              </p>
            </div>
          </div>

          {/* 1.5.3 */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1.5.3 Acid-Base Titrations
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              In a <strong>titration</strong>, a solution of known concentration (the titrant) is added gradually to a solution
              of unknown concentration until the reaction is complete — the <strong>equivalence point</strong>, signalled by
              the indicator's colour change (the <strong>end point</strong>). At the equivalence point:
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded border-2 border-purple-300 dark:border-purple-700 mb-4">
              <p className="text-center font-mono text-sm md:text-base text-slate-900 dark:text-white">
                (Mₐ × Vₐ) / nₐ = (M_b × V_b) / n_b
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              where M = molarity, V = volume, and n = the number of H⁺ or OH involved. This lets us solve for the unknown
              concentration.
            </p>
          </div>

          <TitrationCurveDiagram />

          <div className="space-y-6 mb-6">
            <div className="p-6 border-l-4 border-orange-500 bg-white dark:bg-slate-800 rounded-r-lg">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Indicators and Titration in Practice
              </h4>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded mb-4">
                <p className="text-sm font-bold text-orange-900 dark:text-orange-300 mb-2">Real-World Example: Testing Soil and Water in Ethiopia</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Agricultural extension workers test soil and irrigation water acidity before planting. A few drops of a
                  natural indicator (such as beetroot or red-cabbage extract) or a commercial indicator reveal whether the
                  sample is acidic or basic. In the laboratory, a full titration then gives the exact acidity, guiding how
                  much lime to add. This is acid–base chemistry directly improving crop yields.
                </p>
              </div>
            </div>
          </div>

          {/* Key Point Reminder */}
          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">🔑 Key Point Reminder</h4>
            <ExerciseQuestion
              question="True or False: At the equivalence point of a titration, the moles of acid equal the moles of base in the correct stoichiometric ratio."
              options={[
                'True',
                'False'
              ]}
              correctAnswer={0}
              explanation="TRUE. The equivalence point is reached when the amount of titrant added exactly neutralises the analyte according to the reaction stoichiometry — i.e. equivalents of acid equal equivalents of base."
            />
          </div>

          {/* Practice Exercise */}
          <div className="mt-10 p-8 border-t-4 border-purple-600">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">✏️ Practice Exercise: Indicators and Titrations</h3>

            <div className="space-y-6">
              <ExerciseQuestion
                question="Which indicator is colourless in acid and turns pink in base?"
                options={[
                  'Litmus',
                  'Methyl orange',
                  'Phenolphthalein',
                  'Universal indicator'
                ]}
                correctAnswer={2}
                explanation="Phenolphthalein is colourless in acidic solution and turns pink/fuchsia in basic solution (around pH 8.2-10). It is commonly used for strong acid-strong base titrations."
              />

              <ExerciseQuestion
                question="How many equivalents are in 1 mole of H₂SO₄?"
                options={[
                  '1',
                  '2',
                  '0.5',
                  '4'
                ]}
                correctAnswer={1}
                explanation="H₂SO₄ can donate 2 H⁺ ions per molecule, so 1 mole supplies 2 equivalents. Its equivalent weight is therefore molar mass divided by 2."
              />

              <ExerciseQuestion
                question="In a titration, 25.0 mL of an HCl solution is neutralised by 25.0 mL of 0.10 M NaOH. What is the concentration of the HCl?"
                options={[
                  '0.05 M',
                  '0.10 M',
                  '0.20 M',
                  '0.25 M'
                ]}
                correctAnswer={1}
                explanation="HCl and NaOH react 1:1. Using MₐVₐ = M_bV_b: Mₐ × 25.0 = 0.10 × 25.0, so Mₐ = 0.10 M. Equal volumes of a 1:1 acid-base pair at the equivalence point mean equal concentrations."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-8 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Chapter 1 Summary</h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <p><strong>✓ Acid-Base Concepts:</strong> Arrhenius (H⁺/OH in water), Brønsted-Lowry (proton donor/acceptor, conjugate pairs), Lewis (electron-pair acceptor/donor — the most general).</p>
            <p><strong>✓ Ionic Equilibria:</strong> Water autoionizes (Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴; pH + pOH = 14). Weak-acid/base strength is measured by Ka/Kb (and pKa/pKb); pH = −log[H⁺].</p>
            <p><strong>✓ Common Ion Effect and Buffers:</strong> A common ion suppresses ionization (Le Chatelier). Buffers (weak acid + its salt, or weak base + its salt) resist pH change; pH = pKa + log([A⁻]/[HA]).</p>
            <p><strong>✓ Hydrolysis of Salts:</strong> Strong+strong → neutral; weak acid+strong base → basic; strong acid+weak base → acidic; weak+weak → depends on Ka vs Kb.</p>
            <p><strong>✓ Indicators and Titrations:</strong> Indicators change colour over a pH range; equivalents count H⁺/OH⁻; titration uses (MₐVₐ)/nₐ = (M_bV_b)/n_b to find unknown concentrations.</p>
            <p><strong>✓ Key Insight:</strong> Acid-base equilibria connect a simple proton transfer to fermentation, soil treatment, blood chemistry, and precise laboratory measurement.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            Next: Chapter 2
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter1;
