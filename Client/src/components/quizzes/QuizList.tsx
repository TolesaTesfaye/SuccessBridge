import React from 'react'
import { type Quiz } from '@types'
import { QuizCard } from './QuizCard'
import { Pagination } from '@components/common/Pagination'
import { Loading } from '@components/common/Loading'

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
      <div className="quiz-list-empty">
        <div className="empty-icon">✏️</div>
        <h3>No quizzes found</h3>
        <p>Check back later for new quizzes or create one</p>
      </div>
    )
  }

  return (
    <div className="quiz-list">
      <div className="quiz-grid">
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
