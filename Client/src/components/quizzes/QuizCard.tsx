import React from 'react'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { type Quiz } from '@types'

interface QuizCardProps {
  quiz: Quiz
  onStart?: () => void
  onEdit?: () => void
  onDelete?: () => void
  showActions?: boolean
  userScore?: number
  completed?: boolean
}

export const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  onStart,
  onEdit,
  onDelete,
  showActions = true,
  userScore,
  completed = false,
}) => {
  const difficulty = quiz.questions.length > 10 ? 'Hard' : quiz.questions.length > 5 ? 'Medium' : 'Easy'
  const difficultyColor = difficulty === 'Hard' ? '#ef4444' : difficulty === 'Medium' ? '#f59e0b' : '#10b981'

  return (
    <Card hoverable className="quiz-card">
      <CardBody>
        <div className="quiz-card-content">
          <div className="quiz-header">
            <span className="quiz-icon">✏️</span>
            <span className="quiz-difficulty" style={{ borderColor: difficultyColor }}>
              {difficulty}
            </span>
          </div>

          <h3 className="quiz-title">{quiz.title}</h3>
          <p className="quiz-description">{quiz.description}</p>

          <div className="quiz-meta">
            <span className="meta-item">
              <span className="meta-label">Questions:</span>
              <span className="meta-value">{quiz.questions.length}</span>
            </span>
            <span className="meta-item">
              <span className="meta-label">Time Limit:</span>
              <span className="meta-value">{quiz.timeLimit} min</span>
            </span>
            <span className="meta-item">
              <span className="meta-label">Pass Score:</span>
              <span className="meta-value">{quiz.passingScore}%</span>
            </span>
          </div>

          {completed && userScore !== undefined && (
            <div className="quiz-score">
              <div className="score-display">
                <span className="score-label">Your Score</span>
                <span className={`score-value ${userScore >= quiz.passingScore ? 'passed' : 'failed'}`}>
                  {userScore}%
                </span>
              </div>
              <span className={`score-status ${userScore >= quiz.passingScore ? 'passed' : 'failed'}`}>
                {userScore >= quiz.passingScore ? '✓ Passed' : '✗ Failed'}
              </span>
            </div>
          )}

          {showActions && (
            <div className="quiz-actions">
              {onStart && !completed && (
                <Button variant="primary" size="sm" fullWidth onClick={onStart}>
                  Start Quiz
                </Button>
              )}
              {onStart && completed && (
                <Button variant="secondary" size="sm" fullWidth onClick={onStart}>
                  Retake Quiz
                </Button>
              )}
              {onEdit && (
                <Button variant="secondary" size="sm" fullWidth onClick={onEdit}>
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button variant="danger" size="sm" fullWidth onClick={onDelete}>
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
