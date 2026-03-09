import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { resourceService } from '@services/resourceService'
import { useAuthStore } from '@store/authStore'
import { BookOpen, GraduationCap, Library, Filter, FileText, BrainCircuit, ArrowRight } from 'lucide-react'
import { ResourceCard } from '@components/resources/ResourceCard'

import { HIGH_SCHOOL } from '@utils/constants'

type Grade = 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12'
type Stream = 'natural' | 'social'

export const HighSchoolDashboard: React.FC = () => {
  const { user } = useAuthStore()
  const userGrade = (user?.highSchoolGrade as Grade) || 'grade_9'
  const userStream = (user?.highSchoolStream as Stream) || null
  const [activeTab, setActiveTab] = useState<'home' | 'grade'>('home')
  const [activeGrade, setActiveGrade] = useState<Grade>(userGrade)
  const [selectedStream, setSelectedStream] = useState<Stream | null>(userStream)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedResourceType, setSelectedResourceType] = useState<string | null>(null)
  const [resources, setResources] = useState<any[]>([])
  const [homeResources, setHomeResources] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [homeLoading, setHomeLoading] = useState(false)

  const getSubjects = (): string[] => {
    if (activeGrade === 'grade_9' || activeGrade === 'grade_10') {
      return HIGH_SCHOOL.GRADES_9_10.subjects
    }
    if (selectedStream === 'natural') {
      return HIGH_SCHOOL.GRADES_11_12.natural.subjects
    }
    if (selectedStream === 'social') {
      return HIGH_SCHOOL.GRADES_11_12.social.subjects
    }
    return []
  }

  const getResourceTypes = (): string[] => {
    if (activeGrade === 'grade_9' || activeGrade === 'grade_10') {
      return HIGH_SCHOOL.GRADES_9_10.resources
    }
    if (selectedStream === 'natural') {
      return HIGH_SCHOOL.GRADES_11_12.natural.resources
    }
    if (selectedStream === 'social') {
      return HIGH_SCHOOL.GRADES_11_12.social.resources
    }
    return []
  }

  const fetchResources = async () => {
    setLoading(true)
    try {
      const response = await resourceService.getResources({
        grade: activeGrade,
        stream: selectedStream as any,
        subject: selectedSubject as any,
        resourceType: selectedResourceType as any,
      })
      setResources(response.data?.data || [])
    } catch (err) {
      console.error('Failed to fetch resources:', err)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  const fetchHomeResources = async () => {
    setHomeLoading(true)
    try {
      const response = await resourceService.getResources({
        grade: userGrade,
        stream: userStream as any,
        limit: 3,
      })
      setHomeResources(response.data?.data || [])
    } catch (err) {
      console.error('Failed to fetch home resources:', err)
      setHomeResources([])
    } finally {
      setHomeLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [activeGrade, selectedStream, selectedSubject, selectedResourceType])

  useEffect(() => {
    fetchHomeResources()
  }, [userGrade, userStream])

  const handleStreamChange = (stream: Stream | null) => {
    setSelectedStream(stream)
    setSelectedSubject(null)
    setSelectedResourceType(null)
    setResources([])
  }

  const handleTabChange = (tab: 'home' | 'grade') => {
    setActiveTab(tab)
    if (tab === 'grade') {
      setActiveGrade(userGrade)
    }
  }

  const subjects = getSubjects()
  const resourceTypes = getResourceTypes()

  return (
    <DashboardLayout title="High School Dashboard" subtitle="Access learning resources tailored for your current grade level">

      {/* Dynamic Tab Navigation - Full Width & More Compact */}
      <div className="mb-6">
        <div className="bg-white dark:bg-slate-800/40 p-1.5 rounded-[20px] shadow-sm border border-slate-200 dark:border-white/5 flex items-center gap-2 w-full">
          <button
            onClick={() => handleTabChange('home')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-[16px] font-bold text-base transition-all duration-500 ${activeTab === 'home'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'home' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`} />
            Overview
          </button>

          <button
            onClick={() => handleTabChange('grade')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-[16px] font-bold text-base transition-all duration-500 ${activeTab === 'grade'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
          >
            <GraduationCap className={`w-5 h-5 ${activeTab === 'grade' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-50'}`} />
            {activeGrade.replace('_', ' ').toUpperCase()} Materials
          </button>
        </div>
      </div>

      <div className="animate-fadeIn">
        {activeTab === 'home' ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">Welcome Back, {user?.name || 'Student'}! 👋</h2>
                <p className="text-blue-100 max-w-xl opacity-90">
                  Ready to excel in your studies? We've prepared specific resources for your {userGrade.replace('_', ' ')} journey. Check your grade tab to get started.
                </p>
                <button
                  onClick={() => handleTabChange('grade')}
                  className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Go to {userGrade.replace('_', ' ').toUpperCase()} Resources
                </button>
              </div>
              <div className="absolute top-0 right-0 p-10 opacity-10 blur-3xl pointer-events-none">
                <div className="w-64 h-64 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Quick Stats/Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <Library className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">My Grade Content</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Access text books, past exams, and video lessons tailored for {userGrade.replace('_', ' ')}.</p>
              </div>
              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Smart Quizzes</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Test your knowledge with interactive quizzes designed for your curriculum level.</p>
              </div>
              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-500/20 rounded-xl flex items-center justify-center text-pink-600 dark:text-pink-400 mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Exam Prep</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Solve historical entrance exams and past national exam collections to prepare for success.</p>
              </div>
            </div>

            {/* Dynamic Latest Updates / Recently Added Resources */}
            <div className="bg-white dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recently Added for {userGrade.replace('_', ' ').toUpperCase()}</h3>
                <button
                  onClick={() => handleTabChange('grade')}
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {homeLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : homeResources.length > 0 ? (
                <div className="space-y-4">
                  {homeResources.map((resource: any) => (
                    <div
                      key={resource.id}
                      className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all cursor-pointer group"
                      onClick={() => window.open(resource.fileUrl, '_blank')}
                    >
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-slate-900 dark:text-white truncate">{resource.title}</h5>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 ml-2">
                            {resource.type}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">{resource.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-500 dark:text-slate-400 italic">
                  No recently added resources for your grade.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Compact Filters Row */}
            <div className="flex flex-wrap gap-4 items-center bg-transparent mb-6">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mr-2">
                <Filter className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Filters</span>
              </div>

              {/* Stream Selector (Only for 11 & 12) - Using 'Department' terminology */}
              {(activeGrade === 'grade_11' || activeGrade === 'grade_12') && (
                <div className="flex-1 min-w-[200px]">
                  <select
                    value={selectedStream || ''}
                    onChange={(e) => handleStreamChange(e.target.value as Stream || null)}
                    className="w-full pl-4 pr-10 py-2.5 appearance-none border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-medium text-sm"
                  >
                    <option value="">All Departments</option>
                    <option value="natural">Natural Science Dept</option>
                    <option value="social">Social Science Dept</option>
                  </select>
                </div>
              )}

              {/* Subject Selector */}
              <div className="flex-1 min-w-[200px]">
                <select
                  value={selectedSubject || ''}
                  onChange={(e) => setSelectedSubject(e.target.value || null)}
                  className="w-full pl-4 pr-10 py-2.5 appearance-none border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-medium text-sm"
                >
                  <option value="">{((activeGrade === 'grade_11' || activeGrade === 'grade_12') && !selectedStream) ? 'Select Dept First' : 'All Subjects'}</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Resource Type Selector */}
              <div className="flex-1 min-w-[200px]">
                <select
                  value={selectedResourceType || ''}
                  onChange={(e) => setSelectedResourceType(e.target.value || null)}
                  className="w-full pl-4 pr-10 py-2.5 appearance-none border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm font-medium text-sm"
                >
                  <option value="">All Formats</option>
                  {resourceTypes.map((type: string) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resources Gallery */}
            {(selectedStream || activeGrade === 'grade_9' || activeGrade === 'grade_10') && (
              <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden flex flex-col transition-colors">
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800/60 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Curated Hub: {selectedSubject || 'All Subjects'}</h3>
                  </div>
                  <button
                    onClick={fetchResources}
                    className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >
                    Refresh Library
                  </button>
                </div>

                <div className="p-6">
                  {loading ? (
                    <div className="text-center py-16 animate-pulse">
                      <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-600 dark:text-slate-400 font-medium">Fetching the latest materials...</p>
                    </div>
                  ) : resources.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                      <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                      <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">No resources found</h4>
                      <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Try adjusting your filters or selecting a different subject or resource type.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {resources.map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty State when Stream not selected and grade requires it */}
            {!selectedStream && (activeGrade === 'grade_11' || activeGrade === 'grade_12') && (
              <div className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700/80">
                <BrainCircuit className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Awaiting Stream Selection</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">Please choose between Natural Sciences and Social Sciences above to unlock your personalized curriculum resources.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
