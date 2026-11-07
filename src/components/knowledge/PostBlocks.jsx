import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { visibleCtaButtons } from '@/lib/ctaButtons'
import { sanitizeRichText, toEditorHtml } from '@/lib/richText'

function CtaActions({ cta, variant }) {
  const buttons = visibleCtaButtons(cta)
  if (!buttons.length) return null

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {buttons.map((button, index) => {
        const to = button.to || (variant === 'banner' ? '/products' : '/request-quote')
        if (variant === 'banner') {
          return (
            <Link
              key={`${button.label}-${index}`}
              to={to}
              className={
                index === 0
                  ? 'inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-bold text-brand'
                  : 'inline-flex h-11 items-center rounded-full border border-white/50 px-5 text-sm font-bold text-white'
              }
            >
              {button.label}
            </Link>
          )
        }

        return (
          <Link key={`${button.label}-${index}`} to={to}>
            <Button variant={index === 0 ? 'primary' : 'outline'}>{button.label}</Button>
          </Link>
        )
      })}
    </div>
  )
}

function BoxedCta({ cta }) {
  return (
    <aside className="my-10 rounded-[28px] border border-brand/10 bg-brand-muted/70 px-6 py-7 sm:px-8">
      {cta.headline ? (
        <h3 className="text-xl font-extrabold text-brand sm:text-2xl">{cta.headline}</h3>
      ) : null}
      {cta.body ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-body">{cta.body}</p>
      ) : null}
      {cta.bullets?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-slate-body">
          {cta.bullets.filter(Boolean).map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <CtaActions cta={cta} variant="boxed" />
    </aside>
  )
}

function BannerCta({ cta }) {
  return (
    <aside className="my-10 overflow-hidden rounded-[28px] bg-brand px-6 py-8 text-white sm:px-10 sm:py-10">
      {cta.headline ? (
        <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {cta.headline}
        </h3>
      ) : null}
      {cta.body ? (
        <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">{cta.body}</p>
      ) : null}
      <CtaActions cta={cta} variant="banner" />
    </aside>
  )
}

export default function PostBlocks({ blocks = [] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        if (block.type === 'cta') {
          const cta = block.cta || {}
          return block.ctaVariant === 'banner' ? (
            <BannerCta key={block.id || index} cta={cta} />
          ) : (
            <BoxedCta key={block.id || index} cta={cta} />
          )
        }

        return (
          <section key={block.id || index}>
            {block.heading ? (
              <h2 className="text-xl font-extrabold text-brand sm:text-2xl">
                {block.heading}
              </h2>
            ) : null}
            {block.body ? (
              <div
                className={[
                  'rich-text max-w-none text-[15px] leading-relaxed text-slate-body',
                  block.heading ? 'mt-3' : '',
                ].join(' ')}
                dangerouslySetInnerHTML={{
                  __html: sanitizeRichText(toEditorHtml(block.body)),
                }}
              />
            ) : null}
          </section>
        )
      })}
    </div>
  )
}
