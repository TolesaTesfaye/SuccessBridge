import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { QuizList } from '@components/quizzes/QuizList'
import { QuizTaker } from '@components/quizzes/QuizTaker'
import { AIQuizGenerator } from '@components/quizzes/AIQuizGenerator'
import { quizService } from '@services/quizService'
import { Quiz } from '@types'
import { Loading } from '@components/common/Loading'
import { useAuthStore } from '@store/authStore'
import { BookOpen, Sparkles } from 'lucide-react'

export const StudentQuizzes: React.FC = () => {
  const { user } = useAuthStore()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [activeTab, setActiveTab] = useState<'official' | 'ai'>('official')

  const fetchQuizzes = async () => {
    try {
      setLoading(true)
      const params = {
        educationLevel: user?.studentType,
        grade: user?.studentType === 'university' ? user?.universityLevel : user?.highSchoolGrade,
        stream: user?.studentType === 'high_school' ? user?.highSchoolStream : undefined,
      }
      const data = await quizService.getAll(params)
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
        answers: results.answers
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
      <div className="max-w-7xl mx-auto px-2 mb-6">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('official')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'official'
                ? 'bg-white dark:bg-[#0B1121] text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Official Quizzes
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'ai'
                ? 'bg-white dark:bg-[#0B1121] text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Custom Practice
          </button>
        </div>
      </div>

      <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-12">
        <div className="px-2">
          {activeTab === 'official' ? (
            <QuizList
              quizzes={quizzes}
              loading={loading}
              onStart={handleStartQuiz}
            />
          ) : (
            <AIQuizGenerator />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
