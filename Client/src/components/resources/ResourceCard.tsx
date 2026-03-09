import React from 'react'
import { type Resource } from '@types'
import { ExternalLink, Download, FileText, Video, BookOpen, PenTool, Layers, Briefcase, FlaskConical, ClipboardList, Target } from 'lucide-react'

interface ResourceCardProps {
  resource: Resource
  onEdit?: () => void
  onDelete?: () => void
  showAdminActions?: boolean
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onEdit,
  onDelete,
  showAdminActions = false,
}) => {
  const getResourceIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      textbook: <BookOpen className="w-5 h-5" />,
      video: <Video className="w-5 h-5" />,
      past_exam: <ClipboardList className="w-5 h-5" />,
      module: <Layers className="w-5 h-5" />,
      quiz: <PenTool className="w-5 h-5" />,
      worksheet: <FileText className="w-5 h-5" />,
      project: <Target className="w-5 h-5" />,
      research: <FlaskConical className="w-5 h-5" />,
      career: <Briefcase className="w-5 h-5" />,
    }
    return icons[type] || <FileText className="w-5 h-5" />
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      textbook: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
      video: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400',
      past_exam: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
      module: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
      quiz: 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400',
      worksheet: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
      project: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
      research: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      career: 'bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400',
    }
    return colors[type] || 'bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-400'
  }

  const getFullUrl = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    // Assumes backend is at :5000 and frontend is at :5173 locally
    const baseUrl = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace('/api', '')
      : 'http://localhost:5000'
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }

  const handleOpen = () => {
    if (resource.fileUrl) {
      window.open(getFullUrl(resource.fileUrl), '_blank', 'noopener,noreferrer')
    }
  }

  const handleDownload = async () => {
    if (!resource.fileUrl) return

    try {
      const url = getFullUrl(resource.fileUrl)
      // Fetch the file as a Blob to force download behavior
      const response = await fetch(url)
      const blob = await response.blob()

      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      // Extract filename from URL or use resource title
      const filename = resource.fileUrl.split('/').pop() || `${resource.title}.pdf`
      link.download = filename

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the object URL to avoid memory leaks
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback if fetch fails (e.g., CORS issues)
      window.open(getFullUrl(resource.fileUrl), '_blank')
    }
  }

  return (
    <div className="group bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
      {/* Card Header - Type Badge */}
      <div className={`px-4 py-2.5 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50 ${getTypeColor(resource.type)} bg-opacity-50`}>
        {getResourceIcon(resource.type)}
        <span className="text-[11px] font-bold uppercase tracking-wider">
          {resource.type.replace('_', ' ')}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <h4 className="font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
          {resource.title}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 flex-1">
          {resource.description}
        </p>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {resource.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-[10px] text-slate-400 dark:text-slate-500">
          Added {new Date(resource.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Card Footer - Actions */}
      <div className="px-5 pb-5 flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={handleOpen}
            disabled={!resource.fileUrl}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all duration-200 active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open
          </button>
          <button
            onClick={handleDownload}
            disabled={!resource.fileUrl}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all duration-200 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>

        {/* Admin-only actions */}
        {showAdminActions && (onEdit || onDelete) && (
          <div className="flex gap-2 pt-1 border-t border-slate-100 dark:border-slate-700 mt-1">
            {onEdit && (
              <button
                onClick={onEdit}
                className="flex-1 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="flex-1 py-2 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
