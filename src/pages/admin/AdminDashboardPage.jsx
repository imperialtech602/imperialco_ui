import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  ClipboardList,
  Sparkles,
  FileCheck2,
  ArrowRight,
  Plus,
  Upload,
} from 'lucide-react'
import { fetchDashboardStats } from '@/api/orders'
import Button from '@/components/ui/Button'
import {
  EmptyState,
  PageHero,
  Panel,
  StatusPill,
} from '@/components/admin/adminUi'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Admin Dashboard | Imperial Co'
    fetchDashboardStats()
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) {
    return (
      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
    )
  }

  if (!stats) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-body">
        Loading dashboard…
      </div>
    )
  }

  const cards = [
    {
      label: 'Products',
      value: stats.productCount,
      icon: Package,
      to: '/admin/products',
      pill: 'active',
    },
    {
      label: 'Total orders',
      value: stats.orderCount,
      icon: ClipboardList,
      to: '/admin/orders',
      pill: 'reviewing',
    },
    {
      label: 'New orders',
      value: stats.newOrders,
      icon: Sparkles,
      to: '/admin/orders',
      pill: 'new',
    },
    {
      label: 'Quoted',
      value: stats.quotedOrders,
      icon: FileCheck2,
      to: '/admin/orders',
      pill: 'quoted',
    },
  ]

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Imperial Co"
        title="Operations dashboard"
        description="Track RFQ orders and keep the comparator catalog ready for sourcing."
        actions={
          <>
            <Link to="/admin/products">
              <Button size="sm">
                <Plus className="h-4 w-4" />
                Add product
              </Button>
            </Link>
            <Link to="/admin/products">
              <Button size="sm" variant="secondary">
                <Upload className="h-4 w-4" />
                Import Excel
              </Button>
            </Link>
          </>
        }
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="rounded-[24px] border border-brand/8 bg-white p-5 shadow-sm shadow-brand/5 transition hover:border-brand/20 hover:shadow-md hover:shadow-brand/10"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-muted text-brand">
                <card.icon className="h-5 w-5" />
              </span>
              <StatusPill value={card.pill} size="sm" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-soft">
              {card.label}
            </p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-brand">
              {card.value}
            </p>
          </Link>
        ))}
      </section>

      <Panel>
        <div className="flex flex-wrap items-center gap-2">
          <p className="mr-1 text-sm font-semibold text-slate-body">Status key:</p>
          {['new', 'reviewing', 'quoted', 'closed', 'cancelled'].map((status) => (
            <StatusPill key={status} value={status} size="sm" />
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-[1.55fr_0.85fr]">
        <Panel>
          <div className="flex items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-lg font-extrabold text-brand">Recent orders</h2>
              <p className="mt-0.5 text-sm text-slate-body">Newest quote requests</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-sm font-semibold text-brand underline-offset-2 hover:underline"
            >
              View all
            </Link>
          </div>

          {stats.recentOrders.length === 0 ? (
            <div className="mt-4">
              <EmptyState
                icon={ClipboardList}
                title="No orders yet"
                description="When someone submits Request a Quote, it shows up here instantly."
              />
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-brand/8">
              {stats.recentOrders.map((order) => (
                <li key={order._id}>
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="flex flex-col gap-3 py-4 transition hover:bg-brand-muted/50 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:px-3"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-bold text-brand">{order.orderNumber}</p>
                        <StatusPill value={order.status} />
                        {order.hasAttachment || order.attachmentName ? (
                          <StatusPill value="file" size="sm" />
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-sm text-slate-body">
                        {order.company}
                        <span className="text-slate-soft">
                          {' '}
                          · {order.firstName} {order.lastName}
                        </span>
                      </p>
                    </div>
                    <span className="text-xs font-medium text-slate-soft sm:shrink-0">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <div className="space-y-5">
          <Panel>
            <h2 className="text-lg font-extrabold text-brand">Quick links</h2>
            <div className="mt-4 space-y-2">
              {[
                { to: '/admin/products', label: 'Manage products' },
                { to: '/admin/orders', label: 'Review orders' },
                { to: '/products', label: 'Open public catalog', external: true },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  target={item.external ? '_blank' : undefined}
                  className="flex items-center justify-between rounded-2xl bg-brand-muted px-4 py-3 text-sm font-semibold text-brand transition hover:bg-brand-soft"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </Panel>

          <div className="rounded-[28px] bg-brand px-5 py-6 text-white shadow-lg shadow-brand/15">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Catalog tip
            </p>
            <h3 className="mt-2 text-lg font-extrabold">Excel upsert by item id</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Matching item ids update existing rows. New ids create products. No duplicates.
            </p>
            <Link to="/admin/products" className="mt-5 inline-block">
              <Button variant="white" size="sm">
                Go to products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
