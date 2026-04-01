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
    <div className="space-y-10 pb-16 animate-in fade-in duration-700">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-700 text-white p-8 md:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Personalized University Space
            </p>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">
              Welcome back,
              <span className="block text-blue-200">{firstName}.</span>
            </h1>
            <p className="mt-4 text-blue-100/90 max-w-xl">
              Your {activeCategory} dashboard is ready with smart recommendations, trending materials, and focused learning tracks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('learning')}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest transition-colors"
              >
                Continue Learning
              </button>
              <button
                onClick={() => setActiveTab('hub')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-black text-xs uppercase tracking-widest transition-colors"
              >
                Open Resource Hub
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {highlights.map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                <item.icon className="w-4 h-4 text-blue-200 mb-2" />
                <p className="text-2xl font-black">{item.value}</p>
                <p className="text-xs text-blue-100/80 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <button
            key={track.title}
            onClick={track.action}
            className={`text-left p-6 rounded-2xl bg-gradient-to-br ${track.color} text-white shadow-lg hover:scale-[1.01] transition-transform`}
          >
            <track.icon className="w-6 h-6 mb-4" />
            <h3 className="font-black text-lg">{track.title}</h3>
            <p className="text-sm text-white/80">{track.subtitle}</p>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Trending Materials</h2>
          <button
            onClick={() => setActiveTab('hub')}
            className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-2"
          >
            Explore all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {homeLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[380px] rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : homeResources.length === 0 ? (
          <div className="text-center py-14 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <BookOpen className="w-10 h-10 mx-auto text-slate-400 mb-3" />
            <p className="text-slate-500 font-semibold">No resources yet. New content will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeResources.slice(0, 3).map((resource: any) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900/60">
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">Daily Momentum</h4>
          <p className="text-3xl font-black text-slate-900 dark:text-white">+24%</p>
          <p className="text-sm text-slate-500 mt-1">You are ahead compared to last week.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900/60">
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">Achievement</h4>
          <p className="flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
            <Trophy className="w-5 h-5 text-amber-500" /> Consistency Streak
          </p>
          <p className="text-sm text-slate-500 mt-1">Keep your learning streak active this week.</p>
        </div>
      </div>

      <Testimonials />
    </div>
  )
}
