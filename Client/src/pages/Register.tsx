import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormInput } from '@components/forms/FormInput'
import { FormSelect } from '@components/forms/FormSelect'
import { AppLogo } from '@components/common/AppLogo'
import { Footer } from '@components/common/Footer'
import { UserPlus, AlertCircle, ArrowLeft, ArrowRight, GraduationCap, School } from 'lucide-react'

type StudentType = 'high_school' | 'university' | null
type UniversityLevel = 'remedial' | 'freshman' | 'senior' | 'gc' | null
type HighSchoolGrade = 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12' | null

interface FormDataType {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: 'student' | 'admin'
  studentType?: StudentType
  highSchoolGrade?: HighSchoolGrade
  highSchoolStream?: 'natural' | 'social' | null
  universityLevel?: UniversityLevel
  university?: string
  department?: string
}

const UNIVERSITIES = [
  'Addis Ababa University',
  'Jimma University',
  'Bahir Dar University',
  'Haramaya University',
  'Hawassa University',
]

const DEPARTMENTS: Record<string, string[]> = {
  'Health': ['Medicine', 'Nursing', 'Pharmacy', 'Public Health', 'Midwifery', 'Medical Laboratory Science', 'Anesthesia'],
  'Engineering': ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Software Engineering', 'Computer Science', 'Information Technology', 'Chemical Engineering', 'Industrial Engineering'],
  'Agriculture': ['Agricultural Economics', 'Plant Science', 'Animal Science', 'Natural Resource Management', 'Forestry', 'Agricultural Engineering'],
  'Business': ['Accounting', 'Management', 'Marketing', 'Economics', 'Finance', 'Business Administration'],
  'Social Sciences': ['Law', 'Political Science', 'Sociology', 'International Relations', 'Psychology', 'Social Work'],
  'Education': ['Education Planning & Management', 'Curriculum Studies', 'Educational Psychology', 'Special Needs Education'],
  'Natural Science': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Statistics'],
  'Architecture': ['Architecture', 'Urban & Regional Planning', 'Construction Technology & Management'],
}

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { register: registerUser, loading, error: authError } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  })
  const [formError, setFormError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFormError(null)
  }

  const validateStep = (): boolean => {
    setFormError(null)

    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setFormError('Please fill in all fields')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match')
        return false
      }
      if (formData.password.length < 6) {
        setFormError('Password must be at least 6 characters')
        return false
      }
      return true
    }

    if (step === 2) {
      if (formData.role === 'student' && !formData.studentType) {
        setFormError('Please select a student type')
        return false
      }
      return true
    }

    if (step === 3) {
      if (formData.studentType === 'high_school' && !formData.highSchoolGrade) {
        setFormError('Please select a grade')
        return false
      }
      if (formData.studentType === 'high_school' && (formData.highSchoolGrade === 'grade_11' || formData.highSchoolGrade === 'grade_12') && !formData.highSchoolStream) {
        setFormError('Please select a stream')
        return false
      }
      if (formData.studentType === 'university' && !formData.universityLevel) {
        setFormError('Please select a student level')
        return false
      }
      return true
    }

    if (step === 4) {
      if (!formData.university) {
        setFormError('Please select a university')
        return false
      }
      // Department is only required for senior and GC students
      if (formData.universityLevel !== 'remedial' && formData.universityLevel !== 'freshman') {
        if (!formData.department) {
          setFormError('Please select a department')
          return false
        }
      }
      return true
    }

    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep()) {
      return
    }

    try {
      const payload = { ...formData }
      delete (payload as any).confirmPassword
      console.log('Sending registration payload:', payload)
      const success = await registerUser(formData)
      if (success) {
        navigate('/dashboard')
      }
    } catch (err) {
      setFormError(authError || 'Registration failed. Please try again.')
    }
  }

  const getStepTitle = (): string => {
    switch (step) {
      case 1:
        return 'Personal Details'
      case 2:
        return 'Learning Path'
      case 3:
        return formData.studentType === 'high_school' ? 'Select Grade' : 'Current Level'
      case 4:
        return 'Institution & Department'
      default:
        return 'Create Account'
    }
  }

  const shouldShowStep = (): boolean => {
    if (step === 2) return formData.role === 'student'
    if (step === 3) return formData.role === 'student' && formData.studentType !== null
    if (step === 4) return formData.role === 'student' && formData.studentType === 'university'
    return true
  }

  // Auto-advance to next step if current step should not be shown
  React.useEffect(() => {
    if (!shouldShowStep() && step > 1) {
      setStep(step + 1)
    }
  }, [formData.role, formData.studentType, formData.universityLevel, step])

  const totalSteps = formData.role === 'admin' ? 1 : formData.studentType === 'high_school' ? 3 : 4

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-violet-600 dark:to-indigo-600 blur-[100px] rounded-full mix-blend-screen transition-colors"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">

        <div className="flex justify-center mb-6">
          <AppLogo size="xl" />
        </div>

        <div className="bg-white dark:bg-slate-900/50 py-8 px-4 shadow-2xl dark:shadow-none border border-slate-200 dark:border-white/10 sm:rounded-3xl sm:px-10 backdrop-blur-xl transition-all">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white transition-colors">Create Account</h1>

            {/* Step Progress Bar */}
            <div className="flex items-center justify-center mt-6 gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 flex-1 ${index + 1 === step ? 'bg-blue-600 w-12' :
                    index + 1 < step ? 'bg-blue-400' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                ></div>
              ))}
            </div>

            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-4 transition-colors uppercase tracking-wider block">
              Step {step} of {totalSteps}
            </p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1 transition-colors">
              {getStepTitle()}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {(formError || authError) && (
              <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl border border-red-200 dark:border-red-500/20 flex items-center gap-3 text-sm transition-colors">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{formError || authError}</span>
              </div>
            )}

            <div className="transition-all duration-300 animate-fadeIn space-y-5">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <>
                  <FormInput
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Abebe Bekele"
                    required
                  />

                  <FormInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. abebe@example.com"
                    required
                  />

                  <FormSelect
                    label="Account Type"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    options={[
                      { value: 'student', label: 'Student' },
                      { value: 'admin', label: 'Admin/Teacher' },
                    ]}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />

                    <FormInput
                      label="Confirm"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type={formData.role === 'admin' ? 'submit' : 'button'}
                    onClick={formData.role === 'admin' ? undefined : handleNext}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-blue-600/30 mt-8"
                  >
                    {formData.role === 'admin' ? (
                      <><UserPlus className="w-4 h-4" /> Register Admin</>
                    ) : (
                      <>Continue <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  {/* OAuth Buttons */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        // TODO: Implement Google OAuth
                        console.log('Google OAuth - To be implemented')
                      }}
                      className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        // TODO: Implement Microsoft OAuth
                        console.log('Microsoft OAuth - To be implemented')
                      }}
                      className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 23 23">
                        <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                        <path fill="#f35325" d="M1 1h10v10H1z"/>
                        <path fill="#81bc06" d="M12 1h10v10H12z"/>
                        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                        <path fill="#ffba08" d="M12 12h10v10H12z"/>
                      </svg>
                      Microsoft
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: Student Type */}
              {step === 2 && (
                <>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mt-4">Choose your academic path</label>
                  <div className="grid grid-cols-1 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, studentType: 'high_school' }))}
                      className={`p-6 rounded-2xl border-2 transition-all flex items-start gap-4 text-left ${formData.studentType === 'high_school'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/50 bg-transparent'
                        }`}
                    >
                      <div className={`p-3 rounded-xl shrink-0 ${formData.studentType === 'high_school' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                        <School className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg ${formData.studentType === 'high_school' ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-white'}`}>High School</h4>
                        <p className={`text-sm mt-1 ${formData.studentType === 'high_school' ? 'text-blue-700 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>Preparatory grades 9-12 curriculum learning</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, studentType: 'university' }))}
                      className={`p-6 rounded-2xl border-2 transition-all flex items-start gap-4 text-left ${formData.studentType === 'university'
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500/50 bg-transparent'
                        }`}
                    >
                      <div className={`p-3 rounded-xl shrink-0 ${formData.studentType === 'university' ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg ${formData.studentType === 'university' ? 'text-indigo-900 dark:text-indigo-100' : 'text-slate-900 dark:text-white'}`}>University</h4>
                        <p className={`text-sm mt-1 ${formData.studentType === 'university' ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400'}`}>From remedial up to graduate level courses</p>
                      </div>
                    </button>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-center items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!formData.studentType}
                      className="flex-1 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-blue-600/30 flex justify-center items-center gap-2"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: High School Grade or University Level */}
              {step === 3 && (
                <>
                  {formData.studentType === 'high_school' ? (
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mt-4">Select your current grade</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['grade_9', 'grade_10', 'grade_11', 'grade_12'].map(grade => (
                          <button
                            key={grade}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, highSchoolGrade: grade as HighSchoolGrade }))
                            }}
                            className={`py-4 px-2 rounded-xl flex flex-col items-center justify-center border-2 transition-all font-bold tracking-wide ${formData.highSchoolGrade === grade
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 shadow-md shadow-blue-500/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                              }`}
                          >
                            <span className="text-sm font-normal text-slate-500 dark:text-slate-400 mb-1">Grade</span>
                            <span className="text-2xl">{grade.split('_')[1]}</span>
                          </button>
                        ))}
                      </div>

                      {(formData.highSchoolGrade === 'grade_11' || formData.highSchoolGrade === 'grade_12') && (
                        <div className="mt-8 transition-all animate-fadeIn">
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Choose your stream</label>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { value: 'natural', label: 'Natural Science', icon: '🧬' },
                              { value: 'social', label: 'Social Science', icon: '🌍' },
                            ].map(stream => (
                              <button
                                key={stream.value}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, highSchoolStream: stream.value as any }))}
                                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${formData.highSchoolStream === stream.value
                                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-md'
                                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-700 dark:text-slate-300'
                                  }`}
                              >
                                <span className="text-2xl">{stream.icon}</span>
                                <span className="font-bold text-sm tracking-tight">{stream.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4 tracking-tight">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mt-4">Select your academic standing</label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: 'remedial', label: 'Remedial', desc: 'Pre-freshman foundation program' },
                          { value: 'freshman', label: 'Freshman', desc: 'First year common courses' },
                          { value: 'senior', label: 'Senior', desc: 'Department specific courses' },
                          { value: 'gc', label: 'Graduated', desc: 'Alumni / Exam prep' },
                        ].map(level => (
                          <button
                            key={level.value}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, universityLevel: level.value as UniversityLevel }))
                            }}
                            className={`p-4 rounded-xl border-2 transition-all text-left flex justify-between items-center ${formData.universityLevel === level.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                              : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-slate-600'
                              }`}
                          >
                            <div>
                              <h4 className={`font-bold text-lg ${formData.universityLevel === level.value ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-white'}`}>{level.label}</h4>
                              <p className={`text-sm mt-0.5 ${formData.universityLevel === level.value ? 'text-blue-700 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>{level.desc}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.universityLevel === level.value ? 'border-blue-600 bg-blue-600' : 'border-slate-300 dark:border-slate-600'}`}>
                              {formData.universityLevel === level.value && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-center items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type={formData.studentType === 'high_school' ? 'submit' : 'button'}
                      onClick={formData.studentType === 'high_school' ? undefined : handleNext}
                      disabled={loading || (formData.studentType === 'high_school' ? (!formData.highSchoolGrade || ((formData.highSchoolGrade === 'grade_11' || formData.highSchoolGrade === 'grade_12') && !formData.highSchoolStream)) : !formData.universityLevel)}
                      className="flex-1 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-blue-600/30 flex justify-center items-center gap-2"
                    >
                      {formData.studentType === 'high_school' ? (
                        <><UserPlus className="w-4 h-4" /> Register</>
                      ) : (
                        <>Continue <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* Step 4: University & Department Selection Wrapper */}
              {step === 4 && formData.studentType === 'university' && (
                <div className="space-y-5 mt-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Select Your University</label>
                    <div className="relative">
                      <select
                        name="university"
                        value={formData.university || ''}
                        onChange={handleChange}
                        className="w-full pl-4 pr-10 py-3 appearance-none border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm"
                      >
                        <option value="" disabled>Choose a university...</option>
                        {UNIVERSITIES.map(uni => (
                          <option key={uni} value={uni}>
                            {uni}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {(formData.universityLevel !== 'remedial' && formData.universityLevel !== 'freshman') && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mt-4">Select Department Category</label>
                      <div className="relative">
                        <select
                          name="department"
                          value={formData.department || ''}
                          onChange={handleChange}
                          className="w-full pl-4 pr-10 py-3 appearance-none border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm"
                        >
                          <option value="" disabled>Choose a department...</option>
                          {Object.keys(DEPARTMENTS).map(dept => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 px-4 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-center items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !formData.university || (formData.universityLevel !== 'remedial' && formData.universityLevel !== 'freshman' && !formData.department)}
                      className="flex-1 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-blue-600/30 flex justify-center items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" /> Finish & Register
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 text-center transition-colors">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
