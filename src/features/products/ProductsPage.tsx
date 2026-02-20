import { useCallback, useEffect, useMemo, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { getProductById, getProducts } from './api'
import type { Product } from './types'

const sortProducts = (items: Product[], order: 'asc' | 'desc') => {
  return [...items].sort((a, b) => {
    if (order === 'asc') {
      return a.name.localeCompare(b.name)
    }
    return b.name.localeCompare(a.name)
  })
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, 350)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [details, setDetails] = useState<Product | null>(null)
  const [detailsStatus, setDetailsStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
  const [detailsError, setDetailsError] = useState<string | null>(null)

  const loadProducts = useCallback(async () => {
    setStatus('loading')
    setErrorMessage(null)
    try {
      const response = await getProducts()
      setProducts(response)
      setStatus('ready')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load products')
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProducts()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [loadProducts])

  const filteredProducts = useMemo(() => {
    const normalized = debouncedSearch.trim().toLowerCase()
    const filtered = normalized
      ? products.filter((product) => product.name.toLowerCase().includes(normalized))
      : products
    return sortProducts(filtered, sortDirection)
  }, [debouncedSearch, products, sortDirection])

  const openDetails = async (productId: string) => {
    setSelectedProductId(productId)
    setDetailsStatus('loading')
    setDetailsError(null)
    try {
      const product = await getProductById(productId)
      setDetails(product)
      setDetailsStatus('ready')
    } catch (error) {
      setDetailsError(error instanceof Error ? error.message : 'Unable to load product')
      setDetailsStatus('error')
    }
  }

  const closeDetails = () => {
    setSelectedProductId(null)
    setDetails(null)
    setDetailsStatus('idle')
    setDetailsError(null)
  }

  return (
    <section>
      <div className="products-toolbar">
        <Input
          label="Search"
          placeholder="Search products"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        <div className="input-field" style={{ minWidth: '200px' }}>
          <label htmlFor="sort-order">Sort</label>
          <select
            id="sort-order"
            value={sortDirection}
            onChange={(event) => setSortDirection(event.currentTarget.value as 'asc' | 'desc')}
          >
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </div>
      </div>

      {status === 'loading' && <div className="products-state">Loading products…</div>}
      {status === 'error' && (
        <Card className="products-state">
          <p>{errorMessage}</p>
          <Button onClick={loadProducts}>Retry</Button>
        </Card>
      )}

      {status === 'ready' && filteredProducts.length === 0 && (
        <div className="products-state">No products match that search.</div>
      )}

      {status === 'ready' && filteredProducts.length > 0 && (
        <div className="products-grid" data-testid="products-grid">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>${product.price}/mo</strong>
              </p>
              <span
                className={`status-pill ${product.inStock ? 'in-stock' : 'out-stock'}`}
                aria-label={product.inStock ? 'In stock' : 'Backordered'}
              >
                {product.inStock ? 'In stock' : 'Back soon'}
              </span>
              <div style={{ marginTop: '1rem' }}>
                <Button variant="outline" onClick={() => openDetails(product.id)}>
                  View details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={selectedProductId !== null} onClose={closeDetails} title="Product details">
        {detailsStatus === 'loading' && <p>Loading…</p>}
        {detailsStatus === 'error' && (
          <div className="products-state">
            <p>{detailsError}</p>
            {selectedProductId && <Button onClick={() => openDetails(selectedProductId)}>Retry</Button>}
          </div>
        )}
        {detailsStatus === 'ready' && details && (
          <div>
            <h3 style={{ marginTop: 0 }}>{details.name}</h3>
            <p>{details.description}</p>
            <p>
              <strong>${details.price}/month</strong>
            </p>
            <p>Status: {details.inStock ? 'Available' : 'Backordered'}</p>
          </div>
        )}
      </Modal>
    </section>
  )
}

export default ProductsPage
