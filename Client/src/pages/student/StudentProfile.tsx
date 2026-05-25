import React from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { useAuthStore } from '@store/authStore'
import {
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  Award,
  BookOpen,
  Building2,
  GraduationCap,
  Sparkles,
  ChevronRight,
  Trophy,
  Star,
  User,
  Activity,
  Code,
  Lightbulb,
  Gamepad2,
  CheckCircle2,
} from 'lucide-react'

export function StudentProfile() {
  const { user } = useAuthStore()

  // Use dynamic user data, fallback to defaults if not available
  const name = user?.name || 'Sarah Jenkins'
  const email = user?.email || 'sarah.j@successbridge.edu'
  const phone = (user as any)?.phone || '+1 (555) 123-4567'
  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'September 2021'
  const location = 'San Francisco, CA'
  
  const university = user?.university || 'Stanford University'
  const department = user?.department || 'School of Engineering'
  const grade = user?.studentType === 'high_school' 
    ? (user?.highSchoolGrade?.replace('_', ' ').toUpperCase() || 'Not set')
    : (user?.universityLevel?.toUpperCase() || 'Senior Year (3.9 GPA)')
  const studentType = user?.studentType === 'high_school' ? 'High School Student' : 'University Student'
  const stream = user?.studentType === 'high_school' && user?.highSchoolStream 
    ? user.highSchoolStream.charAt(0).toUpperCase() + user.highSchoolStream.slice(1) 
    : 'Full-Time Undergraduate'

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-6">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden glass-panel shadow-2xl">
          {/* Profile Info */}
          <div className="p-8 relative">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
                  alt={name}
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-2xl"
                />
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full"></div>
              </div>

              <div className="flex-1 pb-2">
                <div className="flex flex-wrap items-center gap-4 mb-2">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                    {name}
                  </h1>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-200 to-amber-400 dark:from-amber-500/20 dark:to-amber-600/20 border border-amber-300 dark:border-amber-500/30 shadow-lg shadow-amber-500/20 text-amber-800 dark:text-amber-300 text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Premium Scholar
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-lg flex items-center gap-2">
                  {department} <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span> {studentType}
                </p>
              </div>

              <div className="flex gap-3 pb-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  Message
                </button>
                <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Identity & Contact */}
          <div className="space-y-8">
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-violet-500" />
                Personal Details
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-2xl bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5">
                      Email Address
                    </p>
                    <p className="text-slate-900 dark:text-slate-200 font-medium break-all">
                      {email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5">
                      Phone Number
                    </p>
                    <p className="text-slate-900 dark:text-slate-200 font-medium">
                      {phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5">
                      Location
                    </p>
                    <p className="text-slate-900 dark:text-slate-200 font-medium">
                      {location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform duration-300">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5">
                      Joined Date
                    </p>
                    <p className="text-slate-900 dark:text-slate-200 font-medium">
                      {joinDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Interests */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Skills & Interests
              </h2>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Machine Learning', 'UI/UX Design', 'Data Analysis', 'Web Development'].map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Academics */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  Academic Profile
                </h2>
                <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="glass-card rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Institution
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {university}
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Department
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {department}
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Current Grade
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {grade}
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400">
                      <Star className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Student Stream
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {stream}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div className="glass-panel rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  Recent Activity
                </h2>
                <button className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                
                {/* Activity Item 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-2xl transition-transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">Completed Course</span>
                      <time className="font-medium text-xs text-slate-500 dark:text-slate-400">2 days ago</time>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Finished "Introduction to Data Science" with 98% score.</div>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <Code className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-2xl transition-transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">Submitted Project</span>
                      <time className="font-medium text-xs text-slate-500 dark:text-slate-400">1 week ago</time>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Uploaded final assignment for "Web Development Bootcamp".</div>
                  </div>
                </div>

                {/* Activity Item 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-2xl transition-transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">Earned Badge</span>
                      <time className="font-medium text-xs text-slate-500 dark:text-slate-400">2 weeks ago</time>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Awarded "Fast Learner" for completing 5 modules in a row.</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
