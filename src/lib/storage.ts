import type { Order } from '@/types/order'

export const STORAGE_KEY = 'happy-phone-orders'

export function searchOrders(orders: Order[], query: string): Order[] {
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return orders

  return orders.filter(
    (order) =>
      order.receiverName.toLowerCase().includes(normalizedQuery) ||
      order.receiverCity.toLowerCase().includes(normalizedQuery)
  )
}

export function filterByCargoType(orders: Order[], cargoType: string): Order[] {
  if (!cargoType || cargoType === 'all') return orders
  return orders.filter((order) => order.cargoType === cargoType)
}
