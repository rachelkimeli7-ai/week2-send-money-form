import { useState } from 'react'
import type { FormValues, FormErrors, Step, Transaction, Currency } from '../types'
import { mockSender } from '../data/mockData'

const emptyForm: FormValues = {
  recipientPhone: '',
  amount: '',
  currency: '',
  note: '',
}


  function validate(values: FormValues, balance: number): FormErrors {
  const errors: FormErrors = {}

  // recipient phone must start with 07 or 01 and be exactly 10 digits
  const phoneRegex = /^(07|01)\d{8}$/
  if (!phoneRegex.test(values.recipientPhone)) {
    errors.recipientPhone = 'Enter a valid Kenyan phone number (07xx or 01xx, 10 digits)'
  }


// amount must be positive 
  const amt = parseFloat(values.amount)
  if (!values.amount || isNaN(amt) || amt <= 0) {
    errors.amount = 'Enter a valid positive amount'
  } else if (amt > balance) {
    errors.amount = 'Insufficient balance'
  }

  // currency must be selected
  if (!values.currency) {
    errors.currency = 'Select a currency'
  }

  // note optional but maximum of 100 chars
  if (values.note.length > 100) {
    errors.note = 'Note cannot exceed 100 characters'
  }

  return errors
}
export function useSendMoneyForm() {
  const [values, setValues] = useState<FormValues>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [step, setStep] = useState<Step>('form')
  const [transaction, setTransaction] = useState<Transaction | null>(null)


  const currentErrors = validate(values, mockSender.balance)
  const isValid = Object.keys(currentErrors).length === 0

  // handleChange 
  function handleChange(field: keyof FormValues, value: string) {
    const updated = { ...values, [field]: value }
    setValues(updated)
    setErrors(validate(updated, mockSender.balance))
  }

  // computeFee 1% of amount rounded to 2 decimal places
  function computeFee(): number {
    const amt = parseFloat(values.amount)
    if (isNaN(amt)) return 0
    return Math.round(amt * 0.01 * 100) / 100
  }

  // computeTotal = amount + fee
  function computeTotal(): number {
    const amt = parseFloat(values.amount)
    if (isNaN(amt)) return 0
    return Math.round((amt + computeFee()) * 100) / 100
  }

  // handleSubmit 
  function handleSubmit() {
    const errs = validate(values, mockSender.balance)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setStep('confirm')
    }
  }

  // handleConfirm 
  function handleConfirm() {
    const fee = computeFee()
    const total = computeTotal()
    const ref = 'TXN' + Date.now().toString().slice(-8).toUpperCase()

    const tx: Transaction = {
      id: 'tx-' + Date.now(),
      sender: mockSender,
      recipient: { phoneNumber: values.recipientPhone },
      amount: parseFloat(values.amount),
      currency: values.currency as Currency,
      fee,
      total,
      note: values.note,
      timestamp: new Date().toISOString(),
      reference: ref,
    }

    setTransaction(tx)
    setStep('success')
  }

  // handleCancel 
  function handleCancel() {
    setStep('form')
  }

  // handleReset 
  function handleReset() {
    setValues(emptyForm)
    setErrors({})
    setTransaction(null)
    setStep('form')
  }

  return {
    values,
    errors,
    step,
    transaction,
    isValid,
    handleChange,
    computeFee,
    computeTotal,
    handleSubmit,
    handleConfirm,
    handleCancel,
    handleReset,
    sender: mockSender,
  }
}