import React from 'react';

export const StandardsOfMeasurement: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Standards of Measurement
      </h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Physics is based on experimental observations and quantitative measurements.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          The SI System (International System of Units)
        </h2>
        
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          The SI system provides a standardized set of units used worldwide in science and engineering.
        </p>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Length - Meter (m)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              The meter is defined as the distance light travels in vacuum in 1/299,792,458 of a second.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Common prefixes: kilometer (km), centimeter (cm), millimeter (mm)
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
              Mass - Kilogram (kg)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              The kilogram is defined by the Planck constant, a fundamental constant of nature.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Common units: gram (g), milligram (mg), metric ton (t)
            </p>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
              Time - Second (s)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              The second is defined by the frequency of radiation from cesium-133 atoms.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Common units: minute (min), hour (h), millisecond (ms)
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
              Temperature - Kelvin (K)
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              The Kelvin scale starts at absolute zero (-273.15°C).
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Other scales: Celsius (°C), Fahrenheit (°F)
            </p>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Why Standardized Units Matter
          </h3>
          <ul className="space-y-2 text-slate-700 dark:text-slate-300">
            <li>• Enable clear communication between scientists worldwide</li>
            <li>• Ensure reproducibility of experiments</li>
            <li>• Allow for precise calculations and predictions</li>
            <li>• Support international trade and commerce</li>
          </ul>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
        <button className="px-6 py-3 rounded text-sm font-medium bg-[#04aa6d] text-white hover:bg-[#038a5a] transition-colors">
          ❮ Previous
        </button>
        <button className="px-6 py-3 rounded text-sm font-medium bg-slate-200 text-slate-400 cursor-not-allowed">
          Next ❯
        </button>
      </div>
    </div>
  );
};