import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { cargoTypes } from '@/lib/validations'

interface OrdersFilterProps {
  search: string
  onSearchChange: (value: string) => void
  cargoFilter: string
  onCargoFilterChange: (value: string) => void
}

const FILTER_OPTIONS = [{ value: 'all', label: 'Все типы' }, ...cargoTypes]

export function OrdersFilter({
  search,
  onSearchChange,
  cargoFilter,
  onCargoFilterChange,
}: OrdersFilterProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <Input
          id="search"
          label=""
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск по имени получателя или городу..."
        />
      </div>
      <div className="sm:w-48">
        <Select
          id="cargoFilter"
          label=""
          value={cargoFilter}
          onChange={(e) => onCargoFilterChange(e.target.value)}
          options={FILTER_OPTIONS}
        />
      </div>
    </div>
  )
}
