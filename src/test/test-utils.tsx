import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { ToastProvider } from '../components/ui/ToastProvider'

export function renderWithProviders(ui: ReactNode, options?: { route?: string }) {
  const route = options?.route ?? '/'
  return render(
    <ToastProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </ToastProvider>,
  )
}
