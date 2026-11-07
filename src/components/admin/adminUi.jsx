import { Search } from 'lucide-react'
export { default as Pagination } from '@/components/shared/Pagination'

export const fieldClass =
  'h-11 w-full rounded-xl border border-brand/10 bg-white px-3 text-sm text-ink outline-none transition focus:border-brand/30 focus:ring-2 focus:ring-brand/15'

export const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-soft'

export const STATUS_STYLES = {
  new: {
    wrap: 'bg-[#e8e9ff] text-[#282a74] ring-1 ring-[#282a74]/20',
    dot: 'bg-[#282a74]',
  },
  reviewing: {
    wrap: 'bg-[#fff3cd] text-[#8a6400] ring-1 ring-[#c6ac20]/35',
    dot: 'bg-[#c6ac20]',
  },
  quoted: {
    wrap: 'bg-[#dcfce7] text-[#15803d] ring-1 ring-[#16a34a]/25',
    dot: 'bg-[#16a34a]',
  },
  closed: {
    wrap: 'bg-[#ececf3] text-[#5b5e7a] ring-1 ring-[#7a7d96]/25',
    dot: 'bg-[#7a7d96]',
  },
  cancelled: {
    wrap: 'bg-[#fee2e2] text-[#b91c1c] ring-1 ring-[#ef4444]/25',
    dot: 'bg-[#ef4444]',
  },
  active: {
    wrap: 'bg-[#dcfce7] text-[#15803d] ring-1 ring-[#16a34a]/25',
    dot: 'bg-[#16a34a]',
  },
  inactive: {
    wrap: 'bg-[#ececf3] text-[#5b5e7a] ring-1 ring-[#7a7d96]/25',
    dot: 'bg-[#7a7d96]',
  },
  discontinued: {
    wrap: 'bg-[#fee2e2] text-[#b91c1c] ring-1 ring-[#ef4444]/25',
    dot: 'bg-[#ef4444]',
  },
  file: {
    wrap: 'bg-[#e8e9ff] text-[#282a74] ring-1 ring-[#282a74]/20',
    dot: 'bg-[#282a74]',
  },
  inventory: {
    wrap: 'bg-[#eef2ff] text-[#3730a3] ring-1 ring-[#6366f1]/25',
    dot: 'bg-[#4f46e5]',
  },
}

const STATUS_LABELS = {
  new: 'New',
  reviewing: 'Reviewing',
  quoted: 'Quoted',
  closed: 'Closed',
  cancelled: 'Cancelled',
  active: 'Active',
  inactive: 'Inactive',
  discontinued: 'Discontinued',
  file: 'File attached',
  inventory: 'Inventory',
}

export function StatusPill({ value, size = 'md' }) {
  const key = String(value || '').toLowerCase()
  const style = STATUS_STYLES[key] || {
    wrap: 'bg-brand-muted text-brand ring-1 ring-brand/15',
    dot: 'bg-brand',
  }
  const label = STATUS_LABELS[key] || value
  const sizeClass =
    size === 'lg'
      ? 'px-3.5 py-1.5 text-sm gap-2'
      : size === 'sm'
        ? 'px-2.5 py-1 text-[11px] gap-1.5'
        : 'px-3 py-1.5 text-xs gap-1.5'

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold capitalize tracking-wide ${sizeClass} ${style.wrap}`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`} aria-hidden />
      {label}
    </span>
  )
}

export function PageHero({ eyebrow, title, description, actions }) {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-brand-soft px-5 py-7 sm:rounded-[32px] sm:px-8 sm:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-brand-glow/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-8 h-52 w-52 rounded-full bg-brand/10 blur-3xl"
      />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-soft">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-1 text-[1.65rem] font-extrabold tracking-tight text-brand sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-body sm:text-[15px]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </section>
  )
}

export function Panel({ children, className = '', padded = true }) {
  return (
    <section
      className={[
        'rounded-[24px] border border-brand/8 bg-white shadow-sm shadow-brand/5 sm:rounded-[28px]',
        padded ? 'p-4 sm:p-5' : '',
        className,
      ].join(' ')}
    >
      {children}
    </section>
  )
}

