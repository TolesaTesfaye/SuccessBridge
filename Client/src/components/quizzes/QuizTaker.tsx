import React, { useState, useEffect } from 'react'
import { type Quiz } from '@services/quizService'
import { ChevronRight, Timer, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@components/common/Button'
import { Loading } from '@components/common/Loading'

interface QuizTakerProps {
  quiz: Quiz
  onSubmit: (results: { score: number; totalPoints: number; timeSpent: number; answers: Record<string, string> }) => void
  onCancel?: () => void
  loading?: boolean
}

export const QuizTaker: React.FC<QuizTakerProps> = ({ quiz, onSubmit, onCancel, loading = false }) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60)
  const [showConfirm, setShowConfirm] = useState(false)

  const currentQuestion = quiz.questions[currentIdx]
  const progress = ((currentIdx + 1) / quiz.questions.length) * 100

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }))
  }

  const handleNext = () => {
    if (currentIdx < quiz.questions.length - 1) {
      setCurrentIdx(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const calculateAndSubmit = (finalAnswers = answers) => {
    let score = 0
    let totalPoints = 0

    quiz.questions.forEach((q: any) => {
      totalPoints += q.points
      if (finalAnswers[q.id] === q.correctAnswer) {
        score += q.points
      }
    })

    const timeSpent = quiz.timeLimit * 60 - timeLeft
    onSubmit({
      score: Math.round((score / totalPoints) * 100),
      totalPoints,
      timeSpent,
      answers: finalAnswers
    })
  }

  const handleSubmit = () => {
    if (Object.keys(answers).length === quiz.questions.length) {
      calculateAndSubmit()
    } else {
      setShowConfirm(true)
    }
  }

  if (loading) return <Loading message="Analyzing your brilliance..." />

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-0 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white dark:bg-slate-900 p-3 md:p-6 md:rounded-2xl shadow-sm mb-0 md:mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 md:px-3 md:py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-[10px] md:text-xs font-semibold">
                Step {currentIdx + 1} of {quiz.questions.length}
              </span>
              <span className="text-slate-600 dark:text-slate-400 font-medium text-[10px] md:text-xs hidden md:inline">
                {quiz.title}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Timer size={14} className="md:w-[18px] md:h-[18px]" />
              <span className="font-mono font-bold text-xs md:text-sm">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1.5 md:h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-800 dark:bg-slate-200 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-900 p-4 md:p-12 md:rounded-2xl shadow-sm">
          <div className="space-y-5 md:space-y-8">
            {/* Question */}
            <h2 className="text-sm md:text-2xl font-bold text-slate-800 dark:text-slate-200 leading-tight">
              {currentQuestion.text}
            </h2>

            {/* Answer Options */}
            <div className="space-y-2 md:space-y-3">
              {currentQuestion.type === 'multiple_choice' && (
                <>
                  {currentQuestion.options?.map((option, idx) => {
                    const isSelected = answers[currentQuestion.id] === option
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-2.5 md:p-5 rounded-lg md:rounded-xl text-left transition-all duration-200 border-2 ${
                          isSelected
                            ? 'bg-slate-800 dark:bg-slate-200 border-slate-800 dark:border-slate-200 text-white dark:text-slate-900'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <span className="text-xs md:text-base font-medium">{option}</span>
                      </button>
                    )
                  })}
                </>
              )}

              {currentQuestion.type === 'short_answer' && (
                <input
                  type="text"
                  className="w-full p-2.5 md:p-5 rounded-lg md:rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 outline-none text-xs md:text-base text-slate-900 dark:text-white transition-colors"
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
              )}

              {currentQuestion.type === 'essay' && (
                <textarea
                  className="w-full p-2.5 md:p-5 rounded-lg md:rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 outline-none text-xs md:text-base text-slate-900 dark:text-white transition-colors min-h-[120px] md:min-h-[200px] resize-none"
                  placeholder="Share your detailed thoughts here..."
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
              )}
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-4 md:pt-6">
              <button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className="px-4 py-2 md:px-8 md:py-3 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm flex items-center gap-1.5 md:gap-2 hover:bg-slate-700 dark:hover:bg-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {currentIdx === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                <ChevronRight size={14} className="md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full p-5 md:p-8 rounded-xl md:rounded-2xl shadow-2xl">
            <div className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full mx-auto mb-2 md:mb-4">
              <AlertCircle size={20} className="md:w-8 md:h-8" />
            </div>
            <h3 className="text-base md:text-xl font-bold text-slate-900 dark:text-white text-center mb-2">
              Incomplete Quiz
            </h3>
            <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 text-center mb-4 md:mb-6">
              You've answered {Object.keys(answers).length} of {quiz.questions.length} questions. 
              Submit anyway?
            </p>
            <div className="flex gap-2 md:gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setShowConfirm(false)} 
                className="flex-1 text-xs md:text-sm py-2 md:py-2.5"
              >
                Continue Quiz
              </Button>
              <Button 
                variant="primary" 
                onClick={() => calculateAndSubmit()} 
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-xs md:text-sm py-2 md:py-2.5"
              >
                Submit Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
