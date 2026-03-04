import { Button } from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

export function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
}: ModalProps) {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold">{title}</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
