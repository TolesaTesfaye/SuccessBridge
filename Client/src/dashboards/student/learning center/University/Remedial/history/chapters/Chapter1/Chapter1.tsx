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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Chapter 1 • Introduction
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          INTRODUCTION TO HISTORY
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-amber-600 to-yellow-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Journey through time! History is the study of human past - how we lived, what we built, and the lessons we learned. 
          Understanding history helps us make sense of the present and shape a better future.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">
        
        {/* Why History Matters Box */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-l-4 border-amber-600 p-3 md:p-6 rounded-r-lg">
          <h3 className="text-sm md:text-xl font-bold text-amber-900 dark:text-amber-100 mb-2 md:mb-3 flex items-center gap-2">
            <span className="text-lg md:text-2xl">⏳</span>
            Why History Is Essential
          </h3>
          <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
            <p>
              <strong>Real Talk:</strong> History isn't just memorizing dates and names! It's about understanding patterns, learning from mistakes, 
              and seeing how past decisions shape our world today. Every modern problem has historical roots!
            </p>
            <p className="text-xs md:text-sm text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 p-2 rounded">
              💡 <strong>Mind-Blowing Fact:</strong> The phrase "history repeats itself" is scientifically supported! 
              Historians have identified cyclical patterns in empires, economies, and even fashion trends spanning thousands of years!
            </p>
          </div>
        </div>

        {/* SUBTOPIC 1.1: Definition and Uses of History */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-amber-600 pl-2 md:pl-4">
            1.1. Definition and Uses of History
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            {/* Key Concepts Box */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-l-4 border-amber-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-amber-900 dark:text-amber-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🔑</span>
                Key Concepts
              </h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li><strong>History:</strong> The study of past events, particularly human affairs and societies</li>
                <li><strong>Etymology:</strong> From Greek "historia" (ἱστορία) = "inquiry" or "knowledge acquired by investigation"</li>
                <li><strong>Chronology:</strong> The arrangement of events in the order they occurred</li>
                <li><strong>Primary Source:</strong> Original documents from the time period being studied</li>
                <li><strong>Secondary Source:</strong> Analysis or interpretation of primary sources by later historians</li>
              </ul>
            </div>

            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-amber-600 dark:text-amber-400">History</strong> is the systematic study and documentation of human past. 
              It's more than just facts - it's about understanding <em>why</em> things happened, <em>how</em> they happened, 
              and <em>what</em> we can learn from them.
            </p>

            {/* Etymology Box */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-blue-900 dark:text-blue-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">📖</span>
                The Word "History"
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">Etymology (Word Origin):</p>
                  <div className="space-y-1 text-xs md:text-sm">
                    <p>• <strong className="text-blue-600">Historia</strong> (Greek: ἱστορία) = inquiry, knowledge from investigation</p>
                    <p>• First used by <strong>Herodotus</strong> (484-425 BC), called "Father of History"</p>
                    <p>• Originally meant "inquiry" or "finding out"</p>
                    <p className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <strong>History = Systematic investigation of the past</strong>
                    </p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  💡 <strong>Fun Fact:</strong> Herodotus wrote "The Histories" around 440 BC, documenting the Greco-Persian Wars. 
                  He traveled extensively to interview eyewitnesses - the first true historical investigation!
                </p>
              </div>
            </div>

            {/* The Importance of History */}
            <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-3xl">🌟</span>
                The Importance of History
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="p-2 md:p-3 bg-amber-50 dark:bg-amber-900/20 rounded">
                  <p className="font-bold text-amber-600 dark:text-amber-400">1. Understanding the Present 🔍</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    Current political systems, borders, conflicts, and cultures all have historical origins. You can't understand today without knowing yesterday.
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="font-bold text-green-600 dark:text-green-400">2. Learning from Mistakes 📚</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    Wars, economic crashes, and social injustices teach us what NOT to do. Those who ignore history are doomed to repeat it.
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="font-bold text-blue-600 dark:text-blue-400">3. Building Identity 🏛️</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    National pride, cultural traditions, and personal heritage all come from understanding our collective past.
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">4. Developing Critical Thinking 🧠</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    Analyzing sources, questioning narratives, and understanding bias - history teaches you to think critically about information.
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-pink-50 dark:bg-pink-900/20 rounded">
                  <p className="font-bold text-pink-600 dark:text-pink-400">5. Predicting the Future 🔮</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    Historical patterns help us anticipate future trends. Economists, politicians, and strategists all use historical data for planning.
                  </p>
                </div>
                <div className="p-2 md:p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
                  <p className="font-bold text-orange-600 dark:text-orange-400">6. Appreciating Human Achievement 🏆</p>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                    From the pyramids to the moon landing, history celebrates human ingenuity, courage, and perseverance.
                  </p>
                </div>
              </div>
            </div>

            {/* Real World Example */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-green-900 dark:text-green-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-xl md:text-3xl">💡</span>
                Real-World Example: Learning from the 1918 Spanish Flu
              </h3>
              <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Historical Event:</strong> The 1918 Spanish Flu pandemic killed 50-100 million people worldwide.
                </p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded">
                  <p className="font-bold mb-2">How history helped during COVID-19:</p>
                  <div className="space-y-2 text-xs md:text-sm">
                    <p><strong className="text-green-600">✓ Lesson 1:</strong> Cities that enforced early lockdowns (like St. Louis in 1918) had fewer deaths. 
                    This informed COVID-19 lockdown policies.</p>
                    <p><strong className="text-green-600">✓ Lesson 2:</strong> Anti-mask protests happened in 1918 too! Understanding this historical resistance 
                    helped governments communicate better in 2020.</p>
                    <p><strong className="text-green-600">✓ Lesson 3:</strong> The 1918 pandemic had a "second wave" that was deadlier. 
                    This warned us to stay vigilant even after initial improvements.</p>
                    <p><strong className="text-green-600">✓ Lesson 4:</strong> Economic recovery took years after 1918. 
                    This helped plan long-term COVID recovery strategies.</p>
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-green-700 dark:text-green-300">
                    💡 Without studying the 1918 pandemic, COVID-19 response would have been much worse. History literally saved millions of lives!
                  </p>
                </div>
              </div>
            </div>

            {/* Practical Uses */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-500 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-purple-900 dark:text-purple-100 mb-2 md:mb-3">
                💼 Practical Uses of History in Different Fields
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-base">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Law & Politics</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Understanding legal precedents and constitutional history</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Business & Economics</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Analyzing market trends and economic cycles</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Medicine & Public Health</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Tracking disease patterns and treatment evolution</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Urban Planning</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Learning from past city design successes and failures</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">International Relations</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Understanding diplomatic history and alliances</p>
                </div>
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Environmental Science</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Studying past climate changes and human impacts</p>
                </div>
              </div>
            </div>

            {/* Famous Quote */}
            <div className="p-3 md:p-6 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border-l-4 border-slate-400 rounded-r-lg">
              <blockquote className="text-sm md:text-xl italic text-slate-700 dark:text-slate-300">
                "Those who cannot remember the past are condemned to repeat it."
              </blockquote>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2">
                - George Santayana, Spanish-American philosopher (1905)
              </p>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="What does the word 'History' originally mean in Greek?"
              options={[
                'Story telling',
                'Inquiry or investigation',
                'Ancient times',
                'War records'
              ]}
              correctAnswer={1}
              explanation="'Historia' in Greek means 'inquiry' or 'knowledge acquired by investigation'. It was first used by Herodotus to describe his systematic investigation of past events."
            />

            <ExerciseQuestion
              question="Who is called the 'Father of History'?"
              options={[
                'Aristotle',
                'Plato',
                'Herodotus',
                'Thucydides'
              ]}
              correctAnswer={2}
              explanation="Herodotus (484-425 BC) is called the 'Father of History' because he was the first to systematically collect, investigate, and write about historical events in his work 'The Histories'."
            />

            <ExerciseQuestion
              question="Which is NOT a reason why history is important?"
              options={[
                'Understanding the present',
                'Learning from past mistakes',
                'Memorizing dates for exams',
                'Developing critical thinking'
              ]}
              correctAnswer={2}
              explanation="While dates are part of history, memorizing them for exams is NOT the real importance of history. History is valuable for understanding the present, learning from mistakes, and developing critical thinking skills."
            />

            <ExerciseQuestion
              question="The 1918 Spanish Flu helped inform which modern response?"
              options={[
                'Space exploration',
                'COVID-19 pandemic response',
                'Climate change policy',
                'Internet regulation'
              ]}
              correctAnswer={1}
              explanation="Historical analysis of the 1918 Spanish Flu pandemic directly informed COVID-19 response strategies, including lockdown policies, mask mandates, and understanding second waves."
            />
          </div>
        </section>

        {/* SUBTOPIC 1.2: Historiography and Historical Interpretations */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-amber-600 pl-2 md:pl-4">
            1.2. Historiography and Historical Interpretations
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-amber-600 dark:text-amber-400">Historiography</strong> is the study of how history is written and interpreted. 
              Different historians may tell the same story differently based on their perspective, available sources, and the time period in which they're writing.
            </p>

            {/* Key Concepts */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-l-4 border-amber-600 p-3 md:p-6 rounded-r-lg">
              <h3 className="text-sm md:text-xl font-bold text-amber-900 dark:text-amber-100 mb-2 md:mb-3 flex items-center gap-2">
                <span className="text-lg md:text-2xl">🔑</span>
                Key Concepts
              </h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li><strong>Historiography:</strong> The study of methods historians use and how historical writing changes over time</li>
                <li><strong>Historical Bias:</strong> The influence of a historian's perspective, culture, or time period on their interpretation</li>
                <li><strong>Revisionism:</strong> Reinterpreting history based on new evidence or changing perspectives</li>
                <li><strong>Objectivity vs Subjectivity:</strong> The challenge of being fair vs personal interpretation</li>
              </ul>
            </div>

            {/* Subsection 1.2.1: Sources of History */}
            <div className="space-y-3 md:space-y-6 mb-8">
              <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white">
                1.2.1. Sources of History
              </h3>

              {/* Primary vs Secondary Sources */}
              <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                  📚 Types of Historical Sources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-2 border-blue-300 dark:border-blue-700">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2 text-sm md:text-base flex items-center gap-2">
                      <span className="text-xl">📜</span> Primary Sources
                    </h4>
                    <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                      <strong>Definition:</strong> Original materials from the time period
                    </p>
                    <div className="space-y-1 text-xs md:text-sm">
                      <p><strong>Examples:</strong></p>
                      <ul className="list-disc list-inside ml-2 space-y-0.5">
                        <li>Letters, diaries, speeches</li>
                        <li>Photographs, artifacts, coins</li>
                        <li>Government documents, treaties</li>
                        <li>Newspapers from that era</li>
                        <li>Archaeological remains</li>
                        <li>Eyewitness accounts</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-300 dark:border-green-700">
                    <h4 className="font-bold text-green-700 dark:text-green-300 mb-2 text-sm md:text-base flex items-center gap-2">
                      <span className="text-xl">📖</span> Secondary Sources
                    </h4>
                    <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-2">
                      <strong>Definition:</strong> Analysis written after the events
                    </p>
                    <div className="space-y-1 text-xs md:text-sm">
                      <p><strong>Examples:</strong></p>
                      <ul className="list-disc list-inside ml-2 space-y-0.5">
                        <li>History textbooks</li>
                        <li>Biographies</li>
                        <li>Documentary films</li>
                        <li>Academic journal articles</li>
                        <li>Encyclopedia entries</li>
                        <li>Historical analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Example */}
              <div className="p-3 md:p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-l-4 border-orange-500 rounded-r-lg">
                <h3 className="text-sm md:text-xl font-bold text-orange-900 dark:text-orange-100 mb-2 md:mb-3 flex items-center gap-2">
                  <span className="text-xl md:text-3xl">🔍</span>
                  Example: Studying World War II
                </h3>
                <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded">
                    <p className="font-bold text-blue-600 mb-2">Primary Sources:</p>
                    <ul className="list-disc list-inside ml-2 text-xs md:text-sm space-y-1">
                      <li>Anne Frank's diary (written during WWII)</li>
                      <li>Winston Churchill's speeches (given at the time)</li>
                      <li>Nazi Germany propaganda posters</li>
                      <li>Letters from soldiers to families</li>
                      <li>Photographs from D-Day invasion</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded">
                    <p className="font-bold text-green-600 mb-2">Secondary Sources:</p>
                    <ul className="list-disc list-inside ml-2 text-xs md:text-sm space-y-1">
                      <li>A 2020 documentary about WWII</li>
                      <li>Your history textbook's chapter on WWII</li>
                      <li>A biography of Hitler written in 1980</li>
                      <li>An academic paper analyzing the Holocaust</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Subsection 1.2.2: Dating in History */}
            <div className="space-y-3 md:space-y-6">
              <h3 className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white">
                1.2.2. Dating in History
              </h3>

              <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Historians use different systems to date events. Understanding these systems helps us place events in their proper chronological order.
              </p>

              {/* Dating Systems */}
              <div className="p-3 md:p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                  📅 Major Dating Systems
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="font-bold text-blue-600 dark:text-blue-400">BC / AD System (Traditional)</p>
                    <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                      <p>• <strong>BC</strong> = Before Christ (before year 1)</p>
                      <p>• <strong>AD</strong> = Anno Domini (Latin: "In the year of our Lord") - after year 1</p>
                      <p className="mt-1 text-[10px] md:text-xs">Example: Julius Caesar died in 44 BC</p>
                    </div>
                  </div>
                  <div className="p-2 md:p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <p className="font-bold text-green-600 dark:text-green-400">BCE / CE System (Modern/Academic)</p>
                    <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                      <p>• <strong>BCE</strong> = Before Common Era (same as BC)</p>
                      <p>• <strong>CE</strong> = Common Era (same as AD)</p>
                      <p className="mt-1 text-[10px] md:text-xs">This system is more religiously neutral and widely used in academics</p>
                    </div>
                  </div>
                  <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <p className="font-bold text-purple-600 dark:text-purple-400">Other Dating Methods</p>
                    <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-1">
                      <p>• <strong>Carbon-14 Dating:</strong> For organic materials up to 50,000 years old</p>
                      <p>• <strong>Dendrochronology:</strong> Tree ring dating</p>
                      <p>• <strong>Stratigraphy:</strong> Dating by archaeological layers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practice Tip */}
              <div className="p-3 md:p-6 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-l-4 border-pink-500 rounded-r-lg">
                <h3 className="text-sm md:text-xl font-bold text-pink-900 dark:text-pink-100 mb-2 md:mb-3">
                  💡 Pro Tip: Understanding BC/BCE Years
                </h3>
                <div className="space-y-2 text-xs md:text-base text-slate-700 dark:text-slate-300">
                  <p className="font-bold">BC/BCE years count BACKWARDS:</p>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded font-mono text-xs md:text-sm">
                    <p>500 BC → 400 BC → 300 BC → 200 BC → 100 BC → 1 BC → 1 AD → 100 AD → 200 AD</p>
                    <p className="mt-2 text-pink-600 font-bold">OLDER ←------------------------→ NEWER</p>
                  </div>
                  <p className="text-xs md:text-sm">
                    <strong>Remember:</strong> The HIGHER the BC number, the OLDER the event!<br/>
                    500 BC is OLDER than 100 BC
                  </p>
                </div>
              </div>
            </div>

            {/* Practice Exercises */}
            <ExerciseQuestion
              question="Which is a PRIMARY source for studying the American Civil War?"
              options={[
                'A 2023 documentary about the Civil War',
                'Your history textbook',
                'A letter written by a soldier in 1863',
                'A biography of Abraham Lincoln written in 1950'
              ]}
              correctAnswer={2}
              explanation="A letter written by a soldier in 1863 is a primary source because it was created during the actual time period of the Civil War. The others are secondary sources - they were created after the events by people analyzing them."
            />

            <ExerciseQuestion
              question="What does BCE stand for?"
              options={[
                'Before Christian Era',
                'Before Common Era',
                'Before Current Era',
                'British Calendar Era'
              ]}
              correctAnswer={1}
              explanation="BCE stands for 'Before Common Era'. It's the modern, religiously neutral term that corresponds to the traditional BC (Before Christ) dating system."
            />

            <ExerciseQuestion
              question="Which event happened FIRST?"
              options={[
                '100 BC',
                '500 BC',
                '50 AD',
                '200 BC'
              ]}
              correctAnswer={1}
              explanation="500 BC happened first because BC years count backwards. The timeline is: 500 BC → 200 BC → 100 BC → 1 BC/AD → 50 AD. The higher the BC number, the older it is!"
            />

            <ExerciseQuestion
              question="Historiography is the study of:"
              options={[
                'Ancient civilizations only',
                'How history is written and interpreted',
                'Geography and maps',
                'Archaeological digging techniques'
              ]}
              correctAnswer={1}
              explanation="Historiography is the study of how history is written, interpreted, and changes over time. It examines the methods historians use and how perspectives on history evolve."
            />
          </div>
        </section>

        {/* Chapter Summary */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 p-4 md:p-8 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold text-amber-900 dark:text-amber-100 mb-3 md:mb-4 flex items-center gap-2">
            <span className="text-xl md:text-3xl">🎯</span>
            Chapter 1 Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg">
              <h3 className="font-bold text-sm md:text-base text-amber-600 dark:text-amber-400 mb-2">✅ What You Learned:</h3>
              <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Definition of History (inquiry/investigation)</li>
                <li>• 6 reasons why history is important</li>
                <li>• Primary vs Secondary sources</li>
                <li>• BC/AD and BCE/CE dating systems</li>
                <li>• Historiography and interpretation</li>
                <li>• Real-world applications of history</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg">
              <h3 className="font-bold text-sm md:text-base text-yellow-600 dark:text-yellow-400 mb-2">🔑 Key Points:</h3>
              <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>• Herodotus = Father of History</li>
                <li>• Primary sources = from the time period</li>
                <li>• Secondary sources = analysis after</li>
                <li>• BC years count backwards (500 BC is older than 100 BC)</li>
                <li>• History helps us understand present and predict future</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Motivational Closing */}
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-800 dark:to-yellow-800 text-white p-4 md:p-8 rounded-lg text-center">
          <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">
            ⏳ You're Now a Time Traveler! ⏳
          </h3>
          <p className="text-xs md:text-lg">
            History is your passport to understanding civilizations, empires, and the human journey. Every chapter ahead will take you deeper into our shared past. 
            Get ready to explore! 🌍📚✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chapter1;
