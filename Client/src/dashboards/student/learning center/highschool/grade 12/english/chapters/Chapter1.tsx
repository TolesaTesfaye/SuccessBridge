import React from 'react';

export const Chapter1: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Chapter 1: Advanced Grammar
      </h1>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            1.1. Complex Sentence Structures
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Complex sentences contain one independent clause and at least one dependent clause. They allow you to express more sophisticated ideas and show relationships between different pieces of information.
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 mb-4">
            <p className="text-sm text-indigo-900 dark:text-indigo-200">
              <strong>Example:</strong> "Although it was raining heavily, we decided to go for a walk because we needed fresh air."
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            1.2. Advanced Tenses
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Mastering advanced tenses helps you express time relationships with precision:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li><strong>Present Perfect Continuous:</strong> "I have been studying for three hours."</li>
            <li><strong>Past Perfect:</strong> "She had finished her homework before dinner."</li>
            <li><strong>Future Perfect:</strong> "By next year, I will have graduated."</li>
            <li><strong>Future Continuous:</strong> "This time tomorrow, I will be flying to London."</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            1.3. Conditional Sentences
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Conditional sentences express hypothetical situations and their consequences:
          </p>
          <div className="space-y-3">
            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
              <p className="text-sm text-purple-900 dark:text-purple-200">
                <strong>Zero Conditional:</strong> "If you heat water to 100°C, it boils." (General truths)
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
              <p className="text-sm text-purple-900 dark:text-purple-200">
                <strong>First Conditional:</strong> "If it rains tomorrow, I will stay home." (Real possibility)
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
              <p className="text-sm text-purple-900 dark:text-purple-200">
                <strong>Second Conditional:</strong> "If I won the lottery, I would travel the world." (Unlikely)
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
              <p className="text-sm text-purple-900 dark:text-purple-200">
                <strong>Third Conditional:</strong> "If I had studied harder, I would have passed." (Past unreal)
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            1.4. Reported Speech
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Reported speech (indirect speech) is used to tell someone what another person said without using their exact words.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-sm text-blue-900 dark:text-blue-200 mb-2">
              <strong>Direct Speech:</strong> She said, "I am going to the store."
            </p>
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>Reported Speech:</strong> She said that she was going to the store.
            </p>
          </div>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <strong>Key Changes:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>Tense shifts back (present → past, past → past perfect)</li>
            <li>Pronouns change to match the reporter's perspective</li>
            <li>Time expressions change (today → that day, tomorrow → the next day)</li>
            <li>Place expressions change (here → there)</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
