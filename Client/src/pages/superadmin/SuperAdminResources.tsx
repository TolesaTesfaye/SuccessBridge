import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { ResourceList } from '@components/resources/ResourceList'
import { ResourceFilter } from '@components/resources/ResourceFilter'
import { resourceService } from '@services/resourceService'
import { Modal } from '@components/common/Modal'
import { Button } from '@components/common/Button'
import type { Resource } from '@types'

export const SuperAdminResources: React.FC = () => {
  const [filters, setFilters] = useState({})
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

  useEffect(() => {
    fetchResources()
  }, [filters, currentPage])

  const fetchResources = async () => {
    setLoading(true)
    try {
      const response = await resourceService.getResources({
        ...filters,
        page: currentPage,
        limit: 10
      } as any)
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
    setShowEditModal(true)
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
    
    try {
      await resourceService.updateResource(selectedResource.id, editFormData)
      await fetchResources()
      setShowEditModal(false)
      setSelectedResource(null)
      alert('Resource updated successfully')
    } catch (error) {
      console.error('Failed to update resource:', error)
      alert('Failed to update resource')
    }
  }

  return (
    <DashboardLayout title="Resources" subtitle="Platform-wide resource management">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white m-0">All Resources</h2>
        <ResourceFilter onFilter={setFilters} />
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
              
              <div className="grid grid-cols-2 gap-4">
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
              
              <div className="grid grid-cols-2 gap-4">
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
              
              <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Type</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={editFormData.type}
                  onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="textbook">Textbook</option>
                  <option value="video">Video</option>
                  <option value="quiz">Quiz</option>
                  <option value="notes">Notes</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Education Level</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={editFormData.educationLevel}
                  onChange={(e) => setEditFormData({ ...editFormData, educationLevel: e.target.value })}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="high_school">High School</option>
                  <option value="university">University</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="primary" fullWidth type="submit">Update Resource</Button>
              <Button variant="secondary" fullWidth type="button" onClick={() => setShowEditModal(false)}>Cancel</Button>
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
    </DashboardLayout>
  )
}
