import { Card } from '../../components/ui/Card'
import { StatCard } from '../../components/ui/StatCard'

const kpis = [
  {
    title: 'Quarterly revenue',
    value: '$4.2M',
    helperText: 'Goal: $4.8M',
    trend: { label: '+12% vs Q2', direction: 'up' as const },
    icon: '💰',
  },
  {
    title: 'Win rate',
    value: '38%',
    helperText: 'Top quartile benchmark: 35%',
    trend: { label: '+3 pts', direction: 'up' as const },
    icon: '🥇',
  },
  {
    title: 'Average deal size',
    value: '$86k',
    helperText: 'Mid-market focus',
    trend: { label: 'flat week-over-week', direction: 'neutral' as const },
    icon: '📈',
  },
  {
    title: 'Forecast coverage',
    value: '3.4×',
    helperText: 'Need ≥ 3× to hit targets',
    trend: { label: '+0.4× MoM', direction: 'up' as const },
    icon: '🛡️',
  },
]

const pipelineStages = [
  { stage: 'Discovery', detail: '38 active deals · Avg 12 days in stage', status: '+6 net new this week' },
  { stage: 'Evaluation', detail: '24 deals · 51% conversion probability', status: 'Shorter cycles after new playbook' },
  { stage: 'Negotiation', detail: '11 deals · $1.3M weighted', status: '3 deals blocked on security review' },
  { stage: 'Closing', detail: '5 commits · $740k potential upside', status: '2 closes targeted before Friday' },
]

const leaderboard = [
  { rep: 'Mara Rich', metric: '$910k closed', delta: '+$140k WoW' },
  { rep: 'Ayo Pierre', metric: '$780k closed', delta: '+$95k WoW' },
  { rep: 'Keiko Lin', metric: '$650k closed', delta: '+$80k WoW' },
]

const focusAreas = [
  'Launch Q4 expansion playbook for enterprise accounts',
  'Stand up weekly pipeline review with RevOps + Sales Ops',
  'Accelerate security reviews with pre-approved questionnaire',
]

const SalesPage = () => {
  return (
    <section className="sales-page">
      <Card className="sales-hero">
        <div>
          <p className="sales-hero__eyebrow">Revenue operations</p>
          <h2>Sales performance cockpit</h2>
          <p className="sales-hero__subtitle">
            Track throughput, momentum, and the KPIs that keep quarterly targets on pace.
          </p>
        </div>
        <div className="sales-hero__actions">
          <button className="btn btn--primary">Create forecast snapshot</button>
          <button className="btn btn--outline">Open pipeline</button>
        </div>
      </Card>

      <div className="stat-grid">
        {kpis.map((kpi) => (
          <StatCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            helperText={kpi.helperText}
            trend={kpi.trend}
            icon={kpi.icon}
          />
        ))}
      </div>

      <div className="sales-grid">
        <Card className="sales-card">
          <h3>Pipeline momentum</h3>
          <p className="sales-card__subhead">Stage health over the last 14 days</p>
          <ul className="sales-list">
            {pipelineStages.map((stage) => (
              <li key={stage.stage}>
                <div>
                  <strong>{stage.stage}</strong>
                  <p>{stage.detail}</p>
                </div>
                <span>{stage.status}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="sales-card">
          <h3>Team leaderboard</h3>
          <p className="sales-card__subhead">Top performers this sprint</p>
          <ul className="sales-list">
            {leaderboard.map((entry) => (
              <li key={entry.rep}>
                <div>
                  <strong>{entry.rep}</strong>
                  <p>{entry.metric}</p>
                </div>
                <span>{entry.delta}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="sales-card">
        <h3>Focus areas</h3>
        <p className="sales-card__subhead">Weekly priorities aligned with GTM</p>
        <ul className="sales-focus-list">
          {focusAreas.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </section>
  )
}

export default SalesPage
