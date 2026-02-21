import { Card } from '../../components/ui/Card'
import { ChartCard } from '../../components/ui/ChartCard'
import { StatCard } from '../../components/ui/StatCard'

const STAT_KPIS = [
  {
    id: 'conversion',
    title: 'Conversion rate',
    value: '4.8%',
    helperText: 'Goal: 5.0%',
    icon: '⚡',
    trend: { label: '+0.3 pts WoW', direction: 'up' as const },
  },
  {
    id: 'sessions',
    title: 'Sessions (7d)',
    value: '1.92M',
    helperText: '+11% vs prior 7d',
    icon: '📊',
    trend: { label: '+190k WoW', direction: 'up' as const },
  },
  {
    id: 'bounce',
    title: 'Bounce rate',
    value: '37%',
    helperText: 'Down from 41%',
    icon: '🧲',
    trend: { label: '-4 pts', direction: 'down' as const },
  },
  {
    id: 'aov',
    title: 'Average order value',
    value: '$142',
    helperText: '+$9 vs last week',
    icon: '💳',
    trend: { label: '+6.8%', direction: 'up' as const },
  },
]

const CHANNEL_MIX = [
  { label: 'Organic', value: 420, color: '#4c1d95' },
  { label: 'Paid search', value: 310, color: '#0ea5e9' },
  { label: 'Paid social', value: 245, color: '#22c55e' },
  { label: 'Partner', value: 180, color: '#f97316' },
  { label: 'Referral', value: 120, color: '#e11d48' },
]

const REGION_REVENUE = [
  { label: 'NA', value: 2.4, color: '#6366f1' },
  { label: 'EMEA', value: 1.7, color: '#14b8a6' },
  { label: 'APAC', value: 1.1, color: '#f9a826' },
  { label: 'LATAM', value: 0.6, color: '#ec4899' },
]

const FUNNEL_STEPS = [
  { stage: 'Visits', value: '1.92M', change: '+11%' },
  { stage: 'Product views', value: '936K', change: '+9%' },
  { stage: 'Adds to cart', value: '412K', change: '+6%' },
  { stage: 'Checkouts', value: '221K', change: '+5%' },
  { stage: 'Purchases', value: '92K', change: '+4%' },
]

const RELEASE_NOTES = [
  {
    id: 'ab-tests',
    title: 'Experiment cadence',
    detail: '4 live tests this week, checkout uplift variant trending +3.1% lift.',
    status: 'Monitoring',
  },
  {
    id: 'latency',
    title: 'Latency milestone',
    detail: 'p95 page render 1.2s (down from 1.6s) after CDN routing changes.',
    status: 'Shipped',
  },
  {
    id: 'alerting',
    title: 'Alert hygiene',
    detail: 'Error budget at 94%; webhook drops resolved with retry queue.',
    status: 'Healthy',
  },
]

const AnalyticsPage = () => {
  return (
    <section className="analytics-page">
      <Card className="analytics-page__hero">
        <div>
          <p className="analytics-page__eyebrow">Growth intelligence</p>
          <h2>Analytics control center</h2>
          <p>Blend acquisition, engagement, and monetization metrics in one curated view.</p>
        </div>
        <div className="analytics-page__hero-meta">
          <span>Reporting window</span>
          <strong>Last 7 days</strong>
          <small>Auto-updated hourly</small>
        </div>
      </Card>

      <div className="stat-grid">
        {STAT_KPIS.map((stat) => (
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

      <div className="analytics-grid">
        <ChartCard
          title="Channel mix"
          description="Sessions by primary acquisition channel"
          data={CHANNEL_MIX}
        />
        <ChartCard
          title="Regional revenue ($M)"
          description="Gross revenue contribution"
          data={REGION_REVENUE.map((item) => ({ ...item, value: item.value * 100 }))}
        />
        <Card className="analytics-card analytics-card--funnel">
          <h3 style={{ marginTop: 0 }}>Conversion funnel</h3>
          <p className="analytics-card__subtitle">Top-of-funnel through purchase</p>
          <ul className="analytics-funnel">
            {FUNNEL_STEPS.map((step, index) => (
              <li key={step.stage}>
                <span className="analytics-funnel__step">{index + 1}</span>
                <div>
                  <strong>{step.stage}</strong>
                  <p>{step.value}</p>
                </div>
                <span className="analytics-funnel__change">{step.change}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="analytics-card">
          <h3 style={{ marginTop: 0 }}>Ops radar</h3>
          <p className="analytics-card__subtitle">Recent highlights from the pipeline</p>
          <ul className="analytics-release">
            {RELEASE_NOTES.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
                <span className="analytics-release__status">{item.status}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}

export default AnalyticsPage
