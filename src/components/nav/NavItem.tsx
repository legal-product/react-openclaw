import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'

export type NavItemProps = {
  to: string
  label: string
  icon: ReactNode
  collapsed?: boolean
  onNavigate?: () => void
}

export const NavItem = ({ to, label, icon, collapsed, onNavigate }: NavItemProps) => (
  <NavLink
    to={to}
    end={to === '/'}
    className={({ isActive }) =>
      cn('nav-item', collapsed && 'collapsed', isActive && 'is-active')
    }
    aria-label={collapsed ? label : undefined}
    onClick={onNavigate}
  >
    <span className="nav-item__icon" aria-hidden>
      {icon}
    </span>
    <span className="nav-item__label">{label}</span>
  </NavLink>
)
