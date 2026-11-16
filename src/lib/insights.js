import { PUBLISHED_INSIGHTS } from '@/data/publishedInsights'

function toIsoDate(value) {
  if (!value) return null
  if (String(value).includes('T')) return value
  return `${value}T12:00:00.000Z`
}

function looksLikeTagList(excerpt, tags = []) {
  if (!excerpt || !tags.length) return false
  const normalized = String(excerpt)
    .split(/[,|/]/)
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
    .sort()
    .join('|')
  const tagKey = tags
    .map((tag) => String(tag).trim().toLowerCase())
    .filter(Boolean)
    .sort()
    .join('|')
  return normalized === tagKey
}

export function getStaticInsights() {
  return PUBLISHED_INSIGHTS.map((article) => ({
    id: `static-${article.slug}`,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    tags: article.tags || [],
    publishedAt: toIsoDate(article.publishedAt),
    blocks: article.blocks || [],
    status: 'published',
    source: 'static',
  }))
}

export function getStaticInsightBySlug(slug) {
  return getStaticInsights().find((article) => article.slug === slug) || null
}

/** Merge API posts with the 7 live-site articles so the hub is never empty. */
export function mergeInsights(apiPosts = []) {
  const bySlug = new Map()

  for (const post of getStaticInsights()) {
    bySlug.set(post.slug, post)
  }

  for (const post of apiPosts) {
    if (!post?.slug) continue
    const isPlaceholder = !post.title || /^new post$/i.test(post.title.trim())
    if (isPlaceholder) continue

    const base = bySlug.get(post.slug)
    const apiExcerpt = post.excerpt || ''
    const preferStaticExcerpt =
      Boolean(base?.excerpt) &&
      (!apiExcerpt || looksLikeTagList(apiExcerpt, post.tags || base?.tags || []))

    const preferStaticBlocks =
      Boolean(base?.blocks?.length) &&
      (!post.blocks?.length ||
        base.blocks.length >= post.blocks.length ||
        JSON.stringify(base.blocks).length >= JSON.stringify(post.blocks).length)

    bySlug.set(post.slug, {
      ...base,
      ...post,
      id: post.id || base?.id,
      title: post.title || base?.title,
      excerpt: preferStaticExcerpt ? base.excerpt : apiExcerpt || base?.excerpt || '',
      tags: post.tags?.length ? post.tags : base?.tags || [],
      // Keep original live-site publish dates when we have them
      publishedAt: base?.publishedAt || post.publishedAt || null,
      blocks: preferStaticBlocks ? base.blocks : post.blocks?.length ? post.blocks : base?.blocks || [],
    })
  }

  return Array.from(bySlug.values()).sort((a, b) => {
    const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return db - da
  })
}
