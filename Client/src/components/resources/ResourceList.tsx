import React from 'react'
import { type Resource } from '@types'
import { ResourceCard } from './ResourceCard'
import { Pagination } from '@components/common/Pagination'
import { Loading } from '@components/common/Loading'

interface ResourceListProps {
  resources: Resource[]
  loading?: boolean
  onView?: (resource: Resource) => void
  onEdit?: (resource: Resource) => void
  onDelete?: (resource: Resource) => void
  showActions?: boolean
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  loading = false,
  onView,
  onEdit,
  onDelete,
  showActions = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (loading) {
    return <Loading message="Loading resources..." />
  }

  if (resources.length === 0) {
    return (
      <div className="resource-list-empty">
        <div className="empty-icon">📚</div>
        <h3>No resources found</h3>
        <p>Try adjusting your filters or upload a new resource</p>
      </div>
    )
  }

  return (
    <div className="resource-list">
      <div className="resource-grid">
        {resources.map(resource => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onView={() => onView?.(resource)}
            onEdit={() => onEdit?.(resource)}
            onDelete={() => onDelete?.(resource)}
            showActions={showActions}
          />
        ))}
      </div>

      {totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}
