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
    <section className="container-page pt-4 pb-8 sm:pt-8 sm:pb-14">
      <div className="relative overflow-hidden rounded-[22px] bg-brand-soft px-4 py-6 sm:rounded-[40px] sm:px-10 sm:py-16 lg:px-16 lg:py-[4.5rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-36 w-36 rounded-full bg-brand-glow/15 blur-3xl sm:h-64 sm:w-64"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-brand/10 blur-3xl sm:h-72 sm:w-72"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-[1.35rem] font-extrabold leading-[1.2] tracking-tight text-brand sm:text-4xl lg:text-[2.65rem]">
            Reference Listed Drugs (RLDs) and Comparator Sourcing for Pharmaceutical Development
          </h1>
          <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-body sm:mt-4 sm:text-[15px] sm:text-base">
            SRA origin pharmaceutical reference products for bioequivalence studies,
            comparative dissolution testing and regulatory submissions
          </p>

          <ul className="mx-auto mt-4 grid max-w-xl grid-cols-1 gap-x-10 gap-y-2 text-left sm:mt-8 sm:grid-cols-2 sm:gap-y-3">
            {HERO_BULLETS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-brand">
                <BulletDot />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-5 flex w-full max-w-2xl flex-col gap-2.5 rounded-2xl bg-white p-1.5 shadow-lg shadow-brand/5 sm:mt-10 sm:flex-row sm:items-center sm:rounded-full sm:gap-2 sm:p-1.5"
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
