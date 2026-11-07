import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  FileText,
  GripVertical,
  LayoutTemplate,
  Megaphone,
  Plus,
  Square,
  Trash2,
} from 'lucide-react'
import {
  createKnowledgePost,
  duplicateKnowledgePost,
  fetchAdminPost,
  updateKnowledgePost,
} from '@/api/knowledge'
import { adminApi } from '@/features/admin/adminApi'
import Button from '@/components/ui/Button'
import RichTextEditor from '@/components/admin/RichTextEditor'
import TagInput, { tagsFromPost } from '@/components/admin/TagInput'
import { fieldClass, labelClass, Panel } from '@/components/admin/adminUi'
import { buttonsFromCta } from '@/lib/ctaButtons'
import { sanitizeRichText, toEditorHtml } from '@/lib/richText'

const CTA_TEMPLATES = {
  boxed: {
    type: 'cta',
    ctaVariant: 'boxed',
    cta: {
      headline: 'Planning an ANDA or BE Study?',
      body: '',
      bullets: [
        'Identify suitable RLDs / comparators',
        'Confirm origin & availability',
        'Plan documentation & logistics',
      ],
      buttons: [
        { label: 'Get Started Now', to: '/request-quote' },
        { label: 'Learn More', to: '/how-it-works' },
      ],
    },
  },
  banner: {
    type: 'cta',
    ctaVariant: 'banner',
    cta: {
      headline: 'Looking for specific comparators?',
      body: 'Search our catalog or speak with the sourcing team.',
      bullets: [],
      buttons: [
        { label: 'Search Database', to: '/products' },
        { label: 'Contact Us', to: '/request-quote' },
      ],
    },
  },
}

const PALETTE = [
  {
    kind: 'text',
    label: 'Main section',
    hint: 'Rich text, before or after a CTA',
    icon: FileText,
  },
  {
    kind: 'boxed',
    label: 'Boxed CTA',
    hint: 'Card with bullets and buttons',
    icon: Square,
  },
  {
    kind: 'banner',
    label: 'Banner CTA',
    hint: 'Full-width call to action',
    icon: Megaphone,
  },
]

function newKey() {
  return crypto.randomUUID()
}

function createBlock(kind) {
  if (kind === 'text') {
    return { clientKey: newKey(), type: 'text', heading: '', body: '' }
  }
  const template = kind === 'banner' ? CTA_TEMPLATES.banner : CTA_TEMPLATES.boxed
  return { clientKey: newKey(), ...structuredClone(template) }
}

function hydrateBlock(block) {
  return {
    clientKey: block.id || newKey(),
    type: block.type === 'cta' ? 'cta' : 'text',
    heading: block.heading || '',
    body: block.body || '',
    ctaVariant: block.ctaVariant || 'boxed',
    cta: {
      headline: block.cta?.headline || '',
      body: block.cta?.body || '',
      bullets: block.cta?.bullets?.length ? block.cta.bullets : [''],
      buttons: buttonsFromCta(block.cta),
    },
  }
}

function blockLabel(block) {
  if (block.type === 'cta') {
    return block.ctaVariant === 'banner' ? 'Banner CTA' : 'Boxed CTA'
  }
  return 'Main section'
}

