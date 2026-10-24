import React, { useEffect } from "react";

interface ChapterProps {
  selectedSubtopic?: string;
}

export const Chapter1: React.FC<ChapterProps> = ({ selectedSubtopic }) => {
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
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">
                1.1
              </span>
              Relations
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              A relation is a set of ordered pairs that connects elements from one set to another. Relations help us 
              understand how different quantities are connected and form the foundation for understanding functions.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800 mb-6">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">
                Definition of a Relation
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                Let A and B be two non-empty sets. A relation R from A to B is a subset of the Cartesian product A × B.
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <p className="font-mono text-center text-lg text-blue-600 dark:text-blue-400">
                  R ⊆ A × B
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <h5 className="font-bold text-green-900 dark:text-green-300 mb-2">
                  Domain
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The set of all first elements (x-values) in the ordered pairs of a relation.
                </p>
              </div>

              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h5 className="font-bold text-purple-900 dark:text-purple-300 mb-2">
                  Range
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The set of all second elements (y-values) in the ordered pairs of a relation.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white mb-3">Example:</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Let A = {1, 2, 3} and B = {4, 5, 6}<br/>
                R = {(1,4), (2,5), (3,6)} is a relation from A to B
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-white dark:bg-slate-900 rounded">
                  <strong className="text-blue-600">Domain:</strong> {1, 2, 3}
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded">
                  <strong className="text-blue-600">Range:</strong> {4, 5, 6}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.2 */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">
                1.2
              </span>
              Functions
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              A function is a special type of relation where each element in the domain is related to exactly one 
              element in the codomain. Functions are fundamental to mathematics and model real-world relationships.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800 mb-6">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-4 text-lg">
                Definition of a Function
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                A relation f from a set A to a set B is called a function if every element of A is related to 
                <strong> exactly one</strong> element of B.
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <p className="font-mono text-center text-lg text-purple-600 dark:text-purple-400">
                  f: A → B
                </p>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Read as "f is a function from A to B"
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <h5 className="font-bold text-amber-900 dark:text-amber-300 mb-3">
                  Function Notation
                </h5>
                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="font-mono bg-white dark:bg-slate-800 px-3 py-1 rounded">f(x)</span>
                    <span>represents the value of function f at x</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono bg-white dark:bg-slate-800 px-3 py-1 rounded">y = f(x)</span>
                    <span>shows the relationship between x and y</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded">
                    <p className="mb-2"><strong>Example:</strong></p>
                    <p className="font-mono">f(x) = 2x + 3</p>
                    <p className="mt-2">f(2) = 2(2) + 3 = 7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.3 */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">
                1.3
              </span>
              Types of Functions
            </h3>
            <p className="text-slate-300 mb-8">
              Functions can be classified into different types based on their properties and behavior. Understanding 
              these classifications helps analyze and work with functions more effectively.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-blue-400 font-bold mb-3 text-lg">One-to-One (Injective)</h4>
                <p className="text-sm text-slate-300 mb-4">
                  Different elements in the domain map to different elements in the codomain.
                </p>
                <div className="bg-slate-800 rounded p-3 text-sm">
                  <p className="font-mono text-blue-300">
                    If f(x₁) = f(x₂), then x₁ = x₂
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-green-400 font-bold mb-3 text-lg">Onto (Surjective)</h4>
                <p className="text-sm text-slate-300 mb-4">
                  Every element in the codomain is the image of at least one element from the domain.
                </p>
                <div className="bg-slate-800 rounded p-3 text-sm">
                  <p className="text-green-300">
                    Range = Codomain
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-purple-400 font-bold mb-3 text-lg">Bijective</h4>
                <p className="text-sm text-slate-300 mb-4">
                  A function that is both one-to-one and onto. Has an inverse function.
                </p>
                <div className="bg-slate-800 rounded p-3 text-sm">
                  <p className="text-purple-300">
                    Injective + Surjective
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-pink-400 font-bold mb-3 text-lg">Identity Function</h4>
                <p className="text-sm text-slate-300 mb-4">
                  Maps each element to itself.
                </p>
                <div className="bg-slate-800 rounded p-3 text-sm">
                  <p className="font-mono text-pink-300">
                    I(x) = x
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-yellow-400 font-bold mb-3 text-lg">Constant Function</h4>
                <p className="text-sm text-slate-300 mb-4">
                  Maps every element to the same value.
                </p>
                <div className="bg-slate-800 rounded p-3 text-sm">
                  <p className="font-mono text-yellow-300">
                    f(x) = c (constant)
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-indigo-400 font-bold mb-3 text-lg">Polynomial Function</h4>
                <p className="text-sm text-slate-300 mb-4">
                  Sum of terms with non-negative integer powers.
                </p>
                <div className="bg-slate-800 rounded p-3 text-sm">
                  <p className="font-mono text-indigo-300">
                    f(x) = aₙxⁿ + ... + a₁x + a₀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.4 */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm">
                1.4
              </span>
              Inverse Functions
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              An inverse function reverses the operation of the original function. If f maps x to y, then the 
              inverse function f⁻¹ maps y back to x. Not all functions have inverses.
            </p>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-teal-100 dark:border-teal-800 mb-6">
              <h4 className="font-bold text-teal-900 dark:text-teal-300 mb-4">
                Conditions for Inverse Function
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                A function f has an inverse function f⁻¹ if and only if f is bijective (both one-to-one and onto).
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-5">
                <p className="font-bold text-slate-900 dark:text-white mb-3">Properties:</p>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p>• f(f⁻¹(x)) = x for all x in the range of f</p>
                  <p>• f⁻¹(f(x)) = x for all x in the domain of f</p>
                  <p>• Domain of f = Range of f⁻¹</p>
                  <p>• Range of f = Domain of f⁻¹</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white mb-4">
                Finding Inverse Functions
              </h5>
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                  <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Step 1:</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Replace f(x) with y: y = f(x)
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                  <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Step 2:</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Interchange x and y
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                  <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Step 3:</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Solve for y in terms of x
                  </p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                  <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Step 4:</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Replace y with f⁻¹(x)
                  </p>
                </div>
              </div>

              <div className="mt-5 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="font-bold text-blue-900 dark:text-blue-300 mb-3">Example:</p>
                <div className="space-y-2 font-mono text-sm text-slate-700 dark:text-slate-300">
                  <p>Given: f(x) = 2x + 3</p>
                  <p>Step 1: y = 2x + 3</p>
                  <p>Step 2: x = 2y + 3</p>
                  <p>Step 3: 2y = x - 3 → y = (x - 3)/2</p>
                  <p className="text-blue-600 dark:text-blue-400 font-bold">
                    Step 4: f⁻¹(x) = (x - 3)/2
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-6">📖 Chapter 1 Summary</h3>
          <div className="space-y-3 text-blue-50">
            <p>✓ Relations connect elements from one set to another through ordered pairs</p>
            <p>✓ Functions are special relations where each input has exactly one output</p>
            <p>✓ Functions can be classified as one-to-one, onto, bijective, and other types</p>
            <p>✓ Inverse functions exist only for bijective functions and reverse the original mapping</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
