import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter3Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter3: React.FC<Chapter3Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4 rounded-full">
          Mathematics Chapter 3 • Visual Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          EXPONENTIAL & LOGARITHMIC FUNCTIONS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Exponential and logarithmic functions describe processes with explosive growth or rapid decay. This master guide provides clear visual diagrams, geometric curves, step-by-step algorithms, and interactive practice exercises.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 3.1: Exponential Functions */}
        <section id="subtopic-3.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>📈</span> 3.1. Exponential Functions & The Natural Base e
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              An <strong>Exponential Function</strong> has the independent variable <em>x</em> in the exponent:
            </p>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 shadow-inner">
              {"f(x) = a^x  (Base a > 0, a ≠ 1, Domain: (-∞, +∞), Range: (0, +∞))"}
            </div>

            {/* VISUAL DIAGRAM: Growth vs Decay Curves */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎨</span> Visual Graphic: Exponential Growth vs. Decay Curves
              </h3>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* SVG Visual Graphic 1 */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex flex-col items-center">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">Growth (a &gt; 1): f(x) = 2ˣ</span>
                  <svg viewBox="0 0 200 150" className="w-full max-w-[240px] h-auto text-slate-700 dark:text-slate-300">
                    {/* Axes */}
                    <line x1="20" y1="130" x2="190" y2="130" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
                    <line x1="20" y1="120" x2="190" y2="120" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" /> {/* Asymptote y=0 */}
                    <line x1="60" y1="10" x2="60" y2="140" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                    {/* Curve */}
                    <path d="M 20 118 Q 70 115 100 90 T 170 15" fill="none" stroke="#10b981" strokeWidth="3" />
                    {/* Y-intercept */}
                    <circle cx="60" cy="100" r="4" fill="#10b981" />
                    <text x="68" y="102" fill="currentColor" fontSize="10" fontWeight="bold">(0, 1)</text>
                    <text x="130" y="132" fill="#10b981" fontSize="9">Asymptote: y = 0</text>
                  </svg>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 text-center">
                    Shoots up to +∞ rapidly to the right. Never crosses y = 0.
                  </p>
                </div>

                {/* SVG Visual Graphic 2 */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex flex-col items-center">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">Decay (0 &lt; a &lt; 1): f(x) = (1/2)ˣ</span>
                  <svg viewBox="0 0 200 150" className="w-full max-w-[240px] h-auto text-slate-700 dark:text-slate-300">
                    {/* Axes */}
                    <line x1="20" y1="120" x2="190" y2="120" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="140" y1="10" x2="140" y2="140" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                    {/* Curve */}
                    <path d="M 30 15 Q 100 90 130 115 T 190 118" fill="none" stroke="#f59e0b" strokeWidth="3" />
                    {/* Y-intercept */}
                    <circle cx="140" cy="100" r="4" fill="#f59e0b" />
                    <text x="85" y="102" fill="currentColor" fontSize="10" fontWeight="bold">(0, 1)</text>
                    <text x="30" y="132" fill="#f59e0b" fontSize="9">Asymptote: y = 0</text>
                  </svg>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 text-center">
                    Drops from +∞ on the left, flattening toward y = 0 on the right.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Properties Box */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <span>🔍</span> Key Structural Properties of Exponential Functions
              </h3>
              <ul className="grid md:grid-cols-2 gap-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <li className="p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/40">
                  <strong>Domain:</strong> (-∞, +∞) — any real number can be used as an exponent.
                </li>
                <li className="p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/40">
                  <strong>Range:</strong> (0, +∞) — exponential output is always strictly positive!
                </li>
                <li className="p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/40">
                  <strong>y-Intercept:</strong> Point (0, 1) because a⁰ = 1 for all valid bases.
                </li>
                <li className="p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/40">
                  <strong>Horizontal Asymptote:</strong> The line y = 0 (x-axis).
                </li>
                <li className="p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/40">
                  <strong>Natural Base e:</strong> Euler's constant e ≈ 2.718281828... used in continuous growth models.
                </li>
                <li className="p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/40">
                  <strong>One-to-One:</strong> If aˣ = aʸ, then x = y (allows direct algebraic solving).
                </li>
              </ul>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Exponential Transformations</h4>
                <ExerciseQuestion 
                  question="For the transformed exponential function g(x) = 3 · 2^(x - 1) + 4, what is the range and horizontal asymptote?"
                  options={[
                    'Domain: ℝ, Range: (0, ∞), Horizontal Asymptote: y = 0',
                    'Domain: ℝ, Range: (4, ∞), Horizontal Asymptote: y = 4',
                    'Domain: (1, ∞), Range: (4, ∞), Horizontal Asymptote: y = 1',
                    'Domain: ℝ, Range: (3, ∞), Horizontal Asymptote: y = 3'
                  ]}
                  correctAnswer={1}
                  explanation="The base exponential term 2^(x-1) is strictly positive (> 0). Multiplying by 3 yields 3 · 2^(x-1) > 0. Adding 4 shifts the graph vertically upward by 4 units, giving a horizontal asymptote of y = 4 and a range of (4, ∞)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 3.2: Logarithmic Functions */}
        <section id="subtopic-3.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>🔄</span> 3.2. Logarithmic Functions & Inverse Reflection
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A logarithm asks: <em>"To what power must we raise base a to obtain x?"</em> It is the inverse of the exponential function:
            </p>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 shadow-inner">
              {"y = log_a(x)  ⟺  a^y = x   (Argument x > 0, Base a > 0, a ≠ 1)"}
            </div>

            {/* VISUAL DIAGRAM: Reflection Across y = x */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎨</span> Visual Graphic: Inverse Reflection Across Line y = x
              </h3>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex flex-col items-center">
                  <svg viewBox="0 0 220 180" className="w-full max-w-[260px] h-auto text-slate-700 dark:text-slate-300">
                    {/* Axes */}
                    <line x1="20" y1="160" x2="200" y2="160" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                    <line x1="40" y1="20" x2="40" y2="170" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                    {/* Line y = x */}
                    <line x1="20" y1="180" x2="180" y2="20" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="182" y="25" fill="#94a3b8" fontSize="9" fontWeight="bold">y = x</text>
                    
                    {/* Exponential f(x) = e^x */}
                    <path d="M 20 155 Q 60 150 90 120 T 150 20" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                    <circle cx="40" cy="120" r="3.5" fill="#3b82f6" />
                    <text x="15" y="115" fill="#3b82f6" fontSize="9" fontWeight="bold">(0, 1)</text>
                    <text x="110" y="45" fill="#3b82f6" fontSize="10" fontWeight="bold">y = eˣ</text>

                    {/* Logarithmic g(x) = ln(x) */}
                    <path d="M 45 170 Q 50 130 80 100 T 180 50" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                    <circle cx="80" cy="160" r="3.5" fill="#a855f7" />
                    <text x="82" y="173" fill="#a855f7" fontSize="9" fontWeight="bold">(1, 0)</text>
                    <text x="140" y="70" fill="#a855f7" fontSize="10" fontWeight="bold">y = ln(x)</text>

                    {/* Asymptotes indicator */}
                    <line x1="40" y1="20" x2="40" y2="170" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                </div>

                <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
                    <strong className="text-purple-900 dark:text-purple-300 block mb-1">Mirror Symmetry:</strong>
                    The graph of <em>y = ln(x)</em> is the exact mirror image of <em>y = eˣ</em> reflected across the diagonal line <em>y = x</em>.
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                    <strong className="text-blue-900 dark:text-blue-300 block mb-1">Swapped Points:</strong>
                    If (0, 1) lies on exponential <em>y = eˣ</em>, then (1, 0) lies on logarithmic <em>y = ln(x)</em>.
                  </div>
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800/60">
                    <strong className="text-rose-900 dark:text-rose-300 block mb-1">Vertical Asymptote:</strong>
                    While <em>y = eˣ</em> has a horizontal asymptote <em>y = 0</em>, <em>y = ln(x)</em> has a vertical asymptote <em>x = 0</em>.
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Logarithmic Domain</h4>
                <ExerciseQuestion 
                  question="What is the domain of the function f(x) = ln(5 - 2x)?"
                  options={[
                    '(-∞, 5/2)',
                    '(5/2, ∞)',
                    '(-∞, 5)',
                    '[5/2, ∞)'
                  ]}
                  correctAnswer={0}
                  explanation="The argument of a natural logarithm must be strictly positive: 5 - 2x > 0 ⟹ 5 > 2x ⟹ x < 5/2. Therefore, the domain in interval notation is (-∞, 5/2)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 3.3: Properties of Logarithms */}
        <section id="subtopic-3.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>🧮</span> 3.3. Laws of Logarithms & Algebraic Manipulation
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Logarithms simplify exponent multiplication into addition, division into subtraction, and exponents into multipliers:
            </p>

            {/* Laws Step Cards */}
            <div className="grid md:grid-cols-3 gap-4 font-mono text-xs md:text-sm">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2">
                <span className="font-bold text-purple-900 dark:text-purple-300 block text-sm font-sans">1. Product Rule</span>
                <div className="p-2 bg-white dark:bg-slate-900 rounded font-bold text-center border text-purple-700 dark:text-purple-300">
                  log_a(u · v) = log_a(u) + log_a(v)
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans">
                  <em>Example:</em> log(2x) = log(2) + log(x)
                </p>
              </div>

              <div className="p-4 bg-pink-50 dark:bg-pink-900/30 rounded-xl border border-pink-200 dark:border-pink-800 space-y-2">
                <span className="font-bold text-pink-900 dark:text-pink-300 block text-sm font-sans">2. Quotient Rule</span>
                <div className="p-2 bg-white dark:bg-slate-900 rounded font-bold text-center border text-pink-700 dark:text-pink-300">
                  log_a(u / v) = log_a(u) - log_a(v)
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans">
                  <em>Example:</em> ln(x / 5) = ln(x) - ln(5)
                </p>
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
                <span className="font-bold text-indigo-900 dark:text-indigo-300 block text-sm font-sans">3. Power Rule</span>
                <div className="p-2 bg-white dark:bg-slate-900 rounded font-bold text-center border text-indigo-700 dark:text-indigo-300">
                  log_a(uᶜ) = c · log_a(u)
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans">
                  <em>Example:</em> ln(x³) = 3 ln(x)
                </p>
              </div>
            </div>

            {/* Change of Base Formula Box */}
            <div className="p-6 border-2 border-purple-300 dark:border-purple-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-2">
                🏛️ Change of Base Formula
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                Converts logarithm of base <em>b</em> to natural <em>ln</em> or common <em>log</em>:
              </p>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl font-mono text-xs md:text-sm text-slate-900 dark:text-white font-bold inline-block border border-purple-200 dark:border-purple-700">
                log_b(x) = ln(x) / ln(b) = log(x) / log(b)
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 3: Condensing Logarithms</h4>
                <ExerciseQuestion 
                  question="Condense the expression into a single logarithm: 2 ln(x) + (1/2) ln(y) - 3 ln(z)."
                  options={[
                    'ln( (x² · √y) / z³ )',
                    'ln( (2x · y/2) / 3z )',
                    'ln( x² + √y - z³ )',
                    'ln( (x² · y²) / z³ )'
                  ]}
                  correctAnswer={0}
                  explanation="Using Power Rule: 2 ln(x) = ln(x²), (1/2) ln(y) = ln(y^1/2) = ln(√y), and 3 ln(z) = ln(z³). Applying Product Rule for addition: ln(x² · √y). Applying Quotient Rule for subtraction: ln((x² · √y) / z³)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 3.4: Exponential and Logarithmic Equations */}
        <section id="subtopic-3.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>⚙️</span> 3.4. Solving Exponential & Logarithmic Equations
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Follow these clear step-by-step algorithms for solving exponential and logarithmic equations:
            </p>

            {/* Visual Step Workflow Cards */}
            <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border space-y-3">
                <h5 className="font-bold text-purple-700 dark:text-purple-400 text-sm flex items-center gap-2">
                  <span>1️⃣</span> Exponential Equation Workflow
                </h5>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded font-mono">Step 1: Isolate base term (e.g. 5 · 2ˣ = 40 ⟹ 2ˣ = 8)</div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded font-mono">Step 2: Match bases (2ˣ = 2³ ⟹ x = 3) OR take ln of both sides</div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded font-mono">Step 3: Solve for variable x</div>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border space-y-3">
                <h5 className="font-bold text-purple-700 dark:text-purple-400 text-sm flex items-center gap-2">
                  <span>2️⃣</span> Logarithmic Equation Workflow
                </h5>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <div className="p-2 bg-pink-50 dark:bg-pink-900/30 rounded font-mono">Step 1: Condense logs into single log_a(u) = c</div>
                  <div className="p-2 bg-pink-50 dark:bg-pink-900/30 rounded font-mono">Step 2: Rewrite in exponential form u = aᶜ</div>
                  <div className="p-2 bg-rose-100 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 rounded font-bold">Step 3: CHECK for Extraneous Roots (Argument &gt; 0)!</div>
                </div>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 4: Solving Exponential Equations</h4>
                <ExerciseQuestion 
                  question="Solve for x in the equation: e^(2x) - 5 e^x + 6 = 0."
                  options={[
                    'x = 2, x = 3',
                    'x = ln(2), x = ln(3)',
                    'x = e², x = e³',
                    'x = ln(5), x = ln(6)'
                  ]}
                  correctAnswer={1}
                  explanation="Let u = e^x. Then u² - 5u + 6 = 0. Factoring gives (u - 2)(u - 3) = 0, so u = 2 or u = 3. Substituting back: e^x = 2 ⟹ x = ln(2), and e^x = 3 ⟹ x = ln(3)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 3.5: Applications */}
        <section id="subtopic-3.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>🧪</span> 3.5. Real-World Applications: Finance & Science
          </h2>

          <div className="space-y-4 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-purple-200 dark:border-purple-800 shadow-sm space-y-2">
                <h4 className="font-bold text-purple-800 dark:text-purple-300 text-sm">💰 Financial Interest Models</h4>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl font-mono text-xs">
                  <p className="font-bold">Periodic Compounding:</p>
                  <p className="text-purple-700 dark:text-purple-300 font-bold my-1">A(t) = P(1 + r/n)ⁿᵗ</p>
                  <p className="font-bold mt-2">Continuous Compounding:</p>
                  <p className="text-purple-700 dark:text-purple-300 font-bold my-1">A(t) = P eʳᵗ</p>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-pink-200 dark:border-pink-800 shadow-sm space-y-2">
                <h4 className="font-bold text-pink-800 dark:text-pink-300 text-sm">☢️ Radioactive Decay & Half-Life</h4>
                <div className="p-3 bg-pink-50 dark:bg-pink-900/30 rounded-xl font-mono text-xs">
                  <p className="font-bold">Decay Formula:</p>
                  <p className="text-pink-700 dark:text-pink-300 font-bold my-1">N(t) = N₀ e⁻ᵏᵗ</p>
                  <p className="font-bold mt-2">Half-Life Relation:</p>
                  <p className="text-pink-700 dark:text-pink-300 font-bold my-1">t₁/₂ = ln(2) / k</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 5: Continuous Compounding Time</h4>
                <ExerciseQuestion 
                  question="How long will it take an investment to double when invested at 5% annual interest compounded continuously?"
                  options={[
                    't = ln(2) / 0.05 ≈ 13.86 years',
                    't = 2 / 0.05 = 40 years',
                    't = e^(0.05) ≈ 1.05 years',
                    't = ln(5) / 2 ≈ 0.80 years'
                  ]}
                  correctAnswer={0}
                  explanation="Using continuous interest A = P eʳᵗ, setting A = 2P gives 2P = P e^(0.05 t) ⟹ 2 = e^(0.05 t). Taking natural log of both sides: ln(2) = 0.05 t ⟹ t = ln(2) / 0.05 ≈ 0.69315 / 0.05 ≈ 13.86 years."
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
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 2
          </button>

          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 4
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter3;
