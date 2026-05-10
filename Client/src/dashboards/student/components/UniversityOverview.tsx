import {
  ArrowRight,
  BookOpen,
  BookMarked,
  Brain,
  CalendarClock,
  Globe2,
  GraduationCap,
  Play,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Zap,
  Target,
  Clock,
  Award,
  Flame,
  CheckCircle2
} from 'lucide-react'
import { Testimonials } from '@components/common/Testimonials'
import { ResourceCard } from '@components/resources/ResourceCard'

interface UniversityOverviewProps {
  user: any
  activeCategory: string
  homeLoading: boolean
  homeResources: any[]
  setActiveTab: (tab: 'home' | 'learning' | 'hub') => void
  handleLearningCenterClick: () => void
}

export const UniversityOverview: React.FC<UniversityOverviewProps> = ({
  user,
  activeCategory,
  homeLoading,
  homeResources,
  setActiveTab,
  handleLearningCenterClick
}) => {
  const firstName = user?.name?.split(' ')[0] || 'Scholar'
  const videoCount = homeResources.filter((r: any) => r?.type === 'Video').length
  const subjectCount = new Set(homeResources.map((r: any) => r?.subject).filter(Boolean)).size

  const tracks = [
    { title: 'Core Lessons', subtitle: 'Start with guided concepts', icon: Brain, action: handleLearningCenterClick, color: 'from-indigo-500 to-blue-500' },
    { title: 'Resource Hub', subtitle: 'Explore files, videos and docs', icon: BookMarked, action: () => setActiveTab('hub'), color: 'from-emerald-500 to-teal-500' },
    { title: 'Weekly Sprint', subtitle: 'Finish 3 topics this week', icon: CalendarClock, action: handleLearningCenterClick, color: 'from-amber-500 to-orange-500' },
  ]

  const highlights = [
    { label: 'Category', value: activeCategory.toUpperCase(), icon: GraduationCap },
    { label: 'Materials', value: `${homeResources.length}`, icon: TrendingUp },
    { label: 'Subjects', value: `${subjectCount}`, icon: Globe2 },
    { label: 'Videos', value: `${videoCount}`, icon: Play },
  ]

  const achievements = [
    { icon: Flame, label: 'Study Streak', value: '7 Days', color: 'text-orange-500' },
    { icon: Target, label: 'Weekly Goal', value: '5/7 Topics', color: 'text-blue-500' },
    { icon: Trophy, label: 'Rank', value: 'Top 15%', color: 'text-amber-500' },
  ]

  const quickTips = [
    'Review your notes daily for better retention',
    'Practice with past exams to boost confidence',
    'Join study groups for collaborative learning',
  ]

  const getSubjectText = (resource: any) => {
    const rawSubject = resource?.subject
    if (typeof rawSubject === 'string') return rawSubject
    if (Array.isArray(rawSubject)) {
      return rawSubject.filter((item) => typeof item === 'string').join(' ')
    }
    if (rawSubject && typeof rawSubject === 'object') {
      return Object.values(rawSubject)
        .filter((item) => typeof item === 'string')
        .join(' ')
    }
    return ''
  }

  const getThumbnail = (resource: any) => {
    const subject = getSubjectText(resource).toLowerCase()
    if (subject.includes('math')) return 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=700&h=400&fit=crop'
    if (subject.includes('physics') || subject.includes('chem')) return 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=700&h=400&fit=crop'
    if (resource?.type === 'Video') return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=400&fit=crop'
    return 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&h=400&fit=crop'
  }

  return (
    <div className="space-y-3 md:space-y-6 pb-6 md:pb-8 animate-in fade-in duration-700">
      {/* Hero Section - Full Width */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-700 text-white p-4 md:p-8 lg:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-center">
          <div>
            <p className="inline-flex items-center gap-1.5 px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/15 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-4">
              <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" /> Personalized University Space
            </p>
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-black tracking-tight leading-tight">
              Welcome back,
              <span className="block text-blue-200">{firstName}.</span>
            </h1>
            <p className="mt-2 md:mt-4 text-xs md:text-sm lg:text-base text-blue-100/90">
              Your {activeCategory} dashboard is ready with smart recommendations, trending materials, and focused learning tracks.
            </p>
            <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3">
              <button
                onClick={handleLearningCenterClick}
                className="px-3 py-2 md:px-5 md:py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors"
              >
                Continue Learning
              </button>
              <button
                onClick={() => setActiveTab('hub')}
                className="px-3 py-2 md:px-5 md:py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors"
              >
                Open Resource Hub
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {highlights.map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg md:rounded-xl p-3 md:p-4">
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-blue-200 mb-1 md:mb-2" />
                <p className="text-xl md:text-2xl font-black">{item.value}</p>
                <p className="text-[10px] md:text-xs text-blue-100/80 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 px-2 md:px-4">
        {tracks.map((track) => (
          <button
            key={track.title}
            onClick={track.action}
            className={`text-left p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br ${track.color} text-white shadow-lg hover:shadow-xl active:scale-95 transition-all min-h-[140px] md:min-h-[160px] flex flex-col`}
          >
            <track.icon className="w-6 h-6 md:w-6 md:h-6 mb-2 md:mb-3" />
            <h3 className="font-bold text-xs md:text-lg mb-1 md:mb-1 leading-tight">{track.title}</h3>
            <p className="text-[10px] md:text-sm text-white/90 leading-relaxed">{track.subtitle}</p>
          </button>
        ))}
      </div>

      {/* Trending Materials */}
      <div className="bg-white dark:bg-slate-900/60 border-t border-b border-slate-200 dark:border-slate-800 p-3 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3 md:mb-5 px-1">
          <h2 className="text-sm md:text-xl font-bold text-slate-900 dark:text-white">Trending Materials</h2>
          <button
            onClick={() => setActiveTab('hub')}
            className="text-blue-600 dark:text-blue-400 text-[10px] md:text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all active:scale-95"
          >
            View All <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>

        {homeLoading ? (
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[200px] md:h-[350px] rounded-xl md:rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : homeResources.length === 0 ? (
          <div className="text-center py-8 md:py-16 bg-slate-50 dark:bg-slate-800/30 rounded-lg md:rounded-xl border border-dashed border-slate-200 dark:border-slate-700 mx-1">
            <BookOpen className="w-6 h-6 md:w-10 md:h-10 mx-auto text-slate-400 mb-2 md:mb-3" />
            <p className="text-slate-500 text-xs md:text-base">No resources yet. New content will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {homeResources.slice(0, 3).map((resource: any) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 px-2 md:px-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="border-t border-b border-slate-200 dark:border-slate-800 p-3 md:p-5 bg-white dark:bg-slate-900/60 rounded-lg hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3 mb-2">
              <achievement.icon className={`w-5 h-5 md:w-6 md:h-6 ${achievement.color}`} />
              <h4 className="text-[9px] md:text-xs font-semibold uppercase tracking-wide text-slate-500 leading-tight">{achievement.label}</h4>
            </div>
            <p className="text-base md:text-3xl font-black text-slate-900 dark:text-white">{achievement.value}</p>
          </div>
        ))}
      </div>

      {/* Study Tips Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 p-4 md:p-6 rounded-xl md:rounded-2xl mx-2 md:mx-4">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white">Quick Study Tips</h3>
        </div>
        <div className="space-y-2 md:space-y-3">
          {quickTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2 md:gap-3">
              <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Testimonials */}
      <Testimonials />
    </div>
  )
}
