import { createSlice } from '@reduxjs/toolkit'

const TOKEN_KEY = 'imperial_admin_token'
const ADMIN_KEY = 'imperial_admin_user'

function loadAdmin() {
  try {
    const raw = localStorage.getItem(ADMIN_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveAdmin(admin) {
  try {
    if (admin) localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
    else localStorage.removeItem(ADMIN_KEY)
  } catch {
    // ignore quota errors
  }
}

const token = localStorage.getItem(TOKEN_KEY)
const cachedAdmin = token ? loadAdmin() : null

const initialState = {
  token,
  admin: cachedAdmin,
  status: token && cachedAdmin ? 'authenticated' : 'idle',
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
      if (action.payload.token) {
        localStorage.setItem(TOKEN_KEY, action.payload.token)
      }
      saveAdmin(action.payload.admin)
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
      localStorage.removeItem(TOKEN_KEY)
      saveAdmin(null)
    },
  },
})

export const { authStarted, authSucceeded, authFailed, authCleared } = authSlice.actions
export default authSlice.reducer
