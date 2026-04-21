import React from 'react'
import { FormSelect } from '@components/forms/FormSelect'
import { FormInput } from '@components/forms/FormInput'

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
  studentType?: string
}

export const ResourceFilter: React.FC<ResourceFilterProps> = ({
  onFilter,
  educationLevel = 'high_school',
}) => {
  const [filters, setFilters] = React.useState<FilterOptions>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const updated = { ...filters, [name]: value || undefined }
    setFilters(updated)
    onFilter(updated)
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
    <div className="space-y-5 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm mb-6">
      {/* Search Field - Alone on its own line */}
      <div className="w-full">
        <FormInput
          label="Search"
          type="text"
          name="search"
          placeholder="Search resources..."
          value={filters.search || ''}
          onChange={handleChange}
        />
      </div>

      {/* Dropdown Filters - All on the same line (grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
        <FormSelect
          label="Resource Type"
          name="type"
          value={filters.type || ''}
          onChange={handleChange}
          options={resourceTypes}
        />

        {educationLevel === 'university' && (
          <FormSelect
            label="Student Type"
            name="studentType"
            value={filters.studentType || ''}
            onChange={handleChange}
            options={[
              { value: 'regular', label: 'Regular' },
              { value: 'extension', label: 'Extension' },
              { value: 'distance', label: 'Distance' },
              { value: 'summer', label: 'Summer' },
            ]}
          />
        )}

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
    </div>
  )
}
