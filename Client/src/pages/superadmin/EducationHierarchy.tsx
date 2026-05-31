import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { gradeService, type Grade } from '@services/gradeService'
import { streamService, type Stream } from '@services/streamService'
import { subjectService } from '@services/subjectService'
import { universityService } from '@services/universityService'
import { departmentService } from '@services/departmentService'
import { resourceTypeService, type ResourceType } from '@services/resourceTypeService'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'
import {
  GraduationCap, School, BookOpen, Building2, Layers,
  ChevronRight, Plus, Edit3, Trash2, ChevronDown,
  Users, FileText, Search, X, Hash, Sparkles,
  Globe, MapPin, FolderTree, BookMarked, GraduationCap as GradIcon,
  ArrowLeft, CheckCircle2, AlertCircle, Loader2
} from 'lucide-react'

type EducationLevel = 'high_school' | 'university'

export const EducationHierarchy: React.FC = () => {
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('high_school')
  const [grades, setGrades] = useState<Grade[]>([])
  const [streams, setStreams] = useState<Stream[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [universities, setUniversities] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const [selectedGrade, setSelectedGrade] = useState<string | null>(null)
  const [selectedStream, setSelectedStream] = useState<string | null>(null)
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)

  const [showAddGrade, setShowAddGrade] = useState(false)
  const [showEditGrade, setShowEditGrade] = useState(false)
  const [showAddStream, setShowAddStream] = useState(false)
  const [showEditStream, setShowEditStream] = useState(false)
  const [showAddSubject, setShowAddSubject] = useState(false)
  const [showEditSubject, setShowEditSubject] = useState(false)
  const [showAddUniversity, setShowAddUniversity] = useState(false)
  const [showAddDepartment, setShowAddDepartment] = useState(false)
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([])
  const [showAddResourceType, setShowAddResourceType] = useState(false)
  const [showEditResourceType, setShowEditResourceType] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ type: string; id: string; name: string } | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  const fetchGrades = useCallback(async () => {
    try {
      const data = await gradeService.getGrades(educationLevel)
      setGrades(data)
    } catch (err) {
      console.error('Failed to fetch grades:', err)
    }
  }, [educationLevel])

  const fetchStreams = useCallback(async (gradeId: string) => {
    try {
      const data = await streamService.getStreams(gradeId)
      setStreams(data)
    } catch (err) {
      console.error('Failed to fetch streams:', err)
    }
  }, [])

  const fetchSubjects = useCallback(async (params: { gradeId?: string; streamId?: string; departmentId?: string }) => {
    try {
      const data = await subjectService.getSubjectsByFilter(params)
      setSubjects(data)
    } catch (err) {
      console.error('Failed to fetch subjects:', err)
    }
  }, [])

  const fetchUniversities = useCallback(async () => {
    try {
      const res = await universityService.getUniversities()
      if (Array.isArray(res)) setUniversities(res)
      else if (res && 'data' in res) setUniversities(res.data || [])
    } catch (err) {
      console.error('Failed to fetch universities:', err)
    }
  }, [])

  const fetchDepartments = useCallback(async (universityId: string) => {
    try {
      const res = await departmentService.getByUniversity(universityId)
      if (Array.isArray(res)) setDepartments(res)
      else if (res && 'data' in (res as any)) setDepartments((res as any).data || [])
      else setDepartments([])
    } catch (err) {
      console.error('Failed to fetch departments:', err)
    }
  }, [])

  const fetchResourceTypes = useCallback(async (gradeId: string, signal?: AbortSignal) => {
    try {
      const data = await resourceTypeService.getByGrade(gradeId, signal)
      if (!signal?.aborted) setResourceTypes(data)
    } catch (err: any) {
      if (err?.name !== 'AbortError' && err?.code !== 'ERR_CANCELED') {
        console.error('Failed to fetch resource types:', err)
      }
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    setSelectedGrade(null)
    setSelectedStream(null)
    setSelectedUniversity(null)
    setSelectedDepartment(null)
    setStreams([])
    setSubjects([])
    if (educationLevel === 'university') fetchUniversities()
    else { setUniversities([]); setDepartments([]) }
    fetchGrades().finally(() => setLoading(false))
  }, [educationLevel, fetchGrades, fetchUniversities])

  useEffect(() => {
    if (selectedGrade) {
      setSubjects([]); setStreams([]); setDepartments([])
      fetchStreams(selectedGrade)
      fetchSubjects({ gradeId: selectedGrade })
    }
  }, [selectedGrade, fetchStreams, fetchSubjects])

  useEffect(() => {
    if (selectedStream && selectedGrade) fetchSubjects({ gradeId: selectedGrade, streamId: selectedStream })
  }, [selectedStream, selectedGrade, fetchSubjects])

  useEffect(() => {
    if (selectedUniversity) fetchDepartments(selectedUniversity)
  }, [selectedUniversity, fetchDepartments])

  useEffect(() => {
    if (selectedDepartment) fetchSubjects({ departmentId: selectedDepartment })
  }, [selectedDepartment, fetchSubjects])

  useEffect(() => {
    setResourceTypes([])
    if (selectedGrade) {
      const controller = new AbortController()
      fetchResourceTypes(selectedGrade, controller.signal)
      return () => controller.abort()
    }
  }, [selectedGrade, fetchResourceTypes])

  const currentGrade = grades.find(g => g.id === selectedGrade)
  const currentStream = streams.find(s => s.id === selectedStream)
  const currentUniversity = universities.find((u: any) => u.id === selectedUniversity)
  const currentDepartment = departments.find((d: any) => d.id === selectedDepartment)

  const filteredGrades = useMemo(() => {
    if (!searchQuery) return grades
    const q = searchQuery.toLowerCase()
    return grades.filter(g => g.name.toLowerCase().includes(q))
  }, [grades, searchQuery])

  const filteredUniversities = useMemo(() => {
    if (!searchQuery) return universities
    const q = searchQuery.toLowerCase()
    return universities.filter((u: any) => u.name.toLowerCase().includes(q))
  }, [universities, searchQuery])

  const handleAddGrade = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const created = await gradeService.createGrade({ name: formData.name, level: Number(formData.level), educationLevel })
      setShowAddGrade(false); setFormData({})
      setGrades(prev => [...prev, created].sort((a, b) => a.level - b.level))
    } catch { alert('Failed to add grade') }
  }

  const handleEditGrade = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    try {
      const updated = await gradeService.updateGrade(editingItem.id, { name: formData.name, level: Number(formData.level) })
      setShowEditGrade(false); setEditingItem(null); setFormData({})
      setGrades(prev => prev.map(g => g.id === updated.id ? updated : g))
    } catch { alert('Failed to update grade') }
  }

  const handleAddStream = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGrade) return
    try {
      await streamService.createStream({ name: formData.name, code: formData.code, gradeId: selectedGrade })
      setShowAddStream(false); setFormData({})
      await fetchStreams(selectedGrade)
    } catch { alert('Failed to add stream') }
  }

  const handleEditStream = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    try {
      await streamService.updateStream(editingItem.id, { name: formData.name, code: formData.code })
      setShowEditStream(false); setEditingItem(null); setFormData({})
      if (selectedGrade) await fetchStreams(selectedGrade)
    } catch { alert('Failed to update stream') }
  }

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data: any = { name: formData.name, code: formData.code }
      if (formData.gradeId) data.gradeId = formData.gradeId
      if (formData.streamId) data.streamId = formData.streamId
      if (formData.departmentId) data.departmentId = formData.departmentId
      await subjectService.createSubject(data)
      setShowAddSubject(false); setFormData({})
      if (selectedGrade) {
        const filter: any = { gradeId: selectedGrade }
        if (selectedStream) filter.streamId = selectedStream
        if (selectedDepartment) filter.departmentId = selectedDepartment
        await fetchSubjects(filter)
      }
    } catch { alert('Failed to add subject') }
  }

  const handleEditSubject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    try {
      await subjectService.updateSubject(editingItem.id, { name: formData.name, code: formData.code })
      setShowEditSubject(false); setEditingItem(null); setFormData({})
      if (selectedGrade) {
        const filter: any = { gradeId: selectedGrade }
        if (selectedStream) filter.streamId = selectedStream
        await fetchSubjects(filter)
      }
    } catch { alert('Failed to update subject') }
  }

  const handleAddResourceType = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGrade) return
    try {
      await resourceTypeService.create({ name: formData.name, gradeId: selectedGrade })
      setShowAddResourceType(false); setFormData({})
      await fetchResourceTypes(selectedGrade)
    } catch { alert('Failed to add resource type') }
  }

  const handleEditResourceType = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    try {
      await resourceTypeService.update(editingItem.id, { name: formData.name })
      setShowEditResourceType(false); setEditingItem(null); setFormData({})
      if (selectedGrade) await fetchResourceTypes(selectedGrade)
    } catch { alert('Failed to update resource type') }
  }

  const getDeleteWarning = () => {
    if (!showDeleteConfirm) return ''
    const m: Record<string, string> = {
      grade: 'This will also delete all streams and subjects under this grade. Resources and student data will be unlinked (not deleted).',
      stream: 'This will also delete all subjects under this stream. Student data referencing this stream will be unlinked.',
      subject: 'Resources and quizzes linked to this subject will be unlinked (not deleted). Student progress and payment data will be preserved.',
      university: 'This will also delete all departments under this university. Resources and student data will be unlinked.',
      department: 'This will also delete all subjects under this department. Resources and student data will be unlinked.',
    }
    return m[showDeleteConfirm.type] || ''
  }

  const handleDelete = async () => {
    if (!showDeleteConfirm) return
    setDeleting(true)
    try {
      const { type, id } = showDeleteConfirm
      const handlers: Record<string, () => Promise<void>> = {
        grade: async () => { await gradeService.deleteGrade(id); if (selectedGrade === id) { setSelectedGrade(null); setSelectedStream(null) }; setGrades(prev => prev.filter(g => g.id !== id)) },
        stream: async () => { await streamService.deleteStream(id); if (selectedStream === id) setSelectedStream(null); setStreams(prev => prev.filter(s => s.id !== id)); if (selectedGrade) await fetchSubjects({ gradeId: selectedGrade }) },
        subject: async () => { await subjectService.deleteSubject(id); setSubjects(prev => prev.filter(s => s.id !== id)) },
        resource_type: async () => { await resourceTypeService.delete(id); if (selectedGrade) fetchResourceTypes(selectedGrade) },
      }
      if (handlers[type]) await handlers[type]()
      setShowDeleteConfirm(null)
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to delete'
      if (msg.includes('foreign') || msg.includes('constraint') || msg.includes('violates')) {
        alert('Cannot delete: This item has related data that must be removed first.')
      } else if (msg.includes('not found') && showDeleteConfirm) {
        const { type: ft, id: fid } = showDeleteConfirm
        if (ft === 'grade') { setGrades(prev => prev.filter(g => g.id !== fid)); if (selectedGrade === fid) { setSelectedGrade(null); setSelectedStream(null) } }
        else if (ft === 'stream') { setStreams(prev => prev.filter(s => s.id !== fid)); if (selectedStream === fid) setSelectedStream(null) }
        else if (ft === 'subject') setSubjects(prev => prev.filter(s => s.id !== fid))
        else if (ft === 'resource_type' && selectedGrade) fetchResourceTypes(selectedGrade)
        setShowDeleteConfirm(null)
      } else alert(msg)
    } finally { setDeleting(false) }
  }

  const openEditGrade = (grade: any) => { setEditingItem(grade); setFormData({ name: grade.name, level: String(grade.level) }); setShowEditGrade(true) }
  const openEditStream = (stream: any) => { setEditingItem(stream); setFormData({ name: stream.name, code: stream.code }); setShowEditStream(true) }
  const openAddSubject = () => { setFormData({ gradeId: selectedGrade || '', streamId: selectedStream || '', departmentId: selectedDepartment || '' }); setShowAddSubject(true) }
  const openEditSubject = (subject: any) => { setEditingItem(subject); setFormData({ name: subject.name, code: subject.code }); setShowEditSubject(true) }

  const sidebarItem = (label: string, active: boolean, icon: React.ReactNode, badge?: string | number, onClick?: () => void) => (
    <button onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-200 group ${
        active ? 'bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-purple-500/10 dark:to-fuchsia-500/5 border-l-[3px] border-purple-600 shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-white/5 border-l-[3px] border-transparent'
      }`}
    >
      <span className={`shrink-0 transition-colors ${active ? 'text-purple-600' : 'text-slate-400 group-hover:text-purple-500'}`}>{icon}</span>
      <span className={`font-medium truncate ${active ? 'text-purple-800 dark:text-purple-300' : 'text-slate-700 dark:text-slate-300'}`}>{label}</span>
      {badge !== undefined && (
        <span className={`ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full ${
          active ? 'bg-purple-200 dark:bg-purple-500/30 text-purple-700 dark:text-purple-200' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
        }`}>{badge}</span>
      )}
    </button>
  )

  const sectionHeader = (icon: React.ReactNode, label: string, onAdd?: () => void) => (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-white/5">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
        {icon}
        {label}
      </span>
      {onAdd && (
        <button onClick={onAdd}
          className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-500/10 px-2 py-1 rounded-lg transition-all flex items-center gap-1">
          <Plus size={12} /> Add
        </button>
      )}
    </div>
  )

  const toggleButton = (label: string, active: boolean, icon: React.ReactNode, onClick: () => void) => (
    <button onClick={onClick}
      className={`relative flex items-center gap-2.5 px-5 py-2.5 text-sm font-bold transition-all duration-200 rounded-xl ${
        active
          ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-lg shadow-purple-200/30 dark:shadow-purple-900/20 ring-1 ring-purple-200 dark:ring-purple-800'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/30'
      }`}
    >
      {icon}
      {label}
    </button>
  )

  const badge = (label: string, color: string) => (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg ${color}`}>{label}</span>
  )

  const content = (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <FolderTree size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Education Hierarchy</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage grades, streams, subjects, universities, and resource types</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-900/60 rounded-xl p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
          <button onClick={() => setEducationLevel('high_school')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              educationLevel === 'high_school' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          ><School size={16} /> High School</button>
          <button onClick={() => setEducationLevel('university')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              educationLevel === 'university' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          ><GraduationCap size={16} /> University</button>
        </div>
      </div>

      {/* Breadcrumb */}
      {currentGrade && (
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 flex-wrap px-1">
          <button onClick={() => { setSelectedGrade(null); setSelectedStream(null); setSelectedUniversity(null); setSelectedDepartment(null) }}
            className="font-semibold text-slate-600 dark:text-slate-300 hover:text-purple-600 transition-colors flex items-center gap-1.5">
            <Layers size={14} /> {educationLevel === 'high_school' ? 'Grades' : 'Categories'}
          </button>
          <ChevronRight size={12} className="text-slate-300 dark:text-slate-600" />
          <span className="font-medium text-purple-700 dark:text-purple-300">{currentGrade.name}</span>
          {currentStream && (<><ChevronRight size={12} className="text-slate-300 dark:text-slate-600" /><button onClick={() => setSelectedStream(null)} className="text-purple-600 dark:text-purple-400 hover:underline font-medium">{currentStream.name}</button></>)}
          {educationLevel === 'university' && currentUniversity && !currentStream && (<><ChevronRight size={12} className="text-slate-300 dark:text-slate-600" /><button onClick={() => { setSelectedUniversity(null); setSelectedDepartment(null) }} className="text-purple-600 dark:text-purple-400 hover:underline font-medium">{currentUniversity.name}</button></>)}
          {currentDepartment && (<><ChevronRight size={12} className="text-slate-300 dark:text-slate-600" /><span className="font-medium text-purple-700 dark:text-purple-300">{currentDepartment.name}</span></>)}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search grades or universities..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" />
        {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={16} /></button>}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-purple-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] gap-6">
          {/* ===== Left Sidebar ===== */}
          <div className="space-y-5">
            {/* Grades / Categories Panel */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm">
              {sectionHeader(
                <Layers size={13} />,
                educationLevel === 'high_school' ? 'Grades' : 'Categories',
                () => { setFormData({}); setShowAddGrade(true) }
              )}
              <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-[500px] overflow-y-auto custom-scrollbar">
                {filteredGrades.length === 0 ? (
                  <div className="px-4 py-10 text-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                      <Layers size={20} className="text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-400 font-medium">No {educationLevel === 'high_school' ? 'grades' : 'categories'} found</p>
                    <button onClick={() => { setFormData({}); setShowAddGrade(true) }}
                      className="mt-2 text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold">
                      + Add your first {educationLevel === 'high_school' ? 'grade' : 'category'}
                    </button>
                  </div>
                ) : filteredGrades.map(grade => (
                  <div key={grade.id}>
                    <button onClick={() => {
                      if (selectedGrade === grade.id) { setSelectedGrade(null); setSelectedStream(null) }
                      else { setSelectedGrade(grade.id); setSelectedStream(null); setSelectedUniversity(null); setSelectedDepartment(null) }
                    }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-200 group ${
                        selectedGrade === grade.id
                          ? 'bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:from-purple-500/10 dark:to-fuchsia-500/5 border-l-[3px] border-purple-600'
                          : 'hover:bg-slate-50 dark:hover:bg-white/5 border-l-[3px] border-transparent'
                      }`}
                    >
                      <span className={`shrink-0 transition-colors ${selectedGrade === grade.id ? 'text-purple-600' : 'text-slate-400 group-hover:text-purple-500'}`}>
                        {selectedGrade === grade.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </span>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                        selectedGrade === grade.id
                          ? 'bg-purple-200 dark:bg-purple-500/30 text-purple-700 dark:text-purple-200'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20'
                      }`}>{grade.level}</div>
                      <span className={`font-semibold truncate ${selectedGrade === grade.id ? 'text-purple-800 dark:text-purple-300' : 'text-slate-700 dark:text-slate-300'}`}>{grade.name}</span>
                    </button>

                    {selectedGrade === grade.id && (
                      <div className="bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-white/5">
                        {/* Streams */}
                        {(educationLevel === 'high_school' || educationLevel === 'university') && (
                          <div>
                            {sectionHeader(<BookOpen size={12} />, 'Streams', () => { setFormData({}); setShowAddStream(true) })}
                            {streams.length === 0 && <p className="px-6 py-3 text-[11px] text-slate-400 italic">No streams yet</p>}
                            {streams.map(stream => (
                              <div key={stream.id}>
                                <button onClick={() => setSelectedStream(selectedStream === stream.id ? null : stream.id)}
                                  className={`w-full flex items-center gap-2 pl-10 pr-4 py-2 text-left text-xs transition-all group ${
                                    selectedStream === stream.id ? 'bg-white dark:bg-white/10 text-purple-700 dark:text-purple-300 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5'
                                  }`}
                                >
                                  {selectedStream === stream.id ? <ChevronDown size={11} className="text-purple-500" /> : <ChevronRight size={11} />}
                                  <div className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${
                                    selectedStream === stream.id ? 'bg-purple-200 dark:bg-purple-500/30 text-purple-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                                  }`}>S</div>
                                  {stream.name}
                                  <div className="ml-auto flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={e => { e.stopPropagation(); openEditStream(stream) }}
                                      className="p-1 text-slate-400 hover:text-amber-600 rounded hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"><Edit3 size={11} /></button>
                                    <button onClick={e => { e.stopPropagation(); setShowDeleteConfirm({ type: 'stream', id: stream.id, name: stream.name }) }}
                                      className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><Trash2 size={11} /></button>
                                  </div>
                                </button>
                                {selectedStream === stream.id && (
                                  <div className="pl-14 pr-4 py-1.5 bg-white dark:bg-white/5">
                                    {sectionHeader(<BookMarked size={10} />, 'Subjects', openAddSubject)}
                                    {subjects.filter(s => s.streamId === stream.id).length === 0
                                      ? <p className="py-2 text-[11px] text-slate-400 italic">No subjects yet</p>
                                      : subjects.filter(s => s.streamId === stream.id).map(subject => (
                                          <div key={subject.id} className="flex items-center justify-between py-1.5 group/sub">
                                            <span className="text-[12px] text-slate-700 dark:text-slate-300 font-medium">{subject.name}</span>
                                            <div className="flex gap-0.5 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                              <button onClick={() => openEditSubject(subject)} className="p-0.5 text-slate-400 hover:text-amber-600"><Edit3 size={10} /></button>
                                              <button onClick={() => setShowDeleteConfirm({ type: 'subject', id: subject.id, name: subject.name })} className="p-0.5 text-slate-400 hover:text-red-600"><Trash2 size={10} /></button>
                                            </div>
                                          </div>
                                        ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Subjects directly under grade (no stream) */}
                        {subjects.filter(s => !s.streamId && !s.departmentId).length > 0 && (
                          <div>
                            {sectionHeader(<BookMarked size={12} />, 'Subjects', openAddSubject)}
                            <div className="px-10 py-1">
                              {subjects.filter(s => !s.streamId && !s.departmentId).map(subject => (
                                <div key={subject.id} className="flex items-center justify-between py-1.5 group/sub">
                                  <span className="text-[12px] text-slate-700 dark:text-slate-300 font-medium">{subject.name}</span>
                                  <div className="flex gap-0.5 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                    <button onClick={() => openEditSubject(subject)} className="p-0.5 text-slate-400 hover:text-amber-600"><Edit3 size={10} /></button>
                                    <button onClick={() => setShowDeleteConfirm({ type: 'subject', id: subject.id, name: subject.name })} className="p-0.5 text-slate-400 hover:text-red-600"><Trash2 size={10} /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Universities Panel (university mode only) */}
            {educationLevel === 'university' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm">
                {sectionHeader(<Building2 size={13} />, 'Universities', () => { setFormData({}); setShowAddUniversity(true) })}
                <div className="divide-y divide-slate-100 dark:divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {filteredUniversities.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-2">
                        <Building2 size={18} className="text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-400 font-medium">No universities found</p>
                      <button onClick={() => { setFormData({}); setShowAddUniversity(true) }} className="mt-2 text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold">+ Add university</button>
                    </div>
                  ) : filteredUniversities.map((uni: any) => (
                    <div key={uni.id}>
                      <button onClick={() => {
                        setSelectedUniversity(selectedUniversity === uni.id ? null : uni.id)
                        if (selectedUniversity !== uni.id) fetchDepartments(uni.id)
                        else setDepartments([])
                      }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-200 group ${
                          selectedUniversity === uni.id
                            ? 'bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-500/10 dark:to-blue-500/5 border-l-[3px] border-indigo-500'
                            : 'hover:bg-slate-50 dark:hover:bg-white/5 border-l-[3px] border-transparent'
                        }`}
                      >
                        <span className={`shrink-0 ${selectedUniversity === uni.id ? 'text-indigo-500' : 'text-slate-400 group-hover:text-indigo-500'}`}>
                          {selectedUniversity === uni.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-500/20 dark:to-blue-500/20 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-300">
                          {uni.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className={`font-semibold truncate block ${selectedUniversity === uni.id ? 'text-indigo-800 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{uni.name}</span>
                          {uni.location && <span className="text-[10px] text-slate-400 flex items-center gap-1"><MapPin size={9} />{uni.location}</span>}
                        </div>
                      </button>

                      {selectedUniversity === uni.id && (
                        <div className="bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-white/5">
                          <div className="pl-10 pr-4 py-2">
                            {sectionHeader(<Building2 size={11} />, 'Departments', () => { setFormData({ universityId: uni.id }); setShowAddDepartment(true) })}
                            {departments.length === 0
                              ? <p className="py-2 text-[11px] text-slate-400 italic">No departments yet</p>
                              : departments.map((dept: any) => (
                                  <div key={dept.id}>
                                    <button onClick={() => setSelectedDepartment(selectedDepartment === dept.id ? null : dept.id)}
                                      className={`w-full flex items-center gap-2 py-1.5 text-left text-xs transition-all group ${
                                        selectedDepartment === dept.id ? 'text-purple-700 dark:text-purple-300 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                                      }`}
                                    >
                                      {selectedDepartment === dept.id ? <ChevronDown size={11} className="text-purple-500" /> : <ChevronRight size={11} />}
                                      {dept.name}
                                    </button>
                                    {selectedDepartment === dept.id && (
                                      <div className="pl-4 py-1">
                                        {sectionHeader(<BookMarked size={10} />, 'Subjects', openAddSubject)}
                                        {subjects.filter(s => s.departmentId === dept.id).length === 0
                                          ? <p className="py-1 text-[11px] text-slate-400 italic">No subjects yet</p>
                                          : subjects.filter(s => s.departmentId === dept.id).map((subject: any) => (
                                              <div key={subject.id} className="flex items-center justify-between py-1 group/sub">
                                                <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">{subject.name}</span>
                                                <div className="flex gap-0.5 opacity-0 group-hover/sub:opacity-100">
                                                  <button onClick={() => openEditSubject(subject)} className="p-0.5 text-slate-400 hover:text-amber-600"><Edit3 size={9} /></button>
                                                  <button onClick={() => setShowDeleteConfirm({ type: 'subject', id: subject.id, name: subject.name })} className="p-0.5 text-slate-400 hover:text-red-600"><Trash2 size={9} /></button>
                                                </div>
                                              </div>
                                            ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ===== Right Detail Panel ===== */}
          <div>
            {!selectedGrade ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-12 text-center shadow-sm">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-100 to-fuchsia-100 dark:from-purple-500/10 dark:to-fuchsia-500/10 flex items-center justify-center mx-auto mb-5">
                  <FolderTree size={40} className="text-purple-400 dark:text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Select a {educationLevel === 'high_school' ? 'Grade' : 'Category'}</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Choose a {educationLevel === 'high_school' ? 'grade' : 'category'} from the sidebar to view and manage its streams, subjects, and resource types.
                </p>
              </div>
            ) : currentGrade ? (
              <div className="space-y-5 animate-fadeIn">
                {/* Grade Detail Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
                          {educationLevel === 'high_school' ? <School size={28} className="text-white" /> : <GradIcon size={28} className="text-white" />}
                        </div>
                        <div className="text-white">
                          <h3 className="text-2xl font-bold">{currentGrade.name}</h3>
                          <p className="text-sm text-white/80 mt-0.5">
                            Level {currentGrade.level} &middot; {educationLevel === 'high_school' ? 'High School' : 'University'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditGrade(currentGrade)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-all backdrop-blur">
                          <Edit3 size={12} /> Edit
                        </button>
                        <button onClick={() => setShowDeleteConfirm({ type: 'grade', id: currentGrade.id, name: currentGrade.name })}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/30 hover:bg-red-500/50 text-white text-xs font-semibold rounded-lg transition-all backdrop-blur">
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { icon: <BookOpen size={20} />, label: 'Streams', value: streams.length, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
                        ...(educationLevel === 'university' ? [{ icon: <Building2 size={20} />, label: 'Universities', value: universities.length, color: 'from-indigo-500 to-purple-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400' }] : []),
                        { icon: <FileText size={20} />, label: 'Subjects', value: subjects.length, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
                        { icon: <Hash size={20} />, label: 'Resource Types', value: resourceTypes.length, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
                      ].map(stat => (
                        <div key={stat.label} className={`${stat.bg} rounded-xl p-4 border border-slate-200/50 dark:border-white/5`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={stat.text}>{stat.icon}</span>
                          </div>
                          <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Resource Types */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/30 dark:shadow-emerald-900/20">
                        <FileText size={18} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Resource Types</h3>
                        <p className="text-[11px] text-slate-400">{resourceTypes.length} type{resourceTypes.length !== 1 ? 's' : ''} for {currentGrade.name}</p>
                      </div>
                    </div>
                    <Button variant="primary" size="sm" onClick={() => { setFormData({}); setShowAddResourceType(true) }}>
                      <Plus size={14} /> Add Type
                    </Button>
                  </div>
                  {resourceTypes.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                      <FileText size={24} className="mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                      <p className="text-sm text-slate-400 font-medium">No resource types for this grade yet</p>
                      <button onClick={() => { setFormData({}); setShowAddResourceType(true) }}
                        className="mt-2 text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold">+ Create first type</button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {resourceTypes.map(rt => (
                        <div key={rt.id}
                          className="group flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md hover:shadow-purple-200/20 dark:hover:shadow-purple-900/20 transition-all duration-200">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-300" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{rt.name}</span>
                          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 ml-1">
                            <button onClick={() => { setEditingItem(rt); setFormData({ name: rt.name }); setShowEditResourceType(true) }}
                              className="p-1 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"><Edit3 size={11} /></button>
                            <button onClick={() => setShowDeleteConfirm({ type: 'resource_type', id: rt.id, name: rt.name })}
                              className="p-1 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><Trash2 size={11} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-purple-500" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Quick Actions</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => { setFormData({}); setShowAddStream(true) }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-purple-300/30 transition-all">
                      <Plus size={14} /> Add Stream
                    </button>
                    {educationLevel === 'university' && (
                      <button onClick={() => { setFormData({}); setShowAddUniversity(true) }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-300/30 transition-all">
                        <Plus size={14} /> Add University
                      </button>
                    )}
                    <button onClick={openAddSubject}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-300/30 transition-all">
                      <Plus size={14} /> Add Subject
                    </button>
                    <button onClick={() => { setFormData({}); setShowAddResourceType(true) }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-amber-300/30 transition-all">
                      <Plus size={14} /> Add Resource Type
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* ===== MODALS ===== */}

      <Modal isOpen={showAddGrade} onClose={() => setShowAddGrade(false)} title={`Add ${educationLevel === 'high_school' ? 'Grade' : 'Category'}`}>
        <form className="space-y-4" onSubmit={handleAddGrade}>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder={educationLevel === 'high_school' ? 'e.g., Grade 9' : 'e.g., Freshman'}
              value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Level Number</label>
            <input type="number" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder={educationLevel === 'high_school' ? 'e.g., 9' : 'e.g., 1'}
              value={formData.level || ''} onChange={e => setFormData({ ...formData, level: e.target.value })} required />
            <p className="text-xs text-slate-400 mt-1.5">{educationLevel === 'high_school' ? 'Lower = younger grade' : '0=Remedial, 1=Freshman, 4=Senior, 5=GC'}</p>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" fullWidth type="submit">Create</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => setShowAddGrade(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditGrade} onClose={() => setShowEditGrade(false)} title={`Edit ${currentGrade?.name || 'Grade'}`}>
        <form className="space-y-4" onSubmit={handleEditGrade}>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Level Number</label>
            <input type="number" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              value={formData.level || ''} onChange={e => setFormData({ ...formData, level: e.target.value })} required />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" fullWidth type="submit">Update</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => { setShowEditGrade(false); setEditingItem(null); setFormData({}) }}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showAddStream} onClose={() => setShowAddStream(false)} title="Add Stream">
        <form className="space-y-4" onSubmit={handleAddStream}>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Stream Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="e.g., Natural Science" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Code</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="e.g., natural" value={formData.code || ''} onChange={e => setFormData({ ...formData, code: e.target.value })} required />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" fullWidth type="submit">Create</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => { setShowAddStream(false); setFormData({}) }}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditStream} onClose={() => setShowEditStream(false)} title="Edit Stream">
        <form className="space-y-4" onSubmit={handleEditStream}>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Stream Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Code</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              value={formData.code || ''} onChange={e => setFormData({ ...formData, code: e.target.value })} required />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" fullWidth type="submit">Update</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => { setShowEditStream(false); setEditingItem(null); setFormData({}) }}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showAddSubject} onClose={() => setShowAddSubject(false)} title="Add Subject">
        <form className="space-y-4" onSubmit={handleAddSubject}>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Subject Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="e.g., Mathematics" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Code</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="e.g., MATH9" value={formData.code || ''} onChange={e => setFormData({ ...formData, code: e.target.value })} required />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" fullWidth type="submit">Create</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => { setShowAddSubject(false); setFormData({}) }}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditSubject} onClose={() => setShowEditSubject(false)} title="Edit Subject">
        <form className="space-y-4" onSubmit={handleEditSubject}>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Subject Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Code</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              value={formData.code || ''} onChange={e => setFormData({ ...formData, code: e.target.value })} required />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" fullWidth type="submit">Update</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => { setShowEditSubject(false); setEditingItem(null); setFormData({}) }}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showAddUniversity} onClose={() => setShowAddUniversity(false)} title="Add University">
        <form className="space-y-4" onSubmit={async (e) => {
          e.preventDefault()
          try {
            await universityService.createUniversity({ name: formData.name, location: formData.location || '' })
            setShowAddUniversity(false); setFormData({}); await fetchUniversities()
          } catch { alert('Failed to add university') }
        }}>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">University Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="e.g., Addis Ababa University" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Location</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="e.g., Addis Ababa" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" fullWidth type="submit">Create</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => setShowAddUniversity(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showAddDepartment} onClose={() => setShowAddDepartment(false)} title="Add Department">
        <form className="space-y-4" onSubmit={async (e) => {
          e.preventDefault()
          try {
            await departmentService.create({ name: formData.name, universityId: formData.universityId || selectedUniversity } as any)
            setShowAddDepartment(false); setFormData({})
            if (selectedUniversity) await fetchDepartments(selectedUniversity)
          } catch { alert('Failed to add department') }
        }}>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Department Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="e.g., Software Engineering" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Code</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="e.g., SE" value={formData.code || ''} onChange={e => setFormData({ ...formData, code: e.target.value })} required />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" fullWidth type="submit">Create</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => setShowAddDepartment(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showAddResourceType} onClose={() => setShowAddResourceType(false)} title="Add Resource Type">
        <form className="space-y-4" onSubmit={handleAddResourceType}>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              placeholder="e.g., Past exams, Study guides" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" fullWidth type="submit">Create</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => { setShowAddResourceType(false); setFormData({}) }}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEditResourceType} onClose={() => setShowEditResourceType(false)} title="Edit Resource Type">
        <form className="space-y-4" onSubmit={handleEditResourceType}>
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Name</label>
            <input type="text" className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" fullWidth type="submit">Save</Button>
            <Button variant="secondary" fullWidth type="button" onClick={() => { setShowEditResourceType(false); setEditingItem(null); setFormData({}) }}>Cancel</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!showDeleteConfirm} onClose={() => !deleting && setShowDeleteConfirm(null)} title="Confirm Delete">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/20">
            <AlertCircle size={24} className="text-red-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Are you sure you want to delete <span className="text-red-600 dark:text-red-400">&ldquo;{showDeleteConfirm?.name}&rdquo;</span>?
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{getDeleteWarning()}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="danger" fullWidth onClick={handleDelete} disabled={deleting}>
              {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} Delete
            </Button>
            <Button variant="secondary" fullWidth onClick={() => setShowDeleteConfirm(null)} disabled={deleting}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  )

  return content
}

export default EducationHierarchy
