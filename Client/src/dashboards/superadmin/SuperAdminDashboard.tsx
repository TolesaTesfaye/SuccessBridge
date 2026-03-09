import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'
import { userService } from '@services/userService'
import { resourceService } from '@services/resourceService'
import { ResourceUpload, UploadFormData } from '@components/resources/ResourceUpload'
import { ResourceUploadForm } from '@components/resources/ResourceUploadForm'
import { SuperAdminAddQuiz } from '@pages/superadmin/SuperAdminAddQuiz'

export const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [showStudentModal, setShowStudentModal] = useState(false)
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
      <div className="space-y-4">
        {/* Management Navigator - Ultra Compact & Full Width */}
        <div className="mb-4">
          <div className="bg-white dark:bg-slate-800/40 p-1.5 rounded-[20px] shadow-sm border border-slate-200 dark:border-white/5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1.5 w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-[16px] font-bold text-[10px] transition-all duration-500 whitespace-nowrap ${activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
            >
              <span className="text-lg">📊</span>
              Overview
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-[16px] font-bold text-[10px] transition-all duration-500 whitespace-nowrap ${activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
            >
              <span className="text-lg">📤</span>
              Upload
            </button>

            <button
              onClick={() => setActiveTab('approvals')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-[16px] font-bold text-[10px] transition-all duration-500 whitespace-nowrap ${activeTab === 'approvals'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
            >
              <span className="text-lg">⏳</span>
              Approvals
            </button>

            <button
              onClick={() => setActiveTab('universities')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-[16px] font-bold text-[10px] transition-all duration-500 whitespace-nowrap ${activeTab === 'universities'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
            >
              <span className="text-lg">🏫</span>
              Universities
            </button>

            <button
              onClick={() => setActiveTab('admins')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-[16px] font-bold text-[10px] transition-all duration-500 whitespace-nowrap ${activeTab === 'admins'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
            >
              <span className="text-lg">👨‍💼</span>
              Admins
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-[16px] font-bold text-[10px] transition-all duration-500 whitespace-nowrap ${activeTab === 'students'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
            >
              <span className="text-lg">👥</span>
              Students
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-[16px] font-bold text-[10px] transition-all duration-500 whitespace-nowrap ${activeTab === 'resources'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
            >
              <span className="text-lg">📚</span>
              Resources
            </button>

            <button
              onClick={() => setActiveTab('addquiz')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-[16px] font-bold text-[10px] transition-all duration-500 whitespace-nowrap ${activeTab === 'addquiz'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
            >
              <span className="text-lg">➕</span>
              Add Quiz
            </button>
          </div>
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
          {activeTab === 'approvals' && <ApprovalsTab />}
          {activeTab === 'universities' && <UniversitiesTab />}
          {activeTab === 'admins' && <AdminsTab onViewAdmin={setSelectedStudent} onShowModal={() => setShowStudentModal(true)} />}
          {activeTab === 'students' && <StudentsTab onViewStudent={setSelectedStudent} onShowModal={() => setShowStudentModal(true)} />}
          {activeTab === 'resources' && <ResourcesTab onUpload={() => setShowUploadModal(true)} />}
          {activeTab === 'addquiz' && <SuperAdminAddQuiz />}
        </div>

        <ResourceUpload
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSubmit={handleUploadSubmit}
          loading={isUploading}
        />

        <Modal isOpen={showStudentModal} onClose={() => setShowStudentModal(false)} title={selectedStudent?.isAdmin ? "Admin Detailed Profile" : "Student Detailed Profile"} size="lg">
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-[20px] border border-slate-100 dark:border-white/5">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                  {selectedStudent.isAdmin ? '👨‍💼' : '🎓'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">{selectedStudent.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 m-0">{selectedStudent.email}</p>
                </div>
                <div className="ml-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedStudent.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                    {selectedStudent.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Academic Information</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Education Level</label>
                      <p className="text-slate-900 dark:text-white font-bold m-0">{selectedStudent.educationLevel}</p>
                    </div>
                    {selectedStudent.educationLevel === 'University' ? (
                      <>
                        <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                          <label className="text-xs font-semibold text-slate-400 block mb-1">University</label>
                          <p className="text-slate-900 dark:text-white font-bold m-0">{selectedStudent.university}</p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                          <label className="text-xs font-semibold text-slate-400 block mb-1">Department</label>
                          <p className="text-slate-900 dark:text-white font-bold m-0">{selectedStudent.department}</p>
                        </div>
                      </>
                    ) : (
                      <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                        <label className="text-xs font-semibold text-slate-400 block mb-1">Grade Level</label>
                        <p className="text-slate-900 dark:text-white font-bold m-0">{selectedStudent.grade}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Account Details</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Database ID</label>
                      <p className="text-slate-900 dark:text-white font-mono text-xs m-0">{selectedStudent.id}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Join Date</label>
                      <p className="text-slate-900 dark:text-white font-bold m-0">{selectedStudent.joinedDate}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Role Type</label>
                      <p className="text-slate-900 dark:text-white font-bold m-0">{selectedStudent.isAdmin ? 'Platform Administrator' : 'Student User'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t dark:border-white/5">
                <Button variant="secondary" fullWidth onClick={() => setShowStudentModal(false)}>
                  Close Profile
                </Button>
                <Button variant="danger" fullWidth onClick={() => {
                  if (confirm(`Are you sure you want to delete ${selectedStudent.name}?`)) {
                    // Logic to delete would go here, or we trigger the delete function from the parent
                    setShowStudentModal(false);
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

const OverviewTab: React.FC<{ onUpload: () => void }> = ({ onUpload }) => (
  <div className="space-y-6">
    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Total Users</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">125,430</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">↑ 12.5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Active Students</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">98,250</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">↑ 8.2% from last month</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-2xl">
              🎓
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Total Resources</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">12,450</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">↑ 5.3% from last month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-2xl">
              📚
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Pending Approvals</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">23</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Requires attention</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-2xl">
              ⏳
            </div>
          </div>
        </CardBody>
      </Card>
    </div>

    {/* Recent Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>📊 Recent Activity</CardHeader>
        <CardBody>
          <div className="space-y-3">
            {[
              { action: 'New user registered', user: 'John Doe', time: '5 minutes ago', icon: '👤' },
              { action: 'Resource uploaded', user: 'Admin Smith', time: '15 minutes ago', icon: '📤' },
              { action: 'Quiz completed', user: 'Jane Wilson', time: '1 hour ago', icon: '✅' },
              { action: 'Resource approved', user: 'Super Admin', time: '2 hours ago', icon: '✓' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{activity.action}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>🎯 Quick Stats</CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Platform Usage</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">78%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Storage Used</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">45%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Avg Quiz Score</span>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">76.8%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '76.8%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">User Satisfaction</span>
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">92%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  </div>
)

const ApprovalsTab: React.FC = () => (
  <Card>
    <CardHeader>Pending Resource Approvals</CardHeader>
    <CardBody>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex justify-between items-center p-5 bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-white/5 border-l-4 border-l-blue-600 transition-all hover:shadow-md">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Resource Title {i}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Uploaded by Admin {i} • 2 days ago</p>
            </div>
            <div className="flex gap-3">
              <Button variant="success" size="sm" className="rounded-xl">
                Approve
              </Button>
              <Button variant="danger" size="sm" className="rounded-xl">
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
)

const UniversitiesTab: React.FC = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <span>Universities</span>
        <Button variant="primary" size="sm">
          Add University
        </Button>
      </div>
    </CardHeader>
    <CardBody>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/60 border-y border-slate-100 dark:border-white/5 transition-colors">
              <th className="px-8 py-4 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Name</th>
              <th className="px-8 py-4 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Location</th>
              <th className="px-8 py-4 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Departments</th>
              <th className="px-8 py-4 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Admins</th>
              <th className="px-8 py-4 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-white/5 transition-colors">
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i} className="hover:bg-blue-50/30 dark:hover:bg-white/5 transition-all group">
                <td className="px-8 py-4 text-slate-900 dark:text-white font-bold text-sm italic">University {i}</td>
                <td className="px-8 py-4 text-slate-500 dark:text-slate-400 font-medium text-xs tracking-tight">City {i}</td>
                <td className="px-8 py-4 text-slate-500 dark:text-slate-400 font-bold text-xs">8</td>
                <td className="px-8 py-4 text-slate-500 dark:text-slate-400 font-bold text-xs">3</td>
                <td className="px-8 py-4 text-right">
                  <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBody>
  </Card>
)

const DepartmentsTab: React.FC = () => (
  <Card>
    <CardHeader>Department Management</CardHeader>
    <CardBody>
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg mb-2">🏢 Manage Departments</p>
        <p>Assign departments to universities and manage subjects.</p>
      </div>
    </CardBody>
  </Card>
)

const SettingsTab: React.FC = () => (
  <Card>
    <CardHeader>Platform Settings</CardHeader>
    <CardBody>
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg mb-2">⚙️ Global Configuration</p>
        <p>Maintain platform-wide settings and features.</p>
      </div>
    </CardBody>
  </Card>
)

const LogsTab: React.FC = () => (
  <Card>
    <CardHeader>Security & Logs</CardHeader>
    <CardBody>
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg mb-2">🛡️ System Audits</p>
        <p>Monitor system activity and security events.</p>
      </div>
    </CardBody>
  </Card>
)

const AdminsTab: React.FC<{ onViewAdmin: (admin: any) => void; onShowModal: () => void }> = ({ onViewAdmin, onShowModal }) => {
  const [admins, setAdmins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userService.getAllUsers(1, 100, 'admin')
      const adminsList = Array.isArray(response.data) ? response.data : []
      setAdmins(adminsList)
    } catch (err) {
      setError('Failed to load admins')
      console.error(err)
      setAdmins([])
    } finally {
      setLoading(false)
    }
  }

  const handleViewAdmin = (admin: any) => {
    onViewAdmin({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      educationLevel: 'University',
      university: admin.universityId || 'N/A',
      department: admin.departmentId || 'N/A',
      joinedDate: new Date(admin.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'Active',
      isAdmin: true,
    })
    onShowModal()
  }

  const handleDeleteAdmin = async (id: string) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      try {
        await userService.deleteUser(id)
        setAdmins(admins.filter(a => a.id !== id))
      } catch (err) {
        alert('Failed to delete admin')
        console.error(err)
      }
    }
  }

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-4"></div>
            <p className="text-slate-500 font-medium tracking-wide">Securing administrator data...</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50">
      <CardHeader className="bg-white dark:bg-slate-800/60 pb-0 border-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">🛡️</span>
              Platform Administrators
            </h2>
            <p className="text-slate-500 text-sm mt-1">Manage system-wide permissions and admin accounts</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="Search admins..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="secondary" size="sm" onClick={fetchAdmins} className="rounded-xl">
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-900/20 border-y border-slate-100 dark:border-white/5">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Administrator</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">University</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-3">👻</span>
                      <p className="text-slate-500 font-medium">No administrators matching your search</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAdmins.map(admin => (
                  <tr key={admin.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center font-bold text-blue-600">
                          {admin.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{admin.name}</div>
                          <div className="text-xs text-slate-400">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {admin.universityId || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {admin.departmentId || 'All Depts'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {new Date(admin.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-bold tracking-wider uppercase">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleViewAdmin(admin)}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg transition-colors tooltip"
                          title="View Profile"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleDeleteAdmin(admin.id)}
                          className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-rose-600 rounded-lg transition-colors"
                          title="Delete Admin"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  )
}

const AnalyticsTab: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card>
      <CardHeader>Platform Usage</CardHeader>
      <CardBody>
        <div className="flex items-center justify-center min-h-80 bg-gray-50 rounded text-gray-600">
          <p>📊 Platform usage chart will be displayed here</p>
        </div>
      </CardBody>
    </Card>

    <Card>
      <CardHeader>User Growth</CardHeader>
      <CardBody>
        <div className="flex items-center justify-center min-h-80 bg-gray-50 rounded text-gray-600">
          <p>📈 User growth metrics will be displayed here</p>
        </div>
      </CardBody>
    </Card>

    <Card>
      <CardHeader>Resource Distribution</CardHeader>
      <CardBody>
        <div className="flex items-center justify-center min-h-80 bg-gray-50 rounded text-gray-600">
          <p>📊 Resource distribution will be displayed here</p>
        </div>
      </CardBody>
    </Card>

    <Card>
      <CardHeader>Top Universities</CardHeader>
      <CardBody>
        <div className="flex items-center justify-center min-h-80 bg-gray-50 rounded text-gray-600">
          <p>🏆 Top universities ranking will be displayed here</p>
        </div>
      </CardBody>
    </Card>
  </div>
)


const StudentsTab: React.FC<{ onViewStudent: (student: any) => void; onShowModal: () => void }> = ({ onViewStudent, onShowModal }) => {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userService.getAllUsers(1, 100, 'student')
      const studentsList = Array.isArray(response.data) ? response.data : []
      setStudents(studentsList)
    } catch (err) {
      setError('Failed to load students')
      console.error(err)
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  const handleViewStudent = (student: any) => {
    onViewStudent({
      id: student.id,
      name: student.name,
      email: student.email,
      educationLevel: student.universityId ? 'University' : 'High School',
      university: student.universityId || 'N/A',
      department: student.departmentId || 'N/A',
      grade: student.gradeId ? `Grade ${student.gradeId}` : 'N/A',
      joinedDate: new Date(student.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'Active',
      isAdmin: false
    })
    onShowModal()
  }

  const handleDeleteStudent = async (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        await userService.deleteUser(id)
        setStudents(students.filter(s => s.id !== id))
      } catch (err) {
        alert('Failed to delete student')
        console.error(err)
      }
    }
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const level = student.universityId ? 'university' : 'high_school'
    const matchesLevel = levelFilter === 'all' || level === levelFilter
    return matchesSearch && matchesLevel
  })

  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-20">
            <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-purple-600 rounded-full mb-4"></div>
            <p className="text-slate-500 font-bold animate-pulse">Synchronizing student records...</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-none shadow-2xl shadow-slate-200/50">
      <CardHeader className="bg-white dark:bg-slate-800/60 pb-0 border-none">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
              🎓
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Active Student Registry</h2>
              <p className="text-slate-500 text-sm font-medium">Monitoring {students.length} curious minds on SuccessBridge</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full xl:w-auto">
            <div className="relative flex-1 min-w-[200px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="Find a student..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-purple-500/10 transition-all cursor-pointer"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="high_school">High School</option>
              <option value="university">University</option>
            </select>

            <button
              onClick={fetchStudents}
              className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              title="Refresh Registry"
            >
              🔄
            </button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-white/5">
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Student Identity</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">University / Level</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Department / Grade</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Platform Join</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Account Status</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-32 text-center">
                    <div className="relative">
                      <div className="text-8xl mb-4 opacity-20">🕵️‍♂️</div>
                      <p className="text-slate-500 text-xl font-black">No scholars found in this scope</p>
                      <p className="text-slate-400 mt-2 font-medium">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-900/5 transition-all group cursor-default">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                            {student.name.charAt(0)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800"></div>
                        </div>
                        <div>
                          <div className="font-black text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">{student.name}</div>
                          <div className="text-sm font-medium text-slate-400 select-all">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${student.universityId ? 'text-blue-500' : 'text-orange-500'
                          }`}>
                          {student.universityId ? 'University' : 'High School'}
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {student.universityId || 'General High School'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                          {student.departmentId || (student.gradeId ? `Grade ${student.gradeId}` : 'N/A')}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                          Academic Area
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {new Date(student.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Registered</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-[10px] font-black tracking-widest uppercase border border-emerald-100 dark:border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 rounded-xl text-xs font-black text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                        >
                          <span>👁️</span>
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 rounded-xl text-xs font-black text-slate-600 dark:text-slate-400 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all shadow-sm"
                        >
                          <span>🗑️</span>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  )
}

const ResourcesTab: React.FC<{ onUpload: () => void }> = ({ onUpload }) => {
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await resourceService.getResources()
      const resourcesList = response.data?.data || []
      setResources(Array.isArray(resourcesList) ? resourcesList : [])
    } catch (err) {
      setError('Failed to load resources')
      console.error(err)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteResource = async (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await resourceService.deleteResource(id)
        setResources(resources.filter(r => r.id !== id))
      } catch (err) {
        alert('Failed to delete resource')
        console.error(err)
      }
    }
  }

  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-8">
            <p className="text-gray-600">Loading resources...</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
            <Button variant="secondary" onClick={fetchResources} className="mt-4">
              Retry
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <span>Learning Resources ({resources.length})</span>
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={onUpload}>
              Upload Resource
            </Button>
            <Button variant="secondary" size="sm" onClick={fetchResources}>
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {resources.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No resources uploaded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Title</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Type</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Uploaded By</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Date</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Level</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resources.map(resource => (
                  <tr key={resource.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-600 text-sm font-medium">{resource.title}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                        {resource.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{resource.uploadedBy || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                        {resource.educationLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => window.open(resource.fileUrl, '_blank')}>
                          View
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteResource(resource.id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
