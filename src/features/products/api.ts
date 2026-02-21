import { Product } from './types'
import { randomDelay } from '../../lib/utils'

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cortex Insight',
    description: 'Daily intelligence brief powered by Newton signal routing.',
    price: 29,
    inStock: true,
  },
  {
    id: '2',
    name: 'Atlas Ops',
    description: 'Full-fidelity operations workspace with secure agent collaboration.',
    price: 79,
    inStock: false,
  },
  {
    id: '3',
    name: 'Pulse Monitor',
    description: 'Realtime telemetry for AI automations with proactive alerts.',
    price: 49,
    inStock: true,
  },
  {
    id: '4',
    name: 'Vertex Studio',
    description: 'Visual editor to compose multi-agent flows.',
    price: 59,
    inStock: true,
  },
  {
    id: '5',
    name: 'Signal Relay',
    description: 'Secure comms relay bridging email, chat, and tasks.',
    price: 39,
    inStock: true,
  },
]

async function simulate<T>(response: () => T): Promise<T> {
  const delay = randomDelay()
  await new Promise((resolve) => setTimeout(resolve, delay))
  const shouldFail = Math.random() < 0.1
  if (shouldFail) {
    throw new Error('Network hiccup. Please retry.')
  }
  return response()
}

export function getProducts() {
  return simulate(() => [...MOCK_PRODUCTS])
}

export function getProductById(id: string) {
  return simulate(() => {
    const product = MOCK_PRODUCTS.find((item) => item.id === id)
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  })
}
