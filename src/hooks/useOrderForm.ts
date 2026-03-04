import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useValidation } from './useValidation'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEY } from '@/lib/storage'
import type { Order, FormStep } from '@/types/order'
import type { SenderData, ReceiverData } from '@/lib/validations'

export function useOrderForm() {
  const router = useRouter()
  const [, setOrders] = useLocalStorage<Order[]>(STORAGE_KEY, [])
  const [step, setStep] = useState<FormStep>(1)
  const [senderData, setSenderData] = useState<Partial<SenderData>>({})
  const [receiverData, setReceiverData] = useState<Partial<ReceiverData>>({
    cargoType: 'standard',
    weight: 0.1,
  })
  const [agreed, setAgreed] = useState(false)

  const {
    errors,
    validateSender,
    validateReceiver,
    validateConfirm,
    clearSenderError,
    clearReceiverError,
  } = useValidation()

  const updateSender = useCallback(
    (field: keyof SenderData, value: string) => {
      setSenderData((prev) => ({ ...prev, [field]: value }))
      clearSenderError(field)
    },
    [clearSenderError]
  )

  const updateReceiver = useCallback(
    (field: keyof ReceiverData, value: string | number) => {
      setReceiverData((prev) => ({ ...prev, [field]: value }))
      clearReceiverError(field)
    },
    [clearReceiverError]
  )

  const handleNext = useCallback(() => {
    if (step === 1 && validateSender(senderData)) {
      setStep(2)
    } else if (step === 2 && validateReceiver(receiverData, senderData.senderCity)) {
      setStep(3)
    }
  }, [step, senderData, receiverData, validateSender, validateReceiver])

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep((step - 1) as FormStep)
    }
  }, [step])

  const handleSubmit = useCallback(() => {
    if (!validateConfirm(agreed)) return

    const newOrder: Order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      senderName: senderData.senderName ?? '',
      senderPhone: senderData.senderPhone ?? '',
      senderCity: senderData.senderCity ?? '',
      receiverName: receiverData.receiverName ?? '',
      receiverCity: receiverData.receiverCity ?? '',
      cargoType: receiverData.cargoType ?? 'standard',
      weight: receiverData.weight ?? 0.1,
    }

    setOrders((prev) => [...prev, newOrder])
    router.push('/orders')
  }, [agreed, senderData, receiverData, validateConfirm, router, setOrders])

  return {
    step,
    senderData,
    receiverData,
    agreed,
    errors,
    setAgreed,
    updateSender,
    updateReceiver,
    handleNext,
    handleBack,
    handleSubmit,
  }
}
