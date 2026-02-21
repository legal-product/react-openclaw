import type { ReactNode } from 'react'

export type NavItemConfig = {
  label: string
  path: string
  icon: ReactNode
}

const iconProps = {
  width: 20,
  height: 20,
  stroke: 'currentColor',
  fill: 'none',
  strokeWidth: 1.5,
}

const HOME_ICON = (
  <svg {...iconProps} viewBox="0 0 24 24" aria-hidden>
    <path d="M3 11L12 3l9 8" />
    <path d="M5 10v11h14V10" />
  </svg>
)

const PRODUCTS_ICON = (
  <svg {...iconProps} viewBox="0 0 24 24" aria-hidden>
    <rect x="3" y="4" width="7" height="16" rx="1.5" />
    <rect x="14" y="4" width="7" height="10" rx="1.5" />
    <path d="M14 16h7" />
  </svg>
)

const USERS_ICON = (
  <svg {...iconProps} viewBox="0 0 24 24" aria-hidden>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const SALES_ICON = (
  <svg {...iconProps} viewBox="0 0 24 24" aria-hidden>
    <path d="M4 19h16" />
    <rect x="6" y="11" width="3" height="5" rx="1" />
    <rect x="10.5" y="7" width="3" height="9" rx="1" />
    <rect x="15" y="4" width="3" height="12" rx="1" />
  </svg>
)

const SETTINGS_ICON = (
  <svg {...iconProps} viewBox="0 0 24 24" aria-hidden>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .7.4 1.33 1.01 1.65.15.07.32.11.49.11H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
)

export const NAV_ITEMS: NavItemConfig[] = [
  { label: 'Home', path: '/', icon: HOME_ICON },
  { label: 'Products', path: '/products', icon: PRODUCTS_ICON },
  { label: 'Users', path: '/users', icon: USERS_ICON },
  { label: 'Sales', path: '/sales', icon: SALES_ICON },
  { label: 'Settings', path: '/settings', icon: SETTINGS_ICON },
]
