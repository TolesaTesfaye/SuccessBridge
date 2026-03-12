import React, { useState, useEffect } from 'react'
import { BookOpen, FileText, Plus, X } from 'lucide-react'
import { resourceService } from '@services/resourceService'
import { HIGH_SCHOOL } from '@utils/constants'
import { ResourceCard } from '@components/resources/ResourceCard'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'

type Grade = 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12'
type Stream = 'natural' | 'social'

interface HighSchoolGradeViewProps {
  grade: Grade
}

export const HighSchoolGradeView: React.FC<HighSchoolGradeViewProps> = ({ grade }) => {
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedResourceType, setSelectedResourceType] = useState<string | null>(null)
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const gradeLabels = {
    grade_9: 'Grade 9',
    grade_10: 'Grade 10', 
    grade_11: 'Grade 11',
    grade_12: 'Grade 12'
  }

  const getSubjects = (): string[] => {
    if (grade === 'grade_9' || grade === 'grade_10') {
      return HIGH_SCHOOL.GRADES_9_10.subjects
    }
    
    // For grades 11 & 12, show all subjects from both streams if no stream is selected
    if (!selectedStream) {
      const naturalSubjects = HIGH_SCHOOL.GRADES_11_12.natural.subjects
      const socialSubjects = HIGH_SCHOOL.GRADES_11_12.social.subjects
      // Combine and remove duplicates
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
    if (grade === 'grade_9' || grade === 'grade_10') {
      return HIGH_SCHOOL.GRADES_9_10.resources
    }
    
    // For grades 11 & 12, show all resource types from both streams if no stream is selected
    if (!selectedStream) {
      const naturalResources = HIGH_SCHOOL.GRADES_11_12.natural.resources
      const socialResources = HIGH_SCHOOL.GRADES_11_12.social.resources
      // Combine and remove duplicates
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

  const fetchResources = async () => {
    setLoading(true)
    try {
      const response = await resourceService.getResources({
        educationLevel: 'high_school',
        grade: grade,
        stream: selectedStream || undefined,
        subject: selectedSubject || undefined,
        type: selectedResourceType as any || undefined, // Backend uses 'type' parameter
      })
      const resourceData = response.data?.data || []
      setResources(resourceData)
    } catch (err) {
      console.error('Failed to fetch resources:', err)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [grade, selectedStream, selectedSubject, selectedResourceType])

  const clearAllFilters = () => {
    setSelectedStream(null)
    setSelectedSubject(null)
    setSelectedResourceType(null)
  }

  const handleStreamChange = (stream: Stream | null) => {
    setSelectedStream(stream)
    // Don't reset subject and resource type - allow independent filtering
    // setSelectedSubject(null)
    // setSelectedResourceType(null)
  }

  const subjects = getSubjects()
  const resourceTypes = getResourceTypes()
  const requiresStream = grade === 'grade_11' || grade === 'grade_12'

  return (
    <div className="space-y-6">

      {/* Filters */}
      <div className={`grid gap-4 mb-6 ${requiresStream ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
        {/* Stream Selector (Only for 11 & 12) */}
        {requiresStream && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Stream
            </label>
            <select
              value={selectedStream || ''}
              onChange={(e) => handleStreamChange(e.target.value as Stream || null)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Streams</option>
              <option value="natural">Natural Science</option>
              <option value="social">Social Science</option>
            </select>
          </div>
        )}

        {/* Subject Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Subject
          </label>
          <select
            value={selectedSubject || ''}
            onChange={(e) => setSelectedSubject(e.target.value || null)}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Resource Type
          </label>
          <select
            value={selectedResourceType || ''}
            onChange={(e) => setSelectedResourceType(e.target.value || null)}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {resourceTypes.map((type: string) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div className="flex items-end">
          <Button 
            onClick={clearAllFilters}
            className="w-full"
            variant="secondary"
          >
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Resources Section */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {gradeLabels[grade]} Resources
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
              <div className="animate-spin w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">Loading resources...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                No Resources Found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                No resources match your current filters. Try adjusting the filters or add new resources.
              </p>
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