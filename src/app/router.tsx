import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layout/AppLayout'

const HomePage = lazy(() => import('../features/home/HomePage'))
const ProductsPage = lazy(() => import('../features/products/ProductsPage'))
const SalesPage = lazy(() => import('../features/sales/SalesPage'))
const SettingsPage = lazy(() => import('../features/settings/SettingsPage'))
const NotFoundPage = lazy(() => import('../features/not-found/NotFoundPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'sales', element: <SalesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router
