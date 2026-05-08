import React, { useEffect } from 'react';

interface Chapter1Props {
  selectedSubtopic?: string;
}

const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic }) => {
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
        <span className="inline-block px-4 py-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          INTRODUCTION TO GEOGRAPHY
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        
        {/* Section 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg flex items-center justify-center text-sm">1.1</span>
              Definition and Scope of Geography
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              <strong>Geography</strong> is the study of Earth's landscapes, environments, and the relationships between people and their environments. 
              The word comes from Greek: "geo" (Earth) and "graphia" (description).
            </p>
            
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-800 mb-6">
              <h4 className="font-bold text-teal-900 dark:text-teal-300 mb-3">Core Questions of Geography</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <div className="text-2xl mb-2">📍</div>
                  <strong className="text-slate-900 dark:text-white">Where?</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Location and distribution</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <div className="text-2xl mb-2">❓</div>
                  <strong className="text-slate-900 dark:text-white">Why there?</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Reasons for patterns</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Physical Geography</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Studies natural features: landforms, climate, water bodies, vegetation, and soil.</p>
              </div>
              
              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Human Geography</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Studies human activities: population, culture, economics, and urban development.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.2 */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">1.2</span>
              Branches of Geography
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Geomorphology', desc: 'Study of landforms', icon: '⛰️' },
                { name: 'Climatology', desc: 'Study of climate', icon: '🌤️' },
                { name: 'Hydrology', desc: 'Study of water', icon: '💧' },
                { name: 'Biogeography', desc: 'Distribution of life', icon: '🌿' },
                { name: 'Urban Geography', desc: 'Study of cities', icon: '🏙️' },
                { name: 'Economic Geography', desc: 'Economic activities', icon: '💼' }
              ].map((branch, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="text-3xl mb-3">{branch.icon}</div>
                  <h4 className="text-teal-400 font-bold mb-2">{branch.name}</h4>
                  <p className="text-sm text-slate-400">{branch.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1.3 */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg flex items-center justify-center text-sm">1.3</span>
              Importance of Geography
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Geography helps us understand our world, make informed decisions, and address global challenges.
            </p>
            
            <div className="space-y-4">
              {[
                { title: 'Environmental Understanding', desc: 'Helps us understand climate change, natural disasters, and resource management.' },
                { title: 'Cultural Awareness', desc: 'Promotes understanding of different cultures, languages, and traditions.' },
                { title: 'Economic Planning', desc: 'Guides decisions about resource allocation, trade, and development.' },
                { title: 'Problem Solving', desc: 'Provides tools to address issues like urbanization, pollution, and sustainability.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1.4 */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg flex items-center justify-center text-sm">1.4</span>
              Geographic Tools and Techniques
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Geographers use various tools and technologies to collect, analyze, and present spatial information.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                <h4 className="font-bold text-teal-900 dark:text-teal-300 mb-3">🗺️ Maps</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Visual representations of Earth's surface showing locations, features, and patterns.</p>
                <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                  <li>• Topographic maps</li>
                  <li>• Political maps</li>
                  <li>• Thematic maps</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">🛰️ GIS & Remote Sensing</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">Modern technology for spatial data analysis and Earth observation.</p>
                <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                  <li>• Satellite imagery</li>
                  <li>• GPS technology</li>
                  <li>• Digital mapping</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1.5 */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg flex items-center justify-center text-sm">1.5</span>
              Map Reading and Interpretation
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Understanding maps requires knowledge of symbols, scales, and coordinate systems.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-4">Key Map Elements</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <strong className="text-slate-900 dark:text-white block mb-2">Scale</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Ratio between map distance and actual distance</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <strong className="text-slate-900 dark:text-white block mb-2">Legend</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Explains symbols and colors used</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <strong className="text-slate-900 dark:text-white block mb-2">Compass</strong>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Shows cardinal directions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Chapter1;
