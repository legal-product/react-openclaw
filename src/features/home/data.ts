export type DashboardSnapshot = {
  stats: Array<{
    id: string
    title: string
    value: string
    trendLabel: string
    trendDirection: 'up' | 'down' | 'neutral'
    helperText?: string
    icon?: string
  }>
  activities: Array<{
    id: string
    title: string
    detail: string
    timestamp: string
  }>
}

const MOCK_SNAPSHOT: DashboardSnapshot = {
  stats: [
    {
      id: 'total',
      title: 'Total Products',
      value: '128',
      trendLabel: '+12% vs last week',
      trendDirection: 'up',
      helperText: 'Catalog items',
      icon: '📦',
    },
    {
      id: 'active',
      title: 'Active Products',
      value: '96',
      trendLabel: '+3 launched',
      trendDirection: 'up',
      helperText: 'Live right now',
      icon: '✅',
    },
    {
      id: 'inactive',
      title: 'Inactive Products',
      value: '32',
      trendLabel: '-2 this week',
      trendDirection: 'down',
      helperText: 'Paused or archived',
      icon: '⏸️',
    },
    {
      id: 'revenue',
      title: 'Monthly Revenue',
      value: '$84K',
      trendLabel: '+8% vs last month',
      trendDirection: 'up',
      helperText: 'ARR momentum',
      icon: '💰',
    },
  ],
  activities: Array.from({ length: 5 }).map((_, index) => {
    const timestamp = new Date()
    timestamp.setHours(timestamp.getHours() - index * 4)
    return {
      id: `activity-${index}`,
      title: ['Pulse Monitor', 'Atlas Ops', 'Cortex Insight', 'Vertex Studio', 'Signal Relay'][index],
      detail: ['Synced new telemetry rules', 'Rolled out billing patch', 'Published AI summary', 'Shipped workflow builder', 'Completed security review'][index],
      timestamp: timestamp.toISOString(),
    }
  }),
}

export const fetchDashboardSnapshot = async (): Promise<DashboardSnapshot> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return MOCK_SNAPSHOT
}
