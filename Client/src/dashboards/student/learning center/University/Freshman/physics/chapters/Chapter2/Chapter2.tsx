import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter2Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter2: React.FC<Chapter2Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Physics Chapter 2 • Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          MOTION IN ONE DIMENSION
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-teal-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Welcome to Kinematics! Kinematics is the branch of mechanics that describes the motion of objects without considering the forces that cause the motion. In this chapter, you will master position, displacement, speed, velocity, acceleration, kinematic equations for constant acceleration, kinematic graphs, and free-fall under gravity.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 2.1: Position, Displacement, and Distance */}
        <section id="subtopic-2.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            2.1. Position, Displacement, and Distance
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              To describe motion, we must first locate an object relative to a chosen reference frame (origin x = 0).
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 md:p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">Distance (Scalar)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                  The total length of the actual path traveled by an object. It is always positive or zero (d ≥ 0) and has no direction.
                </p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-emerald-700 dark:text-emerald-300">
                  d = Path length (Cumulative)
                </div>
              </div>
              
              <div className="p-4 md:p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">Displacement (Vector)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                  The straight-line change in position from initial position (xᵢ) to final position (x_f). It has both magnitude and sign (+ or -).
                </p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-teal-700 dark:text-teal-300">
                  Δx = x_f - xᵢ
                </div>
              </div>
            </div>

            {/* VISUAL DIAGRAM: Distance vs Displacement */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
                <span>📐</span> Visual Motion Diagram: Distance vs. Displacement
              </h4>
              
              <div className="space-y-4">
                {/* SVG 1D Axis Diagram */}
                <div className="w-full overflow-x-auto p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <svg className="w-full min-w-[500px] h-32" viewBox="0 0 600 120">
                    {/* Axis Line */}
                    <line x1="50" y1="70" x2="550" y2="70" stroke="currentColor" strokeWidth="3" className="text-slate-400" />
                    {/* Ticks & Labels */}
                    {[
                      { pos: 100, label: "-20m (A)" },
                      { pos: 200, label: "0m (Origin)" },
                      { pos: 350, label: "+30m (B)" },
                      { pos: 500, label: "+60m (C)" }
                    ].map((t, idx) => (
                      <g key={idx}>
                        <line x1={t.pos} y1="62" x2={t.pos} y2="78" stroke="currentColor" strokeWidth="3" className="text-slate-600 dark:text-slate-300" />
                        <text x={t.pos} y="95" textAnchor="middle" fontSize="12" fontWeight="bold" className="fill-slate-700 dark:fill-slate-200">{t.label}</text>
                      </g>
                    ))}

                    {/* Path Curve for Distance: Moves from Origin to C (+60m), then back to B (+30m) */}
                    <path d="M 200 60 Q 350 20 500 60" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
                    <path d="M 500 60 Q 425 35 350 60" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" />
                    
                    {/* Displacement Arrow (Direct 0 to 30) */}
                    <line x1="200" y1="45" x2="340" y2="45" stroke="#3b82f6" strokeWidth="4" markerEnd="url(#arrow)" />
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  <strong>Scenario:</strong> A car starts at Origin (0m), travels right to Point C (+60m), then reverses left to Point B (+30m).
                  <br/>
                  • <strong>Total Distance:</strong> 60m (to C) + 30m (back to B) = <strong>90 meters</strong>.
                  <br/>
                  • <strong>Displacement (Δx):</strong> Final position (+30m) - Initial position (0m) = <strong>+30 meters</strong>.
                </div>
              </div>
            </div>

            {/* Detail Note */}
            <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
              <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
                <span>📝</span> Detail Note: When does Distance equal Displacement?
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Distance equals the magnitude of displacement (d = |Δx|) ONLY when an object moves in a <strong>straight line in a single direction</strong> without turning back. If the object changes direction, distance is strictly greater than displacement magnitude (d &gt; |Δx|).
              </p>
            </div>

            {/* Real-World Example */}
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
              <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
                <span>🌍</span> Real-World Example: 400m Track Race
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                In a 400-meter track race, an athlete completes one full lap around the oval track and returns to the exact starting line. Their **Total Distance** traveled is 400 meters, but their **Net Displacement** is exactly 0 meters because their final position is identical to their starting position!
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Distance vs Displacement</h4>
                <ExerciseQuestion 
                  question="A person walks 50 meters East, turns around, and walks 20 meters West. What are the total distance and displacement?"
                  options={[
                    'Distance = 70 m, Displacement = +30 m East',
                    'Distance = 30 m, Displacement = +70 m East',
                    'Distance = 70 m, Displacement = +70 m East',
                    'Distance = 30 m, Displacement = 0 m'
                  ]}
                  correctAnswer={0}
                  explanation="Distance = 50m + 20m = 70 meters. Displacement Δx = +50m - 20m = +30 meters East."
                />
              </div>

              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Round Trip Motion</h4>
                <ExerciseQuestion 
                  question="If an object travels in a complete circle of radius R and returns to its starting point, what is its net displacement?"
                  options={[
                    '2πR',
                    'πR²',
                    '0',
                    '2R'
                  ]}
                  correctAnswer={2}
                  explanation="Since final position equals initial position (xf = xi), displacement Δx = xf - xi = 0."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.2: Velocity and Speed */}
        <section id="subtopic-2.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            2.2. Velocity and Speed
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Just as distance and displacement differ, <strong>Speed</strong> and <strong>Velocity</strong> represent distinct concepts in kinematics.
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-emerald-500 shadow-sm">
              <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-2">Average Speed (Scalar)</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                Total distance divided by total elapsed time. Always positive.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded font-mono text-xs text-emerald-600 dark:text-emerald-400">
                Average Speed = (Total Distance) / (Total Time) = d / Δt
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-teal-500 shadow-sm">
              <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-2">Average Velocity (Vector)</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                Rate of change of position (displacement divided by time). Carries direction (+ or -).
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded font-mono text-xs text-teal-600 dark:text-teal-400">
                v_avg = Δx / Δt = (x_f - xᵢ) / (t_f - tᵢ)
              </div>
            </div>
          </div>

          <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 mb-8">
            <h4 className="font-bold text-slate-900 dark:text-white text-base md:text-lg mb-2">Instantaneous Velocity ($v$)</h4>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-4">
              The velocity of an object at a specific single instant in time. Mathematically, it is the derivative of position with respect to time:
            </p>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-center font-mono text-sm md:text-base font-bold text-emerald-800 dark:text-emerald-300">
              v = lim (Δt → 0) [Δx / Δt] = dx / dt
            </div>
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Graphical Interpretation of Velocity
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              On a <strong>Position-Time graph (x vs. t)</strong>:
              <br/>
              • The slope of a secant line between two points equals the <strong>Average Velocity</strong>.
              <br/>
              • The slope of the tangent line at any specific point equals the <strong>Instantaneous Velocity</strong>.
            </p>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Car Speedometer vs GPS Velocity
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              A dashboard speedometer displays **Instantaneous Speed** (e.g. 80 km/h) without direction. A GPS navigation system computes **Instantaneous Velocity** by tracking magnitude (80 km/h) and directional heading vector (North-West on Highway 1).
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Average Velocity Calculation</h4>
              <ExerciseQuestion 
                question="A car moves from x = +20 m to x = +100 m in 4 seconds. What is its average velocity?"
                options={[
                  '20 m/s',
                  '25 m/s',
                  '30 m/s',
                  '80 m/s'
                ]}
                correctAnswer={0}
                explanation="v_avg = Δx / Δt = (100 - 20) / 4 = 80 / 4 = 20 m/s."
              />
            </div>

            <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Instantaneous Velocity Derivative</h4>
              <ExerciseQuestion 
                question="An object's position as a function of time is given by x(t) = 3t² + 2t + 5 (where x is in meters and t in seconds). What is its instantaneous velocity at t = 2 s?"
                options={[
                  '12 m/s',
                  '14 m/s',
                  '21 m/s',
                  '10 m/s'
                ]}
                correctAnswer={1}
                explanation="v(t) = dx/dt = 6t + 2. At t = 2s, v(2) = 6(2) + 2 = 12 + 2 = 14 m/s."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.3: Acceleration */}
        <section id="subtopic-2.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            2.3. Acceleration
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            <strong>Acceleration</strong> describes how rapidly an object's velocity is changing over time. Because velocity is a vector, acceleration occurs whenever speed changes, direction changes, or both change!
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-emerald-500 shadow-sm">
              <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-2">{"Average Acceleration ($a_{avg}$)"}</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                Change in velocity divided by elapsed time. Unit: m/s².
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded font-mono text-xs text-emerald-600 dark:text-emerald-400">
                a_avg = Δv / Δt = (v_f - vᵢ) / (t_f - tᵢ)
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-teal-500 shadow-sm">
              <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-2">Instantaneous Acceleration ($a$)</h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                Derivative of velocity with respect to time (second derivative of position).
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded font-mono text-xs text-teal-600 dark:text-teal-400">
                a = dv / dt = d²x / dt²
              </div>
            </div>
          </div>

          {/* VISUAL DIAGRAM: Speeding Up vs Slowing Down Signs */}
          <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 mb-8">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
              <span>📊</span> Visual Sign Guide: Speeding Up vs. Slowing Down
            </h4>

            <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <h5 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">⚡ SPEEDING UP (Speed Increases)</h5>
                <p className="text-slate-700 dark:text-slate-300">
                  Velocity and Acceleration have the <strong>SAME SIGN</strong>:
                  <br/>
                  • Moving Right (+v) and Accelerating Right (+a) → Speed Increases!
                  <br/>
                  • Moving Left (-v) and Accelerating Left (-a) → Speed Increases!
                </p>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-xl border border-amber-200 dark:border-amber-800">
                <h5 className="font-bold text-amber-800 dark:text-amber-300 mb-2">🛑 SLOWING DOWN / Deceleration</h5>
                <p className="text-slate-700 dark:text-slate-300">
                  Velocity and Acceleration have <strong>OPPOSITE SIGNS</strong>:
                  <br/>
                  • Moving Right (+v) and Accelerating Left (-a) → Slowing Down!
                  <br/>
                  • Moving Left (-v) and Accelerating Right (+a) → Slowing Down!
                </p>
              </div>
            </div>
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Slope of Velocity-Time Graph
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              On a <strong>Velocity-Time graph (v vs. t)</strong>:
              <br/>
              • The <strong>slope</strong> at any point equals the acceleration.
              <br/>
              • The <strong>area under the curve</strong> between two times equals the displacement (Δx).
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Acceleration Calculation</h4>
              <ExerciseQuestion 
                question="A sports car accelerates from rest (v0 = 0) to 30 m/s in 5 seconds. What is its average acceleration?"
                options={[
                  '5 m/s²',
                  '6 m/s²',
                  '15 m/s²',
                  '150 m/s²'
                ]}
                correctAnswer={1}
                explanation="a_avg = (v_f - v_i) / Δt = (30 - 0) / 5 = 6 m/s²."
              />
            </div>

            <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Signs of Motion</h4>
              <ExerciseQuestion 
                question="A train moving in the negative x-direction (-v) hits the brakes and slows down. What is the sign of its acceleration?"
                options={[
                  'Positive (+a)',
                  'Negative (-a)',
                  'Zero (0)',
                  'Undetermined'
                ]}
                correctAnswer={0}
                explanation="When an object slows down, acceleration is OPPOSITE in sign to velocity. Since velocity is negative (-v), acceleration must be POSITIVE (+a)."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.4: Motion with Constant Acceleration */}
        <section id="subtopic-2.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            2.4. Motion with Constant Acceleration
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            When an object moves with <strong>constant (uniform) acceleration</strong> ({"$a = \\text{constant}$"}), we derive the four fundamental <strong>Kinematic Equations</strong> of motion.
          </p>

          {/* Master Kinematic Equations Card */}
          <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900 mb-8 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">
              🏛️ The 4 Fundamental Kinematic Equations
            </h3>
            
            <div className="space-y-4 font-mono text-xs md:text-sm">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">1. Velocity-Time Relation:</span>
                  <code>v = v₀ + a t</code>
                </div>
                <span className="text-[10px] text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded">(Missing: Δx)</span>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">2. Position-Time Relation:</span>
                  <code>x = x₀ + v₀ t + ½ a t²</code>
                </div>
                <span className="text-[10px] text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded">(Missing: final v)</span>
              </div>

              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">3. Velocity-Displacement Relation:</span>
                  <code>v² = v₀² + 2 a (x - x₀)</code>
                </div>
                <span className="text-[10px] text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded">(Missing: time t)</span>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">4. Average Velocity Relation:</span>
                  <code>x - x₀ = ½ (v₀ + v) t</code>
                </div>
                <span className="text-[10px] text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded">(Missing: acceleration a)</span>
              </div>
            </div>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Car Emergency Braking Distance
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Automotive safety engineers use equation 3 ($v^2 = v_0^2 + 2a\Delta x$) to calculate stopping distances. Notice that stopping distance ($\Delta x$) is proportional to $v_0^2$! Doubling your speed from 50 km/h to 100 km/h quadruples ($2^2 = 4$) the required braking distance to avoid a collision!
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Finding Final Velocity</h4>
              <ExerciseQuestion 
                question="A car starting from rest (v0 = 0) accelerates at a constant rate of 3 m/s² for 6 seconds. What is its final velocity?"
                options={[
                  '9 m/s',
                  '18 m/s',
                  '36 m/s',
                  '54 m/s'
                ]}
                correctAnswer={1}
                explanation="v = v0 + at = 0 + (3)(6) = 18 m/s."
              />
            </div>

            <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Finding Displacement</h4>
              <ExerciseQuestion 
                question="An airplane accelerates on a runway from rest at 4 m/s² for 10 seconds before liftoff. How long is the runway distance used?"
                options={[
                  '40 meters',
                  '100 meters',
                  '200 meters',
                  '400 meters'
                ]}
                correctAnswer={2}
                explanation="Δx = v0 t + 1/2 a t² = 0 + (0.5)(4)(10²) = 2 x 100 = 200 meters."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 2.5: Free Fall Motion */}
        <section id="subtopic-2.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            2.5. Free Fall Motion
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            <strong>Free Fall</strong> is the motion of an object under the influence of gravity alone (neglecting air resistance). Near the Earth's surface, all free-falling bodies experience a constant downward acceleration of:
            <br/>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block my-2 text-center text-sm md:text-base">
              g = 9.80 m/s² ≈ 9.8 m/s² (Downward)
            </span>
          </p>

          {/* Free Fall Trajectory Diagram */}
          <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 mb-8">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base mb-4 flex items-center gap-2">
              <span>🚀</span> Visual Free Fall Trajectory & Symmetry
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <p><strong>1. At Maximum Height (Apex):</strong> Velocity is zero (v = 0), but acceleration is STILL a = -g = -9.8 m/s²!</p>
                <p><strong>2. Time Symmetry:</strong> Time to go UP to maximum height equals time to fall BACK DOWN (t_up = t_down).</p>
                <p><strong>3. Speed Symmetry:</strong> Object passes any point on the way down with the EXACT SAME speed it had going up, but in the opposite direction (v_down = -v_up).</p>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-xs space-y-2 text-slate-800 dark:text-slate-200">
                <h5 className="font-bold text-emerald-800 dark:text-emerald-300 text-xs uppercase">Free-Fall Kinematic Equations (y-up axis):</h5>
                <p>• v_y = v₀y - g t</p>
                <p>• y = y₀ + v₀y t - ½ g t²</p>
                <p>• v_y² = v₀y² - 2 g (y - y₀)</p>
              </div>
            </div>
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Galileo's Leaning Tower of Pisa Experiment
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Galileo Galilei proved that in a vacuum, <strong>all objects fall with the exact same acceleration (g)</strong> regardless of their mass! A feather and a heavy bowling ball dropped simultaneously in a vacuum chamber will hit the ground at the exact same instant.
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Dropped Object Free Fall</h4>
              <ExerciseQuestion 
                question="A stone is dropped from rest (v0 = 0) from a bridge. Taking g = 9.8 m/s², how fast is the stone traveling after falling for 3 seconds?"
                options={[
                  '9.8 m/s',
                  '19.6 m/s',
                  '29.4 m/s',
                  '44.1 m/s'
                ]}
                correctAnswer={2}
                explanation="v = v0 + gt = 0 + (9.8)(3) = 29.4 m/s downwards."
              />
            </div>

            <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Maximum Height Free Fall</h4>
              <ExerciseQuestion 
                question="A ball is thrown vertically upwards with initial velocity v0 = 19.6 m/s. Taking g = 9.8 m/s², how many seconds does it take to reach maximum height?"
                options={[
                  '1 second',
                  '2 seconds',
                  '3 seconds',
                  '4 seconds'
                ]}
                correctAnswer={1}
                explanation="At max height, v = 0. Using v = v0 - gt -> 0 = 19.6 - 9.8 t -> 9.8 t = 19.6 -> t = 2 seconds."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Physics Chapter 2 Master Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Distance vs Displacement:</strong> Distance is total path length (scalar); Displacement is Δx = x_f - xᵢ (vector straight line).</p>
            <p><strong>✓ Speed vs Velocity:</strong> Speed is scalar (d/Δt); Velocity is vector (Δx/Δt). Instantaneous velocity is v = dx/dt.</p>
            <p><strong>✓ Acceleration:</strong> Rate of change of velocity (a = dv/dt). Speeding up occurs when v and a share the same sign; slowing down occurs when v and a have opposite signs.</p>
            <p><strong>✓ Kinematic Equations:</strong> Valid for constant acceleration: v = v₀ + at, x = x₀ + v₀t + ½at², v² = v₀² + 2aΔx.</p>
            <p><strong>✓ Free Fall Motion:</strong> Vertical motion under gravity alone with downward acceleration a_y = -g = -9.8 m/s². At maximum height, v = 0.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter1');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 1
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter3');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 3
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter2;
