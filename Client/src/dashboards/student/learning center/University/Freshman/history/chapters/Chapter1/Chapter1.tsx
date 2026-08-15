import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter1Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

export const Chapter1: React.FC<Chapter1Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          History Chapter 1 • Foundation Guide
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          INTRODUCTION TO HISTORY
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-amber-600 to-orange-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Journey through time to understand humanity's story! Explore the nature of history, its sources, methods of historical inquiry, how we organize time periods, and why studying the past matters for our present and future.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">

        
        {/* SUBTOPIC 1.1: What is History? */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-amber-600 pl-2 md:pl-4">
            1.1. What is History?
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>History</strong> is the study of past events, particularly human affairs. It encompasses the systematic recording, interpretation, and analysis of human experiences over time. The word "history" comes from the Greek word <em>historia</em>, meaning "inquiry" or "knowledge acquired by investigation."
            </p>

            {/* Formal Definition Card */}
            <div className="p-6 border-2 border-amber-300 dark:border-amber-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-2">
                📌 Defining History
              </h3>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                History is both <strong>the past itself</strong> and <strong>the study of the past</strong>. It is a systematic account of events that have shaped human civilization, societies, cultures, and institutions.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded">
                  <strong>Etymology:</strong>
                  <p className="text-amber-800 dark:text-amber-300 mt-1">Greek: Historia (ἱστορία)</p>
                  <p className="text-amber-800 dark:text-amber-300">Meaning: Investigation, inquiry</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded">
                  <strong>Dual Meaning:</strong>
                  <p className="text-orange-800 dark:text-orange-300 mt-1">1. The actual past events</p>
                  <p className="text-orange-800 dark:text-orange-300">2. The study of past events</p>
                </div>
              </div>
            </div>

            {/* Key Characteristics of History */}
            <div className="p-6 border-2 border-orange-200 dark:border-orange-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
                <span>🔍</span> Key Characteristics of History
              </h4>
              
              <div className="space-y-3">
                {[
                  {
                    icon: '📅',
                    title: 'Chronological',
                    desc: 'Events are arranged in time sequence, showing causes and effects',
                    example: 'The Industrial Revolution (1760-1840) led to urbanization'
                  },
                  {
                    icon: '🌍',
                    title: 'Geographical',
                    desc: 'Events occur in specific places and spaces',
                    example: 'The Renaissance began in Italy and spread across Europe'
                  },
                  {
                    icon: '👥',
                    title: 'Human-Centered',
                    desc: 'Focuses on human activities, decisions, and experiences',
                    example: 'How leaders, movements, and ordinary people shaped events'
                  },
                  {
                    icon: '🔗',
                    title: 'Interconnected',
                    desc: 'Events are linked through cause-and-effect relationships',
                    example: 'World War I consequences led to conditions for World War II'
                  },
                  {
                    icon: '📖',
                    title: 'Evidence-Based',
                    desc: 'Based on verifiable sources and careful analysis',
                    example: 'Documents, artifacts, and testimonies provide proof'
                  }
                ].map((char, i) => (
                  <div key={i} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-2xl">{char.icon}</span>
                      <div>
                        <h5 className="font-bold text-amber-900 dark:text-amber-300 text-sm md:text-base">{char.title}</h5>
                        <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">{char.desc}</p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded p-2 text-xs italic text-slate-600 dark:text-slate-400 ml-11">
                      <strong>Example:</strong> {char.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* History vs. Prehistory */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-amber-300 dark:border-amber-800">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📜</span>
                  <h3 className="text-base font-bold text-amber-700 dark:text-amber-400">History</h3>
                </div>
                <ul className="text-xs md:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Period with <strong>written records</strong></li>
                  <li>• Documented events and dates</li>
                  <li>• Can be verified through texts</li>
                  <li>• Generally after 3200 BCE (invention of writing)</li>
                  <li>• More detailed and accurate information</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-2xl border-2 border-slate-300 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🗿</span>
                  <h3 className="text-base font-bold text-slate-700 dark:text-slate-400">Prehistory</h3>
                </div>
                <ul className="text-xs md:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Period <strong>before written records</strong></li>
                  <li>• Studied through archaeology</li>
                  <li>• Artifacts, fossils, and remains</li>
                  <li>• Before 3200 BCE</li>
                  <li>• Less precise dating and details</li>
                </ul>
              </div>
            </div>

            {/* Practice Exercise for 1.1 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: What is History?</h4>
                <ExerciseQuestion 
                  question="Which of the following best distinguishes history from prehistory?"
                  options={[
                    'History is older than prehistory',
                    'History relies on written records while prehistory relies on archaeological evidence',
                    'History is more important than prehistory',
                    'History only studies kings and queens'
                  ]}
                  correctAnswer={1}
                  explanation="The key distinction is that history is the period with written records that can be studied through documents and texts, while prehistory is the period before writing was invented and must be studied through archaeological evidence like artifacts, fossils, and physical remains. This distinction is about the nature of available evidence, not about importance or age."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.2: Sources of History */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-amber-600 pl-2 md:pl-4">
            1.2. Sources of History
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Historical sources are materials that provide information about past events. Historians use these sources as evidence to reconstruct and understand history. Sources can be classified into primary and secondary categories.
            </p>

            {/* Primary vs Secondary Sources */}
            <div className="p-6 border-2 border-amber-200 dark:border-amber-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4 text-center">📚 Two Main Categories of Historical Sources</h4>
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Primary Sources */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-300 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">📜</span>
                    <div>
                      <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400">Primary Sources</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">First-hand evidence from the time period</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-xs md:text-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                      <strong className="text-blue-900 dark:text-blue-300">Written Documents:</strong>
                      <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                        <li>• Letters and diaries</li>
                        <li>• Official records and treaties</li>
                        <li>• Newspapers and magazines</li>
                        <li>• Government documents</li>
                        <li>• Religious texts</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                      <strong className="text-blue-900 dark:text-blue-300">Physical Evidence:</strong>
                      <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                        <li>• Artifacts and tools</li>
                        <li>• Buildings and monuments</li>
                        <li>• Clothing and pottery</li>
                        <li>• Coins and currency</li>
                        <li>• Art and sculptures</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                      <strong className="text-blue-900 dark:text-blue-300">Audio/Visual:</strong>
                      <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                        <li>• Photographs</li>
                        <li>• Films and videos</li>
                        <li>• Audio recordings</li>
                        <li>• Oral testimonies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Secondary Sources */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-300 dark:border-purple-800">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">📚</span>
                    <div>
                      <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400">Secondary Sources</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Interpretations based on primary sources</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-xs md:text-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                      <strong className="text-purple-900 dark:text-purple-300">Academic Works:</strong>
                      <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                        <li>• History textbooks</li>
                        <li>• Scholarly articles</li>
                        <li>• Research papers</li>
                        <li>• Dissertations</li>
                        <li>• Academic journals</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                      <strong className="text-purple-900 dark:text-purple-300">Interpretive Works:</strong>
                      <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                        <li>• Biographies</li>
                        <li>• Encyclopedias</li>
                        <li>• Documentaries</li>
                        <li>• Historical fiction</li>
                        <li>• Museum exhibits</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                      <strong className="text-purple-900 dark:text-purple-300">Reviews:</strong>
                      <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                        <li>• Book reviews</li>
                        <li>• Critical analyses</li>
                        <li>• Historiographical essays</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Source Evaluation */}
            <div className="p-6 border-2 border-orange-300 dark:border-orange-800 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <h4 className="font-bold text-orange-900 dark:text-orange-300 text-base mb-4 flex items-center gap-2">
                <span>⚖️</span> Evaluating Historical Sources: The 5 C's
              </h4>
              
              <div className="grid md:grid-cols-5 gap-3 text-xs md:text-sm">
                {[
                  { letter: 'C', term: 'Context', desc: 'When and where was it created? What was happening at that time?' },
                  { letter: 'C', term: 'Creator', desc: 'Who created it? What was their background and perspective?' },
                  { letter: 'C', term: 'Content', desc: 'What does it say? What information does it provide?' },
                  { letter: 'C', term: 'Credibility', desc: 'Is it reliable? Can it be verified with other sources?' },
                  { letter: 'C', term: 'Corroboration', desc: 'Do other sources support or contradict this information?' }
                ].map((item, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
                      {item.letter}
                    </div>
                    <strong className="text-orange-900 dark:text-orange-300 block mb-1">{item.term}</strong>
                    <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Oral History */}
            <div className="p-6 border border-amber-200 dark:border-amber-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 text-base mb-3 flex items-center gap-2">
                <span>🎤</span> Oral History: A Special Category
              </h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-4">
                <strong>Oral history</strong> consists of spoken memories and testimonies passed down through generations or recorded interviews with witnesses of historical events.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <strong className="text-green-900 dark:text-green-300">Strengths:</strong>
                  <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <li>• Captures personal experiences</li>
                    <li>• Preserves voices of marginalized groups</li>
                    <li>• Provides emotional context</li>
                    <li>• Fills gaps in written records</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <strong className="text-red-900 dark:text-red-300">Limitations:</strong>
                  <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <li>• Memory can be unreliable</li>
                    <li>• May contain bias or exaggeration</li>
                    <li>• Can change over time</li>
                    <li>• Needs corroboration with other sources</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.2 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Sources of History</h4>
                <ExerciseQuestion 
                  question="A historian is studying World War II and finds Anne Frank's diary. What type of source is this?"
                  options={[
                    'Secondary source because it was published after the war',
                    'Primary source because it was written during the historical period being studied',
                    'Neither primary nor secondary',
                    'Both primary and secondary source'
                  ]}
                  correctAnswer={1}
                  explanation="Anne Frank's diary is a primary source because it was written during World War II by someone who directly experienced the events. Primary sources are first-hand accounts created at the time of the event or by people who participated in or witnessed the events. The fact that it was published later doesn't change its classification as a primary source."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.3: Historiography */}
        <section id="subtopic-1.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-amber-600 pl-2 md:pl-4">
            1.3. Historiography
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Historiography</strong> is the study of how history has been written and the methods historians use to research and interpret the past. It examines the changing interpretations of historical events over time and the different approaches historians take in their work.
            </p>

            {/* Definition Card */}
            <div className="p-6 border-2 border-amber-300 dark:border-amber-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-3">
                📖 Understanding Historiography
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-xl">
                  <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2">What it Studies:</h4>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• How historical narratives are constructed</li>
                    <li>• Methods of historical research</li>
                    <li>• Different interpretations of events</li>
                    <li>• Bias and perspective in history writing</li>
                    <li>• Evolution of historical thought</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
                  <h4 className="font-bold text-orange-900 dark:text-orange-300 mb-2">Why it Matters:</h4>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Reveals multiple perspectives</li>
                    <li>• Shows history is interpretive</li>
                    <li>• Helps identify bias</li>
                    <li>• Improves critical thinking</li>
                    <li>• Encourages questioning</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Historical Methods */}
            <div className="p-6 border-2 border-blue-300 dark:border-blue-800 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 text-base mb-4 flex items-center gap-2">
                <span>🔬</span> Historical Research Methods
              </h4>
              
              <div className="space-y-3">
                {[
                  {
                    step: '1',
                    title: 'Identify Topic',
                    desc: 'Choose a specific historical question or problem to investigate',
                    icon: '🎯'
                  },
                  {
                    step: '2',
                    title: 'Gather Sources',
                    desc: 'Collect primary and secondary sources related to the topic',
                    icon: '📚'
                  },
                  {
                    step: '3',
                    title: 'Source Criticism',
                    desc: 'Evaluate authenticity, reliability, and bias of sources',
                    icon: '🔍'
                  },
                  {
                    step: '4',
                    title: 'Analyze Evidence',
                    desc: 'Examine sources to extract relevant information and patterns',
                    icon: '⚗️'
                  },
                  {
                    step: '5',
                    title: 'Interpret & Synthesize',
                    desc: 'Develop interpretations and connect evidence to form conclusions',
                    icon: '🧩'
                  },
                  {
                    step: '6',
                    title: 'Write & Present',
                    desc: 'Construct narrative with evidence-based arguments',
                    icon: '✍️'
                  }
                ].map((method, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {method.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{method.icon}</span>
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm">{method.title}</h5>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{method.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schools of Historical Thought */}
            <div className="p-6 border border-purple-200 dark:border-purple-900 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 text-base mb-4">🏛️ Major Schools of Historical Thought</h4>
              
              <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <strong className="text-purple-900 dark:text-purple-300">Political History</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Focuses on governments, leaders, laws, and political events</p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <strong className="text-blue-900 dark:text-blue-300">Social History</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Studies ordinary people, daily life, customs, and social structures</p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <strong className="text-green-900 dark:text-green-300">Economic History</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Examines trade, production, wealth, and economic systems</p>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <strong className="text-orange-900 dark:text-orange-300">Cultural History</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Analyzes beliefs, arts, traditions, and intellectual movements</p>
                </div>
                
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <strong className="text-pink-900 dark:text-pink-300">Gender History</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Studies roles, experiences, and relations of different genders</p>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                  <strong className="text-teal-900 dark:text-teal-300">Environmental History</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Explores human-environment interactions over time</p>
                </div>
              </div>
            </div>

            {/* Objectivity vs Subjectivity */}
            <div className="p-6 border-2 border-amber-300 dark:border-amber-800 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 text-base mb-4">⚖️ The Challenge: Objectivity vs. Subjectivity</h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-4">
                Historians strive for objectivity, but complete objectivity is impossible because:
              </p>
              <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <strong className="text-amber-900 dark:text-amber-300">Source Selection</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Historians choose which sources to use</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <strong className="text-amber-900 dark:text-amber-300">Interpretation</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Different people interpret evidence differently</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <strong className="text-amber-900 dark:text-amber-300">Context</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Historians' own time and culture influence their views</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.3 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Historiography</h4>
                <ExerciseQuestion 
                  question="Two historians write about the same battle but reach different conclusions about who was responsible. This demonstrates that:"
                  options={[
                    'One historian must be lying',
                    'History is completely unreliable',
                    'Historical interpretation can vary based on perspective and evidence emphasis',
                    'Only one historian can be correct'
                  ]}
                  correctAnswer={2}
                  explanation="Different historical interpretations of the same event are normal and demonstrate that historiography involves analysis and interpretation. Historians may emphasize different sources, consider different contexts, or approach questions from various perspectives. This doesn't mean history is unreliable—it means historical understanding evolves through ongoing research and debate."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.4: Periodization of History */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-amber-600 pl-2 md:pl-4">
            1.4. Periodization of History
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Periodization</strong> is the process of dividing history into distinct periods or eras to make it easier to study and understand. These divisions help organize the vast span of human history into manageable segments based on significant changes in society, culture, politics, or technology.
            </p>

            {/* Traditional Western Periodization */}
            <div className="p-6 border-2 border-amber-300 dark:border-amber-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-4 text-center">
                ⏳ Traditional Periodization of World History
              </h3>
              
              <div className="space-y-3">
                {[
                  {
                    period: 'Ancient History',
                    timeframe: 'c. 3000 BCE - 500 CE',
                    color: 'blue',
                    features: ['Rise of first civilizations', 'Development of writing', 'Ancient empires (Egypt, Rome, Greece)', 'Classical philosophies and religions'],
                    icon: '🏛️'
                  },
                  {
                    period: 'Medieval Period',
                    timeframe: 'c. 500 CE - 1500 CE',
                    color: 'purple',
                    features: ['Feudalism in Europe', 'Rise and spread of Islam', 'Byzantine Empire', 'Trade routes (Silk Road)'],
                    icon: '⚔️'
                  },
                  {
                    period: 'Early Modern Period',
                    timeframe: 'c. 1500 CE - 1800 CE',
                    color: 'green',
                    features: ['Renaissance and Reformation', 'Age of Exploration', 'Scientific Revolution', 'Colonialism begins'],
                    icon: '🌍'
                  },
                  {
                    period: 'Modern Period',
                    timeframe: 'c. 1800 CE - 1945 CE',
                    color: 'orange',
                    features: ['Industrial Revolution', 'Nationalism and independence movements', 'World Wars', 'Technological advances'],
                    icon: '🏭'
                  },
                  {
                    period: 'Contemporary Period',
                    timeframe: 'c. 1945 CE - Present',
                    color: 'red',
                    features: ['Cold War era', 'Decolonization', 'Globalization', 'Digital revolution'],
                    icon: '💻'
                  }
                ].map((era, i) => (
                  <div key={i} className={`p-5 bg-${era.color}-50 dark:bg-${era.color}-900/20 rounded-xl border-2 border-${era.color}-300 dark:border-${era.color}-800`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{era.icon}</span>
                        <div>
                          <h4 className={`font-bold text-${era.color}-900 dark:text-${era.color}-300 text-base`}>{era.period}</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{era.timeframe}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                      <strong className="text-xs text-slate-700 dark:text-slate-300">Key Features:</strong>
                      <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        {era.features.map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Periodizations */}
            <div className="p-6 border border-teal-200 dark:border-teal-900 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
              <h4 className="font-bold text-teal-900 dark:text-teal-300 text-base mb-4">🌏 Different Cultural Periodizations</h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-4">
                Different cultures have their own ways of dividing history based on their unique experiences:
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-xs md:text-sm">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <strong className="text-teal-900 dark:text-teal-300">Chinese History</strong>
                  <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Organized by dynasties</li>
                    <li>• Han, Tang, Ming, Qing, etc.</li>
                    <li>• Based on ruling families</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <strong className="text-cyan-900 dark:text-cyan-300">Islamic History</strong>
                  <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Based on Hijri calendar</li>
                    <li>• Caliphate periods</li>
                    <li>• From Prophet Muhammad's era</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <strong className="text-blue-900 dark:text-blue-300">African History</strong>
                  <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Pre-colonial period</li>
                    <li>• Colonial period</li>
                    <li>• Post-independence era</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Limitations of Periodization */}
            <div className="p-6 border-2 border-red-300 dark:border-red-800 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
              <h4 className="font-bold text-red-900 dark:text-red-300 text-base mb-4 flex items-center gap-2">
                <span>⚠️</span> Limitations and Critiques of Periodization
              </h4>
              <div className="space-y-3 text-xs md:text-sm">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <strong className="text-red-900 dark:text-red-300">Oversimplification</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Complex changes don't happen at exact dates; transitions are gradual</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <strong className="text-red-900 dark:text-red-300">Euro-centric Bias</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Traditional periods based on European history don't fit all cultures</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <strong className="text-red-900 dark:text-red-300">Artificial Boundaries</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Creates false divisions; history is continuous, not divided into neat boxes</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.4 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Periodization</h4>
                <ExerciseQuestion 
                  question="Why is periodization useful for studying history, despite its limitations?"
                  options={[
                    'It provides exact dates for all historical events',
                    'It helps organize and make sense of vast amounts of historical information',
                    'It proves that history happens in clear stages',
                    'It shows that all cultures develop the same way'
                  ]}
                  correctAnswer={1}
                  explanation="Periodization is useful because it helps organize the enormous span of human history into manageable segments, making it easier to study, teach, and understand patterns and changes over time. While it has limitations (oversimplification, cultural bias), it remains a practical tool for historical analysis. It doesn't claim to provide exact boundaries or universal development patterns."
                />
              </div>
            </div>
          </div>
        </section>


        {/* SUBTOPIC 1.5: Importance of Studying History */}
        <section id="subtopic-1.5" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-amber-600 pl-2 md:pl-4">
            1.5. Importance of Studying History
          </h2>

          <div className="space-y-4 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Studying history is essential for understanding ourselves, our societies, and our world. It provides valuable lessons, develops critical skills, and helps us make informed decisions about the present and future.
            </p>

            {/* Famous Quote */}
            <div className="p-6 border-l-4 border-amber-600 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-r-2xl">
              <p className="text-base md:text-xl font-serif italic text-slate-800 dark:text-slate-200 mb-2">
                "Those who cannot remember the past are condemned to repeat it."
              </p>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">— George Santayana, philosopher</p>
            </div>

            {/* Key Reasons to Study History */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-blue-300 dark:border-blue-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">🧠</span>
                  <div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-300 text-base">Understanding the Present</h4>
                  </div>
                </div>
                <ul className="text-xs md:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Current events have historical roots</li>
                  <li>• Understand how institutions developed</li>
                  <li>• Recognize patterns and trends</li>
                  <li>• Comprehend cultural traditions</li>
                  <li>• Explain modern political systems</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-300 dark:border-green-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">💡</span>
                  <div>
                    <h4 className="font-bold text-green-900 dark:text-green-300 text-base">Learning from the Past</h4>
                  </div>
                </div>
                <ul className="text-xs md:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Avoid repeating past mistakes</li>
                  <li>• Apply successful strategies</li>
                  <li>• Understand consequences of actions</li>
                  <li>• Learn from triumphs and failures</li>
                  <li>• Make better informed decisions</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-300 dark:border-purple-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 text-base">Developing Critical Skills</h4>
                  </div>
                </div>
                <ul className="text-xs md:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Analytical thinking</li>
                  <li>• Evaluating evidence</li>
                  <li>• Identifying bias and perspective</li>
                  <li>• Research and investigation</li>
                  <li>• Communication and writing</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border-2 border-orange-300 dark:border-orange-800">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <h4 className="font-bold text-orange-900 dark:text-orange-300 text-base">Building Identity & Empathy</h4>
                  </div>
                </div>
                <ul className="text-xs md:text-sm space-y-2 text-slate-700 dark:text-slate-300">
                  <li>• Understand cultural heritage</li>
                  <li>• Develop national identity</li>
                  <li>• Appreciate diversity</li>
                  <li>• Empathize with different perspectives</li>
                  <li>• Foster tolerance and understanding</li>
                </ul>
              </div>
            </div>

            {/* Practical Benefits */}
            <div className="p-6 border-2 border-teal-300 dark:border-teal-800 rounded-2xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-teal-700 dark:text-teal-400 text-base mb-4 flex items-center gap-2">
                <span>💼</span> Practical Benefits of Studying History
              </h4>
              
              <div className="grid md:grid-cols-3 gap-4 text-xs md:text-sm">
                <div className="text-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                  <div className="text-3xl mb-2">📝</div>
                  <strong className="text-teal-900 dark:text-teal-300 block mb-2">Career Skills</strong>
                  <p className="text-slate-600 dark:text-slate-400">Research, writing, analysis valued in many professions</p>
                </div>
                
                <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <div className="text-3xl mb-2">🗣️</div>
                  <strong className="text-cyan-900 dark:text-cyan-300 block mb-2">Informed Citizenship</strong>
                  <p className="text-slate-600 dark:text-slate-400">Make educated decisions in democracy</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl mb-2">🌐</div>
                  <strong className="text-blue-900 dark:text-blue-300 block mb-2">Global Awareness</strong>
                  <p className="text-slate-600 dark:text-slate-400">Understand international relations and cultures</p>
                </div>
              </div>
            </div>

            {/* History in Modern Professions */}
            <div className="p-6 border border-amber-200 dark:border-amber-900 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 text-base mb-4">🎯 Where History Skills Are Used</h4>
              
              <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
                <div>
                  <strong className="text-amber-900 dark:text-amber-300">Direct Careers:</strong>
                  <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Teacher/Professor</li>
                    <li>• Museum Curator</li>
                    <li>• Archivist</li>
                    <li>• Archaeologist</li>
                    <li>• Historical Consultant</li>
                  </ul>
                </div>
                
                <div>
                  <strong className="text-orange-900 dark:text-orange-300">Transferable Skills Apply To:</strong>
                  <ul className="mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>• Law and legal professions</li>
                    <li>• Journalism and media</li>
                    <li>• Government and public service</li>
                    <li>• Business and management</li>
                    <li>• International relations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Historical Consciousness */}
            <div className="p-6 border-2 border-purple-300 dark:border-purple-800 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 text-base mb-4">🌟 Developing Historical Consciousness</h4>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-4">
                <strong>Historical consciousness</strong> is the awareness that we live in a specific time and place, shaped by the past and affecting the future. It involves:
              </p>
              <div className="grid md:grid-cols-4 gap-3 text-xs">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">⏮️</div>
                  <strong className="text-purple-900 dark:text-purple-300">Temporal Awareness</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Understanding change over time</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🔗</div>
                  <strong className="text-indigo-900 dark:text-indigo-300">Causation</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Recognizing cause-effect relationships</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">👁️</div>
                  <strong className="text-blue-900 dark:text-blue-300">Perspective</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Seeing multiple viewpoints</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">⚖️</div>
                  <strong className="text-violet-900 dark:text-violet-300">Judgment</strong>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Making informed assessments</p>
                </div>
              </div>
            </div>

            {/* Practice Exercise for 1.5 */}
            <div className="mt-8 space-y-6">
              <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">✏️ Quick Quiz: Importance of History</h4>
                <ExerciseQuestion 
                  question="A government is debating a new policy. Understanding similar policies from the past would be valuable because:"
                  options={[
                    'History always repeats itself exactly',
                    'Past experiences can provide insights about potential outcomes and consequences',
                    'Historical knowledge is only useful for historians',
                    'Modern situations are completely different from the past'
                  ]}
                  correctAnswer={1}
                  explanation="Studying historical examples of similar policies helps decision-makers understand potential outcomes, unintended consequences, and factors that led to success or failure. While history doesn't repeat exactly (each situation is unique), patterns and lessons from the past provide valuable insights for present decision-making. This is one of the most practical applications of historical knowledge."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-end pt-8">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter2');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium"
          >
            Next: Chapter 2
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter1;
