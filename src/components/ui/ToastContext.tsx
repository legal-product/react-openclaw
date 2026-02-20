import { createContext, useContext } from 'react'

export type ToastOptions = {
  message: string
  type?: 'success' | 'error'
  durationMs?: number
}

type ToastContextValue = {
  pushToast: (toast: ToastOptions) => void
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
