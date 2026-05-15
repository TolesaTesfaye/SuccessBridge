import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/common/Toast'
import { useAuthStore } from '../store/authStore'

interface ProfileData {
  studentType: 'high_school' | 'university' | ''
  highSchoolGrade: string
  highSchoolStream: string
  universityLevel: string
  university: string
  department: string
}

interface University {
  id: string
  name: string
}

interface Department {
  id: string
  name: string
  universityId: string
}

export const CompleteProfile: React.FC = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { setToken, setUser, initialize } = useAuthStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([])
  
  const [profileData, setProfileData] = useState<ProfileData>({
    studentType: '',
    highSchoolGrade: '',
    highSchoolStream: '',
    universityLevel: '',
    university: '',
    department: ''
  })

  const totalSteps = profileData.studentType === 'high_school' ? 2 : 
                    profileData.studentType === 'university' ? 3 : 1

  // Fetch universities and departments on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch universities
        const univResponse = await fetch(`${import.meta.env.VITE_API_URL}/universities`)
        const univData = await univResponse.json()
        if (univData.success) {
          setUniversities(univData.data)
        }

        // Fetch all departments
        const deptResponse = await fetch(`${import.meta.env.VITE_API_URL}/departments`)
        const deptData = await deptResponse.json()
        setDepartments(deptData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  // Filter departments when university changes
  useEffect(() => {
    if (profileData.university) {
      const filtered = departments.filter(d => d.universityId === profileData.university)
      setFilteredDepartments(filtered)
      // Reset department if it's not in the filtered list
      if (profileData.department && !filtered.find(d => d.id === profileData.department)) {
        setProfileData(prev => ({ ...prev, department: '' }))
      }
    } else {
      setFilteredDepartments([])
    }
  }, [profileData.university, departments])

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Check if this is OAuth registration
      const oauthDataStr = sessionStorage.getItem('oauthData')
      
      if (oauthDataStr) {
        // OAuth registration - create account with profile data
        const oauthData = JSON.parse(oauthDataStr)
        const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/oauth-register-complete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: oauthData.email,
            name: oauthData.name,
            password: randomPassword,
            googleId: oauthData.googleId,
            provider: oauthData.provider,
            // Include profile data
            studentType: profileData.studentType,
            highSchoolGrade: profileData.highSchoolGrade || undefined,
            highSchoolStream: profileData.highSchoolStream || undefined,
            universityLevel: profileData.universityLevel || undefined,
            universityId: profileData.university || undefined,
            departmentId: profileData.department || undefined,
          })
        })

        const data = await response.json()

        if (data.success) {
          // Store token and user data
          setToken(data.data.token)
          setUser(data.data.user)
          sessionStorage.removeItem('oauthData') // Clean up
          
          toast.success('Registration completed successfully!')
          
          // Navigate to dashboard - the auth context is now properly initialized
          navigate('/dashboard')
        } else {
          toast.error(data.error || 'Registration failed')
        }
      } else {
        // Regular profile completion (user already exists)
        const token = localStorage.getItem('token')
        if (!token) {
          toast.error('No authentication token found. Please login again.')
          navigate('/login')
          return
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/complete-oauth-profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(profileData)
        })

        const data = await response.json()

        if (data.success) {
          toast.success('Profile completed successfully!')
          navigate('/dashboard')
        } else {
          toast.error(data.error || 'Failed to complete profile')
        }
      }
    } catch (error) {
      console.error('Profile completion error:', error)
      toast.error('An error occurred while completing your profile')
    } finally {
      setLoading(false)
    }
  }

  const updateProfileData = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return profileData.studentType !== ''
      case 2: 
        if (profileData.studentType === 'high_school') {
          return profileData.highSchoolGrade !== ''
        } else if (profileData.studentType === 'university') {
          return profileData.universityLevel !== ''
        }
        return false
      case 3: 
        if (profileData.studentType === 'high_school') {
          return profileData.highSchoolStream !== ''
        } else if (profileData.studentType === 'university') {
          return profileData.university !== '' && profileData.department !== ''
        }
        return false
      default: return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                What type of student are you?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                This helps us show you the right content and resources.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  profileData.studentType === 'high_school'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => updateProfileData('studentType', 'high_school')}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🏫</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">High School Student</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Grades 9-12</div>
                  </div>
                </div>
              </button>

              <button
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  profileData.studentType === 'university'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                onClick={() => updateProfileData('studentType', 'university')}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🏛️</span>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">University Student</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Undergraduate & Graduate</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )

      case 2:
        if (profileData.studentType === 'high_school') {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  What grade are you in?
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'grade_9', label: 'Grade 9' },
                  { value: 'grade_10', label: 'Grade 10' },
                  { value: 'grade_11', label: 'Grade 11' },
                  { value: 'grade_12', label: 'Grade 12' }
                ].map((grade) => (
                  <button
                    key={grade.value}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      profileData.highSchoolGrade === grade.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => updateProfileData('highSchoolGrade', grade.value)}
                  >
                    <div className="font-medium">{grade.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )
        } else if (profileData.studentType === 'university') {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  What's your university level?
                </h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: 'remedial', label: 'Remedial', desc: 'Preparatory courses' },
                  { value: 'freshman', label: 'Freshman', desc: '1st year undergraduate' },
                  { value: 'senior', label: 'Senior', desc: 'Upper level undergraduate' },
                  { value: 'gc', label: 'Graduate/Continuing', desc: 'Masters, PhD, or continuing education' }
                ].map((level) => (
                  <button
                    key={level.value}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      profileData.universityLevel === level.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => updateProfileData('universityLevel', level.value)}
                  >
                    <div className="font-medium">{level.label}</div>
                    <div className="text-sm text-gray-500">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )
        }
        break

      case 3:
        if (profileData.studentType === 'high_school') {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  What's your stream?
                </h3>
              </div>
              
              <div className="space-y-3">
                <button
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    profileData.highSchoolStream === 'natural'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => updateProfileData('highSchoolStream', 'natural')}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🧪</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Natural Science</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Physics, Chemistry, Biology, Math</div>
                    </div>
                  </div>
                </button>

                <button
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    profileData.highSchoolStream === 'social'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => updateProfileData('highSchoolStream', 'social')}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📖</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Social Science</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">History, Geography, Languages, Arts</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )
        } else if (profileData.studentType === 'university') {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  University Details
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tell us about your university and department
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    University Name
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 pr-10 md:pr-12 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white appearance-none touch-manipulation min-h-[44px] md:min-h-[48px] text-sm md:text-base"
                      value={profileData.university}
                      onChange={(e) => updateProfileData('university', e.target.value)}
                    >
                      <option value="" className="text-sm md:text-base">Select a university</option>
                      {universities.map((univ) => (
                        <option key={univ.id} value={univ.id} className="text-sm md:text-base py-2">
                          {univ.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 md:px-4 text-gray-500">
                      <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <div className="relative">
                    <select
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 pr-10 md:pr-12 border border-gray-300 dark:border-gray-600 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 appearance-none touch-manipulation min-h-[44px] md:min-h-[48px] text-sm md:text-base"
                      value={profileData.department}
                      onChange={(e) => updateProfileData('department', e.target.value)}
                      disabled={!profileData.university}
                    >
                      <option value="" className="text-sm md:text-base">
                        {profileData.university ? 'Select a department' : 'Select university first'}
                      </option>
                      {filteredDepartments.map((dept) => (
                        <option key={dept.id} value={dept.id} className="text-sm md:text-base py-2">
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 md:px-4 text-gray-500">
                      <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        break

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Progress Bar */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              currentStep === 1
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-700 shadow'
            }`}
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </button>

          {currentStep === totalSteps ? (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg transition-all"
              onClick={handleSubmit}
              disabled={loading || !canProceed()}
            >
              {loading ? 'Completing...' : 'Complete Profile'}
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg transition-all"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
            </button>
          )}
        </div>

        {/* Skip Option */}
        <div className="text-center">
          <button
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline"
            onClick={() => navigate('/dashboard')}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}