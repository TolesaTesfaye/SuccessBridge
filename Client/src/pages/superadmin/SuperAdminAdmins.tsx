import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'
import { Pagination } from '@components/common/Pagination'
import { Loading } from '@components/common/Loading'
import { FormInput } from '@components/forms/FormInput'
import { userService } from '@services/userService'
import type { User } from '@types'

export const SuperAdminAdmins: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [admins, setAdmins] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [showAdd, setShowAdd] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null)
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    role: ''
  })

  const itemsPerPage = 10

  useEffect(() => {
    fetchAdmins()
  }, [currentPage])

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userService.getAllUsers(currentPage, itemsPerPage, 'admin')
      setAdmins(response.data)
      setTotalPages(Math.ceil(response.total / itemsPerPage))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch admins')
      console.error('Error fetching admins:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setSelectedAdminId(id)
    setShowDeleteConfirm(true)
  }

  const handleViewClick = (admin: User) => {
    setSelectedAdmin(admin)
    setShowViewModal(true)
  }

  const handleEditClick = (admin: User) => {
    setSelectedAdmin(admin)
    setEditFormData({
      name: admin.name || '',
      email: admin.email || '',
      role: admin.role || ''
    })
    setShowEditModal(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAdmin) return
    
    try {
      await userService.updateUser(selectedAdmin.id, editFormData)
      await fetchAdmins()
      setShowEditModal(false)
      setSelectedAdmin(null)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update admin')
      console.error('Error updating admin:', err)
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedAdminId) {
      try {
        await userService.deleteUser(selectedAdminId)
        setAdmins(admins.filter(admin => admin.id !== selectedAdminId))
        setShowDeleteConfirm(false)
        setSelectedAdminId(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete admin')
        console.error('Error deleting admin:', err)
      }
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Admins" subtitle="Manage admin accounts">
        <Loading message="Loading admins..." />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Admins" subtitle="Manage admin accounts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 m-0">All Admins</h2>
          <Button variant="primary" onClick={() => setShowAdd(true)}>
            Add Admin
          </Button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded border-l-4 border-red-500">
            {error}
          </div>
        )}

        <Card>
          <CardBody>
            {admins.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <p>No admins found</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Name</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Email</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Role</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Joined</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map(admin => (
                        <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-600 text-sm">{admin.name}</td>
                          <td className="px-6 py-4 text-gray-600 text-sm">{admin.email}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {new Date(admin.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <Button variant="secondary" size="sm" onClick={() => handleViewClick(admin)}>View</Button>
                            <Button variant="secondary" size="sm" onClick={() => handleEditClick(admin)}>Edit</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteClick(admin.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
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

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Admin">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Admin name" />
            </div>
            <div>
              <FormInput
                label="Email"
                type="email"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <FormInput
                label="Password"
                type="password"
                placeholder="Password"
                showPasswordToggle={true}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth>Add Admin</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Confirm Delete">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-slate-300">Are you sure you want to delete this admin? This action cannot be undone.</p>
            <div className="flex gap-2">
              <Button variant="danger" fullWidth onClick={handleConfirmDelete}>Delete</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>

        {/* View Admin Modal */}
        <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Admin Details" size="lg">
          {selectedAdmin ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-white/10">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-2xl">
                  👨‍💼
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">{selectedAdmin.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 m-0">{selectedAdmin.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Role</label>
                  <p className="text-gray-900 dark:text-white capitalize">{selectedAdmin.role?.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Created At</label>
                  <p className="text-gray-900 dark:text-white">{new Date(selectedAdmin.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {selectedAdmin.studentType && (
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Student Type</label>
                  <p className="text-gray-900 dark:text-white capitalize">{selectedAdmin.studentType.replace('_', ' ')}</p>
                </div>
              )}

              {selectedAdmin.university && (
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">University</label>
                  <p className="text-gray-900 dark:text-white">{selectedAdmin.university}</p>
                </div>
              )}

              {selectedAdmin.department && (
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Department</label>
                  <p className="text-gray-900 dark:text-white">{selectedAdmin.department}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Admin ID</label>
                <p className="text-gray-900 dark:text-white font-mono text-xs break-all">{selectedAdmin.id}</p>
              </div>

              <div className="pt-4 border-t dark:border-slate-700">
                <Button variant="secondary" fullWidth onClick={() => setShowViewModal(false)}>Close</Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-slate-400">No admin selected</p>
            </div>
          )}
        </Modal>

        {/* Edit Admin Modal */}
        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Admin" size="lg">
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
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth type="submit">Update Admin</Button>
              <Button variant="secondary" fullWidth type="button" onClick={() => setShowEditModal(false)}>Cancel</Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
