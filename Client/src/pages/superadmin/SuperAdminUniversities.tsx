import React, { useState, useEffect } from 'react'
import { universityService } from '@services/universityService'
import { userService } from '@services/userService'
import { departmentService } from '@services/departmentService'
import { LoadingOverlay } from '@components/common/Spinner'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'

export const SuperAdminUniversities: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showView, setShowView] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null)
  const [universities, setUniversities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ name: '', location: '', contactEmail: '' })

  useEffect(() => {
    fetchUniversities()
  }, [])

  const fetchUniversities = async () => {
    try {
      setLoading(true)
      const res = await universityService.getUniversities()
      let universitiesData: any[] = []
      
      if (res && res.data) {
        universitiesData = res.data
      } else if (Array.isArray(res)) {
        universitiesData = res
      }

      // Fetch all users to count students per university
      const usersRes = await userService.getAllUsers(1, 10000) // Get all users
      const allUsers = usersRes.data || []

      // Fetch all departments to count per university
      const departmentsRes = await departmentService.getAll()
      const allDepartments = Array.isArray(departmentsRes) ? departmentsRes : (departmentsRes as any).data || []

      // Count students and departments for each university
      const universitiesWithCounts = universitiesData.map(uni => {
        const studentCount = allUsers.filter((user: any) => 
          user.university === uni.name && user.role === 'student'
        ).length

        const departmentCount = allDepartments.filter((dept: any) => 
          dept.universityId === uni.id
        ).length

        return {
          ...uni,
          students: studentCount,
          departments: departmentCount
        }
      })

      setUniversities(universitiesWithCounts)
    } catch (error) {
      console.error('Failed to fetch universities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (university: any) => {
    setSelectedUniversity(university)
    setShowView(true)
  }

  const handleEdit = (university: any) => {
    setSelectedUniversity(university)
    setFormData({
      name: university.name || '',
      location: university.location || '',
      contactEmail: university.contactEmail || ''
    })
    setShowEdit(true)
  }

  const handleDeleteClick = (university: any) => {
    setSelectedUniversity(university)
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedUniversity) return
    
    try {
      await universityService.deleteUniversity(selectedUniversity.id)
      setUniversities(universities.filter(u => u.id !== selectedUniversity.id))
      setShowDeleteConfirm(false)
      setSelectedUniversity(null)
      alert('University deleted successfully')
    } catch (error) {
      console.error('Failed to delete university:', error)
      alert('Failed to delete university')
    }
  }

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await universityService.createUniversity(formData)
      await fetchUniversities()
      setShowAdd(false)
      setFormData({ name: '', location: '', contactEmail: '' })
      alert('University added successfully')
    } catch (error) {
      console.error('Failed to add university:', error)
      alert('Failed to add university')
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUniversity) return
    
    try {
      await universityService.updateUniversity(selectedUniversity.id, formData)
      await fetchUniversities()
      setShowEdit(false)
      setSelectedUniversity(null)
      setFormData({ name: '', location: '', contactEmail: '' })
      alert('University updated successfully')
    } catch (error) {
      console.error('Failed to update university:', error)
      alert('Failed to update university')
    }
  }

  if (loading) {
    return <LoadingOverlay message="Loading universities from database..." />
  }

  return (
    <DashboardLayout title="Universities" subtitle="Manage universities on the platform">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 m-0">All Universities</h2>
          <Button variant="primary" onClick={() => setShowAdd(true)}>
            Add University
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">University Name</th>
                  <th className="px-6 py-4 font-semibold">Number of Students</th>
                  <th className="px-6 py-4 font-semibold text-center">Departments</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                {universities.map(uni => (
                  <tr key={uni.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{uni.name}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                        {uni.students || '0'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                        {uni.departments || '0'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleView(uni)}>View</Button>
                        <Button variant="secondary" size="sm" onClick={() => handleEdit(uni)}>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteClick(uni)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {universities.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                      No universities have been added to the platform yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add University Modal */}
        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New University">
          <form className="space-y-4" onSubmit={handleAddSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">University Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                placeholder="e.g., Addis Ababa University"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Location</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                placeholder="e.g., Addis Ababa"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Contact Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                placeholder="contact@university.edu"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth type="submit">Add University</Button>
              <Button variant="secondary" fullWidth type="button" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </form>
        </Modal>

        {/* Edit University Modal */}
        <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit University">
          <form className="space-y-4" onSubmit={handleEditSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">University Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                placeholder="e.g., Addis Ababa University"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Location</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                placeholder="e.g., Addis Ababa"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Contact Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                placeholder="contact@university.edu"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth type="submit">Update University</Button>
              <Button variant="secondary" fullWidth type="button" onClick={() => setShowEdit(false)}>Cancel</Button>
            </div>
          </form>
        </Modal>

        {/* View University Modal */}
        <Modal isOpen={showView} onClose={() => setShowView(false)} title="University Details">
          {selectedUniversity && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">University Name</label>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedUniversity.name}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Location</label>
                <p className="text-gray-900 dark:text-white">{selectedUniversity.location || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Contact Email</label>
                <p className="text-gray-900 dark:text-white">{selectedUniversity.contactEmail || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Number of Students</label>
                <p className="text-gray-900 dark:text-white">{selectedUniversity.students || '0'}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Departments</label>
                <p className="text-gray-900 dark:text-white">{selectedUniversity.departments || '0'}</p>
              </div>
              <div className="pt-4">
                <Button variant="secondary" fullWidth onClick={() => setShowView(false)}>Close</Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Confirm Delete">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-slate-300">
              Are you sure you want to delete <strong>{selectedUniversity?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button variant="danger" fullWidth onClick={handleConfirmDelete}>Delete University</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
