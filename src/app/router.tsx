import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layout/AppLayout'

const HomePage = lazy(() => import('../features/home/HomePage'))
const LandingPage = lazy(() => import('../features/landing/LandingPage'))
const ProductsPage = lazy(() => import('../features/products/ProductsPage'))
const UsersPage = lazy(() => import('../features/users/UsersPage'))
const AnalyticsPage = lazy(() => import('../features/analytics/AnalyticsPage'))
const SalesPage = lazy(() => import('../features/sales/SalesPage'))
const SettingsPage = lazy(() => import('../features/settings/SettingsPage'))
const NotFoundPage = lazy(() => import('../features/not-found/NotFoundPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'landing', element: <LandingPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'sales', element: <SalesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router
