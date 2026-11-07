import { ChevronLeft, ChevronRight } from 'lucide-react'

function buildPageItems(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const pages = new Set([1, total, current, current - 1, current + 1])
  if (current <= 3) {
    pages.add(2)
    pages.add(3)
    pages.add(4)
  }
  if (current >= total - 2) {
    pages.add(total - 1)
    pages.add(total - 2)
    pages.add(total - 3)
  }

  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b)
  const items = []
  for (let i = 0; i < sorted.length; i += 1) {
    const page = sorted[i]
    if (i > 0 && page - sorted[i - 1] > 1) items.push('…')
    items.push(page)
  }
  return items
}

export default function Pagination({ page, pages, total, label = 'items', onChange }) {
  if (!pages || pages < 1) return null

  if (pages <= 1) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-[20px] border border-brand/8 bg-white px-4 py-3 text-sm text-slate-body shadow-sm shadow-brand/5">
        <p>
          {total} {label}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-soft">
          Page 1 of 1
        </p>
      </div>
    )
  }

  const items = buildPageItems(page, pages)

  return (
    <div className="flex flex-col gap-3 rounded-[20px] border border-brand/8 bg-white px-4 py-3 shadow-sm shadow-brand/5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-body">
        {total} {label}
        <span className="ml-2 text-slate-soft">
          · Page {page} of {pages}
        </span>
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className="inline-flex h-9 items-center gap-1 rounded-full border border-brand/10 bg-white px-3 text-sm font-semibold text-brand transition hover:bg-brand-muted disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {items.map((item, index) =>
          item === '…' ? (
            <span
              key={`ellipsis-${index}`}
              className="inline-flex h-9 w-8 items-center justify-center text-sm text-slate-soft"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              aria-current={item === page ? 'page' : undefined}
              className={[
                'inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2.5 text-sm font-semibold transition',
                item === page
                  ? 'bg-brand text-white shadow-sm shadow-brand/20'
                  : 'border border-brand/10 bg-white text-brand hover:bg-brand-muted',
              ].join(' ')}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={page >= pages}
          onClick={() => onChange(page + 1)}
          className="inline-flex h-9 items-center gap-1 rounded-full border border-brand/10 bg-white px-3 text-sm font-semibold text-brand transition hover:bg-brand-muted disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
