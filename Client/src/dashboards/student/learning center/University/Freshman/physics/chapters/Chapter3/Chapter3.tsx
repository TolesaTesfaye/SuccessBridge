import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter3Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter3: React.FC<Chapter3Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Physics Chapter 3 • Comprehensive Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          MOTION IN TWO DIMENSIONS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-teal-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          In two-dimensional motion, an object moves simultaneously along perpendicular axes (x and y). The foundational principle of 2D kinematics is the <strong>independence of perpendicular motions</strong>: horizontal motion (x) has zero effect on vertical motion (y) and vice versa. In this chapter, you will master parabolic projectile trajectories, uniform and non-uniform circular motion, centripetal/tangential accelerations, highway curve banking, and 2D relative velocity transformations.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 3.1: Projectile Motion */}
        <section id="subtopic-3.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            3.1. Projectile Motion
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>projectile</strong> is an object launched into the air that moves under the sole influence of gravity (assuming air resistance is negligible). Its path through space is called its <strong>trajectory</strong>, which is always a <strong>parabola</strong>.
            </p>

            {/* Independence of Perpendicular Motions Grid */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">Horizontal Motion (x-axis)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                  No horizontal force acts on the projectile (a_x = 0). Therefore, the horizontal velocity component remains constant throughout the flight!
                </p>
                <div className="p-3 bg-white dark:bg-slate-800 rounded font-mono text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
                  <p>• a_x = 0</p>
                  <p>• v_x(t) = v₀x = v₀ cos(θ)</p>
                  <p>• x(t) = (v₀ cos θ) · t</p>
                </div>
              </div>

              <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">Vertical Motion (y-axis)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Gravity accelerates the object downward at a constant rate (a_y = -g). Vertical motion is identical to 1D free fall!
                </p>
                <div className="p-3 bg-white dark:bg-slate-800 rounded font-mono text-xs text-teal-700 dark:text-teal-300 space-y-1">
                  <p>• a_y = -g = -9.80 m/s²</p>
                  <p>• v_y(t) = v₀ sin(θ) - g t</p>
                  <p>• y(t) = (v₀ sin θ) · t - ½ g t²</p>
                </div>
              </div>
            </div>

            {/* Parabolic Trajectory Equation Derivation */}
            <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                📐 Derivation of the Parabolic Trajectory Equation y(x)
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3">
                By substituting t = x / (v₀ cos θ) from horizontal motion into vertical position y(t), we eliminate time t to get the explicit trajectory equation y(x):
              </p>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-xs md:text-sm text-center text-slate-900 dark:text-white font-bold mb-3">
                {"y(x) = (tan θ) · x - [ g / (2 v₀² cos² θ) ] · x²"}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Notice that this is of the form y = ax - bx², which is the standard mathematical equation of a downward-opening parabola passing through the origin (0,0)!
              </p>
            </div>

            {/* Key Parabolic Formulas Card */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4">
                🏛️ Fundamental Projectile Formulas (Level Ground Launch)
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4 font-mono text-xs md:text-sm">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block text-sm mb-1">Time of Flight (T):</span>
                  <code>T = (2 v₀ sin θ) / g</code>
                  <span className="text-[10px] text-slate-500 block mt-2">Total time in air before landing at y = 0</span>
                </div>

                <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block text-sm mb-1">Maximum Height (H):</span>
                  <code>H = (v₀² sin² θ) / (2g)</code>
                  <span className="text-[10px] text-slate-500 block mt-2">Peak elevation where v_y = 0</span>
                </div>

                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block text-sm mb-1">Horizontal Range (R):</span>
                  <code>R = (v₀² sin 2θ) / g</code>
                  <span className="text-[10px] text-slate-500 block mt-2">Max distance at θ = 45°</span>
                </div>
              </div>
            </div>

            {/* VISUAL DIAGRAM: Parabolic Projectile Path */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>🎯</span> Visual Trajectory Diagram: Parabolic Motion
              </h4>
              
              <div className="w-full overflow-x-auto p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-full min-w-[550px] h-52" viewBox="0 0 600 200">
                  {/* Axes */}
                  <line x1="50" y1="170" x2="550" y2="170" stroke="currentColor" strokeWidth="2" className="text-slate-400" />
                  <line x1="50" y1="170" x2="50" y2="20" stroke="currentColor" strokeWidth="2" className="text-slate-400" />
                  <text x="560" y="174" fontSize="12" fontWeight="bold" className="fill-slate-600 dark:fill-slate-300">x (Range R)</text>
                  <text x="45" y="15" fontSize="12" fontWeight="bold" className="fill-slate-600 dark:fill-slate-300">y (Height)</text>

                  {/* Parabolic Path */}
                  <path d="M 50 170 Q 300 10 550 170" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="4,4" />

                  {/* Launch Point */}
                  <circle cx="50" cy="170" r="5" fill="#10b981" />
                  <line x1="50" y1="170" x2="110" y2="110" stroke="#059669" strokeWidth="2.5" />
                  <text x="115" y="105" fontSize="11" fontWeight="bold" fill="#059669">v₀</text>

                  {/* Launch Angle Arc */}
                  <path d="M 90 170 A 40 40 0 0 0 78 142" fill="none" stroke="#6b7280" strokeWidth="1.5" />
                  <text x="95" y="158" fontSize="11" fontWeight="bold" fill="#4b5563">θ</text>

                  {/* Apex Point (v_y = 0) */}
                  <circle cx="300" cy="90" r="5" fill="#0284c7" />
                  <line x1="300" y1="90" x2="350" y2="90" stroke="#0284c7" strokeWidth="2" />
                  <text x="300" y="75" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0284c7">Apex: v_y = 0 (v = v_x)</text>

                  {/* Max Height Indicator */}
                  <line x1="300" y1="90" x2="300" y2="170" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="305" y="135" fontSize="11" fontWeight="bold" fill="#64748b">H_max</text>

                  {/* Impact Point */}
                  <circle cx="550" cy="170" r="5" fill="#f59e0b" />
                  <text x="530" y="190" fontSize="11" fontWeight="bold" fill="#d97706">Impact Point</text>
                </svg>
              </div>
            </div>

            {/* Worked Numerical Example Card */}
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                <span>💡</span> Worked Example: Football Kick Trajectory
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3">
                A football player kicks a ball with v₀ = 20 m/s at θ = 37° (sin 37° ≈ 0.6, cos 37° ≈ 0.8). Taking g = 10 m/s²:
              </p>
              <div className="space-y-2 text-xs md:text-sm font-mono text-slate-800 dark:text-slate-200">
                <p>1. Components: v₀x = 20 × 0.8 = 16 m/s, v₀y = 20 × 0.6 = 12 m/s</p>
                <p>2. Time of flight: T = 2 v₀y / g = (2 × 12) / 10 = 2.4 seconds</p>
                <p>3. Max Height: H = v₀y² / (2g) = (12²) / 20 = 144 / 20 = 7.2 meters</p>
                <p>4. Horizontal Range: R = v₀x · T = 16 × 2.4 = 38.4 meters</p>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Max Height of a Cannonball</h4>
                <ExerciseQuestion 
                  question="A cannonball is launched with initial velocity v0 = 50 m/s at an angle θ = 30° above horizontal. Taking g = 9.8 m/s², what is its maximum height?"
                  options={[
                    '31.9 meters',
                    '63.8 meters',
                    '127.6 meters',
                    '25.0 meters'
                  ]}
                  correctAnswer={0}
                  explanation="v0y = v0 sin(30°) = 50 × 0.5 = 25 m/s. H = (v0y²) / (2g) = (25²) / (2 × 9.8) = 625 / 19.6 ≈ 31.89 m."
                />
              </div>

              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Horizontal Range</h4>
                <ExerciseQuestion 
                  question="At what launch angle θ (above horizontal) is the horizontal range of a projectile on flat ground maximized?"
                  options={[
                    '30°',
                    '45°',
                    '60°',
                    '90°'
                  ]}
                  correctAnswer={1}
                  explanation="Range R = (v0² sin(2θ)) / g. The term sin(2θ) reaches its maximum value of 1 when 2θ = 90°, which means θ = 45°."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 3.2: Uniform Circular Motion */}
        <section id="subtopic-3.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            3.2. Uniform Circular Motion
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Uniform Circular Motion (UCM)</strong> occurs when an object travels along a circular path of radius <em>r</em> at a <strong>constant speed</strong> <em>v</em>. Although the speed |v| is constant, the velocity vector continuously changes direction toward the center of the circle!
            </p>

            {/* Centripetal Acceleration Card */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-xl space-y-3">
              <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">Centripetal (Radial) Acceleration</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                The acceleration vector points <strong>radially inward toward the center</strong> at all times and is strictly perpendicular to the tangential velocity vector.
              </p>
              <div className="p-3 bg-white dark:bg-slate-800 rounded font-mono text-sm text-emerald-700 dark:text-emerald-300 font-bold text-center">
                a_c = v² / r = ω² r
              </div>
            </div>

            {/* Banking of Highway Curves Detail Box */}
            <div className="p-6 border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-900/10 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>🏎️</span> Application: Ideal Banking Angle for Highway Curves
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                To prevent vehicles from skidding off circular curves without relying on friction, civil engineers tilt (bank) the road at an angle θ. The horizontal component of the normal force provides the required centripetal force:
              </p>
              <div className="p-3 bg-white dark:bg-slate-800 rounded font-mono text-xs md:text-sm text-teal-700 dark:text-teal-300 font-bold text-center">
                tan(θ) = v² / (g · r)
              </div>
            </div>

            {/* Key Relationships Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Period (T) & Frequency (f)</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">T is time for 1 full revolution. f = 1/T is revs per second.</p>
                <div className="font-mono text-xs text-teal-700 dark:text-teal-300">v = 2πr / T = 2πr f</div>
              </div>

              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Angular Velocity (ω)</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">Rate of angular displacement in radians per second.</p>
                <div className="font-mono text-xs text-cyan-700 dark:text-cyan-300">ω = v / r = 2π / T</div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Centripetal Force (F_c)</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">Net inward force required by Newton's Second Law.</p>
                <div className="font-mono text-xs text-blue-700 dark:text-blue-300">F_c = m a_c = m v² / r</div>
              </div>
            </div>

            {/* VISUAL DIAGRAM: Circular Path */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>🔄</span> Visual Diagram: Velocity & Centripetal Acceleration Vectors
              </h4>

              <div className="w-full flex justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <svg className="w-64 h-64" viewBox="0 0 200 200">
                  {/* Circle Path */}
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4,4" />
                  {/* Center O */}
                  <circle cx="100" cy="100" r="4" fill="#64748b" />
                  <text x="92" y="115" fontSize="11" fontWeight="bold" className="fill-slate-600 dark:fill-slate-300">O</text>

                  {/* Object Position */}
                  <circle cx="170" cy="100" r="6" fill="#10b981" />
                  
                  {/* Radius vector */}
                  <line x1="100" y1="100" x2="170" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                  <text x="130" y="95" fontSize="11" fontWeight="bold" fill="#64748b">r</text>

                  {/* Tangential Velocity Vector (Upward) */}
                  <line x1="170" y1="100" x2="170" y2="45" stroke="#0284c7" strokeWidth="3" />
                  <polygon points="170,40 165,50 175,50" fill="#0284c7" />
                  <text x="178" y="55" fontSize="12" fontWeight="bold" fill="#0284c7">v (Tangent)</text>

                  {/* Centripetal Acceleration Vector (Leftward toward center) */}
                  <line x1="170" y1="100" x2="120" y2="100" stroke="#ef4444" strokeWidth="3" />
                  <polygon points="115,100 125,95 125,105" fill="#ef4444" />
                  <text x="125" y="118" fontSize="12" fontWeight="bold" fill="#ef4444">a_c (Inward)</text>
                </svg>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Calculating Centripetal Acceleration</h4>
                <ExerciseQuestion 
                  question="A car rounds a circular curve of radius r = 50 m at a constant speed of v = 20 m/s. What is its centripetal acceleration?"
                  options={[
                    '0.4 m/s²',
                    '4.0 m/s²',
                    '8.0 m/s²',
                    '10.0 m/s²'
                  ]}
                  correctAnswer={2}
                  explanation="a_c = v² / r = (20²) / 50 = 400 / 50 = 8.0 m/s² directed toward the center of the curve."
                />
              </div>

              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Speed and Radius Relationship</h4>
                <ExerciseQuestion 
                  question="If a runner doubles their speed around a circular track of fixed radius r, by what factor does their centripetal acceleration increase?"
                  options={[
                    'It remains the same',
                    'It doubles (2x)',
                    'It quadruples (4x)',
                    'It increases by 8x'
                  ]}
                  correctAnswer={2}
                  explanation="Because a_c = v² / r, centripetal acceleration is proportional to v². Doubling speed (2v)² yields 4v², so a_c quadruples (4x)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 3.3: Tangential and Radial Acceleration */}
        <section id="subtopic-3.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            3.3. Tangential and Radial Acceleration
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              When an object moves along a curved path with <strong>changing speed</strong> (Non-Uniform Circular Motion), its total acceleration vector has two perpendicular components:
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">1. Radial (Centripetal) Component (a_r)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                  Points toward center of curvature. Responsible for <strong>changing the direction</strong> of the velocity vector.
                </p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-emerald-700 dark:text-emerald-300">
                  a_r = v² / r
                </div>
              </div>

              <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">2. Tangential Component (a_t)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                  Parallel or antiparallel to velocity vector. Responsible for <strong>changing the speed</strong> (magnitude of velocity).
                </p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-teal-700 dark:text-teal-300">
                  a_t = d|v| / dt = α · r
                </div>
              </div>
            </div>

            {/* Total Acceleration Equation Card */}
            <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900 text-center">
              <h4 className="font-bold text-slate-900 dark:text-white text-base md:text-lg mb-2">Total Acceleration Vector</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-4">
                Since a_r and a_t are mutually perpendicular, total acceleration magnitude is given by the Pythagorean Theorem:
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-sm md:text-base text-emerald-700 dark:text-emerald-300 font-bold inline-block">
                a = √(a_r² + a_t²)
              </div>
            </div>

            {/* Vertical Circle Case Study Box */}
            <div className="p-6 border border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-900 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>🎢</span> Case Study: Vertical Roller-Coaster Loop
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                In a vertical circle of radius r, gravity contributes to tangential acceleration going up/down, and to radial acceleration at the top and bottom:
              </p>
              <div className="space-y-1 font-mono text-xs text-emerald-800 dark:text-emerald-300">
                <p>• At Bottom: Normal Force N = m g + m v² / r (Maximum apparent weight!)</p>
                <p>• At Top: Normal Force N = m v² / r - m g</p>
                <p>• Minimum top speed to complete loop without falling off (N ≥ 0): v_min = √(g · r)</p>
              </div>
            </div>

            {/* Practice Exercise */}
            <div className="mt-8">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Total Non-Uniform Acceleration</h4>
                <ExerciseQuestion 
                  question="A car on a circular track of radius r = 100 m has a speed of 20 m/s and is speeding up at a tangential rate of a_t = 3 m/s². What is the magnitude of its total acceleration?"
                  options={[
                    '3 m/s²',
                    '4 m/s²',
                    '5 m/s²',
                    '7 m/s²'
                  ]}
                  correctAnswer={2}
                  explanation="Radial acceleration a_r = v² / r = (20²) / 100 = 4 m/s². Tangential acceleration a_t = 3 m/s². Total acceleration a = √(a_r² + a_t²) = √(4² + 3²) = √(16 + 9) = √25 = 5 m/s²."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 3.4: Relative Velocity and Acceleration */}
        <section id="subtopic-3.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            3.4. Relative Velocity and Acceleration
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Velocity measurements depend on the observer's reference frame. The velocity of particle <strong>P</strong> relative to frame <strong>A</strong> is connected to its velocity relative to frame <strong>B</strong> by Galilean transformation:
            </p>

            {/* Galilean Velocity Transformation Card */}
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center">
              <h4 className="font-bold text-slate-900 dark:text-white text-base md:text-lg mb-2">Galilean Velocity Transformation Equation</h4>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl font-mono text-sm md:text-base text-emerald-700 dark:text-emerald-300 font-bold inline-block mb-3">
                v_(P/A) = v_(P/B) + v_(B/A)
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                Where <strong>v_(P/A)</strong> = velocity of P relative to frame A, <strong>v_(P/B)</strong> = velocity of P relative to frame B, and <strong>v_(B/A)</strong> = velocity of frame B relative to frame A.
              </p>
            </div>

            {/* Airplane Crosswind Example */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-3 flex items-center gap-2">
                <span>✈️</span> Application: Airplane Flying in Crosswind
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                An airplane heads North at airspeed 200 km/h relative to air, while a wind blows West at 50 km/h relative to the ground. The resultant ground velocity is:
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-xs md:text-sm text-emerald-800 dark:text-emerald-300 space-y-1">
                <p>• Ground speed: v_ground = √[ 200² + 50² ] = √[ 40000 + 2500 ] = √42500 ≈ 206.15 km/h</p>
                <p>• Heading drift angle: θ = arctan(50 / 200) = arctan(0.25) ≈ 14.04° West of North</p>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: River Crossing Velocity</h4>
                <ExerciseQuestion 
                  question="A boat heads directly East across a river at 4 m/s relative to the water. The river flows North at 3 m/s. What is the speed of the boat relative to an observer standing on the shore?"
                  options={[
                    '1 m/s',
                    '5 m/s',
                    '7 m/s',
                    '12 m/s'
                  ]}
                  correctAnswer={1}
                  explanation="v_(boat/ground) = √[(v_east)² + (v_north)²] = √(4² + 3²) = √(16 + 9) = √25 = 5 m/s."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Physics Chapter 3 Master Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Independence of Motions:</strong> 2D motion is resolved into independent 1D horizontal (a_x = 0) and vertical (a_y = -g) components.</p>
            <p><strong>✓ Projectile Motion:</strong> Trajectory is parabolic y(x) = (tan θ)x - [g/(2v₀²cos²θ)]x². Max range occurs at θ = 45°.</p>
            <p><strong>✓ Uniform Circular Motion:</strong> Constant speed v, but centripetal acceleration a_c = v²/r points inward to center O.</p>
            <p><strong>✓ Highway Banking:</strong> Ideal angle without friction is tan θ = v² / (g r).</p>
            <p><strong>✓ Non-Uniform Circular Motion:</strong> Total acceleration a = √(a_r² + a_t²) combines radial (a_r = v²/r) and tangential (a_t = dv/dt) acceleration.</p>
            <p><strong>✓ Relative Velocity:</strong> Vector transformation satisfies v_(P/A) = v_(P/B) + v_(B/A).</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 2
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter4');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 4
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter3;
