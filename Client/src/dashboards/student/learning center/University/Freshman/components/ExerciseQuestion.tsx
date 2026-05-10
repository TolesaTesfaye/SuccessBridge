import React, { useState } from 'react';

interface ExerciseQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const ExerciseQuestion: React.FC<ExerciseQuestionProps> = ({
  question,
  options,
  correctAnswer,
  explanation
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-3 md:p-4 max-w-5xl mx-auto">
      <h4 className="font-semibold text-xs md:text-base text-gray-900 dark:text-white mb-2 md:mb-3">
        {question}
      </h4>

      <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && setSelectedAnswer(index)}
            disabled={showResult}
            className={`w-full text-left p-2 md:p-3 rounded-lg border transition-colors text-xs md:text-base ${
              showResult
                ? index === correctAnswer
                  ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-900 dark:text-green-100'
                  : index === selectedAnswer
                  ? 'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-900 dark:text-red-100'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                : selectedAnswer === index
                ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-900 dark:text-blue-100'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center">
              <span className="font-semibold mr-2 text-xs md:text-sm">{String.fromCharCode(65 + index)}.</span>
              <span className="text-xs md:text-base">{option}</span>
              {showResult && index === correctAnswer && (
                <span className="ml-auto text-green-600 dark:text-green-400">✓</span>
              )}
              {showResult && index === selectedAnswer && index !== correctAnswer && (
                <span className="ml-auto text-red-600 dark:text-red-400">✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded font-medium transition-colors text-xs md:text-sm ${
            selectedAnswer === null
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Submit Answer
        </button>
      ) : (
        <div>
          <div className={`p-2 md:p-3 rounded-lg mb-2 md:mb-3 ${
            isCorrect
              ? 'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100'
              : 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100'
          }`}>
            <p className="font-semibold text-xs md:text-sm">
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            {explanation && (
              <p className="mt-1 md:mt-2 text-[10px] md:text-sm">{explanation}</p>
            )}
          </div>
          <button
            onClick={handleReset}
            className="px-3 md:px-4 py-1.5 md:py-2 rounded font-medium bg-gray-600 hover:bg-gray-700 text-white transition-colors text-xs md:text-sm"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
