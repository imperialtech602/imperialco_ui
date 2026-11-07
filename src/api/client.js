const API_BASE = import.meta.env.VITE_API_URL || '/api'

function getToken() {
  return localStorage.getItem('imperial_admin_token')
}

export function setAuthToken(token) {
  if (token) localStorage.setItem('imperial_admin_token', token)
  else localStorage.removeItem('imperial_admin_token')
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {})
  const isFormData = options.body instanceof FormData

  if (!isFormData && !headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }

  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.blob()

  if (!response.ok) {
    const message =
      payload?.message ||
      (typeof payload === 'string' ? payload : 'Request failed')
    const error = new Error(message)
    error.status = response.status
    error.details = payload?.details
    throw error
  }

  return payload
}
