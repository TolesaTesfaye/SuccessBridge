import React, { useState } from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'
import { ResourceUploadForm, UploadFormData } from '@/components/resources/ResourceUploadForm'

export const AdminDashboardView: React.FC = () => {
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

      // Mock upload success for demo
      alert('Resource uploaded successfully!')
      setShowUploadModal(false)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload resource. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b-2 border-gray-200 dark:border-slate-700 flex gap-0 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
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

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload New Resource" size="lg">
        <ResourceUploadForm onSubmit={handleUploadSubmit} loading={isUploading} />
      </Modal>
    </div>
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
            Manage Students
          </Button>
        </div>
      </CardBody>
    </Card>

    <Card>
      <CardHeader>Recent Activity</CardHeader>
      <CardBody>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Resources Uploaded</span>
            <span className="font-semibold">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Active Students</span>
            <span className="font-semibold">45</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Quizzes Created</span>
            <span className="font-semibold">8</span>
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
        <span>Learning Resources</span>
        <Button variant="primary" size="sm" onClick={onUpload}>
          Upload Resource
        </Button>
      </div>
    </CardHeader>
    <CardBody>
      <p className="text-gray-600">Resource management interface would be here.</p>
    </CardBody>
  </Card>
)

const StudentsTab: React.FC = () => (
  <Card>
    <CardHeader>Students Management</CardHeader>
    <CardBody>
      <p className="text-gray-600">Student management interface would be here.</p>
    </CardBody>
  </Card>
)

const SubjectsTab: React.FC = () => (
  <Card>
    <CardHeader>Subjects</CardHeader>
    <CardBody>
      <p className="text-gray-600">Subject management interface would be here.</p>
    </CardBody>
  </Card>
)

const DepartmentsTab: React.FC = () => (
  <Card>
    <CardHeader>Departments</CardHeader>
    <CardBody>
      <p className="text-gray-600">Department management interface would be here.</p>
    </CardBody>
  </Card>
)

const UniversitiesTab: React.FC = () => (
  <Card>
    <CardHeader>Universities</CardHeader>
    <CardBody>
      <p className="text-gray-600">University management interface would be here.</p>
    </CardBody>
  </Card>
)

const QuizzesTab: React.FC = () => (
  <Card>
    <CardHeader>Quizzes</CardHeader>
    <CardBody>
      <p className="text-gray-600">Quiz management interface would be here.</p>
    </CardBody>
  </Card>
)

const AnalyticsTab: React.FC = () => (
  <Card>
    <CardHeader>Analytics & Reports</CardHeader>
    <CardBody>
      <p className="text-gray-600">Analytics and reporting interface would be here.</p>
    </CardBody>
  </Card>
)