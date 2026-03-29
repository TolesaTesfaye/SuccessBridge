import React from 'react'
import { type Resource } from '@types'
import { Button } from '@components/common/Button'
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
    <div className="resource-list space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold text-center">Type</th>
                <th className="px-6 py-4 font-semibold">Level / Grade</th>
                <th className="px-6 py-4 font-semibold">Date Added</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {resources.map(resource => (
                <tr key={resource.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 dark:text-white truncate max-w-[250px]">{resource.title}</div>
                    <div className="text-xs text-slate-500 truncate max-w-[250px]">{resource.description}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold capitalize bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                      {resource.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="capitalize text-slate-900 dark:text-slate-200 font-medium tracking-tight">
                      {(resource.educationLevel || '').replace('_', ' ')}
                    </div>
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                      {resource.grade || resource.departmentId || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                    {new Date(resource.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" size="sm" onClick={() => onView?.(resource)}>View</Button>
                      {showActions && (
                        <>
                          <Button variant="secondary" size="sm" onClick={() => onEdit?.(resource)}>Edit</Button>
                          <Button variant="danger" size="sm" onClick={() => onDelete?.(resource)}>Delete</Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
