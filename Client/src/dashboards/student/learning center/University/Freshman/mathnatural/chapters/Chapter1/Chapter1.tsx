import React, { useEffect } from 'react';

interface Chapter1Props {
  selectedSubtopic?: string;
}

const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic }) => {
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
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          RELATIONS AND FUNCTIONS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        
        {/* Section 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">1.1</span>
              Relations
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              A <strong>relation</strong> is a connection or association between elements of two sets. 
              It describes how elements from one set are related to elements of another set.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-6">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">Definition</h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                Let A and B be two non-empty sets. A relation R from A to B is a subset of the Cartesian product A × B.
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 font-mono text-sm">
                R ⊆ A × B
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Domain</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">The set of all first elements in the ordered pairs of a relation.</p>
                <div className="mt-3 text-xs font-mono bg-white dark:bg-slate-800 p-2 rounded">
                  Dom(R) = {'{'}x | (x,y) ∈ R{'}'}
                </div>
              </div>
              
              <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Range</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">The set of all second elements in the ordered pairs of a relation.</p>
                <div className="mt-3 text-xs font-mono bg-white dark:bg-slate-800 p-2 rounded">
                  Range(R) = {'{'}y | (x,y) ∈ R{'}'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.2 */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">1.2</span>
              Functions
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              A <strong>function</strong> is a special type of relation where each element in the domain is related to exactly one element in the codomain.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 mb-6">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3">Key Property</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                For a relation to be a function: <strong>Every input has exactly ONE output</strong>
              </p>
              <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-4 font-mono text-sm">
                f: A → B means f is a function from A to B
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-2xl">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Function Example</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">f(x) = 2x + 1 is a function because each x value produces exactly one y value.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-2xl">
                  ✗
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Not a Function</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">x² + y² = 1 is not a function because one x can produce two y values.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.3 */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">1.3</span>
              Types of Functions
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-blue-400 font-bold mb-3 text-lg">One-to-One (Injective)</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Different inputs produce different outputs. No two elements in the domain map to the same element in the codomain.
                </p>
                <div className="bg-white/10 rounded p-3 text-xs">
                  If f(x₁) = f(x₂), then x₁ = x₂
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-green-400 font-bold mb-3 text-lg">Onto (Surjective)</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Every element in the codomain is mapped by at least one element from the domain.
                </p>
                <div className="bg-white/10 rounded p-3 text-xs">
                  For every y ∈ B, ∃ x ∈ A such that f(x) = y
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-purple-400 font-bold mb-3 text-lg">Bijective</h4>
                <p className="text-sm text-slate-400 mb-4">
                  A function that is both one-to-one and onto. Perfect pairing between domain and codomain.
                </p>
                <div className="bg-white/10 rounded p-3 text-xs">
                  Injective + Surjective = Bijective
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-amber-400 font-bold mb-3 text-lg">Identity Function</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Maps every element to itself. The output equals the input.
                </p>
                <div className="bg-white/10 rounded p-3 text-xs">
                  I(x) = x for all x
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.4 */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">1.4</span>
              Composition of Functions
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              The <strong>composition</strong> of two functions combines them by applying one function to the result of another.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-6">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-4">Notation</h4>
              <div className="space-y-3">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Composition of f and g:</p>
                  <div className="font-mono text-lg">(f ∘ g)(x) = f(g(x))</div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Read as "f composed with g" - Apply g first, then apply f to the result.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Example</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 dark:text-slate-400">Let</span>
                  <code className="bg-white dark:bg-slate-900 px-3 py-1 rounded">f(x) = 2x + 1</code>
                  <span className="text-slate-600 dark:text-slate-400">and</span>
                  <code className="bg-white dark:bg-slate-900 px-3 py-1 rounded">g(x) = x²</code>
                </div>
                <div className="pl-4 border-l-4 border-blue-500 space-y-2">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Then </span>
                    <code className="bg-white dark:bg-slate-900 px-3 py-1 rounded">(f ∘ g)(x) = f(g(x)) = f(x²) = 2x² + 1</code>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">And </span>
                    <code className="bg-white dark:bg-slate-900 px-3 py-1 rounded">(g ∘ f)(x) = g(f(x)) = g(2x + 1) = (2x + 1)²</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.5 */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">1.5</span>
              Inverse Functions
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              An <strong>inverse function</strong> reverses the operation of the original function. 
              If f maps x to y, then f⁻¹ maps y back to x.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 mb-6">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3">Existence Condition</h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                A function has an inverse if and only if it is <strong>bijective</strong> (both one-to-one and onto).
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-2">
                <div className="font-mono text-sm">f(f⁻¹(x)) = x</div>
                <div className="font-mono text-sm">f⁻¹(f(x)) = x</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">Finding Inverse</h4>
                <ol className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li><strong>1.</strong> Replace f(x) with y</li>
                  <li><strong>2.</strong> Swap x and y</li>
                  <li><strong>3.</strong> Solve for y</li>
                  <li><strong>4.</strong> Replace y with f⁻¹(x)</li>
                </ol>
              </div>
              
              <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <h4 className="font-bold text-green-900 dark:text-green-300 mb-3">Example</h4>
                <div className="text-sm space-y-2">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded">
                    <div className="font-mono">f(x) = 2x + 3</div>
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Inverse:</div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded">
                    <div className="font-mono">f⁻¹(x) = (x - 3)/2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter1;
