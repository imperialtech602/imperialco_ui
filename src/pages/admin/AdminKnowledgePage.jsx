import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Plus, Pencil, Trash2, BookOpen, ExternalLink, LayoutTemplate } from 'lucide-react'
import {
  useCreateKnowledgePostMutation,
  useDeleteKnowledgePostMutation,
  useDuplicateKnowledgePostMutation,
  useGetKnowledgePostsQuery,
} from '@/features/admin/adminApi'
import { STARTER_TEMPLATES } from '@/data/knowledgeTemplates'
import Button from '@/components/ui/Button'
import {
  EmptyState,
  PageHero,
  Panel,
  StatusPill,
} from '@/components/admin/adminUi'

const BASE_LABELS = {
  boxed: 'Boxed CTA',
  banner: 'Banner CTA',
}

function CtaBasePills({ bases = [] }) {
  if (!bases.length) return null
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {bases.map((base) => (
        <span
          key={base}
          className="rounded-full bg-brand-muted px-2.5 py-1 text-[11px] font-bold text-brand"
        >
          {BASE_LABELS[base] || base}
        </span>
      ))}
    </div>
  )
}

export default function AdminKnowledgePage() {
  const navigate = useNavigate()
  const { data, error, isLoading, isFetching, isSuccess } = useGetKnowledgePostsQuery({
    limit: 50,
  })
  const [createPost] = useCreateKnowledgePostMutation()
  const [duplicatePost] = useDuplicateKnowledgePostMutation()
  const [deletePost] = useDeleteKnowledgePostMutation()

  const posts = data?.items || []
  const [chooserOpen, setChooserOpen] = useState(false)
  const [starting, setStarting] = useState('')

  useEffect(() => {
    document.title = 'Knowledge Hub | Admin | Imperial Co'
  }, [])

  const templates = posts.filter((post) => post.isTemplate)
  const articles = posts.filter((post) => !post.isTemplate)

  const openEditor = (id) => {
    setChooserOpen(false)
    navigate(`/admin/knowledge/${id}`)
  }

  const startFromStarter = async (starter) => {
    setStarting(starter.key)
    try {
      const created = await createPost({
        title: 'New post',
        status: 'draft',
        blocks: starter.blocks,
      }).unwrap()
      openEditor(created.id)
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Could not start post',
        text: err.data?.message || err.message || 'Failed',
        confirmButtonColor: '#282a74',
      })
    } finally {
      setStarting('')
    }
  }

  const startFromSaved = async (template) => {
    setStarting(template.id)
    try {
      const created = await duplicatePost({ id: template.id }).unwrap()
      openEditor(created.id)
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Could not start post',
        text: err.data?.message || err.message || 'Failed',
        confirmButtonColor: '#282a74',
      })
    } finally {
      setStarting('')
    }
  }

  const onDelete = async (post) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: post.isTemplate ? 'Delete template?' : 'Delete post?',
      text: post.title,
      showCancelButton: true,
      confirmButtonColor: '#282a74',
      confirmButtonText: 'Delete',
    })
    if (!result.isConfirmed) return
    try {
      await deletePost(post.id).unwrap()
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Delete failed',
        text: err.data?.message || err.message || 'Delete failed',
        confirmButtonColor: '#282a74',
      })
    }
  }

  const showLoading = isLoading && !isSuccess && !data
  const errorMessage = error?.data?.message || error?.error || ''

  return (
    <div className="space-y-5">
      <PageHero
        eyebrow="Content"
        title="Knowledge Hub"
        description="Start a post from a boxed CTA layout, a banner CTA layout, or a template you saved."
        actions={
          <div className="flex items-center gap-3">
            {isFetching && data ? (
              <span className="text-xs font-semibold text-slate-soft">Refreshing…</span>
            ) : null}
            <Button size="sm" onClick={() => setChooserOpen(true)}>
              <Plus className="h-4 w-4" />
              New post
            </Button>
          </div>
        }
      />

      {errorMessage ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      ) : null}

      {showLoading ? (
        <Panel>
          <p className="py-10 text-center text-sm text-slate-body">Loading posts…</p>
        </Panel>
      ) : (
        <>
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="h-4 w-4 text-brand" />
              <h2 className="text-sm font-bold text-brand">Saved templates</h2>
            </div>
            {templates.length === 0 ? (
              <Panel>
                <p className="text-sm text-slate-body">
                  No saved templates yet. Open a post and choose Save as template. New posts can
                  also start from the boxed or banner layouts.
                </p>
              </Panel>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {templates.map((template) => (
                  <Panel key={template.id}>
                    <p className="text-sm font-bold text-brand">{template.title}</p>
                    <CtaBasePills bases={template.ctaBases} />
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => startFromSaved(template)}
                        disabled={starting === template.id}
                      >
                        {starting === template.id ? 'Starting…' : 'Use template'}
                      </Button>
                      <Link to={`/admin/knowledge/${template.id}`}>
                        <Button size="sm" variant="secondary">
                          Edit template
                        </Button>
                      </Link>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600"
                        onClick={() => onDelete(template)}
                        aria-label={`Delete template ${template.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </Panel>
                ))}
              </div>
            )}
          </section>

          {articles.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No posts yet"
              description="Start from a boxed or banner CTA template."
              action={
                <Button onClick={() => setChooserOpen(true)}>
                  <Plus className="h-4 w-4" />
                  New post
                </Button>
              }
            />
          ) : (
            <Panel padded={false} className="overflow-hidden">
              <ul className="divide-y divide-brand/8">
                {articles.map((post) => (
                  <li
                    key={post.id}
                    className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-bold text-brand">{post.title}</p>
                        <StatusPill value={post.status} size="sm" />
                      </div>
                      <CtaBasePills bases={post.ctaBases} />
                      <p className="mt-1 text-xs text-slate-soft">
                        /insights/{post.slug}
                        {post.author?.name ? ` · ${post.author.name}` : ''}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {post.status === 'published' ? (
                        <Link
                          to={`/insights/${post.slug}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-muted text-brand"
                          aria-label="View public post"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      ) : null}
                      <Link
                        to={`/admin/knowledge/${post.id}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-muted text-brand"
                        aria-label="Edit post"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600"
                        onClick={() => onDelete(post)}
                        aria-label="Delete post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </>
      )}

      {chooserOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-3 backdrop-blur-[2px] sm:items-center">
          <div className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white p-5 shadow-2xl sm:p-7">
            <h3 className="text-xl font-extrabold text-brand">New post</h3>
            <p className="mt-1 text-sm text-slate-body">
              Start blank, or use a boxed or banner CTA layout. Saved templates keep the sections
              and buttons you already set up.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => openEditor('new')}
                className="rounded-2xl border border-brand/10 px-4 py-4 text-left hover:bg-brand-muted/50"
              >
                <p className="text-sm font-bold text-brand">Blank post</p>
                <p className="mt-1 text-xs text-slate-soft">One empty main section.</p>
              </button>
              {STARTER_TEMPLATES.map((starter) => (
                <button
                  key={starter.key}
                  type="button"
                  disabled={Boolean(starting)}
                  onClick={() => startFromStarter(starter)}
                  className="rounded-2xl border border-brand/10 px-4 py-4 text-left hover:bg-brand-muted/50 disabled:opacity-60"
                >
                  <p className="text-sm font-bold text-brand">{starter.title}</p>
                  <p className="mt-1 text-xs text-slate-soft">{starter.description}</p>
                  <CtaBasePills bases={starter.ctaBases} />
                </button>
              ))}
            </div>

            {templates.length ? (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-soft">
                  Saved templates
                </p>
                <div className="mt-2 space-y-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      disabled={Boolean(starting)}
                      onClick={() => startFromSaved(template)}
                      className="flex w-full items-center justify-between gap-3 rounded-2xl border border-brand/10 px-4 py-3 text-left hover:bg-brand-muted/50 disabled:opacity-60"
                    >
                      <span>
                        <span className="block text-sm font-bold text-brand">{template.title}</span>
                        <CtaBasePills bases={template.ctaBases} />
                      </span>
                      <span className="text-xs font-bold text-brand">Use</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex justify-end">
              <Button type="button" variant="outline" onClick={() => setChooserOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
