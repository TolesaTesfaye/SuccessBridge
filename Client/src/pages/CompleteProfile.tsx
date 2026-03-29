import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProfileData {
  studentType: 'high_school' | 'university' | ''
  highSchoolGrade: string
  highSchoolStream: string
  universityLevel: string
  university: string
  department: string
}

export const CompleteProfile: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    studentType: '',
    highSchoolGrade: '',
    highSchoolStream: '',
    universityLevel: '',
    university: '',
    department: ''
  })

  const totalSteps = profileData.studentType === 'high_school' ? 3 : 
                    profileData.studentType === 'university' ? 4 : 2

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
      const token = localStorage.getItem('token')
      if (!token) {
        alert('No authentication token found. Please login again.')
        navigate('/login')
        return
      }

      console.log('Submitting profile data:', profileData)
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/complete-oauth-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()
      console.log('Profile completion response:', data)

      if (data.success) {
        alert('Profile completed successfully!')
        navigate('/dashboard')
      } else {
        alert(data.error || 'Failed to complete profile')
      }
    } catch (error) {
      console.error('Profile completion error:', error)
      alert('An error occurred while completing your profile')
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
      case 1: return true // Welcome step
      case 2: return profileData.studentType !== ''
      case 3: 
        if (profileData.studentType === 'high_school') {
          return profileData.highSchoolGrade !== ''
        } else if (profileData.studentType === 'university') {
          return profileData.universityLevel !== ''
        }
        return false
      case 4: 
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
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">👋</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to SuccessBridge!
              </h3>
              <p className="text-gray-600">
                Let's set up your profile to provide you with personalized learning resources.
                This will only take a minute.
              </p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                What type of student are you?
              </h3>
              <p className="text-gray-600">
                This helps us show you the right content and resources.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  profileData.studentType === 'high_school'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => updateProfileData('studentType', 'high_school')}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🏫</span>
                  <div>
                    <div className="font-medium">High School Student</div>
                    <div className="text-sm text-gray-500">Grades 9-12</div>
                  </div>
                </div>
              </button>

              <button
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  profileData.studentType === 'university'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => updateProfileData('studentType', 'university')}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🏛️</span>
                  <div>
                    <div className="font-medium">University Student</div>
                    <div className="text-sm text-gray-500">Undergraduate & Graduate</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )

      case 3:
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

      case 4:
        if (profileData.studentType === 'high_school') {
          return (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  What's your stream?
                </h3>
              </div>
              
              <div className="space-y-3">
                <button
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    profileData.highSchoolStream === 'natural'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateProfileData('highSchoolStream', 'natural')}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🧪</span>
                    <div>
                      <div className="font-medium">Natural Science</div>
                      <div className="text-sm text-gray-500">Physics, Chemistry, Biology, Math</div>
                    </div>
                  </div>
                </button>

                <button
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    profileData.highSchoolStream === 'social'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateProfileData('highSchoolStream', 'social')}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📖</span>
                    <div>
                      <div className="font-medium">Social Science</div>
                      <div className="text-sm text-gray-500">History, Geography, Languages, Arts</div>
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
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  University Details
                </h3>
                <p className="text-gray-600">
                  Tell us about your university and department
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Name
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={profileData.university}
                    onChange={(e) => updateProfileData('university', e.target.value)}
                    placeholder="e.g., Addis Ababa University"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={profileData.department}
                    onChange={(e) => updateProfileData('department', e.target.value)}
                    placeholder="e.g., Computer Science"
                  />
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Progress Bar */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Step Content */}
        <div className="bg-white p-8 rounded-lg shadow">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            className={`px-6 py-2 rounded-md ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </button>

          {currentStep === totalSteps ? (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading || !canProceed()}
            >
              {loading ? 'Completing...' : 'Complete Profile'}
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
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
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => navigate('/dashboard')}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}