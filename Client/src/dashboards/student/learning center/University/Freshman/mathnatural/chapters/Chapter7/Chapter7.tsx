import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter7Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter7: React.FC<Chapter7Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4 rounded-full">
          Mathematics Chapter 7 • Comprehensive Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          DERIVATIVES & DIFFERENTIATION CALCULUS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Derivatives measure instantaneous rate of change and tangent slope. This comprehensive master guide covers difference quotient limit definitions, differentiability conditions, power/product/quotient rules, trigonometric derivatives, generalized chain rules, implicit differentiation, tangent line equations, and curve sketching extrema.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 7.1: Definition of Derivative */}
        <section id="subtopic-7.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>📈</span> 7.1. Definition of Derivative & Differentiability vs Continuity
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              The <strong>Derivative</strong> of <em>f(x)</em> is the limit of the difference quotient as secant interval <em>h → 0</em>:
            </p>

            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-cyan-900 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/50 shadow-inner">
              {"f'(x) = lim_{h → 0} [ f(x + h) - f(x) ] / h   |   Alternative: f'(c) = lim_{x → c} [ f(x) - f(c) ] / (x - c)"}
            </div>

            {/* VISUAL SVG GRAPHIC: Secant to Tangent Line Slope */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎨</span> Visual Graphic: Secant Line Slope → Tangent Line Limit as h → 0
              </h3>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex flex-col items-center">
                <svg viewBox="0 0 280 150" className="w-full max-w-[300px] h-auto text-slate-700 dark:text-slate-300">
                  {/* Curve */}
                  <path d="M 30 130 Q 120 120 250 20" fill="none" stroke="#0284c7" strokeWidth="3" />
                  
                  {/* Point P(x, f(x)) */}
                  <circle cx="90" cy="115" r="4.5" fill="#0284c7" />
                  <text x="75" y="132" fill="#0284c7" fontSize="10" fontWeight="bold">P(x, f(x))</text>

                  {/* Point Q(x+h, f(x+h)) */}
                  <circle cx="190" cy="60" r="4.5" fill="#eab308" />
                  <text x="195" y="55" fill="#eab308" fontSize="10" fontWeight="bold">Q(x+h, f(x+h))</text>

                  {/* Secant Line */}
                  <line x1="40" y1="142" x2="240" y2="32" stroke="#eab308" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="210" y="25" fill="#eab308" fontSize="9">Secant Line</text>

                  {/* Tangent Line at P */}
                  <line x1="30" y1="130" x2="200" y2="85" stroke="#ef4444" strokeWidth="2.5" />
                  <text x="140" y="105" fill="#ef4444" fontSize="10" fontWeight="bold">Tangent Line Slope = f'(x)</text>
                </svg>
              </div>
            </div>

            {/* Differentiability Theorem Card */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-cyan-200 dark:border-cyan-800 space-y-2">
              <h4 className="font-bold text-cyan-900 dark:text-cyan-300 text-sm">🏛️ Differentiability Implies Continuity Theorem</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                If a function <em>f</em> is differentiable at <em>x = c</em>, then <em>f</em> MUST be continuous at <em>x = c</em>. (Note: The converse is FALSE! E.g. <em>f(x) = |x|</em> is continuous at 0, but NOT differentiable at 0 due to a sharp corner).
              </p>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Difference Quotient Calculation</h4>
                <ExerciseQuestion 
                  question="Using definition f'(x) = lim_{h → 0} [f(x+h) - f(x)] / h, find the derivative of f(x) = 3x²."
                  options={[
                    'f\'(x) = 6x',
                    'f\'(x) = 3x',
                    'f\'(x) = 6',
                    'f\'(x) = x²'
                  ]}
                  correctAnswer={0}
                  explanation="f(x+h) = 3(x+h)² = 3(x² + 2xh + h²) = 3x² + 6xh + 3h². [f(x+h) - f(x)] / h = (6xh + 3h²) / h = 6x + 3h. Taking limit as h → 0 gives f'(x) = 6x."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 7.2: Basic & Trigonometric Rules */}
        <section id="subtopic-7.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>⚡</span> 7.2. Basic, Exponential & Trigonometric Derivative Rules
          </h2>

          <div className="space-y-4 md:space-y-6">
            {/* Trigonometric Derivatives Table */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>⭐</span> Complete Trigonometric & Exponential Derivative Matrix
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                      <th className="p-2.5">Function f(x)</th>
                      <th className="p-2.5">Derivative f'(x)</th>
                      <th className="p-2.5">Function f(x)</th>
                      <th className="p-2.5">Derivative f'(x)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
                    <tr>
                      <td className="p-2.5 font-bold font-sans">sin(x)</td>
                      <td className="p-2.5 text-cyan-600 font-bold">cos(x)</td>
                      <td className="p-2.5 font-bold font-sans">csc(x)</td>
                      <td className="p-2.5 text-rose-600 font-bold">-csc(x) cot(x)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">cos(x)</td>
                      <td className="p-2.5 text-rose-600 font-bold">-sin(x)</td>
                      <td className="p-2.5 font-bold font-sans">sec(x)</td>
                      <td className="p-2.5 text-cyan-600 font-bold">sec(x) tan(x)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">tan(x)</td>
                      <td className="p-2.5 text-cyan-600 font-bold">sec²(x)</td>
                      <td className="p-2.5 font-bold font-sans">cot(x)</td>
                      <td className="p-2.5 text-rose-600 font-bold">-csc²(x)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold font-sans">eˣ</td>
                      <td className="p-2.5 font-bold text-indigo-600">eˣ</td>
                      <td className="p-2.5 font-bold font-sans">ln(x)</td>
                      <td className="p-2.5 font-bold text-indigo-600">1 / x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Power Rule Application</h4>
                <ExerciseQuestion 
                  question="Find the derivative of f(x) = 5x⁴ - 2x³ + 7x - 9."
                  options={[
                    'f\'(x) = 20x³ - 6x² + 7',
                    'f\'(x) = 20x⁴ - 6x³ + 7x',
                    'f\'(x) = 5x³ - 2x² + 7',
                    'f\'(x) = 20x³ - 6x²'
                  ]}
                  correctAnswer={0}
                  explanation="Apply Power Rule term by term: d/dx[5x⁴] = 20x³, d/dx[-2x³] = -6x², d/dx[7x] = 7, d/dx[-9] = 0. Result: f'(x) = 20x³ - 6x² + 7."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 7.3: Product and Quotient Rules */}
        <section id="subtopic-7.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>✖️</span> 7.3. Product and Quotient Rules
          </h2>

          <div className="space-y-4 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-4 font-mono text-xs md:text-sm">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-cyan-200 dark:border-cyan-800 shadow-sm space-y-2">
                <h4 className="font-bold text-cyan-900 dark:text-cyan-300 font-sans text-sm">📦 Product Rule Formula</h4>
                <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl text-center font-bold text-cyan-800 dark:text-cyan-200 text-xs">
                  (u · v)' = u' · v + u · v'
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-sm space-y-2">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 font-sans text-sm">➗ Quotient Rule Formula</h4>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center font-bold text-blue-800 dark:text-blue-200 text-xs">
                  (u / v)' = (u' · v - u · v') / v²
                </div>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 3: Product Rule Application</h4>
                <ExerciseQuestion 
                  question="Find the derivative of f(x) = x² · eˣ."
                  options={[
                    'f\'(x) = (x² + 2x) eˣ',
                    'f\'(x) = 2x eˣ',
                    'f\'(x) = x² eˣ',
                    'f\'(x) = 2x + eˣ'
                  ]}
                  correctAnswer={0}
                  explanation="Using Product Rule with u = x² and v = eˣ: u' = 2x, v' = eˣ. f'(x) = (2x)(eˣ) + (x²)(eˣ) = (x² + 2x) eˣ."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 7.4: Chain Rule & Implicit Differentiation */}
        <section id="subtopic-7.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>🔗</span> 7.4. Chain Rule & Implicit Differentiation Algorithm
          </h2>

          <div className="space-y-4 md:space-y-6">
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-cyan-900 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/50 shadow-inner">
              {"Chain Rule: d/dx [ f(g(x)) ] = f'(g(x)) · g'(x)"}
            </div>

            {/* Implicit Differentiation Algorithm Card */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <span>🛠️</span> 4-Step Implicit Differentiation Algorithm
              </h4>
              <ol className="list-decimal pl-5 text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <li><strong>Differentiate Both Sides w.r.t x:</strong> Apply derivative rules to both sides of equation <em>F(x, y) = 0</em>. Whenever differentiating terms containing <em>y</em>, multiply by <em>dy/dx</em> (Chain Rule!).</li>
                <li><strong>Collect dy/dx Terms:</strong> Move all terms containing <em>dy/dx</em> to the left side and non-dy/dx terms to the right side.</li>
                <li><strong>Factor Out dy/dx:</strong> Factor out <em>dy/dx</em> on the left side: <em>dy/dx · [ ... ] = [ ... ]</em>.</li>
                <li><strong>Isolate dy/dx:</strong> Divide by the coefficient bracket to solve for <em>dy/dx</em>.</li>
              </ol>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 4: Chain Rule Application</h4>
                <ExerciseQuestion 
                  question="Find the derivative of y = (3x² + 1)⁵."
                  options={[
                    'dy/dx = 30x (3x² + 1)⁴',
                    'dy/dx = 5 (3x² + 1)⁴',
                    'dy/dx = 6x (3x² + 1)⁵',
                    'dy/dx = 15x (3x² + 1)⁴'
                  ]}
                  correctAnswer={0}
                  explanation="Let u = 3x² + 1. Then y = u⁵. Outer derivative dy/du = 5u⁴ = 5(3x² + 1)⁴. Inner derivative du/dx = 6x. Multiply together: dy/dx = 5(3x² + 1)⁴ · (6x) = 30x (3x² + 1)⁴."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 7.5: Applications */}
        <section id="subtopic-7.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>⛰️</span> 7.5. Tangent Lines, Extreme Values & Concavity
          </h2>

          <div className="space-y-4 md:space-y-6">
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <span>📍</span> Critical Points & Extrema Checklist
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 font-mono">
                <li className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl">1. Find Critical Points where f'(x) = 0 or f'(x) is undefined</li>
                <li className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl">2. First Derivative Test: If f' changes + to -, local MAX; if - to +, local MIN</li>
                <li className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl">3. Concavity Test: f''(x) &gt; 0 ⟹ Concave Up (∪), f''(x) &lt; 0 ⟹ Concave Down (∩)</li>
              </ul>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 5: Tangent Line Equation</h4>
                <ExerciseQuestion 
                  question="Find the equation of the line tangent to y = x² - 4x + 5 at point (3, 2)."
                  options={[
                    'y = 2x - 4',
                    'y = 2x + 2',
                    'y = 3x - 7',
                    'y = 4x - 10'
                  ]}
                  correctAnswer={0}
                  explanation="Derivative f'(x) = 2x - 4. Slope at x = 3 is m = f'(3) = 2(3) - 4 = 2. Point-slope form: y - 2 = 2(x - 3) ⟹ y - 2 = 2x - 6 ⟹ y = 2x - 4."
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
                onNavigateChapter('chapter6');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 6
          </button>

          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs md:text-sm font-bold">
            ✓ Chapter 7 Complete — All Math Natural Master Chapters Finished!
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chapter7;
