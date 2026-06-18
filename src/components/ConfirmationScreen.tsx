import type { FormValues, Currency } from '../types'

interface ConfirmationScreenProps {
  values: FormValues
  fee: number
  total: number
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmationScreen({
  values,
  fee,
  total,
  onConfirm,
  onCancel,
}: ConfirmationScreenProps) {
  const currency = values.currency as Currency

  return (
    <div className="card">
      <div className="card__header">
        <h1 className="card__title">Confirm Transfer</h1>
        <p className="card__subtitle">Please review before sending</p>
      </div>

      <div className="summary">
        <div className="summary__row">
          <span className="summary__label">Recipient</span>
          <span className="summary__value">{values.recipientPhone}</span>
        </div>
        <div className="summary__row">
          <span className="summary__label">Amount</span>
          <span className="summary__value">
            {currency} {parseFloat(values.amount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="summary__row">
          <span className="summary__label">Fee (1%)</span>
          <span className="summary__value summary__value--warning">
            {currency} {fee.toFixed(2)}
          </span>
        </div>
        <div className="summary__row summary__row--total">
          <span className="summary__label">Total Deducted</span>
          <span className="summary__value summary__value--total">
            {currency} {total.toFixed(2)}
          </span>
        </div>
        {values.note && (
          <div className="summary__row">
            <span className="summary__label">Note</span>
            <span className="summary__value">{values.note}</span>
          </div>
        )}
      </div>

      <div className="btn-group">
        <button className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn--primary" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  )
}