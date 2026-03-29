import React, { useState } from 'react';

interface ExerciseQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface InlineExerciseProps {
  question: ExerciseQuestion;
  exerciseNumber?: number;
}

export const InlineExercise: React.FC<InlineExerciseProps> = ({ 
  question, 
  exerciseNumber = 1 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== -1) {
      setShowResult(true);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(-1);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="my-8 bg-slate-700 rounded-lg p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Exercise {exerciseNumber} ?</h3>
        {showResult && (
          <button
            onClick={handleTryAgain}
            className="text-sm bg-slate-600 hover:bg-slate-500 px-3 py-1 rounded transition-colors"
          >
            Try Again
          </button>
        )}
      </div>

      {/* Question */}
      <h4 className="text-lg font-medium mb-6 text-center">
        {question.question}
      </h4>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
              showResult
                ? selectedAnswer === index
                  ? index === question.correctAnswer
                    ? 'bg-green-600 border-2 border-green-400'
                    : 'bg-red-600 border-2 border-red-400'
                  : index === question.correctAnswer
                    ? 'bg-green-600 border-2 border-green-400'
                    : 'bg-slate-600'
                : selectedAnswer === index
                  ? 'bg-slate-600 border-2 border-slate-400'
                  : 'bg-slate-600 hover:bg-slate-500'
            }`}
          >
            <input
              type="radio"
              name={`exercise-${exerciseNumber}`}
              value={index}
              checked={selectedAnswer === index}
              onChange={() => !showResult && setSelectedAnswer(index)}
              className="mr-3"
              disabled={showResult}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      {/* Submit Button or Result */}
      {!showResult ? (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === -1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedAnswer !== -1
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-slate-500 text-slate-300 cursor-not-allowed'
            }`}
          >
            Submit Answer »
          </button>
        </div>
      ) : (
        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-800' : 'bg-red-800'}`}>
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">{isCorrect ? '✅' : '❌'}</span>
            <span className="font-bold">
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </span>
          </div>
          <p className="text-slate-100">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};