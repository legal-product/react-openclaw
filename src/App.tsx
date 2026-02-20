import { useState } from 'react'
import './App.css'

const navItems = ['Home', 'Products', 'Settings']

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const currentYear = new Date().getFullYear()

  return (
    <div className={`app-layout${collapsed ? ' collapsed' : ''}`}>
      <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
        <div className="sidebar-header">
          <h1 className="brand">Alex AI</h1>
          <button
            className="collapse-toggle"
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item}>
                <button type="button">{item}</button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="main-area">
        <main className="content">
          <section>
            <h2>Welcome to Alex AI</h2>
            <p>
              Choose an item from the navigation to explore the Home, Products, or Settings pages.
            </p>
          </section>
        </main>
        <footer className="app-footer">
          <small>Copyright © {currentYear} @powerhouse</small>
        </footer>
      </div>
    </div>
  )
}

export default App
