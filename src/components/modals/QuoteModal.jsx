import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { closeQuoteModal } from '@/features/ui/uiSlice'
import { submitOrder } from '@/api/orders'

const EMPTY = {
  firstName: '',
  lastName: '',
  company: '',
  jobTitle: '',
  email: '',
  phone: '',
  country: '',
  product: '',
  message: '',
}

export default function QuoteModal() {
  const dispatch = useDispatch()
  const open = useSelector((state) => state.ui.quoteModalOpen)
  const [form, setForm] = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [orderNumber, setOrderNumber] = useState('')

  if (!open) return null

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const result = await submitOrder({
        source: 'quote-modal',
        firstName: form.firstName,
        lastName: form.lastName,
        company: form.company,
        jobTitle: form.jobTitle,
        email: form.email,
        phone: form.phone,
        country: form.country,
        product: form.product,
        message: form.message,
        customProduct: form.product,
        notes: form.message,
      })
      setOrderNumber(result.data.orderNumber)
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Unable to submit request')
    } finally {
      setSubmitting(false)
    }
  }

  const onClose = () => {
    dispatch(closeQuoteModal())
    setSubmitted(false)
    setForm(EMPTY)
    setError('')
    setOrderNumber('')
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="relative z-10 max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-white p-5 shadow-2xl shadow-brand/20 sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-soft hover:bg-brand-muted hover:text-brand"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <h2 id="quote-title" className="text-2xl font-bold text-brand">
              Request received
            </h2>
            <p className="mt-3 text-sm text-slate-body">
              Order {orderNumber} is saved. Our sourcing team will follow up shortly.
            </p>
            <Button className="mt-6" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <h2 id="quote-title" className="pr-8 text-2xl font-bold text-brand">
              Request a Quote
            </h2>
            <p className="mt-2 text-sm text-slate-body">
              Tell us what you need — RLD, comparator, quantity, and timeline.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: 'firstName', label: 'First name', type: 'text' },
                  { name: 'lastName', label: 'Last name', type: 'text' },
                  { name: 'company', label: 'Company', type: 'text' },
                  { name: 'jobTitle', label: 'Job title', type: 'text' },
                  { name: 'email', label: 'Work email', type: 'email' },
                  { name: 'phone', label: 'Phone number', type: 'tel' },
                ].map((field) => (
                  <label key={field.name} className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-soft">
                      {field.label}
                      <span className="text-red-500"> *</span>
                    </span>
                    <input
                      required
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      onChange={onChange}
                      className="h-11 w-full rounded-xl border border-brand/10 bg-brand-muted/40 px-3 text-sm text-ink outline-none transition focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/15"
                    />
                  </label>
                ))}
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-soft">
                  Country
                  <span className="text-red-500"> *</span>
                </span>
                <input
                  required
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={onChange}
                  className="h-11 w-full rounded-xl border border-brand/10 bg-brand-muted/40 px-3 text-sm text-ink outline-none transition focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/15"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-soft">
                  Product / CAS
                  <span className="text-red-500"> *</span>
                </span>
                <input
                  required
                  name="product"
                  type="text"
                  value={form.product}
                  onChange={onChange}
                  className="h-11 w-full rounded-xl border border-brand/10 bg-brand-muted/40 px-3 text-sm text-ink outline-none transition focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/15"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-soft">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={onChange}
                  className="w-full resize-none rounded-xl border border-brand/10 bg-brand-muted/40 px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/15"
                  placeholder="Strength, pack size, quantity, destination, needed-by date…"
                />
              </label>

              {error ? (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              ) : null}

              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit request'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
