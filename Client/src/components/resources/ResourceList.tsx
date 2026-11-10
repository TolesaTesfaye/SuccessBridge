import React from 'react'
import { type Resource } from '@types'
import { Button } from '@components/common/Button'
import { Pagination } from '@components/common/Pagination'
import { Loading } from '@components/common/Loading'
import { Eye, Edit2, Trash2, File, BookOpen, FileText } from 'lucide-react'

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

const getTypeColor = (type: string) => {
  switch(type?.toLowerCase()) {
    case 'video': return 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30'
    case 'textbook': return 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30'
    case 'notes': return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30'
    case 'quiz': return 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30'
    case 'assignment': return 'bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-500/30'
    default: return 'bg-slate-100 dark:bg-slate-500/20 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-500/30'
  }
}

const getTypeIcon = (type: string) => {
  switch(type?.toLowerCase()) {
    case 'video': return '🎥'
    case 'textbook': return '📕'
    case 'notes': return '📝'
    case 'quiz': return '✅'
    case 'assignment': return '📋'
    default: return '📄'
  }
}

const getLevelBadgeColor = (level: string) => {
  switch(level?.toLowerCase()) {
    case 'high_school': return 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30'
    case 'university': return 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30'
    default: return 'bg-slate-100 dark:bg-slate-500/20 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-500/30'
  }
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
      <div className="resource-list-empty text-center py-16">
        <div className="text-5xl mb-4">📚</div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No resources found</h3>
        <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters or upload a new resource</p>
      </div>
    )
  }

  return (
    <div className="resource-list space-y-4">
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider">Resource</th>
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider">Type</th>
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider">Level</th>
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider">Grade / Category</th>
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider">Added</th>
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {resources.map((resource, idx) => (
                <tr key={resource.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                  {/* Resource Title & Description */}
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {getTypeIcon(resource.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white truncate max-w-[300px] leading-snug">
                          {resource.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[300px] mt-1">
                          {resource.description || 'No description'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Type Badge */}
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap ${getTypeColor(resource.type)}`}>
                      {resource.type?.replace('_', ' ') || 'Unknown'}
                    </span>
                  </td>

                  {/* Education Level Badge */}
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap ${getLevelBadgeColor(resource.educationLevel)}`}>
                      {resource.educationLevel?.replace('_', ' ') || 'N/A'}
                    </span>
                  </td>

                  {/* Grade / Category */}
                  <td className="px-6 py-5">
                    <div className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                      {resource.grade || resource.category || '-'}
                    </div>
                  </td>

                  {/* Date Added */}
                  <td className="px-6 py-5 text-slate-600 dark:text-slate-400 font-medium text-sm whitespace-nowrap">
                    {new Date(resource.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => onView?.(resource)}
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      {showActions && (
                        <>
                          <button
                            onClick={() => onEdit?.(resource)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-200"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => onDelete?.(resource)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-700 dark:hover:text-rose-300 transition-all duration-200"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
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
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}
