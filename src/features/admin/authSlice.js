import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('imperial_admin_token')

const initialState = {
  token,
  admin: null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    authStarted(state) {
      state.status = 'loading'
      state.error = null
    },
    authSucceeded(state, action) {
      state.status = 'authenticated'
      state.token = action.payload.token
      state.admin = action.payload.admin
      state.error = null
    },
    authFailed(state, action) {
      state.status = 'error'
      state.error = action.payload
    },
    authCleared(state) {
      state.token = null
      state.admin = null
      state.status = 'idle'
      state.error = null
    },
  },
})

export const { authStarted, authSucceeded, authFailed, authCleared } = authSlice.actions
export default authSlice.reducer
