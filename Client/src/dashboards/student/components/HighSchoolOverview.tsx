import { ArrowRight, BookOpen, BrainCircuit, CalendarCheck, FileText, Flame, GraduationCap, Library, Play, Sparkles, Star, Target, Trophy, Clock, Award, CheckCircle2, Zap, TrendingUp } from 'lucide-react'
import { Testimonials } from '@components/common/Testimonials'
import { ResourceCard } from '@components/resources/ResourceCard'

type Grade = 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12'
type Stream = 'natural' | 'social' | null

interface HighSchoolOverviewProps {
  user: any
  activeGrade: Grade
  selectedStream: Stream
  homeLoading: boolean
  homeResources: any[]
  setActiveTab: (tab: 'home' | 'learning' | 'hub') => void
}

export const HighSchoolOverview: React.FC<HighSchoolOverviewProps> = ({
  user,
  activeGrade,
  selectedStream,
  homeLoading,
  homeResources,
  setActiveTab
}) => {
  const firstName = user?.name?.split(' ')[0] || 'Student'
  const hasStream = activeGrade === 'grade_11' || activeGrade === 'grade_12'
  const subjectCount = new Set(homeResources.map((r: any) => r?.subject).filter(Boolean)).size
  const videoCount = homeResources.filter((r: any) => r?.type === 'Video').length
  const curriculumLabel = `${activeGrade.replace('_', ' ').toUpperCase()}${selectedStream ? ` • ${selectedStream.toUpperCase()}` : ''}`

  const quickActions = [
    { title: 'Start Lesson', subtitle: 'Jump into Learning Center', icon: BrainCircuit, action: () => setActiveTab('learning'), color: 'from-blue-600 to-indigo-600' },
    { title: 'Practice Hub', subtitle: 'Explore all materials', icon: Library, action: () => setActiveTab('hub'), color: 'from-emerald-500 to-teal-500' },
    { title: 'Exam Mode', subtitle: 'Focus on top resources', icon: Target, action: () => setActiveTab('hub'), color: 'from-amber-500 to-orange-500' },
  ]

  const achievements = [
    { icon: Flame, label: 'Study Streak', value: '5 Days', color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    { icon: Target, label: 'Today Goal', value: '3 Topics', color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: Trophy, label: 'Progress Badge', value: 'Rising Star', color: 'text-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
  ]

  const examTips = [
    'Focus on understanding concepts, not just memorization',
    'Practice time management with mock exams',
    'Review your mistakes to avoid repeating them',
    'Stay consistent with daily study sessions',
  ]

  const upcomingMilestones = [
    { title: 'Mid-term Exams', date: 'In 2 weeks', icon: CalendarCheck, color: 'text-blue-600' },
    { title: 'EUEE Preparation', date: 'Ongoing', icon: GraduationCap, color: 'text-indigo-600' },
  ]

  const getThumbnail = (type: string) => {
    if (type === 'Video') return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
    if (type === 'Document') return 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop'
    return 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop'
  }

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-700">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white p-8 md:p-12 shadow-2xl">
        <div className="absolute -top-16 right-0 w-64 h-64 bg-white/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-10 w-56 h-56 bg-cyan-300/20 rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Smart High School Workspace
            </p>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Hello, {firstName}
              <span className="block text-blue-100">Let’s level up today.</span>
            </h1>
            <p className="mt-4 text-blue-100/90 max-w-xl">
              Your personalized plan is ready for {curriculumLabel}. Use the quick actions below to continue where you left off.
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
                Browse Resources
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <GraduationCap className="w-4 h-4 text-blue-200 mb-2" />
              <p className="text-2xl font-black">{activeGrade.replace('_', ' ').toUpperCase()}</p>
              <p className="text-[11px] text-blue-100/80 uppercase tracking-widest">Current Grade</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <BookOpen className="w-4 h-4 text-blue-200 mb-2" />
              <p className="text-2xl font-black">{homeResources.length}</p>
              <p className="text-[11px] text-blue-100/80 uppercase tracking-widest">Resources</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <FileText className="w-4 h-4 text-blue-200 mb-2" />
              <p className="text-2xl font-black">{subjectCount}</p>
              <p className="text-[11px] text-blue-100/80 uppercase tracking-widest">Subjects</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <Play className="w-4 h-4 text-blue-200 mb-2" />
              <p className="text-2xl font-black">{videoCount}</p>
              <p className="text-[11px] text-blue-100/80 uppercase tracking-widest">Videos</p>
            </div>
          </div>
        </div>
      </div>

      {hasStream && !selectedStream && (
        <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-4">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            Pick your stream (Natural or Social) in Resource Hub filters for a more personalized experience.
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 md:grid-cols-3 gap-1.5 md:gap-4">
        {quickActions.map((action) => (
          <button
            key={action.title}
            onClick={action.action}
            className={`text-left p-2 md:p-6 rounded-lg md:rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg hover:scale-[1.01] active:scale-95 transition-transform`}
          >
            <action.icon className="w-3 h-3 md:w-6 md:h-6 mb-1 md:mb-4" />
            <h3 className="font-bold text-[9px] md:text-lg mb-0.5 md:mb-1 leading-tight">{action.title}</h3>
            <p className="text-[8px] md:text-sm text-white/85 leading-tight line-clamp-2">{action.subtitle}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {achievements.map((achievement, index) => (
          <div key={index} className={`rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-800 p-3 md:p-5 ${achievement.bgColor} hover:shadow-lg transition-all`}>
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <achievement.icon className={`w-4 h-4 md:w-5 md:h-5 ${achievement.color}`} />
              <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">{achievement.label}</p>
            </div>
            <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">{achievement.value}</p>
          </div>
        ))}
      </div>

      {/* Exam Preparation Tips */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800 p-4 md:p-6 rounded-xl md:rounded-2xl">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Zap className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm md:text-lg font-bold text-slate-900 dark:text-white">EUEE Preparation Tips</h3>
        </div>
        <div className="space-y-2 md:space-y-3">
          {examTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2 md:gap-3">
              <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {upcomingMilestones.map((milestone, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:p-5 rounded-xl md:rounded-2xl hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${milestone.color}`}>
                <milestone.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">{milestone.title}</h4>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">{milestone.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">Top Learning Materials</h3>
          <button
            onClick={() => setActiveTab('hub')}
            className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
          >
            See all resources <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {homeLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-[380px] bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : homeResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeResources.slice(0, 3).map((resource: any) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">No materials yet for your filters.</p>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 text-white p-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-300 mb-2">Weekly Challenge</p>
          <h4 className="text-xl font-black">Complete 2 lessons + 1 quiz this week</h4>
        </div>
        <button
          onClick={() => setActiveTab('learning')}
          className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-black text-xs uppercase tracking-widest"
        >
          <CalendarCheck className="w-4 h-4 inline mr-2" />
          Start
        </button>
      </div>

      <Testimonials />
    </div>
  )
}
