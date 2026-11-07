import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import {
  CATALOG_PAGE_SIZE,
  setQuery,
  setCountry,
  setDrugForm,
  searchCatalog,
  addToRfq,
} from '@/features/catalog/catalogSlice'
import Button from '@/components/ui/Button'
import MiniHowItWorks from '@/components/shared/MiniHowItWorks'
import Pagination from '@/components/shared/Pagination'
import useDebouncedValue from '@/hooks/useDebouncedValue'
import logoFull from '@/assets/imperial-logo-full.png'
import {
  CountryPill,
  FilterPreviewPills,
  formatFilterLabel,
  uniqueFilterOptions,
} from '@/components/admin/adminUi'

function DrugFormPill({ value }) {
  if (!value) return null
  return (
    <span className="inline-flex items-center rounded-full bg-brand-muted px-3 py-1.5 text-xs font-bold tracking-wide text-brand ring-1 ring-brand/15">
      {formatFilterLabel(value)}
    </span>
  )
}

export default function CatalogPage() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const {
    query,
    country,
    drugForm,
    status,
    results,
    page,
    pages,
    total,
    rfqIds,
    countries,
    dosageForms,
    error,
  } = useSelector((state) => state.catalog)
  const urlQuery = searchParams.get('q')
  const [searchInput, setSearchInput] = useState(
    () => urlQuery ?? query ?? '',
  )
  const debouncedSearch = useDebouncedValue(searchInput, 400)
  const skipDebounce = useRef(true)
  const seededFromUrl = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Product Catalog | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  useEffect(() => {
    if (urlQuery == null || seededFromUrl.current) return
    seededFromUrl.current = true
    setSearchInput(urlQuery)
    dispatch(setQuery(urlQuery))
    dispatch(searchCatalog(urlQuery, 1))
  }, [urlQuery, dispatch])

  useEffect(() => {
    dispatch(searchCatalog(undefined, 1))
  }, [dispatch, country, drugForm])

  useEffect(() => {
    if (skipDebounce.current) {
      skipDebounce.current = false
      return
    }
    dispatch(setQuery(debouncedSearch))
    dispatch(searchCatalog(debouncedSearch, 1))
  }, [debouncedSearch, dispatch])

  const onSearch = (event) => {
    event.preventDefault()
    dispatch(setQuery(searchInput))
    dispatch(searchCatalog(searchInput, 1))
  }

  const onPageChange = (nextPage) => {
    dispatch(searchCatalog(undefined, nextPage))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const originOptions = [
    { value: 'All countries', label: 'All Countries' },
    ...uniqueFilterOptions(countries, ['All countries', 'all']).map((item) => ({
      value: item,
      label: formatFilterLabel(item),
    })),
  ]
  const formOptions = [
    { value: 'All forms', label: 'All Forms' },
    ...uniqueFilterOptions(dosageForms, ['All forms', 'all']).map((item) => ({
      value: item,
      label: formatFilterLabel(item),
    })),
  ]

  return (
    <main id="top">
      <section className="mx-auto w-[92%] sm:w-[78%] pt-8 pb-10 sm:pt-12 sm:pb-14">
        <div className="text-center">
          <h1 className="text-[1.75rem] font-extrabold tracking-tight text-brand sm:text-4xl">
            Search Comparator &amp; RLD Catalog
          </h1>
          <p className="mt-3 text-sm text-slate-body sm:text-base">
            Live inventory from our product database, ready to quote.
          </p>
        </div>

        <form
          onSubmit={onSearch}
          className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-soft" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Brand, generic, dosage form, therapies, or class"
              className="h-12 w-full rounded-xl border border-brand/10 bg-brand-muted/50 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-brand/30 focus:bg-white focus:ring-2 focus:ring-brand/15"
            />
          </div>
          <Button type="submit" size="lg" className="w-full shrink-0 sm:w-auto">
            {status === 'searching' ? 'Searching…' : 'Search'}
          </Button>
        </form>

        <div className="mt-4 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex-1 text-left">
              <span className="mb-1.5 block text-xs font-semibold text-slate-soft">
                Country of Origin
              </span>
              <select
                value={country}
                onChange={(e) => dispatch(setCountry(e.target.value))}
                className="h-11 w-full rounded-xl border border-brand/10 bg-brand-muted/50 px-3 text-sm text-ink outline-none focus:border-brand/30 focus:bg-white"
              >
                {originOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex-1 text-left">
              <span className="mb-1.5 block text-xs font-semibold text-slate-soft">
                Drug Form
              </span>
              <select
                value={drugForm}
                onChange={(e) => dispatch(setDrugForm(e.target.value))}
                className="h-11 w-full rounded-xl border border-brand/10 bg-brand-muted/50 px-3 text-sm text-ink outline-none focus:border-brand/30 focus:bg-white"
              >
                {formOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <FilterPreviewPills
            items={[
              {
                label: 'Search',
                value: query,
                display: query.trim(),
                raw: true,
                hidden: !query?.trim(),
                onClear: () => {
                  setSearchInput('')
                  dispatch(setQuery(''))
                  dispatch(searchCatalog('', 1))
                },
              },
              {
                label: 'Country',
                value: country,
                display: formatFilterLabel(country),
                hidden: country === 'All countries',
                onClear: () => dispatch(setCountry('All countries')),
              },
              {
                label: 'Drug Form',
                value: drugForm,
                display: formatFilterLabel(drugForm),
                hidden: drugForm === 'All forms',
                onClear: () => dispatch(setDrugForm('All forms')),
              },
            ]}
          />
        </div>

        {error ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {rfqIds.length > 0 ? (
          <div className="mt-6 overflow-hidden rounded-[24px] border border-brand/10 bg-white p-4 shadow-lg shadow-brand/10 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={logoFull}
                  alt="Imperial Co"
                  className="h-11 w-auto max-w-[200px] object-contain sm:h-12"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-soft">Ready to continue</p>
                  <p className="mt-0.5 text-lg font-extrabold text-brand">
                    {rfqIds.length} product{rfqIds.length > 1 ? 's' : ''} selected
                  </p>
                </div>
              </div>
              <Link
                to="/request-quote"
                className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand/90"
              >
                Continue to quote →
              </Link>
            </div>
          </div>
        ) : null}
      </section>

      <section className="mx-auto w-[92%] sm:w-[78%] pb-12 sm:pb-16">
        <div className="overflow-hidden rounded-2xl border border-brand/8 bg-white">
          <div className="hidden grid-cols-[48px_1.5fr_1fr_0.9fr_0.9fr_auto] gap-4 border-b border-brand/8 bg-brand-muted/60 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-soft md:grid">
            <span>#</span>
            <span>Product</span>
            <span>Therapeutic Class</span>
            <span>Country</span>
            <span>Drug Form</span>
            <span className="text-right">Action</span>
          </div>

          {status === 'searching' && results.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-body">
              Searching catalog…
            </p>
          ) : results.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-body">
              No products matched your filters. Try a broader search or{' '}
              <Link to="/request-quote" className="font-semibold text-brand underline">
                submit a custom RFQ
              </Link>
              .
            </p>
          ) : (
            <ul className="divide-y divide-brand/8">
              {results.map((product, index) => {
                const inRfq = rfqIds.includes(product.id)
                const rowNumber = (page - 1) * CATALOG_PAGE_SIZE + index + 1
                return (
                  <li
                    key={product.id}
                    className="grid gap-3 px-4 py-4 sm:px-5 md:grid-cols-[48px_1.5fr_1fr_0.9fr_0.9fr_auto] md:items-center md:gap-4"
                  >
                    <div className="hidden md:block">
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-brand px-2 text-xs font-extrabold text-white shadow-sm shadow-brand/20">
                        {rowNumber}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-extrabold text-white md:hidden">
                        {rowNumber}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-snug text-brand">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-soft">
                          {product.manufacturer}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-body">
                      <span className="md:hidden text-xs font-semibold uppercase text-slate-soft">
                        Class:{' '}
                      </span>
                      {product.therapeuticClass}
                    </p>
                    <div>
                      <span className="mb-1 block text-xs font-semibold uppercase text-slate-soft md:hidden">
                        Country
                      </span>
                      <CountryPill value={product.country || product.countryOfOrigin} />
                    </div>
                    <div>
                      <span className="mb-1 block text-xs font-semibold uppercase text-slate-soft md:hidden">
                        Drug Form
                      </span>
                      <DrugFormPill value={product.drugForm || product.dosageForm} />
                    </div>
                    <div className="md:justify-self-end">
                      <Button
                        size="sm"
                        variant={inRfq ? 'secondary' : 'primary'}
                        className="w-full md:w-auto"
                        onClick={() => dispatch(addToRfq(product))}
                        disabled={inRfq}
                      >
                        {inRfq ? 'Added' : 'Add to RFQ'}
                      </Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <Pagination
            page={page}
            pages={pages}
            total={total}
            label={total === 1 ? 'product' : 'products'}
            onChange={onPageChange}
          />
        </div>
      </section>

      <MiniHowItWorks />

      {rfqIds.length > 0 ? (
        <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:px-6">
          <div className="mx-auto flex w-[92%] items-center sm:w-[78%] justify-between gap-3 rounded-full border border-brand/10 bg-white/95 px-3 py-2.5 shadow-xl shadow-brand/15 backdrop-blur-md sm:px-4">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={logoFull}
                alt="Imperial Co"
                className="hidden h-8 w-auto max-w-[140px] object-contain sm:block"
              />
              <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-brand px-2 text-sm font-extrabold text-white">
                {rfqIds.length}
              </span>
              <p className="truncate text-sm font-semibold text-brand">
                product{rfqIds.length > 1 ? 's' : ''} in your quote
              </p>
            </div>
            <Link
              to="/request-quote"
              className="inline-flex h-10 shrink-0 items-center rounded-full bg-brand px-4 text-sm font-bold text-white"
            >
              Continue to quote →
            </Link>
          </div>
        </div>
      ) : null}
    </main>
  )
}
