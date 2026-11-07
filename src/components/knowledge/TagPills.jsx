import { X } from 'lucide-react'

export default function TagPills({ tags = [], onRemove, className = '' }) {
  if (!tags.length) return null

  return (
    <div className={['flex flex-wrap gap-2', className].filter(Boolean).join(' ')}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full bg-brand-muted px-3 py-1 text-xs font-bold text-brand"
        >
          {tag}
          {onRemove ? (
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="inline-flex h-4 w-4 items-center justify-center rounded-full text-brand/70 hover:bg-white hover:text-brand"
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          ) : null}
        </span>
      ))}
    </div>
  )
}
