import { Card } from '../../components/ui/Card'
import { StatCard } from '../../components/ui/StatCard'

const USER_KPIS = [
  {
    id: 'active-users',
    title: 'Weekly active users',
    value: '48,920',
    helperText: '+6.3% vs last week',
    icon: '🟢',
    trend: { label: '+2,890 WoW', direction: 'up' as const },
  },
  {
    id: 'retention',
    title: 'Day-30 retention',
    value: '62%',
    helperText: 'Target 58%',
    icon: '♻️',
    trend: { label: '+4 pts', direction: 'up' as const },
  },
  {
    id: 'nps',
    title: 'NPS',
    value: '47',
    helperText: 'Top quartile',
    icon: '⭐',
    trend: { label: '+5 vs last qtr', direction: 'up' as const },
  },
  {
    id: 'support-load',
    title: 'Support load / 1k users',
    value: '2.3 tickets',
    helperText: 'Down from 3.1',
    icon: '💬',
    trend: { label: '-26%', direction: 'down' as const },
  },
]

const COHORTS = [
  { id: 'design', label: 'Design teams', adoption: 78, users: '14.1K', trend: '+2.1%' },
  { id: 'ops', label: 'Revenue ops', adoption: 65, users: '11.4K', trend: '+1.4%' },
  { id: 'eng', label: 'Engineering', adoption: 58, users: '9.6K', trend: '+0.8%' },
  { id: 'core', label: 'Core admins', adoption: 92, users: '4.8K', trend: '+4.6%' },
]

const USER_FEEDBACK = [
  {
    id: 'workspace-sharing',
    title: 'Workspace sharing',
    summary: 'Most requested enhancement — customers want templates + role defaults.',
    status: 'In discovery',
  },
  {
    id: 'mobile-app',
    title: 'Mobile velocity',
    summary: 'Beta churned < 2%, engagement is 3x push notifications vs control.',
    status: 'Scaling',
  },
  {
    id: 'automation',
    title: 'Automation reliability',
    summary: 'Incident-free for 45 days, CSAT +12 pts after auto-retries shipped.',
    status: 'Healthy',
  },
]

const REGIONAL_USAGE = [
  { id: 'na', region: 'North America', percentage: 48, active: '23.5K' },
  { id: 'emea', region: 'EMEA', percentage: 31, active: '15.1K' },
  { id: 'apac', region: 'APAC', percentage: 15, active: '7.4K' },
  { id: 'latam', region: 'LATAM', percentage: 6, active: '2.9K' },
]

const UsersPage = () => {
  return (
    <section className="users-page">
      <Card className="users-page__hero">
        <div>
          <p className="users-page__eyebrow">Customer intelligence</p>
          <h2>User engagement overview</h2>
          <p>Monitor activation, retention, and satisfaction in one cockpit.</p>
        </div>
        <div className="users-page__hero-meta">
          <span>Platform MAU</span>
          <strong>82,430</strong>
          <small>Updated daily • UTC</small>
        </div>
      </Card>

      <div className="stat-grid">
        {USER_KPIS.map((stat) => (
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

      <div className="users-grid">
        <Card className="users-card">
          <div className="users-card__header">
            <div>
              <h3>Adoption by cohort</h3>
              <p className="users-card__subtitle">Rolling 30-day usage per target group</p>
            </div>
          </div>
          <ul className="users-cohort-list">
            {COHORTS.map((cohort) => (
              <li key={cohort.id}>
                <div>
                  <strong>{cohort.label}</strong>
                  <p>{cohort.users} weekly active</p>
                </div>
                <div className="users-cohort__progress">
                  <span style={{ width: `${cohort.adoption}%` }} />
                </div>
                <div className="users-cohort__meta">
                  <span>{cohort.adoption}% adoption</span>
                  <small>{cohort.trend}</small>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="users-card">
          <div className="users-card__header">
            <div>
              <h3>Regional mix</h3>
              <p className="users-card__subtitle">Share of active customers</p>
            </div>
          </div>
          <ul className="users-region-list">
            {REGIONAL_USAGE.map((region) => (
              <li key={region.id}>
                <div>
                  <strong>{region.region}</strong>
                  <p>{region.active} active</p>
                </div>
                <div className="users-region__bar">
                  <span style={{ width: `${region.percentage}%` }} />
                </div>
                <span className="users-region__percent">{region.percentage}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="users-card">
        <h3 style={{ marginTop: 0 }}>Voice of the customer</h3>
        <p className="users-card__subtitle">What customers are saying right now</p>
        <ul className="users-feedback">
          {USER_FEEDBACK.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.summary}</p>
              </div>
              <span className="users-feedback__status">{item.status}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}

export default UsersPage
