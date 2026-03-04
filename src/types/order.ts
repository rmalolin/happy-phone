import type { CargoType } from '@/lib/validations'

export type { CargoType }

export type Order = {
  id: string
  createdAt: string
  senderName: string
  senderPhone: string
  senderCity: string
  receiverName: string
  receiverCity: string
  cargoType: CargoType
  weight: number
}

export type OrderFormData = Omit<Order, 'id' | 'createdAt'>

export type FormStep = 1 | 2 | 3
