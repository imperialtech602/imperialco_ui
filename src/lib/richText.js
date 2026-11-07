import DOMPurify from 'dompurify'

const ALLOWED_TAGS = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'blockquote']
const ALLOWED_ATTR = ['href', 'target', 'rel']

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function looksLikeHtml(value) {
  return /<\/?[a-z][\s\S]*>/i.test(value)
}

export function toEditorHtml(value) {
  const text = String(value || '').trim()
  if (!text) return ''
  if (looksLikeHtml(text)) return sanitizeRichText(text)
  return text
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
    .join('')
}

export function sanitizeRichText(html) {
  const source = String(html || '')
  if (!source.trim()) return ''

  const parsed = new DOMParser().parseFromString(source, 'text/html')
  parsed.body.querySelectorAll('div').forEach((div) => {
    const paragraph = parsed.createElement('p')
    while (div.firstChild) paragraph.appendChild(div.firstChild)
    div.replaceWith(paragraph)
  })

  const clean = DOMPurify.sanitize(parsed.body.innerHTML, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  })

  const safe = new DOMParser().parseFromString(clean, 'text/html')
  safe.body.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href') || ''
    const allowed =
      href.startsWith('/') ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      /^https?:\/\//i.test(href)
    if (!allowed) {
      link.removeAttribute('href')
    }
    if (link.getAttribute('target') === '_blank') {
      link.setAttribute('rel', 'noopener noreferrer')
    }
  })

  return safe.body.innerHTML
}
