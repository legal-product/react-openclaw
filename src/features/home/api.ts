export type DashboardStats = {
  total: number
  active: number
  inactive: number
  trends: {
    total: string
    active: string
    inactive: string
  }
}

export type ActivityItem = {
  id: string
  title: string
  body: string
  time: Date
}

export type DashboardData = {
  stats: DashboardStats
  activity: ActivityItem[]
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getDashboardData(): Promise<DashboardData> {
  await wait(500)
  const now = new Date()
  const makeItem = (i: number): ActivityItem => ({
    id: String(i + 1),
    title: `Product update #${i + 1}`,
    body: `Description for update #${i + 1}`,
    time: new Date(now.getTime() - i * 60 * 60 * 1000),
  })
  return {
    stats: {
      total: 42,
      active: 31,
      inactive: 11,
      trends: {
        total: '+12%',
        active: '+5%',
        inactive: '-2%',
      },
    },
    activity: Array.from({ length: 5 }).map((_, i) => makeItem(i)),
  }
}
