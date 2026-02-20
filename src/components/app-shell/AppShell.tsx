import { PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../../app/navigation'
import { useLocalStorageState } from '../../hooks/useLocalStorage'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Sidebar } from '../sidebar/Sidebar'
import { Button } from '../ui/Button'

const SIDEBAR_KEY = 'alexai:sidebar-collapsed'

type AppShellProps = PropsWithChildren<{ footerNote?: string }>

export const AppShell = ({ children, footerNote }: AppShellProps) => {
  const [collapsed, setCollapsed] = useLocalStorageState(SIDEBAR_KEY, false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 900px)')
  const location = useLocation()

  const closeMobileNav = useCallback(() => setMobileOpen(false), [])

  const footerLabel = footerNote ?? `© ${new Date().getFullYear()} powerhouse`

  const title = useMemo(() => {
    const active = NAV_ITEMS.find((item) => item.path === location.pathname)
    return active?.label ?? 'Alex AI'
  }, [location.pathname])

  return (
    <div className="app-shell">
      <Sidebar
        items={NAV_ITEMS}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={closeMobileNav}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />
      <div className="app-shell__main">
        <header className="app-shell__header">
          {isMobile && (
            <Button
              variant="outline"
              className="mobile-nav-trigger"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </Button>
          )}
          <h1 className="app-shell__title">{title}</h1>
          <span aria-live="polite" className="sr-only">
            {collapsed ? 'Sidebar collapsed' : 'Sidebar expanded'}
          </span>
        </header>
        <main className="app-shell__content" role="main">
          {children}
        </main>
        <footer className="app-shell__footer">{footerLabel}</footer>
      </div>
    </div>
  )
}
