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
  Zap
} from 'lucide-react'
import { Testimonials } from '@components/common/Testimonials'
import { ResourceCard } from '@components/resources/ResourceCard'

interface UniversityOverviewProps {
  user: any
  activeCategory: string
  homeLoading: boolean
  homeResources: any[]
  setActiveTab: (tab: 'home' | 'learning' | 'hub') => void
}

export const UniversityOverview: React.FC<UniversityOverviewProps> = ({
  user,
  activeCategory,
  homeLoading,
  homeResources,
  setActiveTab
}) => {
  const firstName = user?.name?.split(' ')[0] || 'Scholar'
  const videoCount = homeResources.filter((r: any) => r?.type === 'Video').length
  const subjectCount = new Set(homeResources.map((r: any) => r?.subject).filter(Boolean)).size

  const tracks = [
    { title: 'Core Lessons', subtitle: 'Start with guided concepts', icon: Brain, action: () => setActiveTab('learning'), color: 'from-indigo-500 to-blue-500' },
    { title: 'Resource Hub', subtitle: 'Explore files, videos and docs', icon: BookMarked, action: () => setActiveTab('hub'), color: 'from-emerald-500 to-teal-500' },
    { title: 'Weekly Sprint', subtitle: 'Finish 3 topics this week', icon: CalendarClock, action: () => setActiveTab('learning'), color: 'from-amber-500 to-orange-500' },
  ]

  const highlights = [
    { label: 'Category', value: activeCategory.toUpperCase(), icon: GraduationCap },
    { label: 'Materials', value: `${homeResources.length}`, icon: TrendingUp },
    { label: 'Subjects', value: `${subjectCount}`, icon: Globe2 },
    { label: 'Videos', value: `${videoCount}`, icon: Play },
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
    <div className="space-y-4 md:space-y-6 pb-8 md:pb-16 animate-in fade-in duration-700">
      {/* Quick Stats - Mobile Optimized */}
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {highlights.map((item) => (
          <div key={item.label} className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 md:p-4 shadow-sm">
            <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
            <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{item.value}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wide font-semibold">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Action Cards - Mobile First */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {tracks.map((track) => (
          <button
            key={track.title}
            onClick={track.action}
            className={`text-left p-4 rounded-xl bg-gradient-to-br ${track.color} text-white shadow-lg hover:shadow-xl active:scale-95 transition-all`}
          >
            <track.icon className="w-6 h-6 mb-3" />
            <h3 className="font-bold text-base mb-1">{track.title}</h3>
            <p className="text-xs text-white/90">{track.subtitle}</p>
          </button>
        ))}
      </div>

      {/* Trending Materials */}
      <div className="bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Trending Materials</h2>
          <button
            onClick={() => setActiveTab('hub')}
            className="text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {homeLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[320px] rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : homeResources.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-2" />
            <p className="text-slate-500 text-sm">No resources yet. New content will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {homeResources.slice(0, 3).map((resource: any) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900/60 shadow-sm">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Daily Momentum</h4>
          <p className="text-3xl font-black text-slate-900 dark:text-white">+24%</p>
          <p className="text-xs text-slate-500 mt-1">You are ahead compared to last week.</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900/60 shadow-sm">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Achievement</h4>
          <p className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
            <Trophy className="w-5 h-5 text-amber-500" /> Consistency Streak
          </p>
          <p className="text-xs text-slate-500 mt-1">Keep your learning streak active this week.</p>
        </div>
      </div>
    </div>
  )
}
