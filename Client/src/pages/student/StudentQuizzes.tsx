import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { QuizList } from '@components/quizzes/QuizList'
import { QuizTaker } from '@components/quizzes/QuizTaker'
import { quizService } from '@services/quizService'
import { Quiz } from '@types'
import { Loading } from '@components/common/Loading'
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
