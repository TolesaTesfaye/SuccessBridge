import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { ResourceList } from '@components/resources/ResourceList'
import { ResourceFilter } from '@components/resources/ResourceFilter'
import { resourceService } from '@services/resourceService'
import { Modal } from '@components/common/Modal'
import { Button } from '@components/common/Button'
import type { Resource } from '@types'

type SuperAdminResourcesProps = {
  embedded?: boolean;
};

export const SuperAdminResources: React.FC<SuperAdminResourcesProps> = ({
  embedded = false,
}) => {
  const [educationLevel, setEducationLevel] = useState<'high_school' | 'university'>('high_school')
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    type: '',
    educationLevel: ''
  })
  // Preview image editing
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [removePreview, setRemovePreview] = useState(false)
  const [currentPreviewSrc, setCurrentPreviewSrc] = useState<string | null>(null)
  const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  // Full resource-type list for the edit dropdown. The resource's current type
  // is always included so the dropdown never renders blank and never forces a
  // re-selection when the admin only wants to change e.g. the preview image.
  const resourceTypeOptions = React.useMemo(() => {
    const base = [
      'textbook', 'reference_book', 'module', 'professional_module',
      'video', 'video_tutorial', 'educational_video',
      'past_exam', 'entrance_exam', 'quiz', 'interactive_quiz', 'remedial_quiz',
      'worksheet', 'assignment', 'project', 'research', 'career', 'recommendation', 'notes',
    ];
    const current = (editFormData.type || '').trim();
    const values = current && !base.includes(current) ? [current, ...base] : base;
    return values.map((v) => ({
      value: v,
      label: v.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
  }, [editFormData.type]);

  useEffect(() => {
    fetchResources()
  }, [educationLevel, selectedGrade, selectedCategory, currentPage])

  const fetchResources = async () => {
    setLoading(true)
    try {
      // Build filter object
      const filterObject: any = {
        educationLevel: educationLevel,
        page: currentPage,
        limit: 10
      }
      
      // Add grade filter for high school
      if (educationLevel === 'high_school' && selectedGrade) {
        filterObject.grade = selectedGrade
      }
      
      // Add category/grade filter for university (backend stores category in grade field)
      if (educationLevel === 'university' && selectedCategory) {
        filterObject.grade = selectedCategory
      }
      
      const response = await resourceService.getResources(filterObject)
      setResources(response.data?.data || [])
      setTotalPages(Math.ceil((response.data?.total || 0) / 10))
    } catch (error) {
      console.error('Failed to fetch resources:', error)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  const handleView = (resource: Resource) => {
    setSelectedResource(resource)
    setShowViewModal(true)
  }

  const handleEdit = (resource: Resource) => {
    setSelectedResource(resource)
    setEditFormData({
      title: resource.title || '',
      description: resource.description || '',
      type: resource.type || '',
      educationLevel: resource.educationLevel || ''
    })
    // Reset preview image state
    setPreviewFile(null)
    setRemovePreview(false)
    setPreviewObjectUrl(null)
    setCurrentPreviewSrc(null)
    setShowEditModal(true)

    // Resolve the current custom preview image (signed URL) for display
    if ((resource as any).previewImageUrl) {
      resourceService
        .getPreviewImageUrl(resource.id)
        .then((res) => {
          if (res.success && res.url) setCurrentPreviewSrc(res.url)
        })
        .catch(() => {
          /* card falls back to the default image */
        })
    }
  }

  const handleDelete = (resource: Resource) => {
    setSelectedResource(resource)
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedResource) return
    
    try {
      await resourceService.deleteResource(selectedResource.id)
      setResources(resources.filter(r => r.id !== selectedResource.id))
      setShowDeleteConfirm(false)
      setSelectedResource(null)
      alert('Resource deleted successfully')
    } catch (error) {
      console.error('Failed to delete resource:', error)
      alert('Failed to delete resource')
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedResource) return

    setUpdating(true)
    try {
      // Send multipart only when the preview image is being replaced or removed
      const files = previewFile
        ? { previewImage: previewFile }
        : removePreview
          ? { removePreviewImage: true }
          : undefined

      // Type/level are already set at upload time — only send them when the
      // admin actually picked one. Empty means "keep what's stored".
      const payload: Record<string, any> = { ...editFormData }
      if (!payload.type) delete payload.type
      if (!payload.educationLevel) delete payload.educationLevel

      await resourceService.updateResource(selectedResource.id, payload as any, files)
      await fetchResources()
      setShowEditModal(false)
      setSelectedResource(null)
      alert('Resource updated successfully')
    } catch (error) {
      console.error('Failed to update resource:', error)
      alert('Failed to update resource')
    } finally {
      setUpdating(false)
    }
  }

  // Local preview of a newly chosen image (object URL lifecycle)
  useEffect(() => {
    if (!previewFile) {
      setPreviewObjectUrl(null)
      return
    }
    const url = URL.createObjectURL(previewFile)
    setPreviewObjectUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [previewFile])

  const content = (
      <div className="space-y-6">
        {/* Header with Education Level Toggle and Filter */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">All Resources</h2>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEducationLevel('high_school')
                  setSelectedGrade(undefined)
                  setSelectedCategory(undefined)
                  setCurrentPage(1)
                }}
                className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                  educationLevel === 'high_school'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                📚 High School
              </button>
              <button
                onClick={() => {
                  setEducationLevel('university')
                  setSelectedGrade(undefined)
                  setSelectedCategory(undefined)
                  setCurrentPage(1)
                }}
                className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                  educationLevel === 'university'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/50'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                🎓 University
              </button>
            </div>
          </div>

          {/* Filter Section - Inline with Toggle Buttons */}
          <ResourceFilter 
            onFilterChange={(newFilters) => {
              if (newFilters.grade !== undefined) {
                setSelectedGrade(newFilters.grade || undefined)
              }
              if (newFilters.category !== undefined) {
                setSelectedCategory(newFilters.category || undefined)
              }
              setCurrentPage(1)
            }}
            educationLevel={educationLevel === 'high_school' ? 'highSchool' : 'university'}
            selectedGrade={selectedGrade}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Resources Table */}
        <ResourceList 
          resources={resources}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* View Resource Modal */}
        <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Resource Details" size="lg">
          {selectedResource ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Title</label>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedResource.title || 'N/A'}</p>
              </div>
              
              {selectedResource.description && (
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Description</label>
                  <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{selectedResource.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Type</label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {selectedResource.type ? String(selectedResource.type).replace(/_/g, ' ') : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Education Level</label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {selectedResource.educationLevel ? String(selectedResource.educationLevel).replace(/_/g, ' ') : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedResource.subject && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Subject</label>
                    <p className="text-gray-900 dark:text-white">{String(selectedResource.subject)}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Grade/Level</label>
                  <p className="text-gray-900 dark:text-white">
                    {(() => {
                      const gradeValue = (selectedResource as any).grade || (selectedResource as any).category || (selectedResource as any).universityLevel
                      if (!gradeValue) return 'N/A'
                      if (typeof gradeValue === 'object' && gradeValue !== null) {
                        return gradeValue.name || 'N/A'
                      }
                      return String(gradeValue).replace(/_/g, ' ')
                    })()}
                  </p>
                </div>
              </div>
              
              {(selectedResource as any).university && (
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">University</label>
                  <p className="text-gray-900 dark:text-white">
                    {typeof (selectedResource as any).university === 'object' && (selectedResource as any).university !== null
                      ? (selectedResource as any).university.name || 'N/A'
                      : String((selectedResource as any).university)}
                  </p>
                </div>
              )}
              
              {(selectedResource as any).department && (
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Department</label>
                  <p className="text-gray-900 dark:text-white">
                    {typeof (selectedResource as any).department === 'object' && (selectedResource as any).department !== null
                      ? (selectedResource as any).department.name || 'N/A'
                      : String((selectedResource as any).department)}
                  </p>
                </div>
              )}
              
              {selectedResource.tags && (
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Tags</label>
                  <p className="text-gray-900 dark:text-white">{String(selectedResource.tags)}</p>
                </div>
              )}
              
              {selectedResource.fileUrl && (
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">File</label>
                  <a 
                    href={selectedResource.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 dark:text-blue-400 hover:underline break-all inline-flex items-center gap-2"
                  >
                    <span>📎</span>
                    <span>Open File</span>
                  </a>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Created At</label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedResource.createdAt ? new Date(selectedResource.createdAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
                {(selectedResource as any).updatedAt && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Updated At</label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date((selectedResource as any).updatedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-500 dark:text-slate-400 mb-1">Resource ID</label>
                <p className="text-gray-900 dark:text-white font-mono text-xs break-all">{selectedResource.id}</p>
              </div>
              
              <div className="pt-4 border-t dark:border-slate-700">
                <Button variant="secondary" fullWidth onClick={() => setShowViewModal(false)}>Close</Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-slate-400">No resource selected</p>
            </div>
          )}
        </Modal>

        {/* Edit Resource Modal */}
        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Resource" size="lg">
          <form className="space-y-4" onSubmit={handleEditSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Title</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Description</label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" 
                rows={4}
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              />
            </div>
            {/* Card Preview Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                🖼️ Card Preview Image
              </label>
              <div className="flex items-start gap-4">
                <div className="w-36 h-24 rounded-lg overflow-hidden border border-gray-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 shrink-0">
                  {removePreview ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-slate-500 dark:text-slate-400 text-center px-2">
                      <span>Default image</span>
                      <span>will be shown</span>
                    </div>
                  ) : (
                    <img
                      src={previewObjectUrl || currentPreviewSrc || undefined}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="inline-block cursor-pointer px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                    {previewFile ? 'Change image' : 'Choose new image'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null
                        setPreviewFile(file)
                        if (file) setRemovePreview(false)
                      }}
                    />
                  </label>
                  {previewFile && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                      {previewFile.name}
                    </p>
                  )}
                  {((selectedResource as any)?.previewImageUrl || previewFile) && (
                    <button
                      type="button"
                      onClick={() => {
                        setRemovePreview((prev) => {
                          if (prev) return false
                          setPreviewFile(null)
                          return true
                        })
                      }}
                      className="block text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                    >
                      {removePreview ? '↩ Undo remove' : '🗑️ Remove custom image'}
                    </button>
                  )}
                  {!removePreview && !previewFile && !(selectedResource as any)?.previewImageUrl && (
                    <p className="text-[11px] text-slate-400">No custom image yet — the default type image is shown on the card.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Type <span className="text-[11px] font-normal text-slate-400">(already set — change only if needed)</span>
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={editFormData.type}
                  onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                >
                  <option value="">Keep current type</option>
                  {resourceTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Education Level <span className="text-[11px] font-normal text-slate-400">(already set)</span>
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={editFormData.educationLevel}
                  onChange={(e) => setEditFormData({ ...editFormData, educationLevel: e.target.value })}
                >
                  <option value="">Keep current level</option>
                  <option value="high_school">High School</option>
                  <option value="university">University</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth type="submit" disabled={updating}>
                {updating ? 'Updating…' : 'Update Resource'}
              </Button>
              <Button variant="secondary" fullWidth type="button" onClick={() => setShowEditModal(false)} disabled={updating}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Confirm Delete">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-slate-300">
              Are you sure you want to delete <strong>{selectedResource?.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button variant="danger" fullWidth onClick={handleConfirmDelete}>Delete Resource</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </div>
  );

  if (embedded) return content;

  return (
    <DashboardLayout title="Resources" subtitle="Platform-wide resource management">
      {content}
    </DashboardLayout>
  );
};
