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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Mathematics for Social Sciences Chapter 1 • Comprehensive Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          SETS AND SET OPERATIONS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-cyan-600 to-blue-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Sets are the foundational building blocks of modern mathematics and essential for understanding data analysis, statistics, and probability in social sciences. Master set theory, operations, Venn diagrams, cardinality principles, and real-world applications.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 1.1: Basic Concepts of Sets */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4">
            1.1. Basic Concepts of Sets
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>set</strong> is a well-defined collection of distinct objects, considered as an object in its own right. The objects that make up a set are called its <strong>elements</strong> or <strong>members</strong>.
            </p>

            {/* Formal Definition Card */}
            <div className="p-6 border-2 border-cyan-300 dark:border-cyan-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-2">
                📌 Formal Definition: Set
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                A set is a collection of distinct objects with the property that given any object, we can determine whether or not it belongs to the set. Sets are typically denoted by <strong>capital letters</strong> (A, B, C...) and elements by <strong>lowercase letters</strong> (a, b, c...).
              </p>
              <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded">
                  <strong>Membership Notation:</strong>
                  <p className="text-cyan-800 dark:text-cyan-300 mt-1">x ∈ A (x is an element of A)</p>
                  <p className="text-cyan-800 dark:text-cyan-300">x ∉ A (x is not an element of A)</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
                  <strong>Example:</strong>
                  <p className="text-blue-800 dark:text-blue-300 mt-1">A = {'{'}1, 2, 3, 4, 5{'}'}</p>
                  <p className="text-blue-800 dark:text-blue-300">3 ∈ A, but 7 ∉ A</p>
                </div>
              </div>
            </div>


            {/* Ways to Describe Sets */}
            <div className="p-6 border border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                <span>✍️</span> Three Ways to Describe Sets
              </h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl border border-cyan-200 dark:border-cyan-800">
                  <span className="font-bold text-cyan-900 dark:text-cyan-300 block text-sm mb-2">1. Roster Method (Listing)</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">List all elements explicitly between braces.</p>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-cyan-700 dark:text-cyan-300">
                    B = {'{'}2, 4, 6, 8, 10{'}'}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                  <span className="font-bold text-blue-900 dark:text-blue-300 block text-sm mb-2">2. Set-Builder Notation</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">Describe elements by their properties using a condition.</p>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-blue-700 dark:text-blue-300">
                    B = {'{'}x | x is an even integer, 2 ≤ x ≤ 10{'}'}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
                  <span className="font-bold text-purple-900 dark:text-purple-300 block text-sm mb-2">3. Verbal Description</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">Describe the set in words.</p>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded text-xs text-purple-700 dark:text-purple-300">
                    B = The set of all positive even integers less than or equal to 10
                  </div>
                </div>
              </div>
            </div>


            {/* Special Sets Box */}
            <div className="p-6 border-2 border-cyan-200 dark:border-cyan-900 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
              <h4 className="font-bold text-cyan-900 dark:text-cyan-300 text-base mb-4">🌟 Important Special Sets</h4>
              <div className="grid md:grid-cols-2 gap-3 text-xs md:text-sm">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-slate-900 dark:text-white">Empty Set (∅ or {'{ }'})</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">A set with no elements</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-slate-900 dark:text-white">Universal Set (U)</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Contains all elements under consideration</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-slate-900 dark:text-white">Natural Numbers (ℕ)</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{'{'} 1, 2, 3, 4, ... {'}'}</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                  <strong className="text-slate-900 dark:text-white">Integers (ℤ)</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{'{'} ..., -2, -1, 0, 1, 2, ... {'}'}</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.1 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Set Notation</h4>
                <ExerciseQuestion 
                  question="Which of the following correctly represents the set of all odd integers between 1 and 10?"
                  options={[
                    '{1, 3, 5, 7, 9}',
                    '{1, 2, 3, 5, 7, 9}',
                    '{2, 4, 6, 8, 10}',
                    '{0, 1, 3, 5, 7, 9, 11}'
                  ]}
                  correctAnswer={0}
                  explanation="The set {1, 3, 5, 7, 9} contains exactly the odd integers between 1 and 10. Option B includes 2 (which is even), Option C contains only even numbers, and Option D includes 0 and 11 which are outside the range."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.2: Set Operations */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4">
            1.2. Set Operations
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Just as numbers can be combined using arithmetic operations, sets can be combined using <strong>set operations</strong> to create new sets. The four fundamental operations are union, intersection, difference, and complement.
            </p>

            {/* Union Operation */}
            <div className="p-6 border-2 border-cyan-300 dark:border-cyan-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-3 flex items-center gap-2">
                <span className="text-2xl">∪</span> Union of Sets
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                The <strong>union</strong> of sets A and B, denoted <strong>A ∪ B</strong>, is the set containing all elements that are in A, in B, or in both.
              </p>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl font-mono text-center text-sm font-bold text-cyan-800 dark:text-cyan-300 mb-4">
                A ∪ B = {'{'}x | x ∈ A or x ∈ B{'}'}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Example:</h4>
                  <div className="text-xs space-y-1 font-mono">
                    <p>A = {'{'}1, 2, 3, 4{'}'}</p>
                    <p>B = {'{'}3, 4, 5, 6{'}'}</p>
                    <p className="text-blue-700 dark:text-blue-300 font-bold pt-2">A ∪ B = {'{'}1, 2, 3, 4, 5, 6{'}'}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center">
                  <svg className="w-48 h-32" viewBox="0 0 200 120">
                    <circle cx="65" cy="60" r="40" fill="#67e8f9" fillOpacity="0.5" stroke="#06b6d4" strokeWidth="2" />
                    <circle cx="135" cy="60" r="40" fill="#67e8f9" fillOpacity="0.5" stroke="#06b6d4" strokeWidth="2" />
                    <text x="50" y="35" fontSize="14" fontWeight="bold" fill="#0891b2">A</text>
                    <text x="145" y="35" fontSize="14" fontWeight="bold" fill="#0891b2">B</text>
                    <text x="95" y="65" fontSize="10" fill="#164e63" textAnchor="middle">A ∪ B</text>
                  </svg>
                </div>
              </div>
            </div>


            {/* Intersection Operation */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
                <span className="text-2xl">∩</span> Intersection of Sets
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                The <strong>intersection</strong> of sets A and B, denoted <strong>A ∩ B</strong>, is the set containing all elements that are in both A and B.
              </p>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl font-mono text-center text-sm font-bold text-blue-800 dark:text-blue-300 mb-4">
                A ∩ B = {'{'}x | x ∈ A and x ∈ B{'}'}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Example:</h4>
                  <div className="text-xs space-y-1 font-mono">
                    <p>A = {'{'}1, 2, 3, 4{'}'}</p>
                    <p>B = {'{'}3, 4, 5, 6{'}'}</p>
                    <p className="text-indigo-700 dark:text-indigo-300 font-bold pt-2">A ∩ B = {'{'}3, 4{'}'}</p>
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center">
                  <svg className="w-48 h-32" viewBox="0 0 200 120">
                    <circle cx="65" cy="60" r="40" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="135" cy="60" r="40" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    <ellipse cx="100" cy="60" rx="20" ry="40" fill="#60a5fa" fillOpacity="0.6" />
                    <text x="45" y="35" fontSize="14" fontWeight="bold" fill="#1d4ed8">A</text>
                    <text x="145" y="35" fontSize="14" fontWeight="bold" fill="#1d4ed8">B</text>
                    <text x="100" y="65" fontSize="10" fill="#1e3a8a" textAnchor="middle">A ∩ B</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Difference and Complement */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 border-2 border-purple-300 dark:border-purple-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
                <h3 className="text-base font-bold text-purple-700 dark:text-purple-400 mb-3 flex items-center gap-2">
                  <span className="text-xl">−</span> Set Difference
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 mb-3">
                  <strong>A − B</strong> contains elements in A but not in B.
                </p>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded font-mono text-xs text-center mb-3">
                  A − B = {'{'}x | x ∈ A and x ∉ B{'}'}
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded text-xs font-mono">
                  <p>If A = {'{'}1,2,3,4{'}'}, B = {'{'}3,4,5,6{'}'}</p>
                  <p className="text-purple-700 dark:text-purple-300 font-bold mt-1">A − B = {'{'}1, 2{'}'}</p>
                </div>
              </div>

              <div className="p-6 border-2 border-green-300 dark:border-green-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
                <h3 className="text-base font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                  <span className="text-xl">′</span> Complement
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 mb-3">
                  <strong>A′</strong> contains all elements in U but not in A.
                </p>
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded font-mono text-xs text-center mb-3">
                  A′ = {'{'}x | x ∈ U and x ∉ A{'}'}
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded text-xs font-mono">
                  <p>If U = {'{'}1,2,3,4,5,6{'}'}, A = {'{'}1,2,3{'}'}</p>
                  <p className="text-green-700 dark:text-green-300 font-bold mt-1">A′ = {'{'}4, 5, 6{'}'}</p>
                </div>
              </div>
            </div>


            {/* Properties of Set Operations */}
            <div className="p-6 border border-cyan-200 dark:border-cyan-900 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
              <h4 className="font-bold text-cyan-900 dark:text-cyan-300 text-base mb-4">⚡ Important Properties</h4>
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <strong className="text-cyan-700 dark:text-cyan-300">Commutative:</strong>
                    <p className="font-mono mt-1">A ∪ B = B ∪ A</p>
                    <p className="font-mono">A ∩ B = B ∩ A</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <strong className="text-blue-700 dark:text-blue-300">Associative:</strong>
                    <p className="font-mono mt-1">(A ∪ B) ∪ C = A ∪ (B ∪ C)</p>
                    <p className="font-mono">(A ∩ B) ∩ C = A ∩ (B ∩ C)</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <strong className="text-purple-700 dark:text-purple-300">Distributive:</strong>
                    <p className="font-mono mt-1">A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)</p>
                    <p className="font-mono">A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <strong className="text-green-700 dark:text-green-300">De Morgan's Laws:</strong>
                    <p className="font-mono mt-1">(A ∪ B)′ = A′ ∩ B′</p>
                    <p className="font-mono">(A ∩ B)′ = A′ ∪ B′</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.2 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Set Operations</h4>
                <ExerciseQuestion 
                  question="Given A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}, what is A ∩ B?"
                  options={[
                    '{1, 2, 3}',
                    '{4, 5}',
                    '{1, 2, 3, 4, 5, 6, 7}',
                    '{6, 7}'
                  ]}
                  correctAnswer={1}
                  explanation="The intersection A ∩ B contains only elements that appear in BOTH sets. The numbers 4 and 5 are the only elements present in both A and B, so A ∩ B = {4, 5}."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.3: Venn Diagrams */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4">
            1.3. Venn Diagrams
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Venn diagrams</strong> are visual representations of sets and their relationships using overlapping circles or shapes within a rectangular boundary representing the universal set. They are powerful tools for understanding set operations and solving real-world problems.
            </p>

            {/* Visual Venn Diagram Examples */}
            <div className="p-6 border-2 border-cyan-200 dark:border-cyan-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <span>🎨</span> Visual Guide to Venn Diagrams
              </h4>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Two Set Union */}
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl text-center">
                  <h5 className="font-bold text-cyan-900 dark:text-cyan-300 mb-3">A ∪ B (Union)</h5>
                  <svg className="w-full h-32" viewBox="0 0 160 100">
                    <rect x="5" y="5" width="150" height="90" fill="none" stroke="#94a3b8" strokeWidth="1" />
                    <circle cx="55" cy="50" r="28" fill="#67e8f9" fillOpacity="0.5" stroke="#06b6d4" strokeWidth="2" />
                    <circle cx="105" cy="50" r="28" fill="#67e8f9" fillOpacity="0.5" stroke="#06b6d4" strokeWidth="2" />
                    <text x="40" y="30" fontSize="12" fontWeight="bold" fill="#0891b2">A</text>
                    <text x="115" y="30" fontSize="12" fontWeight="bold" fill="#0891b2">B</text>
                    <text x="10" y="15" fontSize="8" fill="#64748b">U</text>
                  </svg>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">All shaded = A ∪ B</p>
                </div>

                {/* Two Set Intersection */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center">
                  <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-3">A ∩ B (Intersection)</h5>
                  <svg className="w-full h-32" viewBox="0 0 160 100">
                    <rect x="5" y="5" width="150" height="90" fill="none" stroke="#94a3b8" strokeWidth="1" />
                    <circle cx="55" cy="50" r="28" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="105" cy="50" r="28" fill="none" stroke="#3b82f6" strokeWidth="2" />
                    <ellipse cx="80" cy="50" rx="15" ry="28" fill="#60a5fa" fillOpacity="0.6" />
                    <text x="35" y="30" fontSize="12" fontWeight="bold" fill="#1d4ed8">A</text>
                    <text x="115" y="30" fontSize="12" fontWeight="bold" fill="#1d4ed8">B</text>
                    <text x="10" y="15" fontSize="8" fill="#64748b">U</text>
                  </svg>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Overlap = A ∩ B</p>
                </div>

                {/* Set Difference */}
                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-center">
                  <h5 className="font-bold text-purple-900 dark:text-purple-300 mb-3">A − B (Difference)</h5>
                  <svg className="w-full h-32" viewBox="0 0 160 100">
                    <rect x="5" y="5" width="150" height="90" fill="none" stroke="#94a3b8" strokeWidth="1" />
                    <circle cx="55" cy="50" r="28" fill="#a78bfa" fillOpacity="0.5" stroke="#8b5cf6" strokeWidth="2" />
                    <circle cx="105" cy="50" r="28" fill="white" stroke="#8b5cf6" strokeWidth="2" />
                    <text x="35" y="30" fontSize="12" fontWeight="bold" fill="#6d28d9">A</text>
                    <text x="115" y="30" fontSize="12" fontWeight="bold" fill="#6d28d9">B</text>
                    <text x="10" y="15" fontSize="8" fill="#64748b">U</text>
                  </svg>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Left part only = A − B</p>
                </div>
              </div>
            </div>


            {/* Three-Set Venn Diagram */}
            <div className="p-6 border border-blue-200 dark:border-blue-900 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 text-base mb-4">Three-Set Venn Diagram</h4>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 flex justify-center">
                  <svg className="w-64 h-64" viewBox="0 0 200 200">
                    <rect x="10" y="10" width="180" height="180" fill="none" stroke="#94a3b8" strokeWidth="2" />
                    <circle cx="80" cy="75" r="45" fill="#67e8f9" fillOpacity="0.3" stroke="#06b6d4" strokeWidth="2" />
                    <circle cx="120" cy="75" r="45" fill="#60a5fa" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="100" cy="115" r="45" fill="#a78bfa" fillOpacity="0.3" stroke="#8b5cf6" strokeWidth="2" />
                    <text x="60" y="50" fontSize="14" fontWeight="bold" fill="#0891b2">A</text>
                    <text x="130" y="50" fontSize="14" fontWeight="bold" fill="#1d4ed8">B</text>
                    <text x="95" y="155" fontSize="14" fontWeight="bold" fill="#6d28d9">C</text>
                    <text x="15" y="25" fontSize="10" fill="#64748b">U</text>
                  </svg>
                </div>
                <div className="flex-1 space-y-2 text-xs">
                  <p className="text-slate-700 dark:text-slate-300">
                    Three-set Venn diagrams create 8 distinct regions:
                  </p>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Elements only in A</li>
                    <li>• Elements only in B</li>
                    <li>• Elements only in C</li>
                    <li>• Elements in A ∩ B (not in C)</li>
                    <li>• Elements in A ∩ C (not in B)</li>
                    <li>• Elements in B ∩ C (not in A)</li>
                    <li>• Elements in A ∩ B ∩ C (center)</li>
                    <li>• Elements in U but outside all three</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Application Example */}
            <div className="p-6 border-2 border-green-300 dark:border-green-800 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-green-700 dark:text-green-400 text-base mb-3 flex items-center gap-2">
                <span>💡</span> Real-World Application: Survey Analysis
              </h4>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-4 text-xs md:text-sm">
                <p className="font-semibold text-slate-900 dark:text-white mb-2">Problem:</p>
                <p className="text-slate-700 dark:text-slate-300">
                  In a survey of 100 students: 60 like Mathematics, 50 like Science, and 30 like both subjects. How many like at least one subject? How many like neither?
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <h5 className="font-bold text-green-900 dark:text-green-300 mb-2">Solution Steps:</h5>
                  <ol className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                    <li>1. Only Math: 60 − 30 = 30</li>
                    <li>2. Only Science: 50 − 30 = 20</li>
                    <li>3. At least one: 30 + 30 + 20 = 80</li>
                    <li>4. Neither: 100 − 80 = 20</li>
                  </ol>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <svg className="w-40 h-32" viewBox="0 0 160 120">
                    <circle cx="55" cy="60" r="35" fill="#86efac" fillOpacity="0.4" stroke="#22c55e" strokeWidth="2" />
                    <circle cx="105" cy="60" r="35" fill="#86efac" fillOpacity="0.4" stroke="#22c55e" strokeWidth="2" />
                    <text x="40" y="45" fontSize="10" fontWeight="bold">M</text>
                    <text x="110" y="45" fontSize="10" fontWeight="bold">S</text>
                    <text x="50" y="65" fontSize="11" fontWeight="bold" fill="#15803d">30</text>
                    <text x="75" y="65" fontSize="11" fontWeight="bold" fill="#15803d">30</text>
                    <text x="100" y="65" fontSize="11" fontWeight="bold" fill="#15803d">20</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.3 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Venn Diagram Interpretation</h4>
                <ExerciseQuestion 
                  question="In a group of 50 people, 30 like tea, 25 like coffee, and 10 like both. How many like neither tea nor coffee?"
                  options={[
                    '5 people',
                    '10 people',
                    '15 people',
                    '20 people'
                  ]}
                  correctAnswer={0}
                  explanation="Using the formula: Only Tea = 30 − 10 = 20, Only Coffee = 25 − 10 = 15. Total who like at least one = 20 + 10 + 15 = 45. Therefore, neither = 50 − 45 = 5 people."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.4: Cardinality of Sets */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4">
            1.4. Cardinality of Sets
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              The <strong>cardinality</strong> of a set is a measure of the "number of elements" in the set, denoted by |A| or n(A). Understanding cardinality is crucial for counting problems in statistics and probability.
            </p>

            {/* Formal Definition Card */}
            <div className="p-6 border-2 border-cyan-300 dark:border-cyan-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-2">
                📌 Definition: Cardinality
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                For a finite set A, the cardinality <strong>|A|</strong> or <strong>n(A)</strong> is the number of distinct elements in A.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded">
                  <strong>Example 1:</strong>
                  <p className="font-mono mt-1">A = {'{'}2, 4, 6, 8{'}'}</p>
                  <p className="text-cyan-700 dark:text-cyan-300 font-bold">|A| = 4</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
                  <strong>Example 2:</strong>
                  <p className="font-mono mt-1">B = {'{'}a, b, c{'}'}</p>
                  <p className="text-blue-700 dark:text-blue-300 font-bold">|B| = 3</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded">
                  <strong>Empty Set:</strong>
                  <p className="font-mono mt-1">∅ = {'{ }'}</p>
                  <p className="text-purple-700 dark:text-purple-300 font-bold">|∅| = 0</p>
                </div>
              </div>
            </div>

            {/* Cardinality Formulas */}
            <div className="p-6 border-2 border-blue-200 dark:border-blue-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <span>📐</span> Cardinality Formulas for Set Operations
              </h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Union Formula (Inclusion-Exclusion Principle)</h5>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded font-mono text-center text-sm font-bold text-blue-700 dark:text-blue-300">
                    |A ∪ B| = |A| + |B| − |A ∩ B|
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    We subtract |A ∩ B| to avoid counting elements in both sets twice.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                    <h5 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Difference Formula</h5>
                    <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-center text-sm">
                      |A − B| = |A| − |A ∩ B|
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                    <h5 className="font-bold text-green-900 dark:text-green-300 mb-2">Complement Formula</h5>
                    <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-center text-sm">
                      |A′| = |U| − |A|
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                  <h5 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Three-Set Union Formula</h5>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded font-mono text-xs md:text-sm text-center">
                    |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|
                  </div>
                </div>
              </div>
            </div>

            {/* Worked Example */}
            <div className="p-6 border-2 border-green-300 dark:border-green-800 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <h4 className="font-bold text-green-700 dark:text-green-400 text-base mb-3">📝 Worked Example</h4>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-3 text-sm">
                <p className="font-semibold mb-2">Given: |A| = 15, |B| = 20, |A ∩ B| = 8. Find |A ∪ B|.</p>
                <div className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  <p><strong>Solution:</strong></p>
                  <p>Using the formula: |A ∪ B| = |A| + |B| − |A ∩ B|</p>
                  <p>|A ∪ B| = 15 + 20 − 8</p>
                  <p className="text-green-700 dark:text-green-300 font-bold">|A ∪ B| = 27</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.4 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Cardinality Calculation</h4>
                <ExerciseQuestion 
                  question="If |A| = 25, |B| = 30, and |A ∪ B| = 40, what is |A ∩ B|?"
                  options={[
                    '5',
                    '10',
                    '15',
                    '20'
                  ]}
                  correctAnswer={2}
                  explanation="Using the formula |A ∪ B| = |A| + |B| − |A ∩ B|, we can rearrange to get |A ∩ B| = |A| + |B| − |A ∪ B| = 25 + 30 − 40 = 15."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.5: Applications of Sets */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-cyan-600 pl-2 md:pl-4">
            1.5. Applications of Sets in Social Sciences
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Set theory provides powerful tools for analyzing data, categorizing populations, understanding survey results, and solving real-world problems in economics, sociology, psychology, and business.
            </p>

            {/* Application Areas Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">📊</span>
                  <div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-300 text-base">Statistics & Data Analysis</h4>
                  </div>
                </div>
                <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Survey data classification and analysis</li>
                  <li>• Population segmentation studies</li>
                  <li>• Market research and consumer behavior</li>
                  <li>• Demographic data organization</li>
                  <li>• Probability event spaces</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">💼</span>
                  <div>
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 text-base">Economics & Business</h4>
                  </div>
                </div>
                <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Customer segmentation strategies</li>
                  <li>• Product portfolio analysis</li>
                  <li>• Market overlap identification</li>
                  <li>• Resource allocation problems</li>
                  <li>• Economic indicator categorization</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">🧠</span>
                  <div>
                    <h4 className="font-bold text-green-900 dark:text-green-300 text-base">Psychology & Sociology</h4>
                  </div>
                </div>
                <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Personality trait categorization</li>
                  <li>• Social group analysis</li>
                  <li>• Behavioral pattern identification</li>
                  <li>• Attitude and opinion clustering</li>
                  <li>• Cultural affiliation studies</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-amber-900 dark:text-amber-300 text-base">Political Science</h4>
                  </div>
                </div>
                <ul className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Voter demographic analysis</li>
                  <li>• Policy impact assessment</li>
                  <li>• Coalition formation studies</li>
                  <li>• Electoral district mapping</li>
                  <li>• Public opinion segmentation</li>
                </ul>
              </div>
            </div>


            {/* Real-World Case Study */}
            <div className="p-6 border-2 border-cyan-300 dark:border-cyan-800 rounded-2xl bg-white dark:bg-slate-900 shadow-lg">
              <h4 className="font-bold text-cyan-700 dark:text-cyan-400 text-lg mb-4 flex items-center gap-2">
                <span>🎯</span> Case Study: Consumer Preference Survey
              </h4>
              
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Scenario:</p>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  A marketing company surveyed 200 consumers about three products: Product A, Product B, and Product C.
                </p>
                <ul className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-2 space-y-1">
                  <li>• 120 preferred Product A</li>
                  <li>• 100 preferred Product B</li>
                  <li>• 80 preferred Product C</li>
                  <li>• 50 preferred both A and B</li>
                  <li>• 40 preferred both A and C</li>
                  <li>• 30 preferred both B and C</li>
                  <li>• 20 preferred all three products</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-3">Questions to Answer:</h5>
                  <ol className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                    <li>1. How many prefer only Product A?</li>
                    <li>2. How many prefer at least one product?</li>
                    <li>3. How many prefer exactly two products?</li>
                    <li>4. How many prefer none of the products?</li>
                  </ol>
                </div>

                <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl">
                  <h5 className="font-bold text-cyan-900 dark:text-cyan-300 mb-3">Solution Approach:</h5>
                  <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
                    <p><strong>Only A:</strong> 120 − 50 − 40 + 20 = 50</p>
                    <p><strong>Only B:</strong> 100 − 50 − 30 + 20 = 40</p>
                    <p><strong>Only C:</strong> 80 − 40 − 30 + 20 = 30</p>
                    <p><strong>At least one:</strong> Using inclusion-exclusion</p>
                    <p className="font-mono text-cyan-700 dark:text-cyan-300">= 120 + 100 + 80 − 50 − 40 − 30 + 20 = 200</p>
                    <p><strong>None:</strong> 200 − 200 = 0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.5 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Application Problem</h4>
                <ExerciseQuestion 
                  question="In a university of 500 students, 300 study Economics, 250 study Psychology, and 150 study both. How many students study at least one of these subjects?"
                  options={[
                    '250 students',
                    '350 students',
                    '400 students',
                    '450 students'
                  ]}
                  correctAnswer={2}
                  explanation="Using the inclusion-exclusion principle: |E ∪ P| = |E| + |P| − |E ∩ P| = 300 + 250 − 150 = 400 students study at least one of these subjects."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-end pt-8">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors font-medium"
          >
            Next: Chapter 2
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter1;
