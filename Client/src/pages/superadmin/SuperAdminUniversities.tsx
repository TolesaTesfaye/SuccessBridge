import React, { useState, useEffect } from 'react'
import { universityService } from '@services/universityService'
import { LoadingOverlay } from '@components/common/Spinner'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'

export const SuperAdminUniversities: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false)
  const [universities, setUniversities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUniversities()
  }, [])

  const fetchUniversities = async () => {
    try {
      setLoading(true)
      const res = await universityService.getUniversities()
      if (res && res.data) {
        setUniversities(res.data)
      } else if (Array.isArray(res)) {
        setUniversities(res)
      }
    } catch (error) {
      console.error('Failed to fetch universities:', error)
    } finally {
      setLoading(false)
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
                        <Button variant="secondary" size="sm">View</Button>
                        <Button variant="secondary" size="sm">Edit</Button>
                        <Button variant="danger" size="sm">Delete</Button>
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

        <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New University">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">University Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="e.g., Addis Ababa University" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="e.g., Addis Ababa" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Contact Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="contact@university.edu" />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth>Add University</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
