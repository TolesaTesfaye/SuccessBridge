import React from 'react';

export const GoalsOfPsychology: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        Goals of Psychology
      </h1>
      
      <div className="flex gap-4 mb-8">
        <button className="px-4 py-2 bg-[#04aa6d] text-white rounded text-sm font-medium hover:bg-[#038a5a] transition-colors">
          ❮ Previous
        </button>
        <button className="px-4 py-2 bg-[#04aa6d] text-white rounded text-sm font-medium hover:bg-[#038a5a] transition-colors">
          Next ❯
        </button>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
          Psychology has four primary goals that guide research and practice:
        </p>

        <div className="space-y-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              1. Description
            </h2>
            <p className="text-blue-800 dark:text-blue-200 mb-3 font-semibold">
              What is happening?
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Accurately observing and recording behavior to understand what is occurring.
            </p>
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Example:</p>
              <p className="text-slate-700 dark:text-slate-300">
                Describing the symptoms of depression: sleep disturbances, loss of appetite, feelings of sadness, difficulty concentrating.
              </p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
              2. Explanation
            </h2>
            <p className="text-green-800 dark:text-green-200 mb-3 font-semibold">
              Why is it happening?
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Understanding the causes and mechanisms behind behavior.
            </p>
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-green-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Example:</p>
              <p className="text-slate-700 dark:text-slate-300">
                Explaining depression through brain chemistry imbalances, genetic factors, or environmental stressors.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-900 dark:text-orange-100 mb-4">
              3. Prediction
            </h2>
            <p className="text-orange-800 dark:text-orange-200 mb-3 font-semibold">
              When will it happen again?
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Forecasting future behavior based on current knowledge and patterns.
            </p>
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-orange-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Example:</p>
              <p className="text-slate-700 dark:text-slate-300">
                Predicting who might develop depression based on risk factors like family history, stress levels, or life events.
              </p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">
              4. Control/Influence
            </h2>
            <p className="text-purple-800 dark:text-purple-200 mb-3 font-semibold">
              How can we change or influence it?
            </p>
            <p className="text-slate-700 dark:text-slate-300 mb-3">
              Developing interventions to modify or improve behavior and mental processes.
            </p>
            <div className="bg-white dark:bg-slate-800 p-4 rounded border-l-4 border-purple-500">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Example:</p>
              <p className="text-slate-700 dark:text-slate-300">
                Using cognitive-behavioral therapy, medication, or lifestyle changes to treat depression effectively.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Working Together
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
            These four goals work together in psychological research and practice. Description provides the foundation, 
            explanation helps us understand why things happen, prediction allows us to anticipate future occurrences, 
            and control enables us to make positive changes in people's lives.
          </p>
        </div>
      </div>
    </div>
  );
};