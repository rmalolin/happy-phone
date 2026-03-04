import { Input } from '@/components/ui/Input'
import { PhoneInput } from '@/components/form/PhoneInput'
import type { SenderData } from '@/lib/validations'

interface Step1SenderProps {
  data: Partial<SenderData>
  errors: Partial<Record<keyof SenderData, string>>
  onChange: (field: keyof SenderData, value: string) => void
}

export function Step1Sender({ data, errors, onChange }: Step1SenderProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        id="senderName"
        label="Имя отправителя"
        value={data.senderName ?? ''}
        onChange={(e) => onChange('senderName', e.target.value)}
        error={errors.senderName}
        placeholder="Введите имя"
      />
      <PhoneInput
        id="senderPhone"
        label="Телефон"
        value={data.senderPhone ?? ''}
        onChange={(value) => onChange('senderPhone', value)}
        error={errors.senderPhone}
      />
      <Input
        id="senderCity"
        label="Город отправления"
        value={data.senderCity ?? ''}
        onChange={(e) => onChange('senderCity', e.target.value)}
        error={errors.senderCity}
        placeholder="Введите город"
      />
    </div>
  )
}
