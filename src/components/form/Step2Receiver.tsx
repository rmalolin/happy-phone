import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { cargoTypes } from '@/lib/validations'
import type { ReceiverData } from '@/lib/validations'

interface Step2ReceiverProps {
  data: Partial<ReceiverData>
  errors: Partial<Record<keyof ReceiverData, string>>
  onChange: (field: keyof ReceiverData, value: string | number) => void
}

export function Step2Receiver({ data, errors, onChange }: Step2ReceiverProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        id="receiverName"
        label="Имя получателя"
        value={data.receiverName ?? ''}
        onChange={(e) => onChange('receiverName', e.target.value)}
        error={errors.receiverName}
        placeholder="Введите имя"
      />

      <Input
        id="receiverCity"
        label="Город назначения"
        value={data.receiverCity ?? ''}
        onChange={(e) => onChange('receiverCity', e.target.value)}
        error={errors.receiverCity}
        placeholder="Введите город"
      />

      <Select
        id="cargoType"
        label="Тип груза"
        value={data.cargoType ?? 'standard'}
        onChange={(e) => onChange('cargoType', e.target.value)}
        options={cargoTypes}
        error={errors.cargoType}
      />

      <Input
        id="weight"
        label="Вес, кг"
        type="number"
        step="0.1"
        min="0.1"
        max="30"
        value={data.weight ?? ''}
        onChange={(e) => onChange('weight', parseFloat(e.target.value))}
        error={errors.weight}
        placeholder="От 0.1 до 30"
      />
    </div>
  )
}
