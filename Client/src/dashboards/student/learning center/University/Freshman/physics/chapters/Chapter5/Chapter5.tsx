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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Physics Chapter 5 • Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          WORK, ENERGY AND POWER
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-teal-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Energy is the capacity to do work and is the fundamental conserved currency of physical systems. Work quantifies energy transfer via mechanical forces. In this chapter, you will master scalar products of force and displacement, work done by variable spring forces, the Work-Energy Theorem, potential energy fields, mechanical energy conservation, and power rates.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 5.1: Work Done by a Constant Force */}
        <section id="subtopic-5.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            5.1. Work Done by a Constant Force & Variable Spring Force
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              In physics, <strong>work (W)</strong> is done when a force <strong>F</strong> acts on an object causing a displacement <strong>d</strong>. Mathematically, work is the <strong>dot (scalar) product</strong> of the force and displacement vectors, measured in Joules (1 J = 1 N·m):
            </p>

            {/* Formula Card */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-2xl text-center space-y-2">
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 text-sm md:text-xl block">
                W = F · d = F · d · cos(θ)
              </span>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                Where <strong>θ</strong> is the angle between the applied force vector F and displacement vector d.
              </p>
            </div>

            {/* Sign of Work Breakdown Grid */}
            <div className="grid md:grid-cols-3 gap-4 font-mono text-xs md:text-sm">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block text-sm mb-1">Positive Work (W {">"} 0)</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans">
                  0° ≤ θ {"<"} 90°. Force assists motion. Energy is <strong>added</strong> to the object (speed increases).
                </p>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-xl border border-amber-200 dark:border-amber-800">
                <span className="font-bold text-amber-800 dark:text-amber-300 block text-sm mb-1">Zero Work (W = 0)</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans">
                  θ = 90°. Force is perpendicular to displacement (e.g. Normal force, Centripetal force). No energy transfer!
                </p>
              </div>

              <div className="p-4 bg-rose-50 dark:bg-rose-900/30 rounded-xl border border-rose-200 dark:border-rose-800">
                <span className="font-bold text-rose-800 dark:text-rose-300 block text-sm mb-1">Negative Work (W {"<"} 0)</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs font-sans">
                  90° {"<"} θ ≤ 180°. Force opposes displacement (e.g. Friction). Energy is <strong>extracted</strong> (speed decreases).
                </p>
              </div>
            </div>

            {/* VISUAL DIAGRAM 1: Work Vector Angle */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>📐</span> Visual Diagram 1: Force & Displacement Vector Angle
              </h4>
              
              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-72 h-36" viewBox="0 0 300 150">
                  {/* Floor */}
                  <line x1="20" y1="120" x2="280" y2="120" stroke="#94a3b8" strokeWidth="2" />
                  {/* Block */}
                  <rect x="60" y="80" width="50" height="40" fill="#10b981" rx="3" />
                  
                  {/* Displacement Vector d (Rightward) */}
                  <line x1="110" y1="120" x2="230" y2="120" stroke="#0284c7" strokeWidth="3" />
                  <polygon points="235,120 225,115 225,125" fill="#0284c7" />
                  <text x="170" y="140" fontSize="12" fontWeight="bold" fill="#0284c7">Displacement d</text>

                  {/* Force Vector F at Angle θ */}
                  <line x1="85" y1="100" x2="160" y2="40" stroke="#ef4444" strokeWidth="3" />
                  <polygon points="164,37 152,41 158,51" fill="#ef4444" />
                  <text x="168" y="38" fontSize="12" fontWeight="bold" fill="#ef4444">Force F</text>

                  {/* Horizontal dash & angle arc */}
                  <line x1="85" y1="100" x2="150" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                  <path d="M 120 100 A 35 35 0 0 0 112 78" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <text x="128" y="92" fontSize="12" fontWeight="bold" fill="#f59e0b">θ</text>
                </svg>
              </div>
            </div>

            {/* VISUAL DIAGRAM 2: Variable Spring Force F(x) = kx Graph */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>📈</span> Visual Diagram 2: Work Done by Variable Spring Force (Area Under F-x Curve)
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  <p>For a spring obeying Hooke's Law (F_spring = k x), force varies linearly with displacement x.</p>
                  <p>Work done to compress or stretch a spring from x = 0 to x is equal to the <strong>triangular area under the F-x graph</strong>:</p>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded font-mono text-xs text-emerald-800 dark:text-emerald-300 font-bold space-y-1">
                    <p>• Area = ½ × Base × Height = ½ (x) (k x)</p>
                    <p>• Work W = ½ k x²</p>
                  </div>
                </div>

                {/* SVG Graph for F(x) = kx */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-center">
                  <svg className="w-64 h-48" viewBox="0 0 250 180">
                    {/* Axes */}
                    <line x1="40" y1="150" x2="230" y2="150" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="40" y1="150" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2" />
                    <text x="235" y="154" fontSize="11" fontWeight="bold" fill="#64748b">x</text>
                    <text x="25" y="15" fontSize="11" fontWeight="bold" fill="#64748b">Force F</text>

                    {/* Shaded Triangular Area Under F = kx */}
                    <polygon points="40,150 190,150 190,40" fill="#10b981" fillOpacity="0.25" />
                    
                    {/* Line F = kx */}
                    <line x1="40" y1="150" x2="190" y2="40" stroke="#059669" strokeWidth="3" />
                    
                    {/* Dashed line to x_max */}
                    <line x1="190" y1="40" x2="190" y2="150" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
                    
                    {/* Labels */}
                    <text x="185" y="166" fontSize="11" fontWeight="bold" fill="#059669">x_max</text>
                    <text x="110" y="125" fontSize="12" fontWeight="bold" fill="#047857">Area = ½ k x²</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Work Done at an Angle</h4>
                <ExerciseQuestion 
                  question="A person pulls a sled across a flat snowfield with a force F = 100 N at an angle θ = 60° above horizontal for a distance d = 20 meters. How much work is done by the person?"
                  options={[
                    '500 Joules',
                    '1000 Joules',
                    '1732 Joules',
                    '2000 Joules'
                  ]}
                  correctAnswer={1}
                  explanation="W = F d cos(θ) = 100 × 20 × cos(60°) = 2000 × 0.5 = 1000 Joules."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.2: Kinetic Energy and Work-Energy Theorem */}
        <section id="subtopic-5.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            5.2. Kinetic Energy and the Work-Energy Theorem
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Kinetic Energy (K)</strong> is the energy an object possesses due to its motion. For a point mass <em>m</em> moving at speed <em>v</em>:
            </p>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl font-mono text-center text-sm md:text-base font-bold text-emerald-800 dark:text-emerald-300">
              K = ½ m v²
            </div>

            {/* Derivation of Work-Energy Theorem */}
            <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                🏛️ Proof of the Work-Energy Theorem
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                Using Newton's 2nd Law F = m a and 1D kinematic calculus relation a = v (dv/dx):
              </p>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-xs md:text-sm text-slate-900 dark:text-white font-bold space-y-1">
                <p>W_net = ∫ F dx = ∫ (m a) dx = ∫ m v (dv/dx) dx = ∫_{"{v_i}"}^{"{v_f}"} m v dv</p>
                <p className="text-emerald-600 dark:text-emerald-400">W_net = ½ m v_f² - ½ m v_i² = ΔK</p>
              </div>
            </div>

            {/* Worked Example */}
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>💡</span> Worked Example: Stopping Distance of a Car
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                A 1000 kg car traveling at v_i = 20 m/s slams on its brakes and comes to a stop (v_f = 0). What is the net work done by the braking force?
              </p>
              <div className="space-y-1 text-xs md:text-sm font-mono text-slate-800 dark:text-slate-200">
                <p>• Initial KE: K_i = ½ (1000)(20²) = 500 × 400 = 200,000 J</p>
                <p>• Final KE: K_f = 0 J</p>
                <p>• W_net = ΔK = 0 - 200,000 J = -200,000 J (-200 kJ)</p>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Kinetic Energy Doubling</h4>
                <ExerciseQuestion 
                  question="If the speed of a moving object is doubled (2v), by what factor does its kinetic energy increase?"
                  options={[
                    'Stays the same',
                    'Doubles (2x)',
                    'Quadruples (4x)',
                    'Increases by 8x'
                  ]}
                  correctAnswer={2}
                  explanation="Because K = ½ m v², kinetic energy depends on speed squared. (2v)² = 4v², so KE quadruples (4x)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.3: Potential Energy */}
        <section id="subtopic-5.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            5.3. Potential Energy (Gravitational & Elastic)
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Potential Energy (U)</strong> is stored energy possessed by a system due to the relative configuration of its parts. It is defined ONLY for <strong>conservative forces</strong> (where work done over any closed path is zero):
            </p>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl font-mono text-center text-xs md:text-sm font-bold text-emerald-800 dark:text-emerald-300">
              W_cons = - ΔU = - (U_f - U_i)  |  F(x) = - dU / dx
            </div>

            {/* Potential Energy Types Grid */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">1. Gravitational Potential Energy (U_g)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                  Energy stored by raising a mass <em>m</em> to height <em>y</em> above reference plane (y = 0):
                </p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-emerald-700 dark:text-emerald-300 font-bold">
                  U_g = m · g · y
                </div>
              </div>

              <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">2. Elastic Potential Energy (U_s)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                  Energy stored in an ideal spring stretched or compressed by displacement <em>x</em>:
                </p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-teal-700 dark:text-teal-300 font-bold">
                  U_s = ½ k · x²
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Spring Stored Energy</h4>
                <ExerciseQuestion 
                  question="A spring with stiffness constant k = 200 N/m is compressed by x = 0.1 meters. How much elastic potential energy is stored in the spring?"
                  options={[
                    '1.0 Joule',
                    '2.0 Joules',
                    '10 Joules',
                    '20 Joules'
                  ]}
                  correctAnswer={0}
                  explanation="U_s = ½ k x² = ½ (200)(0.1²) = 100 × 0.01 = 1.0 Joule."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.4: Conservation of Mechanical Energy */}
        <section id="subtopic-5.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            5.4. Conservation of Mechanical Energy
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Total Mechanical Energy (E_mech)</strong> is the sum of kinetic and potential energy: <em>E_mech = K + U</em>. In an isolated system where only conservative forces do work, total mechanical energy remains <strong>constant (conserved)</strong>:
            </p>

            {/* Conservation Formula Card */}
            <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                🏛️ Mechanical Energy Conservation Equation
              </h3>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-sm md:text-lg font-bold text-slate-900 dark:text-white inline-block mb-3">
                K_i + U_i = K_f + U_f
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-mono">
                ½ m v_i² + m g y_i = ½ m v_f² + m g y_f
              </p>
            </div>

            {/* VISUAL DIAGRAM 3: Simple Pendulum Energy Exchange */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>🏮</span> Visual Diagram 3: Simple Pendulum Energy Conversion (U ↔ K)
              </h4>

              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-80 h-52" viewBox="0 0 320 200">
                  {/* Ceiling */}
                  <line x1="80" y1="20" x2="240" y2="20" stroke="#64748b" strokeWidth="3" />
                  <circle cx="160" cy="20" r="4" fill="#475569" />

                  {/* Dotted Arc Trajectory */}
                  <path d="M 70 140 Q 160 180 250 140" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />

                  {/* Left Release Point (Max Height, v = 0) */}
                  <line x1="160" y1="20" x2="70" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="70" cy="140" r="10" fill="#0284c7" />
                  <text x="20" y="130" fontSize="10" fontWeight="bold" fill="#0284c7">Apex: U = mgh</text>
                  <text x="20" y="145" fontSize="10" fontWeight="bold" fill="#0284c7">K = 0 (v = 0)</text>

                  {/* Bottom Lowest Point (Max Speed) */}
                  <line x1="160" y1="20" x2="160" y2="170" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="160" cy="170" r="10" fill="#10b981" />
                  <text x="120" y="195" fontSize="10" fontWeight="bold" fill="#059669">Bottom: U = 0, K = ½mv² (Max Speed)</text>

                  {/* Right Peak Point (Max Height, v = 0) */}
                  <line x1="160" y1="20" x2="250" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="250" cy="140" r="10" fill="#0284c7" />
                  <text x="255" y="130" fontSize="10" fontWeight="bold" fill="#0284c7">Apex: U = mgh</text>
                  <text x="255" y="145" fontSize="10" fontWeight="bold" fill="#0284c7">K = 0 (v = 0)</text>
                </svg>
              </div>
            </div>

            {/* Friction Non-Conservative Work Card */}
            <div className="p-6 border border-rose-200 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-900/10 rounded-2xl">
              <h4 className="font-bold text-rose-900 dark:text-rose-400 text-base mb-2 flex items-center gap-2">
                <span>🔥</span> Non-Conservative Forces (Friction Losses)
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                When non-conservative forces like friction or air resistance do work, mechanical energy is converted into thermal energy (heat):
              </p>
              <div className="p-3 bg-white dark:bg-slate-800 rounded font-mono text-xs md:text-sm text-rose-700 dark:text-rose-300 font-bold text-center">
                W_nc = ΔE_mech = E_f - E_i = (K_f + U_f) - (K_i + U_i)
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Free Fall Impact Speed</h4>
                <ExerciseQuestion 
                  question="A 2 kg stone is dropped from rest (v_i = 0) from a cliff of height h = 20 meters. Taking g = 9.8 m/s² and neglecting air resistance, what is its speed just before hitting the ground?"
                  options={[
                    '14.0 m/s',
                    '19.8 m/s',
                    '28.0 m/s',
                    '392 m/s'
                  ]}
                  correctAnswer={1}
                  explanation="By energy conservation K_i + U_i = K_f + U_f -> 0 + mgh = ½ m v_f² + 0 -> v_f = √(2gh) = √(2 × 9.8 × 20) = √392 ≈ 19.8 m/s."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 5.5: Power */}
        <section id="subtopic-5.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            5.5. Power
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Power (P)</strong> is the rate at which work is done or energy is transformed over time.
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">Average Power (P_avg)</h4>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-emerald-700 dark:text-emerald-300 font-bold mb-2">
                  P_avg = W / Δt = ΔE / Δt
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">Total work divided by total time elapsed.</p>
              </div>

              <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">Instantaneous Power (P)</h4>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-teal-700 dark:text-teal-300 font-bold mb-2">
                  P = F · v = F · v · cos(θ)
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">Force multiplied by instantaneous velocity.</p>
              </div>
            </div>

            {/* Units Card */}
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 text-xs md:text-sm font-mono space-y-1">
              <p>• SI Unit: <strong>Watt (W)</strong> = 1 Joule per second (1 J/s)</p>
              <p>• Kilowatt: 1 kW = 1000 W</p>
              <p>• Horsepower: 1 hp = 746 Watts</p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Elevator Motor Power</h4>
                <ExerciseQuestion 
                  question="An electric motor lifts a 500 kg elevator cab vertically upward at a constant speed v = 2.0 m/s. Taking g = 9.8 m/s², what power must the motor deliver?"
                  options={[
                    '1,000 W',
                    '4,900 W',
                    '9,800 W',
                    '19,600 W'
                  ]}
                  correctAnswer={2}
                  explanation="Lifting force F = mg = 500 × 9.8 = 4900 N. Power P = F v = 4900 N × 2.0 m/s = 9800 Watts (9.8 kW)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Physics Chapter 5 Master Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Work:</strong> W = F d cos θ. Scalar quantity in Joules (J). Spring work W_s = ½ k x² (area under F-x curve).</p>
            <p><strong>✓ Work-Energy Theorem:</strong> W_net = ΔK = ½ m v_f² - ½ m v_i².</p>
            <p><strong>✓ Potential Energy:</strong> Gravitational U_g = mgy, Elastic spring U_s = ½ k x².</p>
            <p><strong>✓ Conservation of Mechanical Energy:</strong> K_i + U_i = K_f + U_f (e.g. Pendulum U ↔ K exchange).</p>
            <p><strong>✓ Power:</strong> Rate of doing work P = W/Δt = F · v in Watts (W).</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
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
