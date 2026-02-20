import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Button } from './Button'
import { cn } from '../../lib/utils'

type ModalProps = {
  open: boolean
  title?: string
  children: ReactNode
  onClose: () => void
}

export const Modal = ({ open, title, children, onClose }: ModalProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)')

  useEffect(() => {
    if (!open) {
      return undefined
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [open])

  if (!open) {
    return null
  }

  return createPortal(
    <div className="modal-overlay" role="dialog" aria-modal>
      <div className={cn('modal-card', isMobile && 'drawer')}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <Button variant="ghost" aria-label="Close details" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
