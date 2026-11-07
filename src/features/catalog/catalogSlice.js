import { createSlice } from '@reduxjs/toolkit'
import { fetchCatalog } from '@/api/products'

export const CATALOG_PAGE_SIZE = 10
const RFQ_STORAGE_KEY = 'imperial_rfq_v1'

function loadRfqState() {
  try {
    const raw = localStorage.getItem(RFQ_STORAGE_KEY)
    if (!raw) return { rfqIds: [], rfqMap: {} }
    const parsed = JSON.parse(raw)
    return {
      rfqIds: Array.isArray(parsed.rfqIds) ? parsed.rfqIds : [],
      rfqMap:
        parsed.rfqMap && typeof parsed.rfqMap === 'object' ? parsed.rfqMap : {},
    }
  } catch {
    return { rfqIds: [], rfqMap: {} }
  }
}

export function persistRfqState(state) {
  try {
    localStorage.setItem(
      RFQ_STORAGE_KEY,
      JSON.stringify({
        rfqIds: state.rfqIds || [],
        rfqMap: state.rfqMap || {},
      }),
    )
  } catch {
    // ignore quota / private mode errors
  }
}

const savedRfq = loadRfqState()

const initialState = {
  query: '',
  country: 'All countries',
  drugForm: 'All forms',
  status: 'idle',
  results: [],
  page: 1,
  pages: 1,
  total: 0,
  error: null,
  rfqIds: savedRfq.rfqIds,
  rfqMap: savedRfq.rfqMap,
  countries: [],
  dosageForms: [],
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
    },
    setCountry(state, action) {
      state.country = action.payload
      state.page = 1
    },
    setDrugForm(state, action) {
      state.drugForm = action.payload
      state.page = 1
    },
    setPage(state, action) {
      state.page = action.payload
    },
    searchStarted(state) {
      state.status = 'searching'
      state.error = null
    },
    searchSucceeded(state, action) {
      state.status = 'succeeded'
      state.results = action.payload.items
      state.total = action.payload.total
      state.page = action.payload.page
      state.pages = action.payload.pages
      state.countries = action.payload.countries || state.countries
      state.dosageForms = action.payload.dosageForms || state.dosageForms
    },
    searchFailed(state, action) {
      state.status = 'failed'
      state.error = action.payload
      state.results = []
      state.total = 0
      state.pages = 1
    },
    clearSearch(state) {
      state.query = ''
      state.country = 'All countries'
      state.drugForm = 'All forms'
      state.status = 'idle'
      state.results = []
      state.page = 1
      state.pages = 1
      state.total = 0
      state.error = null
    },
    addToRfq(state, action) {
      const product = action.payload
      if (!product?.id) return
      if (!state.rfqIds.includes(product.id)) {
        state.rfqIds.push(product.id)
      }
      state.rfqMap[product.id] = product
    },
    removeFromRfq(state, action) {
      const id = action.payload
      state.rfqIds = state.rfqIds.filter((item) => item !== id)
      delete state.rfqMap[id]
    },
    clearRfq(state) {
      state.rfqIds = []
      state.rfqMap = {}
    },
  },
})

export const {
  setQuery,
  setCountry,
  setDrugForm,
  setPage,
  searchStarted,
  searchSucceeded,
  searchFailed,
  clearSearch,
  addToRfq,
  removeFromRfq,
  clearRfq,
} = catalogSlice.actions

export const searchCatalog =
  (query, pageOverride) => async (dispatch, getState) => {
    const catalog = getState().catalog
    const trimmed =
      typeof query === 'string' ? query.trim() : catalog.query.trim()
    const page =
      typeof pageOverride === 'number' && pageOverride > 0
        ? pageOverride
        : catalog.page || 1

    dispatch(setQuery(trimmed))
    if (typeof pageOverride === 'number') dispatch(setPage(page))
    dispatch(searchStarted())

    try {
      const country =
        catalog.country === 'All countries' ? undefined : catalog.country
      const dosageForm =
        catalog.drugForm === 'All forms' ? undefined : catalog.drugForm

      const result = await fetchCatalog({
        q: trimmed,
        countryOfOrigin: country,
        dosageForm,
        page,
        limit: CATALOG_PAGE_SIZE,
      })

      dispatch(
        searchSucceeded({
          items: result.data.items,
          total: result.data.pagination.total,
          page: result.data.pagination.page,
          pages: result.data.pagination.pages,
          countries: result.data.filters?.countries || [],
          dosageForms: result.data.filters?.dosageForms || [],
        }),
      )
    } catch (error) {
      dispatch(searchFailed(error.message || 'Failed to load catalog'))
    }
  }

export const selectRfqCount = (state) => state.catalog.rfqIds.length

export const selectRfqProducts = (state) =>
  state.catalog.rfqIds
    .map((id) => state.catalog.rfqMap[id])
    .filter(Boolean)

export default catalogSlice.reducer
