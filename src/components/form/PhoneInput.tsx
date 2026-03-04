import { memo } from 'react'
import { Input } from '@/components/ui/Input'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  label: string
  error?: string
  id: string
}

function normalizePhoneNumber(input: string): string {
  const digits = input.replace(/\D/g, '')

  let normalized = digits
  if (digits.startsWith('8')) {
    normalized = '7' + digits.slice(1)
  } else if (!digits.startsWith('7') && digits.length > 0) {
    normalized = '7' + digits
  }

  return normalized.slice(0, 11)
}

function formatPhoneNumber(digits: string): string {
  if (digits.length === 0) return ''
  if (digits.length === 1) return '+7'
  if (digits.length <= 4) return `+7 (${digits.slice(1)}`
  if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
  if (digits.length <= 9)
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`
}

export const PhoneInput = memo(function PhoneInput({
  value,
  onChange,
  label,
  error,
  id,
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizePhoneNumber(e.target.value)
    onChange(formatPhoneNumber(normalized))
  }

  return (
    <Input
      id={id}
      type="tel"
      label={label}
      value={value}
      onChange={handleChange}
      error={error}
      placeholder="+7 (999) 123-45-67"
      autoComplete="tel"
    />
  )
})
