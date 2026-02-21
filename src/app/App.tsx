import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ToastProvider } from '../components/ui/ToastProvider'

const App = () => {
  return (
    <ToastProvider>
      <Suspense fallback={<div className="products-state">Loading interface…</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ToastProvider>
  )
}

export default App
