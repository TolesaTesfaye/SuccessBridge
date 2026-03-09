import React, { useState, useEffect } from 'react'
import { type Quiz } from '@services/quizService'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Loading } from '@components/common/Loading'
import { ChevronLeft, ChevronRight, Timer, CheckCircle2, AlertCircle, Map as MapIcon } from 'lucide-react'

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
  const progress = ((Object.keys(answers).length) / quiz.questions.length) * 100

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
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none sticky top-4 z-30 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {onCancel && (
            <Button
              variant="secondary"
              onClick={onCancel}
              className="w-12 h-12 rounded-2xl flex items-center justify-center p-0 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <MapIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">{quiz.title}</h1>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Question {currentIdx + 1} of {quiz.questions.length} • Stay focused!
            </p>
          </div>
        </div>

        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-500 ${timeLeft < 300
          ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 animate-pulse'
          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-300'
          }`}>
          <Timer className="w-5 h-5" />
          <span className="text-xl font-black font-mono tracking-tighter">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress & Question Map */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {/* Question Card */}
          <Card className="border-none shadow-2xl shadow-slate-200/40 dark:shadow-none rounded-[40px] overflow-hidden">
            <div className="h-2 bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <CardBody className="p-10 md:p-16">
              <div className="space-y-10">
                <div className="flex items-center gap-3">
                  <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {currentQuestion.type.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {currentQuestion.points} Points available
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  {currentQuestion.text}
                </h2>

                <div className="space-y-4">
                  {currentQuestion.type === 'multiple_choice' && (
                    <div className="grid grid-cols-1 gap-4">
                      {currentQuestion.options?.map((option, idx) => {
                        const isSelected = answers[currentQuestion.id] === option
                        return (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            className={`flex items-center gap-4 p-6 rounded-3xl border-2 transition-all duration-300 text-left group ${isSelected
                              ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20 translate-x-2'
                              : 'bg-white dark:bg-slate-800/40 border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-blue-500/30 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:translate-x-1'
                              }`}
                          >
                            <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                              }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-lg font-bold">{option}</span>
                            {isSelected && <CheckCircle2 className="ml-auto w-6 h-6 text-white" />}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {currentQuestion.type === 'short_answer' && (
                    <input
                      type="text"
                      className="w-full px-8 py-6 rounded-[28px] bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-100 dark:border-white/5 focus:border-blue-500/50 focus:ring-8 focus:ring-blue-500/5 outline-none text-xl font-bold text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
                      placeholder="Type your answer here..."
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                    />
                  )}

                  {currentQuestion.type === 'essay' && (
                    <textarea
                      className="w-full px-8 py-6 rounded-[32px] bg-slate-50 dark:bg-slate-800/40 border-2 border-slate-100 dark:border-white/5 focus:border-blue-500/50 focus:ring-8 focus:ring-blue-500/5 outline-none text-lg font-medium text-slate-900 dark:text-white transition-all min-h-[300px] placeholder:text-slate-400"
                      placeholder="Share your detailed thoughts here..."
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                    />
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <Button
              variant="secondary"
              onClick={() => setCurrentIdx(prev => prev - 1)}
              disabled={currentIdx === 0}
              className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs"
            >
              <ChevronLeft className="mr-2 w-5 h-5" /> Previous
            </Button>

            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Navigation Map</span>
              <div className="h-1 w-12 bg-slate-100 dark:bg-slate-800 rounded-full" />
            </div>

            {currentIdx === quiz.questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="h-14 px-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 font-black uppercase tracking-widest text-xs"
              >
                Complete Submission <CheckCircle2 className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="h-14 px-10 rounded-2xl shadow-lg shadow-blue-500/20 font-black uppercase tracking-widest text-xs"
              >
                Next Challenge <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar Question Map */}
        <aside className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-blue-500" /> Exam Map
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-3">
              {quiz.questions.map((q, idx) => {
                const isAnswered = !!answers[q.id]
                const isActive = idx === currentIdx
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-12 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300 border-2 ${isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25 scale-110'
                      : isAnswered
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500/30 text-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-white/5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    {idx + 1}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                Answered
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                Current
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <div className="w-3 h-3 rounded-md bg-slate-50 dark:bg-slate-800 border dark:border-white/5" />
                Remaining
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Confirmation Overlay */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full p-10 rounded-[40px] shadow-2xl border border-slate-100 dark:border-white/5 text-center space-y-8 animate-scaleIn">
            <div className="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-3xl flex items-center justify-center mx-auto ring-8 ring-rose-500/5">
              <AlertCircle className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Partial Submission?</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                You've completed <span className="font-black text-blue-600 dark:text-blue-400">{Object.keys(answers).length}</span> of {quiz.questions.length} questions. Are you ready to finalize your result?
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={() => setShowConfirm(false)} className="flex-1 h-14 rounded-2xl font-bold">
                Continue Test
              </Button>
              <Button variant="primary" onClick={() => calculateAndSubmit()} className="flex-1 h-14 rounded-2xl bg-rose-600 hover:bg-rose-700 font-bold">
                Finalize Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
