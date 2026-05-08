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
        <span className="inline-block px-4 py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          SETS AND SET OPERATIONS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        
        {/* Section 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg flex items-center justify-center text-sm">1.1</span>
              Basic Concepts of Sets
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              A <strong>set</strong> is a well-defined collection of distinct objects, called <strong>elements</strong> or <strong>members</strong>. 
              Sets are fundamental to mathematics and are used to group objects together.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Notation</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Sets are denoted by capital letters and elements by lowercase letters.</p>
                <div className="bg-white dark:bg-slate-800 rounded p-3 font-mono text-sm">
                  A = {'{'}1, 2, 3, 4, 5{'}'}
                </div>
              </div>
              
              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Membership</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Use ∈ for "is an element of" and ∉ for "is not an element of".</p>
                <div className="bg-white dark:bg-slate-800 rounded p-3 font-mono text-sm space-y-1">
                  <div>3 ∈ A (3 is in A)</div>
                  <div>6 ∉ A (6 is not in A)</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800">
              <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-4">Ways to Describe Sets</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <strong className="text-slate-900 dark:text-white">Roster Method:</strong> List all elements
                  <div className="font-mono mt-2">B = {'{'}2, 4, 6, 8, 10{'}'}</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <strong className="text-slate-900 dark:text-white">Set-Builder Notation:</strong> Describe properties
                  <div className="font-mono mt-2">B = {'{'}x | x is an even number, 2 ≤ x ≤ 10{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.2 */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">1.2</span>
              Set Operations
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-cyan-400 font-bold mb-3 text-lg">Union (∪)</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Combines all elements from both sets (no duplicates).
                </p>
                <div className="bg-white/10 rounded p-3 text-xs space-y-1">
                  <div>A ∪ B = {'{'}x | x ∈ A or x ∈ B{'}'}</div>
                  <div className="text-cyan-300 mt-2">Example: {'{'}1,2{'}'} ∪ {'{'}2,3{'}'} = {'{'}1,2,3{'}'}</div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-blue-400 font-bold mb-3 text-lg">Intersection (∩)</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Contains only elements common to both sets.
                </p>
                <div className="bg-white/10 rounded p-3 text-xs space-y-1">
                  <div>A ∩ B = {'{'}x | x ∈ A and x ∈ B{'}'}</div>
                  <div className="text-blue-300 mt-2">Example: {'{'}1,2,3{'}'} ∩ {'{'}2,3,4{'}'} = {'{'}2,3{'}'}</div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-purple-400 font-bold mb-3 text-lg">Difference (−)</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Elements in A but not in B.
                </p>
                <div className="bg-white/10 rounded p-3 text-xs space-y-1">
                  <div>A − B = {'{'}x | x ∈ A and x ∉ B{'}'}</div>
                  <div className="text-purple-300 mt-2">Example: {'{'}1,2,3{'}'} − {'{'}2,3,4{'}'} = {'{'}1{'}'}</div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-green-400 font-bold mb-3 text-lg">Complement (A')</h4>
                <p className="text-sm text-slate-400 mb-4">
                  All elements in the universal set U but not in A.
                </p>
                <div className="bg-white/10 rounded p-3 text-xs space-y-1">
                  <div>A' = {'{'}x | x ∈ U and x ∉ A{'}'}</div>
                  <div className="text-green-300 mt-2">Also written as Aᶜ or Ā</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.3 */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg flex items-center justify-center text-sm">1.3</span>
              Venn Diagrams
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              <strong>Venn diagrams</strong> are visual representations of sets and their relationships using overlapping circles or shapes.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-100 dark:border-cyan-800 text-center">
                <div className="text-4xl mb-3">⭕</div>
                <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-2">Single Set</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">One circle represents one set within the universal set.</p>
              </div>
              
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 text-center">
                <div className="text-4xl mb-3">⭕⭕</div>
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Two Sets</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Overlapping circles show intersection and union.</p>
              </div>
              
              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800 text-center">
                <div className="text-4xl mb-3">⭕⭕⭕</div>
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Three Sets</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Shows complex relationships between multiple sets.</p>
              </div>
            </div>

            <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3">Uses of Venn Diagrams</h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>• Visualize set operations (union, intersection, difference)</li>
                <li>• Solve problems involving multiple sets</li>
                <li>• Understand logical relationships</li>
                <li>• Analyze survey data and statistics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 1.4 */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg flex items-center justify-center text-sm">1.4</span>
              Cardinality of Sets
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              The <strong>cardinality</strong> of a set is the number of elements in the set, denoted by |A| or n(A).
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Finite Sets</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">A = {'{'}1, 2, 3, 4, 5{'}'} has cardinality |A| = 5</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Empty Set</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">∅ = {'{ }'} has cardinality |∅| = 0</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Infinite Sets</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">ℕ = {'{'}1, 2, 3, ...{'}'} has infinite cardinality</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800">
              <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-4">Cardinality Formulas</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <strong>Union:</strong> <span className="font-mono ml-2">|A ∪ B| = |A| + |B| − |A ∩ B|</span>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <strong>Complement:</strong> <span className="font-mono ml-2">|A'| = |U| − |A|</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.5 */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg flex items-center justify-center text-sm">1.5</span>
              Applications of Sets
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Sets have numerous practical applications in various fields including computer science, statistics, and everyday problem-solving.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-3 flex items-center gap-2">
                  <span className="text-2xl">💻</span>
                  Computer Science
                </h4>
                <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Database queries</li>
                  <li>• Data structures</li>
                  <li>• Algorithm design</li>
                  <li>• Programming logic</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-3 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Statistics
                </h4>
                <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Survey analysis</li>
                  <li>• Probability theory</li>
                  <li>• Data classification</li>
                  <li>• Population studies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter1;
