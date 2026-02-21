import { memo, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type StatTrend = {
  label: string
  direction: 'up' | 'down' | 'neutral'
}

export type StatCardProps = {
  title: string
  value: string
  helperText?: string
  icon?: ReactNode
  trend?: StatTrend
  className?: string
  testId?: string
}

const trendSymbol: Record<StatTrend['direction'], string> = {
  up: '▲',
  down: '▼',
  neutral: '■',
}

export const StatCard = memo(
  ({ title, value, helperText, icon, trend, className, testId }: StatCardProps) => {
    return (
      <div className={cn('stat-card', className)} data-testid={testId}>
        <div className="stat-card__heading">
          <span className="stat-card__icon" aria-hidden>
            {icon ?? '✨'}
          </span>
          <span className="stat-card__title">{title}</span>
        </div>
        <div className="stat-card__value">{value}</div>
        <div className="stat-card__meta">
          {trend ? (
            <span className={cn('stat-card__trend', `trend--${trend.direction}`)}>
              {trendSymbol[trend.direction]} {trend.label}
            </span>
          ) : (
            <span />
          )}
          {helperText ? <span className="stat-card__helper">{helperText}</span> : null}
        </div>
      </div>
    )
  },
)

StatCard.displayName = 'StatCard'
