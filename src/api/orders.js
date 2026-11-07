import { apiRequest } from './client'

export function submitOrder(payload, file) {
  if (file) {
    const formData = new FormData()
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      if (key === 'products') {
        formData.append('products', JSON.stringify(value))
      } else {
        formData.append(key, String(value))
      }
    })
    formData.append('attachment', file)
    return apiRequest('/orders', { method: 'POST', body: formData })
  }

  return apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function fetchOrders(params = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value)
  })
  const qs = query.toString()
  return apiRequest(`/orders${qs ? `?${qs}` : ''}`)
}

export function fetchOrder(id) {
  return apiRequest(`/orders/${id}`)
}

export function updateOrder(id, body) {
  return apiRequest(`/orders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

export function fetchDashboardStats() {
  return apiRequest('/orders/stats/dashboard')
}

export async function downloadOrderAttachment(id, filename = 'attachment') {
  const token = localStorage.getItem('imperial_admin_token')
  const response = await fetch(`/api/orders/${id}/attachment`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  if (!response.ok) {
    let message = 'Unable to download attachment'
    try {
      const payload = await response.json()
      message = payload.message || message
    } catch {
      // ignore parse errors
    }
    throw new Error(message)
  }

  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export async function openOrderAttachment(id) {
  const token = localStorage.getItem('imperial_admin_token')
  const response = await fetch(`/api/orders/${id}/attachment`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  if (!response.ok) {
    let message = 'Unable to open attachment'
    try {
      const payload = await response.json()
      message = payload.message || message
    } catch {
      // ignore parse errors
    }
    throw new Error(message)
  }

  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank', 'noopener,noreferrer')
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
