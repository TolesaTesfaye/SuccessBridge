import React from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div
        className={`
          relative bg-white dark:bg-slate-900
          rounded-[32px] shadow-2xl shadow-black/20 
          border border-slate-200/50 dark:border-white/10
          flex flex-col w-full ${sizeClasses[size]} 
          max-h-[90vh] overflow-hidden
          animate-slideUp transition-all duration-500
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic">{title}</h2>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm group"
            onClick={onClose}
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 text-slate-600 dark:text-slate-400 font-medium custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-8 py-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/80 flex gap-4 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

