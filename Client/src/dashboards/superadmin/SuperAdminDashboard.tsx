import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'
import { userService } from '@services/userService'
import { resourceService } from '@services/resourceService'
import { ResourceUploadForm, UploadFormData } from '@components/resources/ResourceUploadForm'
import { SuperAdminAddQuiz } from '@pages/superadmin/SuperAdminAddQuiz'

// Import extracted components
import { 
  OverviewTab, 
  ApprovalsTab, 
  AdminsTab, 
  StudentsTab, 
  ResourcesTab, 
  UniversitiesTab,
  AdminDashboardView,
  HighSchoolGradeView,
  UniversityLevelView
} from './components'

export const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  // New state for High School and University views
  const [highSchoolActiveGrade, setHighSchoolActiveGrade] = useState<'grade_9' | 'grade_10' | 'grade_11' | 'grade_12'>('grade_9')
  const [universityActiveLevel, setUniversityActiveLevel] = useState<'freshman' | 'remedial' | 'senior' | 'gc'>('freshman')
  
  // Real data from database
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeStudents: 0,
    totalResources: 0,
    pendingApprovals: 0,
    loading: true
  })
  
  // Fetch dashboard statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, resourcesRes] = await Promise.all([
          userService.getAllUsers(),
          resourceService.getResources({ limit: 1 })
        ])
        
        const users = Array.isArray(usersRes) ? usersRes : (usersRes.data || [])
        const activeStudents = users.filter((u: any) => u.role === 'student').length
        
        setStats({
          totalUsers: users.length,
          activeStudents,
          totalResources: Array.isArray(resourcesRes) ? resourcesRes.length : (resourcesRes.data?.total || 0),
          pendingApprovals: 0, // TODO: Add approval system
          loading: false
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
        setStats(prev => ({ ...prev, loading: false }))
      }
    }

    fetchStats()
  }, [])

  const handleUploadSubmit = async (data: UploadFormData) => {
    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('educationLevel', data.educationLevel)
      formData.append('type', data.type)
      formData.append('subject', data.subject)
      formData.append('tags', data.tags)
      if (data.file) formData.append('file', data.file)
      if (data.grade) formData.append('gradeId', data.grade)
      if (data.stream) formData.append('stream', data.stream)
      if (data.universityId) formData.append('universityId', data.universityId)
      if (data.departmentId) formData.append('departmentId', data.departmentId)
      if (data.category) formData.append('category', data.category)

      await resourceService.uploadResource(formData)
      setShowUploadModal(false)
      alert('Resource uploaded successfully!')
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload resource. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }



  return (
    <DashboardLayout title="Super Admin Dashboard" subtitle="Platform-wide management and analytics">
      <div className="space-y-0">
        {/* Main Tabs - Compact & Scrollable */}
        <div className="border-b-2 border-gray-200 dark:border-slate-700 flex gap-0 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent -mx-6 px-6">
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'overview'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          
          {/* High School Tabs */}
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm flex items-center gap-1 ${activeTab === 'grade_9'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => {
              setActiveTab('grade_9')
              setHighSchoolActiveGrade('grade_9')
            }}
          >
            <span>9️⃣</span>
            Grade 9
          </button>
          
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm flex items-center gap-1 ${activeTab === 'grade_10'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => {
              setActiveTab('grade_10')
              setHighSchoolActiveGrade('grade_10')
            }}
          >
            <span>🔟</span>
            Grade 10
          </button>
          
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm flex items-center gap-1 ${activeTab === 'grade_11'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => {
              setActiveTab('grade_11')
              setHighSchoolActiveGrade('grade_11')
            }}
          >
            <span>1️⃣1️⃣</span>
            Grade 11
          </button>
          
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm flex items-center gap-1 ${activeTab === 'grade_12'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => {
              setActiveTab('grade_12')
              setHighSchoolActiveGrade('grade_12')
            }}
          >
            <span>1️⃣2️⃣</span>
            Grade 12
          </button>

          {/* University Tabs */}
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm flex items-center gap-1 ${activeTab === 'freshman'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => {
              setActiveTab('freshman')
              setUniversityActiveLevel('freshman')
            }}
          >
            <span>🆕</span>
            Freshman
          </button>
          
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm flex items-center gap-1 ${activeTab === 'remedial'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => {
              setActiveTab('remedial')
              setUniversityActiveLevel('remedial')
            }}
          >
            <span>📖</span>
            Remedial
          </button>
          
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm flex items-center gap-1 ${activeTab === 'senior'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => {
              setActiveTab('senior')
              setUniversityActiveLevel('senior')
            }}
          >
            <span>🎯</span>
            Senior
          </button>
          
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm flex items-center gap-1 ${activeTab === 'gc'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => {
              setActiveTab('gc')
              setUniversityActiveLevel('gc')
            }}
          >
            <span>🏆</span>
            GC
          </button>

          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'upload'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('upload')}
          >
            📤 Upload
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'approvals'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('approvals')}
          >
            Approvals
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'universities'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('universities')}
          >
            Universities
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'admins'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('admins')}
          >
            Admins
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'students'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'resources'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'addquiz'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('addquiz')}
          >
            Add Quiz
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'admin-view'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('admin-view')}
          >
            👨‍💼 Admin View
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn pt-6">
          {activeTab === 'overview' && <OverviewTab stats={stats} />}
          
          {/* High School Grade Pages */}
          {activeTab === 'grade_9' && <HighSchoolGradeView grade="grade_9" />}
          {activeTab === 'grade_10' && <HighSchoolGradeView grade="grade_10" />}
          {activeTab === 'grade_11' && <HighSchoolGradeView grade="grade_11" />}
          {activeTab === 'grade_12' && <HighSchoolGradeView grade="grade_12" />}
          
          {/* University Level Pages */}
          {activeTab === 'freshman' && <UniversityLevelView level="freshman" />}
          {activeTab === 'remedial' && <UniversityLevelView level="remedial" />}
          {activeTab === 'senior' && <UniversityLevelView level="senior" />}
          {activeTab === 'gc' && <UniversityLevelView level="gc" />}
          
          {activeTab === 'upload' && (
            <Card>
              <CardHeader>📤 Upload New Resource</CardHeader>
              <CardBody>
                <ResourceUploadForm onSubmit={handleUploadSubmit} loading={isUploading} />
              </CardBody>
            </Card>
          )}
          {activeTab === 'approvals' && <ApprovalsTab />}
          {activeTab === 'universities' && <UniversitiesTab />}
          {activeTab === 'admins' && <AdminsTab onViewAdmin={setSelectedAdmin} onShowModal={() => setShowAdminModal(true)} />}
          {activeTab === 'students' && <StudentsTab onViewStudent={setSelectedStudent} onShowModal={() => setShowStudentModal(true)} />}
          {activeTab === 'resources' && <ResourcesTab onUpload={() => setShowUploadModal(true)} />}
          {activeTab === 'addquiz' && <SuperAdminAddQuiz />}
          {activeTab === 'admin-view' && <AdminDashboardView />}
        </div>

        {/* Upload Modal */}
        <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload New Resource" size="lg">
          <ResourceUploadForm onSubmit={handleUploadSubmit} loading={isUploading} />
        </Modal>

        {/* Student/Admin Detail Modal */}
        <Modal 
          isOpen={showStudentModal || showAdminModal} 
          onClose={() => {
            setShowStudentModal(false)
            setShowAdminModal(false)
          }} 
          title={selectedStudent?.isAdmin || selectedAdmin ? "Admin Detailed Profile" : "Student Detailed Profile"} 
          size="lg"
        >
          {(selectedStudent || selectedAdmin) && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-[20px] border border-slate-100 dark:border-white/5">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                  {(selectedStudent?.isAdmin || selectedAdmin) ? '👨‍💼' : '🎓'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">{(selectedAdmin || selectedStudent)?.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 m-0">{(selectedAdmin || selectedStudent)?.email}</p>
                </div>
                <div className="ml-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${(selectedAdmin || selectedStudent)?.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                    {(selectedAdmin || selectedStudent)?.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Academic Information</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Education Level</label>
                      <p className="text-slate-900 dark:text-white font-bold m-0">{(selectedAdmin || selectedStudent)?.educationLevel}</p>
                    </div>
                    {(selectedAdmin || selectedStudent)?.educationLevel === 'University' ? (
                      <>
                        <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                          <label className="text-xs font-semibold text-slate-400 block mb-1">University</label>
                          <p className="text-slate-900 dark:text-white font-bold m-0">{(selectedAdmin || selectedStudent)?.university}</p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                          <label className="text-xs font-semibold text-slate-400 block mb-1">Department</label>
                          <p className="text-slate-900 dark:text-white font-bold m-0">{(selectedAdmin || selectedStudent)?.department}</p>
                        </div>
                      </>
                    ) : (
                      <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                        <label className="text-xs font-semibold text-slate-400 block mb-1">Grade Level</label>
                        <p className="text-slate-900 dark:text-white font-bold m-0">{(selectedAdmin || selectedStudent)?.grade}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Account Details</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Database ID</label>
                      <p className="text-slate-900 dark:text-white font-mono text-xs m-0">{(selectedAdmin || selectedStudent)?.id}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Join Date</label>
                      <p className="text-slate-900 dark:text-white font-bold m-0">{(selectedAdmin || selectedStudent)?.joinedDate}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Role Type</label>
                      <p className="text-slate-900 dark:text-white font-bold m-0">{(selectedStudent?.isAdmin || selectedAdmin) ? 'Platform Administrator' : 'Student User'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t dark:border-white/5">
                <Button variant="secondary" fullWidth onClick={() => {
                  setShowStudentModal(false)
                  setShowAdminModal(false)
                }}>
                  Close Profile
                </Button>
                <Button variant="danger" fullWidth onClick={() => {
                  if (confirm(`Are you sure you want to delete ${(selectedAdmin || selectedStudent)?.name}?`)) {
                    setShowStudentModal(false)
                    setShowAdminModal(false)
                  }
                }}>
                  Deactivate Account
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  )
}