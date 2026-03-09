import React from 'react'

interface Option {
  value: string | number
  label: string
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: Option[]
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  error,
  helperText,
  options,
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
      <div className="relative group italic font-medium">
        <select
          className={`
            w-full px-4 py-3 rounded-xl 
            bg-white dark:bg-slate-800/50 
            border transition-all duration-300 
            text-slate-900 dark:text-white appearance-none
            ${error
              ? 'border-red-500 dark:border-red-500/50 focus:ring-4 focus:ring-red-500/10'
              : 'border-slate-200 dark:border-slate-800 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/5'
            } 
            outline-none text-sm cursor-pointer
            ${className}
          `}
          {...props}
        >
          <option value="" className="dark:bg-slate-900 italic opacity-50">Choose an option...</option>
          {options.map(option => (
            <option key={option.value} value={option.value} className="dark:bg-slate-900 font-sans not-italic">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

