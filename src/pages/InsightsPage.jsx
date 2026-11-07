import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPublicPosts } from '@/api/knowledge'
import TagPills from '@/components/knowledge/TagPills'
import Button from '@/components/ui/Button'

export default function InsightsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Knowledge Hub | Imperial Co'
    fetchPublicPosts({ limit: 24 })
      .then((res) => setPosts(res.data?.items || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main id="top">
      <section className="container-page pt-8 pb-10 text-center sm:pt-12">
        <h1 className="text-[1.75rem] font-extrabold tracking-tight text-brand sm:text-4xl">
          Knowledge Hub
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-body sm:text-base">
          Insights on RLDs, comparators, ANDA / BE planning, and sourcing operations.
        </p>
      </section>

      <section className="container-page pb-16">
        {loading ? (
          <p className="text-center text-sm text-slate-body">Loading articles…</p>
        ) : error ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </p>
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
                key={post.id}
                className="rounded-[28px] border border-brand/8 bg-white p-6 shadow-sm shadow-brand/5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-soft">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : 'Insight'}
                </p>
                <h2 className="mt-2 text-xl font-extrabold leading-snug text-brand">
                  {post.title}
                </h2>
                <TagPills tags={post.tags} className="mt-3" />
                <Link
                  to={`/insights/${post.slug}`}
                  className="mt-5 inline-flex text-sm font-bold text-brand hover:underline"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
