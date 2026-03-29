import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { resourceService } from '@services/resourceService'
import { useAuthStore } from '@store/authStore'
import { BookOpen, GraduationCap, Library } from 'lucide-react'
import { ResourceCard } from '@components/resources/ResourceCard'
import { HighSchoolLearningCenter } from './components/HighSchoolLearningCenter'
import { HighSchoolOverview } from './components/HighSchoolOverview'

import { HIGH_SCHOOL } from '@utils/constants'

type Grade = 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12'
type Stream = 'natural' | 'social'

export const HighSchoolDashboard: React.FC = () => {
  const { user } = useAuthStore()
  const userGrade = (user?.highSchoolGrade as Grade) || 'grade_9'
  const userStream = (user?.highSchoolStream as Stream) || null
  const [activeTab, setActiveTab] = useState<'home' | 'learning' | 'hub'>('home')
  const [activeGrade, setActiveGrade] = useState<Grade>(userGrade)
  const [selectedStream, setSelectedStream] = useState<Stream | null>(userStream)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedResourceType, setSelectedResourceType] = useState<string | null>(null)
  const [learningSubject, setLearningSubject] = useState<string>('')
  const [resources, setResources] = useState<any[]>([])
  const [homeResources, setHomeResources] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [homeLoading, setHomeLoading] = useState(false)

  const getSubjects = (): string[] => {
    if (activeGrade === 'grade_9' || activeGrade === 'grade_10') {
      return HIGH_SCHOOL.GRADES_9_10.subjects
    }
    
    if (!selectedStream) {
      const naturalSubjects = HIGH_SCHOOL.GRADES_11_12.natural.subjects
      const socialSubjects = HIGH_SCHOOL.GRADES_11_12.social.subjects
      return [...new Set([...naturalSubjects, ...socialSubjects])]
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
    
    if (!selectedStream) {
      const naturalResources = HIGH_SCHOOL.GRADES_11_12.natural.resources
      const socialResources = HIGH_SCHOOL.GRADES_11_12.social.resources
      return [...new Set([...naturalResources, ...socialResources])]
    }
    
    if (selectedStream === 'natural') {
      return HIGH_SCHOOL.GRADES_11_12.natural.resources
    }
    if (selectedStream === 'social') {
      return HIGH_SCHOOL.GRADES_11_12.social.resources
    }
    return []
  }

  const subjects = getSubjects()
  const resourceTypes = getResourceTypes()

  // Initialize learning subject
  React.useEffect(() => {
    if (subjects.length > 0 && !learningSubject) {
      setLearningSubject(subjects[0])
    }
  }, [subjects])

  const fetchResources = async () => {
    setLoading(true)
    try {
      const response = await resourceService.getResources({
        educationLevel: 'high_school',
        grade: activeGrade,
        stream: selectedStream || undefined,
        subject: selectedSubject || undefined,
        type: selectedResourceType as any || undefined,
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
        educationLevel: 'high_school',
        grade: activeGrade,
        stream: selectedStream || undefined,
        limit: 8,
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
    fetchHomeResources()
  }, [activeGrade, selectedStream])

  useEffect(() => {
    if (activeTab === 'hub') {
      fetchResources()
    }
  }, [activeGrade, selectedStream, selectedSubject, selectedResourceType, activeTab])

  const handleStreamChange = (stream: Stream | null) => {
    setSelectedStream(stream)
    setResources([])
  }

  return (
    <DashboardLayout
      title=""
      noPadding={activeTab === 'learning'}
      headerNav={
        <div className="flex items-center gap-1">
          {[
            { id: 'learning', label: 'Learning Center', icon: BookOpen },
            { id: 'hub', label: 'Resource Hub', icon: Library }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 rounded-xl ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      }
    >
      {activeTab === 'home' ? (
        <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-10">
          <HighSchoolOverview
            user={user}
            activeGrade={activeGrade}
            selectedStream={selectedStream}
            homeLoading={homeLoading}
            homeResources={homeResources}
            setActiveTab={setActiveTab}
          />
        </div>
      ) : activeTab === 'learning' ? (
        <HighSchoolLearningCenter
          grade={activeGrade}
          stream={selectedStream}
          subjects={subjects}
          learningSubject={learningSubject}
          setLearningSubject={setLearningSubject}
          setActiveTab={setActiveTab}
        />
      ) : (
        <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-10">
          <div className="space-y-8">
            {/* Compact Filters Row */}
            <div className="flex flex-wrap gap-4 items-center bg-transparent mb-6">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mr-2">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Hub Filters</span>
              </div>

              {/* Stream Selector (Only for 11 & 12) */}
              {(activeGrade === 'grade_11' || activeGrade === 'grade_12') && (
                <div className="flex-1 min-w-[200px]">
                  <select
                    value={selectedStream || ''}
                    onChange={(e) => handleStreamChange(e.target.value as Stream || null)}
                    className="w-full pl-4 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all shadow-sm font-medium text-sm"
                  >
                    <option value="">All Streams</option>
                    <option value="natural">Natural Science</option>
                    <option value="social">Social Science</option>
                  </select>
                </div>
              )}

              {/* Subject Selector */}
              <div className="flex-1 min-w-[200px]">
                <select
                  value={selectedSubject || ''}
                  onChange={(e) => setSelectedSubject(e.target.value || null)}
                  className="w-full pl-4 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all shadow-sm font-medium text-sm"
                >
                  <option value="">All Subjects</option>
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
                  className="w-full pl-4 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all shadow-sm font-medium text-sm"
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
            <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-8 lg:p-12">
              {loading ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 dark:border-blue-400/20 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-500 dark:text-slate-400 font-bold tracking-tight animate-pulse">Loading resources...</p>
                </div>
              ) : resources.length === 0 ? (
                <div className="text-center py-24 bg-slate-50/50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                  <div className="text-6xl mb-6">📚</div>
                  <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No resources found</h4>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium mb-4">
                    Try adjusting your filters or selecting different options.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {resources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
