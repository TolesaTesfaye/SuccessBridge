import React, { useMemo } from 'react'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Trophy, Target, Clock, CheckCircle2, XCircle, RotateCcw, Home, Sparkles, Star, Zap } from 'lucide-react'

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

  const performance = useMemo(() => {
    if (percentage >= 90) return { level: 'Legendary', color: 'emerald', icon: <Trophy className="w-12 h-12" />, tagline: "Absolute mastery! You've conquered this challenge." }
    if (percentage >= 80) return { level: 'Pro Scholar', color: 'blue', icon: <Star className="w-12 h-12" />, tagline: "Outstanding performance! You're ahead of the curve." }
    if (percentage >= 70) return { level: 'Solid Work', color: 'amber', icon: <CheckCircle2 className="w-12 h-12" />, tagline: "Great effort! A few tweaks and you'll be perfect." }
    if (percentage >= passingScore) return { level: 'Passed', color: 'indigo', icon: <Zap className="w-12 h-12" />, tagline: "You made it! Keep practicing to excel." }
    return { level: 'Keep Pushing', color: 'rose', icon: <RotateCcw className="w-12 h-12" />, tagline: "Don't give up! Every failure is a step toward success." }
  }, [percentage, passingScore])

  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-8 animate-fadeIn pb-12 md:pb-20 px-4">
      {/* Hero Result Section */}
      <div className={`relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl md:rounded-[48px] border border-slate-100 dark:border-white/5 shadow-2xl p-6 md:p-16 text-center space-y-4 md:space-y-8`}>
        {/* Animated Background Orbs */}
        <div className={`absolute -top-24 -right-24 w-64 h-64 bg-${performance.color}-500/10 blur-[100px] rounded-full`} />
        <div className={`absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full`} />

        <div className={`w-16 h-16 md:w-24 md:h-24 bg-${performance.color}-50 dark:bg-${performance.color}-500/10 text-${performance.color}-600 dark:text-${performance.color}-400 rounded-2xl md:rounded-[32px] flex items-center justify-center mx-auto shadow-xl ring-4 md:ring-8 ring-${performance.color}-500/5 animate-pop mb-6 md:mb-10`}>
          <div className="scale-75 md:scale-100">{performance.icon}</div>
        </div>

        <div className="space-y-2 md:space-y-4 relative z-10">
          <h1 className="text-2xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {performance.level}
          </h1>
          <p className="text-sm md:text-xl font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed px-4">
            {performance.tagline}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 relative z-10">
          <div className="px-6 py-3 md:px-8 md:py-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total Score</span>
            <span className={`text-2xl md:text-4xl font-black text-${performance.color}-600 dark:text-${performance.color}-400`}>{percentage}%</span>
          </div>
          <div className="w-[2px] h-8 md:w-12 md:h-[2px] bg-slate-100 dark:bg-slate-800 rounded-full" />
          <div className="px-6 py-3 md:px-8 md:py-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</span>
            <span className={`text-base md:text-xl font-black uppercase tracking-tight ${passed ? 'text-emerald-500' : 'text-rose-500'}`}>
              {passed ? 'Passed' : 'Not Passed'}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        <Card className="rounded-2xl md:rounded-[36px] border-none shadow-xl shadow-slate-200/40 dark:shadow-none hover:scale-[1.02] transition-transform">
          <CardBody className="p-5 md:p-8 space-y-3 md:space-y-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl md:rounded-2xl flex items-center justify-center">
              <Target className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Accuracy</h4>
              <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">{accuracy}%</p>
              <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 md:mt-2">{questionsAnswered} of {totalQuestions} answered</p>
            </div>
          </CardBody>
        </Card>

        <Card className="rounded-2xl md:rounded-[36px] border-none shadow-xl shadow-slate-200/40 dark:shadow-none hover:scale-[1.02] transition-transform">
          <CardBody className="p-5 md:p-8 space-y-3 md:space-y-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl md:rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Points Earned</h4>
              <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">{score} / {totalPoints}</p>
              <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 md:mt-2">Targeting {passingScore}% for mastery</p>
            </div>
          </CardBody>
        </Card>

        <Card className="rounded-2xl md:rounded-[36px] border-none shadow-xl shadow-slate-200/40 dark:shadow-none hover:scale-[1.02] transition-transform">
          <CardBody className="p-5 md:p-8 space-y-3 md:space-y-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl md:rounded-2xl flex items-center justify-center">
              <Clock className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Time Invested</h4>
              <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {minutes}m {seconds}s
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 md:mt-2">Great focus shown today</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
        {onRetake && (
          <Button 
            variant="primary" 
            onClick={onRetake}
            className="flex-1 h-12 md:h-16 rounded-xl md:rounded-[24px] bg-slate-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 shadow-xl shadow-blue-500/20 font-black uppercase tracking-widest text-xs md:text-sm"
          >
            <RotateCcw className="mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5" /> Retake Challenge
          </Button>
        )}
        {onBack && (
          <Button 
            variant="secondary" 
            onClick={onBack}
            className="flex-1 h-12 md:h-16 rounded-xl md:rounded-[24px] bg-white dark:bg-slate-800/40 border-2 border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-black uppercase tracking-widest text-xs md:text-sm"
          >
            <Home className="mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5" /> Continue Education
          </Button>
        )}
      </div>

      {/* Decorative Sparkle Component at Bottom */}
      <div className="pt-10 flex justify-center opacity-20">
        <Sparkles className="w-12 h-12 text-blue-500 animate-pulse" />
      </div>
    </div>
  )
}
