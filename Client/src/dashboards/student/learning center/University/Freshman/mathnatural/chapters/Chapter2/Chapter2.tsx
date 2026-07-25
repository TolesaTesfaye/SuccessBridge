import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter2Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter2: React.FC<Chapter2Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Mathematics Chapter 2 • Rigorous Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          POLYNOMIAL & RATIONAL FUNCTIONS & COMPLEX ZEROS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Polynomials and rational functions form the algebraic backbone of calculus and mathematical modeling. In this master chapter, you will learn polynomial degree, end-behavior limits, synthetic division, the Remainder and Factor Theorems, Descartes' Rule of Signs, the Rational Root Theorem, Gauss's Fundamental Theorem of Algebra, complex conjugate zero pairs, and complete rational function asymptote analysis.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 2.1: Polynomial Functions & End-Behavior Analysis */}
        <section id="subtopic-2.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.1. Polynomial Functions, Graphs & End-Behavior Analysis
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>Polynomial Function</strong> of degree <em>n</em> in a single variable <em>x</em> is a function defined by:
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 shadow-inner">
              {"P(x) = a_n xⁿ + a_{n-1} xⁿ⁻¹ + ... + a₁ x + a₀  (a_n ≠ 0, n ∈ ℕ₀)"}
            </div>

            {/* Properties Summary Grid */}
            <div className="grid md:grid-cols-3 gap-4 font-mono text-xs md:text-sm">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <span className="font-bold text-blue-900 dark:text-blue-300 block text-sm font-sans mb-1">1. Leading Term & Degree</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans leading-normal">
                  The term with the highest power <strong>a_n xⁿ</strong> dictates graph behavior as x → ±∞ (Leading Term Test).
                </p>
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-900 dark:text-indigo-300 block text-sm font-sans mb-1">2. Turning Points Limit</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans leading-normal">
                  A polynomial graph of degree <em>n</em> is smooth and continuous, possessing at most <strong>n - 1 local extrema</strong> (turning points).
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
                <span className="font-bold text-purple-900 dark:text-purple-300 block text-sm font-sans mb-1">3. Zero Multiplicity Behavior</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans leading-normal">
                  Odd multiplicity <em>k</em> → graph <strong>crosses</strong> x-axis; Even multiplicity <em>k</em> → graph <strong>touches and turns back</strong> (tangent).
                </p>
              </div>
            </div>

            {/* Leading Term Test Matrix Card */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>⚡</span> The Leading Term Test Matrix (End-Behavior as x → ±∞)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                      <th className="p-3">Degree (n)</th>
                      <th className="p-3">Leading Coeff (a_n)</th>
                      <th className="p-3">Left End (x → -∞)</th>
                      <th className="p-3">Right End (x → +∞)</th>
                      <th className="p-3">Graphic Behavior</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold">Even (n = 2, 4, 6...)</td>
                      <td className="p-3 text-emerald-600 font-bold">a_n &gt; 0</td>
                      <td className="p-3 font-mono">P(x) → +∞</td>
                      <td className="p-3 font-mono">P(x) → +∞</td>
                      <td className="p-3">Rises Left & Right (🡔 🡕)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Even (n = 2, 4, 6...)</td>
                      <td className="p-3 text-rose-600 font-bold">a_n &lt; 0</td>
                      <td className="p-3 font-mono">P(x) → -∞</td>
                      <td className="p-3 font-mono">P(x) → -∞</td>
                      <td className="p-3">Falls Left & Right (🡖 🡗)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Odd (n = 1, 3, 5...)</td>
                      <td className="p-3 text-emerald-600 font-bold">a_n &gt; 0</td>
                      <td className="p-3 font-mono">P(x) → -∞</td>
                      <td className="p-3 font-mono">P(x) → +∞</td>
                      <td className="p-3">Falls Left, Rises Right (🡖 🡕)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Odd (n = 1, 3, 5...)</td>
                      <td className="p-3 text-rose-600 font-bold">a_n &lt; 0</td>
                      <td className="p-3 font-mono">P(x) → +∞</td>
                      <td className="p-3 font-mono">P(x) → -∞</td>
                      <td className="p-3">Rises Left, Falls Right (🡔 🡗)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* VISUAL DIAGRAM 1: Cubic Polynomial Plot */}
            <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>📈</span> Visual Diagram 1: Cubic Polynomial P(x) = x³ - 3x (Zeros & Local Extrema)
              </h4>

              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-80 h-56" viewBox="0 0 320 220">
                  {/* Axes */}
                  <line x1="20" y1="110" x2="300" y2="110" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="160" y1="20" x2="160" y2="200" stroke="#94a3b8" strokeWidth="2" />

                  {/* Cubic Curve y = x³ - 3x */}
                  <path d="M 40 200 C 90 20, 110 50, 160 110 C 210 170, 230 200, 280 20" fill="none" stroke="#2563eb" strokeWidth="3" />

                  {/* Zeros Points (x = -√3, 0, +√3) */}
                  <circle cx="90" cy="110" r="5" fill="#ef4444" />
                  <circle cx="160" cy="110" r="5" fill="#ef4444" />
                  <circle cx="230" cy="110" r="5" fill="#ef4444" />
                  <text x="80" y="130" fontSize="11" fontWeight="bold" fill="#ef4444">-√3</text>
                  <text x="165" y="125" fontSize="11" fontWeight="bold" fill="#ef4444">0</text>
                  <text x="235" y="130" fontSize="11" fontWeight="bold" fill="#ef4444">+√3</text>

                  {/* Turning Points */}
                  <circle cx="110" cy="60" r="4" fill="#059669" />
                  <text x="70" y="45" fontSize="10" fontWeight="bold" fill="#059669">Local Max (-1, 2)</text>
                  <circle cx="210" cy="160" r="4" fill="#059669" />
                  <text x="215" y="175" fontSize="10" fontWeight="bold" fill="#059669">Local Min (1, -2)</text>
                </svg>
              </div>
            </div>

            {/* Worked Example Box */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <span>💡</span> Worked Example: Multiplicity & End-Behavior Analysis
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <strong>Problem:</strong> Analyze the end behavior and x-intercept behavior of <span className="font-mono text-blue-600 dark:text-blue-400">P(x) = -2(x + 1)²(x - 2)³</span>.
              </p>
              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <p><strong>Step 1 (Degree & Leading Term):</strong> Expanding the highest powers gives leading term <span className="font-mono">-2 · (x²) · (x³) = -2x⁵</span>. Total degree n = 5 (odd), leading coefficient a_n = -2 (negative).</p>
                <p><strong>Step 2 (End Behavior):</strong> As x → -∞, P(x) → +∞. As x → +∞, P(x) → -∞ (Rises left, falls right).</p>
                <p><strong>Step 3 (Zeros & Multiplicities):</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><span className="font-mono">x = -1</span> has multiplicity 2 (even) → Graph <strong>touches x-axis</strong> at (-1, 0) and turns back.</li>
                  <li><span className="font-mono">x = 2</span> has multiplicity 3 (odd) → Graph <strong>crosses x-axis</strong> at (2, 0) with an inflection wiggle.</li>
                </ul>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: End Behavior of Polynomial</h4>
                <ExerciseQuestion 
                  question="What is the end behavior of the polynomial function P(x) = -2x⁴ + 5x³ - 7 as x → ∞ and x → -∞?"
                  options={[
                    'P(x) → ∞ as x → ∞ and P(x) → -∞ as x → -∞',
                    'P(x) → -∞ as x → ∞ and P(x) → -∞ as x → -∞',
                    'P(x) → ∞ as x → ∞ and P(x) → ∞ as x → -∞',
                    'P(x) → 0 as x → ±∞'
                  ]}
                  correctAnswer={1}
                  explanation="Leading term is -2x⁴ (even degree n=4, negative coefficient a_n = -2). For negative even leading terms, the graph falls to -∞ on both sides: P(x) → -∞ as x → ±∞."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.2: Division of Polynomials */}
        <section id="subtopic-2.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.2. Polynomial Division Algorithm & Remainder Theorem
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              When dividing a dividend polynomial <strong>P(x)</strong> by a non-zero divisor polynomial <strong>D(x)</strong>, there exist unique quotient <strong>Q(x)</strong> and remainder <strong>R(x)</strong>:
            </p>

            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                🏛️ The Polynomial Division Algorithm
              </h3>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-sm md:text-base font-bold text-slate-900 dark:text-white inline-block mb-2">
                {"P(x) = D(x) · Q(x) + R(x)  where deg(R) < deg(D) or R(x) = 0"}
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                In fractional form: <span className="font-mono text-blue-700 dark:text-blue-300 font-semibold">P(x) / D(x) = Q(x) + R(x) / D(x)</span>
              </p>
            </div>

            {/* Remainder Theorem Card */}
            <div className="p-6 border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-900/10 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>📜</span> The Remainder Theorem
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                If a polynomial P(x) is divided by a linear factor (x - c), the constant remainder is equal to the functional value evaluated at c:
              </p>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl font-mono text-xs md:text-sm text-indigo-700 dark:text-indigo-300 font-bold text-center border border-indigo-200 dark:border-indigo-700">
                Remainder R = P(c)
              </div>
            </div>

            {/* Synthetic Division Visual Tableau Card */}
            <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                <span>🧮</span> Synthetic Division Tableau for Dividing (2x³ - 7x² + 5) by (x - 3)
              </h4>
              
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-xs md:text-sm space-y-2 overflow-x-auto">
                <div className="flex gap-6 border-b-2 border-slate-400 pb-2">
                  <span className="text-blue-600 font-bold">c = 3  |</span>
                  <span className="w-8 text-center">2</span>
                  <span className="w-8 text-center">-7</span>
                  <span className="w-8 text-center">0</span>
                  <span className="w-8 text-center">5</span>
                </div>
                <div className="flex gap-6 text-slate-500">
                  <span className="w-14">      |</span>
                  <span className="w-8 text-center"> </span>
                  <span className="w-8 text-center"> 6</span>
                  <span className="w-8 text-center">-3</span>
                  <span className="w-8 text-center">-9</span>
                </div>
                <div className="flex gap-6 font-bold border-t border-slate-400 pt-2 text-blue-700 dark:text-blue-300">
                  <span className="w-14">Result|</span>
                  <span className="w-8 text-center">2</span>
                  <span className="w-8 text-center">-1</span>
                  <span className="w-8 text-center">-3</span>
                  <span className="w-16 text-center text-rose-600">R = -4</span>
                </div>
                <p className="text-xs font-sans text-slate-600 dark:text-slate-400 mt-2">
                  Quotient Q(x) = 2x² - x - 3, Remainder R = -4. Thus P(3) = -4.
                </p>
              </div>
            </div>

            {/* Step by Step Worked Example */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <span>💡</span> Worked Example: Evaluating P(-2) via Remainder Theorem
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <strong>Problem:</strong> Find the remainder when <span className="font-mono text-blue-600 dark:text-blue-400">P(x) = x⁴ - 3x² + 5x - 7</span> is divided by <span className="font-mono">(x + 2)</span>.
              </p>
              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <p><strong>Step 1 (Identify c):</strong> Since divisor is (x + 2) = (x - (-2)), we set c = -2.</p>
                <p><strong>Step 2 (Apply Remainder Theorem):</strong> Compute P(-2) directly:</p>
                <div className="p-3 bg-white dark:bg-slate-900 rounded font-mono text-xs text-center border">
                  P(-2) = (-2)⁴ - 3(-2)² + 5(-2) - 7 = 16 - 12 - 10 - 7 = -13
                </div>
                <p><strong>Conclusion:</strong> The remainder when dividing by (x + 2) is <strong>-13</strong>.</p>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Evaluating Remainder</h4>
                <ExerciseQuestion 
                  question="What is the remainder when P(x) = x³ - 4x² + 2x - 5 is divided by (x - 2)?"
                  options={[
                    '-9',
                    '-5',
                    '0',
                    '3'
                  ]}
                  correctAnswer={0}
                  explanation="By the Remainder Theorem, R = P(2) = (2)³ - 4(2)² + 2(2) - 5 = 8 - 16 + 4 - 5 = -9."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.3: Zeros of Polynomial Functions */}
        <section id="subtopic-2.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.3. Zeros of Polynomial Functions & Factor Theorem
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A number <em>c</em> is a <strong>zero (or root)</strong> of a polynomial P(x) if and only if P(c) = 0.
            </p>

            {/* Factor Theorem Card */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                🏛️ The Factor Theorem
              </h3>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-xs md:text-sm text-slate-900 dark:text-white font-bold inline-block border border-blue-200 dark:border-blue-700">
                {"(x - c) is a factor of P(x)  ⟺  P(c) = 0"}
              </div>
            </div>

            {/* Descartes Rule of Signs Box */}
            <div className="p-6 border border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-900/10 rounded-2xl space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>🔍</span> Descartes' Rule of Signs
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                1. The number of <strong>positive real zeros</strong> of P(x) equals the number of sign variations in P(x), or is less than that by an even integer.
              </p>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                2. The number of <strong>negative real zeros</strong> of P(x) equals the number of sign variations in P(-x), or is less than that by an even integer.
              </p>
            </div>

            {/* Intermediate Value Theorem Card */}
            <div className="p-6 border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-900/10 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>📐</span> Intermediate Value Theorem (IVT) for Polynomials
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                If P(x) is a polynomial and P(a) and P(b) have <strong>opposite signs</strong> (i.e. P(a) · P(b) &lt; 0), then P(x) has <strong>at least one real zero between a and b</strong>.
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 3: Testing Linear Factors</h4>
                <ExerciseQuestion 
                  question="Which of the following is a linear factor of P(x) = x³ - 7x + 6?"
                  options={[
                    '(x - 1)',
                    '(x - 4)',
                    '(x + 5)',
                    '(x - 6)'
                  ]}
                  correctAnswer={0}
                  explanation="Evaluate P(1) = 1³ - 7(1) + 6 = 1 - 7 + 6 = 0. By the Factor Theorem, (x - 1) is a factor of P(x)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.4: Rational Root Theorem */}
        <section id="subtopic-2.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.4. Rational Root Theorem & Complete Real Factoring
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              The <strong>Rational Root Theorem</strong> narrows down all candidate rational zeros for polynomials with integer coefficients:
            </p>

            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                🏛️ The Rational Root Theorem
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                If P(x) = a_n xⁿ + ... + a₀ has integer coefficients, then every rational zero <strong>x = p / q</strong> (in lowest terms) satisfies:
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-xs md:text-sm text-slate-900 dark:text-white font-bold inline-block border border-blue-200 dark:border-blue-700">
                p is an integer factor of constant term a₀  ∧  q is an integer factor of leading coefficient a_n
              </div>
            </div>

            {/* Systematic Factoring Strategy Box */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <span>🛠️</span> Systematic Algorithm for Finding All Zeros
              </h4>
              <ol className="list-decimal pl-5 text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <li><strong>List Candidates:</strong> Find factors <em>p</em> of constant term <em>a₀</em> and factors <em>q</em> of leading coefficient <em>aₙ</em>. Form test list ±<em>p/q</em>.</li>
                <li><strong>Test Candidates:</strong> Use synthetic division or direct substitution to find a root <em>c</em> where <em>P(c) = 0</em>.</li>
                <li><strong>Depress Polynomial:</strong> Divide <em>P(x)</em> by <em>(x - c)</em> to obtain quotient <em>Q(x)</em> of degree <em>n - 1</em>.</li>
                <li><strong>Repeat or Quadratic Formula:</strong> Continue until <em>Q(x)</em> is quadratic, then solve using factoring or <em>x = (-b ± √(b² - 4ac)) / (2a)</em>.</li>
              </ol>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 4: Rational Root Candidates</h4>
                <ExerciseQuestion 
                  question="For the polynomial P(x) = 2x³ - 5x² + 3x - 3, what are all possible rational zeros p/q?"
                  options={[
                    '±1, ±3',
                    '±1, ±3, ±1/2, ±3/2',
                    '±1, ±2, ±3',
                    '±1/3, ±2/3'
                  ]}
                  correctAnswer={1}
                  explanation="Factors of constant term a0 = -3 are p ∈ {±1, ±3}. Factors of leading coefficient an = 2 are q ∈ {±1, ±2}. All possible rational candidate ratios p/q are {±1, ±3, ±1/2, ±3/2}."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.5: Fundamental Theorem of Algebra */}
        <section id="subtopic-2.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.5. Fundamental Theorem of Algebra & Complex Zeros
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              In 1799, Carl Friedrich Gauss established the cornerstone result of polynomial algebra over the field of complex numbers ℂ:
            </p>

            {/* Fundamental Theorem Card */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                👑 The Fundamental Theorem of Algebra (Gauss)
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                Every polynomial P(x) of degree n ≥ 1 with complex coefficients has <strong>at least one complex zero</strong>. Consequently, P(x) factors completely into <strong>exactly n linear factors</strong>:
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-xs md:text-sm text-blue-800 dark:text-blue-300 font-bold inline-block border border-blue-200 dark:border-blue-700">
                P(x) = a_n (x - c₁)(x - c₂)...(x - c_n)  where c_i ∈ ℂ
              </div>
            </div>

            {/* Conjugate Pairs Theorem Box */}
            <div className="p-6 border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-900/10 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>⚡</span> Conjugate Pairs Theorem
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                If a polynomial P(x) has <strong>real coefficients</strong> and z = a + bi (b ≠ 0) is a complex zero, then its complex conjugate <strong>z̄ = a - bi</strong> is ALSO a zero of P(x). Non-real complex roots always occur in conjugate pairs!
              </p>
            </div>

            {/* VISUAL DIAGRAM 2: Complex Conjugate Pair in Argand Diagram */}
            <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>🪞</span> Visual Diagram 2: Complex Conjugate Zeros z = 2 + 3i & z̄ = 2 - 3i
              </h4>

              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-80 h-56" viewBox="0 0 320 220">
                  {/* Axes */}
                  <line x1="20" y1="110" x2="300" y2="110" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="160" y1="20" x2="160" y2="200" stroke="#94a3b8" strokeWidth="2" />
                  <text x="290" y="100" fontSize="11" fontWeight="bold" fill="#64748b">Re</text>
                  <text x="170" y="30" fontSize="11" fontWeight="bold" fill="#64748b">Im</text>

                  {/* Reflection Line (Real Axis) */}
                  <line x1="160" y1="110" x2="240" y2="40" stroke="#2563eb" strokeWidth="2" />
                  <line x1="160" y1="110" x2="240" y2="180" stroke="#2563eb" strokeWidth="2" />

                  {/* Conjugate Points */}
                  <circle cx="240" cy="40" r="5" fill="#2563eb" />
                  <text x="248" y="40" fontSize="11" fontWeight="bold" fill="#2563eb">z = 2 + 3i</text>

                  <circle cx="240" cy="180" r="5" fill="#9333ea" />
                  <text x="248" y="185" fontSize="11" fontWeight="bold" fill="#9333ea">z̄ = 2 - 3i</text>

                  {/* Dotted Conjugate Symmetry */}
                  <line x1="240" y1="40" x2="240" y2="180" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 5: Complex Conjugate Zeros</h4>
                <ExerciseQuestion 
                  question="A polynomial P(x) of degree 3 with real coefficients has zeros x = 2 and x = 3 - 4i. What is the remaining zero of P(x)?"
                  options={[
                    'x = -2',
                    'x = 3 + 4i',
                    'x = -3 + 4i',
                    'x = 4 + 3i'
                  ]}
                  correctAnswer={1}
                  explanation="By the Conjugate Pairs Theorem, complex zeros for real-coefficient polynomials must occur in conjugate pairs. Since 3 - 4i is a zero, its conjugate 3 + 4i MUST also be a zero."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.6: Rational Functions, Asymptotes & Graphing */}
        <section id="subtopic-2.6" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            2.6. Rational Functions, Asymptotes & Graphing Guide
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>Rational Function</strong> is a quotient of two polynomial functions:
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
              {"f(x) = N(x) / D(x)  where N(x), D(x) are polynomials and D(x) ≠ 0"}
            </div>

            {/* Asymptotes Rules Summary Card */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎯</span> Asymptote Analysis Rules for f(x) = N(x) / D(x)
              </h3>

              <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">1. Vertical Asymptotes (VA) & Holes</span>
                  <p>Set denominator <span className="font-mono">D(x) = 0</span> after factoring. Real zeros of D(x) that are NOT zeros of N(x) form <strong>Vertical Asymptotes x = c</strong>. Common factors canceled out create <strong>Removable Discontinuities (Holes)</strong>.</p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">2. Horizontal Asymptotes (HA)</span>
                  <p>Let <span className="font-mono">n = deg(N)</span> and <span className="font-mono">m = deg(D)</span>:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>If <strong>n &lt; m</strong>: Horizontal asymptote is <strong>y = 0</strong> (x-axis).</li>
                    <li>If <strong>n = m</strong>: Horizontal asymptote is ratio of leading coefficients <strong>y = a_n / b_m</strong>.</li>
                    <li>If <strong>n &gt; m</strong>: NO horizontal asymptote exists.</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">3. Slant (Oblique) Asymptotes (SA)</span>
                  <p>If <strong>n = m + 1</strong> (numerator degree is exactly 1 higher than denominator), polynomial division yields <span className="font-mono">f(x) = (ax + b) + R(x)/D(x)</span>. The linear line <strong>y = ax + b</strong> is the <strong>Slant Asymptote</strong> as x → ±∞.</p>
                </div>
              </div>
            </div>

            {/* VISUAL DIAGRAM 3: Rational Function Graph */}
            <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>📈</span> Visual Diagram 3: Rational Function f(x) = (2x + 1) / (x - 1)
              </h4>

              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-80 h-56" viewBox="0 0 320 220">
                  {/* Axes */}
                  <line x1="20" y1="110" x2="300" y2="110" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="160" y1="20" x2="160" y2="200" stroke="#94a3b8" strokeWidth="2" />

                  {/* Vertical Asymptote x = 1 (x-pixel = 200) */}
                  <line x1="200" y1="20" x2="200" y2="200" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5" />
                  <text x="205" y="35" fontSize="10" fontWeight="bold" fill="#ef4444">VA: x = 1</text>

                  {/* Horizontal Asymptote y = 2 (y-pixel = 60) */}
                  <line x1="20" y1="60" x2="300" y2="60" stroke="#2563eb" strokeWidth="2" strokeDasharray="5 5" />
                  <text x="25" y="50" fontSize="10" fontWeight="bold" fill="#2563eb">HA: y = 2</text>

                  {/* Left Hyperbola Branch */}
                  <path d="M 30 100 Q 140 95, 185 200" fill="none" stroke="#059669" strokeWidth="3" />

                  {/* Right Hyperbola Branch */}
                  <path d="M 215 20 Q 240 50, 295 55" fill="none" stroke="#059669" strokeWidth="3" />
                </svg>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 6: Identifying Asymptotes</h4>
                <ExerciseQuestion 
                  question="What are the Vertical and Horizontal Asymptotes for the rational function f(x) = (3x² - 5) / (x² - 4)?"
                  options={[
                    'VA: x = ±2, HA: y = 3',
                    'VA: x = 2, HA: y = 0',
                    'VA: x = ±5, HA: y = 3/5',
                    'VA: x = 0, HA: y = -5/4'
                  ]}
                  correctAnswer={0}
                  explanation="Denominator x² - 4 = (x - 2)(x + 2) = 0 gives Vertical Asymptotes x = 2 and x = -2. Numerator and denominator both have degree 2, so Horizontal Asymptote is ratio of leading coefficients y = 3/1 = 3."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Master Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600 rounded-2xl">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Mathematics Chapter 2 Master Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <p><strong>✓ Polynomial Standard Form & Limits:</strong> P(x) = a_n xⁿ + ... + a₀. Degree n dictates maximum n-1 turning points. Leading coefficient test determines end behavior as x → ±∞.</p>
            <p><strong>✓ Division Algorithm & Remainder Theorem:</strong> P(x) = D(x) Q(x) + R(x). Dividing by (x - c) yields constant remainder R = P(c).</p>
            <p><strong>✓ Factor Theorem:</strong> (x - c) is a factor of P(x) ⟺ P(c) = 0.</p>
            <p><strong>✓ Rational Root Theorem:</strong> Candidates for rational roots x = p/q satisfy p | a₀ and q | a_n.</p>
            <p><strong>✓ Fundamental Theorem of Algebra:</strong> Every degree n polynomial has exactly n complex zeros (counted with multiplicity). Non-real complex roots occur in conjugate pairs (a ± bi).</p>
            <p><strong>✓ Rational Functions & Asymptotes:</strong> Vertical asymptotes occur at non-removable zeros of denominator D(x). Horizontal asymptotes depend on comparing degrees of numerator N(x) and denominator D(x).</p>
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
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 3
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter2;
