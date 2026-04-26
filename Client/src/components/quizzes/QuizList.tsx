import React from 'react'
import { type Quiz } from '@types'
import { Pagination } from '@components/common/Pagination'
import { Loading } from '@components/common/Loading'
import { Target, Clock, FileText, CheckCircle, XCircle, Play, RotateCcw, Edit2, Trash2 } from 'lucide-react'

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

  const getDifficulty = (quiz: Quiz) => {
    const questionCount = quiz.questions?.length || 0
    return questionCount > 10 ? 'Hard' : questionCount > 5 ? 'Medium' : 'Easy'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Hard': return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'
      case 'Medium': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10'
      default: return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
    }
  }

  return (
    <div className="space-y-6">
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Quiz Title
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Time Limit
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Pass Score
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                {showActions && (
                  <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {quizzes.map((quiz) => {
                const difficulty = getDifficulty(quiz)
                const completed = completedQuizzes.includes(quiz.id)
                const userScore = userScores[quiz.id]
                const isPassed = completed && userScore !== undefined && userScore >= quiz.passingScore

                return (
                  <tr 
                    key={quiz.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <FileText size={20} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 line-clamp-1">
                            {quiz.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                            {quiz.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {quiz.questions?.length || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                        <Clock size={14} className="text-slate-400" />
                        {quiz.timeLimit}m
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {quiz.passingScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {completed && userScore !== undefined ? (
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                          isPassed 
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                            : 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400'
                        }`}>
                          {isPassed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                          {userScore}%
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                          Not Started
                        </span>
                      )}
                    </td>
                    {showActions && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {onStart && (
                            <button
                              onClick={() => onStart(quiz)}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                completed
                                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {completed ? (
                                <>
                                  <RotateCcw size={14} />
                                  Retake
                                </>
                              ) : (
                                <>
                                  <Play size={14} />
                                  Start
                                </>
                              )}
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={() => onEdit(quiz)}
                              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={14} />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(quiz)}
                              className="p-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile List View */}
      <div className="md:hidden space-y-3">
        {quizzes.map((quiz) => {
          const difficulty = getDifficulty(quiz)
          const completed = completedQuizzes.includes(quiz.id)
          const userScore = userScores[quiz.id]
          const isPassed = completed && userScore !== undefined && userScore >= quiz.passingScore

          return (
            <div 
              key={quiz.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3"
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 line-clamp-1">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {quiz.description}
                  </p>
                </div>
                <span className={`px-2 py-1 text-[10px] font-bold rounded-full shrink-0 ${getDifficultyColor(difficulty)}`}>
                  {difficulty}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <FileText size={12} />
                  <span className="font-semibold">{quiz.questions?.length || 0} Q's</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <Clock size={12} />
                  <span className="font-semibold">{quiz.timeLimit}m</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Pass: {quiz.passingScore}%</span>
                </div>
              </div>

              {/* Status */}
              {completed && userScore !== undefined && (
                <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                  isPassed 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                    : 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400'
                }`}>
                  <div className="flex items-center gap-2 text-xs font-bold">
                    {isPassed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {isPassed ? 'Passed' : 'Failed'}
                  </div>
                  <span className="text-sm font-black">{userScore}%</span>
                </div>
              )}

              {/* Actions */}
              {showActions && (
                <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                  {onStart && (
                    <button
                      onClick={() => onStart(quiz)}
                      className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                        completed
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {completed ? (
                        <>
                          <RotateCcw size={14} />
                          Retake
                        </>
                      ) : (
                        <>
                          <Play size={14} />
                          Start Quiz
                        </>
                      )}
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(quiz)}
                      className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(quiz)}
                      className="px-3 py-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
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
