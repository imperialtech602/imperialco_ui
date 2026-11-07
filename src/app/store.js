import { configureStore } from '@reduxjs/toolkit'
import catalogReducer, { persistRfqState } from '@/features/catalog/catalogSlice'
import uiReducer from '@/features/ui/uiSlice'
import adminAuthReducer from '@/features/admin/authSlice'
import { adminApi } from '@/features/admin/adminApi'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    ui: uiReducer,
    adminAuth: adminAuthReducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
  devTools: import.meta.env.DEV,
})

store.subscribe(() => {
  persistRfqState(store.getState().catalog)
})
