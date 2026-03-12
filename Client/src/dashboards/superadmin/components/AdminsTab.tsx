import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { userService } from '@services/userService'

interface AdminsTabProps {
  onViewAdmin: (admin: any) => void
  onShowModal: () => void
}

export const AdminsTab: React.FC<AdminsTabProps> = ({ onViewAdmin, onShowModal }) => {
  const [admins, setAdmins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      const response = await userService.getAllUsers(1, 100, 'admin')
      const adminsList = Array.isArray(response.data) ? response.data : []
      setAdmins(adminsList)
    } catch (err) {
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