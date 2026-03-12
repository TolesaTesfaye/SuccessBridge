import React, { useState } from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { FormInput } from '@components/forms/FormInput'
import { FormSelect } from '@components/forms/FormSelect'
import { FormTextarea } from '@components/forms/FormTextarea'
import { quizService } from '@services/quizService'
import { Plus, Trash2 } from 'lucide-react'
import { Spinner } from '@components/common/Spinner'
import { ErrorMessage } from '@components/common/ErrorMessage'
import { useToast } from '@components/common/Toast'
import { subjectService, type Subject } from '@services/subjectService'

interface Question {
  id: string
  questionText: string
  questionType: 'multiple_choice' | 'short_answer' | 'essay'
  options: string[]
  correctAnswer: string
  points: number
}

export const SuperAdminAddQuiz: React.FC = () => {
  const toast = useToast()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    educationLevel: 'high_school' as 'high_school' | 'university',
    grade: '',
    stream: '',
    subjectId: '',
    difficultyLevel: 'medium',
    passingScore: 70,
    timeLimitMinutes: 30,
  })

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    questionType: 'multiple_choice',
    options: ['', '', '', ''],
    points: 1,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [subjects, setSubjects] = useState<Subject[]>([])

  React.useEffect(() => {
    const fetchDependencies = async () => {
      try {
        const fetchedSubjects = await subjectService.getAll()
        setSubjects(fetchedSubjects)
      } catch (err) {
        console.error('Failed to load subjects:', err)
      }
    }
    fetchDependencies()
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'passingScore' || name === 'timeLimitMinutes' ? parseInt(value) : value,
    }))
  }

  const handleQuestionChange = (field: string, value: any) => {
    setCurrentQuestion(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || [])]
    newOptions[index] = value
    setCurrentQuestion(prev => ({
      ...prev,
      options: newOptions,
    }))
  }

  const addQuestion = () => {
    if (!currentQuestion.questionText || !currentQuestion.correctAnswer) {
      setError('Please fill in all required fields for the question')
      return
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      questionText: currentQuestion.questionText || '',
      questionType: currentQuestion.questionType || 'multiple_choice',
      options: currentQuestion.options || [],
      correctAnswer: currentQuestion.correctAnswer || '',
      points: currentQuestion.points || 1,
    }

    setQuestions([...questions, newQuestion])
    setCurrentQuestion({
      questionType: 'multiple_choice',
      options: ['', '', '', ''],
      points: 1,
    })
    setError('')
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.title || !formData.subjectId || questions.length === 0) {
      setError('Please fill in all required fields and add at least one question')
      return
    }

    try {
      setLoading(true)
      const quizData = {
        title: formData.title,
        description: formData.description,
        educationLevel: formData.educationLevel,
        grade: formData.grade,
        stream: formData.stream,
        subjectId: formData.subjectId,
        timeLimit: formData.timeLimitMinutes,
        passingScore: formData.passingScore,
        questions: questions.map(q => ({
          id: q.id,
          text: q.questionText,
          type: q.questionType,
          options: q.options,
          correctAnswer: q.correctAnswer,
          points: q.points,
        })),
      }

      await quizService.create(quizData)
      setSuccess('Quiz created successfully!')
      toast.success('Quiz created successfully! 🎉')
      
      // Reset form after successful creation
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          educationLevel: 'high_school',
          grade: '',
          stream: '',
          subjectId: '',
          difficultyLevel: 'medium',
          passingScore: 70,
          timeLimitMinutes: 30,
        })
        setQuestions([])
        setSuccess('')
      }, 2000)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create quiz. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Quiz creation error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>📝 Create New Quiz</CardHeader>
      <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <ErrorMessage
                type="error"
                title="Error"
                message={error}
                onClose={() => setError('')}
              />
            )}

            {success && (
              <ErrorMessage
                type="success"
                title="Success"
                message={success}
                onClose={() => setSuccess('')}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Quiz Title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Enter quiz title"
                required
              />

              <FormSelect
                label="Education Level"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleFormChange}
                required
                options={[
                  { value: 'high_school', label: 'High School' },
                  { value: 'university', label: 'University' },
                ]}
              />

              {formData.educationLevel === 'high_school' ? (
                <FormSelect
                  label="Grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleFormChange}
                  options={[
                    { value: '', label: 'All Grades' },
                    { value: 'grade_9', label: 'Grade 9' },
                    { value: 'grade_10', label: 'Grade 10' },
                    { value: 'grade_11', label: 'Grade 11' },
                    { value: 'grade_12', label: 'Grade 12' },
                  ]}
                />
              ) : (
                <FormSelect
                  label="University Category"
                  name="grade"
                  value={formData.grade}
                  onChange={handleFormChange}
                  options={[
                    { value: '', label: 'All Categories' },
                    { value: 'remedial', label: 'Remedial' },
                    { value: 'freshman', label: 'Freshman' },
                  ]}
                />
              )}

              {((formData.educationLevel === 'high_school' && ['grade_11', 'grade_12'].includes(formData.grade)) ||
                (formData.educationLevel === 'university' && ['remedial', 'freshman'].includes(formData.grade))) && (
                  <FormSelect
                    label="Stream"
                    name="stream"
                    value={formData.stream}
                    onChange={handleFormChange}
                    options={[
                      { value: '', label: 'All Streams' },
                      { value: 'natural', label: 'Natural Science' },
                      { value: 'social', label: 'Social Science' },
                    ]}
                  />
                )}


              <FormSelect
                label="Subject"
                name="subjectId"
                value={formData.subjectId}
                onChange={handleFormChange}
                required
                options={[
                  { value: '', label: 'Select a subject' },
                  ...subjects.map(s => ({ value: s.id, label: s.name }))
                ]}
              />

              <FormSelect
                label="Difficulty Level"
                name="difficultyLevel"
                value={formData.difficultyLevel}
                onChange={handleFormChange}
                options={[
                  { value: 'easy', label: 'Easy' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'hard', label: 'Hard' },
                ]}
              />

              <FormInput
                label="Time Limit (minutes)"
                name="timeLimitMinutes"
                type="number"
                value={formData.timeLimitMinutes}
                onChange={handleFormChange}
                min="1"
              />

              <FormInput
                label="Passing Score (%)"
                name="passingScore"
                type="number"
                value={formData.passingScore}
                onChange={handleFormChange}
                min="0"
                max="100"
              />
            </div>

            <FormTextarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Enter quiz description"
              rows={3}
            />

            <div className="border-t dark:border-white/5 pt-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add Questions</h3>

              <div className="space-y-4 mb-6 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-white/5">
                <FormTextarea
                  label="Question Text"
                  value={currentQuestion.questionText || ''}
                  onChange={(e) => handleQuestionChange('questionText', e.target.value)}
                  placeholder="Enter the question"
                  rows={2}
                />

                <FormSelect
                  label="Question Type"
                  value={currentQuestion.questionType || 'multiple_choice'}
                  onChange={(e) => handleQuestionChange('questionType', e.target.value)}
                  options={[
                    { value: 'multiple_choice', label: 'Multiple Choice' },
                    { value: 'short_answer', label: 'Short Answer' },
                    { value: 'essay', label: 'Essay' },
                  ]}
                />

                {currentQuestion.questionType === 'multiple_choice' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Options</label>
                    {(currentQuestion.options || []).map((option, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        placeholder={`Option ${idx + 1}`}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-white/10 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    ))}
                  </div>
                )}

                <FormInput
                  label="Correct Answer"
                  value={currentQuestion.correctAnswer || ''}
                  onChange={(e) => handleQuestionChange('correctAnswer', e.target.value)}
                  placeholder="Enter the correct answer"
                />

                <FormInput
                  label="Points"
                  type="number"
                  value={currentQuestion.points || 1}
                  onChange={(e) => handleQuestionChange('points', parseInt(e.target.value))}
                  min="1"
                />

                <Button
                  type="button"
                  onClick={addQuestion}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Question
                </Button>
              </div>

              {questions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 dark:text-white">Questions Added: {questions.length}</h4>
                  {questions.map((q, idx) => (
                    <div key={q.id} className="p-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-lg flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white">{idx + 1}. {q.questionText}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Type: {q.questionType} | Points: {q.points}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeQuestion(q.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t dark:border-white/5">
              <Button type="submit" loading={loading} fullWidth disabled={loading || questions.length === 0}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner size="sm" />
                    Creating Quiz...
                  </span>
                ) : (
                  'Create Quiz'
                )}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
  )
}
