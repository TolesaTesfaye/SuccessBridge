import React from 'react';

export const WhatIsPsychology: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
        What is Psychology?
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
          Psychology is the scientific study of behavior and mental processes.
        </p>
        
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          The word "psychology" comes from the Greek words "psyche" (meaning soul or mind) and "logos" (meaning study).
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Key Components of Psychology
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Behavior</h3>
            <p className="text-slate-700 dark:text-slate-300">
              Observable actions that can be measured and recorded. This includes everything from simple reflexes to complex social interactions.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Mental Processes</h3>
            <p className="text-slate-700 dark:text-slate-300">
              Internal experiences like thoughts, feelings, and sensations that cannot be directly observed but can be studied through various methods.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Scientific Method</h3>
            <p className="text-slate-700 dark:text-slate-300">
              Psychology uses empirical research to understand human behavior, relying on systematic observation and experimentation rather than speculation or intuition.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          Psychology vs. Other Fields
        </h2>
        
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Psychology differs from philosophy and common sense because it:
        </p>
        
        <ul className="space-y-2">
          <li className="text-slate-700 dark:text-slate-300">
            • Uses systematic observation and experimentation
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Relies on empirical evidence rather than speculation
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Tests theories through controlled research
          </li>
          <li className="text-slate-700 dark:text-slate-300">
            • Seeks to replicate findings across different studies
          </li>
        </ul>
      </div>
    </div>
  );
};