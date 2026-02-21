import { Outlet } from 'react-router-dom'
import { AppShell } from '../../components/app-shell/AppShell'

const AppLayout = () => (
  <AppShell footerNote={`© ${new Date().getFullYear()} powerhouse`}>
    <Outlet />
  </AppShell>
)

export default AppLayout
