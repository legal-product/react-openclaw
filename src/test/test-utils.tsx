import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

export function renderWithProviders(ui: ReactNode, options?: { route?: string }) {
  const route = options?.route ?? '/'
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}
