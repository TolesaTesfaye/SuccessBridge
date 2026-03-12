import React from 'react'
import { type Quiz } from '@types'
import { QuizCard } from './QuizCard'
import { Pagination } from '@components/common/Pagination'
import { Loading } from '@components/common/Loading'
import { Target } from 'lucide-react'

interface QuizListProps {
  quizzes: Quiz[]
  loading?: boolean
  onStart?: (quiz: Quiz) => void
  onEdit?: (quiz: Quiz) => void
  onDelete?: (quiz: Quiz) => void
  showActions?: boolean
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  userScores?: Record<string, number>
  completedQuizzes?: string[]
}

export const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  loading = false,
  onStart,
  onEdit,
  onDelete,
  showActions = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  userScores = {},
  completedQuizzes = [],
}) => {
  if (loading) {
    return <Loading message="Loading quizzes..." />
  }

  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mb-6">
          <Target size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Assessments Built Yet</h3>
        <p className="text-slate-500 font-medium max-w-md">You're currently all caught up on your assessments. Check back later for new tests.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {quizzes.map(quiz => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onStart={() => onStart?.(quiz)}
            onEdit={() => onEdit?.(quiz)}
            onDelete={() => onDelete?.(quiz)}
            showActions={showActions}
            userScore={userScores[quiz.id]}
            completed={completedQuizzes.includes(quiz.id)}
          />
        ))}
      </div>

      {totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}
