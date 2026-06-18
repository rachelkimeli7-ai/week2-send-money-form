import type { FormValues, FormErrors, SenderAccount } from '../types'
import { CURRENCIES } from '../data/mockData'
import { FormField } from './FormField'

interface SendMoneyFormProps {
  values: FormValues
  errors: FormErrors
  isValid: boolean
  sender: SenderAccount
  onChange: (field: keyof FormValues, value: string) => void
  onSubmit: () => void
}

export function SendMoneyForm({
  values,
  errors,
  isValid,
  sender,
  onChange,
  onSubmit,
}: SendMoneyFormProps) {
  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Send Money</h1>
        <p className="card__subtitle">Transfer funds instantly</p>
      </div>

      <div className="balance-strip">
        <span className="balance-strip__label">Available Balance</span>
        <span className="balance-strip__amount">
          {sender.currency} {sender.balance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className="form">
        <FormField label="Recipient Phone Number" error={errors.recipientPhone}>
          <input
            className={`input ${errors.recipientPhone ? 'input--error' : ''}`}
            type="tel"
            placeholder="07xx xxx xxx"
            value={values.recipientPhone}
            onChange={e => onChange('recipientPhone', e.target.value)}
          />
        </FormField>

        <FormField label="Amount" error={errors.amount}>
          <input
            className={`input ${errors.amount ? 'input--error' : ''}`}
            type="number"
            placeholder="0.00"
            value={values.amount}
            onChange={e => onChange('amount', e.target.value)}
          />
        </FormField>

        <FormField label="Currency" error={errors.currency}>
          <select
            className={`input ${errors.currency ? 'input--error' : ''}`}
            value={values.currency}
            onChange={e => onChange('currency', e.target.value)}
          >
            <option value="">Select currency</option>
            {CURRENCIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Note (optional)" error={errors.note}>
          <textarea
            className={`input input--textarea ${errors.note ? 'input--error' : ''}`}
            placeholder="Add a quick note"
            value={values.note}
            onChange={e => onChange('note', e.target.value)}
            maxLength={110}
          />
          <p className="char-count">{values.note.length}/100</p>
        </FormField>

        <button
          className="btn btn--primary"
          onClick={onSubmit}
          disabled={!isValid}
        >
          Send Money
        </button>
      </div>
    </div>
  )
}