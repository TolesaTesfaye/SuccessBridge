import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { QuizList } from '@components/quizzes/QuizList'
import { QuizTaker } from '@components/quizzes/QuizTaker'
import { quizService } from '@services/quizService'
import { Quiz } from '@types'
import { Loading } from '@components/common/Loading'
import { BrainCircuit, PenTool } from 'lucide-react'
import { useAuthStore } from '@store/authStore'

export const StudentQuizzes: React.FC = () => {
  const { user } = useAuthStore()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)

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
      <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-12">
        {/* Premium Header Banner */}
        <div className="relative rounded-[32px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
          
          <div className="p-8 sm:p-10 relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0 transform -rotate-3 transition-transform hover:rotate-0">
                <BrainCircuit size={32} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Assessments</span>
                </h2>
                <p className="text-slate-500 font-medium mt-1">
                  Sharpen your skills. Select an assessment to test your knowledge.
                </p>
              </div>
            </div>
            
            <div className="hidden sm:block shrink-0 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total Available</p>
              <div className="flex items-center gap-2">
                <PenTool size={16} className="text-blue-500" />
                <span className="text-xl font-black text-slate-800 dark:text-white">{quizzes.length} Quizzes</span>
              </div>
            </div>
          </div>
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
