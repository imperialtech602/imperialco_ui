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

function BulletList({ items = [] }) {
  if (!items.length) return null
  return (
    <ul className="mt-3 space-y-2 text-sm text-slate-body sm:text-[15px]">
      {items.filter(Boolean).map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function BoxedCta({ cta }) {
  const supportBullets = cta.supportBullets || []
  return (
    <aside className="my-10 rounded-[28px] border border-brand/10 bg-[#f5f6f8] px-6 py-7 sm:px-8">
      {cta.headline ? (
        <h3 className="text-xl font-normal text-brand sm:text-2xl">{cta.headline}</h3>
      ) : null}
      {cta.body ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-body sm:text-[15px]">{cta.body}</p>
      ) : null}
      <BulletList items={cta.bullets || []} />
      {cta.supportIntro || supportBullets.length ? (
        <div className="mt-5">
          {cta.supportIntro ? (
            <p className="text-sm leading-relaxed text-slate-body sm:text-[15px]">
              {cta.supportIntro}
            </p>
          ) : null}
          <BulletList items={supportBullets} />
        </div>
      ) : null}
      <CtaActions cta={cta} variant="boxed" />
    </aside>
  )
}

function BannerCta({ cta }) {
  return (
    <aside className="my-10 overflow-hidden rounded-[28px] bg-[#f5f6f8] px-6 py-8 sm:px-10 sm:py-10">
      {cta.headline ? (
        <h3 className="text-2xl font-normal tracking-tight text-brand sm:text-3xl">
          {cta.headline}
        </h3>
      ) : null}
      {cta.body ? (
        <p className="mt-3 max-w-2xl text-sm text-slate-body sm:text-base">{cta.body}</p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        {visibleCtaButtons(cta).map((button, index) => {
          const to = button.to || '/products'
          return (
            <Link
              key={`${button.label}-${index}`}
              to={to}
              className={
                index === 0
                  ? 'inline-flex h-11 items-center rounded-full bg-brand px-5 text-sm font-medium text-white'
                  : 'inline-flex h-11 items-center rounded-full border border-brand px-5 text-sm font-medium text-brand'
              }
            >
              {button.label}
            </Link>
          )
        })}
      </div>
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
              <h2 className="text-[1.75rem] font-normal leading-tight text-brand">
                {block.heading}
              </h2>
            ) : null}
            {block.body ? (
              <div
                className={[
                  'rich-text max-w-none text-lg font-normal leading-[1.75] text-[#0c0c0c]',
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
