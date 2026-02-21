import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppShell } from '../components/app-shell/AppShell'
import { renderWithProviders } from '../test/test-utils'

describe('AppShell navigation', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('highlights active route and persists collapsed state', async () => {
    const user = userEvent.setup()
    const { unmount } = renderWithProviders(
      <AppShell>
        <div>Products content</div>
      </AppShell>,
      { route: '/products' },
    )

    const productsLink = await screen.findByRole('link', { name: 'Products' })
    expect(productsLink).toHaveAttribute('aria-current', 'page')

    const collapseToggle = screen.getByRole('button', { name: 'Collapse sidebar' })
    await user.click(collapseToggle)

    expect(window.localStorage.getItem('newton:sidebar-collapsed')).toBe('true')

    unmount()

    renderWithProviders(
      <AppShell>
        <div>Home</div>
      </AppShell>,
    )

    const expandToggle = screen.getByRole('button', { name: 'Expand sidebar' })
    expect(expandToggle).toHaveAttribute('aria-pressed', 'true')
  })
})
