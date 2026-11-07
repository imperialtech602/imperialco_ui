import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ClipboardList } from 'lucide-react'
import { fetchOrders } from '@/api/orders'
import useDebouncedValue from '@/hooks/useDebouncedValue'
import {
  EmptyState,
  FilterSelect,
  PageHero,
  Pagination,
  Panel,
  SearchField,
  StatusPill,
} from '@/components/admin/adminUi'

const STATUS_OPTIONS = ['all', 'new', 'reviewing', 'quoted', 'closed', 'cancelled']

export default function AdminOrdersPage() {
  const [searchParams] = useSearchParams()
  const [orders, setOrders] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebouncedValue(searchInput, 400)
  const [filters, setFilters] = useState({
    q: '',
    status: searchParams.get('status') || 'all',
    page: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const skipDebounceLoad = useRef(true)

  const load = async (next = filters) => {
    setLoading(true)
    setError('')
    try {
      const result = await fetchOrders({
        q: next.q,
        status: next.status,
        page: next.page,
        limit: 20,
      })
      setOrders(result.data.items)
      setPagination(result.data.pagination)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Orders | Admin | Imperial Co'
    load(filters)
  }, [])

  useEffect(() => {
    if (skipDebounceLoad.current) {
      skipDebounceLoad.current = false
      return
    }
    const next = { ...filters, q: debouncedSearch, page: 1 }
    setFilters(next)
    load(next)
  }, [debouncedSearch])

  return (
    <div className="space-y-5">
      <PageHero
        eyebrow="RFQ pipeline"
        title="Orders"
        description="Every quote request from the website lands here for review and follow-up."
      />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[1.4fr_220px]">
          <SearchField
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={(q) => {
              setSearchInput(q)
              const next = { ...filters, q, page: 1 }
              setFilters(next)
              load(next)
            }}
            placeholder="Search order #, company, email, product…"
          />
          <FilterSelect
            label="Status"
            value={filters.status}
            options={STATUS_OPTIONS}
            onChange={(status) => {
              const next = { ...filters, status, page: 1 }
              setFilters(next)
              load(next)
            }}
          />
        </div>
      </Panel>

      {error ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {loading ? (
        <Panel>
          <p className="py-10 text-center text-sm text-slate-body">Loading orders…</p>
        </Panel>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No orders found"
          description="Submit a quote on the public site, or clear filters to see everything."
        />
      ) : (
        <Panel padded={false} className="overflow-hidden">
          <ul className="divide-y divide-brand/8">
            {orders.map((order) => (
              <li key={order._id}>
                <Link
                  to={`/admin/orders/${order._id}`}
                  className="grid gap-3 px-4 py-4 transition hover:bg-brand-muted/50 sm:grid-cols-[1.1fr_1.2fr_1fr_auto] sm:items-center sm:px-5"
                >
                  <div>
                    <p className="text-sm font-bold text-brand">{order.orderNumber}</p>
                    <p className="mt-1 text-xs text-slate-soft">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {order.firstName} {order.lastName}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-soft">
                      {order.company} · {order.email}
                    </p>
                  </div>
                  <div className="text-sm text-slate-body">
                    <p>
                      {order.products?.length
                        ? `${order.products.length} catalog item${order.products.length > 1 ? 's' : ''}`
                        : order.customProduct || 'Custom request'}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <StatusPill value={order.status} />
                    {order.hasAttachment || order.attachmentName ? (
                      <StatusPill value="file" size="sm" />
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Pagination
        page={pagination.page}
        pages={pagination.pages}
        total={pagination.total}
        label={pagination.total === 1 ? 'order' : 'orders'}
        onChange={(page) => {
          const next = { ...filters, page }
          setFilters(next)
          load(next)
        }}
      />
    </div>
  )
}
