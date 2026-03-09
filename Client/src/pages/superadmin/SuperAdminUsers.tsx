import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'
import { Pagination } from '@components/common/Pagination'
import { Loading } from '@components/common/Loading'
import { userService } from '@services/userService'
import type { User } from '@types'

export const SuperAdminUsers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedUserName, setSelectedUserName] = useState<string>('')

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
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedUserId(id)
    setSelectedUserName(name)
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      try {
        await userService.deleteUser(selectedUserId)
        setUsers(users.filter(user => user.id !== selectedUserId))
        setShowDeleteConfirm(false)
        setSelectedUserId(null)
        setSelectedUserName('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete user')
        console.error('Error deleting user:', err)
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
                      {users.map(user => (
                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-600 text-sm">{user.name}</td>
                          <td className="px-6 py-4 text-gray-600 text-sm">{user.email}</td>
                          <td className="px-6 py-4">
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
                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <Button variant="secondary" size="sm">View</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteClick(user.id, user.name)}>Delete</Button>
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

        <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Confirm Delete User">
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete <strong>{selectedUserName}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button variant="danger" fullWidth onClick={handleConfirmDelete}>Delete User</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
