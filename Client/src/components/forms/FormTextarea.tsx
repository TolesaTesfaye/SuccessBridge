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
      {label && <label className="font-semibold text-gray-900 text-sm">{label}</label>}
      <textarea
        className={`px-3 py-2 border border-gray-300 rounded text-base font-inherit transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-vertical min-h-32 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-xs -mt-1">{error}</span>}
      {helperText && <span className="text-gray-600 text-xs -mt-1">{helperText}</span>}
    </div>
  )
}
