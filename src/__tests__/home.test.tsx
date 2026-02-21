import { act, screen } from '@testing-library/react'
import HomePage from '../features/home/HomePage'
import { renderWithProviders } from '../test/test-utils'
import * as data from '../features/home/data'

vi.mock('../features/home/data')

describe('HomePage dashboard', () => {
  const fetchDashboardSnapshot = data.fetchDashboardSnapshot as unknown as vi.Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state before data arrives, then renders KPI values', async () => {
    fetchDashboardSnapshot.mockResolvedValue({
      stats: [
        { id: 'total', title: 'Total Products', value: '128', trendLabel: '+12%', trendDirection: 'up' },
        { id: 'active', title: 'Active Products', value: '96', trendLabel: '+5%', trendDirection: 'up' },
        { id: 'inactive', title: 'Inactive Products', value: '32', trendLabel: '-2%', trendDirection: 'down' },
      ],
      activities: Array.from({ length: 5 }).map((_, i) => ({
        id: String(i + 1),
        title: `Item ${i + 1}`,
        detail: `Detail ${i + 1}`,
        timestamp: new Date(Date.now() - i * 3600_000).toISOString(),
      })),
    })

    renderWithProviders(<HomePage />)

    // Initially shows skeletons
    expect(screen.getByTestId('dashboard-skeleton')).toBeInTheDocument()

    const totalStat = await screen.findByTestId('stat-total')
    expect(totalStat).toHaveTextContent('Total Products')
    expect(totalStat).toHaveTextContent('128')
  })
})
