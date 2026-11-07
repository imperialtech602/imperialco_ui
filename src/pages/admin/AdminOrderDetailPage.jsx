import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Eye, Package, Paperclip } from 'lucide-react'
import {
  downloadOrderAttachment,
  fetchOrder,
  openOrderAttachment,
  updateOrder,
} from '@/api/orders'
import Button from '@/components/ui/Button'
import {
  CountryPill,
  PageHero,
  Panel,
  StatusPill,
  fieldClass,
  formatFilterLabel,
  labelClass,
} from '@/components/admin/adminUi'

const STATUS_OPTIONS = ['new', 'reviewing', 'quoted', 'closed', 'cancelled']

function DetailRow({ label, value }) {
  const display = value == null || String(value).trim() === '' ? '—' : value
  return (
    <div className="rounded-xl bg-brand-muted/70 px-3.5 py-3 sm:px-4">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-soft">
        {label}
      </dt>
      <dd className="mt-1 break-words text-[15px] font-bold leading-snug text-brand sm:text-base">
        {display}
      </dd>
    </div>
  )
}

export default function AdminOrderDetailPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('new')
  const [adminNotes, setAdminNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [fileBusy, setFileBusy] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = 'Order Detail | Admin | Imperial Co'
    fetchOrder(id)
      .then((res) => {
        setOrder(res.data)
        setStatus(res.data.status)
        setAdminNotes(res.data.adminNotes || '')
      })
      .catch((err) => setError(err.message))
  }, [id])

  const onSave = async () => {
    setSaving(true)
    setMessage('')
    setError('')
    try {
      const res = await updateOrder(id, { status, adminNotes })
      setOrder(res.data)
      setMessage('Order updated')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (error && !order) {
    return <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
  }

  if (!order) {
    return <p className="text-sm text-slate-body">Loading order…</p>
  }

  return (
    <div className="space-y-5">
      <Link
        to="/admin/orders"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to orders
      </Link>

      <PageHero
        eyebrow="Order detail"
        title={order.orderNumber}
        description={`Submitted ${new Date(order.createdAt).toLocaleString()} via ${order.source}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <StatusPill value={order.status} size="lg" />
            {order.hasAttachment || order.attachmentName ? (
              <StatusPill value="file" size="lg" />
            ) : null}
          </div>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <h2 className="text-lg font-extrabold text-brand">Contact</h2>
          <dl className="mt-4 grid gap-2.5 sm:grid-cols-2">
            <DetailRow label="Name" value={`${order.firstName} ${order.lastName}`.trim()} />
            <DetailRow label="Company" value={order.company} />
            <DetailRow label="Email" value={order.email} />
            <DetailRow label="Phone" value={order.phone} />
            <DetailRow label="Country" value={order.country} />
            <DetailRow label="Job title" value={order.jobTitle} />
          </dl>
        </Panel>

        <Panel>
          <h2 className="text-lg font-extrabold text-brand">Requirements</h2>
          <dl className="mt-4 grid gap-2.5 sm:grid-cols-2">
            <DetailRow label="Custom product" value={order.customProduct} />
            <DetailRow label="Packs" value={order.packs} />
            <DetailRow label="Origin preference" value={order.originPreference} />
            <DetailRow label="Intended use" value={order.intendedUse} />
            <DetailRow label="Target market" value={order.targetMarket} />
            <DetailRow
              label="Required by"
              value={
                order.requiredBy ? new Date(order.requiredBy).toLocaleDateString() : ''
              }
            />
          </dl>
          {order.notes ? (
            <div className="mt-4 rounded-xl border border-brand/10 bg-white px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-soft">
                Notes
              </p>
              <p className="mt-1 text-[15px] font-medium leading-relaxed text-brand">
                {order.notes}
              </p>
            </div>
          ) : null}
          {order.attachmentName || order.hasAttachment ? (
            <div className="mt-4 rounded-xl border border-brand/10 bg-white px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-soft">
                Attachment
              </p>
              <p className="mt-1 inline-flex items-center gap-2 text-[15px] font-bold text-brand">
                <Paperclip className="h-4 w-4 shrink-0" />
                <span className="break-all">
                  {order.attachmentName || 'Uploaded attachment'}
                </span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={Boolean(fileBusy)}
                  onClick={async () => {
                    setFileBusy('view')
                    setError('')
                    try {
                      await openOrderAttachment(order._id)
                    } catch (err) {
                      setError(err.message)
                    } finally {
                      setFileBusy('')
                    }
                  }}
                >
                  <Eye className="h-4 w-4" />
                  {fileBusy === 'view' ? 'Opening…' : 'View file'}
                </Button>
                <Button
                  size="sm"
                  disabled={Boolean(fileBusy)}
                  onClick={async () => {
                    setFileBusy('download')
                    setError('')
                    try {
                      await downloadOrderAttachment(
                        order._id,
                        order.attachmentName || 'attachment',
                      )
                    } catch (err) {
                      setError(err.message)
                    } finally {
                      setFileBusy('')
                    }
                  }}
                >
                  <Download className="h-4 w-4" />
                  {fileBusy === 'download' ? 'Downloading…' : 'Download'}
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-soft">No file attached to this order.</p>
          )}
        </Panel>
      </div>

      <Panel className="ring-1 ring-brand/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-sm shadow-brand/25">
              <Package className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-extrabold text-brand">Catalog products</h2>
              <p className="text-sm text-slate-body">
                Items selected for this quote request
              </p>
            </div>
          </div>
          {order.products?.length ? (
            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-brand px-3 text-sm font-extrabold text-white">
              {order.products.length}
            </span>
          ) : null}
        </div>

        {order.products?.length ? (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {order.products.map((product, index) => (
              <li
                key={`${product.itemId}-${index}`}
                className="overflow-hidden rounded-2xl border border-brand/15 bg-white shadow-sm shadow-brand/5"
              >
                <div className="border-l-4 border-brand bg-brand-muted/40 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-soft">
                    Product {index + 1}
                    {product.itemId ? ` · ID ${product.itemId}` : ''}
                  </p>
                  <p className="mt-1.5 text-base font-extrabold leading-snug text-brand sm:text-[17px]">
                    {product.itemName}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.manufacturer ? (
                      <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand ring-1 ring-brand/15">
                        {product.manufacturer}
                      </span>
                    ) : null}
                    <CountryPill value={product.countryOfOrigin} size="sm" />
                    {product.dosageForm ? (
                      <span className="inline-flex items-center rounded-full bg-[#e8e9ff] px-3 py-1.5 text-xs font-bold tracking-wide text-brand ring-1 ring-brand/20">
                        {formatFilterLabel(product.dosageForm)}
                      </span>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 rounded-xl bg-brand-muted px-4 py-3 text-sm text-slate-body">
            No catalog products on this order.
          </p>
        )}
      </Panel>

      <Panel>
        <h2 className="text-lg font-extrabold text-brand">Update status</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-[200px_1fr_auto] md:items-end">
          <label>
            <span className={labelClass}>Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={fieldClass}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {formatFilterLabel(option)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className={labelClass}>Admin notes</span>
            <input
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className={fieldClass}
              placeholder="Internal follow-up notes"
            />
          </label>
          <Button onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
        {message ? <p className="mt-3 text-sm text-mint-text">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      </Panel>
    </div>
  )
}
