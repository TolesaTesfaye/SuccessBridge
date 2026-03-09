import React from 'react'

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className={`w-5 h-5 cursor-pointer accent-blue-500 ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
        {label && <label className="text-sm text-gray-700 cursor-pointer">{label}</label>}
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  )
}
