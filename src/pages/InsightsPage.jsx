import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPublicPosts } from '@/api/knowledge'
import { getStaticInsights, mergeInsights } from '@/lib/insights'
import Button from '@/components/ui/Button'

function formatArticleDate(value) {
  if (!value) return ''
  return new Date(value)
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase()
}

export default function InsightsPage() {
  const [posts, setPosts] = useState(() => getStaticInsights())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Knowledge Hub | Imperial Co'
    let active = true

    fetchPublicPosts({ limit: 24 })
      .then((res) => {
        if (!active) return
        setPosts(mergeInsights(res.data?.items || []))
      })
      .catch(() => {
        if (!active) return
        setPosts(getStaticInsights())
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main id="top" className="font-article">
      <section className="container-page pt-6 pb-8 sm:pt-8 sm:pb-10">
        <div
          className="relative overflow-hidden rounded-[40px] px-6 py-12 text-center sm:rounded-[56px] sm:px-10 sm:py-16 lg:rounded-[72px] lg:px-16 lg:py-[4.25rem]"
          style={{
            background: 'linear-gradient(90deg, #dcdcf5 0%, #c8c8ef 48%, #b8b8e8 100%)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl">
            <h1 className="text-[1.85rem] font-bold leading-[1.15] tracking-tight text-brand sm:text-4xl lg:text-[2.75rem]">
              Knowledge Hub
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand sm:text-[15px] sm:leading-7 lg:text-base">
              Best-practice articles for Regulatory Affairs, BE, and development teams working
              with comparator product and FDA-designated Reference Listed Drug (RLD) sourcing.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-8 text-center">
        <h2 className="text-xl font-normal text-brand sm:text-2xl">
          Practical guidance for regulated development workflows
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-[#0c0c0c]/80 sm:text-base">
          Explore short, regulator-aware briefings on terminology precision, study planning
          clarity, and sourcing fundamentals for ANDA and bioequivalence programs.
        </p>
      </section>

      <section className="container-page pb-16">
        {loading && posts.length === 0 ? (
          <p className="text-center text-sm text-slate-body">Loading articles…</p>
        ) : posts.length === 0 ? (
          <div className="rounded-[28px] bg-brand-muted px-6 py-12 text-center">
            <p className="text-sm text-slate-body">No published articles yet.</p>
            <Link to="/faq" className="mt-4 inline-block">
              <Button variant="outline">Browse FAQ</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id || post.slug}
                className="flex flex-col rounded-[24px] bg-[#f5f6f8] p-7"
              >
                <h2 className="text-2xl font-normal leading-snug tracking-[-0.01em] text-brand">
                  {post.title}
                </h2>

                {post.publishedAt ? (
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.06em] text-[#0c0c0c]">
                    {formatArticleDate(post.publishedAt)}
                  </p>
                ) : null}

                {post.excerpt ? (
                  <p className="mt-4 flex-1 text-base leading-relaxed text-[#0c0c0c]">
                    {post.excerpt}
                  </p>
                ) : (
                  <div className="flex-1" />
                )}

                <Link
                  to={`/insights/${post.slug}`}
                  className="mt-6 inline-flex w-fit items-center rounded-full bg-brand px-[18px] py-[11px] text-sm font-medium text-white transition hover:bg-brand-dark"
                >
                  Read full article
                </Link>

                {post.tags?.length ? (
                  <div className="mt-6 border-t border-brand/10 pt-5">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-brand px-[11px] py-[5px] text-xs font-semibold text-brand"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
