import { cn } from '../../lib/utils'

export type SkeletonProps = {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={cn('skeleton', className)} aria-hidden="true" />
}
