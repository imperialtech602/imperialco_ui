import { apiRequest } from './client'

export function fetchPublicPosts(params = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value)
  })
  const qs = query.toString()
  return apiRequest(`/knowledge/public${qs ? `?${qs}` : ''}`)
}

export function fetchPublicPost(slug) {
  return apiRequest(`/knowledge/public/${slug}`)
}

export function fetchAdminPosts(params = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value)
  })
  const qs = query.toString()
  return apiRequest(`/knowledge${qs ? `?${qs}` : ''}`)
}

export function fetchAdminPost(id) {
  return apiRequest(`/knowledge/${id}`)
}

export function createKnowledgePost(body) {
  return apiRequest('/knowledge', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateKnowledgePost(id, body) {
  return apiRequest(`/knowledge/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

export function duplicateKnowledgePost(id, body = {}) {
  return apiRequest(`/knowledge/${id}/duplicate`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function deleteKnowledgePost(id) {
  return apiRequest(`/knowledge/${id}`, { method: 'DELETE' })
}
