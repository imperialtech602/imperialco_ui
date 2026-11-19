import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPublicPost } from '@/api/knowledge'
import PostBlocks from '@/components/knowledge/PostBlocks'
import TagPills from '@/components/knowledge/TagPills'
import Button from '@/components/ui/Button'

function formatArticleDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function InsightPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    setError('')
    setPost(null)

    fetchPublicPost(slug)
      .then((res) => {
        const data = res.data
        if (!data?.title) {
          setError('Post not found')
          return
        }
        setPost(data)
        document.title = `${data.title} | Imperial Co`
      })
      .catch(() => {
        setError('Post not found')
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading && !post) {
    return (
      <main className="container-page py-16 text-center text-sm text-slate-body">
        Loading article…
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className="container-page py-16 text-center">
        <h1 className="text-2xl font-extrabold text-brand">Article not found</h1>
        <p className="mt-3 text-sm text-slate-body">{error}</p>
        <Link to="/insights" className="mt-6 inline-block">
          <Button variant="outline">Back to Knowledge Hub</Button>
        </Link>
      </main>
    )
  }

  return (
    <main id="top" className="font-article">
      <article className="container-page pt-8 pb-16 sm:pt-12">
        <Link
          to="/insights"
          className="text-sm font-semibold text-brand hover:underline"
        >
          ← Knowledge Hub
        </Link>
        <h1 className="mt-5 max-w-4xl text-[1.75rem] font-normal leading-tight tracking-tight text-brand sm:text-[2.75rem] sm:leading-[1.15]">
          {post.title}
        </h1>

        {post.tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-brand px-[11px] py-[5px] text-xs font-semibold text-brand"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <TagPills tags={post.tags} className="mt-5" />
        )}

        {post.publishedAt ? (
          <p className="mt-4 text-sm text-[#0c0c0c]">{formatArticleDate(post.publishedAt)}</p>
        ) : null}

        <div className="article-body mt-8 max-w-3xl">
          <PostBlocks blocks={post.blocks} />
        </div>
      </article>
    </main>
  )
}
