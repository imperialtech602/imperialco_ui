import { apiRequest } from './client'

export function fetchCatalog(params = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'all') {
      query.set(key, value)
    }
  })
  const qs = query.toString()
  return apiRequest(`/products/catalog${qs ? `?${qs}` : ''}`)
}

export function fetchAdminProducts(params = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'all') {
      query.set(key, value)
    }
  })
  const qs = query.toString()
  return apiRequest(`/products${qs ? `?${qs}` : ''}`)
}

export function fetchProductMeta() {
  return apiRequest('/products/meta')
}

export function createProduct(body) {
  return apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function updateProduct(id, body) {
  return apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export function deleteProduct(id) {
  return apiRequest(`/products/${id}`, { method: 'DELETE' })
}

export function importProductsExcel(file) {
  const formData = new FormData()
  formData.append('file', file)
  return apiRequest('/products/import', {
    method: 'POST',
    body: formData,
  })
}

export function downloadProductTemplate() {
  return apiRequest('/products/template')
}
