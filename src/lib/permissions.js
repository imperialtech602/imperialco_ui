export function hasPermission(admin, key) {
  if (!admin) return false
  if (admin.role === 'superadmin') return true
  return Boolean(admin.permissions?.[key])
}

export function isSuperAdmin(admin) {
  return admin?.role === 'superadmin'
}
