import { memo } from 'react'
import type { FormStep } from '@/types/order'

const STEPS = [
  { number: 1, title: 'Отправитель' },
  { number: 2, title: 'Получатель' },
  { number: 3, title: 'Подтверждение' },
] as const

interface StepperProps {
  currentStep: FormStep
}

export const Stepper = memo(function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {STEPS.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors sm:h-10 sm:w-10 ${
                  step.number <= currentStep
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 text-gray-300'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`mt-1 hidden text-xs font-medium sm:mt-2 sm:block ${
                  step.number <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-6 transition-colors sm:mx-4 sm:w-12 ${
                  step.number < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
})
