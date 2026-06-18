export interface SenderAccount {
  id: string
  name: string
  phoneNumber: string
  balance: number
  currency: string
}

export interface Recipient {
  phoneNumber: string
}

export type Currency = 'KES' | 'USD' | 'EUR'

export interface FormValues {
  recipientPhone: string
  amount: string
  currency: Currency | ''
  note: string
}

export interface FormErrors {
  recipientPhone?: string
  amount?: string
  currency?: string
  note?: string
}

export interface Transaction {
  id: string
  sender: SenderAccount
  recipient: Recipient
  amount: number
  currency: Currency
  fee: number
  total: number
  note: string
  timestamp: string
  reference: string
}

export type Step = 'form' | 'confirm' | 'success'
