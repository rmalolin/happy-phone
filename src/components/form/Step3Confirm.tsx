import type { OrderFormData } from '@/types/order'
import { getCargoLabel } from '@/lib/utils'

interface Step3ConfirmProps {
  data: OrderFormData
  agreed: boolean
  onAgreeChange: (value: boolean) => void
  error?: string
}

export function Step3Confirm({ data, agreed, onAgreeChange, error }: Step3ConfirmProps) {
  const cargoLabel = getCargoLabel(data.cargoType)

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 text-lg font-semibold">Сводка заявки</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-medium text-gray-600">Отправитель</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-gray-500">Имя:</span> {data.senderName}
              </p>
              <p>
                <span className="text-gray-500">Телефон:</span> {data.senderPhone}
              </p>
              <p>
                <span className="text-gray-500">Город:</span> {data.senderCity}
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-medium text-gray-600">Получатель</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-gray-500">Имя:</span> {data.receiverName}
              </p>
              <p>
                <span className="text-gray-500">Город:</span> {data.receiverCity}
              </p>
              <p>
                <span className="text-gray-500">Тип груза:</span> {cargoLabel}
              </p>
              <p>
                <span className="text-gray-500">Вес:</span> {data.weight} кг
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <p className="text-sm">
            <span className="text-gray-500">Маршрут:</span> {data.senderCity} → {data.receiverCity}
          </p>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreeChange(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300"
        />
        <span className="text-sm text-gray-600">
          Я соглашаюсь с условиями обработки данных и правилами доставки
        </span>
      </label>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
