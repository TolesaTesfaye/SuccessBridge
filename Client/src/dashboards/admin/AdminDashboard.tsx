import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'
import { ResourceUploadForm, UploadFormData } from '@/components/resources/ResourceUploadForm'
import { resourceService } from '@services/resourceService'

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  // Real data from database
  const [stats, setStats] = useState({
    totalResources: 0,
    activeStudents: 0,
    quizzesCreated: 0,
    pendingApprovals: 0,
    loading: true
  })

  // Fetch dashboard statistics
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const resourcesRes = await resourceService.getResources({ limit: 1 })
        
        setStats({
          totalResources: resourcesRes.data?.total || 0,
          activeStudents: 0, // TODO: Add student count API
          quizzesCreated: 0, // TODO: Add quiz count API
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
      // Ideally refresh resources tab if active or show success toast
      alert('Resource uploaded successfully!')
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload resource. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Manage your department resources and students">
      <div className="space-y-0">
        {/* Tabs - Compact & Scrollable */}
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
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'students'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'subjects'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('subjects')}
          >
            Subjects
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'departments'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('departments')}
          >
            Departments
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
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'quizzes'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('quizzes')}
          >
            Quizzes
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
            className={`px-4 py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-sm ${activeTab === 'analytics'
              ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5'
              : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white'
              }`}
            onClick={() => setActiveTab('analytics')}
          >
            Reports
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn pt-6">
          {activeTab === 'overview' && <OverviewTab onUpload={() => setShowUploadModal(true)} />}
          {activeTab === 'upload' && (
            <Card>
              <CardHeader>📤 Upload New Resource</CardHeader>
              <CardBody>
                <ResourceUploadForm onSubmit={handleUploadSubmit} loading={isUploading} />
              </CardBody>
            </Card>
          )}
          {activeTab === 'resources' && <ResourcesTab onUpload={() => setShowUploadModal(true)} />}
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'subjects' && <SubjectsTab />}
          {activeTab === 'departments' && <DepartmentsTab />}
          {activeTab === 'universities' && <UniversitiesTab />}
          {activeTab === 'quizzes' && <QuizzesTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
        </div>

        <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload New Resource" size="lg">
          <ResourceUploadForm onSubmit={handleUploadSubmit} loading={isUploading} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

const OverviewTab: React.FC<{ onUpload: () => void }> = ({ onUpload }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card>
      <CardHeader>Quick Actions</CardHeader>
      <CardBody>
        <div className="space-y-3">
          <Button variant="primary" fullWidth onClick={onUpload}>
            Upload Resource
          </Button>
          <Button variant="secondary" fullWidth>
            Create Quiz
          </Button>
          <Button variant="secondary" fullWidth>
            Add Subject
          </Button>
          <Button variant="secondary" fullWidth>
            View Analytics
          </Button>
        </div>
      </CardBody>
    </Card>

    <Card>
      <CardHeader>Recent Activity</CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div className="flex gap-3 pb-3 border-b border-gray-200">
            <span className="text-2xl">📚</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 m-0">New resource uploaded</p>
              <p className="text-sm text-gray-600 m-0">2 hours ago</p>
            </div>
          </div>
          <div className="flex gap-3 pb-3 border-b border-gray-200">
            <span className="text-2xl">✏️</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 m-0">Quiz created</p>
              <p className="text-sm text-gray-600 m-0">5 hours ago</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">👥</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 m-0">New student enrolled</p>
              <p className="text-sm text-gray-600 m-0">1 day ago</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  </div>
)

const ResourcesTab: React.FC<{ onUpload: () => void }> = ({ onUpload }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <span>Resource Management</span>
        <Button variant="primary" size="sm" onClick={onUpload}>
          Upload Resource
        </Button>
      </div>
    </CardHeader>
    <CardBody>
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg mb-2">📚 Resource Management</p>
        <p>Upload and manage learning resources for your department</p>
      </div>
    </CardBody>
  </Card>
)

const StudentsTab: React.FC = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <span>Student Management</span>
        <Button variant="secondary" size="sm">
          Refresh
        </Button>
      </div>
    </CardHeader>
    <CardBody>
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg mb-2">👥 Student Management</p>
        <p>View and manage students in your department</p>
      </div>
    </CardBody>
  </Card>
)

const SubjectsTab: React.FC = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <span>Subject Management</span>
        <Button variant="primary" size="sm">
          Add Subject
        </Button>
      </div>
    </CardHeader>
    <CardBody>
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg mb-2">📖 Subject Management</p>
        <p>Create and manage subjects for your department</p>
      </div>
    </CardBody>
  </Card>
)

const DepartmentsTab: React.FC = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <span>Department Management</span>
        <Button variant="secondary" size="sm">
          Refresh
        </Button>
      </div>
    </CardHeader>
    <CardBody>
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg mb-2">🏢 Department Management</p>
        <p>Manage department information and settings</p>
      </div>
    </CardBody>
  </Card>
)

const UniversitiesTab: React.FC = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <span>University Management</span>
        <Button variant="secondary" size="sm">
          Refresh
        </Button>
      </div>
    </CardHeader>
    <CardBody>
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg mb-2">🏫 University Management</p>
        <p>Manage university information and student settings</p>
      </div>
    </CardBody>
  </Card>
)

const QuizzesTab: React.FC = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <span>Quiz Management</span>
        <Button variant="primary" size="sm">
          Create Quiz
        </Button>
      </div>
    </CardHeader>
    <CardBody>
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg mb-2">✏️ Quiz Management</p>
        <p>Create and manage quizzes for your students</p>
      </div>
    </CardBody>
  </Card>
)

const AnalyticsTab: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card>
      <CardHeader>Student Performance</CardHeader>
      <CardBody>
        <div className="flex items-center justify-center min-h-80 bg-gray-50 rounded text-gray-600">
          <p>📊 Performance analytics will be displayed here</p>
        </div>
      </CardBody>
    </Card>

    <Card>
      <CardHeader>Resource Usage</CardHeader>
      <CardBody>
        <div className="flex items-center justify-center min-h-80 bg-gray-50 rounded text-gray-600">
          <p>📈 Resource usage metrics will be displayed here</p>
        </div>
      </CardBody>
    </Card>
  </div>
)
