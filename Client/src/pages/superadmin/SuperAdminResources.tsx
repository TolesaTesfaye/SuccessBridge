import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { ResourceList } from '@components/resources/ResourceList'
import { ResourceFilter } from '@components/resources/ResourceFilter'
import { resourceService } from '@services/resourceService'

export const SuperAdminResources: React.FC = () => {
  const [filters, setFilters] = useState({})
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

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
        />
      </div>
    </DashboardLayout>
  )
}
