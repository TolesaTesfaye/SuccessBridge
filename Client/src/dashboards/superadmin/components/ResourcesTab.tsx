import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { resourceService } from '@services/resourceService'

interface ResourcesTabProps {
  onUpload: () => void
}

export const ResourcesTab: React.FC<ResourcesTabProps> = ({ onUpload }) => {
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await resourceService.getResources()
      const resourcesList = response.data?.data || []
      setResources(Array.isArray(resourcesList) ? resourcesList : [])
    } catch (err) {
      setError('Failed to load resources')
      console.error(err)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteResource = async (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await resourceService.deleteResource(id)
        setResources(resources.filter(r => r.id !== id))
      } catch (err) {
        alert('Failed to delete resource')
        console.error(err)
      }
    }
  }

  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-8">
            <p className="text-gray-600">Loading resources...</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
            <Button variant="secondary" onClick={fetchResources} className="mt-4">
              Retry
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <span>Learning Resources ({resources.length})</span>
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={onUpload}>
              Upload Resource
            </Button>
            <Button variant="secondary" size="sm" onClick={fetchResources}>
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        {resources.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No resources uploaded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Title</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Type</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Uploaded By</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Date</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Level</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resources.map(resource => (
                  <tr key={resource.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-600 text-sm font-medium">{resource.title}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                        {resource.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{resource.uploadedBy || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                        {resource.educationLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => window.open(resource.fileUrl, '_blank')}>
                          View
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteResource(resource.id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  )
}