import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPublicPost } from '@/api/knowledge'
import PostBlocks from '@/components/knowledge/PostBlocks'
import TagPills from '@/components/knowledge/TagPills'
import Button from '@/components/ui/Button'

export default function InsightPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    fetchPublicPost(slug)
      .then((res) => {
        setPost(res.data)
        document.title = `${res.data.title} | Imperial Co`
      })
      .catch((err) => setError(err.message || 'Post not found'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
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
    <main id="top">
      <article className="container-page pt-8 pb-16 sm:pt-12">
        <Link
          to="/insights"
          className="text-sm font-semibold text-brand hover:underline"
        >
          ← Knowledge Hub
        </Link>
        <h1 className="mt-5 max-w-4xl text-[1.75rem] font-extrabold leading-tight tracking-tight text-brand sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-slate-soft">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString()
            : null}
          {post.author?.name ? ` · ${post.author.name}` : ''}
        </p>
        <TagPills tags={post.tags} className="mt-5" />

        <div className="mt-10 max-w-3xl">
          <PostBlocks blocks={post.blocks} />
        </div>
      </article>
    </main>
  )
}
