import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductsPage from '../features/products/ProductsPage'
import { renderWithProviders } from '../test/test-utils'
import * as api from '../features/products/api'

vi.mock('../features/products/api')

const mockProducts = [
  { id: '1', name: 'Atlas Ops', description: 'Ops', price: 1, inStock: true },
  { id: '2', name: 'Cortex Insight', description: 'Insights', price: 2, inStock: false },
]

describe('ProductsPage', () => {
  const getProducts = api.getProducts as unknown as vi.Mock

  beforeEach(() => {
    vi.clearAllMocks()
    getProducts.mockResolvedValue(mockProducts)
  })

  it('filters products via search', async () => {
    renderWithProviders(<ProductsPage />)

    await screen.findByText('Atlas Ops')

    const searchInput = screen.getByLabelText('Search')
    await userEvent.type(searchInput, 'Cortex')

    await waitFor(() => {
      expect(screen.getByText('Cortex Insight')).toBeInTheDocument()
      expect(screen.queryByText('Atlas Ops')).not.toBeInTheDocument()
    })
  })

  it('retries loading after failure', async () => {
    getProducts.mockRejectedValueOnce(new Error('boom')).mockResolvedValueOnce(mockProducts)

    renderWithProviders(<ProductsPage />)

    await screen.findByText('boom')

    await userEvent.click(screen.getByRole('button', { name: 'Retry' }))

    await screen.findByText('Atlas Ops')
    expect(getProducts).toHaveBeenCalledTimes(2)
  })
})
