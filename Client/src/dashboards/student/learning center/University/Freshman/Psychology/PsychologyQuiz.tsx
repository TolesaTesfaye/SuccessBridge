import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'trick';
  topic: string;
}

const questions: Question[] = [
  // What is Psychology Questions
  {
    id: 1,
    question: "What distinguishes psychology from philosophy and common sense?",
    options: [
      "Psychology focuses only on abnormal behavior",
      "Psychology uses systematic observation and experimentation",
      "Psychology is newer than philosophy",
      "Psychology only studies the mind, not behavior"
    ],
    correctAnswer: 1,
    explanation: "Psychology differs from philosophy and common sense because it relies on systematic observation and experimentation rather than speculation or intuition.",
    difficulty: 'medium',
    topic: 'What is Psychology?'
  },
  {
    id: 2,
    question: "If psychology studies both behavior and mental processes, which scenario represents studying ONLY mental processes?",
    options: [
      "Measuring how fast someone runs",
      "Recording what someone says during therapy",
      "Using brain scans to study thoughts during problem-solving",
      "Observing social interactions in a group"
    ],
    correctAnswer: 2,
    explanation: "Brain scans studying thoughts during problem-solving focus on internal mental processes, while the others involve observable behaviors.",
    difficulty: 'trick',
    topic: 'What is Psychology?'
  },

  // Goals of Psychology Questions
  {
    id: 3,
    question: "Which goal of psychology is demonstrated when a researcher records the frequency of aggressive behaviors in children?",
    options: ["Description", "Explanation", "Prediction", "Control"],
    correctAnswer: 0,
    explanation: "Description involves accurately observing and recording behavior, which is what measuring frequency of aggressive behaviors accomplishes.",
    difficulty: 'easy',
    topic: 'Goals of Psychology'
  },
  {
    id: 4,
    question: "A psychologist claims they can predict depression based on sleep patterns, but their predictions are only 60% accurate. What does this suggest about the four goals of psychology?",
    options: [
      "The description goal has been achieved",
      "The explanation goal is incomplete",
      "Perfect prediction is impossible in psychology",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "60% accuracy suggests some description and explanation have been achieved, but perfect prediction is indeed impossible in psychology due to human complexity. All statements are true.",
    difficulty: 'trick',
    topic: 'Goals of Psychology'
  },

  // History of Psychology Questions
  {
    id: 5,
    question: "Who is considered the founder of scientific psychology and when?",
    options: [
      "Sigmund Freud in 1900",
      "Wilhelm Wundt in 1879",
      "William James in 1890",
      "John Watson in 1913"
    ],
    correctAnswer: 1,
    explanation: "Wilhelm Wundt established the first psychology laboratory in Leipzig, Germany in 1879, marking the beginning of psychology as a separate scientific discipline.",
    difficulty: 'easy',
    topic: 'History of Psychology'
  },
  {
    id: 6,
    question: "Which early school of thought would be MOST interested in studying why humans developed the ability to feel fear?",
    options: ["Structuralism", "Functionalism", "Behaviorism", "Gestalt Psychology"],
    correctAnswer: 1,
    explanation: "Functionalism, founded by William James, studied the purpose and adaptation of mental processes - exactly what asking 'why we developed fear' addresses.",
    difficulty: 'trick',
    topic: 'History of Psychology'
  },

  // Modern Perspectives Questions
  {
    id: 7,
    question: "A researcher studying how neurotransmitters affect mood is using which perspective?",
    options: ["Cognitive", "Behavioral", "Biological", "Humanistic"],
    correctAnswer: 2,
    explanation: "The biological perspective focuses on the role of the brain, nervous system, and genetics, including how neurotransmitters affect behavior.",
    difficulty: 'medium',
    topic: 'Modern Perspectives'
  },
  {
    id: 8,
    question: "Which perspective would be LEAST likely to use laboratory experiments?",
    options: ["Cognitive", "Behavioral", "Biological", "Humanistic"],
    correctAnswer: 3,
    explanation: "The humanistic perspective emphasizes subjective experiences and personal growth, making controlled laboratory experiments less suitable than other approaches.",
    difficulty: 'trick',
    topic: 'Modern Perspectives'
  },

  // Research Methods Questions
  {
    id: 9,
    question: "What is the main limitation of correlational studies?",
    options: [
      "They are too expensive to conduct",
      "They cannot establish cause and effect",
      "They only work with large sample sizes",
      "They are not scientifically valid"
    ],
    correctAnswer: 1,
    explanation: "Correlational studies examine relationships between variables but cannot establish cause and effect relationships.",
    difficulty: 'medium',
    topic: 'Research Methods'
  },
  {
    id: 10,
    question: "A researcher wants to study the effect of music on studying. They have students study with music, without music, and with white noise. What type of study is this?",
    options: ["Naturalistic observation", "Case study", "Correlational study", "Experimental study"],
    correctAnswer: 3,
    explanation: "This is an experimental study because the researcher is manipulating one variable (type of audio) to observe effects on another (studying performance).",
    difficulty: 'medium',
    topic: 'Research Methods'
  },
  {
    id: 11,
    question: "Why might a case study of one person with a rare brain injury be valuable despite having a sample size of only one?",
    options: [
      "It's not valuable - sample size is too small",
      "It provides in-depth information about rare conditions",
      "It can establish cause and effect",
      "It represents the general population"
    ],
    correctAnswer: 1,
    explanation: "Case studies provide in-depth information about individual cases, which is especially valuable for rare conditions that can't be studied experimentally.",
    difficulty: 'trick',
    topic: 'Research Methods'
  },

  // Branches of Psychology Questions
  {
    id: 12,
    question: "Which branch of psychology would study how cultural differences affect workplace productivity?",
    options: [
      "Clinical Psychology",
      "Developmental Psychology", 
      "Industrial/Organizational Psychology",
      "Cognitive Psychology"
    ],
    correctAnswer: 2,
    explanation: "Industrial/Organizational Psychology applies psychology to workplace issues, including how cultural factors affect productivity.",
    difficulty: 'medium',
    topic: 'Branches of Psychology'
  },
  {
    id: 13,
    question: "A psychologist helps a college student choose a major and develop study skills. This is MOST likely which type of psychologist?",
    options: [
      "Clinical psychologist",
      "Counseling psychologist",
      "Educational psychologist", 
      "Social psychologist"
    ],
    correctAnswer: 1,
    explanation: "Counseling psychologists help people cope with everyday problems and life transitions, like choosing majors and developing skills.",
    difficulty: 'trick',
    topic: 'Branches of Psychology'
  },

  // Advanced/Mixed Questions
  {
    id: 14,
    question: "Which statement about psychology as a science is MOST accurate?",
    options: [
      "Psychology can predict human behavior with 100% accuracy",
      "Psychology only studies abnormal behavior",
      "Psychology uses scientific methods but human behavior is complex",
      "Psychology is not a real science because it studies the mind"
    ],
    correctAnswer: 2,
    explanation: "Psychology uses scientific methods, but human behavior is inherently complex, making perfect prediction impossible while still maintaining scientific validity.",
    difficulty: 'hard',
    topic: 'Nature of Psychology'
  },
  {
    id: 15,
    question: "If a study finds that students who eat breakfast score higher on tests, what can we conclude?",
    options: [
      "Eating breakfast causes better test performance",
      "Better test performance causes students to eat breakfast",
      "There is a relationship between breakfast and test scores",
      "The study is invalid"
    ],
    correctAnswer: 2,
    explanation: "Without experimental manipulation, we can only conclude there's a relationship (correlation) between breakfast and test scores, not causation.",
    difficulty: 'trick',
    topic: 'Research Methods'
  }
];

export const PsychologyQuiz: React.FC = () => {
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

  const getTopicBreakdown = () => {
    const topics = [...new Set(questions.map(q => q.topic))];
    return topics.map(topic => {
      const topicQuestions = questions.filter(q => q.topic === topic);
      const correctAnswers = topicQuestions.filter((q) => 
        selectedAnswers[questions.indexOf(q)] === q.correctAnswer
      ).length;
      return {
        topic,
        correct: correctAnswers,
        total: topicQuestions.length,
        percentage: Math.round((correctAnswers / topicQuestions.length) * 100)
      };
    });
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const topicBreakdown = getTopicBreakdown();
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-slate-700 rounded-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">Psychology Quiz Results</h1>
          <div className="text-6xl font-bold mb-4 text-green-400 text-center">{percentage}%</div>
          <p className="text-xl mb-8 text-center">You scored {score} out of {questions.length} questions correctly!</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-600 p-6 rounded-lg">
              <h3 className="font-semibold mb-4 text-xl">Performance by Difficulty</h3>
              <div className="space-y-2">
                {['easy', 'medium', 'hard', 'trick'].map(difficulty => {
                  const difficultyQuestions = questions.filter(q => q.difficulty === difficulty);
                  const correct = difficultyQuestions.filter((q) => 
                    selectedAnswers[questions.indexOf(q)] === q.correctAnswer
                  ).length;
                  return (
                    <div key={difficulty} className="flex justify-between">
                      <span className="capitalize">{difficulty}:</span>
                      <span>{correct}/{difficultyQuestions.length}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-slate-600 p-6 rounded-lg">
              <h3 className="font-semibold mb-4 text-xl">Grade & Feedback</h3>
              <div className="text-3xl font-bold mb-2">
                {percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F'}
              </div>
              <div className="text-sm">
                {percentage >= 90 ? 'Excellent understanding of psychology!' : 
                 percentage >= 80 ? 'Good grasp of psychological concepts!' : 
                 percentage >= 70 ? 'Decent knowledge, review key concepts!' : 
                 percentage >= 60 ? 'Keep studying the fundamentals!' : 
                 'Need significant review of psychology basics!'}
              </div>
            </div>
          </div>

          <div className="bg-slate-600 p-6 rounded-lg mb-8">
            <h3 className="font-semibold mb-4 text-xl">Performance by Topic</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {topicBreakdown.map(topic => (
                <div key={topic.topic} className="bg-slate-500 p-3 rounded">
                  <div className="font-medium text-sm mb-1">{topic.topic}</div>
                  <div className="flex justify-between text-sm">
                    <span>{topic.correct}/{topic.total}</span>
                    <span className={topic.percentage >= 70 ? 'text-green-300' : 'text-red-300'}>
                      {topic.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Take Quiz Again
            </button>
          </div>
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
          <h1 className="text-3xl font-bold">Psychology Exercise ?</h1>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty.toUpperCase()}
            </span>
            <span className="text-slate-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </div>

        {/* Topic Badge */}
        <div className="mb-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {question.topic}
          </span>
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