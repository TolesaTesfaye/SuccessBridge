import React from 'react'
import { FormSelect } from '@components/forms/FormSelect'
import { FormInput } from '@components/forms/FormInput'
import { Button } from '@components/common/Button'

interface ResourceFilterProps {
  onFilter: (filters: FilterOptions) => void
  educationLevel?: 'high_school' | 'university'
}

export interface FilterOptions {
  search?: string
  type?: string
  subject?: string
  grade?: string
  stream?: string
  university?: string
  department?: string
}

export const ResourceFilter: React.FC<ResourceFilterProps> = ({
  onFilter,
  educationLevel = 'high_school',
}) => {
  const [filters, setFilters] = React.useState<FilterOptions>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value || undefined }))
  }

  const handleFilter = () => {
    onFilter(filters)
  }

  const handleReset = () => {
    setFilters({})
    onFilter({})
  }

  const resourceTypes = [
    { value: 'textbook', label: 'Textbook' },
    { value: 'video', label: 'Video' },
    { value: 'past_exam', label: 'Past Exam' },
    { value: 'module', label: 'Module' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'worksheet', label: 'Worksheet' },
    { value: 'project', label: 'Project' },
    { value: 'research', label: 'Research Paper' },
    { value: 'career', label: 'Career Guide' },
  ]

  const subjects = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'history', label: 'History' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-2">
        <FormInput
          label="Search"
          type="text"
          name="search"
          placeholder="Search resources..."
          value={filters.search || ''}
          onChange={handleChange}
        />

        <FormSelect
          label="Resource Type"
          name="type"
          value={filters.type || ''}
          onChange={handleChange}
          options={resourceTypes}
        />

        <FormSelect
          label="Subject"
          name="subject"
          value={filters.subject || ''}
          onChange={handleChange}
          options={subjects}
        />

        {educationLevel === 'high_school' && (
          <>
            <FormSelect
              label="Grade"
              name="grade"
              value={filters.grade || ''}
              onChange={handleChange}
              options={[
                { value: '9', label: 'Grade 9' },
                { value: '10', label: 'Grade 10' },
                { value: '11', label: 'Grade 11' },
                { value: '12', label: 'Grade 12' },
              ]}
            />

            <FormSelect
              label="Stream"
              name="stream"
              value={filters.stream || ''}
              onChange={handleChange}
              options={[
                { value: 'science', label: 'Science' },
                { value: 'social', label: 'Social' },
              ]}
            />
          </>
        )}

        {educationLevel === 'university' && (
          <>
            <FormSelect
              label="University"
              name="university"
              value={filters.university || ''}
              onChange={handleChange}
              options={[
                { value: 'aau', label: 'Addis Ababa University' },
                { value: 'astu', label: 'Adama Science & Technology University' },
              ]}
            />

            <FormSelect
              label="Department"
              name="department"
              value={filters.department || ''}
              onChange={handleChange}
              options={[
                { value: 'cs', label: 'Computer Science' },
                { value: 'eng', label: 'Engineering' },
              ]}
            />
          </>
        )}
      </div>

      <div className="flex justify-start gap-4">
        <Button variant="primary" onClick={handleFilter} className="min-w-[140px]">
          Apply Filters
        </Button>
        <Button variant="secondary" onClick={handleReset} className="min-w-[140px]">
          Reset
        </Button>
      </div>
    </div>
  )
}
