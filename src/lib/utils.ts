import { cargoTypes } from './validations'
import type { CargoType } from '@/types/order'

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getCargoLabel(type: CargoType): string {
  return cargoTypes.find((ct) => ct.value === type)?.label ?? type
}
