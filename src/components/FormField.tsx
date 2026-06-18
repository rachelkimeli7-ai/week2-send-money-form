import type{ ReactNode } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  children: ReactNode
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      {children}
      {error && (
        <p className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}