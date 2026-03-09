import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { Pagination } from '@components/common/Pagination'
import { Loading } from '@components/common/Loading'
import { userService } from '@services/userService'
import type { User } from '@types'

export const AdminStudents: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [students, setStudents] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)

  const itemsPerPage = 10

  useEffect(() => {
    fetchStudents()
  }, [currentPage])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await userService.getAllUsers(currentPage, itemsPerPage, 'student')
      setStudents(response.data)
      setTotalPages(Math.ceil(response.total / itemsPerPage))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch students')
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Students" subtitle="Manage student accounts">
        <Loading message="Loading students..." />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Students" subtitle="Manage student accounts">
      <div className="space-y-6">
        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded border-l-4 border-red-500">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>Active Students</CardHeader>
          <CardBody>
            {students.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                <p>No students found</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Name</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Email</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Joined</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Status</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-600 text-sm">{student.name}</td>
                          <td className="px-6 py-4 text-gray-600 text-sm">{student.email}</td>
                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {new Date(student.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="secondary" size="sm">View</Button>
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
      </div>
    </DashboardLayout>
  )
}
