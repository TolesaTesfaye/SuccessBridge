import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter4Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter4: React.FC<Chapter4Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
          Physics Chapter 4 • Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          LAWS OF MOTION
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-teal-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Dynamics is the study of the causes of motion—forces. Sir Isaac Newton formulated three fundamental laws of motion that govern all macroscopic motion in classical mechanics. In this chapter, you will master inertia, net external forces, Newton's three laws, Free-Body Diagrams (FBDs), Atwood machines, inclined plane dynamics, and static versus kinetic friction.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 4.1: Newton's First Law of Motion */}
        <section id="subtopic-4.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            4.1. Newton's First Law of Motion (Law of Inertia)
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Newton's First Law of Motion</strong> states that an object continues in its state of rest or of uniform velocity along a straight line unless acted upon by a non-zero net external force:
            </p>

            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-2xl text-center space-y-2">
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 text-sm md:text-lg block">
                If ∑F = 0  ⟹  a = 0  (v = constant)
              </span>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                In the absence of a net force, a stationary object stays stationary, and a moving object keeps moving at constant speed in a straight line forever!
              </p>
            </div>

            {/* Core Concepts Grid */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">1. Concept of Inertia & Mass</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  <strong>Inertia</strong> is the natural tendency of an object to resist changes in its state of motion. <strong>Mass (m)</strong> is the quantitative scalar measure of inertia (measured in kilograms in SI). A more massive body requires a larger force to change its velocity.
                </p>
              </div>

              <div className="p-5 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">2. Inertial Frames of Reference</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  Newton's laws are valid ONLY in <strong>Inertial Reference Frames</strong> (frames moving with zero acceleration / constant velocity). Accelerating or rotating reference frames are non-inertial and introduce fictitious forces (like centrifugal or Coriolis force).
                </p>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Inertia in Deep Space</h4>
                <ExerciseQuestion 
                  question="A spacecraft travels in deep space far away from any star or planet. If its engines are turned off completely, what will happen to the spacecraft?"
                  options={[
                    'It will immediately come to a complete stop',
                    'It will gradually slow down and eventually stop',
                    'It will continue moving forever at constant speed in a straight line',
                    'It will move in a circular loop'
                  ]}
                  correctAnswer={2}
                  explanation="According to Newton's First Law (Inertia), because no net external force acts on the spacecraft in deep space (∑F = 0), it maintains constant velocity (constant speed and direction) indefinitely."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 4.2: Newton's Second Law of Motion */}
        <section id="subtopic-4.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            4.2. Newton's Second Law of Motion
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Newton's Second Law</strong> states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. The acceleration is in the direction of the net force:
            </p>

            {/* Fundamental Equation Card */}
            <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900 text-center shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                🏛️ The Fundamental Law of Mechanics
              </h3>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl font-mono text-base md:text-xl font-bold text-slate-900 dark:text-white inline-block mb-3">
                ∑F = m · a
              </div>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                In component form: <strong>∑F_x = m a_x</strong>, <strong>∑F_y = m a_y</strong>, <strong>∑F_z = m a_z</strong>
              </p>
            </div>

            {/* Units & Mass vs Weight Grid */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">SI Unit of Force: The Newton (N)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                  One Newton is defined as the force required to accelerate a 1 kg mass at 1 m/s²:
                </p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-emerald-700 dark:text-emerald-300 font-bold">
                  1 N = 1 kg · m/s²
                </div>
              </div>

              <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">Mass vs. Weight (W)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-2">
                  Mass is intrinsic scalar inertia (kg). Weight is the downward gravitational force vector exerted by Earth (N):
                </p>
                <div className="p-2 bg-white dark:bg-slate-800 rounded font-mono text-xs text-teal-700 dark:text-teal-300 font-bold">
                  W = m · g
                </div>
              </div>
            </div>

            {/* Worked Example */}
            <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                <span>💡</span> Worked Example: Accelerating Crate
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                A 10 kg crate is pushed across a horizontal floor with a force F_push = 50 N to the right. A kinetic friction force f_k = 10 N opposes the motion. What is the crate's acceleration?
              </p>
              <div className="space-y-1 text-xs md:text-sm font-mono text-slate-800 dark:text-slate-200">
                <p>• Net Force: ∑F_x = F_push - f_k = 50 N - 10 N = 40 N (Right)</p>
                <p>• Acceleration: a_x = ∑F_x / m = 40 N / 10 kg = 4.0 m/s² (Right)</p>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Finding Acceleration</h4>
                <ExerciseQuestion 
                  question="A 4 kg block experiences a net force of 12 N to the right. What is its resulting acceleration?"
                  options={[
                    '0.33 m/s²',
                    '3.0 m/s²',
                    '8.0 m/s²',
                    '48.0 m/s²'
                  ]}
                  correctAnswer={1}
                  explanation="Using Newton's Second Law a = ∑F / m = 12 N / 4 kg = 3.0 m/s²."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 4.3: Newton's Third Law of Motion */}
        <section id="subtopic-4.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            4.3. Newton's Third Law of Motion (Action & Reaction)
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Newton's Third Law</strong> states that whenever one object exerts a force on a second object, the second object exerts an equal and opposite force on the first object:
            </p>

            {/* Action-Reaction Formula Box */}
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-2xl text-center space-y-2">
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 text-sm md:text-lg block">
                F_(A → B) = - F_(B → A)
              </span>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                Action and Reaction forces are equal in magnitude, opposite in direction, and act simultaneously on <strong>TWO DIFFERENT BODIES</strong>.
              </p>
            </div>

            {/* Critical Distinction Box */}
            <div className="p-6 border-2 border-yellow-300 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-2xl">
              <h4 className="font-bold text-yellow-900 dark:text-yellow-400 text-base mb-2 flex items-center gap-2">
                <span>⚠️</span> Crucial Conceptual Rule: Why Action-Reaction Pairs Never Cancel Out
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Action and Reaction forces <strong>NEVER cancel each other out</strong> because they act on different objects! For example, when a rocket launches, the rocket pushes exhaust gas backward (F_rocket→gas), and the gas pushes the rocket forward (F_gas→rocket). Only forces acting on the SAME object can cancel in ∑F!
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Insect vs. Truck Collision</h4>
                <ExerciseQuestion 
                  question="A massive 10-ton truck collides head-on with a tiny mosquito. Which object experiences a greater magnitude of force during the collision?"
                  options={[
                    'The truck experiences a much larger force',
                    'The mosquito experiences a much larger force',
                    'Both experience the EXACT SAME magnitude of force',
                    'Neither experiences any force'
                  ]}
                  correctAnswer={2}
                  explanation="By Newton's Third Law, F_(truck→mosquito) = - F_(mosquito→truck). Both experience the exact same force magnitude! However, the mosquito suffers a massive acceleration due to its tiny mass (a = F/m)."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 4.4: Applications of Newton's Laws */}
        <section id="subtopic-4.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            4.4. Applications of Newton's Laws & Free-Body Diagrams
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              To solve complex dynamics problems, we follow a systematic procedure using <strong>Free-Body Diagrams (FBD)</strong>. An FBD isolates a single body and displays all external forces acting directly upon it.
            </p>

            {/* Systematic FBD Steps Card */}
            <div className="p-6 border-2 border-emerald-300 dark:border-emerald-800 rounded-2xl bg-white dark:bg-slate-900">
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                📋 4-Step Free-Body Diagram Solution Guide
              </h3>
              <div className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <p><strong>Step 1: Isolate the System.</strong> Choose the object of interest.</p>
                <p><strong>Step 2: Draw All External Forces.</strong> Include Gravity (W = mg), Normal force (N), Tension (T), Friction (f), and Applied forces (F).</p>
                <p><strong>Step 3: Establish Coordinate Axes.</strong> Orient one axis along the direction of acceleration (e.g. parallel to an incline).</p>
                <p><strong>Step 4: Apply ∑F = m a.</strong> Resolve forces into components and solve simultaneous algebraic equations.</p>
              </div>
            </div>

            {/* Classical Problem 1: Inclined Plane */}
            <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 my-6">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                <span>📐</span> Classical System 1: Object on an Inclined Plane
              </h4>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  <p>When an object sits on a plane inclined at angle θ above horizontal:</p>
                  <p>• Weight force (W = mg) resolves into two perpendicular components:</p>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded font-mono text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                    <p>• Parallel to incline: F_∥ = m g sin(θ) (Pulls down incline)</p>
                    <p>• Perpendicular to incline: F_⊥ = m g cos(θ)</p>
                    <p>• Normal force: N = m g cos(θ)</p>
                    <p>• Acceleration (Frictionless): a = g sin(θ)</p>
                  </div>
                </div>

                {/* SVG Inclined Plane FBD Diagram */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-center">
                  <svg className="w-64 h-44" viewBox="0 0 250 180">
                    {/* Incline Triangle */}
                    <polygon points="20,150 220,150 220,50" fill="none" stroke="#64748b" strokeWidth="2" />
                    {/* Angle θ Arc */}
                    <path d="M 60 150 A 40 40 0 0 0 52 135" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <text x="68" y="145" fontSize="12" fontWeight="bold" fill="#f59e0b">θ</text>

                    {/* Block on Incline */}
                    <g transform="translate(130,105) rotate(-26.5)">
                      <rect x="-20" y="-15" width="40" height="30" fill="#10b981" rx="3" />
                      {/* Normal Force N (Upward) */}
                      <line x1="0" y1="0" x2="0" y2="-45" stroke="#0284c7" strokeWidth="2.5" />
                      <text x="5" y="-35" fontSize="11" fontWeight="bold" fill="#0284c7">N</text>
                      {/* Parallel component mg sin θ (Leftward down incline) */}
                      <line x1="0" y1="0" x2="-40" y2="0" stroke="#ef4444" strokeWidth="2.5" />
                      <text x="-45" y="-5" fontSize="10" fontWeight="bold" fill="#ef4444">mg sin θ</text>
                    </g>

                    {/* Weight Force mg (Straight Down) */}
                    <line x1="130" y1="105" x2="130" y2="165" stroke="#1e293b" strokeWidth="2.5" />
                    <text x="135" y="160" fontSize="11" fontWeight="bold" className="fill-slate-800 dark:fill-slate-200">W = mg</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Classical Problem 2: Atwood Machine */}
            <div className="p-6 border border-teal-200 dark:border-teal-800 bg-teal-50/40 dark:bg-teal-900/10 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>⚙️</span> Classical System 2: Atwood Machine (Two Hanging Masses)
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3">
                Two masses m₁ and m₂ (where m₂ {">"} m₁) are connected over an ideal frictionless, massless pulley:
              </p>
              <div className="grid md:grid-cols-2 gap-3 font-mono text-xs md:text-sm text-teal-800 dark:text-teal-300">
                <div className="p-3 bg-white dark:bg-slate-800 rounded">
                  <strong>System Acceleration:</strong>
                  <p>a = [ (m₂ - m₁) / (m₁ + m₂) ] · g</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded">
                  <strong>String Tension:</strong>
                  <p>T = [ (2 m₁ m₂) / (m₁ + m₂) ] · g</p>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Acceleration on a Frictionless Incline</h4>
                <ExerciseQuestion 
                  question="A block slides down a frictionless plane inclined at an angle θ = 30° to horizontal. Taking g = 9.8 m/s², what is the acceleration of the block down the incline?"
                  options={[
                    '4.9 m/s²',
                    '8.49 m/s²',
                    '9.8 m/s²',
                    '0 m/s²'
                  ]}
                  correctAnswer={0}
                  explanation="For a frictionless incline, acceleration down the incline is a = g sin(θ) = 9.8 × sin(30°) = 9.8 × 0.5 = 4.9 m/s²."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 4.5: Friction */}
        <section id="subtopic-4.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            4.5. Friction Forces (Static & Kinetic)
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Friction</strong> is a contact force parallel to the interface between two contacting surfaces that opposes relative sliding motion or impending motion. It arises from microscopic surface irregularities (asperities) and molecular attraction.
            </p>

            {/* Static vs Kinetic Friction Grid */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">1. Static Friction Force (f_s)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Prevents relative motion when an object is stationary. It adjusts dynamically to balance applied forces up to a maximum threshold:
                </p>
                <div className="p-3 bg-white dark:bg-slate-800 rounded font-mono text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
                  <p>• f_s ≤ µ_s · N</p>
                  <p>• Maximum static friction: f_{"{s,max}"} = µ_s · N</p>
                </div>
              </div>

              <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">2. Kinetic Friction Force (f_k)</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Acts while two surfaces are actively sliding relative to each other. It has a constant magnitude (nearly independent of speed):
                </p>
                <div className="p-3 bg-white dark:bg-slate-800 rounded font-mono text-xs text-teal-700 dark:text-teal-300 space-y-1">
                  <p>• f_k = µ_k · N</p>
                  <p>• Note: µ_k is almost always LESS than µ_s! (µ_k {"<"} µ_s)</p>
                </div>
              </div>
            </div>

            {/* Angle of Repose Detail Card */}
            <div className="p-6 border border-cyan-200 dark:border-cyan-800 bg-cyan-50/40 dark:bg-cyan-900/10 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <span>🏔️</span> Angle of Repose (Critical Angle)
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                The <strong>angle of repose</strong> is the maximum tilt angle θ of an incline before a block resting on it begins to slip. At the verge of slipping:
              </p>
              <div className="p-3 bg-white dark:bg-slate-800 rounded font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 font-bold text-center">
                tan(θ_critical) = µ_s
              </div>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question: Threshold Force to Overcome Static Friction</h4>
                <ExerciseQuestion 
                  question="A 20 kg box rests on a horizontal wooden floor. The coefficient of static friction is µ_s = 0.4. Taking g = 9.8 m/s², what minimum horizontal force is required to set the box into motion?"
                  options={[
                    '8.0 N',
                    '78.4 N',
                    '196 N',
                    '49 N'
                  ]}
                  correctAnswer={1}
                  explanation="Normal force N = mg = 20 × 9.8 = 196 N. Max static friction force f_{s,max} = µ_s N = 0.4 × 196 = 78.4 N. You must apply a force greater than 78.4 N to start moving the box."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Physics Chapter 4 Master Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ First Law (Inertia):</strong> An object stays at rest or uniform velocity unless acted on by a net force (∑F = 0 ⟹ a = 0).</p>
            <p><strong>✓ Second Law (Force):</strong> Net force causes acceleration proportional to force and inversely proportional to mass (∑F = m a).</p>
            <p><strong>✓ Third Law (Action-Reaction):</strong> F_(A→B) = -F_(B→A). Action and reaction forces act on different bodies and never cancel on a single body.</p>
            <p><strong>✓ Inclined Planes:</strong> Gravity component down incline is F_∥ = mg sin θ, perpendicular normal force is N = mg cos θ.</p>
            <p><strong>✓ Atwood Machine:</strong> Acceleration a = [ (m₂ - m₁) / (m₁ + m₂) ] · g.</p>
            <p><strong>✓ Static vs Kinetic Friction:</strong> f_s ≤ µ_s N (maximum static threshold), while sliding friction f_k = µ_k N (where µ_k {"<"} µ_s).</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter3');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Chapter 3
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter5');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 5
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter4;
