import { FormEvent } from 'react'

const CAPABILITIES = [
  { id: 'actions', label: 'Triages incidents' },
  { id: 'planner', label: 'Rewrites specs & RFCs' },
  { id: 'branches', label: 'Creates feature branches', highlight: true },
  { id: 'ci', label: 'Owns CI + rollout' },
  { id: 'handoff', label: 'Hands off merge-ready PRs' },
]

const LandingPage = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="landing">
      <header className="landing__nav">
        <div className="landing__logo">newton</div>
        <div className="landing__badge">
          <span className="landing__badge-icon" aria-hidden>
            🦀
          </span>
          Powered by OPENCLAW
        </div>
      </header>

      <section className="landing__hero">
        <div className="landing__hero-left">
          <div className="landing__headline">
            <span>The first</span>
            <span className="landing__headline-italic">fully</span>
            <span>autonomous</span>
            <span className="landing__headline-ghost">developer</span>
          </div>
          <div className="landing__capabilities" aria-label="Newton capabilities">
            {CAPABILITIES.map((item, index) => (
              <div
                key={item.id}
                className={`landing__capability ${item.highlight ? 'landing__capability--highlight' : ''}`}
                style={{
                  opacity: item.highlight ? 1 : 0.5 - index * 0.05,
                }}
              >
                {item.highlight ? (
                  <span className="landing__capability-icon" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h4l3 5 3-10 4 5" />
                      <path d="M5 5v14" />
                    </svg>
                  </span>
                ) : null}
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="landing__hero-right">
          <p className="landing__supporting">
            Newton owns the full development lifecycle, from ticket to production, operating across your tools to
            deliver results. You review results.
          </p>

          <form className="landing__cta" onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter business email address" aria-label="Business email" required />
            <button type="submit">Request Access</button>
          </form>

          <div className="landing__mock">
            <div className="landing__mock-header">
              <span />
              <span />
              <span />
            </div>
            <div className="landing__mock-body">
              <div>
                <p>feature/landing-autonomy</p>
                <p className="landing__mock-pill">running checks…</p>
              </div>
              <div className="landing__mock-pane">
                <p>// Autonomous agent timeline</p>
                <p>1. Creates feature branch</p>
                <p>2. Implements spec</p>
                <p>3. Opens PR for review</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
