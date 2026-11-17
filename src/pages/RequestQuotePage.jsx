import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, Upload } from 'lucide-react'
import {
  removeFromRfq,
  clearRfq,
  setRfqQuantity,
  selectRfqCount,
  selectRfqProducts,
} from '@/features/catalog/catalogSlice'
import { submitOrder } from '@/api/orders'
import Button from '@/components/ui/Button'
import CheckIcon from '@/components/ui/CheckIcon'
import MiniHowItWorks from '@/components/shared/MiniHowItWorks'

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
  country: '',
}

const NEXT_STEPS = [
  'Review your molecule list and requirements',
  'Confirm availability and batch details',
  'Provide pricing and lead time estimate',
  'Send detailed quotation within 24-48 hours',
]

const WHY_US = [
  'SRA-origin reference products; batch and expiry visibility provided',
  '32-day average delivery time',
  'Complete GDP documentation',
  'Temperature-controlled logistics',
]

const CONTACT_FIELDS = [
  { name: 'firstName', label: 'First name', required: true },
  { name: 'lastName', label: 'Last name', required: true },
  { name: 'company', label: 'Company name', required: true },
  { name: 'jobTitle', label: 'Job title', required: false },
  { name: 'email', label: 'Email address', type: 'email', required: true },
  { name: 'country', label: 'Country', required: false },
]

