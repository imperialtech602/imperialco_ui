import { apiRequest, setAuthToken } from './client'

export async function loginAdmin(email, password) {
  const result = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setAuthToken(result.data.token)
  return result.data
}

export function fetchMe() {
  return apiRequest('/auth/me')
}

export function logoutAdmin() {
  setAuthToken(null)
}
