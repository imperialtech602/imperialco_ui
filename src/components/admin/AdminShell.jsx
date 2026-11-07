import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'
import logo from '@/assets/imperial-logo.png'
import { logoutAdmin } from '@/api/auth'
import { authCleared } from '@/features/admin/authSlice'

const LINKS = [
  { to: '/admin', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { to: '/admin/products', label: 'Products', icon: Package },
]

function SidebarNav({ onNavigate }) {
  return (
    <nav className="space-y-1.5">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition',
              isActive
                ? 'bg-white text-brand shadow-md shadow-brand-dark/20'
                : 'text-white/80 hover:bg-white/10 hover:text-white',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={[
                  'inline-flex h-9 w-9 items-center justify-center rounded-xl',
                  isActive ? 'bg-brand-muted text-brand' : 'bg-white/10',
                ].join(' ')}
              >
                <link.icon className="h-4 w-4" />
              </span>
              {link.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function SidebarBrand() {
  return (
    <Link to="/admin" className="flex items-center gap-3 px-1">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg shadow-brand-dark/25">
        <img src={logo} alt="Imperial Co" className="h-full w-full object-contain" />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
          Imperial Co
        </p>
        <p className="text-lg font-extrabold tracking-tight text-white">Admin</p>
      </div>
    </Link>
  )
}

function SidebarFooter({ admin, onLogout, onNavigate }) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3">
        <p className="text-sm font-semibold text-white">{admin?.name || 'Administrator'}</p>
        <p className="mt-0.5 truncate text-xs text-white/60">{admin?.email}</p>
      </div>

      <Link
        to="/"
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
        className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
      >
        <ExternalLink className="h-4 w-4" />
        View live site
      </Link>

      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  )
}

export default function AdminShell() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const admin = useSelector((state) => state.adminAuth.admin)
  const [mobileOpen, setMobileOpen] = useState(false)

  const onLogout = () => {
    setMobileOpen(false)
    logoutAdmin()
    dispatch(authCleared())
    navigate('/admin/login')
  }

  const closeMobile = () => setMobileOpen(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-ink">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] overflow-hidden bg-brand lg:flex lg:flex-col">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-brand-glow/30 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative z-10 flex h-full flex-col px-5 py-7">
          <SidebarBrand />
          <div className="mt-10 flex-1">
            <SidebarNav />
          </div>
          <SidebarFooter admin={admin} onLogout={onLogout} />
        </div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-50 lg:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={[
            'absolute inset-0 bg-ink/45 backdrop-blur-[2px] transition-opacity',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={closeMobile}
        />

        <aside
          className={[
            'absolute inset-y-0 left-0 flex w-[min(288px,86vw)] flex-col overflow-hidden bg-brand shadow-2xl shadow-brand/30 transition-transform duration-300 ease-out',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-brand-glow/30 blur-2xl"
          />
          <div className="relative z-10 flex h-full flex-col px-5 py-6">
            <div className="flex items-center justify-between gap-3">
              <SidebarBrand />
              <button
                type="button"
                onClick={closeMobile}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8 flex-1 overflow-y-auto">
              <SidebarNav onNavigate={closeMobile} />
            </div>
            <SidebarFooter admin={admin} onLogout={onLogout} onNavigate={closeMobile} />
          </div>
        </aside>
      </div>

      {/* Main column */}
      <div className="min-h-screen lg:pl-[272px]">
        <header className="sticky top-0 z-30 border-b border-brand/8 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex w-[92%] items-center sm:w-[78%] justify-between gap-3 py-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand/10 bg-white text-brand lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-soft">
                  Imperial Co
                </p>
                <p className="text-sm font-bold text-brand">Operations console</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-full bg-brand-muted px-2.5 py-1.5 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                  {(admin?.name || 'A').slice(0, 1).toUpperCase()}
                </div>
                <div className="pr-1">
                  <p className="text-xs font-semibold leading-tight text-brand">
                    {admin?.name || 'Admin'}
                  </p>
                  <p className="max-w-[140px] truncate text-[11px] text-slate-soft">
                    {admin?.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-brand/10 bg-white px-3 text-sm font-semibold text-brand transition hover:bg-brand-muted"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-[92%] px-0 py-5 sm:w-[78%] sm:py-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
