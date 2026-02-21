import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { ChartCard } from '../../components/ui/ChartCard'
import { StatCard } from '../../components/ui/StatCard'
import { Skeleton } from '../../components/ui/Skeleton'
import { useToast } from '../../components/ui/ToastContext'
import type { DashboardSnapshot } from './data'
import { fetchDashboardSnapshot } from './data'

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date)

const chartPalette = ['#8b5cf6', '#0ea5e9', '#22c55e', '#f97316'] as const

const parseValueToNumber = (value: string) => {
  const normalized = Number(value.replace(/[^\d.-]/g, ''))
  return Number.isFinite(normalized) ? normalized : 0
}

const HomePage = () => {
  const { pushToast } = useToast()
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const loadSnapshot = useCallback(async () => {
    setStatus('loading')
    setErrorMessage(null)
    try {
      const response = await fetchDashboardSnapshot()
      setSnapshot(response)
      setStatus('ready')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load dashboard data')
      setStatus('error')
    }
  }, [])

  const closeAccountMenu = useCallback(() => setMenuOpen(false), [])

  const toggleAccountMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  const handleLogout = useCallback(() => {
    closeAccountMenu()
    pushToast({ message: 'You have been logged out', type: 'success' })
  }, [closeAccountMenu, pushToast])

  const handleMenuNavigation = useCallback(() => {
    closeAccountMenu()
  }, [closeAccountMenu])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadSnapshot()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [loadSnapshot])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        closeAccountMenu()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAccountMenu()
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeAccountMenu, menuOpen])

  const todayLabel = formatDate(new Date())
  const isEmpty = status === 'ready' && snapshot === null

  const activities = useMemo(() => snapshot?.activities ?? [], [snapshot])
  const chartData = useMemo(
    () =>
      snapshot?.stats.map((stat, index) => ({
        label: stat.title.replace(/products?/i, '').trim() || stat.title,
        value: parseValueToNumber(stat.value),
        color: chartPalette[index % chartPalette.length],
      })) ?? [],
    [snapshot],
  )

  const chartEmptyMessage =
    status === 'error'
      ? 'Chart unavailable while we reconnect to the dashboard.'
      : 'No chart data to visualize yet.'

  return (
    <section className="dashboard">
      <div className="dashboard-actions">
        <div className="user-menu" ref={menuRef}>
          <button
            type="button"
            className="user-menu__trigger"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls="account-menu"
            onClick={toggleAccountMenu}
          >
            <span className="user-menu__avatar" aria-hidden="true">
              N
            </span>
            <span className="user-menu__details">
              <strong>Newton</strong>
              <small>Administrator</small>
            </span>
            <span className="user-menu__chevron" aria-hidden="true">
              ▾
            </span>
          </button>
          {menuOpen ? (
            <div id="account-menu" className="user-menu__dropdown" role="menu" aria-label="Account menu">
              <Link
                to="/settings"
                className="user-menu__item"
                role="menuitem"
                onClick={handleMenuNavigation}
              >
                Account settings
              </Link>
              <button
                type="button"
                className="user-menu__item user-menu__item--danger"
                role="menuitem"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <Card className="welcome-card">
        <div>
          <p className="welcome-card__eyebrow">Dashboard</p>
          <h2>Welcome back, Newton</h2>
          <p>{todayLabel}</p>
        </div>
        <Link className="btn btn--primary" to="/products">
          Manage products
        </Link>
      </Card>

      {status === 'error' ? (
        <Card className="products-state">
          <p>{errorMessage}</p>
          <button className="btn btn--primary" onClick={loadSnapshot}>
            Try again
          </button>
        </Card>
      ) : null}

      {status === 'loading' ? (
        <div className="stat-grid" data-testid="dashboard-skeleton">
          {[0, 1, 2, 3].map((key) => (
            <Skeleton key={key} className="stat-skeleton" />
          ))}
        </div>
      ) : snapshot ? (
        <div className="stat-grid">
          {snapshot.stats.map((stat) => (
            <StatCard
              key={stat.id}
              testId={`stat-${stat.id}`}
              title={stat.title}
              value={stat.value}
              helperText={stat.helperText}
              icon={stat.icon}
              trend={{ label: stat.trendLabel, direction: stat.trendDirection }}
            />
          ))}
        </div>
      ) : null}

      <div className="dashboard-grid">
        {status === 'loading' ? (
          <Skeleton className="chart-skeleton" />
        ) : chartData.length > 0 ? (
          <ChartCard
            title="Products by status"
            description="Live snapshot of catalog health"
            data={chartData}
          />
        ) : (
          <Card className="chart-card">
            <p>{chartEmptyMessage}</p>
          </Card>
        )}

        <Card className="activity-card">
          <h3 style={{ marginTop: 0 }}>Recent activity</h3>
          {status === 'loading' ? (
            <Skeleton className="activity-skeleton" />
          ) : status === 'error' ? (
            <p>Activity feed unavailable while we retry.</p>
          ) : isEmpty ? (
            <p>No activity to display yet.</p>
          ) : (
            <ul>
              {activities.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <p style={{ margin: '0.25rem 0' }}>{item.detail}</p>
                  <time dateTime={item.timestamp}>
                    {new Date(item.timestamp).toLocaleString(undefined, {
                      hour: 'numeric',
                      minute: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </section>
  )
}

export default HomePage
