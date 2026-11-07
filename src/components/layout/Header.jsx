import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, X } from 'lucide-react'
import logoFull from '@/assets/imperial-logo-full.png'
import { NAV_LINKS } from '@/data/landingContent'
import Button from '@/components/ui/Button'
import { selectRfqCount } from '@/features/catalog/catalogSlice'
import {
  closeMobileNav,
  toggleMobileNav,
} from '@/features/ui/uiSlice'

const DESKTOP_NAV_MQ = 1024

function isNavActive(to, pathname) {
  if (to.startsWith('/#')) return false
  return pathname === to || pathname.startsWith(`${to}/`)
}

function navLinkClass(active) {
  return [
    'whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-semibold transition-all duration-200 xl:px-2.5 xl:text-[12px] 2xl:px-3.5 2xl:py-2 2xl:text-[13px]',
    active
      ? 'bg-brand text-white shadow-sm shadow-brand/25'
      : 'text-brand hover:bg-brand hover:text-white',
  ].join(' ')
}

function mobileLinkClass(active) {
  return [
    'rounded-full px-4 py-3.5 text-[15px] font-semibold transition-colors',
    active
      ? 'bg-brand text-white shadow-sm shadow-brand/20'
      : 'text-brand hover:bg-brand hover:text-white',
  ].join(' ')
}

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const mobileNavOpen = useSelector((state) => state.ui.mobileNavOpen)
  const rfqCount = useSelector(selectRfqCount)
  const [scrolled, setScrolled] = useState(false)

  const goToQuote = () => {
    dispatch(closeMobileNav())
    navigate('/request-quote')
  }

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  useEffect(() => {
    dispatch(closeMobileNav())
  }, [pathname, dispatch])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_NAV_MQ) dispatch(closeMobileNav())
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [dispatch])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-transparent pt-3 sm:pt-4">
      {/* Wider than page content so all menu links fit on laptop */}
      <div className="mx-auto w-[94%] max-w-none lg:w-[92%] xl:w-[90%] 2xl:w-[86%]">
        <div
          className={[
            'relative flex h-14 items-center justify-between gap-2 rounded-full border px-2.5 transition-all duration-300 sm:h-16 sm:gap-2 sm:px-3 lg:h-[68px] lg:px-4',
            scrolled
              ? 'border-white/50 bg-white/70 shadow-lg shadow-brand/10 backdrop-blur-xl'
              : 'border-white/40 bg-white/40 shadow-md shadow-brand/5 backdrop-blur-md',
          ].join(' ')}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-brand-glow/20 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-brand/15 blur-2xl"
          />

          <Link
            to="/"
            className="relative z-20 flex shrink-0 items-center"
            onClick={() => dispatch(closeMobileNav())}
          >
            <img
              src={logoFull}
              alt="Imperial Co"
              className="h-8 w-auto max-w-[120px] object-contain object-left sm:h-9 sm:max-w-[140px] lg:h-10 lg:max-w-[150px] xl:max-w-[170px]"
            />
          </Link>

          <nav className="relative z-10 mx-1 hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className="flex max-w-full items-center justify-center gap-0 rounded-full bg-white/50 p-0.5 ring-1 ring-white/60 xl:gap-0.5 xl:p-1">
              {NAV_LINKS.map((link) => {
                const active = isNavActive(link.to, pathname)
                const className = navLinkClass(active)

                return link.to.includes('#') ? (
                  <Link key={link.label} to={link.to} className={className}>
                    {link.label}
                  </Link>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end={link.to === '/'}
                    className={className}
                  >
                    {link.label}
                  </NavLink>
                )
              })}
            </div>
          </nav>

          <div className="relative z-20 flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={goToQuote}
              className="relative inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-brand px-2.5 text-[10px] font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-dark sm:h-9 sm:px-3 sm:text-[11px] lg:h-9 lg:px-3.5 lg:text-xs xl:h-10 xl:px-4 xl:text-sm"
            >
              <span className="xl:hidden">Quote</span>
              <span className="hidden xl:inline">Request a Quote</span>
              {rfqCount > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[10px] font-extrabold text-brand ring-2 ring-white">
                  {rfqCount}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand/15 bg-white/70 text-brand transition-colors hover:bg-brand hover:text-white sm:h-9 sm:w-9 lg:hidden"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              onClick={() => dispatch(toggleMobileNav())}
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileNavOpen ? (
          <>
            <button
              type="button"
              aria-label="Close menu backdrop"
              className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px] lg:hidden"
              onClick={() => dispatch(closeMobileNav())}
            />
            <div
              id="mobile-nav"
              className="relative z-50 mt-2 overflow-hidden rounded-[24px] border border-white/60 bg-white/90 p-2 shadow-xl shadow-brand/15 backdrop-blur-xl lg:hidden"
            >
              <nav className="flex max-h-[min(70vh,520px)] flex-col gap-0.5 overflow-y-auto py-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => dispatch(closeMobileNav())}
                    className={mobileLinkClass(isNavActive(link.to, pathname))}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button className="relative mt-2 w-full" size="lg" onClick={goToQuote}>
                  Request a Quote
                  {rfqCount > 0 ? (
                    <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-gold px-2 text-xs font-extrabold text-brand">
                      {rfqCount}
                    </span>
                  ) : null}
                </Button>
              </nav>
            </div>
          </>
        ) : null}
      </div>
    </header>
  )
}
