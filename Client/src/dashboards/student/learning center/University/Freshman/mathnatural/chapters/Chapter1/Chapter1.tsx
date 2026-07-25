import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Mathematics Chapter 1 • Rigorous Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          RELATIONS AND FUNCTIONS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Functions form the cornerstone of modern analysis, linear algebra, and calculus. In this chapter, you will master the set-theoretic definition of relations, Cartesian products, equivalence relations, formal function mappings, injectivity, surjectivity, bijectivity, function algebra, composite domains, and inverse functions.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 1.1: Relations */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.1. Relations & Equivalence Relations
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Let <strong>A</strong> and <strong>B</strong> be non-empty sets. The <strong>Cartesian Product</strong> <em>A × B</em> is the set of all ordered pairs (a, b) where <em>a ∈ A</em> and <em>b ∈ B</em>:
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-blue-800 dark:text-blue-300">
              {"A × B = { (a, b) | a ∈ A ∧ b ∈ B }"}
            </div>

            {/* Formal Definition Card */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                📌 Formal Definition: Binary Relation
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                A <strong>binary relation R</strong> from set A to set B is any subset of the Cartesian product <em>A × B</em> (i.e., <strong>R ⊆ A × B</strong>). If <em>(a, b) ∈ R</em>, we write <strong>a R b</strong>.
              </p>
              <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
                  <strong>Domain of R:</strong>
                  <p className="text-blue-800 dark:text-blue-300 mt-1">{"Dom(R) = { x ∈ A | ∃ y ∈ B, (x, y) ∈ R }"}</p>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded">
                  <strong>Range of R:</strong>
                  <p className="text-indigo-800 dark:text-indigo-300 mt-1">{"Ran(R) = { y ∈ B | ∃ x ∈ A, (x, y) ∈ R }"}</p>
                </div>
              </div>
            </div>

            {/* Equivalence Relation Box */}
            <div className="p-6 border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-900/10 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                <span>⚖️</span> Equivalence Relations on a Set A
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3">
                A relation R on set A is an <strong>Equivalence Relation</strong> if and only if it satisfies three axioms for all a, b, c ∈ A:
              </p>
              <div className="space-y-2 font-mono text-xs md:text-sm text-slate-800 dark:text-slate-200">
                <p>1. <strong>Reflexive:</strong> ∀ a ∈ A, (a, a) ∈ R</p>
                <p>2. <strong>Symmetric:</strong> ∀ a, b ∈ A, (a, b) ∈ R ⟹ (b, a) ∈ R</p>
                <p>3. <strong>Transitive:</strong> ∀ a, b, c ∈ A, [ (a, b) ∈ R ∧ (b, c) ∈ R ] ⟹ (a, c) ∈ R</p>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Domain and Range of a Relation</h4>
                <ExerciseQuestion 
                  question="Let A = {1, 2, 3} and B = {4, 5}. If relation R = {(1,4), (2,5), (3,4)}, what is the Domain and Range of R?"
                  options={[
                    'Dom(R) = {1, 2, 3}, Ran(R) = {4, 5}',
                    'Dom(R) = {4, 5}, Ran(R) = {1, 2, 3}',
                    'Dom(R) = {1, 2}, Ran(R) = {4}',
                    'Dom(R) = {1, 2, 3, 4, 5}, Ran(R) = ∅'
                  ]}
                  correctAnswer={0}
                  explanation="The first coordinates form Dom(R) = {1, 2, 3}. The second coordinates form Ran(R) = {4, 5}."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.2: Functions */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.2. Functions & Function Mappings
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>function (mapping) f</strong> from set A to set B, denoted <strong>f: A → B</strong>, is a relation that assigns to <em>each</em> element x ∈ A <strong>exactly one</strong> element y ∈ B:
            </p>

            {/* Formal Quantifier Card */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                🏛️ Formal Logic Definition of a Function
              </h3>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-sm md:text-base font-bold text-slate-900 dark:text-white inline-block mb-3">
                {"∀ x ∈ A, ∃! y ∈ B such that f(x) = y"}
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                <strong>A</strong> is the <strong>Domain</strong>, <strong>B</strong> is the <strong>Codomain</strong>, and the set of actual outputs <strong>{"Ran(f) = { f(x) | x ∈ A } ⊆ B"}</strong> is the <strong>Range</strong>.
              </p>
            </div>

            {/* VISUAL DIAGRAM 1: Vertical Line Test & Arrow Mapping */}
            <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>🎯</span> Visual Diagram 1: Arrow Mapping vs. Vertical Line Test
              </h4>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Arrow Mapping */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-center">
                  <svg className="w-64 h-48" viewBox="0 0 250 180">
                    {/* Domain Oval A */}
                    <ellipse cx="60" cy="90" rx="35" ry="60" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
                    <text x="60" y="22" fontSize="12" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">Domain A</text>
                    <circle cx="60" cy="55" r="4" fill="#1d4ed8" /><text x="45" y="58" fontSize="10" fontWeight="bold">x₁</text>
                    <circle cx="60" cy="90" r="4" fill="#1d4ed8" /><text x="45" y="93" fontSize="10" fontWeight="bold">x₂</text>
                    <circle cx="60" cy="125" r="4" fill="#1d4ed8" /><text x="45" y="128" fontSize="10" fontWeight="bold">x₃</text>

                    {/* Codomain Oval B */}
                    <ellipse cx="190" cy="90" rx="35" ry="60" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
                    <text x="190" y="22" fontSize="12" fontWeight="bold" fill="#15803d" textAnchor="middle">Codomain B</text>
                    <circle cx="190" cy="65" r="4" fill="#15803d" /><text x="202" y="68" fontSize="10" fontWeight="bold">y₁</text>
                    <circle cx="190" cy="115" r="4" fill="#15803d" /><text x="202" y="118" fontSize="10" fontWeight="bold">y₂</text>

                    {/* Mapping Arrows */}
                    <line x1="64" y1="55" x2="184" y2="65" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="64" y1="90" x2="184" y2="65" stroke="#3b82f6" strokeWidth="2" />
                    <line x1="64" y1="125" x2="184" y2="115" stroke="#3b82f6" strokeWidth="2" />
                  </svg>
                </div>

                {/* Vertical Line Test Explanation */}
                <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  <h5 className="font-bold text-slate-900 dark:text-white text-base">The Vertical Line Test</h5>
                  <p>A curve in the xy-plane represents the graph of a function y = f(x) if and only if <strong>no vertical line intersects the curve more than once</strong>.</p>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded font-mono text-xs text-blue-800 dark:text-blue-300">
                    • Circle x² + y² = 1: Fails VLT ❌ (Not a function)
                    <br/>
                    • Parabola y = x²: Passes VLT ✅ (Valid function)
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Finding Domain of Radical Function</h4>
                <ExerciseQuestion 
                  question="What is the maximal real domain of the function f(x) = √(9 - x²)?"
                  options={[
                    '(-∞, ∞)',
                    '[-3, 3]',
                    '[0, 3]',
                    '(-∞, -3] ∪ [3, ∞)'
                  ]}
                  correctAnswer={1}
                  explanation="Under a square root, the expression must be non-negative: 9 - x² ≥ 0 -> x² ≤ 9 -> -3 ≤ x ≤ 3. Thus Dom(f) = [-3, 3]."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.3: Types of Functions */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.3. Types of Functions (Injective, Surjective, Bijective, Even/Odd)
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Functions are classified according to how domain elements map to codomain elements and their algebraic symmetry:
            </p>

            {/* Classification Grid */}
            <div className="grid md:grid-cols-3 gap-4 font-mono text-xs md:text-sm">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <span className="font-bold text-blue-900 dark:text-blue-300 block text-sm font-sans mb-1">1. One-to-One (Injective)</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans mb-2">Distinct inputs yield distinct outputs. Passes Horizontal Line Test.</p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded text-blue-700 dark:text-blue-300 font-bold">
                  f(x₁) = f(x₂) ⟹ x₁ = x₂
                </div>
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-900 dark:text-indigo-300 block text-sm font-sans mb-1">2. Onto (Surjective)</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans mb-2">Range equals Codomain. Every output is hit by at least one input.</p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded text-indigo-700 dark:text-indigo-300 font-bold">
                  Ran(f) = Codomain B
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
                <span className="font-bold text-purple-900 dark:text-purple-300 block text-sm font-sans mb-1">3. Bijective</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans mb-2">Both Injective and Surjective. Perfect 1-to-1 matching.</p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded text-purple-700 dark:text-purple-300 font-bold">
                  Injective ∧ Surjective
                </div>
              </div>
            </div>

            {/* Even and Odd Symmetry Box */}
            <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                <span>🔄</span> Algebraic Symmetry: Even vs. Odd Functions
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl space-y-2">
                  <h5 className="font-bold text-blue-900 dark:text-blue-300">Even Function: f(-x) = f(x)</h5>
                  <p className="text-slate-600 dark:text-slate-300 font-sans">Symmetric about the <strong>y-axis</strong> (e.g. f(x) = x², cos x).</p>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl space-y-2">
                  <h5 className="font-bold text-indigo-900 dark:text-indigo-300">Odd Function: f(-x) = -f(x)</h5>
                  <p className="text-slate-600 dark:text-slate-300 font-sans">Symmetric about the <strong>origin (0,0)</strong> (e.g. f(x) = x³, sin x).</p>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Testing Injectivity</h4>
                <ExerciseQuestion 
                  question="Which of the following functions defined from ℝ to ℝ is ONE-TO-ONE (Injective)?"
                  options={[
                    'f(x) = x²',
                    'f(x) = |x|',
                    'f(x) = 3x - 5',
                    'f(x) = cos(x)'
                  ]}
                  correctAnswer={2}
                  explanation="f(x) = 3x - 5 is a linear function with non-zero slope. If 3x1 - 5 = 3x2 - 5, then 3x1 = 3x2 -> x1 = x2. It passes the horizontal line test."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.4: Composition of Functions */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.4. Composition of Functions & Composite Domains
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Given functions <strong>g: A → B</strong> and <strong>f: B → C</strong>, the <strong>composite function f ∘ g</strong> (read "f composed with g") is defined by:
            </p>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded-2xl text-center space-y-2 font-mono">
              <div className="text-base md:text-xl font-bold text-blue-800 dark:text-blue-300">
                (f ∘ g)(x) = f(g(x))
              </div>
              <p className="text-xs font-sans text-slate-600 dark:text-slate-300">
                Apply g to x first, then apply f to the resulting value g(x).
              </p>
            </div>

            {/* Composite Domain Rule Box */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-blue-700 dark:text-blue-400 text-base mb-2">
                📌 Maximal Domain of Composite Function f ∘ g
              </h4>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-xs md:text-sm text-slate-900 dark:text-white font-bold mb-2">
                {"Dom(f ∘ g) = { x ∈ Dom(g) | g(x) ∈ Dom(f) }"}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Note: Function composition is associative <strong>(f ∘ g) ∘ h = f ∘ (g ∘ h)</strong>, but generally NOT commutative <strong>f ∘ g ≠ g ∘ f</strong>!
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Evaluating Composite Function</h4>
                <ExerciseQuestion 
                  question="Let f(x) = x² + 1 and g(x) = 2x - 3. What is the value of (f ∘ g)(4)?"
                  options={[
                    '10',
                    '26',
                    '27',
                    '50'
                  ]}
                  correctAnswer={1}
                  explanation="g(4) = 2(4) - 3 = 8 - 3 = 5. Then (f ∘ g)(4) = f(g(4)) = f(5) = 5² + 1 = 25 + 1 = 26."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.5: Inverse Functions */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-blue-600 pl-2 md:pl-4">
            1.5. Inverse Functions & Reflection Symmetry
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              An <strong>inverse function f⁻¹</strong> reverses the assignment of f. If f(x) = y, then f⁻¹(y) = x:
            </p>

            {/* Theorem of Invertibility Card */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">
                🏛️ Theorem: Existence of Inverse Function
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                A function f: A → B possesses a unique inverse f⁻¹: B → A if and only if <strong>f is BIJECTIVE</strong> (one-to-one and onto).
              </p>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-xs md:text-sm text-blue-800 dark:text-blue-300 font-bold inline-block">
                f(f⁻¹(x)) = x  ∧  f⁻¹(f(x)) = x
              </div>
            </div>

            {/* VISUAL DIAGRAM 2: Graph Reflection over y = x */}
            <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>🪞</span> Visual Diagram 2: Inverse Function Reflection Across Line y = x
              </h4>

              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-72 h-60" viewBox="0 0 240 200">
                  {/* Axes */}
                  <line x1="20" y1="180" x2="220" y2="180" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="20" y1="180" x2="20" y2="20" stroke="#94a3b8" strokeWidth="2" />

                  {/* Identity Line y = x */}
                  <line x1="20" y1="180" x2="200" y2="20" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />
                  <text x="180" y="35" fontSize="11" fontWeight="bold" fill="#94a3b8">y = x</text>

                  {/* Original Function y = f(x) = x³ curve */}
                  <path d="M 20 180 Q 120 160 200 60" fill="none" stroke="#2563eb" strokeWidth="3" />
                  <text x="190" y="50" fontSize="11" fontWeight="bold" fill="#2563eb">y = f(x)</text>

                  {/* Inverse Function y = f⁻¹(x) reflected curve */}
                  <path d="M 20 180 Q 40 80 140 20" fill="none" stroke="#9333ea" strokeWidth="3" />
                  <text x="145" y="15" fontSize="11" fontWeight="bold" fill="#9333ea">y = f⁻¹(x)</text>
                </svg>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Finding Algebraic Inverse</h4>
                <ExerciseQuestion 
                  question="What is the inverse function of f(x) = (2x + 1) / (x - 3) for x ≠ 3?"
                  options={[
                    'f⁻¹(x) = (3x + 1) / (x - 2)',
                    'f⁻¹(x) = (x - 3) / (2x + 1)',
                    'f⁻¹(x) = (2x - 3) / (x + 1)',
                    'f⁻¹(x) = (x + 3) / 2'
                  ]}
                  correctAnswer={0}
                  explanation="Set y = (2x + 1)/(x - 3) -> y(x - 3) = 2x + 1 -> yx - 3y = 2x + 1 -> yx - 2x = 3y + 1 -> x(y - 2) = 3y + 1 -> x = (3y + 1)/(y - 2). Swap variables: f⁻¹(x) = (3x + 1)/(x - 2)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Mathematics Chapter 1 Master Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Cartesian Product & Relations:</strong> A × B = {"{(a,b) | a ∈ A ∧ b ∈ B}"}. Relation R ⊆ A × B. Equivalence relations are reflexive, symmetric, and transitive.</p>
            <p><strong>✓ Functions:</strong> Mapping f: A → B assigns unique output for every input (passes Vertical Line Test).</p>
            <p><strong>✓ Function Classifications:</strong> Injective (1-to-1), Surjective (onto), Bijective (both). Even f(-x) = f(x) (y-axis symmetry), Odd f(-x) = -f(x) (origin symmetry).</p>
            <p><strong>✓ Composition:</strong> (f ∘ g)(x) = f(g(x)). Dom(f ∘ g) = {"{x ∈ Dom(g) | g(x) ∈ Dom(f)}"}.</p>
            <p><strong>✓ Inverse Functions:</strong> Unique f⁻¹ exists if and only if f is bijective. Graph of f⁻¹ is reflection of f across y = x.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            disabled
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-800 text-slate-400 rounded-lg font-medium text-sm md:text-base cursor-not-allowed"
          >
            ❮ Previous
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 2
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter1;
