import React, { useState } from 'react'
import { FormInput } from '@components/forms/FormInput'
import { FormSelect } from '@components/forms/FormSelect'
import { FormTextarea } from '@components/forms/FormTextarea'
import { Button } from '@components/common/Button'
import { UNIVERSITIES, DEPARTMENTS, HIGH_SCHOOL, UNIVERSITY_CATEGORIES } from '@utils/constants'

export interface UploadFormData {
    title: string
    description: string
    educationLevel: 'high_school' | 'university'
    grade?: string
    stream?: string
    universityId?: string
    departmentId?: string
    category?: string
    type: string
    subject: string
    file: File | null
    tags: string
}

interface ResourceUploadFormProps {
    onSubmit: (data: UploadFormData) => void
    loading?: boolean
    initialData?: Partial<UploadFormData>
}

export const ResourceUploadForm: React.FC<ResourceUploadFormProps> = ({
    onSubmit,
    loading = false,
    initialData,
}) => {
    const [formData, setFormData] = useState<UploadFormData>({
        title: initialData?.title || '',
        description: initialData?.description || '',
        educationLevel: initialData?.educationLevel || 'university',
        grade: initialData?.grade || '',
        stream: initialData?.stream || '',
        universityId: initialData?.universityId || '',
        departmentId: initialData?.departmentId || '',
        category: initialData?.category || '',
        type: initialData?.type || '',
        subject: initialData?.subject || '',
        file: initialData?.file || null,
        tags: initialData?.tags || '',
    })
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setError(null)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData(prev => ({ ...prev, file }))
        setError(null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.description || !formData.type || !formData.subject || (!formData.file && !loading)) {
            setError('Please fill in all required fields')
            return
        }

        // Validate student targeting
        if (formData.educationLevel === 'high_school') {
            if (!formData.grade) {
                setError('Please select a grade for high school students')
                return
            }
            if ((formData.grade === 'grade_11' || formData.grade === 'grade_12') && !formData.stream) {
                setError('Please select a stream for grades 11-12')
                return
            }
        } else {
            if (!formData.universityId) {
                setError('Please select a university')
                return
            }
            if (!formData.category) {
                setError('Please select a student category')
                return
            }
            if (formData.category === 'senior' || formData.category === 'gc') {
                if (!formData.departmentId) {
                    setError('Please select a department for senior/GC students')
                    return
                }
            }
        }

        onSubmit(formData)
    }

    const getDynamicSubjects = () => {
        if (formData.educationLevel === 'high_school') {
            if (formData.grade === 'grade_9' || formData.grade === 'grade_10') {
                return HIGH_SCHOOL.GRADES_9_10.subjects.map(s => ({ value: s, label: s }))
            }
            if (formData.stream === 'natural') return HIGH_SCHOOL.GRADES_11_12.natural.subjects.map(s => ({ value: s, label: s }))
            if (formData.stream === 'social') return HIGH_SCHOOL.GRADES_11_12.social.subjects.map(s => ({ value: s, label: s }))
            return []
        } else {
            const subjects: { value: string; label: string }[] = []

            // Add Common Course for all university students
            subjects.push({ value: 'Common Course', label: 'Common Course' })

            if (formData.category === 'remedial') {
                if (formData.stream === 'natural') subjects.push({ value: 'Natural Science', label: 'Natural Science' })
                else if (formData.stream === 'social') subjects.push({ value: 'Social Science', label: 'Social Science' })
                else {
                    subjects.push({ value: 'Natural Science', label: 'Natural Science' })
                    subjects.push({ value: 'Social Science', label: 'Social Science' })
                }
            }

            if (formData.category === 'freshman') {
                const freshmanSubjects = ['Math', 'Logic', 'Psychology', 'Physics', 'English']
                freshmanSubjects.forEach(s => subjects.push({ value: s, label: s }))
            }

            // For senior and GC students, add department-specific subjects
            if ((formData.category === 'senior' || formData.category === 'gc') && formData.departmentId) {
                const departments: string[] = (DEPARTMENTS as any)[formData.departmentId] || []
                departments.forEach(s => subjects.push({ value: s, label: s }))
            }
            
            return subjects
        }
    }

    const getDynamicResourceTypes = () => {
        if (formData.educationLevel === 'high_school') {
            if (formData.grade === 'grade_9' || formData.grade === 'grade_10') {
                return HIGH_SCHOOL.GRADES_9_10.resources.map(r => ({ value: r.toLowerCase().replace(/ /g, '_'), label: r }))
            }
            if (formData.stream === 'natural') return HIGH_SCHOOL.GRADES_11_12.natural.resources.map(r => ({ value: r.toLowerCase().replace(/ /g, '_'), label: r }))
            if (formData.stream === 'social') return HIGH_SCHOOL.GRADES_11_12.social.resources.map(r => ({ value: r.toLowerCase().replace(/ /g, '_'), label: r }))
            return []
        } else {
            // University resource types depend on student category
            if (!formData.category) return []
            
            const categoryData = (UNIVERSITY_CATEGORIES as any)[formData.category]
            if (!categoryData || !categoryData.resources) return []
            
            return categoryData.resources.map((r: string) => ({ 
                value: r.toLowerCase().replace(/ /g, '_'), 
                label: r 
            }))
        }
    }

    const getTargetStudentInfo = () => {
        if (formData.educationLevel === 'high_school') {
            let info = `High School - ${formData.grade?.replace('grade_', 'Grade ')}`
            if (formData.stream) info += ` (${formData.stream === 'natural' ? 'Natural Science' : 'Social Science'})`
            return info
        } else {
            let info = `University - ${formData.universityId}`
            if (formData.category) info += ` - ${(UNIVERSITY_CATEGORIES as any)[formData.category]?.label}`
            if (formData.departmentId) info += ` - ${formData.departmentId}`
            if (formData.stream && (formData.category === 'remedial' || formData.category === 'freshman')) {
                info += ` (${formData.stream === 'natural' ? 'Natural Science' : 'Social Science'})`
            }
            return info
        }
    }

    const isIntroductory = formData.category === 'remedial' || formData.category === 'freshman'

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

            {/* Target Student Information Display */}
            {(formData.educationLevel && (formData.grade || formData.universityId)) && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                        📚 This resource will be available to:
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                        {getTargetStudentInfo()}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <FormInput
                        label="Resource Title *"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter resource title"
                        required
                    />

                    <FormTextarea
                        label="Description *"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter resource description"
                        rows={4}
                        required
                    />

                    <FormInput
                        label="Tags"
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Enter tags separated by commas"
                        helperText="e.g., important, exam-prep, chapter-5"
                    />
                </div>

                <div className="space-y-6">
                    {/* Student Targeting Section */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                            🎯 Target Student Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormSelect
                                label="Education Level *"
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleChange}
                                options={[
                                    { value: 'high_school', label: 'High School' },
                                    { value: 'university', label: 'University' },
                                ]}
                            />

                            {formData.educationLevel === 'high_school' ? (
                                <FormSelect
                                    label="Grade *"
                                    name="grade"
                                    value={formData.grade || ''}
                                    onChange={handleChange}
                                    options={[
                                        { value: '', label: 'Select Grade' },
                                        { value: 'grade_9', label: 'Grade 9' },
                                        { value: 'grade_10', label: 'Grade 10' },
                                        { value: 'grade_11', label: 'Grade 11' },
                                        { value: 'grade_12', label: 'Grade 12' },
                                    ]}
                                />
                            ) : (
                                <FormSelect
                                    label="University *"
                                    name="universityId"
                                    value={formData.universityId || ''}
                                    onChange={handleChange}
                                    options={[
                                        { value: '', label: 'Select University' },
                                        ...UNIVERSITIES.map(u => ({ value: u, label: u }))
                                    ]}
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {formData.educationLevel === 'high_school' ? (
                                (formData.grade === 'grade_11' || formData.grade === 'grade_12') && (
                                    <FormSelect
                                        label="Stream *"
                                        name="stream"
                                        value={formData.stream || ''}
                                        onChange={handleChange}
                                        options={[
                                            { value: '', label: 'Select Stream' },
                                            { value: 'natural', label: 'Natural Science' },
                                            { value: 'social', label: 'Social Science' },
                                        ]}
                                    />
                                )
                            ) : (
                                <>
                                    <FormSelect
                                        label="Student Category *"
                                        name="category"
                                        value={formData.category || ''}
                                        onChange={handleChange}
                                        options={[
                                            { value: '', label: 'Select Category' },
                                            ...Object.keys(UNIVERSITY_CATEGORIES).map(c => ({ 
                                                value: c, 
                                                label: (UNIVERSITY_CATEGORIES as any)[c].label 
                                            }))
                                        ]}
                                    />
                                    {(formData.category === 'senior' || formData.category === 'gc') ? (
                                        <FormSelect
                                            label="Department Group *"
                                            name="departmentId"
                                            value={formData.departmentId || ''}
                                            onChange={handleChange}
                                            options={[
                                                { value: '', label: 'Select Department' },
                                                ...Object.keys(DEPARTMENTS).map(d => ({ value: d, label: d }))
                                            ]}
                                        />
                                    ) : isIntroductory ? (
                                        <FormSelect
                                            label="Stream (Optional)"
                                            name="stream"
                                            value={formData.stream || ''}
                                            onChange={handleChange}
                                            options={[
                                                { value: '', label: 'All Streams' },
                                                { value: 'natural', label: 'Natural Science' },
                                                { value: 'social', label: 'Social Science' },
                                            ]}
                                        />
                                    ) : null}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Resource Details Section */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                            📄 Resource Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormSelect
                                label="Resource Type *"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                options={[
                                    { value: '', label: 'Select Type' },
                                    ...getDynamicResourceTypes()
                                ]}
                                helperText={formData.category ? `Available for ${(UNIVERSITY_CATEGORIES as any)[formData.category]?.label || formData.category}` : ''}
                            />

                            <FormSelect
                                label="Subject / Module *"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                options={[
                                    { value: '', label: 'Select Subject' },
                                    ...getDynamicSubjects()
                                ]}
                                helperText={formData.category === 'freshman' ? 'Freshman subjects + Common Course' : formData.category === 'remedial' ? 'Stream-based subjects + Common Course' : ''}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Upload File *
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-[16px] hover:border-blue-500 transition-colors">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-slate-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-slate-600 dark:text-slate-400">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                                    >
                                        <span>{formData.file ? 'Change file' : 'Upload a file'}</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov"
                                        />
                                    </label>
                                    {!formData.file && <p className="pl-1">or drag and drop</p>}
                                </div>
                                <p className="text-xs text-slate-500">PDF, DOC, PPT up to 50MB</p>
                            </div>
                        </div>
                        {formData.file && (
                            <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <span className="text-lg">📄</span>
                                <span className="text-sm font-medium text-blue-700 dark:text-blue-300 truncate">
                                    {formData.file.name}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-6 border-t dark:border-slate-800">
                <Button variant="primary" type="submit" disabled={loading} size="lg" className="px-12">
                    {loading ? 'Processing...' : 'Upload Resource to SuccessBridge'}
                </Button>
            </div>
        </form>
    )
}