import { z } from 'zod'

const CARGO_TYPES = ['documents', 'fragile', 'standard'] as const
export type CargoType = (typeof CARGO_TYPES)[number]

export const cargoTypes: { value: CargoType; label: string }[] = [
  { value: 'documents', label: 'Документы' },
  { value: 'fragile', label: 'Хрупкое' },
  { value: 'standard', label: 'Обычное' },
]

const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/

export const senderSchema = z.object({
  senderName: z.string().min(2, 'Минимум 2 символа'),
  senderPhone: z.string().regex(phoneRegex, 'Неверный формат телефона'),
  senderCity: z.string().min(2, 'Минимум 2 символа'),
})

export const receiverSchema = z.object({
  receiverName: z.string().min(2, 'Минимум 2 символа'),
  receiverCity: z.string().min(2, 'Минимум 2 символа'),
  cargoType: z.enum(CARGO_TYPES),
  weight: z.coerce
    .number({ message: 'Обязательное поле' })
    .min(0.1, 'Минимум 0.1 кг')
    .max(30, 'Максимум 30 кг'),
})

export const confirmSchema = z.object({
  agreed: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласие',
  }),
})

export type SenderData = z.infer<typeof senderSchema>
export type ReceiverData = z.infer<typeof receiverSchema>
