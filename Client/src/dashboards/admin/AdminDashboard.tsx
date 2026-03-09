import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { ResourceUpload, UploadFormData } from '@components/resources/ResourceUpload'
import { ResourceUploadForm } from '@components/resources/ResourceUploadForm'
import { resourceService } from '@services/resourceService'

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

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
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardBody>
              <div className="flex items-center gap-6">
                <div className="text-4xl">📚</div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium m-0">Total Resources</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 m-0">156</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center gap-6">
                <div className="text-4xl">👥</div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium m-0">Active Students</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 m-0">342</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center gap-6">
                <div className="text-4xl">✏️</div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium m-0">Quizzes Created</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 m-0">28</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center gap-6">
                <div className="text-4xl">⏳</div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium m-0">Pending Approvals</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2 m-0">5</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b-2 border-gray-200 flex gap-0 overflow-x-auto">
          <button
            className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === 'overview'
              ? 'text-purple-600 border-purple-600 -mb-0.5'
              : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === 'resources'
              ? 'text-purple-600 border-purple-600 -mb-0.5'
              : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('resources')}
          >
            Resource Management
          </button>
          <button
            className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === 'students'
              ? 'text-purple-600 border-purple-600 -mb-0.5'
              : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('students')}
          >
            Student Management
          </button>
          <button
            className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === 'subjects'
              ? 'text-purple-600 border-purple-600 -mb-0.5'
              : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('subjects')}
          >
            Subject Management
          </button>
          <button
            className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === 'departments'
              ? 'text-purple-600 border-purple-600 -mb-0.5'
              : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('departments')}
          >
            Department Management
          </button>
          <button
            className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === 'universities'
              ? 'text-purple-600 border-purple-600 -mb-0.5'
              : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('universities')}
          >
            University Management
          </button>
          <button
            className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === 'quizzes'
              ? 'text-purple-600 border-purple-600 -mb-0.5'
              : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('quizzes')}
          >
            Quiz Management
          </button>
          <button
            className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === 'upload'
              ? 'text-purple-600 border-purple-600 -mb-0.5'
              : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('upload')}
          >
            📤 Upload Resource
          </button>
          <button
            className={`px-6 py-3 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 ${activeTab === 'analytics'
              ? 'text-purple-600 border-purple-600 -mb-0.5'
              : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('analytics')}
          >
            Reports
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
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

        <ResourceUpload
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSubmit={handleUploadSubmit}
          loading={isUploading}
        />
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
