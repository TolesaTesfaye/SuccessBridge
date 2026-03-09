import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { QuizList } from '@components/quizzes/QuizList'
import { Button } from '@components/common/Button'
import { AdminQuizCreator } from '@components/quizzes/AdminQuizCreator'
import { quizService, Quiz } from '@services/quizService'

export const AdminQuizzes: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

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

  if (isCreating) {
    return (
      <DashboardLayout
        title="Create New Quiz"
        subtitle="Build an engaging assessment for your students"
      >
        <AdminQuizCreator
          onClose={() => setIsCreating(false)}
          onSuccess={() => {
            setIsCreating(false)
            fetchQuizzes()
          }}
        />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Quizzes" subtitle="Architect and manage academic assessments">
      <div className="space-y-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 shadow-inner">✏️</span>
              Assessment Registry
            </h2>
            <p className="text-slate-500 font-medium mt-1">Manage all available quizzes and track their performance</p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsCreating(true)}
            className="h-14 px-8 rounded-2xl shadow-lg shadow-blue-500/20"
          >
            Deploy New Quiz
          </Button>
        </div>

        <div className="bg-transparent">
          <QuizList
            quizzes={quizzes}
            loading={loading}
            onDelete={async (quiz) => {
              if (confirm('Are you sure you want to delete this quiz?')) {
                await quizService.delete(quiz.id)
                fetchQuizzes()
              }
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
