import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { userService } from '@services/userService'

interface StudentsTabProps {
  onViewStudent: (student: any) => void
  onShowModal: () => void
}

export const StudentsTab: React.FC<StudentsTabProps> = ({ onViewStudent, onShowModal }) => {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await userService.getAllUsers(1, 100, 'student')
      const studentsList = Array.isArray(response.data) ? response.data : []
      setStudents(studentsList)
    } catch (err) {
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