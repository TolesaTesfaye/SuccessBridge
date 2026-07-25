import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter5Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter5: React.FC<Chapter5Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4 rounded-full">
          Mathematics Chapter 5 • Comprehensive Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          VECTORS IN A PLANE & VECTOR ALGEBRA
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Vectors are fundamental mathematical objects possessing magnitude and direction. This in-depth master guide covers component representation, direction cosines, polar conversion, vector space algebraic properties, dot product geometry, Cauchy-Schwarz and Triangle inequalities, static force equilibrium, relative velocity kinematics, scalar components, and orthogonal projections.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 5.1: Introduction to Vectors */}
        <section id="subtopic-5.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>🎯</span> 5.1. Component Form, Direction Cosines & Polar Conversion
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>Vector</strong> in 2D space is represented by a directed line segment from initial point <em>P(x₁, y₁)</em> to terminal point <em>Q(x₂, y₂)</em>:
            </p>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 shadow-inner">
              {"v = ⟨v₁, v₂⟩ = ⟨x₂ - x₁, y₂ - y₁⟩   |   Magnitude ||v|| = √(v₁² + v₂²)"}
            </div>

            {/* VISUAL SVG GRAPHIC: Vector Components & Direction Angle θ */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎨</span> Visual Graphic: Vector Components & Direction Angle θ
              </h3>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex flex-col items-center">
                  <svg viewBox="0 0 240 180" className="w-full max-w-[260px] h-auto text-slate-700 dark:text-slate-300">
                    {/* Axes */}
                    <line x1="20" y1="150" x2="220" y2="150" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                    <line x1="40" y1="20" x2="40" y2="165" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                    
                    {/* Component v1 (horizontal) */}
                    <line x1="40" y1="150" x2="180" y2="150" stroke="#10b981" strokeWidth="2.5" />
                    <text x="105" y="165" fill="#10b981" fontSize="10" fontWeight="bold">v₁ = ||v|| cos θ</text>

                    {/* Component v2 (vertical) */}
                    <line x1="180" y1="150" x2="180" y2="40" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="3 3" />
                    <text x="185" y="95" fill="#3b82f6" fontSize="10" fontWeight="bold">v₂ = ||v|| sin θ</text>

                    {/* Vector Arrow v */}
                    <line x1="40" y1="150" x2="178" y2="42" stroke="#059669" strokeWidth="3" />
                    <polygon points="180,40 170,45 174,53" fill="#059669" />

                    {/* Magnitude & Terminal Point */}
                    <circle cx="180" cy="40" r="4" fill="#059669" />
                    <text x="185" y="35" fill="#059669" fontSize="10" fontWeight="bold">P(v₁, v₂)</text>
                    <text x="95" y="85" fill="#059669" fontSize="10" fontWeight="bold">||v||</text>

                    {/* Angle arc */}
                    <path d="M 65 150 A 25 25 0 0 0 60 132" fill="none" stroke="#eab308" strokeWidth="2" />
                    <text x="70" y="142" fill="#eab308" fontSize="10" fontWeight="bold">θ</text>
                  </svg>
                </div>

                <div className="space-y-3 text-xs md:text-sm">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">Polar Conversion Form:</strong>
                    Given magnitude <em>||v||</em> and angle <em>θ</em>, <code>v = ⟨||v|| cos θ, ||v|| sin θ⟩</code>.
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                    <strong className="text-blue-900 dark:text-blue-300 block mb-1">Direction Cosines:</strong>
                    The direction cosines are <code>cos α = v₁ / ||v||</code> and <code>cos β = v₂ / ||v||</code> where <em>cos² α + cos² β = 1</em>.
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Polar to Component Conversion</h4>
                <ExerciseQuestion 
                  question="A velocity vector has magnitude ||v|| = 10 m/s at a direction angle θ = 150°. What is its component form?"
                  options={[
                    'v = ⟨-5√3, 5⟩',
                    'v = ⟨5, -5√3⟩',
                    'v = ⟨-5, 5√3⟩',
                    'v = ⟨5√3, 5⟩'
                  ]}
                  correctAnswer={0}
                  explanation="v₁ = ||v|| cos(150°) = 10 × (-√3/2) = -5√3. v₂ = ||v|| sin(150°) = 10 × (1/2) = 5. Therefore, component form v = ⟨-5√3, 5⟩."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.2: Vector Operations */}
        <section id="subtopic-5.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>➕</span> 5.2. Parallelogram Addition, Scalar Rules & Unit Basis (i, j)
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Vector addition can be visualized via the <strong>Parallelogram Law</strong> (placing tail-to-tail) or the <strong>Triangle Law</strong> (head-to-tail):
            </p>

            {/* Operations Grid */}
            <div className="grid md:grid-cols-3 gap-4 font-mono text-xs md:text-sm">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-200 text-center">
                <span className="font-sans font-bold text-emerald-900 dark:text-emerald-300 block mb-1">Vector Addition</span>
                <div className="font-bold text-emerald-700 dark:text-emerald-200">u + v = ⟨u₁ + v₁, u₂ + v₂⟩</div>
              </div>
              <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-xl border border-teal-200 text-center">
                <span className="font-sans font-bold text-teal-900 dark:text-teal-300 block mb-1">Scalar Multiplication</span>
                <div className="font-bold text-teal-700 dark:text-teal-200">c · v = ⟨c v₁, c v₂⟩</div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 text-center">
                <span className="font-sans font-bold text-blue-900 dark:text-blue-300 block mb-1">Unit Vector</span>
                <div className="font-bold text-blue-700 dark:text-blue-200">u = v / ||v||  (||u|| = 1)</div>
              </div>
            </div>

            {/* Head to Tail Addition SVG */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎨</span> Visual Graphic: Triangle Law of Vector Addition
              </h3>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex flex-col items-center">
                <svg viewBox="0 0 260 140" className="w-full max-w-[280px] h-auto text-slate-700 dark:text-slate-300">
                  {/* Vector u */}
                  <line x1="30" y1="110" x2="120" y2="110" stroke="#3b82f6" strokeWidth="2.5" />
                  <polygon points="120,110 110,105 110,115" fill="#3b82f6" />
                  <text x="70" y="125" fill="#3b82f6" fontSize="10" fontWeight="bold">Vector u</text>

                  {/* Vector v (placed at head of u) */}
                  <line x1="120" y1="110" x2="210" y2="30" stroke="#10b981" strokeWidth="2.5" />
                  <polygon points="210,30 200,38 206,46" fill="#10b981" />
                  <text x="175" y="75" fill="#10b981" fontSize="10" fontWeight="bold">Vector v</text>

                  {/* Resultant u + v */}
                  <line x1="30" y1="110" x2="208" y2="32" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="4 2" />
                  <polygon points="210,30 198,32 203,42" fill="#8b5cf6" />
                  <text x="95" y="60" fill="#8b5cf6" fontSize="11" fontWeight="bold">Resultant u + v</text>
                </svg>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Unit Vector Direction</h4>
                <ExerciseQuestion 
                  question="Find a unit vector in the direction of v = 6i - 8j."
                  options={[
                    'u = (3/5)i - (4/5)j',
                    'u = (6/10)i + (8/10)j',
                    'u = 1i - 1j',
                    'u = (4/5)i - (3/5)j'
                  ]}
                  correctAnswer={0}
                  explanation="Magnitude ||v|| = √(6² + (-8)²) = √(36 + 64) = √100 = 10. Unit vector u = v / ||v|| = (6i - 8j) / 10 = (3/5)i - (4/5)j."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.3: Dot Product & Inequalities */}
        <section id="subtopic-5.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>⚡</span> 5.3. Dot Product, Angle & Fundamental Inequalities
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              The <strong>Dot Product</strong> combines two vectors into a scalar quantity:
            </p>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 shadow-inner">
              {"u · v = u₁ v₁ + u₂ v₂ = ||u|| ||v|| cos(θ)   |   cos(θ) = (u · v) / (||u|| ||v||)"}
            </div>

            {/* Fundamental Vector Inequalities Card */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">
                <span>🏛️</span> Fundamental Vector Inequalities
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 font-sans text-sm block mb-1">Cauchy-Schwarz Inequality</span>
                  <div className="font-bold text-emerald-700 dark:text-emerald-200 text-sm">|u · v| ≤ ||u|| ||v||</div>
                  <p className="font-sans text-[11px] text-slate-600 dark:text-slate-400 mt-1">The absolute dot product never exceeds the product of magnitudes.</p>
                </div>
                <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200">
                  <span className="font-bold text-teal-900 dark:text-teal-300 font-sans text-sm block mb-1">Triangle Inequality</span>
                  <div className="font-bold text-teal-700 dark:text-teal-200 text-sm">||u + v|| ≤ ||u|| + ||v||</div>
                  <p className="font-sans text-[11px] text-slate-600 dark:text-slate-400 mt-1">Length of any side of a triangle is less than or equal to the sum of the other two.</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 3: Angle Between Vectors</h4>
                <ExerciseQuestion 
                  question="Find the angle θ between vectors u = ⟨1, 1⟩ and v = ⟨0, 5⟩."
                  options={[
                    'θ = 45° (π/4 rad)',
                    'θ = 90° (π/2 rad)',
                    'θ = 60° (π/3 rad)',
                    'θ = 30° (π/6 rad)'
                  ]}
                  correctAnswer={0}
                  explanation="Compute dot product: u · v = (1)(0) + (1)(5) = 5. Magnitudes: ||u|| = √(1² + 1²) = √2, ||v|| = √(0² + 5²) = 5. cos(θ) = 5 / (√2 · 5) = 1/√2 = √2/2 ⟹ θ = 45°."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.4: Physical Applications */}
        <section id="subtopic-5.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>⚙️</span> 5.4. Applications: Force Equilibrium & Work Calculus
          </h2>

          <div className="space-y-4 md:space-y-6">
            {/* Physics Applications Grid */}
            <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-2">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-300 font-sans text-sm">⚖️ Static Equilibrium Condition</h4>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-xs text-center font-bold text-emerald-900 dark:text-emerald-200">
                  ∑ F = F₁ + F₂ + ... + Fₙ = 0  ⟹  ∑ F_x = 0,  ∑ F_y = 0
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  An object remains at rest when the sum of all vector forces acting upon it equals the zero vector.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200 dark:border-teal-800 shadow-sm space-y-2">
                <h4 className="font-bold text-teal-800 dark:text-teal-300 font-sans text-sm">🏋️ Physical Work Formula</h4>
                <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-xl font-mono text-xs text-center font-bold text-teal-900 dark:text-teal-200">
                  Work W = F · d = ||F|| ||d|| cos(θ)
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Work is scalar dot product of force vector <em>F</em> and displacement vector <em>d</em>.
                </p>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 4: Work Done by Force</h4>
                <ExerciseQuestion 
                  question="A force F = 50 N is pulled at an angle of 60° to move an object d = 10 m horizontally. What is the work done?"
                  options={[
                    'W = 250 Joules',
                    'W = 500 Joules',
                    'W = 433 Joules',
                    'W = 100 Joules'
                  ]}
                  correctAnswer={0}
                  explanation="W = ||F|| ||d|| cos(60°) = 50 × 10 × (1/2) = 250 Joules."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.5: Projections */}
        <section id="subtopic-5.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4 flex items-center gap-2">
            <span>📐</span> 5.5. Scalar & Vector Projections & Orthogonal Decomposition
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Any vector <em>u</em> can be decomposed into two orthogonal components <em>u = w₁ + w₂</em>, where <em>w₁ = proj_v(u)</em> is parallel to <em>v</em>, and <em>w₂ = u - w₁</em> is orthogonal to <em>v</em>:
            </p>

            {/* Projection Formulas Box */}
            <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 space-y-4">
              <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200">
                  <span className="font-sans font-bold text-emerald-900 dark:text-emerald-300 text-sm block mb-1">Scalar Projection (comp_v u)</span>
                  <div className="font-bold text-emerald-700 dark:text-emerald-200 text-sm">comp_v(u) = (u · v) / ||v||</div>
                  <p className="font-sans text-[11px] text-slate-600 dark:text-slate-400 mt-1">Signed scalar length of the shadow of u on v.</p>
                </div>
                <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200">
                  <span className="font-sans font-bold text-teal-900 dark:text-teal-300 text-sm block mb-1">Vector Projection (proj_v u)</span>
                  <div className="font-bold text-teal-700 dark:text-teal-200 text-sm">proj_v(u) = [ (u · v) / ||v||² ] · v</div>
                  <p className="font-sans text-[11px] text-slate-600 dark:text-slate-400 mt-1">Vector in direction of v with length equal to comp_v(u).</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 5: Vector Projection Calculation</h4>
                <ExerciseQuestion 
                  question="Find the projection of u = ⟨3, 4⟩ onto v = ⟨1, 0⟩."
                  options={[
                    'proj_v(u) = ⟨3, 0⟩',
                    'proj_v(u) = ⟨0, 4⟩',
                    'proj_v(u) = ⟨3, 4⟩',
                    'proj_v(u) = ⟨5, 0⟩'
                  ]}
                  correctAnswer={0}
                  explanation="u · v = 3(1) + 4(0) = 3. ||v||² = 1² + 0² = 1. proj_v(u) = (3 / 1) ⟨1, 0⟩ = ⟨3, 0⟩."
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
                onNavigateChapter('chapter4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 4
          </button>

          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter6');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 6
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter5;
