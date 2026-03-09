import React from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'

interface QuizResultsProps {
  score: number
  totalPoints: number
  passingScore: number
  questionsAnswered: number
  totalQuestions: number
  timeSpent: number
  onRetake?: () => void
  onBack?: () => void
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalPoints,
  passingScore,
  questionsAnswered,
  totalQuestions,
  timeSpent,
  onRetake,
  onBack,
}) => {
  const percentage = Math.round((score / totalPoints) * 100)
  const passed = percentage >= passingScore
  const accuracy = Math.round((questionsAnswered / totalQuestions) * 100)
  const minutes = Math.floor(timeSpent / 60)
  const seconds = timeSpent % 60

  const getPerformanceLevel = (pct: number) => {
    if (pct >= 90) return { level: 'Excellent', color: '#10b981' }
    if (pct >= 80) return { level: 'Very Good', color: '#3b82f6' }
    if (pct >= 70) return { level: 'Good', color: '#f59e0b' }
    if (pct >= 60) return { level: 'Fair', color: '#f59e0b' }
    return { level: 'Needs Improvement', color: '#ef4444' }
  }

  const performance = getPerformanceLevel(percentage)

  return (
    <div className="quiz-results">
      <div className="results-header">
        <div className={`results-badge ${passed ? 'passed' : 'failed'}`}>
          {passed ? '✓' : '✗'}
        </div>
        <h1 className={`results-title ${passed ? 'passed' : 'failed'}`}>
          {passed ? 'Quiz Passed!' : 'Quiz Failed'}
        </h1>
        <p className="results-subtitle">
          {passed ? 'Great job! You passed the quiz.' : 'You did not meet the passing score. Try again!'}
        </p>
      </div>

      <div className="results-grid">
        <Card>
          <CardBody>
            <div className="result-item">
              <span className="result-label">Your Score</span>
              <div className="score-circle" style={{ borderColor: performance.color }}>
                <span className="score-percentage">{percentage}%</span>
              </div>
              <span className="score-details">{score} / {totalPoints} points</span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="result-item">
              <span className="result-label">Performance</span>
              <span className="performance-level" style={{ color: performance.color }}>
                {performance.level}
              </span>
              <span className="performance-description">
                {percentage >= passingScore ? 'Above passing score' : 'Below passing score'}
              </span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="result-item">
              <span className="result-label">Accuracy</span>
              <span className="accuracy-value">{accuracy}%</span>
              <span className="accuracy-details">
                {questionsAnswered} of {totalQuestions} answered
              </span>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="result-item">
              <span className="result-label">Time Spent</span>
              <span className="time-value">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
              <span className="time-details">minutes</span>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>Summary</CardHeader>
        <CardBody>
          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Passing Score Required:</span>
              <span className="summary-value">{passingScore}%</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Your Score:</span>
              <span className={`summary-value ${passed ? 'passed' : 'failed'}`}>
                {percentage}%
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Status:</span>
              <span className={`summary-value ${passed ? 'passed' : 'failed'}`}>
                {passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="results-actions">
        {onRetake && (
          <Button variant="primary" onClick={onRetake}>
            Retake Quiz
          </Button>
        )}
        {onBack && (
          <Button variant="secondary" onClick={onBack}>
            Back to Quizzes
          </Button>
        )}
      </div>
    </div>
  )
}
