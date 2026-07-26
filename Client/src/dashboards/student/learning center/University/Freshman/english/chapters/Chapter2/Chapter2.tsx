import React, { useEffect } from "react";

interface ChapterProps {
  selectedSubtopic?: string;
}

export const Chapter2: React.FC<ChapterProps> = ({ selectedSubtopic }) => {
  // Scroll to subtopic when selected
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
        <span className="inline-block px-4 py-1.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
          Chapter 2
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
          READING COMPREHENSION
        </h1>
        <div className="h-1.5 w-24 bg-gradient-to-r from-rose-600 to-red-600 rounded-full" />
      </div>

      <div className="space-y-12 pb-20">
        {/* Section 2.1 - Reading Strategies */}
        <section id="subtopic-2.1" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">
                2.1
              </span>
              Reading Strategies
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Effective reading requires more than just recognizing words. Strategic readers actively engage with texts, using various techniques to enhance comprehension and retention. Mastering these strategies will transform you from a passive reader to an active learner.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
                  📖 Pre-Reading
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Preview the text by scanning titles, headings, images, and keywords. Activate prior knowledge and set a purpose for reading.
                </p>
              </div>

              <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">
                  🔍 While Reading
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Annotate, highlight key points, ask questions, and make connections. Monitor your comprehension and adjust your pace as needed.
                </p>
              </div>

              <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2">
                  ✍️ Post-Reading
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Summarize main ideas, reflect on what you learned, and review difficult sections. Connect new information to prior knowledge.
                </p>
              </div>

              <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <h4 className="font-bold text-green-900 dark:text-green-300 mb-2">
                  🎯 Active Reading
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Engage with the text through questioning, predicting, visualizing, and making inferences to deepen understanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2.2 - Main Idea and Supporting Details */}
        <section id="subtopic-2.2" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">
                2.2
              </span>
              Main Idea and Supporting Details
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Every well-written passage has a central message or main idea that the author wants to convey. Supporting details provide evidence, examples, and explanations that reinforce and clarify this main idea.
            </p>

            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-6 border border-rose-200 dark:border-rose-800 mb-6">
              <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-3">
                🎯 Identifying the Main Idea
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>
                  <strong>1. Topic Sentence:</strong> Often found at the beginning or end of a paragraph, explicitly states the main idea.
                </li>
                <li>
                  <strong>2. Repeated Concepts:</strong> Ideas or words that appear multiple times throughout the text.
                </li>
                <li>
                  <strong>3. Ask "What is this about?":</strong> Sum up the passage in one sentence to identify the central message.
                </li>
                <li>
                  <strong>4. Distinguish Topic vs Main Idea:</strong> Topic is what the text is about; main idea is what the author wants to say about that topic.
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Supporting Details
                </h4>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Facts and statistics</li>
                  <li>• Examples and anecdotes</li>
                  <li>• Expert opinions</li>
                  <li>• Descriptions and explanations</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Red Herrings
                </h4>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• Interesting but irrelevant details</li>
                  <li>• Tangential information</li>
                  <li>• Minor points</li>
                  <li>• Distracting examples</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2.3 - Inference and Interpretation */}
        <section id="subtopic-2.3" className="scroll-mt-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-2xl">
            <h3 className="text-3xl font-black mb-6 flex items-center gap-4">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">
                2.3
              </span>
              Inference and Interpretation
            </h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Reading between the lines is a crucial skill. Authors don't always state everything explicitly—they rely on readers to make logical connections and draw conclusions based on context clues, prior knowledge, and textual evidence.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-rose-400 font-bold mb-3">
                  🧩 Making Inferences
                </h4>
                <p className="text-sm text-slate-400 mb-4">
                  Use stated information + background knowledge to reach logical conclusions that aren't explicitly written.
                </p>
                <div className="bg-white/10 rounded p-3 font-mono text-xs text-slate-300">
                  Text Evidence + Prior Knowledge = Inference
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-blue-400 font-bold mb-3">
                  🎭 Interpreting Meaning
                </h4>
                <p className="text-sm text-slate-400 mb-4">
                  Consider author's purpose, tone, figurative language, and context to understand deeper meanings and implications.
                </p>
                <div className="bg-white/10 rounded p-3 font-mono text-xs text-slate-300">
                  Context + Analysis = Interpretation
                </div>
              </div>
            </div>

            <div className="mt-6 bg-rose-900/30 rounded-xl p-5 border border-rose-800/50">
              <h4 className="font-bold text-rose-300 mb-3">Key Inference Strategies:</h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-300">
                <div>• Look for context clues</div>
                <div>• Consider character actions and dialogue</div>
                <div>• Analyze word choice and tone</div>
                <div>• Connect to real-world knowledge</div>
                <div>• Notice what's NOT said</div>
                <div>• Identify cause-and-effect relationships</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2.4 - Critical Reading */}
        <section id="subtopic-2.4" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">
                2.4
              </span>
              Critical Reading
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Critical reading goes beyond understanding content—it involves evaluating, analyzing, and questioning the text. A critical reader examines the author's arguments, evidence, assumptions, and biases to form informed judgments.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-rose-600 mb-1">
                  ❓
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  Question
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Challenge assumptions and arguments
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  ⚖️
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  Evaluate
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Assess credibility and evidence
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  🔗
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  Connect
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Link to other knowledge and contexts
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-3">
                Critical Reading Questions to Ask:
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li><strong>Purpose:</strong> Why did the author write this? What is their agenda?</li>
                <li><strong>Audience:</strong> Who is the intended reader? How does this affect the content?</li>
                <li><strong>Evidence:</strong> Is the evidence sufficient, relevant, and credible?</li>
                <li><strong>Logic:</strong> Are the arguments logical and well-reasoned?</li>
                <li><strong>Bias:</strong> Does the author show any bias or one-sided thinking?</li>
                <li><strong>Perspective:</strong> What alternative viewpoints exist?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2.5 - Vocabulary in Context */}
        <section id="subtopic-2.5" className="scroll-mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center text-sm">
                2.5
              </span>
              Vocabulary in Context
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              You don't need to memorize every word in the dictionary. Skilled readers use context clues—surrounding words, phrases, and sentences—to deduce the meaning of unfamiliar vocabulary. This strategy improves both comprehension and vocabulary acquisition.
            </p>

            <div className="space-y-4">
              {[
                { 
                  title: "Definition Clues", 
                  desc: "The text directly defines or explains the word. Look for words like 'is,' 'means,' 'refers to,' or punctuation like commas and dashes.",
                  example: "The artifacts—ancient objects made by humans—were carefully preserved in the museum."
                },
                { 
                  title: "Synonym Clues", 
                  desc: "A familiar word with a similar meaning appears nearby, helping you understand the unknown word.",
                  example: "The child was ecstatic, thrilled beyond measure, when she received the gift."
                },
                { 
                  title: "Antonym Clues", 
                  desc: "A word or phrase with an opposite meaning provides contrast that reveals the word's meaning. Look for words like 'but,' 'however,' 'unlike,' or 'although.'",
                  example: "Unlike her gregarious sister, Maria was quite shy and reserved."
                },
                { 
                  title: "Example Clues", 
                  desc: "Specific examples illustrate the meaning of the unfamiliar word.",
                  example: "Nocturnal animals, such as owls, bats, and raccoons, are active at night."
                },
                { 
                  title: "Inference Clues", 
                  desc: "Use logic and the overall context of the sentence or passage to infer meaning.",
                  example: "After the arduous climb up the steep mountain, they were exhausted and needed rest."
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                      {item.desc}
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 text-xs italic text-slate-700 dark:text-slate-300 border-l-4 border-blue-500">
                      "{item.example}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Knowledge Check Section */}
        <section className="bg-gradient-to-r from-rose-600 to-red-700 rounded-3xl p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">
                Chapter 2 Knowledge Check
              </h3>
              <p className="text-rose-100 mb-4">
                Test your understanding of reading comprehension strategies and techniques covered in this chapter.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">✓</span>
                  <span>Can you identify main ideas vs supporting details?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">✓</span>
                  <span>Do you know how to make inferences from context?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">✓</span>
                  <span>Can you apply critical reading strategies?</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-96 bg-white rounded-2xl p-6 text-slate-900 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="font-bold text-lg mb-2">Practice Makes Perfect</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Apply these reading strategies to any text you encounter. The more you practice, the more automatic these skills become.
                </p>
                <div className="bg-rose-50 rounded-lg p-3 text-xs text-slate-700">
                  <strong>Pro Tip:</strong> Start with shorter texts and gradually work up to longer, more complex passages. Reading comprehension improves with consistent practice!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            📋 Chapter Summary
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Reading comprehension is a multifaceted skill that involves active engagement with texts. In this chapter, you've learned:
            </p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li><strong>Reading Strategies:</strong> Pre-reading, active reading, and post-reading techniques that enhance comprehension</li>
              <li><strong>Main Ideas & Details:</strong> How to distinguish central messages from supporting information</li>
              <li><strong>Inference & Interpretation:</strong> Reading between the lines to understand implicit meanings</li>
              <li><strong>Critical Reading:</strong> Evaluating and analyzing texts for purpose, bias, and validity</li>
              <li><strong>Vocabulary in Context:</strong> Using context clues to determine word meanings without a dictionary</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chapter2;
