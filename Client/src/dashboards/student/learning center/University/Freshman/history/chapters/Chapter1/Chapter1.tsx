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
      <div className="relative mb-12">
        <span className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          INTRODUCTION TO HISTORY
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center text-sm">1.1</span>
              What is History?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              <strong>History</strong> is the study of past events, particularly human affairs. It examines how societies, cultures, and civilizations have evolved over time.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2">📜 Purpose</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Understanding the past helps us make sense of the present and prepare for the future.</p>
              </div>
              <div className="p-5 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
                <h4 className="font-bold text-orange-900 dark:text-orange-300 mb-2">🔍 Method</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Historians analyze evidence, interpret sources, and construct narratives about the past.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">1.2</span>
              Sources of History
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-amber-400 font-bold mb-3">Primary Sources</h4>
                <p className="text-sm text-slate-400 mb-3">Original documents and artifacts from the time period being studied.</p>
                <ul className="text-xs space-y-1 text-slate-300">
                  <li>• Letters and diaries</li>
                  <li>• Official documents</li>
                  <li>• Photographs</li>
                  <li>• Archaeological artifacts</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-orange-400 font-bold mb-3">Secondary Sources</h4>
                <p className="text-sm text-slate-400 mb-3">Interpretations and analyses created after the events.</p>
                <ul className="text-xs space-y-1 text-slate-300">
                  <li>• History textbooks</li>
                  <li>• Scholarly articles</li>
                  <li>• Documentaries</li>
                  <li>• Biographies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="subtopic-1.3" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center text-sm">1.3</span>
              Historiography
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              <strong>Historiography</strong> is the study of how history is written and the methods historians use to interpret the past.
            </p>
            <div className="space-y-4">
              {['Objectivity vs. Bias', 'Multiple Perspectives', 'Changing Interpretations', 'Historical Context'].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                  <div><h4 className="font-bold text-slate-900 dark:text-white">{item}</h4></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center text-sm">1.4</span>
              Periodization of History
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Historians divide time into periods to organize and understand historical developments.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { period: 'Ancient', time: 'Before 500 CE', icon: '🏛️' },
                { period: 'Medieval', time: '500-1500 CE', icon: '⚔️' },
                { period: 'Modern', time: '1500-Present', icon: '🏭' }
              ].map((item, i) => (
                <div key={i} className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h4 className="font-bold text-amber-900 dark:text-amber-300">{item.period}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="subtopic-1.5" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center text-sm">1.5</span>
              Importance of Studying History
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              History provides valuable lessons and insights that shape our understanding of the world.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Learn from the Past', desc: 'Understand mistakes and successes to make better decisions.', icon: '📚' },
                { title: 'Cultural Identity', desc: 'Connect with heritage and understand diverse cultures.', icon: '🌍' },
                { title: 'Critical Thinking', desc: 'Develop analytical skills through source evaluation.', icon: '🧠' },
                { title: 'Civic Engagement', desc: 'Become informed citizens who understand societal development.', icon: '🗳️' }
              ].map((item, i) => (
                <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
