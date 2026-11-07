import { apiRequest } from './client'

export function fetchUsers() {
  return apiRequest('/users')
}

export function createUser(body) {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateUser(id, body) {
  return apiRequest(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

export function deleteUser(id) {
  return apiRequest(`/users/${id}`, { method: 'DELETE' })
}
