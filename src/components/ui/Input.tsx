import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  hint?: ReactNode
}

export const Input = ({ label, error, hint, id, className, ...props }: InputProps) => {
  const inputId = id ?? props.name ?? label
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined

  return (
    <div className={cn('input-field', className)}>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} aria-invalid={!!error} aria-describedby={describedBy} {...props} />
      {error ? (
        <span className="input-field__error" id={`${inputId}-error`}>
          {error}
        </span>
      ) : hint ? (
        <small id={`${inputId}-hint`}>{hint}</small>
      ) : null}
    </div>
  )
}
