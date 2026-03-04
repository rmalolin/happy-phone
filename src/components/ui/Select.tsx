import { memo } from 'react'
import type { SelectHTMLAttributes } from 'react'

type Option = {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  error?: string
}

export const Select = memo(function Select({
  label,
  options,
  error,
  id,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        className={`rounded-md border px-3 py-2 text-base outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
})
