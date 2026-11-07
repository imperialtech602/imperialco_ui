import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mobileNavOpen: false,
  quoteModalOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openMobileNav(state) {
      state.mobileNavOpen = true
    },
    closeMobileNav(state) {
      state.mobileNavOpen = false
    },
    toggleMobileNav(state) {
      state.mobileNavOpen = !state.mobileNavOpen
    },
    openQuoteModal(state) {
      state.quoteModalOpen = true
      state.mobileNavOpen = false
    },
    closeQuoteModal(state) {
      state.quoteModalOpen = false
    },
  },
})

export const {
  openMobileNav,
  closeMobileNav,
  toggleMobileNav,
  openQuoteModal,
  closeQuoteModal,
} = uiSlice.actions

export default uiSlice.reducer
