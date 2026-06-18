import type { SenderAccount, Currency } from '../types'

export const mockSender: SenderAccount = {
  id: 'acc-001',
  name: 'Kaylah Precious',
  phoneNumber: '+254 712 345 678',
  balance: 54820.00,
  currency: 'KES',
}

export const CURRENCIES: Currency[] = ['KES', 'USD', 'EUR']