import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AdminLogin from './AdminLogin/AdminLogin'
import AdminLayout from './AdminLayout/AdminLayout'
import AdminDashboard from './Dashboard/AdminDashboard'
import AdminProjects from './ManageProjects/AdminProjects'
import AdminServices from './ManageServices/AdminServices'
import AdminSettings from './Settings/AdminSettings'
import '../styles/index.css'
import './AdminLayout/AdminLayout.css'

function AdminApp() {
  const { isAuthenticated } = useAuth()
  const [adminPage, setAdminPage] = useState('dashboard')

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  const renderAdminPage = () => {
    switch (adminPage) {
      case 'dashboard': return <AdminDashboard />
      case 'projects':  return <AdminProjects />
      case 'services':  return <AdminServices />
      case 'settings':  return <AdminSettings />
      default:          return <AdminDashboard />
    }
  }

  return (
    <AdminLayout activePage={adminPage} setActivePage={setAdminPage}>
      {renderAdminPage()}
    </AdminLayout>
  )
}

export default AdminApp
