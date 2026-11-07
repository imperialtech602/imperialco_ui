import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE } from '@/api/client'

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
  tagTypes: ['Dashboard', 'Orders', 'Products', 'Users', 'Knowledge'],
  // Keep cached responses in memory for 5 minutes after last subscriber unmounts
  keepUnusedDataFor: 300,
  // Do not refetch on every visit — only when tags are invalidated or stale beyond this window
  refetchOnMountOrArgChange: 300,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => '/orders/stats/dashboard',
      transformResponse: (response) => response?.data ?? response,
      providesTags: ['Dashboard'],
    }),
  }),
})

export const { useGetDashboardStatsQuery } = adminApi
