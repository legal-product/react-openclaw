import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react'
import { cn } from '../../lib/utils'

type CardProps<T extends ElementType> = PropsWithChildren<{
  as?: T
  className?: string
}> &
  Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export const Card = <T extends ElementType = 'div'>({ as, className, children, ...rest }: CardProps<T>) => {
  const Component = (as ?? 'div') as ElementType
  return (
    <Component className={cn('card', className)} {...rest}>
      {children}
    </Component>
  )
}
