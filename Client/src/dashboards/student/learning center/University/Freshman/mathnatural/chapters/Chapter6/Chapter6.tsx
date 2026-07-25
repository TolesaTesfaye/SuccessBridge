import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter6Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter6: React.FC<Chapter6Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4 rounded-full">
          Mathematics Chapter 6 • Comprehensive Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          LIMITS AND CONTINUITY
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Limits form the foundation of modern differential and integral calculus. This comprehensive master guide covers formal epsilon-delta limit definitions, one-sided limit criteria, Squeeze Theorem, trigonometric limit identities, indeterminate 0/0 factoring/rationalization, infinite limits, 3-part continuity tests, discontinuity classification, and the Intermediate Value Theorem.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 6.1: Concept of Limits */}
        <section id="subtopic-6.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>🎯</span> 6.1. Concept of Limits, One-Sided Limits & Epsilon-Delta
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              We write <strong>lim_{`{x → c}`} f(x) = L</strong> to mean that as <em>x</em> approaches <em>c</em> from both sides, <em>f(x)</em> approaches value <em>L</em>:
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 shadow-inner">
              {"lim_{x → c} f(x) = L  ⟺  lim_{x → c⁻} f(x) = L  AND  lim_{x → c⁺} f(x) = L"}
            </div>

            {/* Epsilon Delta Formal Definition Card */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <span>🏛️</span> Formal Epsilon-Delta (ε-δ) Definition of Limit
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                For every real number <em>ε &gt; 0</em>, there exists a corresponding real number <em>δ &gt; 0</em> such that for all <em>x</em>:
              </p>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-xs md:text-sm text-center font-bold text-blue-900 dark:text-blue-200">
                0 &lt; |x - c| &lt; δ  ⟹  |f(x) - L| &lt; ε
              </div>
            </div>

            {/* VISUAL SVG GRAPHIC: One Sided Limits */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎨</span> Visual Graphic: Left-Hand vs Right-Hand Limits Approaching a Hole
              </h3>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex flex-col items-center">
                <svg viewBox="0 0 260 140" className="w-full max-w-[280px] h-auto text-slate-700 dark:text-slate-300">
                  {/* Axes */}
                  <line x1="20" y1="120" x2="240" y2="120" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                  <line x1="40" y1="10" x2="40" y2="135" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />

                  {/* Hole at (130, 40) */}
                  <circle cx="130" cy="40" r="5" fill="white" stroke="#2563eb" strokeWidth="2.5" />
                  <line x1="130" y1="40" x2="130" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="40" x2="130" y2="40" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Left Curve (x -> c-) */}
                  <path d="M 40 100 Q 80 80 123 43" fill="none" stroke="#2563eb" strokeWidth="3" />
                  {/* Right Curve (x -> c+) */}
                  <path d="M 220 90 Q 180 50 137 42" fill="none" stroke="#2563eb" strokeWidth="3" />

                  {/* Labels */}
                  <text x="125" y="133" fill="currentColor" fontSize="10" fontWeight="bold">x = c</text>
                  <text x="22" y="43" fill="currentColor" fontSize="10" fontWeight="bold">y = L</text>
                  <text x="50" y="70" fill="#2563eb" fontSize="9" fontWeight="bold">x → c⁻</text>
                  <text x="180" y="65" fill="#2563eb" fontSize="9" fontWeight="bold">x → c⁺</text>
                </svg>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Piecewise Limit Existence</h4>
                <ExerciseQuestion 
                  question="Let f(x) = { 2x + 1 for x < 2, and x² + 1 for x ≥ 2 }. Find lim_{x → 2} f(x)."
                  options={[
                    'lim_{x → 2} f(x) = 5',
                    'Does Not Exist (DNE)',
                    'lim_{x → 2} f(x) = 4',
                    'lim_{x → 2} f(x) = 3'
                  ]}
                  correctAnswer={0}
                  explanation="Left-hand limit: lim_{x → 2⁻} (2x + 1) = 2(2) + 1 = 5. Right-hand limit: lim_{x → 2⁺} (x² + 1) = 2² + 1 = 5. Since both left and right limits equal 5, the two-sided limit equals 5."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.2: Limit Laws & Squeeze Theorem */}
        <section id="subtopic-6.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>⚙️</span> 6.2. Limit Laws, Squeeze Theorem & Special Trig Limits
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              When direct substitution yields <strong>0/0</strong>, use algebraic factoring, rationalizing, or fundamental trigonometric limit identities:
            </p>

            {/* Fundamental Trig Limits Card */}
            <div className="grid md:grid-cols-2 gap-4 font-mono text-xs md:text-sm">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 text-center">
                <span className="font-sans font-bold text-blue-900 dark:text-blue-300 block mb-1">Sine Limit Identity</span>
                <div className="font-bold text-blue-700 dark:text-blue-200 text-sm">lim_{`{x → 0}`} [ sin(x) / x ] = 1</div>
              </div>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl border border-cyan-200 text-center">
                <span className="font-sans font-bold text-cyan-900 dark:text-cyan-300 block mb-1">Cosine Limit Identity</span>
                <div className="font-bold text-cyan-700 dark:text-cyan-200 text-sm">lim_{`{x → 0}`} [ (1 - cos x) / x ] = 0</div>
              </div>
            </div>

            {/* Squeeze Theorem Box */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                🏛️ The Squeeze (Sandwich) Theorem
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                If <em>g(x) ≤ f(x) ≤ h(x)</em> near <em>c</em>, and <em>lim_{`{x → c}`} g(x) = lim_{`{x → c}`} h(x) = L</em>, then:
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-xs md:text-sm text-slate-900 dark:text-white font-bold inline-block border border-blue-200 dark:border-blue-700">
                lim_{`{x → c}`} f(x) = L
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Trigonometric Limit Identity</h4>
                <ExerciseQuestion 
                  question="Evaluate lim_{x → 0} [ sin(5x) / (3x) ]."
                  options={[
                    '5 / 3',
                    '1',
                    '0',
                    '3 / 5'
                  ]}
                  correctAnswer={0}
                  explanation="Multiply numerator and denominator to match sin(5x)/(5x): lim_{x → 0} (5/3) · [ sin(5x) / (5x) ] = (5/3) · (1) = 5/3."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.3: Limits at Infinity */}
        <section id="subtopic-6.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>♾️</span> 6.3. End Behavior at Infinity & Asymptotes
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              If <em>lim_{`{x → ±∞}`} f(x) = L</em>, then <strong>y = L</strong> is a horizontal asymptote. If <em>lim_{`{x → c}`} f(x) = ±∞</em>, then <strong>x = c</strong> is a vertical asymptote.
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 shadow-inner">
              {"Rational Dominant Degree Test: Degree(Num) < Degree(Den) ⟹ H.A. y = 0"}
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 3: Limit at Infinity</h4>
                <ExerciseQuestion 
                  question="Find lim_{x → ∞} (3x² - 5x) / (2x² + 7)."
                  options={[
                    '3 / 2',
                    '0',
                    '∞',
                    '-5 / 7'
                  ]}
                  correctAnswer={0}
                  explanation="Because the degree of numerator (2) equals degree of denominator (2), the limit is the ratio of leading coefficients: 3 / 2."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.4: Continuity */}
        <section id="subtopic-6.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>🔗</span> 6.4. Continuity & 3 Discontinuity Classifications
          </h2>

          <div className="space-y-4 md:space-y-6">
            {/* Discontinuity Types Grid */}
            <div className="grid md:grid-cols-3 gap-4 text-xs md:text-sm font-mono">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 space-y-1">
                <span className="font-sans font-bold text-blue-900 dark:text-blue-300 text-sm block">1. Removable Hole</span>
                <p className="font-sans text-slate-600 dark:text-slate-400 text-xs">
                  Limit exists as <em>x → c</em>, but <em>f(c)</em> is undefined or unequal to the limit.
                </p>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 space-y-1">
                <span className="font-sans font-bold text-amber-900 dark:text-amber-300 text-sm block">2. Jump Discontinuity</span>
                <p className="font-sans text-slate-600 dark:text-slate-400 text-xs">
                  Left limit and right limit both exist, but <em>lim_{`{x → c⁻}`} ≠ lim_{`{x → c⁺}`}</em>.
                </p>
              </div>

              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 space-y-1">
                <span className="font-sans font-bold text-rose-900 dark:text-rose-300 text-sm block">3. Infinite Asymptote</span>
                <p className="font-sans text-slate-600 dark:text-slate-400 text-xs">
                  One or both one-sided limits shoot to <em>+∞</em> or <em>-∞</em> (vertical asymptote).
                </p>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 4: Discontinuity Classification</h4>
                <ExerciseQuestion 
                  question="Which type of discontinuity occurs at x = 2 for f(x) = (x - 2) / |x - 2|?"
                  options={[
                    'Jump Discontinuity (left limit = -1, right limit = +1)',
                    'Removable Hole',
                    'Infinite Vertical Asymptote',
                    'Function is continuous everywhere'
                  ]}
                  correctAnswer={0}
                  explanation="As x → 2⁻, |x - 2| = -(x - 2), so f(x) = -1. As x → 2⁺, |x - 2| = x - 2, so f(x) = +1. Because left and right limits differ, a Jump Discontinuity occurs."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.5: IVT */}
        <section id="subtopic-6.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>🏛️</span> 6.5. Intermediate Value Theorem & Root Bisection
          </h2>

          <div className="space-y-4 md:space-y-6">
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                Intermediate Value Theorem Statement
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                If <em>f</em> is continuous on <em>[a, b]</em> and <em>W</em> is between <em>f(a)</em> and <em>f(b)</em>, then there exists at least one <em>c ∈ (a, b)</em> such that:
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-xs md:text-sm text-slate-900 dark:text-white font-bold inline-block border border-blue-200 dark:border-blue-700">
                f(c) = W
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 5: IVT Root Guarantees</h4>
                <ExerciseQuestion 
                  question="For continuous f(x) = x³ + x - 3, show that f(x) = 0 has a real solution in interval [1, 2]."
                  options={[
                    'f(1) = -1 < 0 and f(2) = 7 > 0, so IVT guarantees a root c in (1, 2)',
                    'f(1) = 1 and f(2) = 2, so IVT does not apply',
                    'f(1) = 0, so x = 1 is the root',
                    'IVT requires f(x) to be a trigonometric function'
                  ]}
                  correctAnswer={0}
                  explanation="f(1) = 1³ + 1 - 3 = -1 (negative). f(2) = 2³ + 2 - 3 = 7 (positive). Since f is continuous on [1, 2] and changes sign, IVT guarantees at least one root c ∈ (1, 2) where f(c) = 0."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter5');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 5
          </button>

          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter7');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 7
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter6;
