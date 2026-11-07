import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { HERO_BULLETS } from '@/data/landingContent'
import BulletDot from '@/components/ui/BulletDot'
import Button from '@/components/ui/Button'
import { searchCatalog, setQuery } from '@/features/catalog/catalogSlice'

export default function Hero() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { query, status } = useSelector((state) => state.catalog)

  const onSubmit = (event) => {
    event.preventDefault()
    const trimmed = (query || '').trim()
    dispatch(setQuery(trimmed))
    dispatch(searchCatalog(trimmed, 1))
    navigate(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : '/products')
  }

  return (
    <section className="container-page pt-6 pb-10 sm:pt-8 sm:pb-14">
      <div className="relative overflow-hidden rounded-[28px] bg-brand-soft px-5 py-12 sm:rounded-[40px] sm:px-10 sm:py-16 lg:px-16 lg:py-[4.5rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-glow/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-brand sm:text-4xl lg:text-[2.65rem]">
            Reference Listed Drugs (RLDs) for ANDA &amp; Bioequivalence Studies
          </h1>
          <p className="mt-4 text-base font-semibold text-brand sm:text-lg">
            Sourced with Batch-Level Traceability
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-body sm:text-[15px]">
            SRA-origin comparator sourcing aligned with development timelines,
            regulatory expectations, and study-critical handling requirements.
          </p>

          <ul className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-x-10 gap-y-3 text-left sm:grid-cols-2">
            {HERO_BULLETS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-brand">
                <BulletDot />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-lg shadow-brand/5 sm:flex-row sm:items-center sm:rounded-full sm:gap-2 sm:p-1.5"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-soft" />
              <input
                type="search"
                value={query}
                onChange={(e) => dispatch(setQuery(e.target.value))}
                placeholder="Search for the product you’re looking for"
                className="h-12 w-full rounded-full bg-transparent pl-11 pr-4 text-sm text-ink outline-none placeholder:text-slate-soft"
                aria-label="Search catalog"
              />
            </div>
            <Button type="submit" size="lg" className="w-full shrink-0 sm:w-auto">
              {status === 'searching' ? 'Searching…' : 'Search our database'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
