import React, { useEffect } from "react";

interface ChapterProps {
  selectedSubtopic?: string;
}

export const Chapter1: React.FC<ChapterProps> = ({ selectedSubtopic }) => {
  useEffect(() => {
    if (selectedSubtopic) {
      const subtopicId = selectedSubtopic
        .split(".")
        .slice(0, 2)
        .join(".")
        .trim();
      const element = document.getElementById(`subtopic-${subtopicId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedSubtopic]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          PHYSICAL WORLD AND MEASUREMENT
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        {/* Section 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center text-sm">
                1.1
              </span>
              What is Physics?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Physics is the fundamental science that studies matter, energy, and their interactions. It seeks to 
              understand the basic principles that govern the natural world, from the smallest subatomic particles 
              to the vastness of the universe.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-3">
                  Branches of Physics
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• <strong>Mechanics:</strong> Motion and forces</li>
                  <li>• <strong>Thermodynamics:</strong> Heat and energy</li>
                  <li>• <strong>Electromagnetism:</strong> Electricity and magnetism</li>
                  <li>• <strong>Optics:</strong> Light and vision</li>
                  <li>• <strong>Modern Physics:</strong> Quantum and relativity</li>
                </ul>
              </div>

              <div className="p-5 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-100 dark:border-pink-800">
                <h4 className="font-bold text-pink-900 dark:text-pink-300 mb-3">
                  Applications of Physics
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Technology and engineering</li>
                  <li>• Medicine and healthcare</li>
                  <li>• Communication systems</li>
                  <li>• Space exploration</li>
                  <li>• Energy production</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-3">
                🔬 The Scientific Method in Physics
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Physics uses systematic observation, experimentation, and mathematical analysis to understand 
                natural phenomena. It involves formulating hypotheses, conducting experiments, and developing 
                theories that can predict future observations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1.2 */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center text-sm">
                1.2
              </span>
              Units and Measurements
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Measurement is fundamental to physics. It involves comparing a physical quantity with a standard unit. 
              The International System of Units (SI) provides a universal framework for scientific measurements.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800 mb-6">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-4">
                SI Base Units
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { quantity: "Length", unit: "meter", symbol: "m" },
                  { quantity: "Mass", unit: "kilogram", symbol: "kg" },
                  { quantity: "Time", unit: "second", symbol: "s" },
                  { quantity: "Electric Current", unit: "ampere", symbol: "A" },
                  { quantity: "Temperature", unit: "kelvin", symbol: "K" },
                  { quantity: "Amount of Substance", unit: "mole", symbol: "mol" },
                  { quantity: "Luminous Intensity", unit: "candela", symbol: "cd" }
                ].map((unit, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-slate-800 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{unit.quantity}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{unit.unit}</p>
                    </div>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{unit.symbol}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
              <h5 className="font-bold text-amber-900 dark:text-amber-300 mb-3">
                Common Derived Units
              </h5>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p>• <strong>Force:</strong> Newton (N) = kg⋅m/s²</p>
                <p>• <strong>Energy:</strong> Joule (J) = N⋅m</p>
                <p>• <strong>Power:</strong> Watt (W) = J/s</p>
                <p>• <strong>Pressure:</strong> Pascal (Pa) = N/m²</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.3 */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">
                1.3
              </span>
              Dimensional Analysis
            </h3>
            <p className="text-slate-300 mb-6">
              Dimensional analysis is a powerful tool in physics that helps verify equations, convert units, 
              and derive relationships between physical quantities. Every physical quantity has dimensions 
              expressed in terms of fundamental quantities.
            </p>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
              <h4 className="text-purple-400 font-bold mb-4 text-lg">
                Fundamental Dimensions
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">[M]</div>
                  <p className="text-sm text-slate-300">Mass</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">[L]</div>
                  <p className="text-sm text-slate-300">Length</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">[T]</div>
                  <p className="text-sm text-slate-300">Time</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-700/50">
              <h5 className="text-purple-400 font-bold mb-3">Examples of Dimensions</h5>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-slate-800 rounded">
                  <span className="text-slate-300">Velocity</span>
                  <span className="font-mono text-purple-400">[LT⁻¹]</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800 rounded">
                  <span className="text-slate-300">Acceleration</span>
                  <span className="font-mono text-purple-400">[LT⁻²]</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800 rounded">
                  <span className="text-slate-300">Force</span>
                  <span className="font-mono text-purple-400">[MLT⁻²]</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800 rounded">
                  <span className="text-slate-300">Energy</span>
                  <span className="font-mono text-purple-400">[ML²T⁻²]</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.4 */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center text-sm">
                1.4
              </span>
              Significant Figures
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Significant figures indicate the precision of a measurement. They include all certain digits plus 
              one uncertain digit. Understanding significant figures is crucial for reporting measurements accurately.
            </p>

            <div className="space-y-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <h5 className="font-bold text-purple-600 dark:text-purple-400 mb-3">
                  Rules for Significant Figures
                </h5>
                <ol className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong>1.</strong> All non-zero digits are significant (123 has 3 sig figs)</li>
                  <li><strong>2.</strong> Zeros between non-zero digits are significant (1005 has 4 sig figs)</li>
                  <li><strong>3.</strong> Leading zeros are not significant (0.052 has 2 sig figs)</li>
                  <li><strong>4.</strong> Trailing zeros after decimal are significant (2.500 has 4 sig figs)</li>
                  <li><strong>5.</strong> Trailing zeros without decimal may or may not be significant</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                  <h5 className="font-bold text-green-900 dark:text-green-300 mb-3">
                    Addition/Subtraction
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Result has same number of decimal places as the number with the fewest decimal places.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded font-mono text-sm">
                    12.34 + 5.6 = 17.9
                  </div>
                </div>

                <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                  <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-3">
                    Multiplication/Division
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Result has same number of significant figures as the number with the fewest sig figs.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded font-mono text-sm">
                    3.2 × 4.567 = 15
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-3xl p-10 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-6">📖 Chapter 1 Summary</h3>
          <div className="space-y-3 text-purple-50">
            <p>✓ Physics studies matter, energy, and their interactions using the scientific method</p>
            <p>✓ SI base units provide a universal measurement system for physical quantities</p>
            <p>✓ Dimensional analysis helps verify equations and convert between units</p>
            <p>✓ Significant figures indicate measurement precision and guide calculations</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
