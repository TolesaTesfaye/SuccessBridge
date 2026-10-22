import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../../Freshman/components/ExerciseQuestion';

interface Chapter1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
      <div className="relative mb-6 md:mb-12 px-0 md:px-8 py-4 md:py-8">
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Chapter 1 • 12 Hours
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          SOLVING EQUATIONS AND INEQUALITIES
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Master the art of solving equations! From simple linear equations to complex systems, learn the techniques that will help you solve real-world problems - from budgeting to engineering.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* Why This Matters Box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600 p-3 md:p-6 rounded-r-lg">
          <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
            <span className="text-lg md:text-2xl">🎯</span>
            Why Equations Matter in Real Life
          </h3>
          <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
            <p>
              <strong>Real Talk:</strong> Every time you split a restaurant bill, calculate a loan payment, or figure out when two buses will meet, 
              you're solving equations! This chapter gives you the power to solve any problem that has an unknown value.
            </p>
            <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
              💡 <strong>Mind-Blowing Fact:</strong> Engineers use equations to design bridges, doctors use them to calculate medicine dosages, 
              and NASA scientists use them to send rockets to Mars!
            </p>
          </div>
        </div>

        {/* SUBTOPIC 1.1: Equations involving exponents and radicals */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.1. Equations Involving Exponents and Radicals
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            {/* Key Concepts Box */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🔑</span>
                Key Concepts
              </h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li><strong>Exponent:</strong> A number that shows how many times to multiply the base by itself (e.g., x² = x × x)</li>
                <li><strong>Radical (Root):</strong> The opposite of an exponent (e.g., √x means "what number squared gives x?")</li>
                <li><strong>Power Rule:</strong> When solving equations with exponents, take the opposite root of both sides</li>
                <li><strong>Root Rule:</strong> When solving equations with roots, raise both sides to the opposite power</li>
              </ul>
            </div>

            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Equations with <strong className="text-blue-600 dark:text-blue-400">exponents</strong> and <strong className="text-blue-600 dark:text-blue-400">radicals</strong> (roots) 
              appear everywhere - from calculating compound interest to determining the speed of a falling object!
            </p>

            {/* Exponent Rules Review */}
            <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                📚 Quick Review: Exponent Rules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-base">
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="font-bold text-blue-600 dark:text-blue-400">Product Rule:</p>
                  <p className="font-mono">x^m × x^n = x^(m+n)</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Example: x² × x³ = x⁵</p>
                </div>
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="font-bold text-blue-600 dark:text-blue-400">Quotient Rule:</p>
                  <p className="font-mono">x^m ÷ x^n = x^(m-n)</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Example: x⁵ ÷ x² = x³</p>
                </div>
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="font-bold text-blue-600 dark:text-blue-400">Power Rule:</p>
                  <p className="font-mono">(x^m)^n = x^(m×n)</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Example: (x²)³ = x⁶</p>
                </div>
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="font-bold text-blue-600 dark:text-blue-400">Zero Exponent:</p>
                  <p className="font-mono">x^0 = 1</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Example: 5^0 = 1</p>
                </div>
              </div>
            </div>

            {/* Solving Exponential Equations */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🧮</span>
                Solving Equations with Exponents
              </h3>
              <div className="space-y-3 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p className="font-bold">Strategy: Isolate the power, then take the appropriate root</p>
                
                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded">
                  <p className="font-bold text-green-600 dark:text-green-400 mb-2">Example 1: Solve x² = 25</p>
                  <div className="space-y-1 font-mono text-xs md:text-sm">
                    <p><strong>Step 1:</strong> The exponent is 2, so take the square root of both sides</p>
                    <p className="ml-4">√(x²) = ±√25</p>
                    <p className="ml-4">x = ±5</p>
                    <p className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded font-normal">
                      ✅ <strong>Answer:</strong> x = 5 or x = -5<br/>
                      <span className="text-[10px] md:text-xs">Why ±? Because both 5² = 25 and (-5)² = 25</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded">
                  <p className="font-bold text-green-600 dark:text-green-400 mb-2">Example 2: Solve x³ = 8</p>
                  <div className="space-y-1 font-mono text-xs md:text-sm">
                    <p><strong>Step 1:</strong> The exponent is 3, so take the cube root of both sides</p>
                    <p className="ml-4">∛(x³) = ∛8</p>
                    <p className="ml-4">x = 2</p>
                    <p className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded font-normal">
                      ✅ <strong>Answer:</strong> x = 2<br/>
                      <span className="text-[10px] md:text-xs">Check: 2³ = 2 × 2 × 2 = 8 ✓</span>
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded">
                  <p className="font-bold text-green-600 dark:text-green-400 mb-2">Example 3: Solve 2x² + 5 = 55</p>
                  <div className="space-y-1 font-mono text-xs md:text-sm">
                    <p><strong>Step 1:</strong> Isolate x²</p>
                    <p className="ml-4">2x² = 55 - 5</p>
                    <p className="ml-4">2x² = 50</p>
                    <p className="ml-4">x² = 25</p>
                    <p><strong>Step 2:</strong> Take square root</p>
                    <p className="ml-4">x = ±√25</p>
                    <p className="ml-4">x = ±5</p>
                    <p className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded font-normal">
                      ✅ <strong>Answer:</strong> x = 5 or x = -5
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real World Example */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-purple-900 dark:text-purple-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">💰</span>
                Real-World Example: Compound Interest
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Problem:</strong> You invest 10,000 Birr at 10% annual interest. How many years will it take to double your money?
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">Using the compound interest formula: A = P(1 + r)^t</p>
                  <div className="space-y-1 text-xs md:text-sm">
                    <p>• A = final amount = 20,000 Birr (double)</p>
                    <p>• P = principal = 10,000 Birr</p>
                    <p>• r = rate = 0.10 (10%)</p>
                    <p>• t = time (years) = ?</p>
                    <div className="mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded font-mono">
                      <p>20,000 = 10,000(1.1)^t</p>
                      <p>2 = (1.1)^t</p>
                      <p>Take log: t = log(2) / log(1.1)</p>
                      <p className="font-bold text-purple-600">t ≈ 7.3 years</p>
                    </div>
                    <p className="mt-2 text-purple-700 dark:text-purple-300">
                      💡 Your money will double in about 7 years and 4 months!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solving Radical Equations */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-l-4 border-orange-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-orange-900 dark:text-orange-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">√</span>
                Solving Equations with Radicals (Roots)
              </h3>
              <div className="space-y-3 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p className="font-bold">Strategy: Isolate the radical, then raise both sides to the appropriate power</p>
                
                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded">
                  <p className="font-bold text-orange-600 dark:text-orange-400 mb-2">Example 1: Solve √x = 5</p>
                  <div className="space-y-1 font-mono text-xs md:text-sm">
                    <p><strong>Step 1:</strong> Square both sides (to eliminate the square root)</p>
                    <p className="ml-4">(√x)² = 5²</p>
                    <p className="ml-4">x = 25</p>
                    <p><strong>Step 2:</strong> Check your answer!</p>
                    <p className="ml-4">√25 = 5 ✓</p>
                    <p className="mt-2 p-2 bg-orange-100 dark:bg-orange-900/30 rounded font-normal">
                      ✅ <strong>Answer:</strong> x = 25
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded">
                  <p className="font-bold text-orange-600 dark:text-orange-400 mb-2">Example 2: Solve √(x + 3) = 4</p>
                  <div className="space-y-1 font-mono text-xs md:text-sm">
                    <p><strong>Step 1:</strong> Square both sides</p>
                    <p className="ml-4">(√(x + 3))² = 4²</p>
                    <p className="ml-4">x + 3 = 16</p>
                    <p><strong>Step 2:</strong> Solve for x</p>
                    <p className="ml-4">x = 16 - 3</p>
                    <p className="ml-4">x = 13</p>
                    <p><strong>Step 3:</strong> Check</p>
                    <p className="ml-4">√(13 + 3) = √16 = 4 ✓</p>
                    <p className="mt-2 p-2 bg-orange-100 dark:bg-orange-900/30 rounded font-normal">
                      ✅ <strong>Answer:</strong> x = 13
                    </p>
                  </div>
                </div>

                <div className="p-2 md:p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                  <p className="font-bold text-red-600 dark:text-red-400 text-xs md:text-sm">⚠️ Warning: Always Check Your Answer!</p>
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400 mt-1">
                    When you square both sides, you might introduce extra solutions that don't work. Always substitute back into the original equation!
                  </p>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="Solve: x² = 49"
              options={[
                'x = 7',
                'x = -7',
                'x = ±7',
                'x = 49'
              ]}
              correctAnswer={2}
              explanation="When solving x² = 49, take the square root of both sides: √(x²) = ±√49. This gives x = ±7 because both 7² = 49 and (-7)² = 49."
            />

            <ExerciseQuestion
              question="Solve: √x = 8"
              options={[
                'x = 8',
                'x = 4',
                'x = 64',
                'x = 16'
              ]}
              correctAnswer={2}
              explanation="Square both sides: (√x)² = 8². This gives x = 64. Check: √64 = 8 ✓"
            />

            <ExerciseQuestion
              question="Solve: 3x² = 27"
              options={[
                'x = 9',
                'x = 3',
                'x = ±3',
                'x = ±9'
              ]}
              correctAnswer={2}
              explanation="First divide both sides by 3: x² = 9. Then take square root: x = ±√9 = ±3. Check: 3(3)² = 3(9) = 27 ✓ and 3(-3)² = 3(9) = 27 ✓"
            />

            <ExerciseQuestion
              question="Solve: ∛x = 2"
              options={[
                'x = 2',
                'x = 4',
                'x = 6',
                'x = 8'
              ]}
              correctAnswer={3}
              explanation="Cube both sides: (∛x)³ = 2³. This gives x = 8. Check: ∛8 = 2 ✓"
            />
          </div>
        </section>

        {/* SUBTOPIC 1.2: System of linear equations in two variables */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.2. System of Linear Equations in Two Variables
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            {/* Key Concepts */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🔑</span>
                Key Concepts
              </h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li><strong>System of Equations:</strong> Two or more equations with the same variables</li>
                <li><strong>Solution:</strong> Values of x and y that satisfy ALL equations simultaneously</li>
                <li><strong>Three Methods:</strong> Graphing, Substitution, and Elimination</li>
                <li><strong>Consistent System:</strong> Has at least one solution</li>
                <li><strong>Inconsistent System:</strong> No solution (parallel lines)</li>
                <li><strong>Dependent System:</strong> Infinitely many solutions (same line)</li>
              </ul>
            </div>

            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong className="text-blue-600 dark:text-blue-400">system of linear equations</strong> involves finding values that work for multiple equations at once. 
              Think of it like finding where two paths cross!
            </p>

            {/* Real World Example - Introduction */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🛒</span>
                Real-World Example: Shopping Problem
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Scenario:</strong> You buy 3 notebooks and 2 pens for 45 Birr. Your friend buys 2 notebooks and 4 pens for 50 Birr. 
                  How much does each item cost?
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">Setting up the system:</p>
                  <p>Let x = price of one notebook</p>
                  <p>Let y = price of one pen</p>
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded font-mono">
                    <p className="font-bold text-green-600">Equation 1: 3x + 2y = 45</p>
                    <p className="font-bold text-green-600">Equation 2: 2x + 4y = 50</p>
                  </div>
                  <p className="mt-2 text-xs md:text-sm">We'll solve this using three different methods!</p>
                </div>
              </div>
            </div>

            {/* Method 1: Substitution */}
            <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🔄</span>
                Method 1: Substitution Method
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p className="font-bold">Strategy: Solve one equation for one variable, then substitute into the other equation</p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                  <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">Example: Solve the shopping problem</p>
                  <div className="space-y-1 text-xs md:text-sm">
                    <p className="font-mono">3x + 2y = 45 ... (1)</p>
                    <p className="font-mono">2x + 4y = 50 ... (2)</p>
                    
                    <p className="font-bold mt-3">Step 1: Solve equation (2) for x</p>
                    <p className="ml-4 font-mono">2x = 50 - 4y</p>
                    <p className="ml-4 font-mono">x = 25 - 2y</p>
                    
                    <p className="font-bold mt-2">Step 2: Substitute into equation (1)</p>
                    <p className="ml-4 font-mono">3(25 - 2y) + 2y = 45</p>
                    <p className="ml-4 font-mono">75 - 6y + 2y = 45</p>
                    <p className="ml-4 font-mono">75 - 4y = 45</p>
                    <p className="ml-4 font-mono">-4y = -30</p>
                    <p className="ml-4 font-mono font-bold text-blue-600">y = 7.5 Birr</p>
                    
                    <p className="font-bold mt-2">Step 3: Find x</p>
                    <p className="ml-4 font-mono">x = 25 - 2(7.5)</p>
                    <p className="ml-4 font-mono">x = 25 - 15</p>
                    <p className="ml-4 font-mono font-bold text-blue-600">x = 10 Birr</p>
                    
                    <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 rounded">
                      <p className="font-bold">✅ Answer: Notebook = 10 Birr, Pen = 7.5 Birr</p>
                      <p className="text-[10px] md:text-xs mt-1">Check: 3(10) + 2(7.5) = 30 + 15 = 45 ✓ and 2(10) + 4(7.5) = 20 + 30 = 50 ✓</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Method 2: Elimination */}
            <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-3xl">➕➖</span>
                Method 2: Elimination Method
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p className="font-bold">Strategy: Add or subtract equations to eliminate one variable</p>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400 mb-2">Example: Same shopping problem, different method!</p>
                  <div className="space-y-1 text-xs md:text-sm">
                    <p className="font-mono">3x + 2y = 45 ... (1)</p>
                    <p className="font-mono">2x + 4y = 50 ... (2)</p>
                    
                    <p className="font-bold mt-3">Step 1: Multiply equation (1) by 2 to match y coefficients</p>
                    <p className="ml-4 font-mono">6x + 4y = 90 ... (1')</p>
                    <p className="ml-4 font-mono">2x + 4y = 50 ... (2)</p>
                    
                    <p className="font-bold mt-2">Step 2: Subtract equation (2) from (1')</p>
                    <p className="ml-4 font-mono">(6x + 4y) - (2x + 4y) = 90 - 50</p>
                    <p className="ml-4 font-mono">4x = 40</p>
                    <p className="ml-4 font-mono font-bold text-purple-600">x = 10 Birr</p>
                    
                    <p className="font-bold mt-2">Step 3: Substitute back into equation (1)</p>
                    <p className="ml-4 font-mono">3(10) + 2y = 45</p>
                    <p className="ml-4 font-mono">30 + 2y = 45</p>
                    <p className="ml-4 font-mono">2y = 15</p>
                    <p className="ml-4 font-mono font-bold text-purple-600">y = 7.5 Birr</p>
                    
                    <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 rounded">
                      <p className="font-bold">✅ Same Answer: Notebook = 10 Birr, Pen = 7.5 Birr</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Method 3: Graphing (Concept) */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-l-4 border-pink-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-pink-900 dark:text-pink-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">📊</span>
                Method 3: Graphing Method (Visual Approach)
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p className="font-bold">Strategy: Graph both lines and find where they intersect</p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="mb-2">Each equation represents a line on a graph. The solution is where the lines cross!</p>
                  <pre className="text-[10px] md:text-sm font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded overflow-x-auto">
{`
  y-axis
    |
 15 |     Line 1: 3x + 2y = 45
    |    /
 10 |   /  
    |  /    Line 2: 2x + 4y = 50
  7.5|--✕--- Solution: (10, 7.5)
    | /  \\
  5 |/____\\___
    |      \\  
  0 +------------ x-axis
    0  5  10  15
    
  The lines intersect at (10, 7.5)
  This is our solution!
`}
                  </pre>
                  <p className="text-xs md:text-sm text-pink-700 dark:text-pink-300 mt-2">
                    💡 Graphing is great for visualizing, but substitution and elimination are usually more accurate!
                  </p>
                </div>
              </div>
            </div>

            {/* Special Cases */}
            <div className="p-3 md:p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">
                🎯 Special Cases: When Things Get Weird!
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-base text-red-600 dark:text-red-400">
                    Case 1: No Solution (Parallel Lines)
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-mono">
                    x + y = 5<br/>
                    x + y = 10
                  </p>
                  <p className="text-[10px] md:text-sm mt-1">These lines never cross! No solution exists. (Same slope, different intercepts)</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-base text-green-600 dark:text-green-400">
                    Case 2: Infinitely Many Solutions (Same Line)
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-mono">
                    2x + 4y = 10<br/>
                    x + 2y = 5 (multiply by 2 gives first equation!)
                  </p>
                  <p className="text-[10px] md:text-sm mt-1">These are the same line! Every point on the line is a solution.</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-base text-blue-600 dark:text-blue-400">
                    Case 3: One Solution (Lines Cross)
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1 font-mono">
                    x + y = 5<br/>
                    x - y = 1
                  </p>
                  <p className="text-[10px] md:text-sm mt-1">Lines cross at exactly one point: (3, 2). This is the most common case!</p>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="Solve the system: x + y = 10 and x - y = 2"
              options={[
                'x = 6, y = 4',
                'x = 5, y = 5',
                'x = 7, y = 3',
                'x = 4, y = 6'
              ]}
              correctAnswer={0}
              explanation="Add the equations: (x + y) + (x - y) = 10 + 2, which gives 2x = 12, so x = 6. Then substitute: 6 + y = 10, so y = 4. Check: 6 + 4 = 10 ✓ and 6 - 4 = 2 ✓"
            />

            <ExerciseQuestion
              question="How many solutions does this system have? x + 2y = 5 and 2x + 4y = 10"
              options={[
                'No solution',
                'One solution',
                'Two solutions',
                'Infinitely many solutions'
              ]}
              correctAnswer={3}
              explanation="The second equation is just the first equation multiplied by 2. They represent the same line, so every point on the line is a solution. This gives infinitely many solutions!"
            />

            <ExerciseQuestion
              question="Which method would be easiest for: 3x + y = 7 and y = 2x - 3?"
              options={[
                'Graphing',
                'Substitution (y is already isolated!)',
                'Elimination',
                'All methods are equally easy'
              ]}
              correctAnswer={1}
              explanation="Substitution is easiest because y is already isolated in the second equation! Just substitute '2x - 3' for y in the first equation: 3x + (2x - 3) = 7."
            />
          </div>
        </section>

        {/* Chapter Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 p-4 md:p-8 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold text-blue-900 dark:text-blue-100 mb-3 md:mb-4 flex items-center gap-2">
            <span className="text-xl md:text-3xl">🎯</span>
            Chapter 1 Summary (Sections 1.1-1.2)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg">
              <h3 className="font-bold text-sm md:text-base text-blue-600 dark:text-blue-400 mb-2">✅ What You Learned:</h3>
              <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Solving exponential equations (x² = 25)</li>
                <li>• Solving radical equations (√x = 5)</li>
                <li>• Three methods for systems: Substitution, Elimination, Graphing</li>
                <li>• Identifying special cases (no solution, infinite solutions)</li>
                <li>• Real-world applications (shopping, interest)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg">
              <h3 className="font-bold text-sm md:text-base text-indigo-600 dark:text-indigo-400 mb-2">🔑 Key Strategies:</h3>
              <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• For x^n, take nth root of both sides</li>
                <li>• For √x, square both sides (and check!)</li>
                <li>• Substitution: when one variable is isolated</li>
                <li>• Elimination: when coefficients line up nicely</li>
                <li>• Always verify your solutions!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Motivational Closing */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 text-white p-4 md:p-8 rounded-lg text-center">
          <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">
            🌟 You're Making Great Progress! 🌟
          </h3>
          <p className="text-xs md:text-lg">
            Equations are the foundation of all mathematics! Keep practicing these techniques - they'll serve you in every math course ahead. 
            More sections coming soon! 📚✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
