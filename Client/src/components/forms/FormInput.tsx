import React from 'react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  helperText,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 mb-5 w-full">
      {label && (
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 rounded-xl 
            bg-white dark:bg-slate-800/50 
            border transition-all duration-300 
            text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600
            ${icon ? 'pl-11' : ''}
            ${error
              ? 'border-red-500 dark:border-red-500/50 focus:ring-4 focus:ring-red-500/10'
              : 'border-slate-200 dark:border-slate-800 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/5'
            } 
            outline-none text-sm font-medium
            ${className}
          `}
          {...props}
        />
      </div>
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

