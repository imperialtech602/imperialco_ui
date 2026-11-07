import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { hasPermission, isSuperAdmin } from '@/lib/permissions'

export default function PermissionGate({
  permission,
  superAdminOnly = false,
  children,
}) {
  const admin = useSelector((state) => state.adminAuth.admin)

  if (superAdminOnly && !isSuperAdmin(admin)) {
    return <Navigate to="/admin" replace />
  }

  if (permission && !hasPermission(admin, permission)) {
    return <Navigate to="/admin" replace />
  }

  return children
}
