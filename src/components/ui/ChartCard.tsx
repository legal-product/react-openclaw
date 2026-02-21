import { memo } from 'react'
import { Card } from './Card'

export type ChartDatum = {
  label: string
  value: number
  color: string
}

type ChartCardProps = {
  title: string
  description?: string
  data: ChartDatum[]
}

export const ChartCard = memo(({ title, description, data }: ChartCardProps) => {
  const maxValue = Math.max(...data.map((item) => item.value), 1)
  return (
    <Card className="chart-card">
      <div className="chart-card__header">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="chart-card__bars">
        {data.map((item) => (
          <div key={item.label} className="chart-card__bar">
            <span className="chart-card__bar-label">{item.label}</span>
            <div className="chart-card__bar-track" role="img" aria-label={`${item.label}: ${item.value}`}>
              <div
                className="chart-card__bar-fill"
                style={{ width: `${(item.value / maxValue) * 100}%`, backgroundColor: item.color }}
              />
            </div>
            <span className="chart-card__bar-value">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
})

ChartCard.displayName = 'ChartCard'