export function SearchField({ value, onChange, placeholder, onSubmit }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.(value)
      }}
      className="flex w-full flex-col gap-2 rounded-2xl bg-brand-muted/60 p-2 sm:flex-row sm:items-center sm:rounded-full sm:gap-2"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-soft" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-full bg-transparent pl-11 pr-4 text-sm text-ink outline-none placeholder:text-slate-soft"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        Search
      </button>
    </form>
  )
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="rounded-[24px] bg-brand-muted/70 px-6 py-14 text-center">
      {Icon ? <Icon className="mx-auto h-9 w-9 text-brand" /> : null}
      <p className="mt-4 text-base font-bold text-brand">{title}</p>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-body">{description}</p>
      ) : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  )
}

export function formatFilterLabel(value) {
  if (value === undefined || value === null || value === '') return ''
  const raw = String(value).trim()
  if (!raw) return ''
  if (raw.toLowerCase() === 'all') return 'All'
  return raw
    .replace(/[_-]+/g, ' ')
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/** Deduplicate options case-insensitively (Japan / JAPAN → one entry). */
export function uniqueFilterOptions(options = [], reserved = []) {
  const reservedKeys = new Set(
    reserved.map((item) => String(item || '').trim().toLowerCase()).filter(Boolean),
  )
  const seen = new Set()
  const result = []

  for (const option of options) {
    const raw = String(option ?? '').trim()
    if (!raw) continue
    const key = raw.toLowerCase()
    if (reservedKeys.has(key) || seen.has(key)) continue
    seen.add(key)
    result.push(raw)
  }

  return result
}

export function FilterSelect({ label, value, onChange, options }) {
  const uniqueOptions = uniqueFilterOptions(options)

  return (
    <label className="block min-w-0">
      <span className={labelClass}>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={fieldClass}>
        {uniqueOptions.map((option) => (
          <option key={option.toLowerCase()} value={option}>
            {formatFilterLabel(option)}
          </option>
        ))}
      </select>
    </label>
  )
}

export function CountryPill({ value, size = 'md' }) {
  if (!value) return null
  const sizeClass =
    size === 'sm'
      ? 'px-2.5 py-1 text-[11px]'
      : size === 'lg'
        ? 'px-3.5 py-1.5 text-sm'
        : 'px-3 py-1.5 text-xs'

  return (
    <span
      className={`inline-flex items-center rounded-full bg-[#e8e9ff] font-bold tracking-wide text-brand ring-1 ring-brand/20 ${sizeClass}`}
    >
      {formatFilterLabel(value)}
    </span>
  )
}

export function FilterPreviewPills({ items = [] }) {
  const visible = items.filter((item) => item?.value && !item.hidden)
  if (!visible.length) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-soft">
        Selected
      </span>
      {visible.map((item) => (
        <button
          key={`${item.label}-${item.value}`}
          type="button"
          onClick={item.onClear}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white shadow-sm shadow-brand/20 transition hover:bg-brand-dark"
          title={`Clear ${item.label}`}
        >
          <span className="opacity-80">{item.label}:</span>
          <span>
            {item.raw
              ? item.display || item.value
              : formatFilterLabel(item.display || item.value)}
          </span>
          <span aria-hidden className="ml-0.5 text-white/80">
            ×
          </span>
        </button>
      ))}
    </div>
  )
}

export function FilterPillGroup({
  label,
  value,
  options,
  onChange,
  allValue = 'all',
  allLabel = 'All',
}) {
  return (
    <div className="min-w-0">
      {label ? <p className={labelClass}>{label}</p> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value
          const optionLabel =
            typeof option === 'string'
              ? optionValue === allValue
                ? allLabel
                : formatFilterLabel(optionValue)
              : option.label
          const active = value === optionValue

          return (
            <button
              key={optionValue}
              type="button"
              onClick={() => onChange(optionValue)}
              className={[
                'inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide transition',
                active
                  ? 'bg-brand text-white shadow-sm shadow-brand/20'
                  : 'bg-brand-muted text-brand ring-1 ring-brand/10 hover:bg-brand-soft',
              ].join(' ')}
            >
              {optionLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}
