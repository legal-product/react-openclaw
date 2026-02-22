import { FormEvent, useEffect, useRef, useState } from 'react'

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

  const initialIndex = CAPABILITIES.findIndex((item) => item.highlight)
  const [activeIndex, setActiveIndex] = useState(initialIndex !== -1 ? initialIndex : 0)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const ITEM_HEIGHT = 84

  useEffect(() => {
    if (!carouselRef.current) return
    carouselRef.current.scrollTop = activeIndex * ITEM_HEIGHT
  }, [activeIndex])

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return
    const nextIndex = Math.round(carouselRef.current.scrollTop / ITEM_HEIGHT)
    const clamped = Math.max(0, Math.min(CAPABILITIES.length - 1, nextIndex))
    if (clamped !== activeIndex) {
      setActiveIndex(clamped)
    }
  }

  const setActive = (index: number) => {
    setActiveIndex(index)
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ top: index * ITEM_HEIGHT, behavior: 'smooth' })
    }
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
            <div className="landing__capabilities-mask landing__capabilities-mask--top" aria-hidden />
            <div className="landing__capabilities-mask landing__capabilities-mask--bottom" aria-hidden />
            <div className="landing__capabilities-track" ref={carouselRef} onScroll={handleCarouselScroll}>
              {CAPABILITIES.map((item, index) => {
                const depth = Math.abs(index - activeIndex)
                const isActive = index === activeIndex
                const scale = isActive ? 1.02 : Math.max(0.85, 1 - depth * 0.07)
                const opacity = isActive ? 1 : Math.max(0.25, 1 - depth * 0.25)
                const blur = isActive ? 0 : depth * 1.1
                const height = isActive ? 82 : 66
                const zIndex = CAPABILITIES.length - depth
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`landing__capability ${isActive ? 'landing__capability--active' : ''}`}
                    style={{
                      transform: `scale(${scale})`,
                      opacity,
                      filter: `blur(${blur}px)`,
                      height: `${height}px`,
                      zIndex,
                    }}
                    onClick={() => setActive(index)}
                  >
                    {isActive ? <span className="landing__capability-glow" aria-hidden /> : null}
                    {isActive ? (
                      <span className="landing__capability-icon" aria-hidden>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 12h4l3 5 3-10 4 5" />
                          <path d="M5 5v14" />
                        </svg>
                      </span>
                    ) : null}
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
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
