import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../../Freshman/components/ExerciseQuestion';

interface Chapter1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative mb-6 md:mb-12 px-0 md:px-8 py-4 md:py-8">
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Chapter 1 • Vectors
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          VECTORS
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-orange-600 to-red-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Master the language of physics! Vectors are everywhere - from GPS navigation to video games, from airplane flight to sports. Understanding vectors is your key to describing motion, forces, and much more.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* Why Vectors Matter Box */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-600 p-3 md:p-6 rounded-r-lg">
          <h3 className="text-sm md:text-xl font-bold text-orange-900 dark:text-orange-100 mb-2 md:mb-3 flex items-center gap-2">
            <span className="text-lg md:text-2xl">🎯</span>
            Why Vectors Are Everywhere
          </h3>
          <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
            <p>
              <strong>Real Talk:</strong> Every time you use Google Maps, play a video game, or watch a plane fly overhead, you're witnessing vectors in action! 
              Vectors help us describe anything that has both <strong>magnitude</strong> (size) and <strong>direction</strong>.
            </p>
            <p className="text-xs md:text-sm text-orange-800 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 p-2 rounded">
              💡 <strong>Mind-Blowing Fact:</strong> NASA engineers use vectors to calculate rocket trajectories. A single calculation error 
              could mean missing Mars by thousands of kilometers!
            </p>
          </div>
        </div>

        {/* SUBTOPIC 1.1: Vectors */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-orange-600 pl-2 md:pl-4">
            1.1. Vectors
          </h2>

          {/* Subsection 1.1.1: Vector and Scalar quantities */}
          <div className="space-y-3 md:space-y-6 mb-8 md:mb-12">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white">
              1.1.1. Vector and Scalar Quantities
            </h3>
            
            {/* Key Concepts Box */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-orange-900 dark:text-orange-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🔑</span>
                Key Concepts
              </h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li><strong>Scalar:</strong> A quantity with only magnitude (size) - Example: 50 kg, 30°C, 5 hours</li>
                <li><strong>Vector:</strong> A quantity with both magnitude AND direction - Example: 50 km/h North, 10 N downward</li>
                <li><strong>Magnitude:</strong> The numerical value or size of a quantity</li>
                <li><strong>Direction:</strong> Where the quantity is pointing (North, East, up, down, 30° from horizontal, etc.)</li>
              </ul>
            </div>

            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              In physics, we deal with two types of quantities: <strong className="text-orange-600 dark:text-orange-400">scalars</strong> and <strong className="text-orange-600 dark:text-orange-400">vectors</strong>. 
              Understanding the difference is crucial!
            </p>

            {/* Real World Analogy */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🌍</span>
                Real-World Example: The Treasure Hunt
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  Imagine you're on a treasure hunt, and you get two different instructions:
                </p>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-1">❌ Instruction A: "Walk 100 meters"</p>
                  <p className="text-xs md:text-sm">This is a <strong>scalar</strong> - it tells you HOW FAR but not WHERE to go. You could walk in any direction!</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-green-600 dark:text-green-400 mb-1">✅ Instruction B: "Walk 100 meters North"</p>
                  <p className="text-xs md:text-sm">This is a <strong>vector</strong> - it tells you BOTH how far (100 m) AND which direction (North). Now you can find the treasure!</p>
                </div>
                <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  💡 <strong>Think of GPS navigation:</strong> When Google Maps says "Drive 2 km Northeast," it's giving you a vector! 
                  If it just said "Drive 2 km," you'd be lost!
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-x-auto">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                📊 Scalar vs Vector: Side-by-Side Comparison
              </h3>
              <table className="w-full text-xs md:text-base">
                <thead>
                  <tr className="bg-orange-100 dark:bg-orange-900/30">
                    <th className="p-2 text-left font-bold">Property</th>
                    <th className="p-2 text-left font-bold">Scalar</th>
                    <th className="p-2 text-left font-bold">Vector</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-2 font-semibold">Definition</td>
                    <td className="p-2">Magnitude only</td>
                    <td className="p-2">Magnitude + Direction</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-2 font-semibold">Examples</td>
                    <td className="p-2">Mass, Temperature, Time, Speed, Energy</td>
                    <td className="p-2">Displacement, Velocity, Force, Acceleration</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-2 font-semibold">Real-Life</td>
                    <td className="p-2">"I ran 5 km" (speed)<br/>"It's 25°C today"</td>
                    <td className="p-2">"I walked 5 km North" (displacement)<br/>"Wind blowing 20 km/h East"</td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-2 font-semibold">Symbol</td>
                    <td className="p-2">Regular letter: m, T, t</td>
                    <td className="p-2">Arrow notation: v⃗, F⃗ or bold: <strong>v</strong>, <strong>F</strong></td>
                  </tr>
                  <tr className="border-t border-slate-200 dark:border-slate-700">
                    <td className="p-2 font-semibold">Addition</td>
                    <td className="p-2">Simple arithmetic: 5 + 3 = 8</td>
                    <td className="p-2">Must consider direction! (We'll learn this soon)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Important Pairs */}
            <div className="p-3 md:p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">
                ⚠️ Don't Confuse These Pairs!
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-base text-orange-600 dark:text-orange-400">
                    Speed (Scalar) vs Velocity (Vector)
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    • <strong>Speed:</strong> "The car is moving at 60 km/h" (just how fast)<br/>
                    • <strong>Velocity:</strong> "The car is moving at 60 km/h East" (how fast AND which way)
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-base text-orange-600 dark:text-orange-400">
                    Distance (Scalar) vs Displacement (Vector)
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    • <strong>Distance:</strong> "I walked 10 km total" (path length)<br/>
                    • <strong>Displacement:</strong> "I am 7 km Northeast from where I started" (straight-line from start to finish)
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-base text-orange-600 dark:text-orange-400">
                    Mass (Scalar) vs Weight (Vector)
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    • <strong>Mass:</strong> "I have a mass of 70 kg" (amount of matter)<br/>
                    • <strong>Weight:</strong> "My weight is 686 N downward" (force due to gravity - has direction!)
                  </p>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="Which of the following is a VECTOR quantity?"
              options={[
                'Temperature of 30°C',
                'Mass of 5 kg',
                'Force of 10 N downward',
                'Time of 2 hours'
              ]}
              correctAnswer={2}
              explanation="Force is a vector! It has both magnitude (10 N) and direction (downward). Temperature, mass, and time are scalars - they only have magnitude."
            />

            <ExerciseQuestion
              question="A student walks 3 km East, then 4 km North. What is the total DISTANCE traveled?"
              options={[
                '5 km',
                '7 km',
                '1 km',
                '12 km'
              ]}
              correctAnswer={1}
              explanation="Distance is a scalar - just add up all the path lengths: 3 km + 4 km = 7 km total distance. (Note: The displacement would be 5 km at an angle - we'll learn that in vector addition!)"
            />

            <ExerciseQuestion
              question="Which statement is TRUE about scalars?"
              options={[
                'Scalars have both magnitude and direction',
                'Scalars can be added using simple arithmetic',
                'Scalars must always include an angle',
                'Scalars are more important than vectors'
              ]}
              correctAnswer={1}
              explanation="Scalars have only magnitude, so they can be added using simple arithmetic (5 + 3 = 8). Vectors need special addition rules because they have direction!"
            />
          </div>

          {/* Subsection 1.1.2: Vector Representation */}
          <div className="space-y-3 md:space-y-6 mb-8 md:mb-12">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white">
              1.1.2. Vector Representation
            </h3>
            
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Vectors are represented as <strong className="text-orange-600 dark:text-orange-400">arrows</strong>! The arrow's length shows the magnitude, 
              and the arrow's direction shows... well, the direction!
            </p>

            {/* Visual Representation */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">📐</span>
                How to Draw a Vector
              </h3>
              <div className="space-y-3 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded">
                  <p className="font-bold mb-2">Anatomy of a Vector Arrow:</p>
                  <pre className="text-[10px] md:text-sm font-mono bg-slate-100 dark:bg-slate-900 p-2 rounded overflow-x-auto">
{`
    Direction
        ↑
        |
        |  Length represents
        |  magnitude (size)
   _____|
  |
  • ← Starting point (tail)
    
  ────────────────→  ← Arrowhead shows direction
  
  Example: Velocity v⃗ = 50 m/s East
  
  West ←──────────────→ East
       50 m/s
`}
                  </pre>
                </div>
                <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  💡 <strong>Remember:</strong> Longer arrow = bigger magnitude. Arrow pointing right = direction to the right!
                </p>
              </div>
            </div>

            {/* Notation Methods */}
            <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                ✍️ Ways to Write Vectors
              </h3>
              <div className="space-y-2 md:space-y-3 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <div className="p-2 md:p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <p className="font-bold">1. Arrow notation: v⃗, F⃗, a⃗</p>
                  <p className="text-xs md:text-sm">Most common in physics textbooks</p>
                </div>
                <div className="p-2 md:p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <p className="font-bold">2. Bold letter: <strong>v</strong>, <strong>F</strong>, <strong>a</strong></p>
                  <p className="text-xs md:text-sm">Used in typed documents</p>
                </div>
                <div className="p-2 md:p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <p className="font-bold">3. Magnitude notation: |v⃗| or v</p>
                  <p className="text-xs md:text-sm">This represents just the size (a scalar!) - Example: |v⃗| = 50 m/s</p>
                </div>
                <div className="p-2 md:p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <p className="font-bold">4. Component form: v⃗ = (v_x, v_y) or v⃗ = v_x î + v_y ĵ</p>
                  <p className="text-xs md:text-sm">Breaks the vector into x and y parts (we'll learn this soon!)</p>
                </div>
              </div>
            </div>

            {/* Real World Example */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🎮</span>
                Real-World Example: Video Game Character Movement
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  When you press the arrow keys in a video game, you're creating a velocity vector!
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">Game Controller Input:</p>
                  <ul className="space-y-1 text-xs md:text-sm">
                    <li>• Press → : Creates velocity vector pointing right</li>
                    <li>• Press ↑ : Creates velocity vector pointing up</li>
                    <li>• Press → + ↑ together: Creates diagonal velocity vector (Northeast)</li>
                  </ul>
                  <p className="mt-2 text-xs md:text-sm text-green-700 dark:text-green-300">
                    The game engine combines these inputs using vector addition to move your character smoothly in any direction!
                  </p>
                </div>
              </div>
            </div>

            <ExerciseQuestion
              question="A vector has a magnitude of 10 N and points downward. How should this be properly written?"
              options={[
                '10 N (scalar notation)',
                'F⃗ = 10 N downward (vector notation)',
                'Just 10 N is enough',
                'F = -10 (no units needed)'
              ]}
              correctAnswer={1}
              explanation="Proper vector notation includes: 1) Vector symbol (F⃗), 2) Magnitude with units (10 N), and 3) Direction (downward). All three pieces are essential!"
            />
          </div>

          {/* Subsection 1.1.3: Vector Addition and Subtraction */}
          <div className="space-y-3 md:space-y-6 mb-8 md:mb-12">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white">
              1.1.3. Vector Addition and Subtraction
            </h3>
            
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Here's where things get interesting! You can't just add vectors like regular numbers. You must consider their <strong>directions</strong>!
            </p>

            {/* Graphical Method */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-purple-900 dark:text-purple-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🎨</span>
                Graphical Method: Tip-to-Tail
              </h3>
              <div className="space-y-3 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p className="font-bold">
                  This is the easiest way to visualize vector addition!
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded">
                  <p className="font-bold mb-2">Steps:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs md:text-sm">
                    <li>Draw the first vector (A⃗) from the origin</li>
                    <li>Place the <strong>tail</strong> of the second vector (B⃗) at the <strong>tip</strong> of the first vector</li>
                    <li>Draw the resultant vector (R⃗) from the <strong>start of A⃗</strong> to the <strong>end of B⃗</strong></li>
                    <li>This is your answer: R⃗ = A⃗ + B⃗</li>
                  </ol>
                  <pre className="text-[10px] md:text-sm font-mono bg-slate-100 dark:bg-slate-900 p-2 mt-3 rounded overflow-x-auto">
{`
  Adding two vectors A⃗ and B⃗:
  
     B⃗
    →→→
   ↑
   |
  A⃗
  ↑
  |
  • Start
  
  Becomes:
  
        B⃗
       →→→
      ↗
  A⃗ ↗  ← This is your resultant R⃗
    ↗
  • Start ─────────────→ End
           R⃗ = A⃗ + B⃗
`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Real World Example: Walking */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🚶</span>
                Real-World Example: Walking in a City
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Scenario:</strong> You walk 3 blocks East, then 4 blocks North. Where do you end up?
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <pre className="text-[10px] md:text-sm font-mono">
{`
  North
    ↑
    | 4 blocks
    | ↑
    | |
    | |
  Start →→→ 3 blocks East
  
  Using Pythagorean theorem:
  Resultant distance = √(3² + 4²)
                     = √(9 + 16)
                     = √25
                     = 5 blocks
  
  Direction: tan(θ) = 4/3
            θ = 53.1° North of East
  
  Answer: 5 blocks at 53.1° NE
`}
                  </pre>
                  <p className="mt-2 text-xs md:text-sm text-blue-700 dark:text-blue-300">
                    💡 Notice: You walked 3 + 4 = 7 blocks total (distance), but your displacement is only 5 blocks!
                  </p>
                </div>
              </div>
            </div>

            {/* Special Cases */}
            <div className="p-3 md:p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">
                🎯 Special Cases of Vector Addition
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-base text-green-600 dark:text-green-400">
                    Case 1: Vectors in the SAME direction
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    If A⃗ = 5 N East and B⃗ = 3 N East<br/>
                    Then R⃗ = 5 + 3 = <strong>8 N East</strong> (just add magnitudes!)
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-base text-red-600 dark:text-red-400">
                    Case 2: Vectors in OPPOSITE directions
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    If A⃗ = 5 N East and B⃗ = 3 N West<br/>
                    Then R⃗ = 5 - 3 = <strong>2 N East</strong> (subtract smaller from larger!)
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-xs md:text-base text-blue-600 dark:text-blue-400">
                    Case 3: Vectors at RIGHT ANGLES (90°)
                  </p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Use Pythagorean theorem: R = √(A² + B²)<br/>
                    Example: A = 3, B = 4 → R = √(9 + 16) = 5
                  </p>
                </div>
              </div>
            </div>

            {/* Vector Subtraction */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-red-900 dark:text-red-100 mb-2 md:mb-3">
                ➖ Vector Subtraction: A⃗ - B⃗
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Key Idea:</strong> Subtracting a vector is the same as adding its <strong>opposite</strong>!
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">A⃗ - B⃗ = A⃗ + (-B⃗)</p>
                  <p className="text-xs md:text-sm">
                    <strong>What is -B⃗?</strong> It's vector B⃗ with the same magnitude but <strong>opposite direction</strong>!
                  </p>
                  <p className="text-xs md:text-sm mt-2">
                    Example: If B⃗ = 5 m North, then -B⃗ = 5 m South
                  </p>
                </div>
              </div>
            </div>

            <ExerciseQuestion
              question="Two forces act on a box: F₁ = 10 N East and F₂ = 10 N West. What is the resultant force?"
              options={[
                '20 N East',
                '0 N (forces cancel out)',
                '10 N South',
                '14.14 N Northeast'
              ]}
              correctAnswer={1}
              explanation="Since the forces are equal in magnitude but opposite in direction, they cancel each other out completely. Resultant = 10 N - 10 N = 0 N. The box won't move!"
            />

            <ExerciseQuestion
              question="A person walks 6 m East, then 8 m North. What is the magnitude of their displacement?"
              options={[
                '14 m',
                '2 m',
                '10 m',
                '48 m'
              ]}
              correctAnswer={2}
              explanation="These vectors are at right angles, so use Pythagorean theorem: R = √(6² + 8²) = √(36 + 64) = √100 = 10 m. The direction would be tan⁻¹(8/6) = 53.1° North of East."
            />

            <ExerciseQuestion
              question="If A⃗ = 12 N North and B⃗ = 5 N South, what is A⃗ - B⃗?"
              options={[
                '7 N North',
                '17 N North',
                '7 N South',
                '17 N South'
              ]}
              correctAnswer={1}
              explanation="A⃗ - B⃗ = A⃗ + (-B⃗). Since B⃗ = 5 N South, then -B⃗ = 5 N North. So 12 N North + 5 N North = 17 N North (same direction, so we add)."
            />
          </div>

          {/* Subsection 1.1.4: Vector Components */}
          <div className="space-y-3 md:space-y-6 mb-8 md:mb-12">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white">
              1.1.4. Vector Components
            </h3>
            
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Any vector can be broken down into <strong className="text-orange-600 dark:text-orange-400">components</strong> along the x and y axes. 
              Think of it like giving GPS coordinates instead of a direction!
            </p>

            {/* Key Concepts */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-orange-900 dark:text-orange-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🔑</span>
                Component Formulas
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  For a vector v⃗ with magnitude v and angle θ from the positive x-axis:
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded font-mono text-xs md:text-base">
                  <p className="font-bold text-orange-600">v_x = v cos(θ)  ← Horizontal component</p>
                  <p className="font-bold text-orange-600 mt-2">v_y = v sin(θ)  ← Vertical component</p>
                  <p className="mt-3 font-normal">To go back from components to magnitude:</p>
                  <p className="font-bold text-blue-600">v = √(v_x² + v_y²)</p>
                  <p className="font-bold text-blue-600 mt-2">θ = tan⁻¹(v_y / v_x)</p>
                </div>
              </div>
            </div>

            {/* Visual Explanation */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">📐</span>
                Visualizing Components: The Right Triangle
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <pre className="text-[10px] md:text-sm font-mono overflow-x-auto">
{`
    v⃗ (magnitude = v)
       ↗ 
      ↗ | 
     ↗  | v_y (vertical)
    ↗ θ |
  •─────┘
    v_x
  (horizontal)
  
  Think of it as:
  • v_x = How far RIGHT the vector goes
  • v_y = How far UP the vector goes
  • v⃗ = The diagonal (actual vector)
  • θ = Angle from horizontal
`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Worked Example */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🧮</span>
                Worked Example: Finding Components
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p className="font-bold">
                  Problem: A force of 50 N is applied at an angle of 30° above the horizontal. Find its components.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">Solution:</p>
                  <p><strong>Given:</strong></p>
                  <p className="ml-4">• v = 50 N</p>
                  <p className="ml-4">• θ = 30°</p>
                  <p className="mt-2"><strong>Find:</strong> v_x and v_y</p>
                  <p className="mt-2 font-bold text-green-600">Step 1: Horizontal component</p>
                  <p className="ml-4">v_x = v cos(θ)</p>
                  <p className="ml-4">v_x = 50 × cos(30°)</p>
                  <p className="ml-4">v_x = 50 × 0.866</p>
                  <p className="ml-4 font-bold">v_x = 43.3 N →</p>
                  <p className="mt-2 font-bold text-green-600">Step 2: Vertical component</p>
                  <p className="ml-4">v_y = v sin(θ)</p>
                  <p className="ml-4">v_y = 50 × sin(30°)</p>
                  <p className="ml-4">v_y = 50 × 0.5</p>
                  <p className="ml-4 font-bold">v_y = 25 N ↑</p>
                  <p className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 rounded text-xs md:text-sm">
                    ✅ Answer: The force has a horizontal component of 43.3 N to the right and a vertical component of 25 N upward.
                  </p>
                </div>
              </div>
            </div>

            {/* Real World Application */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-purple-900 dark:text-purple-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">✈️</span>
                Real-World Example: Airplane Flying in Wind
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Scenario:</strong> A plane wants to fly due North at 500 km/h, but there's a wind blowing from the West at 100 km/h East.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">Using Components:</p>
                  <p className="text-xs md:text-sm">
                    <strong>Plane's velocity:</strong><br/>
                    • v_x = 0 km/h (trying to go North, no East-West movement)<br/>
                    • v_y = 500 km/h (Northward)
                  </p>
                  <p className="text-xs md:text-sm mt-2">
                    <strong>Wind's velocity:</strong><br/>
                    • w_x = 100 km/h (Eastward push)<br/>
                    • w_y = 0 km/h (no North-South component)
                  </p>
                  <p className="text-xs md:text-sm mt-2">
                    <strong>Resultant (actual flight path):</strong><br/>
                    • Total v_x = 0 + 100 = 100 km/h East<br/>
                    • Total v_y = 500 + 0 = 500 km/h North<br/>
                    • Speed = √(100² + 500²) = 510 km/h<br/>
                    • Direction = tan⁻¹(500/100) = 78.7° from East (slightly off course!)
                  </p>
                  <p className="mt-2 text-xs md:text-sm text-purple-700 dark:text-purple-300">
                    💡 This is why pilots must adjust their heading to compensate for crosswinds!
                  </p>
                </div>
              </div>
            </div>

            <ExerciseQuestion
              question="A velocity vector has components v_x = 6 m/s and v_y = 8 m/s. What is the magnitude of the velocity?"
              options={[
                '14 m/s',
                '10 m/s',
                '2 m/s',
                '7 m/s'
              ]}
              correctAnswer={1}
              explanation="Use the formula: v = √(v_x² + v_y²) = √(6² + 8²) = √(36 + 64) = √100 = 10 m/s. This is classic 3-4-5 right triangle pattern!"
            />

            <ExerciseQuestion
              question="A 100 N force is applied at 60° above the horizontal. What is its vertical component? (sin 60° ≈ 0.866)"
              options={[
                '50 N',
                '86.6 N',
                '100 N',
                '173.2 N'
              ]}
              correctAnswer={1}
              explanation="Vertical component = F sin(θ) = 100 × sin(60°) = 100 × 0.866 = 86.6 N upward."
            />
          </div>

          {/* Subsection 1.1.5: Unit Vector */}
          <div className="space-y-3 md:space-y-6 mb-8 md:mb-12">
            <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white">
              1.1.5. Unit Vector
            </h3>
            
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong className="text-orange-600 dark:text-orange-400">unit vector</strong> is a vector with magnitude = 1. 
              It's used to show <strong>direction only</strong>, like a compass!
            </p>

            {/* Key Concepts */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-orange-900 dark:text-orange-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🔑</span>
                Standard Unit Vectors
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <div className="bg-white dark:bg-slate-800 p-3 rounded font-mono">
                  <p className="font-bold text-orange-600">î (i-hat) = 1 unit in +x direction (→)</p>
                  <p className="font-bold text-orange-600 mt-2">ĵ (j-hat) = 1 unit in +y direction (↑)</p>
                  <p className="font-bold text-orange-600 mt-2">k̂ (k-hat) = 1 unit in +z direction (⊙ out of page)</p>
                </div>
                <p className="text-xs md:text-sm mt-2">
                  <strong>Any vector can be written using unit vectors:</strong><br/>
                  v⃗ = v_x î + v_y ĵ
                </p>
                <p className="text-xs md:text-sm">
                  <strong>Example:</strong> If v_x = 3 m/s and v_y = 4 m/s, then:<br/>
                  v⃗ = 3î + 4ĵ m/s
                </p>
              </div>
            </div>

            {/* How to Find Unit Vector */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3">
                📐 Finding the Unit Vector
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  To find the unit vector in the direction of any vector v⃗:
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold text-blue-600 font-mono text-sm md:text-base">
                    û = v⃗ / |v⃗|
                  </p>
                  <p className="text-xs md:text-sm mt-2">
                    (Divide the vector by its magnitude)
                  </p>
                  <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                    <p className="font-bold text-xs md:text-sm">Example:</p>
                    <p className="text-[10px] md:text-sm">
                      If v⃗ = 3î + 4ĵ<br/>
                      |v⃗| = √(3² + 4²) = 5<br/>
                      û = (3î + 4ĵ) / 5 = 0.6î + 0.8ĵ<br/>
                      Check: |û| = √(0.6² + 0.8²) = √(0.36 + 0.64) = 1 ✓
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real World Example */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🧭</span>
                Real-World Example: GPS Navigation
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  When GPS tells you "Turn left," it's using unit vectors! It doesn't care HOW FAR you turn left, just the DIRECTION.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded text-xs md:text-sm">
                  <p className="font-bold mb-2">GPS Unit Vectors:</p>
                  <p>• North direction = ĵ (unit vector pointing north)</p>
                  <p>• East direction = î (unit vector pointing east)</p>
                  <p>• Northeast = (î + ĵ) / √2 = 0.707î + 0.707ĵ</p>
                  <p className="mt-2 text-green-700 dark:text-green-300">
                    The GPS then multiplies by distance: "Go 500m Northeast" = 500 × (0.707î + 0.707ĵ)
                  </p>
                </div>
              </div>
            </div>

            <ExerciseQuestion
              question="What is the magnitude of any unit vector?"
              options={[
                '0',
                '1',
                'It depends on the direction',
                'Infinity'
              ]}
              correctAnswer={1}
              explanation="By definition, a unit vector ALWAYS has a magnitude of exactly 1. That's what makes it a 'unit' vector - it represents pure direction with no scaling."
            />

            <ExerciseQuestion
              question="Vector A⃗ = 5î + 12ĵ. What is the unit vector in the direction of A⃗?"
              options={[
                'û = 5î + 12ĵ',
                'û = 0.385î + 0.923ĵ',
                'û = î + ĵ',
                'û = 0.5î + 1.2ĵ'
              ]}
              correctAnswer={1}
              explanation="First find |A⃗| = √(5² + 12²) = √(25 + 144) = √169 = 13. Then û = A⃗/|A⃗| = (5î + 12ĵ)/13 = (5/13)î + (12/13)ĵ = 0.385î + 0.923ĵ"
            />
          </div>
        </section>

        {/* Chapter Summary */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 p-4 md:p-8 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold text-orange-900 dark:text-orange-100 mb-3 md:mb-4 flex items-center gap-2">
            <span className="text-xl md:text-3xl">🎯</span>
            Chapter 1 Summary: Vectors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg">
              <h3 className="font-bold text-sm md:text-base text-orange-600 dark:text-orange-400 mb-2">✅ Key Concepts Mastered:</h3>
              <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Difference between scalars and vectors</li>
                <li>• Vector representation with arrows</li>
                <li>• Vector addition (tip-to-tail method)</li>
                <li>• Breaking vectors into components</li>
                <li>• Unit vectors and direction</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg">
              <h3 className="font-bold text-sm md:text-base text-red-600 dark:text-red-400 mb-2">📐 Essential Formulas:</h3>
              <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1 font-mono">
                <li>• v_x = v cos(θ)</li>
                <li>• v_y = v sin(θ)</li>
                <li>• |v⃗| = √(v_x² + v_y²)</li>
                <li>• θ = tan⁻¹(v_y/v_x)</li>
                <li>• û = v⃗ / |v⃗|</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Motivational Closing */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-800 dark:to-red-800 text-white p-4 md:p-8 rounded-lg text-center">
          <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">
            🚀 You've Mastered Vectors! 🚀
          </h3>
          <p className="text-xs md:text-lg">
            You now understand the foundation of physics! Vectors will appear in every chapter ahead - motion, forces, energy, and more. 
            Keep this knowledge sharp! 🎯📚✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
