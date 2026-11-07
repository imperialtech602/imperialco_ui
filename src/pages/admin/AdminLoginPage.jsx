import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import logo from '@/assets/imperial-logo.png'
import { loginAdmin } from '@/api/auth'
import {
  authFailed,
  authStarted,
  authSucceeded,
} from '@/features/admin/authSlice'
import Button from '@/components/ui/Button'
import { fieldClass, labelClass } from '@/components/admin/adminUi'

export default function AdminLoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { token, status, error } = useSelector((state) => state.adminAuth)
  const [form, setForm] = useState({ email: '', password: '' })

  if (token) {
    return <Navigate to={location.state?.from?.pathname || '/admin'} replace />
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch(authStarted())
    try {
      const data = await loginAdmin(form.email, form.password)
      dispatch(authSucceeded(data))
      navigate('/admin', { replace: true })
    } catch (err) {
      dispatch(authFailed(err.message || 'Login failed'))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-[1100px] flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative overflow-hidden rounded-[32px] bg-brand-soft px-6 py-10 sm:px-10 sm:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full bg-brand-glow/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-8 h-56 w-56 rounded-full bg-brand/10 blur-3xl"
            />
            <div className="relative">
              <img src={logo} alt="Imperial Co" className="h-12 w-auto object-contain" />
              <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">
                Admin operations
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-body sm:text-[15px]">
                Manage comparator catalog inventory, import Excel product sheets, and
                process RFQ orders from the live site.
              </p>
            </div>
          </section>

          <form
            onSubmit={onSubmit}
            className="rounded-[28px] border border-brand/8 bg-white p-6 shadow-lg shadow-brand/5 sm:p-8"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-soft">
              Sign in
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-brand">Welcome back</h2>

            <label className="mt-7 block">
              <span className={labelClass}>Email</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                className={fieldClass}
              />
            </label>

            <label className="mt-4 block">
              <span className={labelClass}>Password</span>
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                className={fieldClass}
              />
            </label>

            {error ? (
              <p className="mt-4 rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Signing in…' : 'Sign in'}
            </Button>

            <p className="mt-5 text-center text-sm text-slate-soft">
              <Link to="/" className="font-semibold text-brand hover:underline">
                ← Back to website
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
