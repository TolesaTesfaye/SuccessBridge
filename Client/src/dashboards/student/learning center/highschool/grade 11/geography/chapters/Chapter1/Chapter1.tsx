import React, { useEffect } from "react";

interface ChapterProps {
  selectedSubtopic?: string;
}

export const Chapter1: React.FC<ChapterProps> = ({ selectedSubtopic }) => {
  useEffect(() => {
    if (selectedSubtopic) {
      const subtopicId = selectedSubtopic.split(".").slice(0, 2).join(".").trim();
      const element = document.getElementById(`subtopic-${subtopicId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedSubtopic]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          PHYSICAL GEOGRAPHY
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-600 to-sky-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg flex items-center justify-center text-sm">
                1.1
              </span>
              Earth's Structure
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Earth is composed of distinct layers, each with unique properties. Understanding Earth's structure 
              is fundamental to comprehending geological processes, natural disasters, and the planet's evolution.
            </p>

            <div className="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20 rounded-xl p-6 border border-cyan-100 dark:border-cyan-800 mb-6">
              <h4 className="font-bold text-cyan-900 dark:text-cyan-300 mb-4">🌍 Layers of the Earth</h4>
              <div className="space-y-3">
                {[
                  { name: "Crust", depth: "0-70 km", desc: "Thin outermost layer where we live" },
                  { name: "Mantle", depth: "70-2,900 km", desc: "Thick layer of hot, semi-solid rock" },
                  { name: "Outer Core", depth: "2,900-5,150 km", desc: "Liquid iron and nickel" },
                  { name: "Inner Core", depth: "5,150-6,371 km", desc: "Solid iron and nickel ball" }
                ].map((layer, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-bold text-cyan-600 dark:text-cyan-400">{layer.name}</h5>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{layer.depth}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{layer.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg flex items-center justify-center text-sm">
                1.2
              </span>
              Landforms
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Landforms are natural features of Earth's surface shaped by geological processes over millions of years.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "Mountains", icon: "⛰️", desc: "High elevated landforms" },
                { name: "Valleys", icon: "🏞️", desc: "Low areas between hills" },
                { name: "Plateaus", icon: "🏔️", desc: "Flat elevated areas" },
                { name: "Plains", icon: "🌾", desc: "Flat low-lying areas" },
                { name: "Deserts", icon: "🏜️", desc: "Arid dry regions" },
                { name: "Coastal", icon: "🏖️", desc: "Areas along oceans" }
              ].map((landform, i) => (
                <div key={i} className="p-5 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-100 dark:border-cyan-800 text-center">
                  <div className="text-4xl mb-2">{landform.icon}</div>
                  <h5 className="font-bold text-cyan-900 dark:text-cyan-300 mb-1">{landform.name}</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{landform.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">1.3</span>
              Climate and Weather
            </h3>
            <p className="text-slate-300 mb-6">
              Climate is the long-term average of weather patterns, while weather refers to short-term atmospheric conditions.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-cyan-400 font-bold mb-3">Climate Zones</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• <strong>Tropical:</strong> Hot and humid year-round</li>
                  <li>• <strong>Arid:</strong> Dry with little rainfall</li>
                  <li>• <strong>Temperate:</strong> Moderate temperatures</li>
                  <li>• <strong>Polar:</strong> Extremely cold</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-sky-400 font-bold mb-3">Weather Elements</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• <strong>Temperature:</strong> Heat level</li>
                  <li>• <strong>Precipitation:</strong> Rain, snow</li>
                  <li>• <strong>Wind:</strong> Air movement</li>
                  <li>• <strong>Humidity:</strong> Moisture content</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-lg flex items-center justify-center text-sm">
                1.4
              </span>
              Natural Resources
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Natural resources are materials from Earth that humans use for survival and development.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <h5 className="font-bold text-green-900 dark:text-green-300 mb-3">Renewable Resources</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Can be replenished naturally</p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Solar energy</li>
                  <li>• Wind energy</li>
                  <li>• Water</li>
                  <li>• Forests</li>
                </ul>
              </div>

              <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                <h5 className="font-bold text-amber-900 dark:text-amber-300 mb-3">Non-Renewable Resources</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Limited and cannot be replaced</p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Fossil fuels (coal, oil, gas)</li>
                  <li>• Minerals</li>
                  <li>• Metals</li>
                  <li>• Nuclear materials</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-cyan-600 to-sky-700 rounded-3xl p-10 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-6">📖 Chapter 1 Summary</h3>
          <div className="space-y-3 text-cyan-50">
            <p>✓ Earth has four layers: crust, mantle, outer core, and inner core</p>
            <p>✓ Landforms include mountains, valleys, plateaus, plains, and coastal areas</p>
            <p>✓ Climate zones vary from tropical to polar; weather changes daily</p>
            <p>✓ Natural resources are renewable (solar, wind) or non-renewable (fossil fuels, minerals)</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