export default function RequestQuotePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rfqProducts = useSelector(selectRfqProducts)
  const rfqCount = useSelector(selectRfqCount)
  const [form, setForm] = useState(EMPTY_FORM)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [requirementError, setRequirementError] = useState('')

  const hasCatalog = rfqProducts.length > 0
  const hasManual = Boolean(form.customProduct.trim())
  const hasAttachment = Boolean(file)
  const hasRequirement = hasCatalog || hasManual || hasAttachment

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Request a Quote | Imperial Co'
    return () => {
      document.title = 'Imperial Co | RLD & Comparator Sourcing'
    }
  }, [])

  useEffect(() => {
    if (hasRequirement && requirementError) setRequirementError('')
  }, [hasRequirement, requirementError])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    setRequirementError('')

    if (!hasRequirement) {
      setRequirementError(
        'Product selection, manual requirement, or attachment — at least one is required.',
      )
      document.getElementById('product-requirements')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setSubmitting(false)
      return
    }

    try {
      const result = await submitOrder(
        {
          source: 'rfq',
          ...form,
          products: rfqProducts.map((product) => ({
            ...product,
            quantity: product.quantity || 1,
          })),
        },
        file,
      )
      dispatch(clearRfq())
      setForm(EMPTY_FORM)
      setFile(null)
      setFileName('')
      navigate('/thank-you', {
        replace: true,
        state: { orderNumber: result.data.orderNumber },
      })
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit request')
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass =
    'h-11 w-full rounded-xl border border-brand/10 bg-brand-muted/50 px-3 text-sm text-ink outline-none transition focus:border-brand/30 focus:bg-white focus:ring-2 focus:ring-brand/15'

  const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-soft'

  return (
    <main id="top">
      <section className="container-page pt-8 pb-8 text-center sm:pt-12">
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
            <div
              id="product-requirements"
              className={[
                'rounded-2xl border bg-white p-5 sm:p-7',
                requirementError ? 'border-red-300 ring-2 ring-red-100' : 'border-brand/8',
              ].join(' ')}
            >
              <h2 className="text-lg font-bold text-brand">
                Product Requirements <span className="text-red-500">*</span>
              </h2>
              <p className="mt-1 text-sm text-slate-body">
                Product selection, manual requirement, or attachment. At least one.
              </p>
              {requirementError ? (
                <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                  {requirementError}
                </p>
              ) : null}

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
                        className="flex flex-col gap-3 rounded-xl bg-brand-muted px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-brand">{product.name}</p>
                          <p className="mt-0.5 text-xs uppercase tracking-wide text-slate-soft">
                            {product.manufacturer}
                            {product.country || product.countryOfOrigin
                              ? ` · ${String(product.country || product.countryOfOrigin).toUpperCase()}`
                              : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-soft">
                              Qty
                            </span>
                            <div className="inline-flex items-center overflow-hidden rounded-lg border border-brand/10 bg-white">
                              <button
                                type="button"
                                aria-label={`Decrease quantity for ${product.name}`}
                                className="inline-flex h-9 w-9 items-center justify-center text-brand transition hover:bg-brand-muted disabled:cursor-not-allowed disabled:opacity-40"
                                disabled={(product.quantity ?? 1) <= 1}
                                onClick={() =>
                                  dispatch(
                                    setRfqQuantity({
                                      id: product.id,
                                      quantity: Math.max(1, (product.quantity ?? 1) - 1),
                                    }),
                                  )
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span
                                className="min-w-10 px-1 text-center text-sm font-extrabold tabular-nums text-brand"
                                aria-live="polite"
                              >
                                {product.quantity ?? 1}
                              </span>
                              <button
                                type="button"
                                aria-label={`Increase quantity for ${product.name}`}
                                className="inline-flex h-9 w-9 items-center justify-center text-brand transition hover:bg-brand-muted"
                                onClick={() =>
                                  dispatch(
                                    setRfqQuantity({
                                      id: product.id,
                                      quantity: Math.min(999999, (product.quantity ?? 1) + 1),
                                    }),
                                  )
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            aria-label={`Remove ${product.name}`}
                            className="rounded-lg p-1.5 text-slate-soft hover:bg-white hover:text-brand"
                            onClick={() => dispatch(removeFromRfq(product.id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 border-t border-brand/8 pt-6">
                <p className="text-sm font-semibold text-brand">
                  Can&apos;t find what you&apos;re looking for?
                </p>
                <p className="mt-1 text-sm text-slate-body">
                  Give us your custom requirements and we will get back to you.
                </p>
                <label className="mt-4 block">
                  <span className={labelClass}>Requirements</span>
                  <textarea
                    name="customProduct"
                    rows={4}
                    value={form.customProduct}
                    onChange={onChange}
                    className="w-full resize-y rounded-xl border border-brand/10 bg-brand-muted/50 px-3 py-2.5 text-sm text-ink outline-none focus:border-brand/30 focus:bg-white focus:ring-2 focus:ring-brand/15"
                    placeholder="Generic, brand, strength, dosage form, quantity, country of origin"
                  />
                </label>
                <label className="mt-5 block">
                  <span className={labelClass}>Attach your requirements</span>
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
              </div>
            </div>

            <div className="rounded-2xl border border-brand/8 bg-white p-5 sm:p-7">
              <h2 className="text-lg font-bold text-brand">Contact Information</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {CONTACT_FIELDS.map((field) => (
                  <label
                    key={field.name}
                    className={field.name === 'country' ? 'sm:col-span-2' : undefined}
                  >
                    <span className={labelClass}>
                      {field.label}
                      {field.required ? <span className="text-red-500"> *</span> : null}
                    </span>
                    <input
                      required={field.required}
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
              <h3 className="text-lg font-bold">Need immediate assistance?</h3>
              <p className="mt-3 text-sm text-white/80">
                Email:{' '}
                <a href="mailto:cs@imperialco.biz" className="underline">
                  cs@imperialco.biz
                </a>
              </p>
              <p className="mt-2 text-sm text-white/80">
                WhatsApp:{' '}
                <a
                  href="https://wa.me/971541620118"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  +971 54 162 0118
                </a>
              </p>
            </div>

            <div className="rounded-2xl bg-brand-muted p-6">
              <h3 className="text-base font-bold text-brand">What happens next?</h3>
              <p className="mt-2 text-sm text-slate-body">
                Once you submit your request, our team will:
              </p>
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
              <h3 className="text-base font-bold text-brand">Why Imperial Co.?</h3>
              <ul className="mt-4 space-y-2.5">
                {WHY_US.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-body">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <MiniHowItWorks />
    </main>
  )
}
