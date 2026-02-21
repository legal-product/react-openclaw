import { Card } from '../../components/ui/Card'
import { StatCard } from '../../components/ui/StatCard'

const SALES_KPIS = [
  {
    id: 'open-pipeline',
    title: 'Open pipeline',
    value: '$4.2M',
    helperText: 'Next 90 days',
    icon: '📈',
    trend: { label: '+12% vs last qtr', direction: 'up' as const },
  },
  {
    id: 'booked-revenue',
    title: 'Booked revenue',
    value: '$2.9M',
    helperText: '48 deals closed',
    icon: '💼',
    trend: { label: '+340K MoM', direction: 'up' as const },
  },
  {
    id: 'conversion-rate',
    title: 'Win rate',
    value: '32%',
    helperText: 'Target: 28%',
    icon: '🎯',
    trend: { label: '+4 pts', direction: 'up' as const },
  },
  {
    id: 'sales-cycle',
    title: 'Sales cycle',
    value: '46 days',
    helperText: 'Down from 53d',
    icon: '⏱️',
    trend: { label: '-7 days', direction: 'down' as const },
  },
]

const PIPELINE_STAGES = [
  { id: 'prospecting', label: 'Prospecting', value: '$1.1M', progress: 62, deals: 48 },
  { id: 'demo', label: 'Discovery / Demo', value: '$980K', progress: 54, deals: 35 },
  { id: 'proposal', label: 'Proposal', value: '$1.4M', progress: 73, deals: 22 },
  { id: 'contract', label: 'Contracting', value: '$720K', progress: 66, deals: 12 },
]

const LEADERBOARD = [
  { id: 'vera', name: 'Vera Hollis', amount: '$920K', status: '+28% quota' },
  { id: 'samuel', name: 'Samuel Ortiz', amount: '$710K', status: '+11% quota' },
  { id: 'mina', name: 'Mina Patel', amount: '$640K', status: 'On target' },
]

const SALES_HIGHLIGHTS = [
  {
    id: 'enterprise-boost',
    label: 'Enterprise momentum',
    detail: 'Closed 3 lighthouse accounts in EMEA with multi-year terms.',
    status: 'Ahead',
  },
  {
    id: 'plg-handsoff',
    label: 'Product-led funnel',
    detail: 'Self-serve upgrades generated $240K this month (+35% MoM).',
    status: 'Scaling',
  },
  {
    id: 'risk-watch',
    label: 'Risk watchlist',
    detail: '3 renewals flagged for exec visibility — playbooks in motion.',
    status: 'Monitoring',
  },
]

const SalesPage = () => {
  const updatedLabel = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date())

  return (
    <section className="sales-page">
      <Card className="sales-page__hero">
        <div>
          <p className="sales-page__eyebrow">Revenue team</p>
          <h2>Sales performance cockpit</h2>
          <p>Pulse on pipeline strength, execution velocity, and quarterly goals.</p>
        </div>
        <div className="sales-page__hero-meta">
          <span>Quarter target</span>
          <strong>$8.0M</strong>
          <small>Updated {updatedLabel}</small>
        </div>
      </Card>

      <div className="stat-grid">
        {SALES_KPIS.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            helperText={stat.helperText}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="sales-grid">
        <Card className="sales-card">
          <h3 style={{ marginTop: 0 }}>Pipeline health</h3>
          <p className="sales-card__subtitle">Active opportunities for the next 90 days</p>
          <ul className="sales-pipeline">
            {PIPELINE_STAGES.map((stage) => (
              <li key={stage.id}>
                <div className="sales-pipeline__header">
                  <strong>{stage.label}</strong>
                  <span>{stage.value}</span>
                </div>
                <div className="sales-pipeline__bar" aria-hidden>
                  <span style={{ width: `${stage.progress}%` }} />
                </div>
                <small>{stage.deals} deals in stage</small>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="sales-card">
          <h3 style={{ marginTop: 0 }}>Leaderboard</h3>
          <p className="sales-card__subtitle">Top performers by closed-won revenue</p>
          <ol className="sales-leaderboard">
            {LEADERBOARD.map((rep, index) => (
              <li key={rep.id}>
                <span className="sales-leaderboard__rank">{index + 1}</span>
                <div>
                  <strong>{rep.name}</strong>
                  <p>{rep.status}</p>
                </div>
                <span className="sales-leaderboard__amount">{rep.amount}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Card className="sales-card">
        <h3 style={{ marginTop: 0 }}>Quarterly highlights</h3>
        <ul className="sales-highlights">
          {SALES_HIGHLIGHTS.map((item) => (
            <li key={item.id}>
              <div>
                <span className="sales-highlight__label">{item.label}</span>
                <p>{item.detail}</p>
              </div>
              <span className="sales-highlight__status">{item.status}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}

export default SalesPage
