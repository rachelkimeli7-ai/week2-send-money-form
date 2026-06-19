# week2-send-money-form

Week 2 challenge — Mobile Money Send Money Form

Built with React, TypeScript, and Vite. No backend — all data is mocked.

# What it does

A 3-step Send Money flow:

1. **Form** — enter recipient phone, amount, currency, and an optional note. Errors show inline as you type. Send button stays disabled until everything is valid.
2. **Confirmation** — shows a summary with the 1% fee and total. You can cancel (keeps your info) or confirm.
3. **Success** — shows a mock transaction reference number, with a button to send another.

# How to run

```bash
npm install
npm run dev
```

# Validation rules

- Phone: must start with 07 or 01, 10 digits total
- Amount: positive, can't exceed available balance
- Currency: must pick KES, USD, or EUR
- Note: optional, max 100 characters
# Structure

All logic lives in `src/hooks/useSendMoneyForm.ts`. Components in `src/components/` just display data and call the hook's functions — they don't hold their own state.