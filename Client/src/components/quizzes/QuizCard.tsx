import React from 'react'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { type Quiz } from '@types'
import { Clock, CheckCircle, XCircle, FileText, Play, RotateCcw, Edit2, Trash2 } from 'lucide-react'

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
  const difficulty = quiz.questions?.length > 10 ? 'Hard' : quiz.questions?.length > 5 ? 'Medium' : 'Easy'
  
  const getDifficultyConfig = (level: string) => {
    switch(level) {
      case 'Hard': return { color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-200 dark:border-rose-500/20' }
      case 'Medium': return { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20' }
      default: return { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20' }
    }
  }
  
  const diffConfig = getDifficultyConfig(difficulty)
  const isPassed = completed && userScore !== undefined && userScore >= quiz.passingScore

  return (
    <Card hoverable className="group relative overflow-hidden border-none shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
      
      {/* Top Banner indicating status */}
      {completed && (
        <div className={`absolute top-0 left-0 w-full h-1.5 ${isPassed ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      )}
      
      <CardBody className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm shrink-0">
            <FileText size={24} />
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${diffConfig.bg} ${diffConfig.color} ${diffConfig.border} uppercase tracking-wider`}>
            {difficulty}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {quiz.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {quiz.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5">
          <div className="text-center">
            <span className="block text-xs font-semibold text-slate-400 uppercase mb-1">Q's</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{quiz.questions?.length || 0}</span>
          </div>
          <div className="text-center border-l-2 border-r-2 border-slate-200 dark:border-slate-700">
            <span className="block text-xs font-semibold text-slate-400 uppercase mb-1 flex items-center justify-center gap-1"><Clock size={10}/> Time</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{quiz.timeLimit}m</span>
          </div>
          <div className="text-center">
            <span className="block text-xs font-semibold text-slate-400 uppercase mb-1">Pass</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{quiz.passingScore}%</span>
          </div>
        </div>

        {completed && userScore !== undefined && (
          <div className={`flex items-center justify-between p-3 rounded-xl mb-6 ${isPassed ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400'}`}>
            <div className="flex items-center gap-2">
              {isPassed ? <CheckCircle size={18} /> : <XCircle size={18} />}
              <span className="font-bold text-sm">{isPassed ? 'Passed' : 'Failed'}</span>
            </div>
            <span className="font-black text-lg">{userScore}%</span>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 mt-auto">
            {onStart && !completed && (
              <Button variant="primary" className="flex-1 !rounded-xl text-sm" onClick={onStart}>
                <Play size={16} className="mr-2 inline" /> Start
              </Button>
            )}
            {onStart && completed && (
              <Button variant="secondary" className="flex-1 !rounded-xl text-sm" onClick={onStart}>
                <RotateCcw size={16} className="mr-2 inline" /> Retake
              </Button>
            )}
            {onEdit && (
              <Button variant="secondary" className="flex-1 !rounded-xl text-sm" onClick={onEdit}>
                <Edit2 size={16} className="mr-2 inline" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="danger" className="!rounded-xl px-3 group-hover:bg-rose-600 transition-colors" onClick={onDelete}>
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  )
}
