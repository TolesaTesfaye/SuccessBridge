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
        <span className="inline-block px-4 py-1.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          ANCIENT CIVILIZATIONS
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-rose-600 to-red-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">
                1.1
              </span>
              Mesopotamian Civilization
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Mesopotamia, meaning "land between rivers" (Tigris and Euphrates), is often called the "Cradle of Civilization." 
              It was home to the world's first cities, writing system, and complex societies.
            </p>

            <div className="bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 rounded-xl p-6 border border-rose-100 dark:border-rose-800 mb-6">
              <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-4">🏛️ Key Achievements</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Cuneiform Writing", desc: "First writing system using wedge-shaped marks" },
                  { title: "Code of Hammurabi", desc: "One of the earliest law codes" },
                  { title: "Wheel & Plow", desc: "Revolutionary farming and transportation" },
                  { title: "Ziggurats", desc: "Massive temple structures" }
                ].map((achievement, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                    <h5 className="font-bold text-rose-600 dark:text-rose-400 mb-1">{achievement.title}</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
              <h5 className="font-bold text-amber-900 dark:text-amber-300 mb-2">Major Empires:</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sumerians → Akkadians → Babylonians → Assyrians → Neo-Babylonians → Persians
              </p>
            </div>
          </div>
        </section>

        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">
                1.2
              </span>
              Egyptian Civilization
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Ancient Egypt flourished along the Nile River for over 3,000 years, leaving a legacy of magnificent 
              monuments, advanced knowledge, and rich culture.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { era: "Old Kingdom", years: "2686-2181 BCE", feature: "Pyramids built" },
                { era: "Middle Kingdom", years: "2055-1650 BCE", feature: "Arts flourished" },
                { era: "New Kingdom", years: "1550-1077 BCE", feature: "Greatest power" }
              ].map((period, i) => (
                <div key={i} className="p-5 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800 text-center">
                  <h5 className="font-bold text-amber-900 dark:text-amber-300 mb-1">{period.era}</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{period.years}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{period.feature}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
              <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-3">Famous Contributions:</h5>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <li>• <strong>Hieroglyphics:</strong> Picture-based writing system</li>
                <li>• <strong>Pyramids:</strong> Massive tombs for pharaohs</li>
                <li>• <strong>Mummification:</strong> Preserving bodies for afterlife</li>
                <li>• <strong>Medicine & Mathematics:</strong> Advanced for their time</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">1.3</span>
              Indus Valley Civilization
            </h3>
            <p className="text-slate-300 mb-8">
              The Indus Valley Civilization (3300-1300 BCE) was one of the most advanced ancient civilizations, 
              known for its sophisticated urban planning and engineering.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-rose-400 font-bold mb-3 text-lg">Urban Planning</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Grid-pattern street layout</li>
                  <li>• Advanced drainage systems</li>
                  <li>• Public baths (Great Bath of Mohenjo-daro)</li>
                  <li>• Standardized brick sizes</li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-amber-400 font-bold mb-3 text-lg">Trade & Economy</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Trade with Mesopotamia</li>
                  <li>• Standardized weights & measures</li>
                  <li>• Cotton cultivation</li>
                  <li>• Craft specialization</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-900/30 to-red-900/30 rounded-xl p-6 border border-rose-700/50">
              <h5 className="text-rose-400 font-bold mb-3">Major Cities:</h5>
              <p className="text-slate-300 text-sm">
                <strong>Harappa</strong> and <strong>Mohenjo-daro</strong> were the two largest cities, 
                each with populations of 30,000-40,000 people at their peak.
              </p>
            </div>
          </div>
        </section>

        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">
                1.4
              </span>
              Chinese Civilization
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Ancient China, with its continuous history spanning millennia, made remarkable contributions to 
              human civilization in philosophy, technology, and governance.
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  dynasty: "Shang Dynasty (1600-1046 BCE)",
                  achievements: ["Oracle bones", "Bronze casting", "Early Chinese writing"]
                },
                {
                  dynasty: "Zhou Dynasty (1046-256 BCE)",
                  achievements: ["Mandate of Heaven concept", "Confucianism & Taoism", "Iron tools"]
                },
                {
                  dynasty: "Qin Dynasty (221-206 BCE)",
                  achievements: ["Unified China", "Great Wall construction", "Standardized writing"]
                },
                {
                  dynasty: "Han Dynasty (206 BCE-220 CE)",
                  achievements: ["Silk Road trade", "Paper invention", "Civil service exams"]
                }
              ].map((period, i) => (
                <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-rose-600 dark:text-rose-400 mb-2">{period.dynasty}</h5>
                  <div className="flex flex-wrap gap-2">
                    {period.achievements.map((achievement, j) => (
                      <span key={j} className="text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-3 py-1 rounded-full">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-100 dark:border-red-800">
              <h5 className="font-bold text-red-900 dark:text-red-300 mb-3">Four Great Inventions:</h5>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📜</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Paper</strong> - Communication revolution</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧭</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Compass</strong> - Navigation tool</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎆</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Gunpowder</strong> - Military advantage</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Printing</strong> - Knowledge spread</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-rose-600 to-red-700 rounded-3xl p-10 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-6">📖 Chapter 1 Summary</h3>
          <div className="space-y-3 text-rose-50">
            <p>✓ Mesopotamia: First cities, cuneiform writing, Code of Hammurabi</p>
            <p>✓ Egypt: Pyramids, hieroglyphics, 3,000+ years of continuous civilization</p>
            <p>✓ Indus Valley: Advanced urban planning, sophisticated drainage systems</p>
            <p>✓ China: Four Great Inventions, philosophical systems, powerful dynasties</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
