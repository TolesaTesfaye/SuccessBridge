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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Mathematics for Social Sciences Chapter 2 • Advanced Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          RELATIONS AND FUNCTIONS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-cyan-600 to-blue-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Explore the mathematical foundations of relationships between data points. Master Cartesian products, relations, functions, function types, and inverse functions—essential tools for modeling real-world phenomena in economics, sociology, and statistics.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">

        
        {/* SUBTOPIC 2.1: Cartesian Product */}
        <section id="subtopic-2.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4">
            2.1. Cartesian Product
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              The <strong>Cartesian Product</strong> is a fundamental operation that combines two sets to create ordered pairs. It's named after René Descartes and forms the basis for coordinate systems and relations.
            </p>

            {/* Formal Definition Card */}
            <div className="p-6 border-2 border-cyan-300 dark:border-cyan-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-2">
                📌 Formal Definition: Cartesian Product
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                Given two sets A and B, the <strong>Cartesian product A × B</strong> is the set of all ordered pairs (a, b) where a ∈ A and b ∈ B.
              </p>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl font-mono text-center text-sm font-bold text-cyan-800 dark:text-cyan-300">
                A × B = {'{'}(a, b) | a ∈ A and b ∈ B{'}'}
              </div>
            </div>

            {/* Visual Example */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">Example:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="font-mono">A = {'{'}1, 2, 3{'}'}</p>
                    <p className="font-mono">B = {'{'}x, y{'}'}</p>
                  </div>
                  <div className="bg-cyan-100 dark:bg-cyan-900/40 rounded-lg p-3">
                    <p className="font-semibold text-cyan-900 dark:text-cyan-300 mb-2">A × B =</p>
                    <p className="font-mono text-xs">{'{'}(1,x), (1,y), (2,x), (2,y), (3,x), (3,y){'}'}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-cyan-200 dark:border-cyan-800 flex flex-col justify-center">
                <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-4 text-center">Visual Representation</h4>
                <svg className="w-full h-48" viewBox="0 0 300 180">
                  {/* Grid representation */}
                  <text x="20" y="40" fontSize="14" fontWeight="bold" fill="#0891b2">Set B</text>
                  <text x="20" y="60" fontSize="12" fill="#06b6d4">y</text>
                  <text x="20" y="120" fontSize="12" fill="#06b6d4">x</text>
                  
                  <text x="140" y="160" fontSize="14" fontWeight="bold" fill="#0891b2">Set A</text>
                  <text x="80" y="175" fontSize="12" fill="#06b6d4">1</text>
                  <text x="150" y="175" fontSize="12" fill="#06b6d4">2</text>
                  <text x="220" y="175" fontSize="12" fill="#06b6d4">3</text>

                  {/* Points */}
                  <circle cx="80" cy="60" r="5" fill="#3b82f6" />
                  <circle cx="80" cy="120" r="5" fill="#3b82f6" />
                  <circle cx="150" cy="60" r="5" fill="#3b82f6" />
                  <circle cx="150" cy="120" r="5" fill="#3b82f6" />
                  <circle cx="220" cy="60" r="5" fill="#3b82f6" />
                  <circle cx="220" cy="120" r="5" fill="#3b82f6" />

                  {/* Labels */}
                  <text x="85" y="55" fontSize="9" fill="#1e40af">(1,y)</text>
                  <text x="85" y="115" fontSize="9" fill="#1e40af">(1,x)</text>
                  <text x="155" y="55" fontSize="9" fill="#1e40af">(2,y)</text>
                  <text x="155" y="115" fontSize="9" fill="#1e40af">(2,x)</text>
                  <text x="225" y="55" fontSize="9" fill="#1e40af">(3,y)</text>
                  <text x="225" y="115" fontSize="9" fill="#1e40af">(3,x)</text>
                </svg>
              </div>
            </div>

            {/* Properties Box */}
            <div className="p-6 border border-blue-200 dark:border-blue-900 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 text-base mb-4">⚡ Important Properties of Cartesian Product</h4>
              <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-red-700 dark:text-red-300">Not Commutative:</strong>
                  <p className="font-mono mt-2 text-slate-700 dark:text-slate-300">A × B ≠ B × A</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">(unless A = B)</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-green-700 dark:text-green-300">Cardinality:</strong>
                  <p className="font-mono mt-2 text-slate-700 dark:text-slate-300">|A × B| = |A| · |B|</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Product of set sizes</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-purple-700 dark:text-purple-300">With Empty Set:</strong>
                  <p className="font-mono mt-2 text-slate-700 dark:text-slate-300">A × ∅ = ∅</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Always empty</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-blue-700 dark:text-blue-300">Order Matters:</strong>
                  <p className="font-mono mt-2 text-slate-700 dark:text-slate-300">(a, b) ≠ (b, a)</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">unless a = b</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 2.1 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Cartesian Product</h4>
                <ExerciseQuestion 
                  question="If A = {a, b} and B = {1, 2, 3}, what is |A × B|?"
                  options={[
                    '5',
                    '6',
                    '9',
                    '12'
                  ]}
                  correctAnswer={1}
                  explanation="The cardinality of a Cartesian product is |A × B| = |A| · |B| = 2 · 3 = 6. The product contains (a,1), (a,2), (a,3), (b,1), (b,2), (b,3)."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 2.2: Relations */}
        <section id="subtopic-2.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4">
            2.2. Relations
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>relation</strong> describes how elements from two sets are connected. Relations are fundamental in modeling relationships in databases, social networks, and economic models.
            </p>

            {/* Formal Definition Card */}
            <div className="p-6 border-2 border-cyan-300 dark:border-cyan-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-2">
                📌 Formal Definition: Relation
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                A <strong>relation R from set A to set B</strong> is any subset of the Cartesian product A × B. If (a, b) ∈ R, we write <strong>a R b</strong>.
              </p>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl font-mono text-center text-sm font-bold text-cyan-800 dark:text-cyan-300">
                R ⊆ A × B
              </div>
            </div>

            {/* Terminology Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <span className="text-2xl">📥</span> Domain
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Set of all first elements in ordered pairs of R
                </p>
                <div className="bg-white dark:bg-slate-800 rounded p-2 font-mono text-xs">
                  Dom(R) = {'{'}a | ∃b, (a,b) ∈ R{'}'}
                </div>
              </div>

              <div className="p-5 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2 flex items-center gap-2">
                  <span className="text-2xl">📤</span> Range
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Set of all second elements in ordered pairs of R
                </p>
                <div className="bg-white dark:bg-slate-800 rounded p-2 font-mono text-xs">
                  Ran(R) = {'{'}b | ∃a, (a,b) ∈ R{'}'}
                </div>
              </div>

              <div className="p-5 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
                <h4 className="font-bold text-green-900 dark:text-green-300 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎯</span> Co-domain
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  The set B (Range ⊆ Co-domain)
                </p>
                <div className="bg-white dark:bg-slate-800 rounded p-2 text-xs text-center">
                  Set B in R: A → B
                </div>
              </div>
            </div>

            {/* Visual Mapping Diagram */}
            <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <span>🔗</span> Example: Relation Between Students and Courses
              </h4>
              <div className="flex justify-center mb-4">
                <svg className="w-full max-w-md h-48" viewBox="0 0 350 180">
                  {/* Domain Set */}
                  <ellipse cx="80" cy="90" rx="50" ry="75" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                  <text x="80" y="25" fontSize="12" fontWeight="bold" fill="#1e40af" textAnchor="middle">Students</text>
                  <text x="50" y="60" fontSize="11" fill="#1e3a8a">Alice</text>
                  <text x="50" y="90" fontSize="11" fill="#1e3a8a">Bob</text>
                  <text x="50" y="120" fontSize="11" fill="#1e3a8a">Carol</text>

                  {/* Co-domain Set */}
                  <ellipse cx="270" cy="90" rx="50" ry="75" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                  <text x="270" y="25" fontSize="12" fontWeight="bold" fill="#15803d" textAnchor="middle">Courses</text>
                  <text x="245" y="60" fontSize="11" fill="#14532d">Math</text>
                  <text x="235" y="90" fontSize="11" fill="#14532d">English</text>
                  <text x="230" y="120" fontSize="11" fill="#14532d">Economics</text>

                  {/* Arrows showing relation */}
                  <line x1="110" y1="60" x2="235" y2="60" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="110" y1="60" x2="240" y2="90" stroke="#06b6d4" strokeWidth="2" />
                  <line x1="110" y1="90" x2="235" y2="60" stroke="#06b6d4" strokeWidth="2" />
                  <line x1="110" y1="120" x2="230" y2="120" stroke="#06b6d4" strokeWidth="2" />
                  
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 text-sm">
                <p className="font-mono mb-2">R = {'{'}(Alice, Math), (Alice, English), (Bob, Math), (Carol, Economics){'}'}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Domain: {'{'}Alice, Bob, Carol{'}'} | Range: {'{'}Math, English, Economics{'}'}</p>
              </div>
            </div>

            {/* Practice Exercise for 2.2 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Relations</h4>
                <ExerciseQuestion 
                  question="Given R = {(1, a), (2, b), (3, a), (4, c)} as a relation from A to B. What is the range of R?"
                  options={[
                    '{1, 2, 3, 4}',
                    '{a, b, c}',
                    '{(1,a), (2,b)}',
                    '{1, 2, a, b, c}'
                  ]}
                  correctAnswer={1}
                  explanation="The range of a relation is the set of all second elements (y-values) in the ordered pairs. From the pairs (1,a), (2,b), (3,a), (4,c), the second elements are a, b, a, c. Removing duplicates, Range = {a, b, c}."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 2.3: Functions */}
        <section id="subtopic-2.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4">
            2.3. Functions
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>function</strong> is a special type of relation where each element in the domain is paired with exactly one element in the co-domain. Functions are the backbone of mathematical modeling in economics, statistics, and data science.
            </p>

            {/* Formal Definition Card */}
            <div className="p-6 border-2 border-cyan-300 dark:border-cyan-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-3">
                📌 Formal Definition: Function
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                A function f from set A to set B, denoted <strong>f: A → B</strong>, is a relation where every element in A is related to <strong>exactly one</strong> element in B.
              </p>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl font-mono text-center text-base font-bold text-cyan-800 dark:text-cyan-300 mb-3">
                ∀x ∈ A, ∃! y ∈ B such that f(x) = y
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 text-xs text-slate-700 dark:text-slate-300">
                <strong>Key Rule:</strong> One input → One output (but multiple inputs can map to the same output)
              </div>
            </div>

            {/* Function vs Non-Function */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-300 dark:border-green-800">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">✅</span>
                  <h4 className="font-bold text-green-900 dark:text-green-300">This IS a Function</h4>
                </div>
                <svg className="w-full h-32 mb-3" viewBox="0 0 200 120">
                  <ellipse cx="50" cy="60" rx="30" ry="45" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                  <ellipse cx="150" cy="60" rx="30" ry="45" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                  
                  <circle cx="50" cy="40" r="3" fill="#15803d" />
                  <circle cx="50" cy="60" r="3" fill="#15803d" />
                  <circle cx="50" cy="80" r="3" fill="#15803d" />
                  
                  <circle cx="150" cy="45" r="3" fill="#15803d" />
                  <circle cx="150" cy="75" r="3" fill="#15803d" />
                  
                  <line x1="53" y1="40" x2="147" y2="45" stroke="#22c55e" strokeWidth="2" />
                  <line x1="53" y1="60" x2="147" y2="45" stroke="#22c55e" strokeWidth="2" />
                  <line x1="53" y1="80" x2="147" y2="75" stroke="#22c55e" strokeWidth="2" />
                </svg>
                <p className="text-xs text-slate-700 dark:text-slate-300">Each input has exactly ONE output</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-red-300 dark:border-red-800">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">❌</span>
                  <h4 className="font-bold text-red-900 dark:text-red-300">This is NOT a Function</h4>
                </div>
                <svg className="w-full h-32 mb-3" viewBox="0 0 200 120">
                  <ellipse cx="50" cy="60" rx="30" ry="45" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                  <ellipse cx="150" cy="60" rx="30" ry="45" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                  
                  <circle cx="50" cy="40" r="3" fill="#991b1b" />
                  <circle cx="50" cy="60" r="3" fill="#991b1b" />
                  <circle cx="50" cy="80" r="3" fill="#991b1b" />
                  
                  <circle cx="150" cy="40" r="3" fill="#991b1b" />
                  <circle cx="150" cy="60" r="3" fill="#991b1b" />
                  <circle cx="150" cy="80" r="3" fill="#991b1b" />
                  
                  <line x1="53" y1="60" x2="147" y2="40" stroke="#ef4444" strokeWidth="2" />
                  <line x1="53" y1="60" x2="147" y2="80" stroke="#ef4444" strokeWidth="2" />
                </svg>
                <p className="text-xs text-slate-700 dark:text-slate-300">One input maps to TWO outputs ❌</p>
              </div>
            </div>

            {/* Vertical Line Test */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-blue-700 dark:text-blue-400 text-base mb-3 flex items-center gap-2">
                <span>📏</span> The Vertical Line Test
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-4">
                A graph represents a function if and only if <strong>no vertical line intersects the graph more than once</strong>.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p className="font-mono text-sm mb-2 text-green-800 dark:text-green-300">✓ f(x) = x²</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Passes VLT - IS a function</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <p className="font-mono text-sm mb-2 text-red-800 dark:text-red-300">✗ x² + y² = 1</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Fails VLT - NOT a function</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 2.3 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Functions</h4>
                <ExerciseQuestion 
                  question="Which of the following relations is a function? A = {1, 2, 3}, B = {a, b, c}"
                  options={[
                    'R₁ = {(1, a), (1, b), (2, c)}',
                    'R₂ = {(1, a), (2, a), (3, a)}',
                    'R₃ = {(1, a), (2, b)}',
                    'R₄ = {(1, a), (2, b), (2, c)}'
                  ]}
                  correctAnswer={1}
                  explanation="R₂ = {(1,a), (2,a), (3,a)} is a function because each input (1, 2, 3) maps to exactly ONE output, even though multiple inputs map to the same output 'a'. R₁ and R₄ fail because one input maps to multiple outputs. R₃ is technically a function but not from A to B since 3 is not mapped."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 2.4: Types of Functions */}
        <section id="subtopic-2.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4">
            2.4. Types of Functions
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Functions can be classified based on how elements from the domain map to the co-domain. Understanding these types is crucial for analyzing data relationships and model properties.
            </p>

            {/* One-to-One (Injective) */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400">One-to-One (Injective) Function</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Different inputs → Different outputs</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Definition:</h4>
                  <div className="font-mono text-sm text-center bg-white dark:bg-slate-800 rounded p-3">
                    If f(x₁) = f(x₂), then x₁ = x₂
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    No two different inputs produce the same output
                  </p>
                </div>
                
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center">
                  <svg className="w-48 h-32" viewBox="0 0 200 120">
                    <ellipse cx="50" cy="60" rx="30" ry="45" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                    <ellipse cx="150" cy="60" rx="30" ry="45" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                    
                    <circle cx="50" cy="35" r="3" fill="#1e40af" /><text x="35" y="38" fontSize="10">a</text>
                    <circle cx="50" cy="60" r="3" fill="#1e40af" /><text x="35" y="63" fontSize="10">b</text>
                    <circle cx="50" cy="85" r="3" fill="#1e40af" /><text x="35" y="88" fontSize="10">c</text>
                    
                    <circle cx="150" cy="35" r="3" fill="#1e40af" /><text x="165" y="38" fontSize="10">1</text>
                    <circle cx="150" cy="60" r="3" fill="#1e40af" /><text x="165" y="63" fontSize="10">2</text>
                    <circle cx="150" cy="85" r="3" fill="#1e40af" /><text x="165" y="88" fontSize="10">3</text>
                    
                    <line x1="53" y1="35" x2="147" y2="35" stroke="#3b82f6" strokeWidth="2" />
                    <line x1="53" y1="60" x2="147" y2="60" stroke="#3b82f6" strokeWidth="2" />
                    <line x1="53" y1="85" x2="147" y2="85" stroke="#3b82f6" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-blue-100 dark:bg-blue-900/40 rounded-lg p-3">
                <p className="text-sm"><strong>Examples:</strong> f(x) = 2x + 1, f(x) = x³, f(x) = eˣ</p>
                <p className="text-sm"><strong>Test:</strong> Horizontal Line Test - no horizontal line intersects graph more than once</p>
              </div>
            </div>

            {/* Onto (Surjective) */}
            <div className="p-6 border-2 border-purple-300 dark:border-purple-800 rounded-2xl bg-white dark:bg-slate-900 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400">Onto (Surjective) Function</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Every output is "hit" by at least one input</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                  <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Definition:</h4>
                  <div className="font-mono text-sm text-center bg-white dark:bg-slate-800 rounded p-3">
                    Range(f) = Co-domain
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    Every element in B is f(x) for some x in A
                  </p>
                </div>
                
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center">
                  <svg className="w-48 h-32" viewBox="0 0 200 120">
                    <ellipse cx="50" cy="60" rx="30" ry="50" fill="#fae8ff" stroke="#a855f7" strokeWidth="2" />
                    <ellipse cx="150" cy="60" rx="30" ry="40" fill="#fae8ff" stroke="#a855f7" strokeWidth="2" />
                    
                    <circle cx="50" cy="30" r="3" fill="#7e22ce" />
                    <circle cx="50" cy="50" r="3" fill="#7e22ce" />
                    <circle cx="50" cy="70" r="3" fill="#7e22ce" />
                    <circle cx="50" cy="90" r="3" fill="#7e22ce" />
                    
                    <circle cx="150" cy="45" r="3" fill="#7e22ce" />
                    <circle cx="150" cy="65" r="3" fill="#7e22ce" />
                    <circle cx="150" cy="85" r="3" fill="#7e22ce" />
                    
                    <line x1="53" y1="30" x2="147" y2="45" stroke="#a855f7" strokeWidth="2" />
                    <line x1="53" y1="50" x2="147" y2="65" stroke="#a855f7" strokeWidth="2" />
                    <line x1="53" y1="70" x2="147" y2="65" stroke="#a855f7" strokeWidth="2" />
                    <line x1="53" y1="90" x2="147" y2="85" stroke="#a855f7" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-3">
                <p className="text-sm"><strong>Key:</strong> All outputs are covered (no unused outputs in co-domain)</p>
              </div>
            </div>

            {/* Bijective */}
            <div className="p-6 border-2 border-green-300 dark:border-green-800 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⭐</span>
                <div>
                  <h3 className="text-lg font-bold text-green-700 dark:text-green-400">Bijective Function (One-to-One AND Onto)</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Perfect pairing: Both injective AND surjective</p>
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl mb-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  A bijective function creates a perfect one-to-one correspondence between domain and co-domain. This means the function has an inverse!
                </p>
                <div className="flex justify-center">
                  <svg className="w-48 h-32" viewBox="0 0 200 120">
                    <ellipse cx="50" cy="60" rx="30" ry="45" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                    <ellipse cx="150" cy="60" rx="30" ry="45" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                    
                    <circle cx="50" cy="35" r="3" fill="#15803d" />
                    <circle cx="50" cy="60" r="3" fill="#15803d" />
                    <circle cx="50" cy="85" r="3" fill="#15803d" />
                    
                    <circle cx="150" cy="35" r="3" fill="#15803d" />
                    <circle cx="150" cy="60" r="3" fill="#15803d" />
                    <circle cx="150" cy="85" r="3" fill="#15803d" />
                    
                    <line x1="53" y1="35" x2="147" y2="35" stroke="#22c55e" strokeWidth="2" />
                    <line x1="53" y1="60" x2="147" y2="60" stroke="#22c55e" strokeWidth="2" />
                    <line x1="53" y1="85" x2="147" y2="85" stroke="#22c55e" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-green-100 dark:bg-green-900/40 rounded-lg p-3">
                <p className="text-sm font-bold text-green-900 dark:text-green-300">
                  ✓ Each input → unique output (one-to-one)<br/>
                  ✓ Every output is used (onto)<br/>
                  ✓ Has an inverse function
                </p>
              </div>
            </div>

            {/* Practice Exercise for 2.4 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Types of Functions</h4>
                <ExerciseQuestion 
                  question="Which type of function guarantees the existence of an inverse function?"
                  options={[
                    'Injective (One-to-One)',
                    'Surjective (Onto)',
                    'Bijective (One-to-One and Onto)',
                    'None of the above'
                  ]}
                  correctAnswer={2}
                  explanation="A function has an inverse if and only if it is BIJECTIVE (both one-to-one and onto). Being only injective or only surjective is not sufficient. The bijective property ensures each output comes from exactly one input (one-to-one) and all outputs are covered (onto), allowing perfect reversal."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 2.5: Inverse Functions */}
        <section id="subtopic-2.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4">
            2.5. Inverse Functions
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              An <strong>inverse function</strong> "reverses" the original function. If f maps x to y, then f⁻¹ maps y back to x. Inverse functions are crucial in solving equations and modeling reversible processes in economics and science.
            </p>

            {/* Formal Definition Card */}
            <div className="p-6 border-2 border-cyan-300 dark:border-cyan-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-2">
                📌 Definition: Inverse Function
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                If f: A → B is a bijective function, then the <strong>inverse function f⁻¹: B → A</strong> satisfies:
              </p>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl font-mono text-center text-base font-bold text-cyan-800 dark:text-cyan-300">
                f(f⁻¹(x)) = x  and  f⁻¹(f(x)) = x
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 text-center">
                The composition of a function and its inverse is the identity function
              </p>
            </div>

            {/* Existence Condition */}
            <div className="p-6 border-2 border-amber-300 dark:border-amber-800 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 text-base mb-3 flex items-center gap-2">
                <span>⚠️</span> Important: When Does an Inverse Exist?
              </h4>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  A function f has an inverse if and only if f is <strong className="text-amber-700 dark:text-amber-300">BIJECTIVE</strong> (one-to-one and onto).
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <strong className="text-green-700 dark:text-green-300">✓ Has Inverse:</strong>
                    <p className="mt-1">f(x) = 2x + 3</p>
                    <p className="text-green-600 dark:text-green-400">f⁻¹(x) = (x - 3)/2</p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                    <strong className="text-red-700 dark:text-red-300">✗ No Inverse:</strong>
                    <p className="mt-1">f(x) = x² (not one-to-one)</p>
                    <p className="text-red-600 dark:text-red-400">Multiple inputs → same output</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Finding Inverse - Step by Step */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-blue-700 dark:text-blue-400 text-base mb-4 flex items-center gap-2">
                <span>📝</span> Steps to Find an Inverse Function
              </h4>
              
              <div className="space-y-3">
                {[
                  { num: 1, title: 'Replace f(x) with y', desc: 'Write the function as y = f(x)', example: 'y = 3x - 5' },
                  { num: 2, title: 'Swap x and y', desc: 'Exchange the roles of x and y', example: 'x = 3y - 5' },
                  { num: 3, title: 'Solve for y', desc: 'Isolate y on one side', example: 'x + 5 = 3y → y = (x + 5)/3' },
                  { num: 4, title: 'Replace y with f⁻¹(x)', desc: 'Write the inverse function', example: 'f⁻¹(x) = (x + 5)/3' }
                ].map((step) => (
                  <div key={step.num} className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm">{step.title}</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{step.desc}</p>
                      <div className="font-mono text-xs bg-white dark:bg-slate-800 rounded p-2 text-blue-700 dark:text-blue-300">
                        {step.example}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Worked Example */}
            <div className="p-6 border-2 border-green-300 dark:border-green-800 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <h4 className="font-bold text-green-700 dark:text-green-400 text-base mb-4">💡 Complete Example</h4>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 space-y-3 text-sm">
                <div>
                  <strong className="text-slate-900 dark:text-white">Given:</strong>
                  <span className="font-mono ml-2">f(x) = (2x + 1)/(x - 3), x ≠ 3</span>
                </div>
                <div className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  <p><strong>Step 1:</strong> Let y = (2x + 1)/(x - 3)</p>
                  <p><strong>Step 2:</strong> Swap: x = (2y + 1)/(y - 3)</p>
                  <p><strong>Step 3:</strong> Solve for y:</p>
                  <div className="ml-4 space-y-1 font-mono text-xs">
                    <p>x(y - 3) = 2y + 1</p>
                    <p>xy - 3x = 2y + 1</p>
                    <p>xy - 2y = 3x + 1</p>
                    <p>y(x - 2) = 3x + 1</p>
                    <p>y = (3x + 1)/(x - 2)</p>
                  </div>
                  <div className="pt-3 border-t border-green-200 dark:border-green-800">
                    <strong className="text-green-700 dark:text-green-300">Therefore:</strong>
                    <span className="font-mono ml-2 text-green-800 dark:text-green-400">f⁻¹(x) = (3x + 1)/(x - 2), x ≠ 2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties of Inverse Functions */}
            <div className="p-6 border border-purple-200 dark:border-purple-900 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 text-base mb-4">🔄 Properties of Inverse Functions</h4>
              <ul className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Domain/Range Swap:</strong> Domain of f⁻¹ = Range of f, Range of f⁻¹ = Domain of f</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Graph Symmetry:</strong> The graphs of f and f⁻¹ are reflections across the line y = x</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Composition:</strong> f(f⁻¹(x)) = x and f⁻¹(f(x)) = x for all x in appropriate domains</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Inverse of Inverse:</strong> (f⁻¹)⁻¹ = f</span>
                </li>
              </ul>
            </div>

            {/* Practice Exercise for 2.5 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Inverse Functions</h4>
                <ExerciseQuestion 
                  question="If f(x) = 4x - 7, what is f⁻¹(x)?"
                  options={[
                    'f⁻¹(x) = (x + 7)/4',
                    'f⁻¹(x) = (x - 7)/4',
                    'f⁻¹(x) = 4x + 7',
                    'f⁻¹(x) = x/4 + 7'
                  ]}
                  correctAnswer={0}
                  explanation="To find f⁻¹(x): Let y = 4x - 7, swap to get x = 4y - 7, solve for y: x + 7 = 4y → y = (x + 7)/4. Therefore f⁻¹(x) = (x + 7)/4. We can verify: f(f⁻¹(x)) = f((x+7)/4) = 4((x+7)/4) - 7 = x + 7 - 7 = x ✓"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter1');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
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
            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors font-medium"
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
