import React from 'react'

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      {label && (
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
          {label}
        </label>
      )}
      <textarea
        className={`
          px-4 py-3 rounded-xl 
          bg-white dark:bg-slate-700
          border transition-all duration-300 
          text-slate-900 dark:text-white 
          placeholder:text-slate-400 placeholder:opacity-100
          dark:placeholder:text-slate-400 dark:placeholder:opacity-100
          ${error
            ? 'border-red-500 dark:border-red-500/50 focus:ring-4 focus:ring-red-500/10'
            : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20'
          } 
          outline-none text-sm font-medium resize-vertical min-h-32
          ${className}
        `}
        {...props}
      />
      {error ? (
        <div className="flex items-center gap-1.5 ml-1 mt-1">
          <span className="w-1 h-1 rounded-full bg-red-500"></span>
          <span className="text-red-500 text-[11px] font-bold uppercase tracking-wider">{error}</span>
        </div>
      ) : helperText ? (
        <span className="text-slate-500 dark:text-slate-500 text-xs ml-1 mt-1 font-medium">{helperText}</span>
      ) : null}
    </div>
  )
}