export default function AdminKnowledgeEditorPage() {
  const { id } = useParams()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dragRef = useRef(null)
  const refreshKnowledgeList = () => {
    dispatch(adminApi.util.invalidateTags(['Knowledge']))
  }
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [status, setStatus] = useState('draft')
  const [isTemplate, setIsTemplate] = useState(false)
  const [blocks, setBlocks] = useState(() => [createBlock('text')])
  const [dragging, setDragging] = useState(false)
  const [dropIndex, setDropIndex] = useState(null)

  useEffect(() => {
    document.title = `${isNew ? 'New post' : 'Edit post'} | Knowledge Hub`
    if (isNew) return
    let active = true
    fetchAdminPost(id)
      .then((res) => {
        if (!active) return
        const post = res.data
        setTitle(post.title || '')
        setTags(tagsFromPost(post))
        setStatus(post.status || 'draft')
        setIsTemplate(Boolean(post.isTemplate))
        setBlocks(
          post.blocks?.length ? post.blocks.map(hydrateBlock) : [createBlock('text')],
        )
      })
      .catch(async (err) => {
        await Swal.fire({
          icon: 'error',
          title: 'Unable to load post',
          text: err.message,
          confirmButtonColor: '#282a74',
        })
        navigate('/admin/knowledge')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id, isNew, navigate])

  const updateBlock = (clientKey, patch) => {
    setBlocks((prev) =>
      prev.map((block) => (block.clientKey === clientKey ? { ...block, ...patch } : block)),
    )
  }

  const updateCta = (clientKey, patch) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.clientKey === clientKey
          ? { ...block, cta: { ...(block.cta || {}), ...patch } }
          : block,
      ),
    )
  }

  const removeBlock = (clientKey) => {
    setBlocks((prev) => prev.filter((block) => block.clientKey !== clientKey))
  }

  const moveBlock = (index, direction) => {
    setBlocks((prev) => {
      const target = index + direction
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  const endDrag = () => {
    dragRef.current = null
    setDragging(false)
    setDropIndex(null)
  }

  const startPaletteDrag = (event, kind) => {
    dragRef.current = { source: 'palette', kind }
    event.dataTransfer.setData('text/plain', `palette:${kind}`)
    event.dataTransfer.effectAllowed = 'copy'
    setDragging(true)
  }

  const startBlockDrag = (event, clientKey) => {
    dragRef.current = { source: 'block', clientKey }
    event.dataTransfer.setData('text/plain', `block:${clientKey}`)
    event.dataTransfer.effectAllowed = 'move'
    setDragging(true)
  }

  const placeAt = (index) => {
    const drag = dragRef.current
    if (!drag) return
    setBlocks((prev) => {
      if (drag.source === 'palette') {
        const next = [...prev]
        next.splice(index, 0, createBlock(drag.kind))
        return next
      }
      const from = prev.findIndex((block) => block.clientKey === drag.clientKey)
      if (from < 0) return prev
      let to = index
      if (from < to) to -= 1
      if (from === to) return prev
      const next = [...prev]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      return next
    })
    endDrag()
  }

  const buildPayload = () => ({
    title: title.trim(),
    tags,
    status,
    blocks: blocks.map((block) => {
      if (block.type === 'cta') {
        return {
          type: 'cta',
          ctaVariant: block.ctaVariant || 'boxed',
          cta: {
            headline: block.cta?.headline || '',
            body: block.cta?.body || '',
            bullets: (block.cta?.bullets || []).map((item) => item.trim()).filter(Boolean),
            buttons: (block.cta?.buttons || [])
              .map((button) => ({
                label: String(button.label || '').trim(),
                to: String(button.to || '').trim(),
              }))
              .filter((button) => button.label),
          },
        }
      }
      return {
        type: 'text',
        heading: block.heading || '',
        body: sanitizeRichText(toEditorHtml(block.body || '')),
      }
    }),
  })

  const onSaveTemplate = async () => {
    if (!title.trim()) {
      await Swal.fire({
        icon: 'warning',
        title: 'Title required',
        confirmButtonColor: '#282a74',
      })
      return
    }
    setSaving(true)
    try {
      const payload = buildPayload()
      let sourceId = isNew ? null : id
      if (isNew) {
        const created = await createKnowledgePost(payload)
        sourceId = created.data.id
        navigate(`/admin/knowledge/${sourceId}`, { replace: true })
      } else {
        await updateKnowledgePost(id, payload)
      }
      await duplicateKnowledgePost(sourceId, { asTemplate: true })
      refreshKnowledgeList()
      await Swal.fire({
        icon: 'success',
        title: 'Template saved',
        text: 'New posts can start from this boxed or banner layout.',
        confirmButtonColor: '#282a74',
      })
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Could not save template',
        text: err.message,
        confirmButtonColor: '#282a74',
      })
    } finally {
      setSaving(false)
    }
  }

  const onSave = async () => {
    if (!title.trim()) {
      await Swal.fire({
        icon: 'warning',
        title: 'Title required',
        confirmButtonColor: '#282a74',
      })
      return
    }
    setSaving(true)
    try {
      const payload = buildPayload()
      if (isNew) {
        const res = await createKnowledgePost(payload)
        refreshKnowledgeList()
        await Swal.fire({
          icon: 'success',
          title: 'Post created',
          confirmButtonColor: '#282a74',
          timer: 1200,
          showConfirmButton: false,
        })
        navigate(`/admin/knowledge/${res.data.id}`, { replace: true })
      } else {
        await updateKnowledgePost(id, payload)
        refreshKnowledgeList()
        await Swal.fire({
          icon: 'success',
          title: 'Post saved',
          confirmButtonColor: '#282a74',
          timer: 1200,
          showConfirmButton: false,
        })
      }
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Save failed',
        text: err.message,
        confirmButtonColor: '#282a74',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-body">Loading post…</p>
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/admin/knowledge"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to posts
        </Link>
        <div className="flex flex-wrap gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`${fieldClass} w-auto`}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          {isTemplate ? (
            <span className="inline-flex h-11 items-center rounded-full bg-brand-muted px-4 text-sm font-bold text-brand">
              Template
            </span>
          ) : (
            <Button variant="secondary" onClick={onSaveTemplate} disabled={saving}>
              <LayoutTemplate className="h-4 w-4" />
              Save as template
            </Button>
          )}
          <Button onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : isTemplate ? 'Save template' : 'Save post'}
          </Button>
        </div>
      </div>

      <Panel>
        <label className="block">
          <span className={labelClass}>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClass}
            placeholder="What is a Reference Listed Drug (RLD)…"
          />
        </label>
        <div className="mt-4">
          <TagInput tags={tags} onChange={setTags} label="Tags" />
        </div>
      </Panel>

      <div className="grid items-start gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24">
          <Panel>
            <p className="text-sm font-bold text-brand">Add blocks</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-soft">
              Drag a main section or a CTA into the post. A main section can sit before or
              after a boxed or banner CTA.
            </p>
            <div className="mt-4 space-y-2">
              {PALETTE.map((item) => (
                <div
                  key={item.kind}
                  role="button"
                  tabIndex={0}
                  aria-label={`Add ${item.label}`}
                  draggable
                  onDragStart={(event) => startPaletteDrag(event, item.kind)}
                  onDragEnd={endDrag}
                  className="flex cursor-grab items-center gap-3 rounded-2xl border border-brand/10 bg-brand-muted/50 px-3 py-3 active:cursor-grabbing"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-brand">{item.label}</span>
                    <span className="block text-[11px] text-slate-soft">{item.hint}</span>
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </aside>

        <div
          className="min-h-[280px] space-y-2"
          onDragOver={(event) => {
            if (!dragRef.current) return
            event.preventDefault()
          }}
        >
          {blocks.length === 0 ? (
            <div
              onDragOver={(event) => {
                if (!dragRef.current) return
                event.preventDefault()
                setDropIndex(0)
              }}
              onDrop={(event) => {
                event.preventDefault()
                placeAt(0)
              }}
              className={[
                'flex min-h-[220px] items-center justify-center rounded-[28px] border-2 border-dashed px-6 text-center text-sm',
                dropIndex === 0 && dragging
                  ? 'border-brand bg-brand-muted text-brand'
                  : 'border-brand/15 text-slate-soft',
              ].join(' ')}
            >
              Drag a main section or CTA here to start the post.
            </div>
          ) : (
            blocks.map((block, index) => (
              <div key={block.clientKey}>
                <DropSlot
                  active={dragging && dropIndex === index}
                  dragging={dragging}
                  label="Drop main section or CTA here"
                  onDragOver={() => setDropIndex(index)}
                  onDrop={() => placeAt(index)}
                />
                <div
                  onDragOver={(event) => {
                    if (!dragRef.current) return
                    event.preventDefault()
                    event.dataTransfer.dropEffect =
                      dragRef.current.source === 'palette' ? 'copy' : 'move'
                    const rect = event.currentTarget.getBoundingClientRect()
                    const after = event.clientY > rect.top + rect.height / 2
                    setDropIndex(after ? index + 1 : index)
                  }}
                  onDrop={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    const rect = event.currentTarget.getBoundingClientRect()
                    const after = event.clientY > rect.top + rect.height / 2
                    placeAt(after ? index + 1 : index)
                  }}
                  className={
                    dragging && dragRef.current?.clientKey === block.clientKey
                      ? 'opacity-50'
                      : ''
                  }
                >
                  <Panel>
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          draggable
                          onDragStart={(event) => startBlockDrag(event, block.clientKey)}
                          onDragEnd={endDrag}
                          className="inline-flex h-9 w-9 cursor-grab items-center justify-center rounded-xl bg-brand-muted text-brand active:cursor-grabbing"
                          aria-label="Drag to reorder"
                          title="Drag to reorder"
                        >
                          <GripVertical className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-bold text-brand">{blockLabel(block)}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-1">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-slate-soft hover:bg-brand-muted hover:text-brand disabled:opacity-35"
                          onClick={() => moveBlock(index, -1)}
                          disabled={index === 0}
                          aria-label="Move section up"
                          title="Move up"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg p-2 text-slate-soft hover:bg-brand-muted hover:text-brand disabled:opacity-35"
                          onClick={() => moveBlock(index, 1)}
                          disabled={index === blocks.length - 1}
                          aria-label="Move section down"
                          title="Move down"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                          onClick={() => removeBlock(block.clientKey)}
                          aria-label="Remove block"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {block.type === 'text' ? (
                      <TextFields
                        block={block}
                        onChange={(patch) => updateBlock(block.clientKey, patch)}
                      />
                    ) : (
                      <CtaFields
                        block={block}
                        onChange={(patch) => updateCta(block.clientKey, patch)}
                      />
                    )}
                  </Panel>
                </div>
              </div>
            ))
          )}
          {blocks.length > 0 ? (
            <DropSlot
              active={dragging && dropIndex === blocks.length}
              dragging={dragging}
              label="Drop a main section or CTA here"
              onDragOver={() => setDropIndex(blocks.length)}
              onDrop={() => placeAt(blocks.length)}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

function DropSlot({ active, dragging, label, onDragOver, onDrop }) {
  return (
    <div
      onDragOver={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onDragOver()
      }}
      onDrop={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onDrop()
      }}
      className={[
        'flex items-center justify-center rounded-2xl border border-dashed text-xs font-semibold transition-all',
        dragging ? 'my-2 min-h-11 px-3' : 'my-1 min-h-2 border-transparent',
        active
          ? 'border-brand bg-brand-muted text-brand'
          : dragging
            ? 'border-brand/20 text-slate-soft'
            : 'text-transparent',
      ].join(' ')}
    >
      {dragging ? label : ''}
    </div>
  )
}

function TextFields({ block, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block">
        <span className={labelClass}>Section heading</span>
        <input
          value={block.heading}
          onChange={(e) => onChange({ heading: e.target.value })}
          className={fieldClass}
          placeholder="Optional heading"
        />
      </label>
      <div>
        <span className={labelClass}>Rich text</span>
        <RichTextEditor
          value={block.body}
          onChange={(body) => onChange({ body })}
          placeholder="Write this main section. It can sit before or after a boxed or banner CTA."
        />
      </div>
    </div>
  )
}

function CtaButtonList({ buttons, onChange }) {
  const updateButton = (index, patch) => {
    onChange(buttons.map((button, i) => (i === index ? { ...button, ...patch } : button)))
  }

  const removeButton = (index) => {
    onChange(buttons.filter((_, i) => i !== index))
  }

  const addButton = () => {
    onChange([...buttons, { label: '', to: '' }])
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className={labelClass}>Buttons</span>
        <button
          type="button"
          onClick={addButton}
          className="inline-flex items-center gap-1 rounded-full bg-brand-muted px-3 py-1.5 text-xs font-bold text-brand"
        >
          <Plus className="h-3.5 w-3.5" />
          Add button
        </button>
      </div>
      {buttons.length === 0 ? (
        <p className="rounded-xl bg-brand-muted/60 px-3 py-3 text-xs text-slate-soft">
          No buttons. Add one, or leave this CTA without a link.
        </p>
      ) : (
        <div className="space-y-2">
          {buttons.map((button, index) => (
            <div
              key={index}
              className="grid gap-2 rounded-2xl border border-brand/10 p-3 sm:grid-cols-[1fr_1fr_auto]"
            >
              <label>
                <span className={labelClass}>Label</span>
                <input
                  value={button.label}
                  onChange={(event) => updateButton(index, { label: event.target.value })}
                  className={fieldClass}
                  placeholder="Get Started"
                />
              </label>
              <label>
                <span className={labelClass}>Link</span>
                <input
                  value={button.to}
                  onChange={(event) => updateButton(index, { to: event.target.value })}
                  className={fieldClass}
                  placeholder="/request-quote"
                />
              </label>
              <button
                type="button"
                onClick={() => removeButton(index)}
                className="inline-flex h-11 items-center justify-center self-end rounded-xl bg-red-50 px-3 text-red-600"
                aria-label={`Remove button ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CtaFields({ block, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block">
        <span className={labelClass}>CTA headline</span>
        <input
          value={block.cta?.headline || ''}
          onChange={(e) => onChange({ headline: e.target.value })}
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>CTA body</span>
        <textarea
          value={block.cta?.body || ''}
          onChange={(e) => onChange({ body: e.target.value })}
          rows={2}
          className={`${fieldClass} !h-auto py-2.5`}
        />
      </label>
      {block.ctaVariant === 'boxed' ? (
        <label className="block">
          <span className={labelClass}>Bullets (one per line)</span>
          <textarea
            value={(block.cta?.bullets || []).join('\n')}
            onChange={(e) => onChange({ bullets: e.target.value.split('\n') })}
            rows={4}
            className={`${fieldClass} !h-auto py-2.5`}
          />
        </label>
      ) : null}
      <CtaButtonList
        buttons={block.cta?.buttons || []}
        onChange={(buttons) => onChange({ buttons })}
      />
    </div>
  )
}
