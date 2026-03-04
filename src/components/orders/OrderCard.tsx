import { memo } from 'react'
import Link from 'next/link'
import type { Order } from '@/types/order'
import { formatDate, getCargoLabel } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface OrderCardProps {
  order: Order
  onDelete: (id: string) => void
}

export const OrderCard = memo(function OrderCard({ order, onDelete }: OrderCardProps) {
  const cargoLabel = getCargoLabel(order.cargoType)
  const date = formatDate(order.createdAt)

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
      <Link href={`/orders/${order.id}`} className="block">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <p className="font-medium">
              {order.senderCity} → {order.receiverCity}
            </p>
            <p className="text-sm text-gray-500">{order.senderName}</p>
          </div>
          <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            Новая
          </span>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          <span className="rounded bg-gray-100 px-2 py-1">{cargoLabel}</span>
          <span className="rounded bg-gray-100 px-2 py-1">{order.weight} кг</span>
        </div>

        <p className="mt-2 text-xs text-gray-400">{date}</p>
      </Link>

      <div className="mt-3 flex justify-end">
        <Button variant="danger" onClick={() => onDelete(order.id)}>
          Удалить
        </Button>
      </div>
    </div>
  )
})
