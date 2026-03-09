import React, { useState } from 'react'
import { DashboardLayout } from '@components/dashboards/DashboardLayout'
import { ResourceList } from '@components/resources/ResourceList'
import { ResourceFilter } from '@components/resources/ResourceFilter'
import { useResources } from '@hooks/useResources'

export const StudentResources: React.FC = () => {
  const [filters, setFilters] = useState({})
  const { resources, loading, error } = useResources(filters)

  return (
    <DashboardLayout title="Resources" subtitle="Browse and access learning materials">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white m-0">Available Resources</h2>
        <ResourceFilter onFilter={setFilters} />
        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-500/20">
            {error}
          </div>
        )}
        <ResourceList
          resources={resources}
          loading={loading}
          showActions={false}
        />
      </div>
    </DashboardLayout>
  )
}
