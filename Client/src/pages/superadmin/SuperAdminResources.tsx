import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { ResourceList } from '@components/resources/ResourceList'
import { ResourceFilter } from '@components/resources/ResourceFilter'

export const SuperAdminResources: React.FC = () => {
  const [filters, setFilters] = useState({})

  return (
    <DashboardLayout title="Resources" subtitle="Platform-wide resource management">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 m-0">All Resources</h2>
        <ResourceFilter onFilter={setFilters} />
        <ResourceList filters={filters} />
      </div>
    </DashboardLayout>
  )
}
