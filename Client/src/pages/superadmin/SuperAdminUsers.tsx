import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'
import { Pagination } from '@components/common/Pagination'
import { Loading } from '@components/common/Loading'
import { userService } from '@services/userService'
import { ApiErrorHandler } from '@utils/apiErrorHandler'
import type { User } from '@types'

export const SuperAdminUsers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedUserName, setSelectedUserName] = useState<string>('')
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    role: ''
  })

  const itemsPerPage = 10

  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userService.getAllUsers(currentPage, itemsPerPage)
      setUsers(response.data)
      setTotalPages(Math.ceil(response.total / itemsPerPage))
    } catch (err) {
      const userError = ApiErrorHandler.handle(err, 'Failed to fetch users')
      setError(userError.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedUserId(id)
    setSelectedUserName(name)
    setShowDeleteConfirm(true)
  }

  const handleViewClick = (user: User) => {
    setSelectedUser(user)
    setShowViewModal(true)
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setEditFormData({
      name: user.name || '',
      email: user.email || '',
      role: user.role || ''
    })
    setShowEditModal(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    
    try {
      await userService.updateUser(selectedUser.id, editFormData)
      await fetchUsers()
      setShowEditModal(false)
      setSelectedUser(null)
      ApiErrorHandler.showSuccess('User updated successfully')
    } catch (err) {
      ApiErrorHandler.handle(err, 'Failed to update user')
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      try {
        await userService.deleteUser(selectedUserId)
        setUsers(users.filter(user => user.id !== selectedUserId))
        setShowDeleteConfirm(false)
        setSelectedUserId(null)
        setSelectedUserName('')
        ApiErrorHandler.showSuccess(`User ${selectedUserName} deleted successfully`)
      } catch (err) {
        ApiErrorHandler.handle(err, `Failed to delete user ${selectedUserName}`)
      }
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Users" subtitle="Manage all users on the platform">
        <Loading message="Loading users..." />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Users" subtitle="Manage all users on the platform">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 m-0">All Users</h2>

        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded border-l-4 border-red-500">
            {error}
          </div>
        )}

        <Card>
          <CardBody>
            {users.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <p>No users found</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Student Identity</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">University / Level</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Department / Grade</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Platform Join</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Role</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => {
                        const isHighSchool = user.studentType === 'high_school'
                        const isUniversity = user.studentType === 'university'

                        const levelLabel = isHighSchool
                          ? 'High School'
                          : isUniversity
                          ? 'University'
                          : 'N/A'

                        const departmentOrGrade = isHighSchool
                          ? user.highSchoolGrade || 'General High School'
                          : user.department || user.universityLevel || 'N/A'

                        return (
                          <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-6 py-4 align-top">
                              <div className="font-semibold text-gray-900">
                                {user.name || 'N/A'}
                              </div>
                              <div className="text-xs text-gray-500 break-all">
                                {user.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 align-top text-gray-600">
                              <div>{levelLabel}</div>
                              {user.university && (
                                <div className="text-xs text-gray-500">
                                  {user.university}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 align-top text-gray-600">
                              <div>{departmentOrGrade}</div>
                              {user.highSchoolStream && (
                                <div className="text-xs text-gray-500">
                                  {user.highSchoolStream}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 align-top text-gray-600">
                              <div>Academic Area</div>
                              <div className="text-xs text-gray-500">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 align-top">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                user.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800'
                                  : user.role === 'super_admin'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 align-top">
                              <div className="flex items-center gap-2">
                                <Button variant="secondary" size="sm" onClick={() => handleViewClick(user)}>View</Button>
                                <Button variant="secondary" size="sm" onClick={() => handleEditClick(user)}>Edit</Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDeleteClick(user.id, user.name)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
              </>
            )}
          </CardBody>
        </Card>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Confirm Delete User">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-slate-300">
              Are you sure you want to delete <strong>{selectedUserName}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button variant="danger" fullWidth onClick={handleConfirmDelete}>Delete User</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>

        {/* View User Modal */}
        <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="User Details" size="lg">
          {selectedUser ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-white/10">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                  {selectedUser.role === 'admin' || selectedUser.role === 'super_admin' ? '👨‍💼' : '🎓'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">{selectedUser.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 m-0">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Role</label>
                  <p className="text-gray-900 dark:text-white capitalize">{selectedUser.role?.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Student Type</label>
                  <p className="text-gray-900 dark:text-white capitalize">{selectedUser.studentType?.replace('_', ' ') || 'N/A'}</p>
                </div>
              </div>

              {selectedUser.studentType === 'university' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">University</label>
                    <p className="text-gray-900 dark:text-white">{selectedUser.university || 'N/A'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Department</label>
                      <p className="text-gray-900 dark:text-white">{selectedUser.department || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">University Level</label>
                      <p className="text-gray-900 dark:text-white capitalize">{selectedUser.universityLevel?.replace('_', ' ') || 'N/A'}</p>
                    </div>
                  </div>
                </>
              )}

              {selectedUser.studentType === 'high_school' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Grade</label>
                    <p className="text-gray-900 dark:text-white">{selectedUser.highSchoolGrade || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Stream</label>
                    <p className="text-gray-900 dark:text-white capitalize">{selectedUser.highSchoolStream || 'N/A'}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Created At</label>
                  <p className="text-gray-900 dark:text-white">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">User ID</label>
                  <p className="text-gray-900 dark:text-white font-mono text-xs break-all">{selectedUser.id}</p>
                </div>
              </div>

              <div className="pt-4 border-t dark:border-slate-700">
                <Button variant="secondary" fullWidth onClick={() => setShowViewModal(false)}>Close</Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-slate-400">No user selected</p>
            </div>
          )}
        </Modal>

        {/* Edit User Modal */}
        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit User" size="lg">
          <form className="space-y-4" onSubmit={handleEditSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Role</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={editFormData.role}
                onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                required
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth type="submit">Update User</Button>
              <Button variant="secondary" fullWidth type="button" onClick={() => setShowEditModal(false)}>Cancel</Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
