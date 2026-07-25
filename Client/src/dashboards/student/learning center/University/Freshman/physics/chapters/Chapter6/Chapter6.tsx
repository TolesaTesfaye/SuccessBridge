import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter6Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter6: React.FC<Chapter6Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Physics Chapter 6 • Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          LINEAR MOMENTUM AND COLLISION
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-teal-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Linear momentum measures the quantity of motion possessed by a body. When external forces on a system are zero, total momentum is strictly conserved. In this chapter, you will master linear momentum, impulse-momentum theorem, isolated systems, elastic vs. inelastic collisions, ballistic pendulums, and center of mass dynamics.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 6.1: Linear Momentum */}
        <section id="subtopic-6.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            6.1. Linear Momentum
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Linear Momentum (p)</strong> of a particle is defined as the product of its mass <em>m</em> and its velocity <strong>v</strong>. It is a <strong>vector quantity</strong> pointing in the exact same direction as velocity, with SI unit <em>kg·m/s</em>:
            </p>

            {/* Formula Card */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-2xl text-center space-y-2">
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 text-sm md:text-xl block">
                p = m · v
              </span>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                Newton's 2nd Law in terms of momentum: <strong>F_net = dp / dt</strong>
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Momentum of a Truck</h4>
                <ExerciseQuestion 
                  question="A 2000 kg truck travels East at speed v = 15 m/s. What is the magnitude of its linear momentum?"
                  options={[
                    '133.3 kg·m/s',
                    '30,000 kg·m/s',
                    '225,000 kg·m/s',
                    '300,000 kg·m/s'
                  ]}
                  correctAnswer={1}
                  explanation="p = m v = 2000 kg × 15 m/s = 30,000 kg·m/s pointing East."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.2: Impulse and Momentum */}
        <section id="subtopic-6.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            6.2. Impulse and Momentum
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Impulse (J)</strong> is the total effect of a force acting over a time interval Δt. It is a vector quantity with unit <em>N·s</em> (equivalent to <em>kg·m/s</em>):
            </p>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl font-mono text-center text-sm md:text-base font-bold text-emerald-800 dark:text-emerald-300">
              J = F_avg · Δt = ∫ F(t) dt
            </div>

            {/* Impulse-Momentum Theorem Card */}
            <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                🏛️ The Impulse-Momentum Theorem
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                The impulse delivered by a net force equals the change in linear momentum of the body:
              </p>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-sm md:text-lg font-bold text-slate-900 dark:text-white inline-block">
                J = Δp = p_f - p_i = m v_f - m v_i
              </div>
            </div>

            {/* VISUAL DIAGRAM 1: Impulse Force-Time Graph */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>📈</span> Visual Diagram 1: Impulse Force-Time Curve & Area (J = ∫ F dt)
              </h4>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  <p>In collisions (like a bat hitting a baseball), the impact force F(t) rises rapidly to a peak F_max and drops back to zero.</p>
                  <p>The <strong>area under the F-t curve</strong> equals the total Impulse J = Δp:</p>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded font-mono text-xs text-emerald-800 dark:text-emerald-300 font-bold">
                    J = Area = F_avg · Δt = Δp
                  </div>
                </div>

                {/* SVG Graph for Impulse F(t) */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-center">
                  <svg className="w-64 h-44" viewBox="0 0 250 170">
                    {/* Axes */}
                    <line x1="40" y1="140" x2="230" y2="140" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="40" y1="140" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2" />
                    <text x="235" y="144" fontSize="11" fontWeight="bold" fill="#64748b">Time t</text>
                    <text x="20" y="15" fontSize="11" fontWeight="bold" fill="#64748b">Force F</text>

                    {/* Shaded Bell Curve Area */}
                    <path d="M 60 140 Q 125 10 190 140 Z" fill="#10b981" fillOpacity="0.3" />
                    <path d="M 60 140 Q 125 10 190 140" fill="none" stroke="#059669" strokeWidth="3" />

                    {/* F_avg line */}
                    <line x1="60" y1="80" x2="190" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="195" y="84" fontSize="10" fontWeight="bold" fill="#ef4444">F_avg</text>

                    {/* Labels */}
                    <text x="100" y="110" fontSize="12" fontWeight="bold" fill="#047857">Area = J = Δp</text>
                    <line x1="60" y1="140" x2="60" y2="148" stroke="#64748b" strokeWidth="1.5" />
                    <line x1="190" y1="140" x2="190" y2="148" stroke="#64748b" strokeWidth="1.5" />
                    <text x="110" y="160" fontSize="11" fontWeight="bold" fill="#64748b">Δt</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Airbag Safety Application */}
            <div className="p-6 border border-teal-200 dark:border-teal-800 bg-teal-50/40 dark:bg-teal-900/10 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>🚗</span> Safety Application: Airbags & Crumple Zones
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                In a car crash, stopping the passenger requires a fixed momentum change (Δp). By increasing the collision time Δt using airbags or crumple zones, the average impact force F_avg = Δp / Δt is dramatically reduced, saving lives!
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Tennis Racket Hit</h4>
                <ExerciseQuestion 
                  question="A 0.06 kg tennis ball moving at v_i = -20 m/s is struck by a racket and rebounds at v_f = +30 m/s. What is the impulse delivered to the ball?"
                  options={[
                    '0.6 N·s',
                    '3.0 N·s',
                    '1.8 N·s',
                    '5.0 N·s'
                  ]}
                  correctAnswer={1}
                  explanation="J = Δp = m (v_f - v_i) = 0.06 × [30 - (-20)] = 0.06 × 50 = 3.0 N·s."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.3: Conservation of Linear Momentum */}
        <section id="subtopic-6.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            6.3. Conservation of Linear Momentum
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              When the net external force on a system of particles is zero (<strong>∑F_ext = 0</strong>), the system is <strong>isolated</strong>, and total linear momentum remains constant:
            </p>

            <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                🏛️ Law of Conservation of Linear Momentum
              </h3>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-sm md:text-lg font-bold text-slate-900 dark:text-white inline-block mb-2">
                P_total,i = P_total,f
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-mono">
                m₁ v₁i + m₂ v₂i = m₁ v₁f + m₂ v₂f
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Rifle Recoil Speed</h4>
                <ExerciseQuestion 
                  question="A 4.0 kg rifle fires a 0.01 kg bullet horizontally at speed v = 800 m/s. What is the recoil speed of the rifle?"
                  options={[
                    '2.0 m/s',
                    '4.0 m/s',
                    '8.0 m/s',
                    '200 m/s'
                  ]}
                  correctAnswer={0}
                  explanation="By momentum conservation: 0 = m_bullet v_bullet + m_rifle v_recoil -> 0 = (0.01)(800) + (4.0)(v_recoil) -> 4 v_recoil = -8 -> v_recoil = -2.0 m/s (recoils backward at 2.0 m/s)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.4: Elastic and Inelastic Collisions */}
        <section id="subtopic-6.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            6.4. Elastic and Inelastic Collisions
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Collisions are categorized based on whether <strong>Kinetic Energy (K)</strong> is conserved alongside momentum:
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">1. Elastic Collision</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                  <strong>Both Momentum AND Kinetic Energy are conserved</strong>. No kinetic energy is converted into heat or deformation.
                </p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-emerald-700 dark:text-emerald-300">
                  K_total,i = K_total,f
                </div>
              </div>

              <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">2. Inelastic / Completely Inelastic</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                  <strong>Momentum is conserved, but Kinetic Energy is LOST</strong>. In a <em>completely inelastic collision</em>, objects stick together (v₁f = v₂f = v_f):
                </p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-teal-700 dark:text-teal-300 font-bold">
                  v_f = (m₁ v₁i + m₂ v₂i) / (m₁ + m₂)
                </div>
              </div>
            </div>

            {/* VISUAL DIAGRAM 2: Elastic vs Inelastic Collisions */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>💥</span> Visual Diagram 2: Elastic (Bounce) vs. Completely Inelastic (Stick Together)
              </h4>

              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-96 h-52" viewBox="0 0 380 200">
                  {/* Top Row: Elastic Collision */}
                  <text x="10" y="25" fontSize="12" fontWeight="bold" fill="#047857">1. Elastic (Bounces Off)</text>
                  <rect x="50" y="35" width="40" height="30" fill="#10b981" rx="3" />
                  <text x="62" y="55" fontSize="10" fontWeight="bold" fill="#fff">m₁</text>
                  <line x1="90" y1="50" x2="130" y2="50" stroke="#0284c7" strokeWidth="2" />
                  <polygon points="135,50 127,46 127,54" fill="#0284c7" />

                  <rect x="160" y="35" width="40" height="30" fill="#64748b" rx="3" />
                  <text x="172" y="55" fontSize="10" fontWeight="bold" fill="#fff">m₂</text>

                  <text x="220" y="55" fontSize="12" fontWeight="bold" fill="#64748b">➔ After:</text>
                  <rect x="280" y="35" width="40" height="30" fill="#10b981" rx="3" />
                  <line x1="280" y1="50" x2="250" y2="50" stroke="#ef4444" strokeWidth="2" />
                  <rect x="330" y="35" width="40" height="30" fill="#64748b" rx="3" />
                  <line x1="370" y1="50" x2="390" y2="50" stroke="#0284c7" strokeWidth="2" />

                  {/* Separator line */}
                  <line x1="10" y1="100" x2="370" y2="100" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Bottom Row: Inelastic Collision */}
                  <text x="10" y="125" fontSize="12" fontWeight="bold" fill="#0d9488">2. Completely Inelastic (Sticks Together)</text>
                  <rect x="50" y="135" width="40" height="30" fill="#10b981" rx="3" />
                  <text x="62" y="155" fontSize="10" fontWeight="bold" fill="#fff">m₁</text>
                  <line x1="90" y1="150" x2="130" y2="150" stroke="#0284c7" strokeWidth="2" />

                  <rect x="160" y="135" width="40" height="30" fill="#64748b" rx="3" />
                  <text x="172" y="155" fontSize="10" fontWeight="bold" fill="#fff">m₂</text>

                  <text x="220" y="155" fontSize="12" fontWeight="bold" fill="#64748b">➔ After:</text>
                  {/* Joined block */}
                  <g transform="translate(280, 135)">
                    <rect x="0" y="0" width="40" height="30" fill="#10b981" rx="2" />
                    <rect x="40" y="0" width="40" height="30" fill="#64748b" rx="2" />
                    <text x="18" y="20" fontSize="10" fontWeight="bold" fill="#fff">m₁+m₂</text>
                    <line x1="80" y1="15" x2="110" y2="15" stroke="#0284c7" strokeWidth="3.5" />
                    <polygon points="115,15 107,10 107,20" fill="#0284c7" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Completely Inelastic Collision</h4>
                <ExerciseQuestion 
                  question="A 1000 kg car traveling East at 20 m/s collides with a stationary 3000 kg truck. They lock bumpers and move together. What is their common final speed?"
                  options={[
                    '5 m/s',
                    '6.67 m/s',
                    '10 m/s',
                    '15 m/s'
                  ]}
                  correctAnswer={0}
                  explanation="v_f = (m1 v1i + 0) / (m1 + m2) = (1000 × 20) / (1000 + 3000) = 20,000 / 4000 = 5.0 m/s."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 6.5: Center of Mass */}
        <section id="subtopic-6.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            6.5. Center of Mass
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              The <strong>Center of Mass (CM)</strong> is the average position of all mass in a system, weighted by mass. The center of mass moves as if all system mass were concentrated at that single point and acted on by net external force:
            </p>

            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-2xl text-center space-y-2 font-mono">
              <div className="text-sm md:text-base font-bold text-emerald-800 dark:text-emerald-300">
                x_cm = (∑ m_i x_i) / (∑ m_i) = (m₁ x₁ + m₂ x₂ + ...) / M_total
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 font-sans mt-2">
                Velocity of CM: <strong>v_cm = P_total / M_total</strong> | Acceleration of CM: <strong>∑F_ext = M_total · a_cm</strong>
              </div>
            </div>

            {/* VISUAL DIAGRAM 3: Center of Mass Location */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>📍</span> Visual Diagram 3: Center of Mass Location for Two Particles
              </h4>

              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-80 h-36" viewBox="0 0 320 140">
                  {/* Axis line */}
                  <line x1="30" y1="90" x2="290" y2="90" stroke="#94a3b8" strokeWidth="2" />
                  <polygon points="295,90 287,85 287,95" fill="#94a3b8" />

                  {/* Mass 1 (Small) at x = 0 */}
                  <circle cx="50" cy="90" r="12" fill="#10b981" />
                  <text x="50" y="94" fontSize="10" fontWeight="bold" fill="#fff" textAnchor="middle">m₁</text>
                  <text x="50" y="118" fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle">x₁ = 0</text>

                  {/* Mass 2 (Large) at x = 8 */}
                  <circle cx="250" cy="90" r="24" fill="#0284c7" />
                  <text x="250" y="94" fontSize="11" fontWeight="bold" fill="#fff" textAnchor="middle">m₂ (3x m₁)</text>
                  <text x="250" y="128" fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle">x₂ = 8m</text>

                  {/* Center of Mass Indicator (Closer to m2) */}
                  <polygon points="200,65 194,50 206,50" fill="#ef4444" />
                  <line x1="200" y1="65" x2="200" y2="90" stroke="#ef4444" strokeWidth="2" strokeDasharray="2,2" />
                  <text x="200" y="42" fontSize="11" fontWeight="bold" fill="#ef4444" textAnchor="middle">x_cm = 6m</text>
                </svg>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Two-Body Center of Mass</h4>
                <ExerciseQuestion 
                  question="Mass m1 = 2 kg is located at x1 = 0 m, and mass m2 = 6 kg is located at x2 = 8 m. Where is the center of mass of the system located?"
                  options={[
                    '2.0 meters',
                    '4.0 meters',
                    '6.0 meters',
                    '8.0 meters'
                  ]}
                  correctAnswer={2}
                  explanation="x_cm = (m1 x1 + m2 x2) / (m1 + m2) = (2×0 + 6×8) / (2 + 6) = 48 / 8 = 6.0 meters."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Physics Chapter 6 Master Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Linear Momentum:</strong> Vector p = mv in kg·m/s. F_net = dp/dt.</p>
            <p><strong>✓ Impulse:</strong> J = ∫ F dt = F_avg Δt = Δp (Impulse-Momentum Theorem & Force-Time curve area).</p>
            <p><strong>✓ Conservation of Momentum:</strong> P_total is conserved when ∑F_ext = 0.</p>
            <p><strong>✓ Collisions:</strong> Elastic conserves K; Inelastic loses K; Completely inelastic stick together with v_f = (m₁v₁i + m₂v₂i)/(m₁ + m₂).</p>
            <p><strong>✓ Center of Mass:</strong> x_cm = (∑ m_i x_i)/M_total. Moves according to ∑F_ext = M_total a_cm.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter5');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 5
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter7');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 7
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter6;
