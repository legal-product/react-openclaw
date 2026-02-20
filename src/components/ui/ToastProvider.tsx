import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { generateId } from '../../lib/utils'
import { ToastContext, type ToastOptions } from './ToastContext'

type ToastEntry = ToastOptions & { id: string; type: 'success' | 'error'; durationMs: number }

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    (toast: ToastOptions) => {
      const entry: ToastEntry = {
        id: generateId('toast'),
        type: toast.type ?? 'success',
        durationMs: toast.durationMs ?? 3500,
        message: toast.message,
      }
      setToasts((current) => [...current, entry])
      window.setTimeout(() => removeToast(entry.id), entry.durationMs)
    },
    [removeToast],
  )

  const contextValue = useMemo(() => ({ pushToast }), [pushToast])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
