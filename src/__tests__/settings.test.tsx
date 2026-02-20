import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsPage from '../features/settings/SettingsPage'
import { renderWithProviders } from '../test/test-utils'

describe('SettingsPage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('validates inputs and saves', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SettingsPage />)

    const saveButton = screen.getByRole('button', { name: 'Save changes' })
    expect(saveButton).toBeDisabled()

    await user.type(screen.getByLabelText('Display name'), 'A')
    await user.type(screen.getByLabelText('Email'), 'invalid')

    expect(await screen.findByText(/at least 2 characters/i)).toBeInTheDocument()
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
    expect(saveButton).toBeDisabled()

    await user.clear(screen.getByLabelText('Display name'))
    await user.type(screen.getByLabelText('Display name'), 'Alex AI')
    await user.clear(screen.getByLabelText('Email'))
    await user.type(screen.getByLabelText('Email'), 'alex@example.com')

    expect(saveButton).toBeEnabled()

    await user.click(saveButton)

    expect(await screen.findByText('Settings saved')).toBeInTheDocument()
  })
})
