import { useState, useCallback } from 'react'
import { senderSchema, receiverSchema, confirmSchema } from '@/lib/validations'
import type { SenderData, ReceiverData } from '@/lib/validations'

type FormErrors = {
  sender?: Partial<Record<keyof SenderData, string>>
  receiver?: Partial<Record<keyof ReceiverData, string>>
  confirm?: string
}

export function useValidation() {
  const [errors, setErrors] = useState<FormErrors>({})

  const validateSender = useCallback((data: Partial<SenderData>): boolean => {
    const fullData = {
      senderName: data.senderName ?? '',
      senderPhone: data.senderPhone ?? '',
      senderCity: data.senderCity ?? '',
    }

    const result = senderSchema.safeParse(fullData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SenderData, string>> = {}
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0] as keyof SenderData] = err.message
      })
      setErrors((prev) => ({ ...prev, sender: fieldErrors }))
      return false
    }

    setErrors((prev) => ({ ...prev, sender: undefined }))
    return true
  }, [])

  const validateReceiver = useCallback(
    (data: Partial<ReceiverData>, senderCity?: string): boolean => {
      const fullData = {
        receiverName: data.receiverName ?? '',
        receiverCity: data.receiverCity ?? '',
        cargoType: data.cargoType ?? 'standard',
        weight: data.weight ?? 0.1,
      }

      const result = receiverSchema
        .refine((d) => d.receiverCity !== senderCity, {
          message: 'Город назначения не может совпадать с городом отправления',
          path: ['receiverCity'],
        })
        .safeParse(fullData)

      if (!result.success) {
        const fieldErrors: Partial<Record<keyof ReceiverData, string>> = {}
        result.error.issues.forEach((err) => {
          fieldErrors[err.path[0] as keyof ReceiverData] = err.message
        })
        setErrors((prev) => ({ ...prev, receiver: fieldErrors }))
        return false
      }

      setErrors((prev) => ({ ...prev, receiver: undefined }))
      return true
    },
    []
  )

  const validateConfirm = useCallback((agreed: boolean): boolean => {
    const result = confirmSchema.safeParse({ agreed })

    if (!result.success) {
      setErrors((prev) => ({ ...prev, confirm: result.error.issues[0].message }))
      return false
    }

    setErrors((prev) => ({ ...prev, confirm: undefined }))
    return true
  }, [])

  const clearSenderError = useCallback((field: keyof SenderData) => {
    setErrors((prev) => ({
      ...prev,
      sender: { ...prev.sender, [field]: undefined },
    }))
  }, [])

  const clearReceiverError = useCallback((field: keyof ReceiverData) => {
    setErrors((prev) => ({
      ...prev,
      receiver: { ...prev.receiver, [field]: undefined },
    }))
  }, [])

  return {
    errors,
    validateSender,
    validateReceiver,
    validateConfirm,
    clearSenderError,
    clearReceiverError,
  }
}
