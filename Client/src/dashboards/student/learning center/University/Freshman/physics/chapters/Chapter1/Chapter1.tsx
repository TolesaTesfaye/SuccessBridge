import React, { useEffect } from 'react';

interface Chapter1Props {
  selectedSubtopic?: string;
}

export const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic }) => {
  // Scroll to subtopic when selected
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
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          PRELIMINARIES
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        {/* Section 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center text-sm">1.1</span>
              Physical Quantities and Measurement
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Physics is the study of matter, energy, and their interactions. To describe physical phenomena quantitatively, 
              we use <strong>physical quantities</strong> - properties that can be measured and expressed numerically.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Fundamental Quantities</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Base quantities that cannot be expressed in terms of other quantities.</p>
                <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                  <li>• Length (meter, m)</li>
                  <li>• Mass (kilogram, kg)</li>
                  <li>• Time (second, s)</li>
                  <li>• Temperature (kelvin, K)</li>
                  <li>• Electric Current (ampere, A)</li>
                </ul>
              </div>
              
              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Derived Quantities</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Quantities derived from fundamental quantities.</p>
                <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                  <li>• Area (m²)</li>
                  <li>• Volume (m³)</li>
                  <li>• Velocity (m/s)</li>
                  <li>• Acceleration (m/s²)</li>
                  <li>• Force (N = kg·m/s²)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.2 */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center text-sm">1.2</span>
              Uncertainty in Measurement and Significant Digits
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Every measurement has some degree of <strong>uncertainty</strong> due to limitations of measuring instruments 
              and human observation. Significant digits help us express the precision of measurements.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 mb-6">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3">Rules for Significant Figures</h4>
              <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><strong>1.</strong> All non-zero digits are significant (123 has 3 sig figs)</li>
                <li><strong>2.</strong> Zeros between non-zero digits are significant (1002 has 4 sig figs)</li>
                <li><strong>3.</strong> Leading zeros are NOT significant (0.0025 has 2 sig figs)</li>
                <li><strong>4.</strong> Trailing zeros after decimal are significant (2.500 has 4 sig figs)</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 1.3 */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">1.3</span>
              Vectors: Composition and Resolution
            </h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Vectors are quantities that have both <strong>magnitude</strong> and <strong>direction</strong>, 
              unlike scalars which have only magnitude.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-green-400 font-bold mb-3">Vector Addition</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Vectors can be added using the parallelogram law or triangle method.
                </p>
                <div className="bg-white/10 rounded p-3 font-mono text-xs">
                  R⃗ = A⃗ + B⃗
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-blue-400 font-bold mb-3">Vector Resolution</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Any vector can be resolved into perpendicular components.
                </p>
                <div className="bg-white/10 rounded p-3 font-mono text-xs space-y-1">
                  <div>Aₓ = A cos θ</div>
                  <div>Aᵧ = A sin θ</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.4 */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center text-sm">1.4</span>
              Unit Vector
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              A <strong>unit vector</strong> is a vector with magnitude equal to 1, used to specify direction.
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h4 className="font-bold text-green-900 dark:text-green-300 mb-4">Standard Unit Vectors</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">î</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">x-direction</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">ĵ</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">y-direction</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">k̂</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">z-direction</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg font-mono text-sm text-center">
                A⃗ = Aₓî + Aᵧĵ + Aᵧk̂
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
