import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE } from '@/api/client'

function toQuery(params = {}, { skipAll = true } = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    if (skipAll && value === 'all') return
    query.set(key, String(value))
  })
  const qs = query.toString()
  return qs ? `?${qs}` : ''
}

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('imperial_admin_token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['Dashboard', 'Orders', 'Order', 'Products', 'ProductMeta', 'Users', 'Knowledge'],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 300,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => '/orders/stats/dashboard',
      transformResponse: (response) => response?.data ?? response,
      providesTags: ['Dashboard'],
    }),

    getProducts: builder.query({
      query: (params = {}) => `/products${toQuery({ ...params, limit: params.limit ?? 20 })}`,
      transformResponse: (response) => response?.data ?? response,
      providesTags: ['Products'],
    }),

    getProductMeta: builder.query({
      query: () => '/products/meta',
      transformResponse: (response) => response?.data ?? response,
      providesTags: ['ProductMeta'],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Products', 'ProductMeta', 'Dashboard'],
    }),

    importProducts: builder.mutation({
      query: (file) => {
        const body = new FormData()
        body.append('file', file)
        return { url: '/products/import', method: 'POST', body }
      },
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: ['Products', 'ProductMeta', 'Dashboard'],
    }),

    getOrders: builder.query({
      query: (params = {}) =>
        `/orders${toQuery({ ...params, limit: params.limit ?? 20 })}`,
      transformResponse: (response) => response?.data ?? response,
      providesTags: ['Orders'],
    }),

    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      transformResponse: (response) => response?.data ?? response,
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),

    updateOrder: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: (_result, _error, { id }) => [
        'Orders',
        'Dashboard',
        { type: 'Order', id },
      ],
    }),

    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (response) => response?.data ?? response,
      providesTags: ['Users'],
    }),

    createUser: builder.mutation({
      query: (body) => ({ url: '/users', method: 'POST', body }),
      invalidatesTags: ['Users'],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Users'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Users'],
    }),

    getKnowledgePosts: builder.query({
      query: (params = {}) =>
        `/knowledge${toQuery({ ...params, limit: params.limit ?? 50 }, { skipAll: false })}`,
      transformResponse: (response) => response?.data ?? response,
      providesTags: ['Knowledge'],
    }),

    createKnowledgePost: builder.mutation({
      query: (body) => ({ url: '/knowledge', method: 'POST', body }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: ['Knowledge'],
    }),

    duplicateKnowledgePost: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/knowledge/${id}/duplicate`,
        method: 'POST',
        body,
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: ['Knowledge'],
    }),

    deleteKnowledgePost: builder.mutation({
      query: (id) => ({ url: `/knowledge/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Knowledge'],
    }),
  }),
})

export const {
  useGetDashboardStatsQuery,
  useGetProductsQuery,
  useGetProductMetaQuery,
  useDeleteProductMutation,
  useImportProductsMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetKnowledgePostsQuery,
  useCreateKnowledgePostMutation,
  useDuplicateKnowledgePostMutation,
  useDeleteKnowledgePostMutation,
} = adminApi
