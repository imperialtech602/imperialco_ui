import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Upload } from 'lucide-react'
import {
  removeFromRfq,
  clearRfq,
  selectRfqCount,
  selectRfqProducts,
} from '@/features/catalog/catalogSlice'
import { submitOrder } from '@/api/orders'
import Button from '@/components/ui/Button'
import CheckIcon from '@/components/ui/CheckIcon'
import MiniHowItWorks from '@/components/shared/MiniHowItWorks'
import logoFull from '@/assets/imperial-logo-full.png'

const EMPTY_FORM = {
  customProduct: '',
  packs: '',
  originPreference: '',
  notes: '',
  intendedUse: '',
  targetMarket: '',
  requiredBy: '',
  firstName: '',
  lastName: '',
  company: '',
  jobTitle: '',
  email: '',
  phone: '',
  country: '',
}

const NEXT_STEPS = [
  'We review your product list and study requirements',
  'Availability and origin options are confirmed',
  'Pricing, lead time, and docs scope are prepared',
  'You receive a formal quotation to approve',
]

const WHY_US = [
  'SRA-origin products where feasible',
  'Clear lead-time planning',
  'GDP-aligned documentation',
  'Temperature-controlled logistics',
]

export default function RequestQuotePage() {
  const dispatch = useDispatch()
  const rfqProducts = useSelector(selectRfqProducts)
  const rfqCount = useSelector(selectRfqCount)
  const [form, setForm] = useState(EMPTY_FORM)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Request a Quote | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      const result = await submitOrder(
        {
          source: 'rfq',
          ...form,
          products: rfqProducts,
        },
        file,
      )
      setOrderNumber(result.data.orderNumber)
      setSubmitted(true)
      setForm(EMPTY_FORM)
      setFile(null)
      setFileName('')
      dispatch(clearRfq())
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit request')
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass =
    'h-11 w-full rounded-xl border border-brand/10 bg-brand-muted/50 px-3 text-sm text-ink outline-none transition focus:border-brand/30 focus:bg-white focus:ring-2 focus:ring-brand/15'

  const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-soft'

  if (submitted) {
    return (
      <main id="top" className="container-page py-16 text-center sm:py-24">
        <h1 className="text-3xl font-extrabold text-brand">Request received</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-slate-body sm:text-base">
          Your order {orderNumber ? <strong>{orderNumber}</strong> : null} is in
          our queue. Our sourcing team will follow up with availability, lead time,
          and shipping options.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={() => setSubmitted(false)}>Submit another request</Button>
          <Link to="/products">
            <Button variant="outline">Back to catalog</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main id="top">
      <section className="container-page pt-8 pb-8 text-center sm:pt-12">
        <div className="mx-auto mb-5 flex justify-center">
          <img
            src={logoFull}
            alt="Imperial Co"
            className="h-12 w-auto max-w-[240px] object-contain sm:h-14"
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-[1.75rem] font-extrabold tracking-tight text-brand sm:text-4xl">
            Request a Quote
          </h1>
          {rfqCount > 0 ? (
            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-brand px-2.5 text-sm font-extrabold text-white">
              {rfqCount}
            </span>
          ) : null}
        </div>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-body sm:text-base">
          {rfqCount > 0
            ? `${rfqCount} catalog product${rfqCount > 1 ? 's' : ''} selected — add details below and submit.`
            : 'Share your requirements — we will respond with availability confirmation, lead-time planning, and shipping options.'}
        </p>
      </section>

      <section className="container-page pb-14 sm:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_0.85fr] lg:gap-10">
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="rounded-2xl border border-brand/8 bg-white p-5 sm:p-7">
              <h2 className="text-lg font-bold text-brand">Product Requirements</h2>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    Catalog selections
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-muted px-2 text-xs font-extrabold text-brand">
                      {rfqCount}
                    </span>
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                  >
                    <Plus className="h-4 w-4" />
                    Add another
                  </Link>
                </div>

                {rfqProducts.length === 0 ? (
                  <p className="mt-3 rounded-xl bg-brand-muted px-4 py-3 text-sm text-slate-body">
                    No catalog products selected yet.{' '}
                    <Link to="/products" className="font-semibold text-brand underline">
                      Search the catalog
                    </Link>
                    .
                  </p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {rfqProducts.map((product) => (
                      <li
                        key={product.id}
                        className="flex items-start justify-between gap-3 rounded-xl bg-brand-muted px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-brand">{product.name}</p>
                          <p className="mt-0.5 text-xs text-slate-soft">
                            {product.manufacturer} · {product.country}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${product.name}`}
                          className="rounded-lg p-1.5 text-slate-soft hover:bg-white hover:text-brand"
                          onClick={() => dispatch(removeFromRfq(product.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {rfqProducts.length === 0 ? (
                <div className="mt-6 border-t border-brand/8 pt-6">
                  <p className="text-sm font-semibold text-brand">
                    Can&apos;t find what you&apos;re looking for?
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <label className="sm:col-span-1">
                      <span className={labelClass}>Product name</span>
                      <input
                        name="customProduct"
                        value={form.customProduct}
                        onChange={onChange}
                        className={fieldClass}
                        placeholder="Molecule / brand"
                      />
                    </label>
                    <label>
                      <span className={labelClass}>No. of packs</span>
                      <input
                        name="packs"
                        value={form.packs}
                        onChange={onChange}
                        className={fieldClass}
                        placeholder="Qty"
                      />
                    </label>
                    <label>
                      <span className={labelClass}>Origin preference</span>
                      <input
                        name="originPreference"
                        value={form.originPreference}
                        onChange={onChange}
                        className={fieldClass}
                        placeholder="e.g. FDA / EU"
                      />
                    </label>
                  </div>
                </div>
              ) : null}

              <label className="mt-5 block">
                <span className={labelClass}>Attachment</span>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-brand/20 bg-brand-muted/40 px-4 py-8 text-center transition hover:bg-brand-muted">
                  <Upload className="h-6 w-6 text-brand" />
                  <span className="mt-2 text-sm font-medium text-brand">
                    {fileName || 'Upload Excel, Doc, PDF, or image'}
                  </span>
                  <span className="mt-1 text-xs text-slate-soft">Max 10MB</span>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.doc,.docx,.pdf,.jpg,.jpeg,.png,.gif,.webp,.bmp,.heic,.heif,image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const next = e.target.files?.[0] || null
                      setFile(next)
                      setFileName(next?.name || '')
                    }}
                  />
                </label>
              </label>

              <label className="mt-5 block">
                <span className={labelClass}>Additional notes</span>
                <textarea
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={onChange}
                  className="w-full resize-y rounded-xl border border-brand/10 bg-brand-muted/50 px-3 py-2.5 text-sm text-ink outline-none focus:border-brand/30 focus:bg-white focus:ring-2 focus:ring-brand/15"
                  placeholder="Strength, pack size, destination, special handling…"
                />
              </label>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <label>
                  <span className={labelClass}>Intended use</span>
                  <input
                    name="intendedUse"
                    value={form.intendedUse}
                    onChange={onChange}
                    className={fieldClass}
                    placeholder="ANDA / BE / Clinical"
                  />
                </label>
                <label>
                  <span className={labelClass}>Target market</span>
                  <input
                    name="targetMarket"
                    value={form.targetMarket}
                    onChange={onChange}
                    className={fieldClass}
                    placeholder="Submission market"
                  />
                </label>
                <label>
                  <span className={labelClass}>Required-by date</span>
                  <input
                    type="date"
                    name="requiredBy"
                    value={form.requiredBy}
                    onChange={onChange}
                    className={fieldClass}
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-brand/8 bg-white p-5 sm:p-7">
              <h2 className="text-lg font-bold text-brand">Contact Information</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { name: 'firstName', label: 'First name' },
                  { name: 'lastName', label: 'Last name' },
                  { name: 'company', label: 'Company name' },
                  { name: 'jobTitle', label: 'Job title' },
                  { name: 'email', label: 'Email address', type: 'email' },
                  { name: 'phone', label: 'Phone number', type: 'tel' },
                  { name: 'country', label: 'Country' },
                ].map((field) => (
                  <label
                    key={field.name}
                    className={field.name === 'country' ? 'sm:col-span-2' : undefined}
                  >
                    <span className={labelClass}>
                      {field.label}
                      <span className="text-red-500"> *</span>
                    </span>
                    <input
                      required
                      type={field.type || 'text'}
                      name={field.name}
                      value={form[field.name]}
                      onChange={onChange}
                      className={fieldClass}
                    />
                  </label>
                ))}
              </div>

              {submitError ? (
                <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                  {submitError}
                </p>
              ) : null}

              <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit'}
              </Button>
            </div>
          </form>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl bg-brand p-6 text-white">
              <h3 className="text-lg font-bold">Custom RFQ</h3>
              <p className="mt-2 text-sm text-white/75">
                Need a hard-to-source comparator or multi-product list? Start a custom
                request and our team will source options.
              </p>
              <Link
                to="/products"
                className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-brand"
              >
                Start custom request
              </Link>
            </div>

            <div className="rounded-2xl bg-brand-muted p-6">
              <h3 className="text-base font-bold text-brand">What happens next?</h3>
              <ul className="mt-4 space-y-2.5">
                {NEXT_STEPS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-body">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-muted p-6">
              <h3 className="text-base font-bold text-brand">Why Imperial Co?</h3>
              <ul className="mt-4 space-y-2.5">
                {WHY_US.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-body">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand p-6 text-white">
              <h3 className="text-base font-bold">Need immediate assistance?</h3>
              <p className="mt-2 text-sm text-white/75">
                Email{' '}
                <a href="mailto:quotes@imperialco.com" className="underline">
                  quotes@imperialco.com
                </a>{' '}
                or WhatsApp our sourcing desk.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <MiniHowItWorks />
    </main>
  )
}
