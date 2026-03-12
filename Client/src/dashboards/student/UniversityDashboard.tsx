import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { resourceService } from '@services/resourceService'
import { universityService } from '@services/universityService'
import { useAuthStore } from '@store/authStore'
import { BookOpen, GraduationCap, Library, Filter, FileText, BrainCircuit, ArrowRight, Sparkles, Trophy } from 'lucide-react'
import { ResourceCard } from '@components/resources/ResourceCard'

import { DEPARTMENTS, UNIVERSITY_CATEGORIES, UNIVERSITIES } from '@utils/constants'

type StudentCategory = 'remedial' | 'freshman' | 'senior' | 'gc'

interface UniversityWithResources {
  id: string
  name: string
  location?: string
  resourceCount?: number
}

export const UniversityDashboard: React.FC = () => {
  const { user } = useAuthStore()
  const userLevel = (user?.universityLevel as StudentCategory) || 'freshman'
  const userUni = user?.university || ''
  const userDept = user?.department || ''

  console.log('🎓 [DASHBOARD INIT] User profile:', {
    name: user?.name,
    university: userUni,
    level: userLevel,
    department: userDept,
    studentType: user?.studentType
  })

  const [activeTab, setActiveTab] = useState<'home' | 'level'>('home')
  const activeCategory = userLevel
  const selectedDepartment = userDept
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedResourceType, setSelectedResourceType] = useState<string>('')
  const [selectedStream, setSelectedStream] = useState<'natural' | 'social' | ''>('')
  const [selectedUniversity, setSelectedUniversity] = useState<string>('')
  const [availableUniversities, setAvailableUniversities] = useState<UniversityWithResources[]>([])
  const [resources, setResources] = useState<any[]>([])
  const [homeResources, setHomeResources] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [homeLoading, setHomeLoading] = useState(false)

  const isIntroductory = activeCategory === 'remedial' || activeCategory === 'freshman'

  const getSubjects = () => {
    if (activeCategory === 'freshman') {
      return ['Common Course', 'Math', 'Logic', 'Psychology', 'Physics', 'English']
    }
    if (activeCategory === 'remedial') {
      // For remedial, subjects depend on stream selection
      if (selectedStream === 'natural') {
        return ['Common Course', 'Math', 'Physics', 'Chemistry', 'Biology']
      }
      if (selectedStream === 'social') {
        return ['Common Course', 'History', 'Geography', 'Economics', 'Civics']
      }
      // If no stream selected, show general subjects
      return ['Common Course', 'Natural Science', 'Social Science']
    }
    if (selectedDepartment && (DEPARTMENTS as any)[selectedDepartment]) {
      return ['Common Course', ...(DEPARTMENTS as any)[selectedDepartment]]
    }
    return ['Common Course']
  }

  const subjects = getSubjects()

  const getResourceTypes = (): string[] => {
    return UNIVERSITY_CATEGORIES[activeCategory as keyof typeof UNIVERSITY_CATEGORIES].resources
  }

  const resourceTypes = getResourceTypes()

  const fetchResources = async () => {
    setLoading(true)
    try {
      const params: any = {
        educationLevel: 'university',
        grade: activeCategory, // Backend stores category in 'grade' field
      }
      
      // Only add filters if they are specifically selected (not "All")
      if (selectedUniversity) {
        params.university = selectedUniversity
      }
      // Note: Don't add userUni automatically - let user choose "All Universities" or specific one
      
      if (!isIntroductory && selectedDepartment) params.department = selectedDepartment
      if (selectedSubject) params.subject = selectedSubject
      if (selectedStream) params.stream = selectedStream // Stream for all levels now
      if (selectedResourceType) params.type = selectedResourceType
      
      console.log('🔍 [LEVEL TAB] Fetching resources with params:', params)
      console.log('🔍 [LEVEL TAB] Selected university:', selectedUniversity)
      console.log('🔍 [LEVEL TAB] User university:', userUni)
      console.log('🔍 [LEVEL TAB] Active category:', activeCategory)
      console.log('🔍 [LEVEL TAB] Active tab:', activeTab)
      console.log('🔍 [LEVEL TAB] Is introductory:', isIntroductory)
      console.log('🔍 [LEVEL TAB] Available universities count:', availableUniversities.length)
      
      const response = await resourceService.getResources(params)
      console.log('📦 [LEVEL TAB] Resources received:', response.data?.data)
      console.log('📦 [LEVEL TAB] Total resources:', response.data?.total)
      console.log('📦 [LEVEL TAB] API Response:', response)
      setResources(response.data?.data || [])
    } catch (err) {
      console.error('❌ [LEVEL TAB] Failed to fetch resources:', err)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  const fetchHomeResources = async () => {
    setHomeLoading(true)
    try {
      const params: any = {
        educationLevel: 'university',
        grade: userLevel, // Backend stores category in 'grade' field
        limit: 3,
      }
      
      // Only add filters if they exist
      if (userUni) params.university = userUni
      if ((userLevel === 'senior' || userLevel === 'gc') && userDept) {
        params.department = userDept
      }
      
      console.log('🏠 [HOME TAB] Fetching home resources with params:', params)
      console.log('🏠 [HOME TAB] User level:', userLevel)
      console.log('🏠 [HOME TAB] User university:', userUni)
      console.log('🏠 [HOME TAB] User department:', userDept)
      console.log('🏠 [HOME TAB] Active tab:', activeTab)
      const response = await resourceService.getResources(params)
      console.log('📦 [HOME TAB] Resources received:', response.data?.data)
      console.log('📦 [HOME TAB] Total resources:', response.data?.total)
      setHomeResources(response.data?.data || [])
    } catch (err) {
      console.error('❌ [HOME TAB] Failed to fetch home resources:', err)
      setHomeResources([])
    } finally {
      setHomeLoading(false)
    }
  }

  const fetchAvailableUniversities = async () => {
    try {
      console.log('🏛️ Fetching universities with freshman resources...')
      console.log('🏛️ Current activeCategory:', activeCategory)
      console.log('🏛️ Current userLevel:', userLevel)
      
      const response = await universityService.getUniversitiesWithFreshmanResources()
      console.log('🏛️ University service response:', response)
      
      if (response.success && response.data) {
        setAvailableUniversities(response.data)
        console.log('🏛️ Universities with freshman resources loaded:', response.data.length)
        console.log('🏛️ Universities:', response.data.map(u => `${u.name} (${u.resourceCount} resources)`))
      } else {
        console.error('❌ Failed to fetch universities with freshman resources:', response.error)
        setAvailableUniversities([])
      }
    } catch (err) {
      console.error('❌ Failed to fetch available universities:', err)
      setAvailableUniversities([])
    }
  }

  useEffect(() => {
    fetchResources()
  }, [userUni, selectedDepartment, selectedSubject, selectedResourceType, selectedStream, selectedUniversity, activeCategory])

  useEffect(() => {
    if (userUni) fetchHomeResources()
  }, [userUni, userDept, userLevel])

  useEffect(() => {
    // Fetch available universities for all levels
    fetchAvailableUniversities()
  }, [activeCategory])

  // Also fetch universities on component mount for all users
  useEffect(() => {
    fetchAvailableUniversities()
  }, [])

  return (
    <DashboardLayout title="University Dashboard" subtitle="Strategic academic resources for your higher education journey">

      {/* Premium Tab Navigation */}
      <div className="mb-6">
        <div className="bg-white dark:bg-slate-800/40 p-1.5 rounded-[20px] shadow-sm border border-slate-200 dark:border-white/5 flex items-center gap-2 w-full">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-[16px] font-bold text-base transition-all duration-500 ${activeTab === 'home'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'home' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`} />
            Overview
          </button>

          <button
            onClick={() => setActiveTab('level')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-[16px] font-bold text-base transition-all duration-500 ${activeTab === 'level'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
          >
            <GraduationCap className={`w-5 h-5 ${activeTab === 'level' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-50'}`} />
            {activeCategory.toUpperCase()} Hub
          </button>
        </div>
      </div>

      <div className="animate-fadeIn">
        {activeTab === 'home' ? (
          <div className="space-y-8">
            {/* Elegant Welcome Card */}
            <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">University Track</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Expanding Horizons, {user?.name?.split(' ')[0] || 'Scholar'}! 🎓</h2>
                <p className="text-blue-100 max-w-xl opacity-90 leading-relaxed">
                  Your journey at {userUni || 'SuccessBridge'} is unique. We've gathered premium modules and past papers specifically for {userLevel.toUpperCase()} level.
                </p>
                <button
                  onClick={() => setActiveTab('level')}
                  className="mt-6 px-8 py-3 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-blue-400/20 active:scale-95 flex items-center gap-2"
                >
                  Explore {userLevel.toUpperCase()} Materials <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-0 right-0 p-12 opacity-10 blur-3xl pointer-events-none">
                <div className="w-80 h-80 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Library, color: 'blue', title: 'Modular Hub', desc: 'Comprehensive modules curated by top university representatives.' },
                { icon: BrainCircuit, color: 'indigo', title: 'Practice Vault', desc: 'Historical exit and entrance exams with interactive solutions.' },
                { icon: Trophy, color: 'pink', title: 'GC Preparation', desc: 'Career-ready research modules and graduation-year projects.' }
              ].map((prop, i) => (
                <div key={i} className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/30 transition-all group">
                  <div className={`w-12 h-12 bg-${prop.color}-100 dark:bg-${prop.color}-500/20 rounded-xl flex items-center justify-center text-${prop.color}-600 dark:text-${prop.color}-400 mb-4 group-hover:scale-110 transition-transform`}>
                    <prop.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">{prop.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{prop.desc}</p>
                </div>
              ))}
            </div>

            {/* Recently Added Section */}
            <div className="bg-white dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Fresh and Trending for {userLevel.toUpperCase()}</h3>
                </div>
                <button
                  onClick={() => setActiveTab('level')}
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-xl transition-all flex items-center gap-1"
                >
                  Visit Library <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {homeLoading ? (
                <div className="flex flex-col items-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-slate-500 text-sm font-medium">Scanning for new materials...</p>
                </div>
              ) : homeResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {homeResources.map((resource: any) => (
                    <div
                      key={resource.id}
                      className="group p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 hover:border-blue-500/40 transition-all cursor-pointer shadow-sm flex flex-col"
                      onClick={() => window.open(resource.fileUrl, '_blank')}
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all mb-4">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h5 className="font-bold text-slate-900 dark:text-white line-clamp-2 mb-2">{resource.title}</h5>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 self-start px-2 py-0.5 rounded-md mb-2">
                        {resource.type}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-auto">
                        {resource.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                  <div className="text-4xl mb-4">🔍</div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">Nothing New Yet</h4>
                  <p className="text-sm text-slate-500 mb-4">Admins haven't added new resources for {userLevel} recently. Check back soon!</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    💡 Tip: Click on "{userLevel.toUpperCase()} Hub" tab above to see all available resources with filters
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Resource Hub Filters - Personalized */}
            <div className="flex flex-wrap gap-4 items-center bg-transparent mb-6">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mr-2">
                <Filter className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Strategic Filters</span>
              </div>

              {/* University Filter (For all levels) */}
              <div className="flex-1 min-w-[200px]">
                  <select
                    value={selectedUniversity}
                    onChange={(e) => {
                      console.log('🏛️ University selected:', e.target.value)
                      setSelectedUniversity(e.target.value)
                    }}
                    className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                  >
                    <option value="">All Universities (43 total)</option>
                    {UNIVERSITIES.map(uni => {
                      const resourceCount = availableUniversities.find(u => u.name === uni)?.resourceCount || 0
                      return (
                        <option key={uni} value={uni}>
                          {uni} {resourceCount > 0 ? `(${resourceCount} resources)` : '(0 resources)'}
                        </option>
                      )
                    })}
                  </select>
                </div>

              {/* Stream Selector (For all levels) */}
              <div className="flex-1 min-w-[180px]">
                <select
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value as any)}
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="">All Academic Streams</option>
                  <option value="natural">Natural Science</option>
                  <option value="social">Social Science</option>
                </select>
              </div>

              {/* Department Selector (Only for Senior/GC) */}
              {!isIntroductory && (
                <div className="flex-1 min-w-[180px]">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                  >
                    <option value="">All Departments</option>
                    {Object.keys(DEPARTMENTS).map(dept => (
                      <option key={dept} value={dept}>
                        {dept.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Dynamic Resource Type Selector */}
              <div className="flex-1 min-w-[180px]">
                <select
                  value={selectedResourceType}
                  onChange={(e) => setSelectedResourceType(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="">All Formats (Modules, Exams...)</option>
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div className="flex-1 min-w-[200px]">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer appearance-none"
                >
                  <option value="">{(activeCategory === 'remedial' && !selectedStream) ? 'Select Stream First' : 'All Subjects'}</option>
                  {subjects.map(subj => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Curated Material Grid */}
            <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-8">
              {loading ? (
                <div className="text-center py-20 flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-500 font-bold tracking-tight animate-pulse">Accessing higher ed repositories...</p>
                </div>
              ) : resources.length === 0 ? (
                <div className="text-center py-24 bg-slate-50/50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                  <div className="text-6xl mb-6">🏜️</div>
                  <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">No resources found for this configuration</h4>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium mb-4">
                    {selectedUniversity 
                      ? `No freshman resources found for ${selectedUniversity}. Try selecting a different university or contact your admin to upload resources.`
                      : 'Try selecting specific filters or contact your admin to upload more resources.'
                    }
                  </p>
                  {availableUniversities.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl max-w-md mx-auto">
                      <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Universities with freshman resources ({availableUniversities.length} of 43):
                      </p>
                      <div className="space-y-1">
                        {availableUniversities.slice(0, 5).map(uni => (
                          <p key={uni.id} className="text-xs text-blue-700 dark:text-blue-300">
                            • {uni.name} ({uni.resourceCount} resources)
                          </p>
                        ))}
                        {availableUniversities.length > 5 && (
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            ...and {availableUniversities.length - 5} more
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl max-w-md mx-auto">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      <strong>Debug Info:</strong><br/>
                      University: {selectedUniversity || userUni || 'Not set'}<br/>
                      Level: {activeCategory}<br/>
                      Subject: {selectedSubject || 'All'}<br/>
                      Stream: {selectedStream || 'All'}<br/>
                      Type: {selectedResourceType || 'All'}<br/>
                      Available Universities: {availableUniversities.length}
                    </p>
                  </div>
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
      </div>
    </DashboardLayout>
  )
}
