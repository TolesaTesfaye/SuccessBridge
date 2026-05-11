import React, { useEffect } from 'react';
import { ExerciseQuestion } from '../../../components/ExerciseQuestion';

interface Chapter4Props {
  selectedSubtopic?: string;
  onNavigateChapter?: (chapterId: string) => void;
  currentChapterId?: string;
}

const Chapter4: React.FC<Chapter4Props> = ({ selectedSubtopic, onNavigateChapter }) => {
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
        <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-4">
          Chapter 4
        </span>
        <h1 className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-6 tracking-tight">
          MEMORY AND FORGETTING
        </h1>
        <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-purple-600 to-pink-600" />
        <p className="mt-3 md:mt-6 text-xs md:text-lg text-slate-600 dark:text-slate-400">
          Explore the fascinating world of memory—how we encode, store, and retrieve information, and why we sometimes forget. Understanding memory is key to improving learning and academic success.
        </p>
      </div>

      <div className="space-y-8 md:space-y-16 pb-10 md:pb-20 px-0 md:px-8">

        {/* SUBTOPIC 4.1: Definition and Nature of Memory */}
        <section id="subtopic-4.1" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4">
            4.1. Definition and Nature of Memory
          </h2>
          
          <div className="space-y-3 md:space-y-6">
            <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-purple-600 dark:text-purple-400">Memory</strong> is the <strong>process of encoding, storing, and retrieving information</strong> over time. 
              It's essential for learning, thinking, and functioning in daily life. Without memory, we couldn't learn from experience or maintain our sense of identity.
            </p>

            <div className="p-3 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-600">
              <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">The Information Processing Model</h3>
              <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-2 md:mb-4">
                Memory works like a computer, processing information through three stages:
              </p>
              <div className="grid md:grid-cols-3 gap-2 md:gap-4">
                <div className="p-2 md:p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <div className="text-2xl md:text-4xl mb-2">📥</div>
                  <p className="font-bold text-xs md:text-base text-purple-600 dark:text-purple-400 mb-1">Encoding</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Getting information IN</p>
                </div>
                <div className="p-2 md:p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <div className="text-2xl md:text-4xl mb-2">💾</div>
                  <p className="font-bold text-xs md:text-base text-purple-600 dark:text-purple-400 mb-1">Storage</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Keeping information</p>
                </div>
                <div className="p-2 md:p-4 bg-white dark:bg-slate-800 rounded-lg">
                  <div className="text-2xl md:text-4xl mb-2">📤</div>
                  <p className="font-bold text-xs md:text-base text-purple-600 dark:text-purple-400 mb-1">Retrieval</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">Getting information OUT</p>
                </div>
              </div>
            </div>

            <h3 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mt-4 md:mt-8 mb-2 md:mb-4">Three Memory Processes Explained</h3>
            
            <div className="space-y-2 md:space-y-4">
              <div className="p-3 md:p-6 border-l-4 border-blue-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">1. Encoding</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  <strong>Encoding</strong> is the process of transforming information into a form that can be stored in memory. 
                  It's like converting a document into a digital file format.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 md:p-3 rounded mb-2">
                  <p className="text-[10px] md:text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Types of Encoding:</p>
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-0.5">
                    <li><strong>Visual:</strong> Encoding images and visual information</li>
                    <li><strong>Acoustic:</strong> Encoding sounds, especially words</li>
                    <li><strong>Semantic:</strong> Encoding meaning and concepts (most effective)</li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-slate-900 dark:text-white mb-1">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                    When you meet someone new, you encode their face (visual), name (acoustic), and occupation (semantic).
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-purple-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">2. Storage</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  <strong>Storage</strong> is the process of maintaining information in memory over time. 
                  Information can be stored for seconds, minutes, or a lifetime depending on the type of memory.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 md:p-3 rounded mb-2">
                  <p className="text-[10px] md:text-sm font-semibold text-purple-900 dark:text-purple-300 mb-1">Storage Duration:</p>
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-0.5">
                    <li><strong>Sensory:</strong> Less than 1 second to a few seconds</li>
                    <li><strong>Short-term:</strong> 20-30 seconds without rehearsal</li>
                    <li><strong>Long-term:</strong> Minutes to a lifetime</li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-slate-900 dark:text-white mb-1">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                    Your childhood memories are stored in long-term memory, while a phone number you just heard is in short-term memory.
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-6 border-l-4 border-pink-600">
                <h4 className="font-bold text-xs md:text-lg text-slate-900 dark:text-white mb-1 md:mb-2">3. Retrieval</h4>
                <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                  <strong>Retrieval</strong> is the process of accessing and bringing stored information into conscious awareness. 
                  It's like searching for and opening a file on your computer.
                </p>
                <div className="bg-pink-50 dark:bg-pink-900/20 p-2 md:p-3 rounded mb-2">
                  <p className="text-[10px] md:text-sm font-semibold text-pink-900 dark:text-pink-300 mb-1">Types of Retrieval:</p>
                  <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-0.5">
                    <li><strong>Recall:</strong> Retrieving information without cues (essay questions)</li>
                    <li><strong>Recognition:</strong> Identifying previously learned information (multiple choice)</li>
                    <li><strong>Relearning:</strong> Learning information again more quickly than the first time</li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                  <p className="text-[10px] md:text-sm font-semibold text-slate-900 dark:text-white mb-1">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                    Recalling your friend's birthday (recall) vs. recognizing their face in a photo (recognition).
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Check Exercise */}
            <div className="mt-4 md:mt-8 p-3 md:p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600">
              <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🤔 Quick Check</h4>
              <ExerciseQuestion 
                question="You're taking a multiple-choice test and you recognize the correct answer when you see it, even though you couldn't recall it on your own. Which type of retrieval are you using?"
                options={[
                  'Recall',
                  'Recognition',
                  'Relearning',
                  'Encoding'
                ]}
                correctAnswer={1}
                explanation="This is RECOGNITION. Recognition involves identifying previously learned information when presented with it, which is easier than recall (retrieving information without cues). This is why multiple-choice tests are generally easier than essay tests—recognition requires less retrieval effort than recall. Encoding is about getting information into memory, not retrieving it."
              />
            </div>
          </div>

          {/* Exercise for Subtopic 4.1 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Memory Processes</h3>
            <ExerciseQuestion 
              question="A student reads a textbook chapter and tries to understand the main concepts by relating them to real-life examples. Which type of encoding is the student primarily using?"
              options={[
                'Visual encoding',
                'Acoustic encoding',
                'Semantic encoding',
                'Procedural encoding'
              ]}
              correctAnswer={2}
              explanation="This is SEMANTIC ENCODING. The student is encoding the meaning and concepts of the material by relating it to real-life examples. Semantic encoding is the deepest and most effective form of encoding because it involves processing information based on its meaning. Visual encoding would involve creating mental images, acoustic encoding would involve focusing on sounds or words, and procedural encoding relates to motor skills and procedures."
            />
          </div>
        </section>


        {/* SUBTOPIC 4.2: The Three-Store Model of Memory */}
        <section id="subtopic-4.2" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4">
            4.2. The Three-Store Model of Memory (Atkinson-Shiffrin Model)
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 md:mb-8">
            The <strong>Three-Store Model</strong> (also called the Multi-Store Model) proposes that memory consists of three separate storage systems, 
            each with different characteristics in terms of capacity, duration, and function.
          </p>

          {/* Visual Flow Diagram */}
          <div className="p-3 md:p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg mb-4 md:mb-8 border-2 border-slate-200 dark:border-slate-700">
            <h4 className="text-sm md:text-lg font-bold text-center text-slate-900 dark:text-white mb-3 md:mb-6">Information Flow Through Memory</h4>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <div className="flex-1 p-3 md:p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-center">
                <p className="text-xs md:text-sm font-bold text-blue-900 dark:text-blue-300">Sensory Memory</p>
                <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">1-3 seconds</p>
              </div>
              <span className="text-lg md:text-2xl text-slate-400">→</span>
              <div className="flex-1 p-3 md:p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-center border-2 border-purple-500">
                <p className="text-xs md:text-sm font-bold text-purple-900 dark:text-purple-300">Short-Term Memory</p>
                <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">20-30 seconds</p>
              </div>
              <span className="text-lg md:text-2xl text-slate-400">→</span>
              <div className="flex-1 p-3 md:p-4 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-center">
                <p className="text-xs md:text-sm font-bold text-pink-900 dark:text-pink-300">Long-Term Memory</p>
                <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Permanent</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-6">
            {/* Sensory Memory */}
            <div className="p-4 md:p-8 border-l-4 border-blue-600">
              <div className="flex items-start gap-2 md:gap-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg md:text-2xl">👁️</span>
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-blue-600 dark:text-blue-400 uppercase">Sensory Memory</h3>
                  <p className="text-xs md:text-base text-slate-600 dark:text-slate-400">The immediate, very brief recording of sensory information</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4">
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Duration</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Less than 1 second (visual) to 3-4 seconds (auditory)</p>
                </div>
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Capacity</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Very large—all sensory information</p>
                </div>
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Function</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Holds raw sensory data briefly</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-1">Types:</p>
                  <ul className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                    <li><strong>Iconic Memory:</strong> Visual sensory memory (lasts ~0.5 seconds)</li>
                    <li><strong>Echoic Memory:</strong> Auditory sensory memory (lasts ~3-4 seconds)</li>
                  </ul>
                </div>
                <div className="p-2 md:p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Example:</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                    When you wave a sparkler in the dark, you see a trail of light (iconic memory). 
                    When someone asks "What?" you can often recall what they said (echoic memory).
                  </p>
                </div>
              </div>
            </div>

            {/* Short-Term Memory */}
            <div className="p-4 md:p-8 border-l-4 border-purple-600">
              <div className="flex items-start gap-2 md:gap-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg md:text-2xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-purple-600 dark:text-purple-400 uppercase">Short-Term Memory (STM) / Working Memory</h3>
                  <p className="text-xs md:text-base text-slate-600 dark:text-slate-400">Activated memory that holds information briefly before it's stored or forgotten</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4">
                <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-purple-900 dark:text-purple-300 mb-1">Duration</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">20-30 seconds without rehearsal</p>
                </div>
                <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-purple-900 dark:text-purple-300 mb-1">Capacity</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">7 ± 2 items (Miller's Magic Number)</p>
                </div>
                <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-purple-900 dark:text-purple-300 mb-1">Function</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Active processing and manipulation</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-1">Strategies to Maintain Information:</p>
                  <ul className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                    <li><strong>Maintenance Rehearsal:</strong> Repeating information over and over</li>
                    <li><strong>Chunking:</strong> Grouping information into meaningful units</li>
                    <li><strong>Elaborative Rehearsal:</strong> Connecting new info to existing knowledge</li>
                  </ul>
                </div>
                <div className="p-2 md:p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Examples:</p>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                    • Remembering a phone number long enough to dial it<br/>
                    • Holding a conversation (keeping track of what was just said)<br/>
                    • Mental arithmetic (holding numbers while calculating)
                  </p>
                </div>
              </div>
            </div>

            {/* Long-Term Memory */}
            <div className="p-4 md:p-8 border-l-4 border-pink-600">
              <div className="flex items-start gap-2 md:gap-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg md:text-2xl">💾</span>
                </div>
                <div>
                  <h3 className="text-sm md:text-2xl font-black text-pink-600 dark:text-pink-400 uppercase">Long-Term Memory (LTM)</h3>
                  <p className="text-xs md:text-base text-slate-600 dark:text-slate-400">Relatively permanent and limitless storehouse of memory</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4">
                <div className="p-2 md:p-3 bg-pink-50 dark:bg-pink-900/20 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-pink-900 dark:text-pink-300 mb-1">Duration</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Potentially permanent (lifetime)</p>
                </div>
                <div className="p-2 md:p-3 bg-pink-50 dark:bg-pink-900/20 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-pink-900 dark:text-pink-300 mb-1">Capacity</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Unlimited</p>
                </div>
                <div className="p-2 md:p-3 bg-pink-50 dark:bg-pink-900/20 rounded">
                  <p className="text-[10px] md:text-sm font-bold text-pink-900 dark:text-pink-300 mb-1">Function</p>
                  <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">Permanent storage of knowledge</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded">
                  <p className="text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-2">Types of Long-Term Memory:</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded">
                      <p className="text-[10px] md:text-sm font-bold text-pink-900 dark:text-pink-300 mb-1">Explicit (Declarative)</p>
                      <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 mb-1">Conscious memories you can declare</p>
                      <ul className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
                        <li><strong>Episodic:</strong> Personal experiences (your 10th birthday)</li>
                        <li><strong>Semantic:</strong> Facts and knowledge (Paris is in France)</li>
                      </ul>
                    </div>
                    <div className="p-2 bg-pink-50 dark:bg-pink-900/20 rounded">
                      <p className="text-[10px] md:text-sm font-bold text-pink-900 dark:text-pink-300 mb-1">Implicit (Non-declarative)</p>
                      <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 mb-1">Unconscious memories</p>
                      <ul className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
                        <li><strong>Procedural:</strong> Skills and habits (riding a bike)</li>
                        <li><strong>Conditioning:</strong> Learned associations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mid-Section Exercise */}
          <div className="mt-4 md:mt-8 p-3 md:p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600">
            <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🎯 Apply Your Knowledge</h4>
            <ExerciseQuestion 
              question="You're trying to remember a phone number someone just told you. You repeat it over and over in your head until you can write it down. Which memory store are you primarily using, and what strategy are you employing?"
              options={[
                'Sensory memory; chunking',
                'Short-term memory; maintenance rehearsal',
                'Long-term memory; elaborative rehearsal',
                'Working memory; semantic encoding'
              ]}
              correctAnswer={1}
              explanation="You're using SHORT-TERM MEMORY with MAINTENANCE REHEARSAL. The phone number is in your short-term memory (which lasts 20-30 seconds), and you're using maintenance rehearsal (repeating it over and over) to keep it active until you can write it down. Sensory memory only lasts a few seconds, and the information hasn't been transferred to long-term memory yet. Chunking would involve grouping the digits, and elaborative rehearsal would involve connecting the number to existing knowledge."
            />
          </div>

          {/* Exercise for Subtopic 4.2 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-purple-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Three-Store Model</h3>
            <ExerciseQuestion 
              question="You can ride a bicycle without consciously thinking about how to balance or pedal. This is an example of which type of long-term memory?"
              options={[
                'Episodic memory',
                'Semantic memory',
                'Procedural memory',
                'Sensory memory'
              ]}
              correctAnswer={2}
              explanation="This is PROCEDURAL MEMORY, a type of implicit (non-declarative) long-term memory. Procedural memory stores information about how to perform skills and procedures, like riding a bike, typing, or playing an instrument. These memories are unconscious—you don't have to consciously think about each step. Episodic memory stores personal experiences, semantic memory stores facts and knowledge, and sensory memory is the brief initial recording of sensory information."
            />
          </div>
        </section>


        {/* SUBTOPIC 4.3: Forgetting and Its Causes */}
        <section id="subtopic-4.3" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4">
            4.3. Forgetting and Its Causes
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 md:mb-8">
            <strong>Forgetting</strong> is the inability to retrieve information that was previously stored in memory. 
            While frustrating, forgetting is actually adaptive—it helps us focus on important information and not be overwhelmed by trivial details.
          </p>

          <div className="space-y-3 md:space-y-6">
            {/* Encoding Failure */}
            <div className="p-4 md:p-6 border-l-4 border-red-600">
              <h3 className="text-sm md:text-xl font-bold text-red-600 dark:text-red-400 mb-2 md:mb-3">1. Encoding Failure</h3>
              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                Information never entered long-term memory in the first place. You can't forget what you never encoded!
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 p-2 md:p-3 rounded mb-2">
                <p className="text-[10px] md:text-sm font-semibold text-red-900 dark:text-red-300 mb-1">Why It Happens:</p>
                <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                  <li>Lack of attention or focus</li>
                  <li>Shallow processing</li>
                  <li>Information deemed unimportant</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Example:</p>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                  You can't remember what's on the back of a penny because you never paid attention to it—encoding failure, not forgetting.
                </p>
              </div>
            </div>

            {/* Decay Theory */}
            <div className="p-4 md:p-6 border-l-4 border-orange-600">
              <h3 className="text-sm md:text-xl font-bold text-orange-600 dark:text-orange-400 mb-2 md:mb-3">2. Decay Theory</h3>
              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                Memory traces fade over time if they are not used or rehearsed. The longer the time since encoding, the weaker the memory.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-2 md:p-3 rounded mb-2">
                <p className="text-[10px] md:text-sm font-semibold text-orange-900 dark:text-orange-300 mb-1">Key Points:</p>
                <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                  <li>Applies mainly to short-term memory</li>
                  <li>Use it or lose it principle</li>
                  <li>Can be prevented by rehearsal</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Example:</p>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                  You forget a phone number within 30 seconds if you don't repeat it. The memory trace simply fades away.
                </p>
              </div>
            </div>

            {/* Interference Theory */}
            <div className="p-4 md:p-6 border-l-4 border-purple-600">
              <h3 className="text-sm md:text-xl font-bold text-purple-600 dark:text-purple-400 mb-2 md:mb-3">3. Interference Theory</h3>
              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                Other memories interfere with the retrieval of target information. This is a major cause of forgetting in long-term memory.
              </p>
              
              <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <h4 className="text-xs md:text-base font-bold text-purple-900 dark:text-purple-300 mb-1">Proactive Interference</h4>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <strong>Old</strong> information interferes with learning <strong>new</strong> information
                  </p>
                  <div className="bg-white dark:bg-slate-800 p-2 rounded">
                    <p className="text-[9px] md:text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">Example:</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                      You keep using your old phone number when asked for your new one
                    </p>
                  </div>
                </div>

                <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                  <h4 className="text-xs md:text-base font-bold text-purple-900 dark:text-purple-300 mb-1">Retroactive Interference</h4>
                  <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <strong>New</strong> information interferes with recalling <strong>old</strong> information
                  </p>
                  <div className="bg-white dark:bg-slate-800 p-2 rounded">
                    <p className="text-[9px] md:text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">Example:</p>
                    <p className="text-[9px] md:text-xs text-slate-600 dark:text-slate-400">
                      Learning French makes it harder to remember Spanish you learned earlier
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Retrieval Failure */}
            <div className="p-4 md:p-6 border-l-4 border-blue-600">
              <h3 className="text-sm md:text-xl font-bold text-blue-600 dark:text-blue-400 mb-2 md:mb-3">4. Retrieval Failure (Cue-Dependent Forgetting)</h3>
              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                The information is in memory, but you can't access it without the right retrieval cues. It's like knowing a file is on your computer but not being able to find it.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 md:p-3 rounded mb-2">
                <p className="text-[10px] md:text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Types of Retrieval Cues:</p>
                <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                  <li><strong>Context-Dependent:</strong> Physical environment where learning occurred</li>
                  <li><strong>State-Dependent:</strong> Internal state (mood, physical condition) during learning</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Examples:</p>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                  • Tip-of-the-tongue phenomenon (you know you know it, but can't retrieve it)<br/>
                  • Remembering better when you return to the place where you learned something<br/>
                  • Forgetting why you walked into a room
                </p>
              </div>
            </div>

            {/* Motivated Forgetting */}
            <div className="p-4 md:p-6 border-l-4 border-pink-600">
              <h3 className="text-sm md:text-xl font-bold text-pink-600 dark:text-pink-400 mb-2 md:mb-3">5. Motivated Forgetting</h3>
              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 mb-2 md:mb-3">
                We unconsciously forget information that is threatening, painful, or unpleasant. This is a defense mechanism.
              </p>
              <div className="bg-pink-50 dark:bg-pink-900/20 p-2 md:p-3 rounded mb-2">
                <p className="text-[10px] md:text-sm font-semibold text-pink-900 dark:text-pink-300 mb-1">Types:</p>
                <ul className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside">
                  <li><strong>Repression:</strong> Unconsciously blocking painful memories (Freud)</li>
                  <li><strong>Suppression:</strong> Consciously trying to forget something</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-2 md:p-3 rounded">
                <p className="text-[10px] md:text-sm font-bold text-slate-900 dark:text-white mb-1">Example:</p>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400">
                  Forgetting a traumatic childhood event or "forgetting" an embarrassing moment at a party.
                </p>
              </div>
            </div>
          </div>

          {/* Forgetting Curve */}
          <div className="mt-4 md:mt-6 p-3 md:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-l-4 border-indigo-600">
            <h4 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">📉 Ebbinghaus's Forgetting Curve</h4>
            <p className="text-xs md:text-base text-slate-700 dark:text-slate-300 mb-2 md:mb-3">
              Hermann Ebbinghaus discovered that forgetting follows a predictable pattern:
            </p>
            <div className="grid md:grid-cols-4 gap-2">
              <div className="p-2 bg-white dark:bg-slate-800 rounded text-center">
                <p className="text-xs md:text-sm font-bold text-indigo-600 dark:text-indigo-400">20 minutes</p>
                <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">~58% retained</p>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded text-center">
                <p className="text-xs md:text-sm font-bold text-indigo-600 dark:text-indigo-400">1 hour</p>
                <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">~44% retained</p>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded text-center">
                <p className="text-xs md:text-sm font-bold text-indigo-600 dark:text-indigo-400">1 day</p>
                <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">~33% retained</p>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded text-center">
                <p className="text-xs md:text-sm font-bold text-indigo-600 dark:text-indigo-400">1 month</p>
                <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400">~21% retained</p>
              </div>
            </div>
            <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mt-2 italic">
              Good news: Spaced repetition and meaningful learning can dramatically slow this curve!
            </p>
          </div>

          {/* Comparison Exercise */}
          <div className="mt-4 md:mt-8 p-3 md:p-6 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-600">
            <h4 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-4">🔍 Identify the Cause</h4>
            <ExerciseQuestion 
              question="You studied Spanish in high school and did well. Now you're learning Italian in college, and you find yourself accidentally using Spanish words when trying to speak Italian. What type of interference is this?"
              options={[
                'Proactive Interference',
                'Retroactive Interference',
                'Encoding Failure',
                'Decay Theory'
              ]}
              correctAnswer={0}
              explanation="This is PROACTIVE INTERFERENCE. Your OLD learning (Spanish) is interfering with your NEW learning (Italian). Proactive means 'forward-acting'—the old information moves forward in time to interfere with new information. Retroactive interference would be if learning Italian made you forget Spanish. This is a common problem when learning similar subjects or languages close together in time."
            />
          </div>

          {/* Exercise for Subtopic 4.3 */}
          <div className="mt-6 md:mt-10 p-4 md:p-8 border-t-4 border-red-600">
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6">✏️ Practice Exercise: Forgetting</h3>
            <ExerciseQuestion 
              question="You walk into your bedroom to get something, but when you arrive, you can't remember what you came for. You walk back to the living room, and suddenly remember. This is an example of:"
              options={[
                'Decay Theory',
                'Proactive Interference',
                'Context-Dependent Retrieval Failure',
                'Encoding Failure'
              ]}
              correctAnswer={2}
              explanation="This is CONTEXT-DEPENDENT RETRIEVAL FAILURE. The physical context (living room) where you formed the intention to get something served as a retrieval cue. When you returned to that context, the cue helped you retrieve the memory. This demonstrates that memory is often tied to the environment where it was encoded. It's not decay (too quick), not interference (no competing memories), and not encoding failure (you did encode the intention)."
            />
          </div>
        </section>

        {/* SUBTOPIC 4.4: Improving Memory */}
        <section id="subtopic-4.4" className="scroll-mt-8">
          <h2 className="text-base md:text-3xl font-bold text-slate-900 dark:text-white mb-3 md:mb-6 border-l-4 border-purple-600 pl-2 md:pl-4">
            4.4. Strategies to Improve Memory
          </h2>

          <p className="text-xs md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4 md:mb-6">
            Understanding how memory works allows us to use effective strategies to improve encoding, storage, and retrieval.
          </p>

          <div className="grid md:grid-cols-2 gap-3 md:gap-6">
            {[
              {
                title: 'Elaborative Rehearsal',
                icon: '🔗',
                description: 'Connect new information to existing knowledge',
                example: 'Link new vocabulary to words you already know'
              },
              {
                title: 'Spaced Practice',
                icon: '📅',
                description: 'Study in multiple sessions over time, not all at once',
                example: 'Study 1 hour per day for 5 days instead of 5 hours in one day'
              },
              {
                title: 'Chunking',
                icon: '📦',
                description: 'Group information into meaningful units',
                example: 'Remember phone numbers in chunks: 555-123-4567'
              },
              {
                title: 'Mnemonic Devices',
                icon: '🎯',
                description: 'Use memory aids like acronyms or rhymes',
                example: 'ROY G. BIV for colors of the rainbow'
              },
              {
                title: 'Visualization',
                icon: '🖼️',
                description: 'Create mental images of information',
                example: 'Picture a scene to remember a story'
              },
              {
                title: 'Self-Testing',
                icon: '✅',
                description: 'Quiz yourself regularly on material',
                example: 'Use flashcards or practice questions'
              }
            ].map((strategy, i) => (
              <div key={i} className="p-3 md:p-4 bg-white dark:bg-slate-800 border-l-4 border-purple-600 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl md:text-2xl">{strategy.icon}</span>
                  <h4 className="text-xs md:text-base font-bold text-slate-900 dark:text-white">{strategy.title}</h4>
                </div>
                <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 mb-2">{strategy.description}</p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                  <p className="text-[9px] md:text-xs text-slate-700 dark:text-slate-300"><strong>Example:</strong> {strategy.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="p-4 md:p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-l-4 border-purple-600">
          <h2 className="text-base md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">📚 Chapter 4 Summary</h2>
          <div className="space-y-2 md:space-y-3 text-xs md:text-base text-slate-700 dark:text-slate-300">
            <p><strong>✓ Memory Processes:</strong> Encoding (getting info in), Storage (keeping it), and Retrieval (getting it out).</p>
            <p><strong>✓ Three-Store Model:</strong> Sensory memory (1-3 sec), Short-term memory (20-30 sec, 7±2 items), Long-term memory (unlimited, permanent).</p>
            <p><strong>✓ Types of LTM:</strong> Explicit (episodic & semantic) and Implicit (procedural & conditioning).</p>
            <p><strong>✓ Forgetting Causes:</strong> Encoding failure, decay, interference (proactive & retroactive), retrieval failure, motivated forgetting.</p>
            <p><strong>✓ Forgetting Curve:</strong> We forget rapidly at first, then the rate slows down (Ebbinghaus).</p>
            <p><strong>✓ Memory Strategies:</strong> Elaborative rehearsal, spaced practice, chunking, mnemonics, visualization, and self-testing.</p>
            <p><strong>✓ Key Insight:</strong> Understanding memory processes helps us learn more effectively and remember better.</p>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4 md:pt-8 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter3');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors font-medium text-xs md:text-base"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <button
            onClick={() => {
              if (onNavigateChapter) {
                onNavigateChapter('chapter5');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-xs md:text-base"
          >
            Next: Chapter 5
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chapter4;
