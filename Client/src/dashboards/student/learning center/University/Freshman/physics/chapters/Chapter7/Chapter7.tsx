import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter7Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter7: React.FC<Chapter7Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Physics Chapter 7 • Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          ROTATIONAL MOTION
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-teal-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Rotational motion describes rigid bodies spinning around an axis. Just as force causes linear acceleration, torque causes angular acceleration. In this final chapter, you will master angular displacement, angular velocity, angular acceleration, rotational kinetic energy, moment of inertia, torque, rotational Newton's laws, and conservation of angular momentum.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 7.1: Angular Displacement and Velocity */}
        <section id="subtopic-7.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            7.1. Angular Displacement and Velocity
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              When a rigid body rotates about a fixed axis, every point on the body moves in a circle. Angle <strong>θ</strong> in radians is measured as arc length <em>s</em> divided by radius <em>r</em> (θ = s / r):
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 font-mono text-xs md:text-sm">
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-r-xl">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 font-sans">Angular Velocity (ω)</h4>
                <p className="text-xs font-sans text-slate-600 dark:text-slate-300 mb-2">Rate of change of angular position in radians per second (rad/s):</p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded text-emerald-700 dark:text-emerald-300 font-bold">
                  ω = dθ / dt  |  v_tangential = ω · r
                </div>
              </div>

              <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1 font-sans">Radian Conversion</h4>
                <p className="text-xs font-sans text-slate-600 dark:text-slate-300 mb-2">1 complete revolution = 360° = 2π radians ≈ 6.283 rad:</p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded text-teal-700 dark:text-teal-300 font-bold">
                  1 rad = 180° / π ≈ 57.3°
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Wheel Angular Speed</h4>
                <ExerciseQuestion 
                  question="A wheel rotates at a constant speed of 120 revolutions per minute (rpm). What is its angular velocity in radians per second?"
                  options={[
                    '2π rad/s (≈ 6.28 rad/s)',
                    '4π rad/s (≈ 12.57 rad/s)',
                    '120 rad/s',
                    '240π rad/s'
                  ]}
                  correctAnswer={1}
                  explanation="ω = (120 rev / 60 s) × (2π rad / 1 rev) = 2 rev/s × 2π = 4π rad/s ≈ 12.57 rad/s."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 7.2: Angular Acceleration */}
        <section id="subtopic-7.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            7.2. Angular Acceleration
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Angular Acceleration (α)</strong> is the rate of change of angular velocity over time, measured in <em>rad/s²</em>:
            </p>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl font-mono text-center text-sm md:text-base font-bold text-emerald-800 dark:text-emerald-300">
              α = dω / dt  |  a_tangential = α · r
            </div>

            {/* Rotational Kinematics Equations Card */}
            <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                🏛️ Rotational Kinematic Equations (Constant α)
              </h3>
              <div className="grid md:grid-cols-3 gap-3 font-mono text-xs md:text-sm">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                  <code>ω = ω₀ + α t</code>
                </div>
                <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-xl">
                  <code>θ = ω₀ t + ½ α t²</code>
                </div>
                <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl">
                  <code>ω² = ω₀² + 2 α θ</code>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Disk Acceleration</h4>
                <ExerciseQuestion 
                  question="A disk starting from rest (ω₀ = 0) accelerates uniformly at α = 4 rad/s² for t = 5 seconds. What is its final angular velocity?"
                  options={[
                    '10 rad/s',
                    '20 rad/s',
                    '40 rad/s',
                    '50 rad/s'
                  ]}
                  correctAnswer={1}
                  explanation="ω = ω₀ + α t = 0 + (4)(5) = 20 rad/s."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 7.3: Rotational Kinetic Energy */}
        <section id="subtopic-7.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            7.3. Rotational Kinetic Energy
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A rotating rigid body has <strong>Rotational Kinetic Energy (K_rot)</strong> due to the motion of its individual constituent particles:
            </p>

            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-2xl text-center space-y-2 font-mono">
              <div className="text-base md:text-xl font-bold text-emerald-800 dark:text-emerald-300">
                K_rot = ½ I ω²
              </div>
              <p className="text-xs font-sans text-slate-600 dark:text-slate-300">
                For a rolling body without slipping, total kinetic energy is <strong>K_total = K_translational + K_rotational = ½ M v_cm² + ½ I_cm ω²</strong>.
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Flywheel Energy Storage</h4>
                <ExerciseQuestion 
                  question="A flywheel with moment of inertia I = 5 kg·m² spins at angular speed ω = 10 rad/s. What is its rotational kinetic energy?"
                  options={[
                    '25 Joules',
                    '250 Joules',
                    '500 Joules',
                    '1000 Joules'
                  ]}
                  correctAnswer={1}
                  explanation="K_rot = ½ I ω² = ½ (5)(10²) = 2.5 × 100 = 250 Joules."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 7.4: Moment of Inertia */}
        <section id="subtopic-7.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            7.4. Moment of Inertia
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Moment of Inertia (I)</strong> is the rotational analog of mass. It quantifies a body's resistance to angular acceleration and depends on both total mass and mass distribution relative to the axis of rotation:
            </p>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl font-mono text-center text-sm md:text-base font-bold text-emerald-800 dark:text-emerald-300">
              I = ∑ m_i r_i² = ∫ r² dm  |  Unit: kg·m²
            </div>

            {/* VISUAL DIAGRAM 1: Moment of Inertia Standard Geometries */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>⚪</span> Visual Diagram 1: Moments of Inertia for Common Rigid Bodies
              </h4>

              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-96 h-40" viewBox="0 0 380 150">
                  {/* Shape 1: Solid Disk */}
                  <g transform="translate(60,65)">
                    <ellipse cx="0" cy="0" rx="35" ry="25" fill="#10b981" fillOpacity="0.4" stroke="#059669" strokeWidth="2.5" />
                    <line x1="0" y1="-40" x2="0" y2="40" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="0" y="55" fontSize="11" fontWeight="bold" fill="#047857" textAnchor="middle">Solid Disk</text>
                    <text x="0" y="70" fontSize="11" fontWeight="bold" fill="#047857" textAnchor="middle">I = ½ M R²</text>
                  </g>

                  {/* Shape 2: Thin Hoop */}
                  <g transform="translate(190,65)">
                    <ellipse cx="0" cy="0" rx="35" ry="25" fill="none" stroke="#0284c7" strokeWidth="4" />
                    <line x1="0" y1="-40" x2="0" y2="40" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="0" y="55" fontSize="11" fontWeight="bold" fill="#0284c7" textAnchor="middle">Thin Ring / Hoop</text>
                    <text x="0" y="70" fontSize="11" fontWeight="bold" fill="#0284c7" textAnchor="middle">I = M R²</text>
                  </g>

                  {/* Shape 3: Solid Sphere */}
                  <g transform="translate(320,65)">
                    <circle cx="0" cy="0" r="30" fill="#f59e0b" fillOpacity="0.5" stroke="#d97706" strokeWidth="2" />
                    <ellipse cx="0" cy="0" rx="30" ry="10" fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="0" y1="-40" x2="0" y2="40" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="0" y="55" fontSize="11" fontWeight="bold" fill="#b45309" textAnchor="middle">Solid Sphere</text>
                    <text x="0" y="70" fontSize="11" fontWeight="bold" fill="#b45309" textAnchor="middle">I = ⅖ M R²</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Disk Moment of Inertia</h4>
                <ExerciseQuestion 
                  question="A solid uniform disk has mass M = 4.0 kg and radius R = 0.5 meters. What is its moment of inertia about its central axis?"
                  options={[
                    '0.5 kg·m²',
                    '1.0 kg·m²',
                    '2.0 kg·m²',
                    '4.0 kg·m²'
                  ]}
                  correctAnswer={0}
                  explanation="For a solid disk, I = ½ M R² = ½ (4.0)(0.5²) = 2.0 × 0.25 = 0.5 kg·m²."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 7.5: Torque and Angular Momentum */}
        <section id="subtopic-7.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            7.5. Torque and Angular Momentum
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Torque (τ)</strong> is the rotational analog of force. It measures the rotational effectiveness of a force applied at distance <em>r</em> from a pivot point:
            </p>

            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-2xl text-center space-y-2 font-mono">
              <div className="text-base md:text-xl font-bold text-emerald-800 dark:text-emerald-300">
                τ = r F sin(ϕ) = r_⊥ · F  |  Rotational 2nd Law: ∑τ = I · α
              </div>
              <p className="text-xs font-sans text-slate-600 dark:text-slate-300">
                Where <strong>r_⊥ = r sin(ϕ)</strong> is the perpendicular lever arm distance from the axis of rotation.
              </p>
            </div>

            {/* VISUAL DIAGRAM 2: Torque Vector Wrench */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>🔧</span> Visual Diagram 2: Torque Applied by a Wrench (τ = r F sin ϕ)
              </h4>

              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-80 h-44" viewBox="0 0 320 170">
                  {/* Pivot Nut */}
                  <circle cx="50" cy="110" r="14" fill="#64748b" />
                  <circle cx="50" cy="110" r="6" fill="#f8fafc" />
                  <text x="45" y="140" fontSize="11" fontWeight="bold" fill="#64748b">Pivot O</text>

                  {/* Wrench Bar */}
                  <rect x="50" y="103" width="180" height="14" fill="#94a3b8" rx="3" />
                  
                  {/* Radius vector r */}
                  <line x1="50" y1="110" x2="230" y2="110" stroke="#0284c7" strokeWidth="2.5" />
                  <text x="130" y="100" fontSize="11" fontWeight="bold" fill="#0284c7">Lever Arm r</text>

                  {/* Applied Force Vector F */}
                  <line x1="230" y1="110" x2="280" y2="30" stroke="#ef4444" strokeWidth="3" />
                  <polygon points="284,24 273,32 281,40" fill="#ef4444" />
                  <text x="285" y="25" fontSize="12" fontWeight="bold" fill="#ef4444">Force F</text>

                  {/* Angle Arc ϕ */}
                  <path d="M 260 110 A 30 30 0 0 0 252 75" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <text x="268" y="90" fontSize="12" fontWeight="bold" fill="#f59e0b">ϕ</text>
                </svg>
              </div>
            </div>

            {/* Angular Momentum & Conservation Card */}
            <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm text-center">
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                🏛️ Angular Momentum & Its Conservation
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                <strong>Angular Momentum (L = I ω)</strong> is conserved when net external torque is zero (<strong>∑τ_ext = 0</strong>):
              </p>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-sm md:text-base font-bold text-slate-900 dark:text-white inline-block">
                L_i = L_f  ⟹  I_i · ω_i = I_f · ω_f
              </div>
            </div>

            {/* Figure Skater Application */}
            <div className="p-6 border border-teal-200 dark:border-teal-800 bg-teal-50/40 dark:bg-teal-900/10 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>⛸️</span> Classic Application: The Figure Skater Spin
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                When a spinning figure skater pulls their arms inward, their radius decreases, reducing moment of inertia (I ↓). To conserve angular momentum (L = I ω = constant), their angular spin speed increases dramatically (ω ↑)!
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Conservation of Angular Momentum</h4>
                <ExerciseQuestion 
                  question="A skater spinning at ω1 = 4 rad/s with moment of inertia I1 = 3 kg·m² pulls her arms in, reducing her moment of inertia to I2 = 1.5 kg·m². What is her new angular spin speed?"
                  options={[
                    '2 rad/s',
                    '4 rad/s',
                    '8 rad/s',
                    '12 rad/s'
                  ]}
                  correctAnswer={2}
                  explanation="By conservation of angular momentum: I1 ω1 = I2 ω2 -> (3)(4) = (1.5)(ω2) -> 12 = 1.5 ω2 -> ω2 = 8.0 rad/s."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Physics Chapter 7 Master Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Angular Variables:</strong> θ (rad), ω = dθ/dt (rad/s), α = dω/dt (rad/s²). Linear relation v = ωr, a_t = αr.</p>
            <p><strong>✓ Rotational Kinematics:</strong> ω = ω₀ + αt, θ = ω₀t + ½αt², ω² = ω₀² + 2αθ.</p>
            <p><strong>✓ Rotational Energy & Inertia:</strong> K_rot = ½ I ω², Moment of Inertia I = ∫ r² dm (analog of mass).</p>
            <p><strong>✓ Torque:</strong> τ = r F sin ϕ. Rotational 2nd Law ∑τ = I α.</p>
            <p><strong>✓ Angular Momentum:</strong> L = I ω. Conserved when ∑τ_ext = 0 (I_i ω_i = I_f ω_f).</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter6');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 6
          </button>
          
          <button
            disabled
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-800 text-slate-400 rounded-lg font-medium text-sm md:text-base cursor-not-allowed"
          >
            Completed Subject ✓
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter7;
