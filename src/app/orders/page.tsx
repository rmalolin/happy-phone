'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { OrderCard } from '@/components/orders/OrderCard'
import { OrdersFilter } from '@/components/orders/OrdersFilter'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { searchOrders, filterByCargoType, STORAGE_KEY } from '@/lib/storage'
import type { Order } from '@/types/order'

export default function OrdersPage() {
  const [orders, setOrders] = useLocalStorage<Order[]>(STORAGE_KEY, [])
  const [search, setSearch] = useState('')
  const [cargoFilter, setCargoFilter] = useState('all')
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; orderId: string | null }>({
    isOpen: false,
    orderId: null,
  })

  const filteredOrders = useMemo(() => {
    let result = orders
    result = searchOrders(result, search)
    result = filterByCargoType(result, cargoFilter)
    return result
  }, [orders, search, cargoFilter])

  const openDeleteModal = useCallback((id: string) => {
    setDeleteModal({ isOpen: true, orderId: id })
  }, [])

  const closeDeleteModal = useCallback(() => {
    setDeleteModal({ isOpen: false, orderId: null })
  }, [])

  const confirmDelete = useCallback(() => {
    if (deleteModal.orderId) {
      setOrders((prev) => prev.filter((order) => order.id !== deleteModal.orderId))
      closeDeleteModal()
    }
  }, [deleteModal.orderId, setOrders, closeDeleteModal])

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Мои заявки</h1>
        <Link href="/">
          <Button>Новая заявка</Button>
        </Link>
      </div>

      {orders.length > 0 && (
        <OrdersFilter
          search={search}
          onSearchChange={setSearch}
          cargoFilter={cargoFilter}
          onCargoFilterChange={setCargoFilter}
        />
      )}

      {filteredOrders.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">
            {orders.length === 0 ? 'У вас пока нет заявок' : 'Ничего не найдено'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} onDelete={openDeleteModal} />
          ))}
        </div>
      )}

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Удаление заявки"
        message="Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить."
        confirmText="Удалить"
        cancelText="Отмена"
      />
    </div>
  )
}
