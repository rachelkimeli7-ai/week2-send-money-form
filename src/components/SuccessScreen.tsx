import type { Transaction } from '../types'

interface SuccessScreenProps {
  transaction: Transaction
  onReset: () => void
}

export function SuccessScreen({ transaction, onReset }: SuccessScreenProps) {
  return (
    <div className="card">
      <div className="success-icon" aria-hidden="true">✓</div>

      <div className="card__header">
        <h1 className="card__title card__title--success">Transfer Successful!</h1>
        <p className="card__subtitle">Transaction completed successfully</p>
      </div>

      <div className="reference-box">
        <p className="reference-box__label">Transaction Reference</p>
        <p className="reference-box__value">{transaction.reference}</p>
      </div>

      <div className="summary">
        <div className="summary__row">
          <span className="summary__label">Sent to</span>
          <span className="summary__value">{transaction.recipient.phoneNumber}</span>
        </div>
        <div className="summary__row">
          <span className="summary__label">Amount Sent</span>
          <span className="summary__value">
            {transaction.currency} {transaction.amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="summary__row">
          <span className="summary__label">Fee</span>
          <span className="summary__value">
            {transaction.currency} {transaction.fee.toFixed(2)}
          </span>
        </div>
        <div className="summary__row summary__row--total">
          <span className="summary__label">Total Deducted</span>
          <span className="summary__value summary__value--total">
            {transaction.currency} {transaction.total.toFixed(2)}
          </span>
        </div>
        {transaction.note && (
          <div className="summary__row">
            <span className="summary__label">Note</span>
            <span className="summary__value">{transaction.note}</span>
          </div>
        )}
        <div className="summary__row">
          <span className="summary__label">Date</span>
          <span className="summary__value">
            {new Date(transaction.timestamp).toLocaleString('en-KE')}
          </span>
        </div>
      </div>

      <button className="btn btn--primary" onClick={onReset}>
        Send Another
      </button>
    </div>
  )
}