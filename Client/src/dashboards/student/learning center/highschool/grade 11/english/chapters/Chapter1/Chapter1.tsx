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
        <span className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 1
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          READING COMPREHENSION
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        {/* Section 1.1 */}
        <section id="subtopic-1.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center text-sm">
                1.1
              </span>
              Understanding Main Ideas
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              The main idea is the central message or most important point that an author wants to convey. 
              It's the foundation of reading comprehension and helps readers understand the purpose and meaning of a text.
            </p>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-100 dark:border-amber-800 mb-6">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3">
                📖 What is a Main Idea?
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                The main idea tells readers what the text is mostly about. It's often found in the topic sentence 
                of a paragraph or thesis statement of an essay, though sometimes it's implied rather than stated directly.
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                <p className="font-semibold text-amber-600 dark:text-amber-400 mb-2">Key Components:</p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• <strong>Topic:</strong> What the text is about</li>
                  <li>• <strong>Central Point:</strong> What the author wants to say about the topic</li>
                  <li>• <strong>Supporting Details:</strong> Evidence and examples that support the main idea</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-slate-900 dark:text-white">Strategies to Identify Main Ideas:</h5>
              {[
                { 
                  num: 1, 
                  title: "Read the Title and Introduction", 
                  desc: "Often hints at the main idea and sets the context for the passage" 
                },
                { 
                  num: 2, 
                  title: "Look for Repetition", 
                  desc: "Words, phrases, or concepts repeated throughout the text are usually key to the main idea" 
                },
                { 
                  num: 3, 
                  title: "Identify Topic Sentences", 
                  desc: "Usually the first or last sentence of a paragraph, stating the paragraph's main point" 
                },
                { 
                  num: 4, 
                  title: "Ask 'What is this mostly about?'", 
                  desc: "Summarize the passage in one sentence to find the main idea" 
                }
              ].map((strategy) => (
                <div
                  key={strategy.num}
                  className="flex gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {strategy.num}
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-900 dark:text-white mb-2">
                      {strategy.title}
                    </h6>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {strategy.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1.2 */}
        <section id="subtopic-1.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center text-sm">
                1.2
              </span>
              Inference and Interpretation
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Making inferences means "reading between the lines" - understanding what the author suggests 
              but doesn't state directly. It requires combining text evidence with your own knowledge and reasoning.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">
                  Inference
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Drawing logical conclusions based on text clues and prior knowledge
                </p>
                <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs text-slate-600 dark:text-slate-400">
                  <strong>Example:</strong> "Sarah looked at the clock and ran to the door with her backpack." 
                  <br/><em className="text-blue-600 dark:text-blue-400">Inference: Sarah is late for school.</em>
                </div>
              </div>

              <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <h4 className="font-bold text-green-900 dark:text-green-300 mb-3">
                  Interpretation
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Explaining the meaning and significance of text elements
                </p>
                <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs text-slate-600 dark:text-slate-400">
                  <strong>Example:</strong> Analyzing why an author uses dark imagery
                  <br/><em className="text-green-600 dark:text-green-400">Interpretation: To create a somber mood</em>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
              <h5 className="font-bold text-purple-900 dark:text-purple-300 mb-4">
                Steps to Make Strong Inferences:
              </h5>
              <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li><strong>1. Identify text clues</strong> - Look for descriptive words, actions, dialogue</li>
                <li><strong>2. Use background knowledge</strong> - Connect to what you already know</li>
                <li><strong>3. Combine evidence</strong> - Put clues together to form a logical conclusion</li>
                <li><strong>4. Verify</strong> - Check that your inference makes sense with the entire text</li>
              </ol>
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
              Vocabulary in Context
            </h3>
            <p className="text-slate-300 mb-8">
              Understanding vocabulary in context means figuring out the meaning of unfamiliar words by using 
              clues from the surrounding text. This skill is essential for reading comprehension.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-amber-400 font-bold mb-3 text-lg">Context Clues Types</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-slate-800 rounded">
                    <p className="font-semibold text-amber-300 mb-1">Definition</p>
                    <p className="text-slate-400">The meaning is stated directly</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded">
                    <p className="font-semibold text-amber-300 mb-1">Synonym</p>
                    <p className="text-slate-400">Similar word provides the meaning</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded">
                    <p className="font-semibold text-amber-300 mb-1">Antonym</p>
                    <p className="text-slate-400">Opposite word shows contrast</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded">
                    <p className="font-semibold text-amber-300 mb-1">Example</p>
                    <p className="text-slate-400">Examples clarify the meaning</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-orange-400 font-bold mb-3 text-lg">Practice Examples</h4>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-slate-800 rounded">
                    <p className="text-slate-300 mb-2">
                      "The <strong className="text-amber-400">arid</strong> desert had no water for miles."
                    </p>
                    <p className="text-xs text-slate-500">Context: desert, no water → arid means dry</p>
                  </div>

                  <div className="p-4 bg-slate-800 rounded">
                    <p className="text-slate-300 mb-2">
                      "Unlike her <strong className="text-amber-400">boisterous</strong> brother, she was quiet."
                    </p>
                    <p className="text-xs text-slate-500">Antonym: quiet → boisterous means loud/noisy</p>
                  </div>

                  <div className="p-4 bg-slate-800 rounded">
                    <p className="text-slate-300 mb-2">
                      "The <strong className="text-amber-400">canine</strong>, a type of dog, barked loudly."
                    </p>
                    <p className="text-xs text-slate-500">Definition: "a type of dog" → canine means dog</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl p-6 border border-amber-700/50">
              <h5 className="text-amber-400 font-bold mb-3">Pro Tip for Exams:</h5>
              <p className="text-slate-300 text-sm">
                When you encounter an unfamiliar word, don't panic! Read the entire sentence and surrounding sentences. 
                Look for signal words like "such as," "for example," "unlike," "however," or punctuation marks that 
                provide clues. Try substituting your guess back into the sentence to check if it makes sense.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1.4 */}
        <section id="subtopic-1.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center text-sm">
                1.4
              </span>
              Critical Analysis
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Critical analysis involves evaluating and forming judgments about what you read. It goes beyond 
              understanding to questioning, analyzing, and assessing the author's ideas, arguments, and techniques.
            </p>

            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-red-100 dark:border-red-800 mb-6">
              <h4 className="font-bold text-red-900 dark:text-red-300 mb-4">
                Critical Reading Questions to Ask:
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { category: "Purpose", q: "Why did the author write this?" },
                  { category: "Audience", q: "Who is the intended reader?" },
                  { category: "Bias", q: "Is the author's perspective balanced?" },
                  { category: "Evidence", q: "Are claims supported with facts?" },
                  { category: "Logic", q: "Do the arguments make sense?" },
                  { category: "Effect", q: "What impact does it have on readers?" }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-lg">
                    <p className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-1">
                      {item.category}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{item.q}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-slate-900 dark:text-white">Elements to Analyze:</h5>
              
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h6 className="font-bold text-blue-900 dark:text-blue-300 mb-3">Tone and Style</h6>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Examine the author's attitude (formal, casual, sarcastic, serious) and writing style 
                  (descriptive, persuasive, narrative). How do these choices affect the message?
                </p>
              </div>

              <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <h6 className="font-bold text-green-900 dark:text-green-300 mb-3">Structure and Organization</h6>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  How is the text organized? Does the structure help convey the main idea effectively? 
                  Look at paragraphing, transitions, and logical flow.
                </p>
              </div>

              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h6 className="font-bold text-purple-900 dark:text-purple-300 mb-3">Argument and Evidence</h6>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Identify the main argument or claim. Evaluate the quality and relevance of supporting 
                  evidence. Are there any logical fallacies or unsupported assumptions?
                </p>
              </div>

              <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                <h6 className="font-bold text-amber-900 dark:text-amber-300 mb-3">Author's Credibility</h6>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Consider the author's qualifications, expertise, and potential biases. Does the author 
                  have authority to write on this topic? Are sources cited and reliable?
                </p>
              </div>
            </div>

            <div className="mt-6 bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
              <h6 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-xl">💡</span>
                Remember: Critical Analysis Framework
              </h6>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <p><strong>1. Summarize:</strong> What does the text say?</p>
                <p><strong>2. Analyze:</strong> How does the text say it?</p>
                <p><strong>3. Evaluate:</strong> How well does it achieve its purpose?</p>
                <p><strong>4. Respond:</strong> What do you think about it?</p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-3xl p-10 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-6">📖 Chapter 1 Summary</h3>
          <div className="space-y-3 text-amber-50">
            <p>✓ Main ideas are the central messages authors want to convey - identify through topic sentences and repetition</p>
            <p>✓ Inferences require combining text evidence with background knowledge to understand implied meanings</p>
            <p>✓ Use context clues (definition, synonym, antonym, example) to determine unfamiliar word meanings</p>
            <p>✓ Critical analysis involves questioning, evaluating, and forming judgments about texts</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter1;
