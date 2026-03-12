import React, { useState, useEffect } from 'react'
import { BookOpen, FileText, Plus } from 'lucide-react'
import { resourceService } from '@services/resourceService'
import { universityService } from '@services/universityService'
import { UNIVERSITIES, DEPARTMENTS, UNIVERSITY_CATEGORIES } from '@utils/constants'
import { ResourceCard } from '@components/resources/ResourceCard'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'

type StudentCategory = 'remedial' | 'freshman' | 'senior' | 'gc'

interface UniversityLevelViewProps {
  level: StudentCategory
}

interface UniversityWithResources {
  id: string | number
  name: string
  resourceCount?: number
}

export const UniversityLevelView: React.FC<UniversityLevelViewProps> = ({ level }) => {
  const [selectedUniversity, setSelectedUniversity] = useState<string>('')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedResourceType, setSelectedResourceType] = useState<string>('')
  const [selectedStream, setSelectedStream] = useState<'natural' | 'social' | ''>('')
  const [availableUniversities, setAvailableUniversities] = useState<UniversityWithResources[]>([])
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const levelLabels = {
    freshman: 'Freshman',
    remedial: 'Remedial',
    senior: 'Senior',
    gc: 'Graduate Class (GC)'
  }

  const isIntroductory = level === 'remedial' || level === 'freshman'

  const getSubjects = () => {
    if (level === 'freshman') {
      return ['Common Course', 'Math', 'Logic', 'Psychology', 'Physics', 'English']
    }
    if (level === 'remedial') {
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

  const getResourceTypes = (): string[] => {
    return UNIVERSITY_CATEGORIES[level as keyof typeof UNIVERSITY_CATEGORIES]?.resources || []
  }

  const subjects = getSubjects()
  const resourceTypes = getResourceTypes()

  const fetchResources = async () => {
    setLoading(true)
    try {
      const params: any = {
        educationLevel: 'university',
        grade: level,
      }
      
      if (selectedUniversity) params.university = selectedUniversity
      if (!isIntroductory && selectedDepartment) params.department = selectedDepartment
      if (selectedSubject) params.subject = selectedSubject
      if (selectedStream) params.stream = selectedStream // Stream for all levels now
      if (selectedResourceType) params.type = selectedResourceType
      
      const response = await resourceService.getResources(params)
      const resourceData = response.data?.data || []
      setResources(resourceData)
    } catch (err) {
      console.error('Failed to fetch resources:', err)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailableUniversities = async () => {
    try {
      // Fetch for all university levels
      const response = await universityService.getUniversitiesWithFreshmanResources()
      
      if (response.success && response.data) {
        setAvailableUniversities(response.data)
      } else {
        setAvailableUniversities([])
      }
    } catch (err) {
      console.error('Failed to fetch available universities:', err)
      setAvailableUniversities([])
    }
  }

  useEffect(() => {
    fetchResources()
  }, [level, selectedUniversity, selectedDepartment, selectedSubject, selectedResourceType, selectedStream])

  useEffect(() => {
    // Fetch available universities for all levels
    fetchAvailableUniversities()
  }, [level])

  return (
    <div className="space-y-6">

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        {/* University Filter (For all levels) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            University
          </label>
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Universities</option>
            {UNIVERSITIES.map(uni => {
              const resourceCount = availableUniversities.find(u => u.name === uni)?.resourceCount || 0
              return (
                <option key={uni} value={uni}>
                  {uni} {resourceCount > 0 ? `(${resourceCount})` : '(0)'}
                </option>
              )
            })}
          </select>
        </div>

        {/* Stream Filter (For all levels) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Stream
          </label>
          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value as any)}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Streams</option>
            <option value="natural">Natural Science</option>
            <option value="social">Social Science</option>
          </select>
        </div>

        {/* Department Filter (Only for Senior/GC) */}
        {!isIntroductory && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        {/* Subject Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Subjects</option>
            {subjects.map(subj => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        </div>

        {/* Resource Type Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Resource Type
          </label>
          <select
            value={selectedResourceType}
            onChange={(e) => setSelectedResourceType(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Types</option>
            {resourceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div className="flex items-end">
          <Button 
            onClick={fetchResources}
            className="w-full"
            variant="primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Resources Section */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {levelLabels[level]} Resources
            {selectedSubject && ` - ${selectedSubject}`}
          </div>
          <Button variant="secondary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">Loading resources...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                No Resources Found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {level === 'remedial' 
                  ? 'No remedial resources found. Remedial programs help students prepare for university-level coursework. Contact your admin to upload preparatory materials.'
                  : selectedUniversity 
                    ? `No ${level} resources found for ${selectedUniversity}. Try selecting a different university or contact your admin to upload resources.`
                    : 'No resources match your current filters. Try adjusting the filters or add new resources.'
                }
              </p>
              {(level === 'freshman' || level === 'remedial') && availableUniversities.length > 0 && (
                <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl max-w-md mx-auto">
                  <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                    Universities with {level} resources ({availableUniversities.length} of 43):
                  </p>
                  <div className="space-y-1">
                    {availableUniversities.slice(0, 5).map(uni => (
                      <p key={uni.id} className="text-xs text-indigo-700 dark:text-indigo-300">
                        • {uni.name} ({uni.resourceCount || 0} resources)
                      </p>
                    ))}
                    {availableUniversities.length > 5 && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400">
                        ...and {availableUniversities.length - 5} more
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {resources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}