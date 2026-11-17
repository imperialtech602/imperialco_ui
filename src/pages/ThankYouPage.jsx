import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ThankYouPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const orderNumber = location.state?.orderNumber || ''

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Thank You | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  return (
    <main id="top" className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-muted text-brand">
          <CheckCircle2 className="h-9 w-9" strokeWidth={2} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">
          Thank you
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-body sm:text-base">
          Your quote request
          {orderNumber ? (
            <>
              {' '}
              <strong className="text-brand">{orderNumber}</strong>
            </>
          ) : null}{' '}
          is in our queue. A confirmation email is on its way, and our customer service
          team will follow up with availability, lead time, and shipping options.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={() => navigate('/request-quote')}>
            Submit another request
          </Button>
          <Link to="/products">
            <Button variant="outline">Back to catalog</Button>
          </Link>
        </div>
        <p className="mt-10 text-sm text-slate-soft">
          Need help now?{' '}
          <a href="mailto:cs@imperialco.biz" className="font-semibold text-brand underline">
            cs@imperialco.biz
          </a>
          {' · '}
          <a
            href="https://wa.me/971541620118"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-brand underline"
          >
            WhatsApp +971 54 162 0118
          </a>
        </p>
      </div>
    </main>
  )
}
