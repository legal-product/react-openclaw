import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline'
  icon?: ReactNode
}

export const Button = ({
  className,
  variant = 'primary',
  icon,
  children,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button type={type} className={cn('btn', `btn--${variant}`, className)} {...props}>
    {icon}
    {children}
  </button>
)
