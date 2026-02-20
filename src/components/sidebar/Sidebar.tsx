import type { NavItemConfig } from '../../app/navigation'
import { NavItem } from '../nav/NavItem'
import { cn } from '../../lib/utils'

type SidebarProps = {
  items: NavItemConfig[]
  collapsed: boolean
  mobileOpen: boolean
  onToggleCollapse: () => void
  onCloseMobile: () => void
}

export const Sidebar = ({
  items,
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) => {
  return (
    <>
      <aside
        className={cn('sidebar', collapsed && 'collapsed', mobileOpen && 'open')}
        aria-label="Primary"
      >
        <div className="sidebar__header">
          {!collapsed ? <h2 className="sidebar__brand">Alex AI</h2> : <span aria-hidden>⚡️</span>}
          <button
            type="button"
            className="sidebar__toggle"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-pressed={collapsed}
            onClick={onToggleCollapse}
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>
        <nav>
          <ul className="nav-list">
            {items.map((item) => (
              <li key={item.path}>
                <NavItem
                  to={item.path}
                  label={item.label}
                  icon={item.icon}
                  collapsed={collapsed}
                  onNavigate={onCloseMobile}
                />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {mobileOpen ? (
        <button
          type="button"
          className="sidebar__overlay"
          aria-label="Close navigation"
          onClick={onCloseMobile}
        />
      ) : null}
    </>
  )
}
