import { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from '@/api/auth'
import { authCleared, authSucceeded } from '@/features/admin/authSlice'

export default function AdminGuard({ children }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const { token, admin } = useSelector((state) => state.adminAuth)
  const verifiedRef = useRef(false)
  const [checking, setChecking] = useState(Boolean(token && !admin))

  useEffect(() => {
    let active = true

    async function verify() {
      if (!token) {
        setChecking(false)
        return
      }

      // Already have cached admin — render immediately, refresh in background once
      if (admin) {
        setChecking(false)
        if (verifiedRef.current) return
        verifiedRef.current = true
        try {
          const result = await fetchMe()
          if (!active) return
          dispatch(authSucceeded({ token, admin: result.data }))
        } catch {
          if (!active) return
          dispatch(authCleared())
        }
        return
      }

      setChecking(true)
      try {
        const result = await fetchMe()
        if (!active) return
        verifiedRef.current = true
        dispatch(authSucceeded({ token, admin: result.data }))
      } catch {
        if (!active) return
        dispatch(authCleared())
      } finally {
        if (active) setChecking(false)
      }
    }

    verify()
    return () => {
      active = false
    }
  }, [token, admin, dispatch])

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  if (checking && !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-muted text-sm text-slate-body">
        Checking admin session…
      </div>
    )
  }

  return children
}
