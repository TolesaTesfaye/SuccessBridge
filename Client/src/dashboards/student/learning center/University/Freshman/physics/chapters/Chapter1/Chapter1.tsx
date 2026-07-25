import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
  // Scroll to subtopic when selected
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
          Physics Chapter 1 • Master Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          PRELIMINARIES: MEASUREMENT & VECTORS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-emerald-600 to-teal-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Welcome to University Physics! Every physical law is founded upon precise measurement and mathematical modeling. In this chapter, you will master physical quantities, SI units, dimensional analysis, measurement uncertainties, significant figures, and the foundations of 2D/3D vector algebra.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* SUBTOPIC 1.1: Physical Quantities and Measurement */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            1.1. Physical Quantities and Measurement
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Physics is an empirical science based on quantitative measurement. A <strong>physical quantity</strong> is any property of a phenomenon, body, or substance that can be quantified by measurement and expressed as a number multiplied by a unit:
            </p>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 text-sm md:text-base">
                Physical Quantity = (Numerical Value) × (Unit)
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 md:p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">1. Fundamental (Base) Quantities</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                  The 7 independent base quantities defined by the International System of Units (SI):
                </p>
                <ul className="text-xs md:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li>• <strong>Length:</strong> meter (m)</li>
                  <li>• <strong>Mass:</strong> kilogram (kg)</li>
                  <li>• <strong>Time:</strong> second (s)</li>
                  <li>• <strong>Electric Current:</strong> ampere (A)</li>
                  <li>• <strong>Thermodynamic Temperature:</strong> kelvin (K)</li>
                  <li>• <strong>Amount of Substance:</strong> mole (mol)</li>
                  <li>• <strong>Luminous Intensity:</strong> candela (cd)</li>
                </ul>
              </div>
              
              <div className="p-4 md:p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 rounded-r-xl">
                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-2">2. Derived Quantities</h4>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Quantities defined as mathematical combinations of fundamental quantities:
                </p>
                <ul className="text-xs md:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li>• <strong>Velocity:</strong> m/s &nbsp;<code className="text-xs font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">[L][T]⁻¹</code></li>
                  <li>• <strong>Acceleration:</strong> m/s² &nbsp;<code className="text-xs font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">[L][T]⁻²</code></li>
                  <li>• <strong>Force (Newton):</strong> N = kg·m/s² &nbsp;<code className="text-xs font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">[M][L][T]⁻²</code></li>
                  <li>• <strong>Work / Energy (Joule):</strong> J = N·m &nbsp;<code className="text-xs font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">[M][L]²[T]⁻²</code></li>
                  <li>• <strong>Power (Watt):</strong> W = J/s &nbsp;<code className="text-xs font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">[M][L]²[T]⁻³</code></li>
                  <li>• <strong>Pressure (Pascal):</strong> Pa = N/m² &nbsp;<code className="text-xs font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded">[M][L]⁻¹[T]⁻²</code></li>
                </ul>
              </div>
            </div>

            {/* Detail Note */}
            <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
              <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
                <span>📝</span> Detail Note: Dimensional Analysis & Principle of Homogeneity
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                In any valid physical equation, the dimensions of terms on the left-hand side MUST equal the dimensions of terms on the right-hand side. For example, in the kinematic equation <strong>v = u + at</strong>, both <code>u</code> and <code>at</code> have dimensions of <code>[L][T]⁻¹</code>. You can never add quantities with different dimensions!
              </p>
            </div>

            {/* Real-World Example */}
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
              <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
                <span>🌍</span> Real-World Example: NASA's 125 Million Dollar Mars Climate Orbiter Crash
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                In 1999, NASA lost the $125 million Mars Climate Orbiter spacecraft because one engineering team used Imperial units (pound-force seconds) while the navigation team expected SI metric units (newton-seconds). The unit mismatch caused thrusters to fire with incorrect force, burning up the orbiter in the Martian atmosphere.
              </p>
            </div>

            {/* Practice Exercises */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Fundamental vs Derived</h4>
                <ExerciseQuestion 
                  question="Which of the following contains ONLY fundamental (base) SI quantities?"
                  options={[
                    'Length, Mass, Velocity',
                    'Time, Temperature, Mass',
                    'Force, Electric Current, Time',
                    'Length, Area, Temperature'
                  ]}
                  correctAnswer={1}
                  explanation="Time (seconds), Temperature (kelvin), and Mass (kilograms) are all fundamental SI base quantities. Velocity, Force, and Area are derived quantities."
                />
              </div>

              <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Dimensional Analysis</h4>
                <ExerciseQuestion 
                  question="What are the dimensional formulas for Force ([F]) and Kinetic Energy ([KE])?"
                  options={[
                    '[F] = [M][L][T]⁻² , [KE] = [M][L]²[T]⁻²',
                    '[F] = [M][L][T]⁻¹ , [KE] = [M][L][T]⁻²',
                    '[F] = [M][L]²[T]⁻² , [KE] = [M][L]²[T]⁻¹',
                    '[F] = [M][T]⁻² , [KE] = [M][L]²'
                  ]}
                  correctAnswer={0}
                  explanation="Force = Mass × Acceleration → [M][L][T]⁻². Kinetic Energy = ½ m v² → [M]([L][T]⁻¹)² = [M][L]²[T]⁻²."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.2: Uncertainty in Measurement and Significant Digits */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            1.2. Uncertainty in Measurement and Significant Digits
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            No physical measurement is infinitely exact. Every experimental measurement carries an inherent <strong>uncertainty</strong> stemming from instrument resolution, environmental noise, and observation techniques.
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-emerald-500 shadow-sm">
              <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-2">Systematic Errors vs Random Errors</h4>
              <ul className="text-xs md:text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <li>• <strong>Systematic Errors:</strong> Biased errors caused by faulty calibration or zero-point offset. They shift measurements in one direction consistently and affect <em>Accuracy</em>.</li>
                <li>• <strong>Random Errors:</strong> Unpredictable fluctuations due to environmental noise or human reading variance. They affect <em>Precision</em> and can be reduced by averaging multiple trials.</li>
              </ul>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-teal-500 shadow-sm">
              <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-2">Accuracy vs Precision</h4>
              <ul className="text-xs md:text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <li>• <strong>Accuracy:</strong> How close a measured value is to the true or accepted reference value.</li>
                <li>• <strong>Precision:</strong> How close repeated measurements are to each other (reproducibility).</li>
              </ul>
            </div>
          </div>

          {/* Significant Figures Rules Table */}
          <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 mb-8">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4">Rules for Counting Significant Figures (Sig Figs)</h3>
            <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded">
                <strong>Rule 1: All non-zero digits are significant.</strong> Example: <code>453.8</code> has 4 sig figs.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded">
                <strong>Rule 2: Captive zeros (between non-zero digits) are significant.</strong> Example: <code>2005.08</code> has 6 sig figs.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded">
                <strong>Rule 3: Leading zeros (before non-zero digits) are NEVER significant.</strong> Example: <code>0.00042</code> has only 2 sig figs (4 and 2).
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded">
                <strong>Rule 4: Trailing zeros after a decimal point ARE significant.</strong> Example: <code>15.00</code> has 4 sig figs.
              </div>
            </div>
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Significant Figures in Calculations
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              • <strong>Multiplication / Division:</strong> The answer should have the SAME number of sig figs as the factor with the FEWEST sig figs. (e.g., <code>4.51 × 2.0 = 9.02 → 9.0</code>).
              <br/>
              • <strong>Addition / Subtraction:</strong> The answer should have the SAME number of decimal places as the number with the FEWEST decimal places. (e.g., <code>12.11 + 0.3 = 12.41 → 12.4</code>).
            </p>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: GPS Satellites & Nanosecond Precision
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              GPS satellites compute your location on Earth by measuring signal travel times at light speed (3 × 10⁸ m/s). An error of just 1 microsecond (10⁻⁶ s) results in a distance error of 300 meters! Atomic clocks on satellites maintain precision to within nanoseconds (10⁻⁹ s) to provide meter-accurate turn-by-turn navigation.
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Counting Sig Figs</h4>
              <ExerciseQuestion 
                question="How many significant figures are in the measurement 0.005040 meters?"
                options={[
                  '3 sig figs',
                  '4 sig figs',
                  '6 sig figs',
                  '7 sig figs'
                ]}
                correctAnswer={1}
                explanation="The leading zeros (0.00) are not significant. The digits 5, 0 (captive), 4, and the final trailing zero 0 are significant, giving a total of 4 sig figs."
              />
            </div>

            <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Significant Figures in Multiplication</h4>
              <ExerciseQuestion 
                question="Calculate the area of a rectangle with length = 4.52 m (3 sig figs) and width = 2.1 m (2 sig figs). Express the answer with correct sig figs."
                options={[
                  '9.492 m²',
                  '9.49 m²',
                  '9.5 m²',
                  '9.0 m²'
                ]}
                correctAnswer={2}
                explanation="4.52 × 2.1 = 9.492. In multiplication, the result must match the fewest sig figs (width has 2 sig figs). 9.492 rounds to 9.5 m² (2 sig figs)."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.3: Vectors: Composition and Resolution */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            1.3. Vectors: Composition and Resolution
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            In physics, physical quantities are divided into <strong>Scalars</strong> (magnitude only, e.g., mass, energy, temperature) and <strong>Vectors</strong> (both magnitude and direction, e.g., displacement, velocity, force, acceleration).
          </p>

          {/* Vector Resolution Cards */}
          <div className="p-6 border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl bg-white dark:bg-slate-900 mb-8">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4">Vector Resolution in 2D Cartesian Coordinates</h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-4">
              Any 2D vector A⃗ making an angle θ with the positive x-axis can be resolved into two mutually perpendicular components (Aₓ and Aᵧ):
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm font-mono">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                <h5 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">Component Formulas:</h5>
                <p>Horizontal: Aₓ = A cos θ</p>
                <p>Vertical: Aᵧ = A sin θ</p>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-900/30 rounded-xl">
                <h5 className="font-bold text-teal-900 dark:text-teal-300 mb-2">Reconstruction Formulas:</h5>
                <p>Magnitude: |A⃗| = √(Aₓ² + Aᵧ²)</p>
                <p>Direction Angle: θ = tan⁻¹(Aᵧ / Aₓ)</p>
              </div>
            </div>
          </div>

          {/* Detail Note */}
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
            <h4 className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-400 mb-2">
              <span>📝</span> Detail Note: Dot Product vs Cross Product
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              • <strong>Scalar (Dot) Product:</strong> A⃗ · B⃗ = A B cos θ = Aₓ Bₓ + Aᵧ Bᵧ + A_z B_z. Returns a SCALAR (e.g. Work W = F⃗ · d⃗).
              <br/>
              • <strong>Vector (Cross) Product:</strong> |A⃗ × B⃗| = A B sin θ. Returns a VECTOR perpendicular to both A⃗ and B⃗ (Right-Hand Rule, e.g. Torque τ⃗ = r⃗ × F⃗).
            </p>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: Airplane Navigation in Crosswinds
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              An airplane flying due East at 500 km/h encounters a crosswind blowing North at 100 km/h. Pilots use <strong>vector addition</strong> (V⃗_ground = V⃗_plane + V⃗_wind) to calculate the actual ground speed (√(500² + 100²) = 510 km/h) and adjust the heading angle (θ = tan⁻¹(100/500) = 11.3°) so the plane lands at the intended airport destination.
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Component Calculation</h4>
              <ExerciseQuestion 
                question="A force vector F = 100 N acts at an angle of 60° above the positive x-axis. What are its horizontal (Fx) and vertical (Fy) components? (cos 60° = 0.5, sin 60° = 0.866)"
                options={[
                  'Fx = 50 N, Fy = 86.6 N',
                  'Fx = 86.6 N, Fy = 50 N',
                  'Fx = 100 N, Fy = 100 N',
                  'Fx = 70.7 N, Fy = 70.7 N'
                ]}
                correctAnswer={0}
                explanation="Fx = F cos(60°) = 100 × 0.5 = 50 N. Fy = F sin(60°) = 100 × 0.866 = 86.6 N."
              />
            </div>

            <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Vector Magnitude</h4>
              <ExerciseQuestion 
                question="A displacement vector has components Ax = 3 m and Ay = 4 m. What is the magnitude of vector A?"
                options={[
                  '5 meters',
                  '7 meters',
                  '12 meters',
                  '25 meters'
                ]}
                correctAnswer={0}
                explanation="Magnitude |A| = √(Ax² + Ay²) = √(3² + 4²) = √(9 + 16) = √25 = 5 meters."
              />
            </div>
          </div>
        </section>

        {/* SUBTOPIC 1.4: Unit Vector */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-emerald-600 pl-2 md:pl-4">
            1.4. Unit Vector
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            A <strong>unit vector</strong> is a dimensionless vector having a magnitude of <strong>exactly 1</strong>. Its sole purpose is to specify direction in space.
          </p>

          <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800 mb-8">
            <h4 className="font-bold text-base md:text-lg text-emerald-900 dark:text-emerald-300 mb-3">Unit Vector Definition Formula</h4>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-4">
              To find a unit vector â in the direction of any non-zero vector A⃗, divide the vector by its magnitude:
            </p>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-sm md:text-base font-bold text-emerald-600 dark:text-emerald-400">
              â = A⃗ / |A⃗|
            </div>
          </div>

          <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-4">Standard 3D Cartesian Unit Vectors (î, ĵ, k̂)</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-emerald-500 shadow-sm text-center">
              <span className="text-2xl md:text-3xl font-bold font-mono text-emerald-600">î</span>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">x-axis unit vector</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Points along positive X</p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-teal-500 shadow-sm text-center">
              <span className="text-2xl md:text-3xl font-bold font-mono text-teal-600">ĵ</span>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">y-axis unit vector</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Points along positive Y</p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-cyan-500 shadow-sm text-center">
              <span className="text-2xl md:text-3xl font-bold font-mono text-cyan-600">k̂</span>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1">z-axis unit vector</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Points along positive Z</p>
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8">
            <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">Full 3D Vector Notation:</h4>
            <p className="text-xs md:text-sm font-mono text-slate-800 dark:text-slate-200">
              A⃗ = Aₓî + Aᵧĵ + A_z k̂
              <br/>
              |A⃗| = √(Aₓ² + Aᵧ² + A_z²)
            </p>
          </div>

          {/* Real-World Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
            <h4 className="flex items-center gap-2 font-black text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wider text-sm">
              <span>🌍</span> Real-World Example: 3D Video Game Graphics Engines
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              In modern 3D graphics engines (like Unreal Engine 5 and Unity), surface lighting and reflection calculations rely heavily on <strong>Unit Normal Vectors (N̂)</strong>. Every polygon surface has a unit vector pointing outward perpendicular to its face. Ray tracing algorithms multiply light intensity by the dot product of the light direction unit vector (L̂) and the surface normal (N̂ · L̂) to render realistic shadows and highlights in real time!
            </p>
          </div>

          {/* Practice Exercises */}
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 1: Unit Vector Calculation</h4>
              <ExerciseQuestion 
                question="What is the unit vector in the direction of vector A = 6î + 8ĵ ?"
                options={[
                  '0.6î + 0.8ĵ',
                  '6î + 8ĵ',
                  '0.8î + 0.6ĵ',
                  '10î + 10ĵ'
                ]}
                correctAnswer={0}
                explanation="Magnitude |A| = √(6² + 8²) = √100 = 10. Unit vector = A / |A| = (6/10)î + (8/10)ĵ = 0.6î + 0.8ĵ."
              />
            </div>

            <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Practice Question 2: Magnitude of Unit Vector</h4>
              <ExerciseQuestion 
                question="What is the magnitude of any unit vector by definition?"
                options={[
                  '0',
                  '1',
                  '10',
                  'Depends on the coordinate system'
                ]}
                correctAnswer={1}
                explanation="By definition, a unit vector is dimensionless and has a magnitude of EXACTLY 1."
              />
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-600">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">📚 Physics Chapter 1 Master Summary</h2>
          <div className="space-y-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Physical Quantities:</strong> Expressed as (Value) × (Unit). Divided into 7 SI Base Quantities and Derived Quantities. Principle of Dimensional Homogeneity requires matching dimensions across equations.</p>
            <p><strong>✓ Uncertainty & Sig Figs:</strong> Systematic errors affect Accuracy; Random errors affect Precision. Sig figs maintain precision in calculations (multiplication matches fewest sig figs; addition matches fewest decimal places).</p>
            <p><strong>✓ Vector Algebra:</strong> Scalars have magnitude; Vectors have magnitude and direction. Resolved via Aₓ = A cos θ, Aᵧ = A sin θ. Magnitude |A⃗| = √(Aₓ² + Aᵧ²).</p>
            <p><strong>✓ Unit Vectors:</strong> Dimensionless vectors of magnitude 1 used for direction (â = A⃗ / |A⃗|). Standard Cartesian basis: î, ĵ, k̂.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            disabled
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg cursor-not-allowed text-sm md:text-base font-medium"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            Next: Chapter 2
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter1;
