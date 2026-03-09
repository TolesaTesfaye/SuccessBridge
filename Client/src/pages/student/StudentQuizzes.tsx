import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { QuizList } from '@components/quizzes/QuizList'
import { QuizTaker } from '@components/quizzes/QuizTaker'
import { quizService } from '@services/quizService'
import { Quiz } from '@types'
import { Loading } from '@components/common/Loading'

export const StudentQuizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)

  const fetchQuizzes = async () => {
    try {
      setLoading(true)
      const data = await quizService.getAll()
      setQuizzes(data)
    } catch (error) {
      console.error('Failed to fetch quizzes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz)
  }

  const handleSubmitQuiz = async (results: any) => {
    try {
      if (!activeQuiz) return
      await quizService.submitResult(activeQuiz.id, {
        score: results.score,
        totalPoints: results.totalPoints,
        timeSpent: results.timeSpent,
        answers: results.answers,
        passed: results.score >= activeQuiz.passingScore
      })
      setActiveQuiz(null)
      fetchQuizzes() // Refresh to show completed state/scores
    } catch (error) {
      console.error('Failed to submit quiz:', error)
      alert('Failed to save your results. Please try again.')
    }
  }

  if (loading) return <Loading message="Preparing your assessments..." />

  if (activeQuiz) {
    return (
      <DashboardLayout title={activeQuiz.title} subtitle="Stay focused, you're doing great!">
        <div className="max-w-7xl mx-auto">
          <QuizTaker
            quiz={activeQuiz}
            onSubmit={handleSubmitQuiz}
            onCancel={() => setActiveQuiz(null)}
          />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Academic Assessments" subtitle="Challenge yourself and track your mastery">
      <div className="space-y-8 animate-fadeIn">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
          <div className="flex items-center gap-4 mb-2">
            <span className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 shadow-inner">✏️</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Available Quizzes</h2>
          </div>
          <p className="text-slate-500 font-medium">Select an assessment to begin testing your knowledge in your subjects.</p>
        </div>

        <div className="px-2">
          <QuizList
            quizzes={quizzes}
            loading={loading}
            onStart={handleStartQuiz}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
