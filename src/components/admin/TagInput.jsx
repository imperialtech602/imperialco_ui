import { useState } from 'react'
import TagPills from '@/components/knowledge/TagPills'
import { labelClass } from '@/components/admin/adminUi'

const SUGGESTIONS = ['RLD', 'Batch Selection', 'Bioequivalence']

function normalizeTag(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, 40)
}

export default function TagInput({ tags = [], onChange, label = 'Tags' }) {
  const [draft, setDraft] = useState('')

  const addTag = (raw) => {
    const tag = normalizeTag(raw)
    if (!tag) return
    const exists = tags.some((item) => item.toLowerCase() === tag.toLowerCase())
    if (exists) {
      setDraft('')
      return
    }
    onChange([...tags, tag])
    setDraft('')
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag(draft)
      return
    }
    if (event.key === 'Backspace' && !draft && tags.length) {
      onChange(tags.slice(0, -1))
    }
  }

  const unusedSuggestions = SUGGESTIONS.filter(
    (item) => !tags.some((tag) => tag.toLowerCase() === item.toLowerCase()),
  )

  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="rounded-2xl border border-brand/10 bg-white px-3 py-2.5 focus-within:border-brand/30 focus-within:ring-2 focus-within:ring-brand/15">
        <TagPills
          tags={tags}
          onRemove={(tag) => onChange(tags.filter((item) => item !== tag))}
          className={tags.length ? 'mb-2' : ''}
        />
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => addTag(draft)}
          className="h-8 w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-slate-soft"
          placeholder={tags.length ? 'Add another tag' : 'Type a tag and press Enter'}
        />
      </div>
      {unusedSuggestions.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {unusedSuggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => addTag(item)}
              className="rounded-full border border-dashed border-brand/20 px-3 py-1 text-[11px] font-bold text-brand hover:bg-brand-muted"
            >
              + {item}
            </button>
          ))}
        </div>
      ) : null}
      <p className="mt-1.5 text-[11px] text-slate-soft">
        Press Enter or comma to add. Shown as pills on the Knowledge Hub.
      </p>
    </div>
  )
}

export function tagsFromPost(post = {}) {
  if (Array.isArray(post.tags) && post.tags.length) {
    return post.tags.map(normalizeTag).filter(Boolean)
  }
  if (!post.excerpt) return []
  return String(post.excerpt)
    .split(/[,|/]/)
    .map(normalizeTag)
    .filter(Boolean)
}
