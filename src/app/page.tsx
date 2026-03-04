'use client'

import { Stepper } from '@/components/form/Stepper'
import { Step1Sender } from '@/components/form/Step1Sender'
import { Step2Receiver } from '@/components/form/Step2Receiver'
import { Step3Confirm } from '@/components/form/Step3Confirm'
import { Button } from '@/components/ui/Button'
import { useOrderForm } from '@/hooks/useOrderForm'

export default function HomePage() {
  const {
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
  } = useOrderForm()

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">Оформление заявки</h1>

      <Stepper currentStep={step} />

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
        {step === 1 && (
          <Step1Sender data={senderData} errors={errors.sender ?? {}} onChange={updateSender} />
        )}

        {step === 2 && (
          <Step2Receiver
            data={receiverData}
            errors={errors.receiver ?? {}}
            onChange={updateReceiver}
          />
        )}

        {step === 3 && (
          <Step3Confirm
            data={{
              senderName: senderData.senderName ?? '',
              senderPhone: senderData.senderPhone ?? '',
              senderCity: senderData.senderCity ?? '',
              receiverName: receiverData.receiverName ?? '',
              receiverCity: receiverData.receiverCity ?? '',
              cargoType: receiverData.cargoType ?? 'standard',
              weight: receiverData.weight ?? 0.1,
            }}
            agreed={agreed}
            onAgreeChange={setAgreed}
            error={errors.confirm}
          />
        )}
      </div>

      <div className="flex justify-between gap-4">
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={step === 1}
          className={step === 1 ? 'invisible' : ''}
        >
          Назад
        </Button>

        {step < 3 ? (
          <Button onClick={handleNext}>Далее</Button>
        ) : (
          <Button onClick={handleSubmit}>Отправить</Button>
        )}
      </div>
    </div>
  )
}
