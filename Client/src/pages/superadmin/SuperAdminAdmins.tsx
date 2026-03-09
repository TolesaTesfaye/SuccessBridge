import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'
import { Pagination } from '@components/common/Pagination'
import { Loading } from '@components/common/Loading'
import { userService } from '@services/userService'
import type { User } from '@types'

export const SuperAdminAdmins: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [admins, setAdmins] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [showAdd, setShowAdd] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null)

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
                            <Button variant="secondary" size="sm">Edit</Button>
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
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="admin@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Password" />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth>Add Admin</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Confirm Delete">
          <div className="space-y-4">
            <p className="text-gray-700">Are you sure you want to delete this admin? This action cannot be undone.</p>
            <div className="flex gap-2">
              <Button variant="danger" fullWidth onClick={handleConfirmDelete}>Delete</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
