import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'trick';
}

const questions: Question[] = [
  // Natural Numbers Questions
  {
    id: 1,
    question: "Which of the following is NOT a natural number?",
    options: ["1", "0", "5", "100"],
    correctAnswer: 1,
    explanation: "Natural numbers are counting numbers {1, 2, 3, ...}. Zero is not included in natural numbers.",
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "If you have a set of natural numbers from 1 to n, and their sum is 55, what is the value of n?",
    options: ["9", "10", "11", "12"],
    correctAnswer: 1,
    explanation: "Using the formula n(n+1)/2 = 55, we get n² + n - 110 = 0. Solving: n = 10.",
    difficulty: 'trick'
  },

  // Whole Numbers Questions
  {
    id: 3,
    question: "What is the smallest whole number?",
    options: ["1", "0", "-1", "There is no smallest whole number"],
    correctAnswer: 1,
    explanation: "Whole numbers include {0, 1, 2, 3, ...}, so 0 is the smallest whole number.",
    difficulty: 'easy'
  },
  {
    id: 4,
    question: "Which statement about whole numbers is FALSE?",
    options: [
      "Every natural number is a whole number",
      "Every whole number is a natural number", 
      "Zero is a whole number",
      "Whole numbers are non-negative"
    ],
    correctAnswer: 1,
    explanation: "Not every whole number is a natural number because 0 is a whole number but not a natural number.",
    difficulty: 'trick'
  },

  // Integers Questions
  {
    id: 5,
    question: "Which of the following represents the set of integers?",
    options: [
      "{0, 1, 2, 3, ...}",
      "{1, 2, 3, ...}",
      "{..., -2, -1, 0, 1, 2, ...}",
      "{1/2, 1, 3/2, 2, ...}"
    ],
    correctAnswer: 2,
    explanation: "Integers include all positive numbers, negative numbers, and zero.",
    difficulty: 'medium'
  },
  {
    id: 6,
    question: "If a and b are integers, and a - b = 0.5, which statement is true?",
    options: [
      "This is possible",
      "This is impossible",
      "Only if a and b are even",
      "Only if a and b are odd"
    ],
    correctAnswer: 1,
    explanation: "If a and b are integers, then a - b must also be an integer. Since 0.5 is not an integer, this is impossible.",
    difficulty: 'trick'
  },

  // Rational Numbers Questions
  {
    id: 7,
    question: "Which of the following is a rational number?",
    options: ["π", "√2", "0.333...", "e"],
    correctAnswer: 2,
    explanation: "0.333... = 1/3, which can be expressed as a fraction p/q where p and q are integers.",
    difficulty: 'medium'
  },
  {
    id: 8,
    question: "If 0.142857142857... is a rational number, what fraction does it represent?",
    options: ["1/7", "1/6", "2/7", "1/8"],
    correctAnswer: 0,
    explanation: "The repeating decimal 0.142857... = 1/7. This is a classic trick question about repeating decimals.",
    difficulty: 'trick'
  },

  // Irrational Numbers Questions
  {
    id: 9,
    question: "Which of the following is an irrational number?",
    options: ["√4", "√9", "√2", "√16"],
    correctAnswer: 2,
    explanation: "√2 cannot be expressed as a fraction of two integers, making it irrational. The others are perfect squares.",
    difficulty: 'medium'
  },
  {
    id: 10,
    question: "If √2 ≈ 1.414, then √8 equals approximately:",
    options: ["2.828", "4", "2√2", "All of the above"],
    correctAnswer: 3,
    explanation: "√8 = √(4×2) = 2√2 ≈ 2(1.414) = 2.828. So all answers are correct!",
    difficulty: 'trick'
  },

  // Mixed/Advanced Questions
  {
    id: 11,
    question: "Which set contains ALL the others as subsets?",
    options: ["Natural Numbers", "Whole Numbers", "Integers", "Rational Numbers"],
    correctAnswer: 3,
    explanation: "Rational numbers contain all integers, which contain all whole numbers, which contain all natural numbers.",
    difficulty: 'medium'
  },
  {
    id: 12,
    question: "How many rational numbers exist between 0 and 1?",
    options: ["100", "1000", "Infinitely many", "It depends on the denominator"],
    correctAnswer: 2,
    explanation: "Between any two distinct real numbers, there are infinitely many rational numbers. This is a fundamental property of rational numbers.",
    difficulty: 'trick'
  }
];

export const RealNumberSystemQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(false);
  };

  const handleSubmit = () => {
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      case 'trick': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-slate-700 rounded-lg p-8 text-white text-center">
          <h1 className="text-4xl font-bold mb-6">Quiz Results</h1>
          <div className="text-6xl font-bold mb-4 text-green-400">{percentage}%</div>
          <p className="text-xl mb-6">You scored {score} out of {questions.length} questions correctly!</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-600 p-4 rounded">
              <h3 className="font-semibold mb-2">Performance Breakdown</h3>
              <div className="text-sm space-y-1">
                <div>Easy Questions: {questions.filter(q => q.difficulty === 'easy').length}</div>
                <div>Medium Questions: {questions.filter(q => q.difficulty === 'medium').length}</div>
                <div>Hard Questions: {questions.filter(q => q.difficulty === 'hard').length}</div>
                <div>Trick Questions: {questions.filter(q => q.difficulty === 'trick').length}</div>
              </div>
            </div>
            
            <div className="bg-slate-600 p-4 rounded">
              <h3 className="font-semibold mb-2">Grade</h3>
              <div className="text-2xl font-bold">
                {percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F'}
              </div>
              <div className="text-sm mt-2">
                {percentage >= 90 ? 'Excellent!' : percentage >= 80 ? 'Good job!' : percentage >= 70 ? 'Not bad!' : percentage >= 60 ? 'Keep studying!' : 'Need more practice!'}
              </div>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== -1;
  const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-slate-700 rounded-lg p-8 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Exercise ?</h1>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty.toUpperCase()}
            </span>
            <span className="text-slate-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-600 rounded-full h-2 mb-8">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-medium mb-8 text-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? showExplanation
                    ? index === question.correctAnswer
                      ? 'bg-green-600 border-2 border-green-400'
                      : 'bg-red-600 border-2 border-red-400'
                    : 'bg-slate-600 border-2 border-slate-400'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={index}
                checked={selectedAnswers[currentQuestion] === index}
                onChange={() => handleAnswerSelect(index)}
                className="mr-4"
                disabled={showExplanation}
              />
              <span className="text-lg">{option}</span>
            </label>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-6 rounded-lg mb-6 ${isCorrect ? 'bg-green-800' : 'bg-red-800'}`}>
            <h3 className="font-bold mb-2">
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </h3>
            <p className="text-slate-100">{question.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {!showExplanation ? (
            <button
              onClick={handleSubmit}
              disabled={!isAnswered}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isAnswered
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-slate-500 text-slate-300 cursor-not-allowed'
              }`}
            >
              Submit Answer »
            </button>
          ) : (
            <div className="flex gap-4">
              {currentQuestion > 0 && (
                <button
                  onClick={prevQuestion}
                  className="px-6 py-3 rounded-lg font-medium bg-slate-600 hover:bg-slate-500 text-white transition-colors"
                >
                  ❮ Previous
                </button>
              )}
              <button
                onClick={nextQuestion}
                className="px-6 py-3 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-colors"
              >
                {currentQuestion === questions.length - 1 ? 'View Results' : 'Next ❯'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};