'use client'

import { useState, useMemo, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { formatDate, getCargoLabel } from '@/lib/utils'
import { STORAGE_KEY } from '@/lib/storage'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import type { Order } from '@/types/order'

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [orders, setOrders] = useLocalStorage<Order[]>(STORAGE_KEY, [])

  const order = useMemo(() => {
    const id = params.id as string
    return orders.find((o) => o.id === id) ?? null
  }, [orders, params.id])

  const handleDelete = useCallback(() => {
    setOrders((prev) => prev.filter((o) => o.id !== order?.id))
    router.push('/orders')
  }, [order?.id, setOrders, router])

  if (!order) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="mb-4 text-gray-500">Заявка не найдена</p>
        <Link href="/orders">
          <Button variant="secondary">Вернуться к списку</Button>
        </Link>
      </div>
    )
  }

  const cargoLabel = getCargoLabel(order.cargoType)
  const date = formatDate(order.createdAt)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Заявка</h1>
        <Link href="/orders">
          <Button variant="secondary">Назад к списку</Button>
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="rounded bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Новая
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>

        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <p className="text-lg font-medium">
            {order.senderCity} → {order.receiverCity}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-semibold">Отправитель</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Имя:</span>{' '}
                <span className="font-medium">{order.senderName}</span>
              </div>
              <div>
                <span className="text-gray-500">Телефон:</span>{' '}
                <span className="font-medium">{order.senderPhone}</span>
              </div>
              <div>
                <span className="text-gray-500">Город:</span>{' '}
                <span className="font-medium">{order.senderCity}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Получатель</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Имя:</span>{' '}
                <span className="font-medium">{order.receiverName}</span>
              </div>
              <div>
                <span className="text-gray-500">Город:</span>{' '}
                <span className="font-medium">{order.receiverCity}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="mb-3 font-semibold">Информация о грузе</h3>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-lg bg-gray-100 px-4 py-2">
              <span className="text-gray-500">Тип:</span>{' '}
              <span className="font-medium">{cargoLabel}</span>
            </div>
            <div className="rounded-lg bg-gray-100 px-4 py-2">
              <span className="text-gray-500">Вес:</span>{' '}
              <span className="font-medium">{order.weight} кг</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="danger" onClick={() => setShowModal(true)}>
            Удалить заявку
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Удаление заявки"
        message="Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить."
        confirmText="Удалить"
        cancelText="Отмена"
      />
    </div>
  )
}
