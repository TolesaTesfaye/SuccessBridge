import React from 'react'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { type Quiz } from '@types'
import { Clock, Play, RotateCcw, Edit2, Trash2, CheckCircle, AlertCircle } from 'lucide-react'

interface QuizCardProps {
  quiz: Quiz
  onStart?: () => void
  onEdit?: () => void
  onDelete?: () => void
  showActions?: boolean
  userScore?: number
  completed?: boolean
}

const getDifficultyConfig = (level: string) => {
  switch(level) {
    case 'Hard': return { 
      bgGradient: 'from-rose-400 to-red-500',
      textColor: 'text-rose-900',
      badgeBg: 'bg-rose-300',
      accentColor: 'rose'
    }
    case 'Medium': return { 
      bgGradient: 'from-yellow-300 to-orange-400',
      textColor: 'text-yellow-900',
      badgeBg: 'bg-yellow-200',
      accentColor: 'yellow'
    }
    default: return { 
      bgGradient: 'from-blue-300 to-purple-400',
      textColor: 'text-blue-900',
      badgeBg: 'bg-blue-200',
      accentColor: 'blue'
    }
  }
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
  const diffConfig = getDifficultyConfig(difficulty)
  const isPassed = completed && userScore !== undefined && userScore >= quiz.passingScore

  return (
    <Card className="relative h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0 bg-white dark:bg-slate-800">
      
      {/* Decorative Elements - Top Left */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-20">
        <div className="w-full h-full rounded-full border-4 border-blue-300" />
      </div>
      <div className="absolute top-2 left-2 w-12 h-12 opacity-15">
        <div className="w-full h-full bg-red-400 rounded-full" />
      </div>

      {/* Top Colored Badge Section */}
      <div className={`h-28 bg-gradient-to-br ${diffConfig.bgGradient} rounded-t-2xl relative overflow-hidden flex items-center justify-center`}>
        {/* Decorative shapes in badge */}
        <div className="absolute top-2 right-4 w-8 h-8 bg-white/20 rounded-full" />
        <div className="absolute bottom-3 left-3 w-6 h-6 bg-white/15 rounded-full" />
        
        {/* Badge Text/Label */}
        <div className={`${diffConfig.badgeBg} px-6 py-2 rounded-2xl shadow-md`}>
          <p className={`font-black text-lg italic ${diffConfig.textColor} uppercase tracking-wider`}>
            {difficulty} Quiz
          </p>
        </div>
      </div>

      <CardBody className="p-6 relative z-10 h-full flex flex-col">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
          {quiz.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 line-clamp-2 leading-relaxed">
          {quiz.description || 'Take a break and play with us'}
        </p>

        {/* Stats - Simplified */}
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Questions</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">{quiz.questions?.length || 0}</span>
          </div>
          <div className="h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1">
              <Clock size={14} /> Time Limit
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-base">{quiz.timeLimit}m</span>
          </div>
          <div className="h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400 font-medium">Pass Score</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">{quiz.passingScore}%</span>
          </div>
        </div>

        {/* Score Display */}
        {completed && userScore !== undefined && (
          <div className={`p-4 rounded-xl mb-5 border-2 ${
            isPassed 
              ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30' 
              : 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isPassed ? (
                  <>
                    <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Passed</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={16} className="text-rose-600 dark:text-rose-400" />
                    <span className="text-sm font-bold text-rose-700 dark:text-rose-300">Failed</span>
                  </>
                )}
              </div>
              <span className={`font-black text-lg ${isPassed ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                {userScore}%
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-2 mt-auto">
            {onStart && !completed && (
              <Button 
                variant="primary" 
                className="flex-1 !rounded-lg text-sm py-3 font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md border-0 text-white transition-all duration-300 hover:shadow-lg" 
                onClick={onStart}
              >
                <Play size={16} className="mr-2 inline" /> Start
              </Button>
            )}
            {onStart && completed && (
              <Button 
                variant="secondary" 
                className="flex-1 !rounded-lg text-sm py-3 font-bold border-2 border-blue-300 dark:border-blue-500/50 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all duration-300" 
                onClick={onStart}
              >
                <RotateCcw size={16} className="mr-2 inline" /> Retake
              </Button>
            )}
            {onEdit && (
              <Button 
                variant="secondary" 
                className="!rounded-lg px-3 py-3 font-bold border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300" 
                onClick={onEdit}
              >
                <Edit2 size={16} />
              </Button>
            )}
            {onDelete && (
              <Button 
                variant="danger" 
                className="!rounded-lg px-3 py-3 font-bold border border-rose-300 dark:border-rose-600 hover:bg-rose-100 dark:hover:bg-rose-700 transition-all duration-300" 
                onClick={onDelete}
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        )}
      </CardBody>

      {/* Decorative Elements - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 pointer-events-none">
        <div className="w-full h-full rounded-full border-4 border-slate-300 dark:border-slate-600" />
      </div>
    </Card>
  )
}
