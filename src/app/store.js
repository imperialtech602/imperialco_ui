import { configureStore } from '@reduxjs/toolkit'
import catalogReducer, { persistRfqState } from '@/features/catalog/catalogSlice'
import uiReducer from '@/features/ui/uiSlice'
import adminAuthReducer from '@/features/admin/authSlice'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    ui: uiReducer,
    adminAuth: adminAuthReducer,
  },
  devTools: import.meta.env.DEV,
})

store.subscribe(() => {
  persistRfqState(store.getState().catalog)
})
