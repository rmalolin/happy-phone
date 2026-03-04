import { memo } from 'react'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

export const Button = memo(function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'cursor-pointer rounded-md px-4 py-2 text-base font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
})
